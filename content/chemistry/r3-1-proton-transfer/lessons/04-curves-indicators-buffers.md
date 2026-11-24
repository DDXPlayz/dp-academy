---
code: R3.1.13
title: pH curves, indicators and buffers
summary: Titration curves for strong and weak combinations, choosing an indicator, and how buffer solutions resist pH change.
minutes: 40
difficulty: 3
hl: true
objectives:
  - Sketch and interpret pH curves for strong/weak acid–base titrations.
  - Determine pKa from the half-equivalence point.
  - Explain how indicators work and choose an appropriate indicator.
  - Explain how buffers resist pH change and calculate buffer pH.
formulas:
  - name: Buffer pH
    latex: '\text{pH} = \text{p}K_a + \log\frac{[\text{A}^-]}{[\text{HA}]}'
definitions:
  - term: Half-equivalence point
    definition: The point where half the weak acid has been neutralised, so [HA] = [A⁻] and pH = pKa.
  - term: Buffer solution
    definition: A solution that resists a change in pH when small amounts of acid or alkali are added; made from a weak acid and its conjugate base (or a weak base and its conjugate acid).
  - term: Indicator end point
    definition: The pH at which an indicator changes colour, approximately at pH = pKa(indicator).
mistakes:
  - Expecting every equivalence point at pH 7. Weak acid–strong base is above 7; strong acid–weak base is below 7.
  - Thinking a buffer keeps pH completely constant. It only resists change, for small additions.
tips:
  - Choose an indicator whose colour-change range lies within the steep part of the curve.
related:
  - chemistry/r2-3-equilibrium
---

## Four pH curves

| Titration | Start pH | Equivalence pH | Steep section |
|---|---|---|---|
| strong acid + strong base | ~1 | 7 | long (≈ 3–11) |
| weak acid + strong base | ~3 | > 7 (~8–9) | shorter, in alkaline region |
| strong acid + weak base | ~1 | < 7 (~5) | shorter, in acidic region |
| weak acid + weak base | ~3 | depends | no sharp jump |

```plot
caption: Weak acid (pKa 4.76) titrated with strong base. A buffer region before equivalence; pH = pKa at half-equivalence (12.5 cm³); equivalence near pH 8.7.
x: 0.5, 40
y: 0, 14
f: 4.76 + log(x/(25-x)) | before equivalence
f: 14 + log(0.1*(x-25)/(x+25)) | after equivalence
vline: 25
vline: 12.5
xlabel: volume of NaOH added / cm³
ylabel: pH
```

## Finding pKa

At the **half-equivalence point**, half the HA has become A⁻, so [HA] = [A⁻] and

$$
\text{pH} = \text{p}K_a
$$

## Indicators

```keyidea
An indicator is a weak acid, HIn, whose acid form and conjugate base have different colours. It changes colour over about pKa(In) ± 1. Choose one whose range falls within the steep part of the pH curve.
```

| Indicator | Range | Suitable for |
|---|---|---|
| methyl orange | 3.1–4.4 | strong acid + weak base |
| bromothymol blue | 6.0–7.6 | strong acid + strong base |
| phenolphthalein | 8.3–10.0 | weak acid + strong base |

## Buffers

A buffer contains a weak acid and its conjugate base in similar amounts (e.g. CH₃COOH/CH₃COO⁻):

- Add H⁺: $\text{CH}_3\text{COO}^- + \text{H}^+ \rightarrow \text{CH}_3\text{COOH}$ — removed.
- Add OH⁻: $\text{CH}_3\text{COOH} + \text{OH}^- \rightarrow \text{CH}_3\text{COO}^- + \text{H}_2\text{O}$ — removed.

$$
\text{pH} = \text{p}K_a + \log\frac{[\text{A}^-]}{[\text{HA}]}
$$

```example
Find the pH of a buffer containing 0.20 mol dm⁻³ CH₃COOH and 0.10 mol dm⁻³ CH₃COONa (pKa = 4.76).
---
pH = 4.76 + log(0.10/0.20) = 4.76 − 0.30 = 4.46.
```

Buffers can be made by mixing a weak acid with its salt, or by partially neutralising a weak acid with a strong base (e.g. 2 mol CH₃COOH + 1 mol NaOH). Dilution does not change buffer pH, because the ratio stays the same.

```question
indicator-choice
```

## Summary

- Equivalence pH depends on strengths: >7 for weak acid + strong base, <7 for strong acid + weak base.
- pH = pKa at half-equivalence.
- Indicator range must lie in the steep section.
- Buffers: weak acid + conjugate base; pH = pKa + log([A⁻]/[HA]).
