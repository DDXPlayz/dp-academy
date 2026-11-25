---
code: 5.1.1
title: Limits and the derivative
summary: The idea of a limit, and the derivative as the gradient of a curve and a rate of change.
minutes: 25
difficulty: 1
objectives:
  - Understand the concept of a limit informally.
  - Interpret the derivative as the gradient function and as a rate of change.
  - Estimate gradients using secants that approach a tangent.
formulas:
  - name: Derivative notation
    latex: "f'(x) = \\frac{dy}{dx} = \\lim_{h\\to0}\\frac{f(x + h) - f(x)}{h}"
definitions:
  - term: Limit
    definition: The value a function approaches as its input approaches a given value.
  - term: Derivative
    definition: The gradient function f′(x) — the gradient of the tangent at each point, or the instantaneous rate of change.
mistakes:
  - Confusing average rate of change (secant gradient) with instantaneous rate of change (tangent gradient).
tips:
  - Units of dy/dx are units of y per unit of x — e.g. m s⁻¹ for displacement against time.
related:
  - math-aa/5-3-differentiating-powers
---

## Limits

A **limit** describes what a function approaches. For example, as $x \to 2$, $\dfrac{x^2 - 4}{x - 2} = x + 2 \to 4$, even though the expression is undefined at $x = 2$.

## From secants to the tangent

```keyidea
The gradient of the chord between (x, f(x)) and (x + h, f(x + h)) approaches the gradient of the tangent as h → 0. That limit is the derivative f′(x).
```

```figure
src: math-aa/_sme/5-1-differentiation/img/fig-652887a54c6a64d8.png
caption: As Q moves along the curve towards P, the chords PQ approach the tangent at P, whose gradient is the derivative.
```

```example
Estimate the gradient of $y = x^2$ at $x = 3$ using chords to $x = 3.1$ and $x = 3.01$.
---
$\dfrac{9.61 - 9}{0.1} = 6.1$; $\dfrac{9.0601 - 9}{0.01} = 6.01$. The gradient approaches 6.
```

## Rates of change

The derivative measures how fast one quantity changes with another:

| Quantity | Derivative | Meaning |
|---|---|---|
| displacement $s(t)$ | $\frac{ds}{dt}$ | velocity |
| volume $V(t)$ | $\frac{dV}{dt}$ | rate of filling |
| cost $C(n)$ | $\frac{dC}{dn}$ | marginal cost |

```question
secant-estimate
```

## Summary

- Limits describe approach values.
- $f'(x)$ = gradient of tangent = limit of chord gradients.
- Derivatives are rates of change with units "y per x".
