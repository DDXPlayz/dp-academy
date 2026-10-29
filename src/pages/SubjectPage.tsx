import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getSubject } from '../content';
import { Page, PageHeader } from '../components/AppShell';
import { Icon } from '../components/Icon';
import { ProgressBar } from '../components/ProgressBar';
import { TopicCard, UnitCard } from '../components/TopicCard';
import { latestAttempts, pct, subjectStats, topicStats } from '../lib/stats';
import { useStudyState } from '../store/progress';
import NotFound from './NotFound';

type Level = 'HL' | 'SL';

export default function SubjectPage() {
  const { subjectId = '' } = useParams();
  const subject = getSubject(subjectId);
  const state = useStudyState();
  const [level, setLevel] = useState<Level>('HL');
  if (!subject) return <NotFound />;

  const st = subjectStats(subject, state);
  const latest = latestAttempts(state.attempts);
  const hasLevels = subject.levels.length > 1;
  const visible = (hl: boolean) => level === 'HL' || !hl;

  return (
    <Page>
      <nav className="mb-4 text-sm">
        <Link to="/subjects" className="inline-flex items-center gap-1 text-muted hover:text-ink">
          <Icon name="arrowLeft" size={14} /> Subjects
        </Link>
      </nav>
      <PageHeader eyebrow={subject.group} title={subject.title}>
        {subject.description}
      </PageHeader>

      <div className="card mb-8 flex flex-col gap-4 p-5 sm:flex-row sm:items-center">
        <div className="flex-1">
          <div className="mb-2 flex justify-between text-sm">
            <span className="text-muted">
              {st.lessonsDone} of {st.lessonsTotal} lessons complete
            </span>
            <span className="font-medium text-ink">{pct(st.progress)}</span>
          </div>
          <ProgressBar value={st.progress} label={`${subject.title} progress`} />
        </div>
        {hasLevels && (
          <div role="radiogroup" aria-label="Level" className="flex shrink-0 rounded-lg bg-sunken p-1">
            {(['SL', 'HL'] as Level[]).map((l) => (
              <button
                key={l}
                type="button"
                role="radio"
                aria-checked={level === l}
                onClick={() => setLevel(l)}
                className={`h-8 rounded-md px-4 text-sm font-medium transition-colors ${level === l ? 'bg-card text-ink shadow-sm' : 'text-muted hover:text-ink'}`}
              >
                {l}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="space-y-5">
        {subject.units.map((u, i) => {
          const topics = u.topics.filter((t) => visible(t.hl));
          if (!topics.length) return null;
          return (
            <UnitCard key={u.id} unit={u} index={i}>
              {topics.map((t) => (
                <TopicCard key={t.key} topic={t} stats={topicStats(t, state, latest)} />
              ))}
            </UnitCard>
          );
        })}
      </div>
    </Page>
  );
}
