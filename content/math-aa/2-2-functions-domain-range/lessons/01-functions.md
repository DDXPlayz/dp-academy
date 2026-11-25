---
code: 2.2.1
title: Functions, domain and range
summary: What makes a relation a function, function notation, domain and range, and the idea of an inverse.
minutes: 25
difficulty: 1
objectives:
  - Define a function and use function notation.
  - State the domain and range of a function, including restrictions.
  - Understand the inverse function as undoing f, and its graph as a reflection in y = x.
definitions:
  - term: Function
    definition: A rule that assigns exactly one output to each input in its domain.
  - term: Domain
    definition: The set of input values for which the function is defined.
  - term: Range
    definition: The set of output values the function actually takes.
  - term: Inverse function
    definition: The function f⁻¹ that reverses f, so f⁻¹(f(x)) = x; its graph is the reflection of y = f(x) in y = x.
mistakes:
  - Forgetting natural domain restrictions — no division by zero, no square roots of negatives, no logs of non-positive numbers.
tips:
  - Vertical line test — a graph is a function if every vertical line meets it at most once.
  - The domain of f⁻¹ is the range of f, and vice versa.
related:
  - math-aa/2-5-composite-inverse-functions
---

## Functions and notation

A **function** gives exactly one output for each input. $f(x) = 3x - 1$ means "the output when the input is $x$"; $f(2) = 5$.

```figure
src: math-aa/_iitian/ib-mathematics-aa-sl-function-and-their-domain-range-graph-s/img/fig-2a6431c8e0736532.png
caption: Function notation: y = f(x) gives the output for the input x.
```

```figure
src: math-aa/_iitian/ib-mathematics-aa-sl-function-and-their-domain-range-graph-s/img/fig-ecc2cb8b3feee5b4.png
caption: A function sends every input to exactly one output; a mapping that sends one input to two outputs is not a function.
```

Functions are used as **models**: $h(t)$ for height after $t$ seconds, $C(n)$ for cost of $n$ items.

## Domain and range

```keyidea
The domain is the set of allowed inputs; the range is the set of outputs. Look for values that make the expression undefined — zero denominators, negative square roots, non-positive log arguments.
```

```figure
src: math-aa/_iitian/ib-mathematics-aa-sl-function-and-their-domain-range-graph-s/img/fig-c921fb735c429623.png
caption: The domain is the set of x-values used; the range is the set of y-values the function produces.
```

| Function | Domain | Range |
|---|---|---|
| $f(x) = x^2$ | $x \in \mathbb{R}$ | $f(x) \ge 0$ |
| $f(x) = \sqrt{x - 2}$ | $x \ge 2$ | $f(x) \ge 0$ |
| $f(x) = \dfrac{1}{x + 3}$ | $x \ne -3$ | $f(x) \ne 0$ |
| $f(x) = \ln x$ | $x > 0$ | $f(x) \in \mathbb{R}$ |

## Inverse functions

The inverse $f^{-1}$ undoes $f$. Its graph is the reflection of $y = f(x)$ in the line $y = x$. Only one-to-one functions have inverses.

```figure
src: math-aa/_sme/2-3-functions-toolkit/img/fig-6dda7006c83afce2.png
caption: Many-to-one and one-to-one mappings are both functions; only one-to-one functions have an inverse.
```

```figure
src: math-aa/_iitian/ib-mathematics-aa-sl-function-and-their-domain-range-graph-s/img/fig-5335118dbc16f2a3.png
caption: f maps x to y and the inverse f⁻¹ maps y back to x: the domain of f is the range of f⁻¹, and vice versa.
```

```figure
src: math-aa/_iitian/ib-mathematics-aa-sl-function-and-their-domain-range-graph-s/img/fig-20511ac2471aa620.png
caption: The graph of an inverse function is the reflection of the original graph in the line y = x.
```

```example
f(x) = 2x + 6. Find f⁻¹(10) without finding f⁻¹(x).
---
We need $x$ with $f(x) = 10$: $2x + 6 = 10 \Rightarrow x = 2$. So $f^{-1}(10) = 2$.
```

```question
domain-sqrt
```

## Summary

- Function: one output per input.
- Domain = valid inputs; range = outputs.
- $f^{-1}$ reverses $f$; graph reflected in $y = x$.
