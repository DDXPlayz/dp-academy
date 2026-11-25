---
code: R2.2.12
title: The Arrhenius equation
summary: How the rate constant depends on temperature, and how to find the activation energy from a graph.
minutes: 30
difficulty: 3
hl: true
objectives:
  - Use the Arrhenius equation, k = Ae^(−Ea/RT).
  - Determine Ea graphically from a plot of ln k against 1/T.
  - Calculate Ea from rate constants at two temperatures.
  - Describe the meaning of the Arrhenius factor A.
formulas:
  - name: Arrhenius equation
    latex: 'k = Ae^{-E_a/RT}'
  - name: Linear form
    latex: '\ln k = -\frac{E_a}{R}\cdot\frac{1}{T} + \ln A'
  - name: Two temperatures
    latex: '\ln\frac{k_1}{k_2} = \frac{E_a}{R}\left(\frac{1}{T_2} - \frac{1}{T_1}\right)'
definitions:
  - term: Arrhenius factor (A)
    definition: The frequency factor — it accounts for the frequency of collisions with the correct orientation.
mistakes:
  - Using Ea in kJ with R in J. Convert Ea to J mol⁻¹ (× 1000).
  - Using °C. T must be in kelvin.
tips:
  - The gradient of ln k against 1/T is −Ea/R, so Ea = −gradient × 8.31.
related:
  - chemistry/r2-2-rates
---

## The Arrhenius equation

$$
k = Ae^{-E_a/RT}
$$

```figure
src: chemistry/_iitian/reactivity-how-fast-the-rate-of-chemical-change-r2-2-13-arrh/img/fig-b538b993e2a8782e.png
caption: The Arrhenius equation: k = A e^(−Ea/RT).
```

```figure
src: chemistry/_sme/how-fast-the-rate-of-chemical-change/img/fig-396f0ab4c2251ee0.png
caption: Plotting ln k against 1/T gives a straight line with gradient −Ea/R and intercept ln A.
```

- $e^{-E_a/RT}$ is the fraction of collisions with energy ≥ Ea — it grows rapidly with T.
- $A$ (the **Arrhenius factor**) reflects how often collisions occur with the correct orientation.

```keyidea
Taking logs gives a straight line: ln k = −(Ea/R)(1/T) + ln A. Plot ln k against 1/T: the gradient is −Ea/R and the intercept is ln A.
```

```plot
caption: Arrhenius plot. ln k falls linearly as 1/T increases; a steeper line means a larger activation energy.
x: 0.0028, 0.0036
y: -8, 2
f: 25 - 9000*x | Ea ≈ 75 kJ mol⁻¹
xlabel: 1/T / K⁻¹
ylabel: ln k
```

```example
A plot of ln k against 1/T has gradient −9000 K. Find Ea.
---
$-E_a/R = -9000$ → $E_a = 9000\times8.31 = 74\,800$ J mol⁻¹ $= 75$ kJ mol⁻¹.
```

## Two temperatures

$$
\ln\frac{k_1}{k_2} = \frac{E_a}{R}\left(\frac{1}{T_2} - \frac{1}{T_1}\right)
$$

```figure
src: chemistry/_iitian/reactivity-how-fast-the-rate-of-chemical-change-r2-2-11-rate/img/fig-7df5605252a3d33a.png
caption: The rate constant k rises exponentially with temperature.
```

```example
A rate constant doubles from 300 K to 310 K. Find Ea.
---
$\ln\dfrac{1}{2} = \dfrac{E_a}{8.31}\left(\dfrac{1}{310} - \dfrac{1}{300}\right)$, i.e. $-0.693 = \dfrac{E_a}{8.31}(-1.075\times10^{-4})$.

$E_a = 0.693\times8.31/1.075\times10^{-4} = 53\,600$ J mol⁻¹ ≈ 54 kJ mol⁻¹.
```

```question
arrhenius-ea
```

## Summary

- $k = Ae^{-E_a/RT}$; k rises steeply with T.
- ln k vs 1/T: gradient −Ea/R.
- Use J and K consistently.
