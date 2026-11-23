"""
Converts a locally saved copy of the StudyIB (InThinking) revision site in
resources/StudyIB/ into lessons and practice questions for local, personal use.

    python -I -X utf8 scripts/extract_studyib.py

Notes pages  → resources/extracted/<subject>/<topic>/studyib-<slug>.md (+ index-<subject>-studyib.json)
Quiz pages   → resources/question-bank/studyib-<subject>.json (source "mock")
Everything written is git-ignored and served only by the dev server.
"""
import hashlib, html, json, os, re, shutil, sys

sys.path.insert(0, os.path.dirname(__file__))
from import_questionbank import ToMarkdown  # noqa: E402

ROOT = os.getcwd()
SITE = os.path.join(ROOT, 'resources', 'StudyIB', 'StudyIB')
OUT = os.path.join(ROOT, 'resources', 'extracted')
BANK = os.path.join(ROOT, 'resources', 'question-bank')
FOLDERS = {'math-aa': 'mathsanalysis', 'physics': 'physics', 'chemistry': 'chemistry'}

# page slug → guide code (pages not listed are index, admin or out-of-syllabus pages)
PAGES = {
    'math-aa': {
        '1-over-function': '2.16', '3-dimensional-solids': '3.1', 'absolute-functions': '2.16', 'area-between-graphs-hl': '5.17',
        'area-between-graphs-sl': '5.11', 'arithmetic-sequences': '1.2', 'binomial-distribution': '4.8', 'binomial-theorem-hl': '1.10',
        'binomial-theorem-sl': '1.9', 'chain-rule': '5.6', 'combinations-and-permutations': '1.10', 'complex-numbers-de-moivres-theorem': '1.14',
        'complex-numbers-roots-of-polynomials': '1.14', 'complex-numbers-the-basics': '1.12', 'compound-angle-formulae': '3.10',
        'conditional-probability': '4.11', 'continuous-random-variables': '4.14', 'counting-principles': '1.10', 'deductive-proofs': '1.6',
        'definite-integration': '5.11', 'differential-equations-homogeneous': '5.18', 'differential-equations-integrating-factor': '5.18',
        'differential-equations-separable-variables': '5.18', 'discrete-random-variables': '4.7', 'double-angle-formulae-hl': '3.6',
        'double-angle-formulae-sl': '3.6', 'equation-of-a-line': '3.14', 'equation-of-a-straight-line': '2.1', 'equation-of-tangent-and-normal': '5.4',
        'equations-of-planes': '3.17', 'factor-and-remainder-theorem': '2.12', 'functions-the-basics': '2.2', 'geometric-sequences': '1.3',
        'graphs-and-derivatives': '5.2', 'graphs-of-implicit-equations': '5.14', 'hl-mixed-differentiation': '5.15', 'horizontal-stretch': '2.11',
        'implicit-differentiation': '5.14', 'indices-and-logarithms': '1.7', 'integration-by-parts': '5.16', 'integration-by-substitution-hl': '5.16',
        'integration-by-substitution-sl': '5.10', 'integration-by-substitution': '5.16', 'intersection-of-line-and-plane': '3.18',
        'intersection-of-lines': '3.15', 'intersection-of-planes': '3.18', 'introducing-derivatives': '5.1', 'kinematics': '5.9',
        'lhopitals-rule': '5.13', 'linear-correlation': '4.4', 'mixed-integration': '5.10', 'normal-distribution': '4.9', 'optimisation': '5.8',
        'probability-calculations': '4.5', 'product-and-quotient-rule': '5.6', 'proof-by-contradiction': '1.15', 'proof-by-induction': '1.15',
        'pythagorean-identities-hl': '3.9', 'pythagorean-identity-sl': '3.6', 'quadratics': '2.6', 'radians-arcs-and-sectors': '3.4',
        'rational-functions-hl': '2.13', 'rational-functions-sl': '2.8', 'related-rates-of-change': '5.14', 'representing-and-measuring-data': '4.2',
        'right-angled-trigonometry': '3.2', 'scalar-product-and-angles-': '3.13', 'sine-and-cosine-rule': '3.2', 'sl-mixed-differentiation': '5.6',
        'solving-trigonometric-equations': '3.8', 'sums-and-products-of-roots': '2.12', 'transforming-functions-hl': '2.16',
        'transforming-functions-sl': '2.11', 'translations-': '2.11', 'translations': '2.11', 'trigonometric-graphs': '3.7', 'unit-circle-hl': '3.5',
        'unit-circle': '3.5', 'unit-circlesl': '3.5', 'vector-product': '3.16', 'vectors-and-angles': '3.12', 'volume-of-revolution': '5.17',
    },
    'physics': {
        **{k: 'A.1' for k in ['kinematics', 'acceleration-due-to-gravity', 'acceleration-due-to-gravity-free-fall', 'distance-and-displacement',
                              'equations-of-uniformly-accelerated-motion', 'suvat', 'velocity-and-speed', 'linear-acceleration', 'projectile-motion']},
        **{k: 'A.2' for k in ['forces', 'balancing-forces', 'examples-of-forces', 'newtons-second-law', 'newtons-third-law', 'inertia-momentum-and-impulse',
                              'conservation-of-momentum', 'collisions', 'circular-motion', 'centripetal-force', 'examples-of-circular-motion', 'friction-is-good']},
        **{k: 'A.3' for k in ['force-vs-displacement-graphs', 'work-and-energy', 'kinetic-energy', 'potential-energy', 'power', 'work-done', 'conservation-of-energy']},
        **{k: 'A.4' for k in ['rotational-dynamics', 'torque-and-moment-of-inertia', 'equilibrium-and-angular-acceleration', 'angular-momentum-and-rotational-kinetic-energy']},
        **{k: 'B.1' for k in ['thermal-concepts', 'temperature-and-heat', 'heat-transfer', 'latent-heat']},
        **{k: 'B.2' for k in ['global-thermal-energy-transfer', 'energy-to-the-earth', 'energy-from-the-sun']},
        **{k: 'B.3' for k in ['particle-model-kinetic-theory', 'modelling-gases', 'boyles-law', 'charles-law', 'pressure-law', 'ideal-gas-equation']},
        **{k: 'B.4' for k in ['first-law', 'second-law', 'cyclic-processes', 'processes']},
        **{k: 'B.5' for k in ['current', 'charge', 'electric-circuits', 'electrical-power', 'potential-difference', 'resistance', 'resistivity', 'ohms-law',
                              'series-resistors', 'parallel-resistors', 'iv-graphs', 'kirchhoffs-laws', 'internal-resistance', 'electromotive-force-emf',
                              'potential-divider', 'ammeters-and-voltmeters']},
        **{k: 'C.1' for k in ['oscillations', 'simple-harmonic-motion', 'equations-for-shm', 'shm-and-energy', 'mass-on-a-spring', 'simple-pendulum', 'phase']},
        **{k: 'C.2' for k in ['introduction-to-waves', 'graphical-representation-of-waves', 'sound', 'light']},
        **{k: 'C.3' for k in ['intensity', 'wave-phenomena', 'single-slit-diffraction', 'multiple-slit-interference', 'why-two-lamps-dont-interfere',
                              'thin-film-interference', 'resolution', 'ahl-waves']},
        **{k: 'C.4' for k in ['standing-waves-on-a-string', 'ahl-damped-and-driven-oscillations']},
        'doppler-effect': 'C.5',
        **{k: 'D.1' for k in ['gravitation', 'gravity', 'newtons-law-of-gravitation', 'orbits', 'ahl-gravitational-fields', 'circular-motion-and-gravity']},
        **{k: 'D.2' for k in ['electric-fields', 'electric-field-lines', 'coulombs-law-and-field-strength', 'ahl-electric-fields', 'magnetic-fields', 'magnets',
                              'electromagnets', 'uniform-fields']},
        **{k: 'D.3' for k in ['force-on-a-current-carrying-conductor', 'moving-charges-in-a-magnetic-field']},
        **{k: 'D.4' for k in ['faradays-law', 'lenzs-law', 'ahl-em-induction', 'ac-generators', 'transformers']},
        **{k: 'E.1' for k in ['atomic-model', 'atomic-models', 'rutherford-model', 'electron-energy-levels', 'spectra', 'structure-of-matter', 'ahl-nuclear-radius']},
        **{k: 'E.2' for k in ['photoelectric-effect-and-photons', 'wave-particle-duality', 'ahl-quantum']},
        **{k: 'E.3' for k in ['radioactivity', 'nuclear-physics', 'nuclear-stability-and-binding-energy', 'ahl-nuclear-decay']},
        **{k: 'E.4' for k in ['fission', 'nuclear-power', 'nuclear-power-i', 'nuclear-power-ii', 'power-stations', 'energy-sources']},
        **{k: 'E.5' for k in ['fusion', 'stellar-characteristics', 'stellar-evolution', 'stellar-quantities', 'objects-in-the-universe', 'ahl-stellar-processes']},
    },
    'chemistry': {
        'particulate-matter-and-chemical-change': 'S1.1', 'the-mole-concept': 'S1.4', 'reacting-masses-and-volumes': 'R2.1', 'the-nuclear-atom': 'S1.2',
        'electron-configuration': 'S1.3', 'electrons-in-atoms': 'S1.3', 'periodic-table': 'S3.1', 'periodic-trends': 'S3.1',
        'first-row-d-block-elements': 'S3.1', 'coloured-complexes': 'S3.1', 'ionic-bonding-and-structure': 'S2.1', 'covalent-bonding': 'S2.2',
        'covalent-structure': 'S2.2', 'intermolecular-forces': 'S2.2', 'further-covalent-bonding-and-structure': 'S2.2', 'hybridization': 'S2.2',
        'metallic-bonding': 'S2.3', 'measuring-energy-changes': 'R1.1', 'hesss-law': 'R1.2', 'bond-enthalpies': 'R1.2', 'energy-cycles': 'R1.2',
        'entropy-and-spontaneity': 'R1.4', 'collision-theory-and-rates-of-reaction': 'R2.2', 'rate-expression-and-reaction-mechanism': 'R2.2',
        'activation-energy': 'R2.2', 'the-equilibrium-law': 'R2.3', 'equilibrium': 'R2.3', 'theories-and-properties-of-acids-and-bases': 'R3.1',
        'ph-strong-and-weak-acids-and-acid-deposition': 'R3.1', 'calculations-involving-acids-and-bases': 'R3.1',
        'lewis-acids-and-bases-and-ph-curves': 'R3.1', 'oxidation-and-reduction': 'R3.2', 'electrochemical-cells-i': 'R3.2',
        'electrochemical-cells-ii': 'R3.2', 'fundamentals-of-organic-chemistry': 'S3.2', 'functional-group-chemistry': 'R3.4',
        'types-of-organic-reactions-and-synthetic-routes': 'R3.4', 'stereoisomerism': 'S3.2', 'spectroscopic-identification-i': 'S3.2',
        'spectroscopic-identification-ii': 'S3.2',
    },
}
# Chemistry question pages ("<topic>-core-sl-hl-paper-1-questions") → guide code
CHEM_QUESTION_TOPICS = {
    'stoichiometry': 'S1.4', 'atomic-structure': 'S1.3', 'periodicity': 'S3.1', 'bonding-and-structure': 'S2.2', 'bonding-structure': 'S2.2',
    'energetics': 'R1.2', 'kinetics': 'R2.2', 'equilibrium': 'R2.3', 'acids-and-bases': 'R3.1', 'redox': 'R3.2', 'organic-chemistry': 'R3.4',
    'measurement': None,
}

MATH_TEX = re.compile(r'<span class="math-tex">\s*(\\\(|\\\[)(.*?)(\\\)|\\\])\s*</span>', re.S)
BARE_TEX = re.compile(r'(\\\(|\\\[)(.*?)(\\\)|\\\])', re.S)


def balanced(html_text, start):
    """Inner HTML of the <div> that opens at index `start`."""
    i = html_text.index('>', start) + 1
    depth = 1
    for t in re.finditer(r'<(/?)div\b', html_text[i:]):
        depth += -1 if t.group(1) else 1
        if depth == 0:
            return html_text[i:i + t.start()], i + t.end()
    return html_text[i:], len(html_text)


def div_blocks(html_text, cls):
    out, pos = [], 0
    pat = re.compile(r'<div class="' + re.escape(cls) + r'[" ]')
    while True:
        m = pat.search(html_text, pos)
        if not m:
            return out
        inner, end = balanced(html_text, m.start())
        out.append(inner)
        pos = end


class Converter:
    def __init__(self, subject, page_path, img_dir=None, img_prefix='../_studyib/img/'):
        self.subject, self.page_path = subject, page_path
        self.img_dir = img_dir or os.path.join(OUT, subject, '_studyib', 'img')
        self.img_prefix = img_prefix
        self.maths = []

    def protect_math(self, h):
        def keep(m):
            latex = re.sub(r'\\(large|Large|displaystyle)\b', '', html.unescape(m.group(2))).strip()
            block = m.group(1) == '\\['
            self.maths.append((latex, block))
            return f'⟦M{len(self.maths) - 1}⟧'
        h = MATH_TEX.sub(keep, h)
        return BARE_TEX.sub(keep, h)

    def restore_math(self, md):
        def put(m):
            latex, block = self.maths[int(m.group(1))]
            return f'\n\n$$\n{latex}\n$$\n\n' if block else f'${latex}$'
        return re.sub(r'⟦M(\d+)⟧', put, md)

    def localise_images(self, h):
        def img(m):
            src = html.unescape(m.group(1))
            if src.startswith(('http:', 'https:', 'data:')):
                return ''
            path = os.path.normpath(os.path.join(os.path.dirname(self.page_path), src.split('?')[0]))
            if not os.path.isfile(path) or not path.startswith(SITE):
                return ''
            ext = os.path.splitext(path)[1].lower()
            if ext not in ('.png', '.jpg', '.jpeg', '.gif', '.svg'):
                return ''
            name = hashlib.md5(open(path, 'rb').read()).hexdigest()[:16] + ext
            os.makedirs(self.img_dir, exist_ok=True)
            dst = os.path.join(self.img_dir, name)
            if not os.path.exists(dst):
                shutil.copyfile(path, dst)
            return f'<img src="{self.img_prefix}{name}">'
        return re.sub(r'<img[^>]*?src="([^"]+)"[^>]*>', img, h)

    def md(self, fragment):
        # embedded videos become links (the player itself can't be kept offline)
        fragment = re.sub(r'<iframe[^>]*src="((?:https?:)?//(?:www\.)?(?:youtube(?:-nocookie)?\.com|youtu\.be|player\.vimeo\.com)[^"]*)"[^>]*>.*?</iframe>',
                          lambda m: f'<p><a href="{"https:" + m.group(1) if m.group(1).startswith("//") else m.group(1)}">▶ Watch the video</a></p>',
                          fragment, flags=re.S)
        fragment = re.sub(r'<(script|style|iframe|video|button|form)\b.*?</\1>', '', fragment, flags=re.S)
        fragment = re.sub(r'<a[^>]*class="btn[^"]*"[^>]*>.*?</a>', '', fragment, flags=re.S)  # "START QUIZ!" buttons
        fragment = self.localise_images(self.protect_math(fragment))
        p = ToMarkdown()
        p.feed(fragment)
        p.close()
        return self.restore_math(p.markdown())

    def exercise(self, ex):
        """One quiz exercise → (prompt_md, options, answers, answer_text, explanation_md)."""
        q = (div_blocks(ex, 'q-question') or [''])[0]
        a = (div_blocks(ex, 'q-answer') or [''])[0]
        e = (div_blocks(ex, 'q-explanation') or [''])[0]
        options, correct = [], []
        for lab in re.finditer(r'<label class="(radio|checkbox)">(.*?)</label>', a, re.S):
            body = lab.group(2)
            if not re.sub(r'<[^>]+>', '', body).strip():
                continue
            if re.search(r'<input[^>]*class="c"', body):
                correct.append(len(options))
            options.append(self.md(re.sub(r'<input[^>]*>', '', body)))
        blanks = [html.unescape(v) for v in re.findall(r'data-c="([^"]*)"', a)]
        prompt = self.md(q)
        if blanks and not options:
            filled = self.md(re.sub(r'<input[^>]*data-c="([^"]*)"[^>]*>', lambda m: '<strong>[' + m.group(1) + ']</strong>', a))
            answer_text = filled
            prompt = prompt + '\n\n' + self.md(re.sub(r'<input[^>]*>', '_____', a))
        else:
            answer_text = ''
        expl = self.md(e)
        if re.match(r'^\s*Use this optional field', expl):
            expl = ''
        return prompt.strip(), options, correct, answer_text.strip(), expl.strip()


def page_title(h):
    m = re.search(r'<title>(.*?)</title>', h, re.S)
    t = html.unescape(m.group(1)).split('-->')[0].strip() if m else ''
    return re.sub(r'\s+', ' ', t)


def convert_page(subject, path):
    h = open(path, encoding='utf-8', errors='replace').read()
    c = Converter(subject, path)
    parts = []
    for panel in div_blocks(h, 'panel'):
        head = (div_blocks(panel, 'panel-heading') or [''])[0]
        body = (div_blocks(panel, 'panel-body') or [''])[0]
        title = re.sub(r'\s+', ' ', html.unescape(re.sub(r'<[^>]+>', ' ', head))).strip()
        if not body.strip() or title.lower() in ('feedback', 'log in', ''):
            continue
        # quizzes: modal slide-quizzes inside the panel
        quizzes = []
        for ex in div_blocks(body, 'exercise'):
            quizzes.append(c.exercise(ex))
        body_wo = re.sub(r'<div class="modal fade.*', '', body, flags=re.S)
        text = c.md(body_wo)
        section = [f'## {title}', '', text] if title else [text]
        for prompt, options, correct, filled, expl in quizzes:
            ans = []
            if options:
                letters = 'ABCDEFGH'
                prompt = prompt + '\n\n' + '\n'.join(f'- **{letters[i]}.** {o}' for i, o in enumerate(options))
                ans.append('**Answer:** ' + ', '.join(letters[i] for i in correct) if correct else '')
            if filled:
                ans.append(filled)
            if expl:
                ans.append(expl)
            ans = [x for x in ans if x]
            section += ['', '```example', prompt or '(interactive question)', '---', '\n\n'.join(ans) or 'See the explanation above.', '```']
        parts.append('\n'.join(section))
    md = '\n\n'.join(p for p in parts if p.strip())
    md = re.sub(r'\n{3,}', '\n\n', md).strip()
    return page_title(h), md, c


def chem_questions(path, slug):
    """Multiple-choice quiz items on a Chemistry topic question page → bank rows."""
    topic_key = next((k for k in CHEM_QUESTION_TOPICS if slug.startswith(k)), None)
    if topic_key is None:
        return []
    code = CHEM_QUESTION_TOPICS[topic_key]
    level = 'HL' if 'ahl' in slug else None
    paper = '1A' if 'paper-1' in slug else '2'
    h = open(path, encoding='utf-8', errors='replace').read()
    c = Converter('chemistry', path, img_dir=os.path.join(BANK, 'img'), img_prefix='img/')
    rows = []
    for n, ex in enumerate(div_blocks(h, 'exercise'), 1):
        prompt, options, correct, filled, expl = c.exercise(ex)
        if not prompt:
            continue
        row = {'id': f'sib-{slug}-{n}', 'subject': 'chemistry', 'topic': None, 'paper': paper, 'difficulty': 'medium',
               'source': 'mock', 'session': 'StudyIB practice (2016 syllabus)', 'number': str(n), 'marks': 1,
               'prompt': prompt, 'markscheme': ''}
        if code:
            row['subtopic'] = code
        if level:
            row['level'] = level
        if options and len(correct) == 1 and len(options) >= 2:
            row['options'], row['answer'] = options, correct[0]
            row['markscheme'] = f"Answer: **{'ABCDEFGH'[correct[0]]}**" + (f'\n\n{expl}' if expl else '')
        else:
            if options:
                row['prompt'] += '\n\n' + '\n'.join(f'- {o}' for o in options)
            row['markscheme'] = '\n\n'.join(x for x in [filled, expl] if x) or 'See the explanation on the original page.'
        rows.append(row)
    return rows


def main():
    topics_by_code = {}
    for s in FOLDERS:
        j = json.load(open(os.path.join(ROOT, 'content', s, 'subject.json'), encoding='utf-8'))
        topics_by_code[s] = {t['code']: t for u in j['units'] for t in u['topics']}
    bank_rows = []
    for subject, folder in FOLDERS.items():
        index, seen, n = {}, set(), 0
        base = os.path.join(SITE, folder, 'page')
        for pid in sorted(os.listdir(base), key=lambda x: int(x) if x.isdigit() else 0):
            if not os.path.isdir(os.path.join(base, pid)):
                continue
            for f in os.listdir(os.path.join(base, pid)):
                if not f.endswith('.html'):
                    continue
                slug = f[:-5]
                path = os.path.join(base, pid, f)
                if subject == 'chemistry' and 'questions' in slug:
                    rows = chem_questions(path, slug)
                    for r in rows:
                        t = topics_by_code['chemistry'].get(r.get('subtopic'))
                        r['topic'] = t['id'] if t else None
                        r['needsReview'] = t is None
                    bank_rows += rows
                    continue
                code = PAGES[subject].get(slug)
                topic = topics_by_code[subject].get(code) if code else None
                if not topic or (subject, slug) in seen:
                    continue
                title, md, _ = convert_page(subject, path)
                if len(re.sub(r'\s+', '', md)) < 200:
                    continue  # index pages with no notes (a fuller copy of the same page may follow)
                seen.add((subject, slug))
                rel = f'studyib-{slug.strip("-")}'
                tdir = os.path.join(OUT, subject, topic['id'])
                os.makedirs(tdir, exist_ok=True)
                with open(os.path.join(tdir, rel + '.md'), 'w', encoding='utf-8') as fh:
                    fh.write(md + '\n')
                index.setdefault(subject, {}).setdefault(topic['id'], []).append(
                    {'file': f"{topic['id']}/{rel}.md", 'slug': rel, 'title': title or slug.replace('-', ' ').capitalize(),
                     'source': 'studyib', 'order': int(pid) if pid.isdigit() else 0, 'group': 'studyib', 'chars': len(md)})
                n += 1
        with open(os.path.join(OUT, f'index-{subject}-studyib.json'), 'w', encoding='utf-8') as fh:
            json.dump(index, fh, ensure_ascii=False, indent=1)
        print(subject, n, 'StudyIB pages', flush=True)
    os.makedirs(BANK, exist_ok=True)
    with open(os.path.join(BANK, 'studyib-chemistry.json'), 'w', encoding='utf-8') as fh:
        json.dump(bank_rows, fh, ensure_ascii=False)
    print('chemistry practice questions:', len(bank_rows), 'mcq:', sum('options' in r for r in bank_rows))


if __name__ == '__main__':
    main()
