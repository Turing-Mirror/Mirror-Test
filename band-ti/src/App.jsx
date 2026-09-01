import { useEffect, useMemo, useRef, useState } from "react";
import { archetypeCopy, catalogSummary, characters } from "./data/characters.js";
import { QUESTION_COUNT, createQuestionSet, questionBank } from "./data/questions.js";

const traitDetails = [
  { label: "行动", summary: "你会先让事情动起来，把犹豫变成现场能回应的第一步。" },
  { label: "共鸣", summary: "你会先听见人与人之间的情绪，并让每个人有被接住的空间。" },
  { label: "专注", summary: "你相信细节会留下声音，也愿意把重要的部分耐心打磨到位。" },
  { label: "直觉", summary: "你会跟着好奇心寻找新的方向，让意外成为创作与关系的入口。" },
  { label: "坚定", summary: "你会为真正认定的事情持续用力，在逆风里也不轻易松手。" },
];
const traitLabels = traitDetails.map((trait) => trait.label);
const heroCharacterIds = [
  "gbc-nina",
  "poppa-kasumi",
  "rocklady-lilisa",
  "mujica-uika",
  "mygo-tomori",
  "bocchi-ikuyo",
  "jelee-kano",
  "roselia-yukina",
  "kon-yui",
  "gbc-momoka",
  "paspale-aya",
  "morfonica-mashiro",
];
const heroCharacterDeck = heroCharacterIds
  .map((id) => characters.find((character) => character.id === id))
  .filter(Boolean);
const heroCharacterGroups = Array.from(
  { length: Math.ceil(heroCharacterDeck.length / 3) },
  (_, index) => heroCharacterDeck.slice(index * 3, index * 3 + 3),
);
const heroCardSlots = [
  { className: "art-photo-one", label: "主舞台" },
  { className: "art-photo-two", label: "开场角色" },
  { className: "art-photo-three", label: "档案预览" },
];
const heroRotationDelay = 5200;

function getResult(answers) {
  const traitScore = answers.reduce(
    (total, values) => total.map((value, index) => value + values[index]),
    [0, 0, 0, 0, 0],
  );
  const seed = answers.flat().reduce((total, value, index) => total + value * (index + 3), 0);
  const maximumScore = Math.max(
    traitScore.reduce((total, score) => total + score * 5, 0),
    1,
  );
  const ranked = characters.map((character) => ({
    ...character,
    score: character.profile.reduce((total, value, index) => total + value * traitScore[index], 0),
  })).sort((a, b) => {
    const aScore = a.score;
    const bScore = b.score;
    if (bScore !== aScore) {
      return bScore - aScore;
    }
    const aTie = (a.id.length * 17 + seed) % 19;
    const bTie = (b.id.length * 17 + seed) % 19;
    return bTie - aTie;
  });
  const traitRanking = traitScore
    .map((score, index) => ({ ...traitDetails[index], score, index }))
    .sort((a, b) => b.score - a.score || a.index - b.index);
  const matchPercent = Math.max(1, Math.min(100, Math.round((ranked[0].score / maximumScore) * 100)));

  return { traitScore, ranked, maximumScore, matchPercent, traitRanking, questionCount: answers.length };
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
  return (
    <header className="site-header">
      <button className="wordmark" type="button" onClick={() => scrollToSection("top")}>
        <span>GIRL BAND</span>
        <strong>角色测试</strong>
      </button>
      <nav aria-label="页面导航">
        <button type="button" onClick={() => scrollToSection("about")}>
          关于测试
        </button>
        <button type="button" onClick={() => scrollToSection("gallery")}>
          角色库
        </button>
        <a className="nav-home" href="/">
          返回测试镜
        </a>
        <button className="nav-start" type="button" onClick={onStart}>
          开始测试
        </button>
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

function HeroArt() {
  const [activeGroup, setActiveGroup] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const rotationStopped = prefersReducedMotion || isPaused || isHovering;
  const currentCharacters = heroCharacterGroups[activeGroup];

  function showNextGroup() {
    setActiveGroup((current) => (current + 1) % heroCharacterGroups.length);
  }

  useEffect(() => {
    if (rotationStopped) {
      return undefined;
    }

    const rotationTimer = window.setInterval(showNextGroup, heroRotationDelay);
    return () => window.clearInterval(rotationTimer);
  }, [rotationStopped]);

  useEffect(() => {
    const upcomingCharacters = heroCharacterGroups[(activeGroup + 1) % heroCharacterGroups.length];
    upcomingCharacters.forEach((character) => {
      const upcomingImage = new Image();
      upcomingImage.src = character.image;
    });
  }, [activeGroup]);

  return (
    <div
      className="hero-art"
      role="region"
      aria-roledescription="carousel"
      aria-label="少女乐队角色轮换展示"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="art-note art-note-top">GIRL BAND ANIME</div>
      <div className="art-note art-note-bottom">YOUR SOUND / YOUR STORY</div>
      {currentCharacters.map((character, index) => {
        const slot = heroCardSlots[index];
        return (
          <figure className={`art-photo ${slot.className} art-photo-enter`} key={`${activeGroup}-${character.id}`}>
            <img decoding="async" src={character.image} alt={`${character.name}，${character.band}`} />
            <figcaption>
              <span>{character.name}</span>
              <small>{slot.label}</small>
            </figcaption>
          </figure>
        );
      })}
      <div className="art-controls" aria-label="角色轮换控制">
        <p className="art-counter" aria-hidden="true">
          <strong>{String(activeGroup + 1).padStart(2, "0")}</strong>
          <span>/ {String(heroCharacterGroups.length).padStart(2, "0")}</span>
        </p>
        <div className="art-control-buttons">
          <button className="art-control art-control-next" type="button" onClick={showNextGroup}>
            换一组角色
          </button>
          {!prefersReducedMotion && (
            <button
              className="art-control art-control-pause"
              type="button"
              aria-pressed={isPaused}
              onClick={() => setIsPaused((current) => !current)}
            >
              {isPaused ? "继续轮换" : "暂停轮换"}
            </button>
          )}
        </div>
      </div>
      <p className="screen-reader-text" aria-live="polite" aria-atomic="true">
        当前展示第 {activeGroup + 1} 组角色：{currentCharacters.map((character) => character.name).join("、")}。
      </p>
    </div>
  );
}

function Gallery() {
  const [band, setBand] = useState("全部角色");
  const bands = useMemo(
    () => ["全部角色", ...new Set(characters.map((character) => character.band))],
    [],
  );
  const shownCharacters =
    band === "全部角色" ? characters : characters.filter((character) => character.band === band);

  return (
    <section className="gallery-section" id="gallery" aria-labelledby="gallery-title">
      <div className="section-heading">
        <p className="eyebrow">CHARACTER LIBRARY</p>
        <h2 id="gallery-title">67 名角色，已纳入首发题库。</h2>
        <p>
          覆盖 {catalogSummary.series} 部少女乐队动画与 {catalogSummary.bands} 组乐队或音乐组合。每次结果都从完整角色库中计算。
        </p>
      </div>
      <label className="band-filter">
        <span>筛选乐队</span>
        <select value={band} onChange={(event) => setBand(event.target.value)}>
          {bands.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </label>
      <div className="character-grid">
        {shownCharacters.map((character) => (
          <article className="character-card" key={character.id}>
            <div className="character-card-image">
              <img loading="lazy" src={character.image} alt={character.name} />
            </div>
            <div className="character-card-copy">
              <p>{character.series}</p>
              <h3>{character.name}</h3>
              <span>
                {character.band} · {character.role}
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Home({ onStart }) {
  return (
    <>
      <section className="hero" id="top">
        <Header onStart={onStart} />
        <div className="hero-content">
          <div className="hero-copy">
            <p className="eyebrow">NO. 01 / GIRL BAND CHARACTER QUIZ</p>
            <h1>
              <span>测一测你是</span>
              <span>哪部少女乐队番的</span>
              <span>哪个角色</span>
            </h1>
            <p className="hero-lede">
              每次会从 {questionBank.length} 道场景题中均衡抽取 {QUESTION_COUNT} 个选择，找到与你最同频的乐队角色。答案没有标准，只记录你此刻最想发出的声音。
            </p>
            <div className="hero-actions">
              <button className="primary-button" type="button" onClick={onStart}>
                开始测试 · {QUESTION_COUNT} 题
              </button>
              <button className="text-button" type="button" onClick={() => scrollToSection("gallery")}>
                先看角色库
              </button>
            </div>
            <StatBlock />
          </div>
          <HeroArt />
        </div>
      </section>
      <section className="about-section" id="about" aria-labelledby="about-title">
        <div className="about-number">01</div>
        <div>
          <p className="eyebrow">HOW IT WORKS</p>
          <h2 id="about-title">不是贴标签，而是一次为当下心情留存的乐队选曲。</h2>
        </div>
        <div className="about-copy">
          <p>
            测试把每一道题的选择映射为行动、共鸣、专注、直觉与坚定五种倾向，并与本地角色库中的角色特征进行匹配。
          </p>
          <p>结果仅供娱乐，不代表真实人格判断。角色名称、作品与图片的权利归各官方权利方所有。</p>
        </div>
      </section>
      <Gallery />
      <footer className="site-footer">
        <p>GIRL BAND CHARACTER QUIZ</p>
        <p>非官方粉丝向测试。图片来源见各作品官方角色页。</p>
      </footer>
    </>
  );
}

function Quiz({ questionIndex, questions, onAnswer, onBack, onExit }) {
  const question = questions[questionIndex];
  const progress = ((questionIndex + 1) / questions.length) * 100;

  return (
    <main className="quiz-page">
      <header className="quiz-header">
        <button className="wordmark inverse-wordmark" type="button" onClick={onExit}>
          <span>GIRL BAND</span>
          <strong>角色测试</strong>
        </button>
        <div className="header-meta">
          <a className="header-home-link" href="/">
            返回测试镜
          </a>
          <p>
            第 {String(questionIndex + 1).padStart(2, "0")} 题 / 共 {questions.length} 题
          </p>
        </div>
      </header>
      <div className="progress-track" aria-label={"当前进度：" + (questionIndex + 1) + " / " + questions.length}>
        <span style={{ width: progress + "%" }} />
      </div>
      <section className="question-wrap" aria-labelledby="question-title">
        <p className="question-index">QUESTION {String(questionIndex + 1).padStart(2, "0")}</p>
        <h1 id="question-title">{question.prompt}</h1>
        <div className="answer-list">
          {question.options.map((option, index) => (
            <button
              className="answer-button"
              key={option.label}
              type="button"
              onClick={() => onAnswer(option.values)}
            >
              <span>{String.fromCharCode(65 + index)}</span>
              <strong>{option.label}</strong>
            </button>
          ))}
        </div>
        <button className="quiz-back-button" type="button" disabled={questionIndex === 0} onClick={onBack}>
          返回上一题
        </button>
      </section>
      <p className="quiz-note">凭第一反应选择即可。本轮题目从 {questionBank.length} 道题库中抽取，你的选择只保存在当前浏览器会话中。</p>
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
  return (
    <article className="result-poster" ref={posterRef}>
      <div className="result-poster-topline">
        <span>MIRROR-TEST / BAND-TI</span>
        <span>YOUR SOUND MATCH</span>
      </div>
      <div className="result-poster-main">
        <div className="result-poster-image">
          <img src={character.image} alt="" />
        </div>
        <div className="result-poster-copy">
          <p>你的角色结果</p>
          <h2>{character.name}</h2>
          <span>{character.series}</span>
          <strong>{character.band}</strong>
          <div className="result-poster-score">
            <b>{result.matchPercent}</b>
            <span>% 共鸣指数</span>
          </div>
          <div className="result-poster-traits">
            <span>{archetype.title}</span>
            <span>{primaryTrait.label} · {secondaryTrait.label}</span>
          </div>
        </div>
      </div>
      <div className="result-poster-footer">
        <div>
          <p>STAGE DOSSIER</p>
          <strong>{character.role}</strong>
          <span>{result.questionCount} 个选择 · 67 名角色库</span>
        </div>
        <div className="result-poster-qr">
          <img src={qrCodeDataUrl} alt="" />
          <span>扫码重测</span>
        </div>
      </div>
    </article>
  );
}

function Result({ result, onRestart, onHome }) {
  const character = result.ranked[0];
  const closeMatches = result.ranked.slice(1, 5);
  const contrastMatches = result.ranked.slice(-2).reverse();
  const archetype = archetypeCopy[character.archetype];
  const total = Math.max(...result.traitScore, 1);
  const primaryTrait = result.traitRanking[0];
  const secondaryTrait = result.traitRanking[1];
  const resultTags = [
    `#${archetype.title}`,
    `#${primaryTrait.label}主声部`,
    `#${secondaryTrait.label}副声部`,
    `#${character.role.replace(/\s*\/\s*/g, "·")}`,
  ];
  const shareUrl = useMemo(() => getPublicQuizUrl(), []);
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState("");
  const [exportMode, setExportMode] = useState("idle");
  const [exportError, setExportError] = useState("");
  const [posterPreviewUrl, setPosterPreviewUrl] = useState("");
  const posterRef = useRef(null);
  const posterCache = useRef({ key: "", blob: null });

  useEffect(() => {
    let isCurrent = true;

    import("qrcode")
      .then(({ default: QRCode }) =>
        QRCode.toDataURL(shareUrl, {
          errorCorrectionLevel: "M",
          margin: 1,
          width: 220,
          color: { dark: "#171411", light: "#fffdf8" },
        }),
      )
      .then((url) => {
        if (isCurrent) {
          setQrCodeDataUrl(url);
        }
      })
      .catch(() => {
        if (isCurrent) {
          setQrCodeDataUrl("");
        }
      });

    return () => {
      isCurrent = false;
    };
  }, [shareUrl]);

  useEffect(() => {
    if (!posterPreviewUrl) {
      return undefined;
    }

    return () => window.URL.revokeObjectURL(posterPreviewUrl);
  }, [posterPreviewUrl]);

  useEffect(() => {
    if (!posterPreviewUrl) {
      return undefined;
    }

    const closeOnEscape = (event) => {
      if (event.key === "Escape") {
        setPosterPreviewUrl("");
      }
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [posterPreviewUrl]);

  function scorePercent(item) {
    return Math.round((item.score / result.maximumScore) * 100);
  }

  async function buildPosterBlob() {
    const cacheKey = `${character.id}:${result.matchPercent}:${result.questionCount}`;
    if (posterCache.current.key === cacheKey && posterCache.current.blob) {
      return posterCache.current.blob;
    }

    if (!posterRef.current || !qrCodeDataUrl) {
      throw new Error("poster-not-ready");
    }

    await waitForPosterImages(posterRef.current);
    if (document.fonts?.ready) {
      await document.fonts.ready;
    }

    const { default: html2canvas } = await import("html2canvas");
    const canvas = await html2canvas(posterRef.current, {
      backgroundColor: "#f5f0e6",
      scale: 2,
      useCORS: true,
      logging: false,
      width: posterRef.current.scrollWidth,
      height: posterRef.current.scrollHeight,
      windowWidth: posterRef.current.scrollWidth,
      windowHeight: posterRef.current.scrollHeight,
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
      setExportError("结果图生成失败，请稍后再试。");
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
      setExportError("结果图生成失败，请稍后再试。");
    } finally {
      setExportMode("idle");
    }
  }

  return (
    <main className="result-page">
      <header className="result-header">
        <button className="wordmark" type="button" onClick={onHome}>
          <span>GIRL BAND</span>
          <strong>角色测试</strong>
        </button>
        <div className="header-meta">
          <a className="header-home-link" href="/">
            返回测试镜
          </a>
          <p>你的角色结果</p>
        </div>
      </header>
      <section className="result-hero" aria-labelledby="result-name">
        <div className="result-image-frame">
          <img src={character.image} alt={character.name} />
        </div>
        <div className="result-copy">
          <p className="eyebrow">YOUR RESULT / {archetype.title}</p>
          <h1 id="result-name">{character.name}</h1>
          <p className="result-meta">
            {character.series} · {character.band} · {character.role}
          </p>
          <p className="result-description">{archetype.description}</p>
          <p className="result-detail">
            这轮 {result.questionCount} 个选择里，{primaryTrait.summary} 同时，{secondaryTrait.summary}
          </p>
          <div className="result-score-dossier">
            <div className="result-score-card">
              <span>共鸣指数</span>
              <strong>{result.matchPercent}<small>%</small></strong>
              <p>与 {character.name} 的特质向量计算得出</p>
            </div>
            <dl className="result-dossier-list">
              <div>
                <dt>作品</dt>
                <dd>{character.series}</dd>
              </div>
              <div>
                <dt>乐队</dt>
                <dd>{character.band}</dd>
              </div>
              <div>
                <dt>担任</dt>
                <dd>{character.role}</dd>
              </div>
            </dl>
          </div>
          <div className="result-actions">
            <button className="primary-button" type="button" onClick={onRestart}>
              再测一次
            </button>
            <a className="text-button external-link" href={character.officialUrl} target="_blank" rel="noreferrer">
              查看作品官方角色页
            </a>
          </div>
        </div>
      </section>
      <section className="result-lower">
        <div className="trait-panel">
          <p className="eyebrow">YOUR SOUND MAP</p>
          <h2>你的声音图谱</h2>
          <div className="trait-list">
            {result.traitScore.map((score, index) => (
              <div className="trait-row" key={traitLabels[index]}>
                <span>{traitLabels[index]}</span>
                <div aria-label={traitLabels[index] + " " + score}>
                  <i style={{ width: Math.max(12, (score / total) * 100) + "%" }} />
                </div>
                <strong>{score}</strong>
              </div>
            ))}
          </div>
          <div className="trait-summary">
            <p><strong>主声部：{primaryTrait.label}</strong>{primaryTrait.summary}</p>
            <p><strong>副声部：{secondaryTrait.label}</strong>{secondaryTrait.summary}</p>
          </div>
          <div className="result-keywords" aria-label="本次结果关键词">
            {resultTags.map((tag) => <span key={tag}>{tag}</span>)}
          </div>
        </div>
        <div className="nearby-panel">
          <p className="eyebrow">ALSO CLOSE</p>
          <h2>同样靠近你的四种声音</h2>
          <div className="nearby-list">
            {closeMatches.map((item) => (
              <article key={item.id}>
                <img src={item.image} alt={item.name} />
                <div>
                  <h3>{item.name}</h3>
                  <p>{item.band}</p>
                  <span>共鸣 {scorePercent(item)}%</span>
                </div>
              </article>
            ))}
          </div>
          <div className="contrast-panel">
            <p>另一种可能</p>
            <strong>这轮较少出现的两种声线</strong>
            <div>
              {contrastMatches.map((item) => (
                <span key={item.id}>{item.name} · {item.band}</span>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="result-share-section" aria-labelledby="share-title">
        <div className="result-share-copy">
          <p className="eyebrow">RESULT POSTER</p>
          <h2 id="share-title">把这张结果带去你的下一场演出。</h2>
          <p>使用当前本地角色素材生成结果海报。二维码会带朋友回到这份测试，不会上传你的选择。</p>
          <div className="result-share-actions">
            <button className="primary-button" type="button" disabled={!qrCodeDataUrl || exportMode !== "idle"} onClick={savePoster}>
              {exportMode === "saving" ? "正在生成结果图" : "生成并下载结果图"}
            </button>
            <button className="text-button" type="button" disabled={!qrCodeDataUrl || exportMode !== "idle"} onClick={previewPoster}>
              {exportMode === "previewing" ? "正在生成预览" : "预览结果图"}
            </button>
          </div>
          {exportError && <p className="result-export-error" role="alert">{exportError}</p>}
        </div>
        <aside className="result-qr-card">
          <div className="result-qr-image">
            {qrCodeDataUrl ? <img src={qrCodeDataUrl} alt="扫码重新开始少女乐队角色测试" /> : <span>二维码生成中</span>}
          </div>
          <div>
            <p>扫码回到测试</p>
            <span>{shareUrl.replace(/^https?:\/\//, "")}</span>
          </div>
        </aside>
      </section>
      <div className="result-poster-capture" aria-hidden="true">
        <ResultPoster
          character={character}
          result={result}
          archetype={archetype}
          primaryTrait={primaryTrait}
          secondaryTrait={secondaryTrait}
          qrCodeDataUrl={qrCodeDataUrl}
          posterRef={posterRef}
        />
      </div>
      {posterPreviewUrl && (
        <div className="poster-preview" role="dialog" aria-modal="true" aria-labelledby="poster-preview-title">
          <button className="poster-preview-backdrop" type="button" aria-label="关闭结果图预览" onClick={() => setPosterPreviewUrl("")} />
          <div className="poster-preview-panel">
            <div className="poster-preview-head">
              <div>
                <p id="poster-preview-title">结果图预览</p>
                <span>长按或保存图片即可分享给朋友。</span>
              </div>
              <button className="poster-preview-close" type="button" onClick={() => setPosterPreviewUrl("")}>关闭</button>
            </div>
            <img src={posterPreviewUrl} alt={`${character.name} 的少女乐队角色测试结果图`} />
          </div>
        </div>
      )}
      <footer className="site-footer result-footer">
        <p>本测试仅供娱乐。角色与图片的权利归各官方权利方所有。</p>
      </footer>
    </main>
  );
}

export function App() {
  const [view, setView] = useState("home");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [quizQuestions, setQuizQuestions] = useState(() => createQuestionSet());
  const result = useMemo(
    () => (answers.length === quizQuestions.length ? getResult(answers) : null),
    [answers, quizQuestions],
  );

  function startQuiz() {
    setQuizQuestions(createQuestionSet(Date.now() + Math.floor(Math.random() * 1000000)));
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
