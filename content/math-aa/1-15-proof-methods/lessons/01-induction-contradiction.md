---
code: 1.15.1
title: Induction, contradiction and counterexample
summary: Three proof techniques — proving for all n step by step, showing the opposite is impossible, and disproving with one example.
minutes: 40
difficulty: 3
hl: true
objectives:
  - Prove results for sums, divisibility and derivatives by mathematical induction.
  - Prove statements by contradiction (e.g. irrationality of √2).
  - Disprove statements with a counterexample.
definitions:
  - term: Mathematical induction
    definition: A proof that a statement P(n) holds for all integers n ≥ n₀, by showing P(n₀) is true and that P(k) ⇒ P(k + 1).
  - term: Proof by contradiction
    definition: Assume the statement is false and deduce something impossible, so the statement must be true.
  - term: Counterexample
    definition: A single example showing that a general statement is false.
mistakes:
  - Writing "assume true for n = k" without using it. The inductive step must use the assumption P(k).
  - Omitting the concluding sentence. Marks are given for the full logical conclusion.
tips:
  - Standard induction conclusion — "Since P(1) is true and P(k) true implies P(k + 1) true, P(n) is true for all n ∈ ℤ⁺ by mathematical induction."
related:
  - math-aa/1-6-deductive-proof
---

## Proof by induction

Four parts:

1. **Basis:** show $P(1)$ (or $P(n_0)$) is true.
2. **Assumption:** assume $P(k)$ is true for some $k$.
3. **Inductive step:** use $P(k)$ to show $P(k + 1)$ is true.
4. **Conclusion:** state that $P(n)$ holds for all $n \ge n_0$.

```example
Prove that $\displaystyle\sum_{r=1}^{n} r = \frac{n(n + 1)}{2}$ for all $n \in \mathbb{Z}^+$.
---
$n = 1$: LHS = 1, RHS = $\tfrac{1\times2}{2} = 1$ ✓.

Assume $\sum_{r=1}^{k} r = \tfrac{k(k + 1)}{2}$. Then $\sum_{r=1}^{k+1} r = \tfrac{k(k + 1)}{2} + (k + 1) = \tfrac{(k + 1)(k + 2)}{2}$, which is the formula with $n = k + 1$.

Since true for $n = 1$, and true for $k$ ⇒ true for $k + 1$, it is true for all $n \in \mathbb{Z}^+$. ∎
```

```example
Prove that $6^n - 1$ is divisible by 5 for all $n \in \mathbb{Z}^+$.
---
$n = 1$: $5$ ✓. Assume $6^k - 1 = 5m$. Then $6^{k+1} - 1 = 6\cdot6^k - 1 = 6(5m + 1) - 1 = 30m + 5 = 5(6m + 1)$ ✓. Conclusion as before. ∎
```

## Proof by contradiction

```keyidea
Assume the opposite of what you want to prove, then reach a contradiction. The assumption must be false, so the original statement is true.
```

```example
Prove that $\sqrt2$ is irrational.
---
Assume $\sqrt2 = \tfrac{p}{q}$ in lowest terms. Then $p^2 = 2q^2$, so $p^2$ is even, so $p$ is even: $p = 2m$. Then $4m^2 = 2q^2 \Rightarrow q^2 = 2m^2$, so $q$ is even too — contradicting lowest terms. Hence $\sqrt2$ is irrational. ∎
```

## Counterexample

To show a statement is **false**, one counterexample is enough.

```example
Disprove: "$n^2 + n + 41$ is prime for all $n \in \mathbb{N}$."
---
$n = 41$: $41^2 + 41 + 41 = 41\times43$, which is not prime.
```

```question
induction-step
```

## Summary

- Induction: basis, assumption, step using P(k), conclusion.
- Contradiction: assume false → impossibility.
- One counterexample disproves a general claim.
