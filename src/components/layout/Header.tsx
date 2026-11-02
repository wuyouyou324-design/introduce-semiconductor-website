import { useState } from 'react';
import { useRouter } from '../../app/router';
import './Header.css';

const navItems = [
  { path: '/', label: '首頁' },
  { path: '/learn', label: '學習路徑' },
  { path: '/lab/logic-gates', label: '邏輯閘實驗室' },
  { path: '/manufacturing', label: '晶片製造' },
  { path: '/glossary', label: '詞彙表' },
];

export function Header() {
  const { currentPath, navigate } = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <header className="site-header">
      <div className="header-container">
        <button type="button" className="logo-area" onClick={() => handleNavClick('/')} aria-label="回到半導體啟蒙基地首頁">
          <span className="logo-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <path d="M9 9h6v6H9zM9 1v2M15 1v2M9 21v2M15 21v2M1 9h2M1 15h2M21 9h2M21 15h2" />
            </svg>
          </span>
          <span className="logo-text">半導體啟蒙基地</span>
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

        <button type="button" className="mobile-menu-toggle" aria-label={mobileMenuOpen ? '關閉選單' : '開啟選單'} aria-expanded={mobileMenuOpen} aria-controls="mobile-navigation" onClick={() => setMobileMenuOpen((open) => !open)}>
          <span className={`hamburger ${mobileMenuOpen ? 'open' : ''}`} aria-hidden="true"><span /><span /><span /></span>
        </button>
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
