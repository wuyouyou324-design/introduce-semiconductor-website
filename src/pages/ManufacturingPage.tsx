import { useRouter } from '../app/router';
import './PlaceholderPage.css';

export function ManufacturingPage() {
  const { navigate } = useRouter();

  return (
    <div className="placeholder-page">
      <div className="placeholder-container">
        <div className="placeholder-icon">
          <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M2 12h20M12 2v20M4.93 4.93l14.14 14.14M4.93 19.07L19.07 4.93" />
          </svg>
        </div>
        <h1>晶片製造工藝</h1>
        <p className="subtitle">
          晶片製造製程導覽正在準備中，帶領您深入探索地表上最精密的製造工藝。
        </p>
        <div className="placeholder-box">
          <h3>製程探索步驟：</h3>
          <ul>
            <li>步驟 1：石英砂純化與長晶（柴氏拉晶法）</li>
            <li>步驟 2：晶圓切片與拋光</li>
            <li>步驟 3：薄膜沉積與光阻塗佈</li>
            <li>步驟 4：微影（曝光）與蝕刻</li>
            <li>步驟 5：離子植入與金屬導線</li>
            <li>步驟 6：晶圓切割、封裝與測試</li>
          </ul>
        </div>
        <button type="button" className="btn-primary" onClick={() => navigate('/')}>
          返回首頁
        </button>
      </div>
    </div>
  );
}
