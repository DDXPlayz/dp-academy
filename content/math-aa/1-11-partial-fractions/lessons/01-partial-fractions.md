---
code: 1.11.1
title: Partial fractions
summary: Splitting a rational expression with linear factors in the denominator into simpler fractions.
minutes: 25
difficulty: 3
hl: true
objectives:
  - Decompose rational expressions with distinct linear factors in the denominator.
  - Use substitution or equating coefficients to find the constants.
  - Divide first when the numerator’s degree is not less than the denominator’s.
formulas:
  - name: Distinct linear factors
    latex: '\frac{px + q}{(x - a)(x - b)} \equiv \frac{A}{x - a} + \frac{B}{x - b}'
definitions:
  - term: Proper fraction
    definition: A rational expression whose numerator has lower degree than its denominator.
mistakes:
  - Decomposing an improper fraction directly. Divide first to get a polynomial plus a proper fraction.
tips:
  - Cover-up / substitution — put x = a to kill the B term and find A immediately.
related:
  - math-aa/5-16-integration-techniques
---

## The idea

$$
\frac{px + q}{(x - a)(x - b)} \equiv \frac{A}{x - a} + \frac{B}{x - b}
$$

Multiply through by the denominator to get an identity, then find $A$ and $B$.

```example
Express $\dfrac{5x + 1}{(x - 1)(x + 2)}$ in partial fractions.
---
$5x + 1 \equiv A(x + 2) + B(x - 1)$.

$x = 1$: $6 = 3A \Rightarrow A = 2$. $x = -2$: $-9 = -3B \Rightarrow B = 3$.

$\dfrac{2}{x - 1} + \dfrac{3}{x + 2}$.
```

```keyidea
Choose values of x that make one bracket zero — each substitution gives one constant directly.
```

## Improper fractions

If the degree of the numerator ≥ the degree of the denominator, divide first.

```example
Express $\dfrac{x^2 + 1}{(x - 1)(x + 1)}$ in partial fractions.
---
$\dfrac{x^2 + 1}{x^2 - 1} = 1 + \dfrac{2}{x^2 - 1}$. Then $\dfrac{2}{(x - 1)(x + 1)} = \dfrac{1}{x - 1} - \dfrac{1}{x + 1}$.

Answer: $1 + \dfrac{1}{x - 1} - \dfrac{1}{x + 1}$.
```

Partial fractions are essential for integrating rational functions.

```question
pf-a
```

## Summary

- Write as $A/(x - a) + B/(x - b)$; multiply out; substitute roots.
- Divide first if the fraction is improper.
