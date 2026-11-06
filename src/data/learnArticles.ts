export interface ArticleContent {
  title: string;
  eyebrow: string;
  summary: string;
  paragraphs: string[];
  conceptTitle: string;
  conceptDesc: string;
}

export interface LessonArticle {
  id: string;
  number: string;
  zh: ArticleContent;
  en: ArticleContent;
}

export const learnArticles: LessonArticle[] = [
  {
    id: '01',
    number: '01',
    zh: {
      title: '導體、絕緣體與半導體',
      eyebrow: '學習路徑 · 基礎核心 01',
      summary: '導體容易讓電子通過，絕緣體則阻擋電子；半導體的導電能力介於兩者之間，還能透過溫度、光照與摻雜精準控制，是現代微電子學的基石。',
      paragraphs: [
        '在大自然中，所有材料依據其對電流的傳導能力，主要可被劃分為三大類：導體（Conductors）、絕緣體（Insulators）以及半導體（Semiconductors）。這種分類的核心物理基礎，源於量子力學中的「能帶理論」（Energy Band Theory）。',
        '導體（如金屬銅、鋁、金）具有極豐富的自由電子，其價帶與導帶之間幾乎沒有能隙（Energy Gap），電子只需獲得微小的電壓或熱能即可自由移動，形成強大的電流。相反地，絕緣體（如橡膠、玻璃、石英）的能隙極寬，電子被牢牢束縛在原子核周圍，幾乎無法傳導電流。',
        '半導體（如矽 Silicon、鍺 Germanium）的特性則非常獨特。在絕對零度（0K）時，半導體表現得像絕緣體；但在常溫下，部分價電子能夠獲得足夠的熱能，躍遷跨越適中的能隙進入導帶，成為自由電子，並在原處留下「電洞」。這種介於導通與阻斷之間的特性，賦予了半導體極高的控制潛力。',
        '除了溫度之外，科學家還發現透過「光照」（如太陽能電池與光敏元件）以及最重要的「摻雜技術」（Doping），可以隨心所欲地改變半導體的導電行為。這種可被精準操縱的特性，正是人類能夠建造出億萬電晶體微處理器的根本原因。'
      ],
      conceptTitle: '能量能隙與導電控制',
      conceptDesc: '半導體的能隙（Band Gap）大小適中，讓電子在獲得適當能量後就能躍遷至導帶，形成可控的電流。'
    },
    en: {
      title: 'Conductors, Insulators, and Semiconductors',
      eyebrow: 'Learning Path · Core Basics 01',
      summary: 'Conductors easily let electrons pass, while insulators block them; semiconductor conductivity is between both and can be precisely controlled via temperature, light, and doping.',
      paragraphs: [
        'In nature, materials are classified into conductors, insulators, and semiconductors based on their electrical conductivity. This physical classification originates from the Energy Band Theory in quantum mechanics.',
        'Conductors (such as copper, aluminum, gold) have abundant free electrons with virtually no energy gap between the valence band and conduction band, allowing electrons to move freely with tiny voltages. Conversely, insulators (such as rubber, glass, quartz) have a very wide band gap, binding electrons tightly.',
        'Semiconductors (such as silicon and germanium) exhibit unique behavior. At absolute zero (0K), they act as insulators; at room temperature, thermal energy allows some valence electrons to cross the moderate band gap into the conduction band, leaving behind electron holes.',
        'Besides temperature, scientists discovered that external stimuli like light (solar cells) and most importantly doping can precisely manipulate semiconductor behavior. This controllable conductivity enables billion-transistor microprocessors.'
      ],
      conceptTitle: 'Energy Bands and Band Gap',
      conceptDesc: 'The fundamental difference lies in the band gap width. Semiconductors have a moderate gap, enabling external energy to excite electrons and achieve switching and amplification.'
    }
  },
  {
    id: '02',
    number: '02',
    zh: {
      title: '矽晶體與共價鍵',
      eyebrow: '學習路徑 · 基礎核心 02',
      summary: '矽原子擁有四個價電子，會與鄰近原子形成完美的正四面體共價鍵結。這種晶體結構提供了極佳的化學穩定性與物理支撐，是半導體工業無可取代的核心材料。',
      paragraphs: [
        '在元素週期表中，矽（Silicon，原子序 14）屬於第四族元素。它是地殼中含量僅次於氧的豐富元素，主要存在於石英砂（二氧化矽）之中。然而，要將石英砂提煉成適合半導體製造的高純度電子級單晶矽（Purity > 99.9999999%），需要經過極其繁複的還原與柴氏拉晶法（Czochralski process）。',
        '為什麼整個半導體產業如此依賴矽？關鍵在於矽原子的外層擁有四個「價電子」（Valence Electrons）。為了追求化學穩定性，每個矽原子會與周圍四個相鄰的矽原子各分享一個電子，形成強固的「共價鍵」（Covalent Bond）。',
        '這種共價鍵排列呈現出完美的三維正四面體晶格結構（金剛石立方晶系）。在常溫下，這些共價鍵將電子緊緊鎖在晶格之中，因此高純度的本質矽（Intrinsic Silicon）導電率其實相當低，更像是一種絕緣體。',
        '然而，正是這種完美且安定的晶體結構，提供了無與倫比的機械強度與絕緣基底。在後續製程中，工程師可以在這個完美的基底上進行微影與摻雜，精準雕刻出無數奈米級的電子迴路。'
      ],
      conceptTitle: '晶格結構與化學安定性',
      conceptDesc: '完美的金剛石晶格確保了電子傳輸時受到的晶格散射極少；同時，矽表面自然生成的二氧化矽（SiO2）薄膜是極佳的絕緣絕緣層，成就了平面製程技術。'
    },
    en: {
      title: 'Silicon Crystals and Covalent Bonds',
      eyebrow: 'Learning Path · Core Basics 02',
      summary: 'Silicon atoms have four valence electrons, forming tetrahedral covalent bonds. This crystal structure provides exceptional stability and serves as the core material of the semiconductor industry.',
      paragraphs: [
        'In the periodic table, silicon (atomic number 14) is a Group IV element. It is the second most abundant element in the Earth\'s crust, found primarily in quartz sand. However, refining quartz into electronic-grade single-crystal silicon (Purity > 99.9999999%) requires complex reduction and the Czochralski process.',
        'Why does the semiconductor industry rely so heavily on silicon? The key lies in its four valence electrons. To achieve stability, each silicon atom shares electrons with four neighboring atoms, forming strong covalent bonds.',
        'This arrangement forms a 3D tetrahedral crystal lattice (diamond cubic structure). At room temperature, these bonds lock electrons tightly, meaning pure intrinsic silicon has low conductivity, acting almost as an insulator.',
        'Nevertheless, this stable crystal structure provides unmatched mechanical strength and a pristine substrate. Engineers can subsequently perform photolithography and doping to sculpt billions of nanoscale circuits.'
      ],
      conceptTitle: 'Lattice Structure and Material Advantages',
      conceptDesc: 'The perfect diamond lattice minimizes electron scattering during transit. Additionally, the native silicon dioxide (SiO2) layer on silicon provides an exceptional insulating dielectric for planar processing.'
    }
  },
  {
    id: '03',
    number: '03',
    zh: {
      title: 'P 型與 N 型半導體',
      eyebrow: '學習路徑 · 基礎核心 03',
      summary: '透過向純矽中摻入微量特定雜質元素，工程師能夠創造出帶負電的 N 型半導體與帶正電的 P 型半導體，為控制電流奠定基礎。',
      paragraphs: [
        '純矽晶體的導電能力雖然穩定但過於微弱，無法直接應用於邏輯運算或訊號放大。為了突破這個限制，半導體製程中引入了關鍵的「摻雜」（Doping）技術——在極高純度的矽晶圓中，以精密控制的劑量植入特定元素原子。',
        '當我們向矽晶體中摻入含有五個價電子的元素（例如磷 Phosphorus、砷 Arsenic，屬於周期表第五族），這些雜質原子會取代原本矽原子的位置。由於五個電子中只有四個參與共價鍵結，多出來的那第五個電子便成為了可以自由移動的「自由電子」。這種富含自由電子的半導體被稱為 **N 型半導體（Negative-type Semiconductor）**。',
        '相對地，如果我們向矽晶體中摻入含有三個價電子的元素（例如硼 Boron、鎵 Gallium，屬於周期表第三族），由於少了一個電子來填滿共價鍵，會在晶格中留下一個帶正電特性、渴望抓取電子的空位，稱為 **「電洞」（Hole）**。這種富含電洞的半導體被稱為 **P 型半導體（Positive-type Semiconductor）**。',
        'N 型半導體中的自由電子與 P 型半導體中的電洞，在半導體物理中被統稱為 **「載子」（Carriers）**。透過精準控制摻雜濃度與分佈，工程師可以隨心所欲地調節材料的電阻率與導電特性。'
      ],
      conceptTitle: '雜質能階與載子調控',
      conceptDesc: 'N 型半導體提供豐富的自由電子（多數載子），P 型半導體提供豐富的電洞（多數載子）。兩者的組合是建構二極體、電晶體與所有複雜積體電路的根本材料單元。'
    },
    en: {
      title: 'P-type and N-type Semiconductors',
      eyebrow: 'Learning Path · Core Basics 03',
      summary: 'By doping pure silicon with trace specific impurities, engineers create negative N-type and positive P-type semiconductors, establishing the foundation for current control.',
      paragraphs: [
        'Pure silicon crystals have stable yet insufficient conductivity for logic computation or amplification. To overcome this, the semiconductor industry employs "doping"—introducing precisely controlled doses of impurity atoms into ultrapure silicon wafers.',
        'When group V elements with five valence electrons (like phosphorus or arsenic) are doped into silicon, they replace silicon atoms. Four electrons form covalent bonds, leaving the fifth electron free to move. This electron-rich material is called **N-type semiconductor**.',
        'Conversely, doping group III elements with three valence electrons (like boron or gallium) leaves a vacancy in the covalent bond seeking an electron, termed an **electron hole**. This hole-rich material is called **P-type semiconductor**.',
        'Free electrons in N-type and holes in P-type are collectively called **carriers**. By precisely controlling doping concentration and profiles, engineers can tailor material resistivity and electrical behavior at will.'
      ],
      conceptTitle: 'Impurity Energy Levels and Carrier Control',
      conceptDesc: 'N-type provides abundant free electrons (majority carriers) and P-type provides abundant holes. Their combination is the fundamental building block for diodes, transistors, and integrated circuits.'
    }
  },
  {
    id: '04',
    number: '04',
    zh: {
      title: 'PN 接面與二極體',
      eyebrow: '學習路徑 · 基礎核心 04',
      summary: '當 P 型與 N 型半導體緊密接合時，交界處會形成耗盡區與內建電場，造就了神奇的單向導電特性，成就了現代二極體與整流電路。',
      paragraphs: [
        '將 P 型半導體（富含電洞）與 N 型半導體（富含自由電子）透過先進半導體製程融合成單一晶片時，兩者交界處會發生劇烈的物理現象，稱為 **PN 接面（PN Junction）**。',
        '在交界處，N 型區的自由電子會受到濃度差驅動向 P 型區擴散，而 P 型區的電洞也會向 N 型區擴散。當電子與電洞在接面處相遇並結合（Recombination）後，會在介面兩側留下無法自由移動的正離子與負離子，形成一個不含自由載子的「耗盡區」（Depletion Region），並在內部建立一個阻止載子繼續擴散的「內建電場」。',
        '此時如果我們外加電壓：當正極接 P 型、負極接 N 型（稱為 **順向偏壓 Forward Bias**），外加電場會抵銷內建電場，使耗盡區縮小，電流得以順暢通過；反之，若正極接 N 型、負極接 P 型（稱為 **逆向偏壓 Reverse Bias**），外加電場會使耗盡區擴大，幾乎沒有電流能通過。',
        '這種 **「單向導電性」（Unidirectional Conductivity）** 讓 PN 接面成為 **二極體（Diode）** 的核心運作原理。二極體廣泛應用於電源整流（將交流電轉為直流電）、邏輯閘保護、LED 發光與太陽能光電轉換中。'
      ],
      conceptTitle: '單向導電閥門與耗盡區',
      conceptDesc: 'PN 接面就像電子世界的單向止逆閥。順向時暢行無阻，逆向時封鎖電流，這種非線性開關特性是數位邏輯與電源轉換不可或缺的基石。'
    },
    en: {
      title: 'PN Junction and Diode',
      eyebrow: 'Learning Path · Core Basics 04',
      summary: 'When P-type and N-type semiconductors are joined, a depletion region and built-in electric field form at the interface, creating unidirectional conductivity for diodes and rectification.',
      paragraphs: [
        'When P-type and N-type semiconductors are fabricated into a single crystal, a profound physical phenomenon occurs at their boundary: the **PN Junction**.',
        'At the interface, free electrons from the N-side diffuse toward the P-side, and holes from the P-side diffuse toward the N-side. When electrons and holes recombine at the junction, they leave behind fixed positive and negative ions, creating a carrier-free **Depletion Region** with an internal built-in electric field.',
        'Applying external voltage: Forward bias (positive to P, negative to N) overcomes the built-in field, shrinking the depletion region and allowing heavy current flow. Reverse bias (positive to N, negative to P) widens the depletion region, blocking current almost entirely.',
        'This **unidirectional conductivity** forms the core principle of **diodes**. Diodes are essential for AC-to-DC rectification, circuit protection, LED lighting, and solar power conversion.'
      ],
      conceptTitle: 'Unidirectional Valve and Depletion Region',
      conceptDesc: 'The PN junction acts as a one-way valve for electricity. Passing current forward while blocking it in reverse, this non-linear switching property is fundamental to digital logic and power conversion.'
    }
  },
  {
    id: '05',
    number: '05',
    zh: {
      title: 'MOSFET：數位世界的微型開關',
      eyebrow: '學習路徑 · 基礎核心 05',
      summary: '金屬氧化物半導體場效電晶體（MOSFET）是現代微電子學最偉大的發明。它利用電場效應控制通道開關，數十億顆 MOSFET 支撐了整個電腦、手機與 AI 時代。',
      paragraphs: [
        '在前幾章中我們了解了半導體、摻雜與 PN 接面，而所有這些基礎最終都是為了實現一項最關鍵的功能：**用微小的訊號來控制巨大的電流，也就是「開關與放大」**。達成這個目標最成功的元件，就是 **MOSFET（Metal-Oxide-Semiconductor Field-Effect Transistor，金屬氧化物半導體場效電晶體）**。',
        'MOSFET 的結構主要由四個端點組成：**源極（Source）**、**汲極（Drain）**、**閘極（Gate）** 以及 **基底（Body/Substrate）**。在源極與汲極之間隔著半導體基底，而閘極則透過一層極薄的絕緣氧化層（二氧化矽）與半導體隔開，因此閘極基本上沒有直流電流流入，是一個純粹靠「電場」控制的元件。',
        '其運作原理如同水龍頭的閥門：當我們在閘極（Gate）施加足夠的電壓時，會在閘極下方吸引並感應出自由電子，在源極與汲極之間臨時建立起一座導電的「通道」（Channel）。此時源極與汲極之間便能順暢導通電流（代表開關開啟，輸出 1）。當撤除閘極電壓時，通道消失，電流被切斷（代表開關關閉，輸出 0）。',
        '現代先進製程（如 3nm、2nm 鰭式場效電晶體 FinFET 與環繞閘極 GAAFET）將 MOSFET 縮小到奈米尺度。在一顆指甲大小的晶片上，可以集結高達數百億甚至上千億顆這樣的微型開關，以每秒數十億次的頻率進行切換，這就是現代 CPU、GPU 以及人工智慧運算的底層物理奧秘。'
      ],
      conceptTitle: '電場效應與奈米級開關',
      conceptDesc: 'MOSFET 利用閘極電壓產生的電場來控制通道的開閉，實現無功耗（或極低功耗）的靜態開關控制，是推動莫爾定律（Moore\'s Law）持續前進的核心引擎。'
    },
    en: {
      title: 'MOSFET: The Microscopic Switch of the Digital World',
      eyebrow: 'Learning Path · Core Basics 05',
      summary: 'The Metal-Oxide-Semiconductor Field-Effect Transistor (MOSFET) is microelectronics\' greatest invention, using electric fields to control channel switching for computers, phones, and AI.',
      paragraphs: [
        'In previous chapters we explored semiconductors, doping, and PN junctions. All these foundations culminate in a vital function: **using small signals to control large currents—switching and amplification**. The most successful device achieving this is the **MOSFET**.',
        'A MOSFET consists of four terminals: **Source**, **Drain**, **Gate**, and **Body**. Between source and drain lies the semiconductor substrate, while the gate is separated by an ultra-thin insulating oxide layer (SiO2). Thus, virtually no DC current enters the gate; it is strictly controlled by an electric field.',
        'Its operation mimics a water valve: applying sufficient voltage to the Gate attracts electrons beneath it, temporarily forming a conductive **Channel** between Source and Drain. Current then flows (Switch ON, representing 1). Removing gate voltage collapses the channel, cutting current (Switch OFF, representing 0).',
        'Modern advanced nodes (3nm, 2nm FinFET, GAAFET) shrink MOSFETs to nanoscale dimensions. Tens of billions or hundreds of billions of these microscopic switches on a fingernail-sized chip switch billions of times per second—the physical magic underlying CPUs, GPUs, and AI.'
      ],
      conceptTitle: 'Field Effect and Nanoscale Switching',
      conceptDesc: 'MOSFETs use gate electric fields to control channel conductivity, achieving near-zero static power consumption and serving as the core engine driving Moore\'s Law.'
    }
  }
];

export function getArticleById(id: string): LessonArticle | undefined {
  return learnArticles.find(article => article.id === id);
}
