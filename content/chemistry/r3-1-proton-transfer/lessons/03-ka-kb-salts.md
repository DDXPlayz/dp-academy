---
code: R3.1.9
title: pOH, Ka, Kb and salt solutions
summary: Quantifying weak acid and base strength, the Ka × Kb = Kw link, and predicting the pH of salt solutions.
minutes: 40
difficulty: 3
hl: true
objectives:
  - Interconvert [H⁺], [OH⁻], pH and pOH.
  - Write Ka and Kb expressions and use Ka, pKa, Kb and pKb.
  - Calculate the pH of weak acid and weak base solutions.
  - Use Ka × Kb = Kw for a conjugate pair.
  - Predict whether a salt solution is acidic, neutral or basic.
formulas:
  - name: pOH and pKw
    latex: '\text{pOH} = -\log[\text{OH}^-], \quad \text{pH} + \text{pOH} = 14.00\ \text{(298 K)}'
  - name: Acid dissociation constant
    latex: 'K_a = \frac{[\text{H}^+][\text{A}^-]}{[\text{HA}]}, \quad \text{p}K_a = -\log K_a'
  - name: Conjugate pair
    latex: 'K_a\times K_b = K_w, \quad \text{p}K_a + \text{p}K_b = 14.00'
definitions:
  - term: Acid dissociation constant (Ka)
    definition: The equilibrium constant for the ionisation of a weak acid; larger Ka (smaller pKa) means a stronger acid.
  - term: Base dissociation constant (Kb)
    definition: The equilibrium constant for B + H₂O ⇌ BH⁺ + OH⁻; larger Kb means a stronger base.
mistakes:
  - Using the pH formula for strong acids with a weak acid. For a weak acid, [H⁺] = √(Ka[HA]).
  - Forgetting that the stronger the acid, the weaker its conjugate base.
tips:
  - Weak acid approximation — assume [HA] at equilibrium ≈ initial concentration (valid when ionisation < 5%).
related:
  - chemistry/r2-3-equilibrium
---

## pOH

$$
\text{pOH} = -\log[\text{OH}^-], \qquad \text{pH} + \text{pOH} = 14.00 \text{ at 298 K}
$$

## Ka and pKa

For $\text{HA} \rightleftharpoons \text{H}^+ + \text{A}^-$:

```figure
src: chemistry/_sme/proton-transfer-reactions/img/fig-7572a18f5307afc0.png
caption: A weak acid is only slightly dissociated, so the equilibrium lies well to the left.
```

```figure
src: chemistry/_sme/proton-transfer-reactions/img/fig-578c2b234b50251e.png
caption: A stronger acid has a larger Ka and a smaller pKa; the same holds for bases with Kb and pKb.
```

$$
K_a = \frac{[\text{H}^+][\text{A}^-]}{[\text{HA}]}, \qquad \text{p}K_a = -\log K_a
$$

```keyidea
A larger Ka (smaller pKa) means a stronger acid. Because [H⁺] ≈ [A⁻] and [HA] ≈ initial concentration for a weak acid, [H⁺] ≈ √(Ka × c).
```

```example
Find the pH of 0.10 mol dm⁻³ ethanoic acid, Ka = 1.8 × 10⁻⁵.
---
$[\text{H}^+] = \sqrt{1.8\times10^{-5}\times0.10} = 1.34\times10^{-3}$; pH = 2.87.
```

## Kb and weak bases

For $\text{B} + \text{H}_2\text{O} \rightleftharpoons \text{BH}^+ + \text{OH}^-$: $K_b = \dfrac{[\text{BH}^+][\text{OH}^-]}{[\text{B}]}$.

```example
Find the pH of 0.050 mol dm⁻³ ammonia, Kb = 1.8 × 10⁻⁵.
---
$[\text{OH}^-] = \sqrt{1.8\times10^{-5}\times0.050} = 9.5\times10^{-4}$; pOH = 3.02; pH = 10.98.
```

## Conjugate pairs

$$
K_a\times K_b = K_w \qquad \text{p}K_a + \text{p}K_b = 14.00
$$

```figure
src: chemistry/_iitian/ib-dp-chemistry-r3-1-10-acid-and-base-strength-and-constants/img/fig-6851ddf000a88030.png
caption: Conjugate acid-base pairs differ by one proton; a weak acid has a strong conjugate base partner in this reaction.
```

The stronger an acid, the weaker its conjugate base.

## pH of salt solutions

| Salt from | Example | Solution |
|---|---|---|
| strong acid + strong base | NaCl | neutral |
| strong acid + weak base | NH₄Cl | acidic (NH₄⁺ donates H⁺) |
| weak acid + strong base | CH₃COONa | basic (CH₃COO⁻ accepts H⁺) |
| weak acid + weak base | CH₃COONH₄ | depends on relative Ka and Kb |

```figure
src: chemistry/_iitian/ib-dp-chemistry-r3-1-12-the-ph-of-a-salt-solution-study-note/img/fig-b110c586b4c70973.png
caption: Salt solutions can be acidic, neutral or basic depending on the strengths of the parent acid and base.
```

```figure
src: chemistry/_iitian/ib-dp-chemistry-r3-1-15-appropriate-indicators-for-titration/img/fig-91cba9077943e233.png
caption: Choosing an indicator: its colour-change range must fall within the steep part of the pH curve.
```

```figure
src: chemistry/_sme/proton-transfer-reactions/img/fig-4db2edd474dbbc66.png
caption: An ethanoate buffer: added H⁺ ions react with ethanoate ions, so the pH barely changes.
```

Small, highly charged metal ions (e.g. [Al(H₂O)₆]³⁺, [Fe(H₂O)₆]³⁺) also give acidic solutions.

```question
weak-acid-ph
```

## Summary

- pH + pOH = 14.00 at 298 K.
- Ka, Kb quantify weak acid/base strength; [H⁺] ≈ √(Ka c).
- Ka × Kb = Kw for a conjugate pair.
- Salt pH depends on the strengths of the parent acid and base.
