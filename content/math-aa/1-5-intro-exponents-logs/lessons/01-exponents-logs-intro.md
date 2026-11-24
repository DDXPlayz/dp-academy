---
code: 1.5.1
title: Exponents and logarithms
summary: Integer exponents, the meaning of a logarithm as the inverse of an exponential, and natural logs.
minutes: 25
difficulty: 1
objectives:
  - Use laws of exponents with integer exponents.
  - Understand that aˣ = b is equivalent to logₐ b = x.
  - Evaluate logarithms, including log₁₀ and ln, with and without a calculator.
formulas:
  - name: Definition of logarithm
    latex: 'a^x = b \iff \log_a b = x, \quad a > 0,\ a \ne 1,\ b > 0'
definitions:
  - term: Logarithm
    definition: logₐ b is the power to which a must be raised to give b.
  - term: Natural logarithm
    definition: ln x = logₑ x, where e ≈ 2.71828.
mistakes:
  - Taking the log of zero or a negative number. logₐ b is only defined for b > 0.
tips:
  - Read log₂ 8 as "2 to the power what is 8?" — the answer is 3.
related:
  - math-aa/1-7-laws-exponents-logs
  - math-aa/2-9-exponential-log-functions
---

## Integer exponents

$$
a^m\times a^n = a^{m+n}, \qquad \frac{a^m}{a^n} = a^{m-n}, \qquad (a^m)^n = a^{mn}, \qquad a^0 = 1, \qquad a^{-n} = \frac{1}{a^n}
$$

```example
Simplify $\dfrac{(2x^3)^2\times x^{-4}}{4x}$.
---
$\dfrac{4x^6\times x^{-4}}{4x} = \dfrac{4x^2}{4x} = x$.
```

## What a logarithm is

```keyidea
A logarithm undoes an exponential: aˣ = b exactly when logₐ b = x. So a log answers the question "what power?".
```

- $\log_2 32 = 5$ because $2^5 = 32$.
- $\log_{10} 0.001 = -3$ because $10^{-3} = 0.001$.
- $\log_a 1 = 0$ and $\log_a a = 1$ for any valid base.
- $\ln x = \log_e x$; $\ln e = 1$.

Inverse properties: $a^{\log_a x} = x$ and $\log_a a^x = x$.

```example
Solve $10^x = 50$ and $e^{2x} = 7$.
---
$x = \log_{10}50 = 1.70$. $2x = \ln7 \Rightarrow x = 0.973$.
```

```question
log-eval
```

## Summary

- Integer exponent laws: add, subtract, multiply powers; $a^{-n} = 1/a^n$.
- $a^x = b \iff \log_a b = x$.
- $\log_a 1 = 0$, $\log_a a = 1$, $\ln = \log_e$.
