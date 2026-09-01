import { createContext, useContext, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "mirror-test-locale";

export const localeOptions = [
  { code: "tc", label: "繁中", htmlLang: "zh-Hant" },
  { code: "sc", label: "简中", htmlLang: "zh-Hans" },
  { code: "hx", label: "火星文", htmlLang: "zh-Hant" },
  { code: "wy", label: "文言文", htmlLang: "lzh" },
  { code: "en", label: "EN", htmlLang: "en" },
  { code: "yue", label: "粵語", htmlLang: "yue" },
  { code: "ja", label: "日本語", htmlLang: "ja" },
];

const COPY = {
  sc: {
    language: "语言",
    about: "关于测试",
    library: "角色库",
    moreTests: "更多测试",
    start: "开始测试",
    heroTitleA: "测一测你是",
    heroTitleB: "哪部少女乐队番的",
    heroTitleC: "哪个角色",
    heroLead: "每次会从 {total} 道场景题中均衡抽取 {count} 个选择，找到与你最同频的乐队角色。答案没有标准，只记录你此刻最想发出的声音。",
    rosterLabel: "全角色轮换展示",
    rosterPrevious: "上一组",
    rosterNext: "下一组角色",
    rosterPause: "暂停轮换",
    rosterResume: "继续轮换",
    rosterCount: "第 {current}/{total} 组 · {count} 名角色",
    rosterLive: "当前展示第 {current} 组角色：{names}。",
    galleryTitle: "67 名角色，都会在首页轮换展示。",
    galleryCopy: "覆盖 {series} 部少女乐队动画与 {bands} 组乐队或音乐组合。点开角色卡即可前往对应的萌娘百科页面。",
    bandFilter: "筛选乐队",
    wiki: "查看角色 Wiki",
    quizProgress: "第 {current} 题 / 共 {total} 题",
    quizBack: "返回上一题",
    quizNote: "凭第一反应选择即可。本轮题目从 {total} 道题库中均衡抽取，你的选择只保存在当前浏览器会话中。",
    resultTitle: "你的角色结果",
    retry: "再测一次",
    official: "查看作品官方角色页",
    resultWiki: "查看角色 Wiki",
    score: "共鸣指数",
    posterTitle: "把这张结果带去你的下一场演出。",
    posterCopy: "使用当前本地角色素材生成结果海报。海报会同时附上测试二维码与图灵镜 QQ 社群二维码，不会上传你的选择。",
    posterDownload: "生成并下载结果图",
    posterSaving: "正在生成结果图",
    posterPreview: "预览结果图",
    posterPreviewing: "正在生成预览",
    posterError: "结果图生成失败，请稍后再试。",
    testQr: "扫码回到测试",
    communityTitle: "图灵镜 QQ 社群",
    communityHint: "点击复制群号，或使用 QQ 扫码加入",
    communityCopied: "已复制群号",
    communityCopy: "复制群号",
    previewTitle: "结果图预览",
    previewHint: "长按或保存图片即可分享给朋友。",
    close: "关闭",
    footerMoreTests: "发现更多测试",
  },
  tc: {
    language: "語言", about: "關於測驗", library: "角色庫", moreTests: "更多測驗", start: "開始測驗",
    heroTitleA: "測一測你是", heroTitleB: "哪部少女樂隊番的", heroTitleC: "哪個角色",
    heroLead: "每次會從 {total} 道場景題中均衡抽取 {count} 個選擇，找到與你最同頻的樂隊角色。答案沒有標準，只記錄你此刻最想發出的聲音。",
    rosterLabel: "全角色輪換展示", rosterPrevious: "上一組", rosterNext: "下一組角色", rosterPause: "暫停輪換", rosterResume: "繼續輪換", rosterCount: "第 {current}/{total} 組 · {count} 名角色", rosterLive: "目前展示第 {current} 組角色：{names}。",
    galleryTitle: "67 名角色，都會在首頁輪換展示。", galleryCopy: "涵蓋 {series} 部少女樂隊動畫與 {bands} 組樂隊或音樂組合。點開角色卡即可前往對應的萌娘百科頁面。", bandFilter: "篩選樂隊", wiki: "查看角色 Wiki",
    quizProgress: "第 {current} 題 / 共 {total} 題", quizBack: "返回上一題", quizNote: "憑第一反應選擇即可。本輪題目從 {total} 道題庫中均衡抽取，你的選擇只保存在目前瀏覽器會話中。",
    resultTitle: "你的角色結果", retry: "再測一次", official: "查看作品官方角色頁", resultWiki: "查看角色 Wiki", score: "共鳴指數",
    posterTitle: "把這張結果帶去你的下一場演出。", posterCopy: "使用目前本地角色素材生成結果海報。海報會同時附上測驗 QR 碼與圖靈鏡 QQ 社群 QR 碼，不會上傳你的選擇。", posterDownload: "生成並下載結果圖", posterSaving: "正在生成結果圖", posterPreview: "預覽結果圖", posterPreviewing: "正在生成預覽", posterError: "結果圖生成失敗，請稍後再試。", testQr: "掃碼回到測驗",
    communityTitle: "圖靈鏡 QQ 社群", communityHint: "點擊複製群號，或使用 QQ 掃碼加入", communityCopied: "已複製群號", communityCopy: "複製群號", previewTitle: "結果圖預覽", previewHint: "長按或保存圖片即可分享給朋友。", close: "關閉", footerMoreTests: "發現更多測驗",
  },
  en: {
    language: "Language", about: "About", library: "Character Library", moreTests: "More Tests", start: "Start Quiz",
    heroTitleA: "Which girl-band", heroTitleB: "anime character", heroTitleC: "are you?",
    heroLead: "Each run draws {count} balanced choices from a pool of {total} scenes to find your closest girl-band character match.",
    rosterLabel: "Full roster rotation", rosterPrevious: "Previous set", rosterNext: "Next set", rosterPause: "Pause rotation", rosterResume: "Resume rotation", rosterCount: "Set {current}/{total} · {count} characters", rosterLive: "Showing set {current}: {names}.",
    galleryTitle: "All 67 characters rotate on the home page.", galleryCopy: "Across {series} girl-band anime series and {bands} bands or music groups. Open any card for its Moegirl Wiki page.", bandFilter: "Filter by band", wiki: "Open character Wiki",
    quizProgress: "Question {current} / {total}", quizBack: "Previous question", quizNote: "Choose your first instinct. This round is balanced from a {total}-question pool and stays only in this browser session.",
    resultTitle: "Your character result", retry: "Try again", official: "Open official character page", resultWiki: "Open character Wiki", score: "Resonance score",
    posterTitle: "Take this result to your next show.", posterCopy: "The poster uses the local character art and includes both the test QR code and the Turing Mirror QQ community QR code. Your choices are never uploaded.", posterDownload: "Generate and download poster", posterSaving: "Generating poster", posterPreview: "Preview poster", posterPreviewing: "Rendering preview", posterError: "Could not generate the result poster. Please try again.", testQr: "Scan to reopen this test",
    communityTitle: "Turing Mirror QQ Community", communityHint: "Copy the group number or scan with QQ to join", communityCopied: "Group number copied", communityCopy: "Copy group number", previewTitle: "Poster preview", previewHint: "Save or long-press the image to share it.", close: "Close", footerMoreTests: "Discover more tests",
  },
  ja: {
    language: "言語", about: "テストについて", library: "キャラクター", moreTests: "ほかのテスト", start: "診断を始める",
    heroTitleA: "あなたはどの", heroTitleB: "ガールズバンドアニメの", heroTitleC: "どのキャラクター？",
    heroLead: "{total} 問のシーン問題から、バランスよく {count} 問を選び、あなたに近いキャラクターを探します。",
    rosterLabel: "全キャラクターのローテーション", rosterPrevious: "前の組", rosterNext: "次の組", rosterPause: "ローテーションを停止", rosterResume: "ローテーションを再開", rosterCount: "{current}/{total} 組 · {count} 人", rosterLive: "{current} 組目を表示中：{names}。",
    galleryTitle: "67 人のキャラクターをホームで順番に表示します。", galleryCopy: "{series} 作品、{bands} 組のバンド・音楽ユニットを収録。カードから萌娘百科のページを開けます。", bandFilter: "バンドで絞り込む", wiki: "キャラクター Wiki を開く",
    quizProgress: "第 {current} 問 / 全 {total} 問", quizBack: "前の質問へ", quizNote: "第一印象で選んでください。このラウンドは {total} 問のプールから選ばれ、回答はこのブラウザ内だけに保存されます。",
    resultTitle: "あなたの診断結果", retry: "もう一度", official: "公式キャラクターページ", resultWiki: "キャラクター Wiki", score: "共鳴スコア",
    posterTitle: "次のステージにこの結果を持っていこう。", posterCopy: "ローカルのキャラクター素材で結果画像を生成します。テスト用 QR と Turing Mirror QQ コミュニティの QR を収録し、回答は送信されません。", posterDownload: "結果画像を保存", posterSaving: "結果画像を生成中", posterPreview: "結果画像を確認", posterPreviewing: "プレビューを生成中", posterError: "結果画像を生成できませんでした。", testQr: "QR で診断ページへ",
    communityTitle: "Turing Mirror QQ コミュニティ", communityHint: "番号をコピーするか、QQ で QR を読み取って参加", communityCopied: "グループ番号をコピーしました", communityCopy: "番号をコピー", previewTitle: "結果画像プレビュー", previewHint: "画像を保存または長押しして共有できます。", close: "閉じる", footerMoreTests: "ほかのテストを見る",
  },
};

COPY.hx = { ...COPY.sc, moreTests: "更多试题", start: "开始开测", footerMoreTests: "再看更多试题" };
COPY.wy = { ...COPY.tc, moreTests: "更多試頁", start: "入試", footerMoreTests: "覽諸試頁" };
COPY.yue = { ...COPY.tc, language: "語言", moreTests: "更多測驗", start: "開始測驗", footerMoreTests: "睇更多測驗" };

const LocaleContext = createContext(null);

function normalizeLocale(value) {
  return localeOptions.some((item) => item.code === value) ? value : "sc";
}

function initialLocale() {
  if (typeof window === "undefined") return "sc";

  try {
    const requested = new URLSearchParams(window.location.search).get("lang");
    if (requested) return normalizeLocale(requested);
    return normalizeLocale(window.localStorage.getItem(STORAGE_KEY));
  } catch {
    return "sc";
  }
}

export function BandLocaleProvider({ children }) {
  const [locale, setLocale] = useState(initialLocale);
  const activeCopy = COPY[locale] || COPY.sc;

  useEffect(() => {
    const option = localeOptions.find((item) => item.code === locale) || localeOptions[1];
    document.documentElement.lang = option.htmlLang;
    try {
      window.localStorage.setItem(STORAGE_KEY, locale);
    } catch {}
  }, [locale]);

  const value = useMemo(() => ({
    locale,
    setLocale: (nextLocale) => setLocale(normalizeLocale(nextLocale)),
    t: (key, values = {}) => String(activeCopy[key] || COPY.sc[key] || key).replace(/\{(\w+)\}/g, (_, name) => values[name] ?? ""),
  }), [activeCopy, locale]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useBandLocale() {
  const context = useContext(LocaleContext);
  if (!context) throw new Error("useBandLocale must be used inside BandLocaleProvider");
  return context;
}

export function LanguageSelect({ className = "" }) {
  const { locale, setLocale, t } = useBandLocale();

  return (
    <label className={"band-language-control " + className}>
      <span className="screen-reader-text">{t("language")}</span>
      <select aria-label={t("language")} value={locale} onChange={(event) => setLocale(event.target.value)}>
        {localeOptions.map((option) => <option key={option.code} value={option.code}>{option.label}</option>)}
      </select>
    </label>
  );
}