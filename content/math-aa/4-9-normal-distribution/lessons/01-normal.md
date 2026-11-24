---
code: 4.9.1
title: The normal distribution
summary: The bell curve, its properties, and finding probabilities and values with technology.
minutes: 30
difficulty: 2
objectives:
  - Describe the properties of the normal distribution X ~ N(μ, σ²).
  - Use the 68–95–99.7 rule.
  - Calculate probabilities and use inverse normal calculations with a GDC.
formulas:
  - name: Notation
    latex: 'X \sim N(\mu, \sigma^2)'
definitions:
  - term: Normal distribution
    definition: A continuous, symmetric, bell-shaped distribution, fully described by its mean μ and standard deviation σ.
mistakes:
  - Entering the variance into the GDC instead of the standard deviation.
  - Looking for P(X = a) for a continuous variable — it is zero.
tips:
  - Always sketch the curve and shade the required region before using the GDC.
related:
  - math-aa/4-12-standardising-normal
---

## Properties

```keyidea
A normal curve is symmetric about μ (mean = median = mode), and the total area under it is 1. About 68% of values lie within 1σ of μ, 95% within 2σ and 99.7% within 3σ.
```

```plot
caption: The normal curve N(0, 1). The shaded idea — 68% within ±1σ, 95% within ±2σ.
x: -4, 4
y: 0, 0.45
f: exp(-x^2/2)/sqrt(2*pi) | N(0, 1)
vline: -1
vline: 1
vline: -2
vline: 2
```

## Probabilities with a GDC

```example
Heights are normally distributed with μ = 170 cm and σ = 8 cm. Find P(H > 180) and the height exceeded by the tallest 10%.
---
$P(H > 180) = $ normalcdf(180, ∞, 170, 8) $= 0.106$.

Inverse normal with area 0.90 to the left: $h = 180.3$ cm.
```

For a continuous variable, $P(X < a) = P(X \le a)$, since $P(X = a) = 0$.

```question
normal-prob
```

## Summary

- Symmetric bell curve, mean = median = mode, area 1.
- 68–95–99.7 rule.
- GDC: normalcdf for probabilities, invNorm for values (enter σ, not σ²).
