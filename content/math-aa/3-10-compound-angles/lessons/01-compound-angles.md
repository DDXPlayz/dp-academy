---
code: 3.10.1
title: Compound angle identities
summary: sin(A ± B), cos(A ± B), tan(A ± B) and the double angle identity for tan.
minutes: 30
difficulty: 3
hl: true
objectives:
  - Use the compound angle identities to find exact values and prove identities.
  - Use tan 2θ = 2 tan θ / (1 − tan²θ).
formulas:
  - name: Sine
    latex: '\sin(A \pm B) = \sin A\cos B \pm \cos A\sin B'
  - name: Cosine
    latex: '\cos(A \pm B) = \cos A\cos B \mp \sin A\sin B'
  - name: Tangent
    latex: '\tan(A \pm B) = \frac{\tan A \pm \tan B}{1 \mp \tan A\tan B}'
  - name: Double angle (tan)
    latex: '\tan2\theta = \frac{2\tan\theta}{1 - \tan^2\theta}'
definitions:
  - term: Compound angle
    definition: An angle written as a sum or difference of two angles, such as 75° = 45° + 30°.
mistakes:
  - Writing sin(A + B) = sin A + sin B. Trig functions do not distribute over addition.
  - Getting the sign wrong in cos(A + B) — it has a minus sign.
tips:
  - Build angles like π/12 = π/3 − π/4 from the special angles to get exact values.
related:
  - math-aa/3-6-trig-identities
---

## The identities

$$
\sin(A \pm B) = \sin A\cos B \pm \cos A\sin B
$$

$$
\cos(A \pm B) = \cos A\cos B \mp \sin A\sin B
$$

$$
\tan(A \pm B) = \frac{\tan A \pm \tan B}{1 \mp \tan A\tan B}
$$

```keyidea
Note the sign flip in the cosine identity: cos(A + B) has a minus, cos(A − B) has a plus. Setting A = B gives the double angle identities.
```

```example
Find the exact value of $\cos75°$.
---
$\cos(45° + 30°) = \cos45°\cos30° - \sin45°\sin30° = \tfrac{\sqrt2}{2}\cdot\tfrac{\sqrt3}{2} - \tfrac{\sqrt2}{2}\cdot\tfrac12 = \dfrac{\sqrt6 - \sqrt2}{4}$.
```

```example
Given $\tan A = \tfrac12$ and $\tan B = \tfrac13$, find $A + B$ for acute A, B.
---
$\tan(A + B) = \dfrac{\tfrac12 + \tfrac13}{1 - \tfrac16} = 1$, so $A + B = \tfrac\pi4$.
```

## Double angle for tan

$$
\tan2\theta = \frac{2\tan\theta}{1 - \tan^2\theta}
$$

```question
sin-75
```

## Summary

- Memorise sin, cos, tan of $A \pm B$; watch the cos sign.
- $\tan2\theta = 2\tan\theta/(1 - \tan^2\theta)$.
