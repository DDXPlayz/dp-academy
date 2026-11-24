---
code: A.1.3
title: Projectile motion
summary: Split the motion in two — steady sideways, accelerating vertically — and every projectile problem becomes two simple ones.
minutes: 30
difficulty: 2
objectives:
  - Resolve a launch velocity into horizontal and vertical components.
  - Treat horizontal and vertical motion independently, linked only by time.
  - Calculate time of flight, maximum height and range for a projectile.
  - Describe qualitatively how air resistance changes a trajectory.
prerequisites:
  - Equations of uniform acceleration
  - Sine and cosine in right-angled triangles
formulas:
  - name: Horizontal component of launch velocity
    latex: 'u_x = u\cos\theta'
    where: θ is the launch angle above the horizontal.
  - name: Vertical component of launch velocity
    latex: 'u_y = u\sin\theta'
  - name: Horizontal displacement
    latex: 'x = u_x t'
    where: No horizontal acceleration when air resistance is negligible.
  - name: Vertical displacement
    latex: 'y = u_y t - \tfrac{1}{2} g t^2'
    where: Taking up as positive.
definitions:
  - term: Projectile
    definition: An object moving freely under gravity after being launched, with no other significant forces acting.
  - term: Range
    definition: The horizontal distance a projectile travels before returning to its launch height (or landing).
  - term: Terminal speed
    definition: The constant speed reached by a falling object when the drag force has grown to equal its weight, so the resultant force is zero.
mistakes:
  - Using the full launch speed $u$ in a vertical or horizontal equation instead of its component.
  - Giving the horizontal velocity an acceleration of $g$ — gravity acts only vertically.
  - Assuming the velocity is zero at the top of the path. Only the *vertical* component is zero; the projectile is still moving horizontally.
tips:
  - Draw a two-column table, “horizontal” and “vertical”, and fill in s, u, v, a, t for each. Time is the only quantity shared by both columns.
  - Check your answer against the symmetry of the path — on level ground, the time to the top is exactly half the time of flight.
related:
  - physics/a2-forces-momentum
---

## Introduction

Throw a ball across a field and it follows a smooth curve. That curve looks complicated, but it comes from two very simple motions happening at the same time.

## Two independent motions

Once the ball leaves your hand (and if air resistance is negligible) the only force on it is its weight, which acts **straight down**. So:

- **Horizontally** there is no force, so no acceleration. The horizontal velocity never changes.
- **Vertically** the ball accelerates downwards at $g$, exactly like a dropped object.

```keyidea
Horizontal and vertical motions are independent. The only thing they share is **time** — so most projectile problems are solved by finding the time from one direction and using it in the other.
```

```diagram
projectile
```

## Resolving the launch velocity

A projectile launched at speed $u$ and angle $\theta$ above the horizontal starts with

$$u_x = u\cos\theta \qquad u_y = u\sin\theta$$

From then on $u_x$ stays the same, while the vertical velocity changes by $9.8$ m s⁻¹ every second.

```example
A football is kicked from level ground at 20 m s⁻¹, 30° above the horizontal. Ignoring air resistance and taking $g = 9.8$ m s⁻², find (a) the time of flight, (b) the range and (c) the maximum height.
---
Components: $u_x = 20\cos 30^\circ = 17.3$ m s⁻¹ and $u_y = 20\sin 30^\circ = 10.0$ m s⁻¹. Take up as positive.

**(a)** The ball lands when its vertical displacement is zero:

$$0 = 10.0\,t - 4.9t^2 \quad\Rightarrow\quad t = \frac{10.0}{4.9} = 2.04\ \text{s}$$

**(b)** Horizontally there is no acceleration:

$$x = u_x t = 17.3 \times 2.04 = 35\ \text{m}$$

**(c)** At the top, the vertical velocity is zero:

$$0 = 10.0^2 - 2(9.8)h \quad\Rightarrow\quad h = \frac{100}{19.6} = 5.1\ \text{m}$$
```

## Horizontal launches

If an object is launched horizontally, $u_y = 0$. The time it takes to fall depends only on the height — not on how fast it was thrown sideways.

```example
A stone is thrown horizontally at 8.0 m s⁻¹ from the top of a 20 m cliff. How far from the foot of the cliff does it land?
---
**Vertically**, starting from rest: $20 = \tfrac12 (9.8) t^2$, so $t = \sqrt{40/9.8} = 2.02$ s.

**Horizontally**: $x = 8.0 \times 2.02 = 16$ m.
```

A neat consequence: a bullet fired horizontally and a bullet dropped from the same height at the same moment hit level ground at the same time.

## The effect of air resistance

In reality, air pushes back on a moving object with a **drag force** that grows with speed and acts opposite to the velocity. With drag:

- the horizontal velocity decreases, so the range is shorter;
- the maximum height is lower;
- the path is no longer symmetrical — the descent is steeper than the climb.

A falling object speeds up until the drag force equals its weight. The resultant force is then zero, and it falls at a constant **terminal speed**.

## Try it yourself

```question
time-of-flight
```

```question
horizontal-velocity-top
```

## Summary

- Resolve the launch velocity into $u\cos\theta$ and $u\sin\theta$.
- Horizontal velocity is constant; vertical motion has acceleration $g$ downwards.
- Time links the two directions. On level ground, the path is symmetrical about its highest point.
- Air resistance reduces range and height and makes the path asymmetric.
