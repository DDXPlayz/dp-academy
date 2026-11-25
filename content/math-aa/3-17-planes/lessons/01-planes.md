---
code: 3.17.1
title: Planes
summary: Vector, scalar-product and Cartesian equations of a plane, and how to find a normal.
minutes: 30
difficulty: 3
hl: true
objectives:
  - Write the vector equation r = a + λb + μc of a plane.
  - Write r · n = a · n and the Cartesian equation ax + by + cz = d.
  - Find the equation of a plane through three points.
formulas:
  - name: Vector form
    latex: '\mathbf r = \mathbf a + \lambda\mathbf b + \mu\mathbf c'
  - name: Normal form
    latex: '\mathbf r\cdot\mathbf n = \mathbf a\cdot\mathbf n'
  - name: Cartesian form
    latex: 'ax + by + cz = d,\quad \mathbf n = (a, b, c)'
definitions:
  - term: Normal vector
    definition: A vector perpendicular to every line in the plane.
mistakes:
  - Using a direction in the plane as the normal. The normal is perpendicular to the plane — find it with a cross product.
tips:
  - The coefficients of x, y, z in the Cartesian equation are the normal’s components.
related:
  - math-aa/3-16-vector-product
  - math-aa/3-18-lines-planes-intersections
---

## Three forms

- **Vector:** $\mathbf r = \mathbf a + \lambda\mathbf b + \mu\mathbf c$ ($\mathbf b$, $\mathbf c$ non-parallel directions in the plane).
- **Normal (scalar product):** $\mathbf r\cdot\mathbf n = \mathbf a\cdot\mathbf n$.
- **Cartesian:** $ax + by + cz = d$ with normal $(a, b, c)$.

```figure
src: math-aa/_iitian/ib-mathematics-aa-vector-equation-of-a-plane-study-notes/img/fig-71832f5237e21290.png
caption: A plane through A, B and C: the normal is AB × AC = (a, b, c), giving the Cartesian equation ax + by + cz = d.
```

```figure
src: math-aa/_iitian/ib-mathematics-aa-vector-equation-of-a-plane-study-notes/img/fig-58049fe560378da2.png
caption: For any point R in the plane, AR is perpendicular to the normal n, so (r − a)·n = 0.
```

```keyidea
The normal is the key. Find it with n = b × c from two directions in the plane, then d = a · n.
```

```example
Find the Cartesian equation of the plane through A(1, 0, 2), B(3, 1, 1), C(0, 2, 4).
---
$\overrightarrow{AB} = (2, 1, -1)$, $\overrightarrow{AC} = (-1, 2, 2)$.

$\mathbf n = \overrightarrow{AB}\times\overrightarrow{AC} = (1(2) - (-1)(2),\ (-1)(-1) - 2(2),\ 2(2) - 1(-1)) = (4, -3, 5)$.

$d = (1, 0, 2)\cdot(4, -3, 5) = 14$. Plane: $4x - 3y + 5z = 14$.
```

```question
plane-normal
```

## Summary

- Three equivalent forms; Cartesian coefficients = normal.
- Normal from a cross product of two in-plane directions; $d = \mathbf a\cdot\mathbf n$.
