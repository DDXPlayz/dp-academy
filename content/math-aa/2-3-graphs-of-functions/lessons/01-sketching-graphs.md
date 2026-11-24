---
code: 2.3.1
title: Graphs of functions and their key features
summary: Sketching graphs from equations or context, using technology, and identifying intercepts, turning points, asymptotes and intersections.
minutes: 25
difficulty: 1
objectives:
  - Sketch graphs showing key features, including from a GDC screen to paper.
  - Identify intercepts, maxima and minima, symmetry, vertex, zeros and asymptotes.
  - Find points of intersection of two curves using technology.
definitions:
  - term: Sketch
    definition: A diagram showing the general shape and key features (intercepts, turning points, asymptotes) with values labelled — not necessarily to scale.
  - term: Zero (root)
    definition: A value of x where f(x) = 0 — an x-intercept of the graph.
mistakes:
  - Drawing a curve that touches or crosses an asymptote it should only approach.
  - Not labelling intercepts and turning points with coordinates.
tips:
  - To solve f(x) = g(x) on a GDC, graph both and use the intersect function; or graph f(x) − g(x) and find zeros.
related:
  - math-aa/2-4-key-features-of-graphs
---

## What a good sketch shows

```keyidea
A sketch needs the right shape plus labelled key features: x- and y-intercepts, maxima/minima, asymptotes (as dashed lines with equations), and endpoints of a restricted domain.
```

```plot
caption: y = x³ − 3x with its key features — intercepts at x = 0, ±√3 and turning points at (−1, 2) and (1, −2).
x: -2.5, 2.5
y: -4, 4
f: x^3 - 3*x | y = x³ − 3x
point: -1, 2 | max (−1, 2)
point: 1, -2 | min (1, −2)
point: 1.732, 0 | √3
point: -1.732, 0 | −√3
```

## Key features checklist

| Feature | How to find it |
|---|---|
| y-intercept | $f(0)$ |
| x-intercepts (zeros) | solve $f(x) = 0$ |
| turning points | GDC max/min, or calculus ($f'(x) = 0$) |
| vertical asymptotes | where the function is undefined (denominator 0) |
| horizontal asymptotes | behaviour as $x \to \pm\infty$ |
| symmetry | e.g. axis of symmetry of a parabola |

## Intersections

Points where $y = f(x)$ and $y = g(x)$ meet solve $f(x) = g(x)$.

```example
Find where $y = e^x$ and $y = x + 2$ intersect.
---
Using a GDC: $x \approx -1.84$ (y ≈ 0.159) and $x \approx 1.15$ (y ≈ 3.15). There is no algebraic method here — technology is required.
```

```question
yintercept
```

## Summary

- Sketch = shape + labelled intercepts, turning points, asymptotes.
- Intersections solve $f(x) = g(x)$; use a GDC when algebra fails.
