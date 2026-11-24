---
code: 1.14.1
title: Complex roots and De Moivre’s theorem
summary: Conjugate roots of real polynomials, powers via De Moivre, and finding nth roots.
minutes: 40
difficulty: 3
hl: true
objectives:
  - Use the conjugate root theorem for polynomials with real coefficients.
  - Use De Moivre’s theorem to find powers of complex numbers.
  - Find the n nth roots of a complex number and represent them on an Argand diagram.
formulas:
  - name: De Moivre’s theorem
    latex: '(r\,\text{cis}\,\theta)^n = r^n\,\text{cis}\,n\theta'
  - name: nth roots
    latex: 'z = r^{1/n}\,\text{cis}\left(\frac{\theta + 2k\pi}{n}\right),\quad k = 0, 1, \ldots, n - 1'
definitions:
  - term: Conjugate root theorem
    definition: If a polynomial has real coefficients and z is a root, then z* is also a root.
mistakes:
  - Giving only one nth root. There are exactly n distinct nth roots, equally spaced around a circle.
tips:
  - The nth roots of any number form a regular n-gon centred at the origin; the nth roots of unity sum to zero.
related:
  - math-aa/1-13-complex-polar-euler
---

## Conjugate roots

```keyidea
A polynomial with real coefficients has non-real roots in conjugate pairs. If 2 + i is a root, so is 2 − i, and (z − (2 + i))(z − (2 − i)) = z² − 4z + 5 is a factor.
```

```example
$z = 1 + 2i$ is a root of $z^3 - z^2 + 3z + 5 = 0$. Find the other roots.
---
$1 - 2i$ is also a root. Their quadratic factor: $z^2 - 2z + 5$. Dividing: $z^3 - z^2 + 3z + 5 = (z^2 - 2z + 5)(z + 1)$, so the third root is $-1$.
```

## De Moivre’s theorem

$$
(r\,\text{cis}\,\theta)^n = r^n\,\text{cis}\,n\theta \qquad (re^{i\theta})^n = r^ne^{in\theta}
$$

```example
Find $(1 + i)^8$.
---
$1 + i = \sqrt2\,\text{cis}\,\dfrac{\pi}{4}$. So $(1 + i)^8 = (\sqrt2)^8\,\text{cis}\,2\pi = 16$.
```

## nth roots

To solve $z^n = r\,\text{cis}\,\theta$, add multiples of $2\pi$ to the argument before dividing by $n$:

$$
z = r^{1/n}\,\text{cis}\left(\frac{\theta + 2k\pi}{n}\right), \quad k = 0, 1, \ldots, n - 1
$$

```example
Solve $z^3 = 8i$.
---
$8i = 8\,\text{cis}\,\dfrac{\pi}{2}$. Roots: $2\,\text{cis}\left(\dfrac{\pi}{6} + \dfrac{2k\pi}{3}\right)$: $2\,\text{cis}\,\dfrac{\pi}{6}$, $2\,\text{cis}\,\dfrac{5\pi}{6}$, $2\,\text{cis}\left(-\dfrac{\pi}{2}\right)$, i.e. $\sqrt3 + i$, $-\sqrt3 + i$, $-2i$.
```

The roots lie equally spaced on a circle of radius $r^{1/n}$.

```question
dm-power
```

## Summary

- Real polynomials: non-real roots come in conjugate pairs.
- De Moivre: raise modulus to n, multiply argument by n.
- n nth roots, spaced $2\pi/n$ apart on a circle.
