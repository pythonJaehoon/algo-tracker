import { useEffect, useMemo, useState } from "react";
import "./App.css";

const STORAGE_KEY = "algo-tracker-pro-dashboard-v1";

const initialPatterns = [
  {
    id: "topk-lazy",
    title: "Top-K 유지 + 삭제/수정",
    subtitle: "Heap + Lazy Deletion",
    difficulty: "PRO",
    level: 4,
    tags: ["dict", "heapq", "lazy deletion", "ranking"],
    signal: "삭제 많음 + 정렬 유지 + id 기반 → lazy deletion",
    idea: [
      "dict = 진짜 데이터",
      "heap = 후보 저장소",
      "삭제/수정 시 heap을 직접 건드리지 않음",
      "조회할 때 dict와 비교해서 유효성 검사",
    ],
    code: `import heapq

data = {}
heap_height = []
heap_age = []
heap_school = []
order = 0

def add_or_update(id, height, age, school):
    global order
    order += 1

    data[id] = (height, age, school, order)

    heapq.heappush(heap_height, (-height, order, id))
    heapq.heappush(heap_age, (age, order, id))
    heapq.heappush(heap_school, (-school, order, id))

def delete(id):
    if id in data:
        del data[id]

def get_top5_height():
    res = []
    temp = []

    while heap_height and len(res) < 5:
        neg_h, order, id = heapq.heappop(heap_height)
        temp.append((neg_h, order, id))

        if id not in data:
            continue

        h, a, s, cur_order = data[id]

        if cur_order != order:
            continue

        if -neg_h != h:
            continue

        res.append(id)

    for item in temp:
        heapq.heappush(heap_height, item)

    return res`,
    traps: [
      "heap 안에는 삭제/수정 전 오래된 데이터가 남는다.",
      "큰 값 우선이면 음수로 넣는다.",
      "Top K 유지와 전체 중 Top K 조회는 다르다.",
      "쓰레기 데이터가 많아지면 rebuild가 필요하다.",
    ],
    problems: [
      { id: "boj-7662", platform: "BOJ", title: "이중 우선순위 큐", difficulty: "Gold IV", url: "https://www.acmicpc.net/problem/7662", note: "삭제 많은 heap lazy deletion 기본" },
      { id: "boj-21939", platform: "BOJ", title: "문제 추천 시스템 Version 1", difficulty: "Gold IV", url: "https://www.acmicpc.net/problem/21939", note: "id 기반 문제 관리" },
      { id: "boj-21944", platform: "BOJ", title: "문제 추천 시스템 Version 2", difficulty: "Gold II", url: "https://www.acmicpc.net/problem/21944", note: "여러 기준 추천 시스템" },
      { id: "boj-21942", platform: "BOJ", title: "부품 대여장", difficulty: "Gold II", url: "https://www.acmicpc.net/problem/21942", note: "id/시간/상태 관리" },
      { id: "pg-42628", platform: "Programmers", title: "이중우선순위큐", difficulty: "Level 3", url: "https://school.programmers.co.kr/learn/courses/30/lessons/42628", note: "최댓값/최솟값 동시 삭제" },
      { id: "pg-42627", platform: "Programmers", title: "디스크 컨트롤러", difficulty: "Level 3", url: "https://school.programmers.co.kr/learn/courses/30/lessons/42627", note: "작업 우선순위 heap" },
      { id: "ct-top-k", platform: "CodeTree", title: "Top K / 우선순위 큐 연습", difficulty: "Gold+", url: "https://www.codetree.ai/training-field/search?keyword=priority%20queue", note: "우선순위 큐 검색 결과" },
    ],
  },
  {
    id: "kth-dijkstra",
    title: "K번째 최단경로",
    subtitle: "Dijkstra 변형",
    difficulty: "PRO",
    level: 4,
    tags: ["dijkstra", "heapq", "k-th path"],
    signal: "최단이 아니라 k번째, 여러 경로 후보 유지",
    idea: [
      "dist[node]를 숫자 하나가 아니라 리스트로 둔다.",
      "각 노드마다 k개까지 비용을 허용한다.",
      "heap에서 꺼낸 비용을 dist[now]에 누적한다.",
      "k개를 넘으면 더 이상 확장하지 않는다.",
    ],
    code: `import heapq

def kth_dijkstra(start):
    dist = [[] for _ in range(n + 1)]
    h = [(0, start)]

    while h:
        cost, now = heapq.heappop(h)

        if len(dist[now]) >= k:
            continue

        dist[now].append(cost)

        for next_cost, next_node in graph[now]:
            heapq.heappush(h, (cost + next_cost, next_node))

    return dist`,
    traps: [
      "일반 dist 배열처럼 최소값 하나만 저장하면 틀린다.",
      "중복 경로 후보를 어느 정도 허용해야 한다.",
      "간선 가중치가 음수면 다익스트라를 쓰면 안 된다.",
    ],
    problems: [
      { id: "boj-1854", platform: "BOJ", title: "K번째 최단경로 찾기", difficulty: "Platinum IV", url: "https://www.acmicpc.net/problem/1854", note: "대표 K번째 최단경로" },
      { id: "boj-5719", platform: "BOJ", title: "거의 최단 경로", difficulty: "Platinum V", url: "https://www.acmicpc.net/problem/5719", note: "최단경로 제거 후 재탐색" },
      { id: "boj-11779", platform: "BOJ", title: "최소비용 구하기 2", difficulty: "Gold III", url: "https://www.acmicpc.net/problem/11779", note: "경로 복원 기본" },
      { id: "pg-72413", platform: "Programmers", title: "합승 택시 요금", difficulty: "Level 3", url: "https://school.programmers.co.kr/learn/courses/30/lessons/72413", note: "다익스트라/플로이드 판단" },
      { id: "pg-49189", platform: "Programmers", title: "가장 먼 노드", difficulty: "Level 3", url: "https://school.programmers.co.kr/learn/courses/30/lessons/49189", note: "그래프 최단거리 기본" },
      { id: "ct-shortest", platform: "CodeTree", title: "최단거리 / 다익스트라 연습", difficulty: "Gold+", url: "https://www.codetree.ai/training-field/search?keyword=dijkstra", note: "다익스트라 검색 결과" },
    ],
  },
  {
    id: "bfs-state",
    title: "BFS + 상태 확장",
    subtitle: "visited[y][x][state]",
    difficulty: "PRO",
    level: 3,
    tags: ["BFS", "state", "3D visited"],
    signal: "벽 부수기, 열쇠, 문, 방향, 남은 횟수 → 상태 차원 추가",
    idea: [
      "위치만 방문 체크하면 안 된다.",
      "같은 칸이어도 상태가 다르면 다른 노드다.",
      "visited[y][x][state] 형태로 확장한다.",
    ],
    code: `from collections import deque

visited = [[[0] * 2 for _ in range(m)] for _ in range(n)]
q = deque()
q.append((0, 0, 0))
visited[0][0][0] = 1

while q:
    y, x, used = q.popleft()

    for dy, dx in ((1,0), (-1,0), (0,1), (0,-1)):
        ny, nx = y + dy, x + dx

        if ny < 0 or ny >= n or nx < 0 or nx >= m:
            continue

        if board[ny][nx] == 1 and used == 0:
            visited[ny][nx][1] = visited[y][x][used] + 1
            q.append((ny, nx, 1))

        if board[ny][nx] == 0 and visited[ny][nx][used] == 0:
            visited[ny][nx][used] = visited[y][x][used] + 1
            q.append((ny, nx, used))`,
    traps: [
      "visited[y][x] 하나만 쓰면 상태가 섞인다.",
      "상태 개수가 커지면 메모리부터 계산해야 한다.",
      "벽을 부순 상태와 안 부순 상태는 완전히 다르다.",
    ],
    problems: [
      { id: "boj-2206", platform: "BOJ", title: "벽 부수고 이동하기", difficulty: "Gold III", url: "https://www.acmicpc.net/problem/2206", note: "벽 1회 상태 BFS" },
      { id: "boj-1194", platform: "BOJ", title: "달이 차오른다, 가자.", difficulty: "Gold I", url: "https://www.acmicpc.net/problem/1194", note: "열쇠 비트마스킹 BFS" },
      { id: "boj-1600", platform: "BOJ", title: "말이 되고픈 원숭이", difficulty: "Gold III", url: "https://www.acmicpc.net/problem/1600", note: "말 이동 횟수 상태" },
      { id: "boj-7569", platform: "BOJ", title: "토마토", difficulty: "Gold V", url: "https://www.acmicpc.net/problem/7569", note: "3차원 BFS 기본" },
      { id: "pg-1844", platform: "Programmers", title: "게임 맵 최단거리", difficulty: "Level 2", url: "https://school.programmers.co.kr/learn/courses/30/lessons/1844", note: "격자 BFS 기본" },
      { id: "pg-87694", platform: "Programmers", title: "아이템 줍기", difficulty: "Level 3", url: "https://school.programmers.co.kr/learn/courses/30/lessons/87694", note: "좌표 2배 확장 BFS" },
      { id: "pg-159993", platform: "Programmers", title: "미로 탈출", difficulty: "Level 2", url: "https://school.programmers.co.kr/learn/courses/30/lessons/159993", note: "레버 상태 분리" },
      { id: "ct-bfs", platform: "CodeTree", title: "격자 BFS / 상태 BFS 연습", difficulty: "Gold+", url: "https://www.codetree.ai/training-field/search?keyword=bfs%20grid", note: "격자 BFS 검색 결과" },
    ],
  },
  {
    id: "dfs-pruning",
    title: "DFS + 조합 + 가지치기",
    subtitle: "Backtracking",
    difficulty: "PRO",
    level: 3,
    tags: ["DFS", "combination", "pruning"],
    signal: "여러 개 선택, 제거 조합, 최적값 → DFS + pruning",
    idea: [
      "모든 조합을 DFS로 만든다.",
      "현재 값이 이미 답보다 나쁘면 중단한다.",
      "선택/비선택 구조를 빠르게 설계한다.",
    ],
    code: `def dfs(idx, selected, cost):
    global answer

    if cost >= answer:
        return

    if selected == target_count:
        answer = min(answer, cost)
        return

    if idx == n:
        return

    dfs(idx + 1, selected + 1, cost + arr[idx])
    dfs(idx + 1, selected, cost)`,
    traps: [
      "가지치기가 없으면 시간초과가 난다.",
      "선택 순서를 정렬하면 가지치기가 더 잘 먹힐 수 있다.",
      "DFS 후 상태 복구를 빼먹으면 틀린다.",
    ],
    problems: [
      { id: "boj-15684", platform: "BOJ", title: "사다리 조작", difficulty: "Gold III", url: "https://www.acmicpc.net/problem/15684", note: "조합 + 시뮬레이션" },
      { id: "boj-17135", platform: "BOJ", title: "캐슬 디펜스", difficulty: "Gold III", url: "https://www.acmicpc.net/problem/17135", note: "궁수 위치 조합" },
      { id: "boj-14502", platform: "BOJ", title: "연구소", difficulty: "Gold IV", url: "https://www.acmicpc.net/problem/14502", note: "벽 3개 조합 + BFS" },
      { id: "pg-92343", platform: "Programmers", title: "양과 늑대", difficulty: "Level 3", url: "https://school.programmers.co.kr/learn/courses/30/lessons/92343", note: "트리 DFS 상태 탐색" },
      { id: "pg-60062", platform: "Programmers", title: "외벽 점검", difficulty: "Level 3", url: "https://school.programmers.co.kr/learn/courses/30/lessons/60062", note: "순열/가지치기" },
      { id: "pg-43164", platform: "Programmers", title: "여행경로", difficulty: "Level 3", url: "https://school.programmers.co.kr/learn/courses/30/lessons/43164", note: "DFS 경로 복원" },
      { id: "ct-backtracking", platform: "CodeTree", title: "Backtracking / 조합 탐색 연습", difficulty: "Gold+", url: "https://www.codetree.ai/training-field/search?keyword=backtracking", note: "백트래킹 검색 결과" },
    ],
  },
  {
    id: "heap-tuple",
    title: "우선순위 여러 개 정렬",
    subtitle: "heap tuple",
    difficulty: "Gold+",
    level: 2,
    tags: ["heapq", "tuple", "tie-break"],
    signal: "1순위, 2순위, 삽입순 정렬 → tuple heap",
    idea: [
      "heapq는 튜플 앞에서부터 비교한다.",
      "큰 값이 먼저면 음수로 바꿔 넣는다.",
      "삽입순이 필요하면 order를 함께 넣는다.",
    ],
    code: `import heapq

h = []
order = 0

def push(name, score, priority):
    global order
    order += 1

    heapq.heappush(h, (-score, priority, order, name))

def pop():
    score, priority, order, name = heapq.heappop(h)
    return name, -score, priority`,
    traps: [
      "문자열, 숫자 섞어서 비교되면 TypeError가 날 수 있다.",
      "큰 값 우선은 음수 처리한다.",
      "동점 처리 기준을 반드시 튜플에 포함한다.",
    ],
    problems: [
      { id: "boj-11286", platform: "BOJ", title: "절댓값 힙", difficulty: "Silver I", url: "https://www.acmicpc.net/problem/11286", note: "복합 우선순위 기본" },
      { id: "boj-2075", platform: "BOJ", title: "N번째 큰 수", difficulty: "Silver II", url: "https://www.acmicpc.net/problem/2075", note: "Top N heap 유지" },
      { id: "boj-2696", platform: "BOJ", title: "중앙값 구하기", difficulty: "Gold II", url: "https://www.acmicpc.net/problem/2696", note: "두 heap 응용" },
      { id: "pg-42626", platform: "Programmers", title: "더 맵게", difficulty: "Level 2", url: "https://school.programmers.co.kr/learn/courses/30/lessons/42626", note: "최솟값 2개 반복" },
      { id: "pg-12927", platform: "Programmers", title: "야근 지수", difficulty: "Level 3", url: "https://school.programmers.co.kr/learn/courses/30/lessons/12927", note: "최댓값 heap" },
      { id: "ct-heap", platform: "CodeTree", title: "Heap / Priority Queue 연습", difficulty: "Silver~Gold", url: "https://www.codetree.ai/training-field/search?keyword=heap", note: "heap 검색 결과" },
    ],
  },
  {
    id: "outer-bfs",
    title: "외곽 BFS",
    subtitle: "맵 확장",
    difficulty: "Gold+",
    level: 3,
    tags: ["BFS", "padding", "outside"],
    signal: "밖에서 들어가기, 외곽, 탈출 → 맵 확장",
    idea: [
      "맵을 상하좌우 한 칸씩 확장한다.",
      "확장된 바깥 칸에서 BFS를 시작한다.",
      "경계 처리를 단순하게 만든다.",
    ],
    code: `from collections import deque

new_board = [["."] * (w + 2) for _ in range(h + 2)]

for y in range(h):
    for x in range(w):
        new_board[y + 1][x + 1] = board[y][x]

q = deque()
q.append((0, 0))
visited = [[0] * (w + 2) for _ in range(h + 2)]
visited[0][0] = 1`,
    traps: [
      "원래 맵의 좌표와 확장 맵 좌표가 1씩 차이난다.",
      "외부에서 시작해야 문/벽 처리가 쉬워진다.",
      "가장자리 조건을 직접 처리하려고 하면 실수가 많다.",
    ],
    problems: [
      { id: "boj-9376", platform: "BOJ", title: "탈옥", difficulty: "Platinum V", url: "https://www.acmicpc.net/problem/9376", note: "외부 BFS 대표" },
      { id: "boj-5427", platform: "BOJ", title: "불", difficulty: "Gold IV", url: "https://www.acmicpc.net/problem/5427", note: "불 + 사람 BFS" },
      { id: "boj-3055", platform: "BOJ", title: "탈출", difficulty: "Gold IV", url: "https://www.acmicpc.net/problem/3055", note: "물 + 고슴도치 BFS" },
      { id: "pg-87694-outer", platform: "Programmers", title: "아이템 줍기", difficulty: "Level 3", url: "https://school.programmers.co.kr/learn/courses/30/lessons/87694", note: "외곽선 경로 BFS" },
      { id: "pg-159993-outer", platform: "Programmers", title: "미로 탈출", difficulty: "Level 2", url: "https://school.programmers.co.kr/learn/courses/30/lessons/159993", note: "분리 BFS" },
      { id: "ct-escape", platform: "CodeTree", title: "탈출 / 외곽 BFS 연습", difficulty: "Gold+", url: "https://www.codetree.ai/training-field/search?keyword=escape%20bfs", note: "탈출 BFS 검색 결과" },
    ],
  },
];

const platformOrder = { BOJ: 0, CodeTree: 1, Programmers: 2 };

function sortProblems(problems) {
  return [...problems].sort((a, b) => {
    const po = (platformOrder[a.platform] ?? 99) - (platformOrder[b.platform] ?? 99);
    if (po !== 0) return po;
    return a.title.localeCompare(b.title, "ko");
  });
}

function getAllProblems(patterns) {
  return patterns.flatMap((pattern) =>
    pattern.problems.map((problem) => ({
      ...problem,
      patternId: pattern.id,
      patternTitle: pattern.title,
      patternLevel: pattern.level,
    }))
  );
}

function pickTodayProblem(problems) {
  if (problems.length === 0) return null;
  const today = new Date();
  const key = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
  return problems[key % problems.length];
}

function CodeBlock({ children }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(children);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      alert("복사에 실패했습니다.");
    }
  };

  return (
    <div className="code-wrap">
      <button className="copy-btn" onClick={copy}>{copied ? "복사됨" : "코드 복사"}</button>
      <pre><code>{children}</code></pre>
    </div>
  );
}

function DifficultyBadge({ difficulty, level }) {
  return (
    <div className="difficulty">
      <span>{difficulty}</span>
      <div className="dots">
        {Array.from({ length: 5 }).map((_, idx) => <i key={idx} className={idx < level ? "on" : ""} />)}
      </div>
    </div>
  );
}

function StatsDashboard({ patterns, solvedMap }) {
  const allProblems = getAllProblems(patterns);
  const solvedCount = allProblems.filter((p) => solvedMap[p.id]).length;
  const percent = allProblems.length ? Math.round((solvedCount / allProblems.length) * 100) : 0;

  const byPlatform = ["BOJ", "CodeTree", "Programmers"].map((platform) => {
    const list = allProblems.filter((p) => p.platform === platform);
    const solved = list.filter((p) => solvedMap[p.id]).length;
    return { platform, total: list.length, solved };
  });

  return (
    <section className="dashboard">
      <div className="stat-card primary">
        <span>전체 진행률</span>
        <strong>{percent}%</strong>
        <div className="progress"><i style={{ width: `${percent}%` }} /></div>
        <em>{solvedCount} / {allProblems.length} 문제 완료</em>
      </div>

      {byPlatform.map((row) => {
        const rowPercent = row.total ? Math.round((row.solved / row.total) * 100) : 0;
        return (
          <div className="stat-card" key={row.platform}>
            <span>{row.platform}</span>
            <strong>{row.solved}/{row.total}</strong>
            <div className="progress"><i style={{ width: `${rowPercent}%` }} /></div>
            <em>{rowPercent}% 완료</em>
          </div>
        );
      })}
    </section>
  );
}

function TodayProblem({ problem, onToggleSolved, solved }) {
  if (!problem) return null;

  return (
    <section className="today-card">
      <div>
        <p className="eyebrow">오늘의 PRO 문제</p>
        <h2>{problem.title}</h2>
        <p>{problem.patternTitle} · {problem.platform} · {problem.difficulty}</p>
        <p className="note">{problem.note}</p>
      </div>
      <div className="today-actions">
        <a href={problem.url} target="_blank" rel="noreferrer">문제 열기</a>
        <button className={solved ? "done" : ""} onClick={() => onToggleSolved(problem.id)}>
          {solved ? "풀이 완료됨" : "풀이 체크"}
        </button>
      </div>
    </section>
  );
}

function ProblemManager({ problems, setPatterns, selectedId, solvedMap, onToggleSolved, platformFilter, setPlatformFilter }) {
  const [form, setForm] = useState({ platform: "BOJ", title: "", difficulty: "Gold III", url: "", note: "" });

  const addProblem = () => {
    if (!form.title.trim()) return;

    setPatterns((prev) =>
      prev.map((pattern) => {
        if (pattern.id !== selectedId) return pattern;
        const newProblem = {
          id: `${form.platform.toLowerCase()}-${Date.now()}`,
          platform: form.platform.trim() || "BOJ",
          title: form.title.trim(),
          difficulty: form.difficulty.trim() || "Gold III",
          url: form.url.trim() || "#",
          note: form.note.trim() || "직접 추가한 문제",
        };
        return { ...pattern, problems: [...pattern.problems, newProblem] };
      })
    );

    setForm({ platform: "BOJ", title: "", difficulty: "Gold III", url: "", note: "" });
  };

  const removeProblem = (problemId) => {
    setPatterns((prev) =>
      prev.map((pattern) => {
        if (pattern.id !== selectedId) return pattern;
        return { ...pattern, problems: pattern.problems.filter((p) => p.id !== problemId) };
      })
    );
  };

  const visibleProblems = sortProblems(problems).filter((p) => platformFilter === "ALL" || p.platform === platformFilter);

  return (
    <section className="manager">
      <div className="section-title"><p>문제 관리</p><h2>추천 문제 추가 / 삭제 / 풀이 체크</h2></div>

      <div className="platform-tabs">
        {["ALL", "BOJ", "CodeTree", "Programmers"].map((p) => (
          <button key={p} className={platformFilter === p ? "active" : ""} onClick={() => setPlatformFilter(p)}>
            {p === "ALL" ? "전체" : p}
          </button>
        ))}
      </div>

      <div className="problem-form">
        <select value={form.platform} onChange={(e) => setForm({ ...form, platform: e.target.value })}>
          <option value="BOJ">BOJ</option>
          <option value="CodeTree">CodeTree</option>
          <option value="Programmers">Programmers</option>
        </select>
        <input placeholder="문제명" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
        <input placeholder="난이도" value={form.difficulty} onChange={(e) => setForm({ ...form, difficulty: e.target.value })} />
        <input placeholder="문제 링크" value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })} />
        <input placeholder="메모" value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} />
        <button onClick={addProblem}>추가</button>
      </div>

      <div className="problem-list">
        {visibleProblems.map((problem) => (
          <div className={solvedMap[problem.id] ? "problem-row solved" : "problem-row"} key={problem.id}>
            <label className="check">
              <input type="checkbox" checked={!!solvedMap[problem.id]} onChange={() => onToggleSolved(problem.id)} />
              <span />
            </label>
            <div className="problem-info">
              <strong>[{problem.platform}] {problem.title}</strong>
              <span>{problem.difficulty} · {problem.note}</span>
            </div>
            <div className="problem-actions">
              <a href={problem.url} target="_blank" rel="noreferrer">열기</a>
              <button onClick={() => removeProblem(problem.id)}>삭제</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function PatternDetail({ pattern, setPatterns, solvedMap, onToggleSolved, platformFilter, setPlatformFilter }) {
  const sorted = sortProblems(pattern.problems).filter((p) => platformFilter === "ALL" || p.platform === platformFilter);

  return (
    <article className="detail">
      <div className="detail-head">
        <div>
          <p className="eyebrow">{pattern.subtitle}</p>
          <h1>{pattern.title}</h1>
          <p className="signal">판단 신호: {pattern.signal}</p>
        </div>
        <DifficultyBadge difficulty={pattern.difficulty} level={pattern.level} />
      </div>

      <div className="tag-list">{pattern.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>

      <section>
        <div className="section-title"><p>핵심 아이디어</p><h2>이렇게 보면 됩니다</h2></div>
        <ol className="idea-list">{pattern.idea.map((item, idx) => <li key={idx}>{item}</li>)}</ol>
      </section>

      <section>
        <div className="section-title"><p>Python 예제</p><h2>바로 외울 코드</h2></div>
        <CodeBlock>{pattern.code}</CodeBlock>
      </section>

      <section>
        <div className="section-title"><p>실전 함정</p><h2>여기서 많이 틀립니다</h2></div>
        <div className="trap-grid">{pattern.traps.map((trap, idx) => <div className="trap" key={idx}><b>{idx + 1}</b><p>{trap}</p></div>)}</div>
      </section>

      <section>
        <div className="section-title"><p>추천 문제</p><h2>백준 / 코드트리 / 프로그래머스</h2></div>
        <div className="problem-cards">
          {sorted.map((problem) => (
            <a className={solvedMap[problem.id] ? "problem-card solved" : "problem-card"} key={problem.id} href={problem.url} target="_blank" rel="noreferrer">
              <span>{problem.platform}</span>
              <strong>{problem.title}</strong>
              <em>{problem.difficulty}</em>
              <small>{problem.note}</small>
            </a>
          ))}
        </div>
      </section>

      <ProblemManager
        problems={pattern.problems}
        selectedId={pattern.id}
        setPatterns={setPatterns}
        solvedMap={solvedMap}
        onToggleSolved={onToggleSolved}
        platformFilter={platformFilter}
        setPlatformFilter={setPlatformFilter}
      />
    </article>
  );
}

export default function App() {
  const [patterns, setPatterns] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved).patterns : initialPatterns;
    } catch {
      return initialPatterns;
    }
  });

  const [solvedMap, setSolvedMap] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved).solvedMap || {} : {};
    } catch {
      return {};
    }
  });

  const [selectedId, setSelectedId] = useState(patterns[0]?.id || initialPatterns[0].id);
  const [query, setQuery] = useState("");
  const [levelFilter, setLevelFilter] = useState("all");
  const [platformFilter, setPlatformFilter] = useState("ALL");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ patterns, solvedMap }));
  }, [patterns, solvedMap]);

  const allProblems = useMemo(() => sortProblems(getAllProblems(patterns)), [patterns]);
  const todayProblem = useMemo(() => pickTodayProblem(allProblems), [allProblems]);

  const filtered = useMemo(() => {
    return patterns.filter((pattern) => {
      const q = query.trim().toLowerCase();
      const matchesQuery =
        !q ||
        pattern.title.toLowerCase().includes(q) ||
        pattern.subtitle.toLowerCase().includes(q) ||
        pattern.tags.some((tag) => tag.toLowerCase().includes(q)) ||
        pattern.problems.some((problem) => problem.title.toLowerCase().includes(q));

      const matchesLevel =
        levelFilter === "all" ||
        (levelFilter === "easy" && pattern.level <= 2) ||
        (levelFilter === "mid" && pattern.level === 3) ||
        (levelFilter === "hard" && pattern.level >= 4);

      const matchesPlatform =
        platformFilter === "ALL" ||
        pattern.problems.some((problem) => problem.platform === platformFilter);

      return matchesQuery && matchesLevel && matchesPlatform;
    });
  }, [patterns, query, levelFilter, platformFilter]);

  const selected = patterns.find((pattern) => pattern.id === selectedId) || patterns[0] || initialPatterns[0];

  const toggleSolved = (problemId) => {
    setSolvedMap((prev) => ({ ...prev, [problemId]: !prev[problemId] }));
  };

  const deletePattern = (id) => {
    if (patterns.length <= 1) return;
    const nextList = patterns.filter((pattern) => pattern.id !== id);
    setPatterns(nextList);
    if (selectedId === id && nextList[0]) setSelectedId(nextList[0].id);
  };

  const resetData = () => {
    localStorage.removeItem(STORAGE_KEY);
    setPatterns(initialPatterns);
    setSolvedMap({});
    setSelectedId(initialPatterns[0].id);
    setPlatformFilter("ALL");
  };

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand"><div className="logo">A</div><div><strong>Algo Tracker</strong><span>PRO Pattern Cards</span></div></div>

        <div className="filters">
          <input placeholder="패턴/문제 검색" value={query} onChange={(e) => setQuery(e.target.value)} />
          <select value={levelFilter} onChange={(e) => setLevelFilter(e.target.value)}>
            <option value="all">전체 난이도</option>
            <option value="easy">기초~Gold</option>
            <option value="mid">Gold+</option>
            <option value="hard">PRO급</option>
          </select>
        </div>

        <div className="platform-tabs side">
          {["ALL", "BOJ", "CodeTree", "Programmers"].map((p) => (
            <button key={p} className={platformFilter === p ? "active" : ""} onClick={() => setPlatformFilter(p)}>
              {p === "ALL" ? "전체" : p}
            </button>
          ))}
        </div>

        <div className="pattern-menu">
          {filtered.map((pattern) => (
            <button key={pattern.id} className={selectedId === pattern.id ? "pattern active" : "pattern"} onClick={() => setSelectedId(pattern.id)}>
              <div><strong>{pattern.title}</strong><span>{pattern.subtitle}</span></div>
              <DifficultyBadge difficulty={pattern.difficulty} level={pattern.level} />
            </button>
          ))}
        </div>
      </aside>

      <main>
        <div className="top-actions">
          <div><p className="eyebrow">삼성 PRO 대비</p><h1>자료구조 실전 패턴 모음</h1></div>
          <div className="action-row">
            <button className="ghost" onClick={resetData}>초기화</button>
            <button className="danger" onClick={() => deletePattern(selected.id)}>현재 패턴 삭제</button>
          </div>
        </div>

        <StatsDashboard patterns={patterns} solvedMap={solvedMap} />
        <TodayProblem problem={todayProblem} solved={todayProblem ? !!solvedMap[todayProblem.id] : false} onToggleSolved={toggleSolved} />

        <PatternDetail
          pattern={selected}
          setPatterns={setPatterns}
          solvedMap={solvedMap}
          onToggleSolved={toggleSolved}
          platformFilter={platformFilter}
          setPlatformFilter={setPlatformFilter}
        />
      </main>
    </div>
  );
}
