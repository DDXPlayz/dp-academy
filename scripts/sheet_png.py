"""Renders the contact sheet written by suggest_figures.py as PNG pages (needs Pillow).

usage: python -X utf8 scripts/sheet_png.py chemistry-s2-2-covalent-model
writes resources/extracted/_sheets/<name>-1.png, -2.png, ... (25 numbered thumbnails per page)
"""
import json
import sys
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
NOTES = ROOT / "resources" / "extracted"
COLS, CELL, PER = 5, 300, 25


def main(name: str):
    figs = json.loads((NOTES / "_sheets" / f"{name}.json").read_text(encoding="utf-8"))
    try:
        font = ImageFont.truetype("arialbd.ttf", 26)
    except OSError:
        font = ImageFont.load_default()
    for page in range(0, len(figs), PER):
        chunk = figs[page : page + PER]
        rows = (len(chunk) + COLS - 1) // COLS
        sheet = Image.new("RGB", (COLS * CELL, rows * CELL), "white")
        draw = ImageDraw.Draw(sheet)
        for i, f in enumerate(chunk):
            x, y = (i % COLS) * CELL, (i // COLS) * CELL
            try:
                im = Image.open(NOTES / f["src"]).convert("RGB")
                im.thumbnail((CELL - 8, CELL - 34))
                sheet.paste(im, (x + 4 + (CELL - 8 - im.width) // 2, y + 30))
            except OSError:
                pass
            draw.rectangle([x, y, x + CELL - 1, y + CELL - 1], outline="#999")
            draw.text((x + 6, y + 2), f"#{page + i + 1}", fill="#c00", font=font)
        out = NOTES / "_sheets" / f"{name}-{page // PER + 1}.png"
        sheet.save(out)
        print(out)


if __name__ == "__main__":
    main(sys.argv[1])
