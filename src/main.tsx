import { StrictMode, lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AppShell } from './components/AppShell';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import './index.css';

const Subjects = lazy(() => import('./pages/Subjects'));
const SubjectPage = lazy(() => import('./pages/SubjectPage'));
const TopicPage = lazy(() => import('./pages/TopicPage'));
const LessonPage = lazy(() => import('./pages/LessonPage'));
const Practice = lazy(() => import('./pages/Practice'));
const QuestionBank = lazy(() => import('./pages/QuestionBank'));
const Revise = lazy(() => import('./pages/Revise'));
const Bookmarks = lazy(() => import('./pages/Bookmarks'));
const Settings = lazy(() => import('./pages/Settings'));
// Lessons converted from private notes exist only in local development.
const LocalLessonPage = import.meta.env.DEV ? lazy(() => import('./pages/LocalLessonPage')) : null;

const wrap = (el: React.ReactNode) => <Suspense fallback={<div className="min-h-[60vh]" />}>{el}</Suspense>;

const router = createBrowserRouter([
  {
    element: <AppShell />,
    children: [
      { path: '/', element: <Dashboard /> },
      { path: '/subjects', element: wrap(<Subjects />) },
      { path: '/s/:subjectId', element: wrap(<SubjectPage />) },
      { path: '/s/:subjectId/:topicId', element: wrap(<TopicPage />) },
      ...(LocalLessonPage ? [{ path: '/s/:subjectId/:topicId/notes/:slug', element: wrap(<LocalLessonPage />) }] : []),
      { path: '/s/:subjectId/:topicId/:lessonSlug', element: wrap(<LessonPage />) },
      { path: '/practice', element: wrap(<Practice />) },
      { path: '/bank', element: wrap(<QuestionBank />) },
      { path: '/revise/:tab?', element: wrap(<Revise />) },
      { path: '/bookmarks', element: wrap(<Bookmarks />) },
      { path: '/settings', element: wrap(<Settings />) },
      { path: '*', element: <NotFound /> },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
