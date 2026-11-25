---
code: D.4.2
title: Lenz’s law
summary: The direction of an induced current — always the one that opposes the change causing it — and why that is energy conservation in disguise.
minutes: 20
difficulty: 3
hl: true
objectives:
  - State Lenz’s law and relate it to the minus sign in Faraday’s law.
  - Use Lenz’s law to predict the direction of induced currents.
  - Explain Lenz’s law in terms of conservation of energy.
prerequisites:
  - Magnetic flux and Faraday’s law
definitions:
  - term: Lenz’s law
    definition: The induced emf drives a current in a direction that opposes the change in flux that produced it.
  - term: Eddy currents
    definition: Loops of induced current in a solid conductor moving through, or sitting in, a changing magnetic field.
mistakes:
  - Saying the induced current opposes the flux. It opposes the change in flux — if the flux is falling, the induced field tries to keep it up.
tips:
  - Ask three questions — which way is the flux? Is it increasing or decreasing? Which way must the induced field point to fight that change? Then use the grip rule.
related:
  - physics/d3-motion-in-fields
  - physics/a3-work-energy-power
---

## The direction of the induced current

```keyidea
Lenz’s law: the induced current flows in the direction that opposes the change in flux that caused it. This is the meaning of the minus sign in ε = −NΔΦ/Δt.
```

## Using Lenz’s law

```svg
caption: Pushing a north pole into a coil. The induced current makes the near end of the coil a north pole, which repels the approaching magnet.
<svg viewBox="0 0 420 160">
  <rect x="20" y="65" width="50" height="30" fill="var(--bad)" opacity="0.75"/><rect x="70" y="65" width="50" height="30" fill="var(--accent)" opacity="0.75"/>
  <text x="45" y="85" font-size="13" text-anchor="middle" fill="#fff">S</text><text x="95" y="85" font-size="13" text-anchor="middle" fill="#fff">N</text>
  <line x1="60" y1="120" x2="120" y2="120" stroke="currentColor" stroke-width="2" marker-end="url(#d42-k)"/><text x="60" y="140" font-size="12" fill="currentColor">magnet moves in</text>
  <g fill="none" stroke="currentColor" stroke-width="2">
    <ellipse cx="190" cy="80" rx="10" ry="40"/><ellipse cx="215" cy="80" rx="10" ry="40"/><ellipse cx="240" cy="80" rx="10" ry="40"/><ellipse cx="265" cy="80" rx="10" ry="40"/><ellipse cx="290" cy="80" rx="10" ry="40"/>
  </g>
  <text x="170" y="30" font-size="13" fill="var(--accent)">N</text>
  <text x="300" y="30" font-size="13" fill="var(--bad)">S</text>
  <text x="310" y="110" font-size="12" fill="var(--accent)">induced field</text>
  <line x1="300" y1="80" x2="170" y2="80" stroke="var(--accent)" stroke-width="2" stroke-dasharray="5 4" marker-end="url(#d42-a)"/>
  <defs>
    <marker id="d42-k" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 10 5 0 10z" fill="currentColor"/></marker>
    <marker id="d42-a" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 10 5 0 10z" fill="var(--accent)"/></marker>
  </defs>
</svg>
```

```figure
src: physics/_sme/induction/img/fig-6125ad112dd884f1.png
caption: The induced current makes the coil's end into a pole that opposes the approaching magnet (Lenz's law).
```

1. **Which way is the flux?** The magnet’s field points out of its north pole, into the coil.
2. **Is it changing?** The magnet is approaching, so the flux is **increasing**.
3. **Oppose the change:** the coil’s own field must point the other way — its near end becomes a **north** pole, repelling the magnet.
4. **Grip rule** gives the current direction in the turns.

Pull the magnet out and everything reverses: the near end becomes a south pole, attracting the retreating magnet.

```example
A loop lies flat on a table in a field pointing upwards. The field strength is decreasing. Viewed from above, which way does the induced current flow?
---
Upward flux is decreasing, so the induced field must point **upwards** to top it up. By the grip rule, an upward field inside the loop needs an **anticlockwise** current seen from above.
```

## Why it must be so: energy

If the induced current helped the change instead, the magnet would be pulled in faster, inducing a bigger current, pulling harder still — energy from nothing. Lenz’s law guarantees you have to **do work** to induce a current, and that work becomes the electrical energy in the circuit.

```figure
src: physics/_sme/induction/img/fig-c1ae4c1053abe6b5.png
caption: Pushing a magnet into a coil changes the flux linkage and induces an emf, which the voltmeter shows.
```

```figure
src: physics/_sme/induction/img/fig-07770e559c3cd395.png
caption: When the field through a coil increases, the induced current produces a field that opposes the increase.
```

The same idea explains **eddy current braking**: a metal plate moving through a magnetic field has currents induced in it, and their forces oppose the motion, converting kinetic energy into internal energy.

```question
lenz-pole
```

## Summary

- Lenz: induced current opposes the **change** in flux — the minus sign in Faraday’s law.
- Find the flux direction, decide whether it is rising or falling, oppose it, then use the grip rule.
- Lenz’s law is a consequence of energy conservation.
