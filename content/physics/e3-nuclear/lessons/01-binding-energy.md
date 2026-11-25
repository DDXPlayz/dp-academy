---
code: E.3.1
title: Mass defect and binding energy
summary: Why a nucleus weighs less than its parts, the strong force that holds it together, and the binding-energy curve that explains fission and fusion.
minutes: 35
difficulty: 3
objectives:
  - Define mass defect and nuclear binding energy and calculate them using E = mc².
  - Describe the variation of binding energy per nucleon with nucleon number.
  - Describe the strong nuclear force as a short-range attractive force between nucleons.
  - (HL) Describe the evidence for the strong force and the role of the neutron–proton ratio in stability.
prerequisites:
  - Discovering the nucleus
formulas:
  - name: Mass–energy equivalence
    latex: 'E = mc^2'
  - name: Mass defect
    latex: '\Delta m = Zm_p + (A - Z)m_n - m_{\text{nucleus}}'
  - name: Unified atomic mass unit
    latex: '1\ \text{u} = 931.5\ \text{MeV}\,c^{-2}'
definitions:
  - term: Mass defect
    definition: The difference between the total mass of the separate nucleons and the mass of the nucleus.
  - term: Binding energy
    definition: The energy needed to separate a nucleus completely into its individual nucleons (equivalently, the energy released when it forms).
  - term: Strong nuclear force
    definition: A very short-range (~10⁻¹⁵ m) force that attracts nucleons to each other regardless of charge and becomes repulsive at very short separations.
mistakes:
  - Saying binding energy is energy stored in the nucleus. It is energy you must supply to pull it apart — more binding energy means a more stable nucleus.
  - Comparing total binding energies to judge stability. Use binding energy per nucleon.
tips:
  - Use 1 u = 931.5 MeV c⁻² to go straight from a mass defect in u to an energy in MeV.
  - Iron-56 (and nickel-62) sit at the peak of the curve — the most stable nuclei.
related:
  - physics/e4-fission
  - physics/e5-fusion-stars
---

## Mass defect

Weigh a helium-4 nucleus and you find it is **lighter** than two free protons plus two free neutrons. The difference is the **mass defect**:

$$
\Delta m = Zm_p + (A - Z)m_n - m_{\text{nucleus}}
$$

## Binding energy

The missing mass corresponds to energy via Einstein’s $E = mc^2$. The **binding energy** is the energy that must be supplied to pull the nucleus apart into separate nucleons — and the energy released when it forms:

$$
E_B = \Delta m\,c^2
$$

In nuclear physics, masses are in unified atomic mass units: $1\ \text{u} = 1.661\times10^{-27}$ kg $= 931.5$ MeV c⁻².

```example
Find the binding energy per nucleon of helium-4. Mass of nucleus = 4.001506 u, mₚ = 1.007276 u, mₙ = 1.008665 u.
---
$\Delta m = 2(1.007276) + 2(1.008665) - 4.001506 = 0.030376$ u.

$E_B = 0.030376\times931.5 = 28.3$ MeV, so $28.3/4 = 7.07$ MeV per nucleon.
```

## The binding-energy curve

```plot
caption: Binding energy per nucleon against nucleon number (smoothed). The peak near A ≈ 56–62 marks the most stable nuclei. Joining light nuclei (fusion) or splitting heavy ones (fission) both move towards the peak and release energy.
x: 2, 240
y: 0, 9.5
f: 9.2 - 7.5*exp(-x/9) - 0.0072*x | binding energy per nucleon (MeV)
xlabel: nucleon number A
ylabel: E_B / A (MeV)
vline: 56 | Fe-56
```

```figure
src: physics/_iitian/radioactivity-ib-dp-physics-study-notes/img/fig-22d7901192fdd7aa.png
caption: Binding energy per nucleon against nucleon number: it peaks near iron-56, so fusion of light nuclei and fission of heavy ones both release energy.
```

```keyidea
Energy is released by any nuclear reaction whose products have a greater binding energy per nucleon than the reactants — fusion of light nuclei, or fission of heavy ones.
```

## The strong nuclear force

Protons in the nucleus repel each other electrically, yet the nucleus holds together. The **strong nuclear force**:

```figure
src: physics/_sme/radioactive-decay/img/fig-bb7f0cb4c3b9a78e.png
caption: Protons repel each other electrostatically, but the strong nuclear force between all nucleons holds the nucleus together.
```

```figure
src: physics/_sme/radioactive-decay/img/fig-e3b6400526f58f6d.png
caption: The strong force is strongly attractive at about 1 fm, repulsive at shorter range, and negligible beyond about 3 fm.
```

- attracts nucleons (protons and neutrons alike) to each other;
- has a very short range, about $10^{-15}$ m — so each nucleon only feels its nearest neighbours;
- becomes repulsive at very short distances, stopping the nucleus collapsing.

## (HL) Stability and the strong force

- **Evidence** for the strong force: nuclei exist at all despite proton repulsion; high-energy scattering deviates from Rutherford’s Coulomb-only prediction once the projectile reaches the nucleus.
- **Neutron–proton ratio:** light stable nuclei have $N \approx Z$. Heavier nuclei need extra neutrons, which add strong-force attraction without adding electric repulsion. Nuclei too far from the stability band decay.
- **Above A ≈ 60** the binding energy per nucleon is roughly **constant** (about 8 MeV, falling slowly): because the strong force is short-range, each nucleon interacts only with its neighbours, so adding nucleons adds about the same binding energy each time.

```figure
src: physics/_iitian/radioactivity-ib-dp-physics-study-notes/img/fig-82a28ffbcf608dcc.png
caption: Stable nuclei (black) follow N = Z for light elements but need extra neutrons as Z increases; the type of decay depends on which side of the line a nucleus lies.
```

```question
mass-defect-calc
```

## Summary

- Mass defect $\Delta m$ → binding energy $\Delta mc^2$; 1 u = 931.5 MeV c⁻².
- Binding energy per nucleon peaks near iron; fusion and fission both move towards the peak.
- The strong force is short-range and attractive between all nucleons.
