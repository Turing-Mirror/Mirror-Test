const answer = (label, values) => ({ label, values });
const question = (id, category, prompt, options) => ({ id, category, prompt, options });

export const QUESTION_COUNT = 20;

export const questionBank = [
  question("rehearsal-01", "rehearsal", "排练突然少了一位成员，你会先做什么？", [
    answer("立刻提出替代方案，让练习继续", [3, 0, 1, 1, 1]),
    answer("先问问大家现在的状态", [0, 3, 1, 0, 0]),
    answer("把空出来的段落重新拆开练", [0, 0, 3, 0, 1]),
    answer("借机试一种没试过的编排", [1, 0, 0, 3, 0]),
  ]),
  question("rehearsal-02", "rehearsal", "你最期待乐队排练中的哪一刻？", [
    answer("第一声合奏响起来的时候", [3, 0, 1, 1, 1]),
    answer("大家慢慢放松下来聊天的时候", [0, 3, 0, 1, 0]),
    answer("一个难段终于磨顺的时候", [0, 0, 3, 0, 1]),
    answer("即兴演出突然有了新火花的时候", [1, 0, 0, 3, 0]),
  ]),
  question("rehearsal-03", "rehearsal", "计划被临时打乱时，你内心更接近？", [
    answer("没关系，先把眼前的事情推起来", [3, 0, 1, 1, 1]),
    answer("担心有人会因此难过", [0, 3, 0, 0, 1]),
    answer("想把新的流程重新排清楚", [0, 0, 3, 0, 2]),
    answer("也许这正好会发生有趣的事", [1, 0, 0, 3, 0]),
  ]),
  question("rehearsal-04", "rehearsal", "一段过门总是差半拍，你会怎么处理？", [
    answer("先定一个方向，带着大家多跑几遍", [3, 1, 1, 0, 1]),
    answer("听听每个人卡住的地方", [0, 3, 1, 0, 1]),
    answer("拆成节拍和小节逐段校准", [0, 0, 3, 0, 2]),
    answer("把它改成更适合当下状态的段落", [1, 0, 0, 3, 1]),
  ]),
  question("rehearsal-05", "rehearsal", "演出前乐器突然出故障，你会？", [
    answer("马上分工找替代方案", [3, 1, 1, 1, 1]),
    answer("先安抚最焦虑的伙伴", [0, 3, 1, 0, 1]),
    answer("检查故障点，判断最稳的修复方式", [0, 0, 3, 0, 2]),
    answer("把限制变成临场版本的一部分", [1, 0, 0, 3, 1]),
  ]),
  question("rehearsal-06", "rehearsal", "队友想把原曲改得很冒险，你会先？", [
    answer("先做一个能马上试听的版本", [2, 1, 1, 2, 0]),
    answer("确认每个人对这个改变都安心", [0, 3, 1, 1, 0]),
    answer("列出会影响的段落与排练成本", [0, 0, 3, 0, 2]),
    answer("觉得值得赌一次，先试再说", [1, 0, 0, 3, 1]),
  ]),
  question("rehearsal-07", "rehearsal", "排练室只剩半小时，你会怎么安排？", [
    answer("先抓最需要大家一起完成的部分", [3, 0, 1, 0, 2]),
    answer("让每个人说说现在最需要什么", [0, 3, 1, 0, 1]),
    answer("按优先级把时间切成明确的小段", [0, 0, 3, 0, 2]),
    answer("挑一首最想弹的歌，快速找感觉", [1, 0, 0, 3, 0]),
  ]),
  question("rehearsal-08", "rehearsal", "回听录音时发现一个小错误，你更可能？", [
    answer("立刻标出来，下一次就改", [2, 0, 2, 0, 2]),
    answer("先听完整体情绪，不急着责怪谁", [0, 3, 1, 1, 0]),
    answer("把问题精确记进排练笔记", [0, 0, 3, 0, 2]),
    answer("觉得这点不规则反而很有味道", [1, 0, 0, 3, 0]),
  ]),

  question("stage-01", "stage", "你的朋友在台前很紧张，你会？", [
    answer("直接拉着她一起上去", [3, 1, 0, 1, 1]),
    answer("安静陪在她旁边，等她准备好", [0, 3, 1, 0, 0]),
    answer("带她再过一遍最关键的部分", [0, 0, 3, 0, 1]),
    answer("讲一个离谱故事转移注意力", [1, 1, 0, 3, 0]),
  ]),
  question("stage-02", "stage", "你觉得“厉害”的演出最该有？", [
    answer("能把全场的情绪点燃", [3, 0, 1, 1, 1]),
    answer("真诚到能让人想起自己的故事", [0, 3, 1, 0, 1]),
    answer("准确、扎实、没有一处松散", [0, 0, 3, 0, 2]),
    answer("只属于这一晚的意外感", [1, 0, 0, 3, 0]),
  ]),
  question("stage-03", "stage", "演出结束后的第一件事，你想？", [
    answer("冲去和大家庆祝", [3, 2, 0, 1, 1]),
    answer("感谢每一个陪伴过的人", [0, 3, 1, 0, 1]),
    answer("复盘哪里还可以更好", [0, 0, 3, 0, 2]),
    answer("趁热去做下一件想做的事", [1, 0, 0, 3, 1]),
  ]),
  question("stage-04", "stage", "开演前五分钟有人忽然忘词，你会？", [
    answer("和她一起把核心句子先稳住", [3, 1, 1, 0, 1]),
    answer("告诉她可以互相接住，不必慌", [0, 3, 1, 0, 1]),
    answer("快速把歌词与进拍重新对一遍", [0, 0, 3, 0, 2]),
    answer("临场改成更自然的互动段", [1, 0, 0, 3, 1]),
  ]),
  question("stage-05", "stage", "台下的反应比预想安静，你会更想？", [
    answer("主动把气氛再往前推一点", [3, 0, 1, 1, 2]),
    answer("放慢一点，先和台下建立连接", [0, 3, 1, 0, 1]),
    answer("保持节奏，靠完成度把场面稳住", [0, 0, 3, 0, 2]),
    answer("临时换一种更特别的表达方式", [1, 0, 0, 3, 0]),
  ]),
  question("stage-06", "stage", "安可声突然响起来时，你希望乐队？", [
    answer("马上再给大家最热的一首", [3, 1, 0, 1, 1]),
    answer("唱一首想感谢彼此的歌", [0, 3, 1, 0, 1]),
    answer("演一首准备得最完整的版本", [0, 0, 3, 0, 2]),
    answer("即兴拼一段只属于今晚的歌", [1, 0, 0, 3, 1]),
  ]),
  question("stage-07", "stage", "现场灯光忽然失效，你的第一反应是？", [
    answer("招呼大家先把舞台继续撑起来", [3, 1, 1, 0, 2]),
    answer("确认所有人安全，也看见彼此", [0, 3, 1, 0, 1]),
    answer("按备用流程把问题定位清楚", [0, 0, 3, 0, 2]),
    answer("觉得也许能做成一段特别的黑暗演出", [1, 0, 0, 3, 0]),
  ]),
  question("stage-08", "stage", "演出后收到一条尖锐评价，你通常会？", [
    answer("筛出能立刻改的部分去行动", [3, 0, 2, 0, 2]),
    answer("先分辨它是不是也带着情绪", [0, 3, 1, 1, 0]),
    answer("认真比对细节，留下有价值的反馈", [0, 0, 3, 0, 2]),
    answer("不让它定义自己，继续找新声音", [1, 0, 0, 3, 1]),
  ]),

  question("connection-01", "connection", "你更愿意用什么方式表达喜欢？", [
    answer("很直接地说出来", [3, 1, 0, 1, 1]),
    answer("记住对方随口提过的小事", [0, 3, 1, 0, 0]),
    answer("做一件用心准备的作品", [0, 0, 3, 0, 2]),
    answer("带对方去看新的风景", [1, 0, 0, 3, 0]),
  ]),
  question("connection-02", "connection", "团队意见不同时，你往往扮演？", [
    answer("先把话题往下一步推进的人", [3, 0, 1, 0, 2]),
    answer("试着理解每个人立场的人", [0, 3, 1, 0, 1]),
    answer("把选择的利弊写清楚的人", [0, 0, 3, 0, 2]),
    answer("提出第五种可能的人", [1, 0, 0, 3, 0]),
  ]),
  question("connection-03", "connection", "你收到一条难懂的消息，会？", [
    answer("马上回一句，先打开话题", [3, 1, 0, 1, 0]),
    answer("反复读一遍，猜猜对方心情", [0, 3, 1, 0, 1]),
    answer("整理清楚想法再回复", [0, 0, 3, 0, 1]),
    answer("用一个意外的方式回应", [1, 0, 0, 3, 0]),
  ]),
  question("connection-04", "connection", "你怎样判断一段关系值得坚持？", [
    answer("彼此能一起变得更勇敢", [3, 1, 1, 0, 2]),
    answer("能坦然分享脆弱的时刻", [0, 3, 1, 0, 1]),
    answer("日复一日仍能相互信任", [0, 1, 3, 0, 2]),
    answer("相处时不必假装成别人", [1, 1, 0, 3, 0]),
  ]),
  question("connection-05", "connection", "朋友说“我没事”，但你感觉不对，你会？", [
    answer("约她出来，直接把话打开", [3, 1, 0, 0, 1]),
    answer("陪在旁边，等她想说的时候再说", [0, 3, 1, 0, 1]),
    answer("想想有没有具体的方式能帮到她", [0, 1, 3, 0, 1]),
    answer("带她去换个地方散散心", [1, 1, 0, 3, 0]),
  ]),
  question("connection-06", "connection", "和搭档对一段歌词的理解完全不同，你会？", [
    answer("先定一个共同版本，边写边调整", [3, 1, 1, 1, 1]),
    answer("问清她为什么会被那一句打动", [0, 3, 1, 0, 1]),
    answer("把两种解读拆成具体的文本方案", [0, 0, 3, 0, 2]),
    answer("索性保留两种声音，让它们并置", [1, 0, 0, 3, 1]),
  ]),
  question("connection-07", "connection", "很久没联系的朋友突然出现，你希望这次重逢？", [
    answer("马上约一个具体时间见面", [3, 1, 0, 1, 0]),
    answer("先好好听她这些年过得怎样", [0, 3, 1, 0, 1]),
    answer("准备一份能聊起共同回忆的东西", [0, 1, 3, 0, 1]),
    answer("不预设答案，看看会聊到哪里", [1, 0, 0, 3, 0]),
  ]),
  question("connection-08", "connection", "队友忘了一个重要约定，你会怎么做？", [
    answer("说明影响后一起补救", [3, 1, 1, 0, 2]),
    answer("先确认她是不是遇到了难处", [0, 3, 1, 0, 1]),
    answer("重新约好明确的提醒与分工", [0, 0, 3, 0, 2]),
    answer("把它变成一个轻松的玩笑再继续", [1, 1, 0, 3, 0]),
  ]),

  question("creative-01", "creative", "要为新歌选一个主题，你偏向？", [
    answer("让人想马上向前跑的故事", [3, 0, 1, 1, 1]),
    answer("只有熟人才懂的细小心情", [0, 3, 1, 1, 0]),
    answer("结构完整、能经得起反复听的概念", [0, 0, 3, 0, 2]),
    answer("谁都没想到过的奇怪想象", [1, 0, 0, 3, 0]),
  ]),
  question("creative-02", "creative", "如果有一个月可以练习新技能，你会？", [
    answer("约朋友一起学，互相打气", [2, 2, 0, 1, 1]),
    answer("选能让身边人开心的技能", [0, 3, 1, 1, 0]),
    answer("做学习计划，每天完成一点", [0, 0, 3, 0, 2]),
    answer("先从最想试的那个开始", [1, 0, 0, 3, 1]),
  ]),
  question("creative-03", "creative", "你会把哪种东西留到最后？", [
    answer("最能带气氛的那首歌", [3, 1, 0, 1, 1]),
    answer("写给某个人的那句话", [0, 3, 1, 0, 1]),
    answer("还需要再推敲的细节", [0, 0, 3, 0, 2]),
    answer("出发前才决定的惊喜", [1, 0, 0, 3, 0]),
  ]),
  question("creative-04", "creative", "写新歌的第一句卡住了，你会？", [
    answer("先写下最有力的那句，再往外长", [3, 0, 1, 1, 1]),
    answer("回到一个真实的回忆里找情绪", [0, 3, 1, 1, 0]),
    answer("把主题、韵脚和结构重新列出来", [0, 0, 3, 0, 2]),
    answer("先随便写十句不相干的东西", [1, 0, 0, 3, 0]),
  ]),
  question("creative-05", "creative", "要给一首歌选封面，你更在意？", [
    answer("一眼就能看出它的能量", [3, 0, 1, 1, 1]),
    answer("里面有没有只有懂的人才会发现的细节", [0, 3, 1, 1, 0]),
    answer("构图、字和色彩是不是足够完整", [0, 0, 3, 0, 2]),
    answer("它能不能让人一时说不清是什么", [1, 0, 0, 3, 0]),
  ]),
  question("creative-06", "creative", "歌曲中间要留出十秒空白，你会放？", [
    answer("一段让人忍不住接拍的节奏", [3, 0, 1, 1, 1]),
    answer("很轻的呼吸或环境声", [0, 3, 1, 1, 0]),
    answer("精确的停顿与层次变化", [0, 0, 3, 0, 2]),
    answer("一段谁也预料不到的声音", [1, 0, 0, 3, 0]),
  ]),
  question("creative-07", "creative", "听到一个奇怪的新音色时，你会？", [
    answer("马上想把它带进下一首歌", [3, 0, 1, 2, 1]),
    answer("想象它会唤起怎样的人的感受", [0, 3, 1, 1, 0]),
    answer("研究它的音域、层次和可控性", [0, 0, 3, 0, 2]),
    answer("任由它把自己带去陌生的方向", [1, 0, 0, 3, 0]),
  ]),
  question("creative-08", "creative", "作品快完成时，你最想确认？", [
    answer("它有没有足够的冲劲让人记住", [3, 0, 1, 1, 1]),
    answer("它是不是把想说的心情说清楚了", [0, 3, 1, 0, 1]),
    answer("每一个环节是不是都站得住", [0, 0, 3, 0, 2]),
    answer("它有没有留下一点无法定义的空间", [1, 0, 0, 3, 0]),
  ]),

  question("daily-01", "daily", "面对陌生人的邀约，你通常会？", [
    answer("先答应，边走边想办法", [3, 0, 0, 2, 1]),
    answer("确认所有人都舒服再决定", [0, 3, 1, 0, 1]),
    answer("先弄清楚细节与安排", [0, 0, 3, 0, 2]),
    answer("凭当下感觉选择", [1, 0, 0, 3, 0]),
  ]),
  question("daily-02", "daily", "想象你的理想周末：", [
    answer("和一群人临时出发去做点大事", [3, 1, 0, 2, 1]),
    answer("和熟悉的人慢慢待一整天", [0, 3, 1, 0, 0]),
    answer("关掉通知，专心完成一个目标", [0, 0, 3, 0, 2]),
    answer("一个人随意走到哪里算哪里", [1, 0, 0, 3, 0]),
  ]),
  question("daily-03", "daily", "你被称赞时通常会？", [
    answer("立刻把功劳分给所有人", [2, 2, 1, 0, 1]),
    answer("有点不好意思，但会记很久", [0, 3, 1, 0, 0]),
    answer("把它当成继续改进的依据", [0, 0, 3, 0, 1]),
    answer("开心地把这份状态延续下去", [2, 0, 0, 3, 0]),
  ]),
  question("daily-04", "daily", "如果只能带一件东西去排练室：", [
    answer("能让所有人一起用起来的东西", [3, 1, 1, 0, 1]),
    answer("一份写满回忆的小礼物", [0, 3, 1, 1, 0]),
    answer("自己的笔记和工具", [0, 0, 3, 0, 2]),
    answer("一件毫无计划却很有趣的东西", [1, 0, 0, 3, 0]),
  ]),
  question("daily-05", "daily", "下雨天放学后，你更想？", [
    answer("拉着朋友去做一件临时决定的事", [3, 1, 0, 2, 0]),
    answer("和一个人共撑一把伞慢慢走", [0, 3, 1, 0, 1]),
    answer("找家安静的店，把计划补完", [0, 0, 3, 0, 2]),
    answer("绕进没走过的小路看看", [1, 0, 0, 3, 0]),
  ]),
  question("daily-06", "daily", "突然多出一个完整下午，你会？", [
    answer("约人把想做的事立刻完成", [3, 1, 0, 1, 1]),
    answer("找想念的人好好聊一会儿", [0, 3, 1, 0, 1]),
    answer("处理一件拖了很久的任务", [0, 0, 3, 0, 2]),
    answer("不设路线，任由心情决定", [1, 0, 0, 3, 0]),
  ]),
  question("daily-07", "daily", "翻到旧手机相册时，你通常会？", [
    answer("想到要把这些故事重新带回现在", [3, 1, 0, 1, 1]),
    answer("认真回想当时每个人的心情", [0, 3, 1, 0, 1]),
    answer("整理成清晰的时间线或备份", [0, 0, 3, 0, 1]),
    answer("从一张照片联想到新的创作", [1, 0, 0, 3, 0]),
  ]),
  question("daily-08", "daily", "走进一条陌生街道时，你会先注意？", [
    answer("哪里最有活力，想立刻靠近", [3, 0, 1, 2, 0]),
    answer("路人的表情和这里的温度", [0, 3, 1, 1, 0]),
    answer("路线、招牌和环境的规律", [0, 0, 3, 0, 1]),
    answer("那些看似没意义却吸引人的角落", [1, 0, 0, 3, 0]),
  ]),

  question("resolve-01", "resolve", "面对很高的目标，你会先？", [
    answer("告诉大家“可以做到”，再开始", [3, 0, 1, 0, 2]),
    answer("确认伙伴是不是也想走这条路", [0, 3, 1, 0, 1]),
    answer("拆成阶段任务与时间表", [0, 0, 3, 0, 2]),
    answer("直接试一次，看看会发生什么", [1, 0, 0, 3, 1]),
  ]),
  question("resolve-02", "resolve", "你认为勇敢更像是？", [
    answer("在所有人面前先迈出第一步", [3, 0, 1, 1, 2]),
    answer("承认自己其实很在乎", [0, 3, 1, 0, 1]),
    answer("即使慢，也继续把事做好", [0, 0, 3, 0, 2]),
    answer("听从内心，不必解释太多", [1, 0, 0, 3, 1]),
  ]),
  question("resolve-03", "resolve", "现在的你，最想守住什么？", [
    answer("继续往前冲的热情", [3, 1, 0, 1, 2]),
    answer("身边人与自己的真心", [0, 3, 1, 0, 1]),
    answer("认真完成一件事的能力", [0, 0, 3, 0, 2]),
    answer("不被规定的自由和好奇", [1, 0, 0, 3, 1]),
  ]),
  question("resolve-04", "resolve", "演出中出现明显失误时，你会？", [
    answer("把注意力带回下一拍，继续往前", [3, 0, 1, 1, 2]),
    answer("先用眼神告诉伙伴“没关系”", [0, 3, 1, 0, 1]),
    answer("快速判断怎样补回结构", [0, 0, 3, 0, 2]),
    answer("顺着失误把它变成新的变化", [1, 0, 0, 3, 1]),
  ]),
  question("resolve-05", "resolve", "努力很久却没有明显回应时，你会？", [
    answer("先找一个能继续推进的小目标", [3, 0, 1, 0, 2]),
    answer("和信任的人说说自己卡在哪里", [0, 3, 1, 0, 1]),
    answer("回看方法，把问题重新拆开", [0, 0, 3, 0, 2]),
    answer("暂时换个方向寻找新的刺激", [1, 0, 0, 3, 0]),
  ]),
  question("resolve-06", "resolve", "有人误解了你的用意，你通常会？", [
    answer("直接说明真正想做的事", [3, 1, 0, 0, 2]),
    answer("先理解对方为什么会那样感受", [0, 3, 1, 0, 1]),
    answer("把事实和想法整理清楚再沟通", [0, 0, 3, 0, 2]),
    answer("不急着解释，让行动慢慢证明", [1, 0, 0, 3, 1]),
  ]),
  question("resolve-07", "resolve", "发现自己好像不再喜欢原来的目标时，你会？", [
    answer("先做一点新尝试，确认下一步", [3, 0, 1, 2, 1]),
    answer("和重要的人聊聊这份变化", [0, 3, 1, 0, 1]),
    answer("梳理是什么变了，什么还想留下", [0, 0, 3, 0, 2]),
    answer("允许自己暂时不定义任何方向", [1, 0, 0, 3, 0]),
  ]),
  question("resolve-08", "resolve", "眼前有一条更稳的路和一条更想走的路，你会？", [
    answer("选更想走的，然后想办法让它落地", [3, 0, 1, 2, 2]),
    answer("问问会被这个选择影响的人", [0, 3, 1, 0, 1]),
    answer("比较风险与成本，做出能负责的决定", [0, 0, 3, 0, 2]),
    answer("先走一小段试试自己的感受", [1, 0, 0, 3, 1]),
  ]),
];

function createSeededRandom(seed) {
  let state = Number(seed) >>> 0;

  return () => {
    state += 0x6d2b79f5;
    let value = state;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffle(items, random) {
  const shuffled = [...items];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }

  return shuffled;
}

export function createQuestionSet(seed = Date.now()) {
  const random = createSeededRandom(seed);
  const categories = [...new Set(questionBank.map((item) => item.category))];
  const coreQuestions = categories.flatMap((category) =>
    shuffle(questionBank.filter((item) => item.category === category), random).slice(0, 3),
  );
  const chosenIds = new Set(coreQuestions.map((item) => item.id));
  const remainingQuestions = shuffle(questionBank.filter((item) => !chosenIds.has(item.id)), random);

  return shuffle(
    [...coreQuestions, ...remainingQuestions.slice(0, QUESTION_COUNT - coreQuestions.length)],
    random,
  );
}
