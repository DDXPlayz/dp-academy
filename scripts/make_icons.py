"""Renders the app icon (public/favicon.svg design) to PNGs for the web app manifest.

No image libraries needed: the shapes are rasterised directly with 4x4 supersampling.
usage: python -I -X utf8 scripts/make_icons.py
"""
import math
import struct
import zlib
from pathlib import Path

BG = (0x43, 0x38, 0xCA)
FG = (255, 255, 255)
OUT = Path(__file__).resolve().parent.parent / "public"


def seg_dist(px, py, ax, ay, bx, by):
    dx, dy = bx - ax, by - ay
    t = max(0.0, min(1.0, ((px - ax) * dx + (py - ay) * dy) / (dx * dx + dy * dy)))
    return math.hypot(px - (ax + t * dx), py - (ay + t * dy))


def glyph(x, y):
    """True if (x, y) in 32-unit space is on the white 'D' stroke or dot."""
    # D: M9 9 h6 a7 7 0 0 1 0 14 H9 z, stroke width 2.5
    d = min(
        seg_dist(x, y, 9, 9, 15, 9),
        seg_dist(x, y, 15, 23, 9, 23),
        seg_dist(x, y, 9, 23, 9, 9),
        abs(math.hypot(x - 15, y - 16) - 7) if x >= 15 else min(math.hypot(x - 15, y - 9), math.hypot(x - 15, y - 23)),
    )
    if d <= 1.25:
        return True
    return math.hypot(x - 22.5, y - 22.5) <= 2


def in_rounded(x, y, size, r):
    cx = min(max(x, r), size - r)
    cy = min(max(y, r), size - r)
    return math.hypot(x - cx, y - cy) <= r


def render(px, rounded=True, pad=0.0):
    """pad: fraction of the canvas kept as background margin around the glyph (maskable icons)."""
    rows = []
    ss = 4
    for j in range(px):
        row = bytearray([0])
        for i in range(px):
            acc = [0, 0, 0, 0]
            for sj in range(ss):
                for si in range(ss):
                    u = (i + (si + 0.5) / ss) / px
                    v = (j + (sj + 0.5) / ss) / px
                    inside = in_rounded(u * 32, v * 32, 32, 8) if rounded else True
                    if not inside:
                        continue
                    gx = (u - pad) / (1 - 2 * pad) * 32
                    gy = (v - pad) / (1 - 2 * pad) * 32
                    c = FG if glyph(gx, gy) else BG
                    acc[0] += c[0]
                    acc[1] += c[1]
                    acc[2] += c[2]
                    acc[3] += 255
            n = ss * ss
            a = acc[3] / n
            if a:
                row += bytes([round(acc[0] / (acc[3] / 255)), round(acc[1] / (acc[3] / 255)), round(acc[2] / (acc[3] / 255)), round(a)])
            else:
                row += bytes([0, 0, 0, 0])
        rows.append(bytes(row))
    raw = b"".join(rows)

    def chunk(tag, data):
        return struct.pack(">I", len(data)) + tag + data + struct.pack(">I", zlib.crc32(tag + data) & 0xFFFFFFFF)

    return (
        b"\x89PNG\r\n\x1a\n"
        + chunk(b"IHDR", struct.pack(">IIBBBBB", px, px, 8, 6, 0, 0, 0))
        + chunk(b"IDAT", zlib.compress(raw, 9))
        + chunk(b"IEND", b"")
    )


if __name__ == "__main__":
    (OUT / "icon-192.png").write_bytes(render(192))
    (OUT / "icon-512.png").write_bytes(render(512))
    (OUT / "icon-maskable-512.png").write_bytes(render(512, rounded=False, pad=0.12))
    (OUT / "apple-touch-icon.png").write_bytes(render(180, rounded=False, pad=0.08))
    print("icons written to", OUT)
