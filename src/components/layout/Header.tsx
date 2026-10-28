import { useState } from 'react';
import { useRouter } from '../../app/router';
import './Header.css';

export function Header() {
  const { currentPath, navigate } = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { path: '/', label: '首頁' },
    { path: '/learn', label: '學習路徑' },
    { path: '/lab/logic-gates', label: '邏輯閘實驗室' },
    { path: '/manufacturing', label: '晶片製造' },
    { path: '/glossary', label: '詞彙表' },
  ];

  const handleNavClick = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <header className="site-header">
      <div className="header-container">
        <div className="logo-area" onClick={() => handleNavClick('/')}>
          <div className="logo-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <path d="M9 9h6v6H9z" />
              <path d="M9 1v2M15 1v2M9 21v2M15 21v2M1 9h2M1 15h2M21 9h2M21 15h2" />
            </svg>
          </div>
          <span className="logo-text">半導體啟蒙基地</span>
        </div>

        <nav className={`desktop-nav ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          <ul>
            {navItems.map((item) => {
              const isActive = currentPath === item.path;
              return (
                <li key={item.path}>
                  <button
                    type="button"
                    className={`nav-link ${isActive ? 'active' : ''}`}
                    onClick={() => handleNavClick(item.path)}
                  >
                    {item.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <button
          type="button"
          className="mobile-menu-toggle"
          aria-label="切換選單"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span className={`hamburger ${mobileMenuOpen ? 'open' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="mobile-dropdown">
          <ul>
            {navItems.map((item) => {
              const isActive = currentPath === item.path;
              return (
                <li key={item.path}>
                  <button
                    type="button"
                    className={`mobile-nav-link ${isActive ? 'active' : ''}`}
                    onClick={() => handleNavClick(item.path)}
                  >
                    {item.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </header>
  );
}
