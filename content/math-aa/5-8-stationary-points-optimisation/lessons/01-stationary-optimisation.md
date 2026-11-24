---
code: 5.8.1
title: Stationary points and optimisation
summary: Finding and classifying maxima, minima and points of inflexion, and solving optimisation problems.
minutes: 40
difficulty: 3
objectives:
  - Find stationary points by solving f′(x) = 0.
  - Classify them using the first or second derivative test.
  - Find points of inflexion (with zero or non-zero gradient).
  - Solve optimisation problems in context.
definitions:
  - term: Point of inflexion
    definition: A point where the concavity changes; f″(x) = 0 and f″ changes sign.
  - term: Optimisation
    definition: Finding the maximum or minimum value of a quantity, usually by setting its derivative to zero.
mistakes:
  - Assuming f″(x) = 0 always means inflexion. Check that f″ changes sign (e.g. y = x⁴ has f″(0) = 0 but a minimum).
  - Not checking endpoints of a restricted domain in optimisation.
tips:
  - In optimisation, write the quantity as a function of ONE variable using the constraint, then differentiate.
related:
  - math-aa/5-7-second-derivative
---

## Classifying stationary points

```keyidea
Solve f′(x) = 0. Then: f″(x) > 0 → local minimum; f″(x) < 0 → local maximum; f″(x) = 0 → use the first derivative (sign) test.
```

```example
Find and classify the stationary points of $y = x^3 - 3x^2 - 9x + 2$.
---
$y' = 3x^2 - 6x - 9 = 3(x - 3)(x + 1) = 0 \Rightarrow x = -1, 3$.

$y'' = 6x - 6$: at $x = -1$, $y'' = -12$ → maximum $(-1, 7)$; at $x = 3$, $y'' = 12$ → minimum $(3, -25)$.
```

## Points of inflexion

Solve $f''(x) = 0$ and check for a sign change. If $f'$ is also 0 there, it is a **stationary** point of inflexion (e.g. $y = x^3$ at 0).

## Optimisation

```example
A rectangular field is fenced on three sides with 120 m of fencing; the fourth side is a wall. Find the maximum area.
---
Let the sides perpendicular to the wall be $x$: the parallel side is $120 - 2x$. $A = x(120 - 2x) = 120x - 2x^2$.

$A' = 120 - 4x = 0 \Rightarrow x = 30$; $A'' = -4 < 0$ (maximum). Max area $= 30\times60 = 1800$ m².
```

```question
classify-sp
```

## Summary

- $f' = 0$ for stationary points; classify with $f''$ or sign of $f'$.
- Inflexion: $f'' = 0$ and changes sign.
- Optimisation: one-variable function → differentiate → justify max/min.
