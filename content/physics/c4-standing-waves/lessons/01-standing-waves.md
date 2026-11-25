---
code: C.4.1
title: Standing waves on strings and in pipes
summary: Two identical waves moving in opposite directions lock into a fixed pattern of nodes and antinodes — the physics of every musical instrument.
minutes: 30
difficulty: 2
objectives:
  - Explain how a standing wave forms by superposition of two identical waves travelling in opposite directions.
  - Describe nodes, antinodes, amplitude and phase along a standing wave.
  - Find the allowed wavelengths and frequencies (harmonics) for strings and for pipes open or closed at the ends.
prerequisites:
  - Superposition
  - Wave equation
formulas:
  - name: String fixed at both ends / pipe open at both ends
    latex: '\lambda_n = \frac{2L}{n}, \quad f_n = \frac{nv}{2L}, \quad n = 1, 2, 3, \dots'
  - name: Pipe closed at one end
    latex: '\lambda_n = \frac{4L}{n}, \quad f_n = \frac{nv}{4L}, \quad n = 1, 3, 5, \dots'
definitions:
  - term: Standing wave
    definition: A wave pattern formed when two waves of the same frequency, speed and amplitude travel in opposite directions and superpose; it transfers no net energy along its length.
  - term: Node
    definition: A point on a standing wave with zero amplitude.
  - term: Antinode
    definition: A point on a standing wave with maximum amplitude.
  - term: Fundamental (first harmonic)
    definition: The lowest-frequency standing wave a string or pipe can support.
mistakes:
  - Saying adjacent nodes are one wavelength apart. They are half a wavelength apart.
  - Forgetting that a pipe closed at one end only has odd harmonics.
tips:
  - Always sketch the pattern first — nodes at fixed ends and closed ends, antinodes at open ends — then read off λ from the length.
  - All points between two adjacent nodes oscillate in phase; points either side of a node are in antiphase.
related:
  - physics/c3-wave-phenomena
---

## How a standing wave forms

Send a wave along a string fixed at one end. It reflects and travels back. The outgoing and returning waves have the same frequency, speed and amplitude and move in **opposite directions**. Their superposition is a **standing (stationary) wave**: a pattern that does not travel.

```figure
src: physics/_sme/standing-waves-resonance/img/fig-8be134a113b4d92c.png
caption: Two identical waves travelling in opposite directions superpose to form a standing wave.
```

```figure
src: physics/_sme/standing-waves-resonance/img/fig-cf8375e4595a78c0.png
caption: A standing wave: nodes have zero amplitude, antinodes have maximum amplitude, and adjacent nodes are λ/2 apart.
```

- At **nodes** the two waves always cancel: zero amplitude.
- At **antinodes** they reinforce: maximum amplitude.
- Adjacent nodes (or antinodes) are $\lambda/2$ apart; a node and the next antinode are $\lambda/4$ apart.

```keyidea
Unlike a travelling wave, a standing wave transfers no net energy. Amplitude varies with position, and all points between neighbouring nodes move in phase.
```

| | Travelling wave | Standing wave |
|---|---|---|
| Energy transfer | yes | no net transfer |
| Amplitude | same everywhere | zero at nodes, maximum at antinodes |
| Phase | changes continuously along the wave | same between adjacent nodes; flips across a node |

## Strings fixed at both ends

Both ends must be nodes, so a whole number of half-wavelengths fits on the string:

```figure
src: physics/_sme/standing-waves-resonance/img/fig-a39f935ab141fde7.png
caption: Harmonics on a string fixed at both ends: there must be a node at each end, so L = nλ/2.
```

```figure
src: physics/_sme/standing-waves-resonance/img/fig-340620ae85647eb6.png
caption: A guitar string vibrates in standing-wave patterns between its two fixed ends.
```

$$
L = n\frac{\lambda}{2} \quad\Rightarrow\quad \lambda_n = \frac{2L}{n}, \quad f_n = \frac{nv}{2L}
$$

```svg
caption: The first three harmonics on a string of length L. Nodes (N) at both ends; the n-th harmonic has n loops.
<svg viewBox="0 0 420 220">
  <g fill="none" stroke-width="2">
    <path d="M40 40 Q 210 0 380 40" stroke="var(--accent)"/><path d="M40 40 Q 210 80 380 40" stroke="var(--accent)" opacity="0.5"/>
    <path d="M40 110 Q 125 75 210 110 Q 295 145 380 110" stroke="var(--good)"/><path d="M40 110 Q 125 145 210 110 Q 295 75 380 110" stroke="var(--good)" opacity="0.5"/>
    <path d="M40 180 Q 97 150 153 180 Q 210 210 267 180 Q 323 150 380 180" stroke="var(--warn)"/><path d="M40 180 Q 97 210 153 180 Q 210 150 267 180 Q 323 210 380 180" stroke="var(--warn)" opacity="0.5"/>
  </g>
  <g font-size="12" fill="currentColor">
    <text x="390" y="44">n = 1, λ = 2L</text><text x="390" y="114">n = 2, λ = L</text><text x="390" y="184">n = 3, λ = 2L/3</text>
  </g>
</svg>
```

```example
A guitar string 0.65 m long has a wave speed of 286 m s⁻¹. Find the frequencies of its first three harmonics.
---
$f_1 = \dfrac{v}{2L} = \dfrac{286}{1.30} = 220$ Hz. Then $f_2 = 440$ Hz and $f_3 = 660$ Hz.
```

## Pipes

Sound in a pipe forms a standing wave of air displacement:

```figure
src: physics/_sme/standing-waves-resonance/img/fig-766c46f0d8e476c0.png
caption: Standing waves in pipes: closed ends are nodes, open ends are antinodes.
```

- an **open end** is a displacement **antinode**;
- a **closed end** is a displacement **node**.

**Open at both ends:** antinode at each end, so the pattern is the same as a string — $\lambda_n = 2L/n$, all harmonics.

**Closed at one end:** node at the closed end, antinode at the open end. The pipe holds an odd number of quarter-wavelengths:

$$
L = n\frac{\lambda}{4} \quad\Rightarrow\quad f_n = \frac{nv}{4L}, \quad n = 1, 3, 5, \dots
$$

Only **odd** harmonics are present, and the fundamental is an octave lower than an open pipe of the same length.

```example
A pipe closed at one end is 0.34 m long. The speed of sound is 340 m s⁻¹. Find the two lowest frequencies it can produce.
---
$f_1 = \dfrac{v}{4L} = \dfrac{340}{1.36} = 250$ Hz. The next harmonic is $n = 3$: $750$ Hz.
```

```mistake
For pipes, nodes and antinodes refer to the displacement of the air, not the pressure. A closed end is a displacement node.
```

```question
string-fundamental
```

## Summary

- Standing waves form from two identical waves travelling in opposite directions; nodes are λ/2 apart.
- Strings fixed at both ends and pipes open at both ends: $\lambda_n = 2L/n$, all harmonics.
- Pipes closed at one end: $\lambda_n = 4L/n$, odd harmonics only.
