---
code: D.2.1
title: Electric charge and Coulomb’s law
summary: Two kinds of charge, the inverse-square force between them, how objects become charged, and the experiment that showed charge comes in lumps.
minutes: 30
difficulty: 2
objectives:
  - Describe the forces between like and unlike charges.
  - Use Coulomb’s law, F = kq₁q₂/r².
  - State the conservation of charge.
  - Explain charging by friction, contact and electrostatic induction, including grounding.
  - Describe how Millikan’s experiment showed that charge is quantised.
prerequisites:
  - Newton’s law of gravitation
formulas:
  - name: Coulomb’s law
    latex: 'F = \frac{kq_1q_2}{r^2}, \quad k = \frac{1}{4\pi\varepsilon_0} = 8.99\times10^9\ \text{N m}^2\,\text{C}^{-2}'
definitions:
  - term: Coulomb’s law
    definition: The electric force between two point charges is proportional to the product of the charges and inversely proportional to the square of their separation.
  - term: Conservation of charge
    definition: The total charge of an isolated system stays constant; charge can be moved but not created or destroyed.
  - term: Elementary charge
    definition: The smallest free charge, e = 1.60 × 10⁻¹⁹ C; all observed charges are whole-number multiples of it.
mistakes:
  - Forgetting that the electric force can repel as well as attract. Like charges repel; unlike charges attract.
  - Thinking an object becomes positive by gaining protons. In solids it is electrons that move — positive means electrons have been lost.
tips:
  - Coulomb’s law has the same inverse-square form as Newton’s gravity — the same algebra works for both.
  - Charge in microcoulombs — convert 1 µC = 10⁻⁶ C before using k.
related:
  - physics/d1-gravitation
---

## Two kinds of charge

There are two types of electric charge, **positive** and **negative**.

- **Like** charges **repel**.
- **Unlike** charges **attract**.

Ordinary matter is neutral because atoms hold equal numbers of protons (+) and electrons (−). An object becomes charged when electrons are added to it (negative) or removed from it (positive).

## Coulomb’s law

Two point charges $q_1$ and $q_2$, a distance $r$ apart, exert forces on each other of size

$$
F = \frac{kq_1q_2}{r^2}, \qquad k = \frac{1}{4\pi\varepsilon_0} = 8.99\times10^9\ \text{N m}^2\,\text{C}^{-2}
$$

where $\varepsilon_0 = 8.85\times10^{-12}$ C² N⁻¹ m⁻² is the permittivity of free space.

```example
Two small spheres carry +3.0 µC and −2.0 µC, 0.15 m apart. Find the force between them.
---
$F = \dfrac{8.99\times10^9 \times 3.0\times10^{-6} \times 2.0\times10^{-6}}{0.15^2} = 2.4$ N, attractive.
```

```keyidea
Electric forces are enormously stronger than gravitational ones. Between two protons the electric repulsion is about 10³⁶ times their gravitational attraction.
```

## Conservation of charge

Charge can be moved from one object to another but never created or destroyed: the total charge of an isolated system is constant.

## Ways to charge an object

- **Friction:** rubbing two insulators together transfers electrons from one to the other. A polythene rod rubbed with wool becomes negative; the wool becomes equally positive.
- **Contact:** touching a charged conductor to a neutral one lets charge spread between them.
- **Electrostatic induction:** bring a charged rod near (but not touching) a neutral conductor. The conductor’s electrons are attracted or repelled, separating charge. If the conductor is then briefly **grounded** (connected to Earth), electrons flow to or from the ground; remove the ground connection and then the rod, and the conductor is left with a charge **opposite** to the rod’s.

```example
A negatively charged rod is held near a neutral metal sphere, which is then touched with a grounded wire. The wire is removed, then the rod. What charge does the sphere end up with?
---
The rod repels electrons in the sphere; grounding lets those electrons escape to Earth. With the ground removed first, they cannot return, so the sphere is left **positively** charged.
```

## Millikan: charge comes in lumps

Millikan sprayed tiny oil droplets between two horizontal charged plates. By adjusting the voltage until a droplet hovered, he balanced its weight against the electric force and found the droplet’s charge. Every charge he measured was a whole-number multiple of one value, about $1.6\times10^{-19}$ C — showing that charge is **quantised**, carried in units of the elementary charge $e$.

```question
coulomb-force
```

## Summary

- Like charges repel, unlike attract.
- Coulomb: $F = kq_1q_2/r^2$, $k = 8.99\times10^9$ N m² C⁻².
- Charge is conserved; it can be transferred by friction, contact or induction (with grounding).
- Millikan’s oil-drop experiment showed charge is quantised in units of $e = 1.60\times10^{-19}$ C.
