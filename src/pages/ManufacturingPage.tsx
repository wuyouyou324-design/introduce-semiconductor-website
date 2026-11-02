import { useState } from 'react';
import { useRouter } from '../app/router';
import './ContentPages.css';

const steps = [
  ['01', '純化與長晶', '把石英砂中的矽純化，再用柴氏拉晶法拉出高純度單晶矽柱。'],
  ['02', '切片與拋光', '將矽柱切成薄薄的晶圓，經過研磨與化學機械拋光，得到平坦鏡面。'],
  ['03', '沉積與光阻', '在晶圓上沉積薄膜並塗佈光阻，準備把電路圖案轉移到表面。'],
  ['04', '微影與蝕刻', '利用光線曝光，再選擇性蝕刻材料，逐層形成奈米級電路結構。'],
  ['05', '植入與金屬化', '植入離子調整材料電性，並製作金屬導線把電晶體連接起來。'],
  ['06', '切割、封裝與測試', '切割晶圓成單顆晶粒，封裝後測試功能與可靠度，才成為可用晶片。'],
];

export function ManufacturingPage() { const { navigate } = useRouter(); const [active, setActive] = useState(0); const step = steps[active]; return <div className="content-page"><section className="content-hero"><span className="eyebrow">製程探索 · 從砂到晶片</span><h1>晶片製造工藝</h1><p>一片晶圓需要經過數百道精密步驟，以下用六個階段掌握全貌。</p></section><div className="content-container"><section className="process-panel" id="wafer"><div className="process-list" role="tablist" aria-label="製造流程步驟">{steps.map(([number, title], index) => <button type="button" role="tab" aria-selected={active === index} className={active === index ? 'active' : ''} key={number} onClick={() => setActive(index)}><span>{number}</span>{title}</button>)}</div><div className="process-detail"><span className="lesson-number">{step[0]}</span><h2>{step[1]}</h2><p>{step[2]}</p><div className="wafer-art" aria-hidden="true"><div /></div></div></section><button type="button" className="back-link" onClick={() => navigate('/')}>← 回到首頁</button></div></div>; }
