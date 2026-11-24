---
code: T3.2
title: Uncertainties and errors
summary: Random and systematic errors, absolute, fractional and percentage uncertainties, and how uncertainties combine in calculations.
minutes: 35
difficulty: 2
objectives:
  - Distinguish random and systematic errors, and precision and accuracy.
  - Express uncertainties as absolute, fractional and percentage values.
  - Propagate uncertainties through sums, differences, products, quotients and powers.
formulas:
  - name: Sums and differences
    latex: 'y = a \pm b \Rightarrow \Delta y = \Delta a + \Delta b'
  - name: Products and quotients
    latex: 'y = \frac{ab}{c} \Rightarrow \frac{\Delta y}{y} = \frac{\Delta a}{a} + \frac{\Delta b}{b} + \frac{\Delta c}{c}'
  - name: Powers
    latex: 'y = a^n \Rightarrow \frac{\Delta y}{y} = \left|n\frac{\Delta a}{a}\right|'
definitions:
  - term: Random error
    definition: Unpredictable scatter of readings about the true value; reduced by repeating and averaging.
  - term: Systematic error
    definition: An error that shifts all readings in the same direction by the same amount or proportion; not reduced by repeating.
  - term: Accuracy
    definition: How close a measurement is to the true value.
  - term: Precision
    definition: How close repeated measurements are to each other.
mistakes:
  - Adding percentage uncertainties for a sum. For sums and differences add absolute uncertainties.
  - Quoting an uncertainty to several significant figures. Give uncertainties to 1 (at most 2) significant figures and round the value to match.
tips:
  - For a power, multiply the fractional uncertainty by the power — a square doubles it, a square root halves it.
  - Uncertainty of a mean of repeated readings ≈ half the range.
related:
  - physics/t1-experimental-techniques
---

## Errors

| | Random error | Systematic error |
|---|---|---|
| Effect | Scatter about the true value | All readings shifted the same way |
| Examples | Reaction time, fluctuating readings | Zero error, miscalibrated meter, heat loss |
| Reduce by | Repeating and averaging | Better technique, calibration, correction |
| Affects | Precision | Accuracy |

```keyidea
Precise readings agree with each other; accurate readings agree with the true value. You can be precise but inaccurate (a consistent systematic error).
```

## Expressing uncertainty

For $L = 25.0 \pm 0.5$ cm:

- **absolute** uncertainty $\Delta L = 0.5$ cm;
- **fractional** uncertainty $\Delta L/L = 0.02$;
- **percentage** uncertainty $= 2\%$.

For repeated readings, a reasonable uncertainty is **half the range**.

## Propagating uncertainties

- **Adding or subtracting** — add the **absolute** uncertainties.
- **Multiplying or dividing** — add the **fractional** (or percentage) uncertainties.
- **Raising to a power** $n$ — multiply the fractional uncertainty by $|n|$.

```example
A cube has side 2.0 ± 0.1 cm and mass 64.0 ± 0.5 g. Find its density with its uncertainty.
---
$\rho = m/L^3 = 64.0/8.0 = 8.0$ g cm⁻³.

Fractional uncertainty: $\dfrac{0.5}{64.0} + 3\times\dfrac{0.1}{2.0} = 0.008 + 0.15 = 0.158$.

$\Delta\rho = 0.158\times8.0 = 1.3$, so $\rho = 8 \pm 1$ g cm⁻³.
```

```example
Two lengths are 54.2 ± 0.1 cm and 21.6 ± 0.1 cm. Find their difference.
---
$54.2 - 21.6 = 32.6$ cm, uncertainty $0.1 + 0.1 = 0.2$ cm: $32.6 \pm 0.2$ cm.
```

```question
power-uncertainty
```

## Summary

- Random errors → precision; systematic errors → accuracy.
- Absolute, fractional, percentage uncertainty.
- Sums: add absolute. Products/quotients: add fractional. Powers: multiply fractional by $n$.
