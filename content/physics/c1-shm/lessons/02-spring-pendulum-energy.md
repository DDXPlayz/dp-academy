---
code: C.1.2
title: Springs, pendulums and energy in SHM
summary: The two classic oscillators and their period formulas, and how energy swaps between kinetic and potential every half-cycle.
minutes: 30
difficulty: 2
objectives:
  - Use T = 2π√(m/k) for a mass–spring system.
  - Use T = 2π√(l/g) for a simple pendulum.
  - Describe the energy changes during one cycle of SHM.
prerequisites:
  - Defining equation of SHM
  - Elastic and gravitational potential energy
formulas:
  - name: Mass–spring system
    latex: 'T = 2\pi\sqrt{\frac{m}{k}}'
    where: k is the spring constant in N m⁻¹.
  - name: Simple pendulum
    latex: 'T = 2\pi\sqrt{\frac{l}{g}}'
    where: valid for small angles of swing (below about 10°).
definitions:
  - term: Spring constant
    definition: The force per unit extension of a spring, k = F/x, in N m⁻¹.
  - term: Simple pendulum
    definition: A small, heavy bob on a light, inextensible string of length l, swinging through a small angle.
mistakes:
  - Including the bob’s mass in the pendulum formula. A pendulum’s period does not depend on its mass.
  - Using the pendulum formula for large swings — it is only accurate for small angles.
tips:
  - To find g experimentally, plot T² against l; the gradient is 4π²/g.
  - Time 10 or 20 oscillations and divide, to reduce the percentage uncertainty from reaction time.
related:
  - physics/a3-work-energy-power
---

## The mass–spring system

A mass $m$ on a spring of spring constant $k$ obeys Hooke’s law: the restoring force is $F = -kx$. Newton’s second law gives $a = -\dfrac{k}{m}x$ — SHM with $\omega^2 = k/m$, so

```figure
src: physics/_sme/simple-harmonic-motion/img/fig-f0974a6d9e0eb7b4.png
caption: A mass on a vertical spring: the restoring force and the acceleration always point towards the equilibrium position.
```

$$
T = 2\pi\sqrt{\frac{m}{k}}
$$

A heavier mass oscillates more slowly; a stiffer spring makes it faster. The same formula holds whether the spring is horizontal or vertical.

```example
A 0.40 kg mass on a spring oscillates with period 0.80 s. Find the spring constant.
---
$k = \dfrac{4\pi^2 m}{T^2} = \dfrac{4\pi^2 \times 0.40}{0.80^2} = 25$ N m⁻¹.
```

## The simple pendulum

For small swings, the component of the bob’s weight along its arc acts as a restoring force approximately proportional to displacement, giving SHM with

```figure
src: physics/_sme/simple-harmonic-motion/img/fig-05f833d25d814b19.png
caption: For a pendulum, the component of weight along the arc, mg sin θ, is the restoring force; for small angles it is proportional to the displacement.
```

$$
T = 2\pi\sqrt{\frac{l}{g}}
$$

```keyidea
A pendulum’s period depends only on its length and the gravitational field strength — not on the mass of the bob or (for small swings) on the amplitude.
```

```example
How long should a pendulum be to have a period of exactly 2.0 s, where g = 9.81 m s⁻²?
---
$l = \dfrac{gT^2}{4\pi^2} = \dfrac{9.81 \times 4.0}{4\pi^2} = 0.99$ m.
```

## Energy in SHM

Energy constantly changes form during an oscillation, but (with no friction) the total stays the same.

```figure
src: physics/_sme/simple-harmonic-motion/img/fig-4faeeae764dd5271.png
caption: Energy in SHM: kinetic energy is greatest at equilibrium, potential energy is greatest at the amplitude, and the total stays constant.
```

```figure
src: physics/_sme/simple-harmonic-motion/img/fig-079cd26f900ad0b4.png
caption: A swinging pendulum: maximum potential energy at the extremes, maximum kinetic energy at the lowest point.
```

- At the **extremes**, the object is momentarily at rest: all the energy is **potential** (elastic for a spring, gravitational for a pendulum).
- At the **equilibrium position**, it moves fastest: all the energy is **kinetic**.

```plot
caption: Energy against displacement for SHM. Kinetic and potential energy trade places; their sum, the total energy, is constant.
x: -1, 1
y: 0, 1.15
f: x^2 | potential energy
f: 1 - x^2 | kinetic energy
f: 1 | total energy
xlabel: x / x₀
ylabel: E / E_total
```

Kinetic energy and potential energy each go through two maxima per cycle, so they oscillate at **twice** the frequency of the motion itself.

```mistake
In a real oscillator, friction and air resistance gradually remove energy, so the amplitude decreases — this is damping (see C.4).
```

```question
pendulum-length
```

## Summary

- Mass–spring: $T = 2\pi\sqrt{m/k}$. Simple pendulum (small angles): $T = 2\pi\sqrt{l/g}$.
- Pendulum period is independent of bob mass.
- In SHM, energy switches between kinetic (max at equilibrium) and potential (max at the extremes); the total is constant without damping.
