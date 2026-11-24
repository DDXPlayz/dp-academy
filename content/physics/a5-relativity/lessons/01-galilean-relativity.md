---
code: A.5.1
title: Reference frames and Galilean relativity
summary: How two observers moving relative to each other describe the same event — the everyday, low-speed picture of relativity.
minutes: 20
difficulty: 2
hl: true
objectives:
  - Define a reference frame and an inertial reference frame.
  - State the principle of Galilean relativity.
  - Use the Galilean transformations x′ = x − vt and t′ = t.
  - Add velocities using u′ = u − v.
prerequisites:
  - Velocity and displacement
  - Newton’s laws of motion
formulas:
  - name: Galilean transformation
    latex: "x' = x - vt, \\quad t' = t"
    where: frame S′ moves at velocity v along x relative to frame S.
  - name: Galilean velocity addition
    latex: "u' = u - v"
definitions:
  - term: Reference frame
    definition: A set of coordinates and clocks used by an observer to give the position and time of events.
  - term: Inertial reference frame
    definition: A frame that is not accelerating, in which Newton’s first law holds — a free object moves with constant velocity.
  - term: Event
    definition: Something that happens at a single point in space at a single instant, described by coordinates (x, t).
mistakes:
  - Getting the sign of v wrong. v is the velocity of the primed frame S′ as measured in S.
  - Applying Galilean velocity addition to light or to speeds close to c — it predicts speeds greater than c, which is wrong.
tips:
  - Always say which frame each quantity is measured in; most relativity errors come from mixing frames.
related:
  - physics/a1-kinematics
---

## Frames of reference

To describe motion you need a viewpoint: an origin, axes and a clock. This is a **reference frame**. A passenger on a train and a person on the platform watching the train are using two different frames, and they disagree about how fast a cup on the table is moving.

An **inertial frame** is one that is not accelerating. In an inertial frame, an object with no resultant force on it moves at constant velocity — Newton’s first law works. A frame in a car that is braking is *not* inertial: objects slide forward with no force pushing them.

## Galilean relativity

Galileo noticed that experiments done in a smoothly moving ship give the same results as on land. This is the principle of **Galilean relativity**:

```keyidea
The laws of mechanics — Newton’s laws — are the same in every inertial reference frame. No mechanical experiment can tell you whether your frame is “really” moving.
```

## Galilean transformations

Let frame S′ move at constant velocity $v$ along the $x$-axis relative to frame S, with the origins together at $t = 0$. An event at $(x, t)$ in S has coordinates in S′:

$$
x' = x - vt \qquad t' = t
$$

Time is assumed to be **absolute**: every observer’s clocks agree.

```svg
caption: Frame S′ moves at v relative to S. After time t its origin has moved vt, so an event at x in S is at x′ = x − vt in S′.
<svg viewBox="0 0 420 170">
  <line x1="30" y1="130" x2="400" y2="130" stroke="currentColor" stroke-width="1.5"/>
  <line x1="40" y1="130" x2="40" y2="40" stroke="currentColor" stroke-width="1.5"/>
  <text x="44" y="38" font-size="13" fill="currentColor">S</text>
  <line x1="160" y1="120" x2="160" y2="50" stroke="var(--accent)" stroke-width="1.5"/>
  <line x1="150" y1="120" x2="400" y2="120" stroke="var(--accent)" stroke-width="1.5"/>
  <text x="164" y="48" font-size="13" fill="var(--accent)">S′</text>
  <line x1="170" y1="70" x2="230" y2="70" stroke="var(--accent)" stroke-width="2" marker-end="url(#a51-v)"/>
  <text x="235" y="74" font-size="12" fill="var(--accent)">v</text>
  <circle cx="320" cy="100" r="5" fill="var(--bad)"/>
  <text x="314" y="92" font-size="12" fill="var(--bad)">event</text>
  <line x1="40" y1="150" x2="320" y2="150" stroke="var(--muted)" marker-end="url(#a51-m)"/>
  <text x="180" y="165" font-size="12" text-anchor="middle" fill="var(--muted)">x</text>
  <line x1="160" y1="140" x2="320" y2="140" stroke="var(--accent)" marker-end="url(#a51-a)"/>
  <text x="250" y="136" font-size="12" text-anchor="middle" fill="var(--accent)">x′</text>
  <line x1="40" y1="112" x2="160" y2="112" stroke="var(--muted)" stroke-dasharray="4 3"/>
  <text x="100" y="108" font-size="12" text-anchor="middle" fill="var(--muted)">vt</text>
  <defs>
    <marker id="a51-v" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 10 5 0 10z" fill="var(--accent)"/></marker>
    <marker id="a51-a" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 10 5 0 10z" fill="var(--accent)"/></marker>
    <marker id="a51-m" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 10 5 0 10z" fill="var(--muted)"/></marker>
  </defs>
</svg>
```

## Adding velocities

Differentiate $x' = x - vt$ with respect to time (remembering $t' = t$) and you get the familiar rule

$$
u' = u - v
$$

where $u$ is an object’s velocity in S and $u'$ its velocity in S′.

```example
A train moves at 25 m s⁻¹ along a platform. A passenger walks towards the front of the train at 2.0 m s⁻¹ relative to the train. A bird flies past in the opposite direction at 10 m s⁻¹ relative to the ground. Find (a) the passenger’s velocity relative to the ground, (b) the bird’s velocity relative to the train.
---
Let S be the ground, S′ the train, $v = +25$ m s⁻¹.

(a) $u' = +2.0$, so $u = u' + v = 27$ m s⁻¹ forwards.

(b) The bird has $u = -10$ m s⁻¹, so $u' = u - v = -10 - 25 = -35$ m s⁻¹: 35 m s⁻¹ towards the back of the train.
```

## Where Galilean relativity fails

Apply $u' = u - v$ to a light beam. An observer moving towards a lamp at $0.5c$ should measure the light’s speed as $1.5c$. Experiments — and Maxwell’s equations for electromagnetism — say otherwise: everyone measures exactly $c$. That contradiction is what special relativity resolves.

```question
galilean-velocity
```

## Summary

- A reference frame is a set of coordinates and clocks; inertial frames are not accelerating.
- Newton’s laws hold in every inertial frame (Galilean relativity).
- Galilean transformations: $x' = x - vt$, $t' = t$, giving $u' = u - v$.
- They fail for light, which has the same speed in every frame.
