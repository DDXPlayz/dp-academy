/*
 * A small, safe evaluator for the algebraic answers students type, such as
 * "1/2 m v^2" or "sqrt(2gh)". No eval: the input is tokenised and parsed with
 * precedence climbing. Implicit multiplication is supported ("2gh", "m(v+u)").
 */

type Token =
  | { t: 'num'; v: number }
  | { t: 'id'; v: string }
  | { t: 'op'; v: '+' | '-' | '*' | '/' | '^' }
  | { t: 'lp' }
  | { t: 'rp' };

const FUNCS: Record<string, (x: number) => number> = {
  sqrt: Math.sqrt,
  sin: Math.sin,
  cos: Math.cos,
  tan: Math.tan,
  ln: Math.log,
  log: Math.log10,
  exp: Math.exp,
  abs: Math.abs,
};
const CONSTS: Record<string, number> = { pi: Math.PI, π: Math.PI, e: Math.E };

export class ExpressionError extends Error {}

function tokenize(src: string, variables: string[]): Token[] {
  const s = src.replace(/\s+/g, '').replace(/[×·]/g, '*').replace(/÷/g, '/').replace(/\*\*/g, '^').replace(/[−–]/g, '-');
  // Longest names first so "theta" wins over "t" and "sqrt" over "s".
  const names = [...variables, ...Object.keys(FUNCS), ...Object.keys(CONSTS)].sort((a, b) => b.length - a.length);
  const out: Token[] = [];
  let i = 0;
  while (i < s.length) {
    const c = s[i];
    if (/[0-9.]/.test(c)) {
      const m = /^\d*\.?\d+(?:[eE][+-]?\d+)?|^\d+\.?/.exec(s.slice(i))!;
      out.push({ t: 'num', v: parseFloat(m[0]) });
      i += m[0].length;
    } else if ('+-*/^'.includes(c)) {
      out.push({ t: 'op', v: c as '+' });
      i++;
    } else if (c === '(') {
      out.push({ t: 'lp' });
      i++;
    } else if (c === ')') {
      out.push({ t: 'rp' });
      i++;
    } else {
      const name = names.find((n) => s.startsWith(n, i));
      if (!name) throw new ExpressionError(`Unknown symbol "${c}"`);
      out.push({ t: 'id', v: name });
      i += name.length;
    }
  }
  // Insert "*" wherever two operands sit side by side.
  const withImplicit: Token[] = [];
  for (const tok of out) {
    const prev = withImplicit[withImplicit.length - 1];
    const prevEnds = prev && (prev.t === 'num' || prev.t === 'rp' || (prev.t === 'id' && !(prev.v in FUNCS)));
    const startsOperand = tok.t === 'num' || tok.t === 'id' || tok.t === 'lp';
    if (prevEnds && startsOperand) withImplicit.push({ t: 'op', v: '*' });
    withImplicit.push(tok);
  }
  return withImplicit;
}

export function evaluate(src: string, scope: Record<string, number>): number {
  const tokens = tokenize(src, Object.keys(scope));
  let pos = 0;
  const peek = () => tokens[pos];

  const PREC = { '+': 1, '-': 1, '*': 2, '/': 2, '^': 4 } as const;

  function primary(): number {
    const tok = tokens[pos++];
    if (!tok) throw new ExpressionError('Expression ended early');
    if (tok.t === 'num') return tok.v;
    if (tok.t === 'op' && (tok.v === '-' || tok.v === '+')) {
      // Unary minus binds looser than ^ so that -x^2 = -(x^2).
      const v = expr(3);
      return tok.v === '-' ? -v : v;
    }
    if (tok.t === 'lp') {
      const v = expr(0);
      if (tokens[pos++]?.t !== 'rp') throw new ExpressionError('Missing ")"');
      return v;
    }
    if (tok.t === 'id') {
      if (tok.v in FUNCS) return FUNCS[tok.v](primary());
      if (tok.v in scope) return scope[tok.v];
      if (tok.v in CONSTS) return CONSTS[tok.v];
    }
    throw new ExpressionError('Unexpected symbol');
  }

  function expr(minPrec: number): number {
    let left = primary();
    for (;;) {
      const tok = peek();
      if (!tok || tok.t !== 'op') break;
      const prec = PREC[tok.v];
      if (prec < minPrec) break;
      pos++;
      // ^ is right-associative.
      const right = expr(tok.v === '^' ? prec : prec + 1);
      if (tok.v === '+') left += right;
      else if (tok.v === '-') left -= right;
      else if (tok.v === '*') left *= right;
      else if (tok.v === '/') left /= right;
      else left = Math.pow(left, right);
    }
    return left;
  }

  const value = expr(0);
  if (pos !== tokens.length) throw new ExpressionError('Unexpected symbol');
  return value;
}

/** True when two expressions agree at several random points. */
export function equivalent(a: string, b: string, variables: string[]): boolean {
  try {
    for (let trial = 0; trial < 6; trial++) {
      const scope: Record<string, number> = {};
      // Deterministic, awkward values: positive, not integers, not equal.
      variables.forEach((v, i) => (scope[v] = 1.3 + ((trial * 7 + i * 3) % 11) * 0.37));
      const x = evaluate(a, scope);
      const y = evaluate(b, scope);
      if (!Number.isFinite(x) || !Number.isFinite(y)) return false;
      if (Math.abs(x - y) > 1e-9 * Math.max(1, Math.abs(y))) return false;
    }
    return true;
  } catch {
    return false;
  }
}
