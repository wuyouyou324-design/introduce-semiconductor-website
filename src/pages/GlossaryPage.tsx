import { useRouter } from '../app/router';
import './PlaceholderPage.css';

export function GlossaryPage() {
  const { navigate } = useRouter();

  return (
    <div className="placeholder-page">
      <div className="placeholder-container">
        <div className="placeholder-icon">
          <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
          </svg>
        </div>
        <h1>半導體詞彙表</h1>
        <p className="subtitle">
          半導體專有名詞與科普詞彙庫正在建構中，提供國高中生易懂的名詞解釋。
        </p>
        <div className="placeholder-box">
          <h3>收錄詞彙預覽：</h3>
          <ul>
            <li>矽晶圓 (Silicon Wafer)</li>
            <li>電晶體 (Transistor)</li>
            <li>微影技術 (Photolithography)</li>
            <li>邏輯閘 (Logic Gate)</li>
            <li>摩爾定律 (Moore's Law)</li>
          </ul>
        </div>
        <button type="button" className="btn-primary" onClick={() => navigate('/')}>
          返回首頁
        </button>
      </div>
    </div>
  );
}
