---
code: 2.1.1
title: Straight lines
summary: Gradient, the three forms of a line’s equation, and parallel and perpendicular lines.
minutes: 20
difficulty: 1
objectives:
  - Find the gradient of a line through two points.
  - Use the gradient–intercept, point–gradient and general forms.
  - Use the conditions for parallel and perpendicular lines.
formulas:
  - name: Gradient
    latex: 'm = \frac{y_2 - y_1}{x_2 - x_1}'
  - name: Forms of a line
    latex: 'y = mx + c,\quad y - y_1 = m(x - x_1),\quad ax + by + d = 0'
  - name: Parallel and perpendicular
    latex: 'm_1 = m_2,\qquad m_1m_2 = -1'
definitions:
  - term: Gradient
    definition: The change in y per unit change in x along a line.
mistakes:
  - Mixing up the order of the points in the gradient formula — subtract both coordinates in the same order.
tips:
  - Perpendicular gradient — flip and change sign (2/3 becomes −3/2).
related:
  - math-aa/5-4-tangents-normals
---

## Gradient and equations

$$
m = \frac{y_2 - y_1}{x_2 - x_1}
$$

```figure
src: math-aa/_iitian/ib-mathematics-aa-sl-equation-of-a-straight-line-sl-study-no/img/fig-b9742a41e383f01f.png
caption: Parallel lines have equal gradients.
```

```figure
src: math-aa/_iitian/ib-mathematics-aa-sl-equation-of-a-straight-line-sl-study-no/img/fig-e971bbeefb15a5b5.png
caption: Perpendicular lines have gradients whose product is −1: m₂ = −1/m₁.
```

| Form | Equation | Useful when you know |
|---|---|---|
| gradient–intercept | $y = mx + c$ | gradient and y-intercept |
| point–gradient | $y - y_1 = m(x - x_1)$ | gradient and a point |
| general | $ax + by + d = 0$ | (required format in some questions) |

```keyidea
Parallel lines have equal gradients. Perpendicular lines have gradients whose product is −1.
```

```example
Find the equation of the line through (2, −1) perpendicular to 3x − 2y + 5 = 0. Give it in the form ax + by + d = 0.
---
$3x - 2y + 5 = 0 \Rightarrow y = \tfrac32x + \tfrac52$, gradient $\tfrac32$. Perpendicular gradient $-\tfrac23$.

$y + 1 = -\tfrac23(x - 2) \Rightarrow 3y + 3 = -2x + 4 \Rightarrow 2x + 3y - 1 = 0$.
```

```question
line-gradient
```

## Summary

- $m = \Delta y/\Delta x$; three forms of equation.
- Parallel: $m_1 = m_2$. Perpendicular: $m_1m_2 = -1$.
