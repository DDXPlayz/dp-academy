---
code: E.3.18
title: The radioactive decay law
summary: The decay constant, the exponential law N = N₀e^(−λt), and the link between λ and half-life.
minutes: 30
difficulty: 3
hl: true
objectives:
  - Define the decay constant λ and use N = N₀e^(−λt).
  - Use A = λN = λN₀e^(−λt).
  - Use T½ = ln2/λ.
  - Explain when λ approximates the probability of decay per unit time.
prerequisites:
  - Activity and half-life
  - Logarithms
formulas:
  - name: Decay law
    latex: 'N = N_0e^{-\lambda t}'
  - name: Activity
    latex: 'A = \lambda N = \lambda N_0e^{-\lambda t}'
  - name: Half-life and decay constant
    latex: 'T_{1/2} = \frac{\ln 2}{\lambda}'
definitions:
  - term: Decay constant
    definition: The constant λ in the decay law; for small λt it approximates the probability that a given nucleus decays per unit time.
mistakes:
  - Mixing units. If λ is in s⁻¹, t must be in seconds (and activity comes out in Bq).
  - Using N₀ for activity calculations at a later time — use N at that time, A = λN.
tips:
  - To find t, take natural logs — t = (1/λ) ln(N₀/N).
  - A graph of ln N (or ln A) against t is a straight line with gradient −λ.
related:
  - physics/e3-nuclear
---

## The decay constant

Each nucleus has the same chance of decaying in a short time interval. So the rate of decay is proportional to the number of nuclei left:

$$
\frac{\Delta N}{\Delta t} = -\lambda N
$$

$\lambda$ is the **decay constant**, in s⁻¹. This gives the **decay law**:

$$
N = N_0e^{-\lambda t}
$$

```keyidea
λ is close to the probability that a given nucleus decays in one unit of time — but only when λt is small. Over long times many nuclei have already gone, so the simple "probability × time" picture breaks down; the exponential takes care of that.
```

## Activity

$$
A = \lambda N = \lambda N_0e^{-\lambda t} = A_0e^{-\lambda t}
$$

## Half-life and λ

Put $N = N_0/2$ at $t = T_{1/2}$: $\tfrac{1}{2} = e^{-\lambda T_{1/2}}$, so

$$
T_{1/2} = \frac{\ln 2}{\lambda}
$$

```example
Iodine-131 has a half-life of 8.0 days. A sample contains 5.0 × 10¹⁶ nuclei. Find (a) λ in s⁻¹, (b) the activity now, (c) the number left after 20 days.
---
(a) $\lambda = \ln2/(8.0\times86400) = 1.0\times10^{-6}$ s⁻¹.

(b) $A = \lambda N = 1.0\times10^{-6}\times5.0\times10^{16} = 5.0\times10^{10}$ Bq.

(c) $\lambda$ in day⁻¹ $= 0.0866$; $N = 5.0\times10^{16}e^{-0.0866\times20} = 8.8\times10^{15}$.
```

## Straight-line graphs

Taking logs: $\ln N = \ln N_0 - \lambda t$. Plotting $\ln N$ (or $\ln A$, or the log of a corrected count rate) against $t$ gives a straight line with gradient $-\lambda$ — the best way to find $\lambda$ from experimental data.

```figure
src: physics/_sme/radioactive-decay/img/fig-d593cb7ca79b6b3d.png
caption: Plotting ln N (or ln A) against time gives a straight line whose gradient is −λ.
```

```question
decay-constant-calc
```

## Summary

- $N = N_0e^{-\lambda t}$; $A = \lambda N$.
- $T_{1/2} = \ln2/\lambda$.
- $\ln N$ against $t$: gradient $-\lambda$.
