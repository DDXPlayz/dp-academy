---
code: 1.8.1
title: Infinite geometric series
summary: When adding infinitely many terms gives a finite total, and how to find it.
minutes: 20
difficulty: 2
objectives:
  - State the condition for a geometric series to converge.
  - Find the sum to infinity.
  - Solve problems such as recurring decimals and conditions on x for convergence.
formulas:
  - name: Sum to infinity
    latex: 'S_\infty = \frac{u_1}{1 - r}, \quad |r| < 1'
definitions:
  - term: Convergent series
    definition: An infinite series whose partial sums approach a finite limit.
mistakes:
  - Using S∞ when |r| ≥ 1. The series diverges then.
tips:
  - For a series in x, convergence gives an inequality — solve |r(x)| < 1.
related:
  - math-aa/1-3-geometric-sequences
---

## When does it converge?

If $|r| < 1$, then $r^n \to 0$ as $n \to \infty$, so $S_n = \dfrac{u_1(1 - r^n)}{1 - r} \to \dfrac{u_1}{1 - r}$.

```keyidea
A geometric series converges exactly when |r| < 1, and then S∞ = u₁/(1 − r).
```

```example
Find the sum to infinity of 18 − 12 + 8 − …
---
$r = -\tfrac{2}{3}$, so $S_\infty = \dfrac{18}{1 + \tfrac{2}{3}} = 10.8$.
```

## Recurring decimals

```example
Write $0.\overline{36}$ as a fraction.
---
$0.36 + 0.0036 + \ldots$: $u_1 = 0.36$, $r = 0.01$, $S_\infty = \dfrac{0.36}{0.99} = \dfrac{4}{11}$.
```

## Conditions on x

```example
For which x does $1 + (2x - 1) + (2x - 1)^2 + \ldots$ converge?
---
$|2x - 1| < 1 \Rightarrow -1 < 2x - 1 < 1 \Rightarrow 0 < x < 1$.
```

```question
sinf-calc
```

## Summary

- Converges iff $|r| < 1$; $S_\infty = u_1/(1 - r)$.
- Recurring decimals and convergence conditions use the same idea.
