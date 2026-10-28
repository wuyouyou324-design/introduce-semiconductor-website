import { RouterProvider, useRouter } from './app/router';
import { PageLayout } from './components/layout/PageLayout';
import { HomePage } from './pages/HomePage';
import { LearnPage } from './pages/LearnPage';
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
    <RouterProvider>
      <AppContent />
    </RouterProvider>
  );
}

export default App;
