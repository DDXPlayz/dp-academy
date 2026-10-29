import type { Question } from '../content/schema';
import { equivalent } from './expression';

/** What a student submits, by question type. */
export type Response = number | number[] | boolean | string;

/**
 * Reads a typed number. Accepts "9.81", "9.81 m/s^2", "1.2e3",
 * "1.2 x 10^3" and "1.2×10^-3".
 */
export function parseNumber(input: string): number | null {
  const s = input.trim().replace(/,/g, '').replace(/[−–]/g, '-');
  const sci = /^([-+]?\d*\.?\d+)\s*[x×*]\s*10\s*\^\s*\(?([-+]?\d+)\)?/i.exec(s);
  if (sci) return parseFloat(sci[1]) * 10 ** parseInt(sci[2], 10);
  const plain = /^[-+]?\d*\.?\d+(?:e[-+]?\d+)?/i.exec(s);
  return plain ? parseFloat(plain[0]) : null;
}

const normalise = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();

export function checkAnswer(q: Question, response: Response): boolean {
  switch (q.type) {
    case 'mcq':
      return response === q.answer;
    case 'multi': {
      if (!Array.isArray(response)) return false;
      const a = [...response].sort();
      const b = [...q.answers].sort();
      return a.length === b.length && a.every((x, i) => x === b[i]);
    }
    case 'tf':
      return response === q.answer;
    case 'numeric': {
      const n = typeof response === 'string' ? parseNumber(response) : typeof response === 'number' ? response : null;
      if (n === null) return false;
      if (q.answer === 0) return Math.abs(n) <= q.tolerance;
      return Math.abs(n - q.answer) <= Math.abs(q.answer) * q.tolerance;
    }
    case 'short':
      return typeof response === 'string' && q.accept.some((a) => normalise(a) === normalise(response));
    case 'expression':
      return typeof response === 'string' && equivalent(response, q.answer, q.variables);
  }
}

/** The model answer as a response value — used by tests and "show answer". */
export function correctResponse(q: Question): Response {
  switch (q.type) {
    case 'mcq':
    case 'tf':
      return q.answer;
    case 'multi':
      return q.answers;
    case 'numeric':
      return String(q.answer);
    case 'short':
      return q.accept[0];
    case 'expression':
      return q.answer;
  }
}

/** True when the student has typed or picked enough to submit. */
export function isAnswered(q: Question, response: Response | undefined): boolean {
  if (response === undefined) return false;
  if (q.type === 'multi') return Array.isArray(response) && response.length > 0;
  if (typeof response === 'string') return response.trim().length > 0;
  return true;
}
