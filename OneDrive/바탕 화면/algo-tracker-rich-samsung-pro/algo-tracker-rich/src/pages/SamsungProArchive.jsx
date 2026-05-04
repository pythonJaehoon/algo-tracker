import React, { useMemo, useState } from 'react';
import { samsungProPatterns, baekjoonProblems, codetreeSamsungProblems } from '../data/samsungProData';
import '../styles/samsungProArchive.css';

export default function SamsungProArchive() {
  const [tab, setTab] = useState('patterns');
  const [q, setQ] = useState('');
  const query = q.trim().toLowerCase();

  const filteredPatterns = useMemo(() => samsungProPatterns.filter(p =>
    [p.title, p.level, ...p.tags, p.judge].join(' ').toLowerCase().includes(query)
  ), [query]);
  const filteredBoj = useMemo(() => baekjoonProblems.filter(p =>
    [p.id, p.title, p.level, p.pattern].join(' ').toLowerCase().includes(query)
  ), [query]);
  const filteredCodeTree = useMemo(() => codetreeSamsungProblems.filter(p =>
    [p.title, p.year, p.level, ...p.tags, p.summary].join(' ').toLowerCase().includes(query)
  ), [query]);

  return <div className="sp-wrap">
    <section className="sp-hero">
      <div>
        <p className="sp-kicker">Samsung PRO / CodeTree / Baekjoon</p>
        <h1>삼성 PRO 패턴 & 기출 분석 저장소</h1>
        <p>기존 페이지에 병합하기 위한 독립 페이지입니다. 문제 원문은 복사하지 않고, 링크와 풀이 전략 중심으로 구성했습니다.</p>
      </div>
      <div className="sp-stats">
        <b>{samsungProPatterns.length}</b><span>패턴</span>
        <b>{baekjoonProblems.length}</b><span>백준</span>
        <b>{codetreeSamsungProblems.length}</b><span>CodeTree</span>
      </div>
    </section>

    <div className="sp-toolbar">
      <button className={tab==='patterns'?'on':''} onClick={()=>setTab('patterns')}>PRO 패턴</button>
      <button className={tab==='boj'?'on':''} onClick={()=>setTab('boj')}>백준 추천 문제</button>
      <button className={tab==='codetree'?'on':''} onClick={()=>setTab('codetree')}>CodeTree 삼성 기출</button>
      <input value={q} onChange={e=>setQ(e.target.value)} placeholder="검색: BFS, 트리, 다익스트라, 회전..." />
    </div>

    {tab === 'patterns' && <div className="sp-grid">
      {filteredPatterns.map(p => <article className="sp-card" key={p.id}>
        <div className="sp-card-top"><span>{p.level}</span><small>{p.id}</small></div>
        <h2>{p.title}</h2>
        <p className="sp-judge">5초 판단: {p.judge}</p>
        <div className="sp-tags">{p.tags.map(t => <em key={t}>#{t}</em>)}</div>
        <ul>{p.points.map(x => <li key={x}>{x}</li>)}</ul>
        <details><summary>Python 템플릿 보기</summary><pre>{p.code}</pre></details>
      </article>)}
    </div>}

    {tab === 'boj' && <div className="sp-list">
      {filteredBoj.map(p => <a className="sp-row" href={p.url} target="_blank" rel="noreferrer" key={p.id}>
        <strong>{p.id}. {p.title}</strong><span>{p.level}</span><p>{p.pattern}</p>
      </a>)}
    </div>}

    {tab === 'codetree' && <div className="sp-grid">
      {filteredCodeTree.map(p => <article className="sp-card" key={p.title}>
        <div className="sp-card-top"><span>{p.year}</span><small>{p.level}</small></div>
        <h2>{p.title}</h2>
        <p>{p.summary}</p>
        <div className="sp-tags">{p.tags.map(t => <em key={t}>#{t}</em>)}</div>
        <a className="sp-link" href={p.url} target="_blank" rel="noreferrer">CodeTree에서 보기 →</a>
      </article>)}
    </div>}
  </div>;
}
