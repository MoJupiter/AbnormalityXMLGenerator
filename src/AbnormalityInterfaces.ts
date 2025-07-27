export interface AbnName{
  en: string;
  ja: string;
}
export interface AbnoXMLs{
    stat: string;
    creature: string;
    gen: string;
    info: string;
}

  const Adjective = ([{en:'Laugh', ja:'笑う死体の'}, {en:'NothingThere', ja:'何もない'}, {en:'Silent', ja:'静かな'}, {en:'Blue', ja:'青い'}, {en:'Melting', ja:'溶ける'}]);
  const Alphabet = (['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']);
  const Name = ([{en:'Mountain', ja:'山'}, {en:'', ja:''}, {en:'Ster', ja:'星'}, {en:'Orch', ja:'オーケストラ'}, {en:'Love', ja:'愛'}]);
  const Condition = ([{en:'作業結果が良い場合', ja:'作業結果が良い場合'}, {en:'作業結果が普通の場合', ja:'作業結果が普通の場合'}, {en:'作業結果が悪い、または普通の場合', ja:'作業結果が悪い、または普通の場合'}, {en:'職員がどこかで死んだとき', ja:'職員がどこかで死んだとき'}]);
  const Happen = ([{en:'クリフォトカウンターが1減る。', ja:'クリフォトカウンターが1減る。'}, {en:'クリフォトカウンターが1増える。', ja:'クリフォトカウンターが1増える。'}]);
  const Desk = ([{en:'Mountain', ja:'山'}, {en:'Ster', ja:'星'}, {en:'Orch', ja:'オーケストラ'}, {en:'Love', ja:'愛'}]);
  const RiskLevel = (['ZAYIN', 'TETH', 'HE', 'WAW', 'ALEPH']);


export interface Information {
    openLevel: number;
    data: string;
}
export interface AbnormalityBasicInformation {
    //��{���
    id: number;
    name_en: string;
    name_ja: string;

    codeNo: Information[];
    name: Information[];
    portrait: Information[];
    riskLevel: LiskLevel[];
    openText: Information[];
    desc: Information[];
    specialTips: SpecialTips[];
}
export interface AbnormalitySkillInformation {
    //��Ə��
    workProb: WorkProb;

    narration_start: string;
    narration_move: string;
    narration: Information[];

    qliphoth: number;

    feelingStateCubeBounds: FeelingStateCubeBounds;

    workSpeed: number;
    workDamage: Damage;

    workCooltime: number;
    observeBonus: ObserveBonus[];

    armor: Equipment;
    weapon: Equipment;
    gift: Gift;
}
export interface AbnormalityEscapeInformation {
    //�E�����
    escapable: boolean;

    defense: Defence;
    specialDamage: Damage[];
    HP: number;
    speed: number;

    animPrefab: string;
}
export interface Abnormality {
    basicInfo: AbnormalityBasicInformation;
    skillInfo: AbnormalitySkillInformation;
    escapeInfo: AbnormalityEscapeInformation;
}
export const RWBP =['R', 'W', 'B', 'P'];
export interface ObserveBonus {
    type: string;
    data: number;
    level: number;
}
export const ObserveBonusType = ['prob','speed']
export interface Damage {
    type: string;
    min: number;
    max: number;
}
export interface Equipment {
    id: number;
    level: number;
    cost: number;
}
export interface Gift {
    id: number;
    level: number;
    prob: number;
}
export interface SpecialTips {
    openLevel: number;
    data: string;
    cost: number;
}
export interface FeelingStateCubeBounds {
    bad: number;
    norm: number;
    good: number;
}
export interface Information {
    openLevel: number;
    data: string;
}
export interface LiskLevel {
    openLevel: number;
    data: string;
    level: number;
}
export interface WorkProb {
    openCost: number;
    Level1: RWBPInfomation;
    Level2: RWBPInfomation;
    Level3: RWBPInfomation;
    Level4: RWBPInfomation;
    Level5: RWBPInfomation;
}
export interface Defence {
    data: RWBPInfomation;
    cost: number;
}
export interface RWBPInfomation {
    R: number;
    W: number;
    B: number;
    P: number;
}

// ヘルパー関数: Information[] の初期値
const initialInformation: Information = { openLevel: 1, data: '' };
const initialInformationArray: Information[] = [structuredClone(initialInformation)];

// ヘルパー関数: LiskLevel[] の初期値
const initialLiskLevel: LiskLevel = { openLevel: 1, data: '', level: 1 };
const initialLiskLevelArray: LiskLevel[] = [structuredClone(initialLiskLevel)];

// ヘルパー関数: RWBPInfomation の初期値
const initialRWBPInformation: RWBPInfomation = { R: Math.floor(Math.random()*10)/10, W: Math.floor(Math.random()*10)/10, B: Math.floor(Math.random()*10)/10, P: Math.floor(Math.random()*10)/10};

// ヘルパー関数: Damage の初期値
const initialDamage: Damage = { type: 'R', min: 1, max: 1 };
const IDGen = () => {
  return `${Math.floor(Math.random()*9)+1}${Math.floor(Math.random()*9)+1}${Math.floor(Math.random()*9)+1}${Math.floor(Math.random()*9)+1}${Math.floor(Math.random()*9)+1}${Math.floor(Math.random()*9)+1}`;
}
// Abnormality の初期状態
export const initialAbnormality = () => {
  let adjective_index = Math.floor(Math.random()*(Adjective.length));
  let name_index = Math.floor(Math.random()*(Adjective.length));
  let risk_level = Math.floor(Math.random()*(RiskLevel.length));
  let max_cube = Math.floor((Math.random()+2)*3);
  return {
    basicInfo: {
      id: parseInt(IDGen()),
      name_en: Adjective[adjective_index].en + Name[name_index].en,
      name_ja: Adjective[adjective_index].ja + Name[name_index].ja,
      codeNo: [structuredClone({openLevel: Math.floor(Math.random()*2+1), data: `${(Alphabet[Math.floor(Math.random()*Alphabet.length)])}${Math.floor(Math.random()*9)}${Math.floor(Math.random()*9)}-${Math.floor(Math.random()*9)}${Math.floor(Math.random()*9)}${Math.floor(Math.random()*9)}-${Math.floor(Math.random()*9)}${Math.floor(Math.random()*9)}`})],
      name: [structuredClone({openLevel: Math.floor(Math.random()*2+1), data:Adjective[adjective_index].ja + Name[name_index].ja})],
      portrait: [structuredClone({openLevel: Math.floor(Math.random()*2+1), data:''})],
      riskLevel: [structuredClone({openLevel: 4, data: RiskLevel[risk_level], level: risk_level+1})],
      openText: [structuredClone({openLevel: 1, data:''})],
      specialTips: [structuredClone({openLevel: 1, cost:Math.floor((Math.random()+1)*3), data:`${Condition[Math.floor(Math.random()*Condition.length)].ja}${Happen[Math.floor(Math.random()*Happen.length)].ja}`})],
      desc: [structuredClone({openLevel: 1, data:`${Desk[Math.floor(Math.random()*Desk.length)].ja}`})],
    },
    skillInfo: {
      workProb: {
        openCost: Math.floor((Math.random()+1)*3),
        Level1: structuredClone(initialRWBPInformation),
        Level2: structuredClone(initialRWBPInformation),
        Level3: structuredClone(initialRWBPInformation),
        Level4: structuredClone(initialRWBPInformation),
        Level5: structuredClone(initialRWBPInformation),
      },
      narration_start: '作業を始める。',
      narration_move: '作業部屋に入る。',
      narration: [structuredClone({openLevel: 1, data:`ナレーション1`})],
      qliphoth: Math.floor((Math.random()+0.3)*3),
      feelingStateCubeBounds: { bad: max_cube*1, norm: max_cube*2, good: max_cube*3 },
      workSpeed: Math.floor((Math.random())*20)/10,
      workDamage: structuredClone({type: RWBP[Math.floor(Math.random()*4)], min:Math.floor(Math.random()*10), max:Math.floor(Math.random()*10)}),
      workCooltime: Math.floor((Math.random()+1)*3),
      observeBonus: [{ type: 'prob', data: 4, level: 1 }, { type: 'prob', data: 4, level: 2 }, {  type: 'prob', data: 4, level: 3 }, { type: 'prob', data: 4, level: 4 }],
      armor: { id: parseInt(IDGen()), level: 3, cost: Math.floor((Math.random()+12)*5) },
      weapon: { id: parseInt(IDGen()), level: 4, cost: Math.floor((Math.random()+12)*5) },
      gift: { id: parseInt(IDGen()), level: 3, prob: Math.floor(Math.random()*100)/100 },
    },
    escapeInfo: {
      escapable: Math.floor((Math.random()*2)) == 0 ? true:false,
      defense: { data: structuredClone(initialRWBPInformation), cost: Math.floor((Math.random()+1)*3) },
      specialDamage: [structuredClone(initialDamage)],
      HP: Math.floor(Math.random()*100)+50,
      speed: Math.floor(Math.random()*100)+50,
      animPrefab: `${Adjective[adjective_index].en}${Name[name_index].en}Anim`,
    },
  }
}