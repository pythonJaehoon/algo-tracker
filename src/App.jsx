import { useMemo, useState } from 'react'
import './App.css'

const initialProblems = [
  { id: 1, title: '백준 2151 거울 설치', status: '진행중', url: 'https://www.acmicpc.net/problem/2151' },
  { id: 2, title: '백준 1854 K번째 최단경로', status: '미분류', url: 'https://www.acmicpc.net/problem/1854' },
  { id: 3, title: '코드트리 왕실의 기사 대결', status: '완료', url: 'https://www.codetree.ai/training-field/frequent-problems/problems/royal-knight-duel/description?page=1&pageSize=20' }
]

const patterns = [
  {
    "title": "다익스트라 변형",
    "difficulty": "Gold 2 ~ Platinum 5",
    "level": "PRO 기본~중급",
    "quick5": "가중치 + 최단거리 → 다익스트라",
    "quick30": "상태가 붙으면 dist[노드][상태] 또는 dist[위치][상태]로 확장합니다.",
    "boj": [
      [
        "백준 1753 최단경로",
        "https://www.acmicpc.net/problem/1753"
      ],
      [
        "백준 1504 특정한 최단 경로",
        "https://www.acmicpc.net/problem/1504"
      ],
      [
        "백준 2151 거울 설치",
        "https://www.acmicpc.net/problem/2151"
      ]
    ],
    "codetree": [
      [
        "코드트리 삼성 SW 기출 모음",
        "https://www.codetree.ai/ko/frequent-problems/samsung-sw"
      ]
    ],
    "code": "import heapq\nINF = int(1e18)\n\ndef dijkstra(start):\n    dist = [INF] * (n + 1)\n    dist[start] = 0\n    h = [(0, start)]\n\n    while h:\n        nowv, nowp = heapq.heappop(h)\n        if dist[nowp] != nowv:\n            continue\n\n        for nextv, nextp in graph[nowp]:\n            cost = nowv + nextv\n            if dist[nextp] > cost:\n                dist[nextp] = cost\n                heapq.heappush(h, (cost, nextp))\n\n    return dist"
  },
  {
    "title": "K번째 최단거리",
    "difficulty": "Platinum 5 ~ Platinum 4",
    "level": "PRO 중급",
    "quick5": "최단거리 하나가 아니라 K번째 최단거리 → 노드별 여러 비용 저장",
    "quick30": "각 노드마다 도착 비용을 K개까지 보관하고, 더 좋은 후보만 힙에 넣습니다.",
    "boj": [
      [
        "백준 1854 K번째 최단경로",
        "https://www.acmicpc.net/problem/1854"
      ]
    ],
    "codetree": [
      [
        "코드트리 삼성 SW 기출 모음",
        "https://www.codetree.ai/ko/frequent-problems/samsung-sw"
      ]
    ],
    "code": "import heapq\n\ndef kth_dijkstra(start):\n    dist = [[] for _ in range(n + 1)]\n    h = [(0, start)]\n    heapq.heappush(dist[start], 0)\n\n    while h:\n        nowv, nowp = heapq.heappop(h)\n\n        for nextv, nextp in graph[nowp]:\n            cost = nowv + nextv\n\n            if len(dist[nextp]) < k:\n                heapq.heappush(dist[nextp], -cost)\n                heapq.heappush(h, (cost, nextp))\n            elif -dist[nextp][0] > cost:\n                heapq.heappop(dist[nextp])\n                heapq.heappush(dist[nextp], -cost)\n                heapq.heappush(h, (cost, nextp))"
  },
  {
    "title": "BFS + 상태",
    "difficulty": "Gold 3 ~ Gold 1",
    "level": "PRO 기본",
    "quick5": "이동 횟수 최단 + 상태 변화 → 3차원 BFS",
    "quick30": "벽 부수기, 열쇠, 방향, 점프 횟수는 visited[y][x][state]로 관리합니다.",
    "boj": [
      [
        "백준 7569 토마토",
        "https://www.acmicpc.net/problem/7569"
      ],
      [
        "백준 2206 벽 부수고 이동하기",
        "https://www.acmicpc.net/problem/2206"
      ],
      [
        "백준 1194 달이 차오른다, 가자",
        "https://www.acmicpc.net/problem/1194"
      ]
    ],
    "codetree": [
      [
        "코드트리 삼성 SW 기출 모음",
        "https://www.codetree.ai/ko/frequent-problems/samsung-sw"
      ]
    ],
    "code": "from collections import deque\n\ndef bfs():\n    q = deque()\n    visited = [[[0] * STATE for _ in range(m)] for _ in range(n)]\n\n    q.append((sy, sx, 0))\n    visited[sy][sx][0] = 1\n\n    while q:\n        y, x, state = q.popleft()\n\n        for dy, dx in dirs:\n            ny = y + dy\n            nx = x + dx\n            ns = state\n\n            if 0 <= ny < n and 0 <= nx < m:\n                if visited[ny][nx][ns] == 0:\n                    visited[ny][nx][ns] = visited[y][x][state] + 1\n                    q.append((ny, nx, ns))"
  },
  {
    "title": "DFS + 백트래킹",
    "difficulty": "Gold 4 ~ Gold 1",
    "level": "PRO 기본",
    "quick5": "조합/순열/선택 제거 → DFS",
    "quick30": "후보를 고르고 불가능한 경우는 즉시 가지치기합니다.",
    "boj": [
      [
        "백준 15686 치킨 배달",
        "https://www.acmicpc.net/problem/15686"
      ],
      [
        "백준 15684 사다리 조작",
        "https://www.acmicpc.net/problem/15684"
      ]
    ],
    "codetree": [
      [
        "코드트리 삼성 SW 기출 모음",
        "https://www.codetree.ai/ko/frequent-problems/samsung-sw"
      ]
    ],
    "code": "def dfs(idx, selected):\n    global answer\n\n    if len(selected) == target:\n        answer = min(answer, check(selected))\n        return\n\n    for i in range(idx, len(candidates)):\n        selected.append(candidates[i])\n        dfs(i + 1, selected)\n        selected.pop()"
  },
  {
    "title": "DFS + BFS 조합",
    "difficulty": "Gold 4 ~ Gold 1",
    "level": "PRO 기본~중급",
    "quick5": "몇 개 선택 후 퍼뜨리기/검증 → DFS+BFS",
    "quick30": "벽 세우기, 바이러스 선택, 제거 대상 선택 유형입니다.",
    "boj": [
      [
        "백준 14502 연구소",
        "https://www.acmicpc.net/problem/14502"
      ],
      [
        "백준 17142 연구소 3",
        "https://www.acmicpc.net/problem/17142"
      ]
    ],
    "codetree": [
      [
        "코드트리 삼성 SW 기출 모음",
        "https://www.codetree.ai/ko/frequent-problems/samsung-sw"
      ]
    ],
    "code": "from collections import deque\n\ndef dfs(idx, selected):\n    if len(selected) == target:\n        return bfs(selected)\n\n    for i in range(idx, len(candidates)):\n        dfs(i + 1, selected + [candidates[i]])\n\ndef bfs(selected):\n    q = deque(selected)\n    visited = [[0] * m for _ in range(n)]\n\n    while q:\n        y, x = q.popleft()\n        for dy, dx in dirs:\n            ny, nx = y + dy, x + dx\n            if 0 <= ny < n and 0 <= nx < m and not visited[ny][nx]:\n                visited[ny][nx] = 1\n                q.append((ny, nx))"
  },
  {
    "title": "트리 삭제 / 이동",
    "difficulty": "Gold 3 ~ Platinum 5",
    "level": "PRO 중급",
    "quick5": "부모-자식 관계 변경 → parent + children",
    "quick30": "서브트리 삭제는 DFS, 이동은 기존 부모에서 제거 후 새 부모에 추가합니다.",
    "boj": [
      [
        "백준 1068 트리",
        "https://www.acmicpc.net/problem/1068"
      ],
      [
        "백준 11725 트리의 부모 찾기",
        "https://www.acmicpc.net/problem/11725"
      ]
    ],
    "codetree": [
      [
        "코드트리 삼성 SW 기출 모음",
        "https://www.codetree.ai/ko/frequent-problems/samsung-sw"
      ]
    ],
    "code": "def remove_subtree(node):\n    removed.add(node)\n    for child in children[node]:\n        remove_subtree(child)\n\ndef move_subtree(node, new_parent):\n    old_parent = parent[node]\n\n    if old_parent != -1:\n        children[old_parent].remove(node)\n\n    parent[node] = new_parent\n    children[new_parent].append(node)"
  },
  {
    "title": "위상정렬",
    "difficulty": "Gold 5 ~ Gold 2",
    "level": "PRO 기본",
    "quick5": "선행 조건 / 순서 조건 → indegree",
    "quick30": "진입차수 0부터 큐에 넣고 하나씩 제거합니다.",
    "boj": [
      [
        "백준 2252 줄 세우기",
        "https://www.acmicpc.net/problem/2252"
      ],
      [
        "백준 1516 게임 개발",
        "https://www.acmicpc.net/problem/1516"
      ]
    ],
    "codetree": [
      [
        "코드트리 삼성 SW 기출 모음",
        "https://www.codetree.ai/ko/frequent-problems/samsung-sw"
      ]
    ],
    "code": "from collections import deque\n\ndef topology():\n    q = deque()\n\n    for i in range(1, n + 1):\n        if indegree[i] == 0:\n            q.append(i)\n\n    result = []\n    while q:\n        now = q.popleft()\n        result.append(now)\n\n        for nxt in graph[now]:\n            indegree[nxt] -= 1\n            if indegree[nxt] == 0:\n                q.append(nxt)\n\n    return result"
  },
  {
    "title": "유니온 파인드",
    "difficulty": "Gold 5 ~ Gold 2",
    "level": "PRO 기본",
    "quick5": "그룹 합치기 / 같은 집합 확인 → Union-Find",
    "quick30": "연결 여부, 사이클 판정, 집합 병합 문제에 사용합니다.",
    "boj": [
      [
        "백준 1717 집합의 표현",
        "https://www.acmicpc.net/problem/1717"
      ],
      [
        "백준 1976 여행 가자",
        "https://www.acmicpc.net/problem/1976"
      ],
      [
        "백준 1197 최소 스패닝 트리",
        "https://www.acmicpc.net/problem/1197"
      ]
    ],
    "codetree": [
      [
        "코드트리 삼성 SW 기출 모음",
        "https://www.codetree.ai/ko/frequent-problems/samsung-sw"
      ]
    ],
    "code": "def find(x):\n    if parent[x] != x:\n        parent[x] = find(parent[x])\n    return parent[x]\n\ndef union(a, b):\n    ra = find(a)\n    rb = find(b)\n\n    if ra == rb:\n        return\n\n    if ra < rb:\n        parent[rb] = ra\n    else:\n        parent[ra] = rb"
  },
  {
    "title": "Fenwick Tree",
    "difficulty": "Gold 2 ~ Platinum 5",
    "level": "PRO 중급",
    "quick5": "값 변경 + 구간합 반복 → Fenwick",
    "quick30": "업데이트와 누적합을 O(logN)에 처리합니다.",
    "boj": [
      [
        "백준 2042 구간 합 구하기",
        "https://www.acmicpc.net/problem/2042"
      ],
      [
        "백준 2357 최솟값과 최댓값",
        "https://www.acmicpc.net/problem/2357"
      ]
    ],
    "codetree": [
      [
        "코드트리 삼성 SW 기출 모음",
        "https://www.codetree.ai/ko/frequent-problems/samsung-sw"
      ]
    ],
    "code": "tree = [0] * (n + 1)\n\ndef update(i, diff):\n    while i <= n:\n        tree[i] += diff\n        i += i & -i\n\ndef prefix_sum(i):\n    result = 0\n    while i > 0:\n        result += tree[i]\n        i -= i & -i\n    return result\n\ndef range_sum(l, r):\n    return prefix_sum(r) - prefix_sum(l - 1)"
  },
  {
    "title": "이분탐색 + 결정",
    "difficulty": "Silver 1 ~ Gold 2",
    "level": "PRO 기본",
    "quick5": "최댓값의 최솟값 / 최솟값의 최댓값 → 이분탐색",
    "quick30": "정답을 mid로 가정하고 check(mid)로 가능 여부 판단합니다.",
    "boj": [
      [
        "백준 2110 공유기 설치",
        "https://www.acmicpc.net/problem/2110"
      ],
      [
        "백준 1654 랜선 자르기",
        "https://www.acmicpc.net/problem/1654"
      ],
      [
        "백준 2805 나무 자르기",
        "https://www.acmicpc.net/problem/2805"
      ]
    ],
    "codetree": [
      [
        "코드트리 삼성 SW 기출 모음",
        "https://www.codetree.ai/ko/frequent-problems/samsung-sw"
      ]
    ],
    "code": "def check(mid):\n    count = 0\n    for x in arr:\n        if x >= mid:\n            count += 1\n    return count >= target\n\nleft, right = 0, max_value\nanswer = 0\n\nwhile left <= right:\n    mid = (left + right) // 2\n\n    if check(mid):\n        answer = mid\n        left = mid + 1\n    else:\n        right = mid - 1"
  },
  {
    "title": "투 포인터",
    "difficulty": "Silver 1 ~ Gold 3",
    "level": "PRO 기본",
    "quick5": "연속 구간 / 부분합 / 길이 조건 → 투 포인터",
    "quick30": "left, right를 이동하며 현재 합/상태를 유지합니다.",
    "boj": [
      [
        "백준 1806 부분합",
        "https://www.acmicpc.net/problem/1806"
      ],
      [
        "백준 2003 수들의 합 2",
        "https://www.acmicpc.net/problem/2003"
      ],
      [
        "백준 2467 용액",
        "https://www.acmicpc.net/problem/2467"
      ]
    ],
    "codetree": [
      [
        "코드트리 삼성 SW 기출 모음",
        "https://www.codetree.ai/ko/frequent-problems/samsung-sw"
      ]
    ],
    "code": "left = 0\ntotal = 0\nanswer = int(1e18)\n\nfor right in range(n):\n    total += arr[right]\n\n    while total >= target:\n        answer = min(answer, right - left + 1)\n        total -= arr[left]\n        left += 1"
  },
  {
    "title": "Lazy Heap",
    "difficulty": "Gold 4 ~ Platinum 5",
    "level": "PRO 중급",
    "quick5": "삭제/수정이 많은 Top K → heap + dict",
    "quick30": "heap에서 바로 삭제하지 말고 pop할 때 유효성 검증합니다.",
    "boj": [
      [
        "백준 7662 이중 우선순위 큐",
        "https://www.acmicpc.net/problem/7662"
      ],
      [
        "백준 1715 카드 정렬하기",
        "https://www.acmicpc.net/problem/1715"
      ]
    ],
    "codetree": [
      [
        "코드트리 삼성 SW 기출 모음",
        "https://www.codetree.ai/ko/frequent-problems/samsung-sw"
      ]
    ],
    "code": "import heapq\n\nheap = []\nalive = {}\n\ndef add(id, score):\n    alive[id] = score\n    heapq.heappush(heap, (-score, id))\n\ndef delete(id):\n    if id in alive:\n        del alive[id]\n\ndef get_top():\n    while heap:\n        score, id = heapq.heappop(heap)\n        score = -score\n\n        if id in alive and alive[id] == score:\n            return id, score\n\n    return None"
  },
  {
    "title": "구현 시뮬레이션",
    "difficulty": "Gold 5 ~ Gold 1",
    "level": "PRO 핵심",
    "quick5": "문제가 길고 규칙이 많음 → 구현",
    "quick30": "move, rotate, attack, update처럼 함수로 나눠 실수를 줄입니다.",
    "boj": [
      [
        "백준 17144 미세먼지 안녕!",
        "https://www.acmicpc.net/problem/17144"
      ],
      [
        "백준 19237 어른 상어",
        "https://www.acmicpc.net/problem/19237"
      ],
      [
        "백준 23290 마법사 상어와 복제",
        "https://www.acmicpc.net/problem/23290"
      ]
    ],
    "codetree": [
      [
        "코드트리 왕실의 기사 대결",
        "https://www.codetree.ai/training-field/frequent-problems/problems/royal-knight-duel/description?page=1&pageSize=20"
      ],
      [
        "코드트리 삼성 SW 기출 모음",
        "https://www.codetree.ai/ko/frequent-problems/samsung-sw"
      ]
    ],
    "code": "def move():\n    pass\n\ndef rotate():\n    pass\n\ndef attack():\n    pass\n\ndef update_state():\n    pass\n\ndef simulate():\n    for turn in range(T):\n        move()\n        attack()\n        rotate()\n        update_state()"
  },
  {
    "title": "격자 회전 / 방향",
    "difficulty": "Gold 5 ~ Gold 2",
    "level": "PRO 핵심",
    "quick5": "배열 회전, 방향 전환 → 좌표 변환",
    "quick30": "90도 회전은 새 배열로 만드는 것이 안전합니다.",
    "boj": [
      [
        "백준 20055 컨베이어 벨트 위의 로봇",
        "https://www.acmicpc.net/problem/20055"
      ],
      [
        "백준 17822 원판 돌리기",
        "https://www.acmicpc.net/problem/17822"
      ],
      [
        "백준 20058 마법사 상어와 파이어스톰",
        "https://www.acmicpc.net/problem/20058"
      ]
    ],
    "codetree": [
      [
        "코드트리 삼성 SW 기출 모음",
        "https://www.codetree.ai/ko/frequent-problems/samsung-sw"
      ]
    ],
    "code": "def rotate_90(board):\n    n = len(board)\n    m = len(board[0])\n    new_board = [[0] * n for _ in range(m)]\n\n    for y in range(n):\n        for x in range(m):\n            new_board[x][n - 1 - y] = board[y][x]\n\n    return new_board"
  }
]

function downloadText(text, fileName) {
  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = fileName
  a.click()
  URL.revokeObjectURL(url)
}

function App() {
  const [tab, setTab] = useState('pro')
  const [proIndex, setProIndex] = useState(0)
  const [proView, setProView] = useState('quick5')
  const [problems, setProblems] = useState(initialProblems)
  const [problemText, setProblemText] = useState('')
  const [problemStatus, setProblemStatus] = useState('미분류')
  const [filter, setFilter] = useState('전체')

  const current = patterns[proIndex]

  const filteredProblems = useMemo(() => {
    if (filter === '전체') return problems
    return problems.filter(p => p.status === filter)
  }, [filter, problems])

  const counts = useMemo(() => ({
    total: problems.length,
    done: problems.filter(p => p.status === '완료').length,
    doing: problems.filter(p => p.status === '진행중').length
  }), [problems])

  const allLinkedProblems = useMemo(() => {
    return patterns.flatMap(p => [
      ...p.boj.map(x => ({ title: x[0], url: x[1], source: '백준', pattern: p.title, difficulty: p.difficulty })),
      ...p.codetree.map(x => ({ title: x[0], url: x[1], source: '코드트리', pattern: p.title, difficulty: p.difficulty })),
    ])
  }, [])

  const addProblem = () => {
    if (!problemText.trim()) return
    setProblems(prev => [...prev, { id: Date.now(), title: problemText.trim(), status: problemStatus, url: '' }])
    setProblemText('')
  }

  const addRecommended = () => {
    const pick = allLinkedProblems[Math.floor(Math.random() * allLinkedProblems.length)]
    setProblems(prev => [...prev, { id: Date.now(), title: pick.title, status: '미분류', url: pick.url }])
  }

  const patternMarkdown = (p) => `# ${p.title}

- 난이도: ${p.difficulty}
- PRO 수준: ${p.level}

## 5초 판단
${p.quick5}

## 30초 판단
${p.quick30}

## 백준 추천
${p.boj.map(x => `- ${x[0]}: ${x[1]}`).join('\n')}

## 코드트리 추천
${p.codetree.map(x => `- ${x[0]}: ${x[1]}`).join('\n')}

## Python 코드
\`\`\`python
${p.code}
\`\`\`
`

  const downloadCurrent = () => {
    if (proView === 'code') {
      downloadText(current.code, current.title.replaceAll(' ', '_') + '.py')
    } else {
      downloadText(patternMarkdown(current), current.title.replaceAll(' ', '_') + '.md')
    }
  }

  const downloadAll = () => {
    downloadText(patterns.map(patternMarkdown).join('\n---\n\n'), 'samsung_pro_patterns_all.md')
  }

  return (
    <div className="page">
      <section className="hero">
        <p className="eyebrow">Samsung PRO / Baekjoon / Codetree Tracker</p>
        <h1>알고리즘 학습 관리</h1>
        <p className="hero-desc">삼성 PRO 패턴, 추천 문제, 풀이 기록을 한 곳에서 관리하세요.</p>
      </section>

      <div className="tabs">
        <button className={tab === 'problems' ? 'active' : ''} onClick={() => setTab('problems')}>문제 관리</button>
        <button className={tab === 'pro' ? 'active' : ''} onClick={() => setTab('pro')}>오늘의 삼성 PRO 패턴</button>
      </div>

      {tab === 'problems' && (
        <>
          <section className="stats">
            <div className="stat-card"><strong>{counts.total}</strong><span>전체 문제</span></div>
            <div className="stat-card"><strong>{counts.done}</strong><span>완료</span></div>
            <div className="stat-card"><strong>{counts.doing}</strong><span>진행중</span></div>
          </section>

          <section className="panel recommend">
            <div>
              <h2>오늘의 추천 문제</h2>
              <p>패턴별 백준/코드트리 문제를 자동으로 추가합니다.</p>
            </div>
            <button onClick={addRecommended}>추가</button>
          </section>

          <section className="add-row">
            <input value={problemText} onChange={e => setProblemText(e.target.value)} placeholder="예: 백준 2151 거울 설치" />
            <select value={problemStatus} onChange={e => setProblemStatus(e.target.value)}>
              <option>미분류</option>
              <option>진행중</option>
              <option>완료</option>
            </select>
            <button onClick={addProblem}>추가</button>
          </section>

          <section className="filter-row">
            {['전체', '완료', '진행중', '미분류'].map(x => (
              <button key={x} className={filter === x ? 'active' : ''} onClick={() => setFilter(x)}>{x}</button>
            ))}
          </section>

          <section className="problem-list">
            {filteredProblems.length === 0 ? <p className="empty">표시할 문제가 없습니다.</p> : filteredProblems.map(p => (
              <div className="problem-item" key={p.id}>
                <span>{p.url ? <a href={p.url} target="_blank" rel="noreferrer">{p.title}</a> : p.title}</span>
                <b>{p.status}</b>
              </div>
            ))}
          </section>
        </>
      )}

      {tab === 'pro' && (
        <section className="pro-layout">
          <aside className="toc-card">
            <div className="toc-head">
              <h2>📚 목차</h2>
              <button onClick={downloadAll}>전체 다운로드</button>
            </div>
            <div className="toc-list">
              {patterns.map((p, i) => (
                <button key={p.title} className={proIndex === i ? 'active' : ''} onClick={() => {
                  setProIndex(i)
                  setProView('quick5')
                }}>
                  <span>{i + 1}</span>
                  <div>
                    <strong>{p.title}</strong>
                    <small>{p.difficulty}</small>
                  </div>
                </button>
              ))}
            </div>
          </aside>

          <section className="pattern-card">
            <div className="pattern-top">
              <div>
                <p className="label">오늘의 삼성 PRO 패턴</p>
                <h2>{current.title}</h2>
                <div className="badges">
                  <span>{current.difficulty}</span>
                  <span>{current.level}</span>
                </div>
              </div>
              <button onClick={downloadCurrent}>현재 내용 다운로드</button>
            </div>

            <div className="choice-row">
              <button className={proView === 'quick5' ? 'active' : ''} onClick={() => setProView('quick5')}>5초 판단 방법</button>
              <button className={proView === 'quick30' ? 'active' : ''} onClick={() => setProView('quick30')}>30초 판단 방법</button>
              <button className={proView === 'links' ? 'active' : ''} onClick={() => setProView('links')}>문제 자동 연결</button>
              <button className={proView === 'code' ? 'active' : ''} onClick={() => setProView('code')}>Python 코드</button>
            </div>

            <div className="content-box">
              {proView === 'quick5' && (
                <>
                  <h3>5초 판단 방법</h3>
                  <p>{current.quick5}</p>
                </>
              )}
              {proView === 'quick30' && (
                <>
                  <h3>30초 판단 방법</h3>
                  <p>{current.quick30}</p>
                </>
              )}
              {proView === 'links' && (
                <>
                  <h3>실제 문제 자동 연결</h3>
                  <div className="link-section">
                    <h4>백준</h4>
                    {current.boj.map(x => <a key={x[1]} href={x[1]} target="_blank" rel="noreferrer">{x[0]}</a>)}
                  </div>
                  <div className="link-section">
                    <h4>코드트리</h4>
                    {current.codetree.map(x => <a key={x[1]} href={x[1]} target="_blank" rel="noreferrer">{x[0]}</a>)}
                  </div>
                </>
              )}
              {proView === 'code' && (
                <>
                  <h3>Python 코드</h3>
                  <pre><code>{current.code}</code></pre>
                </>
              )}
            </div>
          </section>
        </section>
      )}
    </div>
  )
}

export default App
