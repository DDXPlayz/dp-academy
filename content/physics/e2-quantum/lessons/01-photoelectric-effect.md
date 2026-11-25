---
code: E.2.1
title: The photoelectric effect
summary: Light ejecting electrons from metals — and why only a particle (photon) picture of light explains what happens.
minutes: 35
difficulty: 3
hl: true
objectives:
  - Describe the photoelectric effect and the observations that the wave model cannot explain.
  - Explain the threshold frequency and the work function.
  - Use Einstein’s equation, E_max = hf − Φ.
  - Interpret stopping potential and graphs of E_max against frequency.
prerequisites:
  - Energy levels and spectra
formulas:
  - name: Einstein’s photoelectric equation
    latex: 'E_{\max} = hf - \Phi'
  - name: Threshold frequency
    latex: 'f_0 = \frac{\Phi}{h}'
  - name: Stopping potential
    latex: 'eV_s = E_{\max}'
definitions:
  - term: Work function
    definition: The minimum energy needed to remove an electron from the surface of a metal.
  - term: Threshold frequency
    definition: The minimum frequency of light that can release photoelectrons from a particular metal.
  - term: Stopping potential
    definition: The reverse potential difference that just stops the most energetic photoelectrons.
mistakes:
  - Thinking brighter light gives faster electrons. Intensity changes the number of electrons per second; frequency sets their maximum kinetic energy.
  - Thinking dim light below the threshold will eventually release electrons. Below f₀ no electrons are emitted, however long you wait.
tips:
  - On a graph of E_max against f, the gradient is h, the x-intercept is f₀ and the y-intercept is −Φ.
  - Convert the work function from eV to J (× 1.60 × 10⁻¹⁹) before using hf.
related:
  - physics/e1-atomic
---

## What happens

Shine ultraviolet light onto a clean zinc plate and electrons are ejected — the **photoelectric effect**. The details are what matter:

```figure
src: physics/_iitian/photons-and-the-photoelectric-effect-ib-dp-physics-study-not/img/fig-1442e5b55aa2309c.png
caption: Photocurrent against potential: the current falls to zero at the stopping potential −V₀.
```

| Observation | Wave model predicts | Actually |
|---|---|---|
| Below a **threshold frequency** $f_0$ | Enough intensity should eject electrons | No emission at all, however bright |
| Above $f_0$, increasing **intensity** | Faster electrons | More electrons, same maximum speed |
| Increasing **frequency** | No effect on speed | Higher maximum kinetic energy |
| Timing | A delay while energy builds up | Emission is instantaneous |

## Einstein’s explanation

```keyidea
Light arrives as photons, each of energy hf. One photon gives all its energy to one electron. The electron needs at least the work function Φ to escape; whatever is left becomes kinetic energy.
```

```figure
src: physics/_sme/quantum-physics/img/fig-885ecbc065666eae.png
caption: Ultraviolet light on a negatively charged zinc plate releases photoelectrons, and the electroscope leaf falls; visible light, however bright, does not.
```

```figure
src: physics/_sme/quantum-physics/img/fig-016f06ded77b05b6.png
caption: Electrons sit in a potential well; a photon must supply at least the work function to free one, and any extra becomes kinetic energy.
```

$$
E_{\max} = hf - \Phi
$$

- If $hf < \Phi$, no single photon can free an electron: hence a **threshold frequency** $f_0 = \Phi/h$.
- Brighter light means **more photons**, so more electrons — but each photon still has the same energy.
- One photon is absorbed in one event, so emission is immediate.

## Measuring E_max: stopping potential

A reverse voltage between the plate and a collector slows the electrons. The **stopping potential** $V_s$ just stops the fastest ones:

```figure
src: physics/_iitian/photons-and-the-photoelectric-effect-ib-dp-physics-study-not/img/fig-c1fbf05fc36edddf.png
caption: A photoelectric cell: light ejects electrons from the metal surface and they are collected to form a current.
```

```figure
src: physics/_sme/quantum-physics/img/fig-8b95b8d19fbf7890.png
caption: Maximum kinetic energy against frequency: a straight line with gradient h, cutting the frequency axis at the threshold frequency.
```

```figure
src: physics/_sme/quantum-physics/img/fig-272465d7ca19252e.png
caption: Brighter light (same frequency) gives a larger current but the same stopping potential.
```

$$
eV_s = E_{\max}
$$

```plot
caption: Maximum kinetic energy against frequency for two metals. Both lines have gradient h; each crosses the f-axis at its own threshold frequency.
x: 0, 15
y: -4, 6
f: 0.6*x - 3 | metal A (Φ = 3 units)
f: 0.6*x - 4.5 | metal B (Φ = 4.5 units)
hline: 0
xlabel: f / 10¹⁴ Hz
ylabel: E_max
```

```example
Light of wavelength 200 nm falls on sodium, work function 2.3 eV. Find the maximum kinetic energy of the photoelectrons and the stopping potential.
---
$hf = hc/\lambda = 6.63\times10^{-34}\times3.00\times10^8/200\times10^{-9} = 9.95\times10^{-19}$ J $= 6.2$ eV.

$E_{\max} = 6.2 - 2.3 = 3.9$ eV $= 6.3\times10^{-19}$ J, so $V_s = 3.9$ V.
```

```question
photo-emax
```

## Summary

- Light behaves as photons of energy $hf$; one photon frees one electron.
- $E_{\max} = hf - \Phi$; threshold $f_0 = \Phi/h$; $eV_s = E_{\max}$.
- Intensity sets the number of electrons, frequency sets their energy.
