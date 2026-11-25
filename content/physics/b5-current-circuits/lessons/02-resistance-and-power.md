---
code: B.5.2
title: Resistance, resistivity and electrical power
summary: Why wires resist current, how resistance depends on the wire’s shape and material, Ohm’s law, and the power dissipated in a resistor.
minutes: 30
difficulty: 2
objectives:
  - Explain the origin of resistance in terms of collisions of charge carriers with the lattice.
  - Use R = V/I and ρ = RA/L.
  - State Ohm’s law and distinguish ohmic from non-ohmic conductors using I–V graphs.
  - Calculate power using P = IV = I²R = V²/R.
prerequisites:
  - Current and potential difference
formulas:
  - name: Resistance
    latex: 'R = \frac{V}{I}'
  - name: Resistivity
    latex: '\rho = \frac{RA}{L}'
    where: A is cross-sectional area and L is length.
  - name: Electrical power
    latex: 'P = IV = I^2R = \frac{V^2}{R}'
definitions:
  - term: Resistance
    definition: The ratio of the potential difference across a component to the current through it, R = V/I, measured in ohms (Ω).
  - term: Resistivity
    definition: A property of a material, ρ = RA/L, measured in Ω m; it does not depend on the shape of the sample.
  - term: Ohm’s law
    definition: The current in a conductor is proportional to the potential difference across it, provided its temperature (and other physical conditions) stay constant.
mistakes:
  - Thinking R = V/I is Ohm’s law. R = V/I defines resistance for any component; Ohm’s law is the statement that R stays constant.
  - Using diameter instead of radius when finding the cross-sectional area A = πr² of a wire.
tips:
  - On an I–V graph, the resistance at a point is V/I for that point — not the gradient — for non-ohmic components.
  - Pick the power formula that uses the quantities you know, so you don’t have to find a third one.
related:
  - physics/b5-current-circuits
---

## Where resistance comes from

As free electrons drift through a metal, they keep colliding with the vibrating positive ions of the lattice. Each collision transfers some of their energy to the lattice, which heats the wire. These collisions oppose the current — that opposition is **resistance**:

```figure
src: physics/_sme/current-circuits/img/fig-4970c5a5922efbfc.png
caption: Resistance arises as drifting electrons collide with the vibrating metal ions of the lattice.
```

$$
R = \frac{V}{I}
$$

## Resistivity

A longer wire has more collisions along its length, so more resistance; a thicker wire offers more paths, so less resistance. Combining these:

```figure
src: physics/_iitian/ibdp-physics-slhl-b-5-current-and-circuits-study-notes-first/img/fig-37011c2771e5794d.png
caption: Resistance depends on the material (resistivity ρ), and grows with length L and falls with cross-sectional area A: R = ρL/A.
```

$$
R = \frac{\rho L}{A} \qquad \text{or} \qquad \rho = \frac{RA}{L}
$$

The **resistivity** $\rho$ depends only on the material and its temperature. Copper has $\rho \approx 1.7\times10^{-8}$ Ω m; rubber about $10^{13}$ Ω m.

```example
Find the resistance of a 2.0 m length of copper wire of diameter 0.50 mm. (ρ = 1.7 × 10⁻⁸ Ω m)
---
$A = \pi r^2 = \pi(0.25\times10^{-3})^2 = 1.96\times10^{-7}$ m².

$R = \dfrac{\rho L}{A} = \dfrac{1.7\times10^{-8} \times 2.0}{1.96\times10^{-7}} = 0.17$ Ω.
```

## Ohm’s law and I–V graphs

A conductor obeys **Ohm’s law** if the current through it is proportional to the p.d. across it at constant temperature. Its I–V graph is a straight line through the origin.

```figure
src: physics/_sme/current-circuits/img/fig-1418740ab785de49.png
caption: An ohmic resistor: current is proportional to potential difference, so the I-V graph is a straight line through the origin.
```

```figure
src: physics/_sme/current-circuits/img/fig-0179409b50439097.png
caption: A filament lamp is non-ohmic: as it heats up its resistance rises, so the I-V graph curves over.
```

```plot
caption: I–V graphs. An ohmic resistor is a straight line through the origin; a filament lamp curves because its resistance rises as it heats up.
x: -6, 6
y: -1.2, 1.2
f: x/6 | ohmic resistor
f: 0.42 * (x/abs(x)) * sqrt(abs(x)) | filament lamp
xlabel: V / V
ylabel: I / A
```

A **filament lamp** is non-ohmic: as the current increases, the filament gets hotter, its ions vibrate more, collisions become more frequent and the resistance rises. The graph bends towards the V-axis.

```keyidea
All resistors convert electrical energy into thermal energy — the heating effect of a current. This is useful in kettles and heaters and wasteful in power cables.
```

## Electrical power

The power transferred in a component is the energy per second:

$$
P = IV = I^2R = \frac{V^2}{R}
$$

```example
A 230 V kettle draws 8.7 A. Find its power and its resistance. How much energy does it transfer in 3.0 minutes?
---
$P = IV = 8.7 \times 230 = 2.0\times10^3$ W.

$R = V/I = 230/8.7 = 26$ Ω.

$E = Pt = 2.0\times10^3 \times 180 = 3.6\times10^5$ J.
```

```mistake
For a non-ohmic component, the resistance at a given point is V/I at that point, not the gradient of the I–V graph there.
```

```question
resistivity-wire
```

## Summary

- Resistance arises from collisions between charge carriers and lattice ions; $R = V/I$.
- $R = \rho L/A$, with resistivity a property of the material.
- Ohmic conductors have $I \propto V$ at constant temperature; a filament lamp is non-ohmic.
- Power: $P = IV = I^2R = V^2/R$.
