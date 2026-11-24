---
code: 4.8.1
title: The binomial distribution
summary: Counting successes in a fixed number of independent trials — conditions, probabilities, mean and variance.
minutes: 30
difficulty: 2
objectives:
  - State the conditions for a binomial model.
  - Calculate P(X = r), P(X ≤ r) and P(X ≥ r) with a GDC or formula.
  - Use E(X) = np and Var(X) = np(1 − p).
formulas:
  - name: Binomial probability
    latex: 'P(X = r) = \binom nr p^r(1 - p)^{n - r}'
  - name: Mean and variance
    latex: 'E(X) = np,\quad \text{Var}(X) = np(1 - p)'
definitions:
  - term: Binomial distribution
    definition: X ~ B(n, p) counts successes in n independent trials, each with the same probability p of success.
mistakes:
  - Using binomCdf for P(X ≥ r) directly. P(X ≥ r) = 1 − P(X ≤ r − 1).
tips:
  - Conditions — fixed n, two outcomes, constant p, independent trials.
related:
  - math-aa/4-7-discrete-random-variables
---

## When to use it

```keyidea
X ~ B(n, p) when there is a fixed number n of independent trials, each with two outcomes and the same probability p of success. X counts the successes.
```

$$
P(X = r) = \binom nr p^r(1 - p)^{n - r}
$$

## Calculations

```example
A multiple-choice test has 10 questions with 4 options each. A student guesses all of them. Find P(exactly 3 correct) and P(at least 3 correct).
---
$X \sim B(10, 0.25)$. $P(X = 3) = \binom{10}{3}(0.25)^3(0.75)^7 = 0.250$.

$P(X \ge 3) = 1 - P(X \le 2) = 1 - 0.526 = 0.474$.
```

## Mean and variance

$$
E(X) = np, \qquad \text{Var}(X) = np(1 - p)
$$

For the test: $E(X) = 2.5$, $\text{Var}(X) = 1.875$.

```question
binom-mean
```

## Summary

- Conditions: fixed n, independent, two outcomes, constant p.
- $P(X = r) = \binom nr p^r(1 - p)^{n - r}$; use the complement for "at least".
- $E = np$, $\text{Var} = np(1 - p)$.
