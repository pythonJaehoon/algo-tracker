import { useMemo, useState } from "react";
import { samsungProPatterns, richArchives, codetreeProblems } from "./data/samsungUnifiedData";
import "./styles/unifiedSamsung.css";

function LevelDots({ level }) {
  return <div className="u-dots">{Array.from({ length: 5 }).map((_, i) => <i key={i} className={i < level ? "on" : ""} />)}</div>;
}

function CodeBlock({ code }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    await navigator.clipboard.writeText(code || "");
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };
  return <div className="u-code"><button onClick={copy}>{copied ? "복사됨" : "코드 복사"}</button><pre><code>{code}</code></pre></div>;
}

function UnifiedCard({ item, selected, onClick }) {
  return (
    <button className={selected ? "u-card active" : "u-card"} onClick={onClick}>
      <div className="u-card-head">
        <div><span className="u-category">{item.category}</span><h3>{item.title}</h3></div>
        <span className="u-badge">{item.difficulty}</span>
      </div>
      <p>{item.summary}</p>
      <div className="u-tags">{item.tags.map((tag) => <span key={tag}>#{tag}</span>)}</div>
      <LevelDots level={item.level} />
    </button>
  );
}

function UnifiedDetail({ item }) {
  return (
    <article className="u-detail">
      <div className="u-detail-hero">
        <div><span className="u-category light">{item.category}</span><h1>{item.title}</h1><p>{item.summary}</p></div>
        <div className="u-hero-badge"><strong>{item.difficulty}</strong><LevelDots level={item.level} /></div>
      </div>

      <section className="u-section"><h2>5초 판단 신호</h2><p className="u-signal">{item.signal}</p></section>

      <section className="u-section">
        <h2>풀이 전략</h2>
        <div className="u-strategy-grid">
          {item.strategy.map((s, i) => <div className="u-step" key={i}><b>{i + 1}</b><p>{s}</p></div>)}
        </div>
      </section>

      <section className="u-section"><h2>Python 핵심 코드</h2><CodeBlock code={item.code} /></section>

      <section className="u-section">
        <h2>연결 문제</h2>
        <div className="u-problem-grid">
          {item.problems.map((p, i) => (
            <a key={i} className="u-problem" href={p.url} target="_blank" rel="noreferrer">
              <span>{p.platform}</span><strong>{p.title}</strong><em>{p.difficulty}</em>
            </a>
          ))}
        </div>
      </section>
    </article>
  );
}

function UnifiedSamsungPage({ title, subtitle, items }) {
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState("전체");
  const [selectedId, setSelectedId] = useState(items[0]?.id);

  const tags = useMemo(() => ["전체", ...Array.from(new Set(items.flatMap((x) => x.tags)))], [items]);
  const filtered = items.filter((item) => {
    const q = query.trim().toLowerCase();
    const matchQuery = !q || item.title.toLowerCase().includes(q) || item.summary.toLowerCase().includes(q) || item.tags.some((t) => t.toLowerCase().includes(q)) || item.problems.some((p) => p.title.toLowerCase().includes(q));
    const matchTag = tag === "전체" || item.tags.includes(tag);
    return matchQuery && matchTag;
  });
  const selected = filtered.find((x) => x.id === selectedId) || filtered[0] || items[0];

  return (
    <div className="u-page">
      <header className="u-hero"><p>Samsung Algorithm Tracker</p><h1>{title}</h1><span>{subtitle}</span></header>
      <div className="u-toolbar">
        <input placeholder="패턴/문제/태그 검색" value={query} onChange={(e) => setQuery(e.target.value)} />
        <select value={tag} onChange={(e) => setTag(e.target.value)}>{tags.map((t) => <option key={t} value={t}>{t}</option>)}</select>
      </div>
      <div className="u-layout">
        <aside className="u-list">{filtered.map((item) => <UnifiedCard key={item.id} item={item} selected={selected?.id === item.id} onClick={() => setSelectedId(item.id)} />)}</aside>
        <main className="u-main">{selected ? <UnifiedDetail item={selected} /> : <div className="u-empty">검색 결과가 없습니다.</div>}</main>
      </div>
    </div>
  );
}

export default function App() {
  const [tab, setTab] = useState("pro");
  const current = tab === "pro"
    ? { title: "삼성 PRO 패턴", subtitle: `총 ${samsungProPatterns.length}개 패턴 · 자료구조/그래프/트리/DP/구현`, items: samsungProPatterns }
    : tab === "rich"
    ? { title: "삼성 Rich 아카이브", subtitle: `총 ${richArchives.length}개 노트 · 시험 직전 판단법과 실전 루틴`, items: richArchives }
    : { title: "CodeTree 삼성 기출", subtitle: `총 ${codetreeProblems.length}개 기출/유사 문제 분석`, items: codetreeProblems };

  return (
    <div>
      <nav className="u-tabs">
        <button className={tab === "pro" ? "active" : ""} onClick={() => setTab("pro")}>삼성 PRO 패턴</button>
        <button className={tab === "rich" ? "active" : ""} onClick={() => setTab("rich")}>삼성 Rich 아카이브</button>
        <button className={tab === "codetree" ? "active" : ""} onClick={() => setTab("codetree")}>CodeTree 삼성 기출</button>
      </nav>
      <UnifiedSamsungPage {...current} />
    </div>
  );
}
