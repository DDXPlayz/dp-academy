---
code: 5.5.1
title: Introduction to integration
summary: Integration as reversing differentiation, finding the constant, and areas under curves with technology.
minutes: 25
difficulty: 1
objectives:
  - Integrate axⁿ (n ≠ −1) and sums of such terms.
  - Find the constant of integration from a boundary condition.
  - Use technology to evaluate definite integrals and areas between a curve and the x-axis.
formulas:
  - name: Power rule for integration
    latex: '\int ax^n\,dx = \frac{a}{n + 1}x^{n+1} + C,\quad n \ne -1'
  - name: Area under a curve
    latex: 'A = \int_a^b y\,dx,\quad y \ge 0'
definitions:
  - term: Indefinite integral
    definition: The family of all antiderivatives, written with + C.
mistakes:
  - Forgetting + C on indefinite integrals.
tips:
  - Check by differentiating your answer.
related:
  - math-aa/5-10-indefinite-integrals
  - math-aa/5-11-definite-integrals-areas
---

## Antidifferentiation

$$
\int ax^n\,dx = \frac{a}{n + 1}x^{n+1} + C \qquad (n \ne -1)
$$

```keyidea
Integration reverses differentiation: raise the power by one and divide by the new power. Add C, because constants vanish when differentiating.
```

```example
Given $f'(x) = 6x^2 - 4x$ and $f(1) = 5$, find $f(x)$.
---
$f(x) = 2x^3 - 2x^2 + C$. $5 = 2 - 2 + C \Rightarrow C = 5$. So $f(x) = 2x^3 - 2x^2 + 5$.
```

## Areas with technology

The area between $y = f(x) \ge 0$ and the x-axis from $a$ to $b$ is $\int_a^b f(x)\,dx$, which a GDC evaluates directly.

```example
Find the area between $y = 4 - x^2$ and the x-axis.
---
Roots at $\pm2$: $\int_{-2}^{2}(4 - x^2)\,dx = \tfrac{32}{3} \approx 10.7$.
```

```question
integrate-power
```

## Summary

- $\int ax^n\,dx = \frac{a}{n+1}x^{n+1} + C$.
- Use a boundary condition to find C.
- Area under a positive curve = definite integral.
