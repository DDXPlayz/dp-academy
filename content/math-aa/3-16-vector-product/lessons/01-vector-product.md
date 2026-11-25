---
code: 3.16.1
title: The vector product
summary: The cross product, its properties, and its use for normals and areas.
minutes: 30
difficulty: 3
hl: true
objectives:
  - Calculate v × w in component form.
  - Use |v × w| = |v||w| sin θ and its properties.
  - Find areas of parallelograms and triangles using the vector product.
formulas:
  - name: Vector product
    latex: '\mathbf v\times\mathbf w = \begin{pmatrix} v_2w_3 - v_3w_2 \\ v_3w_1 - v_1w_3 \\ v_1w_2 - v_2w_1 \end{pmatrix}'
  - name: Magnitude
    latex: '|\mathbf v\times\mathbf w| = |\mathbf v||\mathbf w|\sin\theta'
  - name: Areas
    latex: 'A_{\text{parallelogram}} = |\mathbf v\times\mathbf w|,\quad A_{\text{triangle}} = \tfrac12|\mathbf v\times\mathbf w|'
definitions:
  - term: Vector (cross) product
    definition: A vector perpendicular to both v and w, of magnitude |v||w| sin θ.
mistakes:
  - Assuming v × w = w × v. In fact w × v = −(v × w).
tips:
  - v × w = 0 means v and w are parallel.
related:
  - math-aa/3-17-planes
---

## Computing the cross product

$$
\mathbf v\times\mathbf w = \begin{pmatrix} v_2w_3 - v_3w_2 \\ v_3w_1 - v_1w_3 \\ v_1w_2 - v_2w_1 \end{pmatrix}
$$

```example
Find $(1, 2, 3)\times(4, 0, -1)$.
---
$(2(-1) - 3(0),\ 3(4) - 1(-1),\ 1(0) - 2(4)) = (-2, 13, -8)$.

Check: $(1, 2, 3)\cdot(-2, 13, -8) = -2 + 26 - 24 = 0$ ✓.
```

## Properties

```keyidea
v × w is perpendicular to both v and w. Its magnitude |v||w| sin θ is the area of the parallelogram they span. It is anti-commutative (w × v = −v × w) and zero for parallel vectors.
```

```figure
src: math-aa/_iitian/ib-mathematics-aa-vector-product-of-two-vectors-study-notes/img/fig-2dc678749421a983.png
caption: |a × b| = |a||b| sin θ is the area of the parallelogram formed by a and b.
```

```figure
src: math-aa/_iitian/ib-mathematics-aa-vector-product-of-two-vectors-study-notes/img/fig-232f22bcf953d7c1.png
caption: The right-hand rule gives the direction of a × b, perpendicular to both a and b.
```

## Areas

```example
Find the area of the triangle with vertices A(1, 0, 0), B(0, 2, 0), C(0, 0, 3).
---
$\overrightarrow{AB} = (-1, 2, 0)$, $\overrightarrow{AC} = (-1, 0, 3)$. Cross product $= (6, 3, 2)$, magnitude 7. Area $= 3.5$.
```

```figure
src: math-aa/_sme/3-9-vector-properties/img/fig-fe0fe7bb1e64d32a.png
caption: A normal vector to a plane is perpendicular to every line in the plane.
```

```question
cross-area
```

## Summary

- Component formula; result perpendicular to both.
- $|\mathbf v\times\mathbf w| = |\mathbf v||\mathbf w|\sin\theta$ = parallelogram area; half for a triangle.
- Anti-commutative; zero when parallel.
