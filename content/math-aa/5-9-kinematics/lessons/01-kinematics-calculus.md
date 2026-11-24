---
code: 5.9.1
title: Kinematics
summary: Displacement, velocity and acceleration linked by differentiation and integration, and total distance travelled.
minutes: 30
difficulty: 2
objectives:
  - Use v = ds/dt and a = dv/dt.
  - Find displacement from velocity by integration.
  - Distinguish displacement from total distance travelled.
  - Interpret speeding up and slowing down.
formulas:
  - name: Derivatives
    latex: 'v = \frac{ds}{dt},\quad a = \frac{dv}{dt} = \frac{d^2s}{dt^2}'
  - name: Displacement and distance
    latex: '\text{displacement} = \int_{t_1}^{t_2} v\,dt,\quad \text{distance} = \int_{t_1}^{t_2}|v|\,dt'
definitions:
  - term: Displacement
    definition: Change in position, including direction (can be negative).
  - term: Total distance travelled
    definition: The total length of path covered, ∫|v| dt — never negative.
mistakes:
  - Using ∫v dt for distance when the particle changes direction.
tips:
  - A particle is speeding up when v and a have the same sign, and slowing down when they have opposite signs.
related:
  - physics/a1-kinematics
---

## Differentiating

$$
v = \frac{ds}{dt}, \qquad a = \frac{dv}{dt}
$$

```example
$s(t) = t^3 - 6t^2 + 9t$ (metres, $t \ge 0$). Find when the particle is at rest and its acceleration then.
---
$v = 3t^2 - 12t + 9 = 3(t - 1)(t - 3) = 0 \Rightarrow t = 1, 3$ s. $a = 6t - 12$: $-6$ m s⁻² at $t = 1$; $6$ m s⁻² at $t = 3$.
```

## Integrating

```keyidea
∫v dt gives displacement (net change in position). ∫|v| dt gives the total distance travelled — they differ if the particle changes direction.
```

```example
For the same particle, find the displacement and the total distance travelled from t = 0 to t = 4.
---
Displacement $= s(4) - s(0) = 4$ m.

Distance $= \int_0^4|v|\,dt$: $s$ goes $0 \to 4$ (t = 1) $\to 0$ (t = 3) $\to 4$ (t = 4): $4 + 4 + 4 = 12$ m.
```

## Speeding up or slowing down

Same sign of $v$ and $a$ → speeding up; opposite signs → slowing down.

```question
velocity-at
```

## Summary

- Differentiate s → v → a; integrate a → v → s.
- Distance = ∫|v| dt; displacement = ∫v dt.
- Speeding up when v and a share a sign.
