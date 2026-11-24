---
code: R1.2.3
title: Enthalpies of formation and combustion
summary: Using standard enthalpies of formation and combustion to calculate the enthalpy change of any reaction.
minutes: 30
difficulty: 3
hl: true
objectives:
  - Define standard enthalpy of formation and standard enthalpy of combustion.
  - Calculate ΔH⦵ of a reaction from ΔHf⦵ data and from ΔHc⦵ data.
formulas:
  - name: From formation data
    latex: '\Delta H^\ominus = \sum\Delta H_f^\ominus(\text{products}) - \sum\Delta H_f^\ominus(\text{reactants})'
  - name: From combustion data
    latex: '\Delta H^\ominus = \sum\Delta H_c^\ominus(\text{reactants}) - \sum\Delta H_c^\ominus(\text{products})'
definitions:
  - term: Standard enthalpy of formation (ΔHf⦵)
    definition: The enthalpy change when one mole of a compound is formed from its elements in their standard states under standard conditions.
  - term: Standard enthalpy of combustion (ΔHc⦵)
    definition: The enthalpy change when one mole of a substance is completely burned in oxygen under standard conditions.
mistakes:
  - Forgetting that ΔHf⦵ of an element in its standard state (O₂(g), C(graphite)) is zero.
  - Mixing up the two formulas. Formation is products − reactants; combustion is reactants − products.
  - Forgetting to multiply by stoichiometric coefficients.
tips:
  - Both formulas come from Hess cycles — draw the cycle if unsure.
related:
  - chemistry/r1-2-energy-cycles
---

## Definitions

- **ΔHf⦵** — one mole of compound formed from its **elements in their standard states**. E.g. $\text{C(s)} + 2\text{H}_2\text{(g)} \rightarrow \text{CH}_4\text{(g)}$. For any element in its standard state, ΔHf⦵ = 0.
- **ΔHc⦵** — one mole of substance burned **completely** in oxygen. E.g. $\text{CH}_4 + 2\text{O}_2 \rightarrow \text{CO}_2 + 2\text{H}_2\text{O(l)}$.

## Using formation data

```keyidea
ΔH⦵ = ΣΔHf⦵(products) − ΣΔHf⦵(reactants). Both reactants and products can be made from the same elements, so the cycle closes.
```

```example
Calculate ΔH⦵ for C₂H₅OH(l) + 3O₂(g) → 2CO₂(g) + 3H₂O(l). ΔHf⦵ / kJ mol⁻¹: C₂H₅OH(l) −278, CO₂(g) −394, H₂O(l) −286.
---
Products: $2(-394) + 3(-286) = -1646$. Reactants: $-278 + 0 = -278$.

$\Delta H = -1646 - (-278) = -1368$ kJ mol⁻¹.
```

## Using combustion data

$$
\Delta H^\ominus = \sum\Delta H_c^\ominus(\text{reactants}) - \sum\Delta H_c^\ominus(\text{products})
$$

This works because both sides burn to the same products (CO₂ and H₂O).

```example
Find ΔHf⦵ of ethane from: ΔHc⦵ C(graphite) −394, H₂(g) −286, C₂H₆(g) −1561 kJ mol⁻¹. 2C + 3H₂ → C₂H₆.
---
Reactants: $2(-394) + 3(-286) = -1646$. Product: $-1561$.

$\Delta H_f = -1646 - (-1561) = -85$ kJ mol⁻¹.
```

```question
formation-calc
```

## Summary

- ΔHf⦵: from elements; zero for elements in standard states.
- ΔHc⦵: complete combustion of one mole.
- Formation: products − reactants. Combustion: reactants − products.
