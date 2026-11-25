import { useState } from 'react';
import { useRouter } from '../app/useRouter';
import { useLanguage } from '../app/useLanguage';
import {
  IconMonitor,
  IconCpu,
  IconSettings,
  IconFactory,
  IconPackage,
  IconRocket,
  IconBuilding,
  IconTarget,
  IconDollarSign,
  IconSearch,
  IconBarChart,
} from '../components/ui/Icons';
import './ContentPages.css';

import type { ComponentType, SVGProps } from 'react';

type EcosystemStageId = 'eda-ip' | 'fabless' | 'equipment' | 'foundry' | 'osat' | 'end-devices';

type IconComponent = ComponentType<SVGProps<SVGSVGElement> & { size?: number | string }>;

interface StageData {
  id: EcosystemStageId;
  icon: IconComponent;
  nameZh: string;
  nameEn: string;
  badgeZh: string;
  badgeEn: string;
  summaryZh: string;
  summaryEn: string;
  companies: string[];
  techFocusZh: string;
  techFocusEn: string;
  marginZh: string;
  marginEn: string;
  detailsZh: string[];
  detailsEn: string[];
}

const STAGES: StageData[] = [
  {
    id: 'eda-ip',
    icon: IconMonitor,
    nameZh: 'EDA 軟體與矽智財 (IP)',
    nameEn: 'EDA Software & IP Cores',
    badgeZh: '產業最上游 · 數位藍圖',
    badgeEn: 'Upstream · Digital Blueprint',
    summaryZh: '提供數十億顆電晶體的自動佈線、電氣模擬與晶片架構授權，是晶片設計師不可或缺的「數位工具箱」。',
    summaryEn: 'Provides automated routing, physical simulation, and architecture IP licenses for billions of transistors.',
    companies: ['Synopsys (新思科技)', 'Cadence (益華電腦)', 'ARM (安謀架構)', 'Siemens EDA'],
    techFocusZh: '邏輯合成、靜態時序分析 (STA)、ARM / RISC-V 指令集架構',
    techFocusEn: 'Logic synthesis, Static Timing Analysis (STA), ARM / RISC-V Architecture',
    marginZh: '純軟體授權模式，毛利率通常高達 75% ~ 85%',
    marginEn: 'Software & IP licensing model with gross margins typically 75% - 85%',
    detailsZh: [
      '沒有 EDA 軟體，人類工程師絕不可能手動畫出包含上百億電晶體的現代處理器。',
      '全球 EDA 市場近 80% 由美系 Synopsys 與 Cadence 寡占，是全球科技競爭的核心咽喉點。',
      'ARM 授權架構驅動了全球 99% 的智慧型手機以及當前最新興的 AI 雲端伺服器 CPU。',
    ],
    detailsEn: [
      'Without EDA software, human engineers could never manually design chips with billions of transistors.',
      'The global EDA market is largely dominated (~80%) by Synopsys and Cadence, forming a strategic choke point.',
      'ARM IP powers 99% of global smartphones and next-gen AI cloud hyperscaler CPUs.',
    ],
  },
  {
    id: 'fabless',
    icon: IconCpu,
    nameZh: '無晶圓廠 IC 設計 (Fabless)',
    nameEn: 'Fabless IC Design',
    badgeZh: '演算法與大腦 · 架構創新',
    badgeEn: 'Brain & Architecture Innovation',
    summaryZh: '專注於晶片架構研發、軟體生態系與演算法加速，無自有工廠，專注於市場定義與系統整合。',
    summaryEn: 'Focuses on architectural research, software ecosystems, and algorithm acceleration without owning a fab.',
    companies: ['NVIDIA (輝達)', 'Apple (蘋果 M/A 系列)', 'Qualcomm (高通)', 'MediaTek (聯發科)', 'AMD (超微)'],
    techFocusZh: 'GPU 平行運算架構、CUDA 生態圈、神經網路加速器 (NPU)、5G/6G 調變解調器',
    techFocusEn: 'GPU parallel architecture, CUDA ecosystem, NPU AI accelerators, 5G/6G modems',
    marginZh: '研發導向高附加價值，高階晶片毛利率通常在 55% ~ 75%',
    marginEn: 'High value-added R&D, flagship AI/AP chip margins range from 55% to 75%',
    detailsZh: [
      '晶片設計完成後輸出 GDSII 格式的數位藍圖，交由專業晶圓代工廠（如台積電）進行製造。',
      '軟體生態圈（例如 NVIDIA CUDA）是 IC 設計公司的終極護城河，讓全球開發者難以被替代。',
      'Apple 透過垂直整合軟硬體自研晶片，引領了個人電腦向高效能 ARM 架構全面轉型。',
    ],
    detailsEn: [
      'Produces GDSII mask blueprints upon design completion, handed to dedicated foundries like TSMC.',
      'Software ecosystems (such as NVIDIA CUDA) create insurmountable software developer moats.',
      'Apple unified hardware and software with custom Apple Silicon, pioneering power-efficient PC computing.',
    ],
  },
  {
    id: 'equipment',
    icon: IconSettings,
    nameZh: '半導體設備與關鍵材料',
    nameEn: 'Equipment & Materials',
    badgeZh: '物理極限工程 · 核心設備',
    badgeEn: 'Extreme Physical Engineering',
    summaryZh: '製造極紫外光 (EUV) 微影機、離子植入機與超高純度矽晶圓材料，支撐奈米尺度製造的物理基石。',
    summaryEn: 'Builds Extreme Ultraviolet (EUV) lithography systems, ion implanters, and ultra-pure silicon wafers.',
    companies: ['ASML (荷蘭微影機獨家)', 'Applied Materials (應材)', 'Lam Research (科林研發)', '信越化學 (矽晶圓)', 'TEL (東京威力)'],
    techFocusZh: '13.5nm EUV 極紫外光學、原子層沉積 (ALD)、電漿乾式蝕刻、高純度電子級化學品',
    techFocusEn: '13.5nm EUV optical trains, Atomic Layer Deposition (ALD), plasma dry etching, electronic chemicals',
    marginZh: '設備機台單價高昂（High-NA EUV 單台逾 3.5 億美元），毛利率約 45% ~ 55%',
    marginEn: 'High unit prices (High-NA EUV exceeds $350M per system), gross margins around 45% - 55%',
    detailsZh: [
      '荷蘭 ASML 是全球唯一能商業化製造 EUV 極紫外光微影機的企業，被譽為「人類精密工藝之巔」。',
      '半導體製造需要 99.9999999%（9 個 9）以上純度的電子級多晶矽原料與超純水。',
      '美日荷三國掌控了全球半導體前段製程超過 85% 的核心機台專利與供貨。',
    ],
    detailsEn: [
      'Netherlands ASML is the sole commercial vendor of EUV lithography systems globally.',
      'Fabrication demands 9N+ (99.9999999%) purity electronic grade silicon and ultra-pure water.',
      'US, Japan, and the Netherlands supply over 85% of critical front-end fabrication machinery.',
    ],
  },
  {
    id: 'foundry',
    icon: IconFactory,
    nameZh: '晶圓代工製造 (Foundry)',
    nameEn: 'Dedicated Foundry Fabrication',
    badgeZh: '原子級奈米雕刻 · 重資本樞紐',
    badgeEn: 'Atomic Precision · Capital Core',
    summaryZh: '純代工商業模式，不與客戶競爭。將設計圖在矽晶圓上透過數百道光罩工序精準雕刻出數百億電晶體。',
    summaryEn: 'Pure-play foundry business model. Sculpts billions of transistors onto wafers through hundreds of mask steps.',
    companies: ['TSMC (台積電，全球代工市占 >60%)', 'Samsung Foundry (三星)', 'Intel Foundry', 'UMC (聯電)'],
    techFocusZh: '3nm / 2nm 鰭式/奈米片製程 (FinFET/GAAFET)、極致生產良率、先進製程產能規模',
    techFocusEn: '3nm / 2nm FinFET/GAAFET, world-leading yield optimization, massive scale capacity',
    marginZh: '台積電先進製程受全球追捧，毛利率長期維持在 52% ~ 55% 以上',
    marginEn: 'TSMC leads advanced manufacturing with sustained gross margins of 52% - 55%+',
    detailsZh: [
      '台積電開創了「純晶圓代工」模式，讓無工廠的 IC 設計公司如 NVIDIA、高通能迅速成長抗衡傳統巨頭。',
      '興建一座先進 2nm 晶圓廠（GigaFab）投資額高達 200 億美元，需要數千名頂尖工程師晝夜運轉。',
      '台灣生產了全球超過 90% 的最先進製程（<7nm）晶片，被譽為全球科技經濟的「矽盾（Silicon Shield）」。',
    ],
    detailsEn: [
      'TSMC pioneered the pure-play foundry model, enabling fabless giants like NVIDIA and Qualcomm to thrive.',
      'A modern advanced 2nm GigaFab requires over $20B in capital and thousands of elite engineers.',
      'Taiwan manufactures over 90% of global leading-edge (<7nm) chips, serving as a global "Silicon Shield".',
    ],
  },
  {
    id: 'osat',
    icon: IconPackage,
    nameZh: '封裝測試與先進封裝 (OSAT)',
    nameEn: 'OSAT & Advanced Packaging',
    badgeZh: '後摩爾時代救星 · 2.5D/3D 異質整合',
    badgeEn: 'Post-Moore Era · 2.5D/3D Heterogeneous',
    summaryZh: '將完成的晶圓切割成晶粒並測試電氣效能，並利用 CoWoS / SoIC 先進封裝將 GPU 與 HBM 高速立體堆疊。',
    summaryEn: 'Dices wafers, tests electrical function, and utilizes 2.5D/3D packaging (CoWoS/SoIC) to stack GPUs with HBM.',
    companies: ['ASE Group (日月光投控，全球第一)', 'Amkor (艾克爾)', '台積電 CoWoS / SoIC', 'Intel EMIB / Foveros'],
    techFocusZh: '矽中介層 (Silicon Interposer)、微凸塊 (Micro-bumps)、高頻寬記憶體 (HBM) 3D 堆疊',
    techFocusEn: 'Silicon interposers, micro-bumps, High Bandwidth Memory (HBM) 3D stacking',
    marginZh: '傳統封測毛利約 15%~25%；高門檻 CoWoS 等先進封裝享有顯著溢價',
    marginEn: 'Traditional OSAT is 15-25%; advanced CoWoS packaging commands substantial premiums',
    detailsZh: [
      '單顆大晶片良率差且面積受限，先進封裝把多顆小晶片（Chiplet）如同樂高積木般拼在一起。',
      'NVIDIA H100、B200 等頂級 AI 晶片能爆發驚人算力，台積電 CoWoS 先進封裝是不可或缺的功臣。',
      '台灣日月光投控是全球最大獨立封測代工廠（OSAT），市占率穩居全球首位。',
    ],
    detailsEn: [
      'Advanced packaging binds multiple specialized chiplets together like LEGO bricks, breaking monolithic yield limits.',
      'NVIDIA H100/B200 AI power relies fundamentally on TSMC CoWoS advanced packaging capacity.',
      'Taiwan ASE Group stands as the world\'s largest independent OSAT leader.',
    ],
  },
  {
    id: 'end-devices',
    icon: IconRocket,
    nameZh: '終端系統與 AI 應用 (End Devices)',
    nameEn: 'End Systems & Applications',
    badgeZh: '數位文明終端 · 價值兌現',
    badgeEn: 'Digital Civilization · Realized Value',
    summaryZh: '封裝後的晶片被組裝至主機板，送入資料中心、智慧手機、電動車與航太國防，改變全人類生活。',
    summaryEn: 'Packaged chips are assembled onto motherboards into AI servers, smartphones, and EVs.',
    companies: ['Microsoft, Google, Meta, Amazon (雲端巨頭)', 'Tesla (電動車)', 'Apple, Samsung (消費電子)'],
    techFocusZh: 'AI 大語言模型訓練、自動駕駛機器人、雲端運算架構、智慧邊緣運算',
    techFocusEn: 'LLM AI training, autonomous robotics, hyperscale cloud architecture, edge computing',
    marginZh: '軟體服務與系統方案商，享受數位轉型與 AI 帶來的巨大商業紅利',
    marginEn: 'Software hyperscalers capture trillions in AI digital transformation dividends',
    detailsZh: [
      '全球四大雲端巨頭（Microsoft、Google、Meta、Amazon）每年投入數百億美元採購 AI 晶片。',
      '一台現代電動車包含超過 1,000 到 3,000 顆半導體晶片，涵蓋電源管理、感測器與自駕運算。',
      '半導體是現代世界運作的基石——被譽為 21 世紀的「數位石油」。',
    ],
    detailsEn: [
      'Hyperscalers invest tens of billions annually procuring cutting-edge AI silicon.',
      'A modern electric vehicle incorporates 1,000 to 3,000+ semiconductors for power, sensing, and compute.',
      'Semiconductors represent the indispensable bedrock of modernity—hailed as the "Digital Oil" of the 21st century.',
    ],
  },
];

export function EcosystemPage() {
  const { navigate } = useRouter();
  const { language } = useLanguage();
  const [selectedStageId, setSelectedStageId] = useState<EcosystemStageId>('foundry');

  const isZh = language === 'zh';
  const selectedStage = STAGES.find((s) => s.id === selectedStageId) || STAGES[3];

  return (
    <div className="content-page ecosystem-page">
      <section className="content-hero">
        <span className="eyebrow">{isZh ? '全球產業視野 · 科技供應鏈全貌' : 'Global Industry Vision · Semiconductor Ecosystem'}</span>
        <h1>{isZh ? '半導體產業鏈與分工全景圖' : 'Semiconductor Supply Chain & Ecosystem Map'}</h1>
        <p>
          {isZh
            ? '從無形的一行 EDA 程式碼，到 ASML 極紫外光機台，再到台積電晶圓代工與輝達 AI 晶片。探索人類史上最精密、跨越全球的百萬人分工體系！'
            : 'From lines of EDA code to ASML EUV machines, TSMC foundries, and NVIDIA AI accelerators. Explore humanity’s most complex global collaborative machine!'}
        </p>
      </section>

      <div className="content-container">
        {/* Interactive Pipeline Step Bar */}
        <section className="ecosystem-pipeline-section" aria-label={isZh ? '產業鏈階段流程' : 'Supply Chain Pipeline'}>
          <div className="pipeline-track">
            {STAGES.map((stage, idx) => {
              const isSelected = stage.id === selectedStageId;
              return (
                <button
                  key={stage.id}
                  type="button"
                  className={`pipeline-node ${isSelected ? 'active' : ''}`}
                  onClick={() => setSelectedStageId(stage.id)}
                >
                  <span className="node-step">0{idx + 1}</span>
                  <span className="node-icon" aria-hidden="true"><stage.icon size="1.2em" /></span>
                  <span className="node-title">{isZh ? stage.nameZh.split(' ')[0] : stage.nameEn.split(' ')[0]}</span>
                  {idx < STAGES.length - 1 && <span className="node-arrow" aria-hidden="true">→</span>}
                </button>
              );
            })}
          </div>
        </section>

        {/* Selected Stage Detail Showcase Card */}
        <div className="stage-detail-card">
          <div className="stage-header">
            <span className="stage-icon-big" aria-hidden="true"><selectedStage.icon size="2em" /></span>
            <div className="stage-title-wrap">
              <span className="stage-badge">{isZh ? selectedStage.badgeZh : selectedStage.badgeEn}</span>
              <h2>{isZh ? selectedStage.nameZh : selectedStage.nameEn}</h2>
              <p className="stage-summary">{isZh ? selectedStage.summaryZh : selectedStage.summaryEn}</p>
            </div>
          </div>

          <div className="stage-grid">
            {/* Left Column: Companies & Technology */}
            <div className="stage-col">
              <div className="info-sub-box">
                <h4><IconBuilding size="1em" aria-hidden="true" /> {isZh ? '全球核心代表廠商' : 'Global Industry Leaders'}</h4>
                <div className="company-tags">
                  {selectedStage.companies.map((c) => (
                    <span key={c} className="company-pill">{c}</span>
                  ))}
                </div>
              </div>

              <div className="info-sub-box">
                <h4><IconTarget size="1em" aria-hidden="true" /> {isZh ? '核心技術焦點' : 'Core Technology Focus'}</h4>
                <p>{isZh ? selectedStage.techFocusZh : selectedStage.techFocusEn}</p>
              </div>

              <div className="info-sub-box">
                <h4><IconDollarSign size="1em" aria-hidden="true" /> {isZh ? '商業模式與利潤結構' : 'Business Model & Margin Profile'}</h4>
                <p className="margin-text">{isZh ? selectedStage.marginZh : selectedStage.marginEn}</p>
              </div>
            </div>

            {/* Right Column: Deep Insights */}
            <div className="stage-col">
              <div className="info-sub-box highlight-box">
                <h4><IconSearch size="1em" aria-hidden="true" /> {isZh ? '產業深層洞察與戰略地位' : 'Strategic Insights & Value Chain'}</h4>
                <ul className="details-list">
                  {(isZh ? selectedStage.detailsZh : selectedStage.detailsEn).map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Global Landscape Matrix Summary Table */}
        <section className="landscape-matrix-card">
          <h3><IconBarChart size="1em" aria-hidden="true" /> {isZh ? '半導體六大環節分工對照表' : 'Full Value Chain Comparison Matrix'}</h3>
          <div className="matrix-table-wrapper">
            <table className="matrix-table">
              <thead>
                <tr>
                  <th>{isZh ? '環節' : 'Stage'}</th>
                  <th>{isZh ? '名稱' : 'Name'}</th>
                  <th>{isZh ? '代表企業' : 'Key Leaders'}</th>
                  <th>{isZh ? '主要價值貢獻' : 'Value Contribution'}</th>
                </tr>
              </thead>
              <tbody>
                {STAGES.map((s, idx) => (
                  <tr
                    key={s.id}
                    className={s.id === selectedStageId ? 'active-row' : ''}
                    onClick={() => setSelectedStageId(s.id)}
                    style={{ cursor: 'pointer' }}
                  >
                    <td><strong>0{idx + 1}</strong></td>
                    <td>
                      <span style={{ marginRight: '6px', display: 'inline-flex', verticalAlign: 'middle' }}><s.icon size="1em" /></span>
                      <strong>{isZh ? s.nameZh : s.nameEn}</strong>
                    </td>
                    <td>{s.companies.slice(0, 2).join(', ')}</td>
                    <td>{isZh ? s.summaryZh : s.summaryEn}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <button type="button" className="back-link" onClick={() => navigate('/')}>
          {isZh ? '← 回到首頁' : '← Back to Home'}
        </button>
      </div>
    </div>
  );
}
