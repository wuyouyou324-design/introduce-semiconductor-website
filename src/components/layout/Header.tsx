import { useState } from 'react';
import { useRouter } from '../../app/router';
import { useLanguage } from '../../app/language';
import { useTheme } from '../../app/theme';
import './Header.css';

export function Header() {
  const { currentPath, navigate } = useRouter();
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { path: '/', label: t.navHome },
    { path: '/learn', label: t.navLearn },
    { path: '/lab/logic-gates', label: t.navLab },
    { path: '/manufacturing', label: t.navMfg },
    { path: '/glossary', label: t.navGlossary },
  ];

  const handleNavClick = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'zh' ? 'en' : 'zh');
  };

  return (
    <header className="site-header">
      <div className="header-container">
        <button type="button" className="logo-area" onClick={() => handleNavClick('/')} aria-label={t.brandName}>
          <span className="logo-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <path d="M9 9h6v6H9zM9 1v2M15 1v2M9 21v2M15 21v2M1 9h2M1 15h2M21 9h2M21 15h2" />
            </svg>
          </span>
          <span className="logo-text">{t.brandName}</span>
        </button>

        <nav className="desktop-nav" aria-label="主要導覽">
          <ul>
            {navItems.map((item) => (
              <li key={item.path}>
                <button type="button" className={`nav-link ${currentPath === item.path ? 'active' : ''}`} onClick={() => handleNavClick(item.path)} aria-current={currentPath === item.path ? 'page' : undefined}>
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header-actions">
          <button
            type="button"
            className="theme-toggle-btn"
            onClick={toggleTheme}
            aria-label={t.themeToggleLabel}
          >
            {theme === 'dark' ? (
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
            <span>{theme === 'dark' ? t.lightMode : t.darkMode}</span>
          </button>

          <button
            type="button"
            onClick={toggleLanguage}
            className={`lang-toggle-btn ${language === 'en' ? 'active' : ''}`}
            aria-label="切換語言 / Switch Language"
          >
            {language === 'zh' ? 'English' : '中文'}
          </button>

          <button type="button" className="mobile-menu-toggle" aria-label={mobileMenuOpen ? '關閉選單' : '開啟選單'} aria-expanded={mobileMenuOpen} aria-controls="mobile-navigation" onClick={() => setMobileMenuOpen((open) => !open)}>
            <span className={`hamburger ${mobileMenuOpen ? 'open' : ''}`} aria-hidden="true"><span /><span /><span /></span>
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <nav id="mobile-navigation" className="mobile-dropdown" aria-label="行動版主要導覽">
          <ul>
            {navItems.map((item) => (
              <li key={item.path}>
                <button type="button" className={`mobile-nav-link ${currentPath === item.path ? 'active' : ''}`} onClick={() => handleNavClick(item.path)} aria-current={currentPath === item.path ? 'page' : undefined}>
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
