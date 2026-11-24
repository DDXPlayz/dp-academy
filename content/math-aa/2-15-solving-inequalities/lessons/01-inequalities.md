---
code: 2.15.1
title: Solving inequalities
summary: Solving g(x) ≥ f(x) analytically and graphically, including polynomial and rational inequalities.
minutes: 25
difficulty: 3
hl: true
objectives:
  - Solve polynomial inequalities using roots and a sign diagram or sketch.
  - Solve rational inequalities without multiplying by an expression of unknown sign.
  - Solve inequalities graphically with technology.
definitions:
  - term: Sign diagram
    definition: A number line showing where an expression is positive, negative or zero, based on its critical values.
mistakes:
  - Multiplying both sides of an inequality by an expression that may be negative. Move everything to one side instead.
tips:
  - Critical values come from zeros of the numerator and the denominator; the denominator’s zeros are never included.
related:
  - math-aa/2-7-quadratic-equations
---

## Method

```keyidea
Rearrange to "expression ≥ 0", factorise, find critical values (zeros and undefined points), then test the sign in each interval — or sketch.
```

```example
Solve $x^3 - x^2 - 6x > 0$.
---
$x(x - 3)(x + 2) > 0$. Critical values $-2, 0, 3$. A positive cubic is negative, positive, negative, positive across the intervals, so $-2 < x < 0$ or $x > 3$.
```

```example
Solve $\dfrac{x + 1}{x - 2} \le 3$.
---
$\dfrac{x + 1 - 3(x - 2)}{x - 2} \le 0 \Rightarrow \dfrac{7 - 2x}{x - 2} \le 0$. Critical values $2$ (excluded) and $3.5$. Testing: the expression is ≤ 0 for $x < 2$ or $x \ge 3.5$.
```

## Graphically

To solve $g(x) \ge f(x)$, graph both and find where $g$ lies on or above $f$, using the intersection points.

```question
cubic-ineq
```

## Summary

- One side zero → factorise → critical values → sign diagram.
- Never multiply by an expression of unknown sign.
- Graphically: read where one curve is above the other.
