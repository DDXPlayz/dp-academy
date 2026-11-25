---
code: A.2.1
title: Newton’s laws of motion
summary: Three laws that connect force to motion, and the free-body diagram — the single most useful drawing in mechanics.
minutes: 30
difficulty: 2
objectives:
  - State and apply Newton’s three laws of motion.
  - Draw free-body diagrams showing all forces acting on one object.
  - Use $F = ma$ with the resultant force to find accelerations and unknown forces.
  - Identify Newton’s third-law force pairs correctly.
prerequisites:
  - Describing motion
  - Adding vectors along a line
formulas:
  - name: Newton’s second law
    latex: 'F = ma'
    where: F is the resultant (net) force on the object, m its mass, a its acceleration.
  - name: Weight
    latex: 'W = mg'
    where: g ≈ 9.8 N kg⁻¹ near the Earth’s surface.
  - name: Friction (sliding)
    latex: 'F_f = \mu_d F_N'
    where: μ_d is the dynamic coefficient of friction and F_N the normal force.
  - name: Friction (maximum static)
    latex: 'F_f \le \mu_s F_N'
    where: Static friction adjusts up to this maximum before sliding begins.
definitions:
  - term: Resultant force
    definition: The single force that has the same effect as all the forces acting on an object combined — their vector sum.
  - term: Newton’s first law
    definition: An object stays at rest or keeps moving at constant velocity unless a resultant force acts on it.
  - term: Newton’s third law
    definition: If body A exerts a force on body B, then B exerts a force on A that is equal in size, opposite in direction and of the same type.
  - term: Translational equilibrium
    definition: The state of an object whose resultant force is zero, so its velocity is constant (possibly zero).
mistakes:
  - Putting both forces of a Newton’s third-law pair on the same free-body diagram. The pair always acts on **two different** objects.
  - Calling weight and the normal force a third-law pair. They act on the same object and are different types of force.
  - Using one force rather than the **resultant** force in $F = ma$.
tips:
  - Draw the free-body diagram first, every time. Then pick a positive direction and write “resultant force = ma” along it.
  - In lift problems, the scale reading is the normal force, not the weight.
related:
  - physics/a1-kinematics
  - physics/a3-work-energy-power
---

## Introduction

Kinematics describes *how* things move. Dynamics explains *why*. The link between force and motion was set out by Isaac Newton in three laws, and they still solve almost every everyday mechanics problem.

## The first law: no resultant force, no change

An object keeps doing what it is doing — staying still, or moving in a straight line at constant speed — unless a **resultant force** acts on it.

```figure
src: physics/_sme/forces-momentum/img/fig-8ede13a8401225ff.png
caption: A puck on a frictionless surface keeps moving in a straight line at constant velocity: no resultant force, no change in motion.
```

This feels odd at first, because in everyday life moving things slow down. They slow down because friction and air resistance are forces. Remove them (as on an air track, or in space) and motion carries on unchanged.

```keyidea
Force is not needed to keep something moving. Force is needed to **change** its velocity — to speed it up, slow it down or turn it.
```

## Free-body diagrams

A free-body diagram shows **one** object and **every force acting on it**, each drawn as an arrow from the object. Common forces:

- **Weight** $W = mg$, acting downwards.
- **Normal force**, perpendicular to a surface the object is pressed against.
- **Friction**, along the surface, opposing sliding (or the tendency to slide).
- **Tension** in a string or rope, pulling along it.
- **Drag**, opposing motion through a fluid.

```diagram
free-body
```

## The second law: F = ma

The acceleration of an object is proportional to the resultant force on it and inversely proportional to its mass:

```figure
src: physics/_sme/forces-momentum/img/fig-82f301c59f6e7cb4.png
caption: The resultant force is the vector sum of all the forces: same-direction forces add, opposite ones subtract.
```

```figure
src: physics/_sme/forces-momentum/img/fig-28b76cd7b6fcbdcc.png
caption: In a tug-of-war, unequal pulls leave a resultant force, so the rope and teams accelerate towards the stronger side.
```

$$F = ma$$

Here $F$ is the **resultant** force. One newton is the resultant force that gives a 1 kg mass an acceleration of 1 m s⁻².

```example
A 12 kg crate is pulled across a floor by a horizontal force of 60 N. Friction on the crate is 18 N. Find its acceleration.
---
Take the direction of the pull as positive. The vertical forces (weight and normal force) balance, so only the horizontal ones matter:

$$F_{\text{resultant}} = 60 - 18 = 42\ \text{N}$$

$$a = \frac{F}{m} = \frac{42}{12} = 3.5\ \text{m s}^{-2}$$
```

```example
A 70 kg person stands on bathroom scales in a lift that is accelerating **upwards** at 1.5 m s⁻². What do the scales read? Take $g = 9.8$ m s⁻².
---
The scales read the normal force $N$ they exert on the person. Taking up as positive:

$$N - mg = ma$$

$$N = m(g + a) = 70 \times (9.8 + 1.5) = 790\ \text{N}$$

That is more than the person’s weight (686 N), which is why you feel heavier as a lift starts moving up.
```

## The third law: forces come in pairs

When you push on a wall, the wall pushes back on you with an equal and opposite force. Every force is one half of an interaction between **two** objects.

```figure
src: physics/_sme/forces-momentum/img/fig-969fc7cbb58636dc.png
caption: Free-body diagram of a book resting on a table: weight down, normal reaction up, and the forces balance.
```

```figure
src: physics/_iitian/ibdp-physics-slhl-a-2-forces-and-momentum-study-notes-first-/img/fig-d472d0ce97803856.png
caption: When two skaters push apart, each exerts an equal and opposite force on the other, acting on different bodies.
```

A third-law pair is always:

- equal in size and opposite in direction;
- acting on **different** objects;
- the same type of force (both gravitational, both contact, and so on).

```mistake
A book resting on a table has two forces on it — its weight and the normal force — which are equal and opposite. They are **not** a third-law pair: both act on the book, and one is gravitational while the other is a contact force. The partner of the book’s weight is the book’s gravitational pull on the **Earth**.
```

## Friction

Friction acts along a surface and opposes relative motion. Before an object slides, **static** friction matches whatever force is trying to move it, up to a maximum of $\mu_s F_N$. Once it slides, **dynamic** friction is roughly constant at $\mu_d F_N$, where usually $\mu_d < \mu_s$ — which is why it is harder to start pushing a heavy box than to keep it moving.

```figure
src: physics/_sme/forces-momentum/img/fig-c382f17cbdee4800.png
caption: Friction rises to match the applied pull until it reaches its static maximum; once sliding starts the dynamic friction is slightly lower.
```

## Try it yourself

```question
net-force-accel
```

```question
third-law-pair
```

## Summary

- First law: velocity changes only if there is a resultant force.
- Second law: $F = ma$, where $F$ is the resultant force.
- Third law: forces come in equal and opposite pairs acting on different objects.
- A clear free-body diagram is the first step in every dynamics problem.
