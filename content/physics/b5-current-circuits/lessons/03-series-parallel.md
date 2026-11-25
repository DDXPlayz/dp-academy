---
code: B.5.3
title: Series, parallel and potential dividers
summary: How current and voltage share out in combinations of resistors, and how a potential divider (with an LDR or thermistor) makes a sensor.
minutes: 30
difficulty: 2
objectives:
  - State the rules for current and potential difference in series and parallel circuits.
  - Calculate the total resistance of series and parallel combinations.
  - Analyse potential divider circuits, including those with variable resistors, LDRs and thermistors.
prerequisites:
  - Resistance
formulas:
  - name: Resistors in series
    latex: 'R_{\text{total}} = R_1 + R_2 + \cdots'
  - name: Resistors in parallel
    latex: '\frac{1}{R_{\text{total}}} = \frac{1}{R_1} + \frac{1}{R_2} + \cdots'
  - name: Potential divider
    latex: 'V_{\text{out}} = V_{\text{in}}\frac{R_2}{R_1 + R_2}'
definitions:
  - term: Series
    definition: Components connected one after another, so the same current flows through each.
  - term: Parallel
    definition: Components connected across the same two points, so each has the same potential difference.
  - term: Potential divider
    definition: Two or more resistors in series used to split a supply voltage in proportion to their resistances.
mistakes:
  - Forgetting to take the reciprocal at the end of a parallel calculation.
  - Thinking adding a resistor in parallel increases total resistance. It always decreases it — there is an extra path for current.
tips:
  - The total resistance of resistors in parallel is always less than the smallest one.
  - In a potential divider, the bigger resistor gets the bigger share of the voltage.
related:
  - physics/b5-current-circuits
---

## Series circuits

In series, there is only one path, so:

- the **current is the same** everywhere: $I = I_1 = I_2$;
- the **p.d.s add up** to the supply: $V = V_1 + V_2$;
- the **resistances add**: $R_{\text{total}} = R_1 + R_2 + \cdots$

## Parallel circuits

In parallel, each branch is connected across the same two points, so:

- every branch has the **same p.d.**: $V = V_1 = V_2$;
- the **currents add**: $I = I_1 + I_2$;
- $\dfrac{1}{R_{\text{total}}} = \dfrac{1}{R_1} + \dfrac{1}{R_2} + \cdots$

```keyidea
Current splits at a junction and recombines (conservation of charge). Around any closed loop, the emfs equal the sum of the p.d.s (conservation of energy). These two rules — Kirchhoff’s laws — are behind every circuit calculation.
```

```example
A 6.0 Ω resistor is in series with a parallel pair of 4.0 Ω and 12 Ω resistors, connected to a 12 V supply of negligible internal resistance. Find the current from the supply and the current in the 12 Ω resistor.
---
Parallel pair: $\dfrac{1}{R} = \dfrac{1}{4.0} + \dfrac{1}{12} = \dfrac{4}{12}$, so $R = 3.0$ Ω.

Total: $6.0 + 3.0 = 9.0$ Ω, so $I = 12/9.0 = 1.33$ A.

P.d. across the pair $= 1.33 \times 3.0 = 4.0$ V, so the current in the 12 Ω resistor is $4.0/12 = 0.33$ A (and 1.0 A in the 4.0 Ω).
```

## Potential dividers

Two resistors in series share the supply voltage in proportion to their resistances:

$$
V_{\text{out}} = V_{\text{in}}\frac{R_2}{R_1 + R_2}
$$

```svg
caption: A potential divider. The output is taken across R₂; replacing R₂ with a thermistor or LDR makes the output depend on temperature or light.
<svg viewBox="0 0 380 220">
  <g stroke="currentColor" stroke-width="2" fill="none">
    <line x1="60" y1="20" x2="200" y2="20"/>
    <line x1="60" y1="200" x2="200" y2="200"/>
    <line x1="60" y1="20" x2="60" y2="95"/><line x1="42" y1="95" x2="78" y2="95"/><line x1="50" y1="105" x2="70" y2="105" stroke-width="4"/><line x1="60" y1="105" x2="60" y2="200"/>
    <line x1="200" y1="20" x2="200" y2="40"/><rect x="190" y="40" width="20" height="50"/><line x1="200" y1="90" x2="200" y2="130"/>
    <rect x="190" y="130" width="20" height="50"/><line x1="200" y1="180" x2="200" y2="200"/>
    <line x1="200" y1="110" x2="300" y2="110"/><line x1="200" y1="200" x2="300" y2="200"/>
  </g>
  <circle cx="300" cy="110" r="4" fill="currentColor"/><circle cx="300" cy="200" r="4" fill="currentColor"/>
  <text x="220" y="70" font-size="13" fill="currentColor">R₁</text>
  <text x="220" y="160" font-size="13" fill="currentColor">R₂</text>
  <text x="310" y="160" font-size="13" fill="var(--accent)">V_out</text>
  <text x="18" y="104" font-size="13" fill="currentColor">V_in</text>
</svg>
```

```example
A 9.0 V supply is connected across a 2.0 kΩ resistor in series with a 1.0 kΩ resistor. Find the p.d. across the 1.0 kΩ resistor.
---
$V_{\text{out}} = 9.0 \times \dfrac{1.0}{2.0 + 1.0} = 3.0$ V.
```

## Variable resistors and sensors

A **variable resistor** (rheostat or potentiometer) lets you adjust resistance by hand. Two sensors have resistance that varies by itself:

```figure
src: physics/_iitian/ibdp-physics-slhl-b-5-current-and-circuits-study-notes-first/img/fig-1e37857a57a69d1d.png
caption: Fixed resistors, variable resistors and a potentiometer (three terminals) used to control current or voltage.
```

- a **light-dependent resistor (LDR)** — resistance falls as light intensity increases;
- an **NTC thermistor** — resistance falls as temperature increases.

Put one in a potential divider and $V_{\text{out}}$ changes with light or temperature — the basis of automatic lights and thermostats.

```example
In the divider above, R₂ is replaced by an NTC thermistor. Explain what happens to V_out as the room warms.
---
As the temperature rises, the thermistor’s resistance falls. It takes a smaller share of the supply voltage, so $V_{\text{out}}$ across it **decreases**.
```

```question
parallel-total
```

## Summary

- Series: same current, p.d.s add, $R = R_1 + R_2 + \cdots$
- Parallel: same p.d., currents add, $1/R = 1/R_1 + 1/R_2 + \cdots$
- Potential divider: $V_{\text{out}} = V_{\text{in}}R_2/(R_1 + R_2)$; with an LDR or thermistor it becomes a sensor.
