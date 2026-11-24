---
code: 3.11.1
title: Symmetry of trigonometric functions
summary: Relationships such as sin(π − x) = sin x and cos(π/2 − x) = sin x, read from the symmetry of the graphs.
minutes: 20
difficulty: 3
hl: true
objectives:
  - Use symmetry properties of the graphs to relate trig values of different angles.
  - Use odd/even properties — sin(−x) = −sin x, cos(−x) = cos x.
  - Simplify expressions using complementary and supplementary angles.
formulas:
  - name: Symmetries
    latex: '\sin(\pi - x) = \sin x,\ \cos(\pi - x) = -\cos x,\ \sin(-x) = -\sin x,\ \cos(-x) = \cos x'
  - name: Complementary angles
    latex: '\sin\left(\tfrac\pi2 - x\right) = \cos x,\quad \cos\left(\tfrac\pi2 - x\right) = \sin x'
definitions:
  - term: Complementary angles
    definition: Two angles that add to π/2 (90°).
mistakes:
  - Applying these without checking — derive any you forget from compound angle identities or the unit circle.
tips:
  - sin is odd, cos is even, tan is odd.
related:
  - math-aa/3-10-compound-angles
---

## Symmetry from the graphs

```keyidea
sin is odd and cos is even. The sine graph is symmetric about x = π/2, so sin(π − x) = sin x. Shifting cos by π/2 gives sin: cos(π/2 − x) = sin x.
```

| Relationship | Reason |
|---|---|
| $\sin(-x) = -\sin x$ | sin is odd |
| $\cos(-x) = \cos x$ | cos is even |
| $\sin(\pi - x) = \sin x$ | symmetry of sin about $\frac\pi2$ |
| $\cos(\pi - x) = -\cos x$ | |
| $\sin(\pi + x) = -\sin x$ | half-turn |
| $\sin(\frac\pi2 - x) = \cos x$ | complementary angles |
| $\tan(\pi + x) = \tan x$ | period π |

```example
Simplify $\dfrac{\sin(\pi - x)\cos(-x)}{\cos(\frac\pi2 - x)}$.
---
$\dfrac{\sin x\cos x}{\sin x} = \cos x$.
```

```example
Given $\sin\theta = k$, express $\sin(\pi + \theta) + \cos(\tfrac\pi2 - \theta)$ in terms of k.
---
$-\sin\theta + \sin\theta = 0$.
```

```question
symmetry-simplify
```

## Summary

- sin odd, cos even, tan odd.
- Supplementary: $\sin(\pi - x) = \sin x$, $\cos(\pi - x) = -\cos x$.
- Complementary: $\sin(\frac\pi2 - x) = \cos x$.
