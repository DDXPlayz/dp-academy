---
code: 1.16.1
title: Systems of linear equations
summary: Solving up to three equations in three unknowns by elimination, and recognising unique, infinite or no solutions.
minutes: 30
difficulty: 3
hl: true
objectives:
  - Solve systems of up to three linear equations in three unknowns using row reduction (elimination).
  - Identify systems with a unique solution, infinitely many solutions or no solution.
  - Express infinite solutions in terms of a parameter.
definitions:
  - term: Consistent system
    definition: A system with at least one solution.
  - term: Inconsistent system
    definition: A system with no solution — elimination produces a statement like 0 = 5.
mistakes:
  - Stopping when a row becomes 0 = 0. That means infinitely many solutions — introduce a parameter.
tips:
  - A GDC solves unique cases instantly, but you must show elimination when a parameter (like k) is involved.
related:
  - math-aa/3-17-planes
---

## Elimination

Use one equation to eliminate a variable from the others, reducing to a triangular form, then back-substitute.

```example
Solve: $x + y + z = 6$, $2x - y + z = 3$, $x + 2y - z = 2$.
---
R2 − 2R1: $-3y - z = -9$. R3 − R1: $y - 2z = -4$.

From the second: $y = 2z - 4$. Substitute: $-3(2z - 4) - z = -9 \Rightarrow -7z = -21 \Rightarrow z = 3$, $y = 2$, $x = 1$.
```

## Three possible outcomes

```keyidea
Unique solution (one point). Infinitely many (elimination gives 0 = 0 — the planes share a line). No solution (elimination gives 0 = non-zero — inconsistent).
```

```example
For which k does $x + y + z = 1$, $x + 2y + 3z = 2$, $2x + 3y + 4z = k$ have solutions? Find them.
---
R2 − R1: $y + 2z = 1$. R3 − 2R1: $y + 2z = k - 2$. Consistent only if $k - 2 = 1$, i.e. $k = 3$.

Then let $z = \lambda$: $y = 1 - 2\lambda$, $x = 1 - y - z = \lambda$. Solutions $(\lambda, 1 - 2\lambda, \lambda)$ — infinitely many.
```

Geometrically, each equation is a plane in 3D; the solution set is their intersection.

```question
system-unique
```

## Summary

- Eliminate, triangulate, back-substitute.
- 0 = 0 → infinitely many (parameter); 0 = c ≠ 0 → no solution.
