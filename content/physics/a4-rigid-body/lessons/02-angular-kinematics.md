---
code: A.4.2
title: Describing rotation
summary: Angular displacement, angular velocity and angular acceleration — and the rotational versions of the suvat equations.
minutes: 25
difficulty: 2
hl: true
objectives:
  - Describe rotation using angular displacement, angular velocity and angular acceleration.
  - Convert between angular and linear quantities for a point on a rotating body.
  - Use the equations of uniformly accelerated rotation.
  - Explain why an unbalanced torque produces angular acceleration.
prerequisites:
  - Radians
  - Equations of uniformly accelerated motion
formulas:
  - name: Angular velocity
    latex: '\omega = \frac{\Delta\theta}{\Delta t}'
  - name: Angular acceleration
    latex: '\alpha = \frac{\Delta\omega}{\Delta t}'
  - name: Linking linear and angular
    latex: 'v = \omega r, \quad a_t = \alpha r'
  - name: Uniform angular acceleration
    latex: '\omega_f = \omega_i + \alpha t, \quad \Delta\theta = \omega_i t + \tfrac{1}{2}\alpha t^2, \quad \omega_f^2 = \omega_i^2 + 2\alpha\Delta\theta, \quad \Delta\theta = \frac{\omega_i + \omega_f}{2}t'
definitions:
  - term: Angular displacement
    definition: The angle, in radians, through which a body has rotated about an axis.
  - term: Angular velocity
    definition: The rate of change of angular displacement, in rad s⁻¹.
  - term: Angular acceleration
    definition: The rate of change of angular velocity, in rad s⁻².
mistakes:
  - Mixing revolutions, degrees and radians. Convert to radians first (one revolution = 2π rad) and rev/min to rad s⁻¹ by multiplying by 2π/60.
  - Thinking every point on a rigid body has the same linear speed. All points share the same ω, but v = ωr grows with distance from the axis.
tips:
  - Treat the rotational suvat equations exactly like the linear ones; swap s → θ, u → ωᵢ, v → ω_f and a → α.
  - Write down the list of known angular quantities before choosing an equation.
related:
  - physics/a1-kinematics
  - physics/a2-forces-momentum
---

## Rotation needs its own quantities

When a wheel turns, different points on it move different distances, so linear displacement is not a convenient way to describe the motion. Every point, however, turns through the **same angle**. That makes angles the natural language of rotation.

## The angular quantities

| Linear | Angular | Unit |
|---|---|---|
| displacement $s$ | angular displacement $\theta$ | rad |
| velocity $v$ | angular velocity $\omega = \dfrac{\Delta\theta}{\Delta t}$ | rad s⁻¹ |
| acceleration $a$ | angular acceleration $\alpha = \dfrac{\Delta\omega}{\Delta t}$ | rad s⁻² |

A point at distance $r$ from the axis moves along an arc of length $s = r\theta$, so its speed and tangential acceleration are

$$
v = \omega r \qquad a_t = \alpha r
$$

```keyidea
All points of a rigid body share the same θ, ω and α. Points further from the axis simply travel faster along bigger circles.
```

## Torque causes angular acceleration

A resultant force makes a body’s velocity change; a resultant **torque** makes its angular velocity change. If the torques on a rigid body do not balance, it speeds up or slows down its rotation. When the resultant torque is zero, the body either stays still or keeps rotating at constant $\omega$ — the rotational version of Newton’s first law. The next lesson makes this quantitative with $\tau = I\alpha$.

## Equations for uniform angular acceleration

When $\alpha$ is constant, the same algebra that gave the suvat equations gives:

$$
\omega_f = \omega_i + \alpha t \qquad \Delta\theta = \omega_i t + \tfrac{1}{2}\alpha t^2
$$

$$
\omega_f^2 = \omega_i^2 + 2\alpha\,\Delta\theta \qquad \Delta\theta = \frac{\omega_i + \omega_f}{2}\,t
$$

```plot
caption: For constant angular acceleration, ω rises linearly; the area under the line is the angle turned.
x: 0, 6
y: 0, 40
f: 5 + 5x | ω = 5 + 5t
xlabel: t / s
ylabel: ω / rad s⁻¹
point: 4, 25 | (4 s, 25 rad s⁻¹)
```

```example
A fan blade speeds up uniformly from rest to 1200 rev min⁻¹ in 8.0 s. Find its angular acceleration and the number of revolutions it makes while speeding up.
---
Convert to rad s⁻¹: $\omega_f = 1200 \times \dfrac{2\pi}{60} = 125.7$ rad s⁻¹.

$\alpha = \dfrac{\omega_f - \omega_i}{t} = \dfrac{125.7 - 0}{8.0} = 15.7$ rad s⁻².

$\Delta\theta = \dfrac{\omega_i + \omega_f}{2}\,t = \dfrac{0 + 125.7}{2} \times 8.0 = 503$ rad.

Revolutions $= \dfrac{503}{2\pi} = 80$.
```

```example
A wheel of radius 0.30 m rotates at 40 rad s⁻¹ and decelerates uniformly at 5.0 rad s⁻². How far does a point on its rim travel before the wheel stops?
---
$\omega_f^2 = \omega_i^2 + 2\alpha\Delta\theta \Rightarrow 0 = 40^2 + 2(-5.0)\Delta\theta$, so $\Delta\theta = 160$ rad.

Arc length $s = r\theta = 0.30 \times 160 = 48$ m.
```

```mistake
Do not use revolutions per minute directly in the equations. Convert every angle to radians and every time to seconds first.
```

```question
angular-accel-fan
```

## Summary

- Rotation is described by $\theta$ (rad), $\omega$ (rad s⁻¹) and $\alpha$ (rad s⁻²); linear quantities follow from $s = r\theta$, $v = \omega r$, $a_t = \alpha r$.
- An unbalanced torque produces angular acceleration.
- With constant $\alpha$, the four rotational suvat equations apply.
