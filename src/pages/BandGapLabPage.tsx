import { useState, useCallback } from 'react';
import { LabNav } from '../components/lab/LabNav';
import { useLanguage } from '../app/useLanguage';
import './ContentPages.css';

interface Material {
  id: string;
  nameZh: string;
  nameEn: string;
  gapEv: number;        // eV at 0 K (approximate)
  gapTempCoeff: number; // eV/K — negative: gap shrinks with temp
  type: 'conductor' | 'semiconductor' | 'insulator';
}

const MATERIALS: Material[] = [
  { id: 'si',  nameZh: '矽 (Si)',       nameEn: 'Silicon (Si)',       gapEv: 1.17,  gapTempCoeff: -0.000473, type: 'semiconductor' },
  { id: 'ge',  nameZh: '鍺 (Ge)',       nameEn: 'Germanium (Ge)',     gapEv: 0.744, gapTempCoeff: -0.000400, type: 'semiconductor' },
  { id: 'gaas',nameZh: '砷化鎵 (GaAs)',nameEn: 'GaAs',               gapEv: 1.52,  gapTempCoeff: -0.000541, type: 'semiconductor' },
  { id: 'dia', nameZh: '金剛石 (絕緣體)', nameEn: 'Diamond (insulator)', gapEv: 5.47, gapTempCoeff: -0.0000, type: 'insulator' },
  { id: 'cu',  nameZh: '銅 (導體)',     nameEn: 'Copper (conductor)', gapEv: 0,     gapTempCoeff: 0,         type: 'conductor' },
];

function calcGap(mat: Material, tempK: number): number {
  if (mat.type === 'conductor') return 0;
  // Varshni equation simplified: Eg(T) = Eg(0) + coeff * T
  const gap = mat.gapEv + mat.gapTempCoeff * tempK;
  return Math.max(0, gap);
}

function excitedElectrons(gapEv: number, tempK: number, light: boolean): number {
  if (gapEv === 0) return 100; // conductor always full
  // Boltzmann: P ~ exp(-Eg / (2 * kT))  k=8.617e-5 eV/K
  const kT = 8.617e-5 * tempK;
  let p = kT > 0 ? Math.exp(-gapEv / (2 * kT)) : 0;
  if (light) p = Math.min(1, p + 0.3); // photon assists
  return Math.min(100, Math.round(p * 100));
}

export function BandGapLabPage() {
  const { language } = useLanguage();
  const zh = language === 'zh';

  const [tempK, setTempK] = useState(300);
  const [light, setLight] = useState(false);
  const [matId, setMatId] = useState('si');

  const mat = MATERIALS.find(m => m.id === matId)!;
  const gapEv = calcGap(mat, tempK);
  const excited = excitedElectrons(gapEv, tempK, light);

  // SVG layout constants (percentage of 240px height)
  const SVG_H = 240;
  const SVG_W = 320;
  const VALENCE_TOP_PCT = 55;   // valence band top at 55% = 132px
  const VALENCE_BOT_PCT = 80;   // valence band bot at 80%
  const COND_BOT_PCT = 20;      // conduction band bot at 20%

  // Gap height in px: from bottom of conduction band to top of valence band
  const gapMaxPx = ((VALENCE_TOP_PCT - COND_BOT_PCT) / 100) * SVG_H; // 84px
  const gapPx = mat.type === 'conductor' ? 0 : Math.min(gapMaxPx, (gapEv / 6) * gapMaxPx * 1.5);
  const condBotPx = (COND_BOT_PCT / 100) * SVG_H;
  const valTopPx = condBotPx + gapPx;

  const bandColor = mat.type === 'conductor' ? '#f59e0b' : mat.type === 'insulator' ? '#6b7280' : '#3b82f6';

  const electronDots = Array.from({ length: excited }, (_, i) => i);

  const handleTemp = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setTempK(Number(e.target.value));
  }, []);

  const matTypeLabel = (type: Material['type']) => {
    if (type === 'conductor') return zh ? '導體' : 'Conductor';
    if (type === 'insulator') return zh ? '絕緣體' : 'Insulator';
    return zh ? '半導體' : 'Semiconductor';
  };

  const conductivityDesc = () => {
    if (mat.type === 'conductor') return zh ? '導體沒有能帶間隙，電子可自由移動。' : 'No band gap — electrons move freely.';
    if (gapEv > 4) return zh ? '間隙過大，幾乎無法導電（絕緣體）。' : 'Very large gap — essentially non-conducting (insulator).';
    if (excited >= 50) return zh ? '大量電子已躍遷至導帶，導電性強。' : 'Many electrons in conduction band — high conductivity.';
    if (excited >= 10) return zh ? '部分電子躍遷，具有適中導電性。' : 'Some electrons excited — moderate conductivity.';
    return zh ? '極少電子躍遷，導電性很低。' : 'Few electrons excited — low conductivity.';
  };

  return (
    <div className="content-page band-gap-page">
      <section className="content-hero">
        <span className="eyebrow">{zh ? '互動體驗 · 能帶理論與量子物理' : 'Interactive Lab · Energy Band Theory'}</span>
        <h1>{zh ? '能帶結構模擬器' : 'Energy Band Gap Simulator'}</h1>
        <p>
          {zh
            ? '調整溫度、切換材料或開啟光照，觀察電子如何從價帶躍遷至導帶，理解導體、半導體與絕緣體的本質差異！'
            : 'Adjust temperature, switch material, or enable light to observe electrons jumping from the valence band to the conduction band.'}
        </p>
      </section>

      <div className="content-container">
        <LabNav currentTab="band-gap" />

        <div className="band-gap-layout">
          {/* Controls */}
          <div className="band-gap-controls card">
            <h2>{zh ? '控制面板' : 'Controls'}</h2>

            {/* Material selector */}
            <div className="control-group">
              <label className="control-label">{zh ? '材料選擇' : 'Material'}</label>
              <div className="material-buttons">
                {MATERIALS.map(m => (
                  <button
                    key={m.id}
                    type="button"
                    className={`material-btn ${matId === m.id ? 'active' : ''}`}
                    onClick={() => setMatId(m.id)}
                  >
                    {zh ? m.nameZh : m.nameEn}
                  </button>
                ))}
              </div>
            </div>

            {/* Temperature slider */}
            <div className="control-group">
              <label className="control-label">
                {zh ? `溫度：${tempK} K (${(tempK - 273).toFixed(0)} °C)` : `Temperature: ${tempK} K (${(tempK - 273).toFixed(0)} °C)`}
              </label>
              <input
                type="range"
                min={0}
                max={600}
                value={tempK}
                onChange={handleTemp}
                className="temp-slider"
                aria-label={zh ? '溫度滑桿' : 'Temperature slider'}
              />
              <div className="slider-labels">
                <span>0 K</span>
                <span>300 K</span>
                <span>600 K</span>
              </div>
            </div>

            {/* Light toggle */}
            <div className="control-group">
              <label className="control-label">{zh ? '光照激發' : 'Light Excitation'}</label>
              <button
                type="button"
                className={`light-toggle ${light ? 'on' : 'off'}`}
                onClick={() => setLight(l => !l)}
                aria-pressed={light}
              >
                {light ? (
                  <>
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: 'middle', marginRight: 6 }}>
                      <circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2m-10-10h2m16 0h2m-3.17-6.83l-1.42 1.42m-9.9 9.9l-1.42 1.42m0-12.72l1.42 1.42m9.9 9.9l1.42 1.42"/>
                    </svg>
                    {zh ? '光照開啟' : 'Light ON'}
                  </>
                ) : (
                  <>
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: 'middle', marginRight: 6 }}>
                      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                    </svg>
                    {zh ? '光照關閉' : 'Light OFF'}
                  </>
                )}
              </button>
            </div>

            {/* Stats */}
            <div className="band-gap-stats">
              <div className="stat-item">
                <span className="stat-label">{zh ? '材料類型' : 'Type'}</span>
                <span className="stat-value" style={{ color: bandColor }}>{matTypeLabel(mat.type)}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">{zh ? '能帶間隙' : 'Band Gap'}</span>
                <span className="stat-value">{mat.type === 'conductor' ? 'N/A' : `${gapEv.toFixed(3)} eV`}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">{zh ? '激發電子' : 'Excited e⁻'}</span>
                <span className="stat-value">{excited}%</span>
              </div>
            </div>
          </div>

          {/* SVG Diagram */}
          <div className="band-gap-diagram card">
            <h2>{zh ? '能帶圖' : 'Band Diagram'}</h2>
            <svg
              viewBox={`0 0 ${SVG_W} ${SVG_H}`}
              className="band-svg"
              aria-label={zh ? '能帶結構圖' : 'Band structure diagram'}
            >
              {/* Conduction band */}
              <rect
                x="40" y={condBotPx - 36} width={SVG_W - 80} height={36}
                fill={bandColor} opacity="0.25" rx="4"
              />
              <text x={SVG_W / 2} y={condBotPx - 18} textAnchor="middle" fontSize="11" fill={bandColor} fontWeight="bold">
                {zh ? '導帶 (Conduction Band)' : 'Conduction Band'}
              </text>

              {/* Gap label */}
              {mat.type !== 'conductor' && gapPx > 10 && (
                <>
                  <line x1={SVG_W - 60} y1={condBotPx} x2={SVG_W - 60} y2={valTopPx} stroke="#ef4444" strokeDasharray="4 2" strokeWidth="1.5" />
                  <text x={SVG_W - 55} y={(condBotPx + valTopPx) / 2 + 4} fontSize="10" fill="#ef4444">
                    {gapEv.toFixed(2)} eV
                  </text>
                </>
              )}

              {/* Valence band */}
              <rect
                x="40" y={valTopPx} width={SVG_W - 80} height={((VALENCE_BOT_PCT - VALENCE_TOP_PCT) / 100) * SVG_H}
                fill={bandColor} opacity="0.5" rx="4"
              />
              <text x={SVG_W / 2} y={valTopPx + 20} textAnchor="middle" fontSize="11" fill={bandColor} fontWeight="bold">
                {zh ? '價帶 (Valence Band)' : 'Valence Band'}
              </text>

              {/* Excited electrons in conduction band */}
              {electronDots.slice(0, 20).map((_, i) => (
                <circle
                  key={i}
                  cx={60 + (i % 10) * 22}
                  cy={condBotPx - 48 + Math.floor(i / 10) * 14}
                  r="5"
                  fill="#facc15"
                  opacity="0.9"
                >
                  <animate
                    attributeName="cy"
                    values={`${condBotPx - 48 + Math.floor(i / 10) * 14};${condBotPx - 55 + Math.floor(i / 10) * 14};${condBotPx - 48 + Math.floor(i / 10) * 14}`}
                    dur={`${1 + (i % 5) * 0.3}s`}
                    repeatCount="indefinite"
                  />
                </circle>
              ))}

              {/* Fermi level */}
              {mat.type === 'semiconductor' && (
                <>
                  <line
                    x1="40" y1={(condBotPx + valTopPx) / 2}
                    x2={SVG_W - 60} y2={(condBotPx + valTopPx) / 2}
                    stroke="#10b981" strokeDasharray="6 3" strokeWidth="1.5"
                  />
                  <text x="45" y={(condBotPx + valTopPx) / 2 - 4} fontSize="9" fill="#10b981">
                    {zh ? '費米能級 Ef' : 'Fermi Level Ef'}
                  </text>
                </>
              )}

              {/* Photon arrows when light is on */}
              {light && [0, 1, 2].map(i => (
                <g key={i}>
                  <line
                    x1={80 + i * 70} y1={SVG_H - 10}
                    x2={80 + i * 70} y2={valTopPx + 10}
                    stroke="#f97316" strokeWidth="2"
                    markerEnd="url(#arrowhead)"
                    opacity="0.8"
                  />
                </g>
              ))}

              <defs>
                <marker id="arrowhead" markerWidth="6" markerHeight="7" refX="3" refY="3.5" orient="auto">
                  <polygon points="0 0, 6 3.5, 0 7" fill="#f97316" />
                </marker>
              </defs>
            </svg>

            {/* Conductivity bar */}
            <div className="conductivity-bar-wrap">
              <div className="conductivity-label">{zh ? `導電性：${excited}%` : `Conductivity: ${excited}%`}</div>
              <div className="conductivity-track">
                <div
                  className="conductivity-fill"
                  style={{ width: `${excited}%`, backgroundColor: bandColor }}
                />
              </div>
            </div>
            <p className="conductivity-desc">{conductivityDesc()}</p>
          </div>
        </div>

        {/* Knowledge panel */}
        <div className="knowledge-panel card">
          <h2>{zh ? '能帶理論知識' : 'Energy Band Theory'}</h2>
          <div className="knowledge-grid">
            <div className="knowledge-item">
              <h3>
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: 'middle', marginRight: 8 }}>
                  <path d="M2 12h20M2 16h16M2 8h12"/>
                </svg>
                {zh ? '能帶間隙' : 'Band Gap'}
              </h3>
              <p>{zh
                ? '價帶頂部到導帶底部之間的能量差。電子需要獲得至少這麼多能量才能導電。'
                : 'Energy difference between the top of the valence band and bottom of the conduction band. Electrons must acquire at least this energy to conduct.'}</p>
            </div>
            <div className="knowledge-item">
              <h3>
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: 'middle', marginRight: 8 }}>
                  <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"/>
                </svg>
                {zh ? '溫度效應' : 'Temperature Effect'}
              </h3>
              <p>{zh
                ? '溫度越高，晶格振動越劇烈，能提供給電子的熱能越多，越容易產生電子-電洞對。半導體的能帶間隙通常隨溫度上升而略微縮小。'
                : 'Higher temperature increases lattice vibrations, providing more thermal energy to electrons, making it easier to generate electron-hole pairs. The band gap slightly decreases with temperature.'}</p>
            </div>
            <div className="knowledge-item">
              <h3>
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: 'middle', marginRight: 8 }}>
                  <circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2m-10-10h2m16 0h2m-3.17-6.83l-1.42 1.42m-9.9 9.9l-1.42 1.42m0-12.72l1.42 1.42m9.9 9.9l1.42 1.42"/>
                </svg>
                {zh ? '光電效應' : 'Photoelectric Effect'}
              </h3>
              <p>{zh
                ? '當光子能量 (E=hν) 大於能帶間隙時，可以直接激發電子從價帶躍遷至導帶，這是太陽能電池的工作原理。'
                : 'When photon energy (E=hν) exceeds the band gap, it can directly excite electrons from valence to conduction band — the principle behind solar cells.'}</p>
            </div>
            <div className="knowledge-item">
              <h3>
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: 'middle', marginRight: 8 }}>
                  <circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3" fill="currentColor"/>
                </svg>
                {zh ? '費米能級' : 'Fermi Level'}
              </h3>
              <p>{zh
                ? '費米能級代表電子在 0 K 時的最高能量。在純半導體中，費米能級位於能帶間隙的中央。摻雜會改變費米能級位置，進而改變導電特性。'
                : 'The Fermi level is the highest energy level filled by electrons at 0 K. In intrinsic semiconductors it lies in the middle of the gap. Doping shifts it, changing conductivity.'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
