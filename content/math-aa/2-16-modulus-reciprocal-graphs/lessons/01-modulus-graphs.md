---
code: 2.16.1
title: Modulus, reciprocal and squared graphs
summary: Sketching |f(x)|, f(|x|), 1/f(x) and [f(x)]², and solving modulus equations and inequalities.
minutes: 35
difficulty: 3
hl: true
objectives:
  - Sketch y = |f(x)|, y = f(|x|), y = 1/f(x), y = f(ax + b) and y = [f(x)]² from y = f(x).
  - Solve modulus equations and inequalities analytically and graphically.
definitions:
  - term: Modulus
    definition: The absolute value — |x| = x if x ≥ 0 and −x if x < 0, the distance from zero.
mistakes:
  - Confusing |f(x)| with f(|x|). |f(x)| reflects the negative parts up; f(|x|) reflects the right half into the left.
  - Not checking solutions of modulus equations — squaring or splitting can introduce invalid ones.
tips:
  - For 1/f(x) — zeros of f become vertical asymptotes; f = ±1 points are fixed; large f gives small 1/f.
related:
  - math-aa/2-11-transformations
---

## The graphs

| Graph | How to get it from y = f(x) |
|---|---|
| $y = \lvert f(x)\rvert$ | reflect parts below the x-axis upwards |
| $y = f(\lvert x\rvert)$ | keep the part for $x \ge 0$ and reflect it in the y-axis |
| $y = \dfrac{1}{f(x)}$ | zeros → vertical asymptotes; maxima ↔ minima; points with $y = \pm1$ unchanged |
| $y = [f(x)]^2$ | always ≥ 0; zeros become touch points; values between −1 and 1 shrink |

```plot
caption: y = x² − 4 and y = |x² − 4|: the part below the x-axis is reflected up.
x: -4, 4
y: -5, 8
f: x^2 - 4 | f(x)
f: abs(x^2 - 4) | |f(x)|
```

## Modulus equations

```keyidea
|A| = B means A = B or A = −B (with B ≥ 0). Solve both cases, then check each solution in the original equation.
```

```example
Solve $|2x - 3| = x + 1$.
---
$2x - 3 = x + 1 \Rightarrow x = 4$. $2x - 3 = -(x + 1) \Rightarrow x = \tfrac23$. Both give $x + 1 > 0$, so both are valid.
```

## Modulus inequalities

$|x - a| < b \iff a - b < x < a + b$. For harder ones, square both sides (if both are non-negative) or use a graph.

```example
Solve $|x - 2| < |x + 4|$.
---
Square: $x^2 - 4x + 4 < x^2 + 8x + 16 \Rightarrow -12x < 12 \Rightarrow x > -1$.
```

```question
modulus-eq
```

## Summary

- $|f(x)|$ reflects negatives up; $f(|x|)$ mirrors the right half.
- $1/f(x)$: zeros become asymptotes.
- Modulus equations: two cases, then check.
