---
code: T2.1
title: Sensors, spreadsheets and simulations
summary: Using data loggers to collect data, spreadsheets to process it, and computer models to test ideas.
minutes: 20
difficulty: 1
objectives:
  - Describe the advantages of sensors and data loggers for collecting data.
  - Use spreadsheets to process data, calculate derived quantities and plot graphs.
  - Explain how computer simulations and models are used to test hypotheses.
definitions:
  - term: Data logger
    definition: A device that records readings from sensors automatically at set time intervals.
  - term: Sampling rate
    definition: The number of readings a data logger takes per second.
  - term: Simulation
    definition: A computer model of a physical system, used to make predictions or explore situations that are hard to test directly.
mistakes:
  - Choosing a sampling rate too low to capture a fast event (like a collision).
  - Trusting a simulation without checking its predictions against real data.
tips:
  - In a spreadsheet, write formulas once and fill down, so every derived value uses the same calculation.
related:
  - physics/t1-experimental-techniques
  - physics/t3-mathematics
---

## Sensors and data loggers

Sensors (motion sensors, light gates, temperature probes, force plates, pressure sensors) connected to a **data logger** have big advantages:

- they record **many readings** at high **sampling rates** — essential for fast events like collisions;
- they remove **human reaction time**;
- they can record **over long periods** without anyone watching;
- data go straight into a computer for analysis.

Their limits: they need **calibration**, have their own resolution and response time, and can hide what is really happening if used without thought.

## Spreadsheets

```keyidea
A spreadsheet turns raw data into processed data and graphs quickly and consistently: calculate means, derived quantities (like T² or 1/V), uncertainties, then plot and fit trend lines.
```

Good practice: label column headers with quantity and unit (e.g. "T² / s²"), keep raw and processed data separate, and keep consistent significant figures.

## Simulations and models

Computer **simulations** model systems that are too large, small, fast, slow, dangerous or expensive to test directly — planetary orbits, nuclear reactors, climate. A model is only as good as its assumptions: compare predictions with experimental data, and refine it if they disagree.

```question
logger-advantage
```

## Summary

- Sensors + data loggers: many readings, high sampling rates, no reaction time.
- Spreadsheets process data consistently and plot graphs with trend lines.
- Simulations test ideas but must be checked against real data.
