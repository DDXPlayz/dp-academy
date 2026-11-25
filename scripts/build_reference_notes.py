"""Builds the in-app reference notes (Save My Exams and IITian Academy) from the extracted notes.

Reads   resources/extracted/index-<subject>-<sme|iitian>.json and the notes they list,
writes  resources/extracted/_site/index.json                       topic -> notes (titles, order)
        resources/extracted/_site/<subject>/<topic>/<source>.json   every note of that topic: [{id, title, body}]

Everything stays inside the git-ignored resources/ folder. The dev server serves it under
/data/notes/_site/..., and `vite build` copies it (plus the images it uses) into dist/.

Clean-up done here (the wording of the notes is kept exactly):
  * image links point at /data/notes/<subject>/_<source>/... so they load from any page
  * IITian "▶️ Answer/Explanation" sections become collapsible ```answer blocks
  * IITian titles come from the note's own first heading instead of the file name
  * headings inside a note move one level down, below the note title the reader shows

usage: python -I -X utf8 scripts/build_reference_notes.py
"""
import json
import math
from collections import Counter
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
NOTES = ROOT / "resources" / "extracted"
OUT = NOTES / "_site"
CONTENT = ROOT / "content"
SUBJECTS = ("physics", "chemistry", "math-aa")
SOURCES = ("sme", "iitian")

IMG = re.compile(r"\]\(\.\./(_(?:sme|iitian|studyib)/)")
ANSWER = re.compile(r"^(\s*)(?:[-*]\s*)?▶️?\s*Answer\s*/\s*Explanation\s*:?\s*(.*)$")
# An answer ends at the next section heading, the next question, or the next answer marker.
ANSWER_END = re.compile(r"^\s*(#{1,3} |#### (Example|Question|Practice|Worked)|▶)", re.I)


def dedent(lines: list[str]) -> list[str]:
    ind = [len(l) - len(l.lstrip()) for l in lines if l.strip()]
    cut = min(ind) if ind else 0
    return [l[cut:] for l in lines]


def wrap_answers(lines: list[str]) -> list[str]:
    out: list[str] = []
    i = 0
    while i < len(lines):
        m = ANSWER.match(lines[i])
        if not m:
            out.append(lines[i])
            i += 1
            continue
        body = [m.group(2)] if m.group(2).strip() else []
        i += 1
        while i < len(lines) and not ANSWER_END.match(lines[i]):
            body.append(lines[i])
            i += 1
        body = dedent(body)
        while body and (not body[0].strip() or body[0].strip() == "---"):
            body.pop(0)
        while body and not body[-1].strip():
            body.pop()
        # a fence inside the answer would close ours early: drop inner fences
        body = [l for l in body if not l.lstrip().startswith("```")]
        out += ["", "```answer", *body, "```", ""]
    return out


def first_heading(text: str) -> str | None:
    for line in text.splitlines()[:8]:
        m = re.match(r"^#{2,4}\s+(.+?)\s*:?\s*$", line)
        if m and 3 <= len(m.group(1)) <= 70:
            return m.group(1).replace("\\", "")
    return None


def tidy(title: str) -> str:
    """Polishes a title: "…changes r1 2 4 hesss law" -> "R1.2.4 Hesss law", shouting -> Title case."""
    m = re.search(r"\b([a-z])\s?(\d+) (\d+) (\d+)\s+(.+)$", title, re.I)
    if m:
        rest = re.sub(r"\b(ib ?dp|study notes?|notes|chemistry|physics)\b.*$", "", m.group(5), flags=re.I).strip()
        title = f"{m.group(1).upper()}{m.group(2)}.{m.group(3)}.{m.group(4)} {rest[:1].upper()}{rest[1:]}"
    title = re.sub(r"^IB MATHEMATICS AA( (SL|HL|AHL))?\s+|\s+STUDY NOTES$", "", title, flags=re.I).strip()
    if title.isupper():
        title = title.title()
    return title


STRUCTURE = ROOT / "resources" / "structure"
IITIAN_DIR = ROOT / "resources" / "IITian Academy Notes"


def natural(s: str) -> list:
    """"1-10-x" after "1-2-x"; "R1.2.10" after "R1.2.9"."""
    return [int(p) if p.isdigit() else p for p in re.split(r"(\d+)", s)]


def _load_iitian() -> tuple[dict, dict]:
    """IITian's own order and names (resources/structure/iitian_order.txt, read from their course
    index pages) and, from notes_index.csv, each saved note's URL and syllabus subtopic."""
    order: dict[tuple[str, str], tuple[int, str, str]] = {}
    path = STRUCTURE / "iitian_order.txt"
    if path.exists():
        for i, line in enumerate(l for l in path.read_text(encoding="utf-8").splitlines() if l and not l.startswith("#")):
            subject, code, title, url = line.split("|")
            shown = f"{code} {title}" if subject == "chemistry" else title
            order[(subject, url.lower())] = (i, shown, code)
    files: dict[str, tuple[str, str]] = {}  # pdf stem (lower) -> (url slug, subtopic)
    csv_path = IITIAN_DIR / "notes_index.csv"
    if csv_path.exists():
        import csv

        with open(csv_path, encoding="utf-8-sig") as fh:
            for row in csv.DictReader(fh):
                if row["Syllabus version"].startswith("Legacy"):
                    continue
                stem = Path(row["Local file"].replace("\\", "/")).stem
                stem = stem.split(" - ", 1)[-1].lower()
                files[stem] = (row["Original URL"].rstrip("/").split("/")[-1].lower(), row["Subtopic"])
    return order, files


IITIAN_ORDER, IITIAN_FILES = _load_iitian()


def iitian_source(slug: str) -> tuple[str, str] | None:
    """The IITian URL slug and subtopic of an extracted note ("iitian-<pdf stem, maybe cut short>")."""
    squash = lambda s: re.sub(r"%[0-9a-f]{2}|[^a-z0-9]", "", s.lower())  # "δg", "%ce%b4g" and "g" all match
    stem = squash(slug.removeprefix("iitian-"))
    hits = [v for k, v in IITIAN_FILES.items() if squash(k).startswith(stem)]
    return hits[0] if hits else None


def regroup_by_code(subject: str, source: str, data: dict) -> dict:
    """Puts each IITian note in the app topic its IITian syllabus code names (e.g. a note listed
    under S1.2 that the extraction filed under S2.1), so topics hold their own subtopics."""
    if source != "iitian" or subject == "math-aa":
        return data
    spec = json.loads((CONTENT / subject / "subject.json").read_text(encoding="utf-8"))
    by_code = {t["code"]: t["id"] for u in spec["units"] for t in u["topics"]}
    out: dict = {}
    for topic, notes in data.items():
        for n in notes:
            listed = iitian_listing(subject, n["slug"])
            code = re.match(r"^([A-Z]\d?\.\d+)", listed[2]) if listed else None
            target = by_code.get(code.group(1), topic) if code else topic
            if target != topic:
                print(f"  move {n['slug'][:50]}: {topic} -> {target}")
            out.setdefault(target, []).append(n)
    return out


def iitian_listing(subject: str, slug: str) -> tuple[int, str, str] | None:
    src = iitian_source(slug)
    return IITIAN_ORDER.get((subject, src[0])) if src else None


def note_sort_key(subject: str, source: str, n: dict) -> tuple:
    if source == "iitian":
        listed = iitian_listing(subject, n["slug"])
        if listed:
            return (0, listed[0], [], n["slug"])
        # not on IITian's index page: after the listed notes, by syllabus subtopic
        src = iitian_source(n["slug"])
        return (1, 0, natural(src[1] if src else "~"), n["slug"])
    # SME: SME's own section order, then its numbering inside the section
    return (0, 0, natural(n["group"]), n["order"], n["slug"])


def clean_title(raw: str, text: str, source: str) -> str:
    return tidy(_clean_title(raw, text, source))


def _clean_title(raw: str, text: str, source: str) -> str:
    if source == "iitian":
        h = first_heading(text)
        words = {w for w in re.findall(r"[a-z]{4,}", raw.lower())}
        if h and (re.search(r"\d\.\d", h) or words & set(re.findall(r"[a-z]{4,}", h.lower()))) and not re.match(r"^\d+\.", h):
            return h
        m = re.search(r"([a-z])\s?(\d+) (\d+) (\d+)\s+(.+)$", raw, re.I)
        if m:
            rest = re.sub(r"(ib ?dp|study notes?|notes|chemistry|physics).*$", "", m.group(5), flags=re.I).strip()
            return f"{m.group(1).upper()}{m.group(2)}.{m.group(3)}.{m.group(4)} {rest[:1].upper()}{rest[1:]}"
        raw = re.sub(r"\b(ib ?dp|ibdp|ib|study notes?|notes|slhl|sl ?hl|2025|physics|chemistry|maths?)\b", " ", raw, flags=re.I)
        raw = re.sub(r"\s+", " ", raw).strip()
        return raw[:1].upper() + raw[1:]
    return raw


def clean_body(text: str, subject: str, source: str) -> str:
    text = IMG.sub(rf"](/data/notes/{subject}/\1", text)
    lines = text.splitlines()
    if source == "iitian":
        lines = wrap_answers(lines)
    else:
        lines = stack_math(lines)
    # The reader shows each note's title as ##; a note's own ## sections become ###.
    shifted = []
    in_fence = False
    for l in lines:
        if l.lstrip().startswith("```"):
            in_fence = not in_fence
        if not in_fence and l.startswith("## "):
            l = "#" + l
        shifted.append(l)
    body = "\n".join(shifted)
    return re.sub(r"\n{3,}", "\n\n", body).strip()


def fix_first_line(body: str, title: str) -> str:
    """A note's first line is often its section heading without heading markup (or an
    "IB MATHEMATICS AA … STUDY NOTES" banner): drop banners and title repeats, mark the rest as a heading."""
    first, _, rest = body.partition("\n")
    line = first.strip()
    if not line or line.startswith(("#", "-", "*", "!", "`", "|")) or len(line) > 80 or line.endswith((".", ":", ",")):
        return body
    norm = lambda s: re.sub(r"[^a-z0-9]", "", s.lower())
    if re.match(r"^IB MATHEMATICS\b.*STUDY NOTES$", line, re.I) or norm(line) == norm(title) or norm(line) in norm(title):
        return rest.lstrip("\n")
    return f"### {line}\n{rest}"


MATH_LINE = re.compile(r"^(\s*)!\[math\]\([^)]+\)\s*$")


def stack_math(lines: list[str]) -> list[str]:
    """SME PDFs crop each line of a display equation separately (a fraction becomes numerator,
    "x =", denominator). Runs of equation images separated only by blank lines go into one
    ```mathstack block, drawn as a single centred equation."""
    out: list[str] = []
    i = 0
    while i < len(lines):
        m = MATH_LINE.match(lines[i])
        if not m:
            out.append(lines[i])
            i += 1
            continue
        run, j = [lines[i]], i + 1
        while j < len(lines):
            k = j
            while k < len(lines) and not lines[k].strip():
                k += 1
            m2 = MATH_LINE.match(lines[k]) if k < len(lines) else None
            if not m2 or m2.group(1) != m.group(1) or k - j > 1:
                break
            run.append(lines[k])
            j = k + 1
        if len(run) == 1:
            out.append(lines[i])
        else:
            ind = m.group(1)
            out += [f"{ind}```mathstack", *[r.strip() for r in run], f"{ind}```"]
        i = j
    return out


STOP = set("this that with from have will when which their there these into than then also about what where using used each more most such been being they them other only same some must over very both does make made shown below above figure diagram example equation notes note study".split())


def words(text: str) -> Counter:
    text = re.sub(r"!\[[^\]]*\]\([^)]*\)", " ", text.lower())
    out = Counter()
    for w in re.findall(r"[a-z][a-z\-]{3,}", text):
        w = w.strip("-")
        if w in STOP:
            continue
        for suf in ("ation", "ing", "ies", "es", "s", "ed"):
            if w.endswith(suf) and len(w) - len(suf) >= 4:
                w = w[: -len(suf)]
                break
        out[w] += 1
    return out


def match_lessons(index: dict, bodies: dict) -> dict:
    """For every lesson: the notes of its topic that cover the same ground, best first (at most 3 per source)."""
    result = {}
    for subject, topics in index.items():
        for topic, sources in topics.items():
            lessons = sorted((CONTENT / subject / topic / "lessons").glob("*.md"))
            if not lessons:
                continue
            ltext = {}
            for path in lessons:
                raw = path.read_text(encoding="utf-8")
                title = re.search(r"^title:\s*(.+)$", raw, re.M)
                heads = " ".join(re.findall(r"^#{2,3} (.+)$", raw, re.M))
                t = title.group(1) if title else ""
                ltext[re.sub(r"^\d+-", "", path.stem)] = words(f"{t} {t} {t} {heads} {heads} {raw[:4000]}")
            for source, entries in sources.items():
                docs = {e["id"]: words(bodies[(subject, topic, source, e["id"])]) for e in entries}
                df = Counter(w for d in docs.values() for w in d)
                n = len(docs)
                idf = {w: math.log(1 + n / c) for w, c in df.items()}
                for slug, lw in ltext.items():
                    scores = []
                    for nid, d in docs.items():
                        s = sum(idf[w] * min(c, 3) * min(lw[w], 3) for w, c in d.items() if w in lw)
                        norm = math.sqrt(sum(min(c, 3) for c in d.values()) + 1)
                        scores.append((s / norm, nid))
                    scores.sort(reverse=True)
                    if not scores:
                        continue
                    top = scores[0][0]
                    picked = [nid for s, nid in scores[:3] if s >= top * 0.6]
                    result.setdefault(f"{subject}/{topic}/{slug}", {})[source] = picked
    return result


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    index: dict = {}
    images: set[str] = set()
    bodies: dict = {}
    for subject in SUBJECTS:
        topics = {p.name for p in (CONTENT / subject).iterdir() if p.is_dir()}
        for source in SOURCES:
            path = NOTES / f"index-{subject}-{source}.json"
            if not path.exists():
                continue
            data = regroup_by_code(subject, source, json.loads(path.read_text(encoding="utf-8"))[subject])
            for topic, notes in data.items():
                if topic not in topics:
                    print(f"  skip {subject}/{topic}: no such topic in content/")
                    continue
                parts, entries = [], []
                for n in sorted(notes, key=lambda n: note_sort_key(subject, source, n)):
                    f = NOTES / subject / n["file"]
                    if not f.exists():
                        continue
                    raw = f.read_text(encoding="utf-8")
                    listed = iitian_listing(subject, n["slug"]) if source == "iitian" else None
                    title = listed[1] if listed else clean_title(n["title"], raw, source)
                    body = clean_body(raw, subject, source)
                    # drop the note's own first heading when it repeats the title
                    body = re.sub(rf"^#{{3,5}}\s+{re.escape(title)}\s*:?\s*\n", "", body, count=1)
                    body = fix_first_line(body, title)
                    images.update(re.findall(r"\]\((/data/notes/[^)#\s]+)", body))
                    parts.append({"id": n["slug"], "title": title, "body": body})
                    bodies[(subject, topic, source, n["slug"])] = f"{title} {title} {title} " + " ".join(re.findall(r"^#+ (.+)$", body, re.M)) + " " + body[:3000]
                    entries.append({"id": n["slug"], "title": title})
                if not parts:
                    continue
                dest = OUT / subject / topic / f"{source}.json"
                dest.parent.mkdir(parents=True, exist_ok=True)
                dest.write_text(json.dumps(parts, ensure_ascii=False), encoding="utf-8")
                index.setdefault(subject, {}).setdefault(topic, {})[source] = entries
    index["_lessons"] = match_lessons(index, bodies)
    (OUT / "index.json").write_text(json.dumps(index, ensure_ascii=False), encoding="utf-8")
    (OUT / "images.json").write_text(json.dumps(sorted(images)), encoding="utf-8")
    real = {k: v for k, v in index.items() if k != "_lessons"}
    n = sum(len(e) for t in real.values() for s in t.values() for e in s.values())
    print(f"reference notes: {n} notes in {sum(len(t) for t in real.values())} topics, {len(index['_lessons'])} lessons linked, {len(images)} images")


if __name__ == "__main__":
    main()
