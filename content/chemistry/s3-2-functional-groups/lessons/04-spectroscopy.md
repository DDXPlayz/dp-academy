---
code: S3.2.8
title: Identifying compounds with spectroscopy
summary: Using the index of hydrogen deficiency, mass spectra, infrared spectra and ¹H NMR spectra together to work out a structure.
minutes: 40
difficulty: 3
hl: true
objectives:
  - Calculate the index of hydrogen deficiency (IHD) from a molecular formula.
  - Interpret fragmentation patterns in mass spectra.
  - Identify bonds from characteristic IR absorptions.
  - Interpret ¹H NMR spectra — number of signals, chemical shift, integration and splitting (n + 1 rule).
  - Combine data from different techniques to deduce a structure.
formulas:
  - name: Index of hydrogen deficiency
    latex: '\text{IHD} = \frac{(2C + 2 + N) - (H + X)}{2}'
definitions:
  - term: Index of hydrogen deficiency
    definition: The number of rings and π bonds in a molecule, calculated from its molecular formula.
  - term: Chemical shift
    definition: The position of an NMR signal (δ, in ppm) relative to TMS; it depends on the chemical environment of the protons.
  - term: Molecular ion
    definition: The ion formed when a molecule loses one electron; its m/z gives the relative molecular mass.
mistakes:
  - Counting the protons causing a split instead of the neighbours. A signal split into n + 1 peaks has n H atoms on neighbouring carbons.
  - Taking the tallest MS peak as the molecular ion. The molecular ion is usually the highest m/z peak; the tallest is the base peak.
tips:
  - IHD = 4 with six or more carbons suggests a benzene ring.
  - A broad IR band at 2500–3000 cm⁻¹ together with C=O at ~1700 cm⁻¹ means a carboxylic acid.
related:
  - chemistry/s1-2-nuclear-atom
---

## Index of hydrogen deficiency

$$
\text{IHD} = \frac{(2C + 2 + N) - (H + X)}{2}
$$

($X$ = halogens; oxygen is ignored.) Each ring or π bond counts 1: C=C or C=O → 1; C≡C → 2; benzene → 4.

```example
Find the IHD of C₄H₈O.
---
$\text{IHD} = \dfrac{(8 + 2) - 8}{2} = 1$ — one ring or one double bond (e.g. a C=O in butanal or butanone).
```

## Mass spectrometry

The **molecular ion** M⁺ gives $M_r$. Fragments break off, giving peaks at lower m/z:

```figure
src: chemistry/_iitian/functional-groups-s3-2-12-structural-analysis-ib-dp-chemistr/img/fig-d739864f4d58397b.png
caption: A mass spectrometer: molecules are ionised, accelerated and deflected by a magnet according to their mass-to-charge ratio.
```

| Loss from M | Fragment lost |
|---|---|
| 15 | CH₃ |
| 17 | OH |
| 29 | C₂H₅ or CHO |
| 31 | OCH₃ |
| 45 | COOH |

## Infrared spectroscopy

Bonds absorb IR radiation at characteristic wavenumbers when they vibrate (bending or stretching) in a way that changes the dipole moment.

```figure
src: chemistry/_iitian/functional-groups-s3-2-9-infrared-spectra-ib-dp-chemistry-st/img/fig-3b1cdb6047a17390.png
caption: Infrared radiation makes covalent bonds stretch and bend; each bond absorbs at characteristic wavenumbers.
```

```figure
src: chemistry/_iitian/functional-groups-s3-2-12-structural-analysis-ib-dp-chemistr/img/fig-63b84cb8c93b9630.png
caption: An IR spectrum: a broad O-H band, C-H absorptions, and the fingerprint region below about 1500 cm⁻¹.
```

| Bond | Wavenumber / cm⁻¹ | Notes |
|---|---|---|
| O–H (alcohol) | 3200–3600 | broad |
| O–H (carboxylic acid) | 2500–3000 | very broad |
| N–H | 3300–3500 | |
| C–H | 2850–3090 | |
| C=O | 1700–1750 | strong, sharp |
| C=C | 1620–1680 | |
| C–O | 1050–1410 | |

## ¹H NMR spectroscopy

```keyidea
Each signal in a ¹H NMR spectrum is a different hydrogen environment. Its chemical shift tells you what the H is near; its integration (area) tells you how many H are in that environment; its splitting tells you how many H are on neighbouring carbons (n + 1 rule).
```

```figure
src: chemistry/_iitian/functional-groups-s3-2-10-proton-nuclear-magnetic-resonance-/img/fig-431f629d911339db.png
caption: Typical ¹H NMR chemical shifts for protons in different environments.
```

| Environment | δ / ppm (approx.) |
|---|---|
| R–CH₃ | 0.9–1.0 |
| CH₃–C=O | 2.0–2.5 |
| –CH₂–O– / CH₃–O– | 3.3–3.7 |
| R–OH | 1.0–6.0 (variable) |
| benzene ring H | 6.0–9.0 |
| –CHO | 9.4–10 |
| –COOH | 9.0–13.0 |

TMS (tetramethylsilane) is the reference at δ = 0: it gives one strong signal, is inert and volatile.

**Splitting (n + 1):** a proton with $n$ equivalent H atoms on adjacent carbons is split into $n + 1$ peaks — doublet, triplet, quartet. An ethyl group gives the classic **triplet (3H) + quartet (2H)**.

## Putting it together

```example
A compound C₃H₆O₂ has: IR — very broad 2500–3000 cm⁻¹ and a strong 1710 cm⁻¹ band; ¹H NMR — 11.7 ppm (1H, singlet), 2.4 ppm (2H, quartet), 1.2 ppm (3H, triplet); MS — peaks at m/z 74 and 29. Identify it.
---
IHD = (8 − 6)/2 = 1: one C=O. IR shows a carboxylic acid (O–H 2500–3000, C=O 1710). NMR: COOH proton at 11.7; CH₂ quartet next to CH₃; CH₃ triplet next to CH₂ — an ethyl group. MS: M = 74 and C₂H₅⁺ at 29. It is propanoic acid, CH₃CH₂COOH.
```

```figure
src: chemistry/_iitian/functional-groups-s3-2-12-structural-analysis-ib-dp-chemistr/img/fig-5138913bf647ad1b.png
caption: Mass spectrum of propanone: the molecular ion at m/z = 58 and fragment peaks such as CH₃CO⁺ at 43.
```

```figure
src: chemistry/_iitian/functional-groups-s3-2-12-structural-analysis-ib-dp-chemistr/img/fig-4369294d4d0b9d68.png
caption: IR spectrum of propanone: the strong C=O absorption near 1700 cm⁻¹ identifies the carbonyl group.
```

```figure
src: chemistry/_iitian/functional-groups-s3-2-12-structural-analysis-ib-dp-chemistr/img/fig-721e1afdeae7e650.png
caption: ¹H NMR spectrum of propanone: all six protons are equivalent, so there is a single peak at 2.16 ppm.
```

```question
ihd-calc
```

## Summary

- IHD counts rings + π bonds.
- MS: molecular ion gives Mr; fragments show groups lost.
- IR: identifies bonds (O–H, C=O, …).
- ¹H NMR: number of environments, shift, integration and n + 1 splitting.
