---
code: D.4.3
title: Generators and alternating current
summary: A coil rotating in a magnetic field produces a sinusoidal emf — and spinning it faster changes both the peak and the frequency.
minutes: 25
difficulty: 3
hl: true
objectives:
  - Explain how a coil rotating in a uniform magnetic field produces an alternating emf.
  - Relate the flux and emf graphs for a rotating coil.
  - Describe the effect of changing the rotation frequency on the output.
prerequisites:
  - Magnetic flux and Faraday’s law
formulas:
  - name: Flux through a rotating coil
    latex: '\Phi = BA\cos\omega t'
  - name: Peak emf
    latex: '\varepsilon_0 = NBA\omega'
definitions:
  - term: Alternating current (ac)
    definition: A current that periodically reverses direction; from a simple generator it varies sinusoidally with time.
  - term: Generator
    definition: A device that converts kinetic energy into electrical energy by rotating a coil in a magnetic field (or a magnet near a coil).
mistakes:
  - Thinking the emf is biggest when the flux is biggest. The emf is biggest when the flux is changing fastest — when the coil’s plane is parallel to the field and the flux is zero.
  - Thinking faster rotation only raises the frequency. Doubling the speed doubles the frequency and the peak emf.
tips:
  - Emf is the negative gradient of the flux–time graph — a cosine flux gives a sine emf, 90° out of phase.
related:
  - physics/c1-shm
---

## The rotating coil

A coil of $N$ turns and area $A$ spins at angular speed $\omega$ in a uniform field $B$. The angle between the field and the coil’s normal is $\theta = \omega t$, so the flux through it is

$$
\Phi = BA\cos\omega t
$$

The changing flux induces an emf, and by Faraday’s law the emf is the (negative) rate of change of flux linkage:

$$
\varepsilon = NBA\omega\sin\omega t, \qquad \varepsilon_0 = NBA\omega
$$

```plot
caption: Flux linkage (accent) and induced emf for a rotating coil. The emf peaks when the flux passes through zero — where its gradient is steepest.
x: 0, 12.57
y: -1.2, 1.2
f: cos(x) | flux linkage
f: sin(x) | emf
xlabel: ωt
ylabel: relative size
hline: 0
```

```keyidea
The emf is greatest when the flux is zero (coil plane parallel to the field — the sides cut the field lines fastest) and zero when the flux is greatest (coil plane perpendicular to the field).
```

## Changing the rotation speed

If the coil is turned **twice as fast**:

- the **frequency** of the ac doubles (the period halves);
- the **peak emf** doubles, because the flux changes twice as quickly ($\varepsilon_0 \propto \omega$).

```example
A generator has a peak output of 12 V at 50 Hz. The rotation is slowed to 25 Hz. Describe the new output.
---
Both the frequency and the peak emf halve: a 25 Hz sinusoid with a peak of 6.0 V. On a graph, the waves are twice as wide and half as tall.
```

## Energy in a generator

When current is drawn from the generator, the current in the coil feels forces in the magnetic field that oppose the rotation (Lenz’s law). The more current is drawn, the harder the coil is to turn — the mechanical work done becomes electrical energy.

```question
generator-speed
```

## Summary

- Rotating coil: $\Phi = BA\cos\omega t$, $\varepsilon = NBA\omega\sin\omega t$.
- Emf peaks when flux is zero and vice versa.
- Doubling the rotation frequency doubles both the ac frequency and the peak emf.
