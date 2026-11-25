"""Coverage map for the general question bank (content/<subject>/<topic>/general.json).

Every IB guide understanding gets a code: the guide subtopic plus its position, e.g. A.1.4,
S1.2.3 or 5.12.2 (the same numbering as resources/structure/<subject>.md). Each general
question names one of those codes in `subtopic`. This script lists, per subject and topic,
which understandings have questions, how many, and which have none, plus the difficulty,
paper and level mix.

The guide text lives in the private resources/structure/guide-structure.json; without it the
script still counts questions per code.

usage: python -I -X utf8 scripts/bank_coverage.py [subject] [--gaps] [--brief]
"""
import json
import sys
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
GUIDE = ROOT / "resources" / "structure" / "guide-structure.json"
CONTENT = ROOT / "content"


def topic_folders(subject: str) -> dict[str, Path]:
    """Guide code (e.g. A.1, S1.2, 1.4) -> the content topic folder that covers it."""
    data = json.loads((CONTENT / subject / "subject.json").read_text(encoding="utf-8"))
    out = {}
    for unit in data["units"]:
        for t in unit["topics"]:
            out[t["code"]] = CONTENT / subject / t["id"]
    return out


def load_questions(subject: str) -> list[dict]:
    qs = []
    for f in sorted((CONTENT / subject).glob("*/general.json")):
        for q in json.loads(f.read_text(encoding="utf-8")):
            qs.append({**q, "_topic": f.parent.name})
    return qs


def main():
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    gaps_only, brief = "--gaps" in sys.argv, "--brief" in sys.argv
    guide = json.loads(GUIDE.read_text(encoding="utf-8")) if GUIDE.exists() else {}
    subjects = args or ["math-aa", "physics", "chemistry"]
    for subject in subjects:
        qs = load_questions(subject)
        per_code = Counter(q.get("subtopic") for q in qs)
        topics = guide.get(subject, [])
        codes = [(t["code"], f"{t['code']}.{i}", u) for t in topics for i, u in enumerate(t["understandings"], 1)]
        known = {c for _, c, _ in codes}
        covered = sum(1 for _, c, _ in codes if per_code[c])
        print(f"\n##### {subject}: {len(qs)} questions, {covered}/{len(codes)} understandings covered")
        print("   difficulty", dict(Counter(q["difficulty"] for q in qs)), "| paper", dict(Counter(q["paper"] for q in qs)),
              "| HL-only", sum(q.get("level") == "HL" for q in qs))
        stray = [q["id"] for q in qs if q.get("subtopic") not in known] if known else []
        if stray:
            print("   ! questions whose subtopic is not a guide understanding:", stray[:20])
        if brief:
            continue
        last = None
        for tcode, code, u in codes:
            n = per_code[code]
            if gaps_only and n:
                continue
            if tcode != last:
                tq = sum(1 for _, c, _ in codes if c.startswith(tcode + ".") and per_code[c])
                tn = sum(1 for _, c, _ in codes if c.startswith(tcode + "."))
                print(f"  {tcode}  ({tq}/{tn})")
                last = tcode
            mark = f"{n:>3}" if n else "  -"
            print(f"    {mark} {code:<9} {'HL ' if u['hl'] else '   '}{u['text'][:110]}")


if __name__ == "__main__":
    main()
