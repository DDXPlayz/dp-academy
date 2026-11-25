---
code: 2.5.1
title: Composite and inverse functions
summary: Combining functions, the identity function, and finding inverse functions algebraically.
minutes: 30
difficulty: 2
objectives:
  - Find and evaluate composite functions (f ∘ g)(x) = f(g(x)).
  - Find the inverse function by swapping x and y and rearranging.
  - Use (f ∘ f⁻¹)(x) = (f⁻¹ ∘ f)(x) = x.
formulas:
  - name: Composite function
    latex: '(f\circ g)(x) = f(g(x))'
  - name: Inverse property
    latex: '(f\circ f^{-1})(x) = (f^{-1}\circ f)(x) = x'
definitions:
  - term: Composite function
    definition: The function f ∘ g that applies g first, then f.
  - term: Identity function
    definition: The function I(x) = x, which leaves every input unchanged.
mistakes:
  - Applying the functions in the wrong order. In f(g(x)) the inner function g acts first.
  - Writing f⁻¹(x) = 1/f(x). The inverse function is not the reciprocal.
tips:
  - To find f⁻¹ — write y = f(x), swap x and y, make y the subject.
related:
  - math-aa/2-2-functions-domain-range
  - math-aa/2-14-odd-even-functions
---

## Composite functions

$$
(f\circ g)(x) = f(g(x))
$$

```example
$f(x) = x^2 + 1$, $g(x) = 3x - 2$. Find $(f\circ g)(x)$, $(g\circ f)(x)$ and $(f\circ g)(1)$.
---
$(f\circ g)(x) = (3x - 2)^2 + 1 = 9x^2 - 12x + 5$.

$(g\circ f)(x) = 3(x^2 + 1) - 2 = 3x^2 + 1$ — different, so order matters.

$(f\circ g)(1) = f(1) = 2$.
```

## Inverse functions

```keyidea
To find f⁻¹: write y = f(x), swap x and y, then solve for y. Check that f(f⁻¹(x)) = x.
```

```figure
src: math-aa/_iitian/ib-mathematics-aa-sl-composite-functions-study-notes/img/fig-1d1544620f92ea29.png
caption: A composite function: x goes through f first, then the result goes through g, giving g∘f(x) = g(f(x)).
```

```figure
src: math-aa/_sme/2-3-functions-toolkit/img/fig-6b5752c2c0bf159b.png
caption: y = eˣ and y = ln x are inverse functions, so each graph is the reflection of the other in y = x.
```

```example
Find the inverse of $f(x) = \dfrac{2x + 1}{x - 3}$, $x \ne 3$.
---
$x = \dfrac{2y + 1}{y - 3} \Rightarrow xy - 3x = 2y + 1 \Rightarrow y(x - 2) = 3x + 1 \Rightarrow f^{-1}(x) = \dfrac{3x + 1}{x - 2}$, $x \ne 2$.
```

The domain of $f^{-1}$ is the range of $f$.

```question
composite-eval
```

## Summary

- $f\circ g$: apply $g$ first, then $f$; usually $f\circ g \ne g\circ f$.
- Inverse: swap $x$ and $y$, rearrange; $f\circ f^{-1}$ is the identity.
