---
code: E.3.5
title: Alpha, beta and gamma decay
summary: What unstable nuclei emit, how the nucleus changes, how to balance decay equations, and how far each radiation penetrates.
minutes: 35
difficulty: 2
objectives:
  - Describe radioactive decay as random and spontaneous.
  - Write balanced equations for α, β⁻, β⁺ and γ decay, including neutrinos and antineutrinos.
  - Compare the penetration and ionising ability of α, β and γ radiation.
  - (HL) Explain how α and γ spectra show discrete nuclear energy levels and how the β spectrum led to the neutrino.
prerequisites:
  - Mass defect and binding energy
definitions:
  - term: Random decay
    definition: It is impossible to predict when a particular nucleus will decay; only the probability per unit time is fixed.
  - term: Spontaneous decay
    definition: Decay is not affected by external conditions such as temperature, pressure or chemical state.
  - term: Alpha particle
    definition: A helium-4 nucleus, ⁴₂He, emitted by some heavy nuclei.
  - term: Beta-minus particle
    definition: An electron emitted when a neutron in the nucleus changes into a proton (with an antineutrino).
  - term: Beta-plus particle
    definition: A positron emitted when a proton in the nucleus changes into a neutron (with a neutrino).
mistakes:
  - Forgetting the antineutrino in β⁻ decay (and the neutrino in β⁺ decay).
  - Saying gamma decay changes the element. Gamma emission changes only the energy of the nucleus, not A or Z.
tips:
  - Check every equation — the top numbers (A) and the bottom numbers (Z) must each balance.
  - Ionising and penetrating abilities go in opposite orders — α most ionising, least penetrating.
related:
  - physics/e3-nuclear
---

## Random and spontaneous

Unstable nuclei decay to become more stable. Decay is:

- **random** — you cannot predict which nucleus will decay next, or when;
- **spontaneous** — nothing outside the nucleus (heat, pressure, chemistry) affects it.

## The three radiations

| | Alpha (α) | Beta-minus (β⁻) | Beta-plus (β⁺) | Gamma (γ) |
|---|---|---|---|---|
| What it is | $^4_2\text{He}$ nucleus | electron | positron | EM photon |
| Charge | +2e | −e | +e | 0 |
| Change to nucleus | A − 4, Z − 2 | Z + 1 | Z − 1 | none (loses energy) |
| Also emitted | — | antineutrino $\bar{\nu}_e$ | neutrino $\nu_e$ | — |

```figure
src: physics/_sme/radioactive-decay/img/fig-cbe5aa5c64d6753c.png
caption: Alpha decay: the nucleus emits a helium-4 nucleus, so its proton number drops by 2 and its nucleon number by 4.
```

```example
Write the equations for the α decay of radium-226 and the β⁻ decay of carbon-14.
---
$^{226}_{88}\text{Ra} \rightarrow\ ^{222}_{86}\text{Rn} + ^4_2\text{He}$

$^{14}_{6}\text{C} \rightarrow\ ^{14}_{7}\text{N} + ^{\ 0}_{-1}\text{e} + \bar{\nu}_e$
```

In β⁻ decay a **neutron** becomes a proton; in β⁺ decay a **proton** becomes a neutron:

$$
n \rightarrow p + e^- + \bar{\nu}_e \qquad\qquad p \rightarrow n + e^+ + \nu_e
$$

Neutrinos and antineutrinos are almost massless, uncharged and interact extremely weakly with matter.

## Penetration and ionisation

```svg
caption: Alpha is stopped by paper, beta by a few mm of aluminium; gamma is only reduced by thick lead.
<svg viewBox="0 0 420 160">
  <rect x="140" y="20" width="6" height="120" fill="var(--muted)"/><text x="132" y="155" font-size="11" fill="currentColor">paper</text>
  <rect x="230" y="20" width="14" height="120" fill="var(--accent)" opacity="0.6"/><text x="214" y="155" font-size="11" fill="currentColor">aluminium</text>
  <rect x="320" y="20" width="36" height="120" fill="currentColor" opacity="0.5"/><text x="326" y="155" font-size="11" fill="currentColor">lead</text>
  <g stroke-width="2.5">
    <line x1="30" y1="40" x2="138" y2="40" stroke="var(--bad)" marker-end="url(#e32-r)"/><text x="10" y="44" font-size="13" fill="var(--bad)">α</text>
    <line x1="30" y1="80" x2="228" y2="80" stroke="var(--accent)" marker-end="url(#e32-a)"/><text x="10" y="84" font-size="13" fill="var(--accent)">β</text>
    <line x1="30" y1="120" x2="400" y2="120" stroke="currentColor" stroke-dasharray="8 3" marker-end="url(#e32-k)"/><text x="10" y="124" font-size="13" fill="currentColor">γ</text>
  </g>
  <defs>
    <marker id="e32-r" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0 10 5 0 10z" fill="var(--bad)"/></marker>
    <marker id="e32-a" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0 10 5 0 10z" fill="var(--accent)"/></marker>
    <marker id="e32-k" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0 10 5 0 10z" fill="currentColor"/></marker>
  </defs>
</svg>
```

```figure
src: physics/_sme/radioactive-decay/img/fig-f290998718f8620e.png
caption: Penetrating power: alpha is stopped by paper, beta by a few millimetres of aluminium, gamma is only reduced by thick lead.
```

```figure
src: physics/_sme/radioactive-decay/img/fig-7dd0301d88507f2b.png
caption: Ionising radiation knocks electrons out of the atoms it passes, leaving ions behind.
```

| | α | β | γ |
|---|---|---|---|
| Ionising ability | Very strong | Moderate | Weak |
| Range in air | A few cm | About a metre | Very large (intensity falls gradually) |
| Stopped by | Paper / skin | A few mm of aluminium | Reduced by thick lead or concrete |

```keyidea
Alpha particles are big and highly charged, so they ionise strongly and lose their energy quickly — short range. Gamma photons are uncharged and rarely interact — weakly ionising but very penetrating.
```

## (HL) What the spectra tell us

- **Alpha and gamma** emissions from a given nuclide have **discrete** energies. Like atomic line spectra, this shows that nuclei have **discrete energy levels**.
- **Beta** particles have a **continuous** range of energies up to a maximum. If only two particles were produced, energy and momentum conservation would fix the beta energy. The spread showed a third, undetected particle was sharing the energy — Pauli’s **neutrino**, later detected directly.

```figure
src: physics/_iitian/radioactivity-ib-dp-physics-study-notes/img/fig-e49c7eac5727643c.png
caption: Beta-minus decay: a neutron turns into a proton, emitting an electron and an antineutrino; the daughter nucleus may then emit a gamma photon.
```

```figure
src: physics/_iitian/radioactivity-ib-dp-physics-study-notes/img/fig-62c02a8947c3bf06.png
caption: Beta particles have a continuous range of energies up to a maximum, which is evidence that a neutrino carries away the rest.
```

```question
decay-balance
```

## Summary

- Decay is random and spontaneous.
- α: A − 4, Z − 2. β⁻: Z + 1 (+ antineutrino). β⁺: Z − 1 (+ neutrino). γ: no change in A or Z.
- Ionisation α > β > γ; penetration γ > β > α.
- HL: discrete α/γ energies → nuclear energy levels; continuous β spectrum → neutrino.
