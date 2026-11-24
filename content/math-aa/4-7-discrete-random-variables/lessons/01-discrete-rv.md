---
code: 4.7.1
title: Discrete random variables
summary: Probability distributions, the condition that probabilities sum to 1, expected value, and fair games.
minutes: 25
difficulty: 2
objectives:
  - Write probability distributions in a table or as a formula.
  - Use ΣP(X = x) = 1 to find unknown probabilities.
  - Calculate the expected value E(X) and interpret it, including fair games.
formulas:
  - name: Total probability
    latex: '\sum P(X = x) = 1'
  - name: Expected value
    latex: 'E(X) = \sum xP(X = x)'
definitions:
  - term: Discrete random variable
    definition: A variable taking countable values, each with a probability.
  - term: Fair game
    definition: A game in which the expected gain of a player is zero.
mistakes:
  - Expecting E(X) to be a possible value of X. It is a long-run average.
tips:
  - For gains, subtract the cost to play before calculating E.
related:
  - math-aa/4-8-binomial-distribution
  - math-aa/4-14-continuous-random-variables
---

## Probability distributions

| x | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| P(X = x) | 0.1 | 0.3 | k | 0.2 |

All probabilities sum to 1, so $k = 0.4$.

## Expected value

$$
E(X) = \sum xP(X = x)
$$

```example
Find E(X) for the table above.
---
$0(0.1) + 1(0.3) + 2(0.4) + 3(0.2) = 1.7$.
```

```keyidea
E(X) is the mean value of X in the long run. A game is fair when the expected gain is 0.
```

```example
It costs \$2 to play. You win \$10 with probability 0.1, \$3 with probability 0.2, otherwise nothing. Is the game fair?
---
Expected winnings $= 10(0.1) + 3(0.2) = 1.6$. Expected gain $= 1.6 - 2 = -0.40$ — not fair; the player loses 40 cents per game on average.
```

```question
find-k
```

## Summary

- Probabilities sum to 1.
- $E(X) = \sum xP(X = x)$ — the long-run mean.
- Fair game: expected gain 0.
