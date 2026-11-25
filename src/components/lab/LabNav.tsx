import { useRouter } from '../../app/useRouter';
import { useLanguage } from '../../app/useLanguage';

interface LabNavProps {
  currentTab: 'logic-gates' | 'wafer-yield' | 'transistor' | 'band-gap';
}

interface LabTab {
  id: 'logic-gates' | 'wafer-yield' | 'transistor' | 'band-gap';
  path: string;
  labelZh: string;
  labelEn: string;
  icon: React.ReactNode;
}

export function LabNav({ currentTab }: LabNavProps) {
  const { navigate } = useRouter();
  const { language } = useLanguage();

  const tabs: LabTab[] = [
    {
      id: 'logic-gates',
      path: '/lab/logic-gates',
      labelZh: '邏輯閘與加法器',
      labelEn: 'Logic Gates & Adders',
      icon: (
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
      ),
    },
    {
      id: 'wafer-yield',
      path: '/lab/wafer-yield',
      labelZh: '晶圓良率計算機',
      labelEn: 'Wafer Yield Calculator',
      icon: (
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 6v12M15 9.5H10.5a1.5 1.5 0 0 0 0 3h3a1.5 1.5 0 0 1 0 3H9" />
        </svg>
      ),
    },
    {
      id: 'transistor',
      path: '/lab/transistor',
      labelZh: '電晶體與 CMOS 模擬',
      labelEn: 'Transistor & CMOS Lab',
      icon: (
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 18h8M3 22h18M14 22a7 7 0 1 0 0-14h-1m-4 3h5" />
          <path d="M9 6h2m-1-3v3" />
        </svg>
      ),
    },
    {
      id: 'band-gap',
      path: '/lab/band-gap',
      labelZh: '能帶理論與電子躍遷',
      labelEn: 'Band Gap Simulator',
      icon: (
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3" />
          <ellipse cx="12" cy="12" rx="9" ry="3" transform="rotate(30 12 12)" />
          <ellipse cx="12" cy="12" rx="9" ry="3" transform="rotate(150 12 12)" />
        </svg>
      ),
    },
  ];

  return (
    <nav className="lab-nav-bar" aria-label={language === 'zh' ? '實驗室導覽' : 'Lab Navigation'}>
      <div className="lab-nav-list">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            className={`lab-nav-tab ${currentTab === tab.id ? 'active' : ''}`}
            onClick={() => navigate(tab.path)}
          >
            <span className="tab-icon">{tab.icon}</span>
            {language === 'zh' ? tab.labelZh : tab.labelEn}
          </button>
        ))}
      </div>
    </nav>
  );
}
