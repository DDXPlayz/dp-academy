---
code: 3.9.1
title: Reciprocal and inverse trigonometric functions
summary: sec, cosec and cot, their Pythagorean identities, and the inverse functions arcsin, arccos and arctan.
minutes: 30
difficulty: 3
hl: true
objectives:
  - Define sec θ, cosec θ and cot θ and sketch their graphs.
  - Use 1 + tan²θ = sec²θ and 1 + cot²θ = cosec²θ.
  - State the domains and ranges of arcsin, arccos and arctan and sketch them.
formulas:
  - name: Reciprocal ratios
    latex: '\sec\theta = \frac{1}{\cos\theta},\quad \csc\theta = \frac{1}{\sin\theta},\quad \cot\theta = \frac{\cos\theta}{\sin\theta}'
  - name: Pythagorean identities
    latex: '1 + \tan^2\theta = \sec^2\theta,\qquad 1 + \cot^2\theta = \csc^2\theta'
definitions:
  - term: arcsin x
    definition: The inverse of sin restricted to [−π/2, π/2]; domain −1 ≤ x ≤ 1.
  - term: arccos x
    definition: The inverse of cos restricted to [0, π]; domain −1 ≤ x ≤ 1.
  - term: arctan x
    definition: The inverse of tan restricted to (−π/2, π/2); domain all real x.
mistakes:
  - Writing sin⁻¹x = 1/sin x. sin⁻¹x means arcsin x; 1/sin x is cosec x.
tips:
  - Divide cos²θ + sin²θ = 1 by cos²θ to get the sec identity, by sin²θ for the cosec identity.
related:
  - math-aa/3-6-trig-identities
---

## Reciprocal ratios

$$
\sec\theta = \frac{1}{\cos\theta}, \qquad \csc\theta = \frac{1}{\sin\theta}, \qquad \cot\theta = \frac{1}{\tan\theta}
$$

```figure
src: math-aa/_iitian/ib-mathematics-aa-reciprocal-trigonometric-ratios-study-note/img/fig-0988174d4bb1b85c.png
caption: y = cosec x is the reciprocal of sin x, with vertical asymptotes wherever sin x = 0.
```

```figure
src: math-aa/_iitian/ib-mathematics-aa-reciprocal-trigonometric-ratios-study-note/img/fig-00adfc92ea76182e.png
caption: y = sec x is the reciprocal of cos x, with vertical asymptotes wherever cos x = 0.
```

```figure
src: math-aa/_iitian/ib-mathematics-aa-reciprocal-trigonometric-ratios-study-note/img/fig-890b1e17619dd865.png
caption: y = cot x is the reciprocal of tan x: asymptotes at multiples of π and zeros where tan x has its asymptotes.
```

Their graphs have vertical asymptotes where the original function is zero.

## Two more identities

```keyidea
Dividing cos²θ + sin²θ = 1 by cos²θ gives 1 + tan²θ = sec²θ; dividing by sin²θ gives 1 + cot²θ = cosec²θ.
```

```example
Solve $\tan^2x + \sec x - 1 = 0$ for $0 \le x < 2\pi$.
---
$\sec^2x - 1 + \sec x - 1 = 0 \Rightarrow \sec^2x + \sec x - 2 = 0 \Rightarrow (\sec x + 2)(\sec x - 1) = 0$.

$\sec x = 1 \Rightarrow x = 0$. $\sec x = -2 \Rightarrow \cos x = -\tfrac12 \Rightarrow x = \tfrac{2\pi}3, \tfrac{4\pi}3$.
```

## Inverse trig functions

| Function | Domain | Range |
|---|---|---|
| arcsin x | $[-1, 1]$ | $[-\frac\pi2, \frac\pi2]$ |
| arccos x | $[-1, 1]$ | $[0, \pi]$ |
| arctan x | $\mathbb{R}$ | $(-\frac\pi2, \frac\pi2)$ |

```figure
src: math-aa/_sme/3-7-inverse-reciprocal-trig-functions/img/fig-563d165c5c902d36.png
caption: y = arcsin x: domain −1 ≤ x ≤ 1, range −π/2 ≤ y ≤ π/2.
```

```figure
src: math-aa/_sme/3-7-inverse-reciprocal-trig-functions/img/fig-8042dac67a84d2dc.png
caption: y = arccos x: domain −1 ≤ x ≤ 1, range 0 ≤ y ≤ π.
```

```figure
src: math-aa/_sme/3-7-inverse-reciprocal-trig-functions/img/fig-681f6a053dcdb77c.png
caption: y = arctan x: defined for all x, with horizontal asymptotes y = ±π/2.
```

```example
Find the exact value of $\sin\left(\arccos\tfrac{3}{5}\right)$.
---
Let $\theta = \arccos\tfrac35$, so $\cos\theta = \tfrac35$ with $\theta \in [0, \pi]$. Then $\sin\theta = \tfrac45$ (positive in this range).
```

```question
sec-value
```

## Summary

- sec, cosec, cot are reciprocals of cos, sin, tan.
- $1 + \tan^2 = \sec^2$; $1 + \cot^2 = \csc^2$.
- Inverse trig functions have restricted ranges.
