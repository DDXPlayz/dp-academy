---
code: A.2.3
title: Circular motion
summary: Moving in a circle at constant speed still means accelerating — towards the centre. Find the force that provides it and the problem is half solved.
minutes: 25
difficulty: 3
objectives:
  - Describe uniform circular motion using period, frequency, angular velocity and linear speed.
  - Explain why an object in uniform circular motion accelerates towards the centre.
  - Calculate centripetal acceleration and the centripetal force needed.
  - Identify the real force that provides the centripetal force in a situation.
prerequisites:
  - Newton’s laws of motion
  - Radian measure
formulas:
  - name: Linear speed
    latex: 'v = \frac{2\pi r}{T}'
    where: r is the radius and T the period (time for one revolution).
  - name: Angular velocity
    latex: '\omega = \frac{2\pi}{T} = 2\pi f'
    where: In rad s⁻¹; f is the frequency.
  - name: Speed from angular velocity
    latex: 'v = \omega r'
  - name: Centripetal acceleration
    latex: 'a = \frac{v^2}{r} = \omega^2 r'
  - name: Centripetal force
    latex: 'F = \frac{mv^2}{r} = m\omega^2 r'
definitions:
  - term: Uniform circular motion
    definition: Motion in a circle at constant speed. The velocity changes direction continuously, so the object accelerates.
  - term: Centripetal acceleration
    definition: The acceleration of an object in uniform circular motion, directed towards the centre of the circle, of size $v^2/r$.
  - term: Centripetal force
    definition: The resultant force towards the centre that an object needs to move in a circle. It is provided by a real force such as tension, friction or gravity — it is not an extra force.
  - term: Angular velocity
    definition: The rate at which the angle swept out by the radius changes, $\omega = \Delta\theta / \Delta t$, in rad s⁻¹.
mistakes:
  - Adding a separate “centripetal force” arrow to a free-body diagram. The centripetal force *is* the resultant of the real forces drawn.
  - Saying an object is thrown outwards by a “centrifugal force”. Seen from outside, it simply tries to continue in a straight line along the tangent.
  - Using the period in degrees per second or forgetting that ω must be in radians per second.
tips:
  - Always ask “which real force points to the centre?” before writing $F = mv^2/r$.
  - If the speed doubles at the same radius, the required force quadruples — a common data-response question.
related:
  - physics/d1-gravitation
  - physics/a1-kinematics
---

## Introduction

A car on a roundabout, a satellite in orbit and a bucket swung on a rope all move in circles. If the speed is constant, it is tempting to say nothing is changing. But velocity has a direction — and in circular motion that direction changes all the time.

## Describing the motion

For an object going round a circle of radius $r$:

- The **period** $T$ is the time for one complete revolution; the **frequency** $f = 1/T$.
- In one period it travels the circumference $2\pi r$, so its speed is $v = 2\pi r / T$.
- The **angular velocity** $\omega$ is the angle swept per second: $\omega = 2\pi/T$ in rad s⁻¹, and $v = \omega r$.

## Why there is an acceleration

At every instant the velocity is along the tangent. A moment later it points in a slightly different direction. That change in velocity points towards the centre of the circle — so the acceleration does too.

```figure
src: physics/_sme/forces-momentum/img/fig-b9c1f6646bf0aae7.png
caption: A puck on a string moves in a circle: its velocity is always tangential, and if the string is cut it moves off in a straight line.
```

```figure
src: physics/_sme/forces-momentum/img/fig-dd967bd33ad2b1f6.png
caption: Centripetal acceleration points towards the centre of the circle, perpendicular to the linear velocity.
```

$$a = \frac{v^2}{r} = \omega^2 r$$

```diagram
circular
```

```keyidea
An object moves in a circle only if a resultant force pulls it towards the centre. Remove that force and the object carries on in a straight line along the tangent — Newton’s first law.
```

## Centripetal force

From $F = ma$, the resultant force needed is

```figure
src: physics/_sme/forces-momentum/img/fig-0733d8dc66d984ac.png
caption: For a car turning on a flat road, friction between the tyres and road supplies the centripetal force.
```

```figure
src: physics/_sme/forces-momentum/img/fig-3e50011d28b0b612.png
caption: On a banked track, the horizontal component of the normal reaction provides the centripetal force.
```

$$F = \frac{mv^2}{r}$$

This **centripetal force** is not a new kind of force. It is the job description; some real force has to do the job:

| Situation | Force providing it |
|---|---|
| Ball whirled on a string | Tension in the string |
| Car turning on a flat road | Friction between tyres and road |
| Moon orbiting the Earth | Gravitational attraction |
| Electron in a magnetic field | Magnetic force |

```example
A 0.50 kg ball moves in a horizontal circle of radius 0.80 m on a smooth table, attached to a string, at a steady 4.0 m s⁻¹. Find the tension in the string.
---
The tension is the only horizontal force, so it provides the centripetal force:

$$T = \frac{mv^2}{r} = \frac{0.50 \times 4.0^2}{0.80} = 10\ \text{N}$$
```

```example
A car goes round a flat roundabout of radius 20 m. Friction between tyres and road can be at most 0.60 times the car’s weight. What is the greatest speed at which the car can go round without skidding? Take $g = 9.8$ m s⁻².
---
Friction provides the centripetal force, so at the limit:

$$\frac{mv^2}{r} = 0.60\,mg$$

The mass cancels:

$$v = \sqrt{0.60 \times 9.8 \times 20} = \sqrt{118} = 11\ \text{m s}^{-1}$$

So about 11 m s⁻¹ (roughly 39 km h⁻¹), whatever the mass of the car.
```

## Try it yourself

```question
centripetal-force
```

```question
direction-of-force
```

## Summary

- In uniform circular motion the speed is constant but the velocity is not.
- The acceleration is $v^2/r$ towards the centre.
- A resultant force $mv^2/r$ towards the centre is needed; it is supplied by a real force.
