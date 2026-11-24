---
code: C.1.3
title: Phase and the equations of SHM
summary: Displacement, velocity and energy as functions of time — and the phase angle that says where in the cycle an oscillator is.
minutes: 30
difficulty: 3
hl: true
objectives:
  - Use the phase angle φ to describe the state of an oscillator.
  - Use x = x₀ sin(ωt + φ) and v = ωx₀ cos(ωt + φ).
  - Use v = ±ω√(x₀² − x²) to find speed at a given displacement.
  - Calculate kinetic, potential and total energy in SHM.
prerequisites:
  - Defining equation of SHM
  - Sine and cosine graphs
formulas:
  - name: Displacement and velocity against time
    latex: 'x = x_0\sin(\omega t + \phi), \quad v = \omega x_0\cos(\omega t + \phi)'
  - name: Speed at displacement x
    latex: 'v = \pm\omega\sqrt{x_0^2 - x^2}'
  - name: Energies
    latex: 'E_k = \tfrac{1}{2}m\omega^2(x_0^2 - x^2), \quad E_T = \tfrac{1}{2}m\omega^2 x_0^2, \quad E_p = \tfrac{1}{2}m\omega^2 x^2'
definitions:
  - term: Phase angle
    definition: The angle φ that sets where in its cycle an oscillator is at t = 0; two oscillators with different φ are out of phase.
  - term: Phase difference
    definition: The difference in phase angle between two oscillations, often expressed in radians or as a fraction of a cycle.
mistakes:
  - Having the calculator in degrees. ωt + φ is in radians.
  - Thinking the maximum velocity happens at the maximum displacement. v is maximum (ωx₀) at x = 0.
tips:
  - If the object starts at equilibrium moving in the + direction, φ = 0 and x = x₀ sin ωt. If it starts at +x₀, φ = π/2 so x = x₀ cos ωt.
  - Use the v–x formula when the question gives a position, not a time.
related:
  - physics/c1-shm
---

## Displacement as a function of time

A solution of $a = -\omega^2 x$ is a sine (or cosine) wave in time:

$$
x = x_0\sin(\omega t + \phi)
$$

The **phase angle** $\phi$ tells you where in the cycle the oscillator was at $t = 0$:

- $\phi = 0$: starting at equilibrium, moving in the positive direction;
- $\phi = \pi/2$: starting at maximum positive displacement, so $x = x_0\cos\omega t$.

Two oscillators with the same $\omega$ but different $\phi$ have a **phase difference**. A difference of $\pi$ means they are in **antiphase**: one is at $+x_0$ when the other is at $-x_0$.

## Velocity and acceleration

Differentiating gives

$$
v = \omega x_0\cos(\omega t + \phi) \qquad a = -\omega^2 x_0\sin(\omega t + \phi) = -\omega^2 x
$$

```plot
caption: For x = x₀ sin ωt, velocity leads displacement by a quarter cycle and acceleration is in antiphase with displacement.
x: 0, 12.57
y: -2.2, 2.2
f: sin(x) | x
f: cos(x) | v
f: -sin(x) * 2 | a
xlabel: ωt / rad
ylabel: value
```

When the phase is unknown, the speed at a given displacement follows from energy:

$$
v = \pm\omega\sqrt{x_0^2 - x^2}
$$

```example
A particle in SHM has amplitude 5.0 cm and period 0.50 s. Find its speed when its displacement is 3.0 cm.
---
$\omega = 2\pi/0.50 = 12.6$ rad s⁻¹.

$v = \omega\sqrt{x_0^2 - x^2} = 12.6\sqrt{0.050^2 - 0.030^2} = 12.6 \times 0.040 = 0.50$ m s⁻¹.
```

## Energy

$$
E_k = \tfrac{1}{2}m\omega^2(x_0^2 - x^2) \qquad E_p = \tfrac{1}{2}m\omega^2x^2 \qquad E_T = \tfrac{1}{2}m\omega^2x_0^2
$$

```keyidea
Total energy in SHM is proportional to the square of the amplitude. Double the amplitude and the oscillator holds four times the energy.
```

```example
A 0.20 kg mass oscillates on a spring with ω = 10 rad s⁻¹ and amplitude 0.15 m. It is released from x = +0.15 m at t = 0. Find (a) its displacement at t = 0.10 s, (b) its total energy.
---
It starts at maximum displacement, so $\phi = \pi/2$ and $x = x_0\cos\omega t$.

(a) $x = 0.15\cos(10 \times 0.10) = 0.15\cos(1.0) = 0.081$ m (calculator in radians).

(b) $E_T = \tfrac{1}{2}m\omega^2x_0^2 = \tfrac{1}{2}(0.20)(100)(0.0225) = 0.225$ J.
```

```mistake
In the equations ωt + φ is in radians. Leaving the calculator in degrees is the commonest way to lose these marks.
```

```question
shm-speed-x
```

## Summary

- $x = x_0\sin(\omega t + \phi)$; the phase angle $\phi$ sets the starting point in the cycle.
- $v = \omega x_0\cos(\omega t + \phi)$ and $v = \pm\omega\sqrt{x_0^2 - x^2}$.
- $E_T = \tfrac{1}{2}m\omega^2x_0^2$, split between $E_k$ and $E_p$.
