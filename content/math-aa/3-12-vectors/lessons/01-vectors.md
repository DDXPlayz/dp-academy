---
code: 3.12.1
title: Vectors
summary: Position and displacement vectors, components, magnitude, unit vectors and vector algebra.
minutes: 30
difficulty: 2
hl: true
objectives:
  - Represent vectors as directed line segments and in component form using i, j, k.
  - Add, subtract and scale vectors; recognise parallel vectors.
  - Find magnitudes, unit vectors and displacement vectors AB = b − a.
formulas:
  - name: Magnitude
    latex: '|\mathbf v| = \sqrt{v_1^2 + v_2^2 + v_3^2}'
  - name: Displacement
    latex: '\overrightarrow{AB} = \mathbf b - \mathbf a'
  - name: Unit vector
    latex: '\hat{\mathbf v} = \frac{\mathbf v}{|\mathbf v|}'
definitions:
  - term: Position vector
    definition: The vector from the origin to a point.
  - term: Parallel vectors
    definition: Vectors that are scalar multiples of each other, v = kw.
mistakes:
  - Writing AB = a − b. Displacement is end minus start, b − a.
tips:
  - To show three points are collinear, show AB = k·AC (parallel with a common point).
related:
  - math-aa/3-13-scalar-product
---

## Vectors and components

A vector has magnitude and direction:

$$
\mathbf v = \begin{pmatrix} v_1 \\ v_2 \\ v_3 \end{pmatrix} = v_1\mathbf i + v_2\mathbf j + v_3\mathbf k
$$

Add and subtract component-wise; $k\mathbf v$ scales the length by $|k|$ (and reverses direction if $k < 0$).

## Displacement and magnitude

```keyidea
The vector from A to B is b − a (end minus start). Its length is the distance AB.
```

```example
A(1, 2, −1), B(4, −2, 11). Find $\overrightarrow{AB}$, $|\overrightarrow{AB}|$ and a unit vector in its direction.
---
$\overrightarrow{AB} = \begin{pmatrix}3\\-4\\12\end{pmatrix}$, $|\overrightarrow{AB}| = \sqrt{9 + 16 + 144} = 13$, unit vector $\tfrac{1}{13}\begin{pmatrix}3\\-4\\12\end{pmatrix}$.
```

## Parallel vectors and collinearity

$\mathbf v \parallel \mathbf w \iff \mathbf v = k\mathbf w$.

```example
Show that P(1, 1, 1), Q(3, 4, 6), R(7, 10, 16) are collinear.
---
$\overrightarrow{PQ} = (2, 3, 5)$, $\overrightarrow{PR} = (6, 9, 15) = 3\overrightarrow{PQ}$. Parallel with common point P, so collinear.
```

```question
magnitude
```

## Summary

- Components; add/subtract/scale component-wise.
- $\overrightarrow{AB} = \mathbf b - \mathbf a$; $|\mathbf v| = \sqrt{\sum v_i^2}$.
- Parallel ⇔ scalar multiple.
