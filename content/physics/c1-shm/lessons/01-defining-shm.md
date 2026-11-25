---
code: C.1.1
title: What makes motion simple harmonic
summary: A restoring force proportional to displacement gives a perfectly regular oscillation — the defining equation and the quantities that describe it.
minutes: 25
difficulty: 2
objectives:
  - State the conditions for simple harmonic motion.
  - Use the defining equation a = −ω²x.
  - Describe an oscillation using period, frequency, angular frequency, amplitude, equilibrium position and displacement.
  - Convert between T, f and ω.
prerequisites:
  - Newton’s second law
  - Radians
formulas:
  - name: Defining equation of SHM
    latex: 'a = -\omega^2 x'
  - name: Period, frequency and angular frequency
    latex: 'T = \frac{1}{f} = \frac{2\pi}{\omega}'
definitions:
  - term: Simple harmonic motion
    definition: Oscillation in which the acceleration is proportional to the displacement from equilibrium and always directed towards the equilibrium position.
  - term: Amplitude
    definition: The maximum displacement from the equilibrium position.
  - term: Period
    definition: The time for one complete oscillation.
  - term: Angular frequency
    definition: ω = 2πf, measured in rad s⁻¹.
mistakes:
  - Forgetting the minus sign in a = −ω²x. It shows the acceleration always points back towards equilibrium.
  - Thinking the period of SHM depends on the amplitude. For true SHM it does not — that is what makes pendulum clocks work.
tips:
  - To show a motion is SHM, find an expression for the acceleration and show it has the form (negative constant) × displacement.
  - A graph of a against x for SHM is a straight line through the origin with gradient −ω².
related:
  - physics/c1-shm
---

## Oscillations everywhere

A mass bouncing on a spring, a swinging pendulum, a guitar string, the atoms in a crystal — all oscillate about an **equilibrium position**. The simplest and most important kind of oscillation is **simple harmonic motion (SHM)**.

## The conditions for SHM

An object moves with SHM when the resultant force on it

```figure
src: physics/_iitian/ibdp-physics-slhl-c-1-simple-harmonic-motion-study-notes-fir/img/fig-437c3680332cc5a3.png
caption: For SHM the restoring force always points back towards equilibrium, opposite to the displacement x.
```

1. is **proportional to its displacement** from equilibrium, and
2. always acts **towards the equilibrium position**.

Such a force is called a **restoring force**. Because $F = ma$, the acceleration has the same properties:

$$
a = -\omega^2 x
$$

The constant of proportionality is written $\omega^2$, where $\omega$ is the **angular frequency** of the oscillation.

```plot
caption: For SHM, acceleration is proportional to displacement and opposite in sign — a straight line through the origin with gradient −ω².
x: -0.1, 0.1
y: -5, 5
f: -400 * x | a = −ω²x  (ω = 20 rad s⁻¹)
xlabel: x / m
ylabel: a / m s⁻²
```

## Describing an oscillation

| Quantity | Symbol | Meaning |
|---|---|---|
| displacement | $x$ | distance from equilibrium, with sign |
| amplitude | $x_0$ | maximum displacement |
| period | $T$ | time for one oscillation |
| frequency | $f$ | oscillations per second (Hz) |
| angular frequency | $\omega$ | $2\pi f$, in rad s⁻¹ |

```figure
src: physics/_sme/simple-harmonic-motion/img/fig-c9b3eb6ee6fc4a81.png
caption: A displacement-time graph of an oscillation: sinusoidal, with the amplitude as the peak and the period as one full cycle.
```

They are linked by

$$
T = \frac{1}{f} = \frac{2\pi}{\omega}
$$

```keyidea
In SHM the period does not depend on the amplitude. A big swing and a small swing take the same time, because a larger displacement gives a proportionally larger restoring acceleration.
```

```example
An object oscillates in SHM with frequency 2.5 Hz and amplitude 4.0 cm. Find its maximum acceleration.
---
$\omega = 2\pi f = 2\pi \times 2.5 = 15.7$ rad s⁻¹.

Maximum acceleration occurs at maximum displacement: $a_{\max} = \omega^2 x_0 = 15.7^2 \times 0.040 = 9.9$ m s⁻².
```

```example
The acceleration of a particle is related to its displacement by a = −250x (SI units). Find its period.
---
$\omega^2 = 250 \Rightarrow \omega = 15.8$ rad s⁻¹. $T = \dfrac{2\pi}{\omega} = 0.40$ s.
```

```mistake
Acceleration is zero at the equilibrium position and largest at the extremes — the opposite of velocity, which is largest at equilibrium and zero at the extremes.
```

```question
shm-period-omega
```

## Summary

- SHM: acceleration ∝ displacement and directed towards equilibrium, $a = -\omega^2 x$.
- Described by $x$, $x_0$, $T$, $f$, $\omega$, with $T = 1/f = 2\pi/\omega$.
- The period of SHM is independent of amplitude.
