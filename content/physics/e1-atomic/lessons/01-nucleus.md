---
code: E.1.1
title: Discovering the nucleus
summary: The gold-foil experiment, nuclear notation, and (HL) nuclear size, density and the closest approach of alpha particles.
minutes: 30
difficulty: 2
objectives:
  - Describe the Geiger–Marsden–Rutherford experiment and explain what it showed.
  - Use nuclear notation, ᴬ_Z X.
  - (HL) Use R = R₀A^(1/3) and explain why all nuclei have about the same density.
  - (HL) Calculate the distance of closest approach in head-on scattering.
  - (HL) Explain deviations from Rutherford scattering at high energies.
prerequisites:
  - Electric potential
formulas:
  - name: Nuclear radius (HL)
    latex: 'R = R_0A^{1/3}, \quad R_0 = 1.20\times10^{-15}\ \text{m}'
  - name: Closest approach (HL)
    latex: 'E_k = \frac{kQq}{d}'
definitions:
  - term: Nucleon number (A)
    definition: The total number of protons and neutrons in a nucleus.
  - term: Proton number (Z)
    definition: The number of protons in a nucleus; it identifies the element.
  - term: Isotopes
    definition: Nuclei of the same element (same Z) with different numbers of neutrons (different A).
mistakes:
  - Saying most alpha particles bounced back. Almost all went straight through — only about 1 in 8000 deflected by more than 90°.
  - Swapping A and Z. A (nucleon number) is the bigger number, written on top.
tips:
  - Neutron number N = A − Z.
  - Nuclear density is about 2 × 10¹⁷ kg m⁻³ for every nucleus, because volume ∝ R³ ∝ A.
related:
  - physics/d2-em-fields
  - physics/e3-nuclear
---

## The gold-foil experiment

Geiger and Marsden, working with Rutherford, fired alpha particles at a very thin gold foil and counted where they went.

```svg
caption: Alpha particles fired at gold nuclei. Most pass straight through; a few passing close to a nucleus are strongly deflected; a very few rebound.
<svg viewBox="0 0 420 200">
  <circle cx="260" cy="100" r="7" fill="var(--bad)"/><text x="272" y="96" font-size="12" fill="var(--bad)">nucleus</text>
  <g fill="none" stroke="var(--accent)" stroke-width="1.6">
    <line x1="20" y1="30" x2="400" y2="30" marker-end="url(#e11-a)"/>
    <line x1="20" y1="170" x2="400" y2="170" marker-end="url(#e11-a)"/>
    <path d="M20 70 L 220 70 Q 270 68 330 30" marker-end="url(#e11-a)"/>
    <path d="M20 130 L 220 130 Q 270 132 330 170" marker-end="url(#e11-a)"/>
    <path d="M20 100 L 240 100 Q 250 100 240 104 L 60 125" marker-end="url(#e11-a)"/>
  </g>
  <text x="24" y="20" font-size="12" fill="currentColor">α particles</text>
  <defs><marker id="e11-a" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 10 5 0 10z" fill="var(--accent)"/></marker></defs>
</svg>
```

| Observation | Conclusion |
|---|---|
| Most alphas went straight through | The atom is mostly empty space |
| A few were deflected through large angles | There is a tiny region of concentrated positive charge |
| About 1 in 8000 bounced back (> 90°) | That region holds almost all the atom’s mass |

This replaced the "plum pudding" model with the **nuclear model**: a tiny, dense, positive nucleus surrounded by electrons.

## Nuclear notation

A nuclide is written $^{A}_{Z}\text{X}$, where $A$ is the **nucleon number**, $Z$ the **proton number** and X the chemical symbol. The number of neutrons is $N = A - Z$.

```example
How many protons, neutrons and electrons are in a neutral atom of $^{238}_{92}\text{U}$?
---
92 protons, $238 - 92 = 146$ neutrons and 92 electrons.
```

## (HL) Nuclear size and density

Nuclear radii follow

$$
R = R_0A^{1/3}, \qquad R_0 = 1.20\times10^{-15}\ \text{m}
$$

Volume $\propto R^3 \propto A$, and mass $\propto A$, so **all nuclei have about the same density**, roughly $2\times10^{17}$ kg m⁻³ — astonishingly high.

## (HL) Distance of closest approach

In a head-on collision, an alpha particle slows as it approaches the nucleus, stops, and returns. At the turning point all its kinetic energy is electric potential energy:

$$
E_k = \frac{kQq}{d}
$$

This gives an **upper limit** on the nuclear radius.

```example
A 4.0 MeV alpha particle approaches a gold nucleus (Z = 79) head on. Find the distance of closest approach.
---
$E_k = 4.0\times10^6\times1.60\times10^{-19} = 6.4\times10^{-13}$ J.

$d = \dfrac{k(79e)(2e)}{E_k} = \dfrac{8.99\times10^9\times158\times(1.60\times10^{-19})^2}{6.4\times10^{-13}} = 5.7\times10^{-14}$ m.
```

## (HL) Deviations at high energies

At high energies the alphas get close enough to touch the nucleus. Then the **strong nuclear force** also acts and the scattering no longer matches the Coulomb-only prediction. The energy at which this deviation begins gives an estimate of the nuclear radius. High-energy electrons are also used: they do not feel the strong force, and they diffract around the nucleus.

```question
rutherford-conclusion
```

## Summary

- Gold foil: mostly empty atom, with a tiny, massive, positive nucleus.
- $^{A}_{Z}\text{X}$; neutrons $= A - Z$.
- HL: $R = R_0A^{1/3}$, constant nuclear density; closest approach from $E_k = kQq/d$.
