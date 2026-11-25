---
code: A.5.4
title: Space–time diagrams
summary: Drawing events and world lines — and reading off time dilation, length contraction and simultaneity from a picture.
minutes: 25
difficulty: 3
hl: true
objectives:
  - Plot events and world lines on a space–time diagram.
  - Relate the angle of a world line to speed, tan θ = v/c.
  - Draw the axes of a moving frame and use them to judge simultaneity.
prerequisites:
  - Lorentz transformations
formulas:
  - name: Angle of a world line
    latex: '\tan\theta = \frac{v}{c}'
    where: θ is measured from the ct axis.
definitions:
  - term: Space–time diagram
    definition: A graph with position x on the horizontal axis and ct on the vertical axis, on which each event is a point.
  - term: World line
    definition: The line on a space–time diagram traced by an object’s position over time.
mistakes:
  - Putting t, not ct, on the vertical axis. With ct, light’s world line is at exactly 45°.
  - Measuring the angle of a world line from the x-axis. tan θ = v/c uses the angle from the ct axis.
tips:
  - Lines of simultaneity in a frame are parallel to that frame’s x-axis; events on the same such line happen at the same time in that frame.
  - No world line can be closer to the x-axis than 45°, because nothing travels faster than light.
related:
  - physics/a5-relativity
---

## Events and world lines

A **space–time diagram** plots position $x$ horizontally and $ct$ vertically. Using $ct$ (a distance) means both axes have the same units, and a light ray moving at $c$ appears at exactly **45°**.

```figure
src: physics/_sme/galilean-special-relativity/img/fig-a49afa9ca8fd1cf1.png
caption: World lines on a spacetime diagram: a slower object has a steeper line; light is drawn at 45°.
```

```figure
src: physics/_iitian/spacetime-diagrams-ib-dp-physics-study-notes/img/fig-bc138f72a64dcb36.png
caption: The axes of a moving frame (x', ct') tilt towards the light line by the same angle θ = tan⁻¹(v/c).
```

- An **event** is a single point.
- An object’s **world line** is its path through space–time. A stationary object has a vertical world line; a moving object’s world line is tilted.

The angle $\theta$ between a world line and the $ct$ axis satisfies

$$
\tan\theta = \frac{v}{c}
$$

```svg
caption: A space–time diagram. The stationary object is vertical, the object at 0.5c is tilted at 26.6° from the ct axis, and light is at 45°.
<svg viewBox="0 0 380 300">
  <line x1="60" y1="260" x2="350" y2="260" stroke="currentColor" stroke-width="1.5" marker-end="url(#a54-k)"/>
  <line x1="60" y1="260" x2="60" y2="20" stroke="currentColor" stroke-width="1.5" marker-end="url(#a54-k)"/>
  <text x="352" y="275" font-size="13" fill="currentColor" font-style="italic">x</text>
  <text x="40" y="22" font-size="13" fill="currentColor" font-style="italic">ct</text>
  <line x1="120" y1="260" x2="120" y2="40" stroke="var(--muted)" stroke-width="2"/>
  <text x="124" y="50" font-size="12" fill="var(--muted)">at rest</text>
  <line x1="60" y1="260" x2="170" y2="40" stroke="var(--accent)" stroke-width="2.5"/>
  <text x="176" y="52" font-size="12" fill="var(--accent)">v = 0.5c</text>
  <line x1="60" y1="260" x2="280" y2="40" stroke="var(--warn)" stroke-width="2" stroke-dasharray="6 4"/>
  <text x="285" y="52" font-size="12" fill="var(--warn)">light (45°)</text>
  <path d="M60 210 A50 50 0 0 0 82 215" fill="none" stroke="var(--accent)"/>
  <text x="70" y="200" font-size="12" fill="var(--accent)">θ</text>
  <defs><marker id="a54-k" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 10 5 0 10z" fill="currentColor"/></marker></defs>
</svg>
```

## The axes of a moving frame

Frame S′ moves at $v$ relative to S. Its axes, drawn on S’s diagram:

- the **$ct'$ axis** is the world line of S′’s origin, tilted at angle $\theta$ from $ct$ (with $\tan\theta = v/c$);
- the **$x'$ axis** is tilted up from $x$ by the same angle $\theta$.

The two primed axes close in towards the 45° light line, like a pair of scissors. Light’s world line still bisects them, which is why both frames measure the same speed of light.

```keyidea
Events on a line parallel to the x′ axis are simultaneous in S′. Since the x′ axis is tilted, events simultaneous in S (on a horizontal line) are generally not simultaneous in S′.
```

## Reading effects from the diagram

- **Simultaneity:** draw lines parallel to each frame’s $x$-axis through two events. If they lie on the same line for S but different lines for S′, they are simultaneous only in S.
- **Time dilation:** the time between two ticks of a clock moving with S′ is measured along its tilted world line; projecting the ticks onto S’s $ct$ axis (with horizontal lines) gives a larger interval.
- **Order of events:** if two events can be joined by a line steeper than 45°, every observer agrees on their order — one could have caused the other. If the joining line is flatter than 45°, observers can disagree about which came first.

```example
A rocket moves at 0.75c relative to Earth. What angle does its world line make with the ct axis on Earth’s space–time diagram?
---
$\tan\theta = v/c = 0.75$, so $\theta = 36.9^\circ$.
```

```example
Events A and B happen at the same time in Earth’s frame, with B further along +x. A rocket moves in the +x direction. Which event happens first in the rocket’s frame?
---
The rocket’s $x'$ axis tilts upwards. A line through A parallel to $x'$ passes **above** B, so in the rocket’s frame B happens first. (This matches $t' = \gamma(t - vx/c^2)$: B has larger $x$, so smaller $t'$.)
```

```question
worldline-angle
```

## Summary

- Space–time diagrams plot $ct$ against $x$; light travels at 45°.
- A world line’s angle from the $ct$ axis obeys $\tan\theta = v/c$.
- A moving frame’s $ct'$ and $x'$ axes tilt symmetrically towards the light line.
- Lines parallel to a frame’s $x$-axis are its lines of simultaneity.
