---
code: C.5.1
title: The Doppler effect
summary: Why an ambulance siren drops in pitch as it passes — and how the same effect tells astronomers how fast galaxies are moving.
minutes: 25
difficulty: 2
objectives:
  - Describe the Doppler effect for sound and electromagnetic waves.
  - Draw wavefront diagrams for a moving source and a moving observer.
  - Use Δf/f = Δλ/λ ≈ v/c for light.
  - Explain how spectral-line shifts reveal the motion of stars and galaxies.
prerequisites:
  - Wave equation
formulas:
  - name: Doppler shift for light (v ≪ c)
    latex: '\frac{\Delta f}{f} = \frac{\Delta\lambda}{\lambda} \approx \frac{v}{c}'
    where: v is the relative speed of source and observer along the line joining them.
definitions:
  - term: Doppler effect
    definition: The change in observed frequency (and wavelength) of a wave when the source and observer move relative to each other.
  - term: Redshift
    definition: An increase in the observed wavelength of light from a receding source.
  - term: Blueshift
    definition: A decrease in the observed wavelength of light from an approaching source.
mistakes:
  - Saying the source’s own frequency changes. The source emits the same frequency; only the observed frequency changes.
  - Using Δλ/λ ≈ v/c for sound. It only applies to light (or EM waves) when v ≪ c.
tips:
  - Approaching → higher frequency, shorter wavelength. Receding → lower frequency, longer wavelength.
  - In spectra, compare a known line (e.g. hydrogen 656 nm) with its observed position to find Δλ.
related:
  - physics/e5-fusion-stars
---

## A changing pitch

As an ambulance approaches, its siren sounds higher; as it passes and moves away, the pitch drops. The siren itself emits a constant frequency. What changes is the frequency **you** receive. This is the **Doppler effect**, and it happens with every kind of wave.

## Wavefront picture

A stationary source emits circular wavefronts centred on itself. A **moving** source emits each new wavefront from a slightly different position:

- in front of the source the wavefronts bunch up — **shorter wavelength, higher observed frequency**;
- behind it they spread out — **longer wavelength, lower observed frequency**.

```svg
caption: Wavefronts from a source moving to the right. An observer ahead receives a shorter wavelength (higher frequency); one behind receives a longer wavelength.
<svg viewBox="0 0 440 220">
  <g fill="none" stroke="var(--accent)" stroke-width="2">
    <circle cx="150" cy="110" r="95"/><circle cx="185" cy="110" r="70"/><circle cx="215" cy="110" r="45"/><circle cx="240" cy="110" r="20"/>
  </g>
  <circle cx="255" cy="110" r="6" fill="var(--bad)"/>
  <line x1="262" y1="110" x2="300" y2="110" stroke="var(--bad)" stroke-width="2.5" marker-end="url(#c51-s)"/>
  <text x="282" y="100" font-size="12" fill="var(--bad)">v</text>
  <text x="330" y="114" font-size="12" fill="currentColor">observer ahead: higher f</text>
  <text x="6" y="200" font-size="12" fill="currentColor">observer behind: lower f</text>
  <defs><marker id="c51-s" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 10 5 0 10z" fill="var(--bad)"/></marker></defs>
</svg>
```

If instead the **observer** moves towards a stationary source, they meet wavefronts more often, so they also detect a higher frequency (although the wavelength in the air is unchanged).

## The Doppler effect for light

Light shows the same effect. Because light speed is so large, for everyday and most astronomical speeds ($v \ll c$):

$$
\frac{\Delta f}{f} = \frac{\Delta\lambda}{\lambda} \approx \frac{v}{c}
$$

- A source moving **away** shows a **redshift** (longer wavelength).
- A source moving **towards** us shows a **blueshift** (shorter wavelength).

```example
A hydrogen line with laboratory wavelength 656.3 nm is observed at 662.9 nm in the spectrum of a galaxy. Find the galaxy’s speed and say whether it is approaching or receding.
---
$\Delta\lambda = 662.9 - 656.3 = 6.6$ nm.

$v = c\dfrac{\Delta\lambda}{\lambda} = 3.00\times10^8 \times \dfrac{6.6}{656.3} = 3.0\times10^6$ m s⁻¹, receding (redshift).
```

```keyidea
Almost every distant galaxy is redshifted, and the further away it is, the larger its redshift. This is the key evidence that the universe is expanding.
```

## Other uses

- **Radar speed guns** measure the frequency shift of microwaves reflected from a moving car.
- **Doppler ultrasound** measures the speed of blood flow in arteries.
- **Rotating stars and binary stars** show alternating red- and blueshifts as they move towards and away from us.

```question
redshift-speed
```

## Summary

- The Doppler effect is the change in observed frequency due to relative motion of source and observer.
- Approaching: higher frequency, shorter wavelength. Receding: lower frequency, longer wavelength.
- For light with $v \ll c$: $\Delta f/f = \Delta\lambda/\lambda \approx v/c$; redshifts show that galaxies are receding.
