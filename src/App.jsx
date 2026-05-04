import { useEffect, useMemo, useState } from "react";
import { samsungProPatterns, richArchives, codetreeProblems } from "./data/samsungUnifiedData";
import "./styles/unifiedSamsung.css";

const BOJ_LEVELS = [
  "Unrated",
  "Bronze V", "Bronze IV", "Bronze III", "Bronze II", "Bronze I",
  "Silver V", "Silver IV", "Silver III", "Silver II", "Silver I",
  "Gold V", "Gold IV", "Gold III", "Gold II", "Gold I",
  "Platinum V", "Platinum IV", "Platinum III", "Platinum II", "Platinum I",
  "Diamond V", "Diamond IV", "Diamond III", "Diamond II", "Diamond I",
  "Ruby V", "Ruby IV", "Ruby III", "Ruby II", "Ruby I"
];

function getBojId(url = "") {
  const match = String(url).match(/acmicpc\.net\/problem\/(\d+)/);
  return match ? Number(match[1]) : null;
}

function normalizeTags(tags) {
  if (Array.isArray(tags)) return tags;
  return String(tags || "")
    .split(",")
    .map((x) => x.trim())
    .filter(Boolean);
}

function makePythonTemplate(item, problem) {
  const tagText = `${item.tags.join(" ")} ${item.title} ${problem.title}`.toLowerCase();

  if (tagText.includes("dijkstra") || tagText.includes("최단경로")) {
    return `import sys
import heapq
input = sys.stdin.readline

INF = 10**18

def dijkstra(start):
    dist = [INF] * (n + 1)
    dist[start] = 0
    h = [(0, start)]

    while h:
        nowv, nowp = heapq.heappop(h)

        if dist[nowp] != nowv:
            continue

        for nextv, nextp in graph[nowp]:
            cost = nowv + nextv
            if dist[nextp] > cost:
                dist[nextp] = cost
                heapq.heappush(h, (cost, nextp))

    return dist
`;
  }

  if (tagText.includes("0-1") || tagText.includes("deque")) {
    return `from collections import deque

INF = 10**9
dist = [[INF] * m for _ in range(n)]
dq = deque([(0, 0)])
dist[0][0] = 0

while dq:
    y, x = dq.popleft()

    for dy, dx in ((1,0), (-1,0), (0,1), (0,-1)):
        ny, nx = y + dy, x + dx
        if not (0 <= ny < n and 0 <= nx < m):
            continue

        cost = board[ny][nx]

        if dist[ny][nx] > dist[y][x] + cost:
            dist[ny][nx] = dist[y][x] + cost
            if cost == 0:
                dq.appendleft((ny, nx))
            else:
                dq.append((ny, nx))
`;
  }

  if (tagText.includes("bfs") || tagText.includes("grid") || tagText.includes("격자")) {
    return `from collections import deque

q = deque()
visited = [[0] * m for _ in range(n)]

q.append((0, 0))
visited[0][0] = 1

while q:
    y, x = q.popleft()

    for dy, dx in ((1,0), (-1,0), (0,1), (0,-1)):
        ny, nx = y + dy, x + dx

        if not (0 <= ny < n and 0 <= nx < m):
            continue

        if visited[ny][nx]:
            continue

        if not can_go(ny, nx):
            continue

        visited[ny][nx] = visited[y][x] + 1
        q.append((ny, nx))
`;
  }

  if (tagText.includes("segment")) {
    return `tree = [0] * (4 * n)

def build(node, start, end):
    if start == end:
        tree[node] = arr[start]
        return

    mid = (start + end) // 2
    build(node * 2, start, mid)
    build(node * 2 + 1, mid + 1, end)
    tree[node] = tree[node * 2] + tree[node * 2 + 1]

def query(node, start, end, left, right):
    if right < start or end < left:
        return 0

    if left <= start and end <= right:
        return tree[node]

    mid = (start + end) // 2
    return query(node*2, start, mid, left, right) + query(node*2+1, mid+1, end, left, right)
`;
  }

  if (tagText.includes("heap") || tagText.includes("priority") || tagText.includes("우선순위")) {
    return `import heapq

heap = []
alive = {}

def push(id, score):
    alive[id] = score
    heapq.heappush(heap, (-score, id))

def pop_valid():
    while heap:
        neg_score, id = heapq.heappop(heap)
        score = -neg_score

        if alive.get(id) == score:
            return id, score

    return None
`;
  }

  if (tagText.includes("dfs") || tagText.includes("backtracking") || tagText.includes("조합")) {
    return `def dfs(idx, selected):
    global answer

    if len(selected) == target:
        answer = min(answer, simulate(selected))
        return

    if idx == len(candidates):
        return

    selected.append(candidates[idx])
    dfs(idx + 1, selected)
    selected.pop()

    dfs(idx + 1, selected)
`;
  }

  if (item.code) return item.code;

  return `import sys
input = sys.stdin.readline

# 1. 입력 크기 확인
# 2. 상태 정의
# 3. 자료구조 선택
# 4. 시간복잡도 계산
`;
}

function LevelDots({ level }) {
  return (
    <div className="u-dots">
      {Array.from({ length: 5 }).map((_, i) => (
        <i key={i} className={i < level ? "on" : ""} />
      ))}
    </div>
  );
}

function CodeBlock({ code }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(code || "");
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  return (
    <div className="u-code">
      <button onClick={copy}>{copied ? "복사됨" : "코드 복사"}</button>
      <pre><code>{code}</code></pre>
    </div>
  );
}

function UnifiedCard({ item, selected, onClick }) {
  return (
    <button className={selected ? "u-card active" : "u-card"} onClick={onClick}>
      <div className="u-card-head">
        <div>
          <span className="u-category">{item.category}</span>
          <h3>{item.title}</h3>
        </div>
        <span className="u-badge">{item.difficulty}</span>
      </div>
      <p>{item.summary}</p>
      <div className="u-tags">
        {item.tags.map((tag) => <span key={tag}>#{tag}</span>)}
      </div>
      <LevelDots level={item.level} />
    </button>
  );
}

function ProblemCard({ item, problem, bojInfo }) {
  const [open, setOpen] = useState(false);
  const bojId = getBojId(problem.url);
  const autoDifficulty = bojId && bojInfo[bojId]?.level
    ? BOJ_LEVELS[bojInfo[bojId].level] || problem.difficulty
    : problem.difficulty;

  const title = bojId && bojInfo[bojId]?.titleKo
    ? bojInfo[bojId].titleKo
    : problem.title;

  return (
    <div className={open ? "u-problem rich open" : "u-problem rich"}>
      <button className="u-problem-main" onClick={() => setOpen((v) => !v)}>
        <span>{problem.platform}{bojId ? ` #${bojId}` : ""}</span>
        <strong>{title}</strong>
        <em>{autoDifficulty}</em>
        {problem.note ? <small>{problem.note}</small> : null}
      </button>

      {open && (
        <div className="u-problem-expanded">
          <div className="u-problem-actions">
            <a href={problem.url} target="_blank" rel="noreferrer">문제 열기</a>
            {bojId ? <a href={`https://solved.ac/problems/${bojId}`} target="_blank" rel="noreferrer">solved.ac</a> : null}
          </div>
          <h4>Python 풀이 템플릿</h4>
          <CodeBlock code={makePythonTemplate(item, problem)} />
        </div>
      )}
    </div>
  );
}

function UnifiedDetail({ item, bojInfo }) {
  return (
    <article className="u-detail">
      <div className="u-detail-hero">
        <div>
          <span className="u-category light">{item.category}</span>
          <h1>{item.title}</h1>
          <p>{item.summary}</p>
        </div>
        <div className="u-hero-badge">
          <strong>{item.difficulty}</strong>
          <LevelDots level={item.level} />
        </div>
      </div>

      <section className="u-section">
        <h2>5초 판단 신호</h2>
        <p className="u-signal">{item.signal}</p>
      </section>

      <section className="u-section">
        <h2>풀이 전략</h2>
        <div className="u-strategy-grid">
          {item.strategy.map((s, i) => (
            <div className="u-step" key={i}>
              <b>{i + 1}</b>
              <p>{s}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="u-section">
        <h2>Python 핵심 코드</h2>
        <CodeBlock code={item.code} />
      </section>

      <section className="u-section">
        <h2>연결 문제</h2>
        <p className="u-help">문제 카드를 클릭하면 Python 풀이 템플릿이 펼쳐집니다. BOJ 문제는 가능하면 solved.ac 난이도를 자동으로 가져옵니다.</p>
        <div className="u-problem-grid">
          {item.problems.map((problem, i) => (
            <ProblemCard key={`${problem.platform}-${problem.title}-${i}`} item={item} problem={problem} bojInfo={bojInfo} />
          ))}
        </div>
      </section>
    </article>
  );
}

function CodeTreeAddPanel({ onAdd }) {
  const [form, setForm] = useState({
    title: "",
    url: "",
    tags: "simulation, grid",
    summary: "",
  });

  const add = () => {
    if (!form.title.trim()) return;

    const tags = normalizeTags(form.tags);
    onAdd({
      id: `user-codetree-${Date.now()}`,
      title: form.title.trim(),
      category: "내가 추가한 CodeTree",
      difficulty: "직접 추가",
      level: 4,
      tags,
      summary: form.summary || "CodeTree 링크를 기반으로 직접 추가한 문제 카드입니다.",
      signal: "문제 원문을 보고 상태와 자료구조를 직접 정리하세요.",
      strategy: [
        "입력 크기와 명령 수를 먼저 확인합니다.",
        "상태 변수를 표로 정리합니다.",
        "턴 순서 또는 명령 순서를 주석으로 고정합니다.",
        "필요한 자료구조를 정합니다."
      ],
      code: `# 직접 추가한 CodeTree 문제 풀이 골격
# 1. 입력
# 2. 상태 정의
# 3. simulate() 또는 solve() 작성
`,
      problems: [
        {
          platform: "CodeTree",
          title: form.title.trim(),
          difficulty: "직접 추가",
          url: form.url || "https://www.codetree.ai/",
          note: "직접 추가한 문제"
        }
      ]
    });

    setForm({ title: "", url: "", tags: "simulation, grid", summary: "" });
  };

  return (
    <section className="u-section u-add-panel">
      <h2>CodeTree 문제 추가</h2>
      <p className="u-help">정적 사이트라 CodeTree 본문을 브라우저에서 직접 크롤링하지는 않습니다. 대신 문제 URL과 제목을 넣으면 카드가 localStorage에 저장됩니다.</p>
      <div className="u-add-grid">
        <input placeholder="문제 제목" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
        <input placeholder="CodeTree URL" value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })} />
        <input placeholder="태그: simulation, BFS, heapq" value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} />
        <input placeholder="요약" value={form.summary} onChange={(e) => setForm({ ...form, summary: e.target.value })} />
        <button onClick={add}>카드 추가</button>
      </div>
    </section>
  );
}

function UnifiedSamsungPage({ title, subtitle, items, bojInfo, isCodeTree, onAddCodeTree }) {
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState("전체");
  const [selectedId, setSelectedId] = useState(items[0]?.id);

  const tags = useMemo(() => ["전체", ...Array.from(new Set(items.flatMap((x) => x.tags)))], [items]);

  const filtered = items.filter((item) => {
    const q = query.trim().toLowerCase();
    const matchQuery =
      !q ||
      item.title.toLowerCase().includes(q) ||
      item.summary.toLowerCase().includes(q) ||
      item.tags.some((t) => t.toLowerCase().includes(q)) ||
      item.problems.some((p) => p.title.toLowerCase().includes(q));
    const matchTag = tag === "전체" || item.tags.includes(tag);
    return matchQuery && matchTag;
  });

  const selected = filtered.find((x) => x.id === selectedId) || filtered[0] || items[0];

  return (
    <div className="u-page">
      <header className="u-hero">
        <p>Samsung Algorithm Tracker</p>
        <h1>{title}</h1>
        <span>{subtitle}</span>
      </header>

      <div className="u-toolbar">
        <input placeholder="패턴/문제/태그 검색" value={query} onChange={(e) => setQuery(e.target.value)} />
        <select value={tag} onChange={(e) => setTag(e.target.value)}>
          {tags.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>

      {isCodeTree ? <CodeTreeAddPanel onAdd={onAddCodeTree} /> : null}

      <div className="u-layout">
        <aside className="u-list">
          {filtered.map((item) => (
            <UnifiedCard key={item.id} item={item} selected={selected?.id === item.id} onClick={() => setSelectedId(item.id)} />
          ))}
        </aside>
        <main className="u-main">
          {selected ? <UnifiedDetail item={selected} bojInfo={bojInfo} /> : <div className="u-empty">검색 결과가 없습니다.</div>}
        </main>
      </div>
    </div>
  );
}

export default function App() {
  const [tab, setTab] = useState("pro");
  const [bojInfo, setBojInfo] = useState({});
  const [codeTreeUserItems, setCodeTreeUserItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("codetree-user-items") || "[]");
    } catch {
      return [];
    }
  });

  const allItems = useMemo(
    () => [...samsungProPatterns, ...richArchives, ...codetreeProblems, ...codeTreeUserItems],
    [codeTreeUserItems]
  );

  useEffect(() => {
    const bojIds = Array.from(
      new Set(
        allItems
          .flatMap((item) => item.problems || [])
          .map((problem) => getBojId(problem.url))
          .filter(Boolean)
      )
    );

    if (!bojIds.length) return;

    const chunks = [];
    for (let i = 0; i < bojIds.length; i += 100) {
      chunks.push(bojIds.slice(i, i + 100));
    }

    async function loadSolvedAc() {
      const next = {};

      for (const chunk of chunks) {
        try {
          const url = `https://solved.ac/api/v3/problem/lookup?problemIds=${chunk.join(",")}`;
          const res = await fetch(url);
          if (!res.ok) continue;

          const list = await res.json();
          for (const problem of list) {
            next[problem.problemId] = problem;
          }
        } catch {
          // solved.ac API 실패 시 기존 수동 난이도 유지
        }
      }

      setBojInfo(next);
    }

    loadSolvedAc();
  }, [allItems]);

  const addCodeTreeItem = (item) => {
    setCodeTreeUserItems((prev) => {
      const next = [item, ...prev];
      localStorage.setItem("codetree-user-items", JSON.stringify(next));
      return next;
    });
  };

  const codeTreeAll = useMemo(
    () => [...codeTreeUserItems, ...codetreeProblems],
    [codeTreeUserItems]
  );

  const current = tab === "pro"
    ? {
        title: "삼성 PRO 패턴",
        subtitle: `총 ${samsungProPatterns.length}개 패턴 · 문제 클릭 시 Python 풀이 템플릿 펼침`,
        items: samsungProPatterns,
        isCodeTree: false,
      }
    : tab === "rich"
    ? {
        title: "삼성 Rich 아카이브",
        subtitle: `총 ${richArchives.length}개 노트 · 실전 판단법과 명령형 문제 설계`,
        items: richArchives,
        isCodeTree: false,
      }
    : {
        title: "CodeTree 삼성 기출",
        subtitle: `총 ${codeTreeAll.length}개 기출/유사 문제 분석 · 직접 카드 추가 가능`,
        items: codeTreeAll,
        isCodeTree: true,
      };

  return (
    <div>
      <nav className="u-tabs">
        <button className={tab === "pro" ? "active" : ""} onClick={() => setTab("pro")}>삼성 PRO 패턴</button>
        <button className={tab === "rich" ? "active" : ""} onClick={() => setTab("rich")}>삼성 Rich 아카이브</button>
        <button className={tab === "codetree" ? "active" : ""} onClick={() => setTab("codetree")}>CodeTree 삼성 기출</button>
      </nav>
      <UnifiedSamsungPage {...current} bojInfo={bojInfo} onAddCodeTree={addCodeTreeItem} />
    </div>
  );
}
