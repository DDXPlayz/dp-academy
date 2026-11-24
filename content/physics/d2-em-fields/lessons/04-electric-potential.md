---
code: D.2.4
title: Electric potential and equipotentials
summary: Energy per unit charge in an electric field — potential, potential energy, potential gradient and equipotential surfaces.
minutes: 30
difficulty: 3
hl: true
objectives:
  - Define electric potential energy and electric potential with zero at infinity.
  - Use Ep = kq₁q₂/r and V_e = kQ/r.
  - Relate field strength to potential gradient, E = −ΔV_e/Δr.
  - Calculate work done using W = qΔV_e.
  - Describe equipotential surfaces and their relation to field lines.
prerequisites:
  - Electric fields
  - Gravitational potential
formulas:
  - name: Electric potential energy (two charges)
    latex: 'E_p = \frac{kq_1q_2}{r}'
  - name: Electric potential of a point charge
    latex: 'V_e = \frac{kQ}{r}'
  - name: Field as potential gradient
    latex: 'E = -\frac{\Delta V_e}{\Delta r}'
  - name: Work done moving a charge
    latex: 'W = q\Delta V_e'
definitions:
  - term: Electric potential energy
    definition: The work done to assemble a system of charges from infinite separation.
  - term: Electric potential
    definition: The work done per unit charge to bring a small positive test charge from infinity to a point; a scalar, in volts.
  - term: Equipotential surface
    definition: A surface on which the electric potential is the same; no work is done moving a charge along it.
mistakes:
  - Forgetting signs. Unlike gravity, electric potential can be positive (near + charges) or negative (near − charges) — keep the sign of each charge.
  - Adding potentials as vectors. Potential is a scalar — just add the numbers, with their signs.
tips:
  - For several charges, add their potentials algebraically; for the field, add vectors.
  - Equipotentials are perpendicular to field lines; field lines point from high to low potential.
related:
  - physics/d1-gravitation
  - physics/d2-em-fields
---

## Potential energy of charges

The **electric potential energy** of two point charges is the work done to bring them together from infinity:

$$
E_p = \frac{kq_1q_2}{r}
$$

- Like charges: $E_p$ is **positive** — work had to be done to push them together.
- Unlike charges: $E_p$ is **negative** — they attract, so work is done by the field.

## Electric potential

The **electric potential** at a point is the potential energy per unit (positive) charge:

$$
V_e = \frac{kQ}{r}
$$

Potential is a **scalar**, measured in volts, with zero at infinity. Near a positive charge it is positive; near a negative charge it is negative.

```example
Find the potential halfway between +4.0 nC and −1.0 nC point charges 0.20 m apart.
---
Each is 0.10 m away. $V = \dfrac{8.99\times10^9}{0.10}(4.0 - 1.0)\times10^{-9} = 270$ V.
```

## Work and potential difference

The work done moving a charge $q$ through a potential difference $\Delta V_e$ is

$$
W = q\Delta V_e
$$

This is why one electronvolt (the energy an electron gains crossing 1 V) equals $1.60\times10^{-19}$ J.

## Field strength as potential gradient

$$
E = -\frac{\Delta V_e}{\Delta r}
$$

The field points from high potential to low potential, and is strongest where the potential changes most rapidly. Between parallel plates this gives back $E = V/d$.

## Equipotential surfaces

```keyidea
Equipotentials are always perpendicular to field lines. Around a point charge they are concentric spheres; between parallel plates they are planes parallel to the plates and equally spaced.
```

No work is done moving a charge along an equipotential, since $\Delta V_e = 0$.

```example
An alpha particle (charge +2e, mass 6.6 × 10⁻²⁷ kg) is accelerated from rest through 5.0 kV. Find its final speed.
---
$W = q\Delta V = 2 \times 1.60\times10^{-19} \times 5000 = 1.6\times10^{-15}$ J $= \tfrac{1}{2}mv^2$.

$v = \sqrt{\dfrac{2 \times 1.6\times10^{-15}}{6.6\times10^{-27}}} = 7.0\times10^5$ m s⁻¹.
```

```question
potential-point
```

## Summary

- $E_p = kq_1q_2/r$; $V_e = kQ/r$ — scalars, zero at infinity, sign depends on the charges.
- $W = q\Delta V_e$; $E = -\Delta V_e/\Delta r$.
- Equipotentials are perpendicular to field lines; no work is done along them.
