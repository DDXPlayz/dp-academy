---
code: R2.2.1
title: Rates of reaction and collision theory
summary: Measuring how fast a reaction goes, and why concentration, pressure, surface area, temperature and catalysts change the rate.
minutes: 35
difficulty: 2
objectives:
  - Define rate of reaction and determine rates from graphs.
  - Describe methods for measuring rates.
  - Explain the factors affecting rate using collision theory.
  - Use Maxwell–Boltzmann distributions to explain the effects of temperature and catalysts.
formulas:
  - name: Rate of reaction
    latex: '\text{rate} = \frac{\Delta[\text{product}]}{\Delta t} = -\frac{\Delta[\text{reactant}]}{\Delta t}'
definitions:
  - term: Rate of reaction
    definition: The change in concentration of a reactant or product per unit time (mol dm⁻³ s⁻¹).
  - term: Activation energy (Ea)
    definition: The minimum energy colliding particles need for a successful collision that leads to reaction.
  - term: Catalyst
    definition: A substance that increases the rate of a reaction by providing an alternative pathway with lower activation energy, and is not used up.
mistakes:
  - Saying higher temperature works mainly by more frequent collisions. The main reason is that many more collisions have energy ≥ Ea.
  - Saying a catalyst gives particles more energy. It lowers Ea; the energy distribution is unchanged.
tips:
  - Rate at a point on a curve — draw a tangent and find its gradient.
  - The total area under a Maxwell–Boltzmann curve is the number of particles; it doesn’t change with temperature.
related:
  - chemistry/r2-2-rates
---

## Measuring rate

Rate is the change in concentration per unit time. In practice we follow something that changes during the reaction:

- **gas volume** (gas syringe) or **mass loss** (as gas escapes) against time;
- **colour** change (colorimeter);
- **pH** or **conductivity**;
- time for a precipitate to obscure a mark.

The rate at any time is the **gradient of the tangent** to the concentration–time curve. Rate is highest at the start and falls as reactants are used up.

## Collision theory

```keyidea
Particles react only when they collide with energy at least equal to the activation energy AND with the correct orientation. Anything that increases the frequency of successful collisions increases the rate.
```

| Factor | Effect | Why |
|---|---|---|
| Concentration / pressure ↑ | rate ↑ | more particles per volume → more frequent collisions |
| Surface area ↑ (smaller pieces) | rate ↑ | more particles exposed → more frequent collisions |
| Temperature ↑ | rate ↑ (a lot) | much larger fraction of collisions have E ≥ Ea; also more frequent |
| Catalyst | rate ↑ | alternative pathway with lower Ea |

## Maxwell–Boltzmann distribution

```plot
caption: Distribution of molecular kinetic energies at a lower (accent) and higher temperature. At higher T the peak shifts right and flattens; the area beyond Ea grows sharply.
x: 0, 7
y: 0, 0.5
f: 0.9*x*exp(-x*x/3)/1.6 | lower T
f: 0.386*x*exp(-x*x/7)/1.6 | higher T
vline: 3.5
xlabel: kinetic energy
ylabel: fraction of particles
```

- Increasing temperature: more particles have energy ≥ Ea → rate increases sharply.
- Adding a catalyst: Ea moves to the left on the **same** curve → more particles have enough energy.

```question
collision-factors
```

## Summary

- Rate = change in concentration per unit time; tangent gradient on a graph.
- Successful collisions need E ≥ Ea and correct orientation.
- Temperature mainly increases the fraction of particles with E ≥ Ea; catalysts lower Ea.
