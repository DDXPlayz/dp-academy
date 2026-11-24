---
code: A.5.3
title: Time dilation, length contraction and simultaneity
summary: Moving clocks run slow, moving rods are shorter, and “at the same time” depends on who is asking — plus the muon experiment that proves it.
minutes: 30
difficulty: 3
hl: true
objectives:
  - Identify proper time and proper length.
  - Calculate time dilation, Δt = γΔt₀, and length contraction, L = L₀/γ.
  - Explain the relativity of simultaneity.
  - Explain how muon decay provides evidence for time dilation and length contraction.
prerequisites:
  - The Lorentz factor
formulas:
  - name: Time dilation
    latex: '\Delta t = \gamma\,\Delta t_0'
    where: Δt₀ is the proper time interval.
  - name: Length contraction
    latex: 'L = \frac{L_0}{\gamma}'
    where: L₀ is the proper length.
definitions:
  - term: Proper time interval
    definition: The time between two events measured by an observer for whom both events happen at the same place. It is the shortest time interval measured by any observer.
  - term: Proper length
    definition: The length of an object measured in the frame in which it is at rest. It is the longest length measured by any observer.
  - term: Relativity of simultaneity
    definition: Two events that are simultaneous in one inertial frame are not, in general, simultaneous in another frame moving relative to the first.
mistakes:
  - Choosing the wrong proper quantity. Ask which observer sees both events at the same place (proper time) and in which frame the object is at rest (proper length).
  - Thinking length contraction happens in every direction. Only lengths along the direction of motion are contracted.
tips:
  - Sanity check — the proper time is the shortest time; the proper length is the longest length.
  - In muon questions, do the calculation in both frames and show they agree on whether the muons reach the ground.
related:
  - physics/e3-nuclear
---

## Proper time and time dilation

The **proper time** $\Delta t_0$ between two events is the time measured by a clock that is present at both events — an observer for whom the two events happen at the same place. Any other inertial observer, moving relative to that clock, measures a **longer** time:

$$
\Delta t = \gamma\,\Delta t_0
$$

From the ground, a clock on a fast spacecraft runs slow.

```example
A spacecraft passes Earth at 0.80c. An astronaut on board takes a 30-minute break, timed on her own watch. How long does the break last according to Earth?
---
The break starts and ends at the same place on the craft, so 30 min is the proper time. $\gamma = 1/\sqrt{1 - 0.64} = 1.67$.

$\Delta t = 1.67 \times 30 = 50$ min.
```

## Proper length and length contraction

The **proper length** $L_0$ of an object is its length measured in the frame where it is at rest. An observer who sees it moving measures a **shorter** length along the direction of motion:

$$
L = \frac{L_0}{\gamma}
$$

```example
A spacecraft is 120 m long when measured on board. How long is it measured by an observer it passes at 0.60c?
---
$\gamma = 1.25$, so $L = 120/1.25 = 96$ m along its direction of motion. Its width is unchanged.
```

```keyidea
Each observer sees the *other* one’s clocks run slow and the *other* one’s rulers shrink. There is no contradiction, because they disagree about which events are simultaneous.
```

## The relativity of simultaneity

Imagine a train carriage with a lamp exactly in the middle. The lamp flashes, and light travels to the front and back walls.

- On the train, both walls are the same distance away, so the light arrives at both **at the same time**.
- On the platform, the back wall is moving *towards* the light and the front wall *away* from it. Light still travels at $c$, so it reaches the **back wall first**.

Two events simultaneous in one frame are not simultaneous in another. In the Lorentz transformation this is the $-vx/c^2$ term: events at different $x$ with the same $t$ get different $t'$.

## Evidence: muon decay

Muons are created about 10 km up when cosmic rays hit the atmosphere. At rest they have a half-life of about 1.5 µs. Travelling at about 0.995c, a muon covers only about 450 m in 1.5 µs — so without relativity, after 10 km (about 22 half-lives) almost none should reach the ground. Detectors at sea level find large numbers.

```example
Muons travel 10 km down through the atmosphere at 0.995c. Their half-life at rest is 1.5 µs. Show that a significant fraction reaches the ground, (a) in Earth’s frame, (b) in the muon’s frame.
---
$\gamma = 1/\sqrt{1 - 0.995^2} \approx 10$. Travel time in Earth’s frame $= \dfrac{10\,000}{0.995 \times 3.0\times10^8} = 33.5$ µs.

(a) **Earth frame — time dilation.** The dilated half-life is $10 \times 1.5 = 15$ µs, so the journey is $33.5/15 \approx 2.2$ half-lives. Fraction left $\approx 2^{-2.2} \approx 0.22$.

(b) **Muon frame — length contraction.** The atmosphere is contracted to $10\,000/10 = 1000$ m, crossed in $1000/(0.995c) = 3.35$ µs $\approx 2.2$ half-lives of 1.5 µs. Same fraction, about 0.22.

Both frames agree on what is observed, as they must.
```

```question
proper-time-choice
```

## Summary

- Proper time is measured where both events happen at the same place; others measure $\Delta t = \gamma\Delta t_0$.
- Proper length is measured at rest; moving lengths contract to $L_0/\gamma$ along the motion.
- Simultaneity depends on the frame.
- Muons reaching sea level confirm time dilation (Earth’s view) and length contraction (muon’s view).
