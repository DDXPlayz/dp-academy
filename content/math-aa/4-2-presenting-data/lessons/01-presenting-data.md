---
code: 4.2.1
title: Presenting data
summary: Frequency tables, histograms, cumulative frequency graphs and box-and-whisker diagrams.
minutes: 25
difficulty: 1
objectives:
  - Construct frequency tables and histograms.
  - Draw cumulative frequency graphs and read the median, quartiles and percentiles.
  - Draw and interpret box-and-whisker diagrams, including outliers.
definitions:
  - term: Cumulative frequency
    definition: The running total of frequencies up to the end of each class.
  - term: Percentile
    definition: The value below which a given percentage of the data lies; the median is the 50th percentile.
mistakes:
  - Plotting cumulative frequency at class midpoints. Plot at the upper class boundary.
tips:
  - On a cumulative frequency graph with n values, the median is at n/2, Q₁ at n/4 and Q₃ at 3n/4.
related:
  - math-aa/4-3-centre-spread
---

## Frequency tables and histograms

A **histogram** shows continuous data with no gaps between bars; in IB questions the classes are usually equal width, so bar height = frequency.

```figure
src: math-aa/_iitian/ib-mathematics-aa-understanding-of-box-and-whisker-diagrams-/img/fig-3e8bc8c69afb8535.png
caption: A frequency table for continuous data and its histogram: bars touch because the classes are continuous.
```

## Cumulative frequency

```keyidea
Plot cumulative frequency against the upper class boundary and join with a smooth curve. Read across from n/4, n/2 and 3n/4 to find Q₁, the median and Q₃.
```

```figure
src: math-aa/_iitian/ib-mathematics-aa-understanding-of-box-and-whisker-diagrams-/img/fig-37ffe96d062741a9.png
caption: Reading a cumulative frequency curve: the median at half the total frequency, the quartiles at a quarter and three quarters.
```

```figure
src: math-aa/_sme/4-1-statistics-toolkit/img/fig-93b51fb0ecc4353b.png
caption: Outliers are marked with a cross, and the whisker stops at the next value that is not an outlier.
```

```plot
caption: A cumulative frequency curve for 80 values. Reading across from 40 gives the median (about 32); from 20 and 60 the quartiles (about 25 and 39).
x: 0, 60
y: 0, 85
f: 80/(1 + exp(-(x - 32)/6)) | cumulative frequency
hline: 40
vline: 32
xlabel: value
ylabel: cumulative frequency
```

## Box-and-whisker diagrams

A box plot shows the five-number summary: minimum, $Q_1$, median, $Q_3$, maximum. Outliers are plotted as separate crosses, with whiskers ending at the most extreme non-outlier values.

```figure
src: math-aa/_iitian/ib-mathematics-aa-understanding-of-box-and-whisker-diagrams-/img/fig-6bfd9946ca0034ce.png
caption: A box-and-whisker diagram shows the five-number summary: extremes, quartiles and median, with outliers marked separately.
```

```figure
src: math-aa/_sme/4-1-statistics-toolkit/img/fig-6ae6313dc8593fde.png
caption: The box spans the interquartile range; whiskers reach the smallest and largest values that are not outliers.
```

```example
Data summary: min 4, Q₁ 12, median 18, Q₃ 22, max 41. Is 41 an outlier?
---
IQR = 10; upper fence $22 + 15 = 37$. Since $41 > 37$, it is an outlier: mark it separately and end the whisker at the largest value ≤ 37.
```

```question
cf-median
```

## Summary

- Histograms for continuous data.
- Cumulative frequency at upper boundaries; read quartiles at n/4, n/2, 3n/4.
- Box plots show the five-number summary and outliers.
