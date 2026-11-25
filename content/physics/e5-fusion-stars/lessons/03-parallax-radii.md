---
code: E.5.6
title: Stellar distances and radii
summary: Measuring the distance to nearby stars with parallax, and working out a star’s size from its luminosity and temperature.
minutes: 25
difficulty: 3
objectives:
  - Explain stellar parallax and use d (pc) = 1/p (arc-second).
  - Determine a star’s radius from its luminosity and surface temperature.
  - Use apparent brightness, b = L/4πd², to relate luminosity and distance.
prerequisites:
  - Thermal radiation
  - The HR diagram and stellar evolution
formulas:
  - name: Parallax distance
    latex: 'd\,(\text{pc}) = \frac{1}{p\,(\text{arc-second})}'
  - name: Stefan–Boltzmann law
    latex: 'L = \sigma 4\pi R^2 T^4'
  - name: Apparent brightness
    latex: 'b = \frac{L}{4\pi d^2}'
definitions:
  - term: Parsec
    definition: The distance at which a star has a parallax angle of one arc-second; 1 pc = 3.26 ly = 3.09 × 10¹⁶ m.
  - term: Parallax angle
    definition: Half the angle through which a nearby star appears to shift against distant stars as Earth moves from one side of its orbit to the other.
  - term: Apparent brightness
    definition: The power received per unit area at the observer, in W m⁻².
mistakes:
  - Using the full shift as the parallax angle. p is half the total shift over six months.
  - Forgetting to convert parsecs to metres before using b = L/4πd².
tips:
  - Parallax works only for relatively nearby stars (up to a few hundred parsecs) — farther away the angle is too small to measure.
  - Ratios save work — R ∝ √L / T², so compare with the Sun.
related:
  - physics/b1-thermal-energy
---

## Stellar parallax

As Earth orbits the Sun, a nearby star appears to shift against the background of very distant stars. Measure its position six months apart: half the angular shift is the **parallax angle** $p$.

```figure
src: physics/_sme/fusion-stars/img/fig-738468a73c0d209f.png
caption: Stellar parallax: a nearby star appears to shift against distant stars as Earth moves around its orbit; the parallax angle gives the distance.
```

```svg
caption: Parallax. The nearby star appears in different positions against the distant background from opposite sides of Earth’s orbit; p is half the angle.
<svg viewBox="0 0 420 220">
  <circle cx="210" cy="190" r="8" fill="var(--warn)"/><text x="222" y="194" font-size="11" fill="currentColor">Sun</text>
  <ellipse cx="210" cy="190" rx="110" ry="18" fill="none" stroke="var(--muted)" stroke-dasharray="4 4"/>
  <circle cx="100" cy="190" r="5" fill="var(--accent)"/><circle cx="320" cy="190" r="5" fill="var(--accent)"/>
  <text x="70" y="214" font-size="11" fill="currentColor">Earth (Jan)</text><text x="300" y="214" font-size="11" fill="currentColor">Earth (Jul)</text>
  <circle cx="210" cy="70" r="5" fill="var(--bad)"/><text x="218" y="66" font-size="11" fill="currentColor">nearby star</text>
  <g stroke="currentColor" stroke-width="1"><line x1="100" y1="190" x2="250" y2="10"/><line x1="320" y1="190" x2="170" y2="10"/></g>
  <line x1="210" y1="70" x2="210" y2="190" stroke="var(--muted)" stroke-dasharray="3 3"/>
  <text x="196" y="96" font-size="12" fill="var(--bad)">p</text>
  <text x="230" y="186" font-size="11" fill="currentColor">1 AU</text>
  <g fill="currentColor" font-size="10"><text x="250" y="18">★</text><text x="162" y="18">★</text></g>
</svg>
```

With the distance in **parsecs** and the angle in **arc-seconds**:

$$
d\,(\text{pc}) = \frac{1}{p\,(\text{arc-second})}
$$

1 parsec = 3.26 light-years = $3.09\times10^{16}$ m.

```example
A star has a parallax angle of 0.25 arc-seconds. How far away is it, in parsecs and metres?
---
$d = 1/0.25 = 4.0$ pc $= 4.0\times3.09\times10^{16} = 1.2\times10^{17}$ m.
```

## Brightness and luminosity

A star’s **luminosity** $L$ spreads over a sphere, so at distance $d$ the **apparent brightness** is

$$
b = \frac{L}{4\pi d^2}
$$

If we know $d$ (from parallax) and measure $b$, we can find $L$.

## Stellar radii

```keyidea
A star radiates like a black body: L = σ4πR²T⁴. Find T from the peak of its spectrum (Wien’s law) and L from b and d — then solve for R.
```

```example
A star has luminosity 40 times the Sun’s and surface temperature 2900 K. The Sun’s temperature is 5800 K. Find its radius in solar radii.
---
$\dfrac{R}{R_\odot} = \sqrt{\dfrac{L}{L_\odot}}\left(\dfrac{T_\odot}{T}\right)^2 = \sqrt{40}\times2^2 = 25$. It is a red giant.
```

```question
parallax-distance
```

## What starlight tells us

Light from a star's hot interior has a continuous spectrum, but on its way out it passes through the cooler outer layers of the star. Atoms there absorb photons of exactly the energies that match their electron transitions, leaving dark **absorption lines** in the spectrum.

- Each element absorbs its own set of wavelengths, so the absorption lines reveal the star's **chemical composition**.
- The peak wavelength of the continuous spectrum gives the **surface temperature** by Wien's law, $\lambda_{\max} T = 2.9 \times 10^{-3}\ \text{m K}$.
- A shift of all the lines towards longer wavelengths (redshift) or shorter ones (blueshift) shows the star is moving away from or towards us.

Stars are sorted into **spectral classes** by temperature, from hottest to coolest: **O B A F G K M**. The Sun is a G star at about 5800 K.

```keyidea
Distances are measured in astronomical units, light-years or parsecs: 1 AU ≈ 1.5 × 10¹¹ m (the mean Earth–Sun distance), 1 ly ≈ 9.46 × 10¹⁵ m, and 1 pc ≈ 3.09 × 10¹⁶ m ≈ 3.26 ly.
```

## Summary

- Parallax: $d$ (pc) $= 1/p$ (arc-second), for nearby stars.
- $b = L/4\pi d^2$ links brightness, luminosity and distance.
- Radius from $L = \sigma4\pi R^2T^4$.
