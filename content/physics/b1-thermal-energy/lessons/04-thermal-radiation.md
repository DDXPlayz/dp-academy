---
code: B.1.4
title: Thermal radiation and black bodies
summary: Every warm object glows in infrared — the Stefan–Boltzmann law, Wien’s law, luminosity and apparent brightness.
minutes: 30
difficulty: 2
objectives:
  - Describe thermal radiation as electromagnetic waves emitted from a surface.
  - Use the Stefan–Boltzmann law, L = σAT⁴, for a black body.
  - Use Wien’s displacement law to find a body’s surface temperature.
  - Relate apparent brightness to luminosity and distance, b = L/(4πd²).
prerequisites:
  - Electromagnetic spectrum
  - Area of a sphere
formulas:
  - name: Stefan–Boltzmann law
    latex: 'L = \sigma A T^4'
    where: σ = 5.67 × 10⁻⁸ W m⁻² K⁻⁴; A is surface area; T in kelvin.
  - name: Wien’s displacement law
    latex: '\lambda_{\max} T = 2.9\times10^{-3}\ \text{m K}'
  - name: Apparent brightness
    latex: 'b = \frac{L}{4\pi d^2}'
definitions:
  - term: Black body
    definition: An idealised object that absorbs all radiation falling on it and emits the maximum possible radiation for its temperature.
  - term: Luminosity
    definition: The total power radiated by a body, in watts.
  - term: Apparent brightness
    definition: The power received per unit area at a distance d from a source, in W m⁻².
mistakes:
  - Forgetting the fourth power — doubling T multiplies the power by 16.
  - Using the radius instead of the surface area 4πR² for a spherical star in L = σAT⁴.
  - Using °C in either law. Both need kelvin.
tips:
  - Hotter objects peak at shorter wavelengths — blue-white stars are hotter than red ones.
  - In star problems, ratios are quickest — write the ratio of the two equations and cancel σ and 4π.
related:
  - physics/b2-greenhouse-effect
  - physics/e5-fusion-stars
---

## Radiation needs no medium

All objects above absolute zero emit **electromagnetic radiation** from their surface. At room temperature it is mostly infrared; at a few thousand kelvin there is enough visible light for the object to glow. Unlike conduction and convection, radiation can cross a vacuum — this is how energy reaches us from the Sun.

## Black bodies and the Stefan–Boltzmann law

A **black body** is a perfect absorber and therefore a perfect emitter. The total power it radiates — its **luminosity** — is

$$
L = \sigma A T^4
$$

```example
The Sun has a radius of 7.0 × 10⁸ m and a surface temperature of 5800 K. Estimate its luminosity.
---
$A = 4\pi R^2 = 4\pi(7.0\times10^8)^2 = 6.2\times10^{18}$ m².

$L = 5.67\times10^{-8} \times 6.2\times10^{18} \times 5800^4 = 4.0\times10^{26}$ W.
```

## The black-body spectrum and Wien’s law

A black body emits a continuous spectrum with a peak at wavelength $\lambda_{\max}$. As the temperature rises, the curve gets taller (more power) and the peak moves to **shorter** wavelengths:

$$
\lambda_{\max} T = 2.9\times10^{-3}\ \text{m K}
$$

```plot
caption: Black-body spectra (relative intensity). The hotter curve is much higher and peaks at a shorter wavelength.
x: 0.05, 3
y: 0, 1.1
f: (1/x^5)/(exp(2.9/(x*1.2)) - 1) * 3.9 | 6000 K
f: (1/x^5)/(exp(2.9/(x*0.9)) - 1) * 3.9 | 4500 K
xlabel: λ / µm
ylabel: intensity
```

```example
A star’s spectrum peaks at 420 nm. Find its surface temperature.
---
$T = \dfrac{2.9\times10^{-3}}{420\times10^{-9}} = 6900$ K.
```

## Luminosity and apparent brightness

Far from a source, its power spreads over a sphere of area $4\pi d^2$. The power received per square metre is the **apparent brightness**:

$$
b = \frac{L}{4\pi d^2}
$$

Brightness follows an inverse-square law: twice as far away, a quarter as bright.

```keyidea
Luminosity is a property of the source. Apparent brightness depends on the source and on how far away you are.
```

```example
Two stars have the same surface temperature. Star X is 4 times as luminous as star Y. How do their radii compare?
---
With equal $T$, $L \propto A \propto R^2$. $L_X/L_Y = 4$, so $R_X/R_Y = \sqrt{4} = 2$. X is twice the radius of Y.
```

```mistake
A star that looks brighter is not necessarily more luminous — it may just be closer.
```

```question
wien-temp
```

## Summary

- Thermal radiation is EM radiation from a surface; it needs no medium.
- Black body: $L = \sigma AT^4$.
- Wien: $\lambda_{\max}T = 2.9\times10^{-3}$ m K — hotter means shorter peak wavelength.
- Apparent brightness $b = L/(4\pi d^2)$ falls with the square of distance.
