import { useMemo, useState } from "react";
import { archetypeCopy, catalogSummary, characters } from "./data/characters.js";
import { questions } from "./data/questions.js";

const traitLabels = ["行动", "共鸣", "专注", "直觉", "坚定"];
const heroCharacters = [
  characters.find((character) => character.id === "gbc-nina"),
  characters.find((character) => character.id === "poppa-kasumi"),
  characters.find((character) => character.id === "rocklady-lilisa"),
];

function getResult(answers) {
  const traitScore = answers.reduce(
    (total, values) => total.map((value, index) => value + values[index]),
    [0, 0, 0, 0, 0],
  );
  const seed = answers.flat().reduce((total, value, index) => total + value * (index + 3), 0);
  const ranked = [...characters].sort((a, b) => {
    const aScore = a.profile.reduce((total, value, index) => total + value * traitScore[index], 0);
    const bScore = b.profile.reduce((total, value, index) => total + value * traitScore[index], 0);
    if (bScore !== aScore) {
      return bScore - aScore;
    }
    const aTie = (a.id.length * 17 + seed) % 19;
    const bTie = (b.id.length * 17 + seed) % 19;
    return bTie - aTie;
  });
  return { traitScore, ranked };
}

function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
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
        <dt>问题数量</dt>
        <dd>{questions.length}</dd>
      </div>
    </dl>
  );
}

function HeroArt() {
  return (
    <div className="hero-art" aria-label="少女乐队角色插画">
      <div className="art-note art-note-top">GIRL BAND ANIME</div>
      <div className="art-note art-note-bottom">YOUR SOUND / YOUR STORY</div>
      <figure className="art-photo art-photo-one">
        <img src={heroCharacters[0].image} alt={heroCharacters[0].name} />
        <figcaption>强烈的声音</figcaption>
      </figure>
      <figure className="art-photo art-photo-two">
        <img src={heroCharacters[1].image} alt={heroCharacters[1].name} />
        <figcaption>最初的星光</figcaption>
      </figure>
      <figure className="art-photo art-photo-three">
        <img src={heroCharacters[2].image} alt={heroCharacters[2].name} />
        <figcaption>不愿妥协</figcaption>
      </figure>
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
              用 20 个选择，找到与你最同频的乐队角色。答案没有标准，只记录你此刻最想发出的声音。
            </p>
            <div className="hero-actions">
              <button className="primary-button" type="button" onClick={onStart}>
                开始测试 · 20 题
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

function Quiz({ questionIndex, onAnswer, onExit }) {
  const question = questions[questionIndex];
  const progress = ((questionIndex + 1) / questions.length) * 100;

  return (
    <main className="quiz-page">
      <header className="quiz-header">
        <button className="wordmark inverse-wordmark" type="button" onClick={onExit}>
          <span>GIRL BAND</span>
          <strong>角色测试</strong>
        </button>
        <p>
          第 {String(questionIndex + 1).padStart(2, "0")} 题 / 共 {questions.length} 题
        </p>
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
      </section>
      <p className="quiz-note">凭第一反应选择即可。你的选择只保存在当前浏览器会话中。</p>
    </main>
  );
}

function Result({ result, onRestart, onHome }) {
  const character = result.ranked[0];
  const closeMatches = result.ranked.slice(1, 4);
  const archetype = archetypeCopy[character.archetype];
  const total = Math.max(...result.traitScore, 1);

  return (
    <main className="result-page">
      <header className="result-header">
        <button className="wordmark" type="button" onClick={onHome}>
          <span>GIRL BAND</span>
          <strong>角色测试</strong>
        </button>
        <p>你的角色结果</p>
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
            你的 20 个选择与 {character.name} 的倾向最接近。你会把属于自己的节奏带进团队，也会用自己的方式让声音被听见。
          </p>
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
        </div>
        <div className="nearby-panel">
          <p className="eyebrow">ALSO CLOSE</p>
          <h2>同样靠近你的三种声音</h2>
          <div className="nearby-list">
            {closeMatches.map((item) => (
              <article key={item.id}>
                <img src={item.image} alt={item.name} />
                <div>
                  <h3>{item.name}</h3>
                  <p>{item.band}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
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
  const result = useMemo(() => (answers.length === questions.length ? getResult(answers) : null), [answers]);

  function startQuiz() {
    setAnswers([]);
    setQuestionIndex(0);
    setView("quiz");
    window.scrollTo(0, 0);
  }

  function handleAnswer(values) {
    const nextAnswers = [...answers, values];
    setAnswers(nextAnswers);
    if (questionIndex + 1 === questions.length) {
      setView("result");
      window.scrollTo(0, 0);
      return;
    }
    setQuestionIndex((index) => index + 1);
  }

  function goHome() {
    setView("home");
    window.scrollTo(0, 0);
  }

  if (view === "quiz") {
    return <Quiz questionIndex={questionIndex} onAnswer={handleAnswer} onExit={goHome} />;
  }

  if (view === "result" && result) {
    return <Result result={result} onRestart={startQuiz} onHome={goHome} />;
  }

  return <Home onStart={startQuiz} />;
}
