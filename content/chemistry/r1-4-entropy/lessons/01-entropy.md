---
code: R1.4.1
title: Entropy
summary: Entropy as the dispersal of matter and energy, and how to predict and calculate entropy changes.
minutes: 25
difficulty: 3
hl: true
objectives:
  - Describe entropy as a measure of the dispersal of matter and energy.
  - Predict the sign of ΔS for physical and chemical changes.
  - Calculate ΔS⦵ from standard entropy values.
formulas:
  - name: Standard entropy change
    latex: '\Delta S^\ominus = \sum S^\ominus(\text{products}) - \sum S^\ominus(\text{reactants})'
definitions:
  - term: Entropy (S)
    definition: A measure of the dispersal or distribution of matter and/or energy in a system; the more ways the energy can be distributed, the higher the entropy.
mistakes:
  - Forgetting that elements have non-zero standard entropies. Unlike ΔHf, S⦵ of O₂(g) is not zero.
  - Mixing units. S values are in J K⁻¹ mol⁻¹, while ΔH is usually in kJ mol⁻¹.
tips:
  - Count moles of gas — more gas molecules on the product side almost always means ΔS > 0.
related:
  - chemistry/r1-4-entropy
---

## What entropy measures

```keyidea
Entropy measures how dispersed matter and energy are. Under the same conditions: gases have much more entropy than liquids, which have more than solids. Entropy rises with temperature and with the number of particles.
```

$S(\text{solid}) < S(\text{liquid}) \ll S(\text{gas})$

## Predicting the sign of ΔS

ΔS is **positive** (entropy increases) when:

- a solid melts or a liquid boils;
- a solid dissolves;
- the number of moles of **gas** increases;
- temperature increases.

```example
Predict the sign of ΔS for: (a) N₂(g) + 3H₂(g) → 2NH₃(g); (b) CaCO₃(s) → CaO(s) + CO₂(g).
---
(a) 4 mol gas → 2 mol gas: ΔS negative.

(b) 0 mol gas → 1 mol gas: ΔS positive.
```

## Calculating ΔS⦵

$$
\Delta S^\ominus = \sum S^\ominus(\text{products}) - \sum S^\ominus(\text{reactants})
$$

```example
Calculate ΔS⦵ for N₂(g) + 3H₂(g) → 2NH₃(g). S⦵ / J K⁻¹ mol⁻¹: N₂ 192, H₂ 131, NH₃ 193.
---
$\Delta S = 2(193) - [192 + 3(131)] = 386 - 585 = -199$ J K⁻¹ mol⁻¹, as predicted.
```

```question
entropy-sign
```

## Summary

- Entropy: dispersal of matter and energy; gas ≫ liquid > solid.
- More moles of gas → ΔS > 0.
- ΔS⦵ = ΣS⦵(products) − ΣS⦵(reactants), in J K⁻¹ mol⁻¹.
