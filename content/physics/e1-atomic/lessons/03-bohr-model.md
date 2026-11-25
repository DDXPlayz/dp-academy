---
code: E.1.10
title: The Bohr model of hydrogen
summary: Quantised angular momentum leads to quantised orbits and the energy levels E = −13.6/n² eV.
minutes: 25
difficulty: 3
hl: true
objectives:
  - Use E = −13.6/n² eV for the energy levels of hydrogen.
  - State Bohr’s condition, mvr = nh/2π, and explain how it leads to quantised orbits and energies.
  - Calculate photon energies and wavelengths for hydrogen transitions.
prerequisites:
  - Energy levels and spectra
  - Circular motion
formulas:
  - name: Hydrogen energy levels
    latex: 'E_n = -\frac{13.6}{n^2}\ \text{eV}'
  - name: Bohr’s quantisation condition
    latex: 'mvr = \frac{nh}{2\pi}'
definitions:
  - term: Ionisation energy
    definition: The energy needed to remove an electron completely from the ground state; 13.6 eV for hydrogen.
  - term: Principal quantum number
    definition: The integer n labelling the allowed orbits and energy levels in the Bohr model.
mistakes:
  - Forgetting the minus sign. Bound electrons have negative energy; E = 0 means just free.
  - Thinking the Bohr model works for all atoms. It only gives accurate energies for hydrogen (one electron).
tips:
  - Transition energy — ΔE = 13.6(1/n_lower² − 1/n_upper²) eV.
related:
  - physics/e1-atomic
  - physics/e2-quantum
---

## Bohr’s idea

Bohr kept the picture of an electron orbiting the proton, held by the electric force, but added one rule: the electron’s **angular momentum is quantised**,

```figure
src: physics/_sme/structure-of-the-atom/img/fig-d8c52f6b8f041b9d.png
caption: Bohr's condition seen as a standing wave: only orbits that fit a whole number of electron wavelengths are allowed.
```

$$
mvr = \frac{nh}{2\pi}, \qquad n = 1, 2, 3, \ldots
$$

Combining this with $\dfrac{ke^2}{r^2} = \dfrac{mv^2}{r}$ allows only certain radii ($r \propto n^2$) and so only certain energies. In these orbits the electron does not radiate.

## Energy levels of hydrogen

$$
E_n = -\frac{13.6}{n^2}\ \text{eV}
$$

```figure
src: physics/_sme/structure-of-the-atom/img/fig-b116eaf5c2f24794.png
caption: The energy levels of hydrogen, with transitions down to n = 1 and n = 2 producing spectral lines.
```

| n | 1 | 2 | 3 | 4 | ∞ |
|---|---|---|---|---|---|
| $E_n$ / eV | −13.6 | −3.40 | −1.51 | −0.85 | 0 |

- The energies are **negative**: work must be done to free the electron.
- The **ionisation energy** from the ground state is 13.6 eV.
- Levels crowd together as $n$ grows.

```example
Find the wavelength of the photon emitted when hydrogen’s electron drops from n = 3 to n = 2.
---
$\Delta E = -1.51 - (-3.40) = 1.89$ eV $= 3.02\times10^{-19}$ J.

$\lambda = hc/\Delta E = 6.63\times10^{-34}\times3.00\times10^8/3.02\times10^{-19} = 6.6\times10^{-7}$ m — the red line in hydrogen’s visible spectrum.
```

```keyidea
The Bohr model explains the hydrogen spectrum exactly, but it fails for atoms with more electrons. Its lasting lesson is that quantised angular momentum leads to quantised energy.
```

```question
bohr-level
```

## Summary

- Bohr: $mvr = nh/2\pi$ → quantised orbits and energies.
- Hydrogen: $E_n = -13.6/n^2$ eV; ionisation energy 13.6 eV.
