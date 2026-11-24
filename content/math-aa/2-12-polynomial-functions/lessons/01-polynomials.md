---
code: 2.12.1
title: Polynomial functions
summary: Graphs of polynomials, the factor and remainder theorems, and sums and products of roots.
minutes: 35
difficulty: 3
hl: true
objectives:
  - Sketch polynomial graphs from their factors, including repeated roots.
  - Use the factor and remainder theorems.
  - Use the sum and product of roots of polynomial equations.
formulas:
  - name: Remainder theorem
    latex: 'P(x) \div (x - a) \text{ has remainder } P(a)'
  - name: Sum and product of roots
    latex: 'a_nx^n + a_{n-1}x^{n-1} + \ldots + a_0 = 0:\quad \sum\alpha = -\frac{a_{n-1}}{a_n},\quad \prod\alpha = \frac{(-1)^na_0}{a_n}'
definitions:
  - term: Factor theorem
    definition: (x − a) is a factor of P(x) if and only if P(a) = 0.
  - term: Repeated root
    definition: A root of multiplicity 2 or more; the graph touches the x-axis there (even multiplicity) or flattens through it (odd multiplicity).
mistakes:
  - Forgetting the sign alternation in the product of roots — for a cubic it is −a₀/a₃.
tips:
  - For (2x − 1) as a factor, test P(½).
related:
  - math-aa/1-14-complex-roots-de-moivre
---

## Shapes and roots

A polynomial of degree $n$ has at most $n$ real roots and at most $n - 1$ turning points. The leading term decides end behaviour.

- **Single root:** the graph crosses the axis.
- **Double root:** the graph touches the axis (turning point).
- **Triple root:** the graph crosses with a horizontal point of inflection.

```plot
caption: y = (x + 2)(x − 1)²: crosses at x = −2, touches at x = 1 (double root).
x: -3, 3
y: -4, 6
f: (x + 2)*(x - 1)^2 | y
point: -2, 0
point: 1, 0
```

## Factor and remainder theorems

```keyidea
P(a) is the remainder when P(x) is divided by (x − a). If P(a) = 0, then (x − a) is a factor.
```

```example
$P(x) = x^3 + kx^2 - 5x + 6$ has a factor $(x - 3)$. Find $k$ and factorise fully.
---
$P(3) = 27 + 9k - 15 + 6 = 0 \Rightarrow k = -2$. Then $x^3 - 2x^2 - 5x + 6 = (x - 3)(x^2 + x - 2) = (x - 3)(x + 2)(x - 1)$.
```

## Sum and product of roots

For $a_nx^n + a_{n-1}x^{n-1} + \ldots + a_0 = 0$:

$$
\text{sum} = -\frac{a_{n-1}}{a_n}, \qquad \text{product} = \frac{(-1)^na_0}{a_n}
$$

```example
Find the sum and product of the roots of $2x^3 - 5x^2 + 4x + 6 = 0$.
---
Sum $= \tfrac52$. Product $= \dfrac{(-1)^3\times6}{2} = -3$.
```

```question
remainder-calc
```

## Summary

- Roots and multiplicity decide where the graph crosses or touches.
- $P(a)$ = remainder on dividing by $(x - a)$; zero means factor.
- Sum $= -a_{n-1}/a_n$; product $= (-1)^na_0/a_n$.
