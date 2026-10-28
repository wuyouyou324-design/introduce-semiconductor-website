import { useRouter } from '../app/router';
import './PlaceholderPage.css';

export function LearnPage() {
  const { navigate } = useRouter();

  return (
    <div className="placeholder-page">
      <div className="placeholder-container">
        <div className="placeholder-icon">
          <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
          </svg>
        </div>
        <h1>半導體基礎學習</h1>
        <p className="subtitle">
          正在建構完整的半導體基礎課程，包含導體與絕緣體比較、矽的原子結構、P型與N型半導體、以及二極體與電晶體運作原理。
        </p>
        <div className="placeholder-box">
          <h3>預計涵蓋單元：</h3>
          <ul>
            <li>單元 1：什麼是導體、絕緣體與半導體？</li>
            <li>單元 2：矽晶體與電子共價鍵</li>
            <li>單元 3：雜質掺雜：P型與N型半導體的誕生</li>
            <li>單元 4：PN接面與二極體單向導電性</li>
            <li>單元 5：電晶體：現代開關與放大器</li>
          </ul>
        </div>
        <button type="button" className="btn-primary" onClick={() => navigate('/')}>
          返回首頁
        </button>
      </div>
    </div>
  );
}
