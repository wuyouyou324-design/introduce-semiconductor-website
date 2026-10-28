import { useRouter } from '../app/router';
import './PlaceholderPage.css';

export function LogicGatesLabPage() {
  const { navigate } = useRouter();

  return (
    <div className="placeholder-page">
      <div className="placeholder-container">
        <div className="placeholder-icon">
          <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="2" y="2" width="20" height="20" rx="3" />
            <path d="M6 12h4m4 0h4M10 8v8" />
          </svg>
        </div>
        <h1>邏輯閘實驗室</h1>
        <p className="subtitle">
          邏輯閘實驗室正在建構中！未來您將在這裡動手操作 AND、OR、NOT、NAND、NOR 與 XOR 邏輯閘，體驗布林邏輯與數位電路的奧妙。
        </p>
        <div className="placeholder-box">
          <h3>即將推出的實驗功能：</h3>
          <ul>
            <li>互動式輸入開關（0 與 1）</li>
            <li>真值表即時檢驗</li>
            <li>組合邏輯電路（加法器簡介）</li>
          </ul>
        </div>
        <button type="button" className="btn-primary" onClick={() => navigate('/')}>
          返回首頁
        </button>
      </div>
    </div>
  );
}
