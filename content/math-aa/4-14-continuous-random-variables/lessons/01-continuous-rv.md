---
code: 4.14.1
title: Continuous random variables
summary: Probability density functions, mode and median, mean and variance, and the effect of linear transformations.
minutes: 40
difficulty: 3
hl: true
objectives:
  - Use a probability density function f(x) with ∫f(x) dx = 1.
  - Find probabilities, the mode and the median of a continuous random variable.
  - Find the mean, variance and standard deviation of discrete and continuous random variables.
  - Use E(aX + b) = aE(X) + b and Var(aX + b) = a²Var(X).
formulas:
  - name: Total probability
    latex: '\int_{-\infty}^{\infty} f(x)\,dx = 1'
  - name: Mean
    latex: 'E(X) = \int xf(x)\,dx'
  - name: Variance
    latex: '\text{Var}(X) = E(X^2) - [E(X)]^2'
  - name: Linear transformations
    latex: 'E(aX + b) = aE(X) + b,\quad \text{Var}(aX + b) = a^2\text{Var}(X)'
definitions:
  - term: Probability density function
    definition: A function f(x) ≥ 0 whose integral over an interval gives the probability that X lies in it.
  - term: Median (continuous)
    definition: The value m with ∫ from the lower limit to m of f(x) dx = 0.5.
  - term: Mode (continuous)
    definition: The value of x at which f(x) is greatest.
mistakes:
  - Thinking f(x) itself is a probability. Probabilities are areas under f.
  - Adding b to the variance. Var(aX + b) = a²Var(X) — b has no effect on spread.
tips:
  - For a discrete variable, Var(X) = Σx²P(X = x) − [E(X)]².
related:
  - math-aa/4-7-discrete-random-variables
  - math-aa/5-11-definite-integrals-areas
---

## Probability density functions

```keyidea
For a continuous random variable, probability is area: P(a ≤ X ≤ b) = ∫ₐᵇ f(x) dx. The total area under f is 1.
```

```example
$f(x) = kx(4 - x)$ for $0 \le x \le 4$. Find k and $P(X < 1)$.
---
$\int_0^4 k(4x - x^2)\,dx = k\left[2x^2 - \tfrac{x^3}{3}\right]_0^4 = k\left(32 - \tfrac{64}{3}\right) = \tfrac{32k}{3} = 1 \Rightarrow k = \tfrac{3}{32}$.

$P(X < 1) = \tfrac{3}{32}\left[2x^2 - \tfrac{x^3}3\right]_0^1 = \tfrac{3}{32}\cdot\tfrac53 = \tfrac{5}{32}$.
```

## Mode, median, mean, variance

- **Mode:** maximum of $f$ (calculus or GDC). Here $x = 2$.
- **Median:** solve $\int_0^m f(x)\,dx = 0.5$. By symmetry here $m = 2$.
- **Mean:** $E(X) = \int xf(x)\,dx$.
- **Variance:** $E(X^2) - [E(X)]^2$.

```example
For the same f, find Var(X).
---
$E(X) = 2$ by symmetry. $E(X^2) = \tfrac{3}{32}\int_0^4(4x^3 - x^4)\,dx = \tfrac{3}{32}\left(256 - \tfrac{1024}{5}\right) = \tfrac{3}{32}\cdot\tfrac{256}{5} = 4.8$.

$\text{Var}(X) = 4.8 - 4 = 0.8$.
```

## Linear transformations

$$
E(aX + b) = aE(X) + b, \qquad \text{Var}(aX + b) = a^2\text{Var}(X)
$$

```question
pdf-k
```

## Summary

- Probability = area under the pdf; total area 1.
- Mode: max of f. Median: half the area. Mean: $\int xf$. Variance: $E(X^2) - E(X)^2$.
- $E(aX + b) = aE(X) + b$; $\text{Var}(aX + b) = a^2\text{Var}(X)$.
