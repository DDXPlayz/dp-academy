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

```figure
src: chemistry/_sme/tool-3-mathematics/img/fig-8598da7296e515a3.png
caption: Plotting p against 1/V straightens the curve into a line, which is easier to analyse than p against V.
```

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

```figure
src: chemistry/_sme/tool-3-mathematics/img/fig-1a686897870e4f07.png
caption: Drawing a tangent: place the ruler so that it touches the curve at one point, with equal gaps either side.
```

```figure
src: chemistry/_sme/tool-3-mathematics/img/fig-1435186426117a61.png
caption: The gradient of a tangent at each point gives the rate at that concentration.
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

```figure
src: chemistry/_sme/tool-3-mathematics/img/fig-7b9f1109e8cda1c7.png
caption: Calorimetry: extrapolate the cooling line back to the time of mixing to find the temperature change corrected for heat loss.
```

```figure
src: chemistry/_sme/tool-3-mathematics/img/fig-9fc52000f222870a.png
caption: Interpolation reads values within the range of the data; extrapolation extends the line beyond it.
```

```question
tangent-rate
```

## Describing relationships

- **Qualitative** data are descriptions (colour change, smell, precipitate formed); **quantitative** data are numbers with units.
- Two variables are **directly proportional** if $y = kx$: the graph is a straight line through the origin, and doubling x doubles y.
- They are **inversely proportional** if $y = k/x$: doubling x halves y, and a graph of y against 1/x is a straight line through the origin (for example, gas volume against pressure at constant temperature).
- The **coefficient of determination, R²**, given by spreadsheet trend lines, shows how well the line fits the data: R² = 1 is a perfect fit, values near 0 mean almost no fit. It says nothing about cause and effect.

```keyidea
Approximation is useful when an effect is too small to matter: for example, treating the change in concentration of a weak acid as negligible when working out its pH, or ignoring the heat capacity of a polystyrene cup in calorimetry. Always say which approximation you made and why it is reasonable.
```

## Summary

- Label axes with units; draw best-fit lines/curves.
- Tangent gradient = instantaneous rate.
- Linearise (ln k vs 1/T, ln[A] vs t) to find constants.
- Extrapolate to correct for heat loss.
