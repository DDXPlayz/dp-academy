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
