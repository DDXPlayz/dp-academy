---
code: 1.3.1
title: Geometric sequences and series
summary: Sequences with a common ratio — nth term, sum of n terms, sigma notation and applications.
minutes: 30
difficulty: 2
objectives:
  - Find the common ratio, nth term and sum of a geometric sequence.
  - Use sigma notation for geometric series.
  - Solve problems involving geometric growth and decay, including finding n with logarithms.
formulas:
  - name: nth term
    latex: 'u_n = u_1r^{n-1}'
  - name: Sum of n terms
    latex: 'S_n = \frac{u_1(r^n - 1)}{r - 1} = \frac{u_1(1 - r^n)}{1 - r},\quad r\ne1'
definitions:
  - term: Common ratio
    definition: The constant r = u_{n+1}/u_n by which each term is multiplied to get the next.
mistakes:
  - Using u₁rⁿ for the nth term. The power is n − 1.
  - Solving rⁿ⁻¹ = k by trial instead of logarithms. Take logs — n − 1 = ln k / ln r.
tips:
  - Divide two given terms to eliminate u₁ — u₇ / u₄ = r³.
related:
  - math-aa/1-2-arithmetic-sequences
  - math-aa/1-8-infinite-geometric-series
---

## Geometric sequences

Each term is the previous one multiplied by the **common ratio** $r$:

```figure
src: math-aa/_iitian/sl-1-3-geometric-sequences-and-series-study-notes/img/fig-33b620661be213bd.png
caption: In a geometric sequence each term is the previous one multiplied by the common ratio r.
```

$$
u_n = u_1r^{n-1}
$$

```example
A geometric sequence has u₃ = 12 and u₆ = 96. Find r and u₁.
---
$\dfrac{u_6}{u_3} = r^3 = 8 \Rightarrow r = 2$. Then $u_1 = 12/2^2 = 3$.
```

## Geometric series

$$
S_n = \frac{u_1(r^n - 1)}{r - 1}
$$

(use $\frac{u_1(1 - r^n)}{1 - r}$ when $|r| < 1$ to keep numbers positive).

```example
Evaluate $\displaystyle\sum_{k=1}^{8} 5(3)^{k-1}$.
---
$u_1 = 5$, $r = 3$, $n = 8$: $S_8 = \dfrac{5(3^8 - 1)}{3 - 1} = \dfrac{5\times6560}{2} = 16\,400$.
```

## Applications and finding n

```keyidea
Geometric sequences model repeated percentage change: growth by p% means r = 1 + p/100; decay by p% means r = 1 − p/100. To find n, take logarithms.
```

```example
A population of 2000 grows by 5% per year. After how many complete years does it first exceed 5000?
---
$2000(1.05)^n > 5000 \Rightarrow 1.05^n > 2.5 \Rightarrow n > \dfrac{\ln2.5}{\ln1.05} = 18.8$. So after **19** years.
```

```question
geo-term
```

## Summary

- $u_n = u_1r^{n-1}$; $S_n = u_1(r^n - 1)/(r - 1)$.
- Divide terms to find $r$; use logs to find $n$.
- Percentage change: $r = 1 \pm p/100$.
