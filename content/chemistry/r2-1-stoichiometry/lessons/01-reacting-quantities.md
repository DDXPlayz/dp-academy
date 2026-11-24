---
code: R2.1.1
title: Reacting masses, volumes and titrations
summary: Using the mole ratio in a balanced equation to find masses, gas volumes and solution concentrations.
minutes: 35
difficulty: 2
objectives:
  - Balance chemical equations, including state symbols.
  - Use mole ratios to calculate reacting masses and gas volumes.
  - Carry out titration calculations.
formulas:
  - name: Amount, mass, volume, concentration
    latex: 'n = \frac{m}{M} = \frac{V_{\text{gas}}}{V_m} = cV'
definitions:
  - term: Stoichiometry
    definition: The quantitative relationship between the amounts of reactants and products in a reaction, given by the coefficients of the balanced equation.
  - term: Equivalence point
    definition: The point in a titration where the reactants have been added in exactly the ratio given by the equation.
mistakes:
  - Using masses in the mole ratio. Convert to moles first; ratios apply to moles, not grams.
  - Forgetting to convert cm³ to dm³ (÷ 1000) when using c = n/V.
tips:
  - Three-step method — moles of the known → use the ratio → convert to the unknown quantity.
related:
  - chemistry/s1-4-the-mole
---

## The three-step method

```keyidea
1. Convert the known quantity to moles. 2. Use the mole ratio from the balanced equation. 3. Convert moles of the unknown into the quantity asked for.
```

```example
What mass of iron forms when 16.0 g of Fe₂O₃ reacts completely? Fe₂O₃ + 3CO → 2Fe + 3CO₂ (M: Fe₂O₃ 159.70, Fe 55.85)
---
$n(\text{Fe}_2\text{O}_3) = 16.0/159.70 = 0.100$ mol.

Ratio 1 : 2 → $n(\text{Fe}) = 0.200$ mol.

$m = 0.200\times55.85 = 11.2$ g.
```

## Gas volumes

At STP, $n = V/22.7$ (V in dm³). Or use $PV = nRT$ for other conditions.

```example
What volume of CO₂ at STP forms when 5.00 g of CaCO₃ (M = 100.09) reacts with excess acid? CaCO₃ + 2HCl → CaCl₂ + H₂O + CO₂
---
$n = 5.00/100.09 = 0.0500$ mol CaCO₃ → 0.0500 mol CO₂ → $V = 0.0500\times22.7 = 1.13$ dm³.
```

## Titrations

A **titration** finds an unknown concentration by reacting a measured volume with a standard solution until the **equivalence point**, shown by an indicator.

```example
25.0 cm³ of NaOH is neutralised by 21.6 cm³ of 0.100 mol dm⁻³ H₂SO₄. Find [NaOH]. H₂SO₄ + 2NaOH → Na₂SO₄ + 2H₂O
---
$n(\text{H}_2\text{SO}_4) = 0.100\times0.0216 = 2.16\times10^{-3}$ mol.

$n(\text{NaOH}) = 2\times2.16\times10^{-3} = 4.32\times10^{-3}$ mol.

$c = 4.32\times10^{-3}/0.0250 = 0.173$ mol dm⁻³.
```

**Good titration practice:** rinse the burette with the titrant and the pipette with the solution it will deliver; read the bottom of the meniscus; repeat until **concordant** titres (within 0.10 cm³) and average them.

```question
reacting-mass
```

## Summary

- Moles → ratio → answer.
- Gas: $n = V/V_m$ (22.7 dm³ mol⁻¹ at STP). Solution: $n = cV$ (V in dm³).
- Titration: use the known solution’s moles and the equation ratio to find the unknown concentration.
