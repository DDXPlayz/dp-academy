---
code: 4.1.1
title: Sampling and data
summary: Populations and samples, types of data, bias, outliers and sampling techniques.
minutes: 20
difficulty: 1
objectives:
  - Distinguish population and sample, discrete and continuous data.
  - Identify sources of bias and assess reliability.
  - Identify outliers using the 1.5 × IQR rule and decide how to treat them.
  - Describe simple random, convenience, systematic, quota and stratified sampling.
formulas:
  - name: Outlier rule
    latex: 'x < Q_1 - 1.5\times IQR\quad\text{or}\quad x > Q_3 + 1.5\times IQR'
definitions:
  - term: Population
    definition: The whole group being studied.
  - term: Sample
    definition: A subset of the population used to draw conclusions about it.
  - term: Discrete data
    definition: Data that take separate, countable values.
  - term: Continuous data
    definition: Data that can take any value in a range (measurements).
  - term: Bias
    definition: A systematic tendency for a sample to misrepresent the population.
mistakes:
  - Removing every outlier automatically. Only remove values that are errors; genuine extreme values should be kept and discussed.
tips:
  - Stratified sampling sizes are proportional — stratum size ÷ population × sample size.
related:
  - math-aa/4-2-presenting-data
---

## Populations, samples and data

A **population** is everyone/everything of interest; a **sample** is the part we measure. Data are **discrete** (counts, shoe sizes) or **continuous** (heights, times).

## Sampling techniques

| Method | How | Notes |
|---|---|---|
| Simple random | every member equally likely (random numbers) | unbiased, needs a full list |
| Convenience | whoever is easiest to reach | quick but likely biased |
| Systematic | every kth member from a random start | simple; risk if the list has patterns |
| Quota | fill set numbers from each group, not randomly | fast, may be biased |
| Stratified | random sample from each group, proportional to size | representative |

```figure
src: math-aa/_iitian/ib-mathematics-aa-concepts-of-population-and-sample-study-no/img/fig-c7127ccfb90663f3.png
caption: A sample is a smaller group chosen from the population; conclusions about the population are drawn from it.
```

```example
A school has 300 juniors and 500 seniors. A stratified sample of 40 is taken. How many seniors?
---
$\dfrac{500}{800}\times40 = 25$ seniors.
```

## Bias, reliability and outliers

```keyidea
A sample is only useful if it represents the population. Watch for bias from the sampling method, non-response, leading questions and unreliable sources.
```

**Outliers:** a value below $Q_1 - 1.5\,IQR$ or above $Q_3 + 1.5\,IQR$. Investigate: remove it only if it is an error.

```question
stratified
```

## Summary

- Discrete vs continuous; population vs sample.
- Know five sampling methods and their weaknesses.
- Outliers: beyond 1.5 × IQR from the quartiles.
