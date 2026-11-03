import { useRouter } from '../app/router';
import { useLanguage } from '../app/language';
import './PlaceholderPage.css';

export function NotFoundPage() {
  const { navigate } = useRouter();
  const { t } = useLanguage();

  return (
    <div className="placeholder-page">
      <div className="placeholder-container">
        <h1>{t.notFoundTitle}</h1>
        <p className="subtitle">
          {t.notFoundDesc}
        </p>
        <button type="button" className="btn-primary" onClick={() => navigate('/')}>
          {t.returnHome}
        </button>
      </div>
    </div>
  );
}
