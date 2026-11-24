---
code: A.1.1
title: Describing motion
summary: Distance or displacement, speed or velocity — and how a single graph can tell you all of them.
minutes: 20
difficulty: 1
objectives:
  - Distinguish scalar quantities (distance, speed) from vector quantities (displacement, velocity).
  - Calculate average speed, average velocity and acceleration.
  - Read velocity and acceleration from the gradient of a graph, and displacement from the area under one.
prerequisites:
  - Rearranging simple equations
  - Gradient of a straight line
formulas:
  - name: Average velocity
    latex: 'v_{\text{avg}} = \frac{\Delta s}{\Delta t}'
    where: Δs is the change in displacement over the time interval Δt.
  - name: Average speed
    latex: '\text{average speed} = \frac{\text{distance travelled}}{\Delta t}'
  - name: Acceleration
    latex: 'a = \frac{\Delta v}{\Delta t}'
    where: Δv is the change in velocity; acceleration is a vector.
definitions:
  - term: Displacement
    definition: The straight-line distance from the starting point to the current position, together with its direction. A vector, measured in metres.
  - term: Velocity
    definition: The rate of change of displacement. A vector, measured in m s⁻¹.
  - term: Speed
    definition: The rate at which distance is covered — the magnitude of velocity. A scalar, measured in m s⁻¹.
  - term: Acceleration
    definition: The rate of change of velocity. A vector, measured in m s⁻².
mistakes:
  - Treating distance and displacement as the same thing. A runner who completes one lap of a 400 m track has run 400 m but has a displacement of zero.
  - Reading the *height* of a velocity–time graph when the question asks for displacement — displacement is the *area*.
  - Forgetting that a negative velocity means moving in the opposite direction, not slowing down.
tips:
  - State the direction you are calling positive at the start of any vector problem, and stick to it.
  - When a graph question says “estimate”, count squares or split the area into triangles and rectangles — and show the shapes you used.
related:
  - physics/a2-forces-momentum
---

## Introduction

Every mechanics problem begins with the same question: *how is this thing moving?* To answer it precisely, physicists separate two kinds of quantity.

A **scalar** has only a size: 5 m, 12 s, 30 m s⁻¹. A **vector** has a size *and* a direction: 5 m north, 30 m s⁻¹ to the left. Much of the confusion in kinematics disappears once you know which kind you are dealing with.

## Distance and displacement

Imagine walking 3 m east, then 4 m north. You have walked a **distance** of 7 m. But your **displacement** — where you ended up relative to where you started — is the straight line between the two points: $\sqrt{3^2 + 4^2} = 5$ m, pointing 37° east of north.

Distance only ever increases. Displacement can grow, shrink, or return to zero.

## Speed and velocity

**Speed** tells you how fast distance is covered. **Velocity** tells you how fast *displacement* changes, so it carries a direction:

$$
v_{\text{avg}} = \frac{\Delta s}{\Delta t}
$$

In one dimension we show direction with a sign. If we choose “right” as positive, a cyclist moving left at 6 m s⁻¹ has a velocity of $-6$ m s⁻¹ but a speed of 6 m s⁻¹.

```keyidea
Speed is always positive. Velocity can be positive, negative or zero — the sign tells you the direction relative to the one you chose as positive.
```

## Acceleration

Acceleration measures how quickly *velocity* changes:

$$
a = \frac{\Delta v}{\Delta t}
$$

Because velocity has a direction, an object accelerates whenever its speed **or** its direction changes. A car driving round a roundabout at a steady 20 km h⁻¹ is still accelerating.

```mistake
A negative acceleration does not always mean “slowing down”. If velocity is negative and acceleration is negative too, the object is speeding up in the negative direction.
```

## Reading motion graphs

Graphs pack a whole journey into one picture. Two rules do most of the work:

- The **gradient** of a displacement–time graph is the velocity.
- The **gradient** of a velocity–time graph is the acceleration, and the **area** under it is the displacement.

```diagram
velocity-time
```

```example
A scooter speeds up steadily from 4 m s⁻¹ to 12 m s⁻¹ in 4.0 s, as in the graph above. Find (a) its acceleration and (b) how far it travels in that time.
---
**(a)** The gradient of the line is the acceleration:

$$a = \frac{\Delta v}{\Delta t} = \frac{12 - 4}{4.0} = 2.0\ \text{m s}^{-2}$$

**(b)** The displacement is the area under the line — a trapezium:

$$s = \frac{(4 + 12)}{2} \times 4.0 = 32\ \text{m}$$

You could also split it into a 4 × 4 rectangle (16 m) plus a triangle ½ × 4 × 8 (16 m) — same answer.
```

## Try it yourself

```question
avg-velocity-lap
```

```question
graph-gradient
```

## Summary

- Distance and speed are scalars; displacement, velocity and acceleration are vectors.
- Average velocity is change in displacement divided by time; acceleration is change in velocity divided by time.
- On a velocity–time graph, gradient gives acceleration and area gives displacement.
