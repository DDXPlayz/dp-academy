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

```figure
src: math-aa/_sme/4-4-probability-distributions/img/fig-7d4f3bb31ace60f9.png
caption: A discrete probability distribution, shown as a table and as a bar graph of P(X = x).
```

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

## (HL) Variance and linear transformations

The variance of a discrete random variable measures its spread:

$$\text{Var}(X) = E\big((X - \mu)^2\big) = E(X^2) - \big(E(X)\big)^2, \qquad E(X^2) = \sum x^2 P(X = x)$$

```mistake
$E(X^2)$ is not the same as $\big(E(X)\big)^2$. Square each value first, then weight by the probabilities.
```

If every value is scaled and shifted, $Y = aX + b$:

$$E(aX + b) = aE(X) + b, \qquad \text{Var}(aX + b) = a^2\,\text{Var}(X)$$

Adding $b$ moves the distribution but does not change its spread; multiplying by $a$ multiplies the standard deviation by $|a|$.

```example
X takes the values 0, 1, 2 with probabilities 0.5, 0.3, 0.2. Find Var(X), and the mean and variance of Y = 10X − 4.
---
$E(X) = 0.3 + 0.4 = 0.7$. $E(X^2) = 0.3 + 0.8 = 1.1$. $\text{Var}(X) = 1.1 - 0.49 = 0.61$.

$E(Y) = 10(0.7) - 4 = 3$, and $\text{Var}(Y) = 100 \times 0.61 = 61$.
```

## Summary

- Probabilities sum to 1.
- $E(X) = \sum xP(X = x)$ — the long-run mean.
- Fair game: expected gain 0.
