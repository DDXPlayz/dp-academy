---
code: B.4.3
title: Cycles, heat engines and Carnot efficiency
summary: Turning heat into work with a gas that goes round and round — and the best efficiency any engine can ever reach.
minutes: 30
difficulty: 3
hl: true
objectives:
  - Explain how a cyclic process is used to run a heat engine.
  - Find the net work done in a cycle from a P–V diagram.
  - Calculate the efficiency of a heat engine.
  - Describe the Carnot cycle and calculate the Carnot efficiency.
prerequisites:
  - First law of thermodynamics
  - Entropy and the second law
formulas:
  - name: Efficiency of a heat engine
    latex: '\eta = \frac{\text{useful work}}{\text{input energy}} = \frac{W}{Q_h}'
  - name: Energy balance for a cycle
    latex: 'W = Q_h - Q_c'
  - name: Carnot efficiency
    latex: '\eta_{\text{Carnot}} = 1 - \frac{T_c}{T_h}'
definitions:
  - term: Heat engine
    definition: A device that takes thermal energy from a hot reservoir, converts part of it into work and rejects the rest to a cold reservoir, operating in a cycle.
  - term: Carnot cycle
    definition: An idealised reversible cycle of two isothermal and two adiabatic processes; it has the maximum possible efficiency for given reservoir temperatures.
mistakes:
  - Using °C in the Carnot formula. Reservoir temperatures must be in kelvin.
  - Thinking a perfect engine could reach 100% efficiency. The second law requires some energy to be rejected to the cold reservoir.
tips:
  - Net work in a cycle = area enclosed by the loop on a P–V diagram. Clockwise loops (on P vs V) are engines doing net work.
  - Over a complete cycle the gas returns to its starting state, so ΔU = 0 and net Q = net W.
related:
  - physics/b4-thermodynamics
---

## Why a cycle?

A gas expanding once can do work, but then it is done. To keep producing work, an engine takes its working gas through a **cycle** — a sequence of processes that returns it to its starting state — again and again.

Over a full cycle the gas ends where it started, so $\Delta U = 0$. By the first law, the **net thermal energy in equals the net work out**.

## The heat engine

Every heat engine:

1. takes in thermal energy $Q_h$ from a **hot reservoir** at $T_h$,
2. does useful work $W$,
3. rejects the rest, $Q_c$, to a **cold reservoir** at $T_c$.

$$
W = Q_h - Q_c \qquad \eta = \frac{W}{Q_h}
$$

```svg
caption: Energy flow in a heat engine. Some of the energy taken from the hot reservoir must always be rejected to the cold reservoir.
<svg viewBox="0 0 420 240">
  <rect x="140" y="10" width="140" height="40" rx="6" fill="var(--bad)" opacity="0.2" stroke="var(--bad)"/>
  <text x="210" y="35" font-size="13" text-anchor="middle" fill="var(--bad)">hot reservoir, T_h</text>
  <circle cx="210" cy="120" r="34" fill="none" stroke="currentColor" stroke-width="2"/>
  <text x="210" y="125" font-size="13" text-anchor="middle" fill="currentColor">engine</text>
  <rect x="140" y="190" width="140" height="40" rx="6" fill="var(--accent)" opacity="0.2" stroke="var(--accent)"/>
  <text x="210" y="215" font-size="13" text-anchor="middle" fill="var(--accent)">cold reservoir, T_c</text>
  <line x1="210" y1="52" x2="210" y2="84" stroke="var(--bad)" stroke-width="3" marker-end="url(#b43-h)"/>
  <text x="218" y="72" font-size="12" fill="var(--bad)">Q_h</text>
  <line x1="210" y1="156" x2="210" y2="188" stroke="var(--accent)" stroke-width="3" marker-end="url(#b43-c)"/>
  <text x="218" y="176" font-size="12" fill="var(--accent)">Q_c</text>
  <line x1="246" y1="120" x2="340" y2="120" stroke="var(--good)" stroke-width="3" marker-end="url(#b43-w)"/>
  <text x="300" y="112" font-size="12" fill="var(--good)">W = Q_h − Q_c</text>
  <defs>
    <marker id="b43-h" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 10 5 0 10z" fill="var(--bad)"/></marker>
    <marker id="b43-c" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 10 5 0 10z" fill="var(--accent)"/></marker>
    <marker id="b43-w" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 10 5 0 10z" fill="var(--good)"/></marker>
  </defs>
</svg>
```

## Work from a P–V diagram

On a P–V diagram a cycle is a closed loop. The **net work done by the gas is the area enclosed** by the loop: the work done during expansion (area under the upper path) minus the work done on the gas during compression (area under the lower path).

```example
A gas is taken round a rectangular cycle: expansion at 3.0 × 10⁵ Pa from 1.0 L to 4.0 L, cooling at constant volume, compression at 1.0 × 10⁵ Pa back to 1.0 L, then heating at constant volume. Find the net work per cycle.
---
Enclosed area $= \Delta P \times \Delta V = (3.0 - 1.0)\times10^5 \times (4.0 - 1.0)\times10^{-3} = 600$ J.
```

## The Carnot limit

The **Carnot cycle** — two isothermal and two adiabatic stages, all perfectly reversible — is the most efficient cycle possible between two reservoirs:

$$
\eta_{\text{Carnot}} = 1 - \frac{T_c}{T_h}
$$

```keyidea
No engine working between T_h and T_c can beat the Carnot efficiency. Because T_c is never zero, no heat engine can be 100% efficient — a consequence of the second law.
```

```example
A power station boiler produces steam at 820 K and its condenser is at 300 K. What is the maximum possible efficiency? If it actually takes in 2.0 GW of thermal power at 38% efficiency, how much power is rejected?
---
$\eta_{\text{Carnot}} = 1 - \dfrac{300}{820} = 0.63$ (63%).

Actual useful output $= 0.38 \times 2.0 = 0.76$ GW, so rejected $= 2.0 - 0.76 = 1.24$ GW.
```

```mistake
A real engine’s efficiency is always below the Carnot value, because of friction, turbulence and heat flow across finite temperature differences — all irreversible processes.
```

```question
carnot-efficiency
```

## Summary

- Heat engines run gases through cycles; over a cycle $\Delta U = 0$, so net $Q$ = net $W$.
- $W = Q_h - Q_c$ and $\eta = W/Q_h$; the net work is the area of the P–V loop.
- Carnot efficiency $1 - T_c/T_h$ is the upper limit for any engine between those temperatures.
