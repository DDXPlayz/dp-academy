---
code: T3.2
title: Graphs and data analysis in chemistry
summary: Choosing axes, drawing best-fit lines and tangents, and linearising chemical relationships to find constants.
minutes: 25
difficulty: 2
objectives:
  - Plot graphs with suitable axes, units and best-fit lines or curves.
  - Draw tangents to find rates from concentration–time graphs.
  - Use linear graphs to determine constants such as Ea (ln k against 1/T) and order of reaction.
  - Interpolate and extrapolate (e.g. cooling corrections).
definitions:
  - term: Tangent
    definition: A straight line touching a curve at one point; its gradient gives the instantaneous rate of change.
  - term: Extrapolation
    definition: Extending a graph beyond the measured data, e.g. to find the maximum temperature in calorimetry.
mistakes:
  - Joining points dot-to-dot. Draw a smooth best-fit line or curve.
tips:
  - Useful linear plots — ln k vs 1/T (Arrhenius); rate vs [A] (first order); ln[A] vs t (first order); pH curves for pKa.
related:
  - chemistry/r2-2-rates
---

## Good graphs

- Independent variable on the x-axis; label axes with quantity and units (e.g. "[A] / mol dm⁻³").
- Use most of the grid; plot points carefully.
- Draw a smooth **best-fit line or curve**, not dot-to-dot; identify anomalous points.

## Rates from tangents

The rate at a time $t$ is the gradient of the **tangent** to a concentration–time curve at $t$. The **initial rate** is the tangent at $t = 0$.

```plot
caption: A concentration–time curve with a tangent at t = 2 s; its gradient gives the rate at that moment.
x: 0, 10
y: 0, 1.1
f: exp(-0.35*x) | [A]
f: exp(-0.7) - 0.35*exp(-0.7)*(x - 2) | tangent at t = 2
xlabel: t / s
ylabel: [A] / mol dm⁻³
```

## Linearising chemical relationships

```keyidea
Turn a curve into a straight line by choosing the right axes; then read constants from the gradient and intercept.
```

| Relationship | Plot | Gradient |
|---|---|---|
| Arrhenius: k = Ae^(−Ea/RT) | ln k against 1/T | −Ea/R |
| First order: [A] = [A]₀e^(−kt) | ln[A] against t | −k |
| Rate = k[A] | rate against [A] | k |

```example
A first-order reaction gives a straight line of ln[A] against t with gradient −0.023 s⁻¹. Find k and the half-life.
---
k = 0.023 s⁻¹; t½ = ln 2/k = 0.693/0.023 = 30 s.
```

## Extrapolation in calorimetry

Plot temperature against time before and after mixing; extrapolate the cooling line back to the time of mixing to find the temperature change that would have occurred with no heat loss.

```question
tangent-rate
```

## Summary

- Label axes with units; draw best-fit lines/curves.
- Tangent gradient = instantaneous rate.
- Linearise (ln k vs 1/T, ln[A] vs t) to find constants.
- Extrapolate to correct for heat loss.
