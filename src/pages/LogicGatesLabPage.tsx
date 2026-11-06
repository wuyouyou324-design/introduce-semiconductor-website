import { useState } from 'react';
import { useRouter } from '../app/router';
import { useLanguage } from '../app/language';
import { type Language } from '../data/translations';
import './ContentPages.css';

type Gate = 'AND' | 'OR' | 'NOT' | 'NAND' | 'NOR' | 'XOR' | 'XNOR';
const gates: Gate[] = ['AND', 'OR', 'NOT', 'NAND', 'NOR', 'XOR', 'XNOR'];
const rows = [[0, 0], [0, 1], [1, 0], [1, 1]] as const;

function output(gate: Gate, a: number, b: number) { 
  if (gate === 'AND') return a & b; 
  if (gate === 'OR') return a | b; 
  if (gate === 'NOT') return Number(!a); 
  if (gate === 'NAND') return Number(!(a & b));
  if (gate === 'NOR') return Number(!(a | b));
  if (gate === 'XOR') return a ^ b;
  if (gate === 'XNOR') return Number(!(a ^ b));
  return 0;
}

const gateDescriptions: Record<Language, Record<Gate, { name: string; desc: string }>> = {
  zh: {
    AND: { name: 'AND (和閘)', desc: '當所有輸入皆為 1 時，輸出才為 1，否則為 0。' },
    OR: { name: 'OR (或閘)', desc: '只要有任何一個輸入為 1，輸出即為 1。' },
    NOT: { name: 'NOT (非閘)', desc: '將輸入反相，0 變 1，1 變 0。' },
    NAND: { name: 'NAND (反及閘)', desc: 'AND 的相反，當所有輸入皆為 1 時輸出 0，其餘為 1。' },
    NOR: { name: 'NOR (反或閘)', desc: 'OR 的相反，只要有任何輸入為 1 輸出即為 0。' },
    XOR: { name: 'XOR (互斥或閘)', desc: '當輸入相異時輸出 1，相同時輸出 0。' },
    XNOR: { name: 'XNOR (互斥反或閘)', desc: 'XOR 的相反，當輸入相同時輸出 1，相異時輸出 0。' }
  },
  en: {
    AND: { name: 'AND Gate', desc: 'Output is 1 only if all inputs are 1, otherwise 0.' },
    OR: { name: 'OR Gate', desc: 'Output is 1 if any input is 1.' },
    NOT: { name: 'NOT Gate', desc: 'Inverts input: 0 becomes 1, 1 becomes 0.' },
    NAND: { name: 'NAND Gate', desc: 'Inverted AND: output is 0 only if all inputs are 1, otherwise 1.' },
    NOR: { name: 'NOR Gate', desc: 'Inverted OR: output is 0 if any input is 1.' },
    XOR: { name: 'XOR Gate', desc: 'Output is 1 if inputs are different, 0 if same.' },
    XNOR: { name: 'XNOR Gate', desc: 'Inverted XOR: output is 1 if inputs are same, 0 if different.' }
  }
};

function GateSvg({ gate, a, b, outVal }: { gate: Gate; a: number; b: number; outVal: number }) {
  const isUnary = gate === 'NOT';
  const strokeColor = '#2563eb';
  const activeColor = '#22c55e';
  
  let outX1 = 140;
  if (gate === 'AND') outX1 = 155;
  else if (gate === 'NAND') outX1 = 167;
  else if (gate === 'NOR' || gate === 'XNOR') outX1 = 152;
  else if (gate === 'NOT') outX1 = 142;
  else if (gate === 'OR' || gate === 'XOR') outX1 = 140;

  return (
    <div className="gate-svg-container" style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
      <svg width="280" height="140" viewBox="0 0 280 140" style={{ background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
        {/* Input A Line */}
        <line x1="20" y1={isUnary ? "70" : "45"} x2="70" y2={isUnary ? "70" : "45"} stroke={a ? activeColor : '#94a3b8'} strokeWidth="4" />
        <circle cx="20" cy={isUnary ? "70" : "45"} r="6" fill={a ? activeColor : '#94a3b8'} />
        <text x="30" y={isUnary ? "62" : "37"} fontSize="12" fill="#64748b" fontWeight="bold">A={a}</text>

        {!isUnary && (
          <>
            {/* Input B Line */}
            <line x1="20" y1="95" x2="70" y2="95" stroke={b ? activeColor : '#94a3b8'} strokeWidth="4" />
            <circle cx="20" cy="95" r="6" fill={b ? activeColor : '#94a3b8'} />
            <text x="30" y="87" fontSize="12" fill="#64748b" fontWeight="bold">B={b}</text>
          </>
        )}

        {/* Gate Body & Inversion Bubble if applicable */}
        {gate === 'AND' && (
          <path d="M 70 25 L 110 25 A 45 45 0 0 1 110 115 L 70 115 Z" fill="#ffffff" stroke={strokeColor} strokeWidth="4" />
        )}
        {gate === 'OR' && (
          <path d="M 70 25 Q 95 25 140 70 Q 95 115 70 115 Q 85 70 70 25 Z" fill="#ffffff" stroke={strokeColor} strokeWidth="4" />
        )}
        {gate === 'NOT' && (
          <polygon points="70,30 130,70 70,110" fill="#ffffff" stroke={strokeColor} strokeWidth="4" />
        )}
        {gate === 'NAND' && (
          <>
            <path d="M 70 25 L 110 25 A 45 45 0 0 1 110 115 L 70 115 Z" fill="#ffffff" stroke={strokeColor} strokeWidth="4" />
            <circle cx="161" cy="70" r="6" fill="#ffffff" stroke={strokeColor} strokeWidth="4" />
          </>
        )}
        {gate === 'NOR' && (
          <>
            <path d="M 70 25 Q 95 25 140 70 Q 95 115 70 115 Q 85 70 70 25 Z" fill="#ffffff" stroke={strokeColor} strokeWidth="4" />
            <circle cx="146" cy="70" r="6" fill="#ffffff" stroke={strokeColor} strokeWidth="4" />
          </>
        )}
        {gate === 'XOR' && (
          <>
            <path d="M 62 25 Q 77 70 62 115" fill="none" stroke={strokeColor} strokeWidth="3" />
            <path d="M 70 25 Q 95 25 140 70 Q 95 115 70 115 Q 85 70 70 25 Z" fill="#ffffff" stroke={strokeColor} strokeWidth="4" />
          </>
        )}
        {gate === 'XNOR' && (
          <>
            <path d="M 62 25 Q 77 70 62 115" fill="none" stroke={strokeColor} strokeWidth="3" />
            <path d="M 70 25 Q 95 25 140 70 Q 95 115 70 115 Q 85 70 70 25 Z" fill="#ffffff" stroke={strokeColor} strokeWidth="4" />
            <circle cx="146" cy="70" r="6" fill="#ffffff" stroke={strokeColor} strokeWidth="4" />
          </>
        )}

        {/* Output Line */}
        <line 
          x1={outX1} 
          y1="70" 
          x2="260" 
          y2="70" 
          stroke={outVal ? activeColor : '#94a3b8'} 
          strokeWidth="4" 
        />
        <circle cx="260" cy="70" r="6" fill={outVal ? activeColor : '#94a3b8'} />
        <text x="230" y="62" fontSize="12" fill="#64748b" fontWeight="bold">Out={outVal}</text>
      </svg>
    </div>
  );
}

export function LogicGatesLabPage() {
  const { navigate } = useRouter();
  const { t, language } = useLanguage();
  const [gate, setGate] = useState<Gate>('AND');
  const [a, setA] = useState(1);
  const [b, setB] = useState(0);
  const unary = gate === 'NOT';
  const currentOutput = output(gate, a, b);
  const info = gateDescriptions[language][gate];

  return (
    <div className="content-page">
      <section className="content-hero">
        <span className="eyebrow">{t.labEyebrow}</span>
        <h1>{t.labTitle}</h1>
        <p>{t.labDesc}</p>
      </section>
      <div className="content-container">
        <section className="lab-panel">
          <div className="gate-tabs" role="tablist" aria-label={t.selectGate}>
            {gates.map((item) => (
              <button 
                type="button" 
                key={item} 
                role="tab" 
                aria-selected={gate === item} 
                className={gate === item ? 'selected' : ''} 
                onClick={() => setGate(item)}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="gate-info-banner" style={{ marginBottom: '16px', padding: '16px', background: '#f1f5f9', borderRadius: '8px', borderLeft: '4px solid #2563eb' }}>
            <h3 style={{ margin: '0 0 6px', color: '#0f172a', fontSize: '1.1rem' }}>{info.name}</h3>
            <p style={{ margin: 0, color: '#475569', fontSize: '0.95rem', lineHeight: '1.6' }}>{info.desc}</p>
          </div>

          <GateSvg gate={gate} a={a} b={b} outVal={currentOutput} />

          <div className="lab-controls">
            <label>
              {t.inputA}
              <button 
                type="button" 
                className={`switch ${a ? 'on' : ''}`} 
                aria-pressed={Boolean(a)} 
                onClick={() => setA(1 - a)}
              >
                {a}
              </button>
            </label>
            {!unary && (
              <label>
                {t.inputB}
                <button 
                  type="button" 
                  className={`switch ${b ? 'on' : ''}`} 
                  aria-pressed={Boolean(b)} 
                  onClick={() => setB(1 - b)}
                >
                  {b}
                </button>
              </label>
            )}
            <div className="output-box" style={{ background: '#0f172a', color: '#93c5fd', borderRadius: '12px', padding: '16px 24px', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '4px', minWidth: '120px', boxShadow: '0 4px 12px rgba(15,23,42,0.15)' }}>
              <span style={{ fontSize: '0.85rem', color: '#93c5fd' }}>{t.output}</span>
              <strong style={{ color: '#ffffff', fontSize: '1.5rem' }}>{currentOutput}</strong>
            </div>
          </div>
          <p className="formula">
            {unary ? `NOT ${a} = ${currentOutput}` : `${a} ${gate} ${b} = ${currentOutput}`}
          </p>
          <table className="truth-table">
            <caption>{gate} {t.truthTable}</caption>
            <thead>
              <tr>
                <th>{t.inputA}</th>
                {!unary && <th>{t.inputB}</th>}
                <th>{t.output}</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(([x, y]) => (
                <tr key={`${x}-${y}`}>
                  <td>{x}</td>
                  {!unary && <td>{y}</td>}
                  <td>{output(gate, x, y)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
        <button type="button" className="back-link" onClick={() => navigate('/')}>
          {t.backHome}
        </button>
      </div>
    </div>
  );
}

