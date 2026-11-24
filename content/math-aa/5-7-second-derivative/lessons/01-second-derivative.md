---
code: 5.7.1
title: The second derivative
summary: f″(x), concavity, and how the graphs of f, f′ and f″ relate.
minutes: 25
difficulty: 2
objectives:
  - Find second derivatives.
  - Relate the sign of f″(x) to concavity.
  - Sketch and interpret the graphs of f, f′ and f″ from each other.
formulas:
  - name: Second derivative
    latex: "f''(x) = \\frac{d^2y}{dx^2}"
definitions:
  - term: Concave up
    definition: The graph bends upward (like a cup); f″(x) > 0 and the gradient is increasing.
  - term: Concave down
    definition: The graph bends downward (like a cap); f″(x) < 0 and the gradient is decreasing.
mistakes:
  - Reading features of f from the graph of f′ incorrectly — zeros of f′ are stationary points of f, not zeros of f.
tips:
  - Maxima/minima of f′ correspond to points of inflexion of f.
related:
  - math-aa/5-8-stationary-points-optimisation
---

## Concavity

```keyidea
f″(x) > 0: concave up — the gradient is increasing. f″(x) < 0: concave down — the gradient is decreasing.
```

```example
For $f(x) = x^3 - 6x^2 + 5$, find where the graph is concave up.
---
$f'(x) = 3x^2 - 12x$, $f''(x) = 6x - 12 > 0 \Rightarrow x > 2$.
```

## Reading f, f′ and f″

| On the graph of f | On the graph of f′ |
|---|---|
| stationary point | crosses the x-axis |
| increasing | above the axis |
| point of inflexion | turning point |
| concave up | increasing |

```plot
caption: f(x) = x³ − 3x² (accent), f′(x) = 3x² − 6x and f″(x) = 6x − 6. f′ is zero at f’s turning points; f″ is zero at f’s inflexion (x = 1).
x: -1.5, 3.5
y: -6, 8
f: x^3 - 3*x^2 | f
f: 3*x^2 - 6*x | f′
f: 6*x - 6 | f″
hline: 0
```

```question
second-deriv
```

## Summary

- $f'' > 0$ concave up; $f'' < 0$ concave down.
- Zeros of $f'$ ↔ stationary points of $f$; turning points of $f'$ ↔ inflexions of $f$.
