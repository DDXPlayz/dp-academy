---
code: B.4.2
title: Entropy and the second law
summary: Why heat flows from hot to cold and never the other way on its own — disorder, entropy changes and the arrow of time.
minutes: 30
difficulty: 3
hl: true
objectives:
  - Describe entropy as a measure of disorder.
  - Calculate entropy change using ΔS = ΔQ/T and relate entropy to the number of microstates, S = k_B ln Ω.
  - State the second law of thermodynamics in terms of entropy.
  - Explain why real processes are irreversible and how local entropy decreases are possible.
prerequisites:
  - First law of thermodynamics
formulas:
  - name: Entropy change (macroscopic)
    latex: '\Delta S = \frac{\Delta Q}{T}'
    where: ΔQ is the thermal energy transferred at absolute temperature T.
  - name: Entropy (microscopic)
    latex: 'S = k_B \ln\Omega'
    where: Ω is the number of possible microstates of the system.
definitions:
  - term: Entropy
    definition: A thermodynamic quantity that measures the disorder of a system — the number of ways its particles and energy can be arranged. Measured in J K⁻¹.
  - term: Second law of thermodynamics
    definition: The total entropy of an isolated system never decreases; for real (irreversible) processes it increases.
  - term: Irreversible process
    definition: A process that cannot be undone without leaving a change in the surroundings; all real processes are irreversible.
mistakes:
  - Saying entropy can never decrease. It can decrease locally (in a fridge, in a growing plant) as long as the surroundings gain at least as much.
  - Using °C in ΔS = ΔQ/T.
tips:
  - To show a process is possible, add up the entropy changes of everything involved and check the total is zero or positive.
  - When energy flows from hot to cold, the cold body gains more entropy than the hot body loses, because it is at a lower T.
related:
  - physics/b4-thermodynamics
---

## Some things only go one way

A hot drink cools to room temperature; it never spontaneously heats up by taking energy from the cooler room. A drop of ink spreads through water; it never gathers itself back together. The first law allows both directions — energy is conserved either way. Something else decides which way things go. That something is **entropy**.

## Entropy as disorder

**Entropy** $S$ measures how disordered a system is — more precisely, how many ways its particles and energy can be arranged. A gas has much more entropy than a crystal; spread-out energy has more entropy than concentrated energy.

Microscopically,

$$
S = k_B\ln\Omega
$$

where $\Omega$ is the number of **microstates** (particle-level arrangements) consistent with what we observe. Disordered states are overwhelmingly more probable simply because there are so many more ways to be disordered.

## Entropy change from heat

When thermal energy $\Delta Q$ is transferred at absolute temperature $T$,

$$
\Delta S = \frac{\Delta Q}{T}
$$

```example
1.0 kg of ice melts at 273 K. (L_f = 3.3 × 10⁵ J kg⁻¹) Find its entropy change.
---
$\Delta S = \dfrac{\Delta Q}{T} = \dfrac{3.3\times10^5}{273} = 1200$ J K⁻¹. Liquid water is more disordered than ice.
```

## The second law

```keyidea
The entropy of an isolated system never decreases. In every real (irreversible) process, the total entropy increases.
```

This explains the direction of heat flow. Suppose energy $Q$ leaves a hot body at $T_h$ and enters a cold body at $T_c$:

$$
\Delta S_{\text{total}} = -\frac{Q}{T_h} + \frac{Q}{T_c} > 0 \quad \text{because } T_c < T_h
$$

So hot-to-cold flow increases total entropy and happens spontaneously; cold-to-hot would decrease it and doesn’t happen on its own.

```example
200 J flows from a reservoir at 500 K to one at 300 K. Find the total entropy change.
---
$\Delta S = -\dfrac{200}{500} + \dfrac{200}{300} = -0.40 + 0.67 = +0.27$ J K⁻¹. Positive, as the second law requires.
```

## Local decreases of entropy

A refrigerator makes its inside colder and more ordered, lowering its entropy. This does not break the second law: the fridge’s motor does work, and the fridge dumps more thermal energy into the warm kitchen. The **total** entropy (inside + surroundings) still increases. Living things build ordered structures in the same way, at the cost of a larger entropy increase in their surroundings.

## Irreversibility

Real processes involve friction, turbulence, heat flow across temperature differences and mixing, all of which create entropy. They cannot be run backwards without leaving a trace. This one-way increase of entropy is often described as the **arrow of time**.

```question
entropy-total
```

## Summary

- Entropy measures disorder: $S = k_B\ln\Omega$; $\Delta S = \Delta Q/T$.
- Second law: the entropy of an isolated system never decreases and increases in real processes.
- Entropy can fall locally if the surroundings gain at least as much.
- Real processes are irreversible.
