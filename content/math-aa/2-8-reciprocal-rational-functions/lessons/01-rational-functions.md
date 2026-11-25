---
code: 2.8.1
title: Reciprocal and rational functions
summary: The graph of 1/x, functions of the form (ax + b)/(cx + d), and their asymptotes.
minutes: 25
difficulty: 2
objectives:
  - Sketch y = 1/x and recognise it as self-inverse.
  - Find vertical and horizontal asymptotes of f(x) = (ax + b)/(cx + d).
  - Sketch rational functions with intercepts and asymptotes.
formulas:
  - name: Asymptotes of (ax + b)/(cx + d)
    latex: 'x = -\frac{d}{c},\qquad y = \frac{a}{c}'
definitions:
  - term: Vertical asymptote
    definition: A line x = k that the graph approaches as the function grows without bound.
  - term: Horizontal asymptote
    definition: A line y = k that the graph approaches as x → ±∞.
  - term: Self-inverse function
    definition: A function equal to its own inverse, so f(f(x)) = x — for example 1/x.
mistakes:
  - Putting the vertical asymptote where the numerator is zero. That is an x-intercept; the asymptote is where the denominator is zero.
tips:
  - Horizontal asymptote — ratio of the x-coefficients, a/c.
related:
  - math-aa/2-13-rational-functions
---

## The reciprocal function

$f(x) = \dfrac1x$ has asymptotes $x = 0$ and $y = 0$ and lies in the first and third quadrants. It is **self-inverse**: reflecting in $y = x$ gives the same graph.

## Rational functions (ax + b)/(cx + d)

```keyidea
Vertical asymptote where the denominator is zero: x = −d/c. Horizontal asymptote from the ratio of leading coefficients: y = a/c.
```

```figure
src: math-aa/_sme/2-5-reciprocal-rational-functions/img/fig-38504afba5da896d.png
caption: Graphs of the form y = (ax + b)/(cx² + dx + e) can have one or two vertical asymptotes.
```

```plot
caption: y = (2x + 1)/(x − 3): vertical asymptote x = 3, horizontal asymptote y = 2, x-intercept −0.5, y-intercept −1/3.
x: -8, 12
y: -8, 10
f: (2*x + 1)/(x - 3) | y
vline: 3
hline: 2
```

```example
For $f(x) = \dfrac{2x + 1}{x - 3}$ find the asymptotes and intercepts.
---
Vertical: $x = 3$. Horizontal: $y = 2$. x-intercept: $2x + 1 = 0 \Rightarrow (-\tfrac12, 0)$. y-intercept: $f(0) = -\tfrac13$.
```

```question
va-rational
```

## Summary

- $1/x$: asymptotes the axes; self-inverse.
- $(ax + b)/(cx + d)$: $x = -d/c$, $y = a/c$.
- Find intercepts, then sketch each branch.
