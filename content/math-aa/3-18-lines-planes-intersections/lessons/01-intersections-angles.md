---
code: 3.18.1
title: Intersections and angles of lines and planes
summary: Where a line meets a plane, where two or three planes meet, and the angles between lines and planes.
minutes: 35
difficulty: 3
hl: true
objectives:
  - Find the intersection of a line and a plane.
  - Find the line of intersection of two planes, and the intersection of three planes.
  - Find the angle between a line and a plane, and between two planes.
formulas:
  - name: Angle between line and plane
    latex: '\sin\theta = \frac{|\mathbf b\cdot\mathbf n|}{|\mathbf b||\mathbf n|}'
  - name: Angle between two planes
    latex: '\cos\theta = \frac{|\mathbf n_1\cdot\mathbf n_2|}{|\mathbf n_1||\mathbf n_2|}'
definitions:
  - term: Line of intersection
    definition: The line common to two non-parallel planes; its direction is n₁ × n₂.
mistakes:
  - Using cos for the line–plane angle. The dot product with the normal gives the angle to the normal, so the angle to the plane uses sin (or 90° minus).
tips:
  - Line ∥ plane if b · n = 0; then it either lies in the plane or never meets it.
related:
  - math-aa/1-16-linear-systems
  - math-aa/3-17-planes
---

## Line meets plane

Substitute the line’s parametric coordinates into the plane’s equation and solve for λ.

```figure
src: math-aa/_sme/3-11-vector-planes/img/fig-3abac00abf8e2e31.png
caption: Three planes can meet at a single point, along a line, or not at all (for example when two or more are parallel).
```

```example
Find where $\mathbf r = (1, 2, 0) + \lambda(1, -1, 2)$ meets $x + y + z = 9$.
---
$(1 + \lambda) + (2 - \lambda) + 2\lambda = 9 \Rightarrow 3 + 2\lambda = 9 \Rightarrow \lambda = 3$. Point $(4, -1, 6)$.
```

## Two and three planes

- Two non-parallel planes meet in a **line** with direction $\mathbf n_1\times\mathbf n_2$; find one point by setting e.g. $z = 0$.
- Three planes: solve the 3 × 3 system — a point, a line, or no common point (see 1.16).

```figure
src: math-aa/_iitian/ib-mathematics-aa-intersections-of-a-line-with-a-planes-stud/img/fig-228e478a24e0400f.png
caption: Two non-parallel planes meet in a straight line.
```

```example
Find the line of intersection of $x + y + z = 6$ and $x - y + 2z = 5$.
---
Direction: $(1, 1, 1)\times(1, -1, 2) = (3, -1, -2)$. Set $z = 0$: $x + y = 6$, $x - y = 5 \Rightarrow x = 5.5$, $y = 0.5$.

$\mathbf r = (5.5, 0.5, 0) + \lambda(3, -1, -2)$.
```

## Angles

```keyidea
Line–plane: the angle between the line and the normal is found by the dot product; the angle with the plane is its complement, so use sin θ = |b·n|/(|b||n|). Plane–plane: the angle between the normals.
```

```figure
src: math-aa/_sme/3-11-vector-planes/img/fig-be03d6529a4aaf20.png
caption: The angle between a line and a plane is found using the normal: it equals 90° minus the angle between the line and the normal.
```

```figure
src: math-aa/_sme/3-11-vector-planes/img/fig-cec1d515d464b7d1.png
caption: The angle between two planes equals the angle between their normal vectors (or its supplement).
```

```figure
src: math-aa/_sme/3-11-vector-planes/img/fig-37d10455f069b72e.png
caption: The shortest distance from a point to a plane is along the normal through that point.
```

```example
Find the angle between a line with direction $(1, 1, 0)$ and the plane $x + z = 4$.
---
$\mathbf n = (1, 0, 1)$. $\sin\theta = \dfrac{1}{\sqrt2\sqrt2} = \tfrac12 \Rightarrow \theta = 30°$.
```

```question
line-plane-point
```

## Summary

- Line ∩ plane: substitute and solve for λ.
- Two planes: direction $\mathbf n_1\times\mathbf n_2$ plus one point.
- Line–plane angle uses sin; plane–plane uses the normals.
