import { useState } from 'react';
import { useRouter } from '../app/useRouter';
import { useLanguage } from '../app/useLanguage';
import { type Language } from '../data/translations';
import { LabNav } from '../components/lab/LabNav';
import './ContentPages.css';

type Gate = 'AND' | 'OR' | 'NOT' | 'NAND' | 'NOR' | 'XOR' | 'XNOR';
const gates: Gate[] = ['AND', 'OR', 'NOT', 'NAND', 'NOR', 'XOR', 'XNOR'];

type LabMode = 'single' | 'circuit';
type CircuitType = 'AND-NOT' | 'OR-NOT' | 'half-adder' | 'full-adder' | '4bit-adder';
const circuits: CircuitType[] = ['AND-NOT', 'OR-NOT', 'half-adder', 'full-adder', '4bit-adder'];

const rows = [[0, 0], [0, 1], [1, 0], [1, 1]] as const;
const fullAdderRows = [
  [0, 0, 0],
  [0, 0, 1],
  [0, 1, 0],
  [0, 1, 1],
  [1, 0, 0],
  [1, 0, 1],
  [1, 1, 0],
  [1, 1, 1],
] as const;

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
    },
    'full-adder': {
      name: '全加器 (Full-Adder) 電路',
      desc: '由兩個半加器與一個 OR 閘組合而成，能夠接收本位的 A、B 以及前一位傳來的進位輸入 Cin，輸出本位和 Sum 與進位輸出 Cout。這是算術邏輯單元（ALU）最核心的積木！',
      formula: 'Sum = A ⊕ B ⊕ Cin, Cout = (A · B) + (Cin · (A ⊕ B))'
    },
    '4bit-adder': {
      name: '4 位元連鎖進位加減運算器 (4-bit ALU / Adder)',
      desc: '將 4 個全加器串聯（Ripple-Carry），讓第 0 位的 Cout 傳給第 1 位的 Cin，依此類推。支援 4 位元二進位加法與二補數減法，親眼見證硬體如何計算數字！',
      formula: 'Result = A ± B (4-bit binary arithmetic)'
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
    },
    'full-adder': {
      name: 'Full-Adder Circuit',
      desc: 'Built from two half-adders and an OR gate. Accepts inputs A, B, and Carry-in (Cin), producing Sum and Carry-out (Cout). The foundational block of modern ALUs!',
      formula: 'Sum = A ⊕ B ⊕ Cin, Cout = (A · B) + (Cin · (A ⊕ B))'
    },
    '4bit-adder': {
      name: '4-bit Ripple Carry Adder / ALU',
      desc: 'Chains 4 full adders together, rippling Cout of stage n into Cin of stage n+1. Supports 4-bit addition and 2s-complement subtraction, demonstrating how computer chips do arithmetic!',
      formula: 'Result = A ± B (4-bit binary arithmetic)'
    }
  }
};

type GateShape = 'and' | 'or' | 'not';

const gateVisuals: Record<Gate, { shape: GateShape; outputX: number; inverted: boolean; xor: boolean }> = {
  AND: { shape: 'and', outputX: 155, inverted: false, xor: false },
  OR: { shape: 'or', outputX: 140, inverted: false, xor: false },
  NOT: { shape: 'not', outputX: 142, inverted: false, xor: false },
  NAND: { shape: 'and', outputX: 167, inverted: true, xor: false },
  NOR: { shape: 'or', outputX: 152, inverted: true, xor: false },
  XOR: { shape: 'or', outputX: 140, inverted: false, xor: true },
  XNOR: { shape: 'or', outputX: 152, inverted: true, xor: true },
};

function GateShapeSvg({ shape, inverted, xor }: Pick<(typeof gateVisuals)[Gate], 'shape' | 'inverted' | 'xor'>) {
  return (
    <>
      {xor && <path d="M 62 25 Q 77 70 62 115" fill="none" stroke="var(--logic-gate-stroke)" strokeWidth="3" />}
      {shape === 'and' && <path d="M 70 25 L 110 25 A 45 45 0 0 1 110 115 L 70 115 Z" className="logic-gate-body" />}
      {shape === 'or' && <path d="M 70 25 Q 95 25 140 70 Q 95 115 70 115 Q 85 70 70 25 Z" className="logic-gate-body" />}
      {shape === 'not' && <polygon points="70,30 130,70 70,110" className="logic-gate-body" />}
      {inverted && <circle cx={shape === 'and' ? 161 : 146} cy="70" r="6" className="logic-gate-body" />}
    </>
  );
}

function GateSvg({ gate, a, b, outVal }: { gate: Gate; a: number; b: number; outVal: number }) {
  const isUnary = gate === 'NOT';
  const { outputX: outX1, ...shapeConfig } = gateVisuals[gate];

  return (
    <div className="gate-svg-container">
      <svg width="280" height="140" viewBox="0 0 280 140">
        <line x1="20" y1={isUnary ? "70" : "45"} x2="70" y2={isUnary ? "70" : "45"} stroke={a ? 'var(--logic-gate-active)' : 'var(--logic-gate-inactive)'} strokeWidth="4" />
        <circle cx="20" cy={isUnary ? "70" : "45"} r="6" fill={a ? 'var(--logic-gate-active)' : 'var(--logic-gate-inactive)'} />
        <text x="30" y={isUnary ? "62" : "37"} fontSize="12" className="logic-gate-label">A={a}</text>

        {!isUnary && (
          <>
            <line x1="20" y1="95" x2="70" y2="95" stroke={b ? 'var(--logic-gate-active)' : 'var(--logic-gate-inactive)'} strokeWidth="4" />
            <circle cx="20" cy="95" r="6" fill={b ? 'var(--logic-gate-active)' : 'var(--logic-gate-inactive)'} />
            <text x="30" y="87" fontSize="12" className="logic-gate-label">B={b}</text>
          </>
        )}

        <GateShapeSvg {...shapeConfig} />

        <line x1={outX1} y1="70" x2="260" y2="70" stroke={outVal ? 'var(--logic-gate-active)' : 'var(--logic-gate-inactive)'} strokeWidth="4" />
        <circle cx="260" cy="70" r="6" fill={outVal ? 'var(--logic-gate-active)' : 'var(--logic-gate-inactive)'} />
        <text x="230" y="62" fontSize="12" className="logic-gate-label">Out={outVal}</text>
      </svg>
    </div>
  );
}

interface CircuitSvgProps {
  circuitType: CircuitType;
  a: number;
  b: number;
  cin: number;
  fourBitA: number[];
  fourBitB: number[];
  subMode: boolean;
}

function CircuitSvg({ circuitType, a, b, cin, fourBitA, fourBitB, subMode }: CircuitSvgProps) {
  const activeColor = 'var(--logic-gate-active)';
  const inactiveColor = 'var(--logic-gate-inactive)';

  if (circuitType === 'half-adder') {
    const sum = a ^ b;
    const carry = a & b;
    return (
      <div className="gate-svg-container circuit-svg-container half-adder-svg-container">
        <svg width="440" height="230" viewBox="0 0 440 230">
          <text x="18" y="20" fontSize="10" fill="var(--logic-gate-inactive)" fontWeight="bold" letterSpacing="1.5">INPUT SPLIT</text>
          <text x="315" y="20" fontSize="10" fill="var(--logic-gate-inactive)" fontWeight="bold" letterSpacing="1.5">OUTPUTS</text>

          <line x1="24" y1="55" x2="130" y2="55" stroke={a ? activeColor : inactiveColor} strokeWidth="3" />
          <circle cx="24" cy="55" r="5" fill={a ? activeColor : inactiveColor} />
          <text x="30" y="47" fontSize="11" fill="var(--logic-gate-label)" fontWeight="bold">A={a}</text>
          <line x1="70" y1="55" x2="70" y2="155" stroke={a ? activeColor : inactiveColor} strokeWidth="3" />
          <line x1="70" y1="155" x2="130" y2="155" stroke={a ? activeColor : inactiveColor} strokeWidth="3" />
          <circle cx="70" cy="55" r="4" fill={a ? activeColor : inactiveColor} />

          <line x1="24" y1="95" x2="110" y2="95" stroke={b ? activeColor : inactiveColor} strokeWidth="3" />
          <circle cx="24" cy="95" r="5" fill={b ? activeColor : inactiveColor} />
          <text x="30" y="87" fontSize="11" fill="var(--logic-gate-label)" fontWeight="bold">B={b}</text>
          <line x1="110" y1="95" x2="110" y2="195" stroke={b ? activeColor : inactiveColor} strokeWidth="3" />
          <line x1="110" y1="195" x2="130" y2="195" stroke={b ? activeColor : inactiveColor} strokeWidth="3" />
          <circle cx="110" cy="95" r="4" fill={b ? activeColor : inactiveColor} />

          <path d="M 130 25 Q 158 25 205 55 Q 158 85 130 85 Q 144 55 130 25 Z" fill="var(--logic-gate-fill)" stroke="var(--logic-gate-stroke)" strokeWidth="3" />
          <path d="M 118 25 Q 132 55 118 85" fill="none" stroke="var(--logic-gate-stroke)" strokeWidth="2.5" />
          <text x="151" y="59" fontSize="13" fill="var(--logic-gate-stroke)" fontWeight="bold">XOR</text>

          <path d="M 130 130 L 165 130 A 45 45 0 0 1 165 220 L 130 220 Z" fill="var(--logic-gate-fill)" stroke="var(--logic-gate-stroke)" strokeWidth="3" />
          <text x="143" y="181" fontSize="13" fill="var(--logic-gate-stroke)" fontWeight="bold">AND</text>

          <line x1="205" y1="55" x2="320" y2="55" stroke={sum ? activeColor : inactiveColor} strokeWidth="3" />
          <circle cx="320" cy="55" r="5" fill={sum ? activeColor : inactiveColor} />
          <text x="332" y="47" fontSize="11" fill="var(--logic-gate-label)" fontWeight="bold">Sum={sum}</text>

          <line x1="210" y1="175" x2="320" y2="175" stroke={carry ? activeColor : inactiveColor} strokeWidth="3" />
          <circle cx="320" cy="175" r="5" fill={carry ? activeColor : inactiveColor} />
          <text x="332" y="167" fontSize="11" fill="var(--logic-gate-label)" fontWeight="bold">Carry={carry}</text>
        </svg>
      </div>
    );
  }

  if (circuitType === 'full-adder') {
    const xor1 = a ^ b;
    const and1 = a & b;
    const sum = xor1 ^ cin;
    const and2 = xor1 & cin;
    const cout = and1 | and2;

    return (
      <div className="gate-svg-container circuit-svg-container full-adder-svg-container">
        <svg width="520" height="260" viewBox="0 0 520 260">
          <text x="18" y="20" fontSize="10" fill="var(--logic-gate-inactive)" fontWeight="bold" letterSpacing="1.5">INPUTS</text>
          <text x="430" y="20" fontSize="10" fill="var(--logic-gate-inactive)" fontWeight="bold" letterSpacing="1.5">OUTPUTS</text>

          {/* Inputs A & B */}
          <line x1="20" y1="45" x2="110" y2="45" stroke={a ? activeColor : inactiveColor} strokeWidth="3" />
          <circle cx="20" cy="45" r="5" fill={a ? activeColor : inactiveColor} />
          <text x="25" y="38" fontSize="11" fill="var(--logic-gate-label)" fontWeight="bold">A={a}</text>

          <line x1="20" y1="85" x2="110" y2="85" stroke={b ? activeColor : inactiveColor} strokeWidth="3" />
          <circle cx="20" cy="85" r="5" fill={b ? activeColor : inactiveColor} />
          <text x="25" y="78" fontSize="11" fill="var(--logic-gate-label)" fontWeight="bold">B={b}</text>

          {/* Branch to AND1 */}
          <line x1="50" y1="45" x2="50" y2="155" stroke={a ? activeColor : inactiveColor} strokeWidth="3" />
          <line x1="50" y1="155" x2="110" y2="155" stroke={a ? activeColor : inactiveColor} strokeWidth="3" />
          <circle cx="50" cy="45" r="3.5" fill={a ? activeColor : inactiveColor} />

          <line x1="75" y1="85" x2="75" y2="185" stroke={b ? activeColor : inactiveColor} strokeWidth="3" />
          <line x1="75" y1="185" x2="110" y2="185" stroke={b ? activeColor : inactiveColor} strokeWidth="3" />
          <circle cx="75" cy="85" r="3.5" fill={b ? activeColor : inactiveColor} />

          {/* XOR 1 Gate */}
          <path d="M 110 30 Q 135 30 170 65 Q 135 100 110 100 Q 120 65 110 30 Z" fill="var(--logic-gate-fill)" stroke="var(--logic-gate-stroke)" strokeWidth="2.5" />
          <path d="M 102 30 Q 112 65 102 100" fill="none" stroke="var(--logic-gate-stroke)" strokeWidth="2" />
          <text x="126" y="69" fontSize="11" fill="var(--logic-gate-stroke)" fontWeight="bold">XOR1</text>

          {/* AND 1 Gate */}
          <path d="M 110 140 L 140 140 A 30 30 0 0 1 140 200 L 110 200 Z" fill="var(--logic-gate-fill)" stroke="var(--logic-gate-stroke)" strokeWidth="2.5" />
          <text x="120" y="174" fontSize="11" fill="var(--logic-gate-stroke)" fontWeight="bold">AND1</text>

          {/* Input Cin */}
          <line x1="20" y1="115" x2="230" y2="115" stroke={cin ? activeColor : inactiveColor} strokeWidth="3" />
          <circle cx="20" cy="115" r="5" fill={cin ? activeColor : inactiveColor} />
          <text x="25" y="108" fontSize="11" fill="var(--logic-gate-label)" fontWeight="bold">Cin={cin}</text>

          {/* Wire from XOR1 output */}
          <line x1="170" y1="65" x2="240" y2="65" stroke={xor1 ? activeColor : inactiveColor} strokeWidth="3" />
          <circle cx="200" cy="65" r="3.5" fill={xor1 ? activeColor : inactiveColor} />
          <line x1="200" y1="65" x2="200" y2="215" stroke={xor1 ? activeColor : inactiveColor} strokeWidth="3" />
          <line x1="200" y1="215" x2="240" y2="215" stroke={xor1 ? activeColor : inactiveColor} strokeWidth="3" />

          {/* Wire Cin to XOR2 and AND2 */}
          <line x1="230" y1="85" x2="240" y2="85" stroke={cin ? activeColor : inactiveColor} strokeWidth="3" />
          <line x1="230" y1="115" x2="230" y2="85" stroke={cin ? activeColor : inactiveColor} strokeWidth="3" />
          <circle cx="230" cy="115" r="3.5" fill={cin ? activeColor : inactiveColor} />
          <line x1="230" y1="115" x2="230" y2="235" stroke={cin ? activeColor : inactiveColor} strokeWidth="3" />
          <line x1="230" y1="235" x2="240" y2="235" stroke={cin ? activeColor : inactiveColor} strokeWidth="3" />

          {/* XOR 2 Gate */}
          <path d="M 240 50 Q 265 50 300 75 Q 265 100 240 100 Q 250 75 240 50 Z" fill="var(--logic-gate-fill)" stroke="var(--logic-gate-stroke)" strokeWidth="2.5" />
          <path d="M 232 50 Q 242 75 232 100" fill="none" stroke="var(--logic-gate-stroke)" strokeWidth="2" />
          <text x="256" y="79" fontSize="11" fill="var(--logic-gate-stroke)" fontWeight="bold">XOR2</text>

          {/* Output Sum */}
          <line x1="300" y1="75" x2="430" y2="75" stroke={sum ? activeColor : inactiveColor} strokeWidth="3.5" />
          <circle cx="430" cy="75" r="6" fill={sum ? activeColor : inactiveColor} />
          <text x="442" y="72" fontSize="13" fill="var(--logic-gate-label)" fontWeight="bold">Sum={sum}</text>

          {/* AND 2 Gate */}
          <path d="M 240 205 L 265 205 A 25 25 0 0 1 265 245 L 240 245 Z" fill="var(--logic-gate-fill)" stroke="var(--logic-gate-stroke)" strokeWidth="2.5" />
          <text x="246" y="229" fontSize="10" fill="var(--logic-gate-stroke)" fontWeight="bold">AND2</text>

          {/* OR Gate for Cout */}
          <line x1="170" y1="170" x2="330" y2="170" stroke={and1 ? activeColor : inactiveColor} strokeWidth="2.5" />
          <line x1="290" y1="225" x2="310" y2="225" stroke={and2 ? activeColor : inactiveColor} strokeWidth="2.5" />
          <line x1="310" y1="225" x2="310" y2="195" stroke={and2 ? activeColor : inactiveColor} strokeWidth="2.5" />
          <line x1="310" y1="195" x2="330" y2="195" stroke={and2 ? activeColor : inactiveColor} strokeWidth="2.5" />

          <path d="M 330 155 Q 355 155 385 182 Q 355 210 330 210 Q 340 182 330 155 Z" fill="var(--logic-gate-fill)" stroke="var(--logic-gate-stroke)" strokeWidth="2.5" />
          <text x="345" y="186" fontSize="11" fill="var(--logic-gate-stroke)" fontWeight="bold">OR</text>

          {/* Output Cout */}
          <line x1="385" y1="182" x2="430" y2="182" stroke={cout ? activeColor : inactiveColor} strokeWidth="3.5" />
          <circle cx="430" cy="182" r="6" fill={cout ? activeColor : inactiveColor} />
          <text x="442" y="186" fontSize="13" fill="var(--logic-gate-label)" fontWeight="bold">Cout={cout}</text>
        </svg>
      </div>
    );
  }

  if (circuitType === '4bit-adder') {
    // 4-bit addition/subtraction
    // Calculate ripple carry
    const c0 = subMode ? 1 : 0;
    const bEff = fourBitB.map((bit) => (subMode ? 1 - bit : bit));

    const s: number[] = [];
    const carries: number[] = [c0];

    for (let i = 0; i < 4; i++) {
      const bitA = fourBitA[i];
      const bitB = bEff[i];
      const bitCin = carries[i];

      const bitSum = bitA ^ bitB ^ bitCin;
      const bitCout = ((bitA ^ bitB) & bitCin) | (bitA & bitB);

      s.push(bitSum);
      carries.push(bitCout);
    }

    const valA = fourBitA[0] + fourBitA[1] * 2 + fourBitA[2] * 4 + fourBitA[3] * 8;
    const valB = fourBitB[0] + fourBitB[1] * 2 + fourBitB[2] * 4 + fourBitB[3] * 8;
    const resultVal = subMode ? valA - valB : valA + valB;

    return (
      <div className="gate-svg-container circuit-svg-container four-bit-adder-svg-container">
        <svg width="580" height="240" viewBox="0 0 580 240">
          <text x="20" y="24" fontSize="12" fill="var(--primary-color)" fontWeight="bold">
            {subMode ? '4-Bit Subtractor (A - B)' : '4-Bit Ripple Carry Adder (A + B)'}
          </text>
          <text x="420" y="24" fontSize="11" fill="var(--text-muted)">
            Cin = {c0} ({subMode ? "二補數進位 1" : "初始進位 0"})
          </text>

          {/* 4 Stages: i = 3, 2, 1, 0 from left to right */}
          {[3, 2, 1, 0].map((idx, pos) => {
            const boxX = 40 + pos * 120;
            const boxY = 65;
            const boxW = 85;
            const boxH = 95;
            const bitA = fourBitA[idx];
            const bitB = fourBitB[idx];
            const bitS = s[idx];
            const cinStage = carries[idx];
            const coutStage = carries[idx + 1];

            return (
              <g key={idx}>
                {/* Full Adder Box */}
                <rect
                  x={boxX}
                  y={boxY}
                  width={boxW}
                  height={boxH}
                  rx="8"
                  fill="var(--card-bg)"
                  stroke="var(--border-color)"
                  strokeWidth="2"
                />
                <text x={boxX + 22} y={boxY + 24} fontSize="13" fontWeight="bold" fill="var(--primary-color)">
                  FA {idx}
                </text>
                <text x={boxX + 15} y={boxY + 42} fontSize="9" fill="var(--text-muted)">
                  Bit 2^{idx} ({Math.pow(2, idx)})
                </text>
                <text x={boxX + 15} y={boxY + 56} fontSize="9" fill="var(--text-muted)">
                  Cin: {cinStage ? 1 : 0} | Cout: {coutStage ? 1 : 0}
                </text>

                {/* Input A_i (top left) */}
                <line x1={boxX + 25} y1="35" x2={boxX + 25} y2={boxY} stroke={bitA ? activeColor : inactiveColor} strokeWidth="3" />
                <circle cx={boxX + 25} cy="35" r="4" fill={bitA ? activeColor : inactiveColor} />
                <text x={boxX + 18} y="30" fontSize="10" fontWeight="bold" fill="var(--logic-gate-label)">
                  A{idx}={bitA}
                </text>

                {/* Input B_i (top right) */}
                <line x1={boxX + 60} y1="35" x2={boxX + 60} y2={boxY} stroke={bitB ? activeColor : inactiveColor} strokeWidth="3" />
                <circle cx={boxX + 60} cy="35" r="4" fill={bitB ? activeColor : inactiveColor} />
                <text x={boxX + 53} y="30" fontSize="10" fontWeight="bold" fill="var(--logic-gate-label)">
                  B{idx}={bitB}
                </text>

                {/* Output Sum_i (bottom) */}
                <line x1={boxX + 42} y1={boxY + boxH} x2={boxX + 42} y2="195" stroke={bitS ? activeColor : inactiveColor} strokeWidth="3" />
                <circle cx={boxX + 42} cy="195" r="5" fill={bitS ? activeColor : inactiveColor} />
                <text x={boxX + 30} y="215" fontSize="12" fontWeight="bold" fill="var(--logic-gate-label)">
                  S{idx}={bitS}
                </text>

                {/* Ripple Carry Line between stages */}
                {/* Carry-in enters from right */}
                {pos === 3 ? (
                  // Initial Cin into FA0
                  <g>
                    <line x1={boxX + boxW} y1={boxY + 55} x2={boxX + boxW + 35} y2={boxY + 55} stroke={c0 ? activeColor : inactiveColor} strokeWidth="3" />
                    <circle cx={boxX + boxW + 35} cy={boxY + 55} r="4" fill={c0 ? activeColor : inactiveColor} />
                    <text x={boxX + boxW + 8} y={boxY + 48} fontSize="9" fill="var(--text-muted)">C0={c0}</text>
                  </g>
                ) : null}

                {/* Carry out to the next FA on left */}
                <line
                  x1={boxX}
                  y1={boxY + 55}
                  x2={boxX - 35}
                  y2={boxY + 55}
                  stroke={coutStage ? activeColor : inactiveColor}
                  strokeWidth="3"
                />
                <circle cx={boxX - 18} cy={boxY + 55} r="3" fill={coutStage ? activeColor : inactiveColor} />
                <text x={boxX - 30} y={boxY + 48} fontSize="9" fill="var(--text-muted)">C{idx + 1}={coutStage}</text>
              </g>
            );
          })}

          {/* Final Cout / Overflow */}
          <text x="15" y="125" fontSize="11" fontWeight="bold" fill="var(--primary-color)">
            Cout={carries[4]}
          </text>
        </svg>

        {/* 4-bit Calculation equation badge */}
        <div className="four-bit-calc-badge">
          <span>{`二進位：${fourBitA.slice().reverse().join('')}₂ (${valA}) ${subMode ? '-' : '+'} ${fourBitB.slice().reverse().join('')}₂ (${valB}) = ${s.slice().reverse().join('')}₂ (${resultVal})`}</span>
          {carries[4] === 1 && !subMode && <span className="overflow-tag">⚠️ 溢位 (Carry Out = 1)</span>}
        </div>
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
        <text x="25" y="37" fontSize="11" fill="var(--logic-gate-label)" fontWeight="bold">A={a}</text>

        <line x1="20" y1="95" x2="70" y2="95" stroke={b ? activeColor : inactiveColor} strokeWidth="3" />
        <circle cx="20" cy="95" r="5" fill={b ? activeColor : inactiveColor} />
        <text x="25" y="87" fontSize="11" fill="var(--logic-gate-label)" fontWeight="bold">B={b}</text>

        {gate1 === 'AND' ? (
          <path d="M 70 30 L 105 30 A 38 40 0 0 1 105 110 L 70 110 Z" fill="var(--logic-gate-fill)" stroke="var(--logic-gate-stroke)" strokeWidth="3" />
        ) : (
          <path d="M 70 25 Q 98 25 145 70 Q 98 115 70 115 Q 84 70 70 25 Z" fill="var(--logic-gate-fill)" stroke="var(--logic-gate-stroke)" strokeWidth="3" />
        )}
        <text x={gate1 === 'AND' ? '82' : '91'} y="76" fontSize="14" fill="var(--logic-gate-stroke)" fontWeight="bold">{gate1}</text>

        <line x1={gate1 === 'AND' ? '143' : '150'} y1="70" x2="180" y2="70" stroke={mid ? activeColor : inactiveColor} strokeWidth="3" />
        <circle cx="165" cy="70" r="4" fill={mid ? activeColor : inactiveColor} />
        <text x="145" y="62" fontSize="10" fill="var(--logic-gate-label)">Mid={mid}</text>

        <polygon points="180,35 230,70 180,105" fill="var(--logic-gate-fill)" stroke="var(--logic-gate-stroke)" strokeWidth="3" />
        <circle cx="236" cy="70" r="5" fill="var(--logic-gate-fill)" stroke="var(--logic-gate-stroke)" strokeWidth="3" />
        <text x="190" y="74" fontSize="12" fill="var(--logic-gate-stroke)" fontWeight="bold">NOT</text>

        <line x1="241" y1="70" x2="310" y2="70" stroke={out ? activeColor : inactiveColor} strokeWidth="3" />
        <circle cx="310" cy="70" r="5" fill={out ? activeColor : inactiveColor} />
        <text x="270" y="62" fontSize="11" fill="var(--logic-gate-label)" fontWeight="bold">Out={out}</text>
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
  const [cin, setCin] = useState(0);

  // 4-bit adder states: LSB at index 0, MSB at index 3
  const [fourBitA, setFourBitA] = useState<number[]>([1, 0, 1, 0]); // 5
  const [fourBitB, setFourBitB] = useState<number[]>([1, 1, 0, 0]); // 3
  const [subMode, setSubMode] = useState<boolean>(false);

  const unary = gate === 'NOT';
  const currentOutput = output(gate, a, b);
  const info = gateDescriptions[language][gate];
  const circInfo = circuitDescriptions[language][circuitType];

  const circMid = circuitType === 'AND-NOT' ? (a & b) : (a | b);
  const circOut = circuitType === 'half-adder' ? 0 : Number(!circMid);

  const fullAdderSum = a ^ b ^ cin;
  const fullAdderCout = ((a ^ b) & cin) | (a & b);

  const toggleBitA = (idx: number) => {
    setFourBitA((prev) => {
      const copy = [...prev];
      copy[idx] = 1 - copy[idx];
      return copy;
    });
  };

  const toggleBitB = (idx: number) => {
    setFourBitB((prev) => {
      const copy = [...prev];
      copy[idx] = 1 - copy[idx];
      return copy;
    });
  };

  const isZh = language === 'zh';

  return (
    <div className="content-page">
      <section className="content-hero">
        <span className="eyebrow">{t.labEyebrow}</span>
        <h1>{t.labTitle}</h1>
        <p>{t.labDesc}</p>
      </section>
      <div className="content-container">
        <LabNav currentTab="logic-gates" />
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
              <div className="truth-table-wrapper">
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
              </div>
            </>
          ) : (
            <>
              <div className="gate-tabs circuit-mode-tabs" role="tablist" aria-label={t.selectCircuit}>
                {circuits.map((item) => {
                  const label = circuitDescriptions[language][item].name;

                  return (
                    <button
                      type="button"
                      key={item}
                      role="tab"
                      aria-selected={circuitType === item}
                      className={circuitType === item ? 'selected' : ''}
                      onClick={() => setCircuitType(item)}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>

              <div className="gate-info-banner">
                <h3>{circInfo.name}</h3>
                <p>{circInfo.desc}</p>
              </div>

              <CircuitSvg
                circuitType={circuitType}
                a={a}
                b={b}
                cin={cin}
                fourBitA={fourBitA}
                fourBitB={fourBitB}
                subMode={subMode}
              />

              {/* Controls specific to circuit type */}
              {circuitType === '4bit-adder' ? (
                <div className="four-bit-controls">
                  <div className="four-bit-row">
                    <span className="bit-row-label">{isZh ? '輸入 A (4 位元)：' : 'Input A (4-bit):'}</span>
                    <div className="bit-buttons">
                      {[3, 2, 1, 0].map((idx) => (
                        <button
                          key={idx}
                          type="button"
                          className={`bit-btn ${fourBitA[idx] ? 'on' : ''}`}
                          onClick={() => toggleBitA(idx)}
                        >
                          <span className="bit-label">A{idx}</span>
                          <span className="bit-val">{fourBitA[idx]}</span>
                        </button>
                      ))}
                    </div>
                    <span className="bit-dec">
                      = {fourBitA[0] + fourBitA[1] * 2 + fourBitA[2] * 4 + fourBitA[3] * 8}
                    </span>
                  </div>

                  <div className="four-bit-row">
                    <span className="bit-row-label">{isZh ? '輸入 B (4 位元)：' : 'Input B (4-bit):'}</span>
                    <div className="bit-buttons">
                      {[3, 2, 1, 0].map((idx) => (
                        <button
                          key={idx}
                          type="button"
                          className={`bit-btn ${fourBitB[idx] ? 'on' : ''}`}
                          onClick={() => toggleBitB(idx)}
                        >
                          <span className="bit-label">B{idx}</span>
                          <span className="bit-val">{fourBitB[idx]}</span>
                        </button>
                      ))}
                    </div>
                    <span className="bit-dec">
                      = {fourBitB[0] + fourBitB[1] * 2 + fourBitB[2] * 4 + fourBitB[3] * 8}
                    </span>
                  </div>

                  <div className="op-mode-toggle">
                    <button
                      type="button"
                      className={`mode-btn ${!subMode ? 'active' : ''}`}
                      onClick={() => setSubMode(false)}
                    >
                      ➕ {isZh ? '加法運算 (Addition)' : 'Addition (+)'}
                    </button>
                    <button
                      type="button"
                      className={`mode-btn ${subMode ? 'active' : ''}`}
                      onClick={() => setSubMode(true)}
                    >
                      ➖ {isZh ? '減法運算 (2補數 Subtraction)' : 'Subtraction (-)'}
                    </button>
                  </div>
                </div>
              ) : (
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

                  {circuitType === 'full-adder' && (
                    <label>
                      {t.carryIn}
                      <button
                        type="button"
                        className={`switch ${cin ? 'on' : ''}`}
                        aria-pressed={Boolean(cin)}
                        onClick={() => setCin(1 - cin)}
                      >
                        {cin}
                      </button>
                    </label>
                  )}

                  <div className="output-box circuit-output-box">
                    <span>
                      {circuitType === 'half-adder' || circuitType === 'full-adder'
                        ? t.sumCarry
                        : t.output}
                    </span>
                    <strong>
                      {circuitType === 'half-adder' && `S=${a ^ b}, C=${a & b}`}
                      {circuitType === 'full-adder' && `S=${fullAdderSum}, Cout=${fullAdderCout}`}
                      {circuitType !== 'half-adder' && circuitType !== 'full-adder' && circOut}
                    </strong>
                  </div>
                </div>
              )}

              <p className="formula">{circInfo.formula}</p>

              {/* Truth Tables */}
              {circuitType === 'full-adder' ? (
                <div className="truth-table-wrapper">
                  <table className="truth-table">
                    <caption>{circInfo.name} {t.truthTable}</caption>
                    <thead>
                      <tr>
                        <th>{t.inputA}</th>
                        <th>{t.inputB}</th>
                        <th>{t.carryIn}</th>
                        <th>{t.sum}</th>
                        <th>{t.carryOut}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {fullAdderRows.map(([x, y, c]) => {
                        const sVal = x ^ y ^ c;
                        const cVal = ((x ^ y) & c) | (x & y);
                        const isCurrent = x === a && y === b && c === cin;
                        return (
                          <tr key={`${x}-${y}-${c}`} className={isCurrent ? 'row-active' : ''}>
                            <td>{x}</td>
                            <td>{y}</td>
                            <td>{c}</td>
                            <td><strong>{sVal}</strong></td>
                            <td><strong>{cVal}</strong></td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              ) : circuitType !== '4bit-adder' ? (
                <div className="truth-table-wrapper">
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
                        const isCurrent = x === a && y === b;
                        return (
                          <tr key={`${x}-${y}`} className={isCurrent ? 'row-active' : ''}>
                            <td>{x}</td>
                            <td>{y}</td>
                            <td>{circuitType === 'half-adder' ? sum : m}</td>
                            <td>{circuitType === 'half-adder' ? carry : o}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              ) : null}
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
