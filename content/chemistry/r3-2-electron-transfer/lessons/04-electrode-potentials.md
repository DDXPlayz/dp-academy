---
code: R3.2.12
title: Standard electrode potentials
summary: The standard hydrogen electrode, calculating cell potentials, predicting spontaneity, and linking E⦵ to ΔG⦵.
minutes: 35
difficulty: 3
hl: true
objectives:
  - Describe the standard hydrogen electrode and define the standard electrode potential.
  - Calculate E⦵cell from standard electrode potentials.
  - Predict whether a redox reaction is spontaneous.
  - Use ΔG⦵ = −nFE⦵cell.
formulas:
  - name: Cell potential
    latex: 'E^\ominus_{\text{cell}} = E^\ominus_{\text{cathode}} - E^\ominus_{\text{anode}}'
  - name: Gibbs energy
    latex: '\Delta G^\ominus = -nFE^\ominus_{\text{cell}}, \quad F = 96\,500\ \text{C mol}^{-1}'
definitions:
  - term: Standard electrode potential (E⦵)
    definition: The potential of a half-cell relative to the standard hydrogen electrode, under standard conditions (298 K, 100 kPa, 1 mol dm⁻³).
  - term: Standard hydrogen electrode
    definition: Hydrogen gas at 100 kPa bubbled over platinum in 1 mol dm⁻³ H⁺ at 298 K; assigned E⦵ = 0.00 V.
mistakes:
  - Multiplying E⦵ by stoichiometric coefficients. Electrode potentials are intensive — never multiply them.
  - Using E⦵ in the ΔG formula without converting ΔG from J to kJ.
tips:
  - More positive E⦵ — stronger oxidising agent, reduced more easily (it is the cathode).
  - A positive E⦵cell means the reaction is spontaneous.
related:
  - chemistry/r1-4-entropy
---

## The standard hydrogen electrode

Half-cell potentials cannot be measured alone, so each is measured against a reference: the **standard hydrogen electrode** (SHE), $\text{H}^+(aq) + e^- \rightleftharpoons \tfrac{1}{2}\text{H}_2(g)$, defined as **0.00 V**.

## Reading E⦵ values

Half-equations in the data booklet are written as reductions, in order of E⦵:

| Half-equation | E⦵ / V |
|---|---|
| Zn²⁺ + 2e⁻ ⇌ Zn | −0.76 |
| Fe²⁺ + 2e⁻ ⇌ Fe | −0.45 |
| 2H⁺ + 2e⁻ ⇌ H₂ | 0.00 |
| Cu²⁺ + 2e⁻ ⇌ Cu | +0.34 |
| Ag⁺ + e⁻ ⇌ Ag | +0.80 |
| Cl₂ + 2e⁻ ⇌ 2Cl⁻ | +1.36 |

```keyidea
The more positive E⦵, the more readily the species on the left is reduced — a stronger oxidising agent. The more negative E⦵, the more readily the species on the right is oxidised — a stronger reducing agent.
```

## Cell potential and spontaneity

$$
E^\ominus_{\text{cell}} = E^\ominus_{\text{cathode}} - E^\ominus_{\text{anode}}
$$

The half-cell with the more positive E⦵ is the cathode. A reaction is **spontaneous** if $E^\ominus_{\text{cell}} > 0$.

```example
Calculate E⦵cell for a Cu/Ag cell and write the overall equation.
---
Ag⁺/Ag (+0.80) is more positive → cathode. E⦵cell = 0.80 − 0.34 = +0.46 V.

Cathode: 2Ag⁺ + 2e⁻ → 2Ag (the half-equation is doubled, E⦵ is not). Anode: Cu → Cu²⁺ + 2e⁻. Overall: Cu + 2Ag⁺ → Cu²⁺ + 2Ag.
```

## Linking to ΔG⦵

$$
\Delta G^\ominus = -nFE^\ominus_{\text{cell}}
$$

$n$ = moles of electrons transferred; $F$ = 96 500 C mol⁻¹. Positive E⦵ → negative ΔG⦵ → spontaneous.

```example
Find ΔG⦵ for the Cu/Ag cell above.
---
$n = 2$: ΔG⦵ = −2 × 96 500 × 0.46 = −88 800 J mol⁻¹ = −89 kJ mol⁻¹.
```

```question
ecell-calc
```

## Summary

- SHE = 0.00 V reference; E⦵ values are reduction potentials.
- E⦵cell = E⦵cathode − E⦵anode; positive → spontaneous.
- ΔG⦵ = −nFE⦵cell.
