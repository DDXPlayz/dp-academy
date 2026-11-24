---
code: R3.1.6
title: Strong and weak acids, neutralisation and pH curves
summary: How the extent of ionisation distinguishes strong from weak acids and bases, neutralisation reactions, and the shape of a strong acid–strong base titration curve.
minutes: 30
difficulty: 2
objectives:
  - Distinguish strong and weak acids and bases by their extent of ionisation.
  - Compare strong and weak acids of equal concentration using pH, conductivity and rate of reaction.
  - Write equations for neutralisation reactions with bases, carbonates and metals.
  - Describe the pH curve for a strong acid–strong base titration.
definitions:
  - term: Strong acid
    definition: An acid that is (almost) completely ionised in water, e.g. HCl, HNO₃, H₂SO₄.
  - term: Weak acid
    definition: An acid that is only partially ionised in water, e.g. CH₃COOH, H₂CO₃.
  - term: Neutralisation
    definition: The reaction between an acid and a base to form a salt and water; H⁺ + OH⁻ → H₂O.
mistakes:
  - Confusing strong with concentrated. Strength is about extent of ionisation; concentration is about amount per volume.
tips:
  - Equal concentrations — the strong acid has the lower pH, higher conductivity and faster reactions.
  - Equal amounts of strong and weak acid need the same volume of alkali to neutralise.
related:
  - chemistry/r2-1-stoichiometry
---

## Strong and weak

```keyidea
Strong acids and bases ionise (almost) completely in water; weak acids and bases ionise only partially and set up an equilibrium.
```

$$
\text{HCl(aq)} \rightarrow \text{H}^+\text{(aq)} + \text{Cl}^-\text{(aq)} \qquad \text{CH}_3\text{COOH(aq)} \rightleftharpoons \text{CH}_3\text{COO}^-\text{(aq)} + \text{H}^+\text{(aq)}
$$

| | Strong | Weak |
|---|---|---|
| Acids | HCl, HNO₃, H₂SO₄ | carboxylic acids, H₂CO₃ |
| Bases | group 1 hydroxides, Ba(OH)₂ | NH₃, amines |

**Distinguishing them** at the same concentration: the strong acid has a **lower pH**, **higher conductivity** (more ions), and reacts **faster** with magnesium or carbonates (higher [H⁺]).

## Neutralisation reactions

- acid + base (metal oxide/hydroxide) → salt + water
- acid + carbonate → salt + water + carbon dioxide
- acid + reactive metal → salt + hydrogen
- acid + ammonia → ammonium salt

Ionic equation: $\text{H}^+\text{(aq)} + \text{OH}^-\text{(aq)} \rightarrow \text{H}_2\text{O(l)}$, ΔH ≈ −57 kJ mol⁻¹ for strong acid with strong base.

## Strong acid–strong base pH curve

```plot
caption: pH curve for adding 0.10 mol dm⁻³ NaOH to 25 cm³ of 0.10 mol dm⁻³ HCl. Steep vertical section around the equivalence point at pH 7 (25 cm³).
x: 0, 50
y: 0, 14
f: 7 + 6*(x-25)/sqrt((x-25)^2 + 2) | pH
vline: 25
hline: 7
xlabel: volume of NaOH added / cm³
ylabel: pH
```

Features: starts at pH 1, rises slowly, then a **steep jump** (≈ pH 3–11) at the **equivalence point** (pH 7), then levels off near pH 13.

```question
strong-vs-weak
```

## Summary

- Strong: fully ionised; weak: partially ionised (equilibrium).
- Same concentration: strong acid has lower pH, higher conductivity, faster reaction.
- Neutralisation: H⁺ + OH⁻ → H₂O; carbonates give CO₂; metals give H₂.
- Strong–strong pH curve: steep jump around pH 7 at equivalence.
