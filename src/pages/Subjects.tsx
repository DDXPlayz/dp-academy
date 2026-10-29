import { Link } from 'react-router-dom';
import { subjects } from '../content';
import { Page, PageHeader } from '../components/AppShell';
import { Icon } from '../components/Icon';
import { ProgressBar } from '../components/ProgressBar';
import { pct, subjectStats } from '../lib/stats';
import { useStudyState } from '../store/progress';

export default function Subjects() {
  const state = useStudyState();
  return (
    <Page>
      <PageHeader title="Subjects">Every subject follows the current IB syllabus structure. Pick one to see its full curriculum.</PageHeader>
      <div className="grid gap-4 md:grid-cols-2">
        {subjects.map((s) => {
          const st = subjectStats(s, state);
          return (
            <Link key={s.id} to={s.href} className="card card-hover group flex flex-col p-6">
              <div className="flex items-center gap-3">
                <span className="size-2.5 rounded-full" style={{ background: s.colour }} />
                <span className="eyebrow">{s.group}</span>
                <span className="ml-auto flex gap-1">
                  {s.levels.map((l) => (
                    <span key={l} className="chip">
                      {l}
                    </span>
                  ))}
                </span>
              </div>
              <h2 className="mt-4 text-xl font-semibold tracking-tight text-ink">{s.title}</h2>
              <p className="mt-1 text-sm leading-relaxed text-ink-2">{s.description}</p>
              <p className="mt-4 text-sm text-muted">
                {s.units.length} units · {s.topics.length} topics · {st.lessonsTotal} lessons · {st.questionsTotal} questions
              </p>
              <div className="mt-5 flex items-center gap-3">
                <ProgressBar value={st.progress} label={`${s.title} progress`} />
                <span className="w-10 text-right text-sm font-medium text-ink">{pct(st.progress)}</span>
              </div>
              <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-accent">
                Open curriculum <Icon name="arrowRight" size={14} className="transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          );
        })}
      </div>
    </Page>
  );
}
