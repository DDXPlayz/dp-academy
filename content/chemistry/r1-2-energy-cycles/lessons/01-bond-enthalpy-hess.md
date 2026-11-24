---
code: R1.2.1
title: Bond enthalpies and Hess’s law
summary: Breaking bonds costs energy, making bonds releases it — and the total enthalpy change doesn’t depend on the route.
minutes: 35
difficulty: 2
objectives:
  - Explain why bond breaking is endothermic and bond forming is exothermic.
  - Calculate ΔH from average bond enthalpies and explain why the result is approximate.
  - Apply Hess’s law to calculate enthalpy changes using energy cycles.
formulas:
  - name: ΔH from bond enthalpies
    latex: '\Delta H = \sum(\text{bonds broken}) - \sum(\text{bonds formed})'
definitions:
  - term: Bond enthalpy
    definition: The energy needed to break one mole of a covalent bond in gaseous molecules, averaged over a range of compounds.
  - term: Hess’s law
    definition: The enthalpy change for a reaction is independent of the pathway between the initial and final states.
mistakes:
  - Subtracting the wrong way round. It is broken − formed (energy in − energy out).
  - Using bond enthalpies for liquids or solids. They apply to gases; results for other states are less accurate.
tips:
  - In a Hess cycle, follow the arrows. Going against an arrow, change the sign of its ΔH.
related:
  - chemistry/r1-1-enthalpy
---

## Bond breaking and making

```keyidea
Breaking bonds absorbs energy (endothermic). Forming bonds releases energy (exothermic). A reaction is exothermic overall if more energy is released forming the products’ bonds than is absorbed breaking the reactants’ bonds.
```

$$
\Delta H = \sum(\text{bond enthalpies of bonds broken}) - \sum(\text{bond enthalpies of bonds formed})
$$

```example
Use bond enthalpies (kJ mol⁻¹: C–H 414, O=O 498, C=O 804, O–H 463) to estimate ΔH for CH₄(g) + 2O₂(g) → CO₂(g) + 2H₂O(g).
---
Broken: $4(414) + 2(498) = 2652$. Formed: $2(804) + 4(463) = 3460$.

$\Delta H = 2652 - 3460 = -808$ kJ mol⁻¹.
```

Bond-enthalpy answers are **approximate** because the values are **averages** over many compounds, and they apply only to the gaseous state.

## Hess’s law

The total enthalpy change from reactants to products is the same whichever route is taken. So an unknown ΔH can be found from a cycle of known ones.

```svg
caption: Hess’s law. The direct route ΔH₁ equals the indirect route ΔH₂ + ΔH₃.
<svg viewBox="0 0 360 180">
  <g font-size="13" text-anchor="middle" fill="currentColor"><text x="60" y="40">A</text><text x="300" y="40">B</text><text x="180" y="160">C</text></g>
  <line x1="75" y1="35" x2="285" y2="35" stroke="var(--accent)" stroke-width="2" marker-end="url(#r12-a)"/>
  <line x1="70" y1="50" x2="168" y2="146" stroke="currentColor" stroke-width="2" marker-end="url(#r12-k)"/>
  <line x1="192" y1="146" x2="290" y2="50" stroke="currentColor" stroke-width="2" marker-end="url(#r12-k)"/>
  <g font-size="12" fill="currentColor"><text x="170" y="26" fill="var(--accent)">ΔH₁</text><text x="90" y="110">ΔH₂</text><text x="250" y="110">ΔH₃</text></g>
  <defs>
    <marker id="r12-a" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 10 5 0 10z" fill="var(--accent)"/></marker>
    <marker id="r12-k" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 10 5 0 10z" fill="currentColor"/></marker>
  </defs>
</svg>
```

$$
\Delta H_1 = \Delta H_2 + \Delta H_3
$$

```example
Given: C(s) + O₂(g) → CO₂(g), ΔH = −394 kJ; CO(g) + ½O₂(g) → CO₂(g), ΔH = −283 kJ. Find ΔH for C(s) + ½O₂(g) → CO(g).
---
Route C → CO₂ directly (−394) equals C → CO (x) then CO → CO₂ (−283).

$x = -394 - (-283) = -111$ kJ mol⁻¹.
```

Equations can also be **added**: reverse an equation (change the sign of ΔH) or multiply it (multiply ΔH) until they sum to the target equation.

```question
bond-enthalpy-calc
```

## Summary

- ΔH = Σ broken − Σ formed; bond enthalpy results are approximate averages for gases.
- Hess: ΔH is route-independent — use cycles or add manipulated equations.
