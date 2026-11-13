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
    <div className="gate-svg-container">
      <svg width="280" height="140" viewBox="0 0 280 140">
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
      <div className="gate-svg-container circuit-svg-container half-adder-svg-container">
        <svg width="440" height="230" viewBox="0 0 440 230">
          <text x="18" y="20" fontSize="10" fill="#94a3b8" fontWeight="bold" letterSpacing="1.5">INPUT SPLIT</text>
          <text x="315" y="20" fontSize="10" fill="#94a3b8" fontWeight="bold" letterSpacing="1.5">OUTPUTS</text>

          <line x1="24" y1="55" x2="130" y2="55" stroke={a ? activeColor : inactiveColor} strokeWidth="3" />
          <circle cx="24" cy="55" r="5" fill={a ? activeColor : inactiveColor} />
          <text x="30" y="47" fontSize="11" fill="#64748b" fontWeight="bold">A={a}</text>
          <line x1="70" y1="55" x2="70" y2="155" stroke={a ? activeColor : inactiveColor} strokeWidth="3" />
          <line x1="70" y1="155" x2="130" y2="155" stroke={a ? activeColor : inactiveColor} strokeWidth="3" />
          <circle cx="70" cy="55" r="4" fill={a ? activeColor : inactiveColor} />

          <line x1="24" y1="95" x2="110" y2="95" stroke={b ? activeColor : inactiveColor} strokeWidth="3" />
          <circle cx="24" cy="95" r="5" fill={b ? activeColor : inactiveColor} />
          <text x="30" y="87" fontSize="11" fill="#64748b" fontWeight="bold">B={b}</text>
          <line x1="110" y1="95" x2="110" y2="195" stroke={b ? activeColor : inactiveColor} strokeWidth="3" />
          <line x1="110" y1="195" x2="130" y2="195" stroke={b ? activeColor : inactiveColor} strokeWidth="3" />
          <circle cx="110" cy="95" r="4" fill={b ? activeColor : inactiveColor} />

          <path d="M 130 25 Q 158 25 205 55 Q 158 85 130 85 Q 144 55 130 25 Z" fill="#ffffff" stroke="#2563eb" strokeWidth="3" />
          <path d="M 118 25 Q 132 55 118 85" fill="none" stroke="#2563eb" strokeWidth="2.5" />
          <text x="151" y="59" fontSize="13" fill="#2563eb" fontWeight="bold">XOR</text>

          <path d="M 130 130 L 165 130 A 45 45 0 0 1 165 220 L 130 220 Z" fill="#ffffff" stroke="#2563eb" strokeWidth="3" />
          <text x="143" y="181" fontSize="13" fill="#2563eb" fontWeight="bold">AND</text>

          <line x1="205" y1="55" x2="320" y2="55" stroke={sum ? activeColor : inactiveColor} strokeWidth="3" />
          <circle cx="320" cy="55" r="5" fill={sum ? activeColor : inactiveColor} />
          <text x="332" y="47" fontSize="11" fill="#64748b" fontWeight="bold">Sum={sum}</text>

          <line x1="210" y1="175" x2="320" y2="175" stroke={carry ? activeColor : inactiveColor} strokeWidth="3" />
          <circle cx="320" cy="175" r="5" fill={carry ? activeColor : inactiveColor} />
          <text x="332" y="167" fontSize="11" fill="#64748b" fontWeight="bold">Carry={carry}</text>
        </svg>
      </div>
    );
  }

  const gate1 = circuitType === 'AND-NOT' ? 'AND' : 'OR';
  const mid = circuitType === 'AND-NOT' ? (a & b) : (a | b);
  const out = Number(!mid);

  return (
    <div className="gate-svg-container circuit-svg-container">
      <svg width="340" height="140" viewBox="0 0 340 140">
        <line x1="20" y1="45" x2="70" y2="45" stroke={a ? activeColor : inactiveColor} strokeWidth="3" />
        <circle cx="20" cy="45" r="5" fill={a ? activeColor : inactiveColor} />
        <text x="25" y="37" fontSize="11" fill="#64748b" fontWeight="bold">A={a}</text>

        <line x1="20" y1="95" x2="70" y2="95" stroke={b ? activeColor : inactiveColor} strokeWidth="3" />
        <circle cx="20" cy="95" r="5" fill={b ? activeColor : inactiveColor} />
        <text x="25" y="87" fontSize="11" fill="#64748b" fontWeight="bold">B={b}</text>

        {gate1 === 'AND' ? (
          <path d="M 70 30 L 105 30 A 38 40 0 0 1 105 110 L 70 110 Z" fill="#ffffff" stroke="#2563eb" strokeWidth="3" />
        ) : (
          <path d="M 70 25 Q 98 25 145 70 Q 98 115 70 115 Q 84 70 70 25 Z" fill="#ffffff" stroke="#2563eb" strokeWidth="3" />
        )}
        <text x={gate1 === 'AND' ? '82' : '91'} y="76" fontSize="14" fill="#2563eb" fontWeight="bold">{gate1}</text>

        <line x1={gate1 === 'AND' ? '143' : '150'} y1="70" x2="180" y2="70" stroke={mid ? activeColor : inactiveColor} strokeWidth="3" />
        <circle cx="165" cy="70" r="4" fill={mid ? activeColor : inactiveColor} />
        <text x="145" y="62" fontSize="10" fill="#64748b">Mid={mid}</text>

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
          <div className="gate-tabs lab-mode-tabs" role="tablist">
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

              <div className="gate-info-banner">
                <h3>{info.name}</h3>
                <p>{info.desc}</p>
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
                <div className="output-box">
                  <span>{t.output}</span>
                  <strong>{currentOutput}</strong>
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
                    {item === 'half-adder' ? t.halfAdderLabel : item}
                  </button>
                ))}
              </div>

              <div className="gate-info-banner">
                <h3>{circInfo.name}</h3>
                <p>{circInfo.desc}</p>
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
                <div className="output-box circuit-output-box">
                  <span>{circuitType === 'half-adder' ? t.sumCarry : t.output}</span>
                  <strong>
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
                    <th>{circuitType === 'half-adder' ? t.sum : t.middleValue}</th>
                    <th>{circuitType === 'half-adder' ? t.carry : t.output}</th>
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
