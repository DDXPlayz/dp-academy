---
code: 5.13.1
title: L’Hôpital’s rule
summary: Evaluating limits of the forms 0/0 and ∞/∞ by differentiating top and bottom, repeatedly if needed.
minutes: 25
difficulty: 3
hl: true
objectives:
  - Recognise indeterminate forms 0/0 and ∞/∞.
  - Apply l’Hôpital’s rule, repeatedly if necessary.
  - Evaluate limits using Maclaurin series as an alternative.
formulas:
  - name: L’Hôpital’s rule
    latex: "\\lim_{x\\to a}\\frac{f(x)}{g(x)} = \\lim_{x\\to a}\\frac{f'(x)}{g'(x)}\\quad\\text{(for } \\tfrac00 \\text{ or } \\tfrac\\infty\\infty)"
definitions:
  - term: Indeterminate form
    definition: A limit such as 0/0 or ∞/∞ whose value cannot be found by direct substitution.
mistakes:
  - Using the quotient rule. L’Hôpital differentiates numerator and denominator separately.
  - Applying the rule when the limit is not indeterminate.
tips:
  - After each application, substitute again — if still 0/0, apply it again.
related:
  - math-aa/5-19-maclaurin-series
---

## The rule

```keyidea
If substituting gives 0/0 or ∞/∞, differentiate the numerator and the denominator separately and try the limit again.
```

```example
Find $\displaystyle\lim_{x\to0}\frac{\sin3x}{x}$.
---
Gives $\tfrac00$. Differentiate: $\dfrac{3\cos3x}{1} \to 3$.
```

```example
Find $\displaystyle\lim_{x\to0}\frac{1 - \cos x}{x^2}$.
---
$\tfrac00$ → $\dfrac{\sin x}{2x}$, still $\tfrac00$ → $\dfrac{\cos x}{2} \to \tfrac12$.
```

```example
Find $\displaystyle\lim_{x\to\infty}\frac{x^2}{e^x}$.
---
$\tfrac\infty\infty$ → $\dfrac{2x}{e^x}$ → $\dfrac{2}{e^x} \to 0$. Exponentials beat polynomials.
```

```question
lhopital-basic
```

## Summary

- Only for 0/0 or ∞/∞.
- Differentiate top and bottom separately; repeat as needed.
