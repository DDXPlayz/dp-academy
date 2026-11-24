---
code: 4.10.1
title: Regression of x on y
summary: Why there are two regression lines, and when to use the x-on-y line for prediction.
minutes: 15
difficulty: 2
objectives:
  - Find the regression line of x on y using technology.
  - Choose the correct regression line for a prediction.
formulas:
  - name: Regression of x on y
    latex: 'x = cy + d'
definitions:
  - term: Regression line of x on y
    definition: The line that minimises horizontal distances, used to predict x from a given y.
mistakes:
  - Rearranging the y-on-x line to predict x. Unless r = ±1, that gives a different (wrong) answer.
tips:
  - Both regression lines pass through (x̄, ȳ); they coincide only when |r| = 1.
related:
  - math-aa/4-4-correlation-regression
---

## Two lines

```keyidea
The y-on-x line predicts y from x; the x-on-y line predicts x from y. They are different unless the correlation is perfect, and both pass through the mean point.
```

With a GDC, swap the lists so $y$ is the independent variable to get $x = cy + d$.

```example
For a data set, the y-on-x line is $y = 1.8x + 4$ and the x-on-y line is $x = 0.45y - 0.5$. Estimate x when y = 30.
---
Use the x-on-y line: $x = 0.45(30) - 0.5 = 13$. (Rearranging the y-on-x line would give $(30 - 4)/1.8 = 14.4$ — not appropriate.)
```

```question
which-line
```

## Summary

- Predict y from x: y-on-x. Predict x from y: x-on-y.
- Both pass through $(\bar x, \bar y)$.
