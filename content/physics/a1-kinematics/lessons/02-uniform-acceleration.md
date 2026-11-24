---
code: A.1.2
title: Equations of uniform acceleration
summary: Five quantities, four equations — a reliable method for any constant-acceleration problem, including free fall.
minutes: 25
difficulty: 2
objectives:
  - Use the four equations of uniformly accelerated motion (the “suvat” equations).
  - Choose the right equation by listing known and unknown quantities.
  - Solve free-fall problems with a consistent sign convention.
prerequisites:
  - Describing motion (displacement, velocity, acceleration)
  - Solving quadratic equations
formulas:
  - name: Velocity after time t
    latex: 'v = u + at'
    where: u is the initial velocity, v the final velocity, a the constant acceleration.
  - name: Displacement from average velocity
    latex: 's = \frac{(u + v)}{2}\,t'
  - name: Displacement after time t
    latex: 's = ut + \tfrac{1}{2}at^2'
  - name: Velocity–displacement relation
    latex: 'v^2 = u^2 + 2as'
    where: The only equation with no time in it.
definitions:
  - term: Uniform acceleration
    definition: Acceleration that stays constant in size and direction. The suvat equations are only valid when this is true.
  - term: Free fall
    definition: Motion under gravity alone, with air resistance negligible. Near the Earth’s surface the acceleration is $g \approx 9.8$ m s⁻² downwards.
mistakes:
  - Using the suvat equations when the acceleration is changing (for example, a car with a varying force, or a falling object with significant air resistance).
  - Mixing sign conventions — taking up as positive for velocity but writing $g = +9.8$ m s⁻² for a downward acceleration.
  - Forgetting that at the top of a vertical throw the velocity is zero but the acceleration is still $g$.
tips:
  - Write down s, u, v, a, t and fill in the three you know. The equation you need is the one without the quantity you neither know nor want.
  - If a quadratic gives two times, check which one makes physical sense — both sometimes do (going up and coming down).
related:
  - physics/a3-work-energy-power
---

## Introduction

When acceleration is constant, motion becomes very predictable. Five quantities describe it completely:

| Symbol | Meaning | Unit |
|---|---|---|
| $s$ | displacement | m |
| $u$ | initial velocity | m s⁻¹ |
| $v$ | final velocity | m s⁻¹ |
| $a$ | acceleration | m s⁻² |
| $t$ | time | s |

If you know any three, the equations give you the other two.

## Where the equations come from

Start from the definition of acceleration: $a = (v - u)/t$, which rearranges to

$$v = u + at$$

For constant acceleration the velocity–time graph is a straight line, so the average velocity is halfway between $u$ and $v$. Displacement is average velocity × time:

$$s = \frac{(u+v)}{2}\,t$$

Substituting the first equation into the second removes $v$ and gives $s = ut + \tfrac12 at^2$. Removing $t$ instead gives

$$v^2 = u^2 + 2as$$

You don’t need to reproduce the derivations in an exam, but knowing them means you can always rebuild an equation you have forgotten.

## Choosing an equation

Each equation leaves out exactly one of the five quantities:

| Equation | Missing |
|---|---|
| $v = u + at$ | $s$ |
| $s = \frac{(u+v)}{2}t$ | $a$ |
| $s = ut + \frac12 at^2$ | $v$ |
| $v^2 = u^2 + 2as$ | $t$ |

```keyidea
List what you know and what you want. The quantity that is in neither list tells you which equation to use — pick the one that leaves it out.
```

```example
A train leaves a station from rest and accelerates uniformly at 0.80 m s⁻² for 25 s. How far does it travel?
---
Known: $u = 0$, $a = 0.80$ m s⁻², $t = 25$ s. Want: $s$. Not needed: $v$.

Use the equation without $v$:

$$s = ut + \tfrac12 at^2 = 0 + \tfrac12(0.80)(25)^2 = 250\ \text{m}$$
```

## Free fall

Near the Earth’s surface, any object falling without significant air resistance accelerates downwards at $g \approx 9.8$ m s⁻², whatever its mass. Choose a positive direction and keep to it.

```example
A ball is thrown vertically upwards at 14 m s⁻¹. Taking $g = 9.8$ m s⁻², find (a) its maximum height and (b) the time it takes to return to the thrower’s hand.
---
Take **up as positive**, so $a = -9.8$ m s⁻².

**(a)** At the highest point $v = 0$. Time is not involved, so use $v^2 = u^2 + 2as$:

$$0 = 14^2 + 2(-9.8)s \quad\Rightarrow\quad s = \frac{196}{19.6} = 10\ \text{m}$$

**(b)** Back at the hand the displacement is zero. Use $s = ut + \tfrac12 at^2$:

$$0 = 14t - 4.9t^2 = t(14 - 4.9t)$$

So $t = 0$ (the throw) or $t = 14/4.9 = 2.9$ s. The ball is back after **2.9 s**.
```

```mistake
At the top of its flight the ball is momentarily at rest, but it is *not* in equilibrium — its acceleration is still 9.8 m s⁻² downwards. If the acceleration were zero there, it would stay up.
```

## Try it yourself

```question
braking-distance
```

```question
drop-time
```

## Summary

- The suvat equations apply only when acceleration is constant.
- Each equation omits one quantity; choose the one that omits the quantity you neither know nor need.
- In free fall $a = g$ downwards throughout the motion, including at the top of the path.
