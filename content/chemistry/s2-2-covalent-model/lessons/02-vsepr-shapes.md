---
code: S2.2.4
title: Shapes of molecules (VSEPR)
summary: Predicting molecular shapes and bond angles from the number of electron domains around a central atom.
minutes: 30
difficulty: 2
objectives:
  - Use VSEPR theory to predict electron domain geometry and molecular geometry for up to four electron domains.
  - Predict bond angles, including the effect of lone pairs.
definitions:
  - term: Electron domain
    definition: A region of electron density around a central atom — a lone pair, or a single, double or triple bond (each counts as one domain).
  - term: VSEPR theory
    definition: Electron domains around a central atom repel each other and arrange themselves as far apart as possible.
mistakes:
  - Counting a double bond as two domains. A multiple bond counts as one electron domain.
  - Naming the shape from electron domains. The molecular geometry describes the atoms only — H₂O has a tetrahedral electron domain geometry but is bent.
tips:
  - Lone pairs repel more strongly than bonding pairs, squeezing bond angles by about 2.5° each — 109.5° → 107° → 104.5°.
related:
  - chemistry/s2-2-covalent-model
---

## The VSEPR idea

```keyidea
Electron domains around a central atom repel one another and spread out as far as possible. Lone pairs repel more strongly than bonding pairs, so they reduce the angles between bonds.
```

```figure
src: chemistry/_iitian/ib-dp-chemistry-s2-2-4-vsepr-theory-study-notes/img/fig-39ea64d3b38be2c3.png
caption: VSEPR: the number of electron domains sets the electron-domain geometry; lone pairs change the molecular shape and squeeze the bond angles.
```

```figure
src: chemistry/_iitian/ib-dp-chemistry-s2-2-16-hybridization-and-bonding-study-note/img/fig-03d3920238dfe2af.png
caption: Methane: four bonding domains around carbon point to the corners of a tetrahedron, 109.5° apart.
```

## Shapes for 2, 3 and 4 domains

| Domains | Lone pairs | Electron domain geometry | Molecular geometry | Angle | Example |
|---|---|---|---|---|---|
| 2 | 0 | linear | linear | 180° | CO₂, BeCl₂ |
| 3 | 0 | trigonal planar | trigonal planar | 120° | BF₃, SO₃ |
| 3 | 1 | trigonal planar | bent (V-shaped) | ~117° | SO₂, O₃ |
| 4 | 0 | tetrahedral | tetrahedral | 109.5° | CH₄ |
| 4 | 1 | tetrahedral | trigonal pyramidal | ~107° | NH₃ |
| 4 | 2 | tetrahedral | bent (V-shaped) | ~104.5° | H₂O |

```figure
src: chemistry/_sme/the-covalent-model/img/fig-cb2d909b856b7ea7.png
caption: Methane and the ammonium ion both have four bonding domains, so both are tetrahedral with 109.5° bond angles.
```

```figure
src: chemistry/_sme/the-covalent-model/img/fig-23d43810f8f9d857.png
caption: Water has two bonding pairs and two lone pairs: the shape is bent, with a bond angle of about 104.5°.
```

```figure
src: chemistry/_sme/the-covalent-model/img/fig-1cadaa731f149328.png
caption: Three electron domains around the central atom give trigonal planar shapes with 120° bond angles.
```

```svg
caption: Four electron domains: methane, ammonia and water. Each lone pair squeezes the bond angle a little more.
<svg viewBox="0 0 440 170">
  <g stroke="currentColor" stroke-width="2.5">
    <line x1="70" y1="80" x2="70" y2="25"/><line x1="70" y1="80" x2="25" y2="115"/><line x1="70" y1="80" x2="115" y2="115"/><line x1="70" y1="80" x2="85" y2="125" stroke-dasharray="4 3"/>
    <line x1="220" y1="80" x2="175" y2="115"/><line x1="220" y1="80" x2="265" y2="115"/><line x1="220" y1="80" x2="235" y2="125" stroke-dasharray="4 3"/>
    <line x1="370" y1="80" x2="330" y2="120"/><line x1="370" y1="80" x2="410" y2="120"/>
  </g>
  <g fill="var(--accent)"><circle cx="70" cy="80" r="11"/><circle cx="220" cy="80" r="11"/><circle cx="370" cy="80" r="11"/></g>
  <g font-size="11" text-anchor="middle" fill="#fff"><text x="70" y="84">C</text><text x="220" y="84">N</text><text x="370" y="84">O</text></g>
  <g fill="var(--bad)" opacity="0.5"><ellipse cx="220" cy="45" rx="12" ry="18"/><ellipse cx="350" cy="48" rx="11" ry="17" transform="rotate(-25 350 48)"/><ellipse cx="390" cy="48" rx="11" ry="17" transform="rotate(25 390 48)"/></g>
  <g font-size="12" text-anchor="middle" fill="currentColor"><text x="70" y="155">CH₄ 109.5°</text><text x="220" y="155">NH₃ 107°</text><text x="370" y="155">H₂O 104.5°</text></g>
</svg>
```

## Working through an example

```example
Predict the shape and bond angle of the ammonium ion, NH₄⁺, and of sulfur dioxide, SO₂.
---
NH₄⁺: four bonding domains, no lone pairs → tetrahedral, 109.5°.

SO₂: Lewis formula O=S=O with one lone pair on S → three domains, one a lone pair → bent, slightly less than 120° (~117°).
```

```question
shape-nh3
```

## Summary

- Count electron domains (multiple bonds = 1 domain) and lone pairs on the central atom.
- 2 → linear 180°; 3 → trigonal planar 120°; 4 → tetrahedral 109.5°.
- Lone pairs reduce angles: NH₃ 107°, H₂O 104.5°.
