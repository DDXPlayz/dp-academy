---
code: S1.3.1
title: Emission spectra and energy levels
summary: The hydrogen line spectrum, what it tells us about electron energy levels, and why the lines converge.
minutes: 25
difficulty: 2
objectives:
  - Explain how emission spectra arise from electrons falling to lower energy levels.
  - Distinguish continuous and line spectra.
  - Explain the convergence of lines in the hydrogen spectrum.
  - (HL) Relate the convergence limit to the ionisation energy.
formulas:
  - name: Photon energy
    latex: 'E = h\nu = \frac{hc}{\lambda}'
definitions:
  - term: Continuous spectrum
    definition: A spectrum containing all wavelengths in a range, with no gaps (e.g. white light).
  - term: Line spectrum
    definition: A spectrum of discrete coloured lines at particular wavelengths, produced by atoms of one element.
  - term: Convergence limit
    definition: The frequency at which spectral lines in a series merge; it corresponds to electrons falling from n = ∞.
mistakes:
  - Saying lines come from electrons moving up. Emission lines come from electrons falling to lower levels.
  - Thinking all hydrogen lines are visible. The Lyman series (to n = 1) is UV; the Balmer series (to n = 2) is visible.
tips:
  - Bigger energy drop → higher frequency → shorter wavelength.
  - In the visible spectrum, violet is high energy, red is low energy.
related:
  - physics/e1-atomic
---

## Continuous and line spectra

White light passed through a prism gives a **continuous spectrum** — every colour, no gaps. Light from excited atoms of one element gives a **line spectrum**: only certain colours, as sharp lines on a dark background.

```figure
src: chemistry/_iitian/electron-configurations-ib-dp-chemistry-study-notes-iitian-a/img/fig-18287afe7b3c14bc.png
caption: White light gives a continuous spectrum; a heated gas gives a line spectrum of separate colours.
```

## Where the lines come from

```keyidea
Electrons in atoms occupy discrete energy levels. When an electron in an excited state falls to a lower level, the atom emits a photon whose energy equals the energy difference between the levels: ΔE = hν.
```

```figure
src: chemistry/_iitian/ib-dp-chemistry-s1-3-2-hydrogen-emission-spectrum-study-note/img/fig-12b0278f21b899bd.png
caption: Absorption raises an electron to a higher level; emission happens when it falls back, releasing a photon of energy ΔE = hf.
```

```figure
src: chemistry/_iitian/ib-dp-chemistry-s1-3-2-hydrogen-emission-spectrum-study-note/img/fig-48bebb58c68ee739.png
caption: Transitions in hydrogen: falls to n = 1 give the ultraviolet (Lyman) series, falls to n = 2 give the visible (Balmer) series.
```

Because only certain energy gaps exist, only certain frequencies are emitted — hence lines, not a continuous band.

## The hydrogen spectrum

```svg
caption: Hydrogen energy levels get closer together as n increases. Falls to n = 1 give the Lyman series (UV); falls to n = 2 give the Balmer series (visible).
<svg viewBox="0 0 420 220">
  <g stroke="currentColor" stroke-width="2">
    <line x1="40" y1="200" x2="380" y2="200"/><line x1="40" y1="110" x2="380" y2="110"/><line x1="40" y1="70" x2="380" y2="70"/><line x1="40" y1="52" x2="380" y2="52"/><line x1="40" y1="42" x2="380" y2="42"/>
  </g>
  <line x1="40" y1="24" x2="380" y2="24" stroke="currentColor" stroke-dasharray="4 3"/>
  <g font-size="11" fill="currentColor"><text x="384" y="204">n=1</text><text x="384" y="114">n=2</text><text x="384" y="74">n=3</text><text x="384" y="56">n=4</text><text x="384" y="28">n=∞</text></g>
  <g stroke="var(--accent)" stroke-width="2">
    <line x1="70" y1="110" x2="70" y2="196" marker-end="url(#s13-a)"/><line x1="95" y1="70" x2="95" y2="196" marker-end="url(#s13-a)"/><line x1="120" y1="52" x2="120" y2="196" marker-end="url(#s13-a)"/><line x1="145" y1="24" x2="145" y2="196" marker-end="url(#s13-a)"/>
  </g>
  <g stroke="var(--bad)" stroke-width="2">
    <line x1="230" y1="70" x2="230" y2="106" marker-end="url(#s13-r)"/><line x1="260" y1="52" x2="260" y2="106" marker-end="url(#s13-r)"/><line x1="290" y1="42" x2="290" y2="106" marker-end="url(#s13-r)"/>
  </g>
  <text x="80" y="218" font-size="11" fill="var(--accent)">Lyman (UV)</text><text x="230" y="140" font-size="11" fill="var(--bad)">Balmer (visible)</text>
  <defs>
    <marker id="s13-a" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0 10 5 0 10z" fill="var(--accent)"/></marker>
    <marker id="s13-r" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0 10 5 0 10z" fill="var(--bad)"/></marker>
  </defs>
</svg>
```

- Energy levels get **closer together** at higher energy, so the spectral lines get closer together at higher frequency — they **converge**.
- Transitions to **n = 1** release the most energy: the **Lyman** series, in the ultraviolet.
- Transitions to **n = 2**: the **Balmer** series, in the visible region.

## (HL) Convergence limit and ionisation

The convergence limit corresponds to an electron falling from $n = \infty$ — that is, from outside the atom. So the energy at the convergence limit of the Lyman series equals the **ionisation energy** of hydrogen.

```figure
src: chemistry/_iitian/ib-dp-chemistry-s1-3-6-ionization-energy-study-notes/img/fig-675a7a9e33cd2f68.png
caption: Energy levels get closer together as n increases, so the spectral lines converge.
```

```example
(HL) The Lyman series of hydrogen converges at a frequency of 3.29 × 10¹⁵ Hz. Find the ionisation energy of hydrogen in kJ mol⁻¹.
---
$E = h\nu = 6.63\times10^{-34}\times3.29\times10^{15} = 2.18\times10^{-18}$ J per atom.

$\times N_A$: $2.18\times10^{-18}\times6.02\times10^{23} = 1.31\times10^6$ J mol⁻¹ = 1310 kJ mol⁻¹.
```

```question
spectrum-origin
```

## Summary

- Line spectra arise from electrons falling between discrete energy levels: $\Delta E = h\nu$.
- Hydrogen’s lines converge because energy levels converge.
- Lyman (to n = 1) is UV; Balmer (to n = 2) is visible.
- HL: the convergence limit gives the ionisation energy.
