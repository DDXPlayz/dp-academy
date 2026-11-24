---
code: S1.4.1
title: The mole and molar mass
summary: Chemists count particles by weighing them. The mole is the bridge between grams on a balance and atoms in a reaction.
minutes: 25
difficulty: 1
objectives:
  - Define the mole in terms of the Avogadro constant.
  - Convert between mass, amount (in mol) and number of particles.
  - Determine empirical and molecular formulae from percentage composition.
  - Calculate the concentration of a solution in mol dm⁻³.
prerequisites:
  - Relative atomic mass
  - Writing chemical formulae
formulas:
  - name: Amount from mass
    latex: 'n = \frac{m}{M}'
    where: m is mass in g, M is molar mass in g mol⁻¹.
  - name: Number of particles
    latex: 'N = n N_A'
    where: N_A = 6.02 × 10²³ mol⁻¹ (the Avogadro constant).
  - name: Concentration
    latex: 'c = \frac{n}{V}'
    where: V in dm³, so c is in mol dm⁻³. 1 dm³ = 1000 cm³.
definitions:
  - term: Mole
    definition: The amount of substance containing exactly $6.022\,140\,76 \times 10^{23}$ elementary entities (atoms, molecules, ions or electrons).
  - term: Avogadro constant
    definition: The number of particles per mole, $N_A = 6.02 \times 10^{23}$ mol⁻¹.
  - term: Molar mass
    definition: The mass of one mole of a substance, in g mol⁻¹. Numerically equal to its relative formula mass.
  - term: Empirical formula
    definition: The simplest whole-number ratio of atoms of each element in a compound.
  - term: Molecular formula
    definition: The actual number of atoms of each element in one molecule; a whole-number multiple of the empirical formula.
mistakes:
  - Forgetting to convert cm³ to dm³ before using $c = n/V$.
  - Confusing molecules with atoms — one mole of O₂ contains $6.02 \times 10^{23}$ molecules but twice that many atoms.
  - Rounding the mole ratios too early when finding an empirical formula. Keep at least three significant figures until the final step.
tips:
  - Lay out empirical-formula working as a table with one column per element. Examiners award marks for each row.
  - Always quote units — g mol⁻¹ for molar mass, mol dm⁻³ for concentration.
related:
  - chemistry/r2-1-stoichiometry
  - chemistry/s1-5-ideal-gases
---

## Introduction

A single atom is far too small to weigh. But chemical equations are written in particles: one molecule of this reacts with two of that. The **mole** lets us count particles in practical amounts.

## What a mole is

One mole of anything contains $6.02 \times 10^{23}$ particles — the **Avogadro constant**, $N_A$. It is like a “dozen”, only vastly bigger.

The amount was chosen so that one mole of a substance has a mass in grams equal to its relative formula mass. One mole of carbon-12 atoms has a mass of exactly 12 g; one mole of water molecules (H₂O, $M_r = 18.02$) has a mass of 18.02 g.

```keyidea
Molar mass converts between **grams** and **moles**. The Avogadro constant converts between **moles** and **particles**. Almost every calculation in this topic is one or both of those steps.
```

## Mass, moles and particles

$$n = \frac{m}{M} \qquad N = nN_A$$

```example
How many water molecules are in 9.0 g of water? ($M = 18.02$ g mol⁻¹)
---
Amount: $n = \dfrac{9.0}{18.02} = 0.50$ mol.

Molecules: $N = 0.50 \times 6.02 \times 10^{23} = 3.0 \times 10^{23}$.
```

## Empirical and molecular formulae

Analysis tells us the percentage by mass of each element in a compound. Dividing each by the element’s atomic mass gives the **mole ratio**.

```example
A compound contains 40.0 % carbon, 6.7 % hydrogen and 53.3 % oxygen by mass. Find its empirical formula. ($A_r$: C = 12.01, H = 1.01, O = 16.00)
---
Assume 100 g of compound:

| | C | H | O |
|---|---|---|---|
| mass / g | 40.0 | 6.7 | 53.3 |
| amount / mol | 3.33 | 6.63 | 3.33 |
| ÷ smallest | 1.00 | 1.99 | 1.00 |

The ratio is 1 : 2 : 1, so the empirical formula is **CH₂O**.

If the molar mass is found to be 180 g mol⁻¹, then since CH₂O has $M = 30.0$ g mol⁻¹, the molecular formula has $180/30 = 6$ units: **C₆H₁₂O₆**.
```

## Concentration of solutions

The concentration of a solution tells you how many moles of solute are in each cubic decimetre:

$$c = \frac{n}{V}$$

```example
2.00 g of sodium hydroxide (NaOH, $M = 40.00$ g mol⁻¹) is dissolved in water to make 250 cm³ of solution. What is its concentration?
---
$n = \dfrac{2.00}{40.00} = 0.0500$ mol, and $V = 250$ cm³ $= 0.250$ dm³.

$$c = \frac{0.0500}{0.250} = 0.200\ \text{mol dm}^{-3}$$
```

```mistake
Using 250 instead of 0.250 for the volume gives an answer a thousand times too small. Convert cm³ to dm³ by dividing by 1000.
```

## Try it yourself

```question
moles-from-mass
```

```question
empirical-formula
```

## Summary

- One mole contains $6.02 \times 10^{23}$ particles.
- $n = m/M$ and $N = nN_A$.
- Empirical formula: the simplest whole-number mole ratio; molecular formula is a multiple of it.
- Concentration $c = n/V$ with $V$ in dm³.
