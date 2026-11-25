---
code: E.1.3
title: Energy levels and spectra
summary: Why atoms emit and absorb only particular colours, and how those line spectra reveal what stars and gases are made of.
minutes: 25
difficulty: 2
objectives:
  - Explain how emission and absorption spectra show that atoms have discrete energy levels.
  - Relate the photon frequency to the energy difference between levels, ΔE = hf.
  - Explain how spectra identify the chemical composition of a source.
prerequisites:
  - Electromagnetic waves
formulas:
  - name: Photon energy
    latex: 'E = hf = \frac{hc}{\lambda}'
definitions:
  - term: Emission spectrum
    definition: A pattern of bright lines at particular wavelengths produced when excited atoms drop to lower energy levels.
  - term: Absorption spectrum
    definition: Dark lines in a continuous spectrum where atoms in a cooler gas have absorbed photons of particular wavelengths.
  - term: Photon
    definition: A quantum (packet) of electromagnetic energy, E = hf.
  - term: Ground state
    definition: The lowest energy level of an atom.
mistakes:
  - Thinking an atom can absorb a photon of any energy. It only absorbs a photon whose energy exactly matches a gap between two levels.
  - Mixing up eV and J — 1 eV = 1.60 × 10⁻¹⁹ J.
tips:
  - Higher energy transitions give shorter wavelengths (bluer light).
  - The number of possible emission lines from level n down to ground state is n(n − 1)/2.
related:
  - physics/c2-wave-model
  - physics/e2-quantum
---

## Line spectra

Heat a gas or pass a current through it, and its light, split by a prism or grating, is not a continuous rainbow: it is a set of bright **lines** at particular wavelengths. Shine white light through a cool gas, and the same wavelengths appear as **dark lines** in the continuous spectrum.

```figure
src: physics/_iitian/the-structure-of-the-atom-ib-dp-physics-study-notes/img/fig-0f28b85868b9df53.png
caption: An emission line spectrum: bright lines at specific wavelengths on a dark background.
```

```figure
src: physics/_iitian/the-structure-of-the-atom-ib-dp-physics-study-notes/img/fig-1081cef2069c20a8.png
caption: Gas discharge tubes of different elements glow with different colours, each giving its own line spectrum.
```

```keyidea
Each element has its own unique set of lines. The only explanation is that electrons in atoms can only have certain **discrete energies** — energy levels.
```

## Transitions and photons

When an electron drops from a higher level to a lower one, the atom emits a **photon** carrying away the energy difference:

```figure
src: physics/_iitian/the-structure-of-the-atom-ib-dp-physics-study-notes/img/fig-8b940e0f5b68fc5d.png
caption: An electron absorbs a photon of exactly the right energy to jump up a level, then emits a photon of energy E₂ − E₁ when it drops back.
```

```figure
src: physics/_iitian/the-structure-of-the-atom-ib-dp-physics-study-notes/img/fig-c5109bd235bb21e8.png
caption: When an electron drops to a lower energy level it emits a photon whose energy equals the difference between the levels.
```

$$
\Delta E = hf = \frac{hc}{\lambda}, \qquad h = 6.63\times10^{-34}\ \text{J s}
$$

Absorption is the reverse: a photon is absorbed only if its energy exactly matches the gap between two levels, lifting an electron upward.

```svg
caption: Energy levels of an atom. Downward transitions emit photons; the largest drop gives the highest frequency (shortest wavelength).
<svg viewBox="0 0 360 210">
  <g stroke="currentColor" stroke-width="2"><line x1="60" y1="190" x2="300" y2="190"/><line x1="60" y1="90" x2="300" y2="90"/><line x1="60" y1="50" x2="300" y2="50"/><line x1="60" y1="30" x2="300" y2="30"/></g>
  <g font-size="12" fill="currentColor"><text x="306" y="194">n = 1  −13.6 eV</text><text x="306" y="94">n = 2</text><text x="306" y="54">n = 3</text><text x="306" y="34">n = 4</text></g>
  <g stroke="var(--accent)" stroke-width="2">
    <line x1="100" y1="90" x2="100" y2="186" marker-end="url(#e12-a)"/><line x1="150" y1="50" x2="150" y2="186" marker-end="url(#e12-a)"/>
    <line x1="210" y1="50" x2="210" y2="87" marker-end="url(#e12-a)"/><line x1="260" y1="30" x2="260" y2="87" marker-end="url(#e12-a)"/>
  </g>
  <defs><marker id="e12-a" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 10 5 0 10z" fill="var(--accent)"/></marker></defs>
</svg>
```

```example
An electron drops between levels 3.4 eV apart. Find the wavelength of the photon emitted.
---
$\Delta E = 3.4\times1.60\times10^{-19} = 5.44\times10^{-19}$ J.

$\lambda = \dfrac{hc}{\Delta E} = \dfrac{6.63\times10^{-34}\times3.00\times10^8}{5.44\times10^{-19}} = 3.7\times10^{-7}$ m (ultraviolet).
```

## Spectra as fingerprints

Because every element has a unique set of energy levels, its lines identify it. Astronomers find the composition of a star from the dark absorption lines in its spectrum — helium was discovered in the Sun this way before it was found on Earth.

```figure
src: physics/_sme/structure-of-the-atom/img/fig-e5f93d3fcafe78fe.png
caption: Each element has its own pattern of spectral lines, which identifies it like a fingerprint.
```

```question
photon-wavelength
```

## Summary

- Line spectra show atoms have discrete energy levels.
- Transitions emit or absorb photons with $\Delta E = hf = hc/\lambda$.
- Each element’s unique lines reveal chemical composition.
