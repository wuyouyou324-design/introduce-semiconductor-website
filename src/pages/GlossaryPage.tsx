import { useMemo, useState } from 'react';
import { useRouter } from '../app/router';
import './ContentPages.css';

const terms = [
  ['semiconductor', '半導體', 'Semiconductor', '導電能力可以被控制的材料，例如矽，是現代晶片最重要的基礎。'],
  ['wafer', '矽晶圓', 'Silicon Wafer', '由單晶矽切片、拋光而成的圓形薄片，晶片電路會在其表面製作。'],
  ['transistor', '電晶體', 'Transistor', '可放大訊號或作為開關的電子元件，是處理器與記憶體的基本單位。'],
  ['photolithography', '微影技術', 'Photolithography', '利用光罩和光線，把精細電路圖案轉印到晶圓上的製程。'],
  ['logic-gate', '邏輯閘', 'Logic Gate', '依照布林邏輯運算輸入，產生 0 或 1 輸出的數位電路。'],
];

export function GlossaryPage() { const { navigate } = useRouter(); const [query, setQuery] = useState(''); const filtered = useMemo(() => terms.filter(([, zh, en, text]) => `${zh}${en}${text}`.toLowerCase().includes(query.toLowerCase())), [query]); return <div className="content-page"><section className="content-hero"><span className="eyebrow">知識工具 · 快速查找</span><h1>半導體詞彙表</h1><p>搜尋常見名詞，建立閱讀晶片與製程內容時需要的基礎 vocabulary。</p><label className="search-box"><span aria-hidden="true">⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="搜尋中文、英文或解釋" aria-label="搜尋詞彙" /></label></section><div className="content-container"><div className="term-grid">{filtered.map(([id, zh, en, text]) => <article className="term-card" id={id} key={id}><h2>{zh}</h2><span>{en}</span><p>{text}</p></article>)}</div>{filtered.length === 0 && <p className="empty-state">找不到相關詞彙，試試其他關鍵字。</p>}<button type="button" className="back-link" onClick={() => navigate('/')}>← 回到首頁</button></div></div>; }
