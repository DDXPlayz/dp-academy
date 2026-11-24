---
code: 4.5.1
title: Probability concepts
summary: Trials, outcomes, sample spaces, theoretical and experimental probability, complements and expected occurrences.
minutes: 20
difficulty: 1
objectives:
  - Use the language of probability — trial, outcome, sample space, event.
  - Calculate P(A) = n(A)/n(U) for equally likely outcomes.
  - Use P(A′) = 1 − P(A).
  - Calculate relative frequency and expected number of occurrences.
formulas:
  - name: Probability
    latex: 'P(A) = \frac{n(A)}{n(U)}'
  - name: Complement
    latex: 'P(A'') = 1 - P(A)'
  - name: Expected occurrences
    latex: 'E = np'
definitions:
  - term: Sample space
    definition: The set U of all possible outcomes of a trial.
  - term: Relative frequency
    definition: The number of times an event occurs divided by the number of trials — an experimental estimate of probability.
mistakes:
  - Using n(A)/n(U) when outcomes are not equally likely.
tips:
  - At-least-one problems are usually easiest as 1 − P(none).
related:
  - math-aa/4-6-combined-events
---

## The basics

A **trial** produces an **outcome**; the **sample space** $U$ lists all outcomes; an **event** is a set of outcomes.

$$
P(A) = \frac{n(A)}{n(U)} \quad\text{(equally likely outcomes)}, \qquad P(A') = 1 - P(A)
$$

```example
Two fair dice are rolled. Find P(total is 8).
---
The sample space has 36 outcomes. Totals of 8: (2,6), (3,5), (4,4), (5,3), (6,2) — five outcomes. $P = \tfrac{5}{36}$.
```

## Relative frequency and expected value

```keyidea
With many trials, relative frequency approaches the true probability. The expected number of occurrences in n trials is np.
```

```example
A biased coin lands heads 132 times in 200 throws. Estimate P(heads) and the expected number of heads in 50 throws.
---
$P \approx 0.66$. Expected heads $= 50\times0.66 = 33$.
```

```question
dice-prob
```

## Summary

- $P(A) = n(A)/n(U)$ for equally likely outcomes; $P(A') = 1 - P(A)$.
- Relative frequency estimates probability; expected count $= np$.
