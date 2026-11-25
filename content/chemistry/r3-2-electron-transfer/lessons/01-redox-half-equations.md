---
code: R3.2.1
title: Oxidation, reduction and half-equations
summary: Four ways to describe redox, writing and balancing half-equations, and the reactivity of metals and halogens.
minutes: 35
difficulty: 2
objectives:
  - Define oxidation and reduction in terms of electrons, oxidation state, oxygen and hydrogen.
  - Identify oxidising and reducing agents.
  - Write and combine half-equations, including in acidic solution.
  - Use the reactivity series to predict displacement reactions and reactions of metals with acids.
definitions:
  - term: Oxidation
    definition: Loss of electrons; increase in oxidation state (also gain of oxygen or loss of hydrogen).
  - term: Reduction
    definition: Gain of electrons; decrease in oxidation state (also loss of oxygen or gain of hydrogen).
  - term: Oxidising agent
    definition: A species that oxidises another and is itself reduced (it accepts electrons).
  - term: Reducing agent
    definition: A species that reduces another and is itself oxidised (it donates electrons).
mistakes:
  - Calling the species that is oxidised the oxidising agent. The oxidising agent is reduced.
  - Forgetting to balance charge in half-equations.
tips:
  - OIL RIG — Oxidation Is Loss, Reduction Is Gain (of electrons).
  - Balancing in acid — balance atoms other than O and H, add H₂O for O, H⁺ for H, then e⁻ for charge.
related:
  - chemistry/s3-1-periodic-table
---

## Four descriptions of redox

| | Oxidation | Reduction |
|---|---|---|
| Electrons | loss | gain |
| Oxidation state | increases | decreases |
| Oxygen | gain | loss |
| Hydrogen | loss | gain |

```figure
src: chemistry/_sme/electron-transfer-reactions/img/fig-acd0ba74767f2e2f.png
caption: An increase in oxidation state is oxidation; a decrease is reduction.
```

```figure
src: chemistry/_sme/electron-transfer-reactions/img/fig-0009d881f85c1fa8.png
caption: Hydrogen peroxide as an oxidising agent: it oxidises Fe²⁺ to Fe³⁺ and is itself reduced to water.
```

```keyidea
Oxidation and reduction always happen together. The oxidising agent gains electrons (is reduced); the reducing agent loses electrons (is oxidised).
```

## Half-equations

$$
\text{Zn} \rightarrow \text{Zn}^{2+} + 2e^- \qquad \text{(oxidation)}
$$

```figure
src: chemistry/_iitian/ib-dp-chemistry-r3-2-2-redox-half-equations-study-notes/img/fig-09c475964b7561b2.png
caption: Splitting a redox reaction into an oxidation half-equation and a reduction half-equation.
```

```figure
src: chemistry/_sme/electron-transfer-reactions/img/fig-08baed2e2d4d3aae.png
caption: Balancing by oxidation-number change: Mn falls by 5 while each Fe rises by 1, so five Fe²⁺ are needed for each MnO₄⁻.
```

$$
\text{Cu}^{2+} + 2e^- \rightarrow \text{Cu} \qquad \text{(reduction)}
$$

Combine so electrons cancel: $\text{Zn} + \text{Cu}^{2+} \rightarrow \text{Zn}^{2+} + \text{Cu}$.

```example
Write the half-equation for MnO₄⁻ → Mn²⁺ in acid, then combine it with Fe²⁺ → Fe³⁺ + e⁻.
---
Balance O with water: MnO₄⁻ → Mn²⁺ + 4H₂O. Balance H: MnO₄⁻ + 8H⁺ → Mn²⁺ + 4H₂O. Balance charge (+7 left, +2 right): add 5e⁻ on the left.

MnO₄⁻ + 8H⁺ + 5e⁻ → Mn²⁺ + 4H₂O

Multiply the iron half-equation by 5 and add: MnO₄⁻ + 8H⁺ + 5Fe²⁺ → Mn²⁺ + 4H₂O + 5Fe³⁺.
```

## Reactivity

- **Metals**: reactivity increases down a group and towards the left — they lose electrons more easily. A more reactive metal displaces a less reactive one from solution: Mg + CuSO₄ → MgSO₄ + Cu.
- **Halogens**: oxidising power decreases down group 17 (Cl₂ > Br₂ > I₂).
- **Metals with acids**: metals above hydrogen in the activity series release hydrogen: $\text{Mg} + 2\text{HCl} \rightarrow \text{MgCl}_2 + \text{H}_2$. Copper, silver and gold do not.

```figure
src: chemistry/_iitian/ib-dp-chemistry-r3-2-4-acid-metal-reactions-study-notes/img/fig-ca6a979ba3e9f469.png
caption: Oxidation is loss of electrons; reduction is gain of electrons. They always happen together.
```

```figure
src: chemistry/_sme/electron-transfer-reactions/img/fig-415d56973765f9d7.png
caption: The activity series: reactivity increases from platinum and gold up to potassium.
```

```figure
src: chemistry/_iitian/ib-dp-chemistry-r3-2-3-reactivity-of-elements-based-on-perio/img/fig-a5ad601b62bf8974.png
caption: Magnesium displaces hydrogen from acid: Mg is oxidised to Mg²⁺ and H⁺ ions are reduced to H₂.
```

```question
oxidising-agent
```

## Redox titrations

The amount of an oxidising or reducing agent can be found by titration, just as for acids and bases. Two common examples:

**Manganate(VII) titrations.** Acidified potassium manganate(VII) oxidises Fe²⁺ (and other reducing agents):

$$\text{MnO}_4^- + 8\text{H}^+ + 5\text{Fe}^{2+} \rightarrow \text{Mn}^{2+} + 5\text{Fe}^{3+} + 4\text{H}_2\text{O}$$

MnO₄⁻ is deep purple and Mn²⁺ is almost colourless, so no indicator is needed: the end point is the first permanent pale pink colour.

**Iodine–thiosulfate titrations.** An oxidising agent is first reacted with excess iodide ions, releasing iodine. The iodine is then titrated with sodium thiosulfate:

$$\text{I}_2 + 2\text{S}_2\text{O}_3^{2-} \rightarrow 2\text{I}^- + \text{S}_4\text{O}_6^{2-}$$

Starch is added near the end point; it turns blue-black with iodine, and the end point is when the blue-black colour disappears.

```example
25.0 cm³ of an Fe²⁺ solution needs 20.0 cm³ of 0.0200 mol dm⁻³ KMnO₄. Find [Fe²⁺].
---
$n(\text{MnO}_4^-) = 0.0200 \times 0.0200 = 4.00 \times 10^{-4}$ mol.

$n(\text{Fe}^{2+}) = 5 \times 4.00 \times 10^{-4} = 2.00 \times 10^{-3}$ mol.

$[\text{Fe}^{2+}] = \dfrac{2.00 \times 10^{-3}}{0.0250} = 0.0800\ \text{mol dm}^{-3}$
```

## Summary

- OIL RIG; oxidation state up = oxidised.
- Oxidising agent is reduced; reducing agent is oxidised.
- Half-equations: balance atoms, O (H₂O), H (H⁺), then charge (e⁻).
- More reactive metals displace less reactive ones and release H₂ from acids.
