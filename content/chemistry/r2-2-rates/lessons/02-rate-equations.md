---
code: R2.2.9
title: Rate equations and mechanisms
summary: Orders of reaction, rate constants and their units, and how rate equations reveal multistep mechanisms.
minutes: 40
difficulty: 3
hl: true
objectives:
  - Deduce orders of reaction from experimental data and write rate equations.
  - Determine the units of the rate constant from the overall order.
  - Sketch and interpret concentration–time and rate–concentration graphs for zero, first and second order.
  - Relate the rate equation to the rate-determining step and molecularity in a mechanism.
formulas:
  - name: Rate equation
    latex: '\text{rate} = k[\text{A}]^m[\text{B}]^n'
definitions:
  - term: Order of reaction
    definition: The power to which the concentration of a reactant is raised in the rate equation.
  - term: Rate-determining step
    definition: The slowest step in a reaction mechanism; it determines the overall rate.
  - term: Molecularity
    definition: The number of particles reacting in an elementary step (unimolecular, bimolecular).
mistakes:
  - Taking orders from the balanced equation. Orders can only be found by experiment.
  - Including species that react after the rate-determining step in the rate equation.
tips:
  - Concentration doubles — rate ×1 (order 0), ×2 (order 1), ×4 (order 2).
  - A first-order reaction has a constant half-life.
related:
  - chemistry/r2-2-rates
---

## Rate equations

$$
\text{rate} = k[\text{A}]^m[\text{B}]^n
$$

$m$ and $n$ are the **orders** with respect to A and B; $m + n$ is the **overall order**; $k$ is the **rate constant** (fixed at a given temperature).

```keyidea
Orders must be found experimentally — they are not the coefficients of the balanced equation. They reflect the species involved in the slow step of the mechanism.
```

## Finding orders from initial rates

```example
For A + B → C:

| Exp | [A] / mol dm⁻³ | [B] / mol dm⁻³ | initial rate / mol dm⁻³ s⁻¹ |
|---|---|---|---|
| 1 | 0.10 | 0.10 | 2.0 × 10⁻³ |
| 2 | 0.20 | 0.10 | 4.0 × 10⁻³ |
| 3 | 0.10 | 0.20 | 8.0 × 10⁻³ |

Find the rate equation and k.
---
Exp 1→2: [A] doubles, rate doubles → first order in A. Exp 1→3: [B] doubles, rate ×4 → second order in B.

rate = k[A][B]²; $k = \dfrac{2.0\times10^{-3}}{0.10\times0.10^2} = 2.0$ dm⁶ mol⁻² s⁻¹.
```

## Units of k

| Overall order | Units of k |
|---|---|
| 0 | mol dm⁻³ s⁻¹ |
| 1 | s⁻¹ |
| 2 | dm³ mol⁻¹ s⁻¹ |
| 3 | dm⁶ mol⁻² s⁻¹ |

## Graphs

| Order | [A]–time graph | rate–[A] graph |
|---|---|---|
| 0 | straight line, falling | horizontal line |
| 1 | exponential decay, constant half-life | straight line through origin |
| 2 | steeper curve, half-life increases | parabola |

## Mechanisms

Most reactions occur in several **elementary steps**. The **slowest** is the **rate-determining step** (RDS). The rate equation contains the species (and their numbers) involved up to and including the RDS.

```example
For 2NO₂ + F₂ → 2NO₂F the rate equation is rate = k[NO₂][F₂]. Suggest a mechanism.
---
Step 1 (slow): NO₂ + F₂ → NO₂F + F. Step 2 (fast): NO₂ + F → NO₂F. The slow step is bimolecular, involving one NO₂ and one F₂ — matching the rate equation. The steps add up to the overall equation.
```

On an energy profile of a multistep reaction, each step has its own transition state; the RDS has the highest activation energy. **Intermediates** sit in the troughs between steps.

```question
order-from-data
```

## Summary

- rate = k[A]ᵐ[B]ⁿ; orders from experiment only.
- Units of k depend on overall order.
- Rate equation reflects the rate-determining step; steps must add to the overall equation.
