---
title: Work and energy
summary: Work is energy being transferred by a force. Track the energy and many motion problems need no forces or times at all.
minutes: 30
difficulty: 2
objectives:
  - Calculate the work done by a force, including one at an angle to the displacement.
  - Calculate kinetic, gravitational potential and elastic potential energy.
  - Apply the principle of conservation of energy to mechanical systems.
  - Find work done from the area under a force–displacement graph.
prerequisites:
  - Newton’s laws of motion
  - Equations of uniform acceleration
formulas:
  - name: Work done by a constant force
    latex: 'W = Fs\cos\theta'
    where: θ is the angle between the force and the displacement.
  - name: Kinetic energy
    latex: 'E_k = \tfrac{1}{2}mv^2'
  - name: Change in gravitational potential energy
    latex: '\Delta E_p = mg\Delta h'
    where: Valid near the Earth’s surface, where g is constant.
  - name: Elastic potential energy
    latex: 'E_H = \tfrac{1}{2}k(\Delta x)^2'
    where: k is the spring constant and Δx the extension.
definitions:
  - term: Work done
    definition: The energy transferred when a force moves its point of application, $W = Fs\cos\theta$. Measured in joules (1 J = 1 N m).
  - term: Kinetic energy
    definition: The energy an object has because of its motion, $\tfrac12 mv^2$.
  - term: Gravitational potential energy
    definition: The energy stored because of an object’s position in a gravitational field; near Earth its change is $mg\Delta h$.
  - term: Principle of conservation of energy
    definition: Energy cannot be created or destroyed, only transferred from one form to another. The total energy of an isolated system is constant.
mistakes:
  - Multiplying force by distance when the force is at an angle to the motion — only the component along the displacement does work.
  - Saying a force perpendicular to the motion (like the tension in a string for a circling ball) does work. It does none, since $\cos 90^\circ = 0$.
  - Forgetting to square the speed in $\tfrac12 mv^2$, or squaring the mass instead.
tips:
  - For “find the speed” problems with heights and no times, try energy before suvat — the algebra is usually shorter and works on curved paths too.
  - Write a one-line energy statement first, such as “loss in GPE = gain in KE + work done against friction”.
related:
  - physics/a2-forces-momentum
  - physics/b1-thermal-energy
---

## Introduction

“Work” in physics has a precise meaning: a force does work when it moves something in the direction of the force. Whenever work is done, energy is transferred — from the person pushing, the engine pulling or gravity acting — to the object.

## Work done by a force

For a constant force $F$ moving an object a displacement $s$, with an angle $\theta$ between them:

$$W = Fs\cos\theta$$

Only the component of the force along the displacement, $F\cos\theta$, does work.

```example
A child pulls a sledge 40 m along flat snow with a rope that makes 25° with the ground. The tension in the rope is 80 N. How much work does the rope do?
---
$$W = Fs\cos\theta = 80 \times 40 \times \cos 25^\circ = 2900\ \text{J}$$

The vertical component of the tension does no work because the sledge does not move vertically.
```

```keyidea
A force does **no work** if it is perpendicular to the motion, or if nothing moves. Holding a heavy bag still may tire your muscles, but on the bag itself you do zero work.
```

When the force changes, work done is the **area under a force–displacement graph**.

```diagram
force-displacement
```

## Forms of mechanical energy

**Kinetic energy** — the energy of motion:

$$E_k = \tfrac12 mv^2$$

**Gravitational potential energy** — lifting an object of mass $m$ through a height $\Delta h$ near the Earth stores

$$\Delta E_p = mg\Delta h$$

**Elastic potential energy** — stretching a spring of spring constant $k$ by $\Delta x$ stores $\tfrac12 k(\Delta x)^2$, the triangular area under its force–extension line.

## Conservation of energy

Energy is never created or destroyed. If friction and air resistance are negligible, mechanical energy is simply swapped between kinetic and potential forms.

```example
A 0.50 kg ball is dropped from rest from a height of 5.0 m. Ignoring air resistance, how fast is it moving just before it hits the ground? Take $g = 9.8$ m s⁻².
---
Loss in GPE = gain in KE:

$$mg\Delta h = \tfrac12 mv^2$$

The mass cancels, so

$$v = \sqrt{2g\Delta h} = \sqrt{2 \times 9.8 \times 5.0} = 9.9\ \text{m s}^{-1}$$

This matches the suvat answer — but it would work just as well if the ball slid down a smooth curved ramp, where suvat would not apply.
```

If there is friction, the energy statement gains a term: loss of potential energy = gain of kinetic energy + work done against friction. That “lost” energy is not destroyed — it heats the surfaces.

## Try it yourself

```question
work-angle
```

```question
ball-drop-speed
```

## Summary

- Work done $W = Fs\cos\theta$; it is the energy transferred by a force.
- $E_k = \tfrac12 mv^2$, $\Delta E_p = mg\Delta h$, $E_H = \tfrac12 k(\Delta x)^2$.
- Total energy is conserved; without friction, mechanical energy is conserved.
- Work done by a varying force is the area under a force–displacement graph.
