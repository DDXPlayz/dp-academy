---
code: 3.14.1
title: Vector equation of a line
summary: Writing lines as r = a + λb, converting to parametric and Cartesian forms, angles between lines, and kinematics.
minutes: 30
difficulty: 3
hl: true
objectives:
  - Write the vector equation of a line through a point with a given direction, or through two points.
  - Convert to parametric and Cartesian forms.
  - Find the angle between two lines.
  - Use r = a + tv for an object moving with constant velocity.
formulas:
  - name: Vector equation
    latex: '\mathbf r = \mathbf a + \lambda\mathbf b'
  - name: Cartesian form
    latex: '\frac{x - x_0}{l} = \frac{y - y_0}{m} = \frac{z - z_0}{n}'
definitions:
  - term: Direction vector
    definition: A vector parallel to the line; any non-zero multiple is equally valid.
mistakes:
  - Using position vectors instead of direction vectors to find the angle between lines.
tips:
  - In kinematics r = a + tv, the speed is |v| and the initial position is a.
related:
  - math-aa/3-15-line-relationships
---

## The vector equation

$$
\mathbf r = \mathbf a + \lambda\mathbf b
$$

$\mathbf a$ is the position vector of a point on the line, $\mathbf b$ a direction vector, and $\lambda$ a parameter.

```example
Find a vector equation of the line through A(2, −1, 3) and B(5, 1, −1), and its Cartesian form.
---
Direction $\overrightarrow{AB} = (3, 2, -4)$. $\mathbf r = \begin{pmatrix}2\\-1\\3\end{pmatrix} + \lambda\begin{pmatrix}3\\2\\-4\end{pmatrix}$.

Cartesian: $\dfrac{x - 2}{3} = \dfrac{y + 1}{2} = \dfrac{z - 3}{-4}$.
```

## Angle between lines

```keyidea
The angle between two lines is the angle between their direction vectors: cos θ = |b₁·b₂| / (|b₁||b₂|) — the modulus gives the acute angle.
```

## Kinematics

An object starting at position $\mathbf a$ with constant velocity $\mathbf v$ is at $\mathbf r = \mathbf a + t\mathbf v$ at time $t$; its speed is $|\mathbf v|$.

```example
A boat starts at (1, 2) km and moves with velocity (3, 4) km h⁻¹. Find its speed and its position after 2 hours.
---
Speed $= 5$ km h⁻¹. Position $(1 + 6, 2 + 8) = (7, 10)$.
```

```question
point-on-line
```

## Summary

- $\mathbf r = \mathbf a + \lambda\mathbf b$; parametric and Cartesian forms follow.
- Angle between lines from direction vectors.
- Kinematics: position $\mathbf a + t\mathbf v$, speed $|\mathbf v|$.
