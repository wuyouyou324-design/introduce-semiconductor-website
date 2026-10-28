import { useRouter } from '../app/router';
import './HomePage.css';

export function HomePage() {
  const { navigate } = useRouter();

  const learningPaths = [
    {
      title: '半導體基礎',
      description: '從原子結構出發，認識導體、絕緣體與半導體的差別，探索矽的奧秘與電晶體原理。',
      path: '/learn',
      icon: (
        <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      ),
      tag: '基礎核心',
    },
    {
      title: '邏輯閘實驗室',
      description: '探索 AND、OR、NOT 邏輯閘如何組成電腦的大腦，體驗布林邏輯的魅力。',
      path: '/lab/logic-gates',
      icon: (
        <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="2" width="20" height="20" rx="3" />
          <path d="M6 12h4m4 0h4M10 8v8" />
        </svg>
      ),
      tag: '互動體驗',
    },
    {
      title: '晶片製造工藝',
      description: '見證石英砂如何變成精密的晶圓，了解微影、蝕刻、離子植入與封裝測試的高科技流程。',
      path: '/manufacturing',
      icon: (
        <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M2 12h20M12 2v20M4.93 4.93l14.14 14.14M4.93 19.07L19.07 4.93" />
        </svg>
      ),
      tag: '製程探索',
    },
  ];

  const featuredTopics = [
    {
      title: '什麼是半導體？',
      category: '基礎概念',
      readTime: '3 分鐘閱讀',
      summary: '為什麼有些材料導電、有些不導電？半導體憑什麼成為現代電子產品的基石？',
    },
    {
      title: '矽晶圓是怎麼煉成的？',
      category: '材料科學',
      readTime: '4 分鐘閱讀',
      summary: '從海灘上的沙子（二氧化矽）到純度高達 99.999999999% 的單晶矽柱，這中間經歷了什麼奇蹟？',
    },
    {
      title: '電晶體：改變世界的開關',
      category: '核心元件',
      readTime: '5 分鐘閱讀',
      summary: '一顆微小的電晶體如何取代巨大的真空管？它是如何以高速開關控制電流，支撐整個數位時代？',
    },
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <span className="hero-badge">🚀 國高中生專屬的半導體科普園地</span>
            <h1 className="hero-title">
              探索微小世界中的<span className="highlight">巨大力量</span>
            </h1>
            <p className="hero-description">
              半導體支撐了當今所有的手機、電腦與AI科技。在這裡，我們用淺顯易懂的圖解與直觀觀念，帶你一步步解開晶片的科技密碼。
            </p>
            <div className="hero-buttons">
              <button
                type="button"
                className="btn-primary"
                onClick={() => navigate('/learn')}
              >
                開始探索學習
              </button>
              <button
                type="button"
                className="btn-secondary"
                onClick={() => navigate('/lab/logic-gates')}
              >
                邏輯閘實驗室
              </button>
            </div>
          </div>
          <div className="hero-visual">
            <div className="chip-illustration">
              <div className="chip-core">
                <svg viewBox="0 0 200 200" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="40" y="40" width="120" height="120" rx="16" fill="#1e293b" stroke="#3b82f6" strokeWidth="4" />
                  <rect x="60" y="60" width="80" height="80" rx="8" fill="#0f172a" stroke="#60a5fa" strokeWidth="2" />
                  <path d="M80 100h40M100 80v40" stroke="#93c5fd" strokeWidth="4" strokeLinecap="round" />
                  {/* Pin connectors */}
                  <path d="M40 70H20M40 100H20M40 130H20M160 70h20M160 100h20M160 130h20M70 40V20M100 40V20M130 40V20M70 160v20M100 160v20M130 160v20" stroke="#3b82f6" strokeWidth="4" strokeLinecap="round" />
                  <circle cx="100" cy="100" r="12" fill="#2563eb" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Paths Section */}
      <section className="paths-section">
        <div className="section-container">
          <div className="section-header">
            <h2>核心學習路徑</h2>
            <p>循序漸進的知識架構，帶領你從零認識半導體世界</p>
          </div>
          <div className="paths-grid">
            {learningPaths.map((item, index) => (
              <div
                key={index}
                className="path-card"
                onClick={() => navigate(item.path)}
                role="button"
                tabIndex={0}
              >
                <div className="path-card-top">
                  <div className="path-icon">{item.icon}</div>
                  <span className="path-tag">{item.tag}</span>
                </div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <div className="path-action">
                  <span>了解更多</span>
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Topics Section */}
      <section className="topics-section">
        <div className="section-container">
          <div className="section-header">
            <h2>熱門科普主題</h2>
            <p>精選日常中最好奇的半導體科學問答</p>
          </div>
          <div className="topics-grid">
            {featuredTopics.map((topic, index) => (
              <div key={index} className="topic-card">
                <div className="topic-meta">
                  <span className="topic-category">{topic.category}</span>
                  <span className="topic-time">{topic.readTime}</span>
                </div>
                <h3>{topic.title}</h3>
                <p>{topic.summary}</p>
                <button
                  type="button"
                  className="topic-link-btn"
                  onClick={() => navigate('/glossary')}
                >
                  閱讀文章
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="cta-banner-section">
        準備好開始你的半導體探索之旅了嗎？
        <button
          type="button"
          className="btn-primary"
          onClick={() => navigate('/learn')}
        >
          立即開始學習
        </button>
      </section>
    </div>
  );
}
