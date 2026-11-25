---
code: 3.7.1
title: Circular functions
summary: Graphs of sin, cos and tan, amplitude, period and transformations, and modelling periodic behaviour.
minutes: 30
difficulty: 2
objectives:
  - Sketch y = sin x, cos x and tan x and state their periods.
  - Sketch y = a sin(b(x + c)) + d and identify amplitude, period, phase shift and principal axis.
  - Model real-life periodic phenomena.
formulas:
  - name: Transformed sine
    latex: 'y = a\sin\big(b(x + c)\big) + d:\ \text{amplitude } |a|,\ \text{period } \frac{2\pi}{b},\ \text{principal axis } y = d'
definitions:
  - term: Amplitude
    definition: Half the distance between the maximum and minimum values.
  - term: Period
    definition: The horizontal length of one complete cycle.
  - term: Principal axis
    definition: The horizontal line halfway between the maximum and minimum, y = d.
mistakes:
  - Taking the period as b. The period is 2π/b (or 360°/b).
tips:
  - From data — amplitude = (max − min)/2, d = (max + min)/2, period = time between successive peaks.
related:
  - math-aa/2-11-transformations
---

## The basic graphs

- $y = \sin x$ and $y = \cos x$: period $2\pi$, range $[-1, 1]$.
- $y = \tan x$: period $\pi$, vertical asymptotes at $x = \frac\pi2 + k\pi$.

## Transformed circular functions

$$
y = a\sin\big(b(x + c)\big) + d
$$

```keyidea
|a| is the amplitude, 2π/b the period, d the principal axis, and c a horizontal shift (left by c).
```

```plot
caption: y = 3 sin(2x) + 1: amplitude 3, period π, principal axis y = 1.
x: 0, 6.3
y: -3, 5
f: 3*sin(2*x) + 1 | y
hline: 1
```

## Modelling

```example
The depth of water in a harbour varies between 2 m (low tide) and 10 m (high tide), with high tide at t = 0 and a period of 12 hours. Find a model.
---
Amplitude $= 4$; principal axis $d = 6$; $b = \dfrac{2\pi}{12} = \dfrac\pi6$. High at $t = 0$ suggests cosine: $D(t) = 4\cos\left(\dfrac{\pi t}{6}\right) + 6$.
```

```question
period-find
```

### Limits of a trigonometric model

A sine or cosine model assumes the pattern repeats exactly, with the same amplitude and period for ever. Real data (tides, temperatures, daylight hours) only approximately follow this: the amplitude may change with the seasons, the period may drift, and the model should not be trusted far outside the range of the data used to build it.

## Summary

- sin/cos period 2π; tan period π.
- Amplitude |a|, period 2π/b, axis y = d, shift c.
- Fit models from max, min and period.
