---
code: 5.19.1
title: Maclaurin series
summary: Approximating functions by polynomials built from their derivatives at 0, and generating new series from known ones.
minutes: 35
difficulty: 3
hl: true
objectives:
  - Derive Maclaurin series using derivatives at x = 0.
  - Recall series for eˣ, sin x, cos x, ln(1 + x) and (1 + x)ᵖ.
  - Obtain new series by substitution, multiplication, differentiation and integration.
  - Develop series from differential equations.
formulas:
  - name: Maclaurin series
    latex: "f(x) = f(0) + xf'(0) + \\frac{x^2}{2!}f''(0) + \\frac{x^3}{3!}f'''(0) + \\ldots"
  - name: Standard series
    latex: 'e^x = 1 + x + \frac{x^2}{2!} + \ldots,\ \sin x = x - \frac{x^3}{3!} + \ldots,\ \cos x = 1 - \frac{x^2}{2!} + \ldots,\ \ln(1 + x) = x - \frac{x^2}{2} + \frac{x^3}{3} - \ldots'
definitions:
  - term: Maclaurin series
    definition: A power-series expansion of f(x) about x = 0 using the values of its derivatives at 0.
mistakes:
  - Forgetting the factorials in the denominators.
tips:
  - To get e^(2x), substitute 2x into the eˣ series — no need to differentiate again.
related:
  - math-aa/5-13-lhopital
  - math-aa/1-10-counting-principles
---

## Building a series

$$
f(x) = f(0) + xf'(0) + \frac{x^2}{2!}f''(0) + \frac{x^3}{3!}f'''(0) + \ldots
$$

```example
Find the Maclaurin series of $e^x$ up to $x^3$.
---
All derivatives are $e^x$, equal to 1 at 0: $e^x = 1 + x + \dfrac{x^2}{2} + \dfrac{x^3}{6} + \ldots$
```

## Standard series

| f(x) | series |
|---|---|
| $e^x$ | $1 + x + \frac{x^2}{2!} + \frac{x^3}{3!} + \ldots$ |
| $\sin x$ | $x - \frac{x^3}{3!} + \frac{x^5}{5!} - \ldots$ |
| $\cos x$ | $1 - \frac{x^2}{2!} + \frac{x^4}{4!} - \ldots$ |
| $\ln(1 + x)$ | $x - \frac{x^2}2 + \frac{x^3}3 - \ldots$ |
| $(1 + x)^p$ | $1 + px + \frac{p(p - 1)}{2!}x^2 + \ldots$ |

## New series from old

```keyidea
Substitute (e.g. x → 2x or x → x²), multiply two series, or differentiate/integrate term by term, instead of differentiating from scratch.
```

```example
Find the series for $e^x\sin x$ up to $x^3$.
---
$(1 + x + \tfrac{x^2}2)(x - \tfrac{x^3}6) = x + x^2 + \tfrac{x^3}2 - \tfrac{x^3}6 + \ldots = x + x^2 + \tfrac{x^3}{3}$.
```

## From differential equations

Differentiate the DE repeatedly to find $y'(0), y''(0), \ldots$ from the initial condition, then build the series.

```question
maclaurin-coeff
```

## Summary

- $f(x) = \sum \frac{f^{(n)}(0)}{n!}x^n$.
- Learn the standard series; build others by substitution, products, differentiation and integration.
