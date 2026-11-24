---
code: A.4.1
title: Torque and rotational equilibrium
summary: Why a door handle sits far from the hinge — the turning effect of a force, and the condition for an object not to start rotating.
minutes: 25
difficulty: 2
hl: true
objectives:
  - Calculate the torque of a force about an axis using τ = Fr sin θ.
  - Identify the moment arm (perpendicular distance) of a force.
  - Apply the conditions for translational and rotational equilibrium to a rigid body.
prerequisites:
  - Resolving vectors into components
  - Newton’s first law
formulas:
  - name: Torque
    latex: '\tau = F r \sin\theta'
    where: r is the distance from the axis to where the force acts and θ is the angle between the force and the line from the axis.
  - name: Rotational equilibrium
    latex: '\sum \tau = 0'
definitions:
  - term: Torque
    definition: The turning effect of a force about an axis, equal to the force multiplied by the perpendicular distance from the axis to its line of action. Measured in N m.
  - term: Rigid body
    definition: An object whose shape does not change when forces act on it, so every part rotates through the same angle.
  - term: Moment arm
    definition: The perpendicular distance from the axis of rotation to the line of action of a force.
  - term: Couple
    definition: Two equal, opposite, parallel forces whose lines of action do not coincide. A couple produces a torque but no resultant force.
mistakes:
  - Using the full distance r when the force is not perpendicular — only the perpendicular component F sin θ, or the perpendicular distance r sin θ, produces a turning effect.
  - Forgetting that a body in equilibrium needs both zero resultant force and zero resultant torque.
  - Writing torque in J. Torque and energy share the base units kg m² s⁻², but torque is always written in N m.
tips:
  - Choose the pivot at the point where an unknown force acts — its torque about that point is zero, so it drops out of the equation.
  - Take one rotation sense (say anticlockwise) as positive and keep it throughout.
related:
  - physics/a2-forces-momentum
---

## From forces to turning

Newton’s laws tell us how a force changes an object’s *motion through space*. But push on a door at its hinge and nothing happens; push on the handle and it swings open easily. Where a force acts matters as much as how big it is. The quantity that captures this is **torque**.

```svg
caption: The same 20 N force acting at 0.80 m from the hinge. Only the perpendicular component turns the door.
<svg viewBox="0 0 420 200">
  <circle cx="60" cy="140" r="7" fill="none" stroke="currentColor" stroke-width="2"/>
  <line x1="60" y1="140" x2="360" y2="140" stroke="currentColor" stroke-width="8" stroke-linecap="round" opacity="0.25"/>
  <text x="48" y="172" font-size="12" fill="var(--muted)">hinge (axis)</text>
  <line x1="300" y1="140" x2="372" y2="40" stroke="var(--accent)" stroke-width="2.5" marker-end="url(#a41-f)"/>
  <line x1="300" y1="140" x2="300" y2="40" stroke="var(--good)" stroke-width="2" stroke-dasharray="5 4" marker-end="url(#a41-c)"/>
  <path d="M325 140 A25 25 0 0 0 315 120" fill="none" stroke="var(--muted)"/>
  <text x="330" y="130" font-size="12" fill="var(--muted)">θ</text>
  <text x="378" y="44" font-size="13" fill="var(--accent)">F</text>
  <text x="250" y="60" font-size="12" fill="var(--good)">F sin θ</text>
  <line x1="60" y1="160" x2="300" y2="160" stroke="var(--muted)" marker-start="url(#a41-d)" marker-end="url(#a41-d)"/>
  <text x="180" y="185" font-size="12" text-anchor="middle" fill="currentColor">r = 0.80 m</text>
  <defs>
    <marker id="a41-f" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 10 5 0 10z" fill="var(--accent)"/></marker>
    <marker id="a41-c" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 10 5 0 10z" fill="var(--good)"/></marker>
    <marker id="a41-d" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0 10 5 0 10z" fill="var(--muted)"/></marker>
  </defs>
</svg>
```

## Calculating torque

The torque of a force $F$ about an axis is

$$
\tau = F r \sin\theta
$$

where $r$ is the distance from the axis to the point where the force acts and $\theta$ is the angle between the force and the line joining that point to the axis.

There are two equivalent ways to read $r \sin\theta$:

- **Perpendicular component:** only $F\sin\theta$, the part of the force at right angles to the door, turns it. The part along the door just pulls on the hinge.
- **Moment arm:** $r\sin\theta$ is the perpendicular distance from the axis to the *line of action* of the force.

Either way, torque is largest when the force is perpendicular ($\theta = 90^\circ$) and zero when it points straight at or away from the axis ($\theta = 0^\circ$).

```keyidea
Torque depends on three things: the size of the force, how far from the axis it acts, and its direction. Doubling the distance doubles the torque — which is why spanners have long handles.
```

```example
A 20 N force acts on a door 0.80 m from the hinge, at 60° to the door. Find the torque about the hinge.
---
$\tau = Fr\sin\theta = 20 \times 0.80 \times \sin 60^\circ = 13.9 \approx 14$ N m.

If the same force were applied perpendicular to the door, the torque would be $20 \times 0.80 = 16$ N m — the maximum possible.
```

## Direction of a torque

A torque tends to turn an object either clockwise or anticlockwise about the axis. In equations, choose one sense as positive. (More formally, torque is a vector along the axis, but in IB problems with a fixed axis a sign is enough.)

## Couples

Two equal and opposite forces acting along *different* lines form a **couple** — think of your hands turning a steering wheel. The forces cancel, so there is no resultant force and the centre does not accelerate, yet both produce torque in the same sense. The torque of a couple is $F \times d$, where $d$ is the perpendicular separation of the two lines of action, and it is the same about *any* axis.

## Equilibrium of a rigid body

A **rigid body** is in equilibrium only when both of these are true:

1. **Translational equilibrium:** the resultant force is zero, $\sum F = 0$.
2. **Rotational equilibrium:** the resultant torque about *any* axis is zero, $\sum \tau = 0$.

The second condition is the principle of moments: total clockwise torque equals total anticlockwise torque.

```example
A uniform 4.0 m plank of weight 200 N rests on two supports, one at each end. A 600 N person stands 1.0 m from the left end. Find the force from each support.
---
Take torques about the **left** support, so its unknown force drops out. The plank’s weight acts at its centre, 2.0 m from the left.

Clockwise: $600 \times 1.0 + 200 \times 2.0 = 1000$ N m.
Anticlockwise: $R_{\text{right}} \times 4.0$.

So $R_{\text{right}} = 250$ N.

Vertical forces balance: $R_{\text{left}} + 250 = 600 + 200$, so $R_{\text{left}} = 550$ N.

Check: the left support carries more because the person is nearer to it.
```

```mistake
A balanced resultant force is not enough. A couple has zero resultant force but still spins an object, so you must check torques as well.
```

```question
torque-perpendicular
```

## Summary

- Torque is the turning effect of a force: $\tau = Fr\sin\theta$, in N m.
- Only the perpendicular component of a force (or equivalently the perpendicular distance to its line of action) contributes.
- A rigid body is in equilibrium when the resultant force **and** the resultant torque are both zero.
