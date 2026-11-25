---
code: 1.12.1
title: Complex numbers in Cartesian form
summary: The number i, arithmetic with a + bi, conjugates, modulus and argument, and the Argand diagram.
minutes: 30
difficulty: 2
hl: true
objectives:
  - Use i² = −1 to add, subtract, multiply and divide complex numbers.
  - Find the conjugate, modulus and argument of a complex number.
  - Represent complex numbers on an Argand diagram.
  - Solve equations by equating real and imaginary parts.
formulas:
  - name: Modulus
    latex: '|z| = \sqrt{a^2 + b^2}'
  - name: Argument
    latex: '\arg z = \theta,\ \tan\theta = \frac{b}{a},\ -\pi < \theta \le \pi'
  - name: Conjugate
    latex: 'z^* = a - bi,\quad zz^* = |z|^2'
definitions:
  - term: Complex number
    definition: A number z = a + bi where a, b ∈ ℝ and i² = −1; a = Re(z), b = Im(z).
  - term: Complex conjugate
    definition: z* = a − bi, the reflection of z in the real axis.
mistakes:
  - Taking arctan(b/a) without checking the quadrant. Use a sketch — z = −1 − i has argument −3π/4, not π/4.
tips:
  - To divide, multiply top and bottom by the conjugate of the denominator.
related:
  - math-aa/1-13-complex-polar-euler
---

## The number i

$$
i^2 = -1, \qquad z = a + bi
$$

Arithmetic works like algebra, replacing $i^2$ by $-1$.

```example
Simplify $(3 + 2i)(1 - 4i)$ and $\dfrac{5 + i}{1 + i}$.
---
$(3 + 2i)(1 - 4i) = 3 - 12i + 2i - 8i^2 = 11 - 10i$.

$\dfrac{(5 + i)(1 - i)}{(1 + i)(1 - i)} = \dfrac{5 - 5i + i - i^2}{2} = \dfrac{6 - 4i}{2} = 3 - 2i$.
```

## Modulus, argument and the Argand diagram

```keyidea
On an Argand diagram z = a + bi is the point (a, b). Its modulus |z| is the distance from O; its argument is the angle from the positive real axis, in (−π, π].
```

```figure
src: math-aa/_iitian/ib-mathematics-aa-complex-numbers-study-notes/img/fig-e8b97c19a5ae75a6.png
caption: The Argand diagram: z = a + bi is plotted as the point (a, b); |z| is its distance from O and arg(z) the angle from the positive real axis.
```

```figure
src: math-aa/_sme/1-8-complex-numbers/img/fig-2f7627f4d01cffcb.png
caption: Complex numbers as points on an Argand diagram: the real part is plotted horizontally and the imaginary part vertically.
```

```example
Find the modulus and argument of $z = -\sqrt3 + i$.
---
$|z| = \sqrt{3 + 1} = 2$. The point is in the second quadrant: $\arg z = \pi - \dfrac{\pi}{6} = \dfrac{5\pi}{6}$.
```

## Equating parts

Two complex numbers are equal only if their real parts and imaginary parts are both equal.

```example
Find real $x, y$ with $(x + iy)^2 = 3 + 4i$.
---
$x^2 - y^2 = 3$ and $2xy = 4$. Then $y = 2/x$, $x^2 - 4/x^2 = 3 \Rightarrow x^4 - 3x^2 - 4 = 0 \Rightarrow x^2 = 4$. So $x = \pm2$, $y = \pm1$: $\pm(2 + i)$.
```

```question
complex-multiply
```

## Summary

- $i^2 = -1$; divide using the conjugate.
- $|z| = \sqrt{a^2 + b^2}$; argument from a sketch, in $(-\pi, \pi]$.
- Equate real and imaginary parts to solve equations.
