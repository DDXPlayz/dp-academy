"""Suggests which note diagrams belong in which lesson section, by matching words.

For every lesson in a topic it scores each SME/IITian diagram (using the note's heading
and the text around the diagram) against each lesson section (heading + text), assigns
each diagram to its best section, and prints the top candidates per section.

usage: python -I -X utf8 scripts/suggest_figures.py physics d3-motion-in-fields [--per 2]
"""
import math
import re
import sys
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
NOTES = ROOT / "resources" / "extracted"
CONTENT = ROOT / "content"
FIG = re.compile(r"!\[fig\]\(\.\./(_\w+/[^)#]+)(?:#w=(\d+))?\)")
STOP = set(
    "this that with from have will when which their there these into than then also about what where using used each more most such been being they them other only same some must over very both does make made shown below above figure diagram example equation".split()
)


def words(text: str) -> list[str]:
    out = []
    for w in re.findall(r"[a-z][a-z\-]{3,}", text.lower()):
        w = w.strip("-")
        if w in STOP:
            continue
        for suf in ("ation", "ing", "ies", "es", "s", "ed"):
            if w.endswith(suf) and len(w) - len(suf) >= 4:
                w = w[: -len(suf)]
                break
        out.append(w)
    return out


def note_figures(subject: str, topic: str):
    figs = []
    for note in sorted((NOTES / subject / topic).glob("*.md")):
        if note.stem.startswith("studyib"):
            continue
        lines = note.read_text(encoding="utf-8").splitlines()
        heading = note.stem
        recent: list[str] = []
        for i, raw in enumerate(lines):
            if raw.lstrip().startswith("#"):
                heading = raw.lstrip("# ").strip()
                continue
            m = FIG.search(raw)
            if not m:
                t = re.sub(r"!\[[^\]]*\]\([^)]*\)", "", raw).strip(" -*")
                if t:
                    recent.append(t)
                continue
            rel, width = m.group(1), int(m.group(2) or 0)
            path = NOTES / subject / rel
            if not path.exists() or path.stat().st_size < 4000 or (width and width < 150):
                continue
            before = " ".join(recent[-3:])
            if any(k in before.lower() for k in ("practice", "solution", "answer/explanation", "worked example")):
                continue
            after = next((re.sub(r"!\[[^\]]*\]\([^)]*\)", "", l).strip(" -*") for l in lines[i + 1 : i + 5] if l.strip() and not FIG.search(l) and "![math]" not in l), "")
            ctx = f"{heading}. {before} {after}"
            figs.append({"src": f"{subject}/{rel}", "ctx": ctx, "heading": heading, "near": (after or recent[-1] if recent else "")[:110]})
    # Drop exact duplicates (same image file referenced twice)
    seen, out = set(), []
    for f in figs:
        if f["src"] not in seen:
            seen.add(f["src"])
            out.append(f)
    return out


def lesson_sections(subject: str, topic: str):
    secs = []
    for path in sorted((CONTENT / subject / topic / "lessons").glob("*.md")):
        body = path.read_text(encoding="utf-8").split("\n---\n", 1)[-1]
        title = re.search(r"^title:\s*(.+)$", path.read_text(encoding="utf-8"), re.M)
        parts = re.split(r"^## (.+)$", body, flags=re.M)
        for h, text in zip(parts[1::2], parts[2::2]):
            if h.strip().lower() in ("summary", "try it yourself", "introduction"):
                continue
            secs.append({"file": path.name, "heading": h.strip(), "text": f"{title.group(1) if title else ''} {h} {h} {text[:1500]}"})
    return secs


def main(subject: str, topic: str, per: int):
    figs = note_figures(subject, topic)
    secs = lesson_sections(subject, topic)
    if not figs or not secs:
        print("no figures or no lessons")
        return
    docs = [Counter(words(f["ctx"])) for f in figs]
    df = Counter(w for d in docs for w in d)
    idf = {w: math.log(1 + len(docs) / c) for w, c in df.items()}
    sec_words = [Counter(words(s["text"])) for s in secs]
    best: dict[int, list[tuple[float, int]]] = {}
    for fi, d in enumerate(docs):
        scores = []
        for si, sw in enumerate(sec_words):
            score = sum(idf.get(w, 0) * min(c, 2) * (1 if sw[w] else 0) for w, c in d.items())
            scores.append((score, si))
        score, si = max(scores)
        if score > 6:
            best.setdefault(si, []).append((score, fi))
    shown = []
    for si, s in enumerate(secs):
        cands = sorted(best.get(si, []), reverse=True)[:per]
        if not cands:
            continue
        print(f"\n{s['file']} :: ## {s['heading']}")
        for score, fi in cands:
            f = figs[fi]
            shown.append({**f, "lesson": f"{subject}/{topic}/lessons/{s['file']}", "after": f"## {s['heading']}"})
            print(f"  #{len(shown)} {f['src']}\n      [{f['heading'][:45]}] {f['near'][:100]}")
    # Contact sheet: numbered thumbnails, served by the dev server at /data/notes/_sheets/<subject>-<topic>.html
    sheet = NOTES / "_sheets"
    sheet.mkdir(exist_ok=True)
    cells = "".join(f'<div class=c><b>#{i}</b><img src="/data/notes/{f["src"]}"></div>' for i, f in enumerate(shown, 1))
    html = (
        "<!doctype html><meta charset=utf-8><style>body{margin:6px;font:15px sans-serif;background:#fff}"
        ".g{display:grid;grid-template-columns:repeat(5,1fr);gap:6px}.c{border:1px solid #bbb;padding:3px;height:190px;overflow:hidden}"
        ".c b{display:block;color:#c00}.c img{max-width:100%;max-height:165px;display:block;margin:auto}</style>"
        f"<div class=g>{cells}</div>"
    )
    (sheet / f"{subject}-{topic}.html").write_text(html, encoding="utf-8")
    import json
    (sheet / f"{subject}-{topic}.json").write_text(json.dumps([{k: f[k] for k in ("lesson", "after", "src")} for f in shown], indent=0), encoding="utf-8")


if __name__ == "__main__":
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    per = int(sys.argv[sys.argv.index("--per") + 1]) if "--per" in sys.argv else 2
    if "--per" in sys.argv:
        args = [a for a in args if a != str(per)]
    main(args[0], args[1], per)
