import { useState } from 'react';
import { useRouter } from '../app/router';
import { useLanguage } from '../app/language';
import { type Language } from '../data/translations';
import './ContentPages.css';

type Gate = 'AND' | 'OR' | 'NOT' | 'NAND' | 'NOR' | 'XOR' | 'XNOR';
const gates: Gate[] = ['AND', 'OR', 'NOT', 'NAND', 'NOR', 'XOR', 'XNOR'];

type LabMode = 'single' | 'circuit';
type CircuitType = 'AND-NOT' | 'OR-NOT' | 'half-adder';
const circuits: CircuitType[] = ['AND-NOT', 'OR-NOT', 'half-adder'];

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

const circuitDescriptions: Record<Language, Record<CircuitType, { name: string; desc: string; formula: string }>> = {
  zh: {
    'AND-NOT': { 
      name: 'AND + NOT 串接電路 (組成 NAND 反及閘)', 
      desc: '先將輸入 A 與 B 通過 AND 閘（相乘），再將結果送入 NOT 閘（反相）。這就是電腦中極為重要的 NAND 組合電路。',
      formula: 'NOT(A AND B)' 
    },
    'OR-NOT': { 
      name: 'OR + NOT 串接電路 (組成 NOR 反或閘)', 
      desc: '先將輸入 A 與 B 通過 OR 閘（相加），再將結果送入 NOT 閘（反相），形成 NOR 組合電路。',
      formula: 'NOT(A OR B)' 
    },
    'half-adder': { 
      name: '半加器 (Half-Adder) 電路', 
      desc: '由一個 XOR 閘（計算本位和 Sum）與一個 AND 閘（計算進位 Carry）組成，能夠完成二進位 1-bit 加法運算！',
      formula: 'Sum = A XOR B, Carry = A AND B' 
    }
  },
  en: {
    'AND-NOT': { 
      name: 'AND + NOT Cascaded Circuit (NAND Equivalent)', 
      desc: 'Inputs A and B pass through an AND gate first, then the output feeds into a NOT gate. This forms a NAND circuit.',
      formula: 'NOT(A AND B)' 
    },
    'OR-NOT': { 
      name: 'OR + NOT Cascaded Circuit (NOR Equivalent)', 
      desc: 'Inputs A and B pass through an OR gate first, then the output feeds into a NOT gate. This forms a NOR circuit.',
      formula: 'NOT(A OR B)' 
    },
    'half-adder': { 
      name: 'Half-Adder Circuit', 
      desc: 'Consists of an XOR gate (for Sum) and an AND gate (for Carry), capable of performing 1-bit binary addition!',
      formula: 'Sum = A XOR B, Carry = A AND B' 
    }
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
        <line x1="20" y1={isUnary ? "70" : "45"} x2="70" y2={isUnary ? "70" : "45"} stroke={a ? activeColor : '#94a3b8'} strokeWidth="4" />
        <circle cx="20" cy={isUnary ? "70" : "45"} r="6" fill={a ? activeColor : '#94a3b8'} />
        <text x="30" y={isUnary ? "62" : "37"} fontSize="12" fill="#64748b" fontWeight="bold">A={a}</text>

        {!isUnary && (
          <>
            <line x1="20" y1="95" x2="70" y2="95" stroke={b ? activeColor : '#94a3b8'} strokeWidth="4" />
            <circle cx="20" cy="95" r="6" fill={b ? activeColor : '#94a3b8'} />
            <text x="30" y="87" fontSize="12" fill="#64748b" fontWeight="bold">B={b}</text>
          </>
        )}

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

        <line x1={outX1} y1="70" x2="260" y2="70" stroke={outVal ? activeColor : '#94a3b8'} strokeWidth="4" />
        <circle cx="260" cy="70" r="6" fill={outVal ? activeColor : '#94a3b8'} />
        <text x="230" y="62" fontSize="12" fill="#64748b" fontWeight="bold">Out={outVal}</text>
      </svg>
    </div>
  );
}

function CircuitSvg({ circuitType, a, b }: { circuitType: CircuitType; a: number; b: number }) {
  const activeColor = '#22c55e';
  const inactiveColor = '#94a3b8';

  if (circuitType === 'half-adder') {
    const sum = a ^ b;
    const carry = a & b;
    return (
      <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
        <svg width="340" height="160" viewBox="0 0 340 160" style={{ background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
          <line x1="20" y1="50" x2="80" y2="50" stroke={a ? activeColor : inactiveColor} strokeWidth="3" />
          <circle cx="20" cy="50" r="5" fill={a ? activeColor : inactiveColor} />
          <text x="25" y="42" fontSize="11" fill="#64748b" fontWeight="bold">A={a}</text>

          <line x1="20" y1="110" x2="80" y2="110" stroke={b ? activeColor : inactiveColor} strokeWidth="3" />
          <circle cx="20" cy="110" r="5" fill={b ? activeColor : inactiveColor} />
          <text x="25" y="102" fontSize="11" fill="#64748b" fontWeight="bold">B={b}</text>

          <line x1="80" y1="50" x2="120" y2="50" stroke={a ? activeColor : inactiveColor} strokeWidth="3" />
          <line x1="80" y1="110" x2="120" y2="110" stroke={b ? activeColor : inactiveColor} strokeWidth="3" />

          <rect x="120" y="30" width="70" height="40" rx="8" fill="#ffffff" stroke="#2563eb" strokeWidth="3" />
          <text x="135" y="55" fontSize="13" fill="#2563eb" fontWeight="bold">XOR (Sum)</text>

          <rect x="120" y="90" width="70" height="40" rx="8" fill="#ffffff" stroke="#2563eb" strokeWidth="3" />
          <text x="132" y="115" fontSize="13" fill="#2563eb" fontWeight="bold">AND (Carry)</text>

          <line x1="190" y1="50" x2="280" y2="50" stroke={sum ? activeColor : inactiveColor} strokeWidth="3" />
          <circle cx="280" cy="50" r="5" fill={sum ? activeColor : inactiveColor} />
          <text x="290" y="42" fontSize="11" fill="#64748b" fontWeight="bold">Sum={sum}</text>

          <line x1="190" y1="110" x2="280" y2="110" stroke={carry ? activeColor : inactiveColor} strokeWidth="3" />
          <circle cx="280" cy="110" r="5" fill={carry ? activeColor : inactiveColor} />
          <text x="290" y="102" fontSize="11" fill="#64748b" fontWeight="bold">Carry={carry}</text>
        </svg>
      </div>
    );
  }

  const gate1 = circuitType === 'AND-NOT' ? 'AND' : 'OR';
  const mid = circuitType === 'AND-NOT' ? (a & b) : (a | b);
  const out = Number(!mid);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
      <svg width="340" height="140" viewBox="0 0 340 140" style={{ background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
        <line x1="20" y1="45" x2="70" y2="45" stroke={a ? activeColor : inactiveColor} strokeWidth="3" />
        <circle cx="20" cy="45" r="5" fill={a ? activeColor : inactiveColor} />
        <text x="25" y="37" fontSize="11" fill="#64748b" fontWeight="bold">A={a}</text>

        <line x1="20" y1="95" x2="70" y2="95" stroke={b ? activeColor : inactiveColor} strokeWidth="3" />
        <circle cx="20" cy="95" r="5" fill={b ? activeColor : inactiveColor} />
        <text x="25" y="87" fontSize="11" fill="#64748b" fontWeight="bold">B={b}</text>

        <rect x="70" y="25" width="60" height="90" rx="8" fill="#ffffff" stroke="#2563eb" strokeWidth="3" />
        <text x="82" y="74" fontSize="14" fill="#2563eb" fontWeight="bold">{gate1}</text>

        <line x1="130" y1="70" x2="180" y2="70" stroke={mid ? activeColor : inactiveColor} strokeWidth="3" />
        <circle cx="155" cy="70" r="4" fill={mid ? activeColor : inactiveColor} />
        <text x="135" y="62" fontSize="10" fill="#64748b">Mid={mid}</text>

        <polygon points="180,35 230,70 180,105" fill="#ffffff" stroke="#2563eb" strokeWidth="3" />
        <circle cx="236" cy="70" r="5" fill="#ffffff" stroke="#2563eb" strokeWidth="3" />
        <text x="190" y="74" fontSize="12" fill="#2563eb" fontWeight="bold">NOT</text>

        <line x1="241" y1="70" x2="310" y2="70" stroke={out ? activeColor : inactiveColor} strokeWidth="3" />
        <circle cx="310" cy="70" r="5" fill={out ? activeColor : inactiveColor} />
        <text x="270" y="62" fontSize="11" fill="#64748b" fontWeight="bold">Out={out}</text>
      </svg>
    </div>
  );
}

export function LogicGatesLabPage() {
  const { navigate } = useRouter();
  const { t, language } = useLanguage();
  const [labMode, setLabMode] = useState<LabMode>('single');
  const [gate, setGate] = useState<Gate>('AND');
  const [circuitType, setCircuitType] = useState<CircuitType>('AND-NOT');
  const [a, setA] = useState(1);
  const [b, setB] = useState(0);

  const unary = gate === 'NOT';
  const currentOutput = output(gate, a, b);
  const info = gateDescriptions[language][gate];
  const circInfo = circuitDescriptions[language][circuitType];

  const circMid = circuitType === 'AND-NOT' ? (a & b) : (a | b);
  const circOut = circuitType === 'half-adder' ? 0 : Number(!circMid);

  return (
    <div className="content-page">
      <section className="content-hero">
        <span className="eyebrow">{t.labEyebrow}</span>
        <h1>{t.labTitle}</h1>
        <p>{t.labDesc}</p>
      </section>
      <div className="content-container">
        <section className="lab-panel">
          {/* Lab Mode Toggle */}
          <div className="gate-tabs" role="tablist" style={{ marginBottom: '20px' }}>
            <button 
              type="button" 
              role="tab" 
              aria-selected={labMode === 'single'} 
              className={labMode === 'single' ? 'selected' : ''} 
              onClick={() => setLabMode('single')}
            >
              {t.singleGateLab}
            </button>
            <button 
              type="button" 
              role="tab" 
              aria-selected={labMode === 'circuit'} 
              className={labMode === 'circuit' ? 'selected' : ''} 
              onClick={() => setLabMode('circuit')}
            >
              {t.circuitBuilderLab}
            </button>
          </div>

          {labMode === 'single' ? (
            <>
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
            </>
          ) : (
            <>
              <div className="gate-tabs" role="tablist" aria-label={t.selectCircuit}>
                {circuits.map((item) => (
                  <button 
                    type="button" 
                    key={item} 
                    role="tab" 
                    aria-selected={circuitType === item} 
                    className={circuitType === item ? 'selected' : ''} 
                    onClick={() => setCircuitType(item)}
                  >
                    {item === 'half-adder' ? (language === 'zh' ? '半加器 (Half-Adder)' : 'Half-Adder') : item}
                  </button>
                ))}
              </div>

              <div className="gate-info-banner" style={{ marginBottom: '16px', padding: '16px', background: '#f1f5f9', borderRadius: '8px', borderLeft: '4px solid #2563eb' }}>
                <h3 style={{ margin: '0 0 6px', color: '#0f172a', fontSize: '1.1rem' }}>{circInfo.name}</h3>
                <p style={{ margin: 0, color: '#475569', fontSize: '0.95rem', lineHeight: '1.6' }}>{circInfo.desc}</p>
              </div>

              <CircuitSvg circuitType={circuitType} a={a} b={b} />

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
                <div className="output-box" style={{ background: '#0f172a', color: '#93c5fd', borderRadius: '12px', padding: '16px 24px', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '4px', minWidth: '120px', boxShadow: '0 4px 12px rgba(15,23,42,0.15)' }}>
                  <span style={{ fontSize: '0.85rem', color: '#93c5fd' }}>{circuitType === 'half-adder' ? 'Sum / Carry' : t.output}</span>
                  <strong style={{ color: '#ffffff', fontSize: '1.3rem' }}>
                    {circuitType === 'half-adder' ? `S=${a ^ b}, C=${a & b}` : circOut}
                  </strong>
                </div>
              </div>
              <p className="formula">
                {circInfo.formula}
              </p>

              <table className="truth-table">
                <caption>{circInfo.name} {t.truthTable}</caption>
                <thead>
                  <tr>
                    <th>{t.inputA}</th>
                    <th>{t.inputB}</th>
                    <th>{circuitType === 'half-adder' ? 'Sum (和)' : 'Mid (中間值)'}</th>
                    <th>{circuitType === 'half-adder' ? 'Carry (進位)' : t.output}</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map(([x, y]) => {
                    const m = circuitType === 'AND-NOT' ? (x & y) : (x | y);
                    const o = circuitType === 'half-adder' ? 0 : Number(!m);
                    const sum = x ^ y;
                    const carry = x & y;
                    return (
                      <tr key={`${x}-${y}`}>
                        <td>{x}</td>
                        <td>{y}</td>
                        <td>{circuitType === 'half-adder' ? sum : m}</td>
                        <td>{circuitType === 'half-adder' ? carry : o}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </>
          )}
        </section>
        <button type="button" className="back-link" onClick={() => navigate('/')}>
          {t.backHome}
        </button>
      </div>
    </div>
  );
}
