---
code: R3.2.5
title: Voltaic, secondary and electrolytic cells
summary: Cells that turn spontaneous redox into electricity, rechargeable batteries, and electrolysis of molten salts.
minutes: 35
difficulty: 2
objectives:
  - Describe a primary (voltaic) cell, including electrodes, salt bridge and electron flow.
  - State that oxidation occurs at the anode and reduction at the cathode in all cells.
  - Describe secondary (rechargeable) cells.
  - Describe an electrolytic cell and predict the products of electrolysis of molten salts.
definitions:
  - term: Anode
    definition: The electrode where oxidation occurs.
  - term: Cathode
    definition: The electrode where reduction occurs.
  - term: Salt bridge
    definition: A connection (e.g. filter paper soaked in KNO₃) that lets ions move between half-cells to maintain electrical neutrality.
  - term: Electrolysis
    definition: Using electrical energy to drive a non-spontaneous redox reaction.
mistakes:
  - Assuming the anode is always positive. In a voltaic cell the anode is negative; in an electrolytic cell it is positive. Oxidation is always at the anode.
  - Saying electrons flow through the salt bridge. Ions move in the salt bridge; electrons move in the external wire.
tips:
  - An Ox and a Red Cat — Anode Oxidation, Reduction at the Cathode.
related:
  - chemistry/r1-3-fuels
---

## Voltaic (primary) cells

```keyidea
A voltaic cell converts the chemical energy of a spontaneous redox reaction into electrical energy. Electrons flow through the external circuit from the anode (oxidation, negative) to the cathode (reduction, positive).
```

```svg
caption: A zinc–copper voltaic cell. Electrons flow from zinc (anode) to copper (cathode) through the wire; ions flow through the salt bridge.
<svg viewBox="0 0 420 220">
  <rect x="30" y="100" width="130" height="100" fill="var(--accent-soft)" stroke="currentColor" stroke-width="2"/>
  <rect x="260" y="100" width="130" height="100" fill="none" stroke="currentColor" stroke-width="2"/>
  <rect x="85" y="60" width="16" height="120" fill="var(--muted)"/><rect x="317" y="60" width="16" height="120" fill="var(--bad)" opacity="0.7"/>
  <path d="M140 110 V 80 Q 210 40 280 80 V 110" fill="none" stroke="currentColor" stroke-width="10" opacity="0.25"/>
  <text x="210" y="70" font-size="11" text-anchor="middle" fill="currentColor">salt bridge</text>
  <path d="M93 60 V 25 H 325 V 60" fill="none" stroke="currentColor" stroke-width="2"/>
  <circle cx="210" cy="25" r="13" fill="var(--card)" stroke="currentColor" stroke-width="2"/><text x="210" y="29" font-size="11" text-anchor="middle" fill="currentColor">V</text>
  <line x1="120" y1="14" x2="170" y2="14" stroke="var(--accent)" stroke-width="2" marker-end="url(#r32-a)"/><text x="122" y="10" font-size="10" fill="var(--accent)">e⁻</text>
  <g font-size="11" fill="currentColor"><text x="40" y="214">Zn anode (−) · Zn²⁺(aq)</text><text x="262" y="214">Cu cathode (+) · Cu²⁺(aq)</text></g>
  <defs><marker id="r32-a" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 10 5 0 10z" fill="var(--accent)"/></marker></defs>
</svg>
```

- Anode (Zn, −): $\text{Zn} \rightarrow \text{Zn}^{2+} + 2e^-$
- Cathode (Cu, +): $\text{Cu}^{2+} + 2e^- \rightarrow \text{Cu}$
- The **salt bridge** lets ions flow to keep each half-cell neutral. Without it, no current flows.

The more different the reactivities of the two metals, the larger the cell voltage.

## Secondary (rechargeable) cells

In a secondary cell the redox reactions can be **reversed** by applying an external voltage. Examples: lead–acid (car batteries), nickel–metal hydride, lithium-ion. Discharging is voltaic; charging is electrolytic.

## Electrolytic cells

An external power supply forces a **non-spontaneous** reaction to occur.

| | Voltaic cell | Electrolytic cell |
|---|---|---|
| Energy change | chemical → electrical | electrical → chemical |
| Reaction | spontaneous | non-spontaneous |
| Anode | negative, oxidation | positive, oxidation |
| Cathode | positive, reduction | negative, reduction |

**Molten salts:** the metal forms at the cathode, the non-metal at the anode.

```example
Give the electrode equations for the electrolysis of molten lead(II) bromide.
---
Cathode (−): Pb²⁺ + 2e⁻ → Pb (reduction). Anode (+): 2Br⁻ → Br₂ + 2e⁻ (oxidation).
```

```question
cell-anode
```

## Summary

- Oxidation at the anode, reduction at the cathode — always.
- Voltaic: spontaneous, anode negative, electrons flow anode → cathode, salt bridge carries ions.
- Secondary cells are rechargeable. Electrolytic cells use electricity to drive non-spontaneous reactions; molten salts give metal at the cathode.
