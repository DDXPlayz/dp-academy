---
code: 5.14.1
title: Implicit differentiation and related rates
summary: Differentiating equations not solved for y, and linking rates of change with the chain rule.
minutes: 35
difficulty: 3
hl: true
objectives:
  - Differentiate implicitly, treating y as a function of x.
  - Find gradients and tangents of implicitly defined curves.
  - Solve related rates problems using the chain rule.
  - Solve optimisation problems that need these techniques.
formulas:
  - name: Implicit differentiation
    latex: '\frac{d}{dx}\big(f(y)\big) = f''(y)\frac{dy}{dx}'
  - name: Related rates
    latex: '\frac{dV}{dt} = \frac{dV}{dr}\cdot\frac{dr}{dt}'
definitions:
  - term: Implicit function
    definition: A relationship between x and y not written in the form y = f(x), such as x² + y² = 25.
mistakes:
  - Forgetting dy/dx when differentiating a y term — d/dx(y²) = 2y dy/dx.
  - Substituting the given values before differentiating in related rates. Differentiate first, then substitute.
tips:
  - Product rule applies to terms like xy — d/dx(xy) = y + x dy/dx.
related:
  - math-aa/5-6-differentiation-rules
---

## Implicit differentiation

```keyidea
Differentiate every term with respect to x. Whenever you differentiate a function of y, multiply by dy/dx (chain rule). Then rearrange for dy/dx.
```

```example
Find the gradient of $x^2 + xy + y^2 = 7$ at $(1, 2)$.
---
$2x + y + x\dfrac{dy}{dx} + 2y\dfrac{dy}{dx} = 0 \Rightarrow \dfrac{dy}{dx} = -\dfrac{2x + y}{x + 2y}$.

At $(1, 2)$: $-\dfrac{4}{5}$.
```

## Related rates

```example
A spherical balloon is inflated at 50 cm³ s⁻¹. How fast is its radius increasing when r = 10 cm?
---
$V = \tfrac43\pi r^3 \Rightarrow \dfrac{dV}{dr} = 4\pi r^2$.

$\dfrac{dr}{dt} = \dfrac{dV/dt}{dV/dr} = \dfrac{50}{4\pi(100)} = 0.0398$ cm s⁻¹.
```

```example
A 5 m ladder slides down a wall; its foot moves away at 0.3 m s⁻¹. How fast is the top sliding down when the foot is 3 m from the wall?
---
$x^2 + y^2 = 25 \Rightarrow 2x\dot x + 2y\dot y = 0$. When $x = 3$, $y = 4$: $3(0.3) + 4\dot y = 0 \Rightarrow \dot y = -0.225$ m s⁻¹ (sliding down at 0.225 m s⁻¹).
```

```question
implicit-grad
```

## Summary

- Implicit: differentiate each term, attach dy/dx to y terms, solve.
- Related rates: chain rule linking known and unknown rates; differentiate before substituting.
