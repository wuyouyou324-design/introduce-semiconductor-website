import { useRouter } from '../app/useRouter';
import { useLanguage } from '../app/useLanguage';
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
              >
                <span className="lesson-number">{article.number}</span>
                <h2>{content.title}</h2>
                <p>{content.summary}</p>
                <span className="path-action lesson-card__action">
                  {t.readArticle} <span aria-hidden="true">→</span>
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
