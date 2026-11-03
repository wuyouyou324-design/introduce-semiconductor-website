import { useState } from 'react';
import { useRouter } from '../app/router';
import { useLanguage } from '../app/language';
import './ContentPages.css';

type Gate = 'AND' | 'OR' | 'NOT' | 'XOR';
const gates: Gate[] = ['AND', 'OR', 'NOT', 'XOR'];
const rows = [[0, 0], [0, 1], [1, 0], [1, 1]] as const;
function output(gate: Gate, a: number, b: number) { 
  if (gate === 'AND') return a & b; 
  if (gate === 'OR') return a | b; 
  if (gate === 'XOR') return a ^ b; 
  return Number(!a); 
}

export function LogicGatesLabPage() {
  const { navigate } = useRouter();
  const { t } = useLanguage();
  const [gate, setGate] = useState<Gate>('AND');
  const [a, setA] = useState(1);
  const [b, setB] = useState(0);
  const unary = gate === 'NOT';

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
              <strong>{output(gate, a, b)}</strong>
            </div>
          </div>
          <p className="formula">
            {unary ? `NOT ${a} = ${output(gate, a, b)}` : `${a} ${gate} ${b} = ${output(gate, a, b)}`}
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
