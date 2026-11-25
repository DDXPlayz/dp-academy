---
code: S1.2.3
title: Relative atomic mass and mass spectra
summary: Calculating relative atomic mass from isotopic abundances, and reading a mass spectrum.
minutes: 25
difficulty: 2
objectives:
  - Calculate relative atomic mass from isotope masses and abundances.
  - Calculate isotopic abundances from a relative atomic mass.
  - (HL) Interpret mass spectra to determine relative atomic mass.
formulas:
  - name: Relative atomic mass
    latex: 'A_r = \frac{\sum (\text{isotope mass} \times \text{abundance})}{\sum \text{abundance}}'
definitions:
  - term: Relative atomic mass (Ar)
    definition: The weighted mean mass of an atom of an element, relative to one-twelfth of the mass of a carbon-12 atom.
  - term: Mass spectrometer
    definition: An instrument that separates ions by their mass-to-charge ratio (m/z) and measures their relative abundances.
mistakes:
  - Taking a simple average of isotope masses. The mean must be weighted by abundance.
  - Forgetting to divide by the total abundance when abundances don’t add to 100.
tips:
  - Sanity check — Ar must lie between the lightest and heaviest isotope masses, closer to the most abundant one.
related:
  - chemistry/s1-4-the-mole
---

## Relative atomic mass

Because most elements are mixtures of isotopes, the **relative atomic mass** is a weighted mean:

```figure
src: chemistry/_iitian/ib-dp-chemistry-s1-2-2-isotopes-study-notes/img/fig-008fb86d69275d84.png
caption: The isotopes of carbon and their natural abundances: carbon-12 is by far the most common.
```

$$
A_r = \frac{\sum (\text{isotope mass} \times \text{abundance})}{\sum \text{abundance}}
$$

```example
Chlorine is 75.8% ³⁵Cl and 24.2% ³⁷Cl. Find Ar.
---
$A_r = \dfrac{35\times75.8 + 37\times24.2}{100} = 35.48$, i.e. 35.5.
```

## Working backwards

```example
Copper (Ar = 63.55) consists of ⁶³Cu and ⁶⁵Cu. Find the percentage of ⁶³Cu.
---
Let $x$ = % of ⁶³Cu: $63x + 65(100 - x) = 6355$, so $6500 - 2x = 6355$ and $x = 72.5\%$.
```

## (HL) Mass spectra

```keyidea
In a mass spectrometer atoms are ionised, accelerated and separated by mass-to-charge ratio. Each peak is an isotope: its position gives m/z (≈ mass for 1+ ions) and its height gives the relative abundance.
```

```figure
src: chemistry/_iitian/ib-dp-chemistry-s1-2-3-mass-spectrometry-study-notes/img/fig-04200317d81a8b5b.png
caption: A mass spectrum: each peak is an isotope (m/z), and its height gives the relative abundance used to find the relative atomic mass.
```

```svg
caption: A simplified mass spectrum of magnesium. Peaks at m/z 24, 25 and 26 with relative abundances 79, 10 and 11.
<svg viewBox="0 0 360 200">
  <line x1="50" y1="170" x2="340" y2="170" stroke="currentColor" stroke-width="1.5"/><line x1="50" y1="170" x2="50" y2="20" stroke="currentColor" stroke-width="1.5"/>
  <g fill="var(--accent)"><rect x="115" y="44" width="12" height="126"/><rect x="185" y="154" width="12" height="16"/><rect x="255" y="152.4" width="12" height="17.6"/></g>
  <g font-size="12" text-anchor="middle" fill="currentColor"><text x="121" y="186">24</text><text x="191" y="186">25</text><text x="261" y="186">26</text><text x="121" y="38">79</text><text x="191" y="148">10</text><text x="261" y="146">11</text><text x="200" y="200">m/z</text></g>
  <text x="18" y="100" font-size="12" fill="currentColor" transform="rotate(-90 18 100)" text-anchor="middle">abundance</text>
</svg>
```

$A_r(\text{Mg}) = \dfrac{24\times79 + 25\times10 + 26\times11}{100} = 24.32$.

```question
ar-calc
```

## Summary

- $A_r$ is the abundance-weighted mean of isotope masses, relative to ¹²C.
- Unknown abundances can be found by solving with $A_r$.
- HL: mass spectrum peaks give isotope masses (m/z) and abundances (heights).
