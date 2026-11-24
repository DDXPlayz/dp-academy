---
code: 5.11.1
title: Definite integrals and areas
summary: Evaluating definite integrals analytically, areas below the x-axis, and areas between two curves.
minutes: 35
difficulty: 2
objectives:
  - Evaluate definite integrals analytically.
  - Find areas when the curve is partly below the x-axis.
  - Find the area between two curves.
formulas:
  - name: Definite integral
    latex: '\int_a^b f(x)\,dx = F(b) - F(a)'
  - name: Area between curves
    latex: 'A = \int_a^b\big(f(x) - g(x)\big)\,dx,\quad f \ge g'
definitions:
  - term: Definite integral
    definition: The signed area between a curve and the x-axis from a to b; regions below the axis count as negative.
mistakes:
  - Integrating straight across a root when the curve crosses the axis — the negative part cancels positive area.
tips:
  - For area between curves, find intersections first — they are usually the limits.
related:
  - math-aa/5-5-intro-integration
  - math-aa/5-17-areas-volumes-revolution
---

## Evaluating

$$
\int_a^b f(x)\,dx = \big[F(x)\big]_a^b = F(b) - F(a)
$$

```example
Evaluate $\int_0^{\pi/2}\cos x\,dx$ and $\int_1^e\dfrac{2}{x}\,dx$.
---
$[\sin x]_0^{\pi/2} = 1$. $[2\ln x]_1^e = 2$.
```

## Area below the axis

```keyidea
A definite integral gives signed area. For a total area, split at the roots and add the absolute values of each part (or integrate |f(x)| with technology).
```

```example
Find the area between $y = x^2 - 4$ and the x-axis from $x = 0$ to $x = 3$.
---
Root at $x = 2$. $\int_0^2(x^2 - 4)\,dx = -\tfrac{16}{3}$; $\int_2^3(x^2 - 4)\,dx = \tfrac73$. Area $= \tfrac{16}3 + \tfrac73 = \tfrac{23}{3}$.
```

## Area between curves

```example
Find the area enclosed by $y = x^2$ and $y = x + 2$.
---
Intersections: $x^2 = x + 2 \Rightarrow x = -1, 2$. Area $= \int_{-1}^{2}(x + 2 - x^2)\,dx = \left[\tfrac{x^2}2 + 2x - \tfrac{x^3}3\right]_{-1}^{2} = \tfrac{10}{3} + \tfrac76 = 4.5$.
```

```question
def-int
```

## Summary

- $\int_a^b f = F(b) - F(a)$.
- Split at roots for total area.
- Between curves: ∫(top − bottom) between intersections.
