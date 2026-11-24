---
code: 1.1.1
title: Scientific notation
summary: Writing very large and very small numbers as a × 10ᵏ, and calculating with them.
minutes: 15
difficulty: 1
objectives:
  - Write numbers in the form a × 10ᵏ with 1 ≤ a < 10 and k an integer.
  - Multiply, divide, add and subtract numbers in scientific notation.
formulas:
  - name: Scientific notation
    latex: 'a\times10^k, \quad 1 \le a < 10,\ k \in \mathbb{Z}'
definitions:
  - term: Scientific notation
    definition: A way of writing a number as a × 10ᵏ, where 1 ≤ a < 10 and k is an integer (also called standard form).
mistakes:
  - Leaving answers like 34 × 10⁵. The first number must be at least 1 and less than 10 — 3.4 × 10⁶.
  - Adding powers when adding numbers. Only multiplication adds the exponents.
tips:
  - On a GDC, use the EE or ×10ˣ key rather than typing × 10 ^.
related:
  - math-aa/1-7-laws-exponents-logs
---

## Writing numbers in scientific notation

$$
a\times10^k, \qquad 1 \le a < 10,\quad k \in \mathbb{Z}
$$

- $384\,000\,000 = 3.84\times10^8$
- $0.000\,062 = 6.2\times10^{-5}$

Large numbers have positive $k$; numbers between 0 and 1 have negative $k$.

## Calculating

```keyidea
Multiply: multiply the a-values and add the powers. Divide: divide the a-values and subtract the powers. Then adjust so that 1 ≤ a < 10.
```

```example
Calculate (a) (4 × 10⁵)(6 × 10⁻²) and (b) (3.0 × 10⁸) ÷ (1.5 × 10⁻³).
---
(a) $24\times10^{3} = 2.4\times10^4$.

(b) $2.0\times10^{11}$.
```

To **add or subtract**, first write both numbers with the same power of 10:

$$
5.2\times10^4 + 3.1\times10^3 = 5.2\times10^4 + 0.31\times10^4 = 5.51\times10^4
$$

```question
sn-multiply
```

## Summary

- $a\times10^k$ with $1 \le a < 10$.
- × : add powers; ÷ : subtract powers; then normalise $a$.
- + and −: match the powers first.
