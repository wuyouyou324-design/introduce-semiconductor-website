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

const basePath = import.meta.env.BASE_URL.replace(/\/$/, '');

function getPath() {
  const pathname = window.location.pathname;
  if (basePath && (pathname === basePath || pathname.startsWith(`${basePath}/`))) {
    return pathname.slice(basePath.length) || '/';
  }
  return pathname || '/';
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
    const appPath = url.pathname || '/';
    const browserPath = `${basePath}${appPath === '/' ? '/' : appPath}`;
    const nextUrl = `${browserPath}${url.search}${url.hash}`;
    const currentUrl = `${window.location.pathname}${window.location.search}${window.location.hash}`;
    if (nextUrl === currentUrl) return;
    window.history.pushState({}, '', nextUrl);
    setCurrentPath(appPath);
    scrollToTop();
  };

  const value = useMemo(() => ({ currentPath, navigate }), [currentPath]);
  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>;
}

export function useRouter() {
  return useContext(RouterContext);
}
