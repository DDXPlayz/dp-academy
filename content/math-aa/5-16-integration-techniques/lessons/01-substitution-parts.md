---
code: 5.16.1
title: Integration by substitution and by parts
summary: Changing the variable to simplify an integral, and integrating products with the parts formula, including repeated use.
minutes: 40
difficulty: 3
hl: true
objectives:
  - Integrate by substitution, including changing limits for definite integrals.
  - Integrate by parts, choosing u sensibly.
  - Use repeated integration by parts, including cyclic cases.
formulas:
  - name: Integration by parts
    latex: '\int u\frac{dv}{dx}\,dx = uv - \int v\frac{du}{dx}\,dx'
definitions:
  - term: Integration by substitution
    definition: Replacing part of the integrand with a new variable u (and dx with du/u′) to get a simpler integral.
mistakes:
  - Forgetting to change the limits (or back-substitute) in definite integrals.
  - Choosing u = eˣ or u = sin x when a polynomial factor is present. Let the polynomial be u so it differentiates away.
tips:
  - Order for choosing u — Logs, Inverse trig, Algebraic, Trig, Exponential (LIATE).
related:
  - math-aa/5-10-indefinite-integrals
---

## Substitution

```keyidea
Choose u (often the inside of a composite), find du/dx, replace dx and every x, integrate in u, then go back to x — or change the limits.
```

```example
Find $\displaystyle\int_0^1 x\sqrt{1 - x^2}\,dx$ using $u = 1 - x^2$.
---
$du = -2x\,dx$; limits $x = 0 \to u = 1$, $x = 1 \to u = 0$.

$\int_1^0 -\tfrac12u^{1/2}\,du = \tfrac12\int_0^1u^{1/2}\,du = \tfrac12\cdot\tfrac23 = \tfrac13$.
```

## Integration by parts

$$
\int u\,v'\,dx = uv - \int v\,u'\,dx
$$

```example
Find $\int xe^{2x}\,dx$.
---
$u = x$, $v' = e^{2x}$: $u' = 1$, $v = \tfrac12e^{2x}$.

$\tfrac12xe^{2x} - \int\tfrac12e^{2x}\,dx = \tfrac12xe^{2x} - \tfrac14e^{2x} + C$.
```

```example
Find $\int\ln x\,dx$.
---
$u = \ln x$, $v' = 1$: $x\ln x - \int x\cdot\tfrac1x\,dx = x\ln x - x + C$.
```

## Repeated and cyclic parts

For $\int x^2e^x\,dx$ apply parts twice. For $\int e^x\sin x\,dx$, applying parts twice returns the original integral $I$ — then solve for $I$: $I = \tfrac12e^x(\sin x - \cos x) + C$.

```question
parts-calc
```

## Summary

- Substitution: choose u, convert dx and limits.
- Parts: $\int uv' = uv - \int vu'$; LIATE for u.
- Cyclic integrals: solve for I.
