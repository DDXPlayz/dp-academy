/*
 * Figures written directly in lesson Markdown:
 *
 *   ```svg                       ```plot
 *   caption: What it shows       caption: y = x² and its tangent at x = 1
 *   <svg viewBox="0 0 400 200">  x: -3, 3
 *     …                          y: -1, 9
 *   </svg>                       f: x^2 | y = x²
 *   ```                          f: 2x - 1 | tangent
 *                                point: 1, 1 | (1, 1)
 *                                xlabel: x
 *                                ylabel: y
 *                                ```
 *
 * SVGs are authored for DP Academy; they use currentColor and the theme
 * variables (--accent, --muted, --good, --bad) so they work in both themes.
 */
import { useMemo } from 'react';
import { evaluate } from '../lib/expression';

function Frame({ caption, children }: { caption?: string; children: React.ReactNode }) {
  return (
    <figure className="lesson-fig my-6">
      <div className="rounded-xl border border-line bg-card p-4 text-ink">{children}</div>
      {caption && <figcaption className="mt-2 text-center text-sm text-muted">{caption}</figcaption>}
    </figure>
  );
}

function header(src: string) {
  const lines = src.split('\n');
  const meta: Record<string, string[]> = {};
  const rest: string[] = [];
  for (const line of lines) {
    const m = /^([a-z]+):\s*(.*)$/.exec(line.trim());
    if (m && !line.trim().startsWith('<')) (meta[m[1]] ??= []).push(m[2]);
    else rest.push(line);
  }
  return { meta, rest: rest.join('\n') };
}

/** Removes scripts, event handlers and external references from authored SVG. */
function sanitize(svg: string) {
  return svg
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/\son\w+="[^"]*"/gi, '')
    .replace(/(href|xlink:href)="(?!#)[^"]*"/gi, '');
}

export function SvgFigure({ src }: { src: string }) {
  const { meta, rest } = header(src);
  const svg = sanitize(rest.trim()).replace(/<svg\b/, '<svg role="img" class="mx-auto block h-auto w-full max-w-xl" font-family="inherit"');
  return (
    <Frame caption={meta.caption?.[0]}>
      <div dangerouslySetInnerHTML={{ __html: svg }} />
    </Frame>
  );
}

const COLORS = ['var(--accent)', 'var(--good)', 'var(--bad)', 'var(--warn)', 'var(--muted)'];

function nums(s: string | undefined, fallback: [number, number]): [number, number] {
  if (!s) return fallback;
  const [a, b] = s.split(',').map((x) => Number(evaluateSafe(x.trim())));
  return Number.isFinite(a) && Number.isFinite(b) && a < b ? [a, b] : fallback;
}

function evaluateSafe(expr: string, x?: number): number {
  try {
    return evaluate(expr, x === undefined ? {} : { x });
  } catch {
    return NaN;
  }
}

function ticks(lo: number, hi: number) {
  const span = hi - lo;
  const raw = span / 8;
  const mag = 10 ** Math.floor(Math.log10(raw));
  const step = [1, 2, 5, 10].map((m) => m * mag).find((s) => s >= raw) ?? mag * 10;
  const out: number[] = [];
  for (let v = Math.ceil(lo / step) * step; v <= hi + 1e-9; v += step) out.push(Math.round(v / step) * step);
  return out;
}

export function PlotFigure({ src }: { src: string }) {
  const { meta } = header(src);
  const W = 440;
  const H = 280;
  const P = { l: 34, r: 16, t: 14, b: 26 };
  const [x0, x1] = nums(meta.x?.[0], [-5, 5]);
  const [y0, y1] = nums(meta.y?.[0], [-5, 5]);
  const sx = (x: number) => P.l + ((x - x0) / (x1 - x0)) * (W - P.l - P.r);
  const sy = (y: number) => H - P.b - ((y - y0) / (y1 - y0)) * (H - P.t - P.b);

  const curves = useMemo(
    () =>
      (meta.f ?? []).map((spec, i) => {
        const [expr, label] = spec.split('|').map((s) => s.trim());
        const segs: string[] = [];
        let cur = '';
        const N = 400;
        let prevY: number | null = null;
        for (let k = 0; k <= N; k++) {
          const x = x0 + ((x1 - x0) * k) / N;
          const y = evaluateSafe(expr, x);
          const ok = Number.isFinite(y) && y > y0 - (y1 - y0) * 2 && y < y1 + (y1 - y0) * 2;
          const jump = prevY !== null && Math.abs(y - prevY) > (y1 - y0) * 0.9;
          if (!ok || jump) {
            if (cur) segs.push(cur);
            cur = ok ? `M${sx(x).toFixed(1)} ${sy(y).toFixed(1)}` : '';
          } else cur += `${cur ? 'L' : 'M'}${sx(x).toFixed(1)} ${sy(y).toFixed(1)}`;
          prevY = ok ? y : null;
        }
        if (cur) segs.push(cur);
        return { d: segs.join(''), label, color: COLORS[i % COLORS.length] };
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [src],
  );
  const points = (meta.point ?? []).map((spec) => {
    const [xy, label] = spec.split('|').map((s) => s.trim());
    const [px, py] = xy.split(',').map((v) => evaluateSafe(v.trim()));
    return { px, py, label };
  });
  const vlines = (meta.vline ?? []).map((v) => evaluateSafe(v.split('|')[0].trim()));
  const hlines = (meta.hline ?? []).map((v) => evaluateSafe(v.split('|')[0].trim()));
  const ax = x0 <= 0 && x1 >= 0 ? sx(0) : sx(x0);
  const ay = y0 <= 0 && y1 >= 0 ? sy(0) : sy(y0);

  return (
    <Frame caption={meta.caption?.[0]}>
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={meta.caption?.[0] ?? 'Graph'} className="mx-auto block h-auto w-full max-w-xl" fontFamily="inherit">
        <defs>
          <clipPath id="plot-area">
            <rect x={P.l} y={P.t} width={W - P.l - P.r} height={H - P.t - P.b} />
          </clipPath>
        </defs>
        {ticks(x0, x1).map((t) => (
          <g key={`x${t}`}>
            <line x1={sx(t)} x2={sx(t)} y1={P.t} y2={H - P.b} stroke="var(--line)" />
            {t !== 0 && (
              <text x={sx(t)} y={Math.min(ay + 14, H - 6)} textAnchor="middle" fontSize="10" fill="var(--muted)">
                {+t.toFixed(6)}
              </text>
            )}
          </g>
        ))}
        {ticks(y0, y1).map((t) => (
          <g key={`y${t}`}>
            <line x1={P.l} x2={W - P.r} y1={sy(t)} y2={sy(t)} stroke="var(--line)" />
            {t !== 0 && (
              <text x={Math.max(ax - 5, 28)} y={sy(t) + 3} textAnchor="end" fontSize="10" fill="var(--muted)">
                {+t.toFixed(6)}
              </text>
            )}
          </g>
        ))}
        <line x1={P.l} x2={W - P.r} y1={ay} y2={ay} stroke="currentColor" strokeWidth="1.2" />
        <line x1={ax} x2={ax} y1={P.t} y2={H - P.b} stroke="currentColor" strokeWidth="1.2" />
        <text x={W - P.r} y={ay - 6} textAnchor="end" fontSize="12" fill="currentColor" fontStyle="italic">
          {meta.xlabel?.[0] ?? 'x'}
        </text>
        <text x={ax + 6} y={P.t + 10} fontSize="12" fill="currentColor" fontStyle="italic">
          {meta.ylabel?.[0] ?? 'y'}
        </text>
        <g clipPath="url(#plot-area)">
          {vlines.map((v, i) => Number.isFinite(v) && <line key={`v${i}`} x1={sx(v)} x2={sx(v)} y1={P.t} y2={H - P.b} stroke="var(--muted)" strokeDasharray="5 4" />)}
          {hlines.map((v, i) => Number.isFinite(v) && <line key={`h${i}`} x1={P.l} x2={W - P.r} y1={sy(v)} y2={sy(v)} stroke="var(--muted)" strokeDasharray="5 4" />)}
          {curves.map((c, i) => (
            <path key={i} d={c.d} fill="none" stroke={c.color} strokeWidth="2.4" strokeLinejoin="round" />
          ))}
          {points.map((p, i) =>
            Number.isFinite(p.px) && Number.isFinite(p.py) ? (
              <g key={`p${i}`}>
                <circle cx={sx(p.px)} cy={sy(p.py)} r="4" fill="var(--accent)" stroke="var(--card)" strokeWidth="1.5" />
                {p.label && (
                  <text x={sx(p.px) + 7} y={sy(p.py) - 7} fontSize="11" fill="currentColor">
                    {p.label}
                  </text>
                )}
              </g>
            ) : null,
          )}
        </g>
      </svg>
      {curves.some((c) => c.label) && (
        <div className="mt-2 flex flex-wrap justify-center gap-4 text-sm">
          {curves.map((c, i) =>
            c.label ? (
              <span key={i} className="inline-flex items-center gap-1.5 text-ink-2">
                <span className="inline-block h-0.5 w-5 rounded" style={{ background: c.color }} />
                {c.label}
              </span>
            ) : null,
          )}
        </div>
      )}
    </Frame>
  );
}
