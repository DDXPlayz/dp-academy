---
code: 4.3.1
title: Measures of centre and spread
summary: Mean, median and mode, grouped data, IQR, standard deviation and variance, and the effect of changing the data.
minutes: 30
difficulty: 1
objectives:
  - Calculate mean, median, mode, quartiles, IQR, standard deviation and variance (with technology).
  - Estimate the mean from grouped data and identify the modal class.
  - Describe the effect of adding a constant or multiplying by a constant.
formulas:
  - name: Mean
    latex: '\bar x = \frac{\sum fx}{n}'
  - name: Interquartile range
    latex: 'IQR = Q_3 - Q_1'
definitions:
  - term: Standard deviation
    definition: A measure of the typical distance of data values from the mean; variance is its square.
  - term: Modal class
    definition: The class with the highest frequency in grouped data.
mistakes:
  - Thinking adding a constant changes the spread. It shifts the mean but leaves SD and IQR unchanged.
tips:
  - For grouped data use class midpoints as x.
related:
  - math-aa/4-2-presenting-data
---

## Measures of centre

- **Mean** $\bar x = \dfrac{\sum fx}{n}$; for grouped data use midpoints (an estimate).
- **Median:** the middle value.
- **Mode:** the most frequent value (or modal class).

## Measures of spread

- **Range** = max − min.
- **IQR** = $Q_3 - Q_1$ (resistant to outliers).
- **Standard deviation** $\sigma$ (from a GDC) and **variance** $\sigma^2$.

## Changing the data

```keyidea
Adding a constant k to every value adds k to the mean and median but leaves the spread unchanged. Multiplying every value by k multiplies the mean, median, SD and IQR by k (and variance by k²).
```

```example
A data set has mean 12 and SD 3. Each value is doubled and then 5 is added. Find the new mean and SD.
---
Mean $= 2(12) + 5 = 29$. SD $= 2(3) = 6$ (adding 5 doesn’t change spread).
```

```example
Estimate the mean: class 0–10 (f = 4), 10–20 (f = 10), 20–30 (f = 6).
---
Midpoints 5, 15, 25: $\bar x = \dfrac{20 + 150 + 150}{20} = 16$.
```

```question
transform-mean
```

## Summary

- Mean, median, mode; modal class for grouped data.
- Range, IQR, SD, variance.
- +k shifts centre only; ×k scales centre and spread.
