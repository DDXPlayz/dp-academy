---
code: 3.8.1
title: Trigonometric equations
summary: Finding every solution in an interval, including multiple-angle equations and quadratics in sin, cos or tan.
minutes: 35
difficulty: 3
objectives:
  - Solve trig equations in a finite interval, finding all solutions.
  - Solve equations involving multiple angles such as sin 2x = k.
  - Solve equations that reduce to quadratics in sin x, cos x or tan x.
  - Solve trig equations graphically.
definitions:
  - term: Principal value
    definition: The single solution returned by arcsin, arccos or arctan on a calculator.
mistakes:
  - Stopping at the calculator’s principal value. Use symmetry to find every solution in the interval.
  - For sin 2x = k on 0 ≤ x ≤ 2π, solving only on [0, 2π] for 2x. Extend the interval for 2x to [0, 4π].
tips:
  - Symmetries — sin x = k gives x and π − x; cos x = k gives x and 2π − x; tan x = k gives x and x + π. Then add periods.
related:
  - math-aa/3-5-unit-circle
  - math-aa/3-6-trig-identities
---

## Finding all solutions

```keyidea
Find one solution (the principal value or an exact value), use the symmetry of the graph to find the second, then add or subtract whole periods to collect every solution in the interval.
```

```example
Solve $2\sin x = 1$ for $0 \le x \le 2\pi$.
---
$\sin x = \tfrac12 \Rightarrow x = \tfrac\pi6$ or $\pi - \tfrac\pi6 = \tfrac{5\pi}{6}$.
```

## Multiple angles

```example
Solve $\cos2x = -\tfrac12$ for $0 \le x \le \pi$.
---
Let $u = 2x$, $0 \le u \le 2\pi$. $\cos u = -\tfrac12 \Rightarrow u = \tfrac{2\pi}3$ or $\tfrac{4\pi}{3}$. So $x = \tfrac\pi3$ or $\tfrac{2\pi}{3}$.
```

## Quadratics in a trig function

```example
Solve $2\cos^2x + \sin x - 1 = 0$ for $0 \le x \le 2\pi$.
---
Use $\cos^2x = 1 - \sin^2x$: $2 - 2\sin^2x + \sin x - 1 = 0 \Rightarrow 2\sin^2x - \sin x - 1 = 0 \Rightarrow (2\sin x + 1)(\sin x - 1) = 0$.

$\sin x = 1 \Rightarrow x = \tfrac\pi2$. $\sin x = -\tfrac12 \Rightarrow x = \tfrac{7\pi}6, \tfrac{11\pi}{6}$.
```

```question
trig-solve-count
```

## Summary

- Principal value → symmetry → add periods.
- Multiple angles: transform the interval first.
- Use identities to get a quadratic in one function.
