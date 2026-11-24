---
code: 1.7.1
title: Laws of exponents and logarithms
summary: Rational exponents, the three laws of logarithms, change of base, and solving exponential and log equations.
minutes: 35
difficulty: 2
objectives:
  - Use laws of exponents with rational exponents.
  - Use the laws of logarithms and the change of base formula.
  - Solve exponential equations, including by taking logarithms.
  - Solve logarithmic equations and reject invalid solutions.
formulas:
  - name: Rational exponents
    latex: 'a^{m/n} = \sqrt[n]{a^m}'
  - name: Laws of logarithms
    latex: '\log_a xy = \log_a x + \log_a y,\quad \log_a\frac{x}{y} = \log_a x - \log_a y,\quad \log_a x^m = m\log_a x'
  - name: Change of base
    latex: '\log_b a = \frac{\log_c a}{\log_c b}'
definitions:
  - term: Change of base
    definition: Rewriting a logarithm in a different base, e.g. log₂ 7 = ln 7 / ln 2.
mistakes:
  - Writing log(x + y) = log x + log y. There is no law for the log of a sum.
  - Keeping solutions that make the argument of a log zero or negative.
tips:
  - For equations like 4ˣ − 3·2ˣ − 4 = 0, substitute y = 2ˣ to get a quadratic.
related:
  - math-aa/1-5-intro-exponents-logs
  - math-aa/2-9-exponential-log-functions
---

## Rational exponents

$$
a^{1/n} = \sqrt[n]{a}, \qquad a^{m/n} = \left(\sqrt[n]{a}\right)^m
$$

```example
Evaluate $27^{2/3}$ and $16^{-3/4}$.
---
$27^{2/3} = (\sqrt[3]{27})^2 = 9$. $16^{-3/4} = 1/(\sqrt[4]{16})^3 = 1/8$.
```

## Laws of logarithms

```keyidea
Logs turn multiplication into addition, division into subtraction and powers into multiplication. There is no rule for the log of a sum.
```

$$
\log_a xy = \log_a x + \log_a y,\qquad \log_a\frac{x}{y} = \log_a x - \log_a y,\qquad \log_a x^m = m\log_a x
$$

**Change of base:** $\log_b a = \dfrac{\ln a}{\ln b}$.

```example
Write $2\log 3 + \log 4 - \log 6$ as a single logarithm.
---
$\log 9 + \log 4 - \log 6 = \log\dfrac{36}{6} = \log 6$.
```

## Exponential equations

```example
Solve $5^{x+1} = 3^{2x}$.
---
Take logs: $(x + 1)\ln5 = 2x\ln3 \Rightarrow x(\ln5 - 2\ln3) = -\ln5 \Rightarrow x = \dfrac{\ln5}{2\ln3 - \ln5} = 2.74$.
```

```example
Solve $4^x - 6(2^x) + 8 = 0$.
---
Let $y = 2^x$: $y^2 - 6y + 8 = 0 \Rightarrow y = 2$ or $4$, so $x = 1$ or $2$.
```

## Log equations

Combine into a single log, convert to exponential form, then **check** each solution in the original logs.

```question
log-combine
```

## Summary

- $a^{m/n} = \sqrt[n]{a^m}$.
- Product, quotient and power laws; change of base $\log_b a = \ln a/\ln b$.
- Take logs to solve exponential equations; reject invalid log solutions.
