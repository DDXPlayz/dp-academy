---
code: B.5.1
title: Charge, current and potential difference
summary: What flows in a circuit, what pushes it, and how cells supply the energy — the vocabulary every circuit problem uses.
minutes: 25
difficulty: 1
objectives:
  - Define electric current as rate of flow of charge, I = Δq/Δt.
  - Define potential difference as work done per unit charge, V = W/q.
  - Describe chemical and solar cells as sources of emf.
  - Explain conductors and insulators in terms of mobile charge carriers.
  - Read and draw standard circuit symbols.
prerequisites:
  - Work and energy
formulas:
  - name: Current
    latex: 'I = \frac{\Delta q}{\Delta t}'
  - name: Potential difference
    latex: 'V = \frac{W}{q}'
definitions:
  - term: Electric current
    definition: The rate of flow of charge past a point, I = Δq/Δt, measured in amperes (1 A = 1 C s⁻¹).
  - term: Potential difference
    definition: The work done (energy transferred) per unit charge moving a positive charge between two points, measured in volts (1 V = 1 J C⁻¹).
  - term: Electromotive force (emf)
    definition: The work done per unit charge by a source (such as a cell) in driving charge round a complete circuit.
  - term: Conventional current
    definition: The direction in which positive charge would flow — from the positive terminal round the circuit to the negative terminal.
mistakes:
  - Saying current is “used up” in a component. The same current flows into and out of a resistor; it is energy that is transferred.
  - Confusing emf and potential difference. Emf is energy given to charge by a source; p.d. is energy transferred from charge to a component.
tips:
  - The charge on one electron is 1.60 × 10⁻¹⁹ C — use it to convert between a number of electrons and a charge.
  - Ammeters go in series (low resistance); voltmeters go in parallel (high resistance).
related:
  - physics/b5-current-circuits
---

## Charge and current

Electric **current** is a flow of charge. In metals the charge carriers are free electrons; in electrolytes they are ions. The current is the rate at which charge passes a point:

$$
I = \frac{\Delta q}{\Delta t}
$$

One ampere is one coulomb per second. **Conventional current** flows from the positive terminal of the supply to the negative terminal — opposite to the direction electrons actually move in a wire.

```example
A current of 0.40 A flows for 2.0 minutes. How much charge passes, and how many electrons is that?
---
$\Delta q = I\Delta t = 0.40 \times 120 = 48$ C.

Number of electrons $= \dfrac{48}{1.60\times10^{-19}} = 3.0\times10^{20}$.
```

## Conductors and insulators

Whether a material conducts depends on how many **mobile charge carriers** it has:

- **conductors** (metals) have many free electrons that can drift through the lattice;
- **insulators** (plastic, glass) have almost none — their electrons are bound to atoms;
- **semiconductors** lie in between, and their number of carriers increases with temperature.

## Potential difference and emf

Charges flowing round a circuit carry energy from the source to the components. The **potential difference** between two points is the energy transferred per unit charge:

$$
V = \frac{W}{q}
$$

One volt is one joule per coulomb.

A **cell** does work on the charges, giving them energy. The work done per unit charge by the source is its **electromotive force** (emf), $\varepsilon$, also measured in volts.

- **Chemical cells** convert chemical energy into electrical energy.
- **Solar (photovoltaic) cells** convert light energy directly into electrical energy.

```keyidea
Current tells you how much charge flows per second. Potential difference tells you how much energy each coulomb transfers. Multiply them and you get power: energy per second.
```

## Circuit diagrams

Circuits are drawn with standard symbols so that the arrangement is clear at a glance.

```svg
caption: Standard symbols. A cell’s longer line is its positive terminal.
<svg viewBox="0 0 440 140">
  <g stroke="currentColor" stroke-width="2" fill="none">
    <line x1="10" y1="40" x2="34" y2="40"/><line x1="34" y1="22" x2="34" y2="58"/><line x1="44" y1="30" x2="44" y2="50" stroke-width="4"/><line x1="44" y1="40" x2="68" y2="40"/>
    <line x1="100" y1="40" x2="114" y2="40"/><rect x="114" y="30" width="40" height="20"/><line x1="154" y1="40" x2="168" y2="40"/>
    <line x1="200" y1="40" x2="214" y2="40"/><circle cx="230" cy="40" r="16"/><line x1="246" y1="40" x2="260" y2="40"/>
    <line x1="290" y1="40" x2="304" y2="40"/><circle cx="320" cy="40" r="16"/><line x1="336" y1="40" x2="350" y2="40"/>
    <line x1="370" y1="40" x2="384" y2="40"/><rect x="384" y="30" width="40" height="20"/><line x1="380" y1="62" x2="428" y2="18"/>
  </g>
  <text x="230" y="45" font-size="14" text-anchor="middle" fill="currentColor">A</text>
  <text x="320" y="45" font-size="14" text-anchor="middle" fill="currentColor">V</text>
  <g font-size="12" fill="var(--muted)" text-anchor="middle">
    <text x="39" y="85">cell</text><text x="134" y="85">resistor</text><text x="230" y="85">ammeter</text><text x="320" y="85">voltmeter</text><text x="404" y="85">variable resistor</text>
  </g>
  <text x="34" y="18" font-size="11" fill="var(--muted)">+</text>
</svg>
```

```mistake
An ideal ammeter has zero resistance and goes in series; an ideal voltmeter has infinite resistance and goes in parallel across the component. Swapping them changes the circuit.
```

```question
charge-from-current
```

## Summary

- $I = \Delta q/\Delta t$ (A = C s⁻¹); conventional current flows + to −.
- $V = W/q$ (V = J C⁻¹); emf is the work per unit charge done by a source.
- Cells (chemical, solar) provide emf; conductors have mobile charge carriers, insulators do not.
