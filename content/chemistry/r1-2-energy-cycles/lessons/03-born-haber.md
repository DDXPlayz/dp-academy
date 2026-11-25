---
code: R1.2.5
title: Born–Haber cycles
summary: A Hess cycle for ionic compounds that links lattice enthalpy to measurable energy changes.
minutes: 30
difficulty: 3
hl: true
objectives:
  - Define the enthalpy changes in a Born–Haber cycle.
  - Construct a Born–Haber cycle for a group 1 or 2 compound.
  - Calculate lattice enthalpy or another unknown from the cycle.
definitions:
  - term: Lattice enthalpy (ΔH⦵lattice)
    definition: The enthalpy change when one mole of a solid ionic compound is separated into its gaseous ions (endothermic).
  - term: Enthalpy of atomisation
    definition: The enthalpy change when one mole of gaseous atoms forms from the element in its standard state.
  - term: Electron affinity
    definition: The enthalpy change when one mole of gaseous atoms (or ions) gains one mole of electrons.
mistakes:
  - Using the bond enthalpy of Cl₂ for atomisation. Atomisation makes one mole of Cl atoms — half the Cl–Cl bond enthalpy.
  - Forgetting the second ionisation energy for a 2+ ion, or the endothermic second electron affinity of O.
tips:
  - With the IB definition, lattice enthalpy is positive. Solve the cycle as ΔHf = sum of all the other steps − lattice enthalpy.
related:
  - chemistry/s2-1-ionic-model
---

## The steps

For NaCl(s), the formation from elements can be broken into steps:

```figure
src: chemistry/_iitian/energy-cycles-in-reactions-r1-2-5-bornhaber-cycle-ib-dp-chem/img/fig-1592035a4959ba51.png
caption: A Born-Haber cycle links the formation of an ionic solid to atomisation, ionisation, electron affinity and lattice enthalpy.
```

```figure
src: chemistry/_iitian/energy-cycles-in-reactions-r1-2-5-bornhaber-cycle-ib-dp-chem/img/fig-0b5a805e9aeb838d.png
caption: Born-Haber cycle for potassium chloride, drawn as an energy-level diagram.
```

| Step | Process | Sign |
|---|---|---|
| Atomisation of Na | Na(s) → Na(g) | + |
| Atomisation of Cl | ½Cl₂(g) → Cl(g) | + |
| First IE of Na | Na(g) → Na⁺(g) + e⁻ | + |
| First EA of Cl | Cl(g) + e⁻ → Cl⁻(g) | − |
| Lattice enthalpy (reverse) | Na⁺(g) + Cl⁻(g) → NaCl(s) | − (i.e. −ΔH_lattice) |
| Formation | Na(s) + ½Cl₂(g) → NaCl(s) | − |

```keyidea
By Hess’s law: ΔHf = ΔHat(Na) + ΔHat(Cl) + IE₁ + EA₁ − ΔH_lattice. Lattice enthalpy can’t be measured directly, so it is calculated from the others.
```

```example
Calculate the lattice enthalpy of NaCl. Data / kJ mol⁻¹: ΔHf −411, ΔHat(Na) +107, ΔHat(Cl) +121, IE₁(Na) +496, EA(Cl) −349.
---
$-411 = 107 + 121 + 496 - 349 - \Delta H_\text{lattice}$

$\Delta H_\text{lattice} = 375 + 411 = +786$ kJ mol⁻¹.
```

## Doubly charged ions

For MgO, include the **second ionisation energy** of Mg and **both electron affinities** of O. The second EA (O⁻ + e⁻ → O²⁻) is **endothermic**, because an electron is added to a negative ion. MgO’s very large lattice enthalpy (~3800 kJ mol⁻¹) more than pays for these.

```figure
src: chemistry/_sme/energy-cycles-in-reactions/img/fig-63390a137870526b.png
caption: Born-Haber cycle for sodium chloride (kJ mol⁻¹); the lattice enthalpy is found from the other steps by Hess's law.
```

```question
born-haber-calc
```

## Summary

- Born–Haber: formation = atomisation + IE + EA − lattice enthalpy.
- Atomisation of a diatomic element is half the bond enthalpy.
- 2+ ions need IE₂; O²⁻ needs an endothermic second EA.
