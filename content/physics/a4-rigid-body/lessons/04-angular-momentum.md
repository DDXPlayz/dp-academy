---
code: A.4.4
title: Angular momentum and rotational energy
summary: Why a skater spins faster with arms pulled in — conservation of angular momentum, angular impulse and rotational kinetic energy.
minutes: 30
difficulty: 3
hl: true
objectives:
  - Calculate angular momentum, L = Iω.
  - Apply conservation of angular momentum when no external torque acts.
  - Use angular impulse, ΔL = τΔt.
  - Calculate rotational kinetic energy and include it in energy conservation.
prerequisites:
  - Moment of inertia
  - Conservation of energy
formulas:
  - name: Angular momentum
    latex: 'L = I\omega'
  - name: Angular impulse
    latex: '\Delta L = \tau\Delta t = \Delta(I\omega)'
  - name: Rotational kinetic energy
    latex: 'E_k = \tfrac{1}{2}I\omega^2 = \frac{L^2}{2I}'
definitions:
  - term: Angular momentum
    definition: The product of moment of inertia and angular velocity, L = Iω, measured in kg m² s⁻¹.
  - term: Angular impulse
    definition: The product of a torque and the time for which it acts, equal to the change in angular momentum.
mistakes:
  - Assuming kinetic energy is conserved when angular momentum is. When a skater pulls in their arms, L stays the same but Ek increases — the skater does work.
  - Forgetting the rotational term when a ball or cylinder rolls — its kinetic energy is ½mv² + ½Iω².
tips:
  - Look for “no external torque” or “isolated” — that is the cue to set L before = L after.
  - Rolling without slipping means v = ωr; use it to replace ω in energy equations.
related:
  - physics/a3-work-energy-power
---

## Angular momentum

Linear momentum is $p = mv$. The rotational equivalent is **angular momentum**:

$$
L = I\omega
$$

measured in kg m² s⁻¹.

## Conservation of angular momentum

If no resultant external torque acts on a system, its total angular momentum stays constant:

$$
I_1\omega_1 = I_2\omega_2
$$

This explains the spinning skater. Pulling the arms in reduces $I$, so $\omega$ must increase to keep $L$ constant. Divers tuck to spin faster and open out to slow down before entering the water.

```example
A skater spins at 3.0 rad s⁻¹ with arms outstretched, I = 4.5 kg m². She pulls her arms in so that I = 1.5 kg m². Find her new angular velocity and the change in kinetic energy.
---
$L$ is conserved: $4.5 \times 3.0 = 1.5\,\omega_2 \Rightarrow \omega_2 = 9.0$ rad s⁻¹.

Before: $E_k = \tfrac{1}{2}(4.5)(3.0)^2 = 20.3$ J. After: $E_k = \tfrac{1}{2}(1.5)(9.0)^2 = 60.8$ J.

The kinetic energy **triples**. The extra 40.5 J comes from the work her muscles do pulling her arms inwards.
```

```example
A disc (I = 0.20 kg m²) spins at 12 rad s⁻¹. A second, initially stationary disc (I = 0.10 kg m²) is dropped onto it and they rotate together. Find the final angular velocity.
---
$0.20 \times 12 + 0 = (0.20 + 0.10)\,\omega \Rightarrow \omega = 8.0$ rad s⁻¹.

Kinetic energy falls from 14.4 J to 9.6 J — this is a rotational inelastic collision.
```

## Angular impulse

A torque acting for a time changes angular momentum, just as a force acting for a time changes linear momentum:

$$
\Delta L = \tau\,\Delta t
$$

The area under a torque–time graph is the angular impulse.

```example
A constant braking torque of 6.0 N m stops a wheel (I = 1.2 kg m²) spinning at 30 rad s⁻¹. How long does it take?
---
$\Delta L = 1.2 \times (0 - 30) = -36$ kg m² s⁻¹.

$\Delta t = \dfrac{|\Delta L|}{\tau} = \dfrac{36}{6.0} = 6.0$ s.
```

## Rotational kinetic energy

A rotating body has kinetic energy even if its centre is not moving:

$$
E_k = \tfrac{1}{2}I\omega^2 = \frac{L^2}{2I}
$$

An object that **rolls** has both kinds: $E_k = \tfrac{1}{2}mv^2 + \tfrac{1}{2}I\omega^2$, and rolling without slipping links them by $v = \omega r$.

```example
A solid cylinder (I = ½mr²) rolls without slipping from rest down a slope, falling a vertical height of 0.90 m. Find its speed at the bottom. (g = 9.8 m s⁻²)
---
Energy: $mgh = \tfrac{1}{2}mv^2 + \tfrac{1}{2}\left(\tfrac{1}{2}mr^2\right)\left(\tfrac{v}{r}\right)^2 = \tfrac{3}{4}mv^2$.

$v = \sqrt{\tfrac{4gh}{3}} = \sqrt{\tfrac{4 \times 9.8 \times 0.90}{3}} = 3.4$ m s⁻¹.

A block sliding without friction would reach $\sqrt{2gh} = 4.2$ m s⁻¹; the cylinder is slower because some energy goes into spinning.
```

```mistake
Angular momentum conservation needs zero external **torque**, not zero external force. A wheel on a fixed axle can have large forces on it from the axle and still conserve angular momentum.
```

```question
skater-omega
```

## Summary

- $L = I\omega$; with no external torque, $L$ is conserved.
- Angular impulse $\tau\Delta t$ equals the change in angular momentum.
- Rotational kinetic energy is $\tfrac{1}{2}I\omega^2$; rolling objects have translational and rotational kinetic energy.
