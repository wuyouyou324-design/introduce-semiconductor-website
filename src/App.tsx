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

function AppContent() {
  const { currentPath } = useRouter();

  let page = <NotFoundPage />;
  if (currentPath === '/') {
    page = <HomePage />;
  } else if (currentPath === '/learn') {
    page = <LearnPage />;
  } else if (currentPath.startsWith('/learn/')) {
    const articleId = currentPath.replace('/learn/', '');
    page = <LearnArticlePage articleId={articleId} />;
  } else if (currentPath === '/lab/logic-gates') {
    page = <LogicGatesLabPage />;
  } else if (currentPath === '/manufacturing') {
    page = <ManufacturingPage />;
  } else if (currentPath === '/glossary') {
    page = <GlossaryPage />;
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
