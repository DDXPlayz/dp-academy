---
code: D.3.2
title: Charged particles in magnetic fields
summary: The magnetic force on a moving charge, why it produces circular motion, and how crossed electric and magnetic fields select a single speed.
minutes: 30
difficulty: 3
objectives:
  - Use F = qvB sinθ and find the direction of the force.
  - Explain why a charge moving perpendicular to a uniform magnetic field moves in a circle.
  - Derive and use r = mv/qB.
  - Explain how perpendicular electric and magnetic fields act as a velocity selector.
prerequisites:
  - Circular motion
  - Magnetic field lines
formulas:
  - name: Force on a moving charge
    latex: 'F = qvB\sin\theta'
  - name: Radius of circular path
    latex: 'r = \frac{mv}{qB}'
  - name: Velocity selector
    latex: 'v = \frac{E}{B}'
definitions:
  - term: Tesla
    definition: The unit of magnetic flux density; a field of 1 T exerts 1 N on a 1 C charge moving at 1 m s⁻¹ perpendicular to it.
  - term: Velocity selector
    definition: Perpendicular electric and magnetic fields that let only particles with v = E/B pass undeflected.
mistakes:
  - Saying the magnetic force speeds a particle up. It is always perpendicular to the velocity, so it does no work and the speed stays the same.
  - Forgetting to reverse the direction for negative charges when using the right-hand rule.
  - Expecting a force on a charge moving parallel to the field — sin 0° = 0, so there is none.
tips:
  - Right-hand slap rule — fingers along B, thumb along v (for a positive charge), palm pushes in the direction of F.
  - The period T = 2πm/qB does not depend on speed — faster particles move in bigger circles but take the same time.
related:
  - physics/a2-forces-momentum
  - physics/d2-em-fields
---

## The magnetic force on a moving charge

A charge $q$ moving at speed $v$ at angle $\theta$ to a magnetic field $B$ feels a force

```figure
src: physics/_sme/motion-in-electromagnetic-fields/img/fig-f7b6242dab5948d2.png
caption: Positive and negative charges moving through the same magnetic field are pushed in opposite directions.
```

$$
F = qvB\sin\theta
$$

- Maximum when the charge moves perpendicular to the field ($\theta = 90^\circ$).
- Zero when it moves parallel to the field.
- A stationary charge feels **no** magnetic force.

The force is perpendicular to **both** $v$ and $B$. For a positive charge, use the right-hand rule: fingers along $B$, thumb along $v$, and the palm pushes in the direction of $F$. For a negative charge, the force is the other way.

## Circular motion

```svg
caption: A positive charge in a field into the page (×). The force is always towards the centre, so the path is a circle.
<svg viewBox="0 0 320 220">
  <g fill="var(--muted)" font-size="14" text-anchor="middle">
    <text x="40" y="40">×</text><text x="100" y="40">×</text><text x="160" y="40">×</text><text x="220" y="40">×</text><text x="280" y="40">×</text>
    <text x="40" y="110">×</text><text x="280" y="110">×</text>
    <text x="40" y="180">×</text><text x="100" y="180">×</text><text x="220" y="180">×</text><text x="280" y="180">×</text>
  </g>
  <circle cx="160" cy="110" r="70" fill="none" stroke="var(--accent)" stroke-width="2"/>
  <circle cx="160" cy="180" r="6" fill="var(--bad)"/>
  <line x1="166" y1="180" x2="226" y2="180" stroke="currentColor" stroke-width="2" marker-end="url(#d32-k)"/><text x="230" y="200" font-size="13" fill="currentColor">v</text>
  <line x1="160" y1="174" x2="160" y2="130" stroke="var(--bad)" stroke-width="2" marker-end="url(#d32-r)"/><text x="166" y="148" font-size="13" fill="var(--bad)">F</text>
  <defs>
    <marker id="d32-k" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 10 5 0 10z" fill="currentColor"/></marker>
    <marker id="d32-r" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 10 5 0 10z" fill="var(--bad)"/></marker>
  </defs>
</svg>
```

```figure
src: physics/_sme/motion-in-electromagnetic-fields/img/fig-c8e974e635c57afe.png
caption: The magnetic force is always perpendicular to the velocity, so it does no work and the charge moves in a circle.
```

```figure
src: physics/_sme/motion-in-electromagnetic-fields/img/fig-1c9aa053fd24f7d9.png
caption: An electron beam entering a magnetic field directed into the page is bent into a circular arc.
```

```keyidea
The magnetic force is always at right angles to the velocity. It changes the particle’s direction but never its speed — so it does no work, and it supplies exactly the centripetal force for uniform circular motion.
```

Setting the magnetic force equal to the centripetal force:

$$
qvB = \frac{mv^2}{r} \quad\Rightarrow\quad r = \frac{mv}{qB}
$$

Faster or heavier particles make bigger circles; stronger fields or larger charges make smaller ones. The period is $T = 2\pi r/v = 2\pi m/qB$, independent of speed.

```example
An electron moves at 4.0 × 10⁶ m s⁻¹ perpendicular to a 2.0 mT field. Find the radius of its path.
---
$r = \dfrac{mv}{qB} = \dfrac{9.11\times10^{-31}\times4.0\times10^6}{1.60\times10^{-19}\times2.0\times10^{-3}} = 1.1\times10^{-2}$ m.
```

## Crossed fields: the velocity selector

Put a uniform electric field and a uniform magnetic field at right angles to each other and to the particle’s motion. The electric force $qE$ and magnetic force $qvB$ act in opposite directions. They balance when

```figure
src: physics/_sme/motion-in-electromagnetic-fields/img/fig-c88714d37610c3f4.png
caption: The motor effect: a copper rod carrying a current in a magnetic field experiences a force and rolls along the rails.
```

$$
qE = qvB \quad\Rightarrow\quad v = \frac{E}{B}
$$

Only particles with exactly this speed pass straight through, whatever their charge or mass. Faster ones are deflected by the stronger magnetic force; slower ones by the electric force.

```question
radius-proton
```

## Summary

- $F = qvB\sin\theta$, perpendicular to $v$ and $B$; zero for charges at rest or moving along the field.
- Perpendicular entry gives circular motion with $r = mv/qB$; speed is unchanged.
- Crossed fields select $v = E/B$.
