import { useRouter } from '../app/router';
import './ContentPages.css';

const lessons = [
  ['01', '導體、絕緣體與半導體', '導體容易讓電子通過，絕緣體則阻擋電子；半導體的導電能力介於兩者之間，還能透過溫度與摻雜精準調整。'],
  ['02', '矽晶體與共價鍵', '矽原子有四個價電子，會與鄰近原子形成穩定的共價鍵，這個晶體結構是製作晶片的材料基礎。'],
  ['03', 'P 型與 N 型半導體', '在矽中加入不同雜質，可以創造電洞或自由電子，分別形成 P 型與 N 型半導體。'],
  ['04', 'PN 接面與二極體', 'P 型和 N 型接合後形成耗盡區，電流較容易朝一個方向通過，這就是二極體的基本原理。'],
];

export function LearnPage() {
  const { navigate } = useRouter();
  return <div className="content-page"><section className="content-hero"><span className="eyebrow">學習路徑 · 基礎核心</span><h1>半導體基礎學習</h1><p>用四個概念建立理解晶片的地基，最後看懂電晶體為何能成為數位世界的開關。</p></section><div className="content-container"><div className="lesson-grid">{lessons.map(([number, title, text]) => <article className="lesson-card" key={number}><span className="lesson-number">{number}</span><h2>{title}</h2><p>{text}</p></article>)}</div><section className="explain-panel" id="transistor"><div><span className="eyebrow">核心概念</span><h2>電晶體：用電流控制電流</h2><p>電晶體可以把小訊號放大，也可以像開關一樣在 0 與 1 之間快速切換。數十億顆電晶體組合起來，就能執行手機、電腦和 AI 系統的運算。</p></div><div className="binary-display" aria-label="電晶體的二進位開關示意"><span>OFF</span><strong>0 → 1</strong><span>ON</span></div></section><button type="button" className="back-link" onClick={() => navigate('/')}>← 回到首頁</button></div></div>;
}
