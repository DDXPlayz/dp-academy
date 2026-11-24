---
code: 4.12.1
title: Standardising normal variables
summary: z-scores, and finding an unknown mean or standard deviation from given probabilities.
minutes: 30
difficulty: 3
objectives:
  - Standardise using z = (x − μ)/σ and interpret z-values.
  - Use inverse normal on Z ~ N(0, 1) to find unknown μ or σ (or both).
formulas:
  - name: Standardisation
    latex: 'z = \frac{x - \mu}{\sigma},\quad Z \sim N(0, 1)'
definitions:
  - term: z-score
    definition: The number of standard deviations a value is above (positive) or below (negative) the mean.
mistakes:
  - Using invNorm on X when μ or σ is unknown — you must work with Z ~ N(0, 1).
tips:
  - Two unknowns need two probability statements → two simultaneous equations.
related:
  - math-aa/4-9-normal-distribution
---

## z-scores

$$
z = \frac{x - \mu}{\sigma}
$$

A z-score tells you how many standard deviations a value is from the mean, letting you compare values from different distributions.

```example
Ana scores 72 in a test with μ = 60, σ = 8; Ben scores 80 in a test with μ = 70, σ = 10. Who did relatively better?
---
Ana: $z = 1.5$; Ben: $z = 1.0$. Ana did relatively better.
```

## Unknown μ or σ

```keyidea
If μ or σ is unknown, use the standard normal: find z from the probability with invNorm(p, 0, 1), then solve z = (x − μ)/σ.
```

```example
$X \sim N(\mu, 5^2)$ and $P(X < 40) = 0.25$. Find μ.
---
$z = $ invNorm(0.25) $= -0.6745$. $\dfrac{40 - \mu}{5} = -0.6745 \Rightarrow \mu = 43.4$.
```

```example
$X \sim N(\mu, \sigma^2)$ with $P(X < 30) = 0.1$ and $P(X > 60) = 0.2$. Find μ and σ.
---
$\dfrac{30 - \mu}{\sigma} = -1.2816$ and $\dfrac{60 - \mu}{\sigma} = 0.8416$.

Subtract: $30/\sigma = 2.1232 \Rightarrow \sigma = 14.1$; $\mu = 30 + 1.2816(14.1) = 48.1$.
```

```question
z-score
```

## Summary

- $z = (x - \mu)/\sigma$ compares across distributions.
- Unknown μ/σ: get z from invNorm on N(0, 1), then solve; two unknowns need two equations.
