---
code: 3.5.1
title: The unit circle and exact values
summary: Defining sin, cos and tan for any angle, exact values, and the ambiguous case of the sine rule.
minutes: 30
difficulty: 2
objectives:
  - Define cos θ and sin θ as coordinates on the unit circle, and tan θ = sin θ / cos θ.
  - Recall exact values for 0, π/6, π/4, π/3, π/2 and their multiples.
  - Determine signs of trig ratios in each quadrant.
  - Solve the ambiguous case of the sine rule.
formulas:
  - name: Unit circle
    latex: '(\cos\theta, \sin\theta),\qquad \tan\theta = \frac{\sin\theta}{\cos\theta}'
definitions:
  - term: Unit circle
    definition: A circle of radius 1 centred at the origin; the point at angle θ (anticlockwise from the positive x-axis) is (cos θ, sin θ).
  - term: Ambiguous case
    definition: When two sides and a non-included angle are known, there may be two possible triangles (an acute and an obtuse angle with the same sine).
mistakes:
  - Missing the second solution in the ambiguous case. sin B = k has solutions B and 180° − B; check whether both fit in the triangle.
tips:
  - Signs by quadrant — All (Q1), Sine (Q2), Tan (Q3), Cosine (Q4).
related:
  - math-aa/3-8-trig-equations
---

## The unit circle

```keyidea
For any angle θ measured anticlockwise from the positive x-axis, the point on the unit circle is (cos θ, sin θ). This extends trig to every angle, with signs set by the quadrant.
```

```figure
src: math-aa/_sme/3-4-trigonometry/img/fig-8a679f03af19f1c7.png
caption: The unit circle: the point at angle θ has coordinates (cos θ, sin θ).
```

| Quadrant | Positive ratios |
|---|---|
| I ($0$ to $\frac\pi2$) | all |
| II ($\frac\pi2$ to $\pi$) | sin |
| III ($\pi$ to $\frac{3\pi}2$) | tan |
| IV ($\frac{3\pi}2$ to $2\pi$) | cos |

## Exact values

| θ | 0 | $\frac\pi6$ | $\frac\pi4$ | $\frac\pi3$ | $\frac\pi2$ |
|---|---|---|---|---|---|
| sin θ | 0 | $\frac12$ | $\frac{\sqrt2}2$ | $\frac{\sqrt3}2$ | 1 |
| cos θ | 1 | $\frac{\sqrt3}2$ | $\frac{\sqrt2}2$ | $\frac12$ | 0 |
| tan θ | 0 | $\frac{1}{\sqrt3}$ | 1 | $\sqrt3$ | undefined |

```figure
src: math-aa/_sme/3-4-trigonometry/img/fig-1ce4a42eac501dbe.png
caption: Exact values from an equilateral triangle of side 2 cut in half: sin(π/6) = ½, cos(π/6) = √3/2, tan(π/3) = √3.
```

```example
Find the exact value of $\cos\dfrac{5\pi}{6}$ and $\tan\dfrac{4\pi}{3}$.
---
$\frac{5\pi}6$ is in Q2 with reference angle $\frac\pi6$: $\cos = -\frac{\sqrt3}{2}$.

$\frac{4\pi}{3}$ is in Q3 with reference angle $\frac\pi3$: $\tan = +\sqrt3$.
```

## The ambiguous case

```example
In triangle ABC, a = 7, b = 9, A = 40°. Find the possible values of B.
---
$\sin B = \dfrac{9\sin40°}{7} = 0.826 \Rightarrow B = 55.7°$ or $124.3°$. Both work since $40° + 124.3° < 180°$ — two triangles.
```

```figure
src: math-aa/_sme/3-3-trigonometry-toolkit/img/fig-32dda4ce8412f0bc.png
caption: The ambiguous case: given two sides and a non-included angle, the third side can lie in two places, giving an acute or an obtuse angle.
```

```question
exact-value
```

## Summary

- Point at angle θ: $(\cos\theta, \sin\theta)$; $\tan = \sin/\cos$.
- Learn the exact-value table and the quadrant signs (ASTC).
- Ambiguous case: test both $B$ and $180° - B$.
