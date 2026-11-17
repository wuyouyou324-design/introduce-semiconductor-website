import { useState } from 'react';
import { useRouter } from '../app/useRouter';
import { useLanguage } from '../app/useLanguage';
import './ContentPages.css';

interface Milestone {
  year: number;
  era: string;
  titleZh: string;
  titleEn: string;
  nodeZh: string;
  nodeEn: string;
  transistorCount: string;
  summaryZh: string;
  summaryEn: string;
  significanceZh: string;
  significanceEn: string;
  tagZh: string;
  tagEn: string;
}

const MILESTONES: Milestone[] = [
  {
    year: 1947,
    era: '1940s',
    titleZh: '貝爾實驗室誕生第一顆鍺電晶體',
    titleEn: 'First Point-Contact Transistor at Bell Labs',
    nodeZh: '宏觀手工組裝 (毫米級)',
    nodeEn: 'Hand-assembled (Millimeter scale)',
    transistorCount: '1 顆 (單晶體)',
    summaryZh: '約翰·巴丁、華特·布拉頓與威廉·肖克利發明了點接觸型鍺電晶體，宣告真空管時代終結，拉開固態電子學的序幕。',
    summaryEn: 'John Bardeen, Walter Brattain, and William Shockley invented the point-contact transistor, sounding the death knell of vacuum tubes.',
    significanceZh: '人類歷史上第一次用固態半導體實現了電氣訊號的放大與開關控制。',
    significanceEn: 'First demonstration of electronic amplification and switching via solid-state semiconductors.',
    tagZh: '起點 · 物理突破',
    tagEn: 'Genesis · Physics Breakthrough',
  },
  {
    year: 1958,
    era: '1950s',
    titleZh: '積體電路 (IC) 的誕生',
    titleEn: 'Invention of the Integrated Circuit (IC)',
    nodeZh: '鍺晶片整合 (毫米級)',
    nodeEn: 'Germanium Integration (Millimeter)',
    transistorCount: '約 5 顆元件',
    summaryZh: '德州儀器的傑克·基爾比（Jack Kilby）用手工將電晶體、電阻和電容做在同一片鍺片上；隨後仙童半導體的羅伯特·諾伊斯（Robert Noyce）發明了平版矽製程積體電路。',
    summaryEn: 'Jack Kilby integrated circuit components onto a single germanium bar; Robert Noyce developed planar silicon ICs.',
    significanceZh: '徹底解決了「元件數量暴增導致銲接線路崩潰」的暴政（Tyranny of Numbers）。',
    significanceEn: 'Overcame the "Tyranny of Numbers" caused by thousands of discrete hand-soldered wires.',
    tagZh: '革命 · 積體電路',
    tagEn: 'Revolution · Integrated Circuit',
  },
  {
    year: 1965,
    era: '1960s',
    titleZh: '高登·摩爾提出「摩爾定律」',
    titleEn: 'Gordon Moore Formulates Moore\'s Law',
    nodeZh: '平面矽製程 (約 30 微米)',
    nodeEn: 'Planar Silicon (~30 µm)',
    transistorCount: '數十顆',
    summaryZh: '仙童半導體研發總監高登·摩爾在《電子學》雜誌發表論文，預言晶片上的電晶體數量將每 18 到 24 個月翻倍，成本持續降低。',
    summaryEn: 'Gordon Moore published his landmark paper predicting transistor density would double every 18-24 months while costs fall.',
    significanceZh: '成為半導體業界共同遵循超過半世紀的技術進步指南針與節奏表。',
    significanceEn: 'Served as the semiconductor industry\'s North Star and technological cadence for over 50 years.',
    tagZh: '定律 · 預言與指南',
    tagEn: 'Law · Prophecy & Roadmap',
  },
  {
    year: 1971,
    era: '1970s',
    titleZh: 'Intel 4004：全球第一顆微處理器',
    titleEn: 'Intel 4004: First Commercial Microprocessor',
    nodeZh: '10,000 奈米 (10 微米)',
    nodeEn: '10,000 nm (10 µm)',
    transistorCount: '2,300 顆',
    summaryZh: '英特爾工程師霍夫等人把 CPU 所需的算術邏輯單元整合到單一晶片上，運算時脈 740 kHz，開啟個人電腦與微電腦時代。',
    summaryEn: 'Intel packed complete CPU functionality onto a single silicon die with a 740 kHz clock, igniting the PC era.',
    significanceZh: '證明晶片不再只是單一功能電路，而是能透過程式軟體自由定義行為的通用大腦。',
    significanceEn: 'Proved microchips could act as universal programmable brains driven by software code.',
    tagZh: '微處理器 · 通用運算',
    tagEn: 'Microprocessor · General Compute',
  },
  {
    year: 1987,
    era: '1980s',
    titleZh: '張忠謀創立台積電，開創純晶圓代工',
    titleEn: 'Morris Chang Founds TSMC & Pure-Play Foundry',
    nodeZh: '3,000 奈米 (3 微米)',
    nodeEn: '3,000 nm (3 µm)',
    transistorCount: '數十萬顆',
    summaryZh: '張忠謀在新竹科學園區創立台灣積體電路（TSMC），堅持「不自己設計產品、只替客戶製造晶片」的純代工商業模式。',
    summaryEn: 'Morris Chang established TSMC in Hsinchu Science Park, pioneering pure contract manufacturing without competing with customers.',
    significanceZh: '降低了晶片創業門檻，讓高通、輝達、聯發科等無廠 IC 設計巨擘能夠蓬勃發展。',
    significanceEn: 'Lowered IC startup entry barriers, enabling fabless giants like Qualcomm, NVIDIA, and MediaTek to flourish.',
    tagZh: '商業革命 · 矽盾起點',
    tagEn: 'Business Model · Silicon Shield',
  },
  {
    year: 2007,
    era: '2000s',
    titleZh: 'HKMG 高介電金屬閘極攻克漏電危機',
    titleEn: 'HKMG Conquers Gate Leakage Barrier (45nm)',
    nodeZh: '45 奈米 (45nm)',
    nodeEn: '45 nm',
    transistorCount: '約 4 億顆 (Intel Core 2)',
    summaryZh: '當二氧化矽閘極薄到僅剩 1.2 奈米（約 5 個原子厚）時，量子穿隧效應導致嚴重漏電發熱。英特爾率先導入鉿基 High-k 絕緣層與金屬閘極。',
    summaryEn: 'As gate oxides shrank to just 1.2nm (5 atoms), quantum tunneling caused unbearable leakage. High-k hafnium dielectrics saved the day.',
    significanceZh: '拯救了瀕臨崩潰的平面電晶體微型化進程，確保晶片功耗不失控。',
    significanceEn: 'Saved planar scaling from catastrophic thermal runaway, sustaining clock performance.',
    tagZh: '材料革命 · 量子對抗',
    tagEn: 'Materials · Quantum Combat',
  },
  {
    year: 2011,
    era: '2010s',
    titleZh: '胡正明教授發明 FinFET 3D 鰭式電晶體商用',
    titleEn: 'FinFET 3D Transistors Enter Mass Production (22nm)',
    nodeZh: '22 奈米 / 16 奈米',
    nodeEn: '22 nm / 16 nm',
    transistorCount: '約 14 億顆',
    summaryZh: '平面架構達到物理極限，加州大學柏克萊分校胡正明教授團隊研發的 FinFET 被業界大規模量產，閘極從三面立體環抱垂直矽鰭片。',
    summaryEn: 'Planar MOSFETs hit an impassable wall. Chenming Hu’s 3D FinFET innovation wrapped the gate around three sides of a vertical silicon fin.',
    significanceZh: '電晶體由二維平面正式邁入三維立體時代，推動製程一路微縮至 3 奈米。',
    significanceEn: 'Marked the transition from 2D planar to 3D semiconductor architecture, paving the road to 3nm.',
    tagZh: '架構革命 · 3D 立體鰭片',
    tagEn: 'Architecture · 3D FinFET',
  },
  {
    year: 2019,
    era: '2010s',
    titleZh: 'ASML EUV 極紫外光微影量產 (7nm / 5nm)',
    titleEn: 'EUV Extreme Ultraviolet Commercialization (7nm/5nm)',
    nodeZh: '7 奈米 / 5 奈米',
    nodeEn: '7 nm / 5 nm',
    transistorCount: '超過 100 億顆 (Apple A14, A15)',
    summaryZh: '台積電率先將荷蘭 ASML 的 13.5nm 極紫外光微影技術導入大量生產，用高能量光子在晶圓上雕刻出單一病毒尺寸（幾奈米）的電路。',
    summaryEn: 'TSMC pioneered volume EUV mass production, using 13.5nm extreme light wavelengths to engrave sub-virus scale circuits.',
    significanceZh: '擺脫繁複的多重曝光限制，直接催生了現代 5G 旗艦手機晶片與頂級 AI 伺服器處理器。',
    significanceEn: 'Bypassed complex multiple-patterning limits, enabling modern 5G mobile processors and hyperscale AI accelerators.',
    tagZh: '光學巔峰 · EUV 微影',
    tagEn: 'Optics Peak · EUV Lithography',
  },
  {
    year: 2024,
    era: '2020s',
    titleZh: '2nm GAA 環繞閘極與 CoWoS 先進封裝時代',
    titleEn: '2nm GAA Nanosheets & CoWoS Chiplet Era',
    nodeZh: '2 奈米 (N2) / 埃米世代',
    nodeEn: '2 nm (N2) / Angstrom Era',
    transistorCount: '超過 2,000 億顆 (NVIDIA Blackwell B200)',
    summaryZh: '台積電即將量產 2nm Nanosheet GAA 全環繞閘極；同時 NVIDIA Blackwell 透過 CoWoS 先進封裝縫合雙晶粒，集成 2,080 億顆電晶體，成為推動全球生成式 AI 的算力核心。',
    summaryEn: 'TSMC 2nm Nanosheet GAA prepares for volume ramp; NVIDIA Blackwell unites dual dies via CoWoS into a 208-billion transistor monster.',
    significanceZh: '摩爾定律透過「原子級製程微縮 + 2.5D/3D Chiplet 異質封裝」雙引擎繼續全速前進。',
    significanceEn: 'Moore\'s Law surges forward via the twin engines of atomic scaling and 2.5D/3D heterogeneous packaging.',
    tagZh: '前沿 · 埃米與先進封裝',
    tagEn: 'Frontier · Angstrom & CoWoS',
  },
];

export function TimelinePage() {
  const { navigate } = useRouter();
  const { language } = useLanguage();
  const [selectedIdx, setSelectedIdx] = useState<number>(MILESTONES.length - 1);

  const isZh = language === 'zh';
  const m = MILESTONES[selectedIdx];

  return (
    <div className="content-page timeline-page">
      <section className="content-hero">
        <span className="eyebrow">{isZh ? '歷史長河 · 科技演進史詩' : 'Epic Evolution · Technology Milestones'}</span>
        <h1>{isZh ? '摩爾定律與半導體演進時間軸' : 'Moore\'s Law & Technology Nodes Timeline'}</h1>
        <p>
          {isZh
            ? '從 1947 年粗糙的手工鍺電晶體，到 2026 年集結 2,080 億顆電晶體的超級 AI 晶片。見證人類如何挑戰量子物理極限，雕刻出當代數位文明！'
            : 'From the crude 1947 point-contact transistor to a 208-billion transistor AI colossus. Witness how humanity conquered quantum limits to sculpt modern civilization!'}
        </p>
      </section>

      <div className="content-container">
        {/* Timeline Slider Track */}
        <section className="timeline-slider-section" aria-label={isZh ? '年代時間軸導覽' : 'Timeline Navigator'}>
          <div className="timeline-nodes-track">
            {MILESTONES.map((item, idx) => {
              const isSelected = idx === selectedIdx;
              return (
                <button
                  key={item.year}
                  type="button"
                  className={`timeline-node-btn ${isSelected ? 'active' : ''}`}
                  onClick={() => setSelectedIdx(idx)}
                >
                  <span className="timeline-year">{item.year}</span>
                  <span className="timeline-dot" />
                  <span className="timeline-short">{item.titleZh.slice(0, 8)}...</span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Selected Milestone Hero Card */}
        <div className="milestone-featured-card">
          <div className="milestone-card-header">
            <span className="milestone-tag">{isZh ? m.tagZh : m.tagEn}</span>
            <span className="milestone-year-huge">{m.year}</span>
            <h2>{isZh ? m.titleZh : m.titleEn}</h2>
            <div className="milestone-specs-bar">
              <div className="spec-item">
                <span className="spec-label">{isZh ? '製程節點尺寸' : 'Process Node'}</span>
                <strong>{isZh ? m.nodeZh : m.nodeEn}</strong>
              </div>
              <div className="spec-item">
                <span className="spec-label">{isZh ? '晶片電晶體數量' : 'Transistor Count'}</span>
                <strong className="color-transistor">{m.transistorCount}</strong>
              </div>
            </div>
          </div>

          <div className="milestone-body-grid">
            <div className="milestone-col">
              <h4>📖 {isZh ? '事件背景與技術突破' : 'Context & Breakthrough'}</h4>
              <p>{isZh ? m.summaryZh : m.summaryEn}</p>
            </div>
            <div className="milestone-col highlight-col">
              <h4>⭐ {isZh ? '歷史戰略意義與影響' : 'Historical Significance'}</h4>
              <p>{isZh ? m.significanceZh : m.significanceEn}</p>
            </div>
          </div>
        </div>

        {/* Transistor Density Growth Scale Visualization */}
        <section className="density-scale-card">
          <h3>📈 {isZh ? '摩爾定律的驚人指數級躍升' : 'Exponential Leap of Moore\'s Law'}</h3>
          <p className="scale-desc">
            {isZh
              ? '從 1971 年 Intel 4004 的 2,300 顆電晶體，到 2024 年 NVIDIA Blackwell 的 2,080 億顆電晶體，密度提升超過 9,000 萬倍！若汽車速度也能依摩爾定律提升，現在一秒就能環繞地球 300 圈。'
              : 'From 2,300 transistors in 1971 to 208 billion in 2024—a staggering 90,000,000x jump! If cars improved at this pace, they would circle the Earth 300 times per second.'}
          </p>

          <div className="growth-bars-list">
            {MILESTONES.slice(3).map((item, i) => {
              // Relative logarithm scale for visualization
              const logValues = [3.36, 5.5, 8.6, 9.1, 10.0, 11.3];
              const pct = (logValues[i] / 11.3) * 100;

              return (
                <div
                  key={item.year}
                  className={`growth-bar-row ${item.year === m.year ? 'active-row' : ''}`}
                  onClick={() => setSelectedIdx(i + 3)}
                  style={{ cursor: 'pointer' }}
                >
                  <span className="bar-year">{item.year}</span>
                  <div className="bar-track">
                    <div className="bar-fill" style={{ width: `${pct}%` }} />
                  </div>
                  <span className="bar-count">{item.transistorCount}</span>
                </div>
              );
            })}
          </div>
        </section>

        <button type="button" className="back-link" onClick={() => navigate('/')}>
          {isZh ? '← 回到首頁' : '← Back to Home'}
        </button>
      </div>
    </div>
  );
}
