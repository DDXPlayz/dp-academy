import { describe, expect, it } from 'vitest';
import { evaluate, equivalent } from './expression';
import { parseNumber } from './answers';

describe('evaluate', () => {
  it('respects precedence and associativity', () => {
    expect(evaluate('2+3*4', {})).toBe(14);
    expect(evaluate('2^3^2', {})).toBe(512);
    expect(evaluate('-2^2', {})).toBe(-4);
    expect(evaluate('(1+2)(3+4)', {})).toBe(21);
  });

  it('handles implicit multiplication and functions', () => {
    expect(evaluate('2gh', { g: 9.8, h: 2 })).toBeCloseTo(39.2);
    expect(evaluate('sqrt(2gh)', { g: 2, h: 4 })).toBe(4);
    expect(evaluate('1/2mv^2', { m: 2, v: 3 })).toBe(9);
  });

  it('rejects unknown symbols', () => {
    expect(() => evaluate('2q', { m: 1 })).toThrow();
  });
});

describe('equivalent', () => {
  it('accepts algebraically equal forms', () => {
    expect(equivalent('mv^2/2', '0.5*m*v^2', ['m', 'v'])).toBe(true);
    expect(equivalent('(v-u)/t', 'v/t-u/t', ['u', 'v', 't'])).toBe(true);
  });

  it('rejects different expressions', () => {
    expect(equivalent('mv^2', '0.5*m*v^2', ['m', 'v'])).toBe(false);
    expect(equivalent('nonsense(', 'v', ['v'])).toBe(false);
  });
});

describe('parseNumber', () => {
  it('reads plain, unit-suffixed and scientific forms', () => {
    expect(parseNumber('9.81')).toBe(9.81);
    expect(parseNumber('12 m/s')).toBe(12);
    expect(parseNumber('1.2e3')).toBe(1200);
    expect(parseNumber('1.5 x 10^3')).toBe(1500);
    expect(parseNumber('3×10^-2')).toBeCloseTo(0.03);
    expect(parseNumber('abc')).toBeNull();
  });
});

describe('expression answers students might type', () => {
  it('accepts equivalent forms of the range formula', () => {
    const ans = '2*u^2*sin(theta)*cos(theta)/g';
    const vars = ['u', 'theta', 'g'];
    expect(equivalent('u^2 sin(2theta)/g', ans, vars)).toBe(true);
    expect(equivalent('2u^2sin(theta)cos(theta)/g', ans, vars)).toBe(true);
    expect(equivalent('u^2 sin(theta)/g', ans, vars)).toBe(false);
  });

  it('accepts sqrt and pi forms', () => {
    expect(equivalent('(2gh)^0.5', 'sqrt(2*g*h)', ['g', 'h'])).toBe(true);
    expect(equivalent('2πr/v', '2*pi*r/v', ['r', 'v'])).toBe(true);
  });
});
