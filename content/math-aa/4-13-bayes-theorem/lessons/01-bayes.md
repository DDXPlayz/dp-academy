---
code: 4.13.1
title: Bayes’ theorem
summary: Reversing conditional probabilities — finding P(cause | evidence) from P(evidence | cause).
minutes: 30
difficulty: 3
hl: true
objectives:
  - Use Bayes’ theorem for two or three events.
  - Use tree diagrams to organise Bayes problems.
  - Interpret results such as false positives in medical tests.
formulas:
  - name: Bayes’ theorem (two events)
    latex: 'P(B\mid A) = \frac{P(B)P(A\mid B)}{P(B)P(A\mid B) + P(B'')P(A\mid B'')}'
  - name: Bayes’ theorem (three events)
    latex: 'P(B_i\mid A) = \frac{P(B_i)P(A\mid B_i)}{\sum_j P(B_j)P(A\mid B_j)}'
definitions:
  - term: Prior probability
    definition: The probability of a cause before the evidence is observed, P(B).
  - term: Posterior probability
    definition: The updated probability of the cause after the evidence, P(B | A).
mistakes:
  - Treating P(positive | disease) as P(disease | positive). For rare conditions they can be very different.
tips:
  - Draw the tree with the causes first; the denominator is the total probability of the evidence across all branches.
related:
  - math-aa/4-11-conditional-probability
---

## Reversing a condition

```keyidea
Bayes’ theorem turns P(evidence | cause) into P(cause | evidence): the probability along the branch you want, divided by the total probability of the evidence.
```

$$
P(B\mid A) = \frac{P(B)P(A\mid B)}{P(B)P(A\mid B) + P(B')P(A\mid B')}
$$

## A medical test

```example
1% of a population has a disease. A test detects it 95% of the time when present, but gives a false positive 8% of the time when absent. A person tests positive. Find the probability they have the disease.
---
P(D) = 0.01, P(+ | D) = 0.95, P(+ | D′) = 0.08.

$P(D\mid +) = \dfrac{0.01\times0.95}{0.01\times0.95 + 0.99\times0.08} = \dfrac{0.0095}{0.0887} = 0.107$.

Only about 11% — most positives are false because the disease is rare.
```

## Three events

```example
Factories A, B and C make 50%, 30% and 20% of items, with defect rates 2%, 3% and 5%. A defective item is found. Find P(it came from C).
---
Total P(defect) $= 0.5(0.02) + 0.3(0.03) + 0.2(0.05) = 0.029$.

$P(C\mid \text{defect}) = \dfrac{0.2\times0.05}{0.029} = 0.345$.
```

```question
bayes-test
```

## Summary

- Posterior = (prior × likelihood) ÷ total probability of the evidence.
- Use a tree; sum all branches leading to the evidence.
- Rare conditions give many false positives.
