---
code: B.4.1
title: The first law and gas processes
summary: Energy bookkeeping for a gas — Q = ΔU + W, work as the area under a P–V graph, and the four standard processes.
minutes: 35
difficulty: 3
hl: true
objectives:
  - State and apply the first law of thermodynamics, Q = ΔU + W, with correct sign conventions.
  - Calculate work done by a gas at constant pressure, W = PΔV, and as the area under a P–V graph.
  - Calculate ΔU for an ideal monatomic gas from its temperature change.
  - Describe isovolumetric, isobaric, isothermal and adiabatic processes and use PV^(5/3) = constant.
prerequisites:
  - Ideal gas equation
  - Internal energy of an ideal gas
formulas:
  - name: First law of thermodynamics
    latex: 'Q = \Delta U + W'
    where: Q is thermal energy supplied to the gas; W is work done by the gas.
  - name: Work at constant pressure
    latex: 'W = P\Delta V'
  - name: Change in internal energy (monatomic ideal gas)
    latex: '\Delta U = \tfrac{3}{2}Nk_B\Delta T = \tfrac{3}{2}nR\Delta T'
  - name: Adiabatic process (monatomic ideal gas)
    latex: 'PV^{5/3} = \text{constant}'
definitions:
  - term: Isovolumetric process
    definition: A change at constant volume, so no work is done (W = 0) and Q = ΔU.
  - term: Isobaric process
    definition: A change at constant pressure, with W = PΔV.
  - term: Isothermal process
    definition: A change at constant temperature, so ΔU = 0 for an ideal gas and Q = W.
  - term: Adiabatic process
    definition: A change with no thermal energy transfer, Q = 0, so W = −ΔU.
mistakes:
  - Getting the signs wrong. In Q = ΔU + W, W is work done **by** the gas; compression means W is negative.
  - Thinking “adiabatic” means constant temperature. In an adiabatic compression the gas gets hotter, because work done on it raises its internal energy.
  - Forgetting that ΔU depends only on ΔT for an ideal gas, whatever the process.
tips:
  - For any process, start with ΔU = (3/2)nRΔT, then find W from the P–V graph and get Q from the first law.
  - On a P–V diagram, an adiabatic curve is steeper than an isothermal one through the same point.
related:
  - physics/b3-gas-laws
---

## Energy conservation for a gas

The **first law of thermodynamics** is conservation of energy applied to a closed system such as a gas in a cylinder:

$$
Q = \Delta U + W
$$

- $Q$ — thermal energy transferred **into** the gas (negative if it loses energy);
- $\Delta U$ — the increase in its internal energy;
- $W$ — work done **by** the gas on its surroundings (negative if work is done on it).

Energy supplied to the gas either raises its internal energy or is used to push back the surroundings.

## Work done by an expanding gas

If a gas at constant pressure $P$ pushes a piston of area $A$ through a distance $d$, the work done is $Fd = PAd$:

$$
W = P\Delta V
$$

In general, **the work done is the area under the curve on a P–V graph**.

## Internal energy depends only on temperature

For an ideal monatomic gas,

$$
\Delta U = \tfrac{3}{2}nR\Delta T
$$

so $\Delta U$ depends only on the start and end temperatures, not on how the gas got there.

## Four standard processes

| Process | What is fixed | Consequence |
|---|---|---|
| Isovolumetric | volume | $W = 0$, so $Q = \Delta U$ |
| Isobaric | pressure | $W = P\Delta V$ |
| Isothermal | temperature | $\Delta U = 0$, so $Q = W$; $PV$ = constant |
| Adiabatic | no heat transfer | $Q = 0$, so $W = -\Delta U$; $PV^{5/3}$ = constant |

```plot
caption: An isothermal curve (PV = constant) and a steeper adiabatic curve (PV^(5/3) = constant) through the same starting point.
x: 0.4, 4
y: 0, 6
f: 2/x | isothermal
f: 2/x^(5/3) | adiabatic
point: 1, 2 | start
xlabel: V
ylabel: P
```

```keyidea
Adiabatic changes happen when there is no time (or no route) for energy to flow as heat — a rapid compression in a bicycle pump, or a sound wave. Compress a gas adiabatically and it heats up; let it expand adiabatically and it cools.
```

```example
0.50 mol of an ideal monatomic gas is heated at a constant pressure of 1.0 × 10⁵ Pa from 300 K to 400 K. Find W, ΔU and Q.
---
$\Delta V = \dfrac{nR\Delta T}{P} = \dfrac{0.50 \times 8.31 \times 100}{1.0\times10^5} = 4.2\times10^{-3}$ m³, so $W = P\Delta V = 416$ J.

$\Delta U = \tfrac{3}{2}nR\Delta T = 1.5 \times 0.50 \times 8.31 \times 100 = 623$ J.

$Q = \Delta U + W = 623 + 416 = 1040$ J.
```

```example
A monatomic gas at 1.0 × 10⁵ Pa is compressed adiabatically from 2.0 L to 1.0 L. Find its new pressure.
---
$P_2 = P_1\left(\dfrac{V_1}{V_2}\right)^{5/3} = 1.0\times10^5 \times 2^{5/3} = 3.2\times10^5$ Pa.

An isothermal compression would only have doubled the pressure; the extra rise is because the gas has also heated up.
```

```question
first-law-sign
```

## Summary

- First law: $Q = \Delta U + W$ ($W$ = work done by the gas).
- $W = P\Delta V$ at constant pressure; in general, the area under the P–V graph.
- $\Delta U = \tfrac{3}{2}nR\Delta T$ for a monatomic ideal gas.
- Isovolumetric ($W=0$), isobaric, isothermal ($\Delta U=0$), adiabatic ($Q=0$, $PV^{5/3}$ = constant).
