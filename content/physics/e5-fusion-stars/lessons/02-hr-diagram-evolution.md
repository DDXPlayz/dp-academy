---
code: E.5.4
title: The HR diagram and stellar evolution
summary: Plotting luminosity against temperature sorts stars into families — and a star’s mass decides which path it takes through the diagram.
minutes: 30
difficulty: 2
objectives:
  - Identify the main regions of the Hertzsprung–Russell diagram and the properties of stars in each.
  - Describe the evolution of low-mass and high-mass stars after the main sequence.
  - Explain how stellar mass determines the evolutionary path and end point.
prerequisites:
  - Fusion and stellar equilibrium
  - Thermal radiation
definitions:
  - term: Luminosity
    definition: The total power radiated by a star, in watts.
  - term: Main sequence
    definition: The band on the HR diagram where stars fuse hydrogen into helium in their cores.
  - term: White dwarf
    definition: The hot, small, dense remnant core of a low-mass star after it has shed its outer layers.
  - term: Supernova
    definition: The explosive end of a high-mass star, leaving a neutron star or black hole.
mistakes:
  - Reading the temperature axis left to right as increasing. On an HR diagram temperature increases to the left.
  - Thinking massive stars live longer because they have more fuel. They burn it so fast that they live much shorter lives.
tips:
  - Top-left — hot and bright (massive main sequence). Top-right — cool and bright, so huge (giants). Bottom-left — hot and dim, so tiny (white dwarfs).
related:
  - physics/b1-thermal-energy
---

## The Hertzsprung–Russell diagram

An HR diagram plots **luminosity** (vertical, log scale) against **surface temperature** (horizontal, log scale, *decreasing* to the right).

```figure
src: physics/_sme/fusion-stars/img/fig-cfd96d811a81c2c5.png
caption: The Hertzsprung-Russell diagram: luminosity against surface temperature (falling to the right), with the main sequence, giants, supergiants and white dwarfs.
```

```svg
caption: The main regions of the HR diagram. Temperature decreases to the right; luminosity is on a logarithmic scale relative to the Sun.
<svg viewBox="0 0 420 260">
  <line x1="60" y1="230" x2="400" y2="230" stroke="currentColor" stroke-width="1.5"/><line x1="60" y1="230" x2="60" y2="20" stroke="currentColor" stroke-width="1.5"/>
  <text x="230" y="252" font-size="12" text-anchor="middle" fill="currentColor">surface temperature (decreasing →)</text>
  <text x="20" y="130" font-size="12" fill="currentColor" transform="rotate(-90 20 130)" text-anchor="middle">luminosity / L☉</text>
  <g font-size="10" fill="var(--muted)"><text x="66" y="244">30 000 K</text><text x="356" y="244">3 000 K</text><text x="34" y="34">10⁶</text><text x="40" y="132">1</text><text x="30" y="226">10⁻⁴</text></g>
  <path d="M85 40 Q 200 110 380 200" fill="none" stroke="var(--accent)" stroke-width="14" stroke-linecap="round" opacity="0.35"/>
  <text x="170" y="118" font-size="12" fill="var(--accent)">main sequence</text>
  <ellipse cx="320" cy="80" rx="45" ry="20" fill="var(--bad)" opacity="0.3"/><text x="300" y="84" font-size="12" fill="currentColor">red giants</text>
  <ellipse cx="300" cy="35" rx="60" ry="12" fill="var(--bad)" opacity="0.2"/><text x="268" y="39" font-size="11" fill="currentColor">supergiants</text>
  <ellipse cx="120" cy="200" rx="35" ry="14" fill="var(--muted)" opacity="0.4"/><text x="92" y="204" font-size="11" fill="currentColor">white dwarfs</text>
  <circle cx="235" cy="132" r="5" fill="var(--accent)"/><text x="243" y="146" font-size="11" fill="currentColor">Sun</text>
</svg>
```

| Region | Temperature | Luminosity | Size |
|---|---|---|---|
| Main sequence | All; hot at top-left, cool at bottom-right | Higher for hotter stars | Similar to the Sun |
| Red giants | Cool (~3000–5000 K) | High | Large |
| Supergiants | Cool to hot | Very high | Enormous |
| White dwarfs | Hot | Low | Tiny (Earth-sized) |

Since $L = \sigma A T^4$, a star that is cool yet bright must be **large**, and a star that is hot yet dim must be **small**.

## How mass decides a star’s fate

```keyidea
Mass is the deciding factor. More massive stars have hotter cores, fuse faster, are more luminous and live shorter lives.
```

```figure
src: physics/_iitian/stellar-evolution-extension-ib-dp-physics-study-notes/img/fig-c659a35105744ce1.png
caption: A massive star near the end of its life has an onion-like structure of fusing shells around an iron core.
```

**Low-mass stars (up to about 8 solar masses at birth, like the Sun):**

main sequence → **red giant** (hydrogen runs out in the core; helium fusion begins; outer layers swell) → outer layers drift off as a **planetary nebula** → **white dwarf**, which slowly cools.

**High-mass stars:**

main sequence → **red supergiant** (fuses successively heavier elements up to iron) → core collapses → **supernova** → **neutron star** or, for the most massive, a **black hole**.

Fusion stops at iron because iron has the highest binding energy per nucleon: fusing it would absorb energy, not release it.

```question
hr-region
```

## Summary

- HR diagram: luminosity against temperature (decreasing to the right).
- Main sequence (H fusion), red giants (cool, bright, large), white dwarfs (hot, dim, small).
- Low mass → red giant → white dwarf. High mass → supergiant → supernova → neutron star or black hole.
