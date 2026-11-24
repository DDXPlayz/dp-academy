---
code: A.4.3
title: Moment of inertia and τ = Iα
summary: Why a hoop is harder to spin than a disc of the same mass — rotational inertia and Newton’s second law for rotation.
minutes: 25
difficulty: 3
hl: true
objectives:
  - Explain how moment of inertia depends on mass and its distribution about the axis.
  - Calculate the moment of inertia of a system of point masses, I = Σmr².
  - Apply Newton’s second law for rotation, τ = Iα.
prerequisites:
  - Torque
  - Angular acceleration
formulas:
  - name: Moment of inertia (point masses)
    latex: 'I = \sum m r^2'
    where: r is each mass’s perpendicular distance from the axis.
  - name: Newton’s second law for rotation
    latex: '\tau = I\alpha'
    where: τ is the resultant (average) torque about the axis.
definitions:
  - term: Moment of inertia
    definition: The resistance of a body to angular acceleration about a given axis, I = Σmr². Measured in kg m².
mistakes:
  - Treating moment of inertia as a fixed property of an object. It depends on the axis — the same rod is much easier to spin about its centre than about one end.
  - Using the radius rather than r² — mass twice as far from the axis contributes four times as much to I.
tips:
  - Formulas for the moment of inertia of standard shapes (rods, discs, spheres) are given in questions when needed; you only need to derive I for point masses.
  - In τ = Iα problems with a string wrapped round a pulley, write one equation for the hanging mass (F = ma) and one for the pulley (τ = Iα), then link them with a = αr.
related:
  - physics/a2-forces-momentum
---

## Rotational inertia

Mass measures how hard it is to change an object’s velocity. The rotational equivalent, the **moment of inertia** $I$, measures how hard it is to change an object’s **angular** velocity. It depends not only on how much mass there is, but on **where** that mass sits relative to the axis.

For a set of point masses,

$$
I = \sum m r^2
$$

The $r^2$ is crucial: mass far from the axis counts for much more than mass near it.

```svg
caption: Same total mass, different distribution. The hoop’s mass is all at the rim, so its moment of inertia is larger.
<svg viewBox="0 0 420 170">
  <circle cx="110" cy="85" r="60" fill="var(--accent)" opacity="0.18" stroke="var(--accent)" stroke-width="2"/>
  <circle cx="110" cy="85" r="4" fill="currentColor"/>
  <text x="110" y="165" text-anchor="middle" font-size="13" fill="currentColor">disc: I = ½MR²</text>
  <circle cx="310" cy="85" r="60" fill="none" stroke="var(--accent)" stroke-width="9"/>
  <circle cx="310" cy="85" r="4" fill="currentColor"/>
  <text x="310" y="165" text-anchor="middle" font-size="13" fill="currentColor">hoop: I = MR²</text>
</svg>
```

```example
Two 0.50 kg masses are fixed to the ends of a light rod 0.60 m long. Find the moment of inertia about (a) the centre of the rod, (b) one end.
---
(a) Each mass is 0.30 m from the axis: $I = 2 \times 0.50 \times 0.30^2 = 0.090$ kg m².

(b) One mass is on the axis ($r = 0$), the other is 0.60 m away: $I = 0.50 \times 0.60^2 = 0.18$ kg m².

The same object has twice the moment of inertia about the end — it is harder to spin.
```

## Newton’s second law for rotation

A resultant torque produces an angular acceleration in proportion to it, and inversely proportional to the moment of inertia:

$$
\tau = I\alpha
$$

Compare $F = ma$: torque replaces force, moment of inertia replaces mass, angular acceleration replaces acceleration.

```keyidea
Every linear idea has a rotational twin: F → τ, m → I, a → α, v → ω, p = mv → L = Iω, ½mv² → ½Iω².
```

```example
A solid disc flywheel (I = 0.40 kg m²) is driven from rest by a constant resultant torque of 2.0 N m. How long does it take to reach 50 rad s⁻¹?
---
$\alpha = \dfrac{\tau}{I} = \dfrac{2.0}{0.40} = 5.0$ rad s⁻².

$t = \dfrac{\omega_f - \omega_i}{\alpha} = \dfrac{50}{5.0} = 10$ s.
```

```example
A 2.0 kg mass hangs from a light string wrapped round a pulley of radius 0.10 m and moment of inertia 0.020 kg m². Find the acceleration of the mass. (Take g = 9.8 m s⁻².)
---
Let $T$ be the tension and $a$ the downward acceleration.

Hanging mass: $mg - T = ma \Rightarrow 19.6 - T = 2.0a$.

Pulley: $Tr = I\alpha$ with $\alpha = a/r$, so $T = \dfrac{Ia}{r^2} = \dfrac{0.020\,a}{0.010} = 2.0a$.

Adding: $19.6 = 4.0a$, so $a = 4.9$ m s⁻² — half of $g$, because the pulley’s inertia also has to be accelerated.
```

```mistake
In pulley problems the tension is not equal to the weight once things accelerate. If it were, there would be no resultant force on the hanging mass.
```

```question
inertia-two-masses
```

## Summary

- Moment of inertia $I = \sum mr^2$ measures resistance to angular acceleration; it depends on the axis.
- Mass far from the axis contributes far more because of the $r^2$.
- Newton’s second law for rotation is $\tau = I\alpha$.
