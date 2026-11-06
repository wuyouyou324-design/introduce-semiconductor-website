export type Language = 'zh' | 'en';

export const translations = {
  zh: {
    brandName: '半導體啟蒙基地',
    brandSubtitle: '為國高中生打造的互動式半導體科普教育平台，探索晶片奧秘與未來科技。',
    navHome: '首頁',
    navLearn: '學習路徑',
    navLab: '邏輯閘實驗室',
    navMfg: '晶片製造',
    navGlossary: '詞彙表',
    homeBadge: '給初學者的半導體科普園地',
    homeTitlePrefix: '探索微小世界中的',
    homeTitleHighlight: '巨大力量',
    homeDescription: '用淺顯易懂的圖解與互動，帶你一步步解開晶片的科技密碼。',
    startExplore: '開始探索學習',
    logicGatesLab: '邏輯閘實驗室',
    corePaths: '核心學習路徑',
    corePathsSub: '循序漸進，從零認識半導體世界',
    learnMore: '了解更多',
    featuredTopics: '熱門科普主題',
    featuredTopicsSub: '從日常好奇出發，找到清楚易懂的答案',
    readTopic: '閱讀主題',
    readyPrompt: '準備好開始你的半導體探索之旅了嗎？',
    startLearningNow: '立即開始學習',
    quickNav: '快速導覽',
    aboutProject: '關於專案',
    aboutDesc: '本站為純前端科普教育網站，不包含任何商業營利、登入系統或後端資料庫。',
    copyright: '© 2026 半導體啟蒙基地. All rights reserved.',
    
    // Learn Page
    learnEyebrow: '學習路徑 · 基礎核心',
    learnTitle: '半導體基礎學習',
    learnDesc: '用四個概念建立理解晶片的地基，最後看懂電晶體為何能成為數位世界的開關。',
    transistorEyebrow: '核心概念',
    transistorTitle: '電晶體：用電流控制電流',
    transistorDesc: '電晶體可以把小訊號放大，也可以像開關一樣在 0 與 1 之間快速切換。數十億顆電晶體組合起來，就能執行手機、電腦和 AI 系統的運算。',
    backHome: '← 回到首頁',

    // Logic Gates Lab
    labEyebrow: '互動體驗 · 數位邏輯',
    labTitle: '邏輯閘實驗室',
    labDesc: '切換輸入，觀察不同邏輯閘如何根據布林規則產生輸出。',
    inputA: '輸入 A',
    inputB: '輸入 B',
    output: '輸出',
    truthTable: '真值表',
    selectGate: '選擇邏輯閘',

    // Manufacturing Page
    mfgEyebrow: '製程探索 · 從砂到晶片',
    mfgTitle: '晶片製造工藝',
    mfgDesc: '一片晶圓需要經過數百道精密步驟，以下用六個階段掌握全貌。',
    mfgTabList: '製造流程步驟',

    // Glossary Page
    glossaryEyebrow: '知識工具 · 快速查找',
    glossaryTitle: '半導體詞彙表',
    glossaryDesc: '搜尋常見名詞，建立閱讀晶片與製程內容時需要的基礎 vocabulary。',
    searchPlaceholder: '搜尋中文、英文或解釋',
    searchLabel: '搜尋詞彙',
    emptyGlossary: '找不到相關詞彙，試試其他關鍵字。',

    // NotFound
    notFoundTitle: '404 - 找不到頁面',
    notFoundDesc: '很抱歉，您造訪的頁面不存在或已被移除。',
    returnHome: '返回首頁',

    // Data items
    lessons: [
      ['01', '導體、絕緣體與半導體', '導體容易讓電子通過，絕緣體則阻擋電子；半導體的導電能力介於兩者之間，還能透過溫度與摻雜精準調整。'],
      ['02', '矽晶體與共價鍵', '矽原子有四個價電子，會與鄰近原子形成穩定的共價鍵，這個晶體結構是製作晶片的材料基礎。'],
      ['03', 'P 型與 N 型半導體', '在矽中加入不同雜質，可以創造電洞或自由電子，分別形成 P 型與 N 型半導體。'],
      ['04', 'PN 接面與二極體', 'P 型和 N 型接合後形成耗盡區，電流較容易朝一個方向通過，這就是二極體的基本原理。'],
    ],
    learningPaths: [
      { title: '半導體基礎', description: '從原子結構出發，認識導體、絕緣體與半導體的差別，探索矽的奧秘與電晶體原理。', tag: '基礎核心' },
      { title: '邏輯閘實驗室', description: '探索 AND、OR、NOT 邏輯閘如何組成電腦的大腦，體驗布林邏輯的魅力。', tag: '互動體驗' },
      { title: '晶片製造工藝', description: '見證石英砂如何變成精密的晶圓，了解微影、蝕刻、離子植入與封裝測試。', tag: '製程探索' },
    ],
    featuredTopicsList: [
      { title: '什麼是半導體？', category: '基礎概念', readTime: '3 分鐘閱讀', summary: '為什麼有些材料導電、有些不導電？半導體憑什麼成為現代電子產品的基石？' },
      { title: '矽晶圓是怎麼煉成的？', category: '材料科學', readTime: '4 分鐘閱讀', summary: '從石英砂到高純度單晶矽，看看晶圓製造如何把材料變成電子世界的基礎。' },
      { title: '電晶體：改變世界的開關', category: '核心元件', readTime: '5 分鐘閱讀', summary: '一顆微小的電晶體如何以高速開關控制電流，支撐整個數位時代？' },
    ],
    manufacturingSteps: [
      ['01', '純化與長晶', '把石英砂中的矽純化，再用柴氏拉晶法拉出高純度單晶矽柱。'],
      ['02', '切片與拋光', '將矽柱切成薄薄的晶圓，經過研磨與化學機械拋光，得到平坦鏡面。'],
      ['03', '沉積與光阻', '在晶圓上沉積薄膜並塗佈光阻，準備把電路圖案轉移到表面。'],
      ['04', '微影與蝕刻', '利用光線曝光，再選擇性蝕刻材料，逐層形成奈米級電路結構。'],
      ['05', '植入與金屬化', '植入離子調整材料電性，並製作金屬導線把電晶體連接起來。'],
      ['06', '切割、封裝與測試', '切割晶圓成單顆晶粒，封裝後測試功能與可靠度，才成為可用晶片。'],
    ],
    glossaryTerms: [
      ['semiconductor', '半導體', 'Semiconductor', '導電能力可以被控制的材料，例如矽，是現代晶片最重要的基礎。'],
      ['wafer', '矽晶圓', 'Silicon Wafer', '由單晶矽切片、拋光而成的圓形薄片，晶片電路會在其表面製作。'],
      ['transistor', '電晶體', 'Transistor', '可放大訊號或作為開關的電子元件，是處理器與記憶體的基本單位。'],
      ['photolithography', '微影技術', 'Photolithography', '利用光罩和光線，把精細電路圖案轉印到晶圓上的製程。'],
      ['logic-gate', '邏輯閘', 'Logic Gate', '依照布林邏輯運算輸入，產生 0 或 1 輸出的數位電路。'],
      ['doping', '摻雜', 'Doping', '在純矽中加入微量特定雜質（如硼、磷），以改變其導電特性的過程。'],
      ['etching', '蝕刻', 'Etching', '使用化學或物理方法移除晶圓上未受保護的薄膜，以形成電路圖案。'],
      ['diode', '二極體', 'Diode', '只允許電流單向流通的半導體元件，常用於整流與訊號處理。'],
      ['integrated-circuit', '積體電路', 'Integrated Circuit (IC)', '將大量電晶體與電路元件微小化並製作在單一矽晶片上的電路系統。'],
      ['cleanroom', '無塵室', 'Cleanroom', '高度控制懸浮微粒、溫度與濕度的超乾淨廠房，以防晶圓受到汙染。'],
      ['packaging', '封裝', 'Packaging', '將切割好的晶粒連接外部接腳並包裹保護外殼，以便安裝在電路板上。'],
      ['cmos', '互補式金屬氧化物半導體', 'CMOS', '現代積體電路中最常用的技術，由互補的PMOS與NMOS電晶體組成，耗電量極低。'],
      ['nanometer', '奈米', 'Nanometer (nm)', '十億分之一公尺，半導體製程中用來衡量電晶體閘極尺寸與精細度的單位。'],
    ]
  },
  en: {
    brandName: 'Semiconductor Ignition Base',
    brandSubtitle: 'An interactive semiconductor science education platform for middle and high school students to explore chip mysteries and future technology.',
    navHome: 'Home',
    navLearn: 'Learning Path',
    navLab: 'Logic Gates Lab',
    navMfg: 'Chip Manufacturing',
    navGlossary: 'Glossary',
    homeBadge: 'Semiconductor Science for Beginners',
    homeTitlePrefix: 'Explore the',
    homeTitleHighlight: 'Huge Power',
    homeDescription: 'Through easy-to-understand diagrams and interactions, guiding you step-by-step to unlock the technological code of chips.',
    startExplore: 'Start Exploring',
    logicGatesLab: 'Logic Gates Lab',
    corePaths: 'Core Learning Paths',
    corePathsSub: 'Step by step, understanding the semiconductor world from scratch',
    learnMore: 'Learn More',
    featuredTopics: 'Featured Topics',
    featuredTopicsSub: 'Starting from daily curiosity, find clear and easy answers',
    readTopic: 'Read Topic',
    readyPrompt: 'Ready to start your semiconductor exploration journey?',
    startLearningNow: 'Start Learning Now',
    quickNav: 'Quick Navigation',
    aboutProject: 'About Project',
    aboutDesc: 'This site is a pure front-end science education website, containing no commercial profit, login systems, or backend databases.',
    copyright: '© 2026 Semiconductor Ignition Base. All rights reserved.',
    
    // Learn Page
    learnEyebrow: 'Learning Path · Core Basics',
    learnTitle: 'Semiconductor Basics',
    learnDesc: 'Build the foundation for understanding chips with four concepts, and finally see why transistors can be the switches of the digital world.',
    transistorEyebrow: 'Core Concept',
    transistorTitle: 'Transistor: Controlling Current with Current',
    transistorDesc: 'A transistor can amplify small signals or switch rapidly between 0 and 1 like a switch. Billions of transistors combined can execute computations for phones, computers, and AI systems.',
    backHome: '← Back to Home',

    // Logic Gates Lab
    labEyebrow: 'Interactive Experience · Digital Logic',
    labTitle: 'Logic Gates Lab',
    labDesc: 'Toggle inputs and observe how different logic gates generate outputs based on Boolean rules.',
    inputA: 'Input A',
    inputB: 'Input B',
    output: 'Output',
    truthTable: 'Truth Table',
    selectGate: 'Select Logic Gate',

    // Manufacturing Page
    mfgEyebrow: 'Process Exploration · From Sand to Chip',
    mfgTitle: 'Chip Manufacturing Process',
    mfgDesc: 'A silicon wafer goes through hundreds of precise steps. Here are six stages to grasp the full picture.',
    mfgTabList: 'Manufacturing Steps',

    // Glossary Page
    glossaryEyebrow: 'Knowledge Tool · Quick Lookup',
    glossaryTitle: 'Semiconductor Glossary',
    glossaryDesc: 'Search common terms to build the vocabulary needed for reading chips and manufacturing content.',
    searchPlaceholder: 'Search Chinese, English, or definition',
    searchLabel: 'Search glossary',
    emptyGlossary: 'No related terms found. Try other keywords.',

    // NotFound
    notFoundTitle: '404 - Page Not Found',
    notFoundDesc: 'Sorry, the page you visited does not exist or has been removed.',
    returnHome: 'Return to Home',

    // Data items
    lessons: [
      ['01', 'Conductors, Insulators, and Semiconductors', 'Conductors easily let electrons pass, while insulators block them; semiconductor conductivity is between both and can be precisely adjusted via temperature and doping.'],
      ['02', 'Silicon Crystals and Covalent Bonds', 'Silicon atoms have four valence electrons, forming stable covalent bonds with neighboring atoms. This crystal structure is the material foundation of chips.'],
      ['03', 'P-type and N-type Semiconductors', 'Adding different impurities into silicon creates electron holes or free electrons, forming P-type and N-type semiconductors respectively.'],
      ['04', 'PN Junction and Diode', 'Combining P-type and N-type creates a depletion region where current flows more easily in one direction. This is the basic principle of a diode.'],
    ],
    learningPaths: [
      { title: 'Semiconductor Basics', description: 'Starting from atomic structure, understand the differences between conductors, insulators, and semiconductors, exploring silicon mysteries and transistor principles.', tag: 'Core Basics' },
      { title: 'Logic Gates Lab', description: 'Explore how AND, OR, NOT logic gates compose the brain of a computer and experience the charm of Boolean logic.', tag: 'Interactive' },
      { title: 'Chip Manufacturing', description: 'Witness how quartz sand turns into precise wafers, understanding photolithography, etching, ion implantation, and packaging testing.', tag: 'Process' },
    ],
    featuredTopicsList: [
      { title: 'What is a Semiconductor?', category: 'Core Concepts', readTime: '3 min read', summary: 'Why do some materials conduct electricity while others do not? Why are semiconductors the cornerstone of modern electronics?' },
      { title: 'How are Silicon Wafers Made?', category: 'Material Science', readTime: '4 min read', summary: 'From quartz sand to high-purity monocrystalline silicon, see how wafer manufacturing turns materials into the basis of the digital world.' },
      { title: 'Transistor: The Switch That Changed the World', category: 'Core Component', readTime: '5 min read', summary: 'How does a tiny transistor control current with high-speed switching to support the entire digital age?' },
    ],
    manufacturingSteps: [
      ['01', 'Purification and Crystal Growth', 'Purifying silicon from quartz sand, then pulling high-purity single-crystal silicon ingots using the Czochralski method.'],
      ['02', 'Slicing and Polishing', 'Cutting silicon ingots into thin wafers, followed by grinding and chemical-mechanical polishing to obtain a flat mirror finish.'],
      ['03', 'Deposition and Photoresist', 'Depositing thin films and coating photoresist on the wafer, preparing to transfer circuit patterns onto the surface.'],
      ['04', 'Photolithography and Etching', 'Exposing with light and selectively etching materials to form nanometer circuit structures layer by layer.'],
      ['05', 'Implantation and Metallization', 'Implanting ions to adjust material electrical properties and creating metal wires to connect transistors.'],
      ['06', 'Dicing, Packaging, and Testing', 'Dicing wafers into individual dies, packaging and testing functionality and reliability to become usable chips.'],
    ],
    glossaryTerms: [
      ['semiconductor', 'Semiconductor', 'Semiconductor', 'Materials whose conductivity can be controlled, such as silicon, the most crucial foundation of modern chips.'],
      ['wafer', 'Silicon Wafer', 'Silicon Wafer', 'A thin circular disk produced from sliced and polished single-crystal silicon where chip circuits are built.'],
      ['transistor', 'Transistor', 'Transistor', 'Electronic components that can amplify signals or act as switches, the fundamental unit of processors and memory.'],
      ['photolithography', 'Photolithography', 'Photolithography', 'A process using masks and light to print intricate circuit patterns onto a wafer.'],
      ['logic-gate', 'Logic Gate', 'Logic Gate', 'Digital circuits that compute inputs according to Boolean logic to produce 0 or 1 outputs.'],
      ['doping', 'Doping', 'Doping', 'The process of introducing trace impurities (such as boron or phosphorus) into pure silicon to alter its electrical conductivity.'],
      ['etching', 'Etching', 'Etching', 'Using chemical or physical methods to remove unprotected thin films on a wafer to form circuit patterns.'],
      ['diode', 'Diode', 'Diode', 'A semiconductor component that allows current to flow in only one direction, commonly used for rectification and signal processing.'],
      ['integrated-circuit', 'Integrated Circuit', 'Integrated Circuit (IC)', 'A circuit system containing a vast number of miniaturized transistors and components fabricated on a single silicon chip.'],
      ['cleanroom', 'Cleanroom', 'Cleanroom', 'An ultra-clean facility with tightly controlled airborne particles, temperature, and humidity to prevent wafer contamination.'],
      ['packaging', 'Packaging', 'Packaging', 'Connecting diced chip dies to external pins and enclosing them in a protective casing for mounting on circuit boards.'],
      ['cmos', 'CMOS', 'CMOS', 'The most widely used technology in modern integrated circuits, consisting of complementary PMOS and NMOS transistors with low power consumption.'],
      ['nanometer', 'Nanometer', 'Nanometer (nm)', 'One billionth of a meter, a unit used in semiconductor manufacturing to measure transistor gate size and precision.'],
    ]
  }
};
