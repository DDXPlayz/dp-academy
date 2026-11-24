---
code: R2.3.1
title: Dynamic equilibrium and the equilibrium constant
summary: What equilibrium means at the particle level, how to write K, and what its size tells you.
minutes: 30
difficulty: 2
objectives:
  - Describe the characteristics of dynamic equilibrium in a closed system.
  - Write the equilibrium constant expression K for a homogeneous reaction.
  - Interpret the magnitude of K and relate K for forward, reverse and multiplied equations.
formulas:
  - name: Equilibrium constant
    latex: 'aA + bB \rightleftharpoons cC + dD:\quad K = \frac{[C]^c[D]^d}{[A]^a[B]^b}'
definitions:
  - term: Dynamic equilibrium
    definition: The state of a reversible reaction in a closed system when the forward and backward rates are equal, so concentrations stay constant.
  - term: Equilibrium constant (K)
    definition: The ratio of product to reactant concentrations at equilibrium, each raised to its stoichiometric coefficient; constant at a given temperature.
mistakes:
  - Saying the reaction stops at equilibrium. Both reactions continue at equal rates.
  - Saying concentrations of reactants and products are equal. They are constant, not necessarily equal.
tips:
  - Reversing an equation gives K′ = 1/K; doubling the coefficients gives K′ = K².
related:
  - chemistry/r1-4-entropy
---

## Dynamic equilibrium

```keyidea
In a closed system a reversible reaction reaches dynamic equilibrium: the forward and backward reactions continue at equal rates, so the concentrations of all species stay constant (but are usually not equal).
```

```plot
caption: Approaching equilibrium. Reactant concentration falls and product rises until both level off; from then on the forward and backward rates are equal.
x: 0, 10
y: 0, 1.05
f: 0.35 + 0.65*exp(-0.6*x) | [reactant]
f: 0.65*(1 - exp(-0.6*x)) | [product]
xlabel: time
ylabel: concentration
```

Characteristics: closed system; constant macroscopic properties (colour, pressure); equilibrium can be reached from either direction.

## The equilibrium constant

For $a\text{A} + b\text{B} \rightleftharpoons c\text{C} + d\text{D}$:

$$
K = \frac{[\text{C}]^c[\text{D}]^d}{[\text{A}]^a[\text{B}]^b}
$$

```example
Write K for N₂(g) + 3H₂(g) ⇌ 2NH₃(g), and for 2NH₃(g) ⇌ N₂(g) + 3H₂(g).
---
$K = \dfrac{[\text{NH}_3]^2}{[\text{N}_2][\text{H}_2]^3}$. The reverse reaction has $K' = \dfrac{[\text{N}_2][\text{H}_2]^3}{[\text{NH}_3]^2} = \dfrac{1}{K}$.
```

## What K tells you

| K | Position of equilibrium |
|---|---|
| K ≫ 1 | lies far to the right — mainly products |
| K ≈ 1 | significant amounts of both |
| K ≪ 1 | lies far to the left — mainly reactants |

K depends **only on temperature**. Changing concentrations, pressure or adding a catalyst does not change K.

```question
k-expression
```

## Summary

- Dynamic equilibrium: closed system, equal forward and backward rates, constant concentrations.
- K = products^coefficients ÷ reactants^coefficients.
- Large K → products favoured; K changes only with temperature.
