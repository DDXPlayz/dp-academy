---
code: 5.2.1
title: Increasing and decreasing functions
summary: Using the sign of f′(x) to tell where a function rises or falls.
minutes: 20
difficulty: 1
objectives:
  - Relate f′(x) > 0, f′(x) = 0 and f′(x) < 0 to the shape of the graph.
  - Find intervals where a function is increasing or decreasing.
definitions:
  - term: Increasing function
    definition: A function where f′(x) > 0 on an interval — y rises as x rises.
  - term: Stationary point
    definition: A point where f′(x) = 0.
mistakes:
  - Including stationary points carelessly — state intervals clearly, e.g. x < −1 or x > 3.
tips:
  - Solve f′(x) = 0 first, then test the sign of f′ in each interval.
related:
  - math-aa/5-8-stationary-points-optimisation
---

## The sign of the derivative

```keyidea
f′(x) > 0: increasing. f′(x) < 0: decreasing. f′(x) = 0: stationary (horizontal tangent).
```

```plot
caption: f(x) = x³ − 3x (accent) and its derivative f′(x) = 3x² − 3. Where f′ is above the axis, f increases.
x: -2.5, 2.5
y: -4, 6
f: x^3 - 3*x | f(x)
f: 3*x^2 - 3 | f′(x)
hline: 0
```

```example
Find where $f(x) = x^3 - 6x^2 + 9x + 1$ is decreasing.
---
$f'(x) = 3x^2 - 12x + 9 = 3(x - 1)(x - 3)$. This is negative between the roots: decreasing for $1 < x < 3$.
```

```question
dec-interval
```

## Summary

- Sign of $f'$ gives increasing/decreasing.
- Solve $f'(x) = 0$, then test intervals.
