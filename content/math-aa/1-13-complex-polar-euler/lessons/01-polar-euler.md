---
code: 1.13.1
title: Polar and Euler forms
summary: Writing complex numbers as r cis θ and re^(iθ), and why multiplication becomes rotation and scaling.
minutes: 30
difficulty: 3
hl: true
objectives:
  - Convert between Cartesian, polar (r cis θ) and Euler (re^(iθ)) forms.
  - Multiply and divide complex numbers in polar/Euler form.
  - Interpret multiplication geometrically as an enlargement and rotation.
formulas:
  - name: Polar and Euler form
    latex: 'z = r(\cos\theta + i\sin\theta) = r\,\text{cis}\,\theta = re^{i\theta}'
  - name: Products and quotients
    latex: 'z_1z_2 = r_1r_2e^{i(\theta_1 + \theta_2)},\quad \frac{z_1}{z_2} = \frac{r_1}{r_2}e^{i(\theta_1 - \theta_2)}'
definitions:
  - term: Euler’s formula
    definition: e^(iθ) = cos θ + i sin θ.
mistakes:
  - Adding moduli when multiplying. Moduli multiply; arguments add.
tips:
  - Multiplying by i rotates a point by π/2 anticlockwise about the origin.
related:
  - math-aa/1-12-complex-cartesian
  - math-aa/1-14-complex-roots-de-moivre
---

## Three forms

$$
z = a + bi = r(\cos\theta + i\sin\theta) = r\,\text{cis}\,\theta = re^{i\theta}
$$

with $r = |z|$ and $\theta = \arg z$; going back, $a = r\cos\theta$, $b = r\sin\theta$.

```example
Write $z = 1 - i\sqrt3$ in Euler form.
---
$r = 2$; fourth quadrant, $\theta = -\pi/3$. So $z = 2e^{-i\pi/3}$.
```

## Multiplying and dividing

```keyidea
In polar or Euler form, multiply the moduli and add the arguments; divide the moduli and subtract the arguments. Geometrically, multiplying by re^(iθ) enlarges by r and rotates by θ.
```

```figure
src: math-aa/_iitian/ib-mathematics-aa-hl-polar-forms-eulers-form-study-notes/img/fig-5bb7576a5851c3d7.png
caption: From Cartesian to polar form: a = r cos θ and b = r sin θ.
```

```example
If $z_1 = 4\,\text{cis}\,\dfrac{\pi}{3}$ and $z_2 = 2\,\text{cis}\,\dfrac{\pi}{6}$, find $z_1z_2$ and $z_1/z_2$ in Cartesian form.
---
$z_1z_2 = 8\,\text{cis}\,\dfrac{\pi}{2} = 8i$.

$z_1/z_2 = 2\,\text{cis}\,\dfrac{\pi}{6} = \sqrt3 + i$.
```

A famous special case: $e^{i\pi} + 1 = 0$.

```question
polar-product
```

## Summary

- $z = re^{i\theta} = r\,\text{cis}\,\theta$.
- Multiply: moduli ×, arguments +. Divide: moduli ÷, arguments −.
- Multiplication = enlargement + rotation.
