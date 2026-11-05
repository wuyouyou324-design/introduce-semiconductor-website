import { useRouter } from '../app/router';
import { useLanguage } from '../app/language';
import { getArticleById } from '../data/learnArticles';
import './ContentPages.css';

interface LearnArticlePageProps {
  articleId: string;
}

export function LearnArticlePage({ articleId }: LearnArticlePageProps) {
  const { navigate } = useRouter();
  const { language, t } = useLanguage();
  const article = getArticleById(articleId);

  if (!article) {
    return (
      <div className="content-page">
        <div className="content-container" style={{ textAlign: 'center', padding: '4rem 0' }}>
          <h2>{language === 'zh' ? '找不到文章' : 'Article Not Found'}</h2>
          <button type="button" className="back-link" onClick={() => navigate('/learn')} style={{ marginTop: '2rem' }}>
            {language === 'zh' ? '← 返回學習列表' : '← Back to Learning List'}
          </button>
        </div>
      </div>
    );
  }

  const content = article[language];

  return (
    <div className="content-page">
      <section className="content-hero">
        <span className="eyebrow">{content.eyebrow}</span>
        <h1>{content.title}</h1>
        <p>{content.summary}</p>
      </section>
      <div className="content-container">
        <article className="article-body" style={{ background: 'var(--card-bg, #ffffff)', padding: '2.5rem', borderRadius: '1rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', marginBottom: '2.5rem' }}>
          {content.paragraphs.map((p, idx) => (
            <p key={idx} style={{ marginBottom: '1.5rem', lineHeight: '1.8', fontSize: '1.05rem', color: 'var(--text-color, #334155)' }}>
              {p}
            </p>
          ))}
        </article>

        <section className="explain-panel">
          <div>
            <span className="eyebrow">{language === 'zh' ? '核心概念解析' : 'Core Concept Analysis'}</span>
            <h2>{content.conceptTitle}</h2>
            <p>{content.conceptDesc}</p>
          </div>
        </section>

        <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem', flexWrap: 'wrap' }}>
          <button type="button" className="back-link" onClick={() => navigate('/learn')}>
            {language === 'zh' ? '← 返回學習列表' : '← Back to Learning List'}
          </button>
          <button type="button" className="back-link" onClick={() => navigate('/')}>
            {t.backHome}
          </button>
        </div>
      </div>
    </div>
  );
}
