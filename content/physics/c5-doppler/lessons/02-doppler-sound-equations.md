---
code: C.5.2
title: Doppler equations for sound
summary: The exact frequency heard when the source or the observer moves through the air.
minutes: 25
difficulty: 3
hl: true
objectives:
  - Calculate the observed frequency for a moving source of sound.
  - Calculate the observed frequency for a moving observer.
  - Choose the correct signs for approach and recession.
prerequisites:
  - The Doppler effect
formulas:
  - name: Moving source
    latex: "f' = f\\,\\frac{v}{v \\pm u_s}"
    where: u_s is the source speed; use − when the source approaches, + when it recedes.
  - name: Moving observer
    latex: "f' = f\\,\\frac{v \\pm u_o}{v}"
    where: u_o is the observer speed; use + when the observer approaches, − when it recedes.
definitions:
  - term: Wave speed v
    definition: The speed of sound in the medium, measured relative to the medium (still air).
mistakes:
  - Using the moving-source formula when the observer moves. They give different answers for the same relative speed.
  - Getting the sign the wrong way round. Check that “approaching” gives f′ > f.
tips:
  - Pick the sign by common sense — approaching must raise the frequency, receding must lower it.
  - Speeds u_s and u_o are measured relative to the air, not relative to each other.
related:
  - physics/c5-doppler
---

## Why sound needs two formulas

Sound travels through a medium (air) at speed $v$ relative to that medium. It matters whether the **source** or the **observer** moves relative to the air, because only a moving source changes the wavelength in the air.

## Moving source

A source moving at $u_s$ emits wavefronts that are squashed in front of it. The wavelength ahead becomes $\lambda' = (v - u_s)/f$, so the observed frequency is

$$
f' = f\,\frac{v}{v \pm u_s}
$$

- **−** (smaller denominator, higher $f'$) when the source **approaches**;
- **+** when the source **recedes**.

```example
A train whistle of 800 Hz approaches a platform at 30 m s⁻¹. The speed of sound is 340 m s⁻¹. What frequency is heard on the platform, and what after the train has passed?
---
Approaching: $f' = 800 \times \dfrac{340}{340 - 30} = 877$ Hz.

Receding: $f' = 800 \times \dfrac{340}{340 + 30} = 735$ Hz.
```

## Moving observer

If the source is still and the observer moves at $u_o$, the wavelength in the air is unchanged, but the observer meets the wavefronts at a relative speed $v \pm u_o$:

$$
f' = f\,\frac{v \pm u_o}{v}
$$

- **+** when the observer moves **towards** the source;
- **−** when the observer moves **away**.

```example
A cyclist rides at 10 m s⁻¹ towards a stationary siren emitting 1000 Hz. What frequency does the cyclist hear? (v = 340 m s⁻¹)
---
$f' = 1000 \times \dfrac{340 + 10}{340} = 1029$ Hz.
```

```keyidea
For the same relative speed, a moving source and a moving observer give slightly different frequencies. Sound is asymmetric because the air provides a preferred frame.
```

```mistake
These formulas are for sound and other mechanical waves. For light there is no medium, and for v ≪ c you use Δλ/λ ≈ v/c instead.
```

```question
moving-source-freq
```

## Summary

- Moving source: $f' = f\dfrac{v}{v \pm u_s}$ (− approaching, + receding).
- Moving observer: $f' = f\dfrac{v \pm u_o}{v}$ (+ approaching, − receding).
- Check signs: approaching always raises the observed frequency.
