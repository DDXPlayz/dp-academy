---
code: C.3.3
title: Superposition and double-slit interference
summary: When waves overlap their displacements add — giving bright and dark fringes, and a way to measure the wavelength of light.
minutes: 30
difficulty: 2
objectives:
  - Apply the principle of superposition to waves and pulses.
  - Explain why interference needs coherent sources.
  - Use the path-difference conditions for constructive and destructive interference.
  - Use the double-slit equation s = λD/d.
prerequisites:
  - Diffraction
  - Phase
formulas:
  - name: Constructive interference
    latex: '\text{path difference} = n\lambda'
  - name: Destructive interference
    latex: '\text{path difference} = \left(n + \tfrac{1}{2}\right)\lambda'
  - name: Double-slit fringe spacing
    latex: 's = \frac{\lambda D}{d}'
    where: d is the slit separation and D the distance from the slits to the screen.
definitions:
  - term: Principle of superposition
    definition: When two or more waves meet, the resultant displacement at any point is the vector sum of their individual displacements.
  - term: Coherent sources
    definition: Sources that have the same frequency and a constant phase difference.
mistakes:
  - Mixing up d (slit separation) and D (slit-to-screen distance) in s = λD/d.
  - Trying to get interference from two separate light bulbs. Their phase relationship changes randomly, so they are not coherent.
tips:
  - Measure across several fringes and divide, to reduce the uncertainty in s.
  - Path difference is a distance; convert it into a number of wavelengths to decide constructive or destructive.
related:
  - physics/c3-wave-phenomena
  - physics/c4-standing-waves
---

## Superposition

When two waves (or pulses) overlap, the displacement at each point is the **sum** of the individual displacements. This is the **principle of superposition**. After passing through each other the waves carry on unchanged.

```figure
src: physics/_sme/wave-phenomena/img/fig-fe450ee4a27f16bd.png
caption: Two pulses meeting: their displacements add (superposition), then they pass through each other unchanged.
```

- Two crests meeting give a bigger crest: **constructive** interference.
- A crest meeting a trough of equal size gives zero: **destructive** interference.

## Coherent sources

A steady interference pattern only forms if the sources are **coherent**: same frequency and a **constant phase difference**. Two separate lamps are not coherent. Shining one source through two slits makes the two slits coherent, because both are fed by the same wavefronts.

```figure
src: physics/_sme/wave-phenomena/img/fig-7cdc53be043c7a71.png
caption: Coherent sources have the same frequency and a constant phase difference; sources whose phase difference keeps changing are not coherent.
```

## Path difference

At a point P, waves from two coherent sources (in phase with each other) have travelled distances $S_1P$ and $S_2P$. Their **path difference** decides what happens:

```figure
src: physics/_sme/wave-phenomena/img/fig-e0e54facb31eea8b.png
caption: A path difference of a whole number of wavelengths gives constructive interference; a half-wavelength odd multiple gives destructive interference.
```

$$
\text{constructive: } \Delta = n\lambda \qquad \text{destructive: } \Delta = \left(n + \tfrac{1}{2}\right)\lambda
$$

where $n = 0, 1, 2, \dots$

```example
Two loudspeakers, driven in phase, emit sound of wavelength 0.40 m. A point is 3.2 m from one speaker and 3.8 m from the other. Is the sound loud or quiet there?
---
Path difference $= 0.60$ m $= 1.5\lambda = (1 + \tfrac{1}{2})\lambda$. The waves arrive in antiphase: destructive interference, so the sound is quiet.
```

## Young’s double-slit experiment

Light passes through two narrow slits a distance $d$ apart. The diffracted beams overlap on a screen a distance $D$ away and form a pattern of equally spaced bright and dark **fringes**, with spacing

```figure
src: physics/_sme/wave-phenomena/img/fig-7b36676e02f0fb5b.png
caption: Young's double-slit experiment: light from a single slit illuminates two slits, and an interference pattern of fringes forms on the screen.
```

```figure
src: physics/_sme/wave-phenomena/img/fig-ba063e4294d7a469.png
caption: Waves from two coherent slits overlap: bright fringes where crests meet crests, dark fringes where crests meet troughs.
```

$$
s = \frac{\lambda D}{d}
$$

```svg
caption: Double-slit set-up (not to scale). Bright fringes appear where the path difference is a whole number of wavelengths.
<svg viewBox="0 0 440 220">
  <line x1="120" y1="20" x2="120" y2="96" stroke="currentColor" stroke-width="5"/>
  <line x1="120" y1="104" x2="120" y2="116" stroke="currentColor" stroke-width="5"/>
  <line x1="120" y1="124" x2="120" y2="200" stroke="currentColor" stroke-width="5"/>
  <text x="96" y="104" font-size="11" text-anchor="end" fill="var(--muted)">S₁</text>
  <text x="96" y="128" font-size="11" text-anchor="end" fill="var(--muted)">S₂</text>
  <line x1="20" y1="110" x2="110" y2="110" stroke="var(--warn)" stroke-width="2.5" marker-end="url(#c33-w)"/>
  <text x="20" y="100" font-size="11" fill="var(--warn)">monochromatic light</text>
  <line x1="380" y1="20" x2="380" y2="200" stroke="currentColor" stroke-width="2"/>
  <g fill="var(--warn)">
    <rect x="382" y="104" width="22" height="12"/><rect x="382" y="74" width="22" height="12" opacity="0.8"/><rect x="382" y="134" width="22" height="12" opacity="0.8"/>
    <rect x="382" y="44" width="22" height="12" opacity="0.6"/><rect x="382" y="164" width="22" height="12" opacity="0.6"/>
  </g>
  <line x1="410" y1="110" x2="410" y2="80" stroke="var(--accent)" marker-start="url(#c33-d)" marker-end="url(#c33-d)"/>
  <text x="416" y="98" font-size="12" fill="var(--accent)">s</text>
  <line x1="120" y1="210" x2="380" y2="210" stroke="var(--muted)" marker-start="url(#c33-m)" marker-end="url(#c33-m)"/>
  <text x="250" y="206" font-size="12" text-anchor="middle" fill="var(--muted)">D</text>
  <text x="132" y="113" font-size="12" fill="var(--muted)">d</text>
  <defs>
    <marker id="c33-w" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 10 5 0 10z" fill="var(--warn)"/></marker>
    <marker id="c33-d" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0 0 10 5 0 10z" fill="var(--accent)"/></marker>
    <marker id="c33-m" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0 0 10 5 0 10z" fill="var(--muted)"/></marker>
  </defs>
</svg>
```

```keyidea
Fringes get further apart with longer wavelength, a more distant screen, or slits closer together. Red light gives wider fringes than blue.
```

```example
Light of wavelength 600 nm passes through slits 0.30 mm apart onto a screen 2.0 m away. Find the fringe spacing.
---
$s = \dfrac{\lambda D}{d} = \dfrac{600\times10^{-9} \times 2.0}{0.30\times10^{-3}} = 4.0\times10^{-3}$ m $= 4.0$ mm.
```

```question
fringe-spacing
```

## Summary

- Superposition: displacements add where waves overlap.
- A stable interference pattern needs coherent sources.
- Constructive: path difference $n\lambda$; destructive: $(n + \tfrac{1}{2})\lambda$.
- Double slit: $s = \lambda D/d$.
