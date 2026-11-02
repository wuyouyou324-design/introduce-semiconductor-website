import { useRouter } from '../app/router';
import './HomePage.css';

const learningPaths = [
  { title: '半導體基礎', description: '從原子結構出發，認識導體、絕緣體與半導體的差別，探索矽的奧秘與電晶體原理。', path: '/learn', tag: '基礎核心', icon: '◈' },
  { title: '邏輯閘實驗室', description: '探索 AND、OR、NOT 邏輯閘如何組成電腦的大腦，體驗布林邏輯的魅力。', path: '/lab/logic-gates', tag: '互動體驗', icon: '⊕' },
  { title: '晶片製造工藝', description: '見證石英砂如何變成精密的晶圓，了解微影、蝕刻、離子植入與封裝測試。', path: '/manufacturing', tag: '製程探索', icon: '✣' },
];

const featuredTopics = [
  { title: '什麼是半導體？', category: '基礎概念', readTime: '3 分鐘閱讀', summary: '為什麼有些材料導電、有些不導電？半導體憑什麼成為現代電子產品的基石？', path: '/glossary#semiconductor' },
  { title: '矽晶圓是怎麼煉成的？', category: '材料科學', readTime: '4 分鐘閱讀', summary: '從石英砂到高純度單晶矽，看看晶圓製造如何把材料變成電子世界的基礎。', path: '/manufacturing#wafer' },
  { title: '電晶體：改變世界的開關', category: '核心元件', readTime: '5 分鐘閱讀', summary: '一顆微小的電晶體如何以高速開關控制電流，支撐整個數位時代？', path: '/learn#transistor' },
];

export function HomePage() {
  const { navigate } = useRouter();
  return (
    <div className="home-page">
      <section className="hero-section"><div className="hero-container"><div className="hero-content"><span className="hero-badge">給初學者的半導體科普園地</span><h1 className="hero-title">探索微小世界中的<span className="highlight">巨大力量</span></h1><p className="hero-description">用淺顯易懂的圖解與互動，帶你一步步解開晶片的科技密碼。</p><div className="hero-buttons"><button type="button" className="btn-primary" onClick={() => navigate('/learn')}>開始探索學習</button><button type="button" className="btn-secondary" onClick={() => navigate('/lab/logic-gates')}>邏輯閘實驗室</button></div></div><div className="hero-visual" aria-hidden="true"><div className="chip-illustration"><div className="chip-core"><svg viewBox="0 0 200 200" width="100%" height="100%" fill="none"><rect x="40" y="40" width="120" height="120" rx="16" fill="#1e293b" stroke="#3b82f6" strokeWidth="4" /><rect x="60" y="60" width="80" height="80" rx="8" fill="#0f172a" stroke="#60a5fa" strokeWidth="2" /><path d="M80 100h40M100 80v40" stroke="#93c5fd" strokeWidth="4" strokeLinecap="round" /><path d="M40 70H20M40 100H20M40 130H20M160 70h20M160 100h20M160 130h20M70 40V20M100 40V20M130 40V20M70 160v20M100 160v20M130 160v20" stroke="#3b82f6" strokeWidth="4" strokeLinecap="round" /><circle cx="100" cy="100" r="12" fill="#2563eb" /></svg></div></div></div></div></section>
      <section className="paths-section"><div className="section-container"><div className="section-header"><h2>核心學習路徑</h2><p>循序漸進，從零認識半導體世界</p></div><div className="paths-grid">{learningPaths.map((item) => <button type="button" key={item.path} className="path-card" onClick={() => navigate(item.path)}><div className="path-card-top"><div className="path-icon" aria-hidden="true">{item.icon}</div><span className="path-tag">{item.tag}</span></div><h3>{item.title}</h3><p>{item.description}</p><span className="path-action">了解更多 <span aria-hidden="true">→</span></span></button>)}</div></div></section>
      <section className="topics-section"><div className="section-container"><div className="section-header"><h2>熱門科普主題</h2><p>從日常好奇出發，找到清楚易懂的答案</p></div><div className="topics-grid">{featuredTopics.map((topic) => <article key={topic.path} className="topic-card"><div className="topic-meta"><span className="topic-category">{topic.category}</span><span className="topic-time">{topic.readTime}</span></div><h3>{topic.title}</h3><p>{topic.summary}</p><button type="button" className="topic-link-btn" onClick={() => navigate(topic.path)}>閱讀主題</button></article>)}</div></div></section>
      <section className="cta-banner-section"><span>準備好開始你的半導體探索之旅了嗎？</span><button type="button" className="btn-primary" onClick={() => navigate('/learn')}>立即開始學習</button></section>
    </div>
  );
}
