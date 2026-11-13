import { RouterProvider, useRouter } from './app/router';
import { LanguageProvider } from './app/language';
import { ThemeProvider } from './app/theme';
import { PageLayout } from './components/layout/PageLayout';
import { HomePage } from './pages/HomePage';
import { LearnPage } from './pages/LearnPage';
import { LearnArticlePage } from './pages/LearnArticlePage';
import { LogicGatesLabPage } from './pages/LogicGatesLabPage';
import { ManufacturingPage } from './pages/ManufacturingPage';
import { GlossaryPage } from './pages/GlossaryPage';
import { NotFoundPage } from './pages/NotFoundPage';

const staticRoutes = [
  { path: '/', render: () => <HomePage /> },
  { path: '/learn', render: () => <LearnPage /> },
  { path: '/lab/logic-gates', render: () => <LogicGatesLabPage /> },
  { path: '/manufacturing', render: () => <ManufacturingPage /> },
  { path: '/glossary', render: () => <GlossaryPage /> },
];

function AppContent() {
  const { currentPath } = useRouter();

  const staticRoute = staticRoutes.find((route) => route.path === currentPath);
  let page = staticRoute ? staticRoute.render() : <NotFoundPage />;

  if (!staticRoute && currentPath.startsWith('/learn/')) {
    const articleId = currentPath.replace('/learn/', '');
    page = <LearnArticlePage articleId={articleId} />;
  }

  return <PageLayout>{page}</PageLayout>;
}

export function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <RouterProvider>
          <AppContent />
        </RouterProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
}

export default App;
