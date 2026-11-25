"""Lists note sections whose key words barely appear in a topic's lessons (likely content gaps).

For every SME / IITian note of a topic it takes each heading, finds its significant words,
and checks how many of them occur anywhere in the topic's lessons. Headings with low
coverage are printed with the start of their text, so the gap can be checked and filled
(in our own words) in the matching lesson.

usage: python -I -X utf8 scripts/find_gaps.py physics a1-kinematics [--min 0.5] [--chars 220]
"""
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
NOTES = ROOT / "resources" / "extracted"
CONTENT = ROOT / "content"
SKIP = set(
    "worked example examples exam tip tips question questions answer explanation answers solution solutions practice "
    "introduction summary notes study note key idea ideas understanding understandings applications skills essential "
    "first assessment first assessments syllabus guidance nature science theory knowledge international mindedness "
    "utilization aims data booklet reference using what when this that with from have will their there into these "
    "between about other more most some such than then also used uses each only same very part definition defined "
    "formula equation equations calculation calculations calculating calculate determining determine important "
    "overview recap review revision quick check checks common mistakes mistake method methods step steps".split()
)


GENERIC = re.compile(
    r"^(\?\d|[a-z]\)|\(?[ivx]+\)|section|key takeaways?|assumptions?|conclusions?|visual summary|leave a reply|"
    r"graphical understanding|examples?|worked|note|steps?|question|answer|solution|summary|key (points|terms|concepts)|"
    r"real[- ]life|applications?|example|in summary|tip|exam|common|important|remember|why|how|what)",
    re.I,
)


def stem(w: str) -> str:
    for suf in ("ations", "ation", "ings", "ing", "ies", "es", "s", "ed", "al"):
        if w.endswith(suf) and len(w) - len(suf) >= 4:
            return w[: -len(suf)]
    return w


def words(text: str) -> set[str]:
    return {stem(w) for w in re.findall(r"[a-z][a-z\-]{3,}", text.lower()) if w not in SKIP}


def clean(line: str) -> str:
    line = re.sub(r"!\[[^\]]*\]\([^)]*\)", "", line)
    line = re.sub(r"[*_`#>|]", "", line)
    return re.sub(r"\s+", " ", line).strip(" -")


def main(subject: str, topic: str, minimum: float, chars: int):
    lessons = " ".join(p.read_text(encoding="utf-8") for p in (CONTENT / subject / topic).rglob("*.md"))
    have = words(lessons)
    seen = set()
    for note in sorted((NOTES / subject / topic).glob("*.md")):
        if note.stem.startswith("studyib"):
            continue
        lines = note.read_text(encoding="utf-8").splitlines()
        for i, raw in enumerate(lines):
            if not re.match(r"^#{1,4} ", raw):
                continue
            head = clean(raw)
            if GENERIC.match(head) or "vectors-scalar" in note.stem:
                continue
            ws = words(head)
            if len(ws) < 1 or head.lower() in seen:
                continue
            seen.add(head.lower())
            cov = sum(w in have for w in ws) / len(ws)
            if cov >= minimum:
                continue
            body = []
            for l in lines[i + 1 :]:
                if re.match(r"^#{1,4} ", l):
                    break
                t = clean(l)
                if t and "Answer/Explanation" not in t:
                    body.append(t)
                if sum(map(len, body)) > chars:
                    break
            text = " ".join(body)[:chars]
            if len(text) < 40:
                continue
            print(f"[{note.stem[:40]}] {head[:70]}  ({cov:.0%})\n    {text}")


if __name__ == "__main__":
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    opt = lambda k, d: type(d)(sys.argv[sys.argv.index(k) + 1]) if k in sys.argv else d
    nums = {str(opt("--min", 0.5)), str(opt("--chars", 220))}
    args = [a for a in args if a not in nums]
    main(args[0], args[1], opt("--min", 0.5), opt("--chars", 220))
