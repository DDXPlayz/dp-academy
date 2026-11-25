---
code: R1.4.2
title: Gibbs energy and spontaneity
summary: Combining enthalpy and entropy to decide whether a reaction is spontaneous, and how ΔG relates to equilibrium.
minutes: 35
difficulty: 3
hl: true
objectives:
  - Use ΔG = ΔH − TΔS to calculate Gibbs energy change.
  - Predict spontaneity from the signs of ΔH and ΔS at different temperatures.
  - Calculate the temperature at which a reaction becomes spontaneous.
  - Relate ΔG to the position of equilibrium and to K.
formulas:
  - name: Gibbs energy change
    latex: '\Delta G = \Delta H - T\Delta S'
  - name: Gibbs energy and K
    latex: '\Delta G^\ominus = -RT\ln K'
definitions:
  - term: Spontaneous reaction
    definition: A reaction that, once started, proceeds without continuous external energy input; at constant pressure ΔG < 0.
  - term: Gibbs energy change (ΔG)
    definition: The energy available to do useful work from a reaction; ΔG = ΔH − TΔS.
mistakes:
  - Mixing kJ and J. Convert ΔS from J K⁻¹ mol⁻¹ to kJ K⁻¹ mol⁻¹ (÷ 1000) before using it with ΔH in kJ.
  - Equating spontaneous with fast. A spontaneous reaction can be extremely slow (e.g. diamond → graphite).
tips:
  - At the switch-over temperature, ΔG = 0, so T = ΔH/ΔS.
related:
  - chemistry/r2-3-equilibrium
---

## Gibbs energy

$$
\Delta G = \Delta H - T\Delta S
$$

```figure
src: chemistry/_sme/entropy-spontaneity/img/fig-1c8ec45e14ffef71.png
caption: Endothermic reactions: with a negative ΔS they are never feasible; with a positive ΔS they become feasible at high temperature.
```

```keyidea
A reaction is spontaneous (thermodynamically feasible) at constant pressure when ΔG is negative. Whether this happens depends on ΔH, ΔS and the temperature.
```

| ΔH | ΔS | ΔG | Spontaneous? |
|---|---|---|---|
| − | + | always − | at all temperatures |
| + | − | always + | never |
| − | − | − at low T | at low temperatures |
| + | + | − at high T | at high temperatures |

```example
For CaCO₃(s) → CaO(s) + CO₂(g), ΔH⦵ = +178 kJ mol⁻¹ and ΔS⦵ = +161 J K⁻¹ mol⁻¹. Is it spontaneous at 298 K? Above what temperature does it become spontaneous?
---
At 298 K: $\Delta G = 178 - 298(0.161) = +130$ kJ mol⁻¹ — not spontaneous.

$\Delta G = 0$ when $T = \Delta H/\Delta S = 178/0.161 = 1106$ K. Above ~1110 K it is spontaneous.
```

## ΔG and equilibrium

As a reaction proceeds towards equilibrium, ΔG becomes less negative and reaches **zero at equilibrium**. The standard Gibbs change relates to the equilibrium constant:

```figure
src: chemistry/_iitian/entropy-and-spontaneity-r1-4-4-gibbs-free-energy-and-equilib/img/fig-f4d997754cd5f5fb.png
caption: Gibbs energy falls from pure reactants to a minimum at equilibrium; the reaction moves spontaneously towards that minimum from either side.
```

```figure
src: chemistry/_sme/entropy-spontaneity/img/fig-ad28d6dea4fa65cf.png
caption: When ΔG is negative, the minimum of G lies close to the products: the equilibrium mixture is mostly products.
```

```figure
src: chemistry/_sme/entropy-spontaneity/img/fig-f357cea80acb6284.png
caption: When ΔG is positive, the minimum lies close to the reactants: the equilibrium mixture is mostly reactants.
```

$$
\Delta G^\ominus = -RT\ln K
$$

| ΔG⦵ | K | Position of equilibrium |
|---|---|---|
| negative | > 1 | favours products |
| zero | = 1 | neither favoured |
| positive | < 1 | favours reactants |

```example
ΔG⦵ for a reaction at 298 K is −20.0 kJ mol⁻¹. Find K.
---
$\ln K = -\Delta G/RT = 20\,000/(8.31\times298) = 8.08$, so $K = e^{8.08} = 3.2\times10^3$.
```

```question
gibbs-calc
```

## Summary

- ΔG = ΔH − TΔS; spontaneous if ΔG < 0 (use kJ consistently).
- Temperature decides the outcome when ΔH and ΔS have the same sign; switch-over at T = ΔH/ΔS.
- ΔG = 0 at equilibrium; ΔG⦵ = −RT ln K.
