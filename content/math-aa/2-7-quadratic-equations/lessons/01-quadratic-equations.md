---
code: 2.7.1
title: Quadratic equations and inequalities
summary: Solving by factorising and the formula, the discriminant and the nature of roots, and quadratic inequalities.
minutes: 30
difficulty: 2
objectives:
  - Solve quadratic equations by factorising, completing the square or the quadratic formula.
  - Use the discriminant to determine the number of real roots.
  - Solve quadratic inequalities using a sketch.
formulas:
  - name: Quadratic formula
    latex: 'x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}'
  - name: Discriminant
    latex: '\Delta = b^2 - 4ac'
definitions:
  - term: Discriminant
    definition: Δ = b² − 4ac. Δ > 0 two distinct real roots; Δ = 0 two equal roots; Δ < 0 no real roots.
mistakes:
  - Dividing an inequality by an expression that could be negative, or solving it like an equation without a sketch.
tips:
  - Words like tangent, touches or equal roots mean Δ = 0; does not meet means Δ < 0.
related:
  - math-aa/2-6-quadratic-functions
---

## Solving

$$
x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}
$$

```example
Solve $3x^2 - 5x - 2 = 0$.
---
Factorise: $(3x + 1)(x - 2) = 0 \Rightarrow x = -\tfrac13$ or $x = 2$.
```

## The discriminant

```keyidea
Δ = b² − 4ac tells you how many real roots there are without solving: Δ > 0 two, Δ = 0 one repeated, Δ < 0 none.
```

```example
Find k so that $x^2 + kx + 9 = 0$ has equal roots.
---
$\Delta = k^2 - 36 = 0 \Rightarrow k = \pm6$.
```

```example
Find the values of m for which the line $y = mx - 1$ does not meet the curve $y = x^2$.
---
$x^2 - mx + 1 = 0$ must have no real roots: $m^2 - 4 < 0 \Rightarrow -2 < m < 2$.
```

## Quadratic inequalities

Find the roots, sketch the parabola, then read off where it is above or below the axis.

```example
Solve $x^2 - x - 6 > 0$.
---
Roots $x = -2, 3$. The parabola opens up, so it is positive outside the roots: $x < -2$ or $x > 3$.
```

```question
discriminant-roots
```

## Summary

- Factorise, complete the square or use the formula.
- Δ decides the number of real roots.
- Inequalities: roots + sketch.
