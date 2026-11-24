---
code: 1.4.1
title: Compound interest and depreciation
summary: Applying geometric sequences to savings, loans and depreciation, including different compounding periods.
minutes: 25
difficulty: 2
objectives:
  - Calculate future value with compound interest for different compounding periods.
  - Calculate depreciation.
  - Find the number of periods or the rate needed to reach a target.
formulas:
  - name: Compound interest
    latex: 'FV = PV\left(1 + \frac{r}{100k}\right)^{kn}'
  - name: Depreciation
    latex: 'V = V_0\left(1 - \frac{r}{100}\right)^n'
definitions:
  - term: Present value (PV)
    definition: The amount invested or borrowed at the start.
  - term: Future value (FV)
    definition: The value of the investment after interest has been added.
  - term: Depreciation
    definition: A decrease in value over time, often modelled as a fixed percentage per year.
mistakes:
  - Using the annual rate per period. For monthly compounding divide r by 12 and multiply the years by 12.
tips:
  - A GDC’s finance solver (TVM) can find any one unknown — but show the formula in written work.
related:
  - math-aa/1-3-geometric-sequences
---

## Compound interest

Interest is added to the balance, so each period multiplies the amount by the same factor — a geometric sequence.

$$
FV = PV\left(1 + \frac{r}{100k}\right)^{kn}
$$

$r$ = annual interest rate (%), $k$ = number of compounding periods per year, $n$ = number of years.

```example
\$5000 is invested at 4.2% per year compounded monthly. Find its value after 6 years.
---
$FV = 5000\left(1 + \dfrac{4.2}{1200}\right)^{72} = 5000(1.0035)^{72} = \$6430.15$.
```

```keyidea
More frequent compounding gives a slightly larger final amount for the same annual rate, because interest starts earning interest sooner.
```

## Depreciation

$$
V = V_0\left(1 - \frac{r}{100}\right)^n
$$

```example
A machine bought for \$80 000 depreciates by 12% per year. Find its value after 5 years.
---
$80000(0.88)^5 = \$42\,219$ (to the nearest dollar).
```

## Finding the time or rate

```example
How many years, compounded annually at 3.5%, does it take for an investment to double?
---
$(1.035)^n = 2 \Rightarrow n = \dfrac{\ln2}{\ln1.035} = 20.1$, so 21 complete years.
```

```question
ci-monthly
```

## Summary

- $FV = PV(1 + r/100k)^{kn}$.
- Depreciation: multiply by $(1 - r/100)$ each year.
- Use logarithms (or a GDC) to find $n$.
