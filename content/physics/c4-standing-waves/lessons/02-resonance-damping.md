---
code: C.4.2
title: Resonance and damping
summary: Push something at its natural frequency and the amplitude soars — unless energy is drained away by damping.
minutes: 25
difficulty: 2
objectives:
  - Distinguish natural frequency and driving frequency.
  - Describe resonance and how amplitude depends on driving frequency.
  - Explain the effect of damping on the resonance curve.
  - Describe light, critical and heavy damping.
prerequisites:
  - Simple harmonic motion
definitions:
  - term: Natural frequency
    definition: The frequency at which a system oscillates when displaced and left to oscillate freely.
  - term: Forced oscillation
    definition: An oscillation driven by an external periodic force at the driving frequency.
  - term: Resonance
    definition: The large increase in amplitude when the driving frequency equals (or is close to) the natural frequency of the system.
  - term: Damping
    definition: The removal of energy from an oscillating system by resistive forces, which reduces its amplitude.
  - term: Critical damping
    definition: The amount of damping that returns a displaced system to equilibrium in the shortest time without oscillating.
mistakes:
  - Thinking damping changes the period a lot. Light damping reduces the amplitude but leaves the period almost unchanged.
  - Saying resonance happens at any frequency. It is specific to the natural frequency of the system.
tips:
  - On a resonance curve, more damping means a lower, broader peak, shifted slightly to lower frequency.
  - Car suspensions are designed to be close to critically damped.
related:
  - physics/c1-shm
  - physics/c4-standing-waves
---

## Free and forced oscillations

Displace a system and let go, and it oscillates at its **natural frequency** $f_0$. If instead an outside force pushes it repeatedly at a **driving frequency** $f_d$, it is made to oscillate at $f_d$ — a **forced oscillation**.

```figure
src: physics/_sme/standing-waves-resonance/img/fig-db2598b3dce7ff6a.png
caption: Pushing a swing at its natural frequency is a forced oscillation that builds up a large amplitude: resonance.
```

## Resonance

The amplitude of a forced oscillation depends on how close the driving frequency is to the natural frequency. When $f_d \approx f_0$, energy is fed in at exactly the right moment each cycle and the amplitude grows large: this is **resonance**.

```figure
src: physics/_sme/standing-waves-resonance/img/fig-a619ce7557de6b71.png
caption: A resonance curve: the amplitude peaks when the driving frequency equals the natural frequency.
```

```plot
caption: Resonance curves. Light damping gives a tall, sharp peak at the natural frequency f₀; heavier damping gives a lower, broader peak.
x: 0, 2
y: 0, 5.5
f: 1/sqrt((1 - x^2)^2 + (0.2*x)^2) | light damping
f: 1/sqrt((1 - x^2)^2 + (0.6*x)^2) | heavier damping
xlabel: f_d / f₀
ylabel: amplitude
```

```keyidea
Resonance can be useful — tuning a radio, microwave ovens, musical instruments, MRI — or destructive, like a bridge swaying in the wind or a wine glass shattering.
```

## Damping

Real oscillators lose energy to friction and air resistance — **damping**. The more damping, the faster the amplitude dies away.

```figure
src: physics/_iitian/resonance-and-damping-ib-dp-physics-study-notes/img/fig-b605fe03085d13c4.png
caption: Damping removes energy from an oscillation: light damping lets it decay slowly, heavier damping stops it sooner.
```

- **Light (under-) damping:** the system oscillates with gradually decreasing amplitude; the period is almost unchanged.
- **Critical damping:** the system returns to equilibrium in the **shortest possible time without oscillating**.
- **Heavy (over-) damping:** the system returns slowly, without oscillating.

```plot
caption: Displacement against time after release for light, critical and heavy damping.
x: 0, 8
y: -1.05, 1.05
f: exp(-0.25*x)*cos(3*x) | light
f: (1 + 3*x)*exp(-3*x) | critical
f: exp(-0.6*x) | heavy
xlabel: t
ylabel: x
```

Damping also changes resonance: it **lowers** the peak amplitude, **broadens** the peak, and shifts it slightly to a lower frequency.

```example
Explain why the suspension of a car is designed to be close to critically damped.
---
After the car hits a bump, critical damping returns the body to its normal level as quickly as possible without bouncing. Light damping would let it oscillate up and down uncomfortably; heavy damping would make it slow to recover, so the next bump could arrive before it has settled.
```

```question
resonance-condition
```

## Summary

- A driven system oscillates at the driving frequency; resonance occurs when this matches the natural frequency.
- Damping removes energy: light (oscillates, decays), critical (fastest return, no oscillation), heavy (slow return).
- More damping → lower, broader resonance peak.
