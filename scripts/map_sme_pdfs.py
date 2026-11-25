"""Maps each original Save My Exams revision-note PDF to the app topics it covers.

Reads   resources/<Physics HL 2025 | Chemistry HL 2025 | Maths AA HL>/**/*.pdf
        resources/extracted/index-<subject>-sme.json   (written by extract_notes.py: every SME
                                                        section, the topic it was filed under and
                                                        the PDF it came from, as "group")
        content/<subject>/subject.json                 (topic titles, as a fallback)
writes  resources/extracted/_site/pdfs.json
        {"physics/a1-kinematics": [{"file": "Physics HL 2025/.../kinematics.pdf",
                                    "title": "Kinematics", "page": 1, "sections": 8}], ...}

A PDF can serve several topics (the maths and some tools PDFs cover more than one syllabus
section); "page" is then the first page of the PDF that belongs to that topic, so the link can
open the viewer there (#page=N). The output stays inside the git-ignored resources/ folder: the
dev server serves the PDFs under /data/sme/<file> and `vite build` copies the listed ones.

usage: python -I -X utf8 scripts/map_sme_pdfs.py [--no-pages] [--root <checkout with resources/>]
"""
import json
import re
import sys
import unicodedata
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
if "--root" in sys.argv:  # e.g. run from a git worktree against the main checkout's resources/
    ROOT = Path(sys.argv[sys.argv.index("--root") + 1]).resolve()
RES = ROOT / "resources"
EXTRACTED = RES / "extracted"
OUT = EXTRACTED / "_site" / "pdfs.json"
CONTENT = ROOT / "content"
FOLDERS = {"physics": "Physics HL 2025", "chemistry": "Chemistry HL 2025", "math-aa": "Maths AA HL"}

# Topics none of whose extracted sections came from a PDF, but which a PDF does cover
# (checked by hand in the PDF text): topic -> (PDF stem, page).
MANUAL = {
    "math-aa": {
        "1-8-infinite-geometric-series": ("1.3-sequences-&-series", 18),
        "2-13-rational-functions": ("2.5-reciprocal-&-rational-functions", 1),
        "4-10-regression-x-on-y": ("4.2-correlation-&-regression", 7),
        "5-2-increasing-decreasing": ("5.1-differentiation", 11),
        "5-3-differentiating-powers": ("5.1-differentiation", 5),
    },
}


def slugify(s: str) -> str:
    """Same as extract_notes.slugify: the "group" of an extracted SME section is the PDF stem's slug."""
    s = unicodedata.normalize("NFKD", s).encode("ascii", "ignore").decode()
    return re.sub(r"[^a-z0-9]+", "-", s.lower()).strip("-")[:60] or "section"


def squash(s: str) -> str:
    return re.sub(r"[^a-z0-9]", "", unicodedata.normalize("NFKD", s).lower().replace("&", "and"))


def pdf_title(stem: str) -> str:
    """"1.8-complex-numbers" -> "1.8 Complex Numbers"; "work,-energy-&-power" -> "Work, Energy & Power"."""
    m = re.match(r"^(\d+(?:\.\d+)*)-(.*)$", stem)
    code, rest = (m.group(1) + " ", m.group(2)) if m else ("", stem)
    rest = rest.replace("ã´", "ô")  # "l'hã´pital": a mis-decoded "ô" in one file name
    rest = re.sub(r"--", ": ", rest).replace("-", " ")
    rest = re.sub(r"\s+", " ", rest).strip()
    small = {"of", "the", "to", "in", "by", "from", "and", "a", "inc"}
    words = [w if (i and w in small) else w[:1].upper() + w[1:] for i, w in enumerate(rest.split(" "))]
    return code + " ".join(words)


def topics_of(subject: str) -> dict[str, dict]:
    spec = json.loads((CONTENT / subject / "subject.json").read_text(encoding="utf-8"))
    return {t["id"]: t for u in spec["units"] for t in u["topics"]}


def fallback_topic(subject: str, stem: str, topics: dict[str, dict]) -> str | None:
    """A PDF with no extracted sections: match its name against topic titles."""
    s = squash(re.sub(r"^[\d.]+-", "", stem))
    for tid, t in topics.items():
        if squash(t["title"]) in s or s in squash(t["title"]):
            return tid
    return None


def first_pages(pdf: Path, titles_by_topic: dict[str, list[str]]) -> dict[str, int]:
    """1-based page on which each topic's first section heading appears (skipping the contents page)."""
    try:
        import pymupdf as fitz  # type: ignore
    except ImportError:
        try:
            import fitz  # type: ignore
        except ImportError:
            return {}
    doc = fitz.open(pdf)
    pages = [squash(p.get_text()) for p in doc]
    doc.close()
    out: dict[str, int] = {}
    for topic, titles in titles_by_topic.items():
        best = None
        for title in titles:
            key = squash(re.sub(r"^\d+(\.\d+)+\s*", "", title))
            if len(key) < 4:
                continue
            # the first page is usually a contents list naming every section: look past it first
            hits = [i for i, text in enumerate(pages) if key in text]
            body = [i for i in hits if i > 0] or hits
            if body:
                best = body[0] if best is None else min(best, body[0])
        if best is not None:
            out[topic] = best + 1
    return out


def main() -> None:
    with_pages = "--no-pages" not in sys.argv
    result: dict[str, list[dict]] = {}
    unmapped: list[str] = []
    total = 0
    count = 0
    for subject, folder in FOLDERS.items():
        topics = topics_of(subject)
        order = list(topics)
        index_path = EXTRACTED / f"index-{subject}-sme.json"
        groups: dict[str, dict[str, list[str]]] = {}  # pdf slug -> topic -> section titles
        if index_path.exists():
            for tid, entries in json.loads(index_path.read_text(encoding="utf-8")).get(subject, {}).items():
                for e in entries:
                    if e.get("source") == "sme":
                        groups.setdefault(e["group"], {}).setdefault(tid, []).append(e["title"])
        for pdf in sorted((RES / folder).rglob("*.pdf")):
            rel = pdf.relative_to(RES).as_posix()
            count += 1
            total += pdf.stat().st_size
            by_topic = groups.get(slugify(pdf.stem), {})
            by_topic = {t: v for t, v in by_topic.items() if t in topics}
            if not by_topic:
                t = fallback_topic(subject, pdf.stem, topics)
                if t:
                    by_topic = {t: []}
            if not by_topic:
                unmapped.append(rel)
                continue
            pages = first_pages(pdf, by_topic) if with_pages and len(by_topic) > 1 else {}
            for tid, (stem, page) in MANUAL.get(subject, {}).items():
                if stem == pdf.stem and tid in topics and tid not in by_topic:
                    by_topic[tid] = []
                    pages[tid] = page
            for tid, titles in by_topic.items():
                entry = {"file": rel, "title": pdf_title(pdf.stem)}
                if pages.get(tid, 1) > 1:
                    entry["page"] = pages[tid]
                if titles:
                    entry["sections"] = len(titles)
                result.setdefault(f"{subject}/{tid}", []).append(entry)
        # topic order as in the syllabus, and within a topic the PDF with most of its sections first
        for tid in order:
            lst = result.get(f"{subject}/{tid}")
            if lst:
                lst.sort(key=lambda e: (-e.get("sections", 0), e["file"]))
        missing = [t for t in order if f"{subject}/{t}" not in result]
        print(f"{subject}: {sum(1 for k in result if k.startswith(subject + '/'))}/{len(order)} topics have a PDF"
              + (f"; none for {', '.join(missing)}" if missing else ""))
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(result, indent=1, ensure_ascii=False), encoding="utf-8")
    mapped = count - len(unmapped)
    print(f"{mapped}/{count} PDFs mapped ({total / 1e6:.0f} MB) -> {OUT.relative_to(ROOT).as_posix()}")
    for u in unmapped:
        print("  unmapped:", u)


if __name__ == "__main__":
    main()
