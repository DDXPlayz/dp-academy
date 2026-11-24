---
code: 1.10.1
title: Counting principles and the extended binomial theorem
summary: Permutations and combinations, and expanding (a + b)ⁿ when n is negative or fractional.
minutes: 35
difficulty: 3
hl: true
objectives:
  - Use the product principle, permutations and combinations.
  - Solve counting problems with restrictions (items together, apart, chosen from groups).
  - Expand (1 + x)ⁿ for n ∈ ℚ and state the interval of validity.
formulas:
  - name: Permutations
    latex: '{}^nP_r = \frac{n!}{(n - r)!}'
  - name: Combinations
    latex: '{}^nC_r = \binom nr = \frac{n!}{r!(n - r)!}'
  - name: Extended binomial
    latex: '(1 + x)^n = 1 + nx + \frac{n(n - 1)}{2!}x^2 + \frac{n(n - 1)(n - 2)}{3!}x^3 + \ldots,\quad |x| < 1'
definitions:
  - term: Permutation
    definition: An arrangement in which order matters.
  - term: Combination
    definition: A selection in which order does not matter.
mistakes:
  - Using permutations for a committee. Committees are selections — order doesn’t matter.
  - Forgetting the validity condition. (a + bx)ⁿ must be written as aⁿ(1 + bx/a)ⁿ, valid for |bx/a| < 1.
tips:
  - Items that must be together — glue them into one block, then multiply by their internal arrangements.
  - Items that must be apart — total minus together.
related:
  - math-aa/1-9-binomial-theorem
---

## Counting

**Product principle:** if one choice can be made in $m$ ways and another in $n$ ways, both can be made in $mn$ ways. $n$ distinct objects can be arranged in $n!$ ways.

```keyidea
Order matters → permutations ⁿPᵣ = n!/(n − r)!. Order doesn’t matter → combinations ⁿCᵣ = n!/(r!(n − r)!).
```

```example
In how many ways can 7 people sit in a row if two particular people must sit together? Apart?
---
Together: treat the pair as one block — $6!\times2! = 1440$. Apart: $7! - 1440 = 3600$.
```

```example
A committee of 4 is chosen from 6 men and 5 women. How many committees have exactly 2 women?
---
$\binom52\binom62 = 10\times15 = 150$.
```

## Extended binomial theorem

For any rational $n$:

$$
(1 + x)^n = 1 + nx + \frac{n(n - 1)}{2!}x^2 + \ldots, \qquad |x| < 1
$$

The series is infinite unless $n$ is a non-negative integer.

```example
Expand $\sqrt{4 - x}$ up to the $x^2$ term and state when it is valid.
---
$\sqrt{4 - x} = 2\left(1 - \tfrac{x}{4}\right)^{1/2} = 2\left(1 - \tfrac{x}{8} - \tfrac{x^2}{128} - \ldots\right) = 2 - \tfrac{x}{4} - \tfrac{x^2}{64}$. Valid for $|x/4| < 1$, i.e. $|x| < 4$.
```

```question
committee
```

## Summary

- Permutations (order matters) vs combinations (order doesn’t).
- Together: block method; apart: total − together.
- $(1 + x)^n$ for rational $n$: infinite series valid for $|x| < 1$.
