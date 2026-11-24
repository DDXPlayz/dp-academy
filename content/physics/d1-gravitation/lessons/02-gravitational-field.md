---
code: D.1.2
title: Gravitational field strength and field lines
summary: Describing gravity as a field that fills space — its strength at any point and how to draw it.
minutes: 20
difficulty: 2
objectives:
  - Define gravitational field strength as force per unit mass.
  - Use g = GM/r² for a point or spherical mass.
  - Draw and interpret gravitational field lines.
prerequisites:
  - Newton’s law of gravitation
formulas:
  - name: Gravitational field strength
    latex: 'g = \frac{F}{m} = \frac{GM}{r^2}'
definitions:
  - term: Gravitational field strength
    definition: The force per unit mass on a small test mass placed at a point, g = F/m, in N kg⁻¹ (equivalent to m s⁻²).
  - term: Field line
    definition: A line showing the direction of the force on a test mass; the closer the lines, the stronger the field.
mistakes:
  - Thinking g is constant everywhere. It falls off with the square of distance from the planet’s centre.
  - Adding field strengths from two masses as numbers when they point in different directions — g is a vector.
tips:
  - Near the surface of a planet, field lines are nearly parallel and equally spaced, so the field is close to uniform.
  - At a point between two masses where g is zero, the two fields have equal size and opposite direction.
related:
  - physics/d1-gravitation
---

## A field around every mass

Instead of thinking of gravity as action at a distance, we say a mass sets up a **gravitational field** in the space around it. Any other mass placed in the field feels a force.

The **gravitational field strength** at a point is the force per unit mass on a small test mass there:

$$
g = \frac{F}{m}
$$

For a point mass, or outside a spherical mass $M$,

$$
g = \frac{GM}{r^2}
$$

Its unit is N kg⁻¹, which is the same as m s⁻² — field strength equals the free-fall acceleration.

```example
Find g at the surface of Mars (M = 6.4 × 10²³ kg, R = 3.4 × 10⁶ m).
---
$g = \dfrac{GM}{R^2} = \dfrac{6.67\times10^{-11} \times 6.4\times10^{23}}{(3.4\times10^6)^2} = 3.7$ N kg⁻¹ — about 38% of Earth’s.
```

## Field lines

```svg
caption: Left — the radial field of a spherical mass; lines point inwards and spread out, so the field weakens with distance. Right — near a planet’s surface the field is almost uniform.
<svg viewBox="0 0 440 200">
  <circle cx="110" cy="100" r="30" fill="var(--accent)" opacity="0.25" stroke="var(--accent)" stroke-width="2"/>
  <g stroke="currentColor" stroke-width="1.5">
    <line x1="110" y1="10" x2="110" y2="66" marker-end="url(#d12-k)"/><line x1="110" y1="190" x2="110" y2="134" marker-end="url(#d12-k)"/>
    <line x1="20" y1="100" x2="76" y2="100" marker-end="url(#d12-k)"/><line x1="200" y1="100" x2="144" y2="100" marker-end="url(#d12-k)"/>
    <line x1="46" y1="36" x2="86" y2="76" marker-end="url(#d12-k)"/><line x1="174" y1="36" x2="134" y2="76" marker-end="url(#d12-k)"/>
    <line x1="46" y1="164" x2="86" y2="124" marker-end="url(#d12-k)"/><line x1="174" y1="164" x2="134" y2="124" marker-end="url(#d12-k)"/>
  </g>
  <rect x="250" y="160" width="180" height="30" fill="var(--good)" opacity="0.25"/>
  <g stroke="currentColor" stroke-width="1.5">
    <line x1="275" y1="20" x2="275" y2="155" marker-end="url(#d12-k)"/><line x1="315" y1="20" x2="315" y2="155" marker-end="url(#d12-k)"/>
    <line x1="355" y1="20" x2="355" y2="155" marker-end="url(#d12-k)"/><line x1="395" y1="20" x2="395" y2="155" marker-end="url(#d12-k)"/>
  </g>
  <text x="340" y="182" font-size="12" text-anchor="middle" fill="var(--good)">planet surface</text>
  <defs><marker id="d12-k" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 10 5 0 10z" fill="currentColor"/></marker></defs>
</svg>
```

- Field lines show the **direction of the force** on a mass — always towards the attracting mass.
- The **closer together** the lines, the **stronger** the field.
- Lines never cross.

```keyidea
Field strength is a vector. To find the field from two masses, add the two field vectors — at some point between Earth and Moon they cancel.
```

```example
At what height above Earth’s surface is g half its surface value? (R = 6.4 × 10⁶ m)
---
$g \propto 1/r^2$, so $r = \sqrt{2}R = 9.05\times10^6$ m. Height $= 9.05 - 6.4 = 2.65\times10^6$ m, about 2650 km.
```

```question
g-surface
```

## Summary

- Gravitational field strength $g = F/m = GM/r^2$, in N kg⁻¹.
- Field lines point towards masses; closer lines mean a stronger field.
- Near a planet’s surface the field is approximately uniform.
