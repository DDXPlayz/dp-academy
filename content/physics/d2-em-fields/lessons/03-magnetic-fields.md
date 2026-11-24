---
code: D.2.3
title: Magnetic field lines
summary: The field patterns of bar magnets, straight wires, coils and solenoids — and the rules for working out their directions.
minutes: 20
difficulty: 1
objectives:
  - Draw the magnetic field patterns of a bar magnet, a straight current-carrying wire, a flat coil and a solenoid.
  - Use the right-hand grip rule to find field direction.
  - Relate field line density to magnetic field strength.
prerequisites:
  - Current
definitions:
  - term: Magnetic field line
    definition: A line showing the direction a small north pole would be pushed; outside a magnet, lines run from north to south.
  - term: Solenoid
    definition: A long coil of wire; when it carries a current its field inside is strong and nearly uniform.
  - term: Magnetic flux density
    definition: The strength of a magnetic field, B, measured in tesla (T).
mistakes:
  - Drawing magnetic field lines that start or stop. They form closed loops — inside a magnet they run from S back to N.
  - Using the left hand for the grip rule. The grip rule is right-handed.
tips:
  - Right-hand grip rule — thumb along the current, curled fingers show the field direction around the wire.
  - For a solenoid, curl your right fingers in the direction of the current in the turns; your thumb points to the north end.
related:
  - physics/d3-motion-in-fields
---

## Magnetic fields

Magnets and electric currents create **magnetic fields**. We show them with field lines:

- the direction of a line is the direction a small **north** pole would be pushed;
- outside a magnet, lines go from **N to S**;
- magnetic field lines are **closed loops** — they never begin or end;
- closer lines mean a stronger field (greater magnetic flux density $B$, in tesla).

## Field patterns

```svg
caption: Field patterns — bar magnet (left) and the circular field around a straight wire carrying current out of the page (right, ⊙).
<svg viewBox="0 0 440 200">
  <rect x="60" y="85" width="50" height="30" fill="var(--bad)" opacity="0.7"/><rect x="110" y="85" width="50" height="30" fill="var(--accent)" opacity="0.7"/>
  <text x="85" y="105" font-size="14" text-anchor="middle" fill="#fff">N</text><text x="135" y="105" font-size="14" text-anchor="middle" fill="#fff">S</text>
  <g fill="none" stroke="currentColor" stroke-width="1.5">
    <path d="M60 92 Q 110 30 160 92" marker-mid="url(#d23-k)"/><path d="M60 108 Q 110 170 160 108"/>
    <path d="M60 88 Q 110 0 160 88"/><path d="M60 112 Q 110 200 160 112"/>
  </g>
  <path d="M108 61 l6 0" stroke="currentColor" marker-end="url(#d23-k)"/>
  <path d="M108 139 l6 0" stroke="currentColor" marker-end="url(#d23-k)"/>
  <circle cx="330" cy="100" r="8" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="330" cy="100" r="2" fill="currentColor"/>
  <g fill="none" stroke="var(--accent)" stroke-width="1.5">
    <circle cx="330" cy="100" r="30"/><circle cx="330" cy="100" r="55"/><circle cx="330" cy="100" r="80"/>
  </g>
  <path d="M300 97 l0 -6" stroke="var(--accent)" stroke-width="2" marker-end="url(#d23-a)"/>
  <path d="M275 97 l0 -6" stroke="var(--accent)" stroke-width="2" marker-end="url(#d23-a)"/>
  <text x="330" y="196" font-size="12" text-anchor="middle" fill="currentColor">anticlockwise (seen from above)</text>
  <defs>
    <marker id="d23-k" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 10 5 0 10z" fill="currentColor"/></marker>
    <marker id="d23-a" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 10 5 0 10z" fill="var(--accent)"/></marker>
  </defs>
</svg>
```

- **Bar magnet:** lines leave the north pole and curve round into the south pole; strongest near the poles.
- **Straight wire:** concentric circles around the wire, weaker further away.
- **Flat coil:** like a short bar magnet, with lines threading through the centre of the coil.
- **Solenoid:** a **uniform** field inside (parallel, evenly spaced lines) and a bar-magnet-like field outside.

## Right-hand grip rule

```keyidea
Grip the wire with your right hand, thumb pointing along the conventional current. Your fingers curl in the direction of the magnetic field. For a solenoid, curl your fingers along the current in the turns and your thumb points to the north end.
```

```example
A vertical wire carries current upwards. Looking down from above, which way does its magnetic field circulate?
---
Thumb pointing up: the fingers curl **anticlockwise** when viewed from above.
```

```question
grip-rule
```

## Summary

- Magnetic field lines show the force on a north pole; they run N → S outside a magnet and form closed loops.
- Straight wire: circular field; solenoid: uniform field inside.
- Right-hand grip rule gives the field direction around a current.
