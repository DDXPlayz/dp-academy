---
code: T3.3
title: Graphs, gradients and linearisation
summary: Plotting good graphs, using error bars and max/min gradient lines, and turning curved relationships into straight lines.
minutes: 30
difficulty: 2
objectives:
  - Plot graphs with error bars and a line of best fit.
  - Determine a gradient and intercept with their uncertainties using maximum and minimum gradient lines.
  - Linearise relationships of the form y = kxⁿ and y = ae^(kx) using suitable axes or logarithms.
  - Interpret the physical meaning of gradients and areas under graphs.
formulas:
  - name: Gradient uncertainty
    latex: '\Delta m = \frac{m_{\max} - m_{\min}}{2}'
  - name: Log–log linearisation
    latex: 'y = kx^n \Rightarrow \ln y = n\ln x + \ln k'
definitions:
  - term: Error bar
    definition: A line through a data point showing the range within which the true value is likely to lie.
  - term: Linearisation
    definition: Rearranging a relationship so that plotting suitable quantities gives a straight line.
mistakes:
  - Forcing a line through the origin when the data do not support it.
  - Calculating a gradient from two data points instead of from the line of best fit.
tips:
  - Use a large triangle (at least half the line) when measuring a gradient.
  - A systematic error often shows up as a non-zero intercept.
related:
  - physics/t3-mathematics
  - physics/a1-kinematics
---

## Good graph practice

- Independent variable on the x-axis; axes labelled with quantity and unit, e.g. "$t$ / s".
- Scales that use most of the paper.
- **Error bars** on each point, showing its uncertainty.
- A **line of best fit** that passes through all (or nearly all) error bars, with points scattered evenly either side.

## Gradient and intercept uncertainties

```keyidea
Draw the steepest and shallowest straight lines that still pass through all the error bars. The best gradient sits between them; its uncertainty is half the difference between the max and min gradients.
```

```plot
caption: A line of best fit with the steepest and shallowest lines that still fit the data (error bars of about ±0.5 in y not drawn).
x: 0, 6
y: 0, 14
f: 2*x + 1 | best fit
f: 2.35*x + 0.1 | max gradient
f: 1.65*x + 1.9 | min gradient
point: 1, 3
point: 2, 5.2
point: 3, 6.8
point: 4, 9.1
point: 5, 11
xlabel: x
ylabel: y
```

## Linearisation

Straight lines are easy to test and to read constants from. Rearrange the relationship into $y = mx + c$:

| Relationship | Plot | Gradient | Intercept |
|---|---|---|---|
| $T = 2\pi\sqrt{L/g}$ | $T^2$ against $L$ | $4\pi^2/g$ | 0 |
| $y = kx^n$ ($n$ unknown) | $\ln y$ against $\ln x$ | $n$ | $\ln k$ |
| $N = N_0e^{-\lambda t}$ | $\ln N$ against $t$ | $-\lambda$ | $\ln N_0$ |

```example
A plot of $T^2$ against $L$ for a pendulum has gradient 4.02 s² m⁻¹. Find g.
---
$g = 4\pi^2/\text{gradient} = 39.5/4.02 = 9.82$ m s⁻².
```

## Meaning of gradient and area

The gradient and area often have physical meaning: the gradient of a displacement–time graph is velocity; the area under a force–time graph is impulse; the area under a force–extension graph is work done.

```question
loglog-gradient
```

## Summary

- Label axes, include error bars, draw a best-fit line.
- Gradient uncertainty = (max − min)/2 from the extreme lines through the error bars.
- Linearise using powers or logarithms; read constants from gradient and intercept.
