import { useRouter } from '../app/router';
import './PlaceholderPage.css';

export function NotFoundPage() {
  const { navigate } = useRouter();

  return (
    <div className="placeholder-page">
      <div className="placeholder-container">
        <h1>404 - 找不到頁面</h1>
        <p className="subtitle">
          很抱歉，您造訪的頁面不存在或已被移除。
        </p>
        <button type="button" className="btn-primary" onClick={() => navigate('/')}>
          返回首頁
        </button>
      </div>
    </div>
  );
}
