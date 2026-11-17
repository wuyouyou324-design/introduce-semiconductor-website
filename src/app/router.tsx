import { useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { getArticleById } from '../data/learnArticles';
import { RouterContext } from './useRouter';
import { useLanguage } from './useLanguage';

const pageTitles = {
  zh: {
    '/': '半導體啟蒙基地｜半導體科普學習網站',
    '/learn': '半導體基礎學習｜半導體啟蒙基地',
    '/lab/logic-gates': '邏輯閘實驗室｜半導體啟蒙基地',
    '/lab/wafer-yield': '晶圓良率計算機｜半導體啟蒙基地',
    '/manufacturing': '晶片製造工藝｜半導體啟蒙基地',
    '/glossary': '半導體詞彙表｜半導體啟蒙基地',
  },
  en: {
    '/': 'Semiconductor Ignition Base | Semiconductor Science',
    '/learn': 'Semiconductor Basics | Semiconductor Ignition Base',
    '/lab/logic-gates': 'Logic Gates Lab | Semiconductor Ignition Base',
    '/lab/wafer-yield': 'Wafer Yield Calculator | Semiconductor Ignition Base',
    '/manufacturing': 'Chip Manufacturing | Semiconductor Ignition Base',
    '/glossary': 'Semiconductor Glossary | Semiconductor Ignition Base',
  },
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
  const { language, t } = useLanguage();

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
    let title = pageTitles[language][currentPath as keyof typeof pageTitles[typeof language]];
    if (!title && currentPath.startsWith('/learn/')) {
      const articleId = currentPath.replace('/learn/', '');
      const article = getArticleById(articleId);
      if (article) {
        const content = article[language];
        title = language === 'zh'
          ? `${content.title}｜半導體基礎學習｜半導體啟蒙基地`
          : `${content.title} | Semiconductor Basics | Semiconductor Ignition Base`;
      }
    }
    document.title = title ?? (language === 'zh' ? '找不到頁面｜半導體啟蒙基地' : 'Page Not Found | Semiconductor Ignition Base');
    document.documentElement.lang = language === 'zh' ? 'zh-Hant' : 'en';
    document.querySelector('meta[name="description"]')?.setAttribute('content', t.siteDescription);
  }, [currentPath, language, t.siteDescription]);

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
