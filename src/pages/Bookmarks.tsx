import { Link } from 'react-router-dom';
import { getFlashcard, getLesson, getQuestion, getTopic } from '../content';
import { Page, PageHeader } from '../components/AppShell';
import { BookmarkButton } from '../components/BookmarkButton';
import { Flashcard } from '../components/Flashcard';
import { Icon } from '../components/Icon';
import { QuestionCard } from '../components/QuestionCard';
import { relativeTime } from '../lib/dates';
import { useProgress } from '../store/progress';

export default function Bookmarks() {
  const bookmarks = useProgress((s) => s.bookmarks);
  const notes = useProgress((s) => s.notes);
  const highlights = useProgress((s) => s.highlights);
  const removeHighlight = useProgress((s) => s.removeHighlight);
  const sorted = Object.entries(bookmarks).sort((a, b) => b[1].at - a[1].at);
  const lessons = sorted.filter(([k, b]) => b.kind === 'lesson' && getLesson(k));
  const questions = sorted.filter(([k, b]) => b.kind === 'question' && getQuestion(k));
  const cards = sorted.filter(([k, b]) => b.kind === 'flashcard' && getFlashcard(k));
  const noted = Object.keys(notes).filter((k) => getLesson(k));
  const marked = Object.entries(highlights)
    .filter(([k, h]) => h.items.length && getLesson(k))
    .sort((a, b) => b[1].at - a[1].at);
  const empty = !lessons.length && !questions.length && !cards.length && !noted.length && !marked.length;

  return (
    <Page>
      <PageHeader title="Saved">Bookmarked lessons, questions and flashcards, your highlights, and every lesson you’ve written notes on.</PageHeader>
      {empty && (
        <div className="card p-10 text-center">
          <Icon name="bookmark" size={28} className="mx-auto text-muted" />
          <p className="mt-3 font-medium text-ink">Nothing saved yet</p>
          <p className="mt-1 text-sm text-muted">Use the bookmark icon on any lesson, question or flashcard.</p>
        </div>
      )}

      <div className="space-y-12">
        {marked.length > 0 && (
          <section aria-labelledby="hl-title">
            <div className="mb-3 flex items-baseline justify-between gap-3">
              <h2 id="hl-title" className="font-semibold text-ink">
                My highlights
              </h2>
              <button type="button" className="btn-ghost no-print h-8 px-3 text-sm" onClick={() => window.print()}>
                <Icon name="download" size={14} /> Print or save as PDF
              </button>
            </div>
            <div className="space-y-4">
              {marked.map(([k, h]) => {
                const l = getLesson(k)!;
                const t = getTopic(l.topicKey);
                return (
                  <article key={k} className="card p-4">
                    <Link to={l.href} className="text-sm font-medium text-ink hover:text-accent">
                      {t ? `${t.code} · ` : ''}
                      {l.meta.title}
                    </Link>
                    <ul className="mt-2 space-y-2">
                      {h.items.map((x) => (
                        <li key={x.id} className="group flex items-start gap-2">
                          <p className="min-w-0 flex-1 border-l-2 border-warn pl-3 text-sm text-ink-2">{x.text}</p>
                          <button
                            type="button"
                            onClick={() => removeHighlight(k, x.id)}
                            className="no-print shrink-0 text-muted opacity-0 hover:text-bad group-hover:opacity-100 focus:opacity-100"
                            aria-label="Remove highlight"
                          >
                            <Icon name="x" size={14} />
                          </button>
                        </li>
                      ))}
                    </ul>
                  </article>
                );
              })}
            </div>
          </section>
        )}
        {lessons.length > 0 && (
          <section>
            <h2 className="mb-3 font-semibold text-ink">Lessons</h2>
            <ul className="card divide-y divide-line">
              {lessons.map(([k, b]) => {
                const l = getLesson(k)!;
                return (
                  <li key={k} className="flex items-center gap-2 pr-2">
                    <Link to={l.href} className="flex min-w-0 flex-1 items-center gap-3 px-4 py-3 hover:bg-sunken/60">
                      <Icon name="note" className="shrink-0 text-muted" />
                      <span className="min-w-0">
                        <span className="block truncate font-medium text-ink">{l.meta.title}</span>
                        <span className="block truncate text-xs text-muted">
                          {getTopic(l.topicKey)!.title} · saved {relativeTime(b.at)}
                        </span>
                      </span>
                    </Link>
                    <BookmarkButton id={k} kind="lesson" />
                  </li>
                );
              })}
            </ul>
          </section>
        )}

        {noted.length > 0 && (
          <section>
            <h2 className="mb-3 font-semibold text-ink">My notes</h2>
            <div className="grid gap-3 md:grid-cols-2">
              {noted.map((k) => {
                const l = getLesson(k)!;
                return (
                  <Link key={k} to={l.href} className="card card-hover p-4">
                    <p className="text-xs text-muted">{getTopic(l.topicKey)!.title}</p>
                    <p className="font-medium text-ink">{l.meta.title}</p>
                    <p className="mt-2 line-clamp-4 whitespace-pre-line text-sm text-ink-2">{notes[k]}</p>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {questions.length > 0 && (
          <section>
            <h2 className="mb-3 font-semibold text-ink">Questions</h2>
            <div className="space-y-4">
              {questions.map(([k]) => (
                <QuestionCard key={k} question={getQuestion(k)!} />
              ))}
            </div>
          </section>
        )}

        {cards.length > 0 && (
          <section>
            <h2 className="mb-3 font-semibold text-ink">Flashcards</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {cards.map(([k]) => {
                const c = getFlashcard(k)!;
                return <Flashcard key={k} card={c} context={getTopic(c.topicKey)!.title} />;
              })}
            </div>
          </section>
        )}
      </div>
    </Page>
  );
}
