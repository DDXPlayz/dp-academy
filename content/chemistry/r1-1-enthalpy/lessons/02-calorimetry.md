---
code: R1.1.4
title: Measuring enthalpy changes (calorimetry)
summary: Standard conditions, Q = mcΔT, and calculating ΔH from temperature changes in solution and combustion experiments.
minutes: 35
difficulty: 2
objectives:
  - State standard conditions for enthalpy changes.
  - Calculate heat transferred using Q = mcΔT.
  - Calculate ΔH per mole from calorimetry data, with the correct sign.
  - Evaluate sources of error in calorimetry, including heat loss.
formulas:
  - name: Heat transferred
    latex: 'Q = mc\Delta T'
  - name: Enthalpy change
    latex: '\Delta H = -\frac{Q}{n}'
definitions:
  - term: Standard conditions
    definition: 100 kPa pressure, a stated temperature (usually 298 K), and 1 mol dm⁻³ for solutions; substances in their standard states.
  - term: Specific heat capacity
    definition: The energy needed to raise the temperature of 1 g of a substance by 1 K; for water, 4.18 J g⁻¹ K⁻¹.
mistakes:
  - Using the mass of the reactants for m. Use the mass of the solution/water being heated (1 cm³ of solution ≈ 1 g).
  - Forgetting the sign. If the temperature rises, the reaction is exothermic and ΔH is negative.
  - Leaving ΔH in J mol⁻¹ when kJ mol⁻¹ is expected.
tips:
  - Extrapolate a temperature–time graph back to the moment of mixing to correct for heat loss.
related:
  - physics/b1-thermal-energy
---

## Standard conditions

The standard enthalpy change ΔH⦵ is measured at **100 kPa**, usually **298 K**, with solutions at **1 mol dm⁻³** and all substances in their standard states.

## Calorimetry

Heat released or absorbed by a reaction changes the temperature of a known mass of water or solution:

```figure
src: chemistry/_iitian/measuring-enthalpy-changes-r1-1-5-practical-considerations-i/img/fig-da011492f92b0365.png
caption: Measuring the enthalpy of combustion: a burning fuel heats a known mass of water in a copper can.
```

$$
Q = mc\Delta T
$$

$m$ = mass of water/solution (g), $c$ = 4.18 J g⁻¹ K⁻¹, $\Delta T$ = temperature change (K or °C).

```keyidea
ΔH = −Q/n. The minus sign is because heat gained by the water was lost by the reaction: a temperature rise means an exothermic reaction with negative ΔH.
```

```example
50.0 cm³ of 1.00 mol dm⁻³ HCl is mixed with 50.0 cm³ of 1.00 mol dm⁻³ NaOH. The temperature rises by 6.8 °C. Find the enthalpy change of neutralisation.
---
$Q = 100\times4.18\times6.8 = 2842$ J. Moles of water formed $= 0.0500$.

$\Delta H = -2842/0.0500 = -56\,800$ J mol⁻¹ $= -56.8$ kJ mol⁻¹.
```

```example
Burning 0.46 g of ethanol (M = 46.08) heats 200 g of water by 14.0 °C. Find ΔHc of ethanol.
---
$Q = 200\times4.18\times14.0 = 11\,700$ J; $n = 0.46/46.08 = 0.00998$ mol.

$\Delta H_c = -11.7/0.00998 = -1170$ kJ mol⁻¹ (the data-booklet value is −1367 kJ mol⁻¹: heat losses).
```

## Sources of error

- **Heat loss** to the surroundings (biggest error) → |ΔH| too small. Reduce with insulation, a lid, a polystyrene cup; correct with a cooling-curve extrapolation.
- **Incomplete combustion** (soot) in combustion experiments.
- Heat absorbed by the calorimeter itself, and evaporation of fuel.

```figure
src: chemistry/_sme/measuring-enthalpy-change/img/fig-2a1c3a5ce5441aca.png
caption: A simple solution calorimeter: a polystyrene cup with a lid and a thermometer, for reactions in solution.
```

```figure
src: chemistry/_sme/measuring-enthalpy-change/img/fig-6a552b33d9c70e4e.png
caption: Reducing heat loss in combustion calorimetry: an insulating lid, a draught shield and the flame placed close to the can.
```

```figure
src: chemistry/_iitian/measuring-enthalpy-changes-r1-1-5-practical-considerations-i/img/fig-a758d44614390eed.png
caption: Correcting for heat loss: extrapolate the cooling line back to the moment of mixing to estimate the true maximum temperature change.
```

```plot
caption: Correcting for heat loss — extrapolate the cooling line back to the time of mixing (t = 3 min) to estimate the maximum temperature rise.
x: 0, 10
y: 18, 30
f: 20 | before mixing
f: 28.6 - 0.35*x | cooling line
vline: 3
xlabel: time / min
ylabel: temperature / °C
```

```question
q-mct
```

## Summary

- Standard: 100 kPa, 298 K, 1 mol dm⁻³.
- $Q = mc\Delta T$ (m of water/solution); $\Delta H = -Q/n$.
- Heat loss makes experimental ΔH less negative than literature values.
