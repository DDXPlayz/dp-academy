---
code: B.1.1
title: Particles, temperature and internal energy
summary: The particle model of solids, liquids and gases, what temperature really measures, and where a body’s internal energy is stored.
minutes: 25
difficulty: 1
objectives:
  - Describe the arrangement and motion of particles in solids, liquids and gases.
  - Calculate density using ρ = m/V.
  - Convert between Celsius and kelvin, and explain why temperature changes are the same on both scales.
  - Relate kelvin temperature to the average kinetic energy of particles.
  - Define internal energy and state what decides the direction of thermal energy transfer.
prerequisites:
  - Kinetic and potential energy
formulas:
  - name: Density
    latex: '\rho = \frac{m}{V}'
  - name: Kelvin and Celsius
    latex: 'T/\text{K} = \theta/{}^\circ\text{C} + 273'
  - name: Average kinetic energy of a particle
    latex: '\bar{E}_k = \tfrac{3}{2}k_B T'
    where: k_B = 1.38 × 10⁻²³ J K⁻¹ is the Boltzmann constant.
definitions:
  - term: Temperature
    definition: A measure of the average random kinetic energy of the particles in a substance; on the kelvin scale it is directly proportional to that average energy.
  - term: Internal energy
    definition: The total random kinetic energy of the particles plus the total intermolecular potential energy between them.
  - term: Absolute zero
    definition: 0 K (−273 °C), the temperature at which particles have the minimum possible kinetic energy.
  - term: Thermal equilibrium
    definition: The state of two bodies at the same temperature, so there is no net transfer of thermal energy between them.
mistakes:
  - Confusing temperature with internal energy. A bath of warm water has far more internal energy than a red-hot spark, even though the spark is hotter.
  - Using Celsius in Ek = (3/2)kBT. The formula needs kelvin.
  - Thinking heat flows from more internal energy to less. The direction is set by temperature, not by the amount of energy.
tips:
  - A temperature change of 10 °C is a change of 10 K — only absolute temperatures need converting.
  - When asked to compare particles at two temperatures, use the ratio of kelvin temperatures.
related:
  - physics/b3-gas-laws
---

## The particle model

Everything is made of particles (atoms or molecules) that attract each other at short range and are always moving.

| | Solid | Liquid | Gas |
|---|---|---|---|
| Arrangement | regular, close together | close together, disordered | far apart, random |
| Motion | vibrate about fixed positions | move past each other | move fast in straight lines between collisions |
| Forces between particles | strong | weaker, still significant | very small except during collisions |

Because gas particles are far apart, gases have much lower **density** than solids and liquids:

$$
\rho = \frac{m}{V}
$$

measured in kg m⁻³. Water has a density of 1000 kg m⁻³; air at room temperature about 1.2 kg m⁻³.

## Temperature scales

The **Celsius** scale is defined from the melting and boiling points of water. The **kelvin** scale starts at **absolute zero**, the lowest possible temperature:

$$
T/\text{K} = \theta/{}^\circ\text{C} + 273
$$

The kelvin and the Celsius degree are the same size, so a temperature **change** has the same number on both scales: warming from 20 °C to 35 °C is a rise of 15 K.

## What temperature measures

The particles in a substance move with a range of speeds. The kelvin temperature is directly proportional to their **average random kinetic energy**:

$$
\bar{E}_k = \tfrac{3}{2}k_B T
$$

```keyidea
Double the kelvin temperature and you double the average kinetic energy of the particles. At absolute zero this random motion is at its minimum.
```

```example
Find the average kinetic energy of an oxygen molecule at 27 °C.
---
$T = 27 + 273 = 300$ K.

$\bar{E}_k = \tfrac{3}{2}(1.38\times10^{-23})(300) = 6.2\times10^{-21}$ J.
```

## Internal energy

The **internal energy** of a body is the sum of two parts:

- the total **random kinetic energy** of its particles (their motion), and
- the total **intermolecular potential energy** (due to the forces between particles).

Raising the temperature increases the kinetic part. Melting or boiling increases the potential part, as particles are pulled further apart.

## Which way does energy flow?

When two bodies are in thermal contact, thermal energy flows from the one at **higher temperature** to the one at **lower temperature**, until they reach the same temperature — **thermal equilibrium**. It does not matter which one has more internal energy.

```mistake
A large, cool iceberg has more internal energy than a small cup of hot tea, but energy still flows from the tea to the ice, because the tea is at a higher temperature.
```

```question
kelvin-change
```

## Summary

- Solids, liquids and gases differ in particle spacing, motion and forces; density is $\rho = m/V$.
- $T/\text{K} = \theta/^\circ\text{C} + 273$; temperature differences are the same on both scales.
- Kelvin temperature is proportional to average particle kinetic energy: $\bar{E}_k = \tfrac{3}{2}k_BT$.
- Internal energy = random kinetic energy + intermolecular potential energy.
- Thermal energy flows from higher to lower temperature.
