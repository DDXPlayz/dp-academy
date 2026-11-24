---
code: B.1.3
title: Conduction and convection
summary: How thermal energy moves through solids and fluids — and how to calculate the rate of conduction through a wall or window.
minutes: 25
difficulty: 2
objectives:
  - Name conduction, convection and radiation as the main mechanisms of thermal energy transfer.
  - Explain conduction in terms of the kinetic energy of particles.
  - Use ΔQ/Δt = kA ΔT/Δx for the rate of conduction.
  - Describe convection in terms of density differences in a fluid.
prerequisites:
  - Particle model and temperature
formulas:
  - name: Rate of conduction
    latex: '\frac{\Delta Q}{\Delta t} = kA\frac{\Delta T}{\Delta x}'
    where: k is the thermal conductivity (W m⁻¹ K⁻¹), A the cross-sectional area and ΔT/Δx the temperature gradient.
definitions:
  - term: Conduction
    definition: Transfer of thermal energy through a material by collisions between particles (and, in metals, by free electrons), without the material itself moving.
  - term: Convection
    definition: Transfer of thermal energy by the bulk movement of a fluid, driven by density differences.
  - term: Thermal conductivity
    definition: A property of a material that measures how well it conducts thermal energy; the k in the conduction equation.
mistakes:
  - Saying “heat rises”. It is the warmer, less dense fluid that rises; energy itself has no direction preference.
  - Forgetting to convert thickness Δx from cm or mm to metres.
tips:
  - To reduce conduction, use a material with low k, a smaller area, or a thicker layer.
  - Convection needs a fluid and gravity; it cannot happen in a solid or in space.
related:
  - physics/b1-thermal-energy
---

## Three ways to transfer thermal energy

Thermal energy moves from hotter to colder places by

- **conduction** — through a material, particle to particle;
- **convection** — carried by a moving fluid;
- **thermal radiation** — as electromagnetic waves (next lesson).

## Conduction

At the hot end of a metal rod, particles vibrate with more kinetic energy. They collide with their neighbours and pass some of that energy on, so energy spreads towards the cold end even though the particles stay in place. In metals, **free electrons** also move through the lattice and carry energy quickly, which is why metals are good conductors.

The rate of conduction through a slab of material is

$$
\frac{\Delta Q}{\Delta t} = kA\frac{\Delta T}{\Delta x}
$$

```svg
caption: Conduction through a slab of area A and thickness Δx. The rate is larger for a bigger temperature difference, a larger area and a thinner slab.
<svg viewBox="0 0 420 180">
  <rect x="150" y="30" width="110" height="120" fill="var(--accent)" opacity="0.15" stroke="var(--accent)" stroke-width="2"/>
  <text x="205" y="95" font-size="13" text-anchor="middle" fill="var(--accent)">conductivity k</text>
  <text x="70" y="95" font-size="14" text-anchor="middle" fill="var(--bad)">T_hot</text>
  <text x="340" y="95" font-size="14" text-anchor="middle" fill="var(--accent)">T_cold</text>
  <line x1="100" y1="60" x2="320" y2="60" stroke="var(--bad)" stroke-width="2.5" marker-end="url(#b13-q)"/>
  <text x="300" y="52" font-size="12" fill="var(--bad)">ΔQ/Δt</text>
  <line x1="150" y1="165" x2="260" y2="165" stroke="var(--muted)" marker-start="url(#b13-d)" marker-end="url(#b13-d)"/>
  <text x="205" y="178" font-size="12" text-anchor="middle" fill="var(--muted)">Δx</text>
  <defs>
    <marker id="b13-q" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 10 5 0 10z" fill="var(--bad)"/></marker>
    <marker id="b13-d" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0 10 5 0 10z" fill="var(--muted)"/></marker>
  </defs>
</svg>
```

```example
A glass window is 1.2 m × 0.80 m and 4.0 mm thick. The inner surface is at 18 °C and the outer at 6 °C. Glass has k = 0.80 W m⁻¹ K⁻¹. Find the rate of energy loss.
---
$A = 1.2 \times 0.80 = 0.96$ m², $\Delta T = 12$ K, $\Delta x = 4.0\times10^{-3}$ m.

$\dfrac{\Delta Q}{\Delta t} = 0.80 \times 0.96 \times \dfrac{12}{4.0\times10^{-3}} = 2300$ W.

Double glazing traps a layer of air, which has a very low k, cutting this enormously.
```

```keyidea
Good insulators (air, wool, polystyrene) have low k. Many insulating materials work by trapping air, which conducts poorly and cannot convect when it is trapped.
```

## Convection

In a liquid or gas, the fluid near a heater warms up and expands. Its **density falls**, so it rises, and cooler, denser fluid sinks to take its place. This sets up a **convection current** that carries energy around the fluid.

Convection explains sea breezes, the circulation in a heated room, and the motion of the Earth’s mantle. It needs a fluid and a gravitational field.

```mistake
Convection is not “heat rising”. Warm fluid rises because it is less dense than the fluid around it.
```

```question
conduction-rate
```

## Summary

- Conduction: energy passed on by particle collisions (and free electrons in metals).
- Rate of conduction: $\Delta Q/\Delta t = kA\,\Delta T/\Delta x$.
- Convection: bulk movement of a fluid caused by density differences.
