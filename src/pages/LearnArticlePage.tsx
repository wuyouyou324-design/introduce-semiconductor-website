import { useRouter } from '../app/useRouter';
import { useLanguage } from '../app/useLanguage';
import { getArticleById } from '../data/learnArticles';
import type { ReactNode } from 'react';
import './ContentPages.css';

interface LearnArticlePageProps {
  articleId: string;
}

function renderInlineMarkdown(text: string): ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }
    return <span key={index}>{part}</span>;
  });
}

export function LearnArticlePage({ articleId }: LearnArticlePageProps) {
  const { navigate } = useRouter();
  const { language, t } = useLanguage();
  const article = getArticleById(articleId);

  if (!article) {
    return (
      <div className="content-page">
        <div className="content-container not-found-content">
          <h2>{t.articleNotFound}</h2>
          <button type="button" className="back-link" onClick={() => navigate('/learn')}>
            {t.backToLearningList}
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
        <article className="article-body">
          {content.paragraphs.map((p, idx) => (
            <p key={idx} className="article-body__paragraph">
              {renderInlineMarkdown(p)}
            </p>
          ))}
        </article>

        <section className="explain-panel">
          <div>
            <span className="eyebrow">{t.coreConceptAnalysis}</span>
            <h2>{content.conceptTitle}</h2>
            <p>{content.conceptDesc}</p>
          </div>
        </section>

        <div className="article-actions">
          <button type="button" className="back-link" onClick={() => navigate('/learn')}>
            {t.backToLearningList}
          </button>
          <button type="button" className="back-link" onClick={() => navigate('/')}>
            {t.backHome}
          </button>
        </div>
      </div>
    </div>
  );
}
