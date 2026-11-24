---
code: E.4.3
title: Nuclear power stations
summary: How a reactor keeps a chain reaction steady — moderators, control rods, heat exchangers and shielding — and what to do with the radioactive waste.
minutes: 25
difficulty: 2
objectives:
  - Describe the roles of the moderator, control rods, heat exchanger and shielding in a nuclear power station.
  - Describe the properties of fission products and how nuclear waste is managed.
prerequisites:
  - Fission and chain reactions
definitions:
  - term: Moderator
    definition: A material (such as water or graphite) that slows fast fission neutrons down to thermal speeds by collisions, so they can cause further fissions.
  - term: Control rods
    definition: Rods of a neutron-absorbing material (such as boron or cadmium) inserted into or withdrawn from the core to control the rate of fission.
  - term: Heat exchanger
    definition: A system that transfers thermal energy from the reactor coolant to water, making steam to drive turbines.
  - term: Fuel enrichment
    definition: Increasing the proportion of fissile U-235 in uranium fuel from about 0.7% to a few per cent.
mistakes:
  - Mixing up the moderator and the control rods. The moderator slows neutrons; control rods absorb them.
  - Saying the reactor produces electricity directly. It produces heat; turbines and generators do the rest.
tips:
  - Light nuclei make good moderators — a neutron loses most energy colliding with something of similar mass.
related:
  - physics/b4-thermodynamics
  - physics/d4-induction
---

## Inside a reactor

```svg
caption: A simplified pressurised water reactor. Energy flows from the core to the coolant, through the heat exchanger to make steam, and through the turbine and generator to the grid.
<svg viewBox="0 0 440 200">
  <rect x="20" y="40" width="120" height="130" rx="10" fill="none" stroke="currentColor" stroke-width="3"/>
  <text x="80" y="30" font-size="12" text-anchor="middle" fill="currentColor">shielding</text>
  <g fill="var(--bad)" opacity="0.8"><rect x="40" y="80" width="10" height="70"/><rect x="65" y="80" width="10" height="70"/><rect x="90" y="80" width="10" height="70"/><rect x="115" y="80" width="10" height="70"/></g>
  <g fill="currentColor"><rect x="53" y="55" width="8" height="70"/><rect x="103" y="55" width="8" height="70"/></g>
  <text x="80" y="185" font-size="11" text-anchor="middle" fill="currentColor">fuel rods · control rods · water moderator</text>
  <path d="M140 70 H 200 V 150 H 140" fill="none" stroke="var(--bad)" stroke-width="3"/>
  <rect x="190" y="60" width="70" height="100" rx="6" fill="none" stroke="var(--accent)" stroke-width="2"/>
  <text x="225" y="175" font-size="11" text-anchor="middle" fill="currentColor">heat exchanger</text>
  <path d="M260 80 H 320" stroke="var(--accent)" stroke-width="3" marker-end="url(#e42-a)"/>
  <text x="290" y="72" font-size="11" text-anchor="middle" fill="currentColor">steam</text>
  <circle cx="345" cy="80" r="22" fill="none" stroke="currentColor" stroke-width="2"/><text x="345" y="84" font-size="10" text-anchor="middle" fill="currentColor">turbine</text>
  <rect x="380" y="64" width="50" height="32" fill="none" stroke="currentColor" stroke-width="2"/><text x="405" y="84" font-size="10" text-anchor="middle" fill="currentColor">gen.</text>
  <defs><marker id="e42-a" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0 10 5 0 10z" fill="var(--accent)"/></marker></defs>
</svg>
```

| Part | Job |
|---|---|
| **Fuel rods** | Enriched uranium (a few per cent U-235) where fission happens |
| **Moderator** | Slows fast neutrons to thermal speeds by repeated collisions, so U-235 absorbs them |
| **Control rods** | Absorb neutrons. Push them in to slow the reaction, pull them out to speed it up — keeping one fission per fission |
| **Coolant / heat exchanger** | Carries thermal energy from the core to water in a separate loop, making steam that drives turbines |
| **Shielding** | Thick steel and concrete absorb neutrons and gamma rays to protect workers |

```keyidea
The moderator makes the chain reaction possible (slow neutrons); the control rods keep it steady (absorb extra neutrons).
```

```example
Why is graphite or water used as a moderator rather than lead?
---
A neutron loses the most energy in a collision with a nucleus of similar mass. Hydrogen (in water) and carbon are light; a neutron would bounce off a heavy lead nucleus losing almost no energy.
```

## Fission products and waste

The fission fragments are usually **neutron-rich**, so they are highly radioactive (mostly β⁻ emitters), some with long half-lives. Spent fuel also contains heavy elements such as plutonium.

Managing the waste:

- **Short term:** store spent fuel under water in cooling ponds — the water absorbs radiation and removes heat.
- **Reprocessing:** extract reusable uranium and plutonium.
- **Long term:** high-level waste is vitrified (set in glass), sealed in steel and stored deep underground in geologically stable sites for thousands of years.

```question
reactor-roles
```

## Summary

- Moderator slows neutrons; control rods absorb them; heat exchanger makes steam; shielding protects people.
- Fission products are neutron-rich and radioactive; waste is cooled, possibly reprocessed and stored deep underground.
