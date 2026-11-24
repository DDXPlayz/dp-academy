---
code: 3.4.1
title: Radians, arcs and sectors
summary: Measuring angles in radians, and the arc length and sector area formulas.
minutes: 25
difficulty: 1
objectives:
  - Convert between degrees and radians.
  - Find arc lengths and sector areas using radians.
  - Solve problems involving segments and perimeters.
formulas:
  - name: Conversion
    latex: '\pi\ \text{rad} = 180^\circ'
  - name: Arc length
    latex: 'l = r\theta'
  - name: Sector area
    latex: 'A = \tfrac12r^2\theta'
definitions:
  - term: Radian
    definition: The angle subtended at the centre of a circle by an arc equal in length to the radius.
mistakes:
  - Using l = rθ with θ in degrees. The formulas only work in radians.
tips:
  - Segment area — sector minus triangle, ½r²(θ − sin θ).
related:
  - math-aa/3-5-unit-circle
---

## Radians

$$
\pi\ \text{rad} = 180^\circ \qquad 1\ \text{rad} \approx 57.3^\circ
$$

| Degrees | 30 | 45 | 60 | 90 | 180 | 360 |
|---|---|---|---|---|---|---|
| Radians | $\frac\pi6$ | $\frac\pi4$ | $\frac\pi3$ | $\frac\pi2$ | $\pi$ | $2\pi$ |

## Arcs and sectors

```keyidea
With θ in radians: arc length l = rθ and sector area A = ½r²θ. These are just fractions θ/2π of the circumference and area.
```

```example
A sector has radius 8 cm and angle 1.2 rad. Find its arc length, perimeter and area.
---
$l = 9.6$ cm; perimeter $= 9.6 + 16 = 25.6$ cm; $A = \tfrac12(64)(1.2) = 38.4$ cm².
```

```example
Find the area of the minor segment cut off by a chord subtending $\tfrac{\pi}{3}$ at the centre of a circle of radius 6.
---
Sector $= \tfrac12(36)\tfrac\pi3 = 6\pi$; triangle $= \tfrac12(36)\sin\tfrac\pi3 = 9\sqrt3$. Segment $= 6\pi - 9\sqrt3 = 3.26$.
```

```question
arc-length
```

## Summary

- π rad = 180°.
- $l = r\theta$, $A = \tfrac12r^2\theta$ (θ in radians).
- Segment = sector − triangle.
