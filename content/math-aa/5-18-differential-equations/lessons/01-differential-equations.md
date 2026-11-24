---
code: 5.18.1
title: Differential equations
summary: First-order differential equations — Euler’s method, separating variables, homogeneous equations and the integrating factor.
minutes: 45
difficulty: 3
hl: true
objectives:
  - Use Euler’s method to approximate solutions of dy/dx = f(x, y).
  - Solve separable differential equations.
  - Solve homogeneous equations using y = vx.
  - Solve y′ + P(x)y = Q(x) using an integrating factor.
formulas:
  - name: Euler’s method
    latex: 'y_{n+1} = y_n + h\,f(x_n, y_n),\quad x_{n+1} = x_n + h'
  - name: Separation of variables
    latex: '\int\frac{1}{g(y)}\,dy = \int f(x)\,dx'
  - name: Integrating factor
    latex: 'I(x) = e^{\int P(x)\,dx},\quad I\,y = \int I\,Q(x)\,dx'
definitions:
  - term: Differential equation
    definition: An equation involving a derivative, such as dy/dx = ky.
  - term: Homogeneous equation
    definition: An equation of the form dy/dx = f(y/x), solved with the substitution y = vx.
mistakes:
  - Forgetting the constant of integration — add it straight after integrating, before rearranging.
  - Leaving the integrating-factor equation unsolved for y.
tips:
  - Smaller step size h makes Euler’s method more accurate.
related:
  - math-aa/5-16-integration-techniques
---

## Euler’s method

$$
y_{n+1} = y_n + h\,f(x_n, y_n), \qquad x_{n+1} = x_n + h
$$

```example
$\dfrac{dy}{dx} = x + y$, $y(0) = 1$. Use $h = 0.1$ to estimate $y(0.2)$.
---
$y_1 = 1 + 0.1(0 + 1) = 1.1$. $y_2 = 1.1 + 0.1(0.1 + 1.1) = 1.22$.
```

## Separation of variables

```keyidea
If dy/dx = f(x)g(y), move all y terms to one side and all x terms to the other, integrate both, and add one constant.
```

```example
Solve $\dfrac{dy}{dx} = 2xy$ with $y(0) = 3$.
---
$\int\frac1y\,dy = \int2x\,dx \Rightarrow \ln|y| = x^2 + C \Rightarrow y = Ae^{x^2}$. With $y(0) = 3$: $y = 3e^{x^2}$.
```

## Homogeneous equations

Substitute $y = vx$, so $\dfrac{dy}{dx} = v + x\dfrac{dv}{dx}$; the equation becomes separable in $v$ and $x$.

## Integrating factor

For $\dfrac{dy}{dx} + P(x)y = Q(x)$, multiply by $I = e^{\int P\,dx}$. The left side becomes $\dfrac{d}{dx}(Iy)$.

```example
Solve $\dfrac{dy}{dx} + \dfrac{y}{x} = x^2$, $x > 0$.
---
$I = e^{\int\frac1x dx} = x$. $\dfrac{d}{dx}(xy) = x^3 \Rightarrow xy = \dfrac{x^4}{4} + C \Rightarrow y = \dfrac{x^3}{4} + \dfrac Cx$.
```

```question
euler-step
```

## Summary

- Euler: step forward with the gradient.
- Separable: separate, integrate, +C.
- Homogeneous: $y = vx$. Linear: integrating factor $e^{\int P\,dx}$.
