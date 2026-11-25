import { useState, useMemo } from 'react';
import { useRouter } from '../app/useRouter';
import { useLanguage } from '../app/useLanguage';
import { LabNav } from '../components/lab/LabNav';
import {
  IconBot,
  IconSmartphone,
  IconLaptop,
  IconCar,
  IconRocket,
  IconSliders,
  IconBarChart,
  IconDice,
  IconLightbulb,
} from '../components/ui/Icons';
import './ContentPages.css';

import type { ComponentType, SVGProps } from 'react';

type IconComponent = ComponentType<SVGProps<SVGSVGElement> & { size?: number | string }>;

interface Preset {
  nameZh: string;
  nameEn: string;
  icon: IconComponent;
  width: number;
  height: number;
  waferDiameter: number;
  cost: number;
  defectDensity: number;
  badgeZh: string;
  badgeEn: string;
}

const PRESETS: Preset[] = [
  {
    nameZh: '超級 AI 晶片 / GPU',
    nameEn: 'Super AI GPU / Accelerator',
    icon: IconBot,
    width: 28.3,
    height: 28.3,
    waferDiameter: 300,
    cost: 18000,
    defectDensity: 0.12,
    badgeZh: '極大面積 (~800mm²)',
    badgeEn: 'Ultra Large (~800mm²)',
  },
  {
    nameZh: '頂級旗艦手機 SoC',
    nameEn: 'Flagship Smartphone SoC',
    icon: IconSmartphone,
    width: 10.5,
    height: 10.5,
    waferDiameter: 300,
    cost: 13000,
    defectDensity: 0.08,
    badgeZh: '主流面積 (~110mm²)',
    badgeEn: 'Mainstream (~110mm²)',
  },
  {
    nameZh: '輕薄筆電 CPU',
    nameEn: 'Laptop CPU / Chiplet',
    icon: IconLaptop,
    width: 8.5,
    height: 8.5,
    waferDiameter: 300,
    cost: 9500,
    defectDensity: 0.08,
    badgeZh: '中型晶粒 (~72mm²)',
    badgeEn: 'Medium Die (~72mm²)',
  },
  {
    nameZh: '車用微控制器 MCU / IoT',
    nameEn: 'Automotive MCU / IoT Chip',
    icon: IconCar,
    width: 4.0,
    height: 4.0,
    waferDiameter: 200,
    cost: 3200,
    defectDensity: 0.1,
    badgeZh: '小型成熟製程 (~16mm²)',
    badgeEn: 'Small Mature Die (~16mm²)',
  },
];

export function WaferYieldLabPage() {
  const { navigate } = useRouter();
  const { language } = useLanguage();

  const [waferDiameter, setWaferDiameter] = useState<number>(300); // mm
  const [dieWidth, setDieWidth] = useState<number>(10.5); // mm
  const [dieHeight, setDieHeight] = useState<number>(10.5); // mm
  const [defectDensity, setDefectDensity] = useState<number>(0.09); // defects/cm²
  const [waferCost, setWaferCost] = useState<number>(12000); // USD
  const [edgeExclusion, setEdgeExclusion] = useState<number>(3); // mm
  const [seed, setSeed] = useState<number>(42);

  // Die Area in mm²
  const dieArea = useMemo(() => dieWidth * dieHeight, [dieWidth, dieHeight]);
  const dieAreaCm2 = useMemo(() => dieArea / 100, [dieArea]);

  // Industry Standard DPW (Dies Per Wafer) Formula
  const dpw = useMemo(() => {
    const usableDiameter = waferDiameter - 2 * edgeExclusion;
    if (usableDiameter <= 0 || dieArea <= 0) return 0;
    const r = usableDiameter / 2;
    const gross = (Math.PI * r * r) / dieArea - (Math.PI * usableDiameter) / Math.sqrt(2 * dieArea);
    return Math.max(0, Math.floor(gross));
  }, [waferDiameter, edgeExclusion, dieArea]);

  // Murphy's Yield Model: Y = ((1 - exp(-A*D0)) / (A*D0))^2
  const yieldRate = useMemo(() => {
    const ad = dieAreaCm2 * defectDensity;
    if (ad <= 0.0001) return 0.999;
    const val = (1 - Math.exp(-ad)) / ad;
    return Math.min(1, Math.max(0, val * val));
  }, [dieAreaCm2, defectDensity]);

  const goodDies = useMemo(() => Math.floor(dpw * yieldRate), [dpw, yieldRate]);
  const costPerGoodDie = useMemo(() => (goodDies > 0 ? waferCost / goodDies : 0), [waferCost, goodDies]);

  // Generate simulated die grid for SVG visualization
  const simulatedDies = useMemo(() => {
    const usableRadius = (waferDiameter - 2 * edgeExclusion) / 2;
    const stepX = dieWidth;
    const stepY = dieHeight;
    const maxCols = Math.ceil(waferDiameter / stepX);
    const maxRows = Math.ceil(waferDiameter / stepY);

    const list: Array<{
      id: string;
      x: number;
      y: number;
      isInside: boolean;
      hasDefect: boolean;
    }> = [];

    // Pseudo-random generator based on seed
    let rand = seed;
    const nextRand = () => {
      rand = (rand * 9301 + 49297) % 233280;
      return rand / 233280;
    };

    const halfW = waferDiameter / 2;
    const startX = -((maxCols * stepX) / 2);
    const startY = -((maxRows * stepY) / 2);

    for (let r = 0; r < maxRows; r++) {
      for (let c = 0; c < maxCols; c++) {
        const x = startX + c * stepX;
        const y = startY + r * stepY;

        // Check 4 corners
        const corners = [
          [x, y],
          [x + stepX, y],
          [x, y + stepY],
          [x + stepX, y + stepY],
        ];

        const isInside = corners.every(([cx, cy]) => {
          const dist = Math.sqrt(cx * cx + cy * cy);
          return dist <= usableRadius;
        });

        // Chance of defect on this die based on (1 - yieldRate)
        const hasDefect = isInside && nextRand() > yieldRate;

        if (isInside || corners.some(([cx, cy]) => Math.sqrt(cx * cx + cy * cy) <= halfW)) {
          list.push({
            id: `${r}-${c}`,
            x,
            y,
            isInside,
            hasDefect,
          });
        }
      }
    }
    return list;
  }, [waferDiameter, edgeExclusion, dieWidth, dieHeight, yieldRate, seed]);

  const applyPreset = (p: Preset) => {
    setDieWidth(p.width);
    setDieHeight(p.height);
    setWaferDiameter(p.waferDiameter);
    setWaferCost(p.cost);
    setDefectDensity(p.defectDensity);
  };

  const isZh = language === 'zh';

  return (
    <div className="content-page wafer-lab-page">
      <section className="content-hero">
        <span className="eyebrow">{isZh ? '互動體驗 · 晶圓製造與成本模型' : 'Interactive Lab · Wafer Yield & Cost'}</span>
        <h1>{isZh ? '晶圓良率與晶粒計算機' : 'Wafer Yield & Die Cost Calculator'}</h1>
        <p>
          {isZh
            ? '探討晶粒尺寸（Die Size）、缺陷密度與晶圓良率的幾何與統計關聯。親身體會為何頂級 AI 晶片造價昂貴，以及 Chiplet 技術如何拯救摩爾定律！'
            : 'Explore the geometric and statistical relationship between Die Size, Defect Density, and Wafer Yield. Understand why monster AI chips cost so much and how Chiplet technology breaks through!'}
        </p>
      </section>

      <div className="content-container">
        <LabNav currentTab="wafer-yield" />

        {/* Presets Bar */}
        <section className="wafer-presets-section">
          <span className="presets-label">{isZh ? <><IconRocket size="1em" aria-hidden="true" /> 快速載入晶片範例：</> : <><IconRocket size="1em" aria-hidden="true" /> Quick Load Presets:</>}</span>
          <div className="presets-grid">
            {PRESETS.map((p) => (
              <button
                key={p.nameEn}
                type="button"
                className="preset-btn"
                onClick={() => applyPreset(p)}
              >
                <span className="preset-name"><p.icon size="1em" aria-hidden="true" /> {isZh ? p.nameZh : p.nameEn}</span>
                <span className="preset-badge">{isZh ? p.badgeZh : p.badgeEn}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Main interactive grid: Controls on left, Visualization on right */}
        <div className="wafer-lab-layout">
          {/* Controls Panel */}
          <div className="wafer-controls-card">
            <h2>{isZh ? <><IconSliders size="1em" aria-hidden="true" /> 晶圓與晶粒參數設置</> : <><IconSliders size="1em" aria-hidden="true" /> Parameters Setup</>}</h2>

            <div className="param-group">
              <label>
                <span>{isZh ? '晶圓直徑 (Wafer Diameter)' : 'Wafer Diameter'}</span>
                <strong>{waferDiameter} mm ({waferDiameter === 300 ? '12 吋' : waferDiameter === 200 ? '8 吋' : '6 吋'})</strong>
              </label>
              <div className="wafer-size-selector">
                {[150, 200, 300].map((d) => (
                  <button
                    key={d}
                    type="button"
                    className={`size-btn ${waferDiameter === d ? 'active' : ''}`}
                    onClick={() => setWaferDiameter(d)}
                  >
                    {d} mm {d === 300 ? '(12")' : d === 200 ? '(8")' : '(6")'}
                  </button>
                ))}
              </div>
            </div>

            <div className="param-row">
              <div className="param-group">
                <label>
                  <span>{isZh ? '晶粒寬度 (Width)' : 'Die Width'}</span>
                  <strong>{dieWidth.toFixed(1)} mm</strong>
                </label>
                <input
                  type="range"
                  min="2"
                  max="35"
                  step="0.5"
                  value={dieWidth}
                  onChange={(e) => setDieWidth(parseFloat(e.target.value))}
                />
              </div>

              <div className="param-group">
                <label>
                  <span>{isZh ? '晶粒高度 (Height)' : 'Die Height'}</span>
                  <strong>{dieHeight.toFixed(1)} mm</strong>
                </label>
                <input
                  type="range"
                  min="2"
                  max="35"
                  step="0.5"
                  value={dieHeight}
                  onChange={(e) => setDieHeight(parseFloat(e.target.value))}
                />
              </div>
            </div>

            <div className="param-group">
              <label>
                <span>{isZh ? '晶粒面積 (Die Area)' : 'Total Die Area'}</span>
                <strong>{dieArea.toFixed(1)} mm²</strong>
              </label>
            </div>

            <div className="param-group">
              <label>
                <span>{isZh ? '缺陷密度 D₀ (Defect Density)' : 'Defect Density (D₀)'}</span>
                <strong>{defectDensity.toFixed(2)} defects/cm²</strong>
              </label>
              <input
                type="range"
                min="0.02"
                max="0.30"
                step="0.01"
                value={defectDensity}
                onChange={(e) => setDefectDensity(parseFloat(e.target.value))}
              />
              <span className="param-hint">
                {isZh
                  ? '先進製程成熟時約 0.05~0.10；製程初期或極複雜製程可達 0.20 以上'
                  : 'Mature advanced nodes are ~0.05-0.10; early trial nodes can exceed 0.20'}
              </span>
            </div>

            <div className="param-group">
              <label>
                <span>{isZh ? '單片晶圓製造成本 (Wafer Cost)' : 'Wafer Production Cost'}</span>
                <strong>${waferCost.toLocaleString()} USD</strong>
              </label>
              <input
                type="range"
                min="1000"
                max="25000"
                step="500"
                value={waferCost}
                onChange={(e) => setWaferCost(parseInt(e.target.value, 10))}
              />
              <span className="param-hint">
                {isZh ? '台積電 3nm 晶圓約 $20,000 美元；成熟 28nm 約 $3,000 美元' : 'TSMC 3nm is ~$20,000 USD; mature 28nm is ~$3,000 USD'}
              </span>
            </div>

            <div className="param-group">
              <label>
                <span>{isZh ? '邊緣安全排除區 (Edge Exclusion)' : 'Edge Exclusion'}</span>
                <strong>{edgeExclusion} mm</strong>
              </label>
              <input
                type="range"
                min="1"
                max="6"
                step="0.5"
                value={edgeExclusion}
                onChange={(e) => setEdgeExclusion(parseFloat(e.target.value))}
              />
            </div>

            <button
              type="button"
              className="reroll-btn"
              onClick={() => setSeed((prev) => prev + 13)}
            >
              <><IconDice size="1em" aria-hidden="true" /> {isZh ? '重新模擬隨機晶圓缺陷分佈' : 'Re-roll Random Defects'}</>
            </button>
          </div>

          {/* Results & Visualizer Panel */}
          <div className="wafer-results-card">
            <h2>{isZh ? <><IconBarChart size="1em" aria-hidden="true" /> 核心計算與良率統計</> : <><IconBarChart size="1em" aria-hidden="true" /> Calculated Yield Metrics</>}</h2>

            <div className="metrics-summary-grid">
              <div className="metric-box highlight">
                <span className="metric-label">{isZh ? '總毛晶粒數 (DPW)' : 'Gross Dies (DPW)'}</span>
                <span className="metric-value">{dpw}</span>
                <span className="metric-sub">{isZh ? '整片晶圓可切出總數' : 'Total physical slots'}</span>
              </div>

              <div className="metric-box success">
                <span className="metric-label">{isZh ? '預估良率 (Yield)' : 'Estimated Yield'}</span>
                <span className="metric-value">{(yieldRate * 100).toFixed(1)}%</span>
                <span className="metric-sub">{isZh ? 'Murphy 良率模型' : "Murphy's Model"}</span>
              </div>

              <div className="metric-box primary">
                <span className="metric-label">{isZh ? '良品晶片數 (Good Dies)' : 'Good Usable Dies'}</span>
                <span className="metric-value">{goodDies}</span>
                <span className="metric-sub">{isZh ? '可正常出貨晶片' : 'Functional chips'}</span>
              </div>

              <div className="metric-box warning">
                <span className="metric-label">{isZh ? '單顆良品成本' : 'Cost per Good Die'}</span>
                <span className="metric-value">${costPerGoodDie.toFixed(1)}</span>
                <span className="metric-sub">{isZh ? '不含後續封裝測試' : 'Unpackaged bare die'}</span>
              </div>
            </div>

            {/* SVG Visualizer */}
            <div className="wafer-svg-container">
              <div className="wafer-legend">
                <span className="legend-item"><span className="dot good" /> {isZh ? '良品晶片' : 'Good Die'}</span>
                <span className="legend-item"><span className="dot defect" /> {isZh ? '缺陷壞品' : 'Defect Die'}</span>
                <span className="legend-item"><span className="dot edge" /> {isZh ? '邊緣裁切晶粒' : 'Edge-clipped'}</span>
              </div>

              <div className="wafer-canvas-wrapper">
                <svg
                  viewBox={`-${waferDiameter / 2 + 10} -${waferDiameter / 2 + 10} ${waferDiameter + 20} ${waferDiameter + 20}`}
                  className="wafer-svg"
                >
                  {/* Wafer Silhouette */}
                  <circle
                    cx="0"
                    cy="0"
                    r={waferDiameter / 2}
                    className="wafer-disk"
                  />
                  {/* Edge exclusion border */}
                  <circle
                    cx="0"
                    cy="0"
                    r={waferDiameter / 2 - edgeExclusion}
                    className="wafer-usable-border"
                  />
                  {/* Notch notch on wafer bottom */}
                  <path
                    d={`M -4 ${waferDiameter / 2 - 2} L 0 ${waferDiameter / 2 - 8} L 4 ${waferDiameter / 2 - 2} Z`}
                    fill="var(--page-bg)"
                  />

                  {/* Render simulated dies */}
                  {simulatedDies.map((die) => {
                    let fillClass = 'die-edge';
                    if (die.isInside) {
                      fillClass = die.hasDefect ? 'die-defect' : 'die-good';
                    }
                    return (
                      <rect
                        key={die.id}
                        x={die.x}
                        y={die.y}
                        width={dieWidth * 0.94}
                        height={dieHeight * 0.94}
                        rx={0.5}
                        className={`wafer-die ${fillClass}`}
                      >
                        <title>
                          {die.isInside
                            ? die.hasDefect
                              ? (isZh ? '缺陷晶粒 (Defective)' : 'Defective Die')
                              : (isZh ? '完好晶粒 (Good Die)' : 'Good Die')
                            : (isZh ? '邊緣殘缺晶粒 (Edge Cut)' : 'Edge Cut')}
                        </title>
                      </rect>
                    );
                  })}
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Science and Knowledge Explanation Card */}
        <div className="knowledge-breakdown-card">
          <h3><IconLightbulb size="1em" aria-hidden="true" /> {isZh ? '科普延伸：為什麼晶片越大越昂貴？' : 'Why Bigger Chips Cost Astronomically More?'}</h3>
          <div className="knowledge-columns">
            <div className="col">
              <h4>{isZh ? '1. 幾何面積 vs 缺陷機率' : '1. Geometric Area vs Defect Odds'}</h4>
              <p>
                {isZh
                  ? '晶圓上的灰塵與晶格缺陷是隨機分佈的。當單顆晶片面積翻倍時，它「踩中」致命缺陷的機率不是翻倍，而是呈指數級激增！這就是為什麼 800mm² 的超大 AI 晶片良率往往只有 30~50%，而 20mm² 的小晶片良率可以高達 95% 以上。'
                  : 'Defects on a silicon wafer are distributed randomly. When die size doubles, the chance of catching a lethal defect increases exponentially! That is why monster 800mm² AI GPUs see 30-50% yields, while tiny 20mm² chips achieve 95%+.'}
              </p>
            </div>
            <div className="col">
              <h4>{isZh ? '2. 小晶片（Chiplet）技術的興起' : '2. Rise of Chiplet Architecture'}</h4>
              <p>
                {isZh
                  ? '既然做一顆 800mm² 的大晶片良率低、成本高，工程師想到妙招：不如切成 4 顆 200mm² 的小晶片，各別享有 85% 的高良率，最後再透過先進封裝技術（如台積電 CoWoS）把它們縫合在一起！這正是當前 AMD、Nvidia、Apple 頂級晶片的核心戰略。'
                  : 'Instead of manufacturing one gigantic monolithic die, modern architects divide it into four 200mm² chiplets with 85% high yield, and bind them back together using advanced packaging (TSMC CoWoS / Intel EMIB).'}
              </p>
            </div>
            <div className="col">
              <h4>{isZh ? '3. 莫非良率公式（Murphy Model）' : "3. Murphy's Yield Formula"}</h4>
              <p>
                <code>Y = ((1 - e^(-A×D₀)) / (A×D₀))²</code>
                <br />
                {isZh
                  ? '其中 A 為晶片面積（cm²），D₀ 為每平方公分缺陷數。本模型考慮了晶圓缺陷的集群效應（Clustering Effect），是業界最廣泛引用的經典良率估算模型。'
                  : 'Where A is die area in cm² and D₀ is defect density. This model accounts for defect clustering, serving as an industry benchmark.'}
              </p>
            </div>
          </div>
        </div>

        <button type="button" className="back-link" onClick={() => navigate('/lab/logic-gates')}>
          {isZh ? '← 前往邏輯閘實驗室' : '← Go to Logic Gates Lab'}
        </button>
      </div>
    </div>
  );
}
