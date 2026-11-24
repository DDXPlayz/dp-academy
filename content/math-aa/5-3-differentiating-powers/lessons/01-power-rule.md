---
code: 5.3.1
title: Differentiating powers of x
summary: The power rule for integer powers, and differentiating sums of terms.
minutes: 20
difficulty: 1
objectives:
  - Differentiate axⁿ for integer n.
  - Differentiate polynomials and expressions with negative powers.
  - Rewrite expressions as sums of powers before differentiating.
formulas:
  - name: Power rule
    latex: '\frac{d}{dx}(ax^n) = anx^{n-1}'
definitions:
  - term: Power rule
    definition: The derivative of axⁿ is anxⁿ⁻¹.
mistakes:
  - Differentiating a quotient term by term. Rewrite 3/x² as 3x⁻² first.
tips:
  - The derivative of a constant is 0; the derivative of kx is k.
related:
  - math-aa/5-6-differentiation-rules
---

## The power rule

$$
\frac{d}{dx}(ax^n) = anx^{n-1}
$$

Differentiate a sum term by term.

```keyidea
Bring the power down as a multiplier and reduce the power by one. Rewrite fractions and roots as powers first.
```

```example
Differentiate $y = 4x^3 - \dfrac{2}{x} + \dfrac{5}{x^2} - 7$.
---
Rewrite: $4x^3 - 2x^{-1} + 5x^{-2} - 7$.

$\dfrac{dy}{dx} = 12x^2 + 2x^{-2} - 10x^{-3} = 12x^2 + \dfrac{2}{x^2} - \dfrac{10}{x^3}$.
```

```example
Find the gradient of $y = \dfrac{x^3 + 2x}{x}$ at $x = 3$.
---
Simplify: $y = x^2 + 2$, so $\dfrac{dy}{dx} = 2x = 6$.
```

```question
power-diff
```

## Summary

- $\frac{d}{dx}(ax^n) = anx^{n-1}$.
- Rewrite as powers; differentiate term by term.
