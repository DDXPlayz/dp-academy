---
code: 2.4.1
title: Analysing graphs with technology
summary: Using a GDC to find maxima, minima, zeros, intersections and asymptotic behaviour, and interpreting them in context.
minutes: 20
difficulty: 1
objectives:
  - Use technology to find zeros, local maxima and minima, and intersections.
  - Interpret key features in a modelling context.
  - Choose a suitable viewing window.
definitions:
  - term: Local maximum
    definition: A point higher than all nearby points on the graph.
  - term: Viewing window
    definition: The x and y ranges displayed on a GDC; a poor window can hide key features.
mistakes:
  - Giving GDC answers to too few significant figures. Give exact values when possible, otherwise 3 s.f.
  - Missing features outside the default window.
tips:
  - In context, check that the answer makes sense (time ≥ 0, quantity ≥ 0) and restrict the domain accordingly.
related:
  - math-aa/2-3-graphs-of-functions
---

## Using a GDC

```keyidea
For any graph you can find the zeros, the local maxima and minima, and the intersections with another graph using the calculator’s graph-analysis tools. Always check the window shows everything.
```

```example
A ball’s height is $h(t) = -4.9t^2 + 12t + 1.5$ m. Find the maximum height and when the ball lands.
---
GDC maximum: $(1.22, 8.85)$ — maximum height 8.85 m at $t = 1.22$ s.

Zero with $t > 0$: $t = 2.57$ s. The negative zero is rejected because time cannot be negative.
```

## Interpreting features

| Feature | Typical meaning in a model |
|---|---|
| y-intercept | initial value |
| zero | when the quantity reaches 0 |
| maximum/minimum | greatest/least value and when it occurs |
| horizontal asymptote | long-term (limiting) value |
| intersection | when two quantities are equal |

```question
model-max
```

## Summary

- GDC: zeros, max/min, intersections; check the window.
- Interpret every feature in context and reject impossible values.
