---
code: D.2.2
title: Electric fields and field lines
summary: The space around a charge, the force per unit charge in it, and the uniform field between two parallel plates.
minutes: 25
difficulty: 2
objectives:
  - Define electric field strength, E = F/q.
  - Calculate the field of a point charge.
  - Draw electric field lines for point charges and parallel plates and relate line density to field strength.
  - Use E = V/d for the uniform field between parallel plates.
prerequisites:
  - Coulomb’s law
formulas:
  - name: Electric field strength
    latex: 'E = \frac{F}{q}'
  - name: Field of a point charge
    latex: 'E = \frac{kQ}{r^2}'
  - name: Uniform field between parallel plates
    latex: 'E = \frac{V}{d}'
definitions:
  - term: Electric field strength
    definition: The force per unit charge on a small positive test charge placed at a point, in N C⁻¹ (equivalent to V m⁻¹).
  - term: Electric field line
    definition: A line showing the direction of the force on a small positive charge; lines start on positive and end on negative charges.
mistakes:
  - Drawing field lines from negative to positive. They point the way a positive test charge would be pushed — away from + and towards −.
  - Using E = V/d for a point charge. It only applies to the uniform field between parallel plates.
tips:
  - The field between parallel plates is the same everywhere between them (except near the edges), so a charge there feels a constant force.
  - Field lines meet conductor surfaces at right angles.
related:
  - physics/d2-em-fields
  - physics/d3-motion-in-fields
---

## Electric field strength

A charge creates an **electric field** in the space around it. The **electric field strength** at a point is the force per unit charge on a small positive test charge placed there:

```figure
src: physics/_sme/electric-magnetic-fields/img/fig-890969ac49ac785a.png
caption: Field lines between two like charges: they repel, and there is a neutral point midway where the field is zero.
```

$$
E = \frac{F}{q}
$$

For a point charge $Q$:

$$
E = \frac{kQ}{r^2}
$$

The field is a vector: it points away from positive charges and towards negative ones.

```example
Find the field strength 0.020 m from a +5.0 nC point charge, and the force on an electron placed there.
---
$E = \dfrac{8.99\times10^9 \times 5.0\times10^{-9}}{0.020^2} = 1.1\times10^5$ N C⁻¹, pointing away from the charge.

$F = qE = 1.60\times10^{-19} \times 1.1\times10^5 = 1.8\times10^{-14}$ N, towards the charge (the electron is negative).
```

## Field lines

```svg
caption: Field lines for a positive and a negative charge (left) and between parallel plates (right). Lines go from + to −; between the plates they are parallel and evenly spaced — a uniform field.
<svg viewBox="0 0 440 200">
  <circle cx="60" cy="100" r="12" fill="var(--bad)" opacity="0.8"/><text x="60" y="105" font-size="14" text-anchor="middle" fill="#fff">+</text>
  <circle cx="200" cy="100" r="12" fill="var(--accent)" opacity="0.8"/><text x="200" y="105" font-size="14" text-anchor="middle" fill="#fff">−</text>
  <g fill="none" stroke="currentColor" stroke-width="1.5">
    <line x1="72" y1="100" x2="188" y2="100" marker-end="url(#d22-k)"/>
    <path d="M70 92 Q 130 50 190 92" marker-end="url(#d22-k)"/><path d="M70 108 Q 130 150 190 108" marker-end="url(#d22-k)"/>
    <path d="M66 89 Q 130 10 194 89" marker-end="url(#d22-k)"/><path d="M66 111 Q 130 190 194 111" marker-end="url(#d22-k)"/>
  </g>
  <rect x="270" y="30" width="6" height="140" fill="var(--bad)"/><text x="262" y="24" font-size="14" fill="var(--bad)">+</text>
  <rect x="404" y="30" width="6" height="140" fill="var(--accent)"/><text x="402" y="24" font-size="14" fill="var(--accent)">−</text>
  <g stroke="currentColor" stroke-width="1.5">
    <line x1="278" y1="50" x2="400" y2="50" marker-end="url(#d22-k)"/><line x1="278" y1="80" x2="400" y2="80" marker-end="url(#d22-k)"/>
    <line x1="278" y1="110" x2="400" y2="110" marker-end="url(#d22-k)"/><line x1="278" y1="140" x2="400" y2="140" marker-end="url(#d22-k)"/>
  </g>
  <defs><marker id="d22-k" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 10 5 0 10z" fill="currentColor"/></marker></defs>
</svg>
```

- Lines start on positive charges and end on negative charges.
- The **density** of lines shows the field strength — closer lines, stronger field.
- Lines never cross.

## The uniform field between parallel plates

Two parallel plates with potential difference $V$ and separation $d$ produce a **uniform** field between them:

```figure
src: physics/_sme/electric-magnetic-fields/img/fig-7041e056b3367932.png
caption: Between parallel plates the field is uniform (evenly spaced, parallel lines) except near the edges.
```

$$
E = \frac{V}{d}
$$

So field strength can be given in V m⁻¹ as well as N C⁻¹.

```keyidea
A uniform field exerts the same force on a charge everywhere between the plates. A charged particle there accelerates uniformly — just like a mass in a uniform gravitational field.
```

```example
Plates 4.0 mm apart have a p.d. of 2000 V across them. Find the field strength and the force on a proton between them.
---
$E = V/d = 2000/4.0\times10^{-3} = 5.0\times10^5$ V m⁻¹.

$F = qE = 1.60\times10^{-19} \times 5.0\times10^5 = 8.0\times10^{-14}$ N.
```

```question
plates-field
```

## Summary

- $E = F/q$ (N C⁻¹); for a point charge $E = kQ/r^2$.
- Field lines run from + to −; denser lines mean a stronger field.
- Between parallel plates the field is uniform: $E = V/d$.
