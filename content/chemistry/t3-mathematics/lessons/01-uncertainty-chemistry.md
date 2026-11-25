---
code: T3.1
title: Uncertainties and significant figures in chemistry
summary: Instrument uncertainties, propagating them through chemical calculations, percentage error, and significant figures.
minutes: 30
difficulty: 2
objectives:
  - State the uncertainty of common apparatus readings.
  - Propagate uncertainties through calculations of moles, concentrations and enthalpy changes.
  - Calculate percentage error against a literature value and compare it with percentage uncertainty.
  - Record and report results to an appropriate number of significant figures.
formulas:
  - name: Percentage error
    latex: '\%\text{ error} = \frac{|\text{experimental} - \text{accepted}|}{\text{accepted}}\times100'
definitions:
  - term: Percentage uncertainty
    definition: The absolute uncertainty divided by the measured value, × 100 — the limit set by the apparatus.
  - term: Percentage error
    definition: How far the experimental result is from the accepted value, as a percentage of the accepted value.
mistakes:
  - Forgetting that a burette titre is the difference of two readings, so its uncertainty is ±0.05 × 2 = ±0.10 cm³.
  - Concluding that random errors explain a result when the percentage error is much larger than the percentage uncertainty. That points to systematic error.
tips:
  - If % error > total % uncertainty, systematic errors must be present.
related:
  - physics/t3-mathematics
---

## Apparatus uncertainties

- Analogue scale: ± half the smallest division (thermometer graduated in 1 °C → ±0.5 °C).
- Digital readout: ± one in the last digit (balance reading 2.36 g → ±0.01 g).
- Burette: ±0.05 cm³ per reading → **±0.10 cm³** for a titre (two readings).
- Temperature *change*: two readings → ±1 °C for a ±0.5 °C thermometer.

```figure
src: chemistry/_sme/tool-3-mathematics/img/fig-834f7febbcbc2d28.png
caption: Reading a burette: the smallest division is 0.1 cm³, so readings are recorded to ±0.05 cm³.
```

```figure
src: chemistry/_sme/tool-3-mathematics/img/fig-33da28b518d25146.png
caption: Percentage uncertainty depends on the size of the reading: ±0.05 in 18.85 cm³ is 0.27%, but ±0.01 in 56.00 g is only 0.02%.
```

## Propagation

```keyidea
Add absolute uncertainties when adding or subtracting values (e.g. temperature change, titre). Add percentage uncertainties when multiplying or dividing (e.g. moles = c × V, ΔH = −mcΔT/n).
```

```example
In a calorimetry experiment: mass of water 50.00 ± 0.01 g, ΔT = 6.5 ± 1.0 °C (two readings of ±0.5). Find the percentage uncertainty in Q = mcΔT.
---
% uncertainty in m = 0.02%; in ΔT = 1.0/6.5 × 100 = 15%. Total ≈ 15% (c is a constant). The temperature measurement dominates.
```

## Error vs uncertainty

$$
\%\text{ error} = \frac{|\text{experimental} - \text{accepted}|}{\text{accepted}}\times100
$$

```figure
src: chemistry/_sme/tool-3-mathematics/img/fig-8ed99f883eabaa06.png
caption: Error bars show the uncertainty in each point, in both the x and y values.
```

- % error **≤** % uncertainty → result is consistent with random error.
- % error **>** % uncertainty → systematic errors (e.g. heat loss) are present.

```example
An experimental ΔH of neutralisation is −49 ± 4 kJ mol⁻¹; the literature value is −57 kJ mol⁻¹. Comment.
---
% error = 8/57 × 100 = 14%; % uncertainty = 4/49 × 100 = 8%. The error exceeds the uncertainty, so a systematic error (heat loss to the surroundings) is significant.
```

## Significant figures

Report the result to the same number of significant figures as the least precise measurement used, and uncertainties to 1 (at most 2) significant figures with the value rounded to match.

```question
titre-uncertainty
```

## Summary

- Analogue ± half division; digital ± last digit; titres ±0.10 cm³.
- Add absolute uncertainties for ±; add % uncertainties for × and ÷.
- % error > % uncertainty → systematic error.
