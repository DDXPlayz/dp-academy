# Content plan

How DP Academy's lessons, diagrams and questions are organised and produced
for Physics HL, Chemistry HL and Mathematics: analysis and approaches HL.
Per-topic tables are in [`docs/structure/`](structure/).

## 1. Structure and numbering

Every lesson sits at a fixed place in the syllabus:

```
subject  →  unit         →  topic (guide code)  →  sub-idea lessons (in guide order)
Physics     A Space, time…   A.1 Kinematics        A.1.1, A.1.2, A.1.3 …
Chemistry   S1 Models of…    S1.4 The mole         S1.4.1 … S1.4.6
Math AA     1 Number and…    1.2 Arithmetic seq.   1.2.1, 1.2.2 …
```

| Subject | Guide | Topics | Sub-ideas | Planned lessons | How sub-ideas become lessons |
|---|---|---|---|---|---|
| Physics | 2025 | 24 | 263 | ~97 | Guide understandings are unnumbered; numbered here in guide order and grouped 2–4 per lesson. AHL ideas get their own lessons. |
| Chemistry | 2025 | 22 | 165 | ~165 | The guide numbers its understandings (S1.4.1 …); one lesson each. |
| Math AA | 2021 | 83 | 249 | ~146 | Each guide subtopic (1.1–5.19) is a topic; its content statements become 1–2 lessons. |

* Lesson files keep the existing layout, `content/<subject>/<topic>/lessons/<nn>-<slug>.md`,
  where `<nn>` is the sub-idea number. Frontmatter gains a `code` field
  (`code: S1.4.3`) shown in the reader, the topic list and search.
* HL is the default view everywhere. AHL lessons carry `hl: true` and are hidden at SL.
* Math AA topics are the guide's 83 subtopics (1.1–5.19), so topic codes match the guide, notes and
  past papers one to one. The guide gives teaching hours per unit only (SL/HL: 19/39, 21/32, 25/51,
  27/33, 28/55), so Math AA topics carry no per-topic hours.
* The first Math lesson (arithmetic and geometric sequences) currently sits in 1.2 and covers
  1.2, 1.3, 1.4 and 1.8; it is split into sub-idea lessons when Math AA is written.

## 2. Lessons

Each lesson follows the existing template: objectives, explanation, key ideas,
formulas, definitions, worked examples, common mistakes, exam tips and summary,
plus embedded practice questions.

**How the text is produced.** Lessons are written from scratch for DP Academy,
starting from the guide's understanding for that sub-idea. Private reference
material on the author's computer is used only to check scope and depth
(nothing missed, nothing beyond the syllabus). Its wording, examples and
questions are never copied or paraphrased into `content/`. Textbooks, when
available, are used to check facts and order. Constants and equations follow
the IB data booklet.

## 3. Diagrams

All diagrams are drawn for DP Academy as React SVG components in
`src/diagrams/`, designed from the underlying physics, chemistry or maths
rather than traced from any book or note. They use the app's colour tokens, so
they work in light and dark themes and scale on phones. Where it helps,
diagrams are interactive (a slider or a draggable point).

| Subject | Diagram families (examples) |
|---|---|
| Physics | motion graphs (s–t, v–t, a–t), projectile paths, free-body diagrams, momentum and collisions, torque and rotation, P–V cycles, circuits, SHM and phase, wave and standing-wave patterns, interference and diffraction, field lines and equipotentials, energy levels, decay curves, binding-energy curve, HR diagram |
| Chemistry | particle models, orbital diagrams and energy levels, mass spectra, lattice and bonding models, VSEPR shapes, hybridisation, energy profiles, Hess and Born–Haber cycles, Maxwell–Boltzmann curves, equilibrium graphs, titration curves, voltaic and electrolytic cells, curly-arrow mechanisms, IR/NMR spectra |
| Math AA | number lines and sequences, function graphs and transformations, the unit circle and trig graphs, 3D geometry, vectors, lines and planes, Argand diagrams, statistical charts, Venn and tree diagrams, normal curves, tangent and area diagrams, slope fields |

Estimated 150–200 diagrams in total; each lesson lists the ones it needs before it is written.

## 4. Questions

| Kind | Where | What it is |
|---|---|---|
| Practice questions | `<topic>/questions.json` | Auto-marked checks embedded in lessons and used by quizzes and weak-topic tracking (mcq, multi, tf, numeric, short, expression). Target 8–12 per topic. |
| Flashcards | `<topic>/flashcards.json` | Spaced-repetition cards for definitions, equations and key facts. Target 8–15 per topic. |
| Question bank: **General** | `<topic>/exam.json` | Original exam-style questions by paper (Physics/Chemistry 1A, 1B, 2; Math 1, 2, 3), difficulty (easy/medium/hard), marks and markscheme. Target: at least one easy, medium and hard question per topic across its papers. 41 written so far, covering every paper × difficulty. |
| Question bank: **Past papers** | local only | Past-paper and mock questions imported by `npm run import:papers` into the git-ignored `resources/question-bank/`. They appear in local development only and are never committed or deployed. |

Every bank question shows its source label ("Original · DP Academy" or
"Past paper · session · paper · question"). `content:check` rejects any
non-original question placed under `content/`.

## 5. Build order

1. Structure: update each `subject.json` to the guide, add the lesson `code` field, renumber the existing lessons (Physics A.1–A.3, Chemistry S1.4, Math sequences).
2. Physics, theme by theme (A → E): lessons, diagrams, practice questions, flashcards, bank questions. Commit after each topic; checkpoint after each theme.
3. Chemistry, Structure 1 → Reactivity 3, same per-topic loop.
4. Math AA, topics 1 → 5, same loop.
5. After each theme: `npm test`, `npm run content:check`, `npm run build`, a leak scan of `dist/`, and a browser check of the new topics.

## 6. Open decisions

* **Past papers.** Which papers may be imported. The importer only reads `resources/past-papers/` and is meant for papers from school, bought from the IB store, or IB-published specimens.
* **Textbooks.** None are on this computer yet; adding them lets facts and chapter order be cross-checked.
