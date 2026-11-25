---
code: D.1.3
title: Gravitational potential and potential energy
summary: Energy in a gravitational field measured from infinity — potential, potential gradient and equipotential surfaces.
minutes: 30
difficulty: 3
hl: true
objectives:
  - Define gravitational potential energy and gravitational potential with zero at infinity.
  - Use Ep = −Gm₁m₂/r and V_g = −GM/r.
  - Relate field strength to potential gradient, g = −ΔV_g/Δr.
  - Calculate work done using W = mΔV_g.
  - Describe equipotential surfaces and their relation to field lines.
prerequisites:
  - Gravitational field strength
  - Work and energy
formulas:
  - name: Gravitational potential energy
    latex: 'E_p = -\frac{Gm_1m_2}{r}'
  - name: Gravitational potential
    latex: 'V_g = -\frac{GM}{r}'
  - name: Field as potential gradient
    latex: 'g = -\frac{\Delta V_g}{\Delta r}'
  - name: Work done moving a mass
    latex: 'W = m\Delta V_g'
definitions:
  - term: Gravitational potential energy
    definition: The work done to assemble a system of masses from infinite separation.
  - term: Gravitational potential
    definition: The work done per unit mass in bringing a small mass from infinity to a point, V_g, in J kg⁻¹.
  - term: Equipotential surface
    definition: A surface on which the gravitational potential is the same everywhere; no work is done moving along it.
mistakes:
  - Dropping the minus sign. Gravitational potential and potential energy are negative everywhere, rising towards zero at infinity.
  - Using mgh for large changes of height. mgh only works where g is roughly constant, close to a surface.
tips:
  - The potential is a scalar — for two masses just add the two potentials, no vectors needed.
  - Field lines cross equipotentials at right angles and point towards lower (more negative) potential.
related:
  - physics/d1-gravitation
---

## Why measure from infinity?

Near Earth’s surface we use $\Delta E_p = mg\Delta h$, choosing any convenient zero. For large distances $g$ changes, so we need a universal zero. The natural choice is **infinity**, where the force — and so any effect of the mass — has vanished.

## Gravitational potential energy

The **gravitational potential energy** of two masses is the work done to bring them together from infinite separation:

```figure
src: physics/_sme/gravitational-fields/img/fig-0fa6f46f3b0e7285.png
caption: Gravitational potential is negative and rises towards zero at infinity; the field strength is the negative gradient of the potential-distance graph.
```

$$
E_p = -\frac{Gm_1m_2}{r}
$$

It is **negative** because gravity is attractive: the masses do work as they come together, so the system ends with less energy than at infinity.

## Gravitational potential

The **gravitational potential** at a point is the potential energy per unit mass:

$$
V_g = -\frac{GM}{r}
$$

in J kg⁻¹. The work needed to move a mass $m$ between two points is

$$
W = m\Delta V_g
$$

```example
How much energy is needed to lift a 1000 kg satellite from Earth’s surface (r = 6.4 × 10⁶ m) to an orbit of radius 7.0 × 10⁶ m? (M = 6.0 × 10²⁴ kg)
---
$\Delta V_g = -GM\left(\dfrac{1}{7.0\times10^6} - \dfrac{1}{6.4\times10^6}\right) = -4.0\times10^{14} \times (-1.34\times10^{-8}) = 5.4\times10^6$ J kg⁻¹.

$W = m\Delta V_g = 1000 \times 5.4\times10^6 = 5.4\times10^9$ J (to raise it, not yet to give it orbital speed).
```

## Field strength as potential gradient

The field strength is the negative gradient of the potential:

$$
g = -\frac{\Delta V_g}{\Delta r}
$$

So on a graph of $V_g$ against $r$, the gradient at any point gives the field strength there.

```plot
caption: Gravitational potential around a planet (V ∝ −1/r). It is negative everywhere and approaches zero far away; its gradient is the field strength.
x: 1, 8
y: -1.05, 0.05
f: -1/x | V_g
xlabel: r / R
ylabel: V_g / (GM/R)
```

## Equipotentials

An **equipotential surface** joins points at the same potential. Around a spherical mass they are concentric spheres, closer together near the mass where the potential changes fastest.

```figure
src: physics/_sme/gravitational-fields/img/fig-ad17e68a8e7a6515.png
caption: Equipotential surfaces around Earth are concentric spheres, always perpendicular to the field lines.
```

```keyidea
Field lines are always perpendicular to equipotential surfaces. No work is done moving along an equipotential, because ΔV_g = 0.
```

```question
potential-work
```

## Summary

- $E_p = -Gm_1m_2/r$ and $V_g = -GM/r$, both zero at infinity and negative elsewhere.
- $W = m\Delta V_g$; $g = -\Delta V_g/\Delta r$.
- Equipotentials are perpendicular to field lines; no work is done along them.
