var localeApi = window.MirrorTestLocale;
var currentLocale = localeApi.getLocale();
var manifestState = {
  anime: {
    synced: true,
    href: "/anime-summer-2026/"
  },
  galgame: {
    synced: true,
    href: "/galgame-test/"
  },
  bandTi: {
    synced: true,
    href: "/band-ti/"
  }
};
var HERO_TYPEWRITER_LINES = [
  "测试，人格，喜爱。",
  "分享，共鸣。",
  "Vanitas Vanitatum Et Omnia Vanitas.",
  "学园 × 青春 × 物语",
  "Where All Miracles Begin.",
  "保护孩子们做梦的权利。",
  "找寻，寻找，找寻。"
];
var heroTypewriterState = {
  queue: [],
  phrase: "",
  timer: 0,
  resizeFrame: 0,
  running: false
};
var reducedMotionQuery = window.matchMedia ? window.matchMedia("(prefers-reduced-motion: reduce)") : null;

var SITE_COPY = {
  tc: {
    pageTitle: "Mirror-Test",
    metaDescription: "Mirror-Test 的互動測驗首頁，集中收納目前已開放與待加入的測驗頁。",
    ogDescription: "把已開放與即將加入的互動測驗集中在同一個首頁。",
    marqueeTop: ["Mirror-Test", "TEST INDEX", "ANIME PERSONALITY", "LIVE TESTS", "SUMMER 2026"],
    marqueeBottom: ["ANIME GUIDE 2026", "性格診断テスト", "SUMMER LINEUP", "Mirror-Test", "LIVE TESTS"],
    heroRailLeft: "試験案內",
    heroRailRight: "test.turingmirror.com",
    heroTag: "号外 EXTRA",
    heroDate: "VOL. 01 -- MIRROR INDEX",
    heroMixedLine: "✧ Mirror-Test × 測驗索引 ✧",
    heroCopyTag: "-- 測驗集合 --",
    heroCopy: "先從已開放的測驗裡挑一頁開始，之後上線的新測驗也都會收在這裡。",
    heroPrimaryAction: "更多測驗",
    heroSecondaryAction: "進入動漫測驗",
    heroHomeAction: "返回主頁",
    heroSecondaryPrefix: "進入",
    heroMetaDomain: "DOMAIN: test.turingmirror.com",
    heroMetaRoute: "CURRENT LINEUP: ANIME + GALGAME + BAND-TI",
    heroFooterPrimary: "INTERACTIVE TEST INDEX",
    heroFooterSecondary: "互動測驗集合",
    heroSparkle: "☆ﾟ.*･｡ﾟ",
    sectionKicker: "MORE TESTS",
    sectionTitle: "更多測驗",
    sectionNote: "現在能玩的測驗都在這裡，之後新頁面也會繼續往下加。",
    routeLabel: "ROUTE",
    sourceLabel: "SEASON",
    openTest: "進入測驗",
    comingSoon: "敬請期待",
    statusLive: "LIVE",
    statusPending: "PENDING",
    statusWaiting: "WAITING",
    unavailableNote: "這個測驗目前暫時離線，連結保留中。",
    tests: {
      anime: {
        title: "2026 夏季番性格測驗",
        cta: "夏番測驗",
        description: "15道問題，對照追番性格找到你的本季命定番。附推薦理由與避雷提醒。",
        note: "2026夏季新番收錄完整，含動畫電影。"
      },
      galgame: {
        title: "GalGame 命定路線測驗",
        cta: "GalGame 測驗",
        description: "15 道問題，對照路線口味、節奏偏好與承受度，幫你找到更適合補的作品。",
        note: "收錄 43 部作品，各附路線說明與封面圖。"
      }
    }
  },
  sc: {
    pageTitle: "Mirror-Test",
    metaDescription: "Mirror-Test 的互动测验首页，集中展示目前可用与准备中的测试页。",
    ogDescription: "集中展示目前可用与准备中的互动测试页。",
    marqueeTop: ["Mirror-Test", "TEST INDEX", "ANIME PERSONALITY", "LIVE TESTS", "SUMMER 2026"],
    marqueeBottom: ["ANIME GUIDE 2026", "性格诊断テスト", "SUMMER LINEUP", "Mirror-Test", "LIVE TESTS"],
    heroRailLeft: "试验导览",
    heroRailRight: "test.turingmirror.com",
    heroTag: "号外 EXTRA",
    heroDate: "VOL. 01 -- MIRROR INDEX",
    heroMixedLine: "✧ Mirror-Test × 测验索引 ✧",
    heroCopyTag: "-- 测验集合 --",
    heroCopy: "先从已开放的测验里挑一页开始，之后上线的新测验也都会收在这里。",
    heroPrimaryAction: "更多测试",
    heroSecondaryAction: "进入动漫测验",
    heroHomeAction: "返回主页",
    heroSecondaryPrefix: "进入",
    heroMetaDomain: "DOMAIN: test.turingmirror.com",
    heroMetaRoute: "CURRENT LINEUP: ANIME + GALGAME + BAND-TI",
    heroFooterPrimary: "INTERACTIVE TEST INDEX",
    heroFooterSecondary: "互动测验集合",
    heroSparkle: "☆ﾟ.*･｡ﾟ",
    sectionKicker: "MORE TESTS",
    sectionTitle: "更多测试",
    sectionNote: "现在能玩的测验都在这里，之后新页面也会继续往下加。",
    routeLabel: "ROUTE",
    sourceLabel: "SEASON",
    openTest: "进入测验",
    comingSoon: "敬请期待",
    statusLive: "LIVE",
    statusPending: "PENDING",
    statusWaiting: "WAITING",
    unavailableNote: "这个测验目前暂时离线，连结保留中。",
    tests: {
      anime: {
        title: "2026 夏季番性格测验",
        cta: "夏番测验",
        description: "15道问题，对照追番性格找到你的本季命定番。附推荐理由与避雷提醒。",
        note: "2026夏季新番收录完整，含动画电影。"
      },
      galgame: {
        title: "GalGame 命定路线测验",
        cta: "GalGame 测验",
        description: "15 道问题，按路线口味、节奏偏好和承受度，帮你找到更适合补的作品。",
        note: "收录 43 部作品，各附路线说明与封面图。"
      }
    }
  },
  hx: {
    pageTitle: "Mirror-Test",
    metaDescription: "Mirror-Test の互動測驗首頁，把而家能玩同準備開坑の測驗頁壹次打包收編。",
    ogDescription: "已開放同待開坑の互動測驗，統統收進同一個首頁。",
    marqueeTop: ["Mirror-Test", "TEST INDEX", "ANIME PERSONALITY", "LIVE TESTS", "SUMMER 2026"],
    marqueeBottom: ["ANIME GUIDE 2026", "本命番診斷テスト", "SUMMER LINEUP", "Mirror-Test", "夏番開坑惹"],
    heroRailLeft: "試題導航",
    heroRailRight: "test.turingmirror.com",
    heroTag: "號外 EXTRA",
    heroDate: "VOL. 01 -- MIRROR INDEX",
    heroMixedLine: "✧ Mirror-Test × 測驗索引 ✧",
    heroCopyTag: "-- 測驗合集 --",
    heroCopy: "先從已開著の測驗裡挑壹頁開刷，後面新開の測驗也都會陸續收進這裡。",
    heroPrimaryAction: "更多試題",
    heroSecondaryAction: "進夏番測驗",
    heroHomeAction: "返主頁",
    heroSecondaryPrefix: "進入",
    heroMetaDomain: "DOMAIN: test.turingmirror.com",
    heroMetaRoute: "CURRENT LINEUP: ANIME + GALGAME + BAND-TI",
    heroFooterPrimary: "INTERACTIVE TEST INDEX",
    heroFooterSecondary: "互動測驗合集",
    heroSparkle: "☆ﾟ.*･｡ﾟ",
    sectionKicker: "MORE TESTS",
    sectionTitle: "更多試題",
    sectionNote: "能玩の頁面都收在這裡，後面新測驗也會繼續補進來。",
    routeLabel: "ROUTE",
    sourceLabel: "SEASON",
    openTest: "進去開測",
    comingSoon: "蹲個開坑",
    statusLive: "LIVE",
    statusPending: "PENDING",
    statusWaiting: "WAITING",
    unavailableNote: "這個試題暫時離線惹，坑位先留著。",
    tests: {
      anime: {
        title: "2026 夏番性格測驗",
        cta: "夏番測驗",
        description: "15道題，對照伱の追番電波揪出本季本命番。附推坑理由同避雷提醒。",
        note: "2026夏番收錄已補滿，動畫電影也算進去惹。"
      },
      galgame: {
        title: "GalGame 本命路線測驗",
        cta: "GalGame 測驗",
        description: "15道題，按路線口味、節奏偏好同承受度，幫伱找到更想肝下去の作品。",
        note: "收惹 43 部作品，每部都帶埋路線說明同封面。"
      }
    }
  },
  wy: {
    pageTitle: "Mirror-Test",
    metaDescription: "Mirror-Test 諸測總目也，今所開放與後將納入之頁，悉聚於此。",
    ogDescription: "諸互動測頁，凡既成與將成者，咸收一首頁之內。",
    marqueeTop: ["Mirror-Test", "TEST INDEX", "ANIME PERSONALITY", "LIVE TESTS", "SUMMER 2026"],
    marqueeBottom: ["ANIME GUIDE 2026", "性格診断テスト", "SUMMER LINEUP", "Mirror-Test", "夏番本命之卜"],
    heroRailLeft: "試牘總目",
    heroRailRight: "test.turingmirror.com",
    heroTag: "號外 EXTRA",
    heroDate: "VOL. 01 -- MIRROR INDEX",
    heroMixedLine: "✧ Mirror-Test × 試頁總目 ✧",
    heroCopyTag: "-- 試頁總覽 --",
    heroCopy: "今可先擇已開之試而入，後續新試亦將續錄於此。",
    heroPrimaryAction: "更多試頁",
    heroSecondaryAction: "入夏番試",
    heroHomeAction: "返主頁",
    heroSecondaryPrefix: "入",
    heroMetaDomain: "DOMAIN: test.turingmirror.com",
    heroMetaRoute: "CURRENT LINEUP: ANIME + GALGAME + BAND-TI",
    heroFooterPrimary: "INTERACTIVE TEST INDEX",
    heroFooterSecondary: "互動測驗總錄",
    heroSparkle: "☆ﾟ.*･｡ﾟ",
    sectionKicker: "MORE TESTS",
    sectionTitle: "更多試頁",
    sectionNote: "今可遊之試皆列於此，後續新頁亦將續補之。",
    routeLabel: "ROUTE",
    sourceLabel: "SEASON",
    openTest: "入此試",
    comingSoon: "俟之",
    statusLive: "LIVE",
    statusPending: "PENDING",
    statusWaiting: "WAITING",
    unavailableNote: "此試暫時下線，路由姑存。",
    tests: {
      anime: {
        title: "二〇二六夏番性格試",
        cta: "夏番試",
        description: "十五題以測性格，據此推本季最合汝意之命定番。附推薦之由與避雷之示。",
        note: "二〇二六夏番收錄完備，動畫電影亦納其中。"
      },
      galgame: {
        title: "GalGame 命定路線試",
        cta: "GalGame 試",
        description: "十五題，以辨路線所好、節奏偏向與承受，推更契汝心之作。",
        note: "收錄四十三部作品，各附路線與封面。"
      }
    }
  },
  en: {
    pageTitle: "Mirror-Test",
    metaDescription: "The Mirror-Test index, collecting live and in-progress interactive tests under one home page.",
    ogDescription: "A single home page for live and upcoming interactive tests.",
    marqueeTop: ["Mirror-Test", "TEST INDEX", "ANIME PERSONALITY", "LIVE TESTS", "SUMMER 2026"],
    marqueeBottom: ["ANIME GUIDE 2026", "PERSONALITY TEST", "SUMMER LINEUP", "Mirror-Test", "LIVE TESTS"],
    heroRailLeft: "TEST INDEX",
    heroRailRight: "test.turingmirror.com",
    heroTag: "EXTRA",
    heroDate: "VOL. 01 -- MIRROR INDEX",
    heroMixedLine: "Mirror-Test x TEST INDEX",
    heroCopyTag: "-- TEST CATALOG --",
    heroCopy: "Start from whichever live test fits your mood. New tests will keep landing here.",
    heroPrimaryAction: "More Tests",
    heroSecondaryAction: "Anime Test",
    heroHomeAction: "Back to Home",
    heroSecondaryPrefix: "Open ",
    heroMetaDomain: "DOMAIN: test.turingmirror.com",
    heroMetaRoute: "CURRENT LINEUP: ANIME + GALGAME + BAND-TI",
    heroFooterPrimary: "INTERACTIVE TEST INDEX",
    heroFooterSecondary: "test collection",
    heroSparkle: "ARCHIVE MODE",
    sectionKicker: "MORE TESTS",
    sectionTitle: "More Tests",
    sectionNote: "Everything playable right now sits here, and new tests will be added underneath.",
    routeLabel: "ROUTE",
    sourceLabel: "SEASON",
    openTest: "Open Test",
    comingSoon: "Coming Soon",
    statusLive: "LIVE",
    statusPending: "PENDING",
    statusWaiting: "WAITING",
    unavailableNote: "This test is temporarily offline. The link is reserved.",
    tests: {
      anime: {
        title: "Summer 2026 Anime Match",
        cta: "Anime Test",
        description: "15 questions matched to your watching habits. Finds your fated pick for the season, with reasons and skip warnings.",
        note: "Full 2026 summer lineup, including films."
      },
      galgame: {
        title: "GalGame Route Match",
        cta: "GalGame Test",
        description: "15 questions on route taste, pacing, and tolerance to find a better-fit visual novel.",
        note: "43 titles, each with route details and a cover image."
      }
    }
  },
  yue: {
    pageTitle: "Mirror-Test",
    metaDescription: "Mirror-Test 嘅互動測驗首頁，集中收埋而家開放緊同之後會加落去嘅測驗頁。",
    ogDescription: "而家用到同稍後加入嘅互動測驗，都放返喺同一個首頁。",
    marqueeTop: ["Mirror-Test", "TEST INDEX", "ANIME PERSONALITY", "LIVE TESTS", "SUMMER 2026"],
    marqueeBottom: ["ANIME GUIDE 2026", "性格診断テスト", "SUMMER LINEUP", "Mirror-Test", "夏番本命"],
    heroRailLeft: "試頁索引",
    heroRailRight: "test.turingmirror.com",
    heroTag: "號外 EXTRA",
    heroDate: "VOL. 01 -- MIRROR INDEX",
    heroMixedLine: "✧ Mirror-Test × 試題索引 ✧",
    heroCopyTag: "-- 測驗集合 --",
    heroCopy: "先喺已開放嘅測驗入面揀一頁開始，之後新上線嗰啲都會繼續收埋喺度。",
    heroPrimaryAction: "更多測驗",
    heroSecondaryAction: "入夏番測驗",
    heroHomeAction: "返主頁",
    heroSecondaryPrefix: "入",
    heroMetaDomain: "DOMAIN: test.turingmirror.com",
    heroMetaRoute: "CURRENT LINEUP: ANIME + GALGAME + BAND-TI",
    heroFooterPrimary: "INTERACTIVE TEST INDEX",
    heroFooterSecondary: "互動測驗集合",
    heroSparkle: "☆ﾟ.*･｡ﾟ",
    sectionKicker: "MORE TESTS",
    sectionTitle: "更多測驗",
    sectionNote: "而家玩得到嘅測驗都喺度，之後新頁都會繼續加落去。",
    routeLabel: "ROUTE",
    sourceLabel: "SEASON",
    openTest: "入去測",
    comingSoon: "敬請期待",
    statusLive: "LIVE",
    statusPending: "PENDING",
    statusWaiting: "WAITING",
    unavailableNote: "呢個測驗暫時離線，連結先留住。",
    tests: {
      anime: {
        title: "2026 夏季番性格測驗",
        cta: "夏番測驗",
        description: "15題對照你嘅追番性格，搵出今季命定番。附推薦理由同避雷提醒。",
        note: "2026夏番收錄完整，包括動畫電影。"
      },
      galgame: {
        title: "GalGame 命定路線測驗",
        cta: "GalGame 測驗",
        description: "15題，由路線口味、節奏偏好同承受度入手，幫你搵到更啱補嘅作品。",
        note: "收錄咗 43 部作品，每部都附路線說明同封面圖。"
      }
    }
  },
  ja: {
    pageTitle: "Mirror-Test",
    metaDescription: "Mirror-Test のテスト一覧ページ。公開中と準備中のインタラクティブ企画を一か所に集約します。",
    ogDescription: "公開中と今後追加予定のインタラクティブテストをまとめたトップページ。",
    marqueeTop: ["Mirror-Test", "TEST INDEX", "ANIME PERSONALITY", "LIVE TESTS", "SUMMER 2026"],
    marqueeBottom: ["ANIME GUIDE 2026", "性格診断テスト", "SUMMER LINEUP", "Mirror-Test", "夏番命定"],
    heroRailLeft: "試験案内",
    heroRailRight: "test.turingmirror.com",
    heroTag: "号外 EXTRA",
    heroDate: "VOL. 01 -- MIRROR INDEX",
    heroMixedLine: "Mirror-Test × テスト索引",
    heroCopyTag: "-- テスト一覧 --",
    heroCopy: "まずは公開中のテストから。今後の追加分もこのページに順次まとまります。",
    heroPrimaryAction: "ほかのテスト",
    heroSecondaryAction: "アニメ診断へ",
    heroHomeAction: "ホームへ戻る",
    heroSecondaryPrefix: "",
    heroMetaDomain: "DOMAIN: test.turingmirror.com",
    heroMetaRoute: "CURRENT LINEUP: ANIME + GALGAME + BAND-TI",
    heroFooterPrimary: "INTERACTIVE TEST INDEX",
    heroFooterSecondary: "テスト一覧",
    heroSparkle: "☆ﾟ.*･｡ﾟ",
    sectionKicker: "MORE TESTS",
    sectionTitle: "公開中のテスト",
    sectionNote: "いま遊べるテストをここにまとめています。追加分も順次ここへ入ります。",
    routeLabel: "ROUTE",
    sourceLabel: "SEASON",
    openTest: "開く",
    comingSoon: "準備中",
    statusLive: "LIVE",
    statusPending: "PENDING",
    statusWaiting: "WAITING",
    unavailableNote: "このテストは一時的にオフラインです。リンクは確保されています。",
    tests: {
      anime: {
        title: "2026 夏アニメ性格診断",
        cta: "夏アニメ診断へ",
        description: "15問で追いかけるアニメの傾向を診断——今期の運命の一本を、推薦理由と地雷情報つきでお届け。",
        note: "2026夏アニメ全収録。劇場版も含みます。"
      },
      galgame: {
        title: "GalGame 命定ルート診断",
        cta: "GalGame診断へ",
        description: "15問でルートの好みとテンポを測り、今の自分に合う一本を探します。",
        note: "43作品収録。各ルートの詳細とカバー画像付き。"
      }
    }
  }
};

var SITE_COPY_EXTENSIONS = {
  tc: {
    heroMixedLine: "✧ Mirror-Test × 測驗索引 ✧",
    gateKicker: "LANGUAGE INDEX",
    gateTitle: "先選擇語言",
    gateSubtitle: "選好後會進入首頁，右上角也能隨時切換。",
    gateNote: "之後加入的測驗，都能在右上角切換語言。",
    gateToast: "右上角可隨時切換語言",
    repoMirrorLabel: "GitHub",
    repoAnimeLabel: "GitHub"
  },
  sc: {
    gateKicker: "LANGUAGE INDEX",
    gateTitle: "先选择语言",
    gateSubtitle: "选好后进入首页，右上角也能随时切换。",
    gateNote: "之后加入的测验，都能在右上角切换语言。",
    gateToast: "右上角可随时切换语言",
    repoMirrorLabel: "GitHub",
    repoAnimeLabel: "GitHub"
  },
  hx: {
    gateKicker: "LANGUAGE INDEX",
    gateTitle: "先揀伱想看の語言版本",
    gateSubtitle: "選完就直達首頁，右上角那顆語言鍵之後想咋切都阔以。",
    gateNote: "後面新開の測驗，右上角一樣能切語言，卟用重找。",
    gateToast: "右上角隨時都能切語言",
    repoMirrorLabel: "GitHub",
    repoAnimeLabel: "GitHub"
  },
  wy: {
    gateKicker: "LANGUAGE INDEX",
    gateTitle: "請先擇其言",
    gateSubtitle: "既擇其言，乃入首頁；右上角亦可隨時更易。",
    gateNote: "後來諸測，皆可由右上角更語。",
    gateToast: "右上角可隨時易語",
    repoMirrorLabel: "GitHub",
    repoAnimeLabel: "GitHub"
  },
  en: {
    gateKicker: "LANGUAGE INDEX",
    gateTitle: "Choose Your Language",
    gateSubtitle: "Once you enter, the language switch stays in the top-right corner.",
    gateNote: "New tests added later will have the same language switch.",
    gateToast: "Language switch is in the top-right corner",
    repoMirrorLabel: "GitHub",
    repoAnimeLabel: "GitHub"
  },
  yue: {
    gateKicker: "LANGUAGE INDEX",
    gateTitle: "先揀語言",
    gateSubtitle: "揀完就會入首頁，右上角之後都可以隨時轉。",
    gateNote: "之後加嘅測驗，都可以喺右上角轉語言。",
    gateToast: "右上角可以隨時轉語言",
    repoMirrorLabel: "GitHub",
    repoAnimeLabel: "GitHub"
  },
  ja: {
    gateKicker: "LANGUAGE INDEX",
    gateTitle: "先に言語を選んでください",
    gateSubtitle: "入った後も、右上の言語メニューからいつでも切り替えられます。",
    gateNote: "この先追加されるテストも、右上の同じ言語メニューを使います。",
    gateToast: "言語切替は右上にあります",
    repoMirrorLabel: "GitHub",
    repoAnimeLabel: "GitHub"
  }
};

Object.keys(SITE_COPY_EXTENSIONS).forEach(function (locale) {
  Object.assign(SITE_COPY[locale], SITE_COPY_EXTENSIONS[locale]);
});

var BAND_TI_COPY = {
  tc: {
    title: "少女樂隊角色測驗",
    cta: "少女樂隊測驗",
    description: "從 100 道題庫均衡抽出 20 題，從 67 名角色中找到與你此刻最同頻的少女樂隊角色。",
    note: "涵蓋 8 部作品與 14 組樂隊或音樂組合。"
  },
  sc: {
    title: "少女乐队角色测试",
    cta: "少女乐队测试",
    description: "从 100 道题库均衡抽出 20 题，从 67 名角色中找到与你此刻最同频的少女乐队角色。",
    note: "覆盖 8 部作品与 14 组乐队或音乐组合。"
  },
  hx: {
    title: "少女樂隊角色測驗",
    cta: "少女樂隊測驗",
    description: "由 100 道題庫均衡抽 20 道，喺 67 名角色入面搵到同伱而家最同頻の少女樂隊角色。",
    note: "收錄 8 部作品同 14 組樂隊或者音樂組合。"
  },
  wy: {
    title: "少女樂隊角色之試",
    cta: "入少女樂隊試",
    description: "百題之庫均取二十問，於六十七名角色中，求與汝今時最相契之少女樂隊角色。",
    note: "凡八部作品、十四組樂隊與音樂組合，悉列其中。"
  },
  en: {
    title: "Girl Band Character Quiz",
    cta: "Girl Band Quiz",
    description: "A 100-question bank selects 20 balanced prompts to find the girl-band character whose sound matches you right now.",
    note: "67 characters from 8 series and 14 bands or music units."
  },
  yue: {
    title: "少女樂隊角色測驗",
    cta: "少女樂隊測驗",
    description: "由 100 道題庫平均抽 20 道，搵出同你而家最夾嘅少女樂隊角色。",
    note: "收錄 8 部作品同 14 組樂隊或者音樂組合。"
  },
  ja: {
    title: "ガールズバンドキャラクター診断",
    cta: "ガールズバンド診断",
    description: "100問の問題バンクから均等に20問を選び、今のあなたと一番響き合うガールズバンド作品のキャラクターを探します。",
    note: "8作品、14バンド・音楽ユニット、67キャラクターを収録。"
  }
};

var CATALOG_EXTRAS_COPY = {
  tc: { communityKicker: "COMMUNITY", communityTitle: "圖靈鏡 QQ 社群", communityText: "和其他測驗玩家交流結果、一起等新題庫。", communityNumber: "群號 1077458748", communityCopy: "複製群號", communityCopied: "已複製群號", communityQrAlt: "圖靈鏡 QQ 社群二維碼", promoKicker: "PROMOTION", promoTitle: "雨雲", promoText: "首月五折 · 性價比雲伺服器 / 遊戲雲 / 面板服", promoAction: "前往雨雲" },
  sc: { communityKicker: "COMMUNITY", communityTitle: "图灵镜 QQ 社群", communityText: "和其他测试玩家交流结果，一起等新题库。", communityNumber: "群号 1077458748", communityCopy: "复制群号", communityCopied: "已复制群号", communityQrAlt: "图灵镜 QQ 社群二维码", promoKicker: "PROMOTION", promoTitle: "雨云", promoText: "首月五折 · 性价比云服务器 / 游戏云 / 面板服", promoAction: "前往雨云" },
  hx: { communityKicker: "COMMUNITY", communityTitle: "圖靈鏡 QQ 社群", communityText: "同其他測驗玩家交流結果，等新題庫一齊開。", communityNumber: "群號 1077458748", communityCopy: "複製群號", communityCopied: "群號複製好惹", communityQrAlt: "圖靈鏡 QQ 社群二維碼", promoKicker: "PROMOTION", promoTitle: "雨雲", promoText: "首月五折 · 性價比雲伺服器 / 遊戲雲 / 面板服", promoAction: "去雨雲" },
  wy: { communityKicker: "COMMUNITY", communityTitle: "圖靈鏡 QQ 社群", communityText: "可與諸試者交流結果，並候新題之續增。", communityNumber: "群號 1077458748", communityCopy: "複製群號", communityCopied: "群號已複製", communityQrAlt: "圖靈鏡 QQ 社群二維碼", promoKicker: "PROMOTION", promoTitle: "雨雲", promoText: "首月五折 · 雲伺服器 / 遊戲雲 / 面板服", promoAction: "往雨雲" },
  en: { communityKicker: "COMMUNITY", communityTitle: "Turing Mirror QQ Community", communityText: "Compare results with other players and keep up with new question banks.", communityNumber: "Group 1077458748", communityCopy: "Copy group number", communityCopied: "Group number copied", communityQrAlt: "Turing Mirror QQ community QR code", promoKicker: "PROMOTION", promoTitle: "Rainyun", promoText: "50% off the first month · value cloud servers / game cloud / panel hosting", promoAction: "Visit Rainyun" },
  yue: { communityKicker: "COMMUNITY", communityTitle: "圖靈鏡 QQ 社群", communityText: "同其他測驗玩家交流結果，一齊等新題庫。", communityNumber: "群號 1077458748", communityCopy: "複製群號", communityCopied: "已複製群號", communityQrAlt: "圖靈鏡 QQ 社群二維碼", promoKicker: "PROMOTION", promoTitle: "雨雲", promoText: "首月五折 · 性價比雲伺服器 / 遊戲雲 / 面板服", promoAction: "去雨雲" },
  ja: { communityKicker: "COMMUNITY", communityTitle: "Turing Mirror QQ コミュニティ", communityText: "ほかの診断ユーザーと結果を共有し、新しい問題集の更新も追えます。", communityNumber: "グループ 1077458748", communityCopy: "番号をコピー", communityCopied: "番号をコピーしました", communityQrAlt: "Turing Mirror QQ コミュニティの QR コード", promoKicker: "PROMOTION", promoTitle: "Rainyun", promoText: "初月半額 · 高コスパのクラウドサーバー / ゲームクラウド / パネルホスティング", promoAction: "Rainyun へ" }
};
Object.assign(CATALOG_EXTRAS_COPY.tc, { socialKicker: "SOCIAL", socialTitle: "關注圖靈鏡", socialText: "取得新測驗、產品與專案動態。" });
Object.assign(CATALOG_EXTRAS_COPY.sc, { socialKicker: "SOCIAL", socialTitle: "关注图灵镜", socialText: "获取新测试、产品与项目动态。" });
Object.assign(CATALOG_EXTRAS_COPY.hx, { socialKicker: "SOCIAL", socialTitle: "關注圖靈鏡", socialText: "新測驗、產品與專案動態都在這裡。" });
Object.assign(CATALOG_EXTRAS_COPY.wy, { socialKicker: "SOCIAL", socialTitle: "關注圖靈鏡", socialText: "新試、產品與專案之動態皆在此。" });
Object.assign(CATALOG_EXTRAS_COPY.en, { socialKicker: "SOCIAL", socialTitle: "Follow Turing Mirror", socialText: "Find new tests, products, and project updates." });
Object.assign(CATALOG_EXTRAS_COPY.yue, { socialKicker: "SOCIAL", socialTitle: "關注圖靈鏡", socialText: "新測驗、產品同專案動態都喺呢度。" });
Object.assign(CATALOG_EXTRAS_COPY.ja, { socialKicker: "SOCIAL", socialTitle: "Turing Mirror をフォロー", socialText: "新しい診断、プロダクト、プロジェクトの更新を確認できます。" });
function currentCopy() {
  return SITE_COPY[currentLocale] || SITE_COPY.tc;
}

var gateToastTimer = 0;

function segmentText(text) {
  if (window.Intl && typeof window.Intl.Segmenter === "function") {
    return Array.from(new window.Intl.Segmenter(undefined, { granularity: "grapheme" }).segment(text), function (part) {
      return part.segment;
    });
  }

  return Array.from(text);
}

function shuffleItems(items) {
  var clone = items.slice();
  var index;
  var swapIndex;
  var nextValue;

  for (index = clone.length - 1; index > 0; index -= 1) {
    swapIndex = Math.floor(Math.random() * (index + 1));
    nextValue = clone[index];
    clone[index] = clone[swapIndex];
    clone[swapIndex] = nextValue;
  }

  return clone;
}

function nextHeroTypewriterLine() {
  var nextLine;

  if (heroTypewriterState.queue.length === 0) {
    heroTypewriterState.queue = shuffleItems(HERO_TYPEWRITER_LINES);

    if (
      heroTypewriterState.queue.length > 1 &&
      heroTypewriterState.queue[0] === heroTypewriterState.phrase
    ) {
      nextLine = heroTypewriterState.queue[0];
      heroTypewriterState.queue[0] = heroTypewriterState.queue[heroTypewriterState.queue.length - 1];
      heroTypewriterState.queue[heroTypewriterState.queue.length - 1] = nextLine;
    }
  }

  nextLine = heroTypewriterState.queue.shift() || HERO_TYPEWRITER_LINES[0];
  heroTypewriterState.phrase = nextLine;
  return nextLine;
}

function setHeroTypewriterAccessibleText(text) {
  var a11yNode = document.getElementById("hero-typewriter-a11y");

  if (a11yNode) {
    a11yNode.textContent = text;
  }
}

function setHeroTypewriterVisibleText(text) {
  var textNode = document.getElementById("hero-typewriter-text");

  if (textNode) {
    textNode.textContent = text;
  }
}

function fitHeroTypewriter(text) {
  var heading = document.getElementById("hero-typewriter-heading");
  var measure = document.getElementById("hero-typewriter-measure");
  var availableWidth;
  var minSize = 14;
  var maxSize = 84;
  var bestSize = minSize;
  var low;
  var high;
  var mid;

  if (!heading || !measure || !text) {
    return;
  }

  availableWidth = (heading.parentElement ? heading.parentElement.clientWidth : heading.clientWidth) - 24;

  if (availableWidth <= 0) {
    return;
  }

  measure.textContent = text;
  low = minSize;
  high = maxSize;

  while (low <= high) {
    mid = Math.floor((low + high) / 2);
    measure.style.fontSize = mid + "px";

    if (measure.scrollWidth <= availableWidth) {
      bestSize = mid;
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  heading.style.setProperty("--hero-type-size", bestSize + "px");
}

function queueHeroTypewriterFit() {
  window.cancelAnimationFrame(heroTypewriterState.resizeFrame);
  heroTypewriterState.resizeFrame = window.requestAnimationFrame(function () {
    fitHeroTypewriter(heroTypewriterState.phrase || HERO_TYPEWRITER_LINES[0]);
  });
}

function scheduleHeroTypewriter(callback, delay) {
  window.clearTimeout(heroTypewriterState.timer);
  heroTypewriterState.timer = window.setTimeout(callback, delay);
}

function runReducedMotionHeroTypewriter() {
  var nextLine = nextHeroTypewriterLine();

  fitHeroTypewriter(nextLine);
  setHeroTypewriterAccessibleText(nextLine);
  setHeroTypewriterVisibleText(nextLine);
  scheduleHeroTypewriter(runReducedMotionHeroTypewriter, 2600);
}

function runHeroTypewriterCycle() {
  var nextLine = nextHeroTypewriterLine();
  var segments = segmentText(nextLine);
  var visibleCount = 0;

  fitHeroTypewriter(nextLine);
  setHeroTypewriterAccessibleText(nextLine);
  setHeroTypewriterVisibleText("");

  function typeForward() {
    visibleCount += 1;
    setHeroTypewriterVisibleText(segments.slice(0, visibleCount).join(""));

    if (visibleCount < segments.length) {
      scheduleHeroTypewriter(typeForward, 78 + Math.floor(Math.random() * 44));
      return;
    }

    scheduleHeroTypewriter(typeBackward, 1380 + Math.floor(Math.random() * 420));
  }

  function typeBackward() {
    visibleCount -= 1;
    setHeroTypewriterVisibleText(segments.slice(0, visibleCount).join(""));

    if (visibleCount > 0) {
      scheduleHeroTypewriter(typeBackward, 36 + Math.floor(Math.random() * 24));
      return;
    }

    scheduleHeroTypewriter(startHeroTypewriterLoop, 260 + Math.floor(Math.random() * 160));
  }

  scheduleHeroTypewriter(typeForward, 120);
}

function startHeroTypewriterLoop() {
  window.clearTimeout(heroTypewriterState.timer);

  if (reducedMotionQuery && reducedMotionQuery.matches) {
    runReducedMotionHeroTypewriter();
    return;
  }

  runHeroTypewriterCycle();
}

function initHeroTypewriter() {
  var heading = document.getElementById("hero-typewriter-heading");

  if (!heading) {
    return;
  }

  if (heroTypewriterState.running) {
    queueHeroTypewriterFit();
    return;
  }

  heroTypewriterState.running = true;
  fitHeroTypewriter(heroTypewriterState.phrase || HERO_TYPEWRITER_LINES[0]);
  startHeroTypewriterLoop();

  if (window.ResizeObserver) {
    new window.ResizeObserver(queueHeroTypewriterFit).observe(heading.parentElement || heading);
  } else {
    window.addEventListener("resize", queueHeroTypewriterFit);
  }

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(queueHeroTypewriterFit);
  }

  if (reducedMotionQuery) {
    if (typeof reducedMotionQuery.addEventListener === "function") {
      reducedMotionQuery.addEventListener("change", startHeroTypewriterLoop);
    } else if (typeof reducedMotionQuery.addListener === "function") {
      reducedMotionQuery.addListener(startHeroTypewriterLoop);
    }
  }
}

function setMeta(copy) {
  document.title = copy.pageTitle;
  document.documentElement.lang = localeApi.getConfig(currentLocale).htmlLang;
  document.body.dataset.locale = currentLocale;
  document.body.dataset.script = localeApi.getConfig(currentLocale).script;

  document.querySelector('meta[name="description"]').setAttribute("content", copy.metaDescription);
  document.querySelector('meta[property="og:title"]').setAttribute("content", copy.pageTitle);
  document.querySelector('meta[property="og:description"]').setAttribute("content", copy.ogDescription);
}

function renderTextMarquee(trackId, items) {
  var track = document.getElementById(trackId);

  track.innerHTML = "";
  items.concat(items).forEach(function (itemText) {
    var item = document.createElement("span");
    item.className = "marquee-item";
    item.textContent = itemText;
    track.appendChild(item);
  });

  requestAnimationFrame(function () {
    track.style.setProperty("--loop-shift", track.scrollWidth / 2 + "px");
  });
}

function renderLanguageGateButtons() {
  var container = document.getElementById("lang-gate-options");

  if (!container) {
    return;
  }

  container.innerHTML = "";

  localeApi.locales.forEach(function (locale) {
    var button = document.createElement("button");
    button.type = "button";
    button.className = "lang-gate-button" + (locale.code === currentLocale ? " is-current" : "");
    button.textContent = locale.label;
    button.setAttribute("aria-pressed", locale.code === currentLocale ? "true" : "false");
    button.addEventListener("click", function () {
      selectGateLocale(locale.code, button);
    });
    container.appendChild(button);
  });
}

function applyStaticCopy(copy) {
  setMeta(copy);

  document.querySelectorAll("[data-copy]").forEach(function (element) {
    var key = element.getAttribute("data-copy");
    if (copy[key]) {
      element.textContent = copy[key];
    }
  });

  renderTextMarquee("marquee-top-track", copy.marqueeTop);
  renderTextMarquee("marquee-bottom-track", copy.marqueeBottom);
  renderLanguageGateButtons();
}

function buildTests(copy) {
  var animeLive = manifestState.anime && manifestState.anime.synced;
  var galgameLive = manifestState.galgame && manifestState.galgame.synced;
  var bandTiLive = manifestState.bandTi && manifestState.bandTi.synced;
  var bandTiCopy = BAND_TI_COPY[currentLocale] || BAND_TI_COPY.sc;

  return [
    {
      title: copy.tests.anime.title,
      href: animeLive ? manifestState.anime.href : "",
      route: "/anime-summer-2026/",
      source: "2026.07 / TV + FILM",
      repoHref: "https://github.com/Turing-Mirror/Mirror-Test",
      repoName: "github.com/Turing-Mirror/Mirror-Test",
      status: animeLive ? "live" : "pending",
      statusLabel: animeLive ? copy.statusLive : copy.statusWaiting,
      cta: copy.tests.anime.cta,
      description: copy.tests.anime.description,
      note: animeLive ? copy.tests.anime.note : copy.unavailableNote
    },
    {
      title: copy.tests.galgame.title,
      href: galgameLive ? manifestState.galgame.href : "",
      route: "/galgame-test/",
      source: "VN / GALGAME / RESULT LIBRARY",
      repoHref: "https://github.com/Turing-Mirror/Mirror-Test",
      repoName: "github.com/Turing-Mirror/Mirror-Test",
      status: galgameLive ? "live" : "pending",
      statusLabel: galgameLive ? copy.statusLive : copy.statusWaiting,
      cta: copy.tests.galgame.cta,
      description: copy.tests.galgame.description,
      note: galgameLive ? copy.tests.galgame.note : copy.unavailableNote
    },
    {
      title: bandTiCopy.title,
      href: bandTiLive ? manifestState.bandTi.href : "",
      route: "/band-ti/",
      source: "GIRL BAND / 100-QUESTION BANK / 67 CHARACTERS",
      repoHref: "https://github.com/Turing-Mirror/Mirror-Test",
      repoName: "github.com/Turing-Mirror/Mirror-Test",
      status: bandTiLive ? "live" : "pending",
      statusLabel: bandTiLive ? copy.statusLive : copy.statusWaiting,
      cta: bandTiCopy.cta,
      description: bandTiCopy.description,
      note: bandTiLive ? bandTiCopy.note : copy.unavailableNote
    }
  ];
}
function appendTextBlock(parent, className, text) {
  var element = document.createElement("p");
  element.className = className;
  element.textContent = text;
  parent.appendChild(element);
  return element;
}

function copyTextToClipboard(value) {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(value).then(function () { return true; }).catch(function () { return false; });
  }

  var textarea = document.createElement("textarea");
  textarea.value = value;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  var copied = false;

  try {
    copied = document.execCommand("copy");
  } catch {}

  textarea.remove();
  return Promise.resolve(copied);
}

function renderCatalogExtras() {
  var container = document.getElementById("catalog-extras");
  var copy = CATALOG_EXTRAS_COPY[currentLocale] || CATALOG_EXTRAS_COPY.sc;
  var community;
  var communityContent;
  var communityKicker;
  var communityTitle;
  var communityText;
  var communityNumber;
  var communityCopy;
  var communityQr;
  var promotion;
  var promotionContent;
  var promotionKicker;
  var promotionTitle;
  var promotionText;
  var promotionAction;
  var social;
  var socialContent;
  var socialKicker;
  var socialTitle;
  var socialText;
  var socialList;

  if (!container) { return; }

  container.innerHTML = "";
  community = document.createElement("section");
  community.className = "catalog-extra catalog-community";
  communityContent = document.createElement("div");
  communityContent.className = "catalog-extra-content";
  communityKicker = document.createElement("p");
  communityKicker.className = "catalog-extra-kicker";
  communityKicker.textContent = copy.communityKicker;
  communityTitle = document.createElement("h3");
  communityTitle.textContent = copy.communityTitle;
  communityText = document.createElement("p");
  communityText.className = "catalog-extra-text";
  communityText.textContent = copy.communityText;
  communityNumber = document.createElement("strong");
  communityNumber.className = "catalog-community-number";
  communityNumber.textContent = copy.communityNumber;
  communityCopy = document.createElement("button");
  communityCopy.type = "button";
  communityCopy.className = "catalog-community-copy";
  communityCopy.textContent = copy.communityCopy;
  communityCopy.addEventListener("click", function () {
    copyTextToClipboard("1077458748").then(function (copied) {
      communityCopy.textContent = copied ? copy.communityCopied : copy.communityNumber;
      window.setTimeout(function () { communityCopy.textContent = copy.communityCopy; }, 2200);
    });
  });
  communityContent.appendChild(communityKicker);
  communityContent.appendChild(communityTitle);
  communityContent.appendChild(communityText);
  communityContent.appendChild(communityNumber);
  communityContent.appendChild(communityCopy);
  communityQr = document.createElement("img");
  communityQr.className = "catalog-community-qr";
  communityQr.src = "/assets/qq_group.jpg";
  communityQr.alt = copy.communityQrAlt;
  communityQr.loading = "lazy";
  community.appendChild(communityContent);
  community.appendChild(communityQr);

  promotion = document.createElement("section");
  promotion.className = "catalog-extra catalog-promotion";
  promotionContent = document.createElement("div");
  promotionContent.className = "catalog-extra-content";
  promotionKicker = document.createElement("p");
  promotionKicker.className = "catalog-extra-kicker";
  promotionKicker.textContent = copy.promoKicker;
  promotionTitle = document.createElement("h3");
  promotionTitle.textContent = copy.promoTitle;
  promotionText = document.createElement("p");
  promotionText.className = "catalog-extra-text";
  promotionText.textContent = copy.promoText;
  promotionAction = document.createElement("a");
  promotionAction.className = "catalog-promotion-link";
  promotionAction.href = "https://www.rainyun.com/m1rror_?s=RVC-Fabric";
  promotionAction.target = "_blank";
  promotionAction.rel = "noreferrer";
  promotionAction.textContent = copy.promoAction;
  promotionContent.appendChild(promotionKicker);
  promotionContent.appendChild(promotionTitle);
  promotionContent.appendChild(promotionText);
  promotionContent.appendChild(promotionAction);
  promotion.appendChild(promotionContent);

  social = document.createElement("section");
  social.className = "catalog-extra catalog-social";
  socialContent = document.createElement("div");
  socialContent.className = "catalog-extra-content";
  socialKicker = document.createElement("p");
  socialKicker.className = "catalog-extra-kicker";
  socialKicker.textContent = copy.socialKicker;
  socialTitle = document.createElement("h3");
  socialTitle.textContent = copy.socialTitle;
  socialText = document.createElement("p");
  socialText.className = "catalog-extra-text";
  socialText.textContent = copy.socialText;
  socialList = document.createElement("div");
  socialList.className = "catalog-social-list";
  [
    { platform: "哔哩哔哩", account: "@图灵镜", detail: "UID 3546871148579062", href: "https://space.bilibili.com/3546871148579062" },
    { platform: "抖音", account: "@图灵镜", detail: "TuringMirror", href: "https://v.douyin.com/6NxXcrKK9cc" },
    { platform: "小红书", account: "@图灵镜", detail: "TuringMirror", href: "https://www.xiaohongshu.com/user/profile/65f56bf1000000000b00e094" }
  ].forEach(function (item) {
    var link = document.createElement("a");
    var platform = document.createElement("span");
    var account = document.createElement("strong");
    var detail = document.createElement("small");
    link.className = "catalog-social-link";
    link.href = item.href;
    link.target = "_blank";
    link.rel = "noreferrer";
    platform.textContent = item.platform;
    account.textContent = item.account;
    detail.textContent = item.detail + " ↗";
    link.appendChild(platform);
    link.appendChild(account);
    link.appendChild(detail);
    socialList.appendChild(link);
  });
  socialContent.appendChild(socialKicker);
  socialContent.appendChild(socialTitle);
  socialContent.appendChild(socialText);
  social.appendChild(socialContent);
  social.appendChild(socialList);
  container.appendChild(community);
  container.appendChild(promotion);
  container.appendChild(social);
}

function getRandomLiveTest(tests) {
  var liveTests = tests.filter(function (test) {
    return !!test.href;
  });

  if (liveTests.length === 0) {
    return null;
  }

  return liveTests[Math.floor(Math.random() * liveTests.length)];
}

function buildHeroActionLabel(copy, test) {
  if (!test) {
    return copy.heroSecondaryAction;
  }

  if (currentLocale === "ja" && test.cta) {
    return test.cta;
  }

  return (copy.heroSecondaryPrefix || "") + (test.cta || test.title);
}

function updateHeroAction(copy, tests) {
  var action = document.getElementById("hero-random-action");
  var randomTest = getRandomLiveTest(tests);

  if (!action) {
    return;
  }

  if (!randomTest) {
    action.href = "#tests";
    action.textContent = copy.comingSoon;
    return;
  }

  action.href = randomTest.href;
  action.textContent = buildHeroActionLabel(copy, randomTest);
}

function createTestItem(copy, test) {
  var item = document.createElement("article");
  var primary = document.createElement("div");
  var status = document.createElement("span");
  var title = document.createElement("h3");
  var meta = document.createElement("div");
  var repoLink;
  var action = document.createElement("div");
  var actionNode;

  item.className = "test-item";
  primary.className = "test-primary";
  meta.className = "test-meta";
  action.className = "test-action";

  status.className = "test-status " + (test.status === "live" ? "test-status-live" : "test-status-pending");
  status.textContent = test.statusLabel;

  title.className = "test-title";
  title.textContent = test.title;

  primary.appendChild(status);
  primary.appendChild(title);
  appendTextBlock(primary, "test-description", test.description);

  appendTextBlock(meta, "test-route", copy.routeLabel + ": " + test.route);
  appendTextBlock(meta, "test-source", copy.sourceLabel + ": " + test.source);
  appendTextBlock(meta, "test-note", test.note);

  if (test.repoHref && test.repoName) {
    repoLink = document.createElement("a");
    repoLink.className = "test-repo-link";
    repoLink.href = test.repoHref;
    repoLink.target = "_blank";
    repoLink.rel = "noreferrer";
    repoLink.textContent = "GitHub: " + test.repoName;
    meta.appendChild(repoLink);
  }

  if (test.href) {
    actionNode = document.createElement("a");
    actionNode.className = "test-link";
    actionNode.href = test.href;
    actionNode.textContent = copy.openTest;
  } else {
    actionNode = document.createElement("span");
    actionNode.className = "test-link-muted";
    actionNode.textContent = copy.comingSoon;
  }

  action.appendChild(actionNode);
  item.appendChild(primary);
  item.appendChild(meta);
  item.appendChild(action);

  return item;
}

function renderTests() {
  var copy = currentCopy();
  var testList = document.getElementById("test-list");
  var tests = buildTests(copy);

  testList.innerHTML = "";
  tests.forEach(function (test) {
    testList.appendChild(createTestItem(copy, test));
  });
  updateHeroAction(copy, tests);
}

function applyLocale() {
  var copy = currentCopy();

  applyStaticCopy(copy);
  renderTests();
  renderCatalogExtras();
  queueHeroTypewriterFit();
  document.getElementById("lang-select").value = currentLocale;
}

function closeLanguageGate() {
  var gate = document.getElementById("lang-gate");

  if (!gate) {
    return;
  }

  gate.classList.add("is-hidden");
  document.body.classList.remove("lang-gate-open");
}

function showLanguageToast() {
  var toast = document.getElementById("lang-guide-toast");
  var langControl = document.querySelector(".lang-control");

  if (!toast || !langControl) {
    return;
  }

  window.clearTimeout(gateToastTimer);
  toast.classList.add("is-visible");
  langControl.classList.add("is-guided");

  gateToastTimer = window.setTimeout(function () {
    toast.classList.remove("is-visible");
    langControl.classList.remove("is-guided");
  }, 2600);
}

function animateGateGuide(originRect, label) {
  var gate = document.getElementById("lang-gate");
  var langControl = document.querySelector(".lang-control");
  var prefersReducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!gate || !langControl) {
    closeLanguageGate();
    return;
  }

  if (prefersReducedMotion || !originRect) {
    gate.classList.add("is-dismissing");
    window.setTimeout(closeLanguageGate, 360);
    showLanguageToast();
    return;
  }

  var targetRect = langControl.getBoundingClientRect();
  var chip = document.createElement("div");
  var deltaX = targetRect.left + targetRect.width / 2 - (originRect.left + originRect.width / 2);
  var deltaY = targetRect.top + targetRect.height / 2 - (originRect.top + originRect.height / 2);

  chip.className = "lang-fly-chip";
  chip.textContent = label;
  chip.style.left = originRect.left + originRect.width / 2 + "px";
  chip.style.top = originRect.top + originRect.height / 2 + "px";
  document.body.appendChild(chip);

  requestAnimationFrame(function () {
    gate.classList.add("is-dismissing");
    chip.style.transform = "translate(calc(-50% + " + deltaX + "px), calc(-50% + " + deltaY + "px)) scale(0.76)";
    chip.style.opacity = "0.16";
    showLanguageToast();
  });

  window.setTimeout(function () {
    chip.remove();
    closeLanguageGate();
  }, 1360);
}

function selectGateLocale(localeCode, button) {
  var originRect = button ? button.getBoundingClientRect() : null;
  var label = button ? button.textContent : "";

  currentLocale = localeApi.setLocale(localeCode);
  applyLocale();
  animateGateGuide(originRect, label);
}

function initLanguageGate(shouldOpen) {
  var gate = document.getElementById("lang-gate");

  if (!gate) {
    return false;
  }

  if (shouldOpen) {
    gate.classList.remove("is-hidden", "is-dismissing");
    document.body.classList.add("lang-gate-open");
    return true;
  }

  gate.classList.add("is-hidden");
  document.body.classList.remove("lang-gate-open");
  return false;
}

function initLanguageSelect() {
  var select = document.getElementById("lang-select");

  localeApi.locales.forEach(function (locale) {
    var option = document.createElement("option");
    option.value = locale.code;
    option.textContent = locale.label;
    select.appendChild(option);
  });

  select.value = currentLocale;
  select.addEventListener("change", function () {
    currentLocale = localeApi.setLocale(select.value);
    applyLocale();
  });
}

async function loadManifestState() {
  try {
    var response = await fetch("/tests-manifest.json", { cache: "no-store" });

    if (!response.ok) {
      throw new Error("Manifest request failed");
    }

    var manifest = await response.json();
    var syncedAnime = manifest.tests.find(function (test) {
      return test.slug === "anime-summer-2026";
    });
    var syncedGalgame = manifest.tests.find(function (test) {
      return test.slug === "galgame-test";
    });
    var syncedBandTi = manifest.tests.find(function (test) {
      return test.slug === "band-ti";
    });

    if (!syncedAnime && !syncedGalgame && !syncedBandTi) {
      return;
    }

    manifestState = {
      anime: {
        synced: !!(syncedAnime && syncedAnime.synced),
        href: (syncedAnime && syncedAnime.href) || "/anime-summer-2026/"
      },
      galgame: {
        synced: !!(syncedGalgame && syncedGalgame.synced),
        href: (syncedGalgame && syncedGalgame.href) || "/galgame-test/"
      },
      bandTi: {
        synced: !!(syncedBandTi && syncedBandTi.synced),
        href: (syncedBandTi && syncedBandTi.href) || "/band-ti/"
      }
    };
  } catch {}
}
function init() {
  initLanguageSelect();
  applyLocale();
  initHeroTypewriter();
  initLanguageGate(localeApi.shouldShowLanguageGate());
  loadManifestState().then(renderTests);
}

if (window.MirrorTestRuntime && window.MirrorTestRuntime.ensureFresh) {
  window.MirrorTestRuntime.ensureFresh().then(function (ready) {
    if (ready) {
      init();
    }
  });
} else {
  init();
}
