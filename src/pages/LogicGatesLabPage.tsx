import { useState } from 'react';
import { useRouter } from '../app/router';
import './ContentPages.css';

type Gate = 'AND' | 'OR' | 'NOT' | 'XOR';
const gates: Gate[] = ['AND', 'OR', 'NOT', 'XOR'];
const rows = [[0, 0], [0, 1], [1, 0], [1, 1]] as const;
function output(gate: Gate, a: number, b: number) { if (gate === 'AND') return a & b; if (gate === 'OR') return a | b; if (gate === 'XOR') return a ^ b; return Number(!a); }

export function LogicGatesLabPage() {
  const { navigate } = useRouter();
  const [gate, setGate] = useState<Gate>('AND');
  const [a, setA] = useState(1);
  const [b, setB] = useState(0);
  const unary = gate === 'NOT';
  return <div className="content-page"><section className="content-hero"><span className="eyebrow">互動體驗 · 數位邏輯</span><h1>邏輯閘實驗室</h1><p>切換輸入，觀察不同邏輯閘如何根據布林規則產生輸出。</p></section><div className="content-container"><section className="lab-panel"><div className="gate-tabs" role="tablist" aria-label="選擇邏輯閘">{gates.map((item) => <button type="button" key={item} role="tab" aria-selected={gate === item} className={gate === item ? 'selected' : ''} onClick={() => setGate(item)}>{item}</button>)}</div><div className="lab-controls"><label>輸入 A<button type="button" className={`switch ${a ? 'on' : ''}`} aria-pressed={Boolean(a)} onClick={() => setA(1 - a)}>{a}</button></label>{!unary && <label>輸入 B<button type="button" className={`switch ${b ? 'on' : ''}`} aria-pressed={Boolean(b)} onClick={() => setB(1 - b)}>{b}</button></label>}<div className="output-box"><span>輸出</span><strong>{output(gate, a, b)}</strong></div></div><p className="formula">{unary ? `NOT ${a} = ${output(gate, a, b)}` : `${a} ${gate} ${b} = ${output(gate, a, b)}`}</p><table className="truth-table"><caption>{gate} 真值表</caption><thead><tr><th>輸入 A</th>{!unary && <th>輸入 B</th>}<th>輸出</th></tr></thead><tbody>{rows.map(([x, y]) => <tr key={`${x}-${y}`}><td>{x}</td>{!unary && <td>{y}</td>}<td>{output(gate, x, y)}</td></tr>)}</tbody></table></section><button type="button" className="back-link" onClick={() => navigate('/')}>← 回到首頁</button></div></div>;
}
