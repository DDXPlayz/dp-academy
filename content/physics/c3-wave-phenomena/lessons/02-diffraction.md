---
code: C.3.2
title: Diffraction
summary: Waves spread round obstacles and through gaps — most strongly when the gap is about the same size as the wavelength.
minutes: 20
difficulty: 1
objectives:
  - Describe diffraction of waves around an obstacle and through an aperture.
  - Explain how the amount of diffraction depends on wavelength and gap width.
  - Draw wavefront diagrams showing diffraction.
prerequisites:
  - Wavefronts and rays
definitions:
  - term: Diffraction
    definition: The spreading of a wave as it passes through an aperture or around the edge of an obstacle.
mistakes:
  - Drawing a change of wavelength after a gap. Diffraction changes direction, not speed, so the wavelength stays the same.
  - Saying diffraction only happens when the gap equals the wavelength. It always happens; it is just most noticeable then.
tips:
  - In diagrams keep the spacing between wavefronts the same before and after the gap.
  - Sound diffracts easily around doorways because its wavelength (about 1 m) is similar to the gap; light, with λ ≈ 500 nm, barely does.
related:
  - physics/c3-wave-phenomena
---

## Waves spread out

When a wave passes through a gap or past the edge of an obstacle, it spreads into the region behind — the **geometric shadow**. This spreading is **diffraction**, and it happens to all waves: water ripples, sound, light and even electrons.

```figure
src: physics/_sme/wave-phenomena/img/fig-bd1f34fcb2fc1c94.png
caption: Diffraction is most noticeable when the gap is about the same size as the wavelength.
```

```svg
caption: Plane waves passing through a wide gap (left) barely spread; through a gap about one wavelength wide (right) they spread into near-circular wavefronts. The wavelength is unchanged.
<svg viewBox="0 0 440 200">
  <g stroke="var(--accent)" stroke-width="2" fill="none">
    <line x1="20" y1="30" x2="20" y2="170"/><line x1="40" y1="30" x2="40" y2="170"/><line x1="60" y1="30" x2="60" y2="170"/>
    <line x1="230" y1="30" x2="230" y2="170"/><line x1="250" y1="30" x2="250" y2="170"/><line x1="270" y1="30" x2="270" y2="170"/>
  </g>
  <g stroke="currentColor" stroke-width="5">
    <line x1="80" y1="10" x2="80" y2="45"/><line x1="80" y1="155" x2="80" y2="190"/>
    <line x1="290" y1="10" x2="290" y2="88"/><line x1="290" y1="112" x2="290" y2="190"/>
  </g>
  <g stroke="var(--accent)" stroke-width="2" fill="none">
    <path d="M100 48 Q 104 100 100 152"/><path d="M120 50 Q 128 100 120 150"/><path d="M140 54 Q 152 100 140 146"/><path d="M160 60 Q 176 100 160 140"/>
    <path d="M300 92 A20 20 0 0 1 300 108"/><path d="M290 80 A20 20 0 0 1 290 120" transform="translate(16 0)"/>
    <path d="M318 70 A30 30 0 0 1 318 130"/><path d="M336 58 A44 44 0 0 1 336 142"/><path d="M354 46 A58 58 0 0 1 354 154"/>
  </g>
  <text x="110" y="196" font-size="12" text-anchor="middle" fill="currentColor">gap ≫ λ: little spreading</text>
  <text x="340" y="196" font-size="12" text-anchor="middle" fill="currentColor">gap ≈ λ: strong spreading</text>
</svg>
```

## How much diffraction?

The key comparison is between the **wavelength** $\lambda$ and the **size of the gap or obstacle** $b$:

```figure
src: physics/_iitian/single-slit-diffraction-ib-dp-physics-study-notes/img/fig-73064740bc1c9481.png
caption: As the gap b narrows towards λ, the waves spread out more after passing through it.
```

- if $b \gg \lambda$, the wave passes through with only slight spreading at the edges;
- if $b \approx \lambda$, the wave spreads out strongly, almost in semicircles;
- if $b < \lambda$, the gap acts almost like a point source.

```keyidea
Diffraction is most noticeable when the gap or obstacle is about the same size as the wavelength. It changes the direction of the wave, never its wavelength, frequency or speed.
```

```example
Explain why you can hear someone talking round a corner but not see them.
---
Speech has wavelengths of roughly 0.3 m to 3 m, similar to the width of a doorway, so sound diffracts strongly round it. Light has wavelengths around 5 × 10⁻⁷ m, millions of times smaller than the doorway, so it diffracts negligibly and travels in nearly straight lines.
```

```example
Radio waves of wavelength 300 m and FM waves of wavelength 3 m reach a valley behind a hill. Which signal is received better in the valley?
---
The long-wave (300 m) signal, because its wavelength is comparable to the size of the hill, so it diffracts round it into the valley much more.
```

```question
diffraction-gap
```

## Summary

- Diffraction is the spreading of waves through gaps and around obstacles.
- It is greatest when the gap or obstacle is comparable to the wavelength.
- Wavelength, frequency and speed are unchanged by diffraction.
