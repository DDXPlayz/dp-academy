---
code: 2.11.1
title: Transformations of graphs
summary: Translations, reflections and stretches of y = f(x), and combining them in the right order.
minutes: 30
difficulty: 2
objectives:
  - Apply translations y = f(x) + b and y = f(x − a).
  - Apply reflections y = −f(x) and y = f(−x).
  - Apply stretches y = pf(x) and y = f(qx).
  - Apply and describe composite transformations.
definitions:
  - term: Translation
    definition: Shifting a graph without changing its shape, described by a vector (a, b).
  - term: Stretch
    definition: Scaling a graph parallel to an axis by a scale factor.
mistakes:
  - Shifting the wrong way. y = f(x − 3) moves the graph 3 RIGHT.
  - Using scale factor q for y = f(qx). The horizontal scale factor is 1/q.
tips:
  - Changes outside the function act on y (vertical, as expected); changes inside act on x (horizontal, the opposite way).
related:
  - math-aa/2-6-quadratic-functions
---

## The transformations

| Equation | Transformation |
|---|---|
| $y = f(x) + b$ | translation $b$ units up |
| $y = f(x - a)$ | translation $a$ units right |
| $y = -f(x)$ | reflection in the x-axis |
| $y = f(-x)$ | reflection in the y-axis |
| $y = pf(x)$ | vertical stretch, scale factor $p$ |
| $y = f(qx)$ | horizontal stretch, scale factor $\tfrac1q$ |

```keyidea
Outside changes (to the output) act vertically and do what they look like. Inside changes (to the input) act horizontally and do the opposite of what they look like.
```

```plot
caption: y = x² (accent) and y = 2(x − 3)² + 1: translated 3 right, stretched vertically by 2, then translated 1 up.
x: -3, 6
y: -1, 10
f: x^2 | y = x²
f: 2*(x-3)^2 + 1 | y = 2(x − 3)² + 1
```

## Composite transformations

Order matters when stretches/reflections and translations in the **same direction** are combined.

```example
The point (2, 5) lies on y = f(x). Find its image on y = 3f(x − 1) − 4.
---
x: shift right 1 → $x = 3$. y: stretch ×3 then down 4 → $3(5) - 4 = 11$. Image $(3, 11)$.
```

```example
Describe the transformations that map y = f(x) to y = f(2x + 6).
---
Either: horizontal stretch with scale factor ½ (giving $f(2x)$), then translate 3 left (giving $f(2(x + 3)) = f(2x + 6)$).

Or: translate 6 left (giving $f(x + 6)$), then horizontal stretch with scale factor ½ (giving $f(2x + 6)$). The size of the translation depends on the order.
```

```question
transform-point
```

## Summary

- $f(x) + b$ up; $f(x - a)$ right; $-f(x)$ and $f(-x)$ reflect.
- $pf(x)$ vertical × p; $f(qx)$ horizontal × 1/q.
- Track points through each step; order matters.
