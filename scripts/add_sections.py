"""Inserts new lesson text from a JSON plan: [{"lesson": "physics/.../x.md", "before": "## Summary", "text": "..."}].

The text goes immediately before the first line equal to `before` (use "## Summary" or
"## Try it yourself" to add a new section at the end). Re-running is safe: an item whose
first line is already in the lesson is skipped.

usage: python -I -X utf8 scripts/add_sections.py plan.json
"""
import json
import sys
from pathlib import Path

CONTENT = Path(__file__).resolve().parent.parent / "content"

def load(p: Path):
    """JSON plan, or a text plan: blocks headed `@@@ <lesson> | <before>[ || <other before>]`."""
    raw = p.read_text(encoding="utf-8")
    if p.suffix == ".json":
        return json.loads(raw)
    items = []
    for chunk in raw.split("\n@@@ ")[1:] if not raw.startswith("@@@ ") else ("\n" + raw).split("\n@@@ ")[1:]:
        head, _, body = chunk.partition("\n")
        lesson, _, before = head.partition(" | ")
        items.append({"lesson": lesson.strip(), "before": [b.strip() for b in before.split(" || ")], "text": body.rstrip() + "\n"})
    return items


for item in load(Path(sys.argv[1])):
    path = CONTENT / item["lesson"]
    text = path.read_text(encoding="utf-8")
    block = item["text"].strip("\n")
    if block.split("\n", 1)[0] in text:
        print("skip (present)", item["lesson"], block.split("\n", 1)[0][:50])
        continue
    lines = text.split("\n")
    befores = [item["before"]] if isinstance(item["before"], str) else item["before"]
    idx = next((i for b in befores for i, l in enumerate(lines) if l.strip() == b), None)
    if idx is None:
        print("BEFORE NOT FOUND", item["lesson"], befores)
        continue
    lines[idx:idx] = block.split("\n") + [""]
    path.write_text("\n".join(lines), encoding="utf-8")
    print("added", item["lesson"], "<-", block.split("\n", 1)[0][:60])
