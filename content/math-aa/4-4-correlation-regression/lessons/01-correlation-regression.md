---
code: 4.4.1
title: Correlation and regression
summary: Scatter diagrams, Pearson’s r, the regression line of y on x, and making sensible predictions.
minutes: 30
difficulty: 2
objectives:
  - Describe correlation from scatter diagrams.
  - Interpret Pearson’s product-moment correlation coefficient r.
  - Find the regression line of y on x with technology and interpret its parameters.
  - Make predictions and recognise the dangers of extrapolation.
formulas:
  - name: Regression line
    latex: 'y = ax + b'
definitions:
  - term: Pearson’s r
    definition: A measure of the strength and direction of linear correlation, −1 ≤ r ≤ 1.
  - term: Extrapolation
    definition: Predicting outside the range of the data — unreliable.
mistakes:
  - Saying correlation proves causation.
  - Using the y-on-x line to predict x from y. Use the x-on-y line (or note the limitation).
tips:
  - Every regression line passes through the mean point (x̄, ȳ).
related:
  - math-aa/4-10-regression-x-on-y
---

## Correlation

| r | Description |
|---|---|
| close to 1 | strong positive |
| around 0.5 | moderate positive |
| close to 0 | no linear correlation |
| close to −1 | strong negative |

```keyidea
r measures LINEAR association only. A strong correlation does not mean one variable causes the other — there may be a hidden third variable.
```

## Regression line of y on x

Using a GDC: $y = ax + b$.

- $a$ (gradient): the change in $y$ for each one-unit increase in $x$.
- $b$ (intercept): the predicted $y$ when $x = 0$ (may be meaningless in context).

```example
For data on hours revised (x) and test score (y), the regression line is y = 4.2x + 38, with r = 0.91 and x from 1 to 12. Interpret, and predict the score for 8 hours and for 30 hours.
---
Each extra hour of revision is associated with 4.2 more marks. 8 hours: $4.2(8) + 38 = 71.6$ — reliable (strong r, interpolation). 30 hours: $164$ — extrapolation, unreliable (and above the maximum score).
```

```question
r-interpret
```

## Summary

- r from −1 to 1 measures linear correlation; not causation.
- $y = ax + b$ from a GDC; interpret $a$ and $b$ in context.
- Predict only within the data range and when r is strong.
