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
      summary: '導體容易讓電子通過，絕緣體則阻擋電子；半導體的導電能力介於兩者之間，還能透過溫度與摻雜精準調整。',
      paragraphs: [
        '在大自然中，材料依據其導電能力的差異，主要可分為導體、絕緣體與半導體三大類。',
        '銅、鋁等金屬是絕佳的導體，內部有豐富的自由電子可以輕易傳導電流；相對地，橡膠、玻璃等絕緣體則缺乏自由電子，會強烈阻擋電流通過。',
        '半導體（如矽、鍺）的導電能力介於導體與絕緣體之間。在絕對零度時它表現得像絕緣體，但在常溫下或給予外界能量（如光照、加熱）時，部分電子會掙脫束縛成為自由電子，產生導電性。',
        '更重要的是，科學家可以透過「摻雜」（Doping）技術，在半導體中加入微量雜質，精準控制其導電行為，這正是製造現代所有晶片與電晶體的基石。'
      ],
      conceptTitle: '能量能隙與導電控制',
      conceptDesc: '半導體的能隙（Band Gap）大小適中，讓電子在獲得適當能量後就能躍遷至導帶，形成可控的電流。'
    },
    en: {
      title: 'Conductors, Insulators, and Semiconductors',
      eyebrow: 'Learning Path · Core Basics 01',
      summary: 'Conductors easily let electrons pass, while insulators block them; semiconductor conductivity is between both and can be precisely adjusted via temperature and doping.',
      paragraphs: [
        'In nature, materials are classified into conductors, insulators, and semiconductors based on their electrical conductivity.',
        'Metals like copper and aluminum are excellent conductors with abundant free electrons to easily carry current. Conversely, insulators like rubber and glass lack free electrons and strongly block current.',
        'Semiconductors (such as silicon and germanium) have conductivity between conductors and insulators. At absolute zero, they act as insulators, but at room temperature or with external energy (light, heat), some electrons break free to conduct electricity.',
        'Importantly, scientists use "doping" to add trace impurities into semiconductors, precisely controlling their electrical behavior—the foundation of modern chips and transistors.'
      ],
      conceptTitle: 'Band Gap and Conductivity Control',
      conceptDesc: 'Semiconductors have a moderate band gap, allowing electrons to transition to the conduction band with proper energy to form controllable current.'
    }
  },
  {
    id: '02',
    number: '02',
    zh: {
      title: '矽晶體與共價鍵',
      eyebrow: '學習路徑 · 基礎核心 02',
      summary: '矽原子有四個價電子，會與鄰近原子形成穩定的共價鍵，這個晶體結構是製作晶片的材料基礎。',
      paragraphs: [
        '矽（Silicon）是地殼中含量第二豐富的元素，也是半導體工業最核心的材料。為什麼是矽？因為它的化學性質穩定，且能形成完美的晶體結構。',
        '每個矽原子在其最外層（價電子殼層）擁有四個價電子。為了達到安定狀態，矽原子會與周圍的四個相鄰矽原子分享電子，形成強固的「共價鍵」（Covalent Bond）。',
        '這種正四面體的晶體結構在常溫下非常穩定，電子被緊緊束縛在共價鍵中，因此純矽（本質半導體）在沒有外力干擾時，導電性其實很低。',
        '為了讓矽具備良好的導電與開關特性，必須進入下一步：透過摻雜改變其電子結構。'
      ],
      conceptTitle: '晶格結構與穩定性',
      conceptDesc: '完美的單晶矽結構確保了電子在傳輸時不會受到過多晶格缺陷的干擾，是高效能晶片的物理基礎。'
    },
    en: {
      title: 'Silicon Crystals and Covalent Bonds',
      eyebrow: 'Learning Path · Core Basics 02',
      summary: 'Silicon atoms have four valence electrons, forming stable covalent bonds with neighboring atoms. This crystal structure is the material foundation of chips.',
      paragraphs: [
        'Silicon is the second most abundant element in the Earth\'s crust and the core material of the semiconductor industry. Why silicon? Because of its stable chemical properties and ability to form perfect crystal structures.',
        'Each silicon atom has four valence electrons in its outer shell. To achieve stability, it shares electrons with four neighboring silicon atoms, forming strong covalent bonds.',
        'This tetrahedral crystal structure is very stable at room temperature, with electrons tightly bound. Thus, pure silicon (intrinsic semiconductor) has low conductivity without external disturbance.',
        'To give silicon good conduction and switching characteristics, the next step is changing its electronic structure via doping.'
      ],
      conceptTitle: 'Lattice Structure and Stability',
      conceptDesc: 'Perfect single-crystal silicon ensures electrons travel without excessive lattice defect interference, serving as the physical basis for high-performance chips.'
    }
  },
  {
    id: '03',
    number: '03',
    zh: {
      title: 'P 型與 N 型半導體',
      eyebrow: '學習路徑 · 基礎核心 03',
      summary: '在矽中加入不同雜質，可以創造電洞或自由電子，分別形成 P 型與 N 型半導體。',
      paragraphs: [
        '純矽的導電性不夠強，無法直接用來製作複雜的電路開關。因此，工程師會對純矽進行「摻雜」（Doping），也就是刻意加入極少數的其他元素原子。',
        '如果加入含有五個價電子的元素（如磷、砷），多出來的一個電子就會成為自由電子，能夠在晶格中自由移動。這種帶負電的半導體就被稱為 **N 型半導體（Negative type）**。',
        '如果加入含有三個價電子的元素（如硼、鎵），就會在共價鍵中留下一個缺少電子的空位，稱為 **「電洞」（Hole）**。電洞可以吸引周圍的電子來填補，看起來就像正電荷在移動。這種帶正電特性的半導體被稱為 **P 型半導體（Positive type）**。',
        'N 型提供豐富的自由電子，P 型提供豐富的電洞，這兩者的結合是建構所有現代電子元件（如二極體與電晶體）的基礎。'
      ],
      conceptTitle: '載子與電性調控',
      conceptDesc: '自由電子與電洞統稱為「載子」。透過控制摻雜濃度，我們可以精確調節半導體的導電能力。'
    },
    en: {
      title: 'P-type and N-type Semiconductors',
      eyebrow: 'Learning Path · Core Basics 03',
      summary: 'Adding different impurities into silicon creates electron holes or free electrons, forming P-type and N-type semiconductors respectively.',
      paragraphs: [
        'Pure silicon is not conductive enough to build complex circuit switches directly. Therefore, engineers perform "doping" by intentionally adding trace amounts of impurity atoms.',
        'Adding elements with five valence electrons (like phosphorus or arsenic) creates extra free electrons that move about the lattice. This negatively-doped semiconductor is called **N-type semiconductor**.',
        'Adding elements with three valence electrons (like boron or gallium) creates electron vacancies called **holes**. Holes attract surrounding electrons, acting like moving positive charges. This positively-doped semiconductor is called **P-type semiconductor**.',
        'N-type provides abundant free electrons and P-type provides abundant holes. Their combination is the foundation of all modern electronic components such as diodes and transistors.'
      ],
      conceptTitle: 'Carriers and Electrical Tuning',
      conceptDesc: 'Free electrons and holes are collectively called carriers. By controlling doping concentration, we precisely regulate semiconductor conductivity.'
    }
  },
  {
    id: '04',
    number: '04',
    zh: {
      title: 'PN 接面與二極體',
      eyebrow: '學習路徑 · 基礎核心 04',
      summary: 'P 型和 N 型接合後形成耗盡區，電流較容易朝一個方向通過，這就是二極體的基本原理。',
      paragraphs: [
        '當我們將 P 型半導體與 N 型半導體緊密結合在一起時，交界處就會形成一個關鍵區域——**PN 接面（PN Junction）**。',
        '在接面處，N 型的自由電子會擴散到 P 型去和電洞結合，P 型的電洞也會擴散到 N 型。這會在交界處形成一個沒有自由載子的「耗盡區」（Depletion Region），建立起內建電場。',
        '如果給予「順向偏壓」（正極接 P，負極接 N），外加電場會克服內建電場，讓電流順利通過；反之，若給予「逆向偏壓」，耗盡區會擴大，電流無法通過。',
        '這種「單向導電性」讓 PN 接面成為 **二極體（Diode）** 的核心，也是邏輯閘與整流電路不可或缺的元件。'
      ],
      conceptTitle: '單向導電閥門',
      conceptDesc: 'PN 接面就像電子世界的單向閥，只允許電流往單一方向流動，確保訊號傳遞不逆流。'
    },
    en: {
      title: 'PN Junction and Diode',
      eyebrow: 'Learning Path · Core Basics 04',
      summary: 'Combining P-type and N-type creates a depletion region where current flows more easily in one direction. This is the basic principle of a diode.',
      paragraphs: [
        'When P-type and N-type semiconductors are closely joined, a crucial region forms at the interface: the **PN Junction**.',
        'At the junction, free electrons from N-type diffuse into P-type to combine with holes, and holes diffuse into N-type. This creates a depletion region devoid of free carriers, establishing an internal electric field.',
        'Applying forward bias (positive to P, negative to N) overcomes the internal field, allowing current to flow. Conversely, reverse bias widens the depletion region, blocking current.',
        'This unidirectional conductivity makes the PN junction the core of **diodes** and an indispensable component for logic gates and rectification circuits.'
      ],
      conceptTitle: 'Unidirectional Valve',
      conceptDesc: 'The PN junction acts like a one-way valve for electricity, allowing current to flow in only one direction and preventing signal backflow.'
    }
  }
];

export function getArticleById(id: string): LessonArticle | undefined {
  return learnArticles.find(article => article.id === id);
}
