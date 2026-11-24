---
code: D.4.1
title: Magnetic flux and Faraday’s law
summary: Measuring how much magnetic field passes through a loop, and the law that links a changing flux to an induced emf.
minutes: 30
difficulty: 3
hl: true
objectives:
  - Define magnetic flux, Φ = BA cosθ, and flux linkage NΦ.
  - State Faraday’s law, ε = −NΔΦ/Δt.
  - Calculate the emf induced in a straight conductor moving through a field, ε = BvL.
  - Describe ways of inducing an emf in a coil.
prerequisites:
  - Forces on current-carrying conductors
formulas:
  - name: Magnetic flux
    latex: '\Phi = BA\cos\theta'
  - name: Faraday’s law
    latex: '\varepsilon = -N\frac{\Delta\Phi}{\Delta t}'
  - name: Emf in a moving conductor
    latex: '\varepsilon = BvL'
definitions:
  - term: Magnetic flux
    definition: The product of the magnetic flux density and the area it passes through, measured perpendicular to the field; unit weber (Wb = T m²).
  - term: Flux linkage
    definition: The flux through a coil multiplied by its number of turns, NΦ.
  - term: Faraday’s law
    definition: The induced emf in a circuit equals the rate of change of magnetic flux linkage through it.
mistakes:
  - Using sinθ in Φ = BA cosθ. θ is the angle between B and the normal to the area — flux is greatest when the field passes straight through the loop.
  - Thinking a large steady flux induces an emf. Only a changing flux does.
tips:
  - Read graphs carefully — emf is the gradient of a flux-linkage against time graph.
  - ε = BvL comes straight from Faraday — the rod sweeps out area vL every second.
related:
  - physics/d3-motion-in-fields
---

## Magnetic flux

**Magnetic flux** measures how much magnetic field passes through an area:

$$
\Phi = BA\cos\theta
$$

where $\theta$ is the angle between the field and the **normal** to the area. Flux is measured in webers (1 Wb = 1 T m²).

- Field perpendicular to the loop’s surface ($\theta = 0$): maximum flux, $\Phi = BA$.
- Field parallel to the surface ($\theta = 90^\circ$): zero flux.

For a coil of $N$ turns, the **flux linkage** is $N\Phi$.

## Faraday’s law

```keyidea
An emf is induced whenever the magnetic flux linking a circuit changes. The size of the emf equals the rate of change of flux linkage.
```

$$
\varepsilon = -N\frac{\Delta\Phi}{\Delta t}
$$

The flux can change because:

- the field strength changes (e.g. a magnet moves towards a coil, or the current in a nearby coil changes);
- the area in the field changes (a rod slides along rails, a loop enters a field);
- the angle changes (a coil rotates).

```example
A 200-turn coil of area 4.0 × 10⁻³ m² sits perpendicular to a field that falls steadily from 0.50 T to 0.10 T in 0.020 s. Find the size of the induced emf.
---
$\Delta\Phi = (0.50 - 0.10)\times4.0\times10^{-3} = 1.6\times10^{-3}$ Wb.

$\varepsilon = N\dfrac{\Delta\Phi}{\Delta t} = 200\times\dfrac{1.6\times10^{-3}}{0.020} = 16$ V.
```

## A conductor moving through a field

A straight rod of length $L$ moving at speed $v$ perpendicular to a field $B$ sweeps out area $Lv$ each second, so the rate of change of flux is $BLv$:

$$
\varepsilon = BvL
$$

Microscopically, the free electrons in the rod are carried through the field and feel a force $qvB$ along the rod; charge piles up at one end until the electric force balances it.

```example
A plane with wingspan 40 m flies at 250 m s⁻¹ where the vertical component of Earth’s field is 4.0 × 10⁻⁵ T. Find the emf between its wingtips.
---
$\varepsilon = BvL = 4.0\times10^{-5}\times250\times40 = 0.40$ V.
```

```question
faraday-coil
```

## Summary

- $\Phi = BA\cos\theta$ (Wb); flux linkage $N\Phi$.
- Faraday: $\varepsilon = -N\Delta\Phi/\Delta t$ — only a changing flux induces an emf.
- Moving rod: $\varepsilon = BvL$.
