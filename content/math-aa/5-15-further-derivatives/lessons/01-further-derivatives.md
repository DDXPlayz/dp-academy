---
code: 5.15.1
title: Further derivatives and integrals
summary: Derivatives of tan, sec, cosec, cot, aˣ, logₐ x and the inverse trig functions, their integrals, and integrating with partial fractions.
minutes: 35
difficulty: 3
hl: true
objectives:
  - Differentiate tan x, sec x, cosec x, cot x, aˣ, logₐ x, arcsin x, arccos x and arctan x.
  - Integrate the corresponding standard forms, including linear composites.
  - Use partial fractions to integrate rational functions.
formulas:
  - name: Trig derivatives
    latex: '(\tan x)'' = \sec^2x,\ (\sec x)'' = \sec x\tan x,\ (\csc x)'' = -\csc x\cot x,\ (\cot x)'' = -\csc^2x'
  - name: Exponential and log
    latex: '(a^x)'' = a^x\ln a,\quad (\log_a x)'' = \frac{1}{x\ln a}'
  - name: Inverse trig
    latex: '(\arcsin x)'' = \frac{1}{\sqrt{1 - x^2}},\ (\arccos x)'' = -\frac{1}{\sqrt{1 - x^2}},\ (\arctan x)'' = \frac{1}{1 + x^2}'
  - name: Standard integrals
    latex: '\int\frac{1}{a^2 + x^2}\,dx = \frac1a\arctan\frac xa + C,\quad \int\frac{1}{\sqrt{a^2 - x^2}}\,dx = \arcsin\frac xa + C'
definitions:
  - term: Partial fractions integration
    definition: Splitting a rational integrand into simpler fractions, each integrating to a logarithm.
mistakes:
  - Forgetting the ln a factor when differentiating aˣ.
tips:
  - Many of these are in the formula booklet — know where to find them and how to use the linear-composite version.
related:
  - math-aa/1-11-partial-fractions
  - math-aa/3-9-reciprocal-inverse-trig
---

## Derivatives

| f(x) | f′(x) |
|---|---|
| $\tan x$ | $\sec^2x$ |
| $\sec x$ | $\sec x\tan x$ |
| $\csc x$ | $-\csc x\cot x$ |
| $\cot x$ | $-\csc^2x$ |
| $a^x$ | $a^x\ln a$ |
| $\log_a x$ | $\dfrac{1}{x\ln a}$ |
| $\arcsin x$ | $\dfrac{1}{\sqrt{1 - x^2}}$ |
| $\arctan x$ | $\dfrac{1}{1 + x^2}$ |

```example
Differentiate $y = \arctan(2x)$ and $y = 3^{x^2}$.
---
$\dfrac{2}{1 + 4x^2}$. $3^{x^2}\ln3\cdot2x$.
```

## Integrals

```keyidea
Each derivative gives an integral by reversal: ∫sec²x dx = tan x + C, ∫1/(1 + x²) dx = arctan x + C, ∫1/√(1 − x²) dx = arcsin x + C, and their (ax + b) or a² versions.
```

```example
Find $\displaystyle\int\frac{1}{9 + x^2}\,dx$.
---
$\dfrac13\arctan\dfrac x3 + C$.
```

## Partial fractions

```example
Find $\displaystyle\int\frac{5x + 1}{(x - 1)(x + 2)}\,dx$.
---
Partial fractions: $\dfrac{2}{x - 1} + \dfrac{3}{x + 2}$. Integral: $2\ln|x - 1| + 3\ln|x + 2| + C$.
```

```question
tan-deriv
```

## Summary

- Learn/locate the derivatives of tan, sec, cosec, cot, aˣ, logₐ x, inverse trig.
- Reverse them for integrals; arctan and arcsin forms with a².
- Partial fractions → sums of logs.
