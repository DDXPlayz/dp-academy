---
code: T3.1
title: Units, significant figures and estimation
summary: SI units, scientific notation, significant figures and orders of magnitude — the arithmetic habits behind every physics answer.
minutes: 25
difficulty: 1
objectives:
  - Use SI base and derived units and express derived units in base units.
  - Use scientific notation and metric prefixes.
  - Give answers to an appropriate number of significant figures.
  - Make order-of-magnitude estimates.
definitions:
  - term: SI base units
    definition: The seven fundamental units — metre, kilogram, second, ampere, kelvin, mole and candela.
  - term: Order of magnitude
    definition: The power of ten closest to a quantity.
mistakes:
  - Giving an answer to more significant figures than the least precise data.
  - Forgetting that kg, not g, is the SI base unit of mass.
tips:
  - Check homogeneity — both sides of an equation must have the same base units.
  - When estimating, round each value to one significant figure first.
related:
  - physics/t3-mathematics
---

## SI units

| Quantity | Base unit |
|---|---|
| mass | kilogram (kg) |
| length | metre (m) |
| time | second (s) |
| current | ampere (A) |
| temperature | kelvin (K) |
| amount of substance | mole (mol) |
| luminous intensity | candela (cd) |

Every other unit is **derived**. For example, $1\ \text{N} = 1\ \text{kg m s}^{-2}$ (from $F = ma$) and $1\ \text{J} = 1\ \text{kg m}^2\,\text{s}^{-2}$.

```example
Express the volt in SI base units.
---
$V = W/Q = \text{J}/(\text{A s}) = \text{kg m}^2\,\text{s}^{-2}/(\text{A s}) = \text{kg m}^2\,\text{s}^{-3}\,\text{A}^{-1}$.
```

## Prefixes and scientific notation

| Prefix | p | n | µ | m | k | M | G | T |
|---|---|---|---|---|---|---|---|---|
| Factor | 10⁻¹² | 10⁻⁹ | 10⁻⁶ | 10⁻³ | 10³ | 10⁶ | 10⁹ | 10¹² |

Write very large or small numbers as $a\times10^n$ with $1 \le a < 10$.

## Significant figures

```keyidea
A calculated answer should have the same number of significant figures as the least precise piece of data used (for multiplication and division).
```

E.g. $2.5\ \text{m} \div 0.0350\ \text{s} = 71.428\ldots$ → **71 m s⁻¹** (2 s.f.).

## Orders of magnitude

Estimation checks whether an answer is sensible. The ratio of the size of the observable universe (~10²⁶ m) to a nucleus (~10⁻¹⁵ m) is about 10⁴¹.

```example
Estimate the number of heartbeats in a human lifetime.
---
~1 beat per second × 80 years × 3 × 10⁷ s per year ≈ 2 × 10⁹, so of order 10⁹.
```

```question
base-units-joule
```

## Summary

- Seven SI base units; derive others from defining equations.
- Use scientific notation and prefixes; match significant figures to the data.
- Order-of-magnitude estimates check that answers are reasonable.
