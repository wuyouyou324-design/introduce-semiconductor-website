import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';

interface RouterContextType {
  currentPath: string;
  navigate: (path: string) => void;
}

const RouterContext = createContext<RouterContextType>({
  currentPath: '/',
  navigate: () => {},
});

const pageTitles: Record<string, string> = {
  '/': '半導體啟蒙基地｜半導體科普學習網站',
  '/learn': '半導體基礎學習｜半導體啟蒙基地',
  '/lab/logic-gates': '邏輯閘實驗室｜半導體啟蒙基地',
  '/manufacturing': '晶片製造工藝｜半導體啟蒙基地',
  '/glossary': '半導體詞彙表｜半導體啟蒙基地',
};

function getPath() {
  return window.location.pathname || '/';
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

export function RouterProvider({ children }: { children: ReactNode }) {
  const [currentPath, setCurrentPath] = useState<string>(getPath);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(getPath());
      scrollToTop();
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    document.title = pageTitles[currentPath] ?? '找不到頁面｜半導體啟蒙基地';
  }, [currentPath]);

  const navigate = (path: string) => {
    const url = new URL(path, window.location.origin);
    const nextPath = `${url.pathname}${url.search}${url.hash}`;
    if (nextPath === `${window.location.pathname}${window.location.search}${window.location.hash}`) return;
    window.history.pushState({}, '', nextPath);
    setCurrentPath(url.pathname || '/');
    scrollToTop();
  };

  const value = useMemo(() => ({ currentPath, navigate }), [currentPath]);
  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>;
}

export function useRouter() {
  return useContext(RouterContext);
}
