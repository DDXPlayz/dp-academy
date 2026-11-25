import { Children, createContext, isValidElement, memo, useContext, type ReactNode } from 'react';
import ReactMarkdown, { type Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { diagrams } from '../diagrams';
import { Icon } from './Icon';
import { NoteFigure, PlotFigure, SvgFigure } from './LessonFigure';

/*
 * Renders lesson Markdown. Besides normal Markdown and $LaTeX$, lessons can
 * use fenced blocks as building blocks:
 *
 *   ```keyidea      a highlighted key idea (Markdown inside)
 *   ```example      a worked example; "---" separates question from solution
 *   ```mistake      a common-mistake callout
 *   ```diagram      the name of an original SVG diagram in src/diagrams
 *   ```question     the id of a practice question to embed inline
 */

export type EmbedQuestion = (id: string) => ReactNode;

export const slugify = (s: string) =>
  s.toLowerCase().replace(/<[^>]+>/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

function textOf(node: ReactNode): string {
  return Children.toArray(node)
    .map((c) => (typeof c === 'string' ? c : isValidElement<{ children?: ReactNode }>(c) ? textOf(c.props.children) : ''))
    .join('');
}

function Callout({ tone, icon, title, children }: { tone: 'accent' | 'warn'; icon: 'bulb' | 'alert' | 'target'; title: string; children: ReactNode }) {
  const styles = tone === 'accent' ? 'border-accent/30 bg-accent-soft' : 'border-warn/30 bg-warn-soft';
  return (
    <aside className={`md-callout rounded-xl border px-5 py-4 ${styles}`}>
      <p className={`mb-1.5 flex items-center gap-2 text-sm font-semibold ${tone === 'accent' ? 'text-accent' : 'text-warn'}`}>
        <Icon name={icon} size={16} />
        {title}
      </p>
      <div className="prose-lesson prose-tight text-ink">{children}</div>
    </aside>
  );
}

function WorkedExample({ source }: { source: string }) {
  const [question, solution] = source.split(/\n---\n/);
  return (
    <div className="md-example overflow-hidden rounded-xl border border-line bg-card">
      <div className="border-b border-line px-5 py-4">
        <p className="eyebrow mb-1.5">Worked example</p>
        <div className="prose-lesson prose-tight">
          <Markdown>{question}</Markdown>
        </div>
      </div>
      {solution && (
        <details className="group">
          <summary className="flex cursor-pointer list-none items-center gap-2 px-5 py-3 text-sm font-medium text-accent hover:bg-sunken [&::-webkit-details-marker]:hidden">
            <Icon name="chevronRight" size={16} className="transition-transform group-open:rotate-90" />
            <span className="group-open:hidden">Show solution</span>
            <span className="hidden group-open:inline">Solution</span>
          </summary>
          <div className="prose-lesson prose-tight border-t border-line bg-sunken/40 px-5 py-4">
            <Markdown>{solution}</Markdown>
          </div>
        </details>
      )}
    </div>
  );
}

/** A collapsed answer (reference notes: "Answer/Explanation"). */
function Answer({ source }: { source: string }) {
  return (
    <details className="md-answer group overflow-hidden rounded-xl border border-line bg-card">
      <summary className="flex cursor-pointer list-none items-center gap-2 px-5 py-3 text-sm font-medium text-accent hover:bg-sunken [&::-webkit-details-marker]:hidden">
        <Icon name="chevronRight" size={16} className="transition-transform group-open:rotate-90" />
        <span className="group-open:hidden">Show answer</span>
        <span className="hidden group-open:inline">Answer</span>
      </summary>
      <div className="prose-lesson prose-tight border-t border-line bg-sunken/40 px-5 py-4">
        <Markdown>{source}</Markdown>
      </div>
    </details>
  );
}

const EmbedContext = createContext<EmbedQuestion | undefined>(undefined);

function EmbeddedQuestion({ id }: { id: string }) {
  const embed = useContext(EmbedContext);
  return <>{embed?.(id)}</>;
}

/*
 * Component overrides live at module level so their identity is stable:
 * inline functions would make React remount the whole document on every
 * parent render, losing scroll anchors and any half-answered question.
 */
const components: Components = {
  h2: ({ children }) => <h2 id={slugify(textOf(children))}>{children}</h2>,
  h3: ({ children }) => <h3 id={slugify(textOf(children))}>{children}</h3>,
  pre: ({ children }) => <>{children}</>,
  // "#w=240" on an image URL sets its display width; images alt-tagged "math" are cropped equations.
  img: ({ src = '', alt }) => {
    const [url, frag] = src.split('#');
    const width = /^w=(\d+)$/.exec(frag ?? '')?.[1];
    return (
      <img
        src={url}
        alt={alt === 'math' ? 'Equation' : alt === 'fig' ? 'Figure' : (alt ?? '')}
        loading="lazy"
        className={alt === 'math' ? 'lesson-math' : 'lesson-figure'}
        style={width ? { width: `${width}px` } : undefined}
      />
    );
  },
  a: ({ href, children }) =>
    href?.startsWith('http') ? (
      <a href={href} target="_blank" rel="noreferrer noopener">
        {children}
      </a>
    ) : (
      <a href={href}>{children}</a>
    ),
  code: ({ className, children }) => {
    const lang = /language-(\w+)/.exec(className ?? '')?.[1];
    const src = String(children).replace(/\n$/, '');
    if (!lang) return <code>{children}</code>;
    switch (lang) {
      case 'keyidea':
        return (
          <Callout tone="accent" icon="bulb" title="Key idea">
            <Markdown>{src}</Markdown>
          </Callout>
        );
      case 'mistake':
        return (
          <Callout tone="warn" icon="alert" title="Common mistake">
            <Markdown>{src}</Markdown>
          </Callout>
        );
      case 'examtip':
        return (
          <Callout tone="accent" icon="target" title="Exam tip">
            <Markdown>{src}</Markdown>
          </Callout>
        );
      case 'example':
        return <WorkedExample source={src} />;
      case 'answer':
        return <Answer source={src} />;
      case 'mathstack':
        // One display equation that the source cropped line by line: stack the pieces tightly.
        return (
          <div className="math-stack">
            <Markdown>{src.split('\n').join('\n\n')}</Markdown>
          </div>
        );
      case 'diagram': {
        const D = diagrams[src.trim()];
        return D ? <D /> : <p className="text-bad">Missing diagram “{src}”</p>;
      }
      case 'question':
        return <EmbeddedQuestion id={src.trim()} />;
      case 'svg':
        return <SvgFigure src={src} />;
      case 'plot':
        return <PlotFigure src={src} />;
      case 'figure':
        return <NoteFigure src={src} />;
      default:
        return (
          <pre className="overflow-x-auto rounded-xl border border-line bg-sunken p-4 text-sm">
            <code>{src}</code>
          </pre>
        );
    }
  },
};

/** "$$x$$" on a line of its own is meant as display maths; remark-math needs the delimiters on separate lines. */
const displayMath = (md: string) => md.replace(/^([ \t]*)\$\$(.+?)\$\$[ \t]*$/gm, '$1$$$$\n$1$2\n$1$$$$');

export const Markdown = memo(function Markdown({ children, embedQuestion }: { children: string; embedQuestion?: EmbedQuestion }) {
  const doc = (
    <ReactMarkdown remarkPlugins={[remarkGfm, remarkMath]} rehypePlugins={[rehypeKatex]} components={components}>
      {displayMath(children)}
    </ReactMarkdown>
  );
  return embedQuestion ? <EmbedContext.Provider value={embedQuestion}>{doc}</EmbedContext.Provider> : doc;
});

const inlineComponents: Components = { p: ({ children }) => <>{children}</> };

/** Inline Markdown for short strings such as question prompts and options. */
export function Inline({ children }: { children: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkMath]}
      rehypePlugins={[rehypeKatex]}
      components={inlineComponents}
    >
      {children}
    </ReactMarkdown>
  );
}

/** Headings (## and ###) in a lesson body, for its table of contents. */
export function headingsOf(md: string): { id: string; text: string; depth: 2 | 3 }[] {
  const out: { id: string; text: string; depth: 2 | 3 }[] = [];
  let inFence = false;
  for (const line of md.split('\n')) {
    if (line.startsWith('```')) inFence = !inFence;
    if (inFence) continue;
    const m = /^(##|###)\s+(.+)$/.exec(line);
    if (m) {
      const text = m[2].replace(/\$([^$]+)\$/g, '$1').replace(/[*_`]/g, '');
      out.push({ id: slugify(text), text, depth: m[1].length as 2 | 3 });
    }
  }
  return out;
}
