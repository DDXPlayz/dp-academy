---
code: C.3.1
title: Reflection, refraction and total internal reflection
summary: What waves do at a boundary — wavefronts and rays, Snell’s law, the critical angle and why optical fibres work.
minutes: 30
difficulty: 2
objectives:
  - Describe waves in two and three dimensions using wavefronts and rays.
  - Describe reflection, refraction and transmission at a boundary.
  - Use Snell’s law, n₁/n₂ = sin θ₂/sin θ₁ = v₂/v₁.
  - Calculate the critical angle and explain total internal reflection.
prerequisites:
  - Wave equation
  - Trigonometry
formulas:
  - name: Snell’s law
    latex: '\frac{n_1}{n_2} = \frac{\sin\theta_2}{\sin\theta_1} = \frac{v_2}{v_1}'
    where: angles are measured from the normal.
  - name: Critical angle
    latex: '\sin\theta_c = \frac{n_2}{n_1}'
    where: light travelling from medium 1 into a less dense medium 2.
definitions:
  - term: Wavefront
    definition: A line or surface joining points on a wave that are in phase, such as all the crests.
  - term: Ray
    definition: A line showing the direction of energy transfer, always perpendicular to the wavefronts.
  - term: Refractive index
    definition: The ratio of the speed of light in a vacuum to its speed in a medium, n = c/v.
  - term: Total internal reflection
    definition: Complete reflection of a wave at a boundary with a medium of lower refractive index, when the angle of incidence exceeds the critical angle.
mistakes:
  - Measuring angles from the surface instead of from the normal.
  - Trying to get total internal reflection going from air into glass. It only happens when travelling into the medium with the lower refractive index.
tips:
  - Light bends towards the normal when it slows down (entering a higher n) and away from the normal when it speeds up.
  - Draw the normal first, as a dashed line, before marking any angle.
related:
  - physics/c2-wave-model
---

## Wavefronts and rays

In two or three dimensions we draw waves in two ways:

- **wavefronts** join points that are in phase, such as all the crests;
- **rays** show the direction the wave travels and are always **perpendicular** to the wavefronts.

## At a boundary

When a wave reaches the boundary between two media, some of it is **reflected**, some **transmitted** (passes through), and the transmitted part is usually **refracted** — its direction changes because its speed changes.

- **Reflection:** angle of incidence = angle of reflection, both measured from the normal.
- **Refraction:** the frequency stays the same, but the speed and wavelength change. The wavefronts bunch up when the wave slows, and the ray bends.

```svg
caption: Refraction into a slower medium. The wavefronts get closer together and the ray bends towards the normal.
<svg viewBox="0 0 420 240">
  <rect x="0" y="120" width="420" height="120" fill="var(--accent)" opacity="0.1"/>
  <line x1="0" y1="120" x2="420" y2="120" stroke="currentColor" stroke-width="1.5"/>
  <line x1="210" y1="10" x2="210" y2="230" stroke="var(--muted)" stroke-dasharray="5 4"/>
  <line x1="110" y1="20" x2="210" y2="120" stroke="var(--bad)" stroke-width="2.5" marker-end="url(#c31-r)"/>
  <line x1="210" y1="120" x2="260" y2="225" stroke="var(--bad)" stroke-width="2.5" marker-end="url(#c31-r)"/>
  <path d="M210 70 A50 50 0 0 0 175 85" fill="none" stroke="var(--bad)"/>
  <text x="180" y="62" font-size="12" fill="var(--bad)">θ₁</text>
  <path d="M210 170 A50 50 0 0 0 232 165" fill="none" stroke="var(--bad)"/>
  <text x="222" y="186" font-size="12" fill="var(--bad)">θ₂</text>
  <text x="10" y="110" font-size="12" fill="currentColor">medium 1 (n₁, faster)</text>
  <text x="10" y="140" font-size="12" fill="var(--accent)">medium 2 (n₂ &gt; n₁, slower)</text>
  <text x="216" y="22" font-size="11" fill="var(--muted)">normal</text>
  <defs><marker id="c31-r" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 10 5 0 10z" fill="var(--bad)"/></marker></defs>
</svg>
```

## Snell’s law

The **refractive index** of a medium is $n = c/v$. Snell’s law relates the angles to the indices (and speeds):

$$
\frac{n_1}{n_2} = \frac{\sin\theta_2}{\sin\theta_1} = \frac{v_2}{v_1}
$$

or, equivalently, $n_1\sin\theta_1 = n_2\sin\theta_2$.

```example
Light passes from air (n = 1.00) into glass (n = 1.50) at 40° to the normal. Find the angle of refraction and the speed of light in the glass.
---
$\sin\theta_2 = \dfrac{1.00\sin 40^\circ}{1.50} = 0.429 \Rightarrow \theta_2 = 25^\circ$.

$v = c/n = 3.00\times10^8/1.50 = 2.00\times10^8$ m s⁻¹.
```

## Critical angle and total internal reflection

Going from a higher to a lower refractive index (glass to air, say), the ray bends **away** from the normal. As the angle of incidence increases, the refracted ray gets closer to the boundary. At the **critical angle** $\theta_c$ it runs along the boundary ($\theta_2 = 90^\circ$):

$$
\sin\theta_c = \frac{n_2}{n_1}
$$

For any larger angle of incidence there is no refracted ray at all — the light undergoes **total internal reflection**.

```keyidea
Total internal reflection needs two conditions: the light is going into a medium of lower refractive index, and the angle of incidence is greater than the critical angle.
```

```example
Find the critical angle for a glass–air boundary, n_glass = 1.52.
---
$\sin\theta_c = \dfrac{1.00}{1.52} = 0.658 \Rightarrow \theta_c = 41^\circ$.
```

**Optical fibres** use total internal reflection: light entering one end hits the sides at angles greater than $\theta_c$ and is reflected along the fibre with very little loss. They carry internet data and let doctors see inside the body (endoscopes).

```question
snell-angle
```

## Summary

- Wavefronts join points in phase; rays are perpendicular to them.
- At a boundary waves reflect, transmit and refract; frequency is unchanged.
- Snell: $n_1\sin\theta_1 = n_2\sin\theta_2$, with $n = c/v$.
- Total internal reflection: into lower $n$ and incidence above $\theta_c$, where $\sin\theta_c = n_2/n_1$.
