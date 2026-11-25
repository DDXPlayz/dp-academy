---
code: 1.6.1
title: Simple deductive proof
summary: Proving identities and statements by logical steps from known facts, and the difference between equations and identities.
minutes: 20
difficulty: 2
objectives:
  - Distinguish an equation (true for some values) from an identity (true for all values), using = and ≡.
  - Prove identities by working from one side to the other.
  - Prove simple statements about integers (odd, even, multiples).
definitions:
  - term: Identity
    definition: A statement true for all values of the variable, written with ≡ (e.g. (x + 1)² ≡ x² + 2x + 1).
  - term: Deductive proof
    definition: A chain of logical steps from accepted facts to the result to be proved.
mistakes:
  - Starting from the statement you are trying to prove and manipulating both sides. Work from one side (LHS) to reach the other (RHS).
  - Testing a few numbers instead of proving. Examples do not prove a general statement.
tips:
  - Write even numbers as 2n and odd numbers as 2n + 1, where n is an integer.
  - End with a clear statement such as "LHS = RHS" or "which is a multiple of 4, as required".
related:
  - math-aa/1-15-proof-methods
---

## Equations and identities

- **Equation:** $x^2 = 9$ is true only for $x = \pm3$.
- **Identity:** $(a - b)^2 \equiv a^2 - 2ab + b^2$ is true for every $a, b$.

## Proving an identity

```keyidea
Start from one side (usually the more complicated one) and use valid algebra to reach the other side. Never start by assuming the result.
```

```example
Prove that $\dfrac{1}{n} - \dfrac{1}{n + 1} \equiv \dfrac{1}{n(n + 1)}$.
---
LHS $= \dfrac{(n + 1) - n}{n(n + 1)} = \dfrac{1}{n(n + 1)} =$ RHS. ∎
```

## Proofs about integers

```example
Prove that the sum of any three consecutive integers is a multiple of 3.
---
Let the integers be $n$, $n + 1$, $n + 2$ where $n \in \mathbb{Z}$. Their sum is $3n + 3 = 3(n + 1)$, which is a multiple of 3. ∎
```

```figure
src: math-aa/_sme/1-4-simple-proof-reasoning/img/fig-5877b398588d269f.png
caption: The number sets nest inside each other: ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ.
```

```example
Prove that the square of an odd number is odd.
---
An odd number is $2n + 1$. $(2n + 1)^2 = 4n^2 + 4n + 1 = 2(2n^2 + 2n) + 1$, which is one more than an even number, so it is odd. ∎
```

```question
proof-identity
```

## Summary

- Identity (≡) holds for all values; equation (=) for some.
- Work LHS → RHS; don’t assume the result.
- Even: $2n$; odd: $2n + 1$; consecutive: $n, n + 1, …$
