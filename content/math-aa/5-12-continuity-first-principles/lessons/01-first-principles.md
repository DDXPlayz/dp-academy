---
code: 5.12.1
title: Continuity, differentiability and first principles
summary: When a function is continuous or differentiable, limits, and deriving derivatives from the definition.
minutes: 35
difficulty: 3
hl: true
objectives:
  - Understand continuity and differentiability at a point informally.
  - Understand limits, including convergence and divergence.
  - Differentiate from first principles.
  - Find higher derivatives.
formulas:
  - name: First principles
    latex: "f'(x) = \\lim_{h\\to0}\\frac{f(x + h) - f(x)}{h}"
definitions:
  - term: Continuous at a
    definition: The limit of f(x) as x → a exists and equals f(a) — no break in the graph.
  - term: Differentiable at a
    definition: The derivative exists at a — the left and right gradients agree; the graph is smooth (no corner or cusp).
mistakes:
  - Thinking every continuous function is differentiable. |x| is continuous at 0 but not differentiable there.
tips:
  - In first-principles proofs, expand f(x + h), cancel f(x), divide by h, then let h → 0.
related:
  - math-aa/5-1-limits-derivative
---

## Continuity and differentiability

```keyidea
Continuous: no jumps or holes. Differentiable: continuous AND smooth — no corners. Differentiability implies continuity, but not the other way round.
```

Example: $f(x) = |x|$ is continuous at 0, but its gradient jumps from −1 to 1, so it is not differentiable there.

A piecewise function is continuous at the join if the pieces meet, and differentiable if their derivatives also match there.

## First principles

$$
f'(x) = \lim_{h\to0}\frac{f(x + h) - f(x)}{h}
$$

```example
Differentiate $f(x) = x^3$ from first principles.
---
$\dfrac{(x + h)^3 - x^3}{h} = \dfrac{3x^2h + 3xh^2 + h^3}{h} = 3x^2 + 3xh + h^2 \to 3x^2$ as $h \to 0$.
```

## Higher derivatives

$f''(x)$, $f'''(x)$, …, $f^{(n)}(x)$. For example, $\dfrac{d^n}{dx^n}e^{2x} = 2^ne^{2x}$.

```question
continuity-k
```

## Summary

- Continuous: limit = value. Differentiable: smooth (implies continuous).
- $f'(x) = \lim_{h\to0}\frac{f(x + h) - f(x)}{h}$.
- Higher derivatives by repeated differentiation; spot patterns.
