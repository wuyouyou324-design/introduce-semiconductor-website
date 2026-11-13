import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { getArticleById } from '../data/learnArticles';

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

function scrollToHash(hash: string) {
  if (!hash) {
    scrollToTop();
    return;
  }

  requestAnimationFrame(() => {
    const id = decodeURIComponent(hash.slice(1));
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  });
}

export function RouterProvider({ children }: { children: ReactNode }) {
  const [currentPath, setCurrentPath] = useState<string>(getPath);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(getPath());
      scrollToHash(window.location.hash);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    scrollToHash(window.location.hash);
  }, []);

  useEffect(() => {
    let title = pageTitles[currentPath];
    if (!title && currentPath.startsWith('/learn/')) {
      const articleId = currentPath.replace('/learn/', '');
      const article = getArticleById(articleId);
      if (article) {
        title = `${article.zh.title}｜半導體基礎學習｜半導體啟蒙基地`;
      }
    }
    document.title = title ?? '找不到頁面｜半導體啟蒙基地';
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
    scrollToHash(url.hash);
  };

  const value = useMemo(() => ({ currentPath, navigate }), [currentPath]);
  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>;
}

export function useRouter() {
  return useContext(RouterContext);
}
