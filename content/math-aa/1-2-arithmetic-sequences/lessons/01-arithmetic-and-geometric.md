---
code: 1.2.1
title: Arithmetic and geometric sequences
summary: Add the same amount each time, or multiply by the same amount — two patterns that model everything from savings to population growth.
minutes: 30
difficulty: 1
objectives:
  - Recognise arithmetic and geometric sequences and find their common difference or ratio.
  - Use formulae for the nth term and the sum of the first n terms.
  - Find the sum to infinity of a convergent geometric series.
  - Apply geometric sequences to compound interest.
prerequisites:
  - Solving linear equations
  - Laws of exponents
formulas:
  - name: Arithmetic nth term
    latex: 'u_n = u_1 + (n-1)d'
  - name: Arithmetic series
    latex: 'S_n = \frac{n}{2}\left(2u_1 + (n-1)d\right) = \frac{n}{2}(u_1 + u_n)'
  - name: Geometric nth term
    latex: 'u_n = u_1 r^{\,n-1}'
  - name: Geometric series
    latex: 'S_n = \frac{u_1(r^n - 1)}{r - 1}, \quad r \ne 1'
  - name: Sum to infinity
    latex: 'S_\infty = \frac{u_1}{1 - r}, \quad |r| < 1'
  - name: Compound interest
    latex: 'FV = PV \times \left(1 + \frac{r}{100k}\right)^{kn}'
    where: r is the annual rate in %, k compounding periods per year, n years.
definitions:
  - term: Arithmetic sequence
    definition: A sequence in which each term is found by adding a fixed number, the common difference $d$, to the previous term.
  - term: Geometric sequence
    definition: A sequence in which each term is found by multiplying the previous term by a fixed number, the common ratio $r$.
  - term: Series
    definition: The sum of the terms of a sequence.
  - term: Convergent series
    definition: An infinite series whose partial sums approach a finite limit. A geometric series converges exactly when $|r| < 1$.
mistakes:
  - Using $n$ instead of $n - 1$ in the nth-term formulas. The first term has no differences or ratios applied yet.
  - Applying $S_\infty$ when $|r| \ge 1$. The sum to infinity does not exist then.
  - Writing a percentage growth as $r = 5$ instead of $r = 1.05$ in a geometric model.
tips:
  - Many questions give two terms and ask for $u_1$ and $d$ (or $r$). Write both terms with the formula and solve simultaneously — for geometric, divide one equation by the other.
  - Your GDC’s finance solver (TVM) is allowed in Paper 2 for compound-interest problems; show the values you entered.
related:
  - math-aa/1-7-laws-exponents-logs
---

## Introduction

Some patterns grow by steady steps: 5, 9, 13, 17, … Others grow by a steady factor: 3, 6, 12, 24, … The first kind is **arithmetic**, the second **geometric**, and between them they model a surprising amount of the real world.

## Arithmetic sequences

Each term is the previous one plus a constant **common difference** $d$. To reach the $n$th term from the first you add $d$ exactly $n - 1$ times:

$$u_n = u_1 + (n-1)d$$

To add up the first $n$ terms, pair the first with the last, the second with the second-last, and so on — every pair has the same total. That gives

$$S_n = \frac{n}{2}(u_1 + u_n) = \frac{n}{2}\left(2u_1 + (n-1)d\right)$$

```example
For the sequence 5, 9, 13, 17, …, find (a) the 20th term and (b) the sum of the first 20 terms.
---
Here $u_1 = 5$ and $d = 4$.

**(a)** $u_{20} = 5 + 19 \times 4 = 81$.

**(b)** $S_{20} = \dfrac{20}{2}(5 + 81) = 10 \times 86 = 860$.
```

## Geometric sequences

Each term is the previous one multiplied by a constant **common ratio** $r$:

$$u_n = u_1 r^{\,n-1}$$

The sum of the first $n$ terms is

$$S_n = \frac{u_1(r^n - 1)}{r - 1}$$

```example
Find the 8th term of 3, 6, 12, 24, … and the sum of its first 8 terms.
---
$u_1 = 3$, $r = 2$.

$u_8 = 3 \times 2^7 = 384$, and $S_8 = \dfrac{3(2^8 - 1)}{2 - 1} = 3 \times 255 = 765$.
```

## Sums to infinity

If $|r| < 1$, the terms shrink towards zero and the total settles down to a finite value:

$$S_\infty = \frac{u_1}{1 - r}$$

```keyidea
A geometric series has a sum to infinity **only** when $-1 < r < 1$. If $|r| \ge 1$, the terms never get small enough and the sum grows without limit (or oscillates).
```

```example
Find the sum to infinity of 24 + 12 + 6 + 3 + ⋯
---
$u_1 = 24$, $r = \tfrac12$, and $|r| < 1$, so

$$S_\infty = \frac{24}{1 - \frac12} = 48$$
```

## Compound interest

Money growing at a fixed percentage is a geometric sequence. At 5 % a year, each year’s value is 1.05 times the last.

```example
USD 1000 is invested at 5 % per year, compounded annually. What is it worth after 10 years?
---
$$FV = 1000 \times 1.05^{10} = 1628.89$$

The investment is worth **USD 1628.89**.
```

## Try it yourself

```question
arith-term
```

```question
geo-sum-infinity
```

## Summary

- Arithmetic: add $d$; $u_n = u_1 + (n-1)d$; $S_n = \frac n2(u_1 + u_n)$.
- Geometric: multiply by $r$; $u_n = u_1r^{n-1}$; $S_n = \frac{u_1(r^n-1)}{r-1}$.
- $S_\infty = \frac{u_1}{1-r}$ exists only when $|r| < 1$.
