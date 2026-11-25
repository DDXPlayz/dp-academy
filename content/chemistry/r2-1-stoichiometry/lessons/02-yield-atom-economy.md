---
code: R2.1.3
title: Limiting reactant, yield and atom economy
summary: Which reactant runs out first, how much product you should get versus how much you do get, and how efficient a reaction is.
minutes: 30
difficulty: 2
objectives:
  - Identify the limiting and excess reactants.
  - Calculate theoretical and percentage yield.
  - Calculate atom economy and discuss it in terms of green chemistry.
formulas:
  - name: Percentage yield
    latex: '\%\text{ yield} = \frac{\text{experimental yield}}{\text{theoretical yield}}\times100'
  - name: Atom economy
    latex: '\text{atom economy} = \frac{M(\text{desired product})}{\sum M(\text{all reactants})}\times100'
definitions:
  - term: Limiting reactant
    definition: The reactant that is completely used up first, so it determines the maximum amount of product.
  - term: Theoretical yield
    definition: The maximum mass of product that could form from the limiting reactant.
  - term: Atom economy
    definition: The percentage of the total mass of reactants that ends up in the desired product.
mistakes:
  - Comparing masses to find the limiting reactant. Compare moles divided by their coefficients.
  - Confusing yield and atom economy. A reaction can have 100% yield but poor atom economy if it makes waste by-products.
tips:
  - Divide each reactant’s moles by its coefficient — the smallest value is limiting.
related:
  - chemistry/r2-1-stoichiometry
---

## Limiting reactant

```keyidea
The limiting reactant runs out first and fixes how much product forms. To find it, divide the moles of each reactant by its coefficient in the equation: the smallest result is limiting.
```

```figure
src: chemistry/_iitian/reactivity-2-1-how-much-r2-1-3-limiting-and-excess-reactants/img/fig-4eeb5f01f06193b8.png
caption: Limiting reactant: 5 carbon atoms can use only 5 of the 10 O₂ molecules, so carbon is limiting and 5 O₂ molecules are left in excess.
```

```example
5.00 g of aluminium (M = 26.98) reacts with 20.0 g of chlorine (M = 70.90). 2Al + 3Cl₂ → 2AlCl₃. Which is limiting, and what mass of AlCl₃ (M = 133.33) forms?
---
$n(\text{Al}) = 0.185$ mol → ÷2 = 0.0927. $n(\text{Cl}_2) = 0.282$ mol → ÷3 = 0.0940. Aluminium is limiting.

$n(\text{AlCl}_3) = 0.185$ mol → $m = 0.185\times133.33 = 24.7$ g.
```

## Percentage yield

$$
\%\text{ yield} = \frac{\text{experimental yield}}{\text{theoretical yield}}\times100
$$

```figure
src: chemistry/_iitian/reactivity-2-1-how-much-r2-1-4-percentage-yield-ib-dp-chemis/img/fig-b4236aa85347dbc9.png
caption: The theoretical yield is the most product the limiting reagent can make, using the mole ratio.
```

```figure
src: chemistry/_iitian/reactivity-2-1-how-much-r2-1-3-limiting-and-excess-reactants/img/fig-a1726ad393e3e67c.png
caption: Percentage yield = actual yield ÷ theoretical yield × 100; above 100% suggests an impure product, below 100% incomplete reaction or losses.
```

Yields are below 100% because of incomplete reactions, side reactions, losses during transfer and purification, and reversible reactions.

## Atom economy

$$
\text{atom economy} = \frac{M(\text{desired product})}{\sum M(\text{all reactants})}\times100
$$

```figure
src: chemistry/_iitian/reactivity-2-1-how-much-r2-1-3-limiting-and-excess-reactants/img/fig-8b177af94a033c2b.png
caption: Once the limiting reagent is used up the reaction stops, and some of the excess reagent is left over.
```

```figure
src: chemistry/_iitian/reactivity-2-1-how-muchr2-1-5-atom-economy-ib-dp-chemistry-s/img/fig-9945b8a21681e598.png
caption: High atom economy: all the reactant atoms end up in the desired product. Low atom economy: some become waste.
```

```figure
src: chemistry/_iitian/reactivity-2-1-how-muchr2-1-5-atom-economy-ib-dp-chemistry-s/img/fig-02751e0a6d41fa23.png
caption: Addition and rearrangement reactions have 100% atom economy; substitution and elimination reactions have less.
```

```example
Calculate the atom economy for making ethanol by fermentation: C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂. (M: glucose 180.18, ethanol 46.08)
---
$\dfrac{2\times46.08}{180.18}\times100 = 51.1\%$ — almost half the mass leaves as CO₂.
```

Addition reactions (one product) have **100%** atom economy. **Green chemistry** favours high atom economy, less waste, safer solvents and renewable feedstocks.

```question
limiting-id
```

## Summary

- Limiting reactant: smallest moles ÷ coefficient.
- % yield = experimental ÷ theoretical × 100.
- Atom economy = M(desired) ÷ ΣM(reactants) × 100; addition reactions reach 100%.
