import { useState } from 'react';
import { useRouter } from '../../app/router';
import { useLanguage } from '../../app/language';
import './Header.css';

export function Header() {
  const { currentPath, navigate } = useRouter();
  const { language, setLanguage, t } = useLanguage();
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

        <div className="header-actions" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button 
            type="button" 
            className="lang-toggle-btn" 
            onClick={toggleLanguage}
            style={{
              padding: '6px 12px',
              borderRadius: '6px',
              border: '1px solid #3b82f6',
              background: language === 'en' ? '#3b82f6' : 'transparent',
              color: language === 'en' ? '#fff' : '#3b82f6',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '14px',
              transition: 'all 0.2s'
            }}
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
