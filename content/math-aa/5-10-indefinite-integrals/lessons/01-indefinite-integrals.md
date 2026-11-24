---
code: 5.10.1
title: Indefinite integrals
summary: Standard integrals, linear composites (ax + b), and integration by inspection (reverse chain rule).
minutes: 35
difficulty: 2
objectives:
  - Integrate xⁿ, 1/x, eˣ, sin x and cos x.
  - Integrate composites with ax + b.
  - Integrate by inspection or substitution expressions of the form k g′(x) f(g(x)).
formulas:
  - name: Standard integrals
    latex: '\int\frac1x\,dx = \ln|x| + C,\ \int e^x\,dx = e^x + C,\ \int\sin x\,dx = -\cos x + C,\ \int\cos x\,dx = \sin x + C'
  - name: Linear composites
    latex: '\int f(ax + b)\,dx = \frac1aF(ax + b) + C'
definitions:
  - term: Integration by inspection
    definition: Recognising an integrand as the result of the chain rule, k·g′(x)·f(g(x)), and reversing it.
mistakes:
  - Forgetting to divide by a for f(ax + b) — ∫e^(3x) dx = ⅓e^(3x) + C.
  - Getting the sign wrong for sin — ∫sin x dx = −cos x + C.
tips:
  - Look for the derivative of an inner function multiplying the integrand — 2x with (x² + 1), cos x with sin x.
related:
  - math-aa/5-5-intro-integration
  - math-aa/5-16-integration-techniques
---

## Standard integrals

| f(x) | ∫f(x) dx |
|---|---|
| $x^n$ ($n \ne -1$) | $\frac{x^{n+1}}{n+1}$ |
| $\frac1x$ | $\ln\lvert x\rvert$ |
| $e^x$ | $e^x$ |
| $\sin x$ | $-\cos x$ |
| $\cos x$ | $\sin x$ |

(all $+ C$)

## Linear composites

```keyidea
If the inside is linear, ax + b, integrate as usual and divide by a.
```

```example
Find $\int(2x + 5)^4\,dx$, $\int e^{3x - 1}\,dx$ and $\int\dfrac{1}{4x + 1}\,dx$.
---
$\dfrac{(2x + 5)^5}{10} + C$. $\dfrac13e^{3x - 1} + C$. $\dfrac14\ln|4x + 1| + C$.
```

## Inspection (reverse chain rule)

If the integrand is $k\,g'(x)\,f(g(x))$, its integral is $k\,F(g(x)) + C$.

```example
Find $\int x(x^2 + 3)^5\,dx$ and $\int\sin x\cos^3x\,dx$.
---
$\dfrac{(x^2 + 3)^6}{12} + C$ (the derivative of $x^2 + 3$ is $2x$).

Let $u = \cos x$: $\int -u^3\,du = -\dfrac{\cos^4x}{4} + C$.
```

```question
int-exp
```

## Summary

- Standard integrals; don’t forget +C.
- $f(ax + b)$: divide by a.
- Spot $g'(x)f(g(x))$ to reverse the chain rule.
