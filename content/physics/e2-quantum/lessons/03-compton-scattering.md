---
code: E.2.7
title: Compton scattering
summary: X-ray photons bouncing off electrons lose energy and come away with a longer wavelength — more evidence that light carries momentum like a particle.
minutes: 20
difficulty: 3
hl: true
objectives:
  - Describe Compton scattering as evidence for the particle nature of light.
  - Explain why the scattered photon has a longer wavelength.
  - Use Δλ = (h/m_e c)(1 − cos θ).
prerequisites:
  - The photoelectric effect
  - Conservation of momentum
formulas:
  - name: Compton shift
    latex: '\Delta\lambda = \lambda_f - \lambda_i = \frac{h}{m_ec}(1 - \cos\theta)'
  - name: Photon momentum
    latex: 'p = \frac{h}{\lambda}'
definitions:
  - term: Compton scattering
    definition: The scattering of a photon by a (nearly free) electron, in which the photon loses energy and its wavelength increases.
  - term: Compton wavelength
    definition: The constant h/m_e c = 2.43 × 10⁻¹² m, the shift for a photon scattered through 90°.
mistakes:
  - Thinking the shift depends on the incident wavelength. Δλ depends only on the scattering angle.
  - Saying the scattered photon is slower. It still travels at c — it has less energy, so lower frequency and longer wavelength.
tips:
  - Maximum shift is at θ = 180° (straight back), Δλ = 2h/m_e c.
related:
  - physics/a2-forces-momentum
---

## The experiment

Compton fired X-rays at a graphite target and measured the wavelength of the X-rays scattered at different angles. As well as the original wavelength, he found X-rays with a **longer** wavelength, and the shift grew with the scattering angle.

## Photons as particles with momentum

```keyidea
Treat the X-ray as a photon with energy hf and momentum h/λ colliding with an electron. The electron recoils and takes some energy; the photon is left with less energy, so its wavelength increases.
```

Applying conservation of energy and momentum to this collision gives

$$
\Delta\lambda = \frac{h}{m_ec}(1 - \cos\theta)
$$

where $\theta$ is the angle through which the photon is scattered. $h/m_ec = 2.43\times10^{-12}$ m.

- $\theta = 0$: no shift (no collision really happened).
- $\theta = 90^\circ$: $\Delta\lambda = 2.43\times10^{-12}$ m.
- $\theta = 180^\circ$: maximum shift, $4.86\times10^{-12}$ m.

The shift is tiny, so it is only noticeable for short wavelengths such as X-rays and gamma rays, where it is a significant fraction of $\lambda$.

```example
X-rays of wavelength 7.10 × 10⁻¹¹ m are scattered through 60°. Find the scattered wavelength.
---
$\Delta\lambda = 2.43\times10^{-12}(1 - \cos60^\circ) = 1.22\times10^{-12}$ m.

$\lambda_f = 7.10\times10^{-11} + 0.122\times10^{-11} = 7.22\times10^{-11}$ m.
```

A wave model cannot explain this: a classical wave would make electrons oscillate and re-radiate at the **same** frequency.

```question
compton-shift
```

## Summary

- X-rays scattered by electrons come out with a longer wavelength — evidence that photons carry momentum $h/\lambda$.
- $\Delta\lambda = (h/m_ec)(1 - \cos\theta)$, depending only on the angle.
