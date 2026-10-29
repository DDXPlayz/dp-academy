---
title: Power and efficiency
summary: How quickly energy is transferred, and how much of it ends up doing something useful.
minutes: 20
difficulty: 2
objectives:
  - Define power and calculate it as work done per unit time.
  - Use $P = Fv$ for an object moving at constant velocity.
  - Calculate efficiency from energies or powers.
  - Interpret a Sankey diagram.
prerequisites:
  - Work and energy
formulas:
  - name: Power
    latex: 'P = \frac{\Delta W}{\Delta t}'
    where: Measured in watts (1 W = 1 J s⁻¹).
  - name: Power from force and velocity
    latex: 'P = Fv'
    where: F is the force in the direction of the velocity v.
  - name: Efficiency
    latex: '\eta = \frac{\text{useful work out}}{\text{total work in}} = \frac{\text{useful power out}}{\text{total power in}}'
    where: Has no unit; often written as a percentage.
definitions:
  - term: Power
    definition: The rate at which work is done, or energy is transferred, $P = \Delta W / \Delta t$. Measured in watts.
  - term: Efficiency
    definition: The fraction of the energy (or power) supplied that is transferred usefully. Always less than 1 for a real machine.
  - term: Sankey diagram
    definition: A flow diagram in which arrow widths are proportional to energy or power, showing how an input splits into useful and wasted outputs.
mistakes:
  - Giving an efficiency greater than 100 % — usually a sign the useful and total values have been swapped.
  - Using the total resistive force in $P = Fv$ when the vehicle is accelerating. At constant speed the driving force equals the resistive force; when accelerating it is larger.
tips:
  - Watch the prefixes — kW and MW are common, and 1 kW h = 3.6 MJ.
  - On a Sankey diagram, the widths of the output arrows must add up to the input arrow.
related:
  - physics/b5-current-circuits
---

## Introduction

Two people climb the same flight of stairs. They do the same work against gravity — but the one who runs up does it faster. **Power** measures how fast work is done.

## Power

$$P = \frac{\Delta W}{\Delta t}$$

One watt is one joule per second.

```example
An electric motor lifts a 30 kg crate through a height of 12 m in 8.0 s at a steady speed. What useful power does it develop? Take $g = 9.8$ m s⁻².
---
Work done against gravity: $W = mg\Delta h = 30 \times 9.8 \times 12 = 3530$ J.

$$P = \frac{W}{t} = \frac{3530}{8.0} = 440\ \text{W}$$
```

## Power and velocity

If a force $F$ moves an object at velocity $v$ in its own direction, then in time $\Delta t$ it does work $F \times v\Delta t$. Dividing by $\Delta t$:

$$P = Fv$$

```example
A car cruises at a constant 25 m s⁻¹ along a level road. The total resistive force (air resistance plus rolling friction) is 800 N. What power must the engine deliver to the wheels?
---
At constant velocity the driving force equals the resistive force, 800 N.

$$P = Fv = 800 \times 25 = 20\,000\ \text{W} = 20\ \text{kW}$$
```

## Efficiency

No real machine transfers all of its input energy usefully — some is always dissipated as thermal energy or sound.

$$\eta = \frac{\text{useful output}}{\text{total input}}$$

You can use energies or powers, as long as both are the same kind.

```keyidea
The energy that is “wasted” is not destroyed. It is transferred to the surroundings, usually as thermal energy, where it becomes too spread out to do useful work.
```

A **Sankey diagram** shows this as a flow: one arrow in, split into a useful arrow and wasted arrows, with widths in proportion to the energy.

```example
The motor in the previous example takes 600 W of electrical power. What is its efficiency?
---
$$\eta = \frac{441}{600} = 0.735 \approx 74\,\%$$

The other 159 W heats the motor and its surroundings.
```

## Try it yourself

```question
power-lift
```

```question
efficiency-calc
```

## Summary

- Power is the rate of doing work: $P = \Delta W/\Delta t$, and $P = Fv$ for a force moving at velocity $v$.
- Efficiency is useful output divided by total input, always below 100 %.
- Wasted energy is dissipated to the surroundings, usually as thermal energy.
