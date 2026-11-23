"""
Converts a locally saved IB question bank (HTML pages under resources/questionbank-src/)
into question-bank rows for local, personal use. Output: resources/question-bank/<subject>-qb.json
plus extracted images in resources/question-bank/img/. Both are git-ignored and served only by
the dev server.

    python -I scripts/import_questionbank.py
"""
import base64, glob, hashlib, html, json, os, re
from collections import defaultdict
from html.parser import HTMLParser

ROOT = os.getcwd()
SRC = os.path.join(ROOT, 'resources', 'questionbank-src')
OUT = os.path.join(ROOT, 'resources', 'question-bank')
IMG = os.path.join(OUT, 'img')
BANKS = {
    'physics': '59-dp-physics-first-assessment-2025',
    'chemistry': '58-dp-chemistry-first-assessment-2025',
    'math-aa': '50-dp-mathematics-analysis-and-approaches',
}
SUP = str.maketrans('0123456789+-−=()n', '⁰¹²³⁴⁵⁶⁷⁸⁹⁺⁻⁻⁼⁽⁾ⁿ')
SUB = str.maketrans('0123456789+-−=()', '₀₁₂₃₄₅₆₇₈₉₊₋₋₌₍₎')


def save_data_uri(uri):
    m = re.match(r'data:image/(png|jpe?g|gif|svg\+xml);base64,(.+)', uri, re.S)
    if not m:
        return None
    raw = re.sub(r'\s+', '', m.group(2))
    raw = raw[: len(raw) - len(raw) % 4] if len(raw) % 4 == 1 else raw + '=' * (-len(raw) % 4)
    try:
        data = base64.b64decode(raw)
    except Exception:
        return None  # damaged image in the saved page
    ext = {'jpeg': 'jpg', 'svg+xml': 'svg'}.get(m.group(1), m.group(1))
    name = hashlib.md5(data).hexdigest()[:20] + '.' + ext
    os.makedirs(IMG, exist_ok=True)
    p = os.path.join(IMG, name)
    if not os.path.exists(p):
        with open(p, 'wb') as fh:
            fh.write(data)
    return 'img/' + name


class ToMarkdown(HTMLParser):
    """Small HTML → Markdown converter for question-bank content."""

    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.out, self.skip, self.math_alt = [], 0, None
        self.table, self.row, self.cell = None, None, None
        self.lists, self.subsup = [], None
        self.links = []  # stack of hrefs for open <a> tags (None for links that are dropped)

    def emit(self, s):
        if self.cell is not None:
            self.cell.append(s)
        else:
            self.out.append(s)

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if self.skip:
            if tag == 'math':
                self.skip += 1
            return
        if tag == 'math':
            self.math_alt = (a.get('alttext') or '').strip()
            self.math_block = a.get('display') == 'block'
            self.skip = 1
            return
        if tag in ('p', 'div') and self.cell is None:
            self.emit('\n\n')
        elif tag == 'br':
            self.emit('  \n' if self.cell is None else ' ')
        elif tag in ('em', 'i'):
            self.emit('*')
        elif tag in ('strong', 'b'):
            self.emit('**')
        elif tag in ('sub', 'sup'):
            self.subsup = (tag, [])
        elif tag == 'a':
            href = a.get('href', '')
            keep = href.startswith(('http://', 'https://'))
            self.links.append(href if keep else None)
            if keep:
                self.emit('[')
        elif tag == 'img':
            src = a.get('src', '')
            if 'answer_space' in src or not src:
                return
            if src.startswith('data:'):
                src = save_data_uri(src)
                if not src:
                    return
            self.emit(f'\n\n![fig]({src})\n\n' if self.cell is None else f'![fig]({src})')
        elif tag == 'table':
            self.table = []
        elif tag == 'tr' and self.table is not None:
            self.row = []
        elif tag in ('td', 'th') and self.row is not None:
            self.cell = []
        elif tag in ('ul', 'ol'):
            self.lists.append([tag, 0])
            self.emit('\n')
        elif tag == 'li':
            kind = self.lists[-1] if self.lists else ['ul', 0]
            kind[1] += 1
            self.emit('\n' + '  ' * (len(self.lists) - 1) + ('- ' if kind[0] == 'ul' else f'{kind[1]}. '))

    def handle_endtag(self, tag):
        if self.skip:
            if tag == 'math':
                self.skip -= 1
                if self.skip == 0:
                    alt = self.math_alt or ''
                    if alt:
                        self.emit(f'\n\n$$\n{alt}\n$$\n\n' if self.math_block and self.cell is None else f'${alt}$')
            return
        if tag == 'a' and self.links:
            href = self.links.pop()
            if href:
                self.emit(f']({href})')
            return
        if tag in ('em', 'i'):
            self.emit('*')
        elif tag in ('strong', 'b'):
            self.emit('**')
        elif tag in ('sub', 'sup') and self.subsup:
            kind, buf = self.subsup
            self.subsup = None
            t = ''.join(buf).strip()
            table = SUP if kind == 'sup' else SUB
            ok = set('0123456789+-−=()' + ('n' if kind == 'sup' else ''))
            if t and set(t) <= ok:
                self.emit(t.translate(table))
            elif len(t) > 8:  # long superscripts are image credits: keep them as plain text
                self.emit(' ' + t.replace('\\', '\\\\').replace('$', '\\$').replace('*', '\\*').replace('_', '\\_') + ' ')
            elif t:
                self.emit(f"$^{{\\text{{{t}}}}}$" if kind == 'sup' else f"$_{{\\text{{{t}}}}}$")
        elif tag in ('td', 'th') and self.cell is not None:
            self.row.append(re.sub(r'\s+', ' ', ''.join(self.cell)).strip().replace('|', '\\|'))
            self.cell = None
        elif tag == 'tr' and self.row is not None:
            self.table.append(self.row)
            self.row = None
        elif tag == 'table' and self.table is not None:
            rows = [r for r in self.table if r]
            self.table = None
            if rows:
                n = max(len(r) for r in rows)
                rows = [r + [''] * (n - len(r)) for r in rows]
                lines = ['| ' + ' | '.join(rows[0]) + ' |', '|' + '---|' * n] + ['| ' + ' | '.join(r) + ' |' for r in rows[1:]]
                self.emit('\n\n' + '\n'.join(lines) + '\n\n')
        elif tag in ('ul', 'ol') and self.lists:
            self.lists.pop()
            self.emit('\n\n')
        elif tag in ('p', 'div') and self.cell is None:
            self.emit('\n\n')

    def handle_data(self, data):
        if self.skip:
            return
        if self.subsup is not None:
            self.subsup[1].append(data)
            return
        t = data.replace('\xa0', ' ')
        t = t.replace('\\', '\\\\').replace('$', '\\$').replace('*', '\\*').replace('_', '\\_')
        if self.cell is None and not self.out[-1:] == ['\n']:
            pass
        self.emit(re.sub(r'[ \t\r\n]+', ' ', t))

    def markdown(self):
        md = ''.join(self.out)
        md = re.sub(r'\*\*[ \t]*\*\*|(?<!\*)\*[ \t]*\*(?!\*)', '', md)  # empty emphasis (never across lines)
        md = re.sub(r'[ \t]+\n', '\n', md)
        md = re.sub(r'\n{3,}', '\n\n', md)
        return md.strip()


def to_md(fragment):
    p = ToMarkdown()
    p.feed(fragment)
    p.close()
    return p.markdown()


def section(html_text, cls):
    """Inner HTML of the first <div class='cls ...'> (balanced divs)."""
    m = re.search(r"<div class='" + re.escape(cls) + r"[^']*'>", html_text)
    if not m:
        return None, -1
    i, depth = m.end(), 1
    for t in re.finditer(r'<(/?)div\b', html_text[i:]):
        depth += -1 if t.group(1) else 1
        if depth == 0:
            return html_text[i:i + t.start()], m.start()
    return html_text[i:], m.start()


def all_sections(html_text, cls):
    out, pos = [], 0
    while True:
        inner, at = section(html_text[pos:], cls)
        if inner is None:
            return out
        out.append(inner)
        pos += at + len(inner) + 10


def meta(page):
    return {k.strip(): html.unescape(v).strip() for k, v in re.findall(r"info_label'>([^<]+)</td>\s*<td class='info_value'>([^<]*)", page)}


def card_body(fragment, cls):
    inner, _ = section(fragment, cls)
    if inner is None:
        return None
    body, _ = section(inner, 'card-body')
    return to_md(body) if body else None


def parse_parts(container):
    """Splits a question container into (label, body_md, marks, markscheme_md, report_md)."""
    parts = []
    # Each part's markscheme and examiners report follow its content block, so split at part starts.
    starts = [m.start() for m in re.finditer(r"<div class='t_qn_question_content", container)]
    blocks = [container[s:e] for s, e in zip(starts, starts[1:] + [len(container)])]
    for blk in blocks:
        label = re.search(r"<div class='qn_code_number'>([^<]*)</div>", blk)
        body, _ = section(blk, 'qc_body')
        marks = re.search(r"qc_marks_available'>\s*<p>\s*\[(\d+)\]", blk)
        parts.append({
            'label': (label.group(1).strip().rstrip('.').strip('()') if label else ''),
            'body': to_md(body) if body else '',
            'marks': int(marks.group(1)) if marks else 0,
            'ms': card_body(blk, 'qc_markscheme') or '',
            'report': card_body(blk, 'qc_examiners_report') or '',
        })
    return parts


# Older-syllabus banks (2016 science guides, last assessment 2024), mapped to 2025 topic codes.
LEGACY_BANKS = {
    'physics': '46-dp-physics-last-assessment-2024',
    'chemistry': '45-dp-chemistry-last-assessment-2024',
}
OLD_TO_NEW = {
    'physics': {
        '1.1': 'Tool 1', '1.2': 'Tool 3', '1.3': 'Tool 3',
        '2.1': 'A.1', '2.2': 'A.2', '2.3': 'A.3', '2.4': 'A.2', '3.1': 'B.1', '3.2': 'B.3',
        '4.1': 'C.1', '4.2': 'C.2', '4.3': 'C.3', '4.4': 'C.3', '4.5': 'C.4',
        '5.1': 'B.5', '5.2': 'B.5', '5.3': 'B.5', '5.4': 'D.2', '6.1': 'A.2', '6.2': 'D.1',
        '7.1': 'E.1', '7.2': 'E.3', '7.3': 'E.1', '8.1': 'E.4', '8.2': 'B.2',
        '9.1': 'C.1', '9.2': 'C.3', '9.3': 'C.3', '9.4': 'C.3', '9.5': 'C.5',
        '10.1': 'D.2', '10.2': 'D.1', '11.1': 'D.4', '11.2': 'D.4', '12.1': 'E.2', '12.2': 'E.3',
        'opt:A.1': 'A.5', 'opt:A.2': 'A.5', 'opt:A.3': 'A.5', 'opt:A.4': 'A.5', 'opt:A.5': 'A.5',
        'opt:B.1': 'A.4', 'opt:B.2': 'B.4', 'opt:B.4': 'C.4',
        'opt:D.1': 'E.5', 'opt:D.2': 'E.5', 'opt:D.4': 'E.5',
    },
    'chemistry': {
        '1.1': 'S1.1', '1.2': 'S1.4', '1.3': 'R2.1', '2.1': 'S1.2', '2.2': 'S1.3', '3.1': 'S3.1', '3.2': 'S3.1',
        '4.1': 'S2.1', '4.2': 'S2.2', '4.3': 'S2.2', '4.4': 'S2.2', '4.5': 'S2.3',
        '5.1': 'R1.1', '5.2': 'R1.2', '5.3': 'R1.2', '6.1': 'R2.2', '7.1': 'R2.3',
        '8.1': 'R3.1', '8.2': 'R3.1', '8.3': 'R3.1', '8.4': 'R3.1', '8.5': 'R3.1', '9.1': 'R3.2', '9.2': 'R3.2',
        '10.1': 'S3.2', '10.2': 'R3.4', '11.1': 'Tool 3', '11.2': 'Tool 3', '11.3': 'S3.2', '12.1': 'S1.3', '13.1': 'S3.1', '13.2': 'S3.1',
        '14.1': 'S2.2', '14.2': 'S2.2', '15.1': 'R1.2', '15.2': 'R1.4', '16.1': 'R2.2', '16.2': 'R2.2',
        '17.1': 'R2.3', '18.1': 'R3.4', '18.2': 'R3.1', '18.3': 'R3.1', '19.1': 'R3.2',
        '20.1': 'R3.4', '20.2': 'R3.4', '20.3': 'S3.2', '21.1': 'S3.2',
        'opt:A.5': 'S2.4', 'opt:A.8': 'S2.4', 'opt:A.9': 'S2.4', 'opt:C.1': 'R1.3', 'opt:C.2': 'R1.3', 'opt:C.6': 'R3.2',
    },
}


def legacy_code(subject, labels):
    """(2025 code or None, True if the question belongs only to an option with no 2025 home)."""
    option_seen = False
    for lab in labels:
        lab = html.unescape(lab).strip()
        m = re.match(r'^(\d+\.\d+)\b', lab)
        if m and m.group(1) in OLD_TO_NEW[subject]:
            return OLD_TO_NEW[subject][m.group(1)], False
        m = re.match(r'^([A-D]\.\d+)\b', lab)
        if m:
            option_seen = True
            new = OLD_TO_NEW[subject].get('opt:' + m.group(1))
            if new:
                return new, False
        if re.match(r'^(Option|Options|[A-D]:)', lab):
            option_seen = True
    return None, option_seen


def dedupe_key(ref):
    """'19M.1A.HL.TZ1.16' and '19M.1.HL.TZ1.16' are the same original question."""
    parts = ref.split('.')
    if len(parts) >= 5:
        parts[1] = parts[1][:1]
    return '.'.join(parts)


def topic_code(subject, labels):
    for lab in labels:
        lab = html.unescape(lab)
        tool = re.match(r'Tool\s*(\d)', lab)
        if tool:
            return f'Tool {tool.group(1)}'
        if subject == 'physics':
            m = re.match(r'([A-E]\.\d)\b', lab)
        elif subject == 'chemistry':
            m = re.match(r'(Structure|Reactivity)\s*(\d\.\d)\b', lab)
            if m:
                return ('S' if m.group(1) == 'Structure' else 'R') + m.group(2)
            m = re.match(r'([SR]\d\.\d)\b', lab)
        else:
            m = re.match(r'(?:SL|AHL)\s*(\d\.\d+)\b', lab)
        if m:
            return m.group(1)
    return None


def difficulty(paper, number, marks, level):
    if paper == '1A':
        try:
            n = int(re.match(r'\d+', number).group())
        except Exception:
            n = 15
        frac = n / (40 if level == 'HL' else 30)
        return 'easy' if frac < 0.34 else 'medium' if frac < 0.75 else 'hard'
    if paper == '3' or marks >= 9:
        return 'hard'
    return 'easy' if marks <= 4 else 'medium'


def mcq(stem_md):
    """Splits "A. …" option paragraphs off a multiple-choice stem."""
    paras = re.split(r'\n\s*\n', stem_md)
    opts, rest = {}, []
    for p in paras:
        m = re.match(r'^\s*\**([A-D])\**\s*[.)]\s*(.*)$', p, re.S)
        if m and m.group(1) not in opts:
            opts[m.group(1)] = m.group(2).strip()
        else:
            rest.append(p)
    if list(opts) == ['A', 'B', 'C', 'D']:
        return '\n\n'.join(rest).strip(), [opts[k] for k in 'ABCD']
    # options laid out as a table: | A. | … |
    return None, None


def run(subject, folder, topics, legacy=False, skip=frozenset()):
    pages = glob.glob(os.path.join(SRC, folder, 'question_node_trees', '*.html'))
    groups = defaultdict(list)
    for f in pages:
        page = open(f, encoding='utf-8').read()
        info = meta(page)
        ref = info.get('Reference code', '')
        if not ref:
            continue
        # "22M.2.SL.TZ2.3b.ii" and Math AA's "19M.1.SL.TZ1.S_10c" belong to question 3 / S_10
        parent = re.sub(r'(\.(?:[A-Za-z]+_)?\d+)[a-z]*(?:\.[ivx]+)?$', r'\1', ref)
        groups[parent].append((ref, info, page))

    rows, seen = [], set()
    for parent, items in groups.items():
        whole = [it for it in items if it[0] == parent]
        chosen = whole[:1] or sorted(items, key=lambda it: it[0])
        info = chosen[0][1]
        stem_md, parts = '', []
        for ref, _, page in chosen:
            container, _ = section(page, 't_qnt_container_full')
            if container is None:
                continue
            res, _ = section(container, 't_qn_q_resource')
            if res and not stem_md:
                stem_md = to_md(res)
            for p in parse_parts(container):
                if p['label'] and any(q['label'] == p['label'] for q in parts):
                    continue
                if not p['label'] and len(chosen) > 1:
                    p['label'] = re.sub(r'^.*\.\d+', '', ref)
                parts.append(p)
        if not parts:
            continue
        labels = re.findall(r"syllabus_sections/\d+\.html\">([^<]+)</a>", chosen[0][2])
        paper = info.get('Paper', '')
        if legacy:
            if dedupe_key(parent) in skip:
                continue  # already in the 2025 bank as an adapted question
            code, option_only = legacy_code(subject, labels)
            if option_only and not code:
                continue  # option topic that is not in the 2025 syllabus
            # old paper 3: section A (data analysis, Tools) ≈ 1B; option questions ≈ paper 2
            paper = {'1': '1A', '2': '2'}.get(paper, '2' if code and not code.startswith('Tool') else '1B')
        else:
            code = topic_code(subject, labels)
        topic = topics.get(code)
        level = 'HL' if info.get('Level', '') in ('HL', 'AHL') else 'SL'
        marks = sum(p['marks'] for p in parts) or int((re.search(r'(\d+)', info.get('Marks available', '')) or [0, 1])[1])
        number = re.sub(r'^[A-Za-z]+_', '', parent.rsplit('.', 1)[-1])
        date = info.get('Date', '').strip()
        if re.search(r'example', date, re.I):
            date = 'IB example question'
        elif re.search(r'specimen', date, re.I):
            yr = re.search(r'(\d{4})', date)
            date = 'Specimen paper' + (' ' + yr.group(1) if yr else '')
        tz = info.get('Time zone', '')
        session = ' '.join(x for x in [date, tz if tz and tz != 'TZ0' else ''] if x)
        if legacy:
            session = f"{session} · 2016 syllabus P{info.get('Paper', '?')}"

        row = {
            'id': re.sub(r'[^a-z0-9]+', '-', f"{'qbo' if legacy else 'qb'}-{parent}".lower()).strip('-'),
            '_ref': parent,
            'subject': subject,
            'topic': topic['id'] if topic else None,
            'paper': paper,
            'level': level,
            'difficulty': difficulty(paper, number, marks, level),
            'source': 'past-paper',
            'session': session or 'Question bank',
            'number': number,
            'marks': max(1, marks),
            'subtopic': code or undefined_or_none(),
            'prompt': '',
            'markscheme': '',
            'needsReview': topic is None,
        }
        if subject == 'math-aa':
            row['calculator'] = paper != '1'
        if row['id'] in seen:
            continue
        seen.add(row['id'])

        if paper == '1A' and len(parts) == 1:
            stem, options = mcq(parts[0]['body'])
            ans = re.match(r'\s*\**([A-D])\b', parts[0]['ms'])
            if options and ans:
                row['prompt'] = '\n\n'.join(x for x in [stem_md, stem] if x)
                row['options'] = options
                row['answer'] = 'ABCD'.index(ans.group(1))
                row['markscheme'] = f"Answer: **{ans.group(1)}**" + (f"\n\n**Examiners report**\n\n{parts[0]['report']}" if parts[0]['report'] else '')
                rows.append(clean(row))
                continue
        prompt, ms = [stem_md] if stem_md else [], []
        single = len(parts) == 1
        for p in parts:
            tag = '' if single or not p['label'] else f"**({p['label']})** "
            mk = f" **[{p['marks']}]**" if p['marks'] else ''
            prompt.append(f"{tag}{p['body']}{mk}")
            if p['ms']:
                ms.append(f"{tag}{p['ms']}")
            if p['report']:
                ms.append(f"*Examiners report{(' (' + p['label'] + ')') if tag else ''}:* {p['report']}")
        row['prompt'] = '\n\n'.join(x for x in prompt if x.strip()) or '(see original)'
        row['markscheme'] = '\n\n'.join(ms) or 'No markscheme in the question bank for this question.'
        rows.append(clean(row))
    return rows


def undefined_or_none():
    return None


def clean(row):
    return {k: v for k, v in row.items() if v is not None or k == 'topic'}


def write(name, rows):
    with open(os.path.join(OUT, name), 'w', encoding='utf-8') as fh:
        json.dump([{k: v for k, v in r.items() if k != '_ref'} for r in rows], fh, ensure_ascii=False)
    by_paper = defaultdict(int)
    for r in rows:
        by_paper[r['paper']] += 1
    print(name, len(rows), 'questions', dict(by_paper), 'no topic:', sum(1 for r in rows if r.get('needsReview')),
          'mcq:', sum(1 for r in rows if 'options' in r), flush=True)


def main():
    os.makedirs(OUT, exist_ok=True)
    for subject, folder in BANKS.items():
        j = json.load(open(os.path.join(ROOT, 'content', subject, 'subject.json'), encoding='utf-8'))
        topics = {t['code']: t for u in j['units'] for t in u['topics']}
        rows = run(subject, folder, topics)
        write(f'{subject}-qb.json', rows)
        if subject in LEGACY_BANKS and os.path.isdir(os.path.join(SRC, LEGACY_BANKS[subject])):
            skip = frozenset(dedupe_key(r['_ref']) for r in rows)
            write(f'{subject}-qb-2016.json', run(subject, LEGACY_BANKS[subject], topics, legacy=True, skip=skip))


if __name__ == '__main__':
    main()
