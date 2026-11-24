---
code: C.3.4
title: Single-slit diffraction and diffraction gratings
summary: The intensity pattern from one slit, how it shapes the double-slit pattern, and the sharp bright lines from a grating.
minutes: 30
difficulty: 3
hl: true
objectives:
  - Describe the single-slit diffraction intensity pattern and use θ = λ/b for the first minimum.
  - Explain how single-slit diffraction modulates the double-slit pattern.
  - Use the grating equation nλ = d sin θ.
prerequisites:
  - Double-slit interference
formulas:
  - name: First minimum of single-slit diffraction
    latex: '\theta = \frac{\lambda}{b}'
    where: θ in radians, b is the slit width.
  - name: Diffraction grating
    latex: 'n\lambda = d\sin\theta'
    where: d is the spacing between adjacent slits and n the order.
definitions:
  - term: Diffraction grating
    definition: A plate with a very large number of equally spaced parallel slits, producing sharp, widely spaced bright maxima.
  - term: Order
    definition: The integer n numbering a bright maximum of a grating pattern; n = 0 is the central maximum.
mistakes:
  - Using θ = λ/b for double-slit fringes. It gives the first minimum of a single slit; s = λD/d is for double-slit fringes.
  - Forgetting that d for a grating is the slit spacing — if you are given lines per mm, d = 1/(lines per metre).
tips:
  - The highest possible order satisfies sin θ ≤ 1, so n_max is the whole number part of d/λ.
  - A narrower single slit gives a wider central maximum.
related:
  - physics/c3-wave-phenomena
---

## Single-slit diffraction

Light passing through one narrow slit of width $b$ produces a wide, bright **central maximum** with much dimmer, narrower maxima either side. Each part of the slit acts as a source; at certain angles their contributions cancel completely, giving minima. The first minimum is at

$$
\theta = \frac{\lambda}{b}
$$

```plot
caption: Single-slit intensity pattern. The central maximum is twice as wide as the others and far brighter.
x: -3, 3
y: 0, 1.05
f: (sin(3.1416*x)/(3.1416*x))^2 | intensity
xlabel: θ (units of λ/b)
ylabel: relative intensity
```

```example
Light of wavelength 550 nm passes through a slit 0.10 mm wide onto a screen 1.5 m away. Find the width of the central maximum on the screen.
---
$\theta = \lambda/b = 550\times10^{-9}/1.0\times10^{-4} = 5.5\times10^{-3}$ rad.

The first minimum is $D\theta = 1.5 \times 5.5\times10^{-3} = 8.3$ mm from the centre, so the central maximum is $2 \times 8.3 = 16.5$ mm wide.
```

## Modulating the double-slit pattern

In a real double-slit experiment each slit has a finite width, so the evenly spaced interference fringes are **multiplied by** the single-slit diffraction envelope. The fringes are brightest near the centre and fade towards the edge; where a single-slit minimum falls on a bright fringe, that fringe goes missing.

```plot
caption: Double-slit fringes with real slit widths. The single-slit pattern acts as an envelope that sets how bright each fringe is.
x: -3, 3
y: 0, 1.05
f: (sin(3.1416*x)/(3.1416*x))^2 * cos(3.1416*4*x)^2 | double slit with finite width
f: (sin(3.1416*x)/(3.1416*x))^2 | single-slit envelope
xlabel: θ (units of λ/b)
ylabel: relative intensity
```

## Diffraction gratings

A **grating** has hundreds of slits per millimetre. Light from all of them interferes constructively only at very specific angles:

$$
n\lambda = d\sin\theta
$$

Compared with two slits, a grating gives **much sharper and brighter** maxima that are **widely spaced**, which makes it excellent for measuring wavelengths precisely and for splitting light into a spectrum.

```keyidea
More slits make the bright maxima narrower and brighter. That is why gratings, not double slits, are used in spectrometers.
```

```example
A grating has 500 lines per mm. Light of wavelength 589 nm falls on it. Find the angle of the second-order maximum and the highest order visible.
---
$d = \dfrac{1}{500\times10^3} = 2.0\times10^{-6}$ m.

$\sin\theta = \dfrac{2 \times 589\times10^{-9}}{2.0\times10^{-6}} = 0.589 \Rightarrow \theta = 36^\circ$.

Highest order: $n \le d/\lambda = 3.4$, so $n_{\max} = 3$.
```

```question
grating-angle
```

## Summary

- Single slit: wide central maximum; first minimum at $\theta = \lambda/b$.
- Finite slit width modulates double-slit fringes with a single-slit envelope.
- Grating: $n\lambda = d\sin\theta$, giving sharp, bright, widely spaced maxima.
