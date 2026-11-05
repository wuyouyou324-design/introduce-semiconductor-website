import { useRouter } from '../app/router';
import { useLanguage } from '../app/language';
import { learnArticles } from '../data/learnArticles';
import './ContentPages.css';

export function LearnPage() {
  const { navigate } = useRouter();
  const { t, language } = useLanguage();

  return (
    <div className="content-page">
      <section className="content-hero">
        <span className="eyebrow">{t.learnEyebrow}</span>
        <h1>{t.learnTitle}</h1>
        <p>{t.learnDesc}</p>
      </section>
      <div className="content-container">
        <div className="lesson-grid">
          {learnArticles.map((article) => {
            const content = article[language];
            return (
              <button
                type="button"
                className="lesson-card lesson-card-btn"
                key={article.id}
                onClick={() => navigate(`/learn/${article.id}`)}
                style={{ textAlign: 'left', cursor: 'pointer', background: 'inherit', border: '1px solid var(--border-color, #e2e8f0)', width: '100%', font: 'inherit' }}
              >
                <span className="lesson-number">{article.number}</span>
                <h2>{content.title}</h2>
                <p>{content.summary}</p>
                <span className="path-action" style={{ marginTop: '1rem', display: 'inline-block', color: '#2563eb', fontWeight: 500 }}>
                  {language === 'zh' ? '閱讀文章' : 'Read Article'} <span aria-hidden="true">→</span>
                </span>
              </button>
            );
          })}
        </div>
        <section className="explain-panel" id="transistor">
          <div>
            <span className="eyebrow">{t.transistorEyebrow}</span>
            <h2>{t.transistorTitle}</h2>
            <p>{t.transistorDesc}</p>
          </div>
          <div className="binary-display" aria-label="電晶體的二進位開關示意">
            <span>OFF</span>
            <strong>0 → 1</strong>
            <span>ON</span>
          </div>
        </section>
        <button type="button" className="back-link" onClick={() => navigate('/')}>
          {t.backHome}
        </button>
      </div>
    </div>
  );
}
