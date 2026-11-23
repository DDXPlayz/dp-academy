# DP Academy

A free, independent study platform for the IB Diploma Programme: curriculum
trees, distraction-free lessons, an original practice-question engine,
spaced-repetition flashcards, weak-topic tracking and global search.

DP Academy is not affiliated with or endorsed by the International
Baccalaureate Organization. All explanations, examples, diagrams and
questions are original.

## Running it

```bash
npm install
npm run dev          # http://localhost:5173
npm test             # unit tests + content validation
npm run build        # type-check and build to dist/
```

Deploy by importing the repo into Vercel — it detects Vite, and `vercel.json`
rewrites every route to the single-page app.

## How it is organised

```
content/                     ← all course material (no code)
  <subject>/subject.json     ← units and topics: the curriculum tree
  <subject>/<topic>/
    lessons/01-<slug>.md     ← one Markdown file per lesson
    questions.json           ← practice questions for the topic
    flashcards.json          ← flashcards for the topic
src/
  content/                   ← schema (zod) + loader that builds the graph
  components/                ← AppShell, LessonReader parts, QuestionCard, Quiz, Flashcard…
  pages/                     ← one file per route
  lib/                       ← answer checking, stats, spaced repetition, search
  store/progress.ts          ← all student data, persisted to localStorage
  diagrams/                  ← original SVG diagrams referenced by lessons
```

Progress lives only in the browser (`localStorage`, key `dp-academy:v1`).
Settings → Export/Import moves it between devices. Every read and write goes
through `src/store/progress.ts`, so a hosted backend (Supabase, Firebase…)
can replace the `storage` option there later without touching pages.

## Adding content

Everything is validated: `npm run content:check` fails with a precise message
if a file doesn’t match the schema, an id is duplicated, or a lesson embeds a
question that doesn’t exist.

### 1. A subject

Create `content/<subject-id>/subject.json`:

```json
{
  "id": "biology",
  "title": "Biology",
  "short": "Biology",
  "group": "Group 4 · Sciences",
  "levels": ["SL", "HL"],
  "description": "One sentence shown on the subject card.",
  "colour": "#16a34a",
  "units": [
    {
      "id": "unity-diversity",
      "code": "A",
      "title": "Unity and diversity",
      "topics": [
        { "id": "a1-water", "code": "A1.1", "title": "Water", "summary": "…", "hours": 3 },
        { "id": "a1-origins", "code": "A1.2", "title": "Origins of cells", "summary": "…", "hours": 3, "hl": true }
      ]
    }
  ]
}
```

Ids are lowercase-kebab-case. Topics without lessons still appear in the
curriculum tree, marked “lessons coming soon”.

### 2. A lesson

Create `content/<subject>/<topic>/lessons/<nn>-<slug>.md`. The number sets
the order; the slug becomes the URL. Frontmatter holds the structured parts
of the lesson template; the body holds the explanation.

```markdown
---
title: Projectile motion
summary: One sentence shown in lists and on the dashboard.
minutes: 30
difficulty: 2            # 1 Foundation · 2 Standard · 3 Challenging
hl: false                # true for HL-only lessons
objectives: [ … ]
prerequisites: [ … ]
formulas:
  - name: Horizontal component
    latex: 'u_x = u\cos\theta'      # single quotes keep backslashes literal
    where: θ is the launch angle.
definitions:
  - term: Range
    definition: The horizontal distance travelled…
mistakes: [ … ]
tips: [ … ]
related: [physics/a2-forces-momentum]   # <subject>/<topic> keys
---

## Introduction
Normal Markdown with $inline$ and $$display$$ maths.
```

Formulas, definitions, common mistakes, exam tips and related topics are
rendered at the end of the lesson automatically and also feed Quick Revision
and search. Keep maths out of `##` headings — they become the table of
contents.

Special blocks in the body:

````markdown
```keyidea
A highlighted key idea (Markdown inside).
```

```mistake
A common-mistake callout.
```

```example
The worked-example question.
---
The solution, hidden until the student opens it.
```

```diagram
projectile
```

```question
time-of-flight
```
````

`diagram` takes the name of a component in `src/diagrams/index.tsx`.
`question` embeds a question from the topic’s `questions.json` by id.

### 3. Questions

`questions.json` is an array. Every question has `id`, `type`, `prompt`,
`explanation`, `concept` (used for weak-concept tracking), `difficulty` and an
optional `lesson` slug for the “related lesson” link. Then, by type:

| type | extra fields | student enters |
|---|---|---|
| `mcq` | `options`, `answer` (index) | one option |
| `multi` | `options`, `answers` (indices) | all correct options |
| `tf` | `answer` (boolean) | true / false |
| `numeric` | `answer`, `tolerance` (relative, default 0.02), `unit` | a number — `3.2e4`, `3.2 x 10^4` and trailing units all work |
| `short` | `accept` (list of strings) | text, compared ignoring case and punctuation |
| `expression` | `variables`, `answer` (e.g. `"u^2/(2*g)"`) | a formula, checked for algebraic equivalence |

Prompts and explanations are Markdown with maths. Inside JSON, escape
backslashes: `"$\\frac{1}{2}mv^2$"`.

### 4. Flashcards

`flashcards.json` is an array of `{ "id", "front", "back", "concept"? }`,
both sides in Markdown.

### 5. Question bank

`exam.json` (next to `questions.json`) holds original exam-style questions
for the Question bank page (`/bank`):

```json
{ "id": "p2-car-resultant-force", "paper": "2", "difficulty": "easy",
  "source": "original", "marks": 3, "level": "HL",
  "prompt": "…", "markscheme": "…",
  "options": ["…"], "answer": 0 }
```

`paper` is `1A`, `1B` or `2` for the sciences and `1`, `2` or `3` for Math AA.
`level` is omitted for questions at both levels; `options` and `answer` are
only for multiple choice. Only `"source": "original"` is allowed under
`content/`; `content:check` fails otherwise.

### Local-only material

Private study material lives in the git-ignored `resources/` folder and is
served by a dev-server plugin (`dev/localResources.ts`, `apply: 'serve'`):

* Topic pages show a **Reference notes (private)** panel in `npm run dev` only.
* `npm run import:papers -- --session "May 2024"` parses papers placed in
  `resources/past-papers/` into `resources/question-bank/`; they appear under
  **Past papers** in `npm run dev` only.

* `python -I -X utf8 scripts/extract_notes.py [--only <subject>] [--source sme|iitian]`
  converts the revision-note PDFs into lessons in `resources/extracted/`; topic
  pages list them and open them in the lesson reader.
* `python -I -X utf8 scripts/import_questionbank.py` converts a locally saved
  question bank (`resources/questionbank-src/`) into Past papers questions.

Production builds contain none of it. Plan and structure: [`docs/`](docs/content-plan.md).

## Content policy

Course *structure* (subject, unit and topic names and codes) follows the
public IB subject guides. Everything students read — explanations, worked
examples, diagrams, questions and flashcards — must be written from scratch.
Don’t paste text, questions or mark schemes from IB past papers or other
revision sites; link to legitimate free resources instead.
