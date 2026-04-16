import { Question } from '../types';

export const questions: Question[] = [
  // A - 生活方式 (5题)
  {
    id: 1,
    dim: "A",
    text: "你的日常作息节奏是？",
    options: [
      { text: "非常规律，几点起几点睡基本固定", score: {dog:3,cat:1,rabbit:2,small:2,fish:2,bird:2} },
      { text: "大致规律，但偶尔会有波动", score: {dog:2,cat:2,rabbit:2,small:2,fish:2,bird:2} },
      { text: "不太规律，经常熬夜或作息混乱", score: {dog:0,cat:3,rabbit:1,small:1,fish:3,bird:0} },
      { text: "完全随心，随遇而安", score: {dog:0,cat:3,rabbit:1,small:1,fish:3,bird:1} }
    ]
  },
  {
    id: 2,
    dim: "A",
    text: "你的居住环境是？",
    options: [
      { text: "大户型或独栋，有院子", score: {dog:3,cat:1,rabbit:2,small:1,fish:1,bird:1} },
      { text: "普通公寓，有足够空间", score: {dog:2,cat:2,rabbit:2,small:2,fish:2,bird:2} },
      { text: "小户型，空间有限", score: {dog:0,cat:3,rabbit:1,small:3,fish:2,bird:1} },
      { text: "合租或宿舍，公共空间多", score: {dog:0,cat:2,rabbit:1,small:3,fish:2,bird:2} }
    ]
  },
  {
    id: 3,
    dim: "A",
    text: "你每天能花在宠物上的时间大约是？",
    options: [
      { text: "2小时以上，可以经常遛狗", score: {dog:3,cat:1,rabbit:1,small:1,fish:0,bird:1} },
      { text: "1小时左右，偶尔互动", score: {dog:2,cat:2,rabbit:2,small:2,fish:1,bird:2} },
      { text: "30分钟左右，主要喂食", score: {dog:1,cat:2,rabbit:2,small:3,fish:2,bird:2} },
      { text: "很少时间，比较忙", score: {dog:0,cat:2,rabbit:1,small:2,fish:3,bird:1} }
    ]
  },
  {
    id: 4,
    dim: "A",
    text: "你多久会出差或旅行一次？",
    options: [
      { text: "很少，几乎不出远门", score: {dog:3,cat:1,rabbit:2,small:1,fish:1,bird:1} },
      { text: "偶尔，但不超过一周", score: {dog:2,cat:2,rabbit:2,small:2,fish:2,bird:2} },
      { text: "经常，可能超过一周", score: {dog:0,cat:2,rabbit:1,small:2,fish:2,bird:1} },
      { text: "非常频繁，长期在外", score: {dog:0,cat:3,rabbit:1,small:3,fish:3,bird:1} }
    ]
  },
  {
    id: 5,
    dim: "A",
    text: "你对家居整洁度的要求是？",
    options: [
      { text: "非常高，不能有异味或毛发", score: {dog:0,cat:1,rabbit:2,small:2,fish:3,bird:1} },
      { text: "比较高，希望尽量整洁", score: {dog:1,cat:2,rabbit:2,small:2,fish:2,bird:2} },
      { text: "一般，脏了会打扫", score: {dog:2,cat:2,rabbit:2,small:2,fish:1,bird:2} },
      { text: "比较随意，乱一点没关系", score: {dog:3,cat:2,rabbit:1,small:1,fish:0,bird:2} }
    ]
  },
  // B - 情感需求 (4题)
  {
    id: 6,
    dim: "B",
    text: "你下班回家后最希望宠物怎么对你？",
    options: [
      { text: "热情迎接，围着我转", score: {dog:3,cat:1,rabbit:1,small:1,fish:0,bird:1} },
      { text: "安静地过来蹭一蹭", score: {dog:1,cat:3,rabbit:2,small:1,fish:1,bird:1} },
      { text: "各做各的，保持距离", score: {dog:0,cat:2,rabbit:1,small:2,fish:2,bird:1} },
      { text: "不太需要互动，各自安好", score: {dog:0,cat:2,rabbit:1,small:3,fish:3,bird:1} }
    ]
  },
  {
    id: 7,
    dim: "B",
    text: "你更喜欢什么样的陪伴方式？",
    options: [
      { text: "一起运动，遛狗跑步", score: {dog:3,cat:0,rabbit:1,small:0,fish:0,bird:1} },
      { text: "安静地待在一起，我做我的它做它的", score: {dog:1,cat:3,rabbit:2,small:2,fish:2,bird:1} },
      { text: "偶尔互动，不需要太频繁", score: {dog:1,cat:2,rabbit:2,small:3,fish:2,bird:2} },
      { text: "看着就好，不需要摸或抱", score: {dog:0,cat:1,rabbit:1,small:2,fish:3,bird:1} }
    ]
  },
  {
    id: 8,
    dim: "B",
    text: "你能接受宠物的噪音程度是？",
    options: [
      { text: "完全没问题，越热闹越好", score: {dog:2,cat:1,rabbit:1,small:1,fish:0,bird:3} },
      { text: "可以接受偶尔的叫声", score: {dog:2,cat:2,rabbit:2,small:2,fish:1,bird:2} },
      { text: "希望比较安静", score: {dog:1,cat:2,rabbit:2,small:2,fish:2,bird:1} },
      { text: "必须非常安静", score: {dog:0,cat:2,rabbit:2,small:2,fish:3,bird:0} }
    ]
  },
  {
    id: 9,
    dim: "B",
    text: "在关系中，你更像是？",
    options: [
      { text: "照顾者，习惯付出", score: {dog:3,cat:1,rabbit:2,small:1,fish:1,bird:1} },
      { text: "被照顾者，需要被关爱", score: {dog:1,cat:2,rabbit:1,small:1,fish:1,bird:1} },
      { text: "平等的伙伴关系", score: {dog:2,cat:2,rabbit:2,small:2,fish:2,bird:2} },
      { text: "需要空间，保持独立", score: {dog:0,cat:3,rabbit:1,small:2,fish:2,bird:1} }
    ]
  },
  // C - 性格特质 (4题)
  {
    id: 10,
    dim: "C",
    text: "遇到问题时，你通常的做法是？",
    options: [
      { text: "主动解决，快速行动", score: {dog:3,cat:1,rabbit:1,small:1,fish:1,bird:1} },
      { text: "先观察，再处理", score: {dog:1,cat:3,rabbit:2,small:2,fish:2,bird:2} },
      { text: "给自己时间，慢慢来", score: {dog:1,cat:2,rabbit:3,small:2,fish:2,bird:2} },
      { text: "希望别人帮忙处理", score: {dog:2,cat:1,rabbit:1,small:2,fish:1,bird:1} }
    ]
  },
  {
    id: 11,
    dim: "C",
    text: "你做决定的风格是？",
    options: [
      { text: "果断快速，不犹豫", score: {dog:3,cat:1,rabbit:1,small:1,fish:1,bird:2} },
      { text: "三思后行，考虑周全", score: {dog:1,cat:2,rabbit:2,small:2,fish:2,bird:1} },
      { text: "随缘，不强求结果", score: {dog:1,cat:3,rabbit:2,small:2,fish:2,bird:2} },
      { text: "纠结很久也下不了决定", score: {dog:0,cat:2,rabbit:2,small:3,fish:2,bird:1} }
    ]
  },
  {
    id: 12,
    dim: "C",
    text: "当事情没有按计划发展时，你会？",
    options: [
      { text: "积极调整，继续推进", score: {dog:3,cat:1,rabbit:1,small:1,fish:1,bird:1} },
      { text: "接受现实，灵活应变", score: {dog:1,cat:3,rabbit:2,small:2,fish:2,bird:2} },
      { text: "需要时间消化情绪", score: {dog:1,cat:2,rabbit:3,small:2,fish:2,bird:1} },
      { text: "容易焦虑或放弃", score: {dog:0,cat:1,rabbit:1,small:3,fish:2,bird:1} }
    ]
  },
  {
    id: 13,
    dim: "C",
    text: "你能够坚持一件事多久？",
    options: [
      { text: "很有毅力，长期坚持", score: {dog:3,cat:1,rabbit:2,small:1,fish:1,bird:1} },
      { text: "有耐心，但有时会断", score: {dog:2,cat:2,rabbit:2,small:2,fish:2,bird:2} },
      { text: "容易半途而废", score: {dog:0,cat:2,rabbit:1,small:2,fish:2,bird:1} },
      { text: "很难坚持超过一周", score: {dog:0,cat:2,rabbit:1,small:3,fish:3,bird:1} }
    ]
  },
  // D - 隐性偏好 (5题)
  {
    id: 14,
    dim: "D",
    text: "你理想中养宠物的意义是？",
    options: [
      { text: "获得无条件的陪伴和爱", score: {dog:3,cat:1,rabbit:1,small:1,fish:0,bird:1} },
      { text: "增添生活的趣味和温暖", score: {dog:1,cat:2,rabbit:2,small:2,fish:1,bird:3} },
      { text: "减压放松，看着就治愈", score: {dog:1,cat:2,rabbit:1,small:2,fish:3,bird:1} },
      { text: "不想负责任，随便看看就好", score: {dog:0,cat:2,rabbit:1,small:3,fish:2,bird:1} }
    ]
  },
  {
    id: 15,
    dim: "D",
    text: "你最向往和宠物一起的瞬间是？",
    options: [
      { text: "一起在户外奔跑玩耍", score: {dog:3,cat:0,rabbit:1,small:0,fish:0,bird:1} },
      { text: "一起窝在沙发上看剧", score: {dog:1,cat:3,rabbit:2,small:1,fish:1,bird:1} },
      { text: "静静看着它们吃东西", score: {dog:1,cat:2,rabbit:2,small:3,fish:2,bird:1} },
      { text: "在缸前发呆放空", score: {dog:0,cat:1,rabbit:1,small:1,fish:3,bird:1} }
    ]
  },
  {
    id: 16,
    dim: "D",
    text: "你更看重宠物的什么特质？",
    options: [
      { text: "忠诚和依赖", score: {dog:3,cat:1,rabbit:1,small:1,fish:0,bird:1} },
      { text: "独立和神秘感", score: {dog:0,cat:3,rabbit:1,small:1,fish:1,bird:1} },
      { text: "温柔和安静", score: {dog:1,cat:2,rabbit:3,small:2,fish:2,bird:1} },
      { text: "活泼和有趣", score: {dog:1,cat:1,rabbit:1,small:1,fish:0,bird:3} }
    ]
  },
  {
    id: 17,
    dim: "D",
    text: "你更喜欢什么类型的社交场合？",
    options: [
      { text: "热闹的聚会，喜欢带宠物一起去", score: {dog:2,cat:1,rabbit:1,small:1,fish:0,bird:2} },
      { text: "小范围社交，不需要宠物参与", score: {dog:1,cat:2,rabbit:2,small:2,fish:2,bird:1} },
      { text: "线上社交为主，不怎么出门", score: {dog:0,cat:2,rabbit:1,small:2,fish:2,bird:1} },
      { text: "独处居多，享受安静", score: {dog:0,cat:3,rabbit:2,small:2,fish:3,bird:1} }
    ]
  },
  {
    id: 18,
    dim: "D",
    text: "你希望宠物能听懂你说话吗？",
    options: [
      { text: "当然希望，能互动才有意思", score: {dog:3,cat:1,rabbit:1,small:1,fish:0,bird:2} },
      { text: "无所谓，能听懂最好", score: {dog:2,cat:2,rabbit:2,small:2,fish:1,bird:2} },
      { text: "不太需要，各过各的", score: {dog:0,cat:2,rabbit:1,small:2,fish:3,bird:1} },
      { text: "完全不需要，不想被打扰", score: {dog:0,cat:1,rabbit:1,small:2,fish:2,bird:1} }
    ]
  }
];

export const PET_NAMES: Record<string, string> = {
  dog: '狗',
  cat: '猫',
  rabbit: '兔子',
  small: '小型啮齿动物',
  fish: '鱼/爬行类',
  bird: '鸟/鹦鹉'
};

export const PET_EMOJIS: Record<string, string> = {
  dog: '🐕',
  cat: '🐈',
  rabbit: '🐰',
  small: '🐹',
  fish: '🐟',
  bird: '🦜'
};
