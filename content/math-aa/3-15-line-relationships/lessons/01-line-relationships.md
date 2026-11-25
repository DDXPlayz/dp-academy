---
code: 3.15.1
title: Relationships between lines
summary: Deciding whether two lines are coincident, parallel, intersecting or skew, and finding the point of intersection.
minutes: 30
difficulty: 3
hl: true
objectives:
  - Classify pairs of lines as coincident, parallel, intersecting or skew.
  - Find the point of intersection of two lines.
definitions:
  - term: Skew lines
    definition: Lines in 3D that are not parallel and do not intersect.
  - term: Coincident lines
    definition: Lines that are the same line.
mistakes:
  - Using the same parameter for both lines. Use λ for one and μ for the other.
tips:
  - Solve two of the three component equations for λ and μ, then check the third.
related:
  - math-aa/3-14-vector-lines
---

## Classifying two lines

```keyidea
Parallel directions? If yes: coincident (share a point) or parallel (don’t). If no: solve for λ, μ — a consistent solution means they intersect; an inconsistency means they are skew.
```

## Finding an intersection

```example
$L_1: \mathbf r = (1, 2, 3) + \lambda(1, -1, 2)$; $L_2: \mathbf r = (2, 0, 1) + \mu(0, 1, 2)$. Do they intersect?
---
$x$: $1 + \lambda = 2 \Rightarrow \lambda = 1$. $y$: $2 - \lambda = \mu \Rightarrow \mu = 1$. $z$: $3 + 2\lambda = 5$ and $1 + 2\mu = 3$ — not equal.

Directions are not parallel and the equations are inconsistent, so the lines are **skew**.
```

```figure
src: math-aa/_sme/3-10-vector-equations-of-lines/img/fig-a0f8114139c35cf3.png
caption: Skew lines are neither parallel nor intersecting; the shortest distance between them is along the common perpendicular.
```

```example
$L_1: \mathbf r = (1, 1, 0) + \lambda(1, 2, 1)$; $L_2: \mathbf r = (2, 1, 3) + \mu(0, 1, -1)$. Find their intersection.
---
$x$: $1 + \lambda = 2 \Rightarrow \lambda = 1$. $y$: $1 + 2 = 1 + \mu \Rightarrow \mu = 2$. $z$: $0 + 1 = 1$ and $3 - 2 = 1$ ✓. Intersection $(2, 3, 1)$.
```

```question
classify-lines
```

## Summary

- Parallel test first, then solve for λ and μ.
- Third equation consistent → intersect; inconsistent → skew.
