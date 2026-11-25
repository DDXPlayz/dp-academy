---
code: 3.2.1
title: Trigonometry in triangles
summary: Right-angled trigonometry, the sine and cosine rules, and the area of a triangle.
minutes: 35
difficulty: 2
objectives:
  - Use sin, cos and tan in right-angled triangles.
  - Use the sine rule and cosine rule in any triangle.
  - Use Area = ½ab sin C.
formulas:
  - name: Sine rule
    latex: '\frac{a}{\sin A} = \frac{b}{\sin B} = \frac{c}{\sin C}'
  - name: Cosine rule
    latex: 'c^2 = a^2 + b^2 - 2ab\cos C,\quad \cos C = \frac{a^2 + b^2 - c^2}{2ab}'
  - name: Area of a triangle
    latex: 'A = \tfrac12ab\sin C'
definitions:
  - term: Included angle
    definition: The angle between two given sides.
mistakes:
  - Calculator in radians when the question is in degrees.
  - Using the sine rule when you know two sides and the included angle. That needs the cosine rule.
tips:
  - Sine rule — a matching side–angle pair is known. Cosine rule — SAS or SSS.
related:
  - math-aa/3-3-trigonometry-applications
  - math-aa/3-5-unit-circle
---

## Right-angled triangles

$$
\sin\theta = \frac{\text{opp}}{\text{hyp}},\quad \cos\theta = \frac{\text{adj}}{\text{hyp}},\quad \tan\theta = \frac{\text{opp}}{\text{adj}}
$$

## Which rule?

```keyidea
Use the sine rule when you know a side and its opposite angle (plus one more piece). Use the cosine rule when you know two sides and the included angle (SAS), or all three sides (SSS).
```

```figure
src: math-aa/_iitian/ib-mathematics-aa-use-of-sine-cosine-and-tangent-ratios-stud/img/fig-48eb64928fbc1eee.png
caption: The cosine rule: a² = b² + c² − 2bc cos A, for two sides and the included angle, or three sides.
```

```figure
src: math-aa/_iitian/ib-mathematics-aa-use-of-sine-cosine-and-tangent-ratios-stud/img/fig-d8c7bc4127c0f32d.png
caption: The sine rule: sin A / a = sin B / b = sin C / c, for matching pairs of sides and opposite angles.
```

```figure
src: math-aa/_sme/3-3-trigonometry-toolkit/img/fig-0b85581320d3a4df.png
caption: Label the triangle with capital letters for angles and the matching lower-case letters for the opposite sides.
```

```example
In triangle ABC, a = 8, B = 50°, C = 70°. Find b.
---
$A = 60°$. $\dfrac{b}{\sin50°} = \dfrac{8}{\sin60°} \Rightarrow b = 7.08$.
```

```example
Find the largest angle of a triangle with sides 5, 7 and 9.
---
The largest angle is opposite 9: $\cos C = \dfrac{25 + 49 - 81}{70} = -0.1 \Rightarrow C = 95.7°$.
```

## Area

$$
A = \tfrac12ab\sin C
$$

```figure
src: math-aa/_sme/3-3-trigonometry-toolkit/img/fig-bb1d41cd37e957e1.png
caption: A triangular prism: the angle between a line and a plane is found in a right-angled triangle drawn inside the solid.
```

```figure
src: math-aa/_sme/3-3-trigonometry-toolkit/img/fig-46d4c6481de19d8c.png
caption: Choosing a rule: SOH CAH TOA for right angles, the sine rule for opposite pairs, the area formula for area, otherwise the cosine rule.
```

```example
Find the area of a triangle with sides 6 cm and 10 cm and included angle 30°.
---
$\tfrac12(6)(10)\sin30° = 15$ cm².
```

```question
cosine-rule
```

## Summary

- SOH CAH TOA in right-angled triangles.
- Sine rule: matched pair. Cosine rule: SAS or SSS.
- Area = ½ab sin C.
