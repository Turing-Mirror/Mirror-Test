import { useEffect, useMemo, useRef, useState } from "react";
import { archetypeCopy, catalogSummary, characters } from "./data/characters.js";
import { getWikiLink } from "./data/wiki.js";
import { BandLocaleProvider, LanguageSelect, useBandLocale } from "./locale.jsx";
import { QUESTION_COUNT, createQuestionSet, questionBank } from "./data/questions.js";
import { createQuizResult } from "./data/results.js";
import { createHeroCharacterGroups, HERO_ROTATION_DELAY } from "./data/hero-roster.js";

const traitDetails = [
  { label: "行动", summary: "你会先让事情动起来，把犹豫变成现场能回应的第一步。" },
  { label: "共鸣", summary: "你会先听见人与人之间的情绪，并让每个人有被接住的空间。" },
  { label: "专注", summary: "你相信细节会留下声音，也愿意把重要的部分耐心打磨到位。" },
  { label: "直觉", summary: "你会跟着好奇心寻找新的方向，让意外成为创作与关系的入口。" },
  { label: "坚定", summary: "你会为真正认定的事情持续用力，在逆风里也不轻易松手。" },
];
const traitLabels = traitDetails.map((trait) => trait.label);
const QQ_GROUP_ID = "1077458748";
const communityQrUrl = import.meta.env.BASE_URL + "assets/qq_group.jpg";
const otherTests = [
  { id: "anime", href: "/anime-summer-2026/", titleKey: "otherTestAnimeTitle", copyKey: "otherTestAnimeCopy", index: "02" },
  { id: "galgame", href: "/galgame-test/", titleKey: "otherTestGalgameTitle", copyKey: "otherTestGalgameCopy", index: "03" },
];
const socialLinks = [
  { platform: "哔哩哔哩", handle: "@图灵镜", detail: "UID 3546871148579062", href: "https://space.bilibili.com/3546871148579062" },
  { platform: "抖音", handle: "@图灵镜", detail: "抖音号 TuringMirror", href: "https://v.douyin.com/6NxXcrKK9cc" },
  { platform: "小红书", handle: "@图灵镜", detail: "小红书号 TuringMirror", href: "https://www.xiaohongshu.com/user/profile/65f56bf1000000000b00e094" },
];

function createSessionSeed() {
  return Math.floor(Math.random() * 0x100000000);
}

function createQuizSession() {
  return {
    questionSeed: createSessionSeed(),
    resultSeed: createSessionSeed(),
  };
}

function scrollToSection(id) {
  const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
  document.getElementById(id)?.scrollIntoView({ behavior, block: "start" });
}

function getPublicQuizUrl() {
  if (typeof window === "undefined") {
    return "";
  }

  return new URL(import.meta.env.BASE_URL, window.location.origin).toString();
}

async function copyText(text) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {}

  try {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.append(textarea);
    textarea.select();
    const copied = document.execCommand("copy");
    textarea.remove();
    return copied;
  } catch {
    return false;
  }
}

function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);
    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  return prefersReducedMotion;
}

function Header({ onStart }) {
  const { t } = useBandLocale();

  return (
    <header className="site-header">
      <button className="wordmark" type="button" onClick={() => scrollToSection("top")}>
        <span>GIRL BAND</span>
        <strong>角色测试</strong>
      </button>
      <nav aria-label="页面导航">
        <button type="button" onClick={() => scrollToSection("about")}>{t("about")}</button>
        <button type="button" onClick={() => scrollToSection("gallery")}>{t("library")}</button>
        <a className="nav-home" href="/">{t("moreTests")}</a>
        <button className="nav-start" type="button" onClick={onStart}>{t("start")}</button>
        <LanguageSelect />
      </nav>
    </header>
  );
}

function StatBlock() {
  return (
    <dl className="hero-stats" aria-label="题库规模">
      <div>
        <dt>角色候选</dt>
        <dd>{catalogSummary.characters}</dd>
      </div>
      <div>
        <dt>乐队与组合</dt>
        <dd>{catalogSummary.bands}</dd>
      </div>
      <div>
        <dt>题库问题</dt>
        <dd>{questionBank.length}</dd>
      </div>
    </dl>
  );
}

function HeroStageCard({ character, index }) {
  const [orientation, setOrientation] = useState("portrait");

  function updateOrientation(event) {
    const { naturalWidth, naturalHeight } = event.currentTarget;
    setOrientation(naturalWidth > naturalHeight ? "landscape" : "portrait");
  }

  return (
    <a
      className={`hero-stage-card hero-stage-card-${index} hero-stage-card-${orientation}`}
      href={getWikiLink(character) || character.officialUrl}
      target="_blank"
      rel="noreferrer"
      style={{ "--roster-delay": `${index * 90}ms` }}
      aria-label={`${character.name} · ${character.band}`}
    >
      <img decoding="async" fetchPriority={index === 0 ? "high" : "auto"} src={character.image} alt={`${character.name}，${character.band}`} onLoad={updateOrientation} />
      <span className="hero-stage-card-meta">
        <strong>{character.name}</strong>
        <small>{character.band}</small>
      </span>
    </a>
  );
}

function createHeroRoster(round = 1) {
  return {
    activeGroup: 0,
    groups: createHeroCharacterGroups(),
    round,
  };
}

function advanceHeroRoster(current) {
  const nextGroup = current.activeGroup + 1;
  if (nextGroup < current.groups.length) {
    return { ...current, activeGroup: nextGroup };
  }

  return createHeroRoster(current.round + 1);
}

function HeroArt() {
  const [roster, setRoster] = useState(createHeroRoster);
  const [isPaused, setIsPaused] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const { t } = useBandLocale();
  const { activeGroup, groups: heroCharacterGroups, round } = roster;
  const rotationStopped = prefersReducedMotion || isPaused || isHovering;
  const currentCharacters = heroCharacterGroups[activeGroup];

  function showNextGroup() {
    setRoster(advanceHeroRoster);
  }

  function showPreviousGroup() {
    setRoster((current) => ({
      ...current,
      activeGroup: (current.activeGroup - 1 + current.groups.length) % current.groups.length,
    }));
  }

  useEffect(() => {
    if (rotationStopped) return undefined;
    const rotationTimer = window.setInterval(() => setRoster(advanceHeroRoster), HERO_ROTATION_DELAY);
    return () => window.clearInterval(rotationTimer);
  }, [rotationStopped]);

  useEffect(() => {
    const upcomingCharacters = heroCharacterGroups[(activeGroup + 1) % heroCharacterGroups.length];
    upcomingCharacters.forEach((character) => {
      const upcomingImage = new Image();
      upcomingImage.src = character.image;
    });
  }, [activeGroup, heroCharacterGroups]);

  return (
    <div
      className="hero-art"
      role="region"
      aria-roledescription="carousel"
      aria-label={t("rosterLabel")}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="art-note art-note-top">GIRL BAND ANIME / {catalogSummary.characters} CHARACTERS</div>
      <div className="art-note art-note-bottom">YOUR SOUND / YOUR STORY</div>
      <div className={`hero-stage hero-stage-count-${currentCharacters.length}`} key={[round, activeGroup].join("-")}>
        {currentCharacters.map((character, index) => <HeroStageCard character={character} index={index} key={character.id} />)}
      </div>
      <div className="art-controls" aria-label={t("rosterLabel")}>
        <p className="art-counter" aria-hidden="true">{t("rosterCount", { current: activeGroup + 1, total: heroCharacterGroups.length, count: currentCharacters.length })}</p>
        <div className="art-control-buttons">
          <button className="art-control" type="button" onClick={showPreviousGroup}>{t("rosterPrevious")}</button>
          <button className="art-control art-control-next" type="button" onClick={showNextGroup}>{t("rosterNext")}</button>
          {!prefersReducedMotion && (
            <button className="art-control art-control-pause" type="button" aria-pressed={isPaused} onClick={() => setIsPaused((current) => !current)}>
              {isPaused ? t("rosterResume") : t("rosterPause")}
            </button>
          )}
        </div>
      </div>
      <p className="screen-reader-text" aria-live="polite" aria-atomic="true">
        {t("rosterLive", { current: activeGroup + 1, names: currentCharacters.map((character) => character.name).join("、") })}
      </p>
    </div>
  );
}

function SocialLinks({ className = "" }) {
  const { t } = useBandLocale();

  return (
    <section className={`social-links ${className}`.trim()} aria-labelledby="social-links-title">
      <div className="social-links-copy">
        <p className="eyebrow">TURING MIRROR / SOCIAL</p>
        <h2 id="social-links-title">{t("socialTitle")}</h2>
        <p>{t("socialCopy")}</p>
      </div>
      <div className="social-link-list">
        {socialLinks.map((social) => (
          <a className="social-link" href={social.href} key={social.platform} target="_blank" rel="noreferrer">
            <span>{social.platform}</span>
            <strong>{social.handle}</strong>
            <small>{social.detail} ↗</small>
          </a>
        ))}
      </div>
    </section>
  );
}

function MoreTestsShowcase() {
  const { t } = useBandLocale();

  return (
    <section className="more-tests-section" id="more-tests" aria-labelledby="more-tests-title">
      <div className="more-tests-heading">
        <p className="eyebrow">MIRROR-TEST / DISCOVER</p>
        <h2 id="more-tests-title">{t("moreTestsTitle")}</h2>
        <p>{t("moreTestsCopy")}</p>
      </div>
      <div className="more-tests-grid">
        {otherTests.map((test) => (
          <a className="more-test-card" href={test.href} key={test.id}>
            <span>NO. {test.index}</span>
            <strong>{t(test.titleKey)}</strong>
            <p>{t(test.copyKey)}</p>
            <b>{t("moreTestsGo")}</b>
          </a>
        ))}
        <a className="more-tests-directory" href="/">
          <span>TEST.TURINGMIRROR.COM</span>
          <strong>{t("moreTests")}</strong>
          <p>{t("moreTestsDirectoryCopy")}</p>
          <b>{t("moreTestsGo")}</b>
        </a>
      </div>
    </section>
  );
}

function Gallery() {
  const [band, setBand] = useState("全部角色");
  const { t } = useBandLocale();
  const bands = useMemo(() => ["全部角色", ...new Set(characters.map((character) => character.band))], []);
  const shownCharacters = band === "全部角色" ? characters : characters.filter((character) => character.band === band);

  return (
    <section className="gallery-section" id="gallery" aria-labelledby="gallery-title">
      <div className="section-heading">
        <p className="eyebrow">CHARACTER LIBRARY</p>
        <h2 id="gallery-title">{t("galleryTitle", { characters: catalogSummary.characters })}</h2>
        <p>{t("galleryCopy", { series: catalogSummary.series, bands: catalogSummary.bands })}</p>
      </div>
      <label className="band-filter">
        <span>{t("bandFilter")}</span>
        <select value={band} onChange={(event) => setBand(event.target.value)}>
          {bands.map((item) => <option key={item} value={item}>{item}</option>)}
        </select>
      </label>
      <div className="character-grid">
        {shownCharacters.map((character) => (
          <a className="character-card character-card-link" href={getWikiLink(character) || character.officialUrl} key={character.id} target="_blank" rel="noreferrer" aria-label={`${character.name} · ${t("wiki")}`}>
            <div className="character-card-image"><img loading="lazy" src={character.image} alt={character.name} /></div>
            <div className="character-card-copy">
              <p>{character.series}</p>
              <h3>{character.name}</h3>
              <span>{character.band} · {character.role}</span>
              <small>{t("wiki")} ↗</small>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

function Home({ onStart }) {
  const { t } = useBandLocale();

  return (
    <>
      <section className="hero" id="top">
        <Header onStart={onStart} />
        <div className="hero-content">
          <div className="hero-copy">
            <p className="eyebrow">NO. 01 / GIRL BAND CHARACTER QUIZ</p>
            <h1><span>{t("heroTitleA")}</span><span>{t("heroTitleB")}</span><span>{t("heroTitleC")}</span></h1>
            <p className="hero-lede">{t("heroLead", { total: questionBank.length, count: QUESTION_COUNT })}</p>
            <div className="hero-actions">
              <button className="primary-button" type="button" onClick={onStart}>{t("start")} · {QUESTION_COUNT} 题</button>
              <a className="hero-more-tests-button" href="/"><span>MORE TESTS</span><strong>{t("moreTests")}</strong><small>{t("moreTestsAction")}</small></a>
            </div>
            <button className="text-button hero-library-link" type="button" onClick={() => scrollToSection("gallery")}>{t("library")}</button>
            <StatBlock />
          </div>
          <HeroArt />
        </div>
      </section>
      <MoreTestsShowcase />
      <SocialLinks />
      <section className="about-section" id="about" aria-labelledby="about-title">
        <div className="about-number">01</div>
        <div><p className="eyebrow">HOW IT WORKS</p><h2 id="about-title">不是贴标签，而是一次为当下心情留存的乐队选曲。</h2></div>
        <div className="about-copy"><p>测试把每一道题的选择映射为行动、共鸣、专注、直觉与坚定五种倾向，并与本地角色库中的角色特征进行匹配。</p><p>结果仅供娱乐，不代表真实人格判断。角色名称、作品与图片的权利归各官方权利方所有。</p></div>
      </section>
      <Gallery />
      <footer className="site-footer"><p>GIRL BAND CHARACTER QUIZ</p><p>非官方粉丝向测试。图片来源见各作品官方角色页。</p><a className="footer-more-tests" href="/"><span>MORE TESTS</span><strong>{t("footerMoreTests")}</strong><small>{t("moreTestsAction")}</small></a></footer>
    </>
  );
}

function Quiz({ questionIndex, questions, onAnswer, onBack, onExit }) {
  const question = questions[questionIndex];
  const progress = ((questionIndex + 1) / questions.length) * 100;
  const { t } = useBandLocale();

  return (
    <main className="quiz-page">
      <header className="quiz-header">
        <button className="wordmark inverse-wordmark" type="button" onClick={onExit}><span>GIRL BAND</span><strong>角色测试</strong></button>
        <div className="header-meta"><a className="header-home-link" href="/">{t("moreTests")}</a><LanguageSelect /><p>{t("quizProgress", { current: String(questionIndex + 1).padStart(2, "0"), total: questions.length })}</p></div>
      </header>
      <div className="progress-track" aria-label={t("quizProgress", { current: questionIndex + 1, total: questions.length })}><span style={{ width: progress + "%" }} /></div>
      <section className="question-wrap" aria-labelledby="question-title">
        <p className="question-index">QUESTION {String(questionIndex + 1).padStart(2, "0")}</p><h1 id="question-title">{question.prompt}</h1>
        <div className="answer-list">{question.options.map((option, index) => <button className="answer-button" key={option.label} type="button" onClick={() => onAnswer(option.values)}><span>{String.fromCharCode(65 + index)}</span><strong>{option.label}</strong></button>)}</div>
        <button className="quiz-back-button" type="button" disabled={questionIndex === 0} onClick={onBack}>{t("quizBack")}</button>
      </section>
      <div className="quiz-outro"><SocialLinks className="quiz-social-links" /><p className="quiz-note">{t("quizNote", { total: questionBank.length })}</p></div>
    </main>
  );
}

function waitForPosterImages(node) {
  const images = [...node.querySelectorAll("img")];

  return Promise.all(
    images.map((image) => {
      if (image.complete && image.naturalWidth > 0) {
        return Promise.resolve();
      }

      return new Promise((resolve, reject) => {
        image.addEventListener("load", resolve, { once: true });
        image.addEventListener("error", () => reject(new Error("poster-image-load-failed")), { once: true });
      });
    }),
  );
}

function canvasToBlob(canvas) {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob);
        return;
      }
      reject(new Error("poster-blob-empty"));
    }, "image/png");
  });
}

function ResultPoster({ character, result, archetype, primaryTrait, secondaryTrait, qrCodeDataUrl, posterRef }) {
  const { t } = useBandLocale();

  return (
    <article className="result-poster" ref={posterRef}>
      <div className="result-poster-topline"><span>MIRROR-TEST / BAND-TI</span><span>YOUR SOUND MATCH</span></div>
      <div className="result-poster-main">
        <div className="result-poster-image"><img src={character.image} alt="" /></div>
        <div className="result-poster-copy"><p>你的角色结果</p><h2>{character.name}</h2><span>{character.series}</span><strong>{character.band}</strong><div className="result-poster-score"><b>{result.matchPercent}</b><span>% {t("score")}</span></div><div className="result-poster-traits"><span>{archetype.title}</span><span>{primaryTrait.label} · {secondaryTrait.label}</span></div></div>
      </div>
      <div className="result-poster-footer">
        <div><p>STAGE DOSSIER</p><strong>{character.role}</strong><span>{result.questionCount} 个选择 · {catalogSummary.characters} 名角色库</span></div>
        <div className="result-poster-codes"><div className="result-poster-qr"><img src={qrCodeDataUrl} alt="" /><span>{t("testQr")}</span></div><div className="result-poster-qr result-poster-community"><img src={communityQrUrl} alt="" /><span>QQ {QQ_GROUP_ID}</span></div></div>
      </div>
    </article>
  );
}

function Result({ result, onRestart, onHome }) {
  const { t } = useBandLocale();
  const character = result.ranked[0];
  const closeMatches = result.ranked.slice(1, 5);
  const contrastMatches = result.ranked.slice(-2).reverse();
  const archetype = archetypeCopy[character.archetype];
  const total = Math.max(...result.traitScore, 1);
  const primaryTrait = result.traitRanking[0];
  const secondaryTrait = result.traitRanking[1];
  const resultTags = [`#${archetype.title}`, `#${primaryTrait.label}主声部`, `#${secondaryTrait.label}副声部`, `#${character.role.replace(/\s*\/\s*/g, "·")}`];
  const shareUrl = useMemo(() => getPublicQuizUrl(), []);
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState("");
  const [exportMode, setExportMode] = useState("idle");
  const [exportError, setExportError] = useState("");
  const [posterPreviewUrl, setPosterPreviewUrl] = useState("");
  const [communityCopied, setCommunityCopied] = useState(false);
  const posterRef = useRef(null);
  const posterCache = useRef({ key: "", blob: null });

  useEffect(() => {
    let isCurrent = true;
    import("qrcode")
      .then(({ default: QRCode }) => QRCode.toDataURL(shareUrl, { errorCorrectionLevel: "M", margin: 1, width: 220, color: { dark: "#171411", light: "#fffdf8" } }))
      .then((url) => { if (isCurrent) setQrCodeDataUrl(url); })
      .catch(() => { if (isCurrent) setQrCodeDataUrl(""); });
    return () => { isCurrent = false; };
  }, [shareUrl]);

  useEffect(() => {
    if (!posterPreviewUrl) return undefined;
    return () => window.URL.revokeObjectURL(posterPreviewUrl);
  }, [posterPreviewUrl]);

  useEffect(() => {
    if (!posterPreviewUrl) return undefined;
    const closeOnEscape = (event) => { if (event.key === "Escape") setPosterPreviewUrl(""); };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [posterPreviewUrl]);

  function scorePercent(item) {
    return Math.round((item.score / result.maximumScore) * 100);
  }

  async function copyCommunityGroup() {
    let copied = false;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(QQ_GROUP_ID);
        copied = true;
      }
    } catch {}
    if (!copied) {
      try {
        const textarea = document.createElement("textarea");
        textarea.value = QQ_GROUP_ID;
        textarea.setAttribute("readonly", "");
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.append(textarea);
        textarea.select();
        copied = document.execCommand("copy");
        textarea.remove();
      } catch {}
    }
    if (copied) {
      setCommunityCopied(true);
      window.setTimeout(() => setCommunityCopied(false), 1800);
    }
  }

  async function buildPosterBlob() {
    const cacheKey = `${character.id}:${result.matchPercent}:${result.questionCount}`;
    if (posterCache.current.key === cacheKey && posterCache.current.blob) return posterCache.current.blob;
    if (!posterRef.current || !qrCodeDataUrl) throw new Error("poster-not-ready");
    await waitForPosterImages(posterRef.current);
    if (document.fonts?.ready) await document.fonts.ready;
    const { default: html2canvas } = await import("html2canvas");
    const canvas = await html2canvas(posterRef.current, {
      backgroundColor: "#f5f0e6", scale: 2, useCORS: true, logging: false,
      width: posterRef.current.scrollWidth, height: posterRef.current.scrollHeight,
      windowWidth: posterRef.current.scrollWidth, windowHeight: posterRef.current.scrollHeight,
    });
    const blob = await canvasToBlob(canvas);
    posterCache.current = { key: cacheKey, blob };
    return blob;
  }

  async function savePoster() {
    setExportMode("saving");
    setExportError("");
    try {
      const blob = await buildPosterBlob();
      const url = window.URL.createObjectURL(blob);
      const download = document.createElement("a");
      download.href = url;
      download.download = `band-ti-${character.id}-result.png`;
      download.click();
      window.setTimeout(() => window.URL.revokeObjectURL(url), 1000);
    } catch {
      setExportError(t("posterError"));
    } finally {
      setExportMode("idle");
    }
  }

  async function previewPoster() {
    setExportMode("previewing");
    setExportError("");
    try {
      const blob = await buildPosterBlob();
      setPosterPreviewUrl(window.URL.createObjectURL(blob));
    } catch {
      setExportError(t("posterError"));
    } finally {
      setExportMode("idle");
    }
  }

  return (
    <main className="result-page">
      <header className="result-header">
        <button className="wordmark" type="button" onClick={onHome}><span>GIRL BAND</span><strong>角色测试</strong></button>
        <div className="header-meta"><a className="header-home-link" href="/">{t("moreTests")}</a><LanguageSelect /><p>{t("resultTitle")}</p></div>
      </header>
      <section className="result-hero" aria-labelledby="result-name">
        <a className="result-image-frame result-image-wiki" href={getWikiLink(character) || character.officialUrl} target="_blank" rel="noreferrer" aria-label={`${character.name} · ${t("resultWiki")}`}><img src={character.image} alt={character.name} /><span>{t("resultWiki")} ↗</span></a>
        <div className="result-copy">
          <p className="eyebrow">YOUR RESULT / {archetype.title}</p><h1 id="result-name">{character.name}</h1>
          <p className="result-meta">{character.series} · {character.band} · {character.role}</p>
          <p className="result-description">{archetype.description}</p><p className="result-detail">这轮 {result.questionCount} 个选择里，{primaryTrait.summary} 同时，{secondaryTrait.summary}</p>
          <div className="result-score-dossier"><div className="result-score-card"><span>{t("score")}</span><strong>{result.matchPercent}<small>%</small></strong><p>与 {character.name} 的特质向量计算得出</p></div><dl className="result-dossier-list"><div><dt>作品</dt><dd>{character.series}</dd></div><div><dt>乐队</dt><dd>{character.band}</dd></div><div><dt>担任</dt><dd>{character.role}</dd></div></dl></div>
          <div className="result-actions"><button className="primary-button" type="button" onClick={onRestart}>{t("retry")}</button><a className="text-button external-link" href={character.officialUrl} target="_blank" rel="noreferrer">{t("official")}</a><a className="text-button external-link" href={getWikiLink(character) || character.officialUrl} target="_blank" rel="noreferrer">{t("resultWiki")}</a></div>
          <a className="result-more-tests-cta" href="/"><span>MIRROR-TEST / MORE</span><strong>{t("moreTests")}</strong><small>{t("resultMoreTestsCopy")}</small></a>
        </div>
      </section>
      <section className="result-lower">
        <div className="trait-panel"><p className="eyebrow">YOUR SOUND MAP</p><h2>你的声音图谱</h2><div className="trait-list">{result.traitScore.map((score, index) => <div className="trait-row" key={traitLabels[index]}><span>{traitLabels[index]}</span><div aria-label={traitLabels[index] + " " + score}><i style={{ width: Math.max(12, (score / total) * 100) + "%" }} /></div><strong>{score}</strong></div>)}</div><div className="trait-summary"><p><strong>主声部：{primaryTrait.label}</strong>{primaryTrait.summary}</p><p><strong>副声部：{secondaryTrait.label}</strong>{secondaryTrait.summary}</p></div><div className="result-keywords" aria-label="本次结果关键词">{resultTags.map((tag) => <span key={tag}>{tag}</span>)}</div></div>
        <div className="nearby-panel"><p className="eyebrow">ALSO CLOSE</p><h2>同样靠近你的四种声音</h2><div className="nearby-list">{closeMatches.map((item) => <a className="nearby-match" href={getWikiLink(item) || item.officialUrl} key={item.id} target="_blank" rel="noreferrer" aria-label={`${item.name} · ${t("wiki")}`}><img src={item.image} alt={item.name} /><div><h3>{item.name}</h3><p>{item.band}</p><span>共鸣 {scorePercent(item)}% · Wiki ↗</span></div></a>)}</div><div className="contrast-panel"><p>另一种可能</p><strong>这轮较少出现的两种声线</strong><div>{contrastMatches.map((item) => <a href={getWikiLink(item) || item.officialUrl} key={item.id} target="_blank" rel="noreferrer">{item.name} · {item.band}</a>)}</div></div></div>
      </section>
      <section className="result-share-section" aria-labelledby="share-title">
        <div className="result-share-copy"><p className="eyebrow">RESULT POSTER</p><h2 id="share-title">{t("posterTitle")}</h2><p>{t("posterCopy")}</p><div className="result-share-actions"><button className="primary-button" type="button" disabled={!qrCodeDataUrl || exportMode !== "idle"} onClick={savePoster}>{exportMode === "saving" ? t("posterSaving") : t("posterDownload")}</button><button className="text-button" type="button" disabled={!qrCodeDataUrl || exportMode !== "idle"} onClick={previewPoster}>{exportMode === "previewing" ? t("posterPreviewing") : t("posterPreview")}</button></div>{exportError && <p className="result-export-error" role="alert">{exportError}</p>}</div>
        <div className="result-share-asides"><aside className="result-qr-card"><div className="result-qr-image">{qrCodeDataUrl ? <img src={qrCodeDataUrl} alt={t("testQr")} /> : <span>二维码生成中</span>}</div><div><p>{t("testQr")}</p><span>{shareUrl.replace(/^https?:\/\//, "")}</span></div></aside><aside className="result-community-card"><img src={communityQrUrl} alt={t("communityTitle")} /><div><p>{t("communityTitle")}</p><strong>{QQ_GROUP_ID}</strong><span>{t("communityHint")}</span><button type="button" onClick={copyCommunityGroup}>{communityCopied ? t("communityCopied") : t("communityCopy")}</button></div></aside></div>
      </section>
      <SocialLinks className="result-social-links" />
      <div className="result-poster-capture" aria-hidden="true"><ResultPoster character={character} result={result} archetype={archetype} primaryTrait={primaryTrait} secondaryTrait={secondaryTrait} qrCodeDataUrl={qrCodeDataUrl} posterRef={posterRef} /></div>
      {posterPreviewUrl && <div className="poster-preview" role="dialog" aria-modal="true" aria-labelledby="poster-preview-title"><button className="poster-preview-backdrop" type="button" aria-label={t("close")} onClick={() => setPosterPreviewUrl("")} /><div className="poster-preview-panel"><div className="poster-preview-head"><div><p id="poster-preview-title">{t("previewTitle")}</p><span>{t("previewHint")}</span></div><button className="poster-preview-close" type="button" onClick={() => setPosterPreviewUrl("")}>{t("close")}</button></div><img src={posterPreviewUrl} alt={`${character.name} 的少女乐队角色测试结果图`} /></div></div>}
      <footer className="site-footer result-footer"><p>本测试仅供娱乐。角色与图片的权利归各官方权利方所有。</p><a className="footer-more-tests" href="/"><span>MORE TESTS</span><strong>{t("footerMoreTests")}</strong><small>{t("moreTestsAction")}</small></a></footer>
    </main>
  );
}

function BandTiApp() {
  const [view, setView] = useState("home");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [quizSession, setQuizSession] = useState(createQuizSession);
  const [quizQuestions, setQuizQuestions] = useState(() => createQuestionSet(quizSession.questionSeed));
  const result = useMemo(() => {
    if (answers.length !== quizQuestions.length) {
      return null;
    }

    const quizResult = createQuizResult(answers, quizSession.resultSeed);
    const traitRanking = quizResult.traitScore
      .map((score, index) => ({ ...traitDetails[index], score, index }))
      .sort((first, second) => second.score - first.score || first.index - second.index);

    return { ...quizResult, traitRanking };
  }, [answers, quizQuestions, quizSession.resultSeed]);

  function startQuiz() {
    const nextSession = createQuizSession();
    setQuizSession(nextSession);
    setQuizQuestions(createQuestionSet(nextSession.questionSeed));
    setAnswers([]);
    setQuestionIndex(0);
    setView("quiz");
    window.scrollTo(0, 0);
  }

  function handleAnswer(values) {
    const nextAnswers = [...answers, values];
    setAnswers(nextAnswers);
    if (questionIndex + 1 === quizQuestions.length) {
      setView("result");
      window.scrollTo(0, 0);
      return;
    }
    setQuestionIndex((index) => index + 1);
  }

  function goBack() {
    if (questionIndex === 0) {
      return;
    }

    setAnswers((current) => current.slice(0, -1));
    setQuestionIndex((index) => index - 1);
  }

  function goHome() {
    setView("home");
    window.scrollTo(0, 0);
  }

  if (view === "quiz") {
    return (
      <Quiz
        questionIndex={questionIndex}
        questions={quizQuestions}
        onAnswer={handleAnswer}
        onBack={goBack}
        onExit={goHome}
      />
    );
  }

  if (view === "result" && result) {
    return <Result result={result} onRestart={startQuiz} onHome={goHome} />;
  }

  return <Home onStart={startQuiz} />;
}

export function App() {
  return <BandLocaleProvider><BandTiApp /></BandLocaleProvider>;
}
