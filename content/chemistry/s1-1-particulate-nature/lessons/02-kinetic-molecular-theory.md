---
code: S1.1.2
title: Kinetic molecular theory and changes of state
summary: The particle model of solids, liquids and gases, changes of state, and what the Kelvin temperature really measures.
minutes: 25
difficulty: 1
objectives:
  - Use the kinetic molecular theory to explain the properties of solids, liquids and gases.
  - Name and explain the changes of state, including energy changes.
  - Relate Kelvin temperature to the average kinetic energy of particles and convert between °C and K.
formulas:
  - name: Celsius to kelvin
    latex: 'T\,(\text{K}) = \theta\,(^\circ\text{C}) + 273.15'
definitions:
  - term: Kinetic molecular theory
    definition: A model in which matter is made of particles in constant random motion, whose energy and attractions explain the properties of the three states.
  - term: Sublimation
    definition: The direct change from solid to gas without passing through the liquid state.
  - term: Deposition
    definition: The direct change from gas to solid.
mistakes:
  - Saying particles in a solid do not move. They vibrate about fixed positions.
  - Thinking temperature rises during melting. Energy goes into overcoming attractions, so the temperature stays constant.
tips:
  - Absolute zero, 0 K, is where particles would have minimum kinetic energy. Kelvin temperatures are never negative.
related:
  - physics/b1-thermal-energy
---

## The three states

| | Solid | Liquid | Gas |
|---|---|---|---|
| Arrangement | Regular, closely packed | Close, random | Far apart, random |
| Movement | Vibrate about fixed positions | Slide past each other | Fast, random, in all directions |
| Attractions | Strong | Weaker | Negligible |
| Shape / volume | Fixed / fixed | Takes container’s shape / fixed | Fills container / not fixed |
| Compressible? | No | Hardly | Yes |

## Changes of state

```svg
caption: Changes of state. Arrows to the right absorb energy (endothermic); arrows to the left release energy (exothermic).
<svg viewBox="0 0 420 150">
  <g font-size="14" text-anchor="middle" fill="currentColor"><text x="60" y="80">solid</text><text x="210" y="80">liquid</text><text x="360" y="80">gas</text></g>
  <g stroke="var(--bad)" stroke-width="2"><line x1="95" y1="62" x2="170" y2="62" marker-end="url(#s11-r)"/><line x1="245" y1="62" x2="320" y2="62" marker-end="url(#s11-r)"/><path d="M60 60 Q 210 -10 360 60" fill="none" marker-end="url(#s11-r)"/></g>
  <g stroke="var(--accent)" stroke-width="2"><line x1="170" y1="92" x2="95" y2="92" marker-end="url(#s11-a)"/><line x1="320" y1="92" x2="245" y2="92" marker-end="url(#s11-a)"/><path d="M360 100 Q 210 170 60 100" fill="none" marker-end="url(#s11-a)"/></g>
  <g font-size="11" text-anchor="middle" fill="currentColor"><text x="132" y="56">melting</text><text x="282" y="56">vaporisation</text><text x="210" y="20">sublimation</text><text x="132" y="108">freezing</text><text x="282" y="108">condensation</text><text x="210" y="146">deposition</text></g>
  <defs>
    <marker id="s11-r" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 10 5 0 10z" fill="var(--bad)"/></marker>
    <marker id="s11-a" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 10 5 0 10z" fill="var(--accent)"/></marker>
  </defs>
</svg>
```

During a change of state the temperature stays **constant**: the energy supplied goes into overcoming (or is released by forming) attractions between particles, not into increasing their kinetic energy.

**Evaporation** happens at any temperature, from the surface only; **boiling** happens throughout the liquid at the boiling point.

## Temperature and kinetic energy

```keyidea
The Kelvin temperature is proportional to the average kinetic energy of the particles. Double the Kelvin temperature and you double their average kinetic energy.
```

$$
T\,(\text{K}) = \theta\,(^\circ\text{C}) + 273.15
$$

At a given temperature, particles have a **range** of speeds; only the average is fixed. At the same temperature, lighter particles move faster on average than heavier ones (same average kinetic energy).

```example
The temperature of a gas rises from 27 °C to 327 °C. By what factor does the average kinetic energy of its particles change?
---
In kelvin: 300 K → 600 K. The average kinetic energy doubles. (Doubling the Celsius value would be a mistake.)
```

```question
kelvin-ke
```

## Summary

- Solids vibrate in fixed positions; liquids slide; gases move fast and far apart.
- Changes of state occur at constant temperature; melting, vaporisation and sublimation are endothermic.
- Kelvin temperature ∝ average kinetic energy; $T = \theta + 273.15$.
