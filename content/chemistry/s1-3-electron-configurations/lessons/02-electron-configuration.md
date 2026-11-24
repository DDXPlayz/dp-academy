---
code: S1.3.3
title: Writing electron configurations
summary: Main energy levels, sublevels and orbitals, and how to write full and condensed electron configurations using the aufbau principle, Hund’s rule and the Pauli principle.
minutes: 35
difficulty: 2
objectives:
  - State that a main energy level n holds up to 2n² electrons.
  - Describe s, p, d and f sublevels and the shapes of s and p orbitals.
  - Write full and condensed electron configurations and orbital diagrams for atoms and ions up to Z = 36.
  - Apply the aufbau principle, Hund’s rule and the Pauli exclusion principle, including the exceptions Cr and Cu.
definitions:
  - term: Orbital
    definition: A region of space where there is a high probability of finding an electron; each orbital holds at most two electrons of opposite spin.
  - term: Aufbau principle
    definition: Electrons fill orbitals in order of increasing energy.
  - term: Hund’s rule
    definition: Electrons occupy orbitals of the same sublevel singly, with parallel spins, before pairing.
  - term: Pauli exclusion principle
    definition: An orbital can hold at most two electrons, and they must have opposite spins.
mistakes:
  - Removing 3d electrons before 4s when forming transition metal ions. The 4s electrons are lost first.
  - Writing Cr as [Ar]3d⁴4s². It is [Ar]3d⁵4s¹ (and Cu is [Ar]3d¹⁰4s¹).
tips:
  - Filling order — 1s 2s 2p 3s 3p 4s 3d 4p. Read it off the periodic table by blocks.
  - Condensed form — write the previous noble gas in square brackets, e.g. Na = [Ne]3s¹.
related:
  - chemistry/s3-1-periodic-table
---

## Levels, sublevels and orbitals

- Each **main energy level** $n$ holds up to $2n^2$ electrons (2, 8, 18, 32).
- Each level splits into **sublevels**: s, p, d, f.
- Each sublevel contains **orbitals**, each holding up to 2 electrons.

| Sublevel | Orbitals | Max electrons |
|---|---|---|
| s | 1 | 2 |
| p | 3 | 6 |
| d | 5 | 10 |
| f | 7 | 14 |

**Shapes:** s orbitals are spherical; p orbitals are dumbbell-shaped, with three ($p_x$, $p_y$, $p_z$) at right angles to each other.

## Filling order

```keyidea
Aufbau: fill the lowest energy orbitals first — 1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p. Hund: spread out singly with parallel spins before pairing. Pauli: at most two electrons per orbital, with opposite spins.
```

```example
Write the full and condensed configurations of iron (Z = 26), and draw its 3d and 4s orbital diagram.
---
Full: 1s² 2s² 2p⁶ 3s² 3p⁶ 4s² 3d⁶. Condensed: [Ar] 4s² 3d⁶.

3d: [↑↓][↑][↑][↑][↑]   4s: [↑↓] — four unpaired electrons, by Hund’s rule.
```

## Exceptions: chromium and copper

A half-filled or completely filled d sublevel is especially stable:

- Cr: [Ar] 3d⁵ 4s¹ (not 3d⁴ 4s²);
- Cu: [Ar] 3d¹⁰ 4s¹ (not 3d⁹ 4s²).

## Ions

- **Anions**: add electrons to the next available orbital. O²⁻ = 1s² 2s² 2p⁶.
- **Cations**: remove electrons from the highest $n$ first. For transition metals, **4s before 3d**.

```example
Write the configuration of Fe³⁺.
---
Fe = [Ar] 4s² 3d⁶. Remove two 4s electrons, then one 3d: Fe³⁺ = [Ar] 3d⁵.
```

```question
config-write
```

## Summary

- Level $n$ holds $2n^2$; sublevels s, p, d, f hold 2, 6, 10, 14.
- Fill by aufbau, Hund and Pauli; Cr and Cu are exceptions.
- Transition metal ions lose 4s electrons before 3d.
