const questions = [
  {
    title: '在洛克王国组队打 BOSS 时，你更像哪种队友？',
    options: [
      { text: '冲在前面先开团', desc: '先把节奏拉起来。', delta: { fire: 2, free: 1 } },
      { text: '观察机制再出手', desc: '先看局势再进场。', delta: { brain: 2, light: 1 } },
      { text: '稳定补位保护全队', desc: '不抢镜但很关键。', delta: { light: 2, brain: 1 } },
      { text: '灵活游走找机会', desc: '我更擅长打变化。', delta: { free: 2, fire: 1 } }
    ]
  },
  {
    title: '现实里遇到临时加急任务，你会？',
    options: [
      { text: '马上动手，先推进一版', desc: '先跑起来最重要。', delta: { fire: 2, free: 1 } },
      { text: '先分解步骤再执行', desc: '我喜欢可控节奏。', delta: { brain: 2, light: 1 } },
      { text: '先协调资源再开工', desc: '合作效率更高。', delta: { light: 2, free: 1 } },
      { text: '先判断值不值得做', desc: '方向比速度更重要。', delta: { brain: 2, fire: 1 } }
    ]
  },
  {
    title: '你最想拥有哪种精灵特性？',
    options: [
      { text: '高爆发，一击定胜负', desc: '关键时刻一锤定音。', delta: { fire: 3 } },
      { text: '高续航，越打越稳', desc: '稳住就能赢。', delta: { light: 3 } },
      { text: '高机动，节奏难预测', desc: '变化就是优势。', delta: { free: 3 } },
      { text: '高策略，抓机制反打', desc: '脑子比手更快。', delta: { brain: 3 } }
    ]
  },
  {
    title: '朋友眼里的你，更接近哪句？',
    options: [
      { text: '和你在一起不无聊', desc: '气氛担当。', delta: { free: 2, fire: 1 } },
      { text: '有你在就很安心', desc: '稳定担当。', delta: { light: 2, brain: 1 } },
      { text: '你总能想到新办法', desc: '脑洞担当。', delta: { brain: 2, free: 1 } },
      { text: '你是真能把事做成', desc: '执行担当。', delta: { fire: 2, light: 1 } }
    ]
  },
  {
    title: '你更喜欢哪类游戏关卡？',
    options: [
      { text: '正面硬刚的战斗关', desc: '爽快最重要。', delta: { fire: 2, free: 1 } },
      { text: '解谜和机制关', desc: '想清楚再动。', delta: { brain: 2, light: 1 } },
      { text: '多人协作关', desc: '配合更有成就感。', delta: { light: 2, free: 1 } },
      { text: '自由探索地图关', desc: '探索本身就很快乐。', delta: { free: 2, brain: 1 } }
    ]
  },
  {
    title: '在生活里你最怕哪种状态？',
    options: [
      { text: '一成不变，毫无变化', desc: '需要新鲜感。', delta: { free: 2, brain: 1 } },
      { text: '混乱失控，没有秩序', desc: '秩序能让我安心。', delta: { light: 2, brain: 1 } },
      { text: '拖太久，事情不推进', desc: '行动速度很重要。', delta: { fire: 2, free: 1 } },
      { text: '思路乱，无法判断方向', desc: '逻辑清晰最关键。', delta: { brain: 2, light: 1 } }
    ]
  },
  {
    title: '如果你在王国里带一队精灵，你会怎么配？',
    options: [
      { text: '全员进攻，抢节奏', desc: '快节奏压制。', delta: { fire: 2, free: 1 } },
      { text: '攻守平衡，稳扎稳打', desc: '容错率更高。', delta: { light: 2, brain: 1 } },
      { text: '克制链拉满，针对对手', desc: '策略克制。', delta: { brain: 2, fire: 1 } },
      { text: '高机动阵容，打游击', desc: '灵活变阵。', delta: { free: 2, brain: 1 } }
    ]
  },
  {
    title: '你更想成为哪种“主角感”？',
    options: [
      { text: '热血型，冲锋在前', desc: '燃起来就赢一半。', delta: { fire: 3 } },
      { text: '守护型，稳住全场', desc: '稳定才是底盘。', delta: { light: 3 } },
      { text: '智谋型，算无遗策', desc: '脑子就是武器。', delta: { brain: 3 } },
      { text: '自由型，风格鲜明', desc: '做自己最重要。', delta: { free: 3 } }
    ]
  },
  {
    title: '当你和朋友意见不同时，你通常会？',
    options: [
      { text: '先听，再说我的观点', desc: '先理解再表达。', delta: { light: 2, brain: 1 } },
      { text: '直接辩清楚，快点定结论', desc: '效率优先。', delta: { fire: 2, brain: 1 } },
      { text: '找折中方案，一起推进', desc: '协作优先。', delta: { free: 2, light: 1 } },
      { text: '我会改计划，不硬碰', desc: '灵活处理。', delta: { free: 2, brain: 1 } }
    ]
  },
  {
    title: '你做长期目标时，最依赖什么？',
    options: [
      { text: '强执行，把计划做完', desc: '做完比想完重要。', delta: { fire: 2, light: 1 } },
      { text: '节奏感，每天稳定推进', desc: '持续是关键。', delta: { light: 2, brain: 1 } },
      { text: '复盘能力，不断调策略', desc: '越做越聪明。', delta: { brain: 2, fire: 1 } },
      { text: '兴趣驱动，保持热爱', desc: '热爱能带来持久力。', delta: { free: 2, light: 1 } }
    ]
  },
  {
    title: '在王国冒险里，你会把资源优先给谁？',
    options: [
      { text: '主力输出精灵', desc: '先拉高上限。', delta: { fire: 2, free: 1 } },
      { text: '核心辅助精灵', desc: '稳态最重要。', delta: { light: 2, brain: 1 } },
      { text: '功能型战术精灵', desc: '克制链是关键。', delta: { brain: 2, fire: 1 } },
      { text: '颜值和手感最喜欢的精灵', desc: '快乐优先。', delta: { free: 2, light: 1 } }
    ]
  },
  {
    title: '你更像哪种社交状态？',
    options: [
      { text: '主动开话题，带热场子', desc: '外向表达。', delta: { free: 2, fire: 1 } },
      { text: '不高频说话，但句句有用', desc: '克制表达。', delta: { brain: 2, light: 1 } },
      { text: '观察场面，给别人台阶', desc: '温和协调。', delta: { light: 2, free: 1 } },
      { text: '看状态切换不同模式', desc: '情境适配。', delta: { free: 2, brain: 1 } }
    ]
  },
  {
    title: '你最理想的生活节奏是？',
    options: [
      { text: '高能快节奏，机会不断', desc: '刺激感很重要。', delta: { fire: 2, free: 1 } },
      { text: '稳定高质量，张弛有度', desc: '稳稳向上。', delta: { light: 2, brain: 1 } },
      { text: '不断学习，持续升级', desc: '成长驱动。', delta: { brain: 2, fire: 1 } },
      { text: '自由探索，边走边玩', desc: '体验驱动。', delta: { free: 2, light: 1 } }
    ]
  },
  {
    title: '最后一题：如果你要给自己选一个称号，会是？',
    options: [
      { text: '破局者', desc: '遇事先开路。', delta: { fire: 2, brain: 1 } },
      { text: '守望者', desc: '稳住人与局。', delta: { light: 2, fire: 1 } },
      { text: '策士', desc: '思路是我的核心武器。', delta: { brain: 3 } },
      { text: '旅者', desc: '自由和变化让我更强。', delta: { free: 3 } }
    ]
  }
];

const EXTENDED_SPIRITS = [
  {
    id: 'huoshen',
    title: '火神',
    form: '经典形态',
    number: 'NO.110',
    types: ['火'],
    category: '经典高热度精灵',
    distribution: '王国火山群',
    wiki_summary: '进攻欲和存在感都很强，典型的高压破局型精灵。',
    quiz_pitch: '你像火神，敢冲敢扛，关键局面会主动接管。',
    image_ref: 'dimo',
    page: 'https://wiki.biligame.com/rocom/',
    weights: { light: 58, free: 64, brain: 50, fire: 95 },
    tags: ['主流', '战斗感', '高热度'],
    series: '主流',
    popularity: 96,
    is_hot: true
  },
  {
    id: 'shuilanlan',
    title: '水蓝蓝',
    form: '经典形态',
    number: 'NO.104',
    types: ['水'],
    category: '经典高热度精灵',
    distribution: '水域航道',
    wiki_summary: '弹性很强，能在变化中保持节奏。',
    quiz_pitch: '你像水蓝蓝，柔韧而稳定，擅长以柔克刚。',
    image_ref: 'miaomiao',
    page: 'https://wiki.biligame.com/rocom/',
    weights: { light: 74, free: 69, brain: 71, fire: 56 },
    tags: ['主流', '平衡型', '高热度'],
    series: '主流',
    popularity: 92,
    is_hot: true
  },
  {
    id: 'yinsuquan',
    title: '音速犬',
    form: '经典形态',
    number: 'NO.115',
    types: ['火'],
    category: '经典高热度精灵',
    distribution: '王国训练场',
    wiki_summary: '速度和行动力突出，推进能力极强。',
    quiz_pitch: '你像音速犬，效率很高，愿意用行动证明自己。',
    image_ref: 'yajiji',
    page: 'https://wiki.biligame.com/rocom/',
    weights: { light: 52, free: 76, brain: 64, fire: 89 },
    tags: ['主流', '速度型', '高热度'],
    series: '主流',
    popularity: 90,
    is_hot: true
  },
  {
    id: 'gelanqiu',
    title: '格兰球',
    form: '经典形态',
    number: 'NO.132',
    types: ['草'],
    category: '经典高热度精灵',
    distribution: '树海高地',
    wiki_summary: '适应性很高，属于稳扎稳打的成长型。',
    quiz_pitch: '你像格兰球，成长曲线平稳，越到后期越强。',
    image_ref: 'xuanyechong',
    page: 'https://wiki.biligame.com/rocom/',
    weights: { light: 70, free: 55, brain: 75, fire: 62 },
    tags: ['主流', '成长型'],
    series: '主流',
    popularity: 86,
    is_hot: true
  },
  {
    id: 'xueyingwa',
    title: '雪影娃娃',
    form: '经典形态',
    number: 'NO.150',
    types: ['冰', '翼'],
    category: '经典高热度精灵',
    distribution: '冰封丘陵',
    wiki_summary: '清冷而有边界，擅长在低噪音环境里表现。',
    quiz_pitch: '你像雪影娃娃，冷静克制，但内核非常稳定。',
    image_ref: 'dongyuque',
    page: 'https://wiki.biligame.com/rocom/',
    weights: { light: 79, free: 42, brain: 82, fire: 48 },
    tags: ['主流', '清冷感'],
    series: '主流',
    popularity: 89,
    is_hot: true
  },
  {
    id: 'yuanguxingling',
    title: '远古星灵',
    form: '稀有形态',
    number: 'NO.209',
    types: ['光', '翼'],
    category: '人气稀有精灵',
    distribution: '星塔遗迹',
    wiki_summary: '理性与守护并存，具备很强的判断力。',
    quiz_pitch: '你像远古星灵，安静但权重很高，决策质量出众。',
    image_ref: 'dimo',
    page: 'https://wiki.biligame.com/rocom/',
    weights: { light: 92, free: 52, brain: 88, fire: 58 },
    tags: ['高人气', '稀有'],
    series: '主流',
    popularity: 91,
    is_hot: true
  },
  {
    id: 'leiguangshou',
    title: '雷光兽',
    form: '稀有形态',
    number: 'NO.223',
    types: ['电'],
    category: '人气战斗精灵',
    distribution: '雷泽峡谷',
    wiki_summary: '爆发上限高，节奏偏快。',
    quiz_pitch: '你像雷光兽，强节奏、高决断，擅长抢先手。',
    image_ref: 'emoding',
    page: 'https://wiki.biligame.com/rocom/',
    weights: { light: 49, free: 81, brain: 76, fire: 86 },
    tags: ['高人气', '爆发流'],
    series: '主流',
    popularity: 87,
    is_hot: true
  },
  {
    id: 'shengyu_dimo',
    title: '圣域迪莫',
    form: '圣域形态',
    number: 'NO.H02',
    types: ['光'],
    category: '隐藏系列精灵',
    distribution: '圣域回廊',
    wiki_summary: '防守与守护拉满，属于高稳定高信任型。',
    quiz_pitch: '你像圣域迪莫，气场温和但核心极稳。',
    image_ref: 'dimo',
    page: 'https://wiki.biligame.com/rocom/',
    weights: { light: 97, free: 42, brain: 84, fire: 62 },
    tags: ['隐藏', '圣域', '守护型'],
    series: '隐藏·圣域',
    popularity: 88,
    is_hot: true,
    is_hidden: true
  },
  {
    id: 'shengyu_dongyuque',
    title: '圣域冬羽雀',
    form: '圣域形态',
    number: 'NO.H03',
    types: ['光', '翼'],
    category: '隐藏系列精灵',
    distribution: '风眠圣所',
    wiki_summary: '高冷外壳下的稳定关照，极其注重边界。',
    quiz_pitch: '你像圣域冬羽雀，安静但非常可靠。',
    image_ref: 'dongyuque',
    page: 'https://wiki.biligame.com/rocom/',
    weights: { light: 94, free: 36, brain: 86, fire: 45 },
    tags: ['隐藏', '圣域', '边界感'],
    series: '隐藏·圣域',
    popularity: 84,
    is_hidden: true
  },
  {
    id: 'emoyeyan',
    title: '恶魔夜焰',
    form: '噩梦形态',
    number: 'NO.H11',
    types: ['恶', '火'],
    category: '隐藏系列精灵',
    distribution: '暗焰裂隙',
    wiki_summary: '攻击性和压迫感很强，适合高风险决策。',
    quiz_pitch: '你像恶魔夜焰，锋利、直接、爆发力十足。',
    image_ref: 'emoding',
    page: 'https://wiki.biligame.com/rocom/',
    weights: { light: 31, free: 79, brain: 88, fire: 97 },
    tags: ['隐藏', '噩梦', '锋利感'],
    series: '隐藏·噩梦',
    popularity: 90,
    is_hot: true,
    is_hidden: true
  },
  {
    id: 'nightmare_dimo',
    title: '噩梦迪莫',
    form: '噩梦形态',
    number: 'NO.H12',
    types: ['恶', '光'],
    category: '隐藏系列精灵',
    distribution: '暮光荒境',
    wiki_summary: '把守护转化为强势控制，更偏向极端策略。',
    quiz_pitch: '你像噩梦迪莫，克制外表下是高压掌控力。',
    image_ref: 'dimo',
    page: 'https://wiki.biligame.com/rocom/',
    weights: { light: 46, free: 58, brain: 94, fire: 92 },
    tags: ['隐藏', '噩梦', '控制型'],
    series: '隐藏·噩梦',
    popularity: 93,
    is_hot: true,
    is_hidden: true
  },
  {
    id: 'nightmare_miaomiao',
    title: '噩梦喵喵',
    form: '噩梦形态',
    number: 'NO.H13',
    types: ['恶', '草'],
    category: '隐藏系列精灵',
    distribution: '影叶密林',
    wiki_summary: '温柔外层被锋利策略替代，反差极大。',
    quiz_pitch: '你像噩梦喵喵，表面平静，实则判断极快。',
    image_ref: 'miaomiao',
    page: 'https://wiki.biligame.com/rocom/',
    weights: { light: 44, free: 70, brain: 92, fire: 83 },
    tags: ['隐藏', '噩梦', '反差感'],
    series: '隐藏·噩梦',
    popularity: 88,
    is_hidden: true
  },
  {
    id: 'nightmare_qilihua',
    title: '噩梦奇丽花',
    form: '噩梦形态',
    number: 'NO.H14',
    types: ['恶', '草'],
    category: '隐藏系列精灵',
    distribution: '夜香花圃',
    wiki_summary: '魅惑感和支配感并存，属于心理压制型。',
    quiz_pitch: '你像噩梦奇丽花，细腻且有攻击性。',
    image_ref: 'qilihua',
    page: 'https://wiki.biligame.com/rocom/',
    weights: { light: 39, free: 67, brain: 90, fire: 86 },
    tags: ['隐藏', '噩梦', '魅惑感'],
    series: '隐藏·噩梦',
    popularity: 85,
    is_hidden: true
  },
  {
    id: 'abyss_yajiji',
    title: '深渊鸭吉吉',
    form: '深渊形态',
    number: 'NO.H21',
    types: ['恶', '普通'],
    category: '隐藏系列精灵',
    distribution: '深潮港',
    wiki_summary: '高自由高攻击，喜欢打破规则。',
    quiz_pitch: '你像深渊鸭吉吉，玩得开，也很难被定义。',
    image_ref: 'yajiji',
    page: 'https://wiki.biligame.com/rocom/',
    weights: { light: 28, free: 96, brain: 68, fire: 88 },
    tags: ['隐藏', '深渊', '叛逆感'],
    series: '隐藏·深渊',
    popularity: 86,
    is_hidden: true
  },
  {
    id: 'abyss_xuanyechong',
    title: '深渊旋叶虫',
    form: '深渊形态',
    number: 'NO.H22',
    types: ['虫', '恶'],
    category: '隐藏系列精灵',
    distribution: '逆风林带',
    wiki_summary: '隐匿性与爆发并重，偏向潜伏反击。',
    quiz_pitch: '你像深渊旋叶虫，耐心布局，抓机会一击制胜。',
    image_ref: 'xuanyechong',
    page: 'https://wiki.biligame.com/rocom/',
    weights: { light: 33, free: 88, brain: 80, fire: 77 },
    tags: ['隐藏', '深渊', '潜伏流'],
    series: '隐藏·深渊',
    popularity: 82,
    is_hidden: true
  },
  {
    id: 'abyss_liduxiaoluo',
    title: '深渊厉毒小萝',
    form: '深渊形态',
    number: 'NO.H23',
    types: ['毒', '恶'],
    category: '隐藏系列精灵',
    distribution: '毒雾裂谷',
    wiki_summary: '防御和进攻都很尖锐，压迫感非常足。',
    quiz_pitch: '你像深渊厉毒小萝，风格硬核，边界极清晰。',
    image_ref: 'liduxiaoluo',
    page: 'https://wiki.biligame.com/rocom/',
    weights: { light: 26, free: 63, brain: 95, fire: 96 },
    tags: ['隐藏', '深渊', '硬核'],
    series: '隐藏·深渊',
    popularity: 87,
    is_hot: true,
    is_hidden: true
  },
  {
    id: 'yunhai_miaomiao',
    title: '云海喵喵',
    form: '联动形态',
    number: 'NO.E01',
    types: ['草', '翼'],
    category: '扩展系列精灵',
    distribution: '云海阶地',
    wiki_summary: '轻盈和治愈并存，偏向温柔社交。',
    quiz_pitch: '你像云海喵喵，情绪价值很高。',
    image_ref: 'miaomiao',
    page: 'https://wiki.biligame.com/rocom/',
    weights: { light: 82, free: 74, brain: 70, fire: 52 },
    tags: ['扩展', '治愈'],
    series: '扩展',
    popularity: 79
  },
  {
    id: 'jidian_emoding',
    title: '极电恶魔叮',
    form: '联动形态',
    number: 'NO.E02',
    types: ['恶', '电'],
    category: '扩展系列精灵',
    distribution: '极电带',
    wiki_summary: '机动性和破坏节奏都很强。',
    quiz_pitch: '你像极电恶魔叮，快、准、狠。',
    image_ref: 'emoding',
    page: 'https://wiki.biligame.com/rocom/',
    weights: { light: 42, free: 87, brain: 91, fire: 84 },
    tags: ['扩展', '高压型'],
    series: '扩展',
    popularity: 81,
    is_hot: true
  },
  {
    id: 'chenxi_qilihua',
    title: '晨曦奇丽花',
    form: '联动形态',
    number: 'NO.E03',
    types: ['草', '光'],
    category: '扩展系列精灵',
    distribution: '晨曦山',
    wiki_summary: '审美和氛围强，擅长软表达。',
    quiz_pitch: '你像晨曦奇丽花，舒服、细腻、耐看。',
    image_ref: 'qilihua',
    page: 'https://wiki.biligame.com/rocom/',
    weights: { light: 89, free: 68, brain: 75, fire: 56 },
    tags: ['扩展', '氛围感'],
    series: '扩展',
    popularity: 80
  },
  {
    id: 'xingsu_dongyuque',
    title: '星穗冬羽雀',
    form: '联动形态',
    number: 'NO.E04',
    types: ['翼', '光'],
    category: '扩展系列精灵',
    distribution: '聆风镇',
    wiki_summary: '极简表达，高自律，不争抢。',
    quiz_pitch: '你像星穗冬羽雀，安静但很有主心骨。',
    image_ref: 'dongyuque',
    page: 'https://wiki.biligame.com/rocom/',
    weights: { light: 86, free: 44, brain: 84, fire: 50 },
    tags: ['扩展', '高自律'],
    series: '扩展',
    popularity: 77
  },
  {
    id: 'yanmeng_dimo',
    title: '焰梦迪莫',
    form: '联动形态',
    number: 'NO.E05',
    types: ['光', '火'],
    category: '扩展系列精灵',
    distribution: '王都中心区',
    wiki_summary: '守护底色下加入更强行动力。',
    quiz_pitch: '你像焰梦迪莫，温柔但推进力很强。',
    image_ref: 'dimo',
    page: 'https://wiki.biligame.com/rocom/',
    weights: { light: 90, free: 60, brain: 72, fire: 78 },
    tags: ['扩展', '主角感'],
    series: '扩展',
    popularity: 83,
    is_hot: true
  },
  {
    id: 'qinglin_xuanyechong',
    title: '青鳞旋叶虫',
    form: '联动形态',
    number: 'NO.E06',
    types: ['虫', '草'],
    category: '扩展系列精灵',
    distribution: '轻风山',
    wiki_summary: '隐忍和执行并行，擅长长期项目。',
    quiz_pitch: '你像青鳞旋叶虫，慢热但后劲十足。',
    image_ref: 'xuanyechong',
    page: 'https://wiki.biligame.com/rocom/',
    weights: { light: 68, free: 52, brain: 80, fire: 76 },
    tags: ['扩展', '长期主义'],
    series: '扩展',
    popularity: 76
  },
  {
    id: 'duwu_liduxiaoluo',
    title: '毒雾小萝',
    form: '联动形态',
    number: 'NO.E07',
    types: ['毒'],
    category: '扩展系列精灵',
    distribution: '旧飞艇航道',
    wiki_summary: '细节控，风格冷冽，辨识度很高。',
    quiz_pitch: '你像毒雾小萝，表达直接，不跟风。',
    image_ref: 'liduxiaoluo',
    page: 'https://wiki.biligame.com/rocom/',
    weights: { light: 50, free: 62, brain: 91, fire: 88 },
    tags: ['扩展', '风格派'],
    series: '扩展',
    popularity: 78
  }
];

const state = {
  spirits: [],
  index: 0,
  result: null,
  ranking: [],
  answers: [],
  resultStats: {},
  totalTests: 1684232,
  galleryFilter: 'all',
  scores: { light: 50, free: 50, brain: 50, fire: 50 }
};

const els = {};
const REMOTE_RANKING = {
  statsUrl: window.__RANKING_STATS_URL__ || '',
  hitUrl: window.__RANKING_HIT_URL__ || '',
  token: window.__RANKING_TOKEN__ || ''
};

function hasRemoteRanking() {
  return Boolean(REMOTE_RANKING.statsUrl && REMOTE_RANKING.hitUrl);
}

async function remoteFetchJson(url, options = {}) {
  const headers = { 'Content-Type': 'application/json', ...(options.headers || {}) };
  if (REMOTE_RANKING.token) headers.Authorization = `Bearer ${REMOTE_RANKING.token}`;
  const res = await fetch(url, { ...options, headers });
  if (!res.ok) throw new Error(`remote ranking error: ${res.status}`);
  return await res.json();
}

function clamp(n) {
  return Math.max(0, Math.min(100, n));
}

function distance(a, b) {
  return Math.sqrt(
    Math.pow(a.light - b.light, 2) +
      Math.pow(a.free - b.free, 2) +
      Math.pow(a.brain - b.brain, 2) +
      Math.pow(a.fire - b.fire, 2)
  );
}

function safeText(str) {
  return (str || '').replace(/[<>]/g, '');
}

function statTemplate(label, value) {
  return `
    <div class="stat-box">
      <small>${label} ${value}</small>
      <div class="bar"><span style="width:${value}%"></span></div>
    </div>
  `;
}

function makeTypeCode(scores) {
  return [
    scores.light >= 58 ? 'L' : 'l',
    scores.free >= 58 ? 'F' : 'f',
    scores.brain >= 58 ? 'B' : 'b',
    scores.fire >= 58 ? 'R' : 'r'
  ].join('');
}

function makeSeriesCode(series) {
  if (series.includes('噩梦')) return 'NIGHTMARE';
  if (series.includes('圣域')) return 'SACRED';
  if (series.includes('深渊')) return 'ABYSS';
  if (series.includes('主流')) return 'MAINSTREAM';
  return 'EXPANDED';
}

function normalizeSpirit(spirit) {
  return {
    ...spirit,
    popularity: Number(spirit.popularity || 70),
    is_hot: Boolean(spirit.is_hot),
    is_hidden: Boolean(spirit.is_hidden),
    series: spirit.series || '主流',
    image: spirit.image || ''
  };
}

function expandSpiritLibrary(baseSpirits) {
  const base = baseSpirits.map(item => {
    const normalized = normalizeSpirit({
      ...item,
      series: item.series || '主流',
      popularity: item.popularity || 82,
      is_hot: item.is_hot !== undefined ? item.is_hot : true
    });
    return normalized;
  });

  const baseById = Object.fromEntries(base.map(item => [item.id, item]));

  const expanded = EXTENDED_SPIRITS.map(item => {
    const ref = baseById[item.image_ref];
    return normalizeSpirit({
      ...item,
      image: ref?.image || ''
    });
  });

  const merged = [...base, ...expanded];
  const dedup = new Map();
  for (const item of merged) dedup.set(item.id, item);
  return [...dedup.values()];
}

function recomputeScoresFromAnswers() {
  const next = { light: 50, free: 50, brain: 50, fire: 50 };
  state.answers.forEach((ansIdx, qIdx) => {
    if (ansIdx === undefined || ansIdx === null) return;
    const option = questions[qIdx]?.options?.[ansIdx];
    if (!option) return;
    Object.keys(option.delta).forEach(key => {
      next[key] = clamp(next[key] + option.delta[key] * 4);
    });
  });
  state.scores = next;
}

function renderQuestion() {
  els.resultWrap.classList.remove('show');
  const q = questions[state.index];
  const doneCount = state.answers.filter(v => v !== undefined && v !== null).length;
  els.progressBar.style.width = `${(doneCount / questions.length) * 100}%`;
  els.quizMount.innerHTML = `
    <div class="q-badge">第 ${state.index + 1} 题</div>
    <h3 class="question-title">${q.title}</h3>
    <div class="option-list question-anim">
      ${q.options.map((opt, idx) => `
        <div class="option ${state.answers[state.index] === idx ? 'is-selected' : ''}" data-choice="${idx}">
          <strong><span class="label-dot">${String.fromCharCode(65 + idx)}</span>${opt.text}</strong>
          <p>${opt.desc}</p>
        </div>
      `).join('')}
    </div>
    <div class="question-foot">
      <button class="btn ghost ${state.index === 0 ? 'is-disabled' : ''}" id="prevQuestionBtn" ${state.index === 0 ? 'disabled' : ''}>上一题</button>
      <div class="q-progress-text">${doneCount}/${questions.length} 已完成</div>
    </div>
  `;

  els.quizMount.querySelectorAll('.option').forEach(node => {
    node.addEventListener('click', () => applyChoice(Number(node.dataset.choice)));
  });
  const prevBtn = document.getElementById('prevQuestionBtn');
  if (prevBtn) {
    prevBtn.addEventListener('click', () => goPrevQuestion());
  }
}

function goPrevQuestion() {
  if (state.index <= 0) return;
  state.index -= 1;
  renderQuestion();
}

function gotoNextUnansweredOrResult() {
  const nextUnanswered = state.answers.findIndex(v => v === undefined || v === null);
  if (nextUnanswered === -1) {
    els.progressBar.style.width = '100%';
    computeResult();
    return;
  }
  state.index = Math.min(nextUnanswered, questions.length - 1);
  renderQuestion();
}

function applyChoice(choice) {
  state.answers[state.index] = choice;
  recomputeScoresFromAnswers();
  if (state.index < questions.length - 1) {
    state.index += 1;
    renderQuestion();
  } else {
    gotoNextUnansweredOrResult();
  }
}

function detectHiddenSeries() {
  const s = state.scores;
  if (s.fire >= 86 && s.brain >= 82) return '隐藏·噩梦';
  if (s.light >= 88 && s.brain >= 80 && s.free <= 56) return '隐藏·圣域';
  if (s.free >= 88 && s.light <= 46) return '隐藏·深渊';
  return '';
}

function computeSpiritScore(spirit, target, hiddenSeries) {
  const d = distance(target, spirit.weights);
  const popularityBoost = spirit.popularity * 0.14 + (spirit.is_hot ? 5.5 : 0);
  const hiddenPenalty = !hiddenSeries && spirit.is_hidden ? 10 : 0;
  return d - popularityBoost + hiddenPenalty;
}

function computeResult() {
  const hiddenSeries = detectHiddenSeries();
  const pool = hiddenSeries ? state.spirits.filter(s => s.series === hiddenSeries) : state.spirits;
  const activePool = pool.length ? pool : state.spirits;

  const ranking = activePool
    .map(spirit => ({
      spirit,
      score: computeSpiritScore(spirit, state.scores, hiddenSeries),
      rawDistance: distance(state.scores, spirit.weights)
    }))
    .sort((a, b) => a.score - b.score);

  state.ranking = ranking;
  state.result = ranking[0].spirit;
  showResult(ranking[0], ranking.slice(1, 4));
}

function buildResultHash(spirit) {
  return `#result=${encodeURIComponent(spirit.id)}`;
}

function buildShareLink(spirit) {
  const base = `${window.location.origin}${window.location.pathname}`;
  return `${base}${buildResultHash(spirit)}`;
}

function buildPlayfulNarrative(spirit) {
  const entries = [
    { k: 'light', label: '守护', text: '你是队里让人放心的那一位。' },
    { k: 'free', label: '灵动', text: '你有很强的临场感，擅长把气氛带起来。' },
    { k: 'brain', label: '谋略', text: '你总能找到更聪明的走法。' },
    { k: 'fire', label: '爆发', text: '关键时刻你敢顶上去，执行力很强。' }
  ];
  const sorted = [...entries].sort((a, b) => state.scores[b.k] - state.scores[a.k]);
  const a = sorted[0];
  const b = sorted[1];
  return {
    pitch: `你像${spirit.title}。主属性偏${a.label}+${b.label}，${a.text}`,
    summary: `${spirit.wiki_summary} 在生活里，这类人格通常“想得清、动得快”，既有主见也有温度。`
  };
}

function buildShareText(spirit, confidence) {
  const code = makeTypeCode(state.scores);
  return `我测出来是【${spirit.title}】（${code}）匹配度 ${confidence}%\n${buildShareLink(spirit)}`;
}

async function loadResultStats() {
  try {
    if (hasRemoteRanking()) {
      const remote = await remoteFetchJson(REMOTE_RANKING.statsUrl, { method: 'GET' });
      state.resultStats = remote.resultStats || {};
      if (Number(remote.totalTests) > 0) state.totalTests = Number(remote.totalTests);
      return;
    }
    const raw = localStorage.getItem('roco_result_stats_v1');
    if (raw) state.resultStats = JSON.parse(raw);
    const total = Number(localStorage.getItem('roco_total_tests_v1') || 0);
    if (total > 0) state.totalTests = total;
  } catch (err) {
    console.warn(err);
  }
}

function saveResultStats() {
  try {
    localStorage.setItem('roco_result_stats_v1', JSON.stringify(state.resultStats));
    localStorage.setItem('roco_total_tests_v1', String(state.totalTests));
  } catch (err) {
    console.warn(err);
  }
}

async function updateResultStats(spiritId) {
  state.resultStats[spiritId] = (state.resultStats[spiritId] || 0) + 1;
  state.totalTests += 1;
  saveResultStats();
  if (hasRemoteRanking()) {
    try {
      const remote = await remoteFetchJson(REMOTE_RANKING.hitUrl, {
        method: 'POST',
        body: JSON.stringify({ spiritId })
      });
      if (remote.resultStats) state.resultStats = remote.resultStats;
      if (Number(remote.totalTests) > 0) state.totalTests = Number(remote.totalTests);
      saveResultStats();
    } catch (err) {
      console.warn('remote ranking sync failed, fallback local only:', err);
    }
  }
}

function formatNumber(n) {
  return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function getRankRows(limit = 8) {
  const rows = state.spirits.map(spirit => ({
    spirit,
    count: state.resultStats[spirit.id] || 0
  }));
  rows.sort((a, b) => b.count - a.count || b.spirit.popularity - a.spirit.popularity);
  return rows.slice(0, limit);
}

function renderPopularityRanking() {
  if (!els.rankMount) return;
  const rows = getRankRows(8);
  const base = Math.max(state.totalTests || 0, 1);

  els.totalTestCount.textContent = `${formatNumber(state.totalTests)} 人已测`;
  els.rankMount.innerHTML = rows
    .map((row, idx) => {
      const pct = row.count > 0 ? (row.count / base) * 100 : 0;
      const showPct = pct.toFixed(1);
      const barWidth = Math.max(0.5, pct).toFixed(1);
      return `
        <article class="rank-item">
          <div class="rank-left">
            <div class="rank-no">${idx + 1}</div>
            <img class="rank-avatar" src="${safeText(row.spirit.image)}" alt="${safeText(row.spirit.title)}" />
            <div>
              <h4>${safeText(row.spirit.title)}</h4>
              <p>${safeText(row.spirit.quiz_pitch)}</p>
            </div>
          </div>
          <div class="rank-right">${showPct}%</div>
          <div class="rank-bar"><span style="width:${barWidth}%"></span></div>
        </article>
      `;
    })
    .join('');
}

function renderSimilar(similarRows) {
  if (!similarRows.length) {
    els.similarMount.innerHTML = '';
    return;
  }
  const chips = similarRows
    .map(row => `${row.spirit.title}（${Math.round(clamp(100 - row.rawDistance * 1.6))}%）`)
    .join(' · ');
  els.similarMount.innerHTML = `<strong>相近结果：</strong>${chips}`;
}

function showResult(topRow, similarRows) {
  const spirit = topRow.spirit;
  const matchScore = clamp(Math.round(100 - topRow.rawDistance * 1.35 + spirit.popularity * 0.08));
  const typeCode = makeTypeCode(state.scores);

  state.result = spirit;
  updateResultStats(spirit.id).then(() => {
    renderPopularityRanking();
  });
  renderPopularityRanking();
  els.resultWrap.classList.add('show');
  els.quizMount.innerHTML = '';
  els.resultCode.textContent = `${typeCode} · ${makeSeriesCode(spirit.series)}`;
  els.resultSeries.textContent = spirit.series;
  els.resultName.textContent = spirit.title;
  const narrative = buildPlayfulNarrative(spirit);
  els.resultPitch.textContent = narrative.pitch;
  els.resultSummary.textContent = narrative.summary;
  els.resultTypes.innerHTML = spirit.types.map(type => `<span class="type-chip">${safeText(type)}</span>`).join('');
  els.resultTags.innerHTML = spirit.tags.map(tag => `<span class="tag">${safeText(tag)}</span>`).join('');
  if (els.resultConfidence) els.resultConfidence.textContent = `匹配度：${matchScore}%`;

  els.resultInfo.innerHTML = `
    <div class="info-item"><strong>图鉴编号</strong><span>${safeText(spirit.number)}</span></div>
    <div class="info-item"><strong>形态</strong><span>${safeText(spirit.form)}</span></div>
    <div class="info-item"><strong>分布</strong><span>${safeText(spirit.distribution || '—')}</span></div>
    <div class="info-item"><strong>定位</strong><span>${safeText(spirit.category)}</span></div>
  `;

  els.resultStats.innerHTML = [
    statTemplate('光耀值', state.scores.light),
    statTemplate('自由值', state.scores.free),
    statTemplate('脑洞值', state.scores.brain),
    statTemplate('热血值', state.scores.fire)
  ].join('');

  els.resultArt.innerHTML = `<img src="${safeText(spirit.image)}" alt="${safeText(spirit.title)}" onerror="this.onerror=null;this.src='assets/ui/logo.svg';" />`;

  renderSimilar(similarRows);
  history.replaceState(null, '', buildResultHash(spirit));

  els.openWikiBtn.onclick = () => {
    if (spirit.page) window.open(spirit.page, '_blank', 'noopener');
  };

  if (els.shareResultBtn) {
    els.shareResultBtn.onclick = () => shareResult(spirit, matchScore);
  }

  els.resultSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function resetQuiz() {
  state.index = 0;
  state.result = null;
  state.ranking = [];
  state.answers = [];
  state.scores = { light: 50, free: 50, brain: 50, fire: 50 };
  history.replaceState(null, '', `${window.location.pathname}`);
  if (els.quizMount) renderQuestion();
}

function sortSpirits(list) {
  const sortType = els.dbSort?.value || 'hot';
  if (sortType === 'name') {
    return [...list].sort((a, b) => a.title.localeCompare(b.title, 'zh-Hans-CN'));
  }
  return [...list].sort((a, b) => {
    if (b.popularity !== a.popularity) return b.popularity - a.popularity;
    if (b.is_hot !== a.is_hot) return Number(b.is_hot) - Number(a.is_hot);
    return a.title.localeCompare(b.title, 'zh-Hans-CN');
  });
}

function applyFilterAndSearch() {
  if (!els.dbInput || !els.dbMount || !els.dbStatus) return;
  const keyword = els.dbInput.value.trim().toLowerCase();
  let list = state.spirits;

  if (state.galleryFilter === 'mainstream') {
    list = list.filter(item => item.series === '主流');
  } else if (state.galleryFilter === 'hidden') {
    list = list.filter(item => item.is_hidden);
  }

  if (keyword) {
    list = list.filter(item => {
      const haystack = [item.title, item.form, item.series, item.category, item.distribution, item.wiki_summary, ...item.types, ...item.tags]
        .join(' ')
        .toLowerCase();
      return haystack.includes(keyword);
    });
  }

  list = sortSpirits(list);
  renderGallery(list);

  const filterMap = {
    all: '全部',
    mainstream: '主流系列',
    hidden: '隐藏系列'
  };
  const keyInfo = keyword ? `，关键词“${keyword}”` : '';
  els.dbStatus.textContent = `素材状态：${filterMap[state.galleryFilter]}共 ${list.length} 条${keyInfo}。`;
}

function renderGallery(list) {
  if (!els.dbMount) return;
  if (!list.length) {
    els.dbMount.innerHTML = '<div class="empty">没有命中结果，试试换个关键词或切换筛选。</div>';
    return;
  }

  els.dbMount.innerHTML = `<div class="card-grid">${list
    .map(item => {
      return `
      <article class="spirit-card">
        <div class="spirit-media"><img src="${safeText(item.image)}" alt="${safeText(item.title)}" onerror="this.onerror=null;this.src='assets/ui/logo.svg';" /></div>
        <div class="spirit-body">
          <div class="type-row"><span class="type-chip">${safeText(item.series)}</span></div>
          <h3>${safeText(item.title)}</h3>
          <div class="type-row">${item.types.map(type => `<span class="type-chip">${safeText(type)}</span>`).join('')}</div>
          <div class="spirit-meta">${safeText(item.number)} · ${safeText(item.form)} · ${safeText(item.category)}</div>
          <p>${safeText(item.wiki_summary)}</p>
          <div class="card-actions">
            <a class="link-btn primary" href="${safeText(item.page || '#')}" target="_blank" rel="noopener noreferrer">图鉴页</a>
            <button class="link-btn" data-preview="${safeText(item.id)}">看这个结果</button>
          </div>
        </div>
      </article>
    `;
    })
    .join('')}</div>`;

  els.dbMount.querySelectorAll('[data-preview]').forEach(node => {
    node.addEventListener('click', () => {
      const spirit = state.spirits.find(s => s.id === node.dataset.preview);
      if (!spirit) return;
      if (els.resultWrap) {
        const row = {
          spirit,
          score: computeSpiritScore(spirit, state.scores, ''),
          rawDistance: distance(state.scores, spirit.weights)
        };
        showResult(row, []);
      } else {
        window.location.href = `index.html#result=${encodeURIComponent(spirit.id)}`;
      }
    });
  });
}

function createShareCardBlob(spirit, matchScore) {
  return new Promise((resolve, reject) => {
  const canvas = document.createElement('canvas');
  canvas.width = 1080;
  canvas.height = 1350;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#f7f8fb';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = '#ffffff';
  roundRect(ctx, 54, 50, 972, 1248, 28, true, false);

  ctx.fillStyle = '#4f755d';
  ctx.font = '700 28px sans-serif';
  ctx.fillText('ROCO SPIRIT MATCH RESULT', 98, 112);

  ctx.fillStyle = '#17191f';
  ctx.font = '700 56px sans-serif';
  ctx.fillText(spirit.title, 98, 184);

  ctx.font = '500 22px sans-serif';
  ctx.fillStyle = '#586079';
  ctx.fillText(`${makeTypeCode(state.scores)} · ${spirit.series} · 匹配度 ${matchScore}%`, 98, 224);

  const image = new Image();
  image.onload = () => {
    ctx.fillStyle = '#f1f4fb';
    roundRect(ctx, 98, 256, 884, 560, 22, true, false);
    drawContain(ctx, image, 130, 286, 820, 500);

    const narrative = buildPlayfulNarrative(spirit);
    ctx.fillStyle = '#2d3446';
    ctx.font = '500 30px sans-serif';
    wrapText(ctx, narrative.pitch, 98, 880, 884, 46);

    ctx.fillStyle = '#6a7186';
    ctx.font = '500 22px sans-serif';
    wrapText(ctx, narrative.summary, 98, 996, 884, 36);

    drawMetric(ctx, 98, 1146, '光耀', state.scores.light);
    drawMetric(ctx, 98, 1190, '自由', state.scores.free);
    drawMetric(ctx, 560, 1146, '脑洞', state.scores.brain);
    drawMetric(ctx, 560, 1190, '热血', state.scores.fire);

    canvas.toBlob(blob => {
      if (blob) resolve(blob);
      else reject(new Error('Failed to create share blob'));
    }, 'image/png');
  };
  image.onerror = () => {
    reject(new Error('Image load failed'));
  };
  image.src = spirit.image;
  });
}

async function shareResult(spirit, matchScore) {
  try {
    const blob = await createShareCardBlob(spirit, matchScore);
    const file = new File([blob], `${spirit.title}-人格结果卡.png`, { type: 'image/png' });
    const text = buildShareText(spirit, matchScore);

    if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
      await navigator.share({
        title: `我的精灵人格：${spirit.title}`,
        text,
        files: [file]
      });
      return;
    }

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${spirit.title}-人格结果卡.png`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1200);
    alert('已为你生成并保存结果图。');
  } catch (err) {
    console.error(err);
    alert('分享暂时失败，请稍后重试。');
  }
}

function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
  if (typeof radius === 'number') {
    radius = { tl: radius, tr: radius, br: radius, bl: radius };
  }
  ctx.beginPath();
  ctx.moveTo(x + radius.tl, y);
  ctx.lineTo(x + width - radius.tr, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
  ctx.lineTo(x + width, y + height - radius.br);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
  ctx.lineTo(x + radius.bl, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
  ctx.lineTo(x, y + radius.tl);
  ctx.quadraticCurveTo(x, y, x + radius.tl, y);
  ctx.closePath();
  if (fill) ctx.fill();
  if (stroke) ctx.stroke();
}

function drawContain(ctx, img, x, y, maxW, maxH) {
  const ratio = Math.min(maxW / img.width, maxH / img.height);
  const w = img.width * ratio;
  const h = img.height * ratio;
  const dx = x + (maxW - w) / 2;
  const dy = y + (maxH - h) / 2;
  ctx.drawImage(img, dx, dy, w, h);
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  let line = '';
  for (const ch of text) {
    const testLine = line + ch;
    const { width } = ctx.measureText(testLine);
    if (width > maxWidth && line) {
      ctx.fillText(line, x, y);
      line = ch;
      y += lineHeight;
    } else {
      line = testLine;
    }
  }
  if (line) ctx.fillText(line, x, y);
}

function drawMetric(ctx, x, y, label, value) {
  ctx.fillStyle = '#4a5268';
  ctx.font = '600 21px sans-serif';
  ctx.fillText(`${label} ${value}`, x, y);
  ctx.fillStyle = '#e9edf7';
  roundRect(ctx, x, y + 10, 340, 10, 6, true, false);
  const grad = ctx.createLinearGradient(x, 0, x + 340, 0);
  grad.addColorStop(0, '#3a64f4');
  grad.addColorStop(1, '#214bd7');
  ctx.fillStyle = grad;
  roundRect(ctx, x, y + 10, 3.4 * value, 10, 6, true, false);
}

async function loadSpiritsData() {
  try {
    const fullRes = await fetch('assets/data/spirits.full.json', { cache: 'no-store' });
    if (fullRes.ok) {
      return await fullRes.json();
    }
    const baseRes = await fetch('assets/data/spirits.json', { cache: 'no-store' });
    if (!baseRes.ok) throw new Error(`Failed to load spirits data: ${baseRes.status}`);
    return await baseRes.json();
  } catch (err) {
    if (Array.isArray(window.__SPIRITS_DATA__) && window.__SPIRITS_DATA__.length > 0) {
      console.warn('fetch spirits.json failed, fallback to bundled data:', err);
      return window.__SPIRITS_DATA__;
    }
    throw err;
  }
}

function restoreSharedResult() {
  if (!els.resultWrap) return;
  const hash = window.location.hash || '';
  const match = hash.match(/result=([^&]+)/);
  if (!match) return;
  const id = decodeURIComponent(match[1]);
  const spirit = state.spirits.find(item => item.id === id);
  if (!spirit) return;

  const row = {
    spirit,
    score: computeSpiritScore(spirit, state.scores, ''),
    rawDistance: distance(state.scores, spirit.weights)
  };
  showResult(row, []);
}

function bindEvents() {
  const startQuizBtn = document.getElementById('startQuizBtn');
  if (startQuizBtn) {
    startQuizBtn.addEventListener('click', () => {
      document.getElementById('quizSection')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  const openGalleryBtn = document.getElementById('openGalleryBtn');
  if (openGalleryBtn && openGalleryBtn.tagName === 'BUTTON') {
    openGalleryBtn.addEventListener('click', () => {
      window.location.href = 'dex.html';
    });
  }

  const restartBtn = document.getElementById('restartBtn');
  if (restartBtn) restartBtn.addEventListener('click', resetQuiz);

  const dbSearchBtn = document.getElementById('dbSearchBtn');
  if (dbSearchBtn) dbSearchBtn.addEventListener('click', applyFilterAndSearch);

  const dbResetBtn = document.getElementById('dbResetBtn');
  if (dbResetBtn && els.dbInput && els.dbSort && els.filterRow) {
    dbResetBtn.addEventListener('click', () => {
      state.galleryFilter = 'all';
      els.dbInput.value = '';
      els.dbSort.value = 'hot';
      els.filterRow.querySelectorAll('.chip').forEach(node => {
        node.classList.toggle('active', node.dataset.filter === 'all');
      });
      applyFilterAndSearch();
    });
  }

  if (els.dbInput) {
    els.dbInput.addEventListener('keydown', e => {
      if (e.key === 'Enter') applyFilterAndSearch();
    });
  }

  if (els.dbSort) els.dbSort.addEventListener('change', applyFilterAndSearch);

  if (els.filterRow) {
    els.filterRow.querySelectorAll('.chip').forEach(node => {
      node.addEventListener('click', () => {
        state.galleryFilter = node.dataset.filter;
        els.filterRow.querySelectorAll('.chip').forEach(n => n.classList.remove('active'));
        node.classList.add('active');
        applyFilterAndSearch();
      });
    });
  }
}

async function init() {
  const rawSpirits = await loadSpiritsData();
  state.spirits = expandSpiritLibrary(rawSpirits).filter(item => Boolean(item.image));

  Object.assign(els, {
    progressBar: document.getElementById('progressBar'),
    quizMount: document.getElementById('quizMount'),
    resultWrap: document.getElementById('resultWrap'),
    resultSection: document.getElementById('quizSection'),
    resultArt: document.getElementById('resultArt'),
    resultCode: document.getElementById('resultCode'),
    resultSeries: document.getElementById('resultSeries'),
    resultName: document.getElementById('resultName'),
    resultPitch: document.getElementById('resultPitch'),
    resultSummary: document.getElementById('resultSummary'),
    resultInfo: document.getElementById('resultInfo'),
    resultTypes: document.getElementById('resultTypes'),
    resultTags: document.getElementById('resultTags'),
    resultConfidence: document.getElementById('resultConfidence'),
    resultStats: document.getElementById('resultStats'),
    similarMount: document.getElementById('similarMount'),
    openWikiBtn: document.getElementById('openWikiBtn'),
    shareResultBtn: document.getElementById('shareResultBtn'),
    rankMount: document.getElementById('rankMount'),
    totalTestCount: document.getElementById('totalTestCount'),
    dbMount: document.getElementById('dbMount'),
    dbStatus: document.getElementById('dbStatus'),
    dbInput: document.getElementById('dbInput'),
    dbSort: document.getElementById('dbSort'),
    filterRow: document.getElementById('filterRow'),
    libraryCount: document.getElementById('libraryCount')
  });

  if (els.libraryCount) {
    els.libraryCount.textContent = String(state.spirits.length);
  }

  await loadResultStats();
  bindEvents();
  if (els.quizMount && els.progressBar) {
    renderQuestion();
    restoreSharedResult();
    renderPopularityRanking();
  }
  if (els.dbMount) {
    applyFilterAndSearch();
  }
}

init().catch(err => {
  console.error(err);
  const isFileProtocol = window.location.protocol === 'file:';
  const hint = isFileProtocol
    ? '当前浏览器可能限制 file:// 读取。请换浏览器，或用本地服务器打开（python3 -m http.server）。'
    : '本地素材加载失败，请确认项目文件完整。';
  document.body.innerHTML = `<main class="page"><section class="panel"><h2>加载失败</h2><p class="panel-sub">${hint}</p></section></main>`;
});
