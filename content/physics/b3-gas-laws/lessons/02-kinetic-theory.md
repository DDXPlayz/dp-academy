---
code: B.3.2
title: Kinetic theory of an ideal gas
summary: Where gas pressure comes from, how it links to the speed of the molecules, and when real gases stop behaving ideally.
minutes: 30
difficulty: 3
objectives:
  - State the assumptions of the kinetic model of an ideal gas.
  - Explain pressure in terms of the change in momentum of molecules colliding with a wall.
  - Use P = ⅓ρ⟨c²⟩ to link pressure to mean square speed.
  - Calculate the internal energy of an ideal monatomic gas.
  - Describe when an ideal gas is a good model of a real gas.
prerequisites:
  - Ideal gas equation
  - Momentum and impulse
formulas:
  - name: Pressure and molecular speed
    latex: 'P = \tfrac{1}{3}\rho\langle c^2\rangle'
    where: ρ is density and ⟨c²⟩ the mean square speed of the molecules.
  - name: Internal energy of an ideal monatomic gas
    latex: 'U = \tfrac{3}{2}Nk_BT = \tfrac{3}{2}nRT'
definitions:
  - term: Mean square speed
    definition: The average of the squares of the speeds of the molecules; its square root is the root-mean-square (r.m.s.) speed.
  - term: Kinetic model assumptions
    definition: Many identical molecules in random motion; negligible molecular volume; no intermolecular forces except during collisions; elastic collisions of negligible duration.
mistakes:
  - Thinking hotter gas molecules hit the walls harder **only**. They also hit more often — both effects raise the pressure.
  - Including intermolecular potential energy in an ideal gas’s internal energy. In the model there are no forces between molecules, so U is all kinetic.
tips:
  - Link the micro and macro pictures — ⅓Nm⟨c²⟩ = Nk_BT gives ½m⟨c²⟩ = (3/2)k_BT, the average kinetic energy per molecule.
  - Real gases behave ideally at low pressure, high temperature and low density.
related:
  - physics/b1-thermal-energy
  - physics/a2-forces-momentum
---

## The kinetic model

An **ideal gas** is a model built on these assumptions:

```figure
src: physics/_iitian/ideal-gases-ib-dp-physics-study-notes/img/fig-795b98a86eee7564.png
caption: Measuring the pressure of a gas: a sealed container fitted with a pressure gauge and a thermometer.
```

- the gas has a very large number of identical molecules in **random motion**;
- the molecules’ own volume is **negligible** compared with the volume of the container;
- there are **no intermolecular forces** except during collisions;
- collisions (with each other and the walls) are **elastic** and take negligible time.

## Pressure from collisions

When a molecule bounces off a wall, its momentum changes. By Newton’s second and third laws, the wall feels a force. Billions of collisions per second add up to a steady **pressure**.

```figure
src: physics/_sme/gas-laws/img/fig-0195a37502d0bc62.png
caption: A particle bouncing off a wall reverses its momentum; the change in momentum, 2mv, means the wall exerts a force on it and it exerts one on the wall.
```

```svg
caption: A molecule hitting a wall at velocity c reverses its perpendicular component. Its momentum change is 2mc, so the wall receives an impulse 2mc.
<svg viewBox="0 0 420 180">
  <rect x="320" y="20" width="20" height="140" fill="var(--muted)" opacity="0.4"/>
  <text x="345" y="90" font-size="12" fill="var(--muted)">wall</text>
  <circle cx="300" cy="90" r="9" fill="var(--accent)"/>
  <line x1="120" y1="70" x2="285" y2="70" stroke="var(--accent)" stroke-width="2.5" marker-end="url(#b32-a)"/>
  <text x="200" y="62" font-size="13" text-anchor="middle" fill="var(--accent)">before: +mc</text>
  <line x1="285" y1="112" x2="120" y2="112" stroke="var(--bad)" stroke-width="2.5" marker-end="url(#b32-b)"/>
  <text x="200" y="134" font-size="13" text-anchor="middle" fill="var(--bad)">after: −mc</text>
  <text x="200" y="165" font-size="12" text-anchor="middle" fill="currentColor">Δp = −2mc on the molecule, +2mc on the wall</text>
  <defs>
    <marker id="b32-a" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 10 5 0 10z" fill="var(--accent)"/></marker>
    <marker id="b32-b" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 10 5 0 10z" fill="var(--bad)"/></marker>
  </defs>
</svg>
```

Averaging over all the molecules and the three directions of motion gives

$$
P = \tfrac{1}{3}\rho\langle c^2\rangle
$$

where $\langle c^2\rangle$ is the **mean square speed**.

```keyidea
Heating a gas at constant volume makes the molecules move faster. They hit the walls more often and with a bigger change in momentum each time, so the pressure rises.
```

## Connecting the two pictures

Since $\rho = Nm/V$, the kinetic result can be written $PV = \tfrac{1}{3}Nm\langle c^2\rangle$. Comparing with $PV = Nk_BT$:

$$
\tfrac{1}{2}m\langle c^2\rangle = \tfrac{3}{2}k_BT
$$

The average translational kinetic energy of a molecule is proportional to the kelvin temperature — exactly what B.1 told us temperature means.

```example
Nitrogen gas (density 1.25 kg m⁻³) is at a pressure of 1.01 × 10⁵ Pa. Find the r.m.s. speed of its molecules.
---
$\langle c^2\rangle = \dfrac{3P}{\rho} = \dfrac{3 \times 1.01\times10^5}{1.25} = 2.42\times10^5$ m² s⁻².

$c_{\text{rms}} = \sqrt{2.42\times10^5} = 490$ m s⁻¹ — faster than the speed of sound in air.
```

## Internal energy of an ideal gas

There are no intermolecular forces in an ideal gas, so there is no intermolecular potential energy. For a **monatomic** gas, the internal energy is all translational kinetic energy:

$$
U = \tfrac{3}{2}Nk_BT = \tfrac{3}{2}nRT
$$

```example
Find the internal energy of 2.0 mol of helium at 300 K.
---
$U = \tfrac{3}{2}nRT = \tfrac{3}{2} \times 2.0 \times 8.31 \times 300 = 7.5\times10^3$ J.
```

## When is the ideal model good?

Real gases deviate from $PV = nRT$ when the model’s assumptions break down:

```figure
src: physics/_sme/gas-laws/img/fig-78f1870f5f84da09.png
caption: Real gases differ from the ideal model: their particles have volume and attract each other, which matters at high pressure and low temperature.
```

- at **high pressure / high density**, molecules are close together, so their volume and the forces between them matter;
- at **low temperature**, molecules move slowly enough for attractions to have an effect, and the gas may liquefy.

A real gas behaves most like an ideal gas at **low pressure, high temperature and low density**.

```question
rms-speed
```

## Summary

- Kinetic model: many molecules, random motion, negligible volume, no forces except in elastic collisions.
- Pressure comes from momentum changes at the walls: $P = \tfrac{1}{3}\rho\langle c^2\rangle$.
- Average molecular KE is $\tfrac{3}{2}k_BT$; for a monatomic ideal gas $U = \tfrac{3}{2}nRT$.
- Real gases are close to ideal at low pressure, high temperature and low density.
