---
code: B.3.1
title: Pressure and the ideal gas equation
summary: From three experimental gas laws to one equation, PV = nRT, that predicts how a gas responds to being squeezed, heated or added to.
minutes: 30
difficulty: 2
objectives:
  - Calculate pressure using P = F/A.
  - Convert between number of molecules and amount of substance, n = N/N_A.
  - State the three empirical gas laws and combine them into PV/T = constant.
  - Use PV = nRT and PV = Nk_BT.
prerequisites:
  - Kelvin temperature
formulas:
  - name: Pressure
    latex: 'P = \frac{F}{A}'
    where: F is the force perpendicular to the surface.
  - name: Amount of substance
    latex: 'n = \frac{N}{N_A}'
    where: N_A = 6.02 × 10²³ mol⁻¹.
  - name: Combined gas law (fixed mass)
    latex: '\frac{PV}{T} = \text{constant}'
  - name: Ideal gas equation
    latex: 'PV = nRT = Nk_BT'
    where: R = 8.31 J mol⁻¹ K⁻¹, k_B = R/N_A = 1.38 × 10⁻²³ J K⁻¹.
definitions:
  - term: Pressure
    definition: The perpendicular force per unit area, in pascals (Pa = N m⁻²).
  - term: Mole
    definition: The amount of substance containing 6.02 × 10²³ particles (the Avogadro constant).
  - term: Ideal gas
    definition: A model gas that obeys PV = nRT exactly at all pressures and temperatures.
mistakes:
  - Using °C in the gas laws. Every gas-law calculation needs kelvin.
  - Forgetting unit conversions — volumes in cm³ or dm³ must be in m³, pressures in kPa must be in Pa.
  - Applying PV/T = constant when gas leaks in or out. It holds only for a fixed amount of gas.
tips:
  - For a “before and after” question with a fixed mass of gas, use P₁V₁/T₁ = P₂V₂/T₂ — the constants cancel and units only need to match.
  - Write down which quantity is held constant before choosing Boyle’s, Charles’s or the pressure law.
related:
  - physics/b1-thermal-energy
---

## Pressure

A gas presses on the walls of its container. The **pressure** is the force per unit area at right angles to the surface:

$$
P = \frac{F}{A}
$$

Atmospheric pressure at sea level is about $1.01\times10^5$ Pa.

## Counting particles: the mole

Gas samples contain enormous numbers of molecules, so we count them in **moles**:

$$
n = \frac{N}{N_A}, \qquad N_A = 6.02\times10^{23}\ \text{mol}^{-1}
$$

## Three empirical gas laws

Experiments on a fixed amount of gas give three relationships (with $T$ in kelvin):

| Law | Held constant | Relationship |
|---|---|---|
| Boyle’s law | temperature | $PV = \text{constant}$ |
| Charles’s law | pressure | $V \propto T$ |
| Pressure law | volume | $P \propto T$ |

```plot
caption: Boyle’s law: at constant temperature, pressure is inversely proportional to volume. A higher temperature gives a curve further from the axes.
x: 0, 5
y: 0, 10
f: 6/x | lower T
f: 10/x | higher T
xlabel: V
ylabel: P
```

Combining them gives one law for a fixed amount of gas:

$$
\frac{PV}{T} = \text{constant}
$$

## The ideal gas equation

The constant turns out to be proportional to the amount of gas:

$$
PV = nRT
$$

or, in terms of the number of molecules,

$$
PV = Nk_BT
$$

with $R = 8.31$ J mol⁻¹ K⁻¹ and $k_B = 1.38\times10^{-23}$ J K⁻¹.

```keyidea
Extrapolate Charles’s law or the pressure law back to zero volume or zero pressure and every gas meets the temperature axis at the same point: −273 °C, absolute zero.
```

```example
A 2.0 × 10⁻³ m³ cylinder holds gas at 3.0 × 10⁵ Pa and 27 °C. How many moles of gas does it contain?
---
$n = \dfrac{PV}{RT} = \dfrac{3.0\times10^5 \times 2.0\times10^{-3}}{8.31 \times 300} = 0.24$ mol.
```

```example
A bicycle tyre holds air at 2.4 × 10⁵ Pa at 15 °C. After a ride the air is at 35 °C and the volume has increased by 2%. Find the new pressure.
---
$\dfrac{P_1V_1}{T_1} = \dfrac{P_2V_2}{T_2} \Rightarrow P_2 = P_1\dfrac{V_1}{V_2}\dfrac{T_2}{T_1} = 2.4\times10^5 \times \dfrac{1}{1.02} \times \dfrac{308}{288}$

$P_2 = 2.5\times10^5$ Pa.
```

```mistake
In the tyre example, using 35/15 for the temperature ratio would more than double the pressure — a sure sign that °C has been used instead of kelvin.
```

```question
gas-moles
```

## Summary

- $P = F/A$; $n = N/N_A$.
- Boyle, Charles and the pressure law combine to $PV/T$ = constant for a fixed amount of gas.
- Ideal gas equation: $PV = nRT = Nk_BT$, with $T$ in kelvin and SI units throughout.
