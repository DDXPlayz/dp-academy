---
code: 4.6.1
title: Combined events, Venn and tree diagrams
summary: The addition rule, mutually exclusive and independent events, conditional probability, and diagrams to organise them.
minutes: 35
difficulty: 2
objectives:
  - Use Venn diagrams, tree diagrams, sample space diagrams and tables.
  - Use P(A ∪ B) = P(A) + P(B) − P(A ∩ B).
  - Recognise mutually exclusive and independent events.
  - Calculate conditional probabilities.
formulas:
  - name: Addition rule
    latex: 'P(A\cup B) = P(A) + P(B) - P(A\cap B)'
  - name: Conditional probability
    latex: 'P(A\mid B) = \frac{P(A\cap B)}{P(B)}'
  - name: Independent events
    latex: 'P(A\cap B) = P(A)P(B)'
definitions:
  - term: Mutually exclusive
    definition: Events that cannot happen together, P(A ∩ B) = 0.
  - term: Independent
    definition: Events where one occurring does not change the probability of the other.
mistakes:
  - Confusing mutually exclusive with independent. Mutually exclusive events (with non-zero probabilities) are never independent.
tips:
  - In a tree diagram, multiply along branches and add between branches.
related:
  - math-aa/4-11-conditional-probability
---

## The addition rule

$$
P(A\cup B) = P(A) + P(B) - P(A\cap B)
$$

For **mutually exclusive** events $P(A\cap B) = 0$.

## Conditional probability and independence

```keyidea
P(A | B) is the probability of A given that B has happened: P(A ∩ B)/P(B). A and B are independent exactly when P(A ∩ B) = P(A)P(B).
```

```figure
src: math-aa/_sme/4-3-probability/img/fig-e60a297d5e976eac.png
caption: A tree diagram for two events: multiply along the branches; the conditional probabilities sit on the second set of branches.
```

```example
In a class of 30, 18 study French (F), 12 study Spanish (S), and 5 study both. Find P(F ∪ S) and P(F | S).
---
$P(F\cup S) = \tfrac{18 + 12 - 5}{30} = \tfrac{25}{30} = \tfrac56$. $P(F\mid S) = \tfrac{5}{12}$.
```

## Tree diagrams

```example
A bag has 5 red and 3 blue counters. Two are taken without replacement. Find P(one of each colour).
---
$P(RB) + P(BR) = \tfrac58\cdot\tfrac37 + \tfrac38\cdot\tfrac57 = \tfrac{30}{56} = \tfrac{15}{28}$.
```

```question
union-prob
```

## Summary

- $P(A\cup B) = P(A) + P(B) - P(A\cap B)$.
- Conditional: $P(A\mid B) = P(A\cap B)/P(B)$.
- Independent: $P(A\cap B) = P(A)P(B)$; mutually exclusive: $P(A\cap B) = 0$.
