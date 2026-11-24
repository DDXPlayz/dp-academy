---
code: S1.5.4
title: The ideal gas equation
summary: Using PV = nRT and the combined gas law, including finding molar mass from gas data.
minutes: 30
difficulty: 2
objectives:
  - Use the ideal gas equation, PV = nRT, with correct SI units.
  - Use the combined gas law, P₁V₁/T₁ = P₂V₂/T₂.
  - Determine the molar mass of a gas from experimental data.
formulas:
  - name: Ideal gas equation
    latex: 'PV = nRT, \quad R = 8.31\ \text{J K}^{-1}\,\text{mol}^{-1}'
  - name: Combined gas law
    latex: '\frac{P_1V_1}{T_1} = \frac{P_2V_2}{T_2}'
  - name: Molar mass from gas data
    latex: 'M = \frac{mRT}{PV}'
definitions:
  - term: Boyle’s law
    definition: At constant temperature, the pressure of a fixed amount of gas is inversely proportional to its volume.
  - term: Charles’s law
    definition: At constant pressure, the volume of a fixed amount of gas is proportional to its absolute temperature.
mistakes:
  - Mixing units in PV = nRT. Use Pa, m³ and K (1 dm³ = 10⁻³ m³; 1 cm³ = 10⁻⁶ m³; 1 kPa = 10³ Pa).
  - Using °C in gas laws. Always convert to kelvin.
tips:
  - kPa × dm³ also works with R = 8.31, because the factors of 10³ cancel.
related:
  - physics/b3-gas-laws
---

## The ideal gas equation

$$
PV = nRT
$$

| Symbol | Quantity | SI unit |
|---|---|---|
| $P$ | pressure | Pa |
| $V$ | volume | m³ |
| $n$ | amount | mol |
| $R$ | gas constant, 8.31 | J K⁻¹ mol⁻¹ |
| $T$ | temperature | K |

```example
How many moles of gas are in a 2.50 dm³ flask at 25 °C and 101 kPa?
---
$n = \dfrac{PV}{RT} = \dfrac{101\times10^3\times2.50\times10^{-3}}{8.31\times298} = 0.102$ mol.
```

## The combined gas law

For a fixed amount of gas:

$$
\frac{P_1V_1}{T_1} = \frac{P_2V_2}{T_2}
$$

It contains Boyle’s law ($PV$ constant at fixed $T$), Charles’s law ($V \propto T$ at fixed $P$) and the pressure law ($P \propto T$ at fixed $V$).

```plot
caption: Boyle’s law — at constant temperature, P is inversely proportional to V (a curve); P against 1/V would be a straight line through the origin.
x: 0.2, 4
y: 0, 5
f: 2/x | P = k/V
xlabel: V
ylabel: P
```

## Finding molar mass

Combine $n = m/M$ with $PV = nRT$:

$$
M = \frac{mRT}{PV}
$$

```keyidea
Measure the mass of a gas sample and its volume at a known temperature and pressure — then the ideal gas equation gives its molar mass.
```

```example
0.495 g of a gas occupies 250 cm³ at 100 kPa and 300 K. Find its molar mass.
---
$M = \dfrac{0.495\times8.31\times300}{100\times10^3\times250\times10^{-6}} = 49.4$ g mol⁻¹.
```

```question
pv-nrt
```

## Summary

- $PV = nRT$ in Pa, m³, K; $R = 8.31$ J K⁻¹ mol⁻¹.
- Combined gas law for a fixed amount of gas.
- $M = mRT/PV$ finds molar mass from gas data.
