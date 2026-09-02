const assetBase = import.meta.env?.BASE_URL ?? "/";

const profiles = {
  spark: [5, 3, 2, 4, 4],
  care: [2, 5, 3, 2, 3],
  craft: [2, 3, 5, 2, 4],
  free: [4, 2, 3, 5, 2],
  resolve: [3, 2, 4, 2, 5],
};

function makeBand(series, band, officialUrl, members) {
  return members.map(([id, name, role, image, archetype], index) => ({
    id,
    name,
    role,
    image: assetBase + "assets/characters/" + image,
    series,
    band,
    officialUrl,
    archetype,
    profile: profiles[archetype].map((value, traitIndex) =>
      Math.max(1, Math.min(5, value + ((index + traitIndex * 2) % 3) - 1)),
    ),
  }));
}

export const characters = [
  ...makeBand("K-ON!", "放課後ティータイム", "https://www.tbs.co.jp/anime/k-on/k-on_tv/chara/chara.html", [
    ["kon-yui", "平泽唯", "主唱 / 吉他", "k-on-yui.gif", "spark"],
    ["kon-mio", "秋山澪", "贝斯 / 主唱", "k-on-mio.gif", "care"],
    ["kon-ritsu", "田井中律", "鼓手", "k-on-ritsu.gif", "spark"],
    ["kon-tsumugi", "琴吹紬", "键盘", "k-on-tsumugi.gif", "care"],
    ["kon-azusa", "中野梓", "吉他", "k-on-azusa.gif", "craft"],
  ]),
  ...makeBand("BanG Dream!", "Poppin'Party", "https://anime.bang-dream.com/1st/character/", [
    ["poppa-kasumi", "户山香澄", "主唱 / 吉他", "poppinparty-kasumi.png", "spark"],
    ["poppa-tae", "花园多惠", "吉他", "poppinparty-tae.png", "free"],
    ["poppa-rimi", "牛込里美", "贝斯", "poppinparty-rimi.png", "care"],
    ["poppa-saaya", "山吹沙绫", "鼓手", "poppinparty-saaya.png", "resolve"],
    ["poppa-arisa", "市谷有咲", "键盘", "poppinparty-arisa.png", "craft"],
  ]),
  ...makeBand("BanG Dream! It's MyGO!!!!!", "MyGO!!!!!", "https://anime.bang-dream.com/mygo/character/", [
    ["mygo-tomori", "高松灯", "主唱", "mygo-tomori.png", "care"],
    ["mygo-anon", "千早爱音", "吉他", "mygo-anon.png", "spark"],
    ["mygo-rana", "要乐奈", "吉他", "mygo-rana.png", "free"],
    ["mygo-soyo", "长崎爽世", "贝斯", "mygo-soyo.png", "resolve"],
    ["mygo-taki", "椎名立希", "鼓手", "mygo-taki.png", "craft"],
  ]),
  ...makeBand("BanG Dream! Ave Mujica", "Ave Mujica", "https://anime.bang-dream.com/avemujica/character/", [
    ["mujica-uika", "三角初华", "主唱 / 吉他", "avemujica-uika.png", "spark"],
    ["mujica-mutsumi", "若叶睦", "吉他", "avemujica-mutsumi.png", "care"],
    ["mujica-umiri", "八幡海铃", "贝斯", "avemujica-umiri.png", "craft"],
    ["mujica-nyamu", "祐天寺若麦", "鼓手", "avemujica-nyamu.png", "free"],
    ["mujica-sakiko", "丰川祥子", "键盘", "avemujica-sakiko.png", "resolve"],
  ]),
  ...makeBand("孤独摇滚！", "结束乐队", "https://bocchi.rocks/tv/character/", [
    ["bocchi-hitori", "后藤一里", "吉他", "bocchi-hitori.png", "care"],
    ["bocchi-nijika", "伊地知虹夏", "鼓手", "bocchi-nijika.png", "spark"],
    ["bocchi-ryo", "山田凉", "贝斯", "bocchi-ryo.png", "free"],
    ["bocchi-ikuyo", "喜多郁代", "主唱 / 吉他", "bocchi-ikuyo.png", "spark"],
  ]),
  ...makeBand("Girls Band Cry", "トゲナシトゲアリ", "https://girls-band-cry.com/character/", [
    ["gbc-nina", "井芹仁菜", "主唱", "gbc-nina.webp", "resolve"],
    ["gbc-momoka", "河原木桃香", "吉他", "gbc-momoka.webp", "free"],
    ["gbc-subaru", "安和昴", "鼓手", "gbc-subaru.webp", "spark"],
    ["gbc-tomo", "海老塚智", "键盘", "gbc-tomo.webp", "craft"],
    ["gbc-rupa", "Rupa", "贝斯", "gbc-rupa.webp", "care"],
  ]),
  ...makeBand("夜晚的水母不会游泳", "JELEE", "https://yorukura-anime.com/", [
    ["jelee-mahiru", "光月真昼", "插画 / 创作", "jelee-mahiru.png", "care"],
    ["jelee-kano", "山之内花音", "主唱", "jelee-kano.png", "resolve"],
    ["jelee-kiui", "渡濑喜优", "键盘 / 编曲", "jelee-kiui.png", "free"],
    ["jelee-mei", "高梨·金·阿努克·芽衣", "音乐制作", "jelee-mei.png", "craft"],
  ]),
  ...makeBand("摇滚乃是淑女的爱好", "樱心女学园摇滚社", "https://rocklady.rocks/#Character", [
    ["rocklady-lilisa", "铃之宫莉莉纱", "吉他", "rocklady-lilisa.webp", "resolve"],
    ["rocklady-otoha", "黑铁音羽", "吉他", "rocklady-otoha.webp", "free"],
    ["rocklady-tina", "院濑见蒂娜", "贝斯", "rocklady-tina.webp", "spark"],
    ["rocklady-tamaki", "白矢环", "鼓手", "rocklady-tamaki.webp", "craft"],
  ]),
  ...makeBand("BanG Dream!", "Afterglow", "https://anime.bang-dream.com/2nd/character/", [
    ["afterglow-ran", "美竹兰", "主唱 / 吉他", "afterglow-ran.png", "resolve"],
    ["afterglow-moca", "青叶摩卡", "吉他", "afterglow-moca.png", "free"],
    ["afterglow-himari", "上原绯玛丽", "贝斯", "afterglow-himari.png", "spark"],
    ["afterglow-tomoe", "宇田川巴", "鼓手", "afterglow-tomoe.png", "resolve"],
    ["afterglow-tsugumi", "羽泽鸫", "键盘", "afterglow-tsugumi.png", "care"],
  ]),
  ...makeBand("BanG Dream!", "Pastel＊Palettes", "https://anime.bang-dream.com/2nd/character/", [
    ["paspale-aya", "丸山彩", "主唱", "pastelpalettes-aya.png", "spark"],
    ["paspale-hina", "冰川日菜", "吉他", "pastelpalettes-hina.png", "free"],
    ["paspale-chisato", "白鹭千圣", "贝斯", "pastelpalettes-chisato.png", "craft"],
    ["paspale-maya", "大和麻弥", "鼓手", "pastelpalettes-maya.png", "craft"],
    ["paspale-eve", "若宫伊芙", "键盘", "pastelpalettes-eve.png", "spark"],
  ]),
  ...makeBand("BanG Dream!", "Roselia", "https://anime.bang-dream.com/2nd/character/", [
    ["roselia-yukina", "凑友希那", "主唱", "roselia-yukina.png", "resolve"],
    ["roselia-sayo", "冰川纱夜", "吉他", "roselia-sayo.png", "craft"],
    ["roselia-lisa", "今井莉莎", "贝斯", "roselia-lisa.png", "care"],
    ["roselia-ako", "宇田川亚子", "鼓手", "roselia-ako.png", "spark"],
    ["roselia-rinko", "白金燐子", "键盘", "roselia-rinko.png", "care"],
  ]),
  ...makeBand("BanG Dream!", "Hello, Happy World!", "https://anime.bang-dream.com/2nd/character/", [
    ["hhw-kokoro", "弦卷心", "主唱", "hhw-kokoro.png", "spark"],
    ["hhw-kaoru", "濑田薰", "吉他", "hhw-kaoru.png", "free"],
    ["hhw-hagumi", "北泽育美", "贝斯", "hhw-hagumi.png", "spark"],
    ["hhw-kanon", "松原花音", "鼓手", "hhw-kanon.png", "care"],
    ["hhw-misaki", "奥泽美咲", "DJ", "hhw-misaki.png", "craft"],
  ]),
  ...makeBand("BanG Dream!", "RAISE A SUILEN", "https://anime.bang-dream.com/2nd/character/", [
    ["ras-layer", "LAYER", "主唱 / 贝斯", "ras-layer.png", "resolve"],
    ["ras-lock", "LOCK", "吉他", "ras-lock.png", "spark"],
    ["ras-masking", "MASKING", "鼓手", "ras-masking.png", "resolve"],
    ["ras-pareo", "PAREO", "键盘", "ras-pareo.png", "care"],
    ["ras-chu2", "CHU²", "DJ", "ras-chu2.png", "craft"],
  ]),
  ...makeBand("BanG Dream!", "Morfonica", "https://morfonica-anime.bang-dream.com/character/kurata-mashiro/", [
    ["morfonica-mashiro", "仓田真白", "主唱", "morfonica-mashiro.png", "care"],
    ["morfonica-toko", "桐谷透子", "吉他", "morfonica-toko.png", "spark"],
    ["morfonica-nanami", "广町七深", "贝斯", "morfonica-nanami.png", "free"],
    ["morfonica-tsukushi", "二叶筑紫", "鼓手", "morfonica-tsukushi.png", "resolve"],
    ["morfonica-rui", "八潮瑠唯", "小提琴", "morfonica-rui.png", "craft"],
  ]),
];

export const archetypeCopy = {
  spark: {
    title: "点火型",
    description: "你习惯让事情先动起来。你带来的不是喧闹，而是愿意开始的勇气。",
  },
  care: {
    title: "共鸣型",
    description: "你很在意人与人之间的感受，并能把细小的情绪变成温柔的力量。",
  },
  craft: {
    title: "打磨型",
    description: "你相信作品和行动会说话。越是重要的事，你越愿意沉下心做好。",
  },
  free: {
    title: "直觉型",
    description: "你珍惜自己的节奏，常会从意外的方向找到新的灵感和答案。",
  },
  resolve: {
    title: "执着型",
    description: "你会为真正认定的事坚持到底。你的坚定常常比自己想象得更有力量。",
  },
};

export const catalogSummary = {
  characters: characters.length,
  series: new Set(characters.map((character) => character.series)).size,
  bands: new Set(characters.map((character) => character.band)).size,
};
