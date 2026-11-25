---
code: 2.14.1
title: Odd, even and self-inverse functions
summary: Symmetry of functions, inverses that need a restricted domain, and functions that are their own inverse.
minutes: 25
difficulty: 3
hl: true
objectives:
  - Test whether a function is odd, even or neither.
  - Find inverse functions, restricting the domain where necessary.
  - Recognise and verify self-inverse functions.
formulas:
  - name: Even function
    latex: 'f(-x) = f(x)'
  - name: Odd function
    latex: 'f(-x) = -f(x)'
  - name: Self-inverse
    latex: 'f(f(x)) = x'
definitions:
  - term: Even function
    definition: A function symmetric in the y-axis, f(−x) = f(x).
  - term: Odd function
    definition: A function with rotational symmetry of order 2 about the origin, f(−x) = −f(x).
mistakes:
  - Thinking every function is odd or even. Most functions, like x² + x, are neither.
tips:
  - A function has an inverse only if it is one-to-one — restrict a quadratic to one side of its vertex.
related:
  - math-aa/2-5-composite-inverse-functions
---

## Odd and even functions

```keyidea
Even: f(−x) = f(x), symmetric about the y-axis (x², cos x). Odd: f(−x) = −f(x), symmetric under a 180° rotation about the origin (x³, sin x).
```

```figure
src: math-aa/_sme/2-3-functions-toolkit/img/fig-9258c2bf14c9bbee.png
caption: Odd functions are unchanged by a 180° rotation about the origin; even functions are unchanged by reflection in the y-axis.
```

```example
Classify $f(x) = x^3 - 4x$ and $g(x) = x^4 + x$.
---
$f(-x) = -x^3 + 4x = -f(x)$: odd. $g(-x) = x^4 - x$, which is neither $g(x)$ nor $-g(x)$: neither.
```

## Inverses with restricted domains

A function needs to be **one-to-one** to have an inverse.

```figure
src: math-aa/_iitian/ib-mathematics-aa-hl-odd-even-functions-study-notes/img/fig-66a4c69e469add95.png
caption: A function and its inverse are reflections of each other in y = x; the domain may need restricting so that f is one-to-one.
```

```example
$f(x) = (x - 2)^2 + 1$. State the largest domain of the form $x \ge a$ for which $f^{-1}$ exists, and find $f^{-1}(x)$.
---
Restrict to $x \ge 2$ (right of the vertex). $x = (y - 2)^2 + 1 \Rightarrow y = 2 + \sqrt{x - 1}$, so $f^{-1}(x) = 2 + \sqrt{x - 1}$, $x \ge 1$.
```

## Self-inverse functions

A function is **self-inverse** if $f(f(x)) = x$; its graph is symmetric in $y = x$. Examples: $f(x) = \dfrac1x$, $f(x) = -x + c$, $f(x) = \dfrac{ax + b}{cx - a}$.

```figure
src: math-aa/_sme/2-3-functions-toolkit/img/fig-7311705127e61386.png
caption: A self-inverse function is unchanged by reflection in y = x, so f⁻¹(x) = f(x).
```

```question
odd-even
```

## Summary

- Even: $f(-x) = f(x)$. Odd: $f(-x) = -f(x)$.
- Restrict the domain to make a function one-to-one before inverting.
- Self-inverse: $f(f(x)) = x$, symmetric in $y = x$.
