---
code: 3.13.1
title: The scalar product
summary: The dot product, the angle between two vectors, and the tests for perpendicular and parallel vectors.
minutes: 25
difficulty: 2
hl: true
objectives:
  - Calculate the scalar product in component form and using |v||w|cos θ.
  - Find the angle between two vectors.
  - Use v · w = 0 for perpendicular vectors.
formulas:
  - name: Scalar product
    latex: '\mathbf v\cdot\mathbf w = v_1w_1 + v_2w_2 + v_3w_3 = |\mathbf v||\mathbf w|\cos\theta'
  - name: Angle between vectors
    latex: '\cos\theta = \frac{\mathbf v\cdot\mathbf w}{|\mathbf v||\mathbf w|}'
definitions:
  - term: Scalar (dot) product
    definition: A number, v · w = |v||w| cos θ, where θ is the angle between v and w.
mistakes:
  - Finding the angle at a vertex with vectors pointing the wrong way. For angle ABC use BA and BC, both from B.
tips:
  - A negative dot product means the angle is obtuse.
related:
  - math-aa/3-12-vectors
  - math-aa/3-14-vector-lines
---

## Two formulas

$$
\mathbf v\cdot\mathbf w = v_1w_1 + v_2w_2 + v_3w_3 = |\mathbf v||\mathbf w|\cos\theta
$$

```keyidea
Equating the two forms gives the angle: cos θ = v·w/(|v||w|). If v·w = 0 (and neither is zero) the vectors are perpendicular.
```

```example
Find the angle between $\mathbf v = (1, 2, 2)$ and $\mathbf w = (3, 0, -4)$.
---
$\mathbf v\cdot\mathbf w = 3 + 0 - 8 = -5$; $|\mathbf v| = 3$, $|\mathbf w| = 5$. $\cos\theta = -\tfrac{5}{15} \Rightarrow \theta = 109.5°$.
```

```example
Find $p$ so that $(p, 2, -1)$ and $(3, p, 4)$ are perpendicular.
---
$3p + 2p - 4 = 0 \Rightarrow p = 0.8$.
```

```question
dot-calc
```

## Summary

- Dot product: sum of products of components $= |\mathbf v||\mathbf w|\cos\theta$.
- Zero dot product ⇔ perpendicular.
- Use vectors pointing away from the vertex.
