---
code: A.2.2
title: Momentum and impulse
summary: Momentum is conserved in every collision and explosion — a law strong enough to solve problems where the forces are unknown.
minutes: 30
difficulty: 2
objectives:
  - Calculate linear momentum and impulse.
  - Use $F = \Delta p / \Delta t$ and interpret the area under a force–time graph.
  - Apply conservation of momentum to collisions and explosions.
  - Classify collisions as elastic or inelastic using kinetic energy.
prerequisites:
  - Newton’s laws of motion
formulas:
  - name: Linear momentum
    latex: 'p = mv'
    where: A vector, in kg m s⁻¹ (equivalently N s).
  - name: Force as rate of change of momentum
    latex: 'F = \frac{\Delta p}{\Delta t}'
  - name: Impulse
    latex: 'J = F\Delta t = \Delta p'
    where: For a varying force, impulse is the area under the force–time graph.
  - name: Kinetic energy in terms of momentum
    latex: 'E_k = \frac{p^2}{2m}'
definitions:
  - term: Linear momentum
    definition: The product of an object’s mass and velocity, $p = mv$. A vector.
  - term: Impulse
    definition: The change in momentum produced by a force acting for a time, $J = F\Delta t$. Equal to the area under a force–time graph.
  - term: Conservation of momentum
    definition: The total momentum of a system is constant provided no external resultant force acts on it.
  - term: Elastic collision
    definition: A collision in which total kinetic energy is conserved. In an inelastic collision some kinetic energy is transferred to other forms.
mistakes:
  - Forgetting that momentum is a vector — a ball that bounces back has its momentum reversed, so the change is $m(v + u)$ in size, not $m(v - u)$.
  - Assuming kinetic energy is conserved in every collision. Momentum always is (for an isolated system); kinetic energy only in elastic collisions.
tips:
  - Draw “before” and “after” sketches with velocities and a positive direction marked. Then write total momentum before = total momentum after.
  - When objects stick together after a collision, treat them as one combined mass afterwards.
related:
  - physics/a3-work-energy-power
---

## Introduction

A cricket ball and a car can both be hard to stop — the ball because it is fast, the car because it is massive. **Momentum** combines both ideas:

$$p = mv$$

It is a vector, pointing the same way as the velocity.

## Force and change of momentum

Newton originally wrote his second law in terms of momentum: the resultant force equals the rate of change of momentum,

$$F = \frac{\Delta p}{\Delta t}$$

For a constant mass this is the same as $F = ma$. Rearranged, it says that a force acting for a time produces a change in momentum called the **impulse**:

$$J = F\Delta t = \Delta p$$

```keyidea
The same change in momentum can be produced by a large force for a short time or a small force for a long time. Airbags, crumple zones and bending your knees when you land all work by **increasing the time** so the force is smaller.
```

```example
A 0.15 kg cricket ball reaches the bat at 20 m s⁻¹ and leaves it at 30 m s⁻¹ in the opposite direction. The contact lasts 0.010 s. Find the average force from the bat.
---
Take the ball’s final direction as positive. Then $u = -20$ m s⁻¹ and $v = +30$ m s⁻¹.

$$\Delta p = m(v - u) = 0.15 \times (30 - (-20)) = 7.5\ \text{N s}$$

$$F = \frac{\Delta p}{\Delta t} = \frac{7.5}{0.010} = 750\ \text{N}$$

Notice that reversing direction makes the change in velocity 50 m s⁻¹, not 10 m s⁻¹.
```

## Conservation of momentum

When two objects collide, the third law says they push on each other with equal and opposite forces for the same time. So the impulse on one is equal and opposite to the impulse on the other — whatever one gains, the other loses.

For an isolated system, **total momentum is conserved**:

$$m_1u_1 + m_2u_2 = m_1v_1 + m_2v_2$$

```diagram
collision
```

## Elastic and inelastic collisions

Momentum is conserved in every collision of an isolated system. Kinetic energy is a different matter.

- In an **elastic** collision, total kinetic energy is also conserved.
- In an **inelastic** collision, some kinetic energy becomes thermal energy, sound or deformation. When the objects stick together, the loss is as large as it can be.

```example
In the collision pictured above, a 2.0 kg trolley at 3.0 m s⁻¹ hits a stationary 1.0 kg trolley and they stick together. Find their final velocity and decide whether the collision is elastic.
---
Momentum before $= 2.0 \times 3.0 + 1.0 \times 0 = 6.0$ kg m s⁻¹.

After, the combined 3.0 kg moves at $v$: $3.0v = 6.0$, so $v = 2.0$ m s⁻¹.

Kinetic energy before $= \tfrac12 (2.0)(3.0)^2 = 9.0$ J. After $= \tfrac12 (3.0)(2.0)^2 = 6.0$ J.

3.0 J of kinetic energy has been transferred to other forms, so the collision is **inelastic**.
```

## Explosions

In an explosion, objects that start at rest fly apart. The total momentum before is zero, so it must be zero afterwards: the pieces move in opposite directions with equal and opposite momenta. This is why a rifle recoils and how a rocket accelerates.

## Try it yourself

```question
recoil-speed
```

```question
impulse-change
```

## Summary

- Momentum $p = mv$ is a vector.
- Resultant force equals rate of change of momentum; impulse $F\Delta t$ equals change in momentum and is the area under a force–time graph.
- Total momentum is conserved when no external resultant force acts.
- Kinetic energy is conserved only in elastic collisions.
