---
code: 2.13.1
title: Rational functions with quadratic parts
summary: Sketching (ax + b)/(cx² + dx + e) and (ax² + bx + c)/(dx + e), including oblique asymptotes.
minutes: 30
difficulty: 3
hl: true
objectives:
  - Find vertical, horizontal and oblique asymptotes of rational functions.
  - Sketch rational functions with linear or quadratic numerators and denominators.
definitions:
  - term: Oblique asymptote
    definition: A slanted straight-line asymptote y = mx + c, occurring when the numerator’s degree is one more than the denominator’s.
mistakes:
  - Assuming the graph never crosses a horizontal asymptote. It may cross it for moderate x; the asymptote describes behaviour as x → ±∞.
tips:
  - Degree of numerator less than denominator — horizontal asymptote y = 0. One more — oblique asymptote by polynomial division.
related:
  - math-aa/2-8-reciprocal-rational-functions
---

## (ax + b)/(cx² + dx + e)

- **Vertical asymptotes** at real zeros of the denominator (0, 1 or 2 of them).
- **Horizontal asymptote** $y = 0$ (the numerator has lower degree).

```example
Sketch $f(x) = \dfrac{x}{x^2 - 4}$.
---
Vertical asymptotes $x = \pm2$; horizontal asymptote $y = 0$; passes through the origin; odd function (symmetric about the origin).
```

## (ax² + bx + c)/(dx + e)

```keyidea
When the numerator’s degree is one higher, divide: f(x) = mx + k + r/(dx + e). The line y = mx + k is an oblique asymptote, because r/(dx + e) → 0 as x → ±∞.
```

```example
Find the asymptotes of $f(x) = \dfrac{x^2 + 3x + 1}{x + 1}$.
---
Divide: $x^2 + 3x + 1 = (x + 1)(x + 2) - 1$, so $f(x) = x + 2 - \dfrac{1}{x + 1}$.

Vertical asymptote $x = -1$; oblique asymptote $y = x + 2$.
```

```plot
caption: y = (x² + 3x + 1)/(x + 1) with vertical asymptote x = −1 and oblique asymptote y = x + 2.
x: -6, 4
y: -8, 8
f: (x^2 + 3*x + 1)/(x + 1) | f(x)
f: x + 2 | y = x + 2
vline: -1
```

```question
oblique
```

## Summary

- Denominator zeros → vertical asymptotes.
- Lower-degree numerator → $y = 0$; degree one higher → oblique asymptote via division.
