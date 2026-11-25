---
code: 5.17.1
title: Areas with the y-axis and volumes of revolution
summary: Areas between a curve and the y-axis, and volumes formed by rotating a region about either axis.
minutes: 35
difficulty: 3
hl: true
objectives:
  - Find the area between a curve and the y-axis.
  - Find volumes of revolution about the x-axis and the y-axis.
formulas:
  - name: Area with the y-axis
    latex: 'A = \int_c^d x\,dy'
  - name: Volume about the x-axis
    latex: 'V = \int_a^b\pi y^2\,dx'
  - name: Volume about the y-axis
    latex: 'V = \int_c^d\pi x^2\,dy'
definitions:
  - term: Volume of revolution
    definition: The volume of the solid formed when a region is rotated 360° about an axis.
mistakes:
  - Using x-limits for a y-axis integral. Rewrite x in terms of y and use y-limits.
  - Forgetting π or forgetting to square y.
tips:
  - For a region between two curves rotated about the x-axis, V = π∫(y₁² − y₂²) dx — not π∫(y₁ − y₂)² dx.
related:
  - math-aa/5-11-definite-integrals-areas
---

## Area with the y-axis

$$
A = \int_c^d x\,dy
$$

Rewrite the curve as $x = g(y)$ and integrate with y-limits.

```example
Find the area between $y = \sqrt x$ (i.e. $x = y^2$), the y-axis and $y = 2$.
---
$\int_0^2 y^2\,dy = \tfrac83$.
```

## Volumes of revolution

```keyidea
Rotating about the x-axis: thin discs of radius y and thickness dx, so V = ∫πy² dx. About the y-axis: V = ∫πx² dy.
```

```figure
src: math-aa/_sme/5-9-advanced-integration/img/fig-16c625b868fba630.png
caption: The area between a curve and the y-axis is found by integrating with respect to y: ∫ |x| dy.
```

```example
Find the volume when $y = \sqrt x$, $0 \le x \le 4$, is rotated about the x-axis.
---
$V = \pi\int_0^4 x\,dx = \pi\left[\tfrac{x^2}2\right]_0^4 = 8\pi$.
```

```example
Find the volume when the region between $y = x^2$, the y-axis and $y = 4$ is rotated about the y-axis.
---
$x^2 = y$: $V = \pi\int_0^4 y\,dy = 8\pi$.
```

```question
vol-x
```

## Summary

- Area with y-axis: $\int x\,dy$.
- Volumes: $\pi\int y^2\,dx$ (x-axis), $\pi\int x^2\,dy$ (y-axis).
