---
code: D.3.3
title: Forces on current-carrying conductors
summary: The motor effect on a wire in a magnetic field, and the forces between two parallel currents.
minutes: 25
difficulty: 2
objectives:
  - Use F = BIL sinθ for a current-carrying wire in a magnetic field.
  - Determine the direction of the force using a right-hand rule.
  - Calculate the force per unit length between two parallel wires, F/L = μ₀I₁I₂/2πr.
  - Explain why parallel currents attract and antiparallel currents repel.
prerequisites:
  - Charged particles in magnetic fields
formulas:
  - name: Force on a wire
    latex: 'F = BIL\sin\theta'
  - name: Force per unit length between parallel wires
    latex: '\frac{F}{L} = \frac{\mu_0 I_1 I_2}{2\pi r}'
definitions:
  - term: Motor effect
    definition: The force on a current-carrying conductor placed in a magnetic field.
  - term: Permeability of free space
    definition: The constant μ₀ = 4π × 10⁻⁷ T m A⁻¹ that sets the strength of magnetic fields produced by currents in a vacuum.
mistakes:
  - Thinking parallel currents repel by analogy with like charges. Currents in the same direction attract.
  - Using the whole wire length when only part of it is inside the field — L is the length in the field.
tips:
  - A wire parallel to the field feels no force (sin 0° = 0).
  - Newton’s third law — the two parallel wires exert equal and opposite forces even if their currents differ.
related:
  - physics/d2-em-fields
  - physics/d4-induction
---

## The motor effect

A current is a flow of moving charges, so a wire carrying current in a magnetic field feels a force. For a length $L$ of wire at angle $\theta$ to the field:

```figure
src: physics/_iitian/motion-in-an-electric-field-ib-dp-physics-study-notes/img/fig-480e3819ad353736.png
caption: The right-hand rule relates the directions of the velocity v, the magnetic field B and the force F on a moving positive charge.
```

$$
F = BIL\sin\theta
$$

The force is perpendicular to both the wire and the field. Use the same right-hand rule as for a positive charge, with the thumb along the conventional current.

```example
A 0.25 m length of wire carries 3.0 A at right angles to a 0.40 T field. Find the force on it.
---
$F = BIL = 0.40\times3.0\times0.25 = 0.30$ N.
```

This force drives electric motors: a coil in a magnetic field feels forces in opposite directions on its two sides, producing a turning effect.

## Parallel wires

Each current-carrying wire sits in the magnetic field of the other, so the two wires push or pull on each other. The force per unit length is

```figure
src: physics/_sme/motion-in-electromagnetic-fields/img/fig-eb7c6611f27162d1.png
caption: Parallel wires: currents in the same direction attract, currents in opposite directions repel.
```

```figure
src: physics/_sme/motion-in-electromagnetic-fields/img/fig-7111e8589722b3f1.png
caption: Each wire sits in the magnetic field of the other, so each experiences a force; by Newton's third law the forces are equal and opposite.
```

$$
\frac{F}{L} = \frac{\mu_0 I_1 I_2}{2\pi r}, \qquad \mu_0 = 4\pi\times10^{-7}\ \text{T m A}^{-1}
$$

```svg
caption: Currents in the same direction attract; currents in opposite directions repel.
<svg viewBox="0 0 420 170">
  <g stroke="currentColor" stroke-width="3"><line x1="50" y1="30" x2="50" y2="140"/><line x1="130" y1="30" x2="130" y2="140"/><line x1="290" y1="30" x2="290" y2="140"/><line x1="370" y1="30" x2="370" y2="140"/></g>
  <g stroke="var(--accent)" stroke-width="2">
    <line x1="50" y1="80" x2="50" y2="40" marker-end="url(#d33-a)"/><line x1="130" y1="80" x2="130" y2="40" marker-end="url(#d33-a)"/>
    <line x1="290" y1="80" x2="290" y2="40" marker-end="url(#d33-a)"/><line x1="370" y1="40" x2="370" y2="80" marker-end="url(#d33-a)"/>
  </g>
  <g stroke="var(--bad)" stroke-width="2">
    <line x1="54" y1="110" x2="80" y2="110" marker-end="url(#d33-r)"/><line x1="126" y1="110" x2="100" y2="110" marker-end="url(#d33-r)"/>
    <line x1="286" y1="110" x2="260" y2="110" marker-end="url(#d33-r)"/><line x1="374" y1="110" x2="400" y2="110" marker-end="url(#d33-r)"/>
  </g>
  <text x="90" y="160" font-size="13" text-anchor="middle" fill="currentColor">same direction: attract</text>
  <text x="330" y="160" font-size="13" text-anchor="middle" fill="currentColor">opposite: repel</text>
  <defs>
    <marker id="d33-a" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 10 5 0 10z" fill="var(--accent)"/></marker>
    <marker id="d33-r" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 10 5 0 10z" fill="var(--bad)"/></marker>
  </defs>
</svg>
```

```keyidea
Parallel currents attract; antiparallel currents repel — the opposite of the rule for charges. The forces on the two wires are equal and opposite (Newton’s third law), whatever the two currents are.
```

```example
Two long parallel wires 5.0 cm apart carry 10 A and 20 A in the same direction. Find the force per metre between them.
---
$\dfrac{F}{L} = \dfrac{4\pi\times10^{-7}\times10\times20}{2\pi\times0.050} = 8.0\times10^{-4}$ N m⁻¹, attractive.
```

```question
wire-force
```

## Summary

- Force on a wire: $F = BIL\sin\theta$, perpendicular to wire and field.
- Parallel wires: $F/L = \mu_0I_1I_2/2\pi r$; same direction attract, opposite repel.
