import { useRouter } from '../app/router';
import { useLanguage } from '../app/language';
import './HomePage.css';

const learningPathConfig: Record<string, { icon: string; path: string }> = {
  basics: { icon: '◈', path: '/learn' },
  logicGates: { icon: '⊕', path: '/lab/logic-gates' },
  manufacturing: { icon: '✣', path: '/manufacturing' },
};

const featuredTopicConfig: Record<string, string> = {
  semiconductor: '/glossary#semiconductor',
  wafer: '/manufacturing#wafer',
  transistor: '/learn#transistor',
};

export function HomePage() {
  const { navigate } = useRouter();
  const { t } = useLanguage();

  const learningPaths = t.learningPaths.map((item) => ({
    ...item,
    ...learningPathConfig[item.id],
  }));

  const featuredTopics = t.featuredTopicsList.map((topic) => ({
    ...topic,
    path: featuredTopicConfig[topic.id],
  }));

  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <span className="hero-badge">{t.homeBadge}</span>
            <h1 className="hero-title">{t.homeTitlePrefix}<span className="highlight">{t.homeTitleHighlight}</span></h1>
            <p className="hero-description">{t.homeDescription}</p>
            <div className="hero-buttons">
              <button type="button" className="btn-primary" onClick={() => navigate('/learn')}>{t.startExplore}</button>
              <button type="button" className="btn-secondary" onClick={() => navigate('/lab/logic-gates')}>{t.logicGatesLab}</button>
            </div>
          </div>
          <div className="hero-visual" aria-hidden="true">
            <div className="chip-illustration">
              <div className="chip-core">
                <svg viewBox="0 0 200 200" width="100%" height="100%" fill="none">
                  <rect x="40" y="40" width="120" height="120" rx="16" fill="#1e293b" stroke="#3b82f6" strokeWidth="4" />
                  <rect x="60" y="60" width="80" height="80" rx="8" fill="#0f172a" stroke="#60a5fa" strokeWidth="2" />
                  <path d="M80 100h40M100 80v40" stroke="#93c5fd" strokeWidth="4" strokeLinecap="round" />
                  <path d="M40 70H20M40 100H20M40 130H20M160 70h20M160 100h20M160 130h20M70 40V20M100 40V20M130 40V20M70 160v20M100 160v20M130 160v20" stroke="#3b82f6" strokeWidth="4" strokeLinecap="round" />
                  <circle cx="100" cy="100" r="12" fill="#2563eb" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="paths-section">
        <div className="section-container">
          <div className="section-header">
            <h2>{t.corePaths}</h2>
            <p>{t.corePathsSub}</p>
          </div>
          <div className="paths-grid">
            {learningPaths.map((item) => (
              <button type="button" key={item.path} className="path-card" onClick={() => navigate(item.path)}>
                <div className="path-card-top">
                  <div className="path-icon" aria-hidden="true">{item.icon}</div>
                  <span className="path-tag">{item.tag}</span>
                </div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <span className="path-action">{t.learnMore} <span aria-hidden="true">→</span></span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="topics-section">
        <div className="section-container">
          <div className="section-header">
            <h2>{t.featuredTopics}</h2>
            <p>{t.featuredTopicsSub}</p>
          </div>
          <div className="topics-grid">
            {featuredTopics.map((topic) => (
              <article key={topic.path} className="topic-card">
                <div className="topic-meta">
                  <span className="topic-category">{topic.category}</span>
                  <span className="topic-time">{topic.readTime}</span>
                </div>
                <h3>{topic.title}</h3>
                <p>{topic.summary}</p>
                <button type="button" className="topic-link-btn" onClick={() => navigate(topic.path)}>{t.readTopic}</button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-banner-section">
        <span>{t.readyPrompt}</span>
        <button type="button" className="btn-primary" onClick={() => navigate('/learn')}>{t.startLearningNow}</button>
      </section>
    </div>
  );
}
