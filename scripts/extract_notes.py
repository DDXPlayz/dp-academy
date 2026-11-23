"""
Converts the private revision-note PDFs in resources/ into lesson Markdown
for local, personal use. Output goes to resources/extracted/ (git-ignored)
and is served only by the dev server; nothing here is committed or deployed.

    python -I scripts/extract_notes.py [--only physics|chemistry|math-aa] [--source sme|iitian]

Text becomes Markdown (headings, bullets, captions); diagrams and any
paragraph that contains mathematics are cropped from the page as images so
equations keep their exact layout.
"""
import argparse, csv, hashlib, io, json, os, re, sys, unicodedata
from collections import defaultdict

import fitz  # PyMuPDF

ROOT = os.getcwd()
RES = os.path.join(ROOT, 'resources')
OUT = os.path.join(RES, 'extracted')
SME_DIR = os.path.join(RES, 'SaveMyExams - Notes', 'home', 'ptib', 'SaveMyExams - Notes')
IIT_DIR = os.path.join(RES, 'IITian Academy Notes')
SME_FOLDERS = {'physics': 'Physics HL 2025', 'chemistry': 'Chemistry HL 2025', 'math-aa': 'Maths AA HL'}
SUBJECTS = {'Physics': 'physics', 'Chemistry': 'chemistry', 'Mathematics AA': 'math-aa'}
ZOOM = 2.0

MATH_FONT = re.compile(r'TimesNewRoman|Math_Font|Round_brac|Square_brac|Curly_brac|Cambria|STIX|MJX|KaTeX|Symbol|Vertical_bar|Integral|Sigma|Radical', re.I)
SUP = str.maketrans('0123456789+-−=()nixyabcdeghjklmoprstuvwz', '⁰¹²³⁴⁵⁶⁷⁸⁹⁺⁻⁻⁼⁽⁾ⁿⁱˣʸᵃᵇᶜᵈᵉᵍʰʲᵏˡᵐᵒᵖʳˢᵗᵘᵛʷᶻ')
SUB = str.maketrans('0123456789+-−=()aehijklmnoprstuvx', '₀₁₂₃₄₅₆₇₈₉₊₋₋₌₍₎ₐₑₕᵢⱼₖₗₘₙₒₚᵣₛₜᵤᵥₓ')
SUP_OK = set('0123456789+-−=()nixyabcdeghjklmoprstuvwz')
SUB_OK = set('0123456789+-−=()aehijklmnoprstuvx')


def slugify(s):
    s = unicodedata.normalize('NFKD', s).encode('ascii', 'ignore').decode()
    return re.sub(r'[^a-z0-9]+', '-', s.lower()).strip('-')[:60] or 'section'


def norm(s):
    return re.sub(r'[^a-z0-9]', '', s.lower().replace('&', 'and'))


# --------------------------------------------------------------------------- layout model
class Row:
    """Spans that share a visual line."""

    def __init__(self, span):
        self.spans = [span]
        self.y0, self.y1 = span['bbox'][1], span['bbox'][3]

    def overlaps(self, span):
        a0, a1 = span['bbox'][1], span['bbox'][3]
        inter = min(a1, self.y1) - max(a0, self.y0)
        return inter > 0.45 * min(a1 - a0, self.y1 - self.y0)

    def add(self, span):
        self.spans.append(span)
        self.y0, self.y1 = min(self.y0, span['bbox'][1]), max(self.y1, span['bbox'][3])

    def finish(self, body_size):
        self.spans.sort(key=lambda s: s['bbox'][0])
        self.x0 = min(s['bbox'][0] for s in self.spans)
        self.x1 = max(s['bbox'][2] for s in self.spans)
        main = max(self.spans, key=lambda s: len(s['text'].strip()) * s['size'])
        self.size = round(main['size'], 1)
        self.font = main['font']
        self.math = False
        self.bold = all(('Bold' in s['font'] or s['flags'] & 16) for s in self.spans if s['text'].strip())
        base = max(s['bbox'][3] for s in self.spans if abs(s['size'] - self.size) < 0.6) if self.spans else self.y1
        parts = []
        for s in self.spans:
            t = s['text']
            if not t.strip():
                parts.append(' ' if parts and not parts[-1].endswith(' ') else '')
                continue
            if MATH_FONT.search(s['font']):
                self.math = True
            small = s['size'] < 0.8 * self.size
            if small:
                raised = s['bbox'][3] < base - 1.5
                chars = set(t.strip())
                if raised and chars <= SUP_OK:
                    parts.append(t.strip().translate(SUP)); continue
                if not raised and chars <= SUB_OK:
                    parts.append(t.strip().translate(SUB)); continue
                self.math = True
            parts.append(t)
        self.text = re.sub(r'\s+', ' ', ''.join(parts)).strip()
        return self

    @property
    def bbox(self):
        return fitz.Rect(self.x0, self.y0, self.x1, self.y1)


def rows_of(page, clip, body_size_hint=None, skip=lambda s: False):
    spans = []
    for b in page.get_text('dict', clip=clip)['blocks']:
        if b['type'] != 0:
            continue
        for l in b['lines']:
            for s in l['spans']:
                if s['text'].strip() and fitz.Rect(s['bbox']).intersects(clip) and not skip(s):
                    spans.append(s)
    spans.sort(key=lambda s: ((s['bbox'][1] + s['bbox'][3]) / 2, s['bbox'][0]))
    rows = []
    for s in spans:
        for r in reversed(rows[-4:]):
            if r.overlaps(s):
                r.add(s)
                break
        else:
            rows.append(Row(s))
    rows = [r.finish(body_size_hint) for r in rows]
    rows.sort(key=lambda r: (r.y0, r.x0))
    return rows


def bullet_marks(page, clip):
    """Small filled shapes (list bullets) as (x, y-centre)."""
    out = []
    for d in page.get_drawings():
        r = d['rect']
        if r.width <= 6.5 and r.height <= 6.5 and d.get('fill') is not None and clip.contains(r):
            out.append((r.x0, (r.y0 + r.y1) / 2))
    return out


class Writer:
    """Accumulates Markdown and image crops for one lesson."""

    def __init__(self, img_dir, rel_prefix):
        self.lines, self.img_dir, self.rel = [], img_dir, rel_prefix
        self.seen_img = set()
        self.in_list = None  # current list depth, None outside a list

    def crop(self, page, rect, kind):
        rect = fitz.Rect(rect) & page.rect
        if rect.is_empty or rect.width < 4 or rect.height < 4:
            return None
        pix = page.get_pixmap(matrix=fitz.Matrix(ZOOM, ZOOM), clip=rect, alpha=False)
        data = pix.tobytes('png')
        h = hashlib.md5(data).hexdigest()[:16]
        name = f'{kind}-{h}.png'
        os.makedirs(self.img_dir, exist_ok=True)
        path = os.path.join(self.img_dir, name)
        if not os.path.exists(path):
            with open(path, 'wb') as fh:
                fh.write(data)
        # Display width in CSS px ≈ PDF points × 1.35 (lesson text is larger than the PDF's).
        return f'{self.rel}/{name}', round(rect.width * 1.35)

    def image(self, page, rect, kind='fig', prefix=''):
        got = self.crop(page, rect, kind)
        if got:
            src, w = got
            self.lines.append(f'{prefix}![{kind}]({src}#w={w})')
            if not prefix:
                self.lines.append('')

    def add(self, s=''):
        self.lines.append(s)

    def text(self):
        md = '\n'.join(self.lines)
        md = re.sub(r'\n{3,}', '\n\n', md)
        return postprocess(md).strip() + '\n'


HEAD = re.compile(r'^(#{2,4}) (.+)$')
EXAMPLE = re.compile(r'^(▶️\s*)?(worked example|example)\b', re.I)
ANSWER_HEAD = re.compile(r'answer\s*/\s*explanation|^answer:?$|^solution:?$', re.I)
TIP = re.compile(r'^(examiner|exam) tip', re.I)


def postprocess(md):
    """Blank lines around lists, duplicate headings removed, worked examples and exam tips as blocks."""
    out, prev_list, prev_head = [], False, None
    for line in md.split('\n'):
        is_list = bool(re.match(r'^\s*- ', line))
        h = HEAD.match(line)
        if h:
            key = norm(h.group(2))
            if key == prev_head:
                continue
            prev_head = key
        elif line.strip():
            prev_head = None
        if line.strip() and not is_list and prev_list and not line.startswith('  ') and not line.startswith('```'):
            out.append('')
        out.append(line)
        if line.strip():
            prev_list = is_list
    lines = out

    res, i = [], 0
    while i < len(lines):
        h = HEAD.match(lines[i])
        if h and EXAMPLE.match(h.group(2)):
            level = len(h.group(1))
            q, a, j, in_answer = [], [], i + 1, False
            while j < len(lines):
                if lines[j].startswith('```'):
                    break  # an existing block (exam tip, earlier example) ends this one
                hj = HEAD.match(lines[j])
                if hj and ANSWER_HEAD.search(hj.group(2)):
                    in_answer = True; j += 1; continue
                if hj and (len(hj.group(1)) <= level or EXAMPLE.match(hj.group(2)) or TIP.match(hj.group(2))) and not ANSWER_HEAD.search(hj.group(2)):
                    break
                mid = re.search(r'\s(Answer|Solution)\s*:\s*', lines[j]) if not in_answer else None
                if mid and not re.match(r'^\s*(answer|solution)\s*:', lines[j], re.I):
                    q.append(lines[j][:mid.start()])
                    rest = lines[j][mid.end():]
                    if rest.strip():
                        a.append(rest)
                    in_answer = True; j += 1; continue
                if not in_answer and re.match(r'^\s*(answer|solution)\s*:', lines[j], re.I):
                    in_answer = True
                    rest = re.sub(r'^\s*(answer|solution)\s*:\s*', '', lines[j], flags=re.I)
                    if rest.strip():
                        a.append(rest)
                    j += 1; continue
                (a if in_answer else q).append(lines[j])
                j += 1
            if a and ''.join(q).strip():
                res += ['```example', '\n'.join(q).strip(), '---', '\n'.join(a).strip(), '```', '']
                i = j
                continue
        if h and TIP.match(h.group(2)):
            body, j = [], i + 1
            while j < len(lines) and not HEAD.match(lines[j]) and not lines[j].startswith('```'):
                body.append(lines[j]); j += 1
            if ''.join(body).strip():
                res += ['```examtip', '\n'.join(body).strip(), '```', '']
                i = j
                continue
        res.append(lines[i])
        i += 1
    return re.sub(r'\n{3,}', '\n\n', '\n'.join(res))


def items_from_rows(rows, bullets, figures):
    """Groups rows into paragraphs/bullets; returns ordered items (rows, figures)."""
    events = [('fig', f.y0, f) for f in figures] + [('row', r.y0, r) for r in rows]
    events.sort(key=lambda e: (e[1], 0 if e[0] == 'fig' else 1))
    items, cur = [], None
    for kind, _, obj in events:
        if kind == 'fig':
            cur = None
            items.append({'type': 'fig', 'rect': obj})
            continue
        r = obj
        if any(f.contains(fitz.Point((r.x0 + r.x1) / 2, (r.y0 + r.y1) / 2)) for f in figures):
            continue  # label inside a figure
        is_bullet = any(abs(by - (r.y0 + r.y1) / 2) < 5 and 0 < r.x0 - bx < 18 for bx, by in bullets) or r.text[:1] in '•◦▪–'
        cont = (cur is not None and not is_bullet and abs(r.x0 - cur['x0']) < 4 and r.y0 - cur['y1'] < 0.9 * (r.y1 - r.y0) + 6
                and abs(r.size - cur['size']) < 0.6 and not cur.get('heading'))
        if cont:
            cur['rows'].append(r)
            cur['y1'] = r.y1
            continue
        cur = {'type': 'para', 'rows': [r], 'x0': r.x0, 'y1': r.y1, 'size': r.size, 'bullet': is_bullet}
        items.append(cur)
    return items


def emit_items(w, page, items, classify, levels, base):
    """Writes items as Markdown. List depth only grows one level at a time, and an
    un-bulleted line indented like list text continues the current bullet."""
    for it in items:
        if it['type'] == 'fig':
            w.in_list = None
            w.add('')
            w.image(page, it['rect'], 'fig')
            continue
        rows = it['rows']
        kind = classify(rows[0], it)
        text = ' '.join(r.text for r in rows).strip()
        text = re.sub(r'^[•◦▪]\s*', '', text)
        has_math = any(r.math for r in rows)
        if kind in ('h2', 'h3', 'h4'):
            w.in_list = None
            if has_math:
                w.add(''); w.image(page, union(rows), 'math')
            else:
                w.add(''); w.add({'h2': '## ', 'h3': '### ', 'h4': '#### '}[kind] + md_escape(text)); w.add('')
            continue
        if kind == 'caption':
            w.in_list = None
            w.add(''); w.add(f'*{md_escape(text)}*'); w.add(''); continue
        if it['bullet']:
            level = levels(it['x0'])
            level = 0 if w.in_list is None else min(level, w.in_list + 1)
            w.in_list = level
            prefix = '  ' * level + '- '
        elif w.in_list is not None and it['x0'] > base + 10:
            level = min(levels(it['x0']), w.in_list)
            prefix = '  ' * level + '  '
        else:
            w.in_list = None
            prefix = ''
        if has_math:
            w.image(page, union(rows), 'math', prefix=prefix)
        else:
            w.add(prefix + md_escape(text))
        if not prefix:
            w.add('')


def union(rows):
    r = fitz.Rect(rows[0].bbox)
    for x in rows[1:]:
        r |= x.bbox
    return fitz.Rect(r.x0 - 2, r.y0 - 3, r.x1 + 3, r.y1 + 3)


def md_escape(t):
    t = t.replace('\\', '\\\\').replace('$', '\\$').replace('*', '\\*').replace('_', '\\_')
    return re.sub(r'^(\d+)\. ', r'\1\\. ', t)


def figure_rects(page, clip, min_size=24):
    rects = []
    for b in page.get_text('dict', clip=clip)['blocks']:
        if b['type'] == 1:
            r = fitz.Rect(b['bbox']) & clip
            if r.width >= min_size and r.height >= min_size:
                rects.append(r)
    # merge overlapping
    merged = []
    for r in sorted(rects, key=lambda r: r.y0):
        for m in merged:
            if m.intersects(r):
                m |= r
                break
        else:
            merged.append(fitz.Rect(r))
    return merged


# --------------------------------------------------------------------------- Save My Exams
SME_CLIP = fitz.Rect(10, 96, 506, 708)


def sme_levels(x0):
    return max(0, min(3, round((x0 - 36) / 18)))


def sme_classify(row, it):
    if row.size >= 12.8:
        return 'h2'
    if row.size >= 10.9:
        return 'h3'
    if row.size >= 9.8:
        return 'h4' if row.x0 < 40 else 'caption'
    return 'para'


def extract_sme(path, subject, out_dir, rel_root):
    """Returns lessons: [{title, sme_code, md, images}] split at section banners."""
    doc = fitz.open(path)
    lessons, w, title = [], None, None
    for pno in range(1, doc.page_count):
        page = doc[pno]
        rows = rows_of(page, SME_CLIP)
        if not rows:
            continue
        # A section banner sits at the very top of a page (x≈27, large).
        banner = next((r for r in rows if r.size >= 12.8 and 22 <= r.x0 <= 34 and r.y0 < 140), None)
        if banner:
            title = banner.text
            slug = slugify(re.sub(r'^\d+(\.\d+)*\s*', '', title))
            w = Writer(os.path.join(out_dir, 'img'), 'img')
            lessons.append({'title': title, 'slug': slug, 'writer': w})
            rows = [r for r in rows if r is not banner]
            # the page repeats the title as an h2 straight after the banner
            if rows and norm(rows[0].text) and norm(rows[0].text) in norm(title):
                rows = rows[1:]
        if w is None:
            continue
        figs = figure_rects(page, SME_CLIP)
        items = items_from_rows(rows, bullet_marks(page, SME_CLIP), figs)
        emit_items(w, page, items, sme_classify, sme_levels, 18)
    return lessons


# --------------------------------------------------------------------------- IITian Academy
def iit_footer_y(page):
    tiles = [b for b in page.get_text('dict')['blocks'] if b['type'] == 1 and 100 < b['bbox'][2] - b['bbox'][0] < 120]
    return min((b['bbox'][1] for b in tiles), default=None) if len(tiles) >= 10 else None


def extract_iitian(path, out_dir):
    doc = fitz.open(path)
    w = Writer(os.path.join(out_dir, 'img'), 'img')
    started, ended = False, False
    body = 12.0
    for pno in range(doc.page_count):
        if ended:
            break
        page = doc[pno]
        clip = fitz.Rect(20, 0, page.rect.width - 20, page.rect.height)
        fy = iit_footer_y(page)
        if fy is not None:
            clip.y1 = fy
            ended = True
        rows = rows_of(page, clip)
        if not started:
            # Skip the page header, promo links and "All Topics" list on the first page.
            idx = max((i for i, r in enumerate(rows) if re.search(r'All Topics|Paper 2$|^Paper 2|Syllabus$', r.text)), default=None)
            if idx is None:
                idx = max((i for i, r in enumerate(rows) if r.size >= 20), default=-1)
            rows = rows[idx + 1:]
            rows = [r for r in rows if r.y0 > 100 or pno > 0]
            if not rows:
                continue
            started = True
            clip.y0 = rows[0].y0 - 4
        for r in rows:
            # MathJax glyphs are Type3 fonts at sizes other than the 12pt body text.
            for s in r.spans:
                if s['font'].startswith('Type3') and abs(s['size'] - body) > 0.8 and s['text'].strip():
                    r.math = True
        figs = [f for f in figure_rects(page, clip, 30) if f.width < page.rect.width - 60 or f.height > 60]
        items = items_from_rows(rows, bullet_marks(page, clip), figs)

        def classify(row, it):
            if row.size >= 13 and not row.math:
                return 'h2'
            if len(it['rows']) == 1 and row.font.startswith('Type3') and abs(row.size - body) < 0.8 and len(row.text) < 90 and not row.math:
                return 'h3'
            if row.bold and len(row.text) < 60:
                return 'h4'
            return 'para'

        emit_items(w, page, items, classify, lambda x0: max(0, min(3, round((x0 - 68) / 30))), 38)
    return w


# --------------------------------------------------------------------------- topic mapping
def load_topics():
    out = {}
    for s in ('physics', 'chemistry', 'math-aa'):
        j = json.load(open(os.path.join(ROOT, 'content', s, 'subject.json'), encoding='utf-8'))
        out[s] = {t['code']: t for u in j['units'] for t in u['topics']}
    return out


TITLE_ALIASES = {'motioninelectromagneticfields': 'D.3', 'structureoftheatom': 'E.1', 'electronicconfigurations': 'S1.3'}


def sme_topic_for(subject, filename, topics):
    n = norm(os.path.splitext(filename)[0])
    if n in TITLE_ALIASES:
        return topics[TITLE_ALIASES[n]]
    for t in topics.values():
        tn = norm(t['title'])
        if n == tn or (len(n) > 6 and (n in tn or tn in n)):
            return t
    return None


MATH_MAP_FILE = os.path.join(RES, 'structure', 'sme_math_sections.json')  # SME section → guide subtopic (private)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--only')
    ap.add_argument('--source')
    ap.add_argument('--repost', action='store_true', help='re-apply Markdown post-processing to lessons already extracted')
    args = ap.parse_args()
    if args.repost:
        n = 0
        for subject in os.listdir(OUT):
            sdir = os.path.join(OUT, subject)
            if not os.path.isdir(sdir) or subject == 'logs':
                continue
            for topic in os.listdir(sdir):
                if topic.startswith('_'):
                    continue
                for f in glob_md(os.path.join(sdir, topic)):
                    md = open(f, encoding='utf-8').read()
                    new = postprocess(md).strip() + '\n'
                    if new != md:
                        open(f, 'w', encoding='utf-8').write(new)
                        n += 1
        print('reposted', n, 'lessons')
        return
    topics = load_topics()
    # Each run writes its own index file (index-<subject>-<source>.json) so runs can go in parallel;
    # the dev server merges them.
    index_path = os.path.join(OUT, f"index-{args.only or 'all'}-{args.source or 'all'}.json")
    index = {}
    math_map = json.load(open(MATH_MAP_FILE, encoding='utf-8')) if os.path.exists(MATH_MAP_FILE) else {}
    unplaced = []

    def put(subject, topic_id, entry):
        lst = index.setdefault(subject, {}).setdefault(topic_id, [])
        lst[:] = [e for e in lst if e['file'] != entry['file']]
        lst.append(entry)

    subjects = [args.only] if args.only else ['physics', 'chemistry', 'math-aa']
    for subject in subjects:
        # reset this subject's entries for the sources being rebuilt
        for tid, lst in index.get(subject, {}).items():
            lst[:] = [e for e in lst if args.source and e['source'] != args.source]

        if args.source in (None, 'sme'):
            folder = os.path.join(SME_DIR, SME_FOLDERS[subject])
            for dp, _, files in os.walk(folder):
                for f in sorted(files):
                    if not f.endswith('.pdf'):
                        continue
                    path = os.path.join(dp, f)
                    topic = None if subject == 'math-aa' else sme_topic_for(subject, f, topics[subject])
                    if subject != 'math-aa' and not topic:
                        unplaced.append(f'sme {subject}: {f}')
                        continue
                    stem = slugify(os.path.splitext(f)[0])
                    tmp_dir = os.path.join(OUT, subject, '_sme', stem)
                    lessons = extract_sme(path, subject, tmp_dir, 'img')
                    for order, les in enumerate(lessons):
                        tgt = topic
                        if subject == 'math-aa':
                            code = re.match(r'^(\d+\.\d+\.\d+)', les['title'])
                            ib = math_map.get(code.group(1) if code else les['title'])
                            tgt = topics[subject].get(ib) if ib else None
                            if not tgt:
                                unplaced.append(f"sme math: {les['title']}")
                                continue
                        tdir = os.path.join(OUT, subject, tgt['id'])
                        rel = f"sme-{stem}-{order + 1:02d}-{les['slug']}"
                        md = les['writer'].text().replace('](img/', f'](../_sme/{stem}/img/')
                        os.makedirs(tdir, exist_ok=True)
                        with open(os.path.join(tdir, rel + '.md'), 'w', encoding='utf-8') as fh:
                            fh.write(md)
                        title = re.sub(r'^\d+(\.\d+)+\s*', '', les['title'])
                        put(subject, tgt['id'], {'file': f'{tgt["id"]}/{rel}.md', 'slug': rel, 'title': title, 'source': 'sme',
                                                 'order': order, 'group': stem, 'chars': len(md)})
                    print(f'sme {subject}: {f} -> {len(lessons)} sections', flush=True)

        if args.source in (None, 'iitian'):
            rows = list(csv.DictReader(open(os.path.join(IIT_DIR, 'notes_index.csv'), encoding='utf-8-sig')))
            seen = set()
            for r in rows:
                if SUBJECTS.get(r['Subject']) != subject or 'Legacy' in r['Syllabus version'] or 'Unclear' in r['Syllabus version']:
                    continue
                f = r['Local file'].replace('\\', '/')
                if f in seen:
                    continue
                seen.add(f)
                code = (r['Subtopic'] or '').split(' ')[0]
                if subject == 'math-aa' and 'operations-with-numbers-in-the-form-a-x-10k' in f:
                    code = '1.1'
                topic = topics[subject].get(code)
                if not topic:
                    unplaced.append(f'iitian {subject}: {f}')
                    continue
                name = os.path.basename(f)[:-4].split(' - ', 1)[-1]
                slug_name = slugify(name)
                m = re.search(r'(?:^|-)' + re.escape(code.lower().replace('.', '-')) + r'-(\d+)(?=-)', name) or re.search(r'slhl-\d+-(\d+)-', name)
                sub = int(m.group(1)) if m else None
                tdir = os.path.join(OUT, subject, topic['id'])
                rel = f'iitian-{slug_name}'
                w = extract_iitian(os.path.join(IIT_DIR, f), os.path.join(OUT, subject, '_iitian', slug_name))
                md = w.text().replace('](img/', f'](../_iitian/{slug_name}/img/')
                os.makedirs(tdir, exist_ok=True)
                with open(os.path.join(tdir, rel + '.md'), 'w', encoding='utf-8') as fh:
                    fh.write(md)
                title = title_from(name, code, topic['title'])
                put(subject, topic['id'], {'file': f'{topic["id"]}/{rel}.md', 'slug': rel, 'title': title, 'source': 'iitian',
                                           'order': sub if sub is not None else -1, 'group': 'iitian', 'chars': len(md)})
            print(f'iitian {subject}: done', flush=True)

    for subject, tmap in index.items():
        for lst in tmap.values():
            lst.sort(key=lambda e: (0 if e['source'] == 'sme' else 1, e['group'], e['order'], e['title']))
    os.makedirs(OUT, exist_ok=True)
    json.dump(index, open(index_path, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    json.dump(unplaced, open(index_path.replace('index-', 'unplaced-'), 'w', encoding='utf-8'), indent=1)
    print('unplaced:', len(unplaced))


def glob_md(d):
    return [os.path.join(d, f) for f in os.listdir(d) if f.endswith('.md')] if os.path.isdir(d) else []


NOISE = {'ib', 'dp', 'ibdp', 'chemistry', 'physics', 'math', 'maths', 'mathematics', 'aa', 'hl', 'sl', 'slhl', 'ahl', 'topic', 'unit',
         'study', 'notes', 'note', 'new', 'syllabus', 'first', 'assessment', '2025'}


def title_from(name, code, topic_title):
    words = re.sub(r'([a-z]{3,})(\d)', r'\1 \2', name.lower()).replace('-', ' ').split()
    cs = code.lower().replace('.', ' ').split()
    while words and (words[0] in NOISE or words[0].isdigit() or words[0] in cs or re.fullmatch(r'[a-z]\d?', words[0])):
        words.pop(0)
    while words and (words[-1] in NOISE or words[-1].isdigit()):
        words.pop()
    t = ' '.join(words)
    if not t or norm(t) == norm(topic_title):
        return f'{topic_title}: overview'
    return t[0].upper() + t[1:]


if __name__ == '__main__':
    main()
