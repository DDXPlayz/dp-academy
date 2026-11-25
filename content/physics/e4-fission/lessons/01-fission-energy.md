---
code: E.4.1
title: Fission and chain reactions
summary: Splitting heavy nuclei releases energy; the neutrons released can trigger more fissions in a chain reaction.
minutes: 25
difficulty: 2
objectives:
  - Describe spontaneous and neutron-induced fission and explain why energy is released.
  - Calculate the energy released in a fission reaction from masses or binding energies.
  - Explain the role of chain reactions and critical mass.
prerequisites:
  - Mass defect and binding energy
formulas:
  - name: Energy released
    latex: 'E = \Delta m\,c^2 = (\text{BE of products}) - (\text{BE of reactants})'
definitions:
  - term: Nuclear fission
    definition: The splitting of a heavy nucleus into two smaller nuclei of similar size, with the release of neutrons and energy.
  - term: Chain reaction
    definition: A self-sustaining sequence of fissions in which neutrons from one fission cause further fissions.
  - term: Critical mass
    definition: The minimum mass of fissile material needed for a chain reaction to be self-sustaining.
mistakes:
  - Thinking fast neutrons are best at causing fission in uranium-235. Slow (thermal) neutrons are far more likely to be absorbed.
  - Forgetting to balance the neutrons when writing fission equations.
tips:
  - Each U-235 fission releases about 200 MeV — mostly as kinetic energy of the fragments.
  - Check both A and Z balance — the incoming neutron counts on the left.
related:
  - physics/e3-nuclear
  - physics/e5-fusion-stars
---

## Splitting heavy nuclei

Heavy nuclei such as uranium-235 can split into two medium-sized nuclei. This **fission** can happen **spontaneously** (rarely) or be **induced** when the nucleus absorbs a neutron:

```figure
src: physics/_iitian/fission-ib-dp-physics-study-notes/img/fig-be669b6b03a417ae.png
caption: A uranium-235 nucleus absorbs a neutron, becomes unstable and splits into two smaller nuclei (here strontium-94 and xenon-140) plus neutrons.
```

$$
^1_0\text{n} + ^{235}_{92}\text{U} \rightarrow\ ^{236}_{92}\text{U} \rightarrow\ ^{141}_{56}\text{Ba} + ^{92}_{36}\text{Kr} + 3\,^1_0\text{n}
$$

The products are more tightly bound (higher binding energy per nucleon) than uranium, so the products have **less mass** and the difference is released as energy — about 200 MeV per fission, mostly as kinetic energy of the fragments and neutrons.

```example
Using binding energies per nucleon of 7.6 MeV (U-235), 8.3 MeV (Ba-141) and 8.7 MeV (Kr-92), estimate the energy released in the fission above.
---
Reactant BE: $235\times7.6 = 1786$ MeV. Product BE: $141\times8.3 + 92\times8.7 = 1170 + 800 = 1970$ MeV.

Energy released ≈ $1970 - 1786 = 184$ MeV — about 200 MeV.
```

## Chain reactions

```keyidea
Each fission releases 2–3 neutrons. If on average at least one of them goes on to cause another fission, the reaction sustains itself — a chain reaction.
```

```figure
src: physics/_sme/fission/img/fig-19c94dd09d339cf1.png
caption: A chain reaction: each fission releases two or three neutrons that can trigger further fissions.
```

```figure
src: physics/_iitian/fission-ib-dp-physics-study-notes/img/fig-40b456965449ad9b.png
caption: In the moderator, fast neutrons lose energy through repeated collisions until they are slow enough to cause fission efficiently.
```

- If on average **exactly one** neutron per fission causes another fission, the reaction proceeds at a steady rate — this is what a reactor aims for.
- If **more than one** does, the rate grows exponentially — an uncontrolled chain reaction, as in a weapon.
- Too small a lump of uranium lets most neutrons escape through the surface: there is a **critical mass** below which the chain cannot sustain itself.

```question
fission-balance
```

## Summary

- Fission splits a heavy nucleus into two medium nuclei plus neutrons, releasing ~200 MeV.
- Energy comes from the increase in binding energy per nucleon.
- Released neutrons can cause a chain reaction; critical mass is needed to sustain it.
