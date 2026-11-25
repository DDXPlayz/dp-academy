---
code: B.1.2
title: Specific heat capacity and latent heat
summary: How much energy it takes to warm something up, and why the temperature stops rising while it melts or boils.
minutes: 30
difficulty: 2
objectives:
  - Explain a phase change in terms of particle behaviour at constant temperature.
  - Use Q = mcΔT for temperature changes.
  - Use Q = mL for changes of phase.
  - Interpret heating and cooling curves and solve mixing problems.
prerequisites:
  - Internal energy
formulas:
  - name: Heating without phase change
    latex: 'Q = mc\Delta T'
    where: c is the specific heat capacity in J kg⁻¹ K⁻¹.
  - name: Phase change
    latex: 'Q = mL'
    where: L is the specific latent heat of fusion or vaporization in J kg⁻¹.
definitions:
  - term: Specific heat capacity
    definition: The energy needed to raise the temperature of 1 kg of a substance by 1 K.
  - term: Specific latent heat of fusion
    definition: The energy needed to change 1 kg of a substance from solid to liquid without a change in temperature.
  - term: Specific latent heat of vaporization
    definition: The energy needed to change 1 kg of a substance from liquid to gas without a change in temperature.
mistakes:
  - Using Q = mcΔT during a phase change. While a substance melts or boils its temperature is constant, so you need Q = mL.
  - Forgetting one stage in a multi-stage problem — for ice at −10 °C turning into water at 20 °C there are three stages.
  - Mixing up grams and kilograms. Specific heat capacities in data booklets are per kilogram.
tips:
  - In mixing problems, write “energy lost by hot = energy gained by cold” and include every stage for each substance.
  - The flat parts of a heating curve show phase changes; their lengths compare the latent heats.
related:
  - physics/b1-thermal-energy
---

## Phase changes

When a solid is heated, its particles vibrate more and its temperature rises. At the melting point something different happens: the energy supplied goes into **breaking the bonds** that hold the particles in fixed positions. Particle kinetic energy (and so the temperature) stays the same; the **potential energy** increases.

```figure
src: physics/_sme/thermal-energy-transfers/img/fig-db95ec80f9aa39ff.png
caption: A heating curve: temperature rises within each phase but stays constant while the substance melts or boils.
```

```keyidea
During a phase change, energy is transferred but the temperature does not change. The energy goes into intermolecular potential energy, not kinetic energy.
```

Vaporization needs much more energy than melting, because the particles must be separated completely.

```svg
caption: Heating curve for ice supplied with energy at a constant rate. The flat sections are melting at 0 °C and boiling at 100 °C; boiling takes far longer.
<svg viewBox="0 0 420 240">
  <line x1="50" y1="210" x2="400" y2="210" stroke="currentColor" stroke-width="1.5"/>
  <line x1="50" y1="210" x2="50" y2="20" stroke="currentColor" stroke-width="1.5"/>
  <text x="225" y="232" font-size="12" text-anchor="middle" fill="currentColor">energy supplied (or time)</text>
  <text x="18" y="24" font-size="12" fill="currentColor">θ / °C</text>
  <line x1="50" y1="170" x2="400" y2="170" stroke="var(--muted)" stroke-dasharray="4 4"/>
  <line x1="50" y1="70" x2="400" y2="70" stroke="var(--muted)" stroke-dasharray="4 4"/>
  <text x="44" y="174" font-size="11" text-anchor="end" fill="var(--muted)">0</text>
  <text x="44" y="74" font-size="11" text-anchor="end" fill="var(--muted)">100</text>
  <polyline points="50,195 75,170 115,170 175,70 345,70 380,40" fill="none" stroke="var(--accent)" stroke-width="2.6" stroke-linejoin="round"/>
  <text x="95" y="162" font-size="11" text-anchor="middle" fill="var(--accent)">melting</text>
  <text x="260" y="62" font-size="11" text-anchor="middle" fill="var(--accent)">boiling</text>
  <text x="62" y="200" font-size="11" fill="var(--muted)">ice</text>
  <text x="150" y="130" font-size="11" fill="var(--muted)">water</text>
  <text x="362" y="62" font-size="11" fill="var(--muted)">steam</text>
</svg>
```

## Specific heat capacity

The energy $Q$ needed to change the temperature of a mass $m$ by $\Delta T$ is

$$
Q = mc\Delta T
$$

Water has an unusually high specific heat capacity, 4200 J kg⁻¹ K⁻¹, which is why it is used in radiators and why coastal climates are mild.

```example
How much energy is needed to heat 1.5 kg of water from 20 °C to 100 °C? (c = 4200 J kg⁻¹ K⁻¹)
---
$Q = mc\Delta T = 1.5 \times 4200 \times 80 = 5.0\times10^5$ J.
```

## Specific latent heat

At the melting or boiling point,

```figure
src: physics/_sme/thermal-energy-transfers/img/fig-10c2411acfdb05b0.png
caption: Equal masses of water and copper: water has the much larger specific heat capacity, so it takes longer to heat up or cool down.
```

$$
Q = mL
$$

For water, $L_f = 3.3\times10^5$ J kg⁻¹ and $L_v = 2.3\times10^6$ J kg⁻¹.

```example
A 0.20 kg block of ice at −10 °C is turned into water at 30 °C. How much energy is needed? (c_ice = 2100 J kg⁻¹ K⁻¹, c_water = 4200 J kg⁻¹ K⁻¹, L_f = 3.3 × 10⁵ J kg⁻¹)
---
Warm the ice to 0 °C: $0.20 \times 2100 \times 10 = 4200$ J.

Melt it: $0.20 \times 3.3\times10^5 = 66\,000$ J.

Warm the water to 30 °C: $0.20 \times 4200 \times 30 = 25\,200$ J.

Total $= 95\,400$ J $\approx 9.5\times10^4$ J. Melting takes by far the largest share.
```

## Mixing problems

When substances at different temperatures are mixed in an insulated container, energy flows until they share a final temperature. If no energy is lost:

```figure
src: physics/_sme/thermal-energy-transfers/img/fig-810ab679ee107f22.png
caption: When a hot and a cold object are mixed, their temperatures approach a common final value; energy lost by one equals energy gained by the other.
```

$$
\text{energy lost by the hotter substance} = \text{energy gained by the cooler substance}
$$

```example
200 g of water at 80 °C is mixed with 300 g of water at 20 °C. Find the final temperature.
---
$0.200 \times 4200 \times (80 - T) = 0.300 \times 4200 \times (T - 20)$

$0.200(80 - T) = 0.300(T - 20) \Rightarrow 16 - 0.2T = 0.3T - 6 \Rightarrow T = 44$ °C.
```

```mistake
In practice some energy escapes to the surroundings and the container, so a measured specific heat capacity is usually too large (more energy seemed to be needed than really was).
```

```question
latent-ice
```

## Summary

- A phase change happens at constant temperature; the energy goes into intermolecular potential energy.
- $Q = mc\Delta T$ for temperature changes; $Q = mL$ for phase changes.
- Heating curves are flat during phase changes.
- Mixing: energy lost by hot = energy gained by cold.
