---
code: 5.6.1
title: Differentiation rules
summary: Derivatives of xⁿ, sin, cos, eˣ and ln x, and the chain, product and quotient rules.
minutes: 40
difficulty: 2
objectives:
  - Differentiate xⁿ (n rational), sin x, cos x, eˣ and ln x.
  - Use the chain rule for composite functions.
  - Use the product and quotient rules.
formulas:
  - name: Standard derivatives
    latex: '\frac{d}{dx}\sin x = \cos x,\ \frac{d}{dx}\cos x = -\sin x,\ \frac{d}{dx}e^x = e^x,\ \frac{d}{dx}\ln x = \frac1x'
  - name: Chain rule
    latex: '\frac{dy}{dx} = \frac{dy}{du}\cdot\frac{du}{dx}'
  - name: Product rule
    latex: "(uv)' = u'v + uv'"
  - name: Quotient rule
    latex: "\\left(\\frac uv\\right)' = \\frac{u'v - uv'}{v^2}"
definitions:
  - term: Composite function
    definition: A function of a function, such as sin(3x²) or e^(2x+1); differentiated with the chain rule.
mistakes:
  - Forgetting the inner derivative in the chain rule — d/dx e^(3x) = 3e^(3x).
  - Reversing the order in the quotient rule numerator. It is u′v − uv′.
tips:
  - Chain rule shortcut — differentiate the outside (leaving the inside alone) and multiply by the derivative of the inside.
related:
  - math-aa/5-3-differentiating-powers
  - math-aa/5-15-further-derivatives
---

## Standard derivatives

| f(x) | f′(x) |
|---|---|
| $x^n$ | $nx^{n-1}$ |
| $\sin x$ | $\cos x$ |
| $\cos x$ | $-\sin x$ |
| $e^x$ | $e^x$ |
| $\ln x$ | $\dfrac1x$ |

## The chain rule

```keyidea
For y = f(g(x)): dy/dx = f′(g(x)) × g′(x) — the derivative of the outside times the derivative of the inside.
```

```example
Differentiate $y = (3x^2 + 1)^5$ and $y = \sin(4x)$ and $y = \ln(x^2 + 1)$.
---
$5(3x^2 + 1)^4\cdot6x = 30x(3x^2 + 1)^4$. $4\cos(4x)$. $\dfrac{2x}{x^2 + 1}$.
```

## Product and quotient rules

$$
(uv)' = u'v + uv', \qquad \left(\frac uv\right)' = \frac{u'v - uv'}{v^2}
$$

```example
Differentiate $y = x^2e^{3x}$ and $y = \dfrac{\sin x}{x}$.
---
Product: $2xe^{3x} + 3x^2e^{3x} = xe^{3x}(2 + 3x)$.

Quotient: $\dfrac{x\cos x - \sin x}{x^2}$.
```

```question
chain-rule
```

## Summary

- Know the five standard derivatives.
- Chain: outside′ × inside′.
- Product $u'v + uv'$; quotient $(u'v - uv')/v^2$.
