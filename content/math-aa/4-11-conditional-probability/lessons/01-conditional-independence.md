---
code: 4.11.1
title: Conditional probability and independence
summary: The formal definition of conditional probability and testing independence with P(A | B) = P(A).
minutes: 25
difficulty: 2
objectives:
  - Use P(A | B) = P(A ∩ B)/P(B) formally, including from tables and tree diagrams.
  - Test for independence using P(A | B) = P(A) = P(A | B′).
definitions:
  - term: Independent events (conditional form)
    definition: A and B are independent if P(A | B) = P(A) = P(A | B′) — knowing B tells you nothing about A.
mistakes:
  - Confusing P(A | B) with P(B | A). They are generally different.
tips:
  - In a two-way table, a conditional probability restricts you to one row or column.
related:
  - math-aa/4-6-combined-events
  - math-aa/4-13-bayes-theorem
---

## Conditional probability

$$
P(A\mid B) = \frac{P(A\cap B)}{P(B)}
$$

```example
| | Walk | Bus | Total |
|---|---|---|---|
| Year 11 | 30 | 20 | 50 |
| Year 12 | 15 | 35 | 50 |

Find P(Walk | Year 12) and P(Year 12 | Walk).
---
P(Walk | Year 12) $= \tfrac{15}{50} = 0.3$. P(Year 12 | Walk) $= \tfrac{15}{45} = \tfrac13$. They differ.
```

## Independence

```keyidea
A and B are independent exactly when P(A | B) = P(A) — equivalently P(A ∩ B) = P(A)P(B), or P(A | B) = P(A | B′).
```

```example
In the table, are "walks" and "Year 11" independent?
---
P(Walk) $= \tfrac{45}{100} = 0.45$; P(Walk | Year 11) $= \tfrac{30}{50} = 0.6$. Not equal, so not independent.
```

```question
cond-table
```

## Summary

- $P(A\mid B) = P(A\cap B)/P(B)$; restrict to the given condition.
- Independent ⇔ $P(A\mid B) = P(A)$.
