---
code: 2.9.1
title: Exponential and logarithmic functions
summary: Graphs of aˣ, eˣ, logₐ x and ln x, their asymptotes, and their inverse relationship.
minutes: 25
difficulty: 2
objectives:
  - Sketch exponential functions y = aˣ and y = eˣ and their transformations.
  - Sketch logarithmic functions y = logₐ x and y = ln x.
  - Use the inverse relationship between eˣ and ln x.
  - Apply exponential models of growth and decay.
formulas:
  - name: Inverse relationship
    latex: 'e^{\ln x} = x\ (x > 0),\qquad \ln(e^x) = x'
  - name: Change of exponential base
    latex: 'a^x = e^{x\ln a}'
definitions:
  - term: Exponential growth/decay
    definition: Change modelled by y = Ae^(kt) — growth if k > 0, decay if k < 0.
mistakes:
  - Forgetting the horizontal asymptote of a translated exponential — y = eˣ + 3 has asymptote y = 3.
tips:
  - eˣ and ln x are reflections of each other in y = x.
related:
  - math-aa/1-7-laws-exponents-logs
  - math-aa/2-11-transformations
---

## Exponential graphs

$y = a^x$ ($a > 0$, $a \ne 1$) passes through $(0, 1)$, has horizontal asymptote $y = 0$, and is increasing if $a > 1$, decreasing if $0 < a < 1$. Range: $y > 0$.

## Logarithmic graphs

$y = \log_a x$ is the inverse of $a^x$: it passes through $(1, 0)$, has vertical asymptote $x = 0$, and domain $x > 0$.

```plot
caption: y = eˣ and y = ln x are reflections of each other in y = x.
x: -3, 5
y: -3, 5
f: exp(x) | y = eˣ
f: ln(x) | y = ln x
f: x | y = x
```

```keyidea
eˣ and ln x undo each other: e^(ln x) = x and ln(eˣ) = x. The asymptote of one is the reflection of the asymptote of the other.
```

## Models

```example
A bacteria count is $N(t) = 500e^{0.3t}$ (t in hours). Find the initial count and the time to reach 10 000.
---
$N(0) = 500$. $500e^{0.3t} = 10000 \Rightarrow e^{0.3t} = 20 \Rightarrow t = \dfrac{\ln20}{0.3} = 9.99$ hours.
```

```figure
src: math-aa/_iitian/ib-mathematics-aa-sl-exponential-logarithmic-functions-study/img/fig-dbda98488931ff82.png
caption: Exponential growth (b > 1) and decay (0 < b < 1): both pass through (0, 1) and approach the x-axis on one side.
```

```figure
src: math-aa/_iitian/ib-mathematics-aa-sl-exponential-logarithmic-functions-study/img/fig-c6ddee1fb8eede10.png
caption: y = eˣ passes through (0, 1) and (1, e ≈ 2.72) and is always positive.
```

```question
exp-asymptote
```

## Summary

- $a^x$: through $(0, 1)$, asymptote $y = 0$, range $y > 0$.
- $\log_a x$: through $(1, 0)$, asymptote $x = 0$, domain $x > 0$.
- $e^x$ and $\ln x$ are inverses; models $Ae^{kt}$.
