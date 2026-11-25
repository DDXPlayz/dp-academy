---
code: B.5.4
title: Emf and internal resistance
summary: Why a battery’s terminal voltage drops when it is working hard — modelling a real cell as an ideal emf plus a small resistor.
minutes: 25
difficulty: 3
objectives:
  - Model a real cell as an emf ε in series with an internal resistance r.
  - Use ε = I(R + r) and V = ε − Ir.
  - Determine ε and r from a graph of terminal p.d. against current.
prerequisites:
  - Series circuits
formulas:
  - name: Emf and internal resistance
    latex: '\varepsilon = I(R + r)'
  - name: Terminal potential difference
    latex: 'V = \varepsilon - Ir'
definitions:
  - term: Internal resistance
    definition: The resistance of the materials inside a cell, which causes some energy to be transferred inside the cell when current flows.
  - term: Terminal potential difference
    definition: The p.d. across the terminals of a cell when it is supplying current; it is less than the emf by the “lost volts” Ir.
mistakes:
  - Assuming the terminal p.d. always equals the emf. They are equal only when no current flows.
  - Reading the gradient of a V–I graph as +r. The gradient is −r; the intercept on the V-axis is ε.
tips:
  - “Lost volts” = Ir = the energy per coulomb transferred inside the cell.
  - In experiments, ε and r come from a straight-line graph of V against I.
related:
  - physics/b5-current-circuits
---

## Real cells are not ideal

Connect a voltmeter across a battery on its own and you read its emf, say 1.5 V. Connect a low-resistance bulb and the reading falls to perhaps 1.3 V. The missing 0.2 V is “lost” inside the battery, because the cell itself has resistance: its **internal resistance** $r$.

We model a real cell as an ideal emf $\varepsilon$ in series with a resistor $r$.

## The equations

Applying conservation of energy round the circuit with external resistance $R$:

```figure
src: physics/_iitian/terminal-potential-difference-and-the-potential-divider-ib-d/img/fig-3181c655e9c44397.png
caption: With no current, a voltmeter across a cell reads the emf; once current flows, some voltage is lost across the internal resistance r.
```

```figure
src: physics/_sme/current-circuits/img/fig-f5a8bf9a11d7a76a.png
caption: A real power supply: the emf in series with an internal resistance; the terminal p.d. is what the external load receives.
```

$$
\varepsilon = I(R + r) = IR + Ir
$$

The p.d. across the external resistor is the **terminal p.d.**:

$$
V = \varepsilon - Ir
$$

$Ir$ is often called the **lost volts** — energy per coulomb transferred to the inside of the cell, which warms up.

```keyidea
The more current a cell supplies, the more volts it loses internally. That is why a car’s headlights dim when the starter motor draws a huge current.
```

```example
A cell of emf 6.0 V and internal resistance 0.50 Ω is connected to a 2.5 Ω resistor. Find the current and the terminal p.d.
---
$I = \dfrac{\varepsilon}{R + r} = \dfrac{6.0}{3.0} = 2.0$ A.

$V = \varepsilon - Ir = 6.0 - 2.0 \times 0.50 = 5.0$ V.
```

## Measuring ε and r

Vary the external resistance, measure the terminal p.d. $V$ and current $I$ each time, and plot $V$ against $I$. Comparing with $V = -rI + \varepsilon$:

- the **intercept** on the V-axis is the emf $\varepsilon$;
- the **gradient** is $-r$.

```plot
caption: Terminal p.d. falls linearly with current. The intercept is the emf (1.5 V) and the gradient is −r (here r = 0.5 Ω).
x: 0, 3
y: 0, 1.8
f: 1.5 - 0.5x | V = ε − Ir
xlabel: I / A
ylabel: V / V
point: 0, 1.5 | ε
```

```example
A battery gives a terminal p.d. of 8.0 V when the current is 1.0 A, and 6.5 V when the current is 2.5 A. Find ε and r.
---
$8.0 = \varepsilon - 1.0r$ and $6.5 = \varepsilon - 2.5r$.

Subtracting: $1.5 = 1.5r \Rightarrow r = 1.0$ Ω, so $\varepsilon = 9.0$ V.
```

```mistake
Short-circuiting a cell (R ≈ 0) does not give infinite current — the current is limited to ε/r. For a car battery with tiny r, that can still be hundreds of amperes, which is dangerous.
```

```question
terminal-pd
```

## Summary

- A real cell = emf $\varepsilon$ in series with internal resistance $r$.
- $\varepsilon = I(R + r)$; terminal p.d. $V = \varepsilon - Ir$.
- On a V–I graph, intercept = $\varepsilon$, gradient = $-r$.
