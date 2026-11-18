import { useRouter } from '../../app/useRouter';
import { useLanguage } from '../../app/useLanguage';

interface LabNavProps {
  currentTab: 'logic-gates' | 'wafer-yield' | 'transistor' | 'band-gap';
}

export function LabNav({ currentTab }: LabNavProps) {
  const { navigate } = useRouter();
  const { language } = useLanguage();

  const tabs = [
    {
      id: 'logic-gates',
      path: '/lab/logic-gates',
      labelZh: '⚡ 邏輯閘與加法器',
      labelEn: '⚡ Logic Gates & Adders',
    },
    {
      id: 'wafer-yield',
      path: '/lab/wafer-yield',
      labelZh: '🪙 晶圓良率計算機',
      labelEn: '🪙 Wafer Yield Calculator',
    },
    {
      id: 'transistor',
      path: '/lab/transistor',
      labelZh: '🔬 電晶體與 CMOS 模擬',
      labelEn: '🔬 Transistor & CMOS Lab',
    },
    {
      id: 'band-gap',
      path: '/lab/band-gap',
      labelZh: '⚛️ 能帶理論與電子躍遷',
      labelEn: '⚛️ Band Gap Simulator',
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
            {language === 'zh' ? tab.labelZh : tab.labelEn}
          </button>
        ))}
      </div>
    </nav>
  );
}
