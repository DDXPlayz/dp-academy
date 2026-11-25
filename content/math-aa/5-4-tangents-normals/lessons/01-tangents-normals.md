---
code: 5.4.1
title: Tangents and normals
summary: Finding equations of tangents and normals to curves at given points.
minutes: 20
difficulty: 2
objectives:
  - Find the equation of the tangent to a curve at a point.
  - Find the equation of the normal at a point.
  - Find points where the tangent has a given gradient.
formulas:
  - name: Tangent
    latex: "y - y_1 = f'(x_1)(x - x_1)"
  - name: Normal
    latex: "y - y_1 = -\\frac{1}{f'(x_1)}(x - x_1)"
definitions:
  - term: Normal
    definition: The line perpendicular to the tangent at the point of contact.
mistakes:
  - Using f′(x) (a function) as the gradient instead of f′(x₁) (a number).
tips:
  - Find y₁ from the original function, not from the derivative.
related:
  - math-aa/2-1-straight-lines
---

## Method

```keyidea
1. Find y₁ = f(x₁). 2. Find m = f′(x₁). 3. Tangent: y − y₁ = m(x − x₁). Normal: gradient −1/m.
```

```figure
src: math-aa/_sme/5-1-differentiation/img/fig-7354536c9776f191.png
caption: The tangent touches the curve at a point with the same gradient; the normal is perpendicular to it there.
```

```example
Find the tangent and normal to $y = x^3 - 2x$ at $x = 1$.
---
$y_1 = -1$. $\dfrac{dy}{dx} = 3x^2 - 2 = 1$ at $x = 1$.

Tangent: $y + 1 = 1(x - 1) \Rightarrow y = x - 2$. Normal: $y + 1 = -(x - 1) \Rightarrow y = -x$.
```

```example
Find the points on $y = x^2 - 3x$ where the tangent is parallel to $y = x$.
---
$2x - 3 = 1 \Rightarrow x = 2$, $y = -2$: the point $(2, -2)$.
```

```question
tangent-eq
```

## Summary

- Point from $f$, gradient from $f'$.
- Normal gradient $-1/f'(x_1)$.
