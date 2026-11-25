#!/bin/sh
# Combined contact sheet for several topics: sh scripts/batch_sheet.sh <batch-name> <subject> <topic>...
# Writes resources/extracted/_sheets/<batch-name>.json (+ PNG pages) and prints "#n lesson :: heading".
name=$1; subj=$2; shift 2
for t in "$@"; do python -I -X utf8 scripts/suggest_figures.py "$subj" "$t" --per 4 >/dev/null; done
python -I -X utf8 - "$name" "$subj" "$@" <<'EOF'
import json, sys
from pathlib import Path
d = Path("resources/extracted/_sheets")
name, subj, topics = sys.argv[1], sys.argv[2], sys.argv[3:]
allf = []
for t in topics:
    p = d / f"{subj}-{t}.json"
    if p.exists():
        allf += json.loads(p.read_text(encoding="utf-8"))
(d / f"{name}.json").write_text(json.dumps(allf, indent=0), encoding="utf-8")
last = None
for i, f in enumerate(allf, 1):
    key = (f["lesson"], f["after"])
    if key != last:
        print(f"\n{f['lesson'].split('/')[1]}/{f['lesson'].split('/')[-1][:-3]} {f['after']}:", end="")
        last = key
    print(f" #{i}", end="")
print()
EOF
python -X utf8 scripts/sheet_png.py "$name"
