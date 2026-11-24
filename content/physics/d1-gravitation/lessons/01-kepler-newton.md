---
code: D.1.1
title: Kepler’s laws and Newton’s law of gravitation
summary: Three rules for planetary orbits, and the single inverse-square law that explains all of them.
minutes: 25
difficulty: 2
objectives:
  - State Kepler’s three laws of planetary motion.
  - Use Newton’s universal law of gravitation, F = Gm₁m₂/r².
  - State when extended bodies can be treated as point masses.
  - Derive Kepler’s third law for a circular orbit.
prerequisites:
  - Circular motion
formulas:
  - name: Newton’s law of gravitation
    latex: 'F = \frac{G m_1 m_2}{r^2}'
    where: G = 6.67 × 10⁻¹¹ N m² kg⁻²; r is the distance between centres.
  - name: Kepler’s third law (circular orbit)
    latex: 'T^2 = \frac{4\pi^2}{GM}r^3'
definitions:
  - term: Kepler’s first law
    definition: Planets move in ellipses with the Sun at one focus.
  - term: Kepler’s second law
    definition: A line joining a planet to the Sun sweeps out equal areas in equal times.
  - term: Kepler’s third law
    definition: The square of a planet’s orbital period is proportional to the cube of its mean distance from the Sun, T² ∝ r³.
mistakes:
  - Using the distance from the surface instead of from the centre. For a satellite, r = Earth’s radius + height.
  - Forgetting to square r — gravity is an inverse-square law.
tips:
  - For circular orbits, set gravitational force equal to the centripetal force, mv²/r or mω²r.
  - Spherical bodies of uniform density act as point masses for objects outside them.
related:
  - physics/a2-forces-momentum
---

## Kepler’s laws

Using years of careful observations of planetary positions, Johannes Kepler found three empirical rules:

1. **Orbits are ellipses**, with the Sun at one focus.
2. **Equal areas in equal times:** the line from the Sun to a planet sweeps out equal areas in equal time intervals, so a planet moves fastest when closest to the Sun.
3. **$T^2 \propto r^3$:** the square of the period is proportional to the cube of the mean orbital radius.

## Newton’s law of gravitation

Newton explained all three with one law. Any two point masses attract each other with a force

$$
F = \frac{Gm_1m_2}{r^2}
$$

along the line joining them, with $G = 6.67\times10^{-11}$ N m² kg⁻².

```keyidea
Gravity is always attractive, acts between every pair of masses, and follows an inverse-square law: double the separation and the force drops to a quarter.
```

**Extended bodies** — planets, stars — can be treated as point masses at their centres when they are spherically symmetric and we consider objects outside them, or when they are very small compared with the distance between them.

```example
Find the gravitational force between the Earth (6.0 × 10²⁴ kg) and the Moon (7.3 × 10²² kg), 3.8 × 10⁸ m apart.
---
$F = \dfrac{6.67\times10^{-11} \times 6.0\times10^{24} \times 7.3\times10^{22}}{(3.8\times10^8)^2} = 2.0\times10^{20}$ N.
```

## Deriving Kepler’s third law

For a circular orbit of radius $r$ around a mass $M$, gravity provides the centripetal force:

$$
\frac{GMm}{r^2} = m\omega^2 r = m\left(\frac{2\pi}{T}\right)^2 r \quad\Rightarrow\quad T^2 = \frac{4\pi^2}{GM}r^3
$$

The constant depends only on the central mass, so all planets of the Sun share the same $T^2/r^3$.

```example
A geostationary satellite has a period of 24 h. Find its orbital radius. (M_Earth = 6.0 × 10²⁴ kg)
---
$r^3 = \dfrac{GMT^2}{4\pi^2} = \dfrac{6.67\times10^{-11} \times 6.0\times10^{24} \times (86\,400)^2}{4\pi^2} = 7.6\times10^{22}$

$r = 4.2\times10^7$ m — about 36 000 km above the surface.
```

```question
gravity-force
```

## Summary

- Kepler: elliptical orbits, equal areas in equal times, $T^2 \propto r^3$.
- Newton: $F = Gm_1m_2/r^2$, attractive, inverse-square.
- Spherical bodies act as point masses at their centres.
- Gravity as centripetal force gives $T^2 = 4\pi^2r^3/GM$.
