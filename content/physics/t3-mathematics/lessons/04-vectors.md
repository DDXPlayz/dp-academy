---
code: T3.4
title: Combining and resolving vectors
summary: Adding and subtracting vectors with diagrams, finding a resultant with Pythagoras and trigonometry, and splitting a vector into perpendicular components.
minutes: 25
difficulty: 1
objectives:
  - Distinguish vector quantities from scalar quantities.
  - Add and subtract vectors using the triangle and parallelogram methods.
  - Calculate the magnitude and direction of the resultant of two perpendicular vectors.
  - Resolve a vector into two perpendicular components.
  - Use components to analyse forces on a slope and objects in equilibrium.
prerequisites:
  - Pythagoras’ theorem
  - Sine, cosine and tangent in a right-angled triangle
formulas:
  - name: Resultant of perpendicular vectors
    latex: 'R = \sqrt{a^2 + b^2}, \quad \tan\theta = \frac{b}{a}'
  - name: Components of a vector
    latex: 'F_x = F\cos\theta, \quad F_y = F\sin\theta'
    where: θ is measured from the x-direction.
definitions:
  - term: Scalar
    definition: A quantity with magnitude only, such as mass, distance, speed, energy or temperature.
  - term: Vector
    definition: A quantity with both magnitude and direction, such as displacement, velocity, acceleration, force or momentum.
  - term: Resultant
    definition: The single vector that has the same effect as two or more vectors acting together.
  - term: Component
    definition: The part of a vector acting along a chosen direction; two perpendicular components together are equivalent to the original vector.
mistakes:
  - Adding the magnitudes of vectors that point in different directions.
  - Using cos for the component opposite the angle; the component next to the angle is F cos θ.
  - Forgetting to give the direction of a resultant as well as its size.
tips:
  - Always draw the vectors head-to-tail before calculating anything.
  - On a slope, the weight component down the slope is mg sin θ and into the slope is mg cos θ, where θ is the angle of the slope.
related:
  - physics/a1-kinematics
  - physics/a2-forces-momentum
---

## Scalars and vectors

A **scalar** has size only. A **vector** has size and direction, and is drawn as an arrow whose length shows the magnitude.

| Scalars | Vectors |
|---|---|
| distance, speed | displacement, velocity |
| mass, energy, power | force, weight, momentum |
| time, temperature | acceleration, field strength |

## Adding and subtracting vectors

To add vectors, join them **head to tail**: the resultant goes from the tail of the first to the head of the last (triangle method). Equivalently, draw them from the same point and complete the parallelogram: the resultant is the diagonal.

```figure
src: physics/_sme/scalars-vectors/img/fig-07c396fd71b96d97.png
caption: Adding vectors: link them head-to-tail (triangle method) or tail-to-tail and complete the parallelogram; the resultant is a + b.
```

To subtract, add the negative: **a − b = a + (−b)**, where −b has the same size as b but points the opposite way.

```figure
src: physics/_sme/scalars-vectors/img/fig-46fdf4624314513b.png
caption: Subtracting vectors: reverse b to make −b, then add it to a.
```

## Perpendicular vectors

When the two vectors are at right angles, the triangle is right-angled, so use Pythagoras for the size and trigonometry for the direction.

```figure
src: physics/_sme/scalars-vectors/img/fig-88803248b5772d70.png
caption: The magnitude of the resultant of two perpendicular vectors comes from Pythagoras' theorem.
```

```example
A walker goes 6 km east and then 10 km north. Find their displacement.
---
$$R = \sqrt{6^2 + 10^2} = \sqrt{136} = 11.7\ \text{km}$$

$$\tan\theta = \frac{6}{10} \Rightarrow \theta = 31^\circ$$

The displacement is 11.7 km on a bearing of 031° (31° east of north).
```

## Resolving vectors

Any vector can be split into two perpendicular **components** that together have the same effect.

```figure
src: physics/_sme/scalars-vectors/img/fig-d4aecea7a89ce4a1.png
caption: Resolving a force F at angle θ: the component next to the angle is F cos θ, the one opposite it is F sin θ.
```

```keyidea
Resolving lets you treat horizontal and vertical motion (or along and across a slope) separately. Add up the components in each direction, then recombine with Pythagoras if you need the resultant.
```

### Forces on a slope

For a block on a slope at angle θ, resolve the weight parallel and perpendicular to the slope:

- down the slope: $mg\sin\theta$
- into the slope: $mg\cos\theta$, balanced by the normal reaction $R$.

```figure
src: physics/_sme/scalars-vectors/img/fig-bdd2bf4530f5b401.png
caption: The weight of a block on a slope resolved into mg sin θ down the slope and mg cos θ into it.
```

### Equilibrium

An object is in **equilibrium** when the resultant force on it is zero. Then the components cancel in every direction, and the force arrows drawn head-to-tail form a **closed** triangle (or polygon).

```figure
src: physics/_sme/scalars-vectors/img/fig-644504ffb1ba789e.png
caption: A vehicle at rest on a slope: its weight, the normal reaction and friction form a closed vector triangle.
```

```example
A 2.0 kg block rests on a rough slope inclined at 30° to the horizontal. Find the friction force and the normal reaction. (g = 9.8 m s⁻²)
---
Weight: $mg = 19.6\ \text{N}$.

Along the slope, friction balances $mg\sin 30^\circ = 19.6 \times 0.5 = 9.8\ \text{N}$, so friction is 9.8 N up the slope.

Perpendicular to the slope, $R = mg\cos 30^\circ = 19.6 \times 0.866 = 17\ \text{N}$.
```

## Summary

- Scalars have magnitude only; vectors have magnitude and direction.
- Add vectors head-to-tail; subtract by adding the reversed vector.
- For perpendicular vectors: $R = \sqrt{a^2 + b^2}$ and $\tan\theta = b/a$.
- Components: $F\cos\theta$ next to the angle, $F\sin\theta$ opposite it.
- In equilibrium the components cancel in every direction and the force vectors form a closed shape.
