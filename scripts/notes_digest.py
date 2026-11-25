"""Prints a compact digest of the private revision notes for one topic.

For each extracted note (SME, IITian, StudyIB) under resources/extracted/<subject>/<topic>/
it lists the section headings, the key points under each, and every real diagram
(fig-*.png, not formula images) with the text around it, so diagrams can be placed
into the matching lesson with a ```figure block.

usage: python -I -X utf8 scripts/notes_digest.py physics d3-motion-in-fields [--points N]
"""
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
NOTES = ROOT / "resources" / "extracted"
FIG = re.compile(r"!\[fig\]\(\.\./(_\w+/[^)#]+)(?:#w=(\d+))?\)")
MATH = re.compile(r"!\[math\]\([^)]*\)")


def clean(line: str) -> str:
    line = MATH.sub("[math]", line).strip()
    line = re.sub(r"^[-*]\s+", "", line)
    line = re.sub(r"\s+", " ", line)
    return line


def digest(subject: str, topic: str, points: int = 3) -> str:
    folder = NOTES / subject / topic
    if not folder.exists():
        return f"(no notes for {subject}/{topic})"
    out = []
    for note in sorted(folder.glob("*.md")):
        if note.stem.startswith("studyib") and "--studyib" not in sys.argv:
            continue
        lines = note.read_text(encoding="utf-8").splitlines()
        out.append(f"\n=== {note.stem}")
        recent: list[str] = []
        shown = 0
        for i, raw in enumerate(lines):
            m = FIG.search(raw)
            if m:
                rel, width = m.group(1), int(m.group(2) or 0)
                path = NOTES / subject / rel
                if not path.exists() or path.stat().st_size < 4000 or (width and width < 150):
                    continue
                before_text = " ".join(recent[-2:]).lower()
                if "--all-figs" not in sys.argv and any(w in before_text for w in ("practice", "solution", "answer/explanation", "worked example", "example:")):
                    continue
                after = next((clean(l) for l in lines[i + 1 : i + 6] if clean(l) and "[math]" not in clean(l) and not FIG.search(l)), "")
                before = " / ".join(x for x in recent[-2:])
                out.append(f"  [FIG] {subject}/{rel} w={width}")
                out.append(f"        {before[:150]} || {after[:90]}")
                continue
            text = clean(raw)
            if not text or text == "[math]" or text.startswith("!["):
                continue
            if raw.lstrip().startswith("#"):
                out.append(f"  # {text.lstrip('#').strip()[:80]}")
                shown = 0
            elif shown < points and len(text) > 25 and "--figs-only" not in sys.argv:
                out.append(f"    · {text[:150]}")
                shown += 1
            recent.append(text[:120])
    return "\n".join(out)


if __name__ == "__main__":
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    pts = 3
    if "--points" in sys.argv:
        pts = int(sys.argv[sys.argv.index("--points") + 1])
        args = [a for a in args if a != str(pts)]
    print(digest(args[0], args[1], pts))
