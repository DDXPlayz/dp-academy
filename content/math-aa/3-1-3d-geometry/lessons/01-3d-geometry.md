---
code: 3.1.1
title: 3D geometry
summary: Distance and midpoint in 3D, volumes and surface areas of solids, and angles between lines and planes.
minutes: 30
difficulty: 2
objectives:
  - Find the distance between two points and their midpoint in 3D.
  - Calculate volumes and surface areas of pyramids, cones, spheres, hemispheres and composite solids.
  - Find the angle between two intersecting lines, or between a line and a plane.
formulas:
  - name: Distance in 3D
    latex: 'd = \sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2 + (z_2 - z_1)^2}'
  - name: Volumes
    latex: 'V_{\text{pyramid}} = \tfrac13Ah,\quad V_{\text{cone}} = \tfrac13\pi r^2h,\quad V_{\text{sphere}} = \tfrac43\pi r^3'
  - name: Surface areas
    latex: 'A_{\text{cone (curved)}} = \pi rl,\quad A_{\text{sphere}} = 4\pi r^2'
definitions:
  - term: Slant height (l)
    definition: The distance from the apex of a cone to a point on the circumference of its base, l = √(r² + h²).
mistakes:
  - Using vertical height instead of slant height for the curved surface of a cone.
  - Forgetting the flat circular face of a hemisphere — total surface area is 3πr².
tips:
  - For a line-plane angle, drop a perpendicular from the line to the plane to form a right-angled triangle.
related:
  - math-aa/3-2-trigonometry-in-triangles
---

## Distance and midpoint

$$
d = \sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2 + (z_2 - z_1)^2}, \qquad M = \left(\tfrac{x_1 + x_2}{2}, \tfrac{y_1 + y_2}{2}, \tfrac{z_1 + z_2}{2}\right)
$$

```example
Find the distance between A(1, −2, 4) and B(5, 0, −3).
---
$\sqrt{16 + 4 + 49} = \sqrt{69} = 8.31$.
```

## Volumes and surface areas

| Solid | Volume | Surface area |
|---|---|---|
| right pyramid | $\tfrac13Ah$ | sum of faces |
| cone | $\tfrac13\pi r^2h$ | $\pi r^2 + \pi rl$ |
| sphere | $\tfrac43\pi r^3$ | $4\pi r^2$ |
| hemisphere | $\tfrac23\pi r^3$ | $3\pi r^2$ (incl. flat face) |

```example
A cone has radius 5 cm and height 12 cm. Find its total surface area.
---
$l = \sqrt{25 + 144} = 13$. $A = \pi(25) + \pi(5)(13) = 90\pi = 283$ cm².
```

## Angles in 3D

```keyidea
Find a right-angled triangle that contains the angle. For a line and a plane, the angle is between the line and its projection onto the plane.
```

```example
A cuboid is 4 × 3 × 12. Find the angle between the space diagonal and the base.
---
Base diagonal $= \sqrt{16 + 9} = 5$. $\tan\theta = 12/5 \Rightarrow \theta = 67.4°$.
```

```question
distance-3d
```

## Summary

- 3D distance and midpoint extend the 2D formulas.
- Know the solid formulas; slant height for cones.
- Angles: build a right-angled triangle with the projection.
