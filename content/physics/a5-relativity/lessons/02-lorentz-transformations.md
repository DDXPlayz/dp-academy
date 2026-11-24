---
code: A.5.2
title: Einstein’s postulates and the Lorentz transformations
summary: Take the speed of light as the same for everyone and space and time have to mix — the transformations that replace Galileo’s.
minutes: 30
difficulty: 3
hl: true
objectives:
  - State the two postulates of special relativity.
  - Calculate the Lorentz factor γ.
  - Use the Lorentz transformations to convert event coordinates between frames.
  - Add velocities relativistically.
  - Use the invariant space–time interval.
prerequisites:
  - Galilean relativity
formulas:
  - name: Lorentz factor
    latex: '\gamma = \frac{1}{\sqrt{1 - \dfrac{v^2}{c^2}}}'
  - name: Lorentz transformations
    latex: "x' = \\gamma(x - vt), \\quad t' = \\gamma\\left(t - \\frac{vx}{c^2}\\right)"
  - name: Relativistic velocity addition
    latex: "u' = \\frac{u - v}{1 - \\dfrac{uv}{c^2}}"
  - name: Space–time interval
    latex: '(\Delta s)^2 = (c\Delta t)^2 - (\Delta x)^2'
    where: has the same value in every inertial frame.
definitions:
  - term: Postulates of special relativity
    definition: (1) The laws of physics are the same in all inertial frames. (2) The speed of light in a vacuum is the same, c, for all inertial observers, whatever the motion of the source.
  - term: Lorentz factor
    definition: γ = 1/√(1 − v²/c²); it equals 1 at low speed and grows without limit as v approaches c.
mistakes:
  - Forgetting the vx/c² term in t′. It is exactly this term that makes simultaneity relative.
  - Using γ when v is in m s⁻¹ but c is in units of c (or vice versa). Work in fractions of c or in SI throughout.
tips:
  - Many questions give speeds as fractions of c. Write v = 0.6c and the c’s cancel inside γ.
  - Check answers with the interval — (cΔt)² − (Δx)² must come out the same in both frames.
related:
  - physics/a5-relativity
---

## The two postulates

In 1905 Einstein built special relativity on two statements:

1. **The laws of physics are the same in all inertial reference frames.** (This extends Galilean relativity from mechanics to all of physics, including electromagnetism.)
2. **The speed of light in a vacuum, $c$, is the same for every inertial observer**, regardless of how the source or the observer is moving.

The second postulate cannot be true if time is absolute. Something has to give — and it is the idea that all observers share the same time.

## The Lorentz factor

Every relativistic effect involves

$$
\gamma = \frac{1}{\sqrt{1 - \dfrac{v^2}{c^2}}}
$$

```plot
caption: γ stays close to 1 until v is a sizeable fraction of c, then rises steeply.
x: 0, 0.99
y: 0, 8
f: 1/sqrt(1 - x^2) | γ
xlabel: v / c
ylabel: γ
point: 0.6, 1.25 | 0.6c → 1.25
point: 0.8, 1.667 | 0.8c → 1.67
```

At everyday speeds $\gamma \approx 1$ and relativity reduces to Galileo’s picture.

## Lorentz transformations

If S′ moves at $v$ along $x$ relative to S (origins together at $t = t' = 0$), an event $(x, t)$ in S has coordinates

$$
x' = \gamma(x - vt) \qquad t' = \gamma\left(t - \frac{vx}{c^2}\right)
$$

```keyidea
Time in one frame depends on both time **and position** in the other. Space and time are no longer separate — they are parts of one space–time.
```

```example
Frame S′ moves at 0.60c relative to S. An event occurs at x = 300 m, t = 2.0 µs in S. Find its coordinates in S′. (c = 3.0 × 10⁸ m s⁻¹)
---
$\gamma = 1/\sqrt{1 - 0.36} = 1.25$, $v = 1.8 \times 10^8$ m s⁻¹.

$x' = 1.25\,(300 - 1.8\times10^8 \times 2.0\times10^{-6}) = 1.25\,(300 - 360) = -75$ m.

$t' = 1.25\left(2.0\times10^{-6} - \dfrac{1.8\times10^8 \times 300}{(3.0\times10^8)^2}\right) = 1.25\,(2.0 - 0.60)\times10^{-6} = 1.75$ µs.
```

## Relativistic velocity addition

Differentiating the Lorentz transformations gives

$$
u' = \frac{u - v}{1 - \dfrac{uv}{c^2}}
$$

Put $u = c$ and you get $u' = c$ for any $v$: light really does have the same speed in every frame, as the second postulate demands.

```example
Two spacecraft approach Earth from opposite sides, A at +0.70c and B at −0.80c (measured from Earth). What is B’s velocity measured by A?
---
Take S = Earth, S′ = A ($v = 0.70c$), object B with $u = -0.80c$:

$u' = \dfrac{-0.80c - 0.70c}{1 - \dfrac{(-0.80c)(0.70c)}{c^2}} = \dfrac{-1.50c}{1.56} = -0.96c$.

Galilean addition would give −1.5c — impossible.
```

## The invariant interval

Observers disagree about $\Delta x$ and $\Delta t$ between two events, but they all agree on

$$
(\Delta s)^2 = (c\Delta t)^2 - (\Delta x)^2
$$

This **space–time interval** plays the role in relativity that ordinary distance plays in geometry.

```mistake
The interval is not $(c\Delta t)^2 + (\Delta x)^2$. The minus sign is what makes it invariant.
```

```question
gamma-value
```

## Summary

- Postulates: physics is the same in all inertial frames; $c$ is the same for all inertial observers.
- $\gamma = 1/\sqrt{1 - v^2/c^2}$.
- Lorentz transformations: $x' = \gamma(x - vt)$, $t' = \gamma(t - vx/c^2)$.
- Relativistic addition never gives a speed above $c$; the interval $(c\Delta t)^2 - (\Delta x)^2$ is the same for everyone.
