"""Inserts ```figure blocks into lessons from a JSON plan.

plan.json: [
  {"lesson": "physics/d3-motion-in-fields/02-magnetic-field-motion.md",
   "after": "## Circular motion",            # a heading, or any text in a paragraph
   "src": "physics/_sme/.../fig-xxxx.png",
   "caption": "One sentence in my own words.",
   "replace_svg": false}                       # true: replace the next ```svg block after the anchor
]

The block goes after the paragraph that contains the anchor (for a heading: after
the first paragraph under it). Re-running is safe: a src already in the lesson is skipped.

usage: python -I -X utf8 scripts/place_figures.py plan.json
"""
import json
import re
import sys
from pathlib import Path

CONTENT = Path(__file__).resolve().parent.parent / "content"


def block(src: str, caption: str) -> str:
    return f"```figure\nsrc: {src}\ncaption: {caption}\n```"


def insert(text: str, after: str, fig: str, replace_svg: bool) -> str | None:
    lines = text.split("\n")
    # skip frontmatter
    start = 0
    if lines and lines[0] == "---":
        start = lines.index("---", 1) + 1
    idx = next((i for i in range(start, len(lines)) if after in lines[i]), None)
    if idx is None:
        return None
    if replace_svg:
        j = next((i for i in range(idx, len(lines)) if lines[i].startswith("```svg")), None)
        if j is not None:
            k = next(i for i in range(j + 1, len(lines)) if lines[i].startswith("```"))
            return "\n".join(lines[:j] + fig.split("\n") + lines[k + 1 :])
    i = idx
    if lines[idx].startswith("#"):
        i = idx + 1
        while i < len(lines) and not lines[i].strip():
            i += 1
    # move to the end of this block (paragraph, list, fence or display maths)
    in_fence = False
    while i < len(lines):
        line = lines[i]
        if line.startswith("```") or line.strip() == "$$":
            in_fence = not in_fence
        elif not line.strip() and not in_fence:
            break
        i += 1
    # keep figures under one anchor in plan order: step past figures already placed here
    while True:
        j = i
        while j < len(lines) and not lines[j].strip():
            j += 1
        if j < len(lines) and lines[j].startswith("```figure"):
            i = next(k for k in range(j + 1, len(lines)) if lines[k].startswith("```")) + 1
        else:
            break
    return "\n".join(lines[:i] + ["", *fig.split("\n")] + lines[i:])


def main(plan_path: str):
    plan = json.loads(Path(plan_path).read_text(encoding="utf-8"))
    if isinstance(plan, dict):  # {"sheet": "physics-a2-forces", "picks": {"3": "caption", "7": {"caption": ..., "after": ...}}}
        sheet = json.loads((CONTENT.parent / "resources/extracted/_sheets" / f"{plan['sheet']}.json").read_text(encoding="utf-8"))
        items = []
        for n, v in plan["picks"].items():
            v = v if isinstance(v, dict) else {"caption": v}
            items.append({**sheet[int(n) - 1], **v})
        plan = items
    for item in plan:
        path = CONTENT / item["lesson"]
        text = path.read_text(encoding="utf-8")
        if item["src"] in text:
            print("skip (present)", item["src"])
            continue
        new = insert(text, item["after"], block(item["src"], item["caption"]), item.get("replace_svg", False))
        if new is None:
            print("ANCHOR NOT FOUND", item["lesson"], "|", item["after"])
            continue
        path.write_text(re.sub(r"\n{3,}", "\n\n", new), encoding="utf-8")
        print("placed", item["lesson"], "<-", item["src"].split("/")[-1])


if __name__ == "__main__":
    main(sys.argv[1])
