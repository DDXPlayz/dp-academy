"""
Proposes a syllabus topic for every past-paper question that has none.

    python -I -X utf8 scripts/tag_past_papers.py [--bank DIR] [--dry-run] [--sample N]

Reads the private question bank (resources/question-bank/*.json, never
modified) and writes resources/question-bank/tags.json:

    { "<subject>/<question id>": { "topic": "<topic id>", "confidence": "high"|"medium" } }

src/lib/pastPapers.ts applies these overrides to questions with no valid topic.

Method (pure Python, no third-party packages):
  1. A question whose `subtopic` field names a syllabus code ("R3.2", "2.6",
     "A.2", "Tool 2") maps straight to that topic (confidence high).
  2. Otherwise a TF-IDF classifier (unigrams + bigrams, sublinear tf) scores
     every topic of the subject by combining
       - cosine similarity to the centroid of the already-tagged questions of
         that topic,
       - cosine similarity to the topic's own lesson text (content/<subject>/
         <topic>/lessons/*.md: titles, headings, definitions, formulas, body)
         and its practice questions / flashcards,
       - a similarity-weighted vote of the k nearest tagged questions.
  3. The confidence of a prediction is the relative margin between the best
     and second-best topic. Thresholds are calibrated per subject by k-fold
     cross-validation on the tagged questions (the 2024-25 PDF questions that
     already carry a topic are always in the held-out folds' evaluation and
     reported separately, since they are the closest match to the untagged
     ones): 'high' needs >= 90 % held-out accuracy at that margin, 'medium'
     >= 75 %; anything below is left untagged.
"""
from __future__ import annotations

import argparse
import collections
import json
import math
import os
import random
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DEFAULT_BANK = os.path.join(ROOT, 'resources', 'question-bank')
TAGS_FILE = 'tags.json'

HIGH_ACC = 0.90
MEDIUM_ACC = 0.75
K_NEIGHBOURS = 12
# weights of (tagged-question centroid, lesson text, kNN vote); chosen by cross-validation
WEIGHTS = (1.0, 1.5, 0.5)
FOLDS = 5

STOP = set(
    """a about above after again against all also am an and any are as at be because been before being below between both
    but by can could did do does doing down during each few for from further had has have having he her here hers him his
    how i if in into is it its itself just me more most my no nor not now of off on once only or other our out over own
    same she should so some such than that the their them then there these they this those through to too under until up
    very was we were what when where which while who whom why will with would you your yours one two three four five six
    seven eight nine ten use used using given show shown state explain calculate determine suggest outline describe
    deduce estimate find write down identify discuss evaluate predict sketch draw label hence answer question part
    following value correct statement statements diagram graph below above figure table marks mark accept award allow
    ignore owtte do not ecf note examiners report candidates many most well some few markscheme""".split()
)
# Content of the 2016-syllabus options that the current syllabus dropped. Any
# topic the classifier picks for these would be wrong, so they stay untagged.
OUT_OF_SYLLABUS = {
    'chemistry': re.compile(
        r'\b(anti-?viral|antibiotic|penicillin|analgesic|opiate|morphine|diamorphine|codeine|antacid|medication|'
        r'medicines?|drugs?|pharmaceutical|placebo|therapeutic|protein|amino acid|enzymes?|lipids?|carbohydrates?|'
        r'dna|rna|vitamins?|triglycerides?|phospholipids?|nucleotides?|haemoglobin|hemoglobin|liquid crystals?|'
        r'superconduct\w*|xenobiotics?|host.guest|unit cells?)\b',
        re.I,
    ),
    'physics': re.compile(
        r'\b(lens|lenses|telescopes?|ultrasound|optic(al)? fib(re|er)s?|hubble|cosmic microwave|dark matter|'
        r'bernoulli|viscosity|viscous|buoyan\w*|reynolds|fluids?|cepheids?|attenuation|endoscop\w*|magnifi\w*|'
        r'capacit\w*|quarks?|pions?|kaons?|mesons?|baryons?|hadrons?|gluons?|strangeness|feynman)\b',
        re.I,
    ),
}
MIN_WORDS = 6  # fewer content words than this (e.g. garbled PDF text) is too little to classify
BOILERPLATE = [
    re.compile(r'Each row in the .Question. column relates to the smallest subpart of the question\.?', re.I),
    re.compile(r'\*?\s*This question is from an exam for a previous syllabus.*?structure\.', re.I),
    re.compile(r'\*\*Examiners report\*\*[\s\S]*$', re.I),
]


# ---------------------------------------------------------------- text

def clean(text: str) -> str:
    for rx in BOILERPLATE:
        text = rx.sub(' ', text)
    text = re.sub(r'!\[[^\]]*\]\([^)]*\)', ' ', text)  # images
    text = re.sub(r'\\(frac|left|right|mathrm|text|rm|times|cdot|quad|displaystyle|begin|end)\b', ' ', text)
    text = text.replace('\\', ' ')
    return text


TOKEN = re.compile(r"[a-zA-Z][a-zA-Z]+")


def tokens(text: str) -> list[str]:
    words = [w.lower() for w in TOKEN.findall(clean(text))]
    words = [w for w in words if w not in STOP and len(w) > 1]
    out = list(words)
    out += [a + '_' + b for a, b in zip(words, words[1:])]
    return out


def tf(text: str) -> dict[str, float]:
    c = collections.Counter(tokens(text))
    return {t: 1.0 + math.log(n) for t, n in c.items()}


def norm(v: dict[str, float]) -> dict[str, float]:
    s = math.sqrt(sum(x * x for x in v.values())) or 1.0
    return {k: x / s for k, x in v.items()}


def dot(a: dict[str, float], b: dict[str, float]) -> float:
    if len(a) > len(b):
        a, b = b, a
    return sum(x * b.get(k, 0.0) for k, x in a.items())


# ---------------------------------------------------------------- data

def load_subjects():
    subjects = {}
    for s in sorted(os.listdir(os.path.join(ROOT, 'content'))):
        f = os.path.join(ROOT, 'content', s, 'subject.json')
        if not os.path.isfile(f):
            continue
        data = json.load(open(f, encoding='utf8'))
        topics = {}
        for unit in data['units']:
            for t in unit['topics']:
                topics[t['id']] = t
        subjects[s] = topics
    return subjects


def code_map(topics: dict) -> dict[str, str]:
    """'R3.2' / 'r3.2' / '2.6' / 'A.2' / 'Tool 2' -> topic id."""
    out = {}
    for tid, t in topics.items():
        code = t['code']
        out[code.lower().replace(' ', '')] = tid
    return out


def subtopic_topic(sub: str | None, codes: dict[str, str]) -> str | None:
    if not sub:
        return None
    s = str(sub).strip().lower().replace(' ', '')
    if s in codes:
        return codes[s]
    # 'R3.2.1' -> 'R3.2', 'A.2.3' -> 'A.2', '2.6.1' -> '2.6'
    parts = s.split('.')
    while len(parts) > 1:
        parts = parts[:-1]
        if '.'.join(parts) in codes:
            return codes['.'.join(parts)]
    return None


def topic_text(subject: str, tid: str, topic: dict) -> str:
    """Everything the app itself teaches for a topic."""
    base = os.path.join(ROOT, 'content', subject, tid)
    parts = [topic.get('title', ''), topic.get('summary', '')]
    lessons = os.path.join(base, 'lessons')
    if os.path.isdir(lessons):
        for f in sorted(os.listdir(lessons)):
            if f.endswith('.md'):
                text = open(os.path.join(lessons, f), encoding='utf8').read()
                # headings and the front-matter title count twice: they name the ideas
                heads = re.findall(r'^(?:#+|title:)\s*(.+)$', text, re.M)
                terms = re.findall(r'^\s*-?\s*(?:term|name):\s*(.+)$', text, re.M)
                parts += [text] + heads + terms
    for name in ('questions.json', 'exam.json', 'flashcards.json'):
        f = os.path.join(base, name)
        if os.path.isfile(f):
            try:
                data = json.load(open(f, encoding='utf8'))
            except ValueError:
                continue
            rows = data if isinstance(data, list) else data.get('questions') or data.get('cards') or []
            for r in rows:
                if isinstance(r, dict):
                    parts += [str(r.get(k, '')) for k in ('prompt', 'front', 'back', 'concept', 'markscheme', 'explanation')]
    return '\n'.join(parts)


def load_bank(bank_dir: str):
    rows = []
    for f in sorted(os.listdir(bank_dir)):
        if not f.endswith('.json') or f == TAGS_FILE:
            continue
        data = json.load(open(os.path.join(bank_dir, f), encoding='utf8'))
        if not isinstance(data, list):
            continue
        for r in data:
            if isinstance(r, dict) and r.get('id') and r.get('subject'):
                r = dict(r)
                r['_file'] = f
                rows.append(r)
    return rows


def q_text(r: dict) -> str:
    return '\n'.join([str(r.get('prompt') or ''), str(r.get('markscheme') or ''), ' '.join(map(str, r.get('options') or []))])


# ---------------------------------------------------------------- model

class Model:
    def __init__(self, train: list[tuple[dict, str]], lesson_docs: dict[str, str], w_centroid=1.0, w_lesson=1.5, w_knn=0.5):
        self.w = (w_centroid, w_lesson, w_knn)
        raw = [tf(text) for text, _ in ((q_text(r), t) for r, t in train)]
        lesson_tf = {t: tf(txt) for t, txt in lesson_docs.items()}
        df = collections.Counter()
        for v in raw:
            df.update(v.keys())
        for v in lesson_tf.values():
            df.update(v.keys())
        n = len(raw) + len(lesson_tf)
        self.idf = {t: math.log((n + 1) / (d + 1)) + 1.0 for t, d in df.items()}
        self.labels = [t for _, t in train]
        self.vecs = [self.vec_tf(v) for v in raw]
        self.index: dict[str, list[tuple[int, float]]] = collections.defaultdict(list)
        for i, v in enumerate(self.vecs):
            for k, x in v.items():
                self.index[k].append((i, x))
        cent: dict[str, dict[str, float]] = {}
        for v, t in zip(self.vecs, self.labels):
            c = cent.setdefault(t, collections.defaultdict(float))
            for k, x in v.items():
                c[k] += x
        self.centroids = {t: norm(c) for t, c in cent.items()}
        self.lessons = {t: self.vec_tf(v) for t, v in lesson_tf.items()}
        self.topics = sorted(set(self.centroids) | set(self.lessons))

    def vec_tf(self, v: dict[str, float]) -> dict[str, float]:
        return norm({k: x * self.idf.get(k, 1.0) for k, x in v.items() if k in self.idf})

    def components(self, text: str) -> dict[str, tuple[float, float, float]]:
        """Per topic: (centroid similarity, lesson similarity, kNN vote)."""
        q = self.vec_tf(tf(text))
        out = {}
        for t in self.topics:
            c = dot(q, self.centroids[t]) if t in self.centroids else 0.0
            l = dot(q, self.lessons[t]) if t in self.lessons else 0.0
            out[t] = [c, l, 0.0]
        # k nearest tagged questions, via the inverted index over the query's strongest terms
        sims = collections.defaultdict(float)
        for k, x in sorted(q.items(), key=lambda kv: -kv[1])[:40]:
            for i, y in self.index.get(k, ()):
                sims[i] += x * y
        top = sorted(sims.items(), key=lambda kv: -kv[1])[:K_NEIGHBOURS]
        total = sum(v for _, v in top) or 1.0
        for i, v in top:
            out[self.labels[i]][2] += v / total * top[0][1]
        return {t: tuple(v) for t, v in out.items()}

    def predict(self, text: str, w=None) -> tuple[str | None, float]:
        return combine(self.components(text), w or self.w)


def combine(comp: dict[str, tuple[float, float, float]], w) -> tuple[str | None, float]:
    """Best topic and its relative margin over the runner-up."""
    sc = sorted(((w[0] * c + w[1] * l + w[2] * k, t) for t, (c, l, k) in comp.items()), reverse=True)
    if not sc or sc[0][0] <= 0:
        return None, 0.0
    best = sc[0][0]
    second = sc[1][0] if len(sc) > 1 else 0.0
    return sc[0][1], (best - second) / best


# ---------------------------------------------------------------- validation

def cross_validate(train, lesson_docs, seed=7):
    """k-fold topic scores for every tagged question: [(row, true topic, components)]."""
    rnd = random.Random(seed)
    idx = list(range(len(train)))
    rnd.shuffle(idx)
    out = []
    for f in range(FOLDS):
        test = set(idx[f::FOLDS])
        m = Model([train[i] for i in idx if i not in test], lesson_docs)
        for i in sorted(test):
            r, t = train[i]
            out.append((r, t, m.components(q_text(r))))
    return out


def predictions(cv, w):
    """[(row, true, pred, margin)] for one weighting of the score components."""
    return [(r, t, *combine(comp, w)) for r, t, comp in cv]


def threshold(results, target: float, below: float | None = None, min_n: int = 20) -> float | None:
    """
    Smallest margin m such that the held-out predictions with m <= margin < `below`
    reach `target` accuracy (so a 'medium' band is judged on its own, not
    flattered by the 'high' predictions above it).
    """
    rs = sorted((x for x in results if below is None or x[3] < below), key=lambda x: -x[3])
    best = None
    correct = 0
    for n, (_, t, p, m) in enumerate(rs, 1):
        correct += t == p
        if n >= min_n and correct / n >= target:
            best = m
    return best


def accuracy(results, lo: float | None, hi: float | None = None):
    sel = [x for x in results if lo is not None and x[3] >= lo and (hi is None or x[3] < hi)]
    if not sel:
        return 0, 0.0
    return len(sel), sum(t == p for _, t, p, _ in sel) / len(sel)


def is_pdf(r):
    return r['_file'].startswith('pdf-')


# ---------------------------------------------------------------- main

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--bank', default=DEFAULT_BANK)
    ap.add_argument('--dry-run', action='store_true', help='report only, do not write tags.json')
    ap.add_argument('--sample', type=int, default=0, help='print N random proposed tags for review')
    args = ap.parse_args()

    subjects = load_subjects()
    rows = load_bank(args.bank)
    tags: dict[str, dict] = {}
    report = []
    sample_pool = []

    for subject, topics in subjects.items():
        codes = code_map(topics)
        mine = [r for r in rows if r['subject'] == subject]
        tagged = [(r, r['topic']) for r in mine if r.get('topic') in topics]
        untagged = [r for r in mine if r.get('topic') not in topics]
        if not mine:
            continue
        lesson_docs = {tid: topic_text(subject, tid, t) for tid, t in topics.items()}

        # subtopic code agreement on tagged data (sanity check of rule 1)
        sub_ok = sum(subtopic_topic(r.get('subtopic'), codes) == t for r, t in tagged if subtopic_topic(r.get('subtopic'), codes))
        sub_n = sum(1 for r, _ in tagged if subtopic_topic(r.get('subtopic'), codes))

        cv = predictions(cross_validate(tagged, lesson_docs), WEIGHTS)
        top1 = sum(t == p for _, t, p, _ in cv) / len(cv)
        lines = [
            f"\n== {subject}: {len(mine)} questions, {len(tagged)} tagged, {len(untagged)} without a valid topic",
            f"   subtopic code -> topic agrees with existing tag: {sub_ok}/{sub_n}",
            f"   {FOLDS}-fold held-out top-1 accuracy, all tagged: {top1:.1%} (n={len(cv)})",
        ]
        # The 2024-25 PDF questions (whole multi-part questions, raw PDF text) behave
        # differently from the part-level bank questions, so each group gets
        # thresholds calibrated on its own held-out predictions.
        thresholds = {}
        for group in ('bank', 'pdf'):
            g = [x for x in cv if is_pdf(x[0]) == (group == 'pdf')]
            if not g:
                continue
            hi = threshold(g, HIGH_ACC)
            med = threshold(g, MEDIUM_ACC, below=hi) if hi is not None else threshold(g, MEDIUM_ACC)
            thresholds[group] = (hi, med)
            nh, ah = accuracy(g, hi)
            nm, am = accuracy(g, med, hi)
            g1 = sum(t == p for _, t, p, _ in g) / len(g)
            fmt = lambda v: 'none' if v is None else f'{v:.3f}'
            lines.append(
                f"   [{group}] held-out top-1 {g1:.1%} (n={len(g)}); margin thresholds high>={fmt(hi)} medium>={fmt(med)}; "
                f"held-out high: {nh} at {ah:.1%}, medium: {nm} at {am:.1%}"
            )

        model = Model(tagged, lesson_docs, *WEIGHTS)
        counts = collections.Counter()
        for r in untagged:
            key = f"{subject}/{r['id']}"
            t = subtopic_topic(r.get('subtopic'), codes)
            if t:
                tags[key] = {'topic': t, 'confidence': 'high'}
                counts['high (subtopic)'] += 1
                continue
            text = q_text(r)
            oos = OUT_OF_SYLLABUS.get(subject)
            if oos and oos.search(clean(text)):
                counts['untagged (out of syllabus)'] += 1
                continue
            if len({w for w in tokens(text) if '_' not in w}) < MIN_WORDS:
                counts['untagged (too little text)'] += 1
                continue
            hi, med = thresholds.get('pdf' if is_pdf(r) else 'bank', (None, None))
            p, margin = model.predict(text)
            if p and hi is not None and margin >= hi:
                conf = 'high'
            elif p and med is not None and margin >= med:
                conf = 'medium'
            else:
                counts['untagged'] += 1
                continue
            tags[key] = {'topic': p, 'confidence': conf}
            counts[conf] += 1
            sample_pool.append((subject, r, p, conf, margin))
        lines.append(f"   proposed for the {len(untagged)} untagged: {dict(counts)}")
        report.append('\n'.join(lines))

    print(''.join(report))
    dup_report(rows)

    if args.sample:
        rnd = random.Random(42)
        for subject, r, p, conf, margin in rnd.sample(sample_pool, min(args.sample, len(sample_pool))):
            prompt = re.sub(r'\s+', ' ', str(r.get('prompt') or ''))[:400]
            print(f"\n--- {subject}/{r['id']} -> {p} [{conf} {margin:.2f}]\n{prompt}")

    if not args.dry_run:
        out = os.path.join(args.bank, TAGS_FILE)
        with open(out, 'w', encoding='utf8', newline='\n') as fh:
            json.dump(dict(sorted(tags.items())), fh, ensure_ascii=False, indent=1)
            fh.write('\n')
        print(f"\nwrote {len(tags)} tags to {out}")


def norm_prompt(text: str) -> str:
    """Same normalisation as normalisePrompt() in src/lib/pastPapers.ts."""
    return re.sub(r'\s+', ' ', re.sub(r'[^0-9a-z]+', ' ', str(text or '').lower())).strip()


def dup_report(rows):
    print('\n== duplicates')
    by_slot = collections.defaultdict(set)
    for r in rows:
        if r.get('session') and r.get('number'):
            by_slot[(r['subject'], r['session'], str(r.get('paper')), str(r['number']))].add(r.get('level'))
    both = sum(1 for lv in by_slot.values() if {'SL', 'HL'} <= lv)
    print(f"   same subject+session+paper+number in both an SL and an HL file: {both} slots")
    by_text = collections.defaultdict(list)
    for r in rows:
        p = norm_prompt(r.get('prompt'))
        if len(p) >= 20:
            by_text[(r['subject'], p)].append(r)
    groups = [g for g in by_text.values() if len(g) > 1]
    print(f"   identical normalised prompt (any session): {len(groups)} groups, {sum(len(g) - 1 for g in groups)} extra copies")
    same = collections.Counter()
    for g in groups:
        for s, n in collections.Counter(r.get('session') for r in g).items():
            if n > 1:
                same[g[0]['subject']] += n - 1
    print(f"   identical prompt and same session: {dict(same)} -> {sum(same.values())} extra copies")
    # exactly the key dedupe() in src/lib/pastPapers.ts uses
    seen = set()
    exact = collections.Counter()
    for r in rows:
        p = norm_prompt(r.get('prompt'))
        if not p:
            continue
        k = (r['subject'], r.get('session') or '', p, norm_prompt(r.get('markscheme')))
        if k in seen:
            exact[r['subject']] += 1
        seen.add(k)
    print(f"   ...and identical markscheme too (dropped by the loader): {dict(exact)} -> {sum(exact.values())}")


if __name__ == '__main__':
    sys.exit(main())
