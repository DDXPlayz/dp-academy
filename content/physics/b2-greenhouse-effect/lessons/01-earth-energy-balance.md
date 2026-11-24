---
code: B.2.1
title: Earth’s energy balance
summary: Sunlight in, infrared out — emissivity, albedo, the solar constant and why the average incoming intensity is a quarter of it.
minutes: 30
difficulty: 2
objectives:
  - Apply conservation of energy to a planet in equilibrium.
  - Define emissivity and albedo and use them in calculations.
  - Explain why the mean incoming intensity at Earth is S/4.
  - Estimate a planet’s equilibrium temperature.
prerequisites:
  - Stefan–Boltzmann law
formulas:
  - name: Emissivity
    latex: 'e = \frac{\text{power radiated per unit area}}{\sigma T^4}'
  - name: Radiated power of a grey body
    latex: 'P = e\sigma A T^4'
  - name: Albedo
    latex: '\alpha = \frac{\text{total scattered power}}{\text{total incident power}}'
  - name: Mean incoming intensity
    latex: 'I_{\text{mean}} = \frac{S}{4}'
    where: S ≈ 1360 W m⁻² is the solar constant.
definitions:
  - term: Emissivity
    definition: The ratio of the power radiated per unit area by a surface to the power radiated per unit area by a black body at the same temperature. Between 0 and 1.
  - term: Albedo
    definition: The fraction of the incident radiation that a surface or planet reflects or scatters.
  - term: Solar constant
    definition: The intensity of the Sun’s radiation at the top of Earth’s atmosphere, on a surface perpendicular to the rays — about 1360 W m⁻².
mistakes:
  - Using S instead of S/4 for the average incoming intensity over the whole Earth.
  - Treating albedo and emissivity as the same thing. Albedo is about reflected incoming radiation; emissivity is about emitted radiation.
tips:
  - For an equilibrium temperature, write “power absorbed = power emitted” and let the Earth’s area cancel.
  - Fresh snow has a high albedo (~0.8), oceans a low one (~0.06); Earth’s average is about 0.3.
related:
  - physics/b1-thermal-energy
---

## Energy in, energy out

A planet’s temperature settles when the power it absorbs from its star equals the power it radiates away into space. This is just **conservation of energy**:

$$
\text{power absorbed} = \text{power emitted}
$$

If more is absorbed than emitted, the planet warms until its own radiation (which rises steeply with temperature) catches up.

## Emissivity

Real surfaces radiate less than a perfect black body at the same temperature. Their **emissivity** $e$ compares the two:

$$
e = \frac{\text{power radiated per unit area}}{\sigma T^4}
$$

so a real surface radiates $P = e\sigma AT^4$. A black body has $e = 1$.

## Albedo

Some incoming sunlight is reflected straight back by clouds, ice and the ground. The fraction reflected is the **albedo**:

$$
\alpha = \frac{\text{total scattered power}}{\text{total incident power}}
$$

Earth’s albedo averages about 0.30 but **varies** from day to day with cloud cover, and with latitude — snow- and ice-covered polar regions reflect much more than tropical oceans.

## The solar constant and the factor of four

At Earth’s distance the Sun delivers about $S = 1360$ W m⁻² to a surface facing it directly. But the Earth intercepts sunlight only over its **cross-section**, a disc of area $\pi R^2$, while it radiates (and is averaged) over its whole **surface**, $4\pi R^2$:

$$
I_{\text{mean}} = \frac{S\,\pi R^2}{4\pi R^2} = \frac{S}{4} \approx 340\ \text{W m}^{-2}
$$

```svg
caption: Sunlight arrives on a disc of area πR², but Earth spreads that energy over its whole surface of area 4πR².
<svg viewBox="0 0 420 200">
  <circle cx="290" cy="100" r="70" fill="var(--accent)" opacity="0.15" stroke="var(--accent)" stroke-width="2"/>
  <ellipse cx="220" cy="100" rx="10" ry="70" fill="none" stroke="var(--warn)" stroke-width="2" stroke-dasharray="5 4"/>
  <text x="200" y="190" font-size="12" text-anchor="middle" fill="var(--warn)">cross-section πR²</text>
  <text x="290" y="104" font-size="12" text-anchor="middle" fill="var(--accent)">surface 4πR²</text>
  <g stroke="var(--warn)" stroke-width="2">
    <line x1="30" y1="45" x2="200" y2="45" marker-end="url(#b21-s)"/>
    <line x1="30" y1="80" x2="200" y2="80" marker-end="url(#b21-s)"/>
    <line x1="30" y1="120" x2="200" y2="120" marker-end="url(#b21-s)"/>
    <line x1="30" y1="155" x2="200" y2="155" marker-end="url(#b21-s)"/>
  </g>
  <text x="30" y="30" font-size="12" fill="var(--warn)">sunlight, S = 1360 W m⁻²</text>
  <defs><marker id="b21-s" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 10 5 0 10z" fill="var(--warn)"/></marker></defs>
</svg>
```

```keyidea
Average incoming intensity = S/4 because Earth catches sunlight on a disc but radiates from a sphere — and only half of it is in daylight at any time.
```

## An equilibrium temperature

Absorbed power per square metre (averaged) is $(1 - \alpha)\dfrac{S}{4}$. Emitted power per square metre is $e\sigma T^4$. Setting them equal:

$$
(1 - \alpha)\frac{S}{4} = e\sigma T^4
$$

```example
Treat Earth as a black body (e = 1) with albedo 0.30. Estimate its equilibrium temperature.
---
$\sigma T^4 = (1 - 0.30)\dfrac{1360}{4} = 238$ W m⁻².

$T = \left(\dfrac{238}{5.67\times10^{-8}}\right)^{1/4} = 255$ K $\approx -18$ °C.

The real average surface temperature is about 288 K (15 °C). The 33 K difference is due to the **greenhouse effect** — the next lesson.
```

```example
A surface at 300 K has emissivity 0.70. How much power does it radiate per square metre?
---
$e\sigma T^4 = 0.70 \times 5.67\times10^{-8} \times 300^4 = 321$ W m⁻².
```

```question
mean-intensity
```

## Summary

- In equilibrium, absorbed power = emitted power.
- Emissivity compares a surface’s emission with a black body’s: $P = e\sigma AT^4$.
- Albedo is the reflected fraction; Earth’s is about 0.3 and varies with clouds and latitude.
- Mean incoming intensity is $S/4$; absorbed power per m² is $(1-\alpha)S/4$.
