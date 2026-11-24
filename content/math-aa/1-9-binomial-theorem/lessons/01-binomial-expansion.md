---
code: 1.9.1
title: The binomial theorem
summary: Expanding (a + b)ⁿ using Pascal’s triangle and ⁿCᵣ, and finding particular terms.
minutes: 30
difficulty: 2
objectives:
  - Expand (a + b)ⁿ for n ∈ ℕ using Pascal’s triangle or ⁿCᵣ.
  - Find a specific term or coefficient in an expansion.
  - Find a constant term or an unknown constant from a given coefficient.
formulas:
  - name: Binomial theorem
    latex: '(a + b)^n = \sum_{r=0}^{n}\binom{n}{r}a^{n-r}b^r'
  - name: Binomial coefficient
    latex: '\binom{n}{r} = {}^nC_r = \frac{n!}{r!(n - r)!}'
  - name: General term
    latex: 'T_{r+1} = \binom{n}{r}a^{n-r}b^r'
definitions:
  - term: Binomial coefficient
    definition: ⁿCᵣ, the number of ways of choosing r items from n; the coefficients in row n of Pascal’s triangle.
mistakes:
  - Forgetting to raise the coefficient inside a bracket. In (2x − 3)⁵ one term contains (2x)² = 4x², not 2x².
  - Losing the sign of b. Keep b = −3 as a negative number.
tips:
  - The general term is the (r + 1)th term — the 4th term has r = 3.
related:
  - math-aa/1-10-counting-principles
---

## Pascal’s triangle

Each entry is the sum of the two above it:

```
        1
       1 1
      1 2 1
     1 3 3 1
    1 4 6 4 1
```

Row $n$ gives the coefficients of $(a + b)^n$.

## The binomial theorem

$$
(a + b)^n = \sum_{r=0}^{n}\binom{n}{r}a^{n-r}b^r, \qquad \binom{n}{r} = \frac{n!}{r!(n - r)!}
$$

```example
Expand $(2x - 1)^4$.
---
$\binom40(2x)^4 + \binom41(2x)^3(-1) + \binom42(2x)^2(-1)^2 + \binom43(2x)(-1)^3 + \binom44(-1)^4$

$= 16x^4 - 32x^3 + 24x^2 - 8x + 1$.
```

## Finding one term

```keyidea
The general term is T_{r+1} = ⁿCᵣ aⁿ⁻ʳ bʳ. Write it out with the powers of x collected, then choose r to get the power you want.
```

```example
Find the coefficient of $x^3$ in $(3 + 2x)^7$.
---
Term: $\binom{7}{r}3^{7-r}(2x)^r$. For $x^3$, $r = 3$: $35\times3^4\times2^3 = 35\times81\times8 = 22\,680$.
```

```example
Find the constant term in $\left(x^2 + \dfrac{2}{x}\right)^6$.
---
Term: $\binom6r(x^2)^{6-r}(2x^{-1})^r = \binom6r2^rx^{12-3r}$. Constant when $r = 4$: $15\times16 = 240$.
```

```question
binom-coeff
```

## Summary

- Coefficients: Pascal’s triangle or ⁿCᵣ.
- General term $T_{r+1} = \binom nr a^{n-r}b^r$.
- Collect powers of x to find a particular term.
