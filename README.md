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

## Going online (accounts that sync across devices)

The deployed site is private: everyone signs in with their own username and
password, and each account’s progress is saved on the server and synced to
every device they use. `middleware.ts` sends signed-out visitors to `/login`
and blocks the private files; `api/index.ts` (code in `server/`) handles
sign-in, accounts and progress.

1. Install the CLI and sign in: `npm i -g vercel`, then `vercel login`.
2. From this folder run `vercel link` once (create a new project).
3. In the Vercel dashboard → your project → **Storage** (or Marketplace), add
   **Upstash for Redis** (free tier) and connect it to the project. It sets
   `KV_REST_API_URL` and `KV_REST_API_TOKEN` for you.
4. In Settings → Environment Variables add, for Production and Preview:
   * `ADMIN_USER` — your username (lowercase, e.g. `owner`)
   * `ADMIN_PASSWORD` — your password (long and unique)
   * `SESSION_SECRET` — a long random string, e.g. the output of
     `node -e "console.log(crypto.randomUUID()+crypto.randomUUID())"`
5. Deploy from this computer: `vercel --prod`.
6. Open the site, sign in as yourself, and go to **Settings → People** to add
   an account for each friend. Send them the link, their username and the
   password; they can change it in Settings.

The first time you sign in on a device that already has progress from before
accounts existed, it is moved into your (owner) account automatically.
Removing a friend deletes their saved progress and stops their access to the
API at once; their browser session expires within 7 days at most.

If any of the variables is missing the site refuses to let anyone in (it
fails closed). Locally, `npm run dev` runs the same API with a file database
in `.data/` (git-ignored) and the login `admin` / `admin-dev-pass`.

Deploy from your own computer: `vite build` copies the private past-paper
bank from the git-ignored `resources/` folder into `dist/data/` when it
exists. A build triggered from GitHub never sees `resources/`, so it works
but has no Past papers.

`vercel.json` rewrites every route to the single-page app.

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

Progress is kept in `src/store/progress.ts` (one localStorage copy per
account, so people sharing a device never mix) and synced to the server by
`src/lib/sync.ts`: changes are sent a couple of seconds after they happen,
fetched again when the tab regains focus, and merged without losing work if
two devices changed at once (`src/lib/syncMerge.ts`). It keeps working
offline and catches up when the connection returns.

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
code: A.1.3                # syllabus code shown in lists and on the Syllabus page
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

```examtip
An exam-technique callout.
```

```svg
caption: One-line caption shown under the figure.
<svg viewBox="0 0 400 200"> … </svg>
```

```plot
caption: y = sin x and its derivative
x: 0, 6.28
y: -1.2, 1.2
f: sin(x) | y = sin x
f: cos(x) | y = cos x
point: 1.57, 1 | max
vline: 3.14
hline: 0
xlabel: x
ylabel: y
```
````

`diagram` takes the name of a component in `src/diagrams/index.tsx`.
`question` embeds a question from the topic’s `questions.json` by id.
`svg` renders inline SVG (sanitised; use `currentColor` and the CSS colour
variables such as `var(--accent)` so it works in dark mode, and give every
`<marker id>` a unique prefix because the Print page shows many lessons at
once). `plot` draws function graphs with the built-in expression evaluator
(`+ - * / ^`, `sqrt sin cos tan ln log exp abs`, `pi`, `e` — no comparisons).

YAML tip: a list item in the frontmatter must not start with a quote mark,
a `|` or contain `": "`; rephrase instead.

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

### 6. CBSE links

Topics (or whole units) can carry `cbse` links that show a “CBSE” box on the
topic page with the matching NCERT chapter and a Prashant Kirad video search:

```json
"cbse": [{ "class": 12, "chapter": "Ch 4 Moving Charges and Magnetism",
           "video": "https://www.youtube.com/results?search_query=…", "note": "optional" }]
```

`python -I -X utf8 scripts/cbse_map.py` regenerates them for all subjects.

## Other pages

* **Syllabus** (`/syllabus`) — a checklist of every unit, topic and lesson per
  subject, with an SL/HL filter; ticking a lesson marks it complete.
* **Print** (`/print`) — choose topics and print (or save as PDF) their lessons
  with formulas, definitions, mistakes and tips in a clean layout.
* **Questions** (`/bank`) — filter by subject, unit/topic, paper,
  difficulty and your own progress (not tried / to review / got it), or
  shuffle; *General* holds the original questions from `exam.json`, *Past
  papers* the private bank (below). After reading a markscheme, mark yourself
  *Got it / Partly / Missed*; multiple-choice answers are marked automatically.
* **Revise → Formula sheet** — every formula in a subject, by topic,
  searchable and printable.
* **Keyboard shortcuts** — press `?` anywhere; in lessons `←`/`→` move between
  lessons, `M` marks complete, `N` opens notes.
* **Reading** — lessons offer to continue where you stopped; lesson text size
  is in Settings. The Revise tab shows how many flashcards are due.
* **Install** — the site has a web-app manifest, so “Add to Home Screen”
  (iPhone/iPad) or “Install app” (Android/Chrome) gives it an app icon.
  `python -I -X utf8 scripts/make_icons.py` regenerates the icons.

## Private material (never committed)

The git-ignored `resources/` folder holds reference material used while
writing lessons (revision-note PDFs, textbooks) and the private past-paper
bank. `dev/localResources.ts` serves `/data/bank.json`, `/data/bank/<image>`
and `/data/papers/<pdf>` from it during `npm run dev`, and copies them into
`dist/data/` during `vite build` — only when the folder exists, so the public
repository and GitHub-triggered builds never contain them.

* `npm run import:papers -- --session "May 2024"` parses papers placed in
  `resources/past-papers/` into `resources/question-bank/`.
* `python -I -X utf8 scripts/import_questionbank.py` converts a locally saved
  question bank (`resources/questionbank-src/`) into Past papers questions.
* `python -I -X utf8 scripts/extract_notes.py` extracts text and figures from
  the reference PDFs into `resources/extracted/` for reference while writing.

Plan and structure: [`docs/`](docs/content-plan.md).

## Content policy

Course *structure* (subject, unit and topic names and codes) follows the
public IB subject guides. Everything students read — explanations, worked
examples, diagrams, questions and flashcards — must be written from scratch.
Don’t paste text, questions or mark schemes from IB past papers or other
revision sites; link to legitimate free resources instead.
