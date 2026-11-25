"""Adds questions to the general question bank from a batch file.

batch.json: {"math-aa/1-2-arithmetic-sequences": [ {question}, ... ], ...}

Each question uses the exam-question schema (src/content/schema.ts) and must name the guide
understanding it tests in `subtopic` (e.g. "1.2.3", "A.1.4", "S1.2.3"; see scripts/bank_coverage.py)
and the idea in `concept`. `source` defaults to "original", ids get a "g-" prefix if missing.
Questions whose id is already in the topic's general.json are skipped, so re-running is safe.

usage: python -I -X utf8 scripts/add_general.py batch.json
"""
import json
import sys
from pathlib import Path

CONTENT = Path(__file__).resolve().parent.parent / "content"
PAPERS = {"physics": {"1A", "1B", "2"}, "chemistry": {"1A", "1B", "2"}, "math-aa": {"1", "2", "3"}}
ORDER = ["id", "paper", "level", "difficulty", "marks", "subtopic", "concept", "calculator", "prompt", "options", "answer", "markscheme", "source"]


def main(batch_path: str):
    batch = json.loads(Path(batch_path).read_text(encoding="utf-8"))
    for key, items in batch.items():
        subject = key.split("/")[0]
        folder = CONTENT / key
        if not (folder / "lessons").exists():
            sys.exit(f"no topic folder {folder}")
        path = folder / "general.json"
        existing = json.loads(path.read_text(encoding="utf-8")) if path.exists() else []
        ids = {q["id"] for q in existing}
        exam_ids = {q["id"] for q in json.loads((folder / "exam.json").read_text(encoding="utf-8"))} if (folder / "exam.json").exists() else set()
        added = 0
        for q in items:
            q = dict(q)
            q.setdefault("source", "original")
            if not q["id"].startswith("g-"):
                q["id"] = "g-" + q["id"]
            problems = [f for f in ("paper", "difficulty", "marks", "subtopic", "concept", "prompt", "markscheme") if not q.get(f)]
            if q.get("paper") not in PAPERS[subject]:
                problems.append(f"paper {q.get('paper')}")
            if q.get("options") is not None and not (isinstance(q.get("answer"), int) and 0 <= q["answer"] < len(q["options"])):
                problems.append("answer index")
            if problems:
                sys.exit(f"{key} {q['id']}: {problems}")
            if q["id"] in ids or q["id"] in exam_ids:
                continue
            existing.append({k: q[k] for k in ORDER if k in q} | {k: v for k, v in q.items() if k not in ORDER})
            ids.add(q["id"])
            added += 1
        path.write_text(json.dumps(existing, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
        print(f"{key}: +{added} (now {len(existing)})")


if __name__ == "__main__":
    main(sys.argv[1])
