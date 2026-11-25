---
code: D.1.4
title: Orbital speed, escape speed and orbital decay
summary: How fast a satellite must move to stay up, how fast a rocket must go to leave for good, and what a thin atmosphere does to an orbit.
minutes: 25
difficulty: 3
hl: true
objectives:
  - Derive and use the orbital speed, v = √(GM/r).
  - Derive and use the escape speed, v_esc = √(2GM/r).
  - Describe the energy of a satellite in a circular orbit.
  - Explain the effect of atmospheric drag on a satellite’s orbit.
prerequisites:
  - Gravitational potential energy
  - Circular motion
formulas:
  - name: Orbital speed
    latex: 'v_{\text{orbital}} = \sqrt{\frac{GM}{r}}'
  - name: Escape speed
    latex: 'v_{\text{esc}} = \sqrt{\frac{2GM}{r}}'
  - name: Energy in a circular orbit
    latex: 'E_k = \frac{GMm}{2r}, \quad E_p = -\frac{GMm}{r}, \quad E_{\text{total}} = -\frac{GMm}{2r}'
definitions:
  - term: Escape speed
    definition: The minimum speed an object needs at a point to reach infinity with no further propulsion, ignoring air resistance.
  - term: Orbital speed
    definition: The speed needed for a circular orbit of radius r around a mass M.
mistakes:
  - Thinking escape speed depends on the mass of the object. It depends only on the mass of the planet and the starting distance.
  - Saying drag slows a satellite down. Drag makes it lose energy and drop to a lower orbit, where it actually moves faster.
tips:
  - Escape speed is √2 times the orbital speed at the same radius.
  - Total energy of a bound orbit is negative; zero total energy is exactly enough to escape.
related:
  - physics/d1-gravitation
---

## Orbital speed

For a circular orbit, gravity provides the centripetal force:

$$
\frac{GMm}{r^2} = \frac{mv^2}{r} \quad\Rightarrow\quad v_{\text{orbital}} = \sqrt{\frac{GM}{r}}
$$

Satellites in lower orbits must move faster.

```example
Find the orbital speed of the ISS at 420 km above Earth. (M = 6.0 × 10²⁴ kg, R = 6.37 × 10⁶ m)
---
$r = 6.37\times10^6 + 0.42\times10^6 = 6.79\times10^6$ m.

$v = \sqrt{\dfrac{6.67\times10^{-11} \times 6.0\times10^{24}}{6.79\times10^6}} = 7.7\times10^3$ m s⁻¹.
```

## Energy of an orbiting satellite

Using $v^2 = GM/r$:

$$
E_k = \tfrac{1}{2}mv^2 = \frac{GMm}{2r}, \qquad E_p = -\frac{GMm}{r}, \qquad E_{\text{total}} = -\frac{GMm}{2r}
$$

The kinetic energy is half the size of the potential energy, and the total energy is negative — the satellite is **bound**.

## Escape speed

To escape to infinity, an object needs enough kinetic energy to make its total energy at least zero:

```figure
src: physics/_sme/gravitational-fields/img/fig-74f7038c6e7dcb65.png
caption: A projectile launched at the escape speed has enough kinetic energy to reach infinity.
```

$$
\tfrac{1}{2}mv_{\text{esc}}^2 - \frac{GMm}{r} = 0 \quad\Rightarrow\quad v_{\text{esc}} = \sqrt{\frac{2GM}{r}}
$$

```example
Find the escape speed from Earth’s surface.
---
$v_{\text{esc}} = \sqrt{\dfrac{2 \times 6.67\times10^{-11} \times 6.0\times10^{24}}{6.37\times10^6}} = 1.1\times10^4$ m s⁻¹ (about 11 km s⁻¹).
```

```keyidea
Escape speed is √2 × orbital speed at the same radius, and it does not depend on the escaping object’s mass.
```

## Atmospheric drag and orbital decay

Satellites in low orbits brush against the thin upper atmosphere. The small drag force does negative work, so the satellite’s **total energy decreases** (becomes more negative). Because $E_{\text{total}} = -GMm/2r$, a lower energy means a **smaller orbital radius**. And because $v = \sqrt{GM/r}$, the satellite ends up moving **faster**.

```figure
src: physics/_sme/gravitational-fields/img/fig-53c4f3a28b49f120.png
caption: A satellite in low orbit loses energy to atmospheric drag and gradually spirals inwards: orbital decay.
```

So drag makes a satellite spiral slowly inwards while speeding up — until it re-enters the denser atmosphere and burns up, unless its engines boost it back.

```example
Explain why a small drag force increases the speed of a satellite in a low orbit.
---
Drag removes energy, so the total energy $-GMm/2r$ becomes more negative and $r$ decreases. At the smaller radius the orbital speed $\sqrt{GM/r}$ is larger: the loss of potential energy exceeds the energy lost to drag, and kinetic energy increases.
```

```question
escape-orbital-ratio
```

## Summary

- $v_{\text{orbital}} = \sqrt{GM/r}$; $v_{\text{esc}} = \sqrt{2GM/r} = \sqrt{2}\,v_{\text{orbital}}$.
- In a circular orbit $E_k = GMm/2r$, $E_p = -GMm/r$, $E_{\text{total}} = -GMm/2r$.
- Atmospheric drag lowers the orbit and increases the speed.
