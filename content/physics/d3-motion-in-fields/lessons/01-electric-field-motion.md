---
code: D.3.1
title: Charged particles in electric fields
summary: How a uniform electric field accelerates charges along the field and bends their path when they enter across it — projectile motion again.
minutes: 25
difficulty: 2
objectives:
  - Describe the motion of a charged particle in a uniform electric field.
  - Calculate the energy gained by a charge accelerated through a potential difference.
  - Analyse the parabolic path of a charge entering a uniform field at right angles.
prerequisites:
  - Electric fields
  - Projectile motion
formulas:
  - name: Force in a uniform field
    latex: 'F = qE = \frac{qV}{d}'
  - name: Energy gained through a p.d.
    latex: '\tfrac{1}{2}mv^2 = qV'
definitions:
  - term: Electronvolt
    definition: The energy gained by one electron accelerated through a potential difference of 1 V; 1 eV = 1.60 × 10⁻¹⁹ J.
mistakes:
  - Forgetting that negative charges accelerate opposite to the field.
  - Using the plate p.d. for energy when the particle only crosses part of the gap — use the p.d. it actually moves through.
tips:
  - A charge entering a uniform field at right angles behaves like a horizontally launched projectile, with qE/m in place of g.
  - Gravity is negligible for electrons and protons in typical lab fields — check by comparing mg with qE.
related:
  - physics/d2-em-fields
  - physics/a1-kinematics
---

## Accelerating along the field

A charge $q$ in a uniform field $E$ feels a constant force $F = qE$, so it has a constant acceleration

$$
a = \frac{qE}{m}
$$

Positive charges accelerate in the direction of the field; negative charges accelerate against it.

The energy gained crossing a potential difference $V$ is $qV$. Starting from rest:

$$
\tfrac{1}{2}mv^2 = qV
$$

```example
An electron is accelerated from rest through 2.0 kV. Find its final speed.
---
$v = \sqrt{\dfrac{2qV}{m}} = \sqrt{\dfrac{2 \times 1.60\times10^{-19} \times 2000}{9.11\times10^{-31}}} = 2.7\times10^7$ m s⁻¹.
```

## Entering across the field

```svg
caption: An electron entering a uniform field at right angles follows a parabola — constant velocity along the plates, constant acceleration towards the positive plate.
<svg viewBox="0 0 420 200">
  <rect x="80" y="30" width="260" height="6" fill="var(--bad)"/><text x="345" y="38" font-size="14" fill="var(--bad)">+</text>
  <rect x="80" y="164" width="260" height="6" fill="var(--accent)"/><text x="345" y="172" font-size="14" fill="var(--accent)">−</text>
  <line x1="20" y1="120" x2="80" y2="120" stroke="currentColor" stroke-width="1.5" marker-end="url(#d31-k)"/>
  <path d="M80 120 Q 210 120 340 50" fill="none" stroke="var(--accent)" stroke-width="2.5"/>
  <line x1="340" y1="50" x2="400" y2="18" stroke="var(--accent)" stroke-width="2" stroke-dasharray="5 4"/>
  <circle cx="80" cy="120" r="5" fill="var(--accent)"/>
  <text x="24" y="112" font-size="13" fill="currentColor">v₀</text>
  <g stroke="var(--muted)" stroke-width="1"><line x1="120" y1="40" x2="120" y2="160"/><line x1="200" y1="40" x2="200" y2="160"/><line x1="280" y1="40" x2="280" y2="160"/></g>
  <text x="206" y="100" font-size="12" fill="var(--muted)">E (downwards)</text>
  <defs><marker id="d31-k" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 10 5 0 10z" fill="currentColor"/></marker></defs>
</svg>
```

```figure
src: physics/_sme/motion-in-electromagnetic-fields/img/fig-49aeb8b353f57faa.png
caption: Charged particles entering a uniform electric field at right angles follow a parabola: positive charges bend towards the negative plate, negative charges towards the positive one.
```

If a charge enters between parallel plates with velocity $v_0$ perpendicular to the field:

- **along the plates:** no force, so constant velocity, $x = v_0t$;
- **across the plates:** constant acceleration $a = qE/m$, so $y = \tfrac{1}{2}at^2$.

The path is a **parabola** — exactly like a projectile, with $qE/m$ replacing $g$. After leaving the plates it travels in a straight line.

```example
An electron enters plates 6.0 cm long at 3.0 × 10⁷ m s⁻¹, perpendicular to a field of 2.0 × 10⁴ V m⁻¹. Find its sideways deflection at the exit.
---
Time between the plates: $t = 0.060/3.0\times10^7 = 2.0\times10^{-9}$ s.

$a = eE/m = 1.60\times10^{-19}\times2.0\times10^4/9.11\times10^{-31} = 3.5\times10^{15}$ m s⁻².

$y = \tfrac{1}{2}at^2 = 0.5\times3.5\times10^{15}\times(2.0\times10^{-9})^2 = 7.0\times10^{-3}$ m = 7.0 mm.
```

```question
electron-accel-speed
```

## Summary

- In a uniform field: $F = qE$, $a = qE/m$ — constant.
- Energy from a p.d.: $\tfrac{1}{2}mv^2 = qV$.
- Entering at right angles: parabolic path, analysed like projectile motion.
