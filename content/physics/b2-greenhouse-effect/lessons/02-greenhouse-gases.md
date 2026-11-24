---
code: B.2.2
title: Greenhouse gases and the enhanced greenhouse effect
summary: Why a thin layer of CO₂, methane and water vapour keeps Earth 33 K warmer — and what human activity adds.
minutes: 25
difficulty: 2
objectives:
  - Name the main greenhouse gases and give natural and human sources of each.
  - Explain how greenhouse gases absorb and re-emit infrared radiation, using molecular energy levels and resonance.
  - Describe the enhanced greenhouse effect.
prerequisites:
  - Earth’s energy balance
  - Black-body radiation
definitions:
  - term: Greenhouse effect
    definition: The warming of a planet’s surface because gases in its atmosphere absorb outgoing infrared radiation and re-emit some of it back towards the surface.
  - term: Greenhouse gas
    definition: A gas whose molecules absorb and emit infrared radiation; the main ones are H₂O, CO₂, CH₄ and N₂O.
  - term: Enhanced greenhouse effect
    definition: The additional warming caused by increased concentrations of greenhouse gases from human activities.
mistakes:
  - Saying greenhouse gases “trap heat” or “reflect” radiation. They absorb infrared and re-emit it in all directions.
  - Saying greenhouse gases absorb incoming sunlight. Most sunlight is visible and passes through; the gases absorb the longer-wavelength infrared emitted by the warm surface.
  - Confusing the greenhouse effect with ozone depletion — they are different problems.
tips:
  - Explain the mechanism in three steps — surface emits infrared; gases absorb it; gases re-emit in all directions, some back down.
  - Without any greenhouse effect Earth would be about 255 K; it is essential for life. The concern is the enhanced effect.
related:
  - physics/b2-greenhouse-effect
---

## Different wavelengths in and out

The Sun’s surface is at about 5800 K, so by Wien’s law its radiation peaks in the **visible** range. Earth’s surface is at about 288 K, so it radiates mainly **infrared** at around 10 µm. The atmosphere treats these two kinds of radiation very differently:

- incoming visible light mostly **passes through** to the surface;
- outgoing infrared is largely **absorbed** by certain gases.

## The greenhouse gases

| Gas | Natural sources | Human sources |
|---|---|---|
| Water vapour, H₂O | evaporation from oceans and lakes | (indirectly, via warming) |
| Carbon dioxide, CO₂ | respiration, volcanoes, forest fires | burning fossil fuels, deforestation, cement |
| Methane, CH₄ | wetlands, termites | cattle, rice paddies, landfill, gas leaks |
| Nitrous oxide, N₂O | soil bacteria, oceans | fertilisers, vehicle exhausts |

Nitrogen and oxygen, which make up 99% of the air, are **not** greenhouse gases.

## How the gases absorb infrared

Molecules can vibrate (bonds stretching and bending) and rotate. These motions have **quantised energy levels**. When a photon of infrared radiation has exactly the energy needed to move the molecule to a higher vibrational level, it is absorbed. This can also be pictured as **resonance**: the molecule’s natural frequency of vibration matches the frequency of the infrared radiation, so it absorbs energy strongly.

```keyidea
Absorbed infrared is soon re-emitted — but in a random direction. Roughly half heads back towards the surface, so the surface receives energy from the Sun **and** from the atmosphere, and warms until it is radiating enough to stay in balance.
```

```svg
caption: Visible sunlight passes through; infrared from the surface is absorbed by greenhouse gas molecules and re-emitted in all directions, some back down.
<svg viewBox="0 0 420 220">
  <rect x="0" y="180" width="420" height="40" fill="var(--good)" opacity="0.2"/>
  <text x="380" y="205" font-size="12" text-anchor="end" fill="var(--good)">surface</text>
  <rect x="0" y="60" width="420" height="60" fill="var(--accent)" opacity="0.08"/>
  <text x="10" y="76" font-size="12" fill="var(--accent)">atmosphere with greenhouse gases</text>
  <line x1="60" y1="10" x2="110" y2="178" stroke="var(--warn)" stroke-width="2.5" marker-end="url(#b22-w)"/>
  <text x="40" y="24" font-size="12" fill="var(--warn)">visible</text>
  <path d="M200 178 Q 210 150 205 120 T 215 95" fill="none" stroke="var(--bad)" stroke-width="2.5" marker-end="url(#b22-r)"/>
  <text x="220" y="160" font-size="12" fill="var(--bad)">infrared out</text>
  <circle cx="215" cy="92" r="7" fill="var(--accent)"/>
  <line x1="215" y1="92" x2="300" y2="30" stroke="var(--bad)" stroke-width="2" marker-end="url(#b22-r)"/>
  <line x1="215" y1="92" x2="300" y2="170" stroke="var(--bad)" stroke-width="2" marker-end="url(#b22-r)"/>
  <text x="305" y="30" font-size="12" fill="var(--bad)">to space</text>
  <text x="305" y="168" font-size="12" fill="var(--bad)">back to surface</text>
  <defs>
    <marker id="b22-w" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 10 5 0 10z" fill="var(--warn)"/></marker>
    <marker id="b22-r" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 10 5 0 10z" fill="var(--bad)"/></marker>
  </defs>
</svg>
```

## The natural and the enhanced greenhouse effect

The natural greenhouse effect raises Earth’s average surface temperature from about 255 K to about 288 K, which keeps water liquid and makes life possible.

Since the industrial revolution, human activity has raised the concentration of CO₂ from about 280 ppm to over 420 ppm and increased methane and nitrous oxide too. More greenhouse gas means more infrared absorbed and re-emitted downwards, so the surface must warm further to restore balance. This additional warming is the **enhanced greenhouse effect**, and it drives current climate change.

Warming can trigger **feedback**: melting ice lowers albedo, so more sunlight is absorbed; a warmer atmosphere holds more water vapour, itself a greenhouse gas. Both amplify the original warming.

```example
Explain why increasing atmospheric CO₂ increases Earth’s mean surface temperature. (4 marks)
---
- The Earth’s surface emits infrared radiation ✓
- CO₂ molecules absorb infrared because it matches their vibrational energy levels / natural frequencies ✓
- They re-emit the radiation in all directions, so some returns to the surface ✓
- More CO₂ means more is returned, so the surface warms until outgoing and incoming power balance again ✓
```

```question
greenhouse-gases
```

## Summary

- Visible sunlight passes through the atmosphere; Earth’s infrared is absorbed by H₂O, CO₂, CH₄ and N₂O.
- Absorption happens when infrared matches molecular vibrational energy levels (resonance); re-emission is in all directions.
- The natural greenhouse effect keeps Earth about 33 K warmer; human emissions add the enhanced greenhouse effect.
