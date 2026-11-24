---
code: 2.10.1
title: Solving equations
summary: Choosing between analytic and graphical methods, and solving equations that reduce to quadratics.
minutes: 25
difficulty: 2
objectives:
  - Solve equations analytically, including those that reduce to quadratics.
  - Solve equations graphically with technology when no analytic method exists.
  - Interpret solutions in real-life contexts.
definitions:
  - term: Analytic solution
    definition: An exact solution obtained by algebraic manipulation.
  - term: Graphical solution
    definition: An approximate solution read from the intersection of graphs (usually with a GDC).
mistakes:
  - Dividing both sides by x and losing the solution x = 0. Factorise instead.
tips:
  - Look for a hidden quadratic — x⁴, e²ˣ, (ln x)² can be substituted.
related:
  - math-aa/2-7-quadratic-equations
---

## Analytic methods

```keyidea
Rearrange to "something = 0", factorise, and look for hidden quadratics by substitution. Never divide by an expression that could be zero.
```

```example
Solve $x^3 = 4x$.
---
$x^3 - 4x = 0 \Rightarrow x(x - 2)(x + 2) = 0 \Rightarrow x = 0, \pm2$. (Dividing by $x$ would lose $x = 0$.)
```

```example
Solve $e^{2x} - 5e^x + 6 = 0$.
---
Let $u = e^x$: $u^2 - 5u + 6 = 0 \Rightarrow u = 2$ or $3$, so $x = \ln2$ or $\ln3$.
```

## Graphical methods

Some equations, like $\ln x = 3 - x$ or $x^2 = 2^x$, have no algebraic method. Graph both sides and find intersections.

```example
Solve $\ln x = 3 - x$.
---
GDC intersection: $x \approx 2.21$.
```

```question
hidden-quadratic
```

## Summary

- Factorise rather than divide.
- Substitute to reveal hidden quadratics.
- Use a GDC when no algebraic method exists.
