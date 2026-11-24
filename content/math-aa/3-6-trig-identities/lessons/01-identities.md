---
code: 3.6.1
title: Trigonometric identities
summary: The Pythagorean identity and double angle identities, and using them to find exact values and simplify expressions.
minutes: 30
difficulty: 2
objectives:
  - Use cos²θ + sin²θ = 1.
  - Use the double angle identities for sine and cosine.
  - Find exact values of other ratios given one ratio and the quadrant.
formulas:
  - name: Pythagorean identity
    latex: '\cos^2\theta + \sin^2\theta = 1'
  - name: Double angle (sine)
    latex: '\sin2\theta = 2\sin\theta\cos\theta'
  - name: Double angle (cosine)
    latex: '\cos2\theta = \cos^2\theta - \sin^2\theta = 2\cos^2\theta - 1 = 1 - 2\sin^2\theta'
definitions:
  - term: Trigonometric identity
    definition: An equation involving trig functions that is true for every angle.
mistakes:
  - Forgetting the sign when taking a square root. Use the quadrant to decide whether sin or cos is positive.
tips:
  - Choose the version of cos 2θ that matches the rest of the problem — all in cos, all in sin, or both.
related:
  - math-aa/3-10-compound-angles
---

## The Pythagorean identity

$$
\cos^2\theta + \sin^2\theta = 1
$$

It comes from Pythagoras on the unit circle.

```example
$\sin\theta = \tfrac35$ and $\tfrac\pi2 < \theta < \pi$. Find $\cos\theta$ and $\tan\theta$.
---
$\cos^2\theta = 1 - \tfrac{9}{25} = \tfrac{16}{25}$. In Q2 cos is negative: $\cos\theta = -\tfrac45$. $\tan\theta = -\tfrac34$.
```

## Double angle identities

```keyidea
sin 2θ = 2 sin θ cos θ. cos 2θ has three forms: cos²θ − sin²θ = 2cos²θ − 1 = 1 − 2sin²θ.
```

```example
With the same θ, find $\sin2\theta$ and $\cos2\theta$.
---
$\sin2\theta = 2(\tfrac35)(-\tfrac45) = -\tfrac{24}{25}$. $\cos2\theta = 1 - 2(\tfrac{9}{25}) = \tfrac{7}{25}$.
```

```example
Show that $\dfrac{\sin2\theta}{1 + \cos2\theta} \equiv \tan\theta$.
---
$\dfrac{2\sin\theta\cos\theta}{1 + 2\cos^2\theta - 1} = \dfrac{2\sin\theta\cos\theta}{2\cos^2\theta} = \tan\theta$. ∎
```

```question
pyth-identity
```

## Summary

- $\cos^2\theta + \sin^2\theta = 1$; choose the sign by quadrant.
- $\sin2\theta = 2\sin\theta\cos\theta$; three forms of $\cos2\theta$.
