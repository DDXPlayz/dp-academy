import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { showMoment } from './PersonalTouches';
import { useSearchParams } from 'react-router-dom';
import { getLesson, getSubject, getTopic, subjects, type Flashcard as Card } from '../content';
import { isDue, isLearned } from '../lib/srs';
import { weakTopics } from '../lib/stats';
import {
  CARD_MODES,
  KIND_GROUPS,
  REVIEW_SOURCES,
  buildDeck,
  filterByKind,
  isReviewSource,
  kindCounts,
  lessonReviewCards,
  modeCounts,
  scopeLevel,
  sessionFromParams,
  sessionToParams,
  shuffled,
  topicsInScope,
  type CardMode,
  type KindGroupId,
  type Scope,
  type SelectionContext,
  type SessionMode,
  type SessionParams,
} from '../lib/revision';
import { useProgress, useStudyState } from '../store/progress';
import { Flashcard } from './Flashcard';
import { Icon } from './Icon';
import { ProgressBar } from './ProgressBar';

/*
 * The Flashcards tab of /revise: a session builder (scope, card kind, mode,
 * shuffle) whose state lives in the URL, and the session that runs from it.
 * Card modes grade through the spaced-repetition store; the Definitions and
 * Formulas modes flip lesson frontmatter and record nothing.
 */

const selectStyle = {
  backgroundImage:
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2371717a' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
};
const selectClass = 'input h-10 appearance-none bg-[length:16px] bg-[right_0.75rem_center] bg-no-repeat pr-9 disabled:opacity-50';

function useSelectionContext(scope: Scope): SelectionContext {
  const states = useProgress((s) => s.cards);
  const study = useStudyState();
  return useMemo(() => {
    const learnt = new Set<string>();
    for (const k of Object.keys(study.completed)) {
      const t = getLesson(k)?.topicKey;
      if (t) learnt.add(t);
    }
    return {
      states,
      weakTopics: new Set(weakTopics(study).map((w) => w.topic.key)),
      learntTopics: learnt,
      level: scopeLevel(scope),
    };
  }, [states, study, scope]);
}

function scopeTitle(scope: Scope): string {
  const subject = scope.subject ? getSubject(scope.subject) : undefined;
  if (!subject) return 'All subjects';
  if (scope.topic) {
    const t = getTopic(`${subject.id}/${scope.topic}`);
    if (t) return `${t.code} ${t.title}`;
  }
  if (scope.unit) {
    const u = subject.units.find((x) => x.id === scope.unit);
    if (u) return `${subject.short} · ${u.title}`;
  }
  return subject.title;
}

function modeTitle(mode: SessionMode): string {
  return CARD_MODES.find((m) => m.id === mode)?.label ?? REVIEW_SOURCES.find((m) => m.id === mode)?.label ?? '';
}

export function RevisionStudio() {
  const [params, setParams] = useSearchParams();
  const session = useMemo(() => sessionFromParams(params), [params]);
  const update = (patch: Partial<SessionParams>, replace = true) => setParams(sessionToParams({ ...session, ...patch }), { replace });

  // The legacy ?topic= link (topic pages, search) is rewritten to the new params.
  const legacy = params.has('topic');
  useEffect(() => {
    if (legacy) setParams(sessionToParams(session), { replace: true });
  }, [legacy, session, setParams]);

  return session.start ? (
    <Session session={session} onExit={() => update({ start: false }, false)} onCram={() => update({ mode: 'all' })} />
  ) : (
    <Builder session={session} update={update} />
  );
}

/* ---------- builder ---------- */

function Builder({ session, update }: { session: SessionParams; update: (p: Partial<SessionParams>, replace?: boolean) => void }) {
  const { scope, mode, kinds, shuffle } = session;
  const subject = scope.subject ? getSubject(scope.subject) : undefined;
  const topics = useMemo(() => topicsInScope(subjects, scope), [scope]);
  const ctx = useSelectionContext(scope);
  const states = ctx.states;
  const review = isReviewSource(mode);

  const pool = useMemo(() => topics.flatMap((t) => t.flashcards), [topics]);
  const byKind = useMemo(() => kindCounts(pool), [pool]);
  const filtered = useMemo(() => filterByKind(pool, kinds), [pool, kinds]);
  const counts = useMemo(() => modeCounts(filtered, ctx), [filtered, ctx]);
  const reviewCounts = useMemo(
    () => ({
      definitions: topics.reduce((n, t) => n + t.lessons.reduce((m, l) => m + l.meta.definitions.length, 0), 0),
      formulas: topics.reduce((n, t) => n + t.lessons.reduce((m, l) => m + l.meta.formulas.length, 0), 0),
    }),
    [topics],
  );
  const size = review ? reviewCounts[mode] : counts[mode as CardMode];

  const unitTopics = subject ? (scope.unit ? subject.units.find((u) => u.id === scope.unit)?.topics ?? [] : subject.topics) : [];
  const toggleKind = (k: KindGroupId) => update({ kinds: kinds.includes(k) ? kinds.filter((x) => x !== k) : [...kinds, k] });

  return (
    <div className="space-y-8">
      <div className="card space-y-6 p-4 sm:p-6">
        <Field label="What to revise">
          <div role="tablist" aria-label="Source" className="inline-flex max-w-full overflow-x-auto rounded-lg border border-line bg-sunken p-1">
            {[
              { id: 'cards', label: 'Flashcards', on: !review, set: () => update({ mode: 'due' }) },
              ...REVIEW_SOURCES.map((r) => ({ id: r.id, label: r.label, on: mode === r.id, set: () => update({ mode: r.id }) })),
            ].map((t) => (
              <button
                key={t.id}
                role="tab"
                type="button"
                aria-selected={t.on}
                onClick={t.set}
                className={`h-8 shrink-0 rounded-md px-3 text-sm font-medium ${t.on ? 'bg-card text-ink shadow-sm' : 'text-muted hover:text-ink'}`}
              >
                {t.label}
              </button>
            ))}
          </div>
          {review && <p className="mt-2 text-sm text-muted">{REVIEW_SOURCES.find((r) => r.id === mode)!.hint}. Flip through them; nothing is scheduled.</p>}
        </Field>

        <Field label="Scope">
          <div className="grid gap-2 sm:grid-cols-3">
            <select
              aria-label="Subject"
              className={selectClass}
              style={selectStyle}
              value={scope.subject ?? ''}
              onChange={(e) => update({ scope: e.target.value ? { subject: e.target.value } : {} })}
            >
              <option value="">All subjects (mixed)</option>
              {subjects.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.title}
                </option>
              ))}
            </select>
            <select
              aria-label="Unit"
              className={selectClass}
              style={selectStyle}
              disabled={!subject}
              value={scope.unit ?? ''}
              onChange={(e) => update({ scope: { subject: scope.subject, unit: e.target.value || undefined } })}
            >
              <option value="">All units</option>
              {subject?.units.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.code} {u.title}
                </option>
              ))}
            </select>
            <select
              aria-label="Topic"
              className={selectClass}
              style={selectStyle}
              disabled={!subject}
              value={scope.topic ?? ''}
              onChange={(e) => update({ scope: { ...scope, topic: e.target.value || undefined } })}
            >
              <option value="">All topics</option>
              {unitTopics.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.code} {t.title}
                </option>
              ))}
            </select>
          </div>
        </Field>

        {!review && (
          <>
            <Field label="Mode">
              <div className="grid gap-2 sm:grid-cols-2">
                {CARD_MODES.map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    aria-pressed={mode === m.id}
                    onClick={() => update({ mode: m.id })}
                    className={`rounded-lg border p-3 text-left transition-colors ${mode === m.id ? 'border-accent bg-accent-soft' : 'border-line hover:bg-sunken'}`}
                  >
                    <span className="flex items-baseline justify-between gap-2">
                      <span className="font-medium text-ink">{m.label}</span>
                      <span className="text-sm tabular-nums text-muted">{counts[m.id]}</span>
                    </span>
                    <span className="mt-0.5 block text-xs text-muted">{m.hint}</span>
                  </button>
                ))}
              </div>
            </Field>

            <Field label="Card types" hint={kinds.length ? undefined : 'All types'}>
              <div className="flex flex-wrap gap-2">
                {KIND_GROUPS.map((g) => {
                  const on = kinds.includes(g.id);
                  return (
                    <button
                      key={g.id}
                      type="button"
                      aria-pressed={on}
                      disabled={!byKind[g.id] && !on}
                      onClick={() => toggleKind(g.id)}
                      className={`chip h-8 px-3 transition-colors disabled:opacity-40 ${on ? 'bg-accent text-on-accent' : 'hover:text-ink'}`}
                    >
                      {g.label}
                      <span className={`tabular-nums ${on ? '' : 'text-muted'}`}>{byKind[g.id]}</span>
                    </button>
                  );
                })}
                {kinds.length > 0 && (
                  <button type="button" className="btn-ghost h-8 px-2 text-xs" onClick={() => update({ kinds: [] })}>
                    Clear
                  </button>
                )}
              </div>
            </Field>
          </>
        )}

        <div className="flex flex-col gap-3 border-t border-line pt-5 sm:flex-row sm:items-center">
          <label className="flex items-center gap-2 text-sm text-ink-2">
            <input
              type="checkbox"
              checked={shuffle || mode === 'exam'}
              disabled={mode === 'exam'}
              onChange={(e) => update({ shuffle: e.target.checked })}
              className="size-4 accent-[var(--accent)]"
            />
            Shuffle
          </label>
          <p className="text-sm text-muted sm:ml-auto" aria-live="polite">
            {scopeTitle(scope)} · {modeTitle(mode)}
          </p>
          <button type="button" className="btn-primary" disabled={!size} onClick={() => update({ start: true }, false)}>
            <Icon name="cards" size={16} />
            {size ? `Start ${size} card${size === 1 ? '' : 's'}` : 'No cards to study'}
          </button>
        </div>
      </div>

      {!review && topics.some((t) => t.flashcards.length) && (
        <section>
          <h2 className="mb-3 font-semibold text-ink">By topic</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {topics
              .filter((t) => t.flashcards.length)
              .map((t) => {
                const learned = t.flashcards.filter((c) => isLearned(states[c.key])).length;
                const due = t.flashcards.filter((c) => states[c.key] && isDue(states[c.key])).length;
                return (
                  <button
                    key={t.key}
                    type="button"
                    onClick={() => update({ scope: { subject: t.subjectId, unit: t.unitId, topic: t.id } })}
                    className="card card-hover p-4 text-left"
                  >
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
        </section>
      )}
    </div>
  );
}

function Field({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return (
    <div>
      <p className="eyebrow mb-2">
        {label}
        {hint && <span className="ml-2 font-normal normal-case tracking-normal">{hint}</span>}
      </p>
      {children}
    </div>
  );
}

/* ---------- session ---------- */

function Session({ session, onExit, onCram }: { session: SessionParams; onExit: () => void; onCram: () => void }) {
  const ctx = useSelectionContext(session.scope);
  const grade = useProgress((s) => s.gradeCard);
  const review = isReviewSource(session.mode);

  const build = (): Card[] => {
    const topics = topicsInScope(subjects, session.scope);
    if (isReviewSource(session.mode)) {
      const cards = lessonReviewCards(topics, session.mode);
      return session.shuffle ? shuffled(cards) : cards;
    }
    return buildDeck(topics, { mode: session.mode, kinds: session.kinds, shuffle: session.shuffle }, ctx);
  };

  // The deck is fixed when the session starts; "again" sends a card to the back.
  const id = JSON.stringify(sessionToParams(session));
  const [deck, setDeck] = useState(() => ({ id, queue: build(), done: 0, total: 0 }));
  if (deck.id !== id) setDeck({ id, queue: build(), done: 0, total: 0 });
  const queue = deck.queue;
  const total = deck.total || queue.length;
  const card = queue[0];

  const advance = (again: boolean) =>
    setDeck((d) => ({
      ...d,
      total: d.total || d.queue.length,
      done: d.done + (again ? 0 : 1),
      queue: again ? [...d.queue.slice(1), d.queue[0]] : d.queue.slice(1),
    }));
  const restart = () => setDeck({ id, queue: build(), done: 0, total: 0 });
  // A finished session (personal touches only; a no-op for other accounts).
  const sessionOver = !card && deck.done > 0;
  useEffect(() => {
    if (sessionOver) showMoment('session');
  }, [sessionOver]);

  const header = (
    <div className="mb-3 flex items-center gap-3 text-sm text-muted">
      <button type="button" className="btn-ghost -ml-2 h-8 px-2" onClick={onExit}>
        <Icon name="x" size={16} /> End
      </button>
      <span className="min-w-0 flex-1 truncate">
        {scopeTitle(session.scope)} · {modeTitle(session.mode)}
      </span>
      {card && <span className="shrink-0 tabular-nums">{queue.length} left</span>}
    </div>
  );

  if (!card) {
    return (
      <div className="mx-auto max-w-xl">
        {header}
        {deck.done > 0 ? (
          <div className="card animate-rise p-8 text-center">
            <Icon name="check" size={28} className="mx-auto text-good" />
            <p className="mt-3 text-lg font-semibold text-ink">
              Session done · {deck.done} card{deck.done === 1 ? '' : 's'}
            </p>
            <p className="mt-1 text-sm text-muted">
              {review ? 'Nothing was scheduled; run it again any time.' : 'Cards will come back when they are due.'}
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-2">
              <button type="button" className="btn-secondary" onClick={restart}>
                <Icon name="rotate" size={16} /> Go again
              </button>
              <button type="button" className="btn-primary" onClick={onExit}>
                New session
              </button>
            </div>
          </div>
        ) : (
          <div className="card p-8 text-center">
            <p className="font-medium text-ink">{session.mode === 'due' ? 'Nothing is due here right now' : 'No cards match this selection'}</p>
            <p className="mx-auto mt-1 max-w-md text-sm text-muted">
              {session.mode === 'due' ? 'You are up to date. Cram every card instead, or pick another scope.' : 'Widen the scope or clear the card-type filter.'}
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-2">
              {session.mode === 'due' && (
                <button type="button" className="btn-primary" onClick={onCram}>
                  Cram all cards
                </button>
              )}
              <button type="button" className="btn-secondary" onClick={onExit}>
                Back to builder
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  const topic = getTopic(card.topicKey);
  const context = topic ? `${topic.code} · ${card.concept ?? topic.title}` : card.concept;
  return (
    <div className="mx-auto max-w-xl">
      {header}
      <ProgressBar value={total ? deck.done / total : 0} size="sm" className="mb-4" label="Session progress" />
      <Flashcard
        card={card}
        context={context}
        onGrade={
          review
            ? undefined
            : (g) => {
                grade(card.key, g);
                advance(g === 'again');
              }
        }
      />
      {review && (
        <div className="mt-2 grid grid-cols-2 gap-2">
          <button type="button" className="btn-secondary" onClick={() => advance(true)}>
            See again later
          </button>
          <button type="button" className="btn-secondary" onClick={() => advance(false)}>
            Got it <Icon name="check" size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
