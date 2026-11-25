import { useMemo, useState } from 'react';
import { Link, NavLink, useParams, useSearchParams } from 'react-router-dom';
import { allTopics, getSubject, getTopic, subjects, type Flashcard as Card, type Topic } from '../content';
import { Page, PageHeader } from '../components/AppShell';
import { Flashcard } from '../components/Flashcard';
import { FormulaSheet } from '../components/FormulaSheet';
import { FormulaCard } from '../components/FormulaCard';
import { Icon } from '../components/Icon';
import { Markdown } from '../components/Markdown';
import { ProgressBar } from '../components/ProgressBar';
import { dueCards } from '../lib/recommend';
import { isDue, isLearned } from '../lib/srs';
import { pct, weakConcepts, weakTopics } from '../lib/stats';
import { useProgress, useStudyState } from '../store/progress';

const TABS = [
  { to: '/revise', label: 'Quick revision', end: true },
  { to: '/revise/flashcards', label: 'Flashcards' },
  { to: '/revise/formulas', label: 'Formula sheet' },
  { to: '/revise/weak', label: 'Weak topics' },
];

function TopicPicker({ value, onChange, filter }: { value: string; onChange: (key: string) => void; filter: (t: Topic) => boolean }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="input h-10 w-full max-w-md appearance-none bg-[length:16px] bg-[right_0.75rem_center] bg-no-repeat pr-9"
      style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2371717a' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")" }}
      aria-label="Topic"
    >
      <option value="">Choose a topic…</option>
      {subjects.map((s) => (
        <optgroup key={s.id} label={s.title}>
          {s.topics.filter(filter).map((t) => (
            <option key={t.key} value={t.key}>
              {t.code} {t.title}
            </option>
          ))}
        </optgroup>
      ))}
    </select>
  );
}

function QuickRevision() {
  const [params, setParams] = useSearchParams();
  const key = params.get('topic') ?? '';
  const topic = getTopic(key);
  const hasSheet = (t: Topic) => t.lessons.length > 0;

  const sheet = useMemo(() => {
    if (!topic) return null;
    const lessons = topic.lessons;
    return {
      concepts: lessons.map((l) => ({ title: l.meta.title, summary: l.meta.summary, href: l.href })),
      formulas: lessons.flatMap((l) => l.meta.formulas.map((f) => ({ f, from: l.meta.title }))),
      definitions: lessons.flatMap((l) => l.meta.definitions),
      mistakes: lessons.flatMap((l) => l.meta.mistakes),
      tips: lessons.flatMap((l) => l.meta.tips),
    };
  }, [topic]);

  return (
    <div>
      <TopicPicker value={key} onChange={(k) => setParams(k ? { topic: k } : {})} filter={hasSheet} />
      {!topic || !sheet ? (
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {allTopics()
            .filter(hasSheet)
            .map((t) => (
              <button key={t.key} type="button" onClick={() => setParams({ topic: t.key })} className="card card-hover p-4 text-left">
                <p className="text-xs text-muted">{getSubject(t.subjectId)!.short}</p>
                <p className="mt-1 font-medium text-ink">
                  {t.code} {t.title}
                </p>
                <p className="mt-1 text-sm text-muted">
                  {t.lessons.reduce((n, l) => n + l.meta.formulas.length, 0)} formulas ·{' '}
                  {t.lessons.reduce((n, l) => n + l.meta.definitions.length, 0)} definitions
                </p>
              </button>
            ))}
        </div>
      ) : (
        <div className="animate-rise mt-8 space-y-10">
          <section>
            <h2 className="mb-3 font-semibold text-ink">Key concepts</h2>
            <ul className="card divide-y divide-line">
              {sheet.concepts.map((c) => (
                <li key={c.href}>
                  <Link to={c.href} className="flex items-start gap-3 px-4 py-3 hover:bg-sunken/60">
                    <Icon name="bulb" className="mt-0.5 shrink-0 text-accent" />
                    <span>
                      <span className="block font-medium text-ink">{c.title}</span>
                      <span className="block text-sm text-ink-2">{c.summary}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
          {sheet.formulas.length > 0 && (
            <section>
              <h2 className="mb-3 font-semibold text-ink">Formulas</h2>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {sheet.formulas.map(({ f, from }) => (
                  <FormulaCard key={from + f.name} formula={f} context={from} />
                ))}
              </div>
            </section>
          )}
          {sheet.definitions.length > 0 && (
            <section>
              <h2 className="mb-3 font-semibold text-ink">Definitions</h2>
              <dl className="card divide-y divide-line">
                {sheet.definitions.map((d) => (
                  <div key={d.term} className="grid gap-1 px-4 py-3 sm:grid-cols-[200px_1fr] sm:gap-4">
                    <dt className="font-medium text-ink">{d.term}</dt>
                    <dd className="prose-lesson prose-tight text-[0.95rem]">
                      <Markdown>{d.definition}</Markdown>
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          )}
          <div className="grid gap-6 md:grid-cols-2">
            {sheet.mistakes.length > 0 && (
              <section className="rounded-xl border border-warn/30 bg-warn-soft p-5">
                <h2 className="mb-3 flex items-center gap-2 font-semibold text-warn">
                  <Icon name="alert" size={16} /> Common mistakes
                </h2>
                <ul className="prose-lesson prose-tight list-disc pl-5 text-[0.95rem] text-ink">
                  {sheet.mistakes.map((m) => (
                    <li key={m}>
                      <Markdown>{m}</Markdown>
                    </li>
                  ))}
                </ul>
              </section>
            )}
            {sheet.tips.length > 0 && (
              <section className="rounded-xl border border-accent/30 bg-accent-soft p-5">
                <h2 className="mb-3 flex items-center gap-2 font-semibold text-accent">
                  <Icon name="bulb" size={16} /> Exam tips
                </h2>
                <ul className="prose-lesson prose-tight list-disc pl-5 text-[0.95rem] text-ink">
                  {sheet.tips.map((m) => (
                    <li key={m}>
                      <Markdown>{m}</Markdown>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function Flashcards() {
  const [params, setParams] = useSearchParams();
  const key = params.get('topic') ?? '';
  const topic = getTopic(key);
  const cards = useProgress((s) => s.cards);
  const grade = useProgress((s) => s.gradeCard);
  const state = useStudyState();

  // The deck is fixed when the session starts; "again" sends a card to the back.
  const initialDeck = useMemo((): Card[] => {
    if (topic) {
      const due = topic.flashcards.filter((c) => isDue(cards[c.key]));
      return due.length ? due : topic.flashcards;
    }
    return dueCards(state, cards);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
  const [queue, setQueue] = useState<Card[]>(initialDeck);
  const [reviewed, setReviewed] = useState(0);
  const [deckKey, setDeckKey] = useState(key);
  if (deckKey !== key) {
    setDeckKey(key);
    setQueue(initialDeck);
    setReviewed(0);
  }

  const withCards = (t: Topic) => t.flashcards.length > 0;
  const card = queue[0];

  return (
    <div>
      <TopicPicker value={key} onChange={(k) => setParams(k ? { topic: k } : {})} filter={withCards} />

      {!card ? (
        <div className="mt-8">
          {reviewed > 0 ? (
            <div className="card animate-rise p-8 text-center">
              <Icon name="check" size={28} className="mx-auto text-good" />
              <p className="mt-3 text-lg font-semibold text-ink">Deck done — {reviewed} reviews</p>
              <p className="mt-1 text-sm text-muted">Cards will come back when they are due.</p>
            </div>
          ) : (
            <p className="mb-6 text-ink-2">{key ? 'This topic has no flashcards yet.' : 'Nothing is due right now. Pick a topic to study its cards.'}</p>
          )}
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {allTopics()
              .filter(withCards)
              .map((t) => {
                const learned = t.flashcards.filter((c) => isLearned(cards[c.key])).length;
                const due = t.flashcards.filter((c) => cards[c.key] && isDue(cards[c.key])).length;
                return (
                  <button key={t.key} type="button" onClick={() => setParams({ topic: t.key })} className="card card-hover p-4 text-left">
                    <p className="text-xs text-muted">{getSubject(t.subjectId)!.short}</p>
                    <p className="mt-1 font-medium text-ink">
                      {t.code} {t.title}
                    </p>
                    <p className="mt-1 text-sm text-muted">
                      {t.flashcards.length} cards · {learned} learned{due ? ` · ${due} due` : ''}
                    </p>
                    <ProgressBar value={learned / t.flashcards.length} size="sm" className="mt-3" label="Cards learned" />
                  </button>
                );
              })}
          </div>
        </div>
      ) : (
        <div className="mx-auto mt-8 max-w-xl">
          <div className="mb-3 flex justify-between text-sm text-muted">
            <span>{topic ? topic.title : 'Due today'}</span>
            <span>{queue.length} left</span>
          </div>
          <Flashcard
            card={card}
            context={`${getTopic(card.topicKey)!.code} · ${card.concept ?? getTopic(card.topicKey)!.title}`}
            onGrade={(g) => {
              grade(card.key, g);
              setReviewed((n) => n + 1);
              setQueue((q) => (g === 'again' ? [...q.slice(1), q[0]] : q.slice(1)));
            }}
          />
        </div>
      )}
    </div>
  );
}

function WeakTopics() {
  const state = useStudyState();
  const topics = weakTopics(state);
  const concepts = weakConcepts(state);
  if (!topics.length && !concepts.length) {
    return (
      <div className="card p-8 text-center">
        <p className="font-medium text-ink">Nothing needs attention yet</p>
        <p className="mx-auto mt-1 max-w-md text-sm text-muted">
          After you answer a few questions in a topic, any topic or concept where your recent accuracy is under 60% is listed here.
        </p>
        <Link to="/practice" className="btn-primary mt-5">
          Go to practice
        </Link>
      </div>
    );
  }
  const bySubject = subjects
    .map((s) => ({ s, items: topics.filter((w) => w.topic.subjectId === s.id) }))
    .filter((g) => g.items.length);
  return (
    <div className="space-y-8">
      {bySubject.length > 0 && (
        <section>
          <div className="mb-3 flex items-baseline justify-between">
            <h2 className="font-semibold text-ink">Needs attention</h2>
            <Link to="/practice?mode=weak" className="text-sm text-accent hover:underline">
              Practise all
            </Link>
          </div>
          <div className="space-y-4">
            {bySubject.map(({ s, items }) => (
              <div key={s.id} className="card p-2">
                <p className="eyebrow px-3 pb-1 pt-2">{s.title}</p>
                {items.map((w) => (
                  <Link key={w.topic.key} to={`/practice?topic=${encodeURIComponent(w.topic.key)}`} className="flex items-center gap-4 rounded-lg px-3 py-3 hover:bg-sunken">
                    <span className="flex-1 font-medium text-ink">
                      {w.topic.code} {w.topic.title}
                    </span>
                    <span className="text-xs text-muted">{w.attempts} attempts</span>
                    <span className="w-24">
                      <span className="mb-1 block text-right text-xs font-medium text-bad">{pct(w.accuracy)}</span>
                      <ProgressBar value={w.accuracy} size="sm" tone="bad" label="Accuracy" />
                    </span>
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </section>
      )}
      {concepts.length > 0 && (
        <section>
          <h2 className="mb-3 font-semibold text-ink">Weak concepts</h2>
          <ul className="card divide-y divide-line">
            {concepts.map((c) => (
              <li key={c.topic.key + c.concept} className="flex items-center gap-4 px-4 py-3">
                <span className="flex-1">
                  <span className="block text-ink">{c.concept}</span>
                  <span className="block text-xs text-muted">
                    {getSubject(c.topic.subjectId)!.short} · {c.topic.title}
                  </span>
                </span>
                <span className="text-sm font-medium text-bad">{pct(c.accuracy)}</span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

export default function Revise() {
  const { tab } = useParams();
  return (
    <Page>
      <PageHeader title="Revise">Condensed sheets, spaced-repetition flashcards and the topics that need you most.</PageHeader>
      <nav className="no-print mb-8 flex gap-1 overflow-x-auto overflow-y-hidden border-b border-line [scrollbar-width:none]" aria-label="Revision sections">
        {TABS.map((t) => (
          <NavLink
            key={t.to}
            to={t.to}
            end={t.end}
            className={({ isActive }) =>
              `-mb-px shrink-0 whitespace-nowrap border-b-2 px-3 pb-3 text-sm font-medium transition-colors ${isActive ? 'border-accent text-ink' : 'border-transparent text-muted hover:text-ink'}`
            }
          >
            {t.label}
          </NavLink>
        ))}
      </nav>
      {tab === 'flashcards' ? <Flashcards /> : tab === 'formulas' ? <FormulaSheet /> : tab === 'weak' ? <WeakTopics /> : <QuickRevision />}
    </Page>
  );
}
