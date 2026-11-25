---
code: R2.3.5
title: Reaction quotient and equilibrium calculations
summary: Using Q to predict the direction of change, ICE tables to find equilibrium compositions, and the link between K and ΔG.
minutes: 35
difficulty: 3
hl: true
objectives:
  - Calculate the reaction quotient Q and compare it with K to predict the direction of reaction.
  - Use ICE tables to calculate K or equilibrium concentrations.
  - Make approximations when K is very small.
  - Use ΔG⦵ = −RT ln K.
formulas:
  - name: Direction of change
    latex: 'Q < K \Rightarrow \text{forward};\quad Q > K \Rightarrow \text{backward}'
  - name: Gibbs energy and K
    latex: '\Delta G^\ominus = -RT\ln K'
definitions:
  - term: Reaction quotient (Q)
    definition: The ratio with the same form as K, calculated using concentrations that are not necessarily at equilibrium.
mistakes:
  - Using initial concentrations in K. K uses equilibrium concentrations — use an ICE table.
  - Forgetting to use moles per volume. Convert amounts to concentrations unless the moles of gas are equal on both sides.
tips:
  - If K is very small (< 10⁻³), assume the change x is negligible compared with initial concentrations.
related:
  - chemistry/r1-4-entropy
---

## The reaction quotient

$Q$ has the same form as $K$ but uses the **current** concentrations.

```figure
src: chemistry/_iitian/ib-dp-chemistry-r2-3-5-reaction-quotient-q-study-notes-new-s/img/fig-7e932c400faf77c0.png
caption: If Q < K the reaction moves to the right; if Q > K it moves to the left, until Q = K.
```

```keyidea
If Q < K, the reaction proceeds forward (more products) to reach equilibrium. If Q > K, it proceeds backward. If Q = K, the system is at equilibrium.
```

## ICE tables

**I**nitial, **C**hange, **E**quilibrium.

```example
0.200 mol H₂ and 0.200 mol I₂ are placed in a 1.00 dm³ flask: H₂ + I₂ ⇌ 2HI. At equilibrium [HI] = 0.316 mol dm⁻³. Find K.
---
| | H₂ | I₂ | HI |
|---|---|---|---|
| I | 0.200 | 0.200 | 0 |
| C | −0.158 | −0.158 | +0.316 |
| E | 0.042 | 0.042 | 0.316 |

$K = \dfrac{0.316^2}{0.042\times0.042} = 57$.
```

```example
For A ⇌ 2B, K = 1.0 × 10⁻⁶. [A]₀ = 0.10 mol dm⁻³. Find [B] at equilibrium.
---
Let [B] = 2x; [A] = 0.10 − x ≈ 0.10 (x is tiny because K is tiny).

$K = \dfrac{(2x)^2}{0.10} = 1.0\times10^{-6}$ → $4x^2 = 1.0\times10^{-7}$ → $x = 1.6\times10^{-4}$; [B] = 3.2 × 10⁻⁴ mol dm⁻³.
```

## K and Gibbs energy

$$
\Delta G^\ominus = -RT\ln K
$$

```figure
src: chemistry/_iitian/ib-dp-chemistry-r2-3-7-gibbs-free-energy-and-equilibrium-stu/img/fig-4805966c643f8a30.png
caption: Le Châtelier's principle: when a change is made, the position of equilibrium shifts to oppose it.
```

```figure
src: chemistry/_iitian/ib-dp-chemistry-r2-3-7-gibbs-free-energy-and-equilibrium-stu/img/fig-9152d15457ccdc00.png
caption: Gibbs energy is at its minimum when Q = K: there ΔG = 0, and on either side the reaction runs downhill towards equilibrium.
```

A negative ΔG⦵ gives K > 1 (products favoured); a positive ΔG⦵ gives K < 1.

```question
q-vs-k
```

## Summary

- Q vs K tells you the direction of change.
- ICE tables give equilibrium concentrations; use them in K.
- Small K → approximate the change as negligible.
- ΔG⦵ = −RT ln K.
