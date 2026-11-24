---
code: C.2.1
title: Travelling waves
summary: Energy moving without matter moving with it — transverse and longitudinal waves, and the wave equation v = fλ.
minutes: 25
difficulty: 1
objectives:
  - Distinguish transverse and longitudinal waves.
  - Define wavelength, frequency, period, amplitude and wave speed.
  - Use v = fλ = λ/T.
  - Read displacement–distance and displacement–time graphs of a wave.
prerequisites:
  - Simple harmonic motion
formulas:
  - name: Wave equation
    latex: 'v = f\lambda = \frac{\lambda}{T}'
definitions:
  - term: Travelling wave
    definition: A disturbance that transfers energy from one place to another without a net transfer of the medium.
  - term: Transverse wave
    definition: A wave in which the particles of the medium oscillate perpendicular to the direction of energy transfer.
  - term: Longitudinal wave
    definition: A wave in which the particles oscillate parallel to the direction of energy transfer, forming compressions and rarefactions.
  - term: Wavelength
    definition: The shortest distance between two points on a wave that are oscillating in phase, such as two adjacent crests.
mistakes:
  - Reading a wavelength from a displacement–time graph. On a time graph the repeat distance is the period T, not λ.
  - Thinking the particles of the medium travel with the wave. They only oscillate about fixed positions.
tips:
  - Always check which graph you have — the label on the horizontal axis (x or t) tells you whether the repeat length is λ or T.
  - The frequency of a wave is set by the source; changing medium changes speed and wavelength, not frequency.
related:
  - physics/c1-shm
---

## Waves carry energy, not matter

A wave on a rope or a ripple on a pond carries energy from one place to another. The rope and the water stay where they are on average; each part only oscillates about its equilibrium position, passing the disturbance on to its neighbour.

## Transverse and longitudinal

```svg
caption: In a transverse wave the particles move perpendicular to the wave direction; in a longitudinal wave they move parallel to it, forming compressions (C) and rarefactions (R).
<svg viewBox="0 0 440 220">
  <path d="M20 60 Q 50 20 80 60 T 140 60 T 200 60 T 260 60 T 320 60 T 380 60 T 420 60" fill="none" stroke="var(--accent)" stroke-width="2.5"/>
  <line x1="20" y1="60" x2="425" y2="60" stroke="var(--muted)" stroke-dasharray="4 4"/>
  <line x1="380" y1="100" x2="425" y2="100" stroke="currentColor" stroke-width="2" marker-end="url(#c21-k)"/>
  <text x="300" y="104" font-size="12" fill="currentColor">wave direction</text>
  <line x1="50" y1="88" x2="50" y2="30" stroke="var(--bad)" stroke-width="2" marker-start="url(#c21-r)" marker-end="url(#c21-r)"/>
  <text x="58" y="96" font-size="11" fill="var(--bad)">particle motion</text>
  <text x="20" y="14" font-size="12" fill="currentColor">transverse</text>
  <g stroke="var(--accent)" stroke-width="2">
    <line x1="30" y1="140" x2="30" y2="190"/><line x1="40" y1="140" x2="40" y2="190"/><line x1="46" y1="140" x2="46" y2="190"/><line x1="51" y1="140" x2="51" y2="190"/><line x1="58" y1="140" x2="58" y2="190"/>
    <line x1="74" y1="140" x2="74" y2="190"/><line x1="94" y1="140" x2="94" y2="190"/><line x1="114" y1="140" x2="114" y2="190"/>
    <line x1="128" y1="140" x2="128" y2="190"/><line x1="136" y1="140" x2="136" y2="190"/><line x1="141" y1="140" x2="141" y2="190"/><line x1="146" y1="140" x2="146" y2="190"/><line x1="154" y1="140" x2="154" y2="190"/>
    <line x1="170" y1="140" x2="170" y2="190"/><line x1="190" y1="140" x2="190" y2="190"/><line x1="210" y1="140" x2="210" y2="190"/>
    <line x1="224" y1="140" x2="224" y2="190"/><line x1="232" y1="140" x2="232" y2="190"/><line x1="237" y1="140" x2="237" y2="190"/><line x1="242" y1="140" x2="242" y2="190"/><line x1="250" y1="140" x2="250" y2="190"/>
    <line x1="266" y1="140" x2="266" y2="190"/><line x1="286" y1="140" x2="286" y2="190"/><line x1="306" y1="140" x2="306" y2="190"/>
  </g>
  <text x="44" y="206" font-size="12" text-anchor="middle" fill="var(--accent)">C</text>
  <text x="94" y="206" font-size="12" text-anchor="middle" fill="var(--accent)">R</text>
  <text x="140" y="206" font-size="12" text-anchor="middle" fill="var(--accent)">C</text>
  <text x="190" y="206" font-size="12" text-anchor="middle" fill="var(--accent)">R</text>
  <line x1="330" y1="165" x2="390" y2="165" stroke="var(--bad)" stroke-width="2" marker-start="url(#c21-r)" marker-end="url(#c21-r)"/>
  <text x="20" y="130" font-size="12" fill="currentColor">longitudinal</text>
  <defs>
    <marker id="c21-k" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 10 5 0 10z" fill="currentColor"/></marker>
    <marker id="c21-r" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0 10 5 0 10z" fill="var(--bad)"/></marker>
  </defs>
</svg>
```

- **Transverse:** oscillation perpendicular to energy transfer — waves on a string, water ripples, all electromagnetic waves.
- **Longitudinal:** oscillation parallel to energy transfer, producing **compressions** and **rarefactions** — sound, some seismic waves.

## Describing a wave

| Quantity | Symbol | Meaning |
|---|---|---|
| displacement | $x$ | how far a point is from equilibrium |
| amplitude | $A$ | maximum displacement |
| wavelength | $\lambda$ | length of one complete wave |
| period | $T$ | time for one complete oscillation of a point |
| frequency | $f$ | oscillations per second, $f = 1/T$ |
| wave speed | $v$ | speed at which the wave (energy) travels |

In one period the wave moves forward one wavelength, so

$$
v = \frac{\lambda}{T} = f\lambda
$$

```keyidea
A displacement–distance graph is a snapshot: the repeat length is λ. A displacement–time graph follows one point: the repeat length is T.
```

```example
A wave on a string has frequency 120 Hz and wavelength 0.50 m. Find its speed and period.
---
$v = f\lambda = 120 \times 0.50 = 60$ m s⁻¹. $T = 1/f = 8.3$ ms.
```

```example
Waves pass from deep to shallow water, slowing from 2.0 m s⁻¹ to 1.2 m s⁻¹. In the deep water the wavelength is 0.40 m. Find the wavelength in the shallow water.
---
Frequency is unchanged: $f = 2.0/0.40 = 5.0$ Hz. So $\lambda = 1.2/5.0 = 0.24$ m.
```

```mistake
Frequency is set by the source. When a wave enters a new medium, its speed and wavelength change but its frequency stays the same.
```

```question
wave-speed
```

## Summary

- Waves transfer energy, not matter.
- Transverse: perpendicular oscillation. Longitudinal: parallel oscillation with compressions and rarefactions.
- $v = f\lambda = \lambda/T$; frequency is fixed by the source.
