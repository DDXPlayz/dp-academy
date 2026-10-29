import katex from 'katex';
import { useMemo } from 'react';
import type { Formula } from '../content/schema';

export function Tex({ latex, display = false }: { latex: string; display?: boolean }) {
  const html = useMemo(() => katex.renderToString(latex, { displayMode: display, throwOnError: false }), [latex, display]);
  return <span dangerouslySetInnerHTML={{ __html: html }} />;
}

export function FormulaCard({ formula, context }: { formula: Formula; context?: string }) {
  return (
    <div className="card flex h-full flex-col p-4">
      <p className="text-sm font-medium text-ink">{formula.name}</p>
      {context && <p className="text-xs text-muted">{context}</p>}
      <div className="my-3 overflow-x-auto text-lg text-ink">
        <Tex latex={formula.latex} display />
      </div>
      {formula.where && <p className="mt-auto text-xs leading-relaxed text-muted">{formula.where}</p>}
    </div>
  );
}
