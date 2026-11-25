---
code: E.3.10
title: Activity and half-life
summary: How fast a radioactive sample decays, how to use whole numbers of half-lives, and how to correct for background radiation.
minutes: 25
difficulty: 2
objectives:
  - Define activity, count rate and half-life.
  - Calculate the remaining nuclei, activity or count rate after a whole number of half-lives.
  - Correct count rates for background radiation.
prerequisites:
  - Alpha, beta and gamma decay
formulas:
  - name: After n half-lives
    latex: 'N = N_0\left(\tfrac{1}{2}\right)^n'
definitions:
  - term: Activity
    definition: The number of decays per second in a sample, measured in becquerels (1 Bq = 1 decay per second).
  - term: Count rate
    definition: The number of decays detected per second by a detector — usually much less than the activity.
  - term: Half-life
    definition: The time taken for half the nuclei of a radioactive isotope to decay (equivalently, for the activity to halve).
  - term: Background radiation
    definition: Ionising radiation always present from natural sources (rocks, cosmic rays, radon) and human activity.
mistakes:
  - Forgetting to subtract background before calculating half-life.
  - Thinking a sample is gone after two half-lives. After two half-lives a quarter remains.
tips:
  - Count the halvings — 1 → ½ → ¼ → ⅛ → ¹⁄₁₆.
  - The fraction that has decayed is 1 minus the fraction remaining.
related:
  - physics/e3-nuclear
---

## Activity and count rate

The **activity** $A$ of a sample is its number of decays per second, in becquerels (Bq). A detector such as a Geiger–Müller tube only catches some of the radiation, so it measures a smaller **count rate**. Both are proportional to the number of undecayed nuclei.

```figure
src: physics/_sme/radioactive-decay/img/fig-085dc1ec33b14d69.png
caption: Radioactive decay is random: the count rate fluctuates about a smooth exponential trend.
```

```figure
src: physics/_iitian/radioactivity-ib-dp-physics-study-notes/img/fig-716e85b13bb3cfae.png
caption: After each half-life, half of the remaining radioactive nuclei have decayed, so the activity halves again and again.
```

## Half-life

```keyidea
The half-life is the time for half the undecayed nuclei to decay. Because decay is random, every nucleus has the same chance of decaying in a given time — so in each half-life, half of whatever is left decays.
```

```figure
src: physics/_sme/radioactive-decay/img/fig-1676c893e00a9add.png
caption: A larger decay constant gives a steeper curve and a shorter half-life.
```

After $n$ half-lives:

$$
N = N_0\left(\tfrac{1}{2}\right)^n
$$

and the activity and count rate fall by the same factor.

```plot
caption: Exponential decay. The number of undecayed nuclei halves every half-life, whatever the starting point.
x: 0, 5
y: 0, 1.05
f: 0.5^x | N / N₀
xlabel: time / half-lives
ylabel: N / N₀
point: 1, 0.5 | ½
point: 2, 0.25 | ¼
point: 3, 0.125 | ⅛
```

```example
A sample has an activity of 3200 Bq. Its half-life is 6 hours. What is its activity after one day?
---
24 h is 4 half-lives: $3200 \times (\tfrac{1}{2})^4 = 200$ Bq.
```

## Background radiation

Detectors always record some counts from **background radiation** — radon gas, rocks, cosmic rays, medical sources. Measure the background with no source present and **subtract** it from every reading before using the data.

```figure
src: physics/_sme/radioactive-decay/img/fig-553af4e9115d9cb6.png
caption: Measuring background radiation: a GM tube and counter with no source present.
```

```figure
src: physics/_sme/radioactive-decay/img/fig-d0df768b4b59015c.png
caption: With the source in place, the background count is subtracted from the measured count to give the corrected count rate.
```

```example
A detector records 520 counts per minute near a source and 20 counts per minute with the source removed. After 30 minutes it records 145 counts per minute. Find the half-life.
---
Corrected: 500 → 125 counts per minute, a factor of 4 = two half-lives. Half-life = 15 minutes.
```

```question
half-life-steps
```

## Summary

- Activity in Bq; count rate is what a detector records.
- Half-life: time for N (or activity) to halve; $N = N_0(\tfrac{1}{2})^n$.
- Subtract background radiation before analysing count rates.
