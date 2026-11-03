import { useRouter } from '../app/router';
import { useLanguage } from '../app/language';
import './ContentPages.css';

export function LearnPage() {
  const { navigate } = useRouter();
  const { t } = useLanguage();

  return (
    <div className="content-page">
      <section className="content-hero">
        <span className="eyebrow">{t.learnEyebrow}</span>
        <h1>{t.learnTitle}</h1>
        <p>{t.learnDesc}</p>
      </section>
      <div className="content-container">
        <div className="lesson-grid">
          {t.lessons.map(([number, title, text]) => (
            <article className="lesson-card" key={number}>
              <span className="lesson-number">{number}</span>
              <h2>{title}</h2>
              <p>{text}</p>
            </article>
          ))}
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
