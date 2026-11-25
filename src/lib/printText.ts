/* Text helpers for the Print notes page. */

const fenceOf = (line: string) => /^(`{3,}|~{3,})/.exec(line)?.[1];
const headingLevel = (line: string) => /^(#{1,6})\s/.exec(line)?.[1].length ?? 0;

/** The body of a "## <title>" section (up to the next ## heading), or '' when absent. */
export function sectionOf(md: string, title: string): string {
  const lines = md.split('\n');
  const start = lines.findIndex((l) => new RegExp(`^##\\s+${title}\\s*$`, 'i').test(l));
  if (start < 0) return '';
  let end = start + 1;
  let fence: string | null = null;
  for (; end < lines.length; end++) {
    const f = fenceOf(lines[end]);
    if (f) fence = fence ? (lines[end].startsWith(fence) ? null : fence) : f;
    if (!fence && /^##?\s/.test(lines[end])) break;
  }
  return lines.slice(start + 1, end).join('\n').trim();
}

/** The Markdown inside every ```<kind> block (e.g. keyidea, examtip), in order. */
export function blocksOf(md: string, kind: string): string[] {
  const out: string[] = [];
  const lines = md.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const open = new RegExp(`^(\`{3,})${kind}\\s*$`).exec(lines[i]);
    if (!open) continue;
    const body: string[] = [];
    for (i++; i < lines.length && lines[i].trim() !== open[1]; i++) body.push(lines[i]);
    out.push(body.join('\n').trim());
  }
  return out.filter(Boolean);
}

/**
 * Drops embedded ```question blocks, then any heading left with nothing under it
 * (e.g. "Try it yourself" sections that held only questions).
 */
export function stripChecks(md: string): string {
  const lines = md.split('\n');
  const out: string[] = [];
  let fence: string | null = null;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!fence && /^```question\s*$/.test(line)) {
      while (i + 1 < lines.length && !/^```\s*$/.test(lines[i + 1])) i++;
      i++; // the closing fence
      continue;
    }
    const f = fenceOf(line);
    if (f) fence = fence ? (line.startsWith(fence) ? null : fence) : f;
    out.push(line);
  }

  // A heading is dropped when nothing but blank lines comes before the next heading of the same or a higher level.
  const kept: string[] = [];
  fence = null;
  for (let i = 0; i < out.length; i++) {
    const f = fenceOf(out[i]);
    if (f) fence = fence ? (out[i].startsWith(fence) ? null : fence) : f;
    const h = fence ? 0 : headingLevel(out[i]);
    if (h) {
      let j = i + 1;
      while (j < out.length && !out[j].trim()) j++;
      const next = j < out.length ? headingLevel(out[j]) : 0;
      if (j >= out.length || (next && next <= h)) continue;
    }
    kept.push(out[i]);
  }
  return kept.join('\n').replace(/\n{3,}/g, '\n\n');
}
