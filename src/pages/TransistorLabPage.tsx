import { useState, useMemo } from 'react';
import { useRouter } from '../app/useRouter';
import { useLanguage } from '../app/useLanguage';
import { LabNav } from '../components/lab/LabNav';
import {
  IconMicroscope,
  IconZap,
  IconSliders,
  IconLightbulb,
} from '../components/ui/Icons';
import './ContentPages.css';

type TransistorType = 'nmos' | 'pmos';
type LabSubTab = 'single-fet' | 'cmos-inverter';

export function TransistorLabPage() {
  const { navigate } = useRouter();
  const { language } = useLanguage();

  const [activeTab, setActiveTab] = useState<LabSubTab>('single-fet');
  const [fetType, setFetType] = useState<TransistorType>('nmos');
  const [vGate, setVGate] = useState<number>(1.2); // Gate voltage 0 ~ 1.8V
  const [vDrain, setVDrain] = useState<number>(1.2); // Drain voltage 0 ~ 1.8V
  const [cmosInput, setCmosInput] = useState<number>(0); // 0 or 1

  const isZh = language === 'zh';
  const vTh = 0.6; // Threshold voltage 0.6V

  // NMOS conducts when Vgs >= Vth; PMOS conducts when Vgs <= (Vdd - Vth)
  const isConducting = useMemo(() => {
    if (fetType === 'nmos') {
      return vGate >= vTh;
    } else {
      // PMOS: conductive when gate is low (relative to source Vdd = 1.8V)
      return vGate <= 1.8 - vTh;
    }
  }, [fetType, vGate]);

  // Channel depth / opacity based on gate overdrive voltage
  const channelIntensity = useMemo(() => {
    if (fetType === 'nmos') {
      if (vGate < vTh) return 0;
      return Math.min(1, (vGate - vTh) / (1.8 - vTh));
    } else {
      if (vGate > 1.8 - vTh) return 0;
      return Math.min(1, (1.8 - vTh - vGate) / (1.8 - vTh));
    }
  }, [fetType, vGate]);

  // Current estimation in mA
  const currentMa = useMemo(() => {
    if (!isConducting) return 0;
    return channelIntensity * vDrain * 2.8;
  }, [isConducting, channelIntensity, vDrain]);

  return (
    <div className="content-page transistor-lab-page">
      <section className="content-hero">
        <span className="eyebrow">{isZh ? '互動體驗 · 微電子物理核心' : 'Interactive Lab · Microelectronics Physics'}</span>
        <h1>{isZh ? 'MOSFET 與 CMOS 動態模擬器' : 'MOSFET & CMOS Dynamic Simulator'}</h1>
        <p>
          {isZh
            ? '親手調整閘極電壓，觀察反轉層導電通道（Inversion Channel）的形成與消失，理解數十億顆微型開關如何構成現代 CPU 與 GPU！'
            : 'Adjust gate voltage in real time to observe the creation and collapse of the inversion channel. Understand how billions of nanoscale switches drive modern microprocessors!'}
        </p>
      </section>

      <div className="content-container">
        <LabNav currentTab="transistor" />

        {/* Sub-tabs: Single MOSFET vs CMOS Inverter */}
        <div className="gate-tabs lab-mode-tabs" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'single-fet'}
            className={activeTab === 'single-fet' ? 'selected' : ''}
            onClick={() => setActiveTab('single-fet')}
          >
            {isZh ? <><IconMicroscope size="1em" aria-hidden="true" /> 單顆 MOSFET 場效電晶體</> : <><IconMicroscope size="1em" aria-hidden="true" /> Single MOSFET Transistor</>}
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'cmos-inverter'}
            className={activeTab === 'cmos-inverter' ? 'selected' : ''}
            onClick={() => setActiveTab('cmos-inverter')}
          >
            {isZh ? <><IconZap size="1em" aria-hidden="true" /> 互補式 CMOS 反相器 (Inverter)</> : <><IconZap size="1em" aria-hidden="true" /> Complementary CMOS Inverter</>}
          </button>
        </div>

        {activeTab === 'single-fet' ? (
          <div className="transistor-layout">
            {/* Controls */}
            <div className="transistor-controls-card">
              <h2>{isZh ? <><IconSliders size="1em" aria-hidden="true" /> 電晶體偏壓控制</> : <><IconSliders size="1em" aria-hidden="true" /> Biasing Controls</>}</h2>

              <div className="param-group">
                <label>
                  <span>{isZh ? '電晶體類型 (Transistor Type)' : 'Transistor Type'}</span>
                  <strong>{fetType.toUpperCase()}</strong>
                </label>
                <div className="wafer-size-selector">
                  <button
                    type="button"
                    className={`size-btn ${fetType === 'nmos' ? 'active' : ''}`}
                    onClick={() => setFetType('nmos')}
                  >
                    NMOS ({isZh ? '電子載子' : 'Electron Carrier'})
                  </button>
                  <button
                    type="button"
                    className={`size-btn ${fetType === 'pmos' ? 'active' : ''}`}
                    onClick={() => setFetType('pmos')}
                  >
                    PMOS ({isZh ? '電洞載子' : 'Hole Carrier'})
                  </button>
                </div>
              </div>

              <div className="param-group">
                <label>
                  <span>{isZh ? '閘極電壓 (Gate Voltage Vgs)' : 'Gate Voltage (Vgs)'}</span>
                  <strong>{vGate.toFixed(2)} V</strong>
                </label>
                <input
                  type="range"
                  min="0"
                  max="1.8"
                  step="0.05"
                  value={vGate}
                  onChange={(e) => setVGate(parseFloat(e.target.value))}
                />
                <span className="param-hint">
                  {fetType === 'nmos'
                    ? (isZh ? `導通門檻電壓 Vth = 0.60V (當前 ${vGate >= vTh ? '已達門檻：開關導通' : '未達門檻：斷路'})`
                            : `Threshold Vth = 0.60V (Currently ${vGate >= vTh ? 'ON' : 'OFF'})`)
                    : (isZh ? `導通門檻電壓 Vth = 0.60V (當 Vg ≤ 1.20V 時導通，當前 ${vGate <= 1.2 ? '導通' : '斷路'})`
                            : `Conducts when Vg ≤ 1.20V (Currently ${vGate <= 1.2 ? 'ON' : 'OFF'})`)}
                </span>
              </div>

              <div className="param-group">
                <label>
                  <span>{isZh ? '汲極電壓 (Drain Voltage Vds)' : 'Drain Voltage (Vds)'}</span>
                  <strong>{vDrain.toFixed(2)} V</strong>
                </label>
                <input
                  type="range"
                  min="0"
                  max="1.8"
                  step="0.1"
                  value={vDrain}
                  onChange={(e) => setVDrain(parseFloat(e.target.value))}
                />
              </div>

              <div className="state-status-indicator">
                <span className="status-label">{isZh ? '開關狀態：' : 'Switch State:'}</span>
                <span className={`status-pill ${isConducting ? 'on' : 'off'}`}>
                  {isConducting
                    ? (isZh ? <><span className="status-dot on" aria-hidden="true" /> 導通 (Conducting / ON)</> : <><span className="status-dot on" aria-hidden="true" /> ON (Conducting)</>)
                    : (isZh ? <><span className="status-dot off" aria-hidden="true" /> 截止 (Cut-off / OFF)</> : <><span className="status-dot off" aria-hidden="true" /> OFF (Cut-off)</>)}
                </span>
              </div>
            </div>

            {/* Visualizer */}
            <div className="transistor-visual-card">
              <h2>{isZh ? <><IconMicroscope size="1em" aria-hidden="true" /> MOSFET 剖面結構與導電通道</> : <><IconMicroscope size="1em" aria-hidden="true" /> MOSFET Cross-Section & Channel</>}</h2>

              <div className="fet-svg-container">
                <svg viewBox="0 0 540 280" className="fet-cross-svg">
                  {/* Substrate */}
                  <rect
                    x="40"
                    y="110"
                    width="460"
                    height="140"
                    rx="4"
                    fill={fetType === 'nmos' ? '#f8fafc' : '#f1f5f9'}
                    stroke="var(--border-color)"
                    strokeWidth="2"
                    className="fet-substrate"
                  />
                  <text x="240" y="225" fontSize="13" fontWeight="bold" fill="var(--text-muted)">
                    {fetType === 'nmos' ? 'P-type Silicon Substrate' : 'N-type Silicon Well'}
                  </text>

                  {/* Source N+ / P+ region */}
                  <rect
                    x="70"
                    y="110"
                    width="100"
                    height="55"
                    rx="3"
                    fill={fetType === 'nmos' ? '#38bdf8' : '#fb923c'}
                    opacity="0.85"
                  />
                  <text x="95" y="145" fontSize="13" fontWeight="bold" fill="#0f172a">
                    {fetType === 'nmos' ? 'Source (N+)' : 'Source (P+)'}
                  </text>

                  {/* Drain N+ / P+ region */}
                  <rect
                    x="370"
                    y="110"
                    width="100"
                    height="55"
                    rx="3"
                    fill={fetType === 'nmos' ? '#38bdf8' : '#fb923c'}
                    opacity="0.85"
                  />
                  <text x="398" y="145" fontSize="13" fontWeight="bold" fill="#0f172a">
                    {fetType === 'nmos' ? 'Drain (N+)' : 'Drain (P+)'}
                  </text>

                  {/* Dielectric Oxide Layer (SiO2) */}
                  <rect
                    x="190"
                    y="95"
                    width="160"
                    height="15"
                    fill="#cbd5e1"
                    stroke="#94a3b8"
                    strokeWidth="1"
                  />
                  <text x="228" y="106" fontSize="9" fontWeight="bold" fill="#334155">
                    Oxide (SiO₂)
                  </text>

                  {/* Gate Electrode */}
                  <rect
                    x="190"
                    y="55"
                    width="160"
                    height="40"
                    rx="3"
                    fill="#0284c7"
                  />
                  <text x="232" y="80" fontSize="13" fontWeight="bold" fill="#ffffff">
                    Gate (閘極)
                  </text>
                  <text x="242" y="45" fontSize="12" fontWeight="bold" fill="var(--primary-color)">
                    Vg = {vGate.toFixed(2)}V
                  </text>

                  {/* Gate connection line */}
                  <line x1="270" y1="20" x2="270" y2="55" stroke="var(--primary-color)" strokeWidth="3" />
                  <circle cx="270" cy="20" r="4" fill="var(--primary-color)" />

                  {/* Source connection line */}
                  <line x1="120" y1="40" x2="120" y2="110" stroke="#0284c7" strokeWidth="3" />
                  <circle cx="120" cy="40" r="4" fill="#0284c7" />
                  <text x="95" y="32" fontSize="11" fontWeight="bold" fill="var(--text-main)">Source (0V)</text>

                  {/* Drain connection line */}
                  <line x1="420" y1="40" x2="420" y2="110" stroke="#0284c7" strokeWidth="3" />
                  <circle cx="420" cy="40" r="4" fill="#0284c7" />
                  <text x="395" y="32" fontSize="11" fontWeight="bold" fill="var(--text-main)">Vd = {vDrain.toFixed(2)}V</text>

                  {/* Conductive Channel in between Source and Drain */}
                  <rect
                    x="170"
                    y="110"
                    width="200"
                    height="20"
                    fill={fetType === 'nmos' ? '#10b981' : '#f59e0b'}
                    opacity={channelIntensity * 0.9}
                    className="channel-rect"
                  />
                  {isConducting && (
                    <text x="210" y="125" fontSize="11" fontWeight="bold" fill="#ffffff">
                      {fetType === 'nmos' ? '反轉層導電通道' : '導電通道 (ON)'}
                    </text>
                  )}

                  {/* Animated electron carrier dots */}
                  {isConducting && (
                    <g className="carrier-stream">
                      {[190, 230, 270, 310, 350].map((cx, i) => (
                        <circle
                          key={i}
                          cx={cx}
                          cy="120"
                          r="3"
                          fill="#ffffff"
                        />
                      ))}
                    </g>
                  )}
                </svg>
              </div>

              {/* Status & Live Indicators */}
              <div className="fet-metrics-bar">
                <div className="metric-pill">
                  <span className="label">{isZh ? '通道形成度' : 'Channel Inversion'}</span>
                  <strong>{(channelIntensity * 100).toFixed(0)}%</strong>
                </div>
                <div className="metric-pill">
                  <span className="label">{isZh ? '流經電流 I_DS' : 'Current I_DS'}</span>
                  <strong>{currentMa.toFixed(2)} mA</strong>
                </div>
                <div className="metric-pill">
                  <span className="label">{isZh ? '等效開關' : 'Equivalent Switch'}</span>
                  <strong className={isConducting ? 'color-on' : 'color-off'}>
                    {isConducting ? (isZh ? '通電導通 (1)' : 'Closed (1)') : (isZh ? '斷開 (0)' : 'Open (0)')}
                  </strong>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* CMOS Inverter Lab */
          <div className="cmos-layout">
            <div className="cmos-controls-card">
              <h2>{isZh ? <><IconSliders size="1em" aria-hidden="true" /> CMOS 輸入訊號切換</> : <><IconSliders size="1em" aria-hidden="true" /> CMOS Input Signal</>}</h2>
              <p>
                {isZh
                  ? 'CMOS 由一顆 PMOS（接高電位 Vdd）與一顆 NMOS（接低電位 GND）串聯而成。'
                  : 'CMOS is composed of a PMOS (pull-up to Vdd) and an NMOS (pull-down to GND).'}
              </p>

              <div className="cmos-input-toggle">
                <button
                  type="button"
                  className={`input-btn ${cmosInput === 0 ? 'active' : ''}`}
                  onClick={() => setCmosInput(0)}
                >
                  <span className="btn-bin">0</span>
                  <span className="btn-txt">{isZh ? '輸入低電位 (0V / GND)' : 'Low (0V / GND)'}</span>
                </button>
                <button
                  type="button"
                  className={`input-btn ${cmosInput === 1 ? 'active' : ''}`}
                  onClick={() => setCmosInput(1)}
                >
                  <span className="btn-bin">1</span>
                  <span className="btn-txt">{isZh ? '輸入高電位 (1.8V / Vdd)' : 'High (1.8V / Vdd)'}</span>
                </button>
              </div>

              <div className="cmos-truth-box">
                <div className="row">
                  <span>{isZh ? 'PMOS 上拉管：' : 'PMOS Pull-Up:'}</span>
                  <strong className={cmosInput === 0 ? 'color-on' : 'color-off'}>
                    {cmosInput === 0 ? (isZh ? '導通 (ON)' : 'ON') : (isZh ? '截止 (OFF)' : 'OFF')}
                  </strong>
                </div>
                <div className="row">
                  <span>{isZh ? 'NMOS 下拉管：' : 'NMOS Pull-Down:'}</span>
                  <strong className={cmosInput === 1 ? 'color-on' : 'color-off'}>
                    {cmosInput === 1 ? (isZh ? '導通 (ON)' : 'ON') : (isZh ? '截止 (OFF)' : 'OFF')}
                  </strong>
                </div>
                <div className="row result">
                  <span>{isZh ? '最終輸出訊號 (Vout)：' : 'Output Signal (Vout):'}</span>
                  <strong className="color-out">
                    {cmosInput === 0 ? '1 (Vdd 1.8V)' : '0 (GND 0V)'}
                  </strong>
                </div>
              </div>
            </div>

            <div className="cmos-circuit-card">
              <h2>{isZh ? <><IconZap size="1em" aria-hidden="true" /> 互補導通電路動態圖解</> : <><IconZap size="1em" aria-hidden="true" /> Complementary Operation Diagram</>}</h2>

              <div className="cmos-svg-wrapper">
                <svg viewBox="0 0 420 320" className="cmos-svg">
                  {/* VDD Top Rail */}
                  <line x1="160" y1="30" x2="260" y2="30" stroke="#ef4444" strokeWidth="4" />
                  <text x="270" y="35" fontSize="13" fontWeight="bold" fill="#ef4444">VDD (+1.8V)</text>

                  {/* Wire from VDD down to PMOS source */}
                  <line x1="210" y1="30" x2="210" y2="70" stroke={cmosInput === 0 ? '#10b981' : 'var(--logic-gate-inactive)'} strokeWidth="3" />

                  {/* PMOS Gate and Symbol */}
                  <rect
                    x="180"
                    y="70"
                    width="60"
                    height="50"
                    rx="4"
                    fill={cmosInput === 0 ? 'rgba(16, 185, 129, 0.15)' : 'var(--card-bg)'}
                    stroke={cmosInput === 0 ? '#10b981' : 'var(--border-color)'}
                    strokeWidth="2"
                  />
                  <text x="193" y="100" fontSize="12" fontWeight="bold" fill="var(--text-main)">PMOS</text>
                  <circle cx="172" cy="95" r="4" fill="none" stroke="var(--text-main)" strokeWidth="2" />

                  {/* Wire connecting PMOS to NMOS */}
                  <line x1="210" y1="120" x2="210" y2="200" stroke={cmosInput === 0 ? '#10b981' : '#0284c7'} strokeWidth="3" />
                  <circle cx="210" cy="160" r="5" fill="var(--primary-color)" />

                  {/* Wire branching to Output Vout */}
                  <line x1="210" y1="160" x2="330" y2="160" stroke="var(--primary-color)" strokeWidth="3.5" />
                  <circle cx="330" cy="160" r="6" fill="var(--primary-color)" />
                  <text x="345" y="165" fontSize="15" fontWeight="bold" fill="var(--primary-color)">
                    Vout = {1 - cmosInput}
                  </text>

                  {/* NMOS Gate and Symbol */}
                  <rect
                    x="180"
                    y="200"
                    width="60"
                    height="50"
                    rx="4"
                    fill={cmosInput === 1 ? 'rgba(2, 132, 199, 0.15)' : 'var(--card-bg)'}
                    stroke={cmosInput === 1 ? '#0284c7' : 'var(--border-color)'}
                    strokeWidth="2"
                  />
                  <text x="192" y="230" fontSize="12" fontWeight="bold" fill="var(--text-main)">NMOS</text>

                  {/* Wire from NMOS down to GND */}
                  <line x1="210" y1="250" x2="210" y2="290" stroke={cmosInput === 1 ? '#0284c7' : 'var(--logic-gate-inactive)'} strokeWidth="3" />

                  {/* GND Bottom Rail */}
                  <line x1="170" y1="290" x2="250" y2="290" stroke="var(--text-muted)" strokeWidth="4" />
                  <line x1="185" y1="296" x2="235" y2="296" stroke="var(--text-muted)" strokeWidth="3" />
                  <line x1="200" y1="302" x2="220" y2="302" stroke="var(--text-muted)" strokeWidth="2" />
                  <text x="260" y="295" fontSize="13" fontWeight="bold" fill="var(--text-muted)">GND (0V)</text>

                  {/* Input Wire Vin */}
                  <line x1="50" y1="95" x2="168" y2="95" stroke={cmosInput ? '#ef4444' : '#0284c7'} strokeWidth="3" />
                  <line x1="90" y1="95" x2="90" y2="225" stroke={cmosInput ? '#ef4444' : '#0284c7'} strokeWidth="3" />
                  <line x1="90" y1="225" x2="180" y2="225" stroke={cmosInput ? '#ef4444' : '#0284c7'} strokeWidth="3" />
                  <circle cx="50" cy="95" r="5" fill={cmosInput ? '#ef4444' : '#0284c7'} />
                  <text x="35" y="80" fontSize="14" fontWeight="bold" fill="var(--text-main)">Vin = {cmosInput}</text>
                </svg>
              </div>

              <div className="cmos-explanation-pill">
                <IconLightbulb size="1em" aria-hidden="true" /> {isZh
                  ? '核心機密：當 Vin=0 時，只有 PMOS 導通將輸出拉至 1；當 Vin=1 時，只有 NMOS 導通將輸出接地至 0。兩者永遠不會同時導通，因此靜態無漏電流，這正是 CMOS 成為全球晶片霸主的核心技術！'
                  : 'Key Insight: At Vin=0, only PMOS conducts to pull output high. At Vin=1, only NMOS conducts to pull output low. They are never on at the same time, ensuring near-zero static power consumption!'}
              </div>
            </div>
          </div>
        )}

        {/* Knowledge Card */}
        <div className="knowledge-breakdown-card">
          <h3>{isZh ? <><IconLightbulb size="1em" aria-hidden="true" /> 科普延伸：電晶體的微型化奇蹟</> : <><IconLightbulb size="1em" aria-hidden="true" /> Microscopic Miracle: From Planar to GAA</>}</h3>
          <div className="knowledge-columns">
            <div className="col">
              <h4>{isZh ? '平面 MOSFET 到 3D FinFET' : 'Planar MOSFET to 3D FinFET'}</h4>
              <p>
                {isZh
                  ? '當電晶體縮小到 20 奈米以下時，傳統平面閘極無法阻止電子穿透漏電（短通道效應）。台積電與業界引入了立體鰭片（FinFET），將通道立體化，讓閘極從三個面向緊緊包覆通道，成功讓晶片持續縮小至 3 奈米！'
                  : 'As gate lengths shrank below 20nm, planar gates suffered severe leakage. Industry introduced 3D FinFET, wrapping the gate around three sides of a vertical silicon fin.'}
              </p>
            </div>
            <div className="col">
              <h4>{isZh ? '2nm 世代的 GAA 全環繞閘極' : '2nm Generation: Gate-All-Around (GAA)'}</h4>
              <p>
                {isZh
                  ? '到了 2 奈米以下，FinFET 也面臨極限。最新的奈米片（Nanosheet）GAA 技術讓閘極 360 度四面全環繞水平奈米線，提供最極致的電場控制力，漏電流更少、運算速度更快！'
                  : 'Below 2nm, FinFET hits its physical limit. Next-gen Nanosheet GAA wraps the gate 360 degrees around horizontal silicon wires, maximizing gate electrostatic control.'}
              </p>
            </div>
            <div className="col">
              <h4>{isZh ? '莫爾定律的物理意義' : "Physical Essence of Moore's Law"}</h4>
              <p>
                {isZh
                  ? '莫爾定律不只是商業預測，更是人類工程學對微觀物理極限的挑戰。透過新材料（高介電常數 High-k 金屬閘極、極紫外光 EUV 微影），人類在指甲大小的晶片上雕刻出超過千億顆 MOSFET！'
                  : 'More than a business observation, Moore’s Law is human engineering pushing quantum boundaries. Modern chips pack over 100 billion MOSFETs onto a single thumbnail!'}
              </p>
            </div>
          </div>
        </div>

        <button type="button" className="back-link" onClick={() => navigate('/lab/logic-gates')}>
          {isZh ? '← 回到邏輯閘實驗室' : '← Back to Logic Gates Lab'}
        </button>
      </div>
    </div>
  );
}
