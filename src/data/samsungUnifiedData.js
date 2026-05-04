export const samsungProPatterns = [
  {
    "id": "topk-lazy",
    "title": "Top-K 유지 + 삭제/수정",
    "category": "자료구조",
    "difficulty": "PRO",
    "level": 5,
    "tags": [
      "heapq",
      "dict",
      "lazy deletion",
      "ranking"
    ],
    "summary": "삭제/수정이 많은 우선순위 데이터에서 heap을 직접 지우지 않고 dict와 비교해 유효 후보만 뽑는 패턴입니다.",
    "signal": "삭제 많음 + 정렬 유지 + id 기반 조회 → lazy deletion",
    "strategy": [
      "dict에는 현재 유효 데이터만 둡니다.",
      "heap에는 후보를 계속 넣고 조회 시 유효성 검사합니다.",
      "수정은 새 데이터를 push하고 과거 데이터는 버립니다.",
      "Top-K 조회 시 임시로 빼고 다시 복구합니다."
    ],
    "code": "import heapq\n\ndata = {}\nheap = []\norder = 0\n\ndef add_or_update(id, score):\n    global order\n    order += 1\n    data[id] = (score, order)\n    heapq.heappush(heap, (-score, order, id))\n\ndef remove(id):\n    data.pop(id, None)\n\ndef get_top():\n    while heap:\n        neg, old_order, id = heapq.heappop(heap)\n        if id not in data:\n            continue\n        score, cur_order = data[id]\n        if cur_order == old_order and score == -neg:\n            return id, score\n    return None\n",
    "problems": [
      {
        "platform": "BOJ",
        "title": "이중 우선순위 큐",
        "difficulty": "Gold IV",
        "url": "https://www.acmicpc.net/problem/7662"
      },
      {
        "platform": "BOJ",
        "title": "문제 추천 시스템 Version 1",
        "difficulty": "Gold IV",
        "url": "https://www.acmicpc.net/problem/21939"
      },
      {
        "platform": "BOJ",
        "title": "문제 추천 시스템 Version 2",
        "difficulty": "Gold II",
        "url": "https://www.acmicpc.net/problem/21944"
      },
      {
        "platform": "Programmers",
        "title": "이중우선순위큐",
        "difficulty": "Level 3",
        "url": "https://school.programmers.co.kr/learn/courses/30/lessons/42628"
      }
    ]
  },
  {
    "id": "bfs-state",
    "title": "BFS + 상태 확장",
    "category": "그래프",
    "difficulty": "PRO",
    "level": 5,
    "tags": [
      "BFS",
      "3D visited",
      "state",
      "bitmask"
    ],
    "summary": "같은 칸이어도 벽을 부쉈는지, 열쇠를 가졌는지, 방향이 무엇인지에 따라 다른 상태로 처리하는 BFS입니다.",
    "signal": "벽 부수기 / 열쇠 / 방향 / 남은 횟수 → visited 차원 추가",
    "strategy": [
      "visited[y][x] 하나로 끝내지 않습니다.",
      "상태가 다르면 같은 위치도 다시 방문할 수 있습니다.",
      "상태 수가 크면 비트마스크로 압축합니다.",
      "최단거리면 BFS 레벨 순서가 보장되는지 확인합니다."
    ],
    "code": "from collections import deque\n\nq = deque([(0, 0, 0)])\nvisited = [[[0] * STATE for _ in range(m)] for _ in range(n)]\nvisited[0][0][0] = 1\n\nwhile q:\n    y, x, state = q.popleft()\n    for dy, dx in ((1,0),(-1,0),(0,1),(0,-1)):\n        ny, nx = y + dy, x + dx\n        if not (0 <= ny < n and 0 <= nx < m):\n            continue\n        ns = get_next_state(state, board[ny][nx])\n        if visited[ny][nx][ns]:\n            continue\n        visited[ny][nx][ns] = visited[y][x][state] + 1\n        q.append((ny, nx, ns))\n",
    "problems": [
      {
        "platform": "BOJ",
        "title": "벽 부수고 이동하기",
        "difficulty": "Gold III",
        "url": "https://www.acmicpc.net/problem/2206"
      },
      {
        "platform": "BOJ",
        "title": "달이 차오른다, 가자.",
        "difficulty": "Gold I",
        "url": "https://www.acmicpc.net/problem/1194"
      },
      {
        "platform": "BOJ",
        "title": "말이 되고픈 원숭이",
        "difficulty": "Gold III",
        "url": "https://www.acmicpc.net/problem/1600"
      },
      {
        "platform": "BOJ",
        "title": "벽 부수고 이동하기 4",
        "difficulty": "Gold II",
        "url": "https://www.acmicpc.net/problem/16946"
      }
    ]
  },
  {
    "id": "kth-dijkstra",
    "title": "K번째 최단경로",
    "category": "최단거리",
    "difficulty": "PRO",
    "level": 5,
    "tags": [
      "Dijkstra",
      "heapq",
      "k-th path"
    ],
    "summary": "각 노드 최단거리 하나가 아니라 여러 후보 경로를 K개까지 유지하는 다익스트라 변형입니다.",
    "signal": "최단이 아니라 K번째 / 여러 경로 후보 유지",
    "strategy": [
      "dist[node]를 숫자 하나가 아닌 리스트/heap으로 관리합니다.",
      "각 노드마다 K개까지 후보를 허용합니다.",
      "일반 visited를 쓰면 필요한 후보가 사라집니다.",
      "간선 가중치가 음수면 사용하지 않습니다."
    ],
    "code": "import heapq\n\ndef dijkstra(start):\n    INF = 10**18\n    dist = [INF] * (n + 1)\n    dist[start] = 0\n    h = [(0, start)]\n\n    while h:\n        cost, now = heapq.heappop(h)\n        if dist[now] != cost:\n            continue\n\n        for nc, nxt in graph[now]:\n            if dist[nxt] > cost + nc:\n                dist[nxt] = cost + nc\n                heapq.heappush(h, (dist[nxt], nxt))\n    return dist\n",
    "problems": [
      {
        "platform": "BOJ",
        "title": "K번째 최단경로 찾기",
        "difficulty": "Platinum IV",
        "url": "https://www.acmicpc.net/problem/1854"
      },
      {
        "platform": "BOJ",
        "title": "거의 최단 경로",
        "difficulty": "Platinum V",
        "url": "https://www.acmicpc.net/problem/5719"
      },
      {
        "platform": "Programmers",
        "title": "합승 택시 요금",
        "difficulty": "Level 3",
        "url": "https://school.programmers.co.kr/learn/courses/30/lessons/72413"
      }
    ]
  },
  {
    "id": "zero-one-bfs",
    "title": "0-1 BFS",
    "category": "최단거리",
    "difficulty": "PRO",
    "level": 4,
    "tags": [
      "deque",
      "0-1 BFS",
      "shortest path"
    ],
    "summary": "간선 비용이 0 또는 1일 때 heap 대신 deque로 최단거리를 빠르게 구하는 패턴입니다.",
    "signal": "가중치 0/1 → appendleft / append",
    "strategy": [
      "비용 0이면 appendleft 합니다.",
      "비용 1이면 append 합니다.",
      "방문 체크만 두면 갱신을 놓칠 수 있어 dist를 둡니다.",
      "0/1이 아니면 다익스트라를 씁니다."
    ],
    "code": "from collections import deque\n\nq = deque([(0, 0, 0)])\nvisited = [[[0] * STATE for _ in range(m)] for _ in range(n)]\nvisited[0][0][0] = 1\n\nwhile q:\n    y, x, state = q.popleft()\n    for dy, dx in ((1,0),(-1,0),(0,1),(0,-1)):\n        ny, nx = y + dy, x + dx\n        if not (0 <= ny < n and 0 <= nx < m):\n            continue\n        ns = get_next_state(state, board[ny][nx])\n        if visited[ny][nx][ns]:\n            continue\n        visited[ny][nx][ns] = visited[y][x][state] + 1\n        q.append((ny, nx, ns))\n",
    "problems": [
      {
        "platform": "BOJ",
        "title": "알고스팟",
        "difficulty": "Gold IV",
        "url": "https://www.acmicpc.net/problem/1261"
      },
      {
        "platform": "BOJ",
        "title": "숨바꼭질 3",
        "difficulty": "Gold V",
        "url": "https://www.acmicpc.net/problem/13549"
      },
      {
        "platform": "BOJ",
        "title": "레이저 통신",
        "difficulty": "Gold III",
        "url": "https://www.acmicpc.net/problem/6087"
      }
    ]
  },
  {
    "id": "dfs-pruning",
    "title": "DFS + 조합 + 가지치기",
    "category": "완전탐색",
    "difficulty": "PRO",
    "level": 4,
    "tags": [
      "DFS",
      "combination",
      "pruning",
      "simulation"
    ],
    "summary": "여러 개를 선택하거나 제거한 뒤 시뮬레이션으로 결과를 확인하는 삼성식 대표 패턴입니다.",
    "signal": "몇 개 선택 / 제거 조합 / 최적값 → DFS + pruning",
    "strategy": [
      "후보를 먼저 줄입니다.",
      "DFS로 조합을 만들고 매번 시뮬레이션합니다.",
      "현재 비용이 답보다 나쁘면 return합니다.",
      "상태 복구를 반드시 확인합니다."
    ],
    "code": "# 판단 → 상태 정의 → 자료구조 선택\n# 1. 입력 크기 확인\n# 2. 상태 수 계산\n# 3. 시간복잡도 계산\n# 4. 구현 순서 고정\n",
    "problems": [
      {
        "platform": "BOJ",
        "title": "사다리 조작",
        "difficulty": "Gold III",
        "url": "https://www.acmicpc.net/problem/15684"
      },
      {
        "platform": "BOJ",
        "title": "연구소",
        "difficulty": "Gold IV",
        "url": "https://www.acmicpc.net/problem/14502"
      },
      {
        "platform": "BOJ",
        "title": "치킨 배달",
        "difficulty": "Gold V",
        "url": "https://www.acmicpc.net/problem/15686"
      },
      {
        "platform": "Programmers",
        "title": "외벽 점검",
        "difficulty": "Level 3",
        "url": "https://school.programmers.co.kr/learn/courses/30/lessons/60062"
      }
    ]
  },
  {
    "id": "tree-move",
    "title": "트리 삭제 / 이동 / 재부착",
    "category": "트리",
    "difficulty": "PRO",
    "level": 5,
    "tags": [
      "tree",
      "parent",
      "children",
      "subtree"
    ],
    "summary": "부모-자식 관계를 빠르게 갱신하고 서브트리를 삭제하거나 다른 위치에 붙이는 패턴입니다.",
    "signal": "노드 삭제 / 자식 순회 / 한 곳을 잘라 다른 곳에 붙이기",
    "strategy": [
      "parent 배열과 children set을 함께 둡니다.",
      "이동은 기존 부모에서 제거 후 새 부모에 추가합니다.",
      "삭제는 DFS/BFS로 서브트리를 비활성화합니다.",
      "alive 배열로 삭제 노드를 건너뜁니다."
    ],
    "code": "children = [set() for _ in range(n + 1)]\nparent = [0] * (n + 1)\nalive = [True] * (n + 1)\n\ndef move_node(x, new_parent):\n    old = parent[x]\n    if old:\n        children[old].discard(x)\n    parent[x] = new_parent\n    children[new_parent].add(x)\n\ndef delete_subtree(root):\n    stack = [root]\n    while stack:\n        now = stack.pop()\n        alive[now] = False\n        for child in children[now]:\n            stack.append(child)\n",
    "problems": [
      {
        "platform": "BOJ",
        "title": "트리",
        "difficulty": "Gold V",
        "url": "https://www.acmicpc.net/problem/1068"
      },
      {
        "platform": "BOJ",
        "title": "사회망 서비스(SNS)",
        "difficulty": "Gold III",
        "url": "https://www.acmicpc.net/problem/2533"
      },
      {
        "platform": "BOJ",
        "title": "트리의 지름",
        "difficulty": "Gold II",
        "url": "https://www.acmicpc.net/problem/1167"
      }
    ]
  },
  {
    "id": "union-find",
    "title": "Union-Find",
    "category": "자료구조",
    "difficulty": "Gold+",
    "level": 4,
    "tags": [
      "union find",
      "MST",
      "cycle"
    ],
    "summary": "연결 여부, 그룹 합치기, 사이클 판정을 거의 O(1)에 처리하는 기본 자료구조입니다.",
    "signal": "연결 여부 / 그룹 병합 / 사이클 → Union-Find",
    "strategy": [
      "find 결과끼리 비교합니다.",
      "경로 압축을 적용합니다.",
      "크루스칼에서는 union 성공 간선만 선택합니다.",
      "집합 크기/랭크를 같이 관리하면 안정적입니다."
    ],
    "code": "# 판단 → 상태 정의 → 자료구조 선택\n# 1. 입력 크기 확인\n# 2. 상태 수 계산\n# 3. 시간복잡도 계산\n# 4. 구현 순서 고정\n",
    "problems": [
      {
        "platform": "BOJ",
        "title": "집합의 표현",
        "difficulty": "Gold V",
        "url": "https://www.acmicpc.net/problem/1717"
      },
      {
        "platform": "BOJ",
        "title": "최소 스패닝 트리",
        "difficulty": "Gold IV",
        "url": "https://www.acmicpc.net/problem/1197"
      },
      {
        "platform": "BOJ",
        "title": "네트워크 연결",
        "difficulty": "Gold IV",
        "url": "https://www.acmicpc.net/problem/1922"
      }
    ]
  },
  {
    "id": "segment-tree",
    "title": "세그먼트 트리",
    "category": "자료구조",
    "difficulty": "PRO",
    "level": 5,
    "tags": [
      "segment tree",
      "range query",
      "update"
    ],
    "summary": "구간 합, 최솟값, 최댓값을 값 변경과 함께 빠르게 처리하는 자료구조입니다.",
    "signal": "구간 쿼리 + 값 변경 → Segment Tree",
    "strategy": [
      "tree 크기는 4N으로 잡습니다.",
      "query의 겹침/포함/불포함을 분리합니다.",
      "최소/최대는 기본 반환값을 조심합니다.",
      "좌표 압축과 함께 나오는 경우가 많습니다."
    ],
    "code": "# 판단 → 상태 정의 → 자료구조 선택\n# 1. 입력 크기 확인\n# 2. 상태 수 계산\n# 3. 시간복잡도 계산\n# 4. 구현 순서 고정\n",
    "problems": [
      {
        "platform": "BOJ",
        "title": "구간 합 구하기",
        "difficulty": "Gold I",
        "url": "https://www.acmicpc.net/problem/2042"
      },
      {
        "platform": "BOJ",
        "title": "최솟값과 최댓값",
        "difficulty": "Gold I",
        "url": "https://www.acmicpc.net/problem/2357"
      },
      {
        "platform": "BOJ",
        "title": "데이터 구조",
        "difficulty": "Platinum V",
        "url": "https://www.acmicpc.net/problem/12899"
      }
    ]
  },
  {
    "id": "two-pointer",
    "title": "투 포인터 / 슬라이딩 윈도우",
    "category": "배열",
    "difficulty": "Gold+",
    "level": 3,
    "tags": [
      "two pointer",
      "sliding window",
      "dict"
    ],
    "summary": "연속 구간의 합, 길이, 종류 수를 left/right 포인터로 관리하는 패턴입니다.",
    "signal": "연속 부분 배열 / 구간 길이 / 부분합 → left/right",
    "strategy": [
      "right는 for로 증가시킵니다.",
      "조건을 만족하면 left를 while로 줄입니다.",
      "음수가 있으면 단순 투 포인터가 깨질 수 있습니다.",
      "종류 수 관리는 dict 카운팅을 씁니다."
    ],
    "code": "# 판단 → 상태 정의 → 자료구조 선택\n# 1. 입력 크기 확인\n# 2. 상태 수 계산\n# 3. 시간복잡도 계산\n# 4. 구현 순서 고정\n",
    "problems": [
      {
        "platform": "BOJ",
        "title": "부분합",
        "difficulty": "Gold IV",
        "url": "https://www.acmicpc.net/problem/1806"
      },
      {
        "platform": "BOJ",
        "title": "같이 눈사람 만들래?",
        "difficulty": "Gold III",
        "url": "https://www.acmicpc.net/problem/20366"
      },
      {
        "platform": "Programmers",
        "title": "보석 쇼핑",
        "difficulty": "Level 3",
        "url": "https://school.programmers.co.kr/learn/courses/30/lessons/67258"
      }
    ]
  },
  {
    "id": "bitmask",
    "title": "비트마스크 상태 압축",
    "category": "상태압축",
    "difficulty": "PRO",
    "level": 5,
    "tags": [
      "bitmask",
      "state",
      "DP",
      "BFS"
    ],
    "summary": "선택 여부, 열쇠, 방문 집합을 정수 하나로 압축해 visited나 DP에 넣는 패턴입니다.",
    "signal": "선택 여부 / 열쇠 / 방문 집합 → bitmask",
    "strategy": [
      "i번째 여부는 state & (1<<i)로 확인합니다.",
      "추가는 state | (1<<i)입니다.",
      "삭제는 state & ~(1<<i)입니다.",
      "n이 크면 2^n 때문에 불가능합니다."
    ],
    "code": "# 판단 → 상태 정의 → 자료구조 선택\n# 1. 입력 크기 확인\n# 2. 상태 수 계산\n# 3. 시간복잡도 계산\n# 4. 구현 순서 고정\n",
    "problems": [
      {
        "platform": "BOJ",
        "title": "달이 차오른다, 가자.",
        "difficulty": "Gold I",
        "url": "https://www.acmicpc.net/problem/1194"
      },
      {
        "platform": "BOJ",
        "title": "외판원 순회",
        "difficulty": "Gold I",
        "url": "https://www.acmicpc.net/problem/2098"
      },
      {
        "platform": "BOJ",
        "title": "열쇠",
        "difficulty": "Gold I",
        "url": "https://www.acmicpc.net/problem/9328"
      }
    ]
  },
  {
    "id": "dp-state",
    "title": "DP + 상태 정의",
    "category": "DP",
    "difficulty": "PRO",
    "level": 4,
    "tags": [
      "DP",
      "state",
      "transition"
    ],
    "summary": "최적값, 경우의 수, 이전 선택 영향이 있을 때 상태와 전이를 명확히 정의하는 패턴입니다.",
    "signal": "최적값 / 경우의 수 / 이전 선택 영향 → dp[state]",
    "strategy": [
      "dp가 의미하는 값을 한 문장으로 정합니다.",
      "초기값과 불가능 상태를 분리합니다.",
      "상태 수 × 전이 수로 시간복잡도를 계산합니다.",
      "메모이제이션 DFS도 자주 사용합니다."
    ],
    "code": "# 판단 → 상태 정의 → 자료구조 선택\n# 1. 입력 크기 확인\n# 2. 상태 수 계산\n# 3. 시간복잡도 계산\n# 4. 구현 순서 고정\n",
    "problems": [
      {
        "platform": "BOJ",
        "title": "내리막 길",
        "difficulty": "Gold III",
        "url": "https://www.acmicpc.net/problem/1520"
      },
      {
        "platform": "BOJ",
        "title": "외판원 순회",
        "difficulty": "Gold I",
        "url": "https://www.acmicpc.net/problem/2098"
      },
      {
        "platform": "Programmers",
        "title": "등굣길",
        "difficulty": "Level 3",
        "url": "https://school.programmers.co.kr/learn/courses/30/lessons/42898"
      }
    ]
  },
  {
    "id": "multi-source-bfs",
    "title": "다중 시작점 BFS",
    "category": "그래프",
    "difficulty": "Gold+",
    "level": 3,
    "tags": [
      "BFS",
      "multi-source",
      "grid"
    ],
    "summary": "여러 시작점을 동시에 queue에 넣고 가장 가까운 거리나 확산 시간을 구하는 패턴입니다.",
    "signal": "바이러스 / 불 / 토마토 / 여러 시작점 → multi-source BFS",
    "strategy": [
      "모든 시작점을 먼저 queue에 넣습니다.",
      "거리 배열 초기값을 -1로 둡니다.",
      "동시에 퍼지는 문제는 이 방식이 정답입니다.",
      "사람 이동과 불 확산은 순서를 분리합니다."
    ],
    "code": "from collections import deque\n\nq = deque([(0, 0, 0)])\nvisited = [[[0] * STATE for _ in range(m)] for _ in range(n)]\nvisited[0][0][0] = 1\n\nwhile q:\n    y, x, state = q.popleft()\n    for dy, dx in ((1,0),(-1,0),(0,1),(0,-1)):\n        ny, nx = y + dy, x + dx\n        if not (0 <= ny < n and 0 <= nx < m):\n            continue\n        ns = get_next_state(state, board[ny][nx])\n        if visited[ny][nx][ns]:\n            continue\n        visited[ny][nx][ns] = visited[y][x][state] + 1\n        q.append((ny, nx, ns))\n",
    "problems": [
      {
        "platform": "BOJ",
        "title": "토마토",
        "difficulty": "Gold V",
        "url": "https://www.acmicpc.net/problem/7576"
      },
      {
        "platform": "BOJ",
        "title": "불!",
        "difficulty": "Gold IV",
        "url": "https://www.acmicpc.net/problem/4179"
      },
      {
        "platform": "BOJ",
        "title": "아기 상어",
        "difficulty": "Gold III",
        "url": "https://www.acmicpc.net/problem/16236"
      }
    ]
  },
  {
    "id": "outside-bfs",
    "title": "외부 BFS / 경계 확장",
    "category": "그래프",
    "difficulty": "Gold+",
    "level": 4,
    "tags": [
      "BFS",
      "outside",
      "perimeter"
    ],
    "summary": "도형 바깥에서 BFS를 돌려 외곽 길이, 둘레, 접근 가능 영역을 계산하는 패턴입니다.",
    "signal": "외곽 / 둘레 / 안쪽과 바깥쪽 구분 → outside BFS",
    "strategy": [
      "맵을 한 칸 이상 크게 확장합니다.",
      "외부 시작점에서 BFS를 시작합니다.",
      "도형 내부와 외부를 분리합니다.",
      "좌표를 2배 확장하면 대각선 접촉 오류를 줄일 수 있습니다."
    ],
    "code": "from collections import deque\n\nq = deque([(0, 0, 0)])\nvisited = [[[0] * STATE for _ in range(m)] for _ in range(n)]\nvisited[0][0][0] = 1\n\nwhile q:\n    y, x, state = q.popleft()\n    for dy, dx in ((1,0),(-1,0),(0,1),(0,-1)):\n        ny, nx = y + dy, x + dx\n        if not (0 <= ny < n and 0 <= nx < m):\n            continue\n        ns = get_next_state(state, board[ny][nx])\n        if visited[ny][nx][ns]:\n            continue\n        visited[ny][nx][ns] = visited[y][x][state] + 1\n        q.append((ny, nx, ns))\n",
    "problems": [
      {
        "platform": "BOJ",
        "title": "열쇠",
        "difficulty": "Gold I",
        "url": "https://www.acmicpc.net/problem/9328"
      },
      {
        "platform": "BOJ",
        "title": "치즈",
        "difficulty": "Gold III",
        "url": "https://www.acmicpc.net/problem/2638"
      },
      {
        "platform": "Programmers",
        "title": "아이템 줍기",
        "difficulty": "Level 3",
        "url": "https://school.programmers.co.kr/learn/courses/30/lessons/87694"
      }
    ]
  },
  {
    "id": "priority-tiebreak",
    "title": "우선순위 + tie-break",
    "category": "자료구조",
    "difficulty": "PRO",
    "level": 4,
    "tags": [
      "heapq",
      "sort",
      "tie-break"
    ],
    "summary": "거리, 행, 열, 번호처럼 우선순위가 여러 개인 문제에서 tuple 정렬 기준을 정확히 설계하는 패턴입니다.",
    "signal": "가까운 것 / 행 작은 것 / 열 작은 것 / 번호 작은 것",
    "strategy": [
      "tuple 순서가 곧 우선순위입니다.",
      "큰 값 우선은 음수로 바꿉니다.",
      "문제의 tie-break 문장을 그대로 tuple로 옮깁니다.",
      "정렬 기준이 많으면 후보를 모은 뒤 sort도 가능."
    ],
    "code": "import heapq\n\ndata = {}\nheap = []\norder = 0\n\ndef add_or_update(id, score):\n    global order\n    order += 1\n    data[id] = (score, order)\n    heapq.heappush(heap, (-score, order, id))\n\ndef remove(id):\n    data.pop(id, None)\n\ndef get_top():\n    while heap:\n        neg, old_order, id = heapq.heappop(heap)\n        if id not in data:\n            continue\n        score, cur_order = data[id]\n        if cur_order == old_order and score == -neg:\n            return id, score\n    return None\n",
    "problems": [
      {
        "platform": "BOJ",
        "title": "아기 상어",
        "difficulty": "Gold III",
        "url": "https://www.acmicpc.net/problem/16236"
      },
      {
        "platform": "BOJ",
        "title": "스타트 택시",
        "difficulty": "Gold II",
        "url": "https://www.acmicpc.net/problem/19238"
      },
      {
        "platform": "CodeTree",
        "title": "AI 로봇청소기",
        "difficulty": "삼성 기출",
        "url": "https://www.codetree.ai/ko/frequent-problems/samsung-sw/problems/ai-robot/description"
      }
    ]
  },
  {
    "id": "grid-rotation",
    "title": "격자 회전 / 부분 배열 회전",
    "category": "삼성 구현",
    "difficulty": "PRO",
    "level": 4,
    "tags": [
      "simulation",
      "rotation",
      "grid"
    ],
    "summary": "부분 격자를 회전하거나 달팽이/토네이도 방향으로 이동시키는 구현 패턴입니다.",
    "signal": "부분 회전 / 달팽이 / 토네이도 / 배열 이동",
    "strategy": [
      "회전 대상 좌표를 리스트로 먼저 모읍니다.",
      "값을 한 칸씩 밀거나 임시 배열에 저장합니다.",
      "방향 배열과 길이 증가 규칙을 분리합니다.",
      "인덱스 범위를 먼저 검증합니다."
    ],
    "code": "def simulate():\n    for turn in range(T):\n        next_board = [[0] * n for _ in range(n)]\n        for y in range(n):\n            for x in range(n):\n                if board[y][x]:\n                    ny, nx = move(y, x)\n                    next_board[ny][nx] += board[y][x]\n        board = next_board\n",
    "problems": [
      {
        "platform": "BOJ",
        "title": "마법사 상어와 토네이도",
        "difficulty": "Gold III",
        "url": "https://www.acmicpc.net/problem/20057"
      },
      {
        "platform": "BOJ",
        "title": "마법사 상어와 파이어스톰",
        "difficulty": "Gold III",
        "url": "https://www.acmicpc.net/problem/20058"
      },
      {
        "platform": "BOJ",
        "title": "배열 돌리기 4",
        "difficulty": "Gold IV",
        "url": "https://www.acmicpc.net/problem/17406"
      }
    ]
  },
  {
    "id": "binary-search-answer",
    "title": "정답 이분탐색",
    "category": "탐색",
    "difficulty": "Gold+",
    "level": 4,
    "tags": [
      "binary search",
      "parametric search"
    ],
    "summary": "정답 후보를 정하고 가능한지 판정하는 방식입니다.",
    "signal": "최소의 최대 / 최대의 최소 → answer binary search",
    "strategy": [
      "입력 크기를 먼저 확인합니다.",
      "핵심 자료구조를 정합니다.",
      "쿼리/전이당 시간복잡도를 계산합니다.",
      "반례를 작은 케이스로 직접 만듭니다."
    ],
    "code": "# 판단 → 상태 정의 → 자료구조 선택\n# 1. 입력 크기 확인\n# 2. 상태 수 계산\n# 3. 시간복잡도 계산\n# 4. 구현 순서 고정\n",
    "problems": [
      {
        "platform": "BOJ",
        "title": "공유기 설치",
        "difficulty": "Gold IV",
        "url": "https://www.acmicpc.net/problem/2110"
      },
      {
        "platform": "BOJ",
        "title": "입국심사",
        "difficulty": "Gold V",
        "url": "https://www.acmicpc.net/problem/3079"
      }
    ]
  },
  {
    "id": "topological-sort",
    "title": "위상정렬",
    "category": "그래프",
    "difficulty": "Gold+",
    "level": 3,
    "tags": [
      "topological sort",
      "indegree"
    ],
    "summary": "선후 관계가 있는 작업 순서를 indegree와 queue로 처리합니다.",
    "signal": "먼저 해야 하는 일 / 순서 / DAG → topological sort",
    "strategy": [
      "입력 크기를 먼저 확인합니다.",
      "핵심 자료구조를 정합니다.",
      "쿼리/전이당 시간복잡도를 계산합니다.",
      "반례를 작은 케이스로 직접 만듭니다."
    ],
    "code": "# 판단 → 상태 정의 → 자료구조 선택\n# 1. 입력 크기 확인\n# 2. 상태 수 계산\n# 3. 시간복잡도 계산\n# 4. 구현 순서 고정\n",
    "problems": [
      {
        "platform": "BOJ",
        "title": "줄 세우기",
        "difficulty": "Gold III",
        "url": "https://www.acmicpc.net/problem/2252"
      },
      {
        "platform": "BOJ",
        "title": "게임 개발",
        "difficulty": "Gold III",
        "url": "https://www.acmicpc.net/problem/1516"
      }
    ]
  },
  {
    "id": "prefix-sum",
    "title": "누적합 / 2차원 누적합",
    "category": "배열",
    "difficulty": "Gold",
    "level": 3,
    "tags": [
      "prefix sum",
      "2D"
    ],
    "summary": "구간합 질의가 많을 때 미리 합을 쌓아 O(1)에 답합니다.",
    "signal": "구간 합 반복 질의 → prefix sum",
    "strategy": [
      "입력 크기를 먼저 확인합니다.",
      "핵심 자료구조를 정합니다.",
      "쿼리/전이당 시간복잡도를 계산합니다.",
      "반례를 작은 케이스로 직접 만듭니다."
    ],
    "code": "# 판단 → 상태 정의 → 자료구조 선택\n# 1. 입력 크기 확인\n# 2. 상태 수 계산\n# 3. 시간복잡도 계산\n# 4. 구현 순서 고정\n",
    "problems": [
      {
        "platform": "BOJ",
        "title": "구간 합 구하기 5",
        "difficulty": "Silver I",
        "url": "https://www.acmicpc.net/problem/11660"
      },
      {
        "platform": "BOJ",
        "title": "나머지 합",
        "difficulty": "Gold III",
        "url": "https://www.acmicpc.net/problem/10986"
      }
    ]
  },
  {
    "id": "mst-kruskal",
    "title": "MST / 크루스칼",
    "category": "그래프",
    "difficulty": "Gold+",
    "level": 4,
    "tags": [
      "MST",
      "union find",
      "sort"
    ],
    "summary": "간선을 비용순으로 정렬하고 union 성공 간선만 선택합니다.",
    "signal": "모든 노드 연결 최소 비용 → MST",
    "strategy": [
      "입력 크기를 먼저 확인합니다.",
      "핵심 자료구조를 정합니다.",
      "쿼리/전이당 시간복잡도를 계산합니다.",
      "반례를 작은 케이스로 직접 만듭니다."
    ],
    "code": "# 판단 → 상태 정의 → 자료구조 선택\n# 1. 입력 크기 확인\n# 2. 상태 수 계산\n# 3. 시간복잡도 계산\n# 4. 구현 순서 고정\n",
    "problems": [
      {
        "platform": "BOJ",
        "title": "최소 스패닝 트리",
        "difficulty": "Gold IV",
        "url": "https://www.acmicpc.net/problem/1197"
      },
      {
        "platform": "BOJ",
        "title": "별자리 만들기",
        "difficulty": "Gold III",
        "url": "https://www.acmicpc.net/problem/4386"
      }
    ]
  },
  {
    "id": "meet-in-middle",
    "title": "Meet in the Middle",
    "category": "완전탐색",
    "difficulty": "PRO",
    "level": 5,
    "tags": [
      "MITM",
      "combination"
    ],
    "summary": "2^N이 클 때 절반씩 나누어 경우의 수를 줄입니다.",
    "signal": "N은 30~40, 부분집합 → 절반 탐색",
    "strategy": [
      "입력 크기를 먼저 확인합니다.",
      "핵심 자료구조를 정합니다.",
      "쿼리/전이당 시간복잡도를 계산합니다.",
      "반례를 작은 케이스로 직접 만듭니다."
    ],
    "code": "# 판단 → 상태 정의 → 자료구조 선택\n# 1. 입력 크기 확인\n# 2. 상태 수 계산\n# 3. 시간복잡도 계산\n# 4. 구현 순서 고정\n",
    "problems": [
      {
        "platform": "BOJ",
        "title": "부분수열의 합 2",
        "difficulty": "Gold I",
        "url": "https://www.acmicpc.net/problem/1208"
      },
      {
        "platform": "BOJ",
        "title": "냅색문제",
        "difficulty": "Gold I",
        "url": "https://www.acmicpc.net/problem/1450"
      }
    ]
  },
  {
    "id": "coordinate-compression",
    "title": "좌표 압축",
    "category": "자료구조",
    "difficulty": "Gold",
    "level": 3,
    "tags": [
      "compression",
      "sort",
      "index"
    ],
    "summary": "큰 좌표값을 정렬된 순서 인덱스로 바꿔 배열/트리에 넣습니다.",
    "signal": "좌표 값 큼 + 순서만 중요 → coordinate compression",
    "strategy": [
      "입력 크기를 먼저 확인합니다.",
      "핵심 자료구조를 정합니다.",
      "쿼리/전이당 시간복잡도를 계산합니다.",
      "반례를 작은 케이스로 직접 만듭니다."
    ],
    "code": "# 판단 → 상태 정의 → 자료구조 선택\n# 1. 입력 크기 확인\n# 2. 상태 수 계산\n# 3. 시간복잡도 계산\n# 4. 구현 순서 고정\n",
    "problems": [
      {
        "platform": "BOJ",
        "title": "좌표 압축",
        "difficulty": "Silver II",
        "url": "https://www.acmicpc.net/problem/18870"
      },
      {
        "platform": "BOJ",
        "title": "데이터 구조",
        "difficulty": "Platinum V",
        "url": "https://www.acmicpc.net/problem/12899"
      }
    ]
  },
  {
    "id": "lca",
    "title": "LCA / 트리 점프",
    "category": "트리",
    "difficulty": "PRO",
    "level": 5,
    "tags": [
      "tree",
      "LCA",
      "binary lifting"
    ],
    "summary": "트리에서 두 노드의 공통 조상을 빠르게 찾는 패턴입니다.",
    "signal": "트리 경로 질의 반복 → LCA",
    "strategy": [
      "입력 크기를 먼저 확인합니다.",
      "핵심 자료구조를 정합니다.",
      "쿼리/전이당 시간복잡도를 계산합니다.",
      "반례를 작은 케이스로 직접 만듭니다."
    ],
    "code": "# 판단 → 상태 정의 → 자료구조 선택\n# 1. 입력 크기 확인\n# 2. 상태 수 계산\n# 3. 시간복잡도 계산\n# 4. 구현 순서 고정\n",
    "problems": [
      {
        "platform": "BOJ",
        "title": "LCA",
        "difficulty": "Gold III",
        "url": "https://www.acmicpc.net/problem/11437"
      },
      {
        "platform": "BOJ",
        "title": "LCA 2",
        "difficulty": "Platinum V",
        "url": "https://www.acmicpc.net/problem/11438"
      }
    ]
  },
  {
    "id": "trie",
    "title": "Trie 문자열 검색",
    "category": "자료구조",
    "difficulty": "Gold+",
    "level": 4,
    "tags": [
      "trie",
      "string",
      "prefix"
    ],
    "summary": "접두사 기반 검색이나 문자열 집합 판정에 사용하는 트리 구조입니다.",
    "signal": "접두사 / 자동완성 / 문자열 집합 → Trie",
    "strategy": [
      "입력 크기를 먼저 확인합니다.",
      "핵심 자료구조를 정합니다.",
      "쿼리/전이당 시간복잡도를 계산합니다.",
      "반례를 작은 케이스로 직접 만듭니다."
    ],
    "code": "# 판단 → 상태 정의 → 자료구조 선택\n# 1. 입력 크기 확인\n# 2. 상태 수 계산\n# 3. 시간복잡도 계산\n# 4. 구현 순서 고정\n",
    "problems": [
      {
        "platform": "BOJ",
        "title": "전화번호 목록",
        "difficulty": "Gold IV",
        "url": "https://www.acmicpc.net/problem/5052"
      },
      {
        "platform": "Programmers",
        "title": "가사 검색",
        "difficulty": "Level 4",
        "url": "https://school.programmers.co.kr/learn/courses/30/lessons/60060"
      }
    ]
  }
];

export const richArchives = [
  {
    "id": "five-minute-judge",
    "title": "PRO 시험 5분 판단 로직",
    "category": "실전 판단",
    "difficulty": "필수",
    "level": 5,
    "tags": [
      "판단법",
      "시간복잡도",
      "패턴 매칭"
    ],
    "summary": "문제 읽고 5분 안에 BFS, DFS, 다익스트라, 자료구조, 시뮬레이션 중 무엇인지 판별하는 체크리스트입니다.",
    "signal": "입력 크기 + 상태 변화 + 최단/최대/순위 키워드",
    "strategy": [
      "격자 + 최단거리면 BFS부터 봅니다.",
      "가중치가 있으면 다익스트라/0-1 BFS를 확인합니다.",
      "여러 개 선택이면 조합 DFS + 시뮬레이션입니다.",
      "삭제/수정/순위 유지면 heap + dict입니다."
    ],
    "code": "# 판단 → 상태 정의 → 자료구조 선택\n# 1. 입력 크기 확인\n# 2. 상태 수 계산\n# 3. 시간복잡도 계산\n# 4. 구현 순서 고정\n",
    "problems": [
      {
        "platform": "BOJ",
        "title": "연구소",
        "difficulty": "Gold IV",
        "url": "https://www.acmicpc.net/problem/14502"
      },
      {
        "platform": "BOJ",
        "title": "벽 부수고 이동하기",
        "difficulty": "Gold III",
        "url": "https://www.acmicpc.net/problem/2206"
      }
    ]
  },
  {
    "id": "insert-delete-search",
    "title": "삽입 / 삭제 / 검색 후 연산",
    "category": "자료구조",
    "difficulty": "PRO",
    "level": 5,
    "tags": [
      "dict",
      "heap",
      "set",
      "index"
    ],
    "summary": "동적으로 변하는 데이터에서 삽입, 삭제, 검색, Top-K, 조건 조회를 빠르게 처리하는 구조입니다.",
    "signal": "명령형 문제 + ID 기반 관리 + 빠른 조회",
    "strategy": [
      "ID 조회는 dict로 처리합니다.",
      "정렬 우선순위는 heap을 따로 둡니다.",
      "삭제는 lazy deletion을 씁니다.",
      "조건별 조회는 dict를 여러 개 둡니다."
    ],
    "code": "import heapq\n\ndata = {}\nheap = []\norder = 0\n\ndef add_or_update(id, score):\n    global order\n    order += 1\n    data[id] = (score, order)\n    heapq.heappush(heap, (-score, order, id))\n\ndef remove(id):\n    data.pop(id, None)\n\ndef get_top():\n    while heap:\n        neg, old_order, id = heapq.heappop(heap)\n        if id not in data:\n            continue\n        score, cur_order = data[id]\n        if cur_order == old_order and score == -neg:\n            return id, score\n    return None\n",
    "problems": [
      {
        "platform": "BOJ",
        "title": "문제 추천 시스템 Version 1",
        "difficulty": "Gold IV",
        "url": "https://www.acmicpc.net/problem/21939"
      },
      {
        "platform": "BOJ",
        "title": "문제 추천 시스템 Version 2",
        "difficulty": "Gold II",
        "url": "https://www.acmicpc.net/problem/21944"
      }
    ]
  },
  {
    "id": "turn-simulation",
    "title": "턴 단위 시뮬레이션",
    "category": "삼성 구현",
    "difficulty": "A형~PRO",
    "level": 4,
    "tags": [
      "simulation",
      "grid",
      "copy",
      "turn"
    ],
    "summary": "한 턴에 여러 객체가 동시에 움직이거나 맵이 동시에 바뀌는 문제를 안전하게 구현하는 방식입니다.",
    "signal": "매 초 / 매 턴 / 동시에 이동 / 충돌 처리",
    "strategy": [
      "현재 맵과 다음 맵을 분리합니다.",
      "이동 후보를 먼저 모은 뒤 충돌을 처리합니다.",
      "동시에 일어나는 변화는 즉시 원본에 반영하지 않습니다.",
      "디버깅용 print_map을 만듭니다."
    ],
    "code": "def simulate():\n    for turn in range(T):\n        next_board = [[0] * n for _ in range(n)]\n        for y in range(n):\n            for x in range(n):\n                if board[y][x]:\n                    ny, nx = move(y, x)\n                    next_board[ny][nx] += board[y][x]\n        board = next_board\n",
    "problems": [
      {
        "platform": "BOJ",
        "title": "마법사 상어와 파이어볼",
        "difficulty": "Gold IV",
        "url": "https://www.acmicpc.net/problem/20056"
      },
      {
        "platform": "BOJ",
        "title": "미세먼지 안녕!",
        "difficulty": "Gold IV",
        "url": "https://www.acmicpc.net/problem/17144"
      }
    ]
  },
  {
    "id": "rich-0",
    "title": "실수 줄이는 구현 순서",
    "category": "Rich 노트",
    "difficulty": "필수",
    "level": 4,
    "tags": [
      "implementation",
      "debug"
    ],
    "summary": "실수 줄이는 구현 순서을 시험장에서 바로 적용할 수 있게 압축한 노트입니다.",
    "signal": "헷갈리는 조건을 코드 구조로 고정",
    "strategy": [
      "조건을 표로 바꿉니다.",
      "상태 변수를 먼저 씁니다.",
      "작은 반례를 만듭니다.",
      "출력 직전까지 중간값을 확인합니다."
    ],
    "code": "# 판단 → 상태 정의 → 자료구조 선택\n# 1. 입력 크기 확인\n# 2. 상태 수 계산\n# 3. 시간복잡도 계산\n# 4. 구현 순서 고정\n",
    "problems": [
      {
        "platform": "BOJ",
        "title": "삼성 SW 역량 테스트 기출 문제집",
        "difficulty": "문제집",
        "url": "https://www.acmicpc.net/workbook/view/1152"
      }
    ]
  },
  {
    "id": "rich-1",
    "title": "시간초과 빠른 판단표",
    "category": "Rich 노트",
    "difficulty": "필수",
    "level": 4,
    "tags": [
      "complexity",
      "pruning"
    ],
    "summary": "시간초과 빠른 판단표을 시험장에서 바로 적용할 수 있게 압축한 노트입니다.",
    "signal": "헷갈리는 조건을 코드 구조로 고정",
    "strategy": [
      "조건을 표로 바꿉니다.",
      "상태 변수를 먼저 씁니다.",
      "작은 반례를 만듭니다.",
      "출력 직전까지 중간값을 확인합니다."
    ],
    "code": "# 판단 → 상태 정의 → 자료구조 선택\n# 1. 입력 크기 확인\n# 2. 상태 수 계산\n# 3. 시간복잡도 계산\n# 4. 구현 순서 고정\n",
    "problems": [
      {
        "platform": "BOJ",
        "title": "삼성 SW 역량 테스트 기출 문제집",
        "difficulty": "문제집",
        "url": "https://www.acmicpc.net/workbook/view/1152"
      }
    ]
  },
  {
    "id": "rich-2",
    "title": "격자 문제 디버깅 루틴",
    "category": "Rich 노트",
    "difficulty": "필수",
    "level": 4,
    "tags": [
      "grid",
      "debug"
    ],
    "summary": "격자 문제 디버깅 루틴을 시험장에서 바로 적용할 수 있게 압축한 노트입니다.",
    "signal": "헷갈리는 조건을 코드 구조로 고정",
    "strategy": [
      "조건을 표로 바꿉니다.",
      "상태 변수를 먼저 씁니다.",
      "작은 반례를 만듭니다.",
      "출력 직전까지 중간값을 확인합니다."
    ],
    "code": "# 판단 → 상태 정의 → 자료구조 선택\n# 1. 입력 크기 확인\n# 2. 상태 수 계산\n# 3. 시간복잡도 계산\n# 4. 구현 순서 고정\n",
    "problems": [
      {
        "platform": "BOJ",
        "title": "삼성 SW 역량 테스트 기출 문제집",
        "difficulty": "문제집",
        "url": "https://www.acmicpc.net/workbook/view/1152"
      }
    ]
  },
  {
    "id": "rich-3",
    "title": "트리 변경 문제 대비",
    "category": "Rich 노트",
    "difficulty": "필수",
    "level": 4,
    "tags": [
      "tree",
      "parent"
    ],
    "summary": "트리 변경 문제 대비을 시험장에서 바로 적용할 수 있게 압축한 노트입니다.",
    "signal": "헷갈리는 조건을 코드 구조로 고정",
    "strategy": [
      "조건을 표로 바꿉니다.",
      "상태 변수를 먼저 씁니다.",
      "작은 반례를 만듭니다.",
      "출력 직전까지 중간값을 확인합니다."
    ],
    "code": "# 판단 → 상태 정의 → 자료구조 선택\n# 1. 입력 크기 확인\n# 2. 상태 수 계산\n# 3. 시간복잡도 계산\n# 4. 구현 순서 고정\n",
    "problems": [
      {
        "platform": "BOJ",
        "title": "삼성 SW 역량 테스트 기출 문제집",
        "difficulty": "문제집",
        "url": "https://www.acmicpc.net/workbook/view/1152"
      }
    ]
  },
  {
    "id": "rich-4",
    "title": "우선순위 여러 개 처리법",
    "category": "Rich 노트",
    "difficulty": "필수",
    "level": 4,
    "tags": [
      "heapq",
      "tie-break"
    ],
    "summary": "우선순위 여러 개 처리법을 시험장에서 바로 적용할 수 있게 압축한 노트입니다.",
    "signal": "헷갈리는 조건을 코드 구조로 고정",
    "strategy": [
      "조건을 표로 바꿉니다.",
      "상태 변수를 먼저 씁니다.",
      "작은 반례를 만듭니다.",
      "출력 직전까지 중간값을 확인합니다."
    ],
    "code": "# 판단 → 상태 정의 → 자료구조 선택\n# 1. 입력 크기 확인\n# 2. 상태 수 계산\n# 3. 시간복잡도 계산\n# 4. 구현 순서 고정\n",
    "problems": [
      {
        "platform": "BOJ",
        "title": "삼성 SW 역량 테스트 기출 문제집",
        "difficulty": "문제집",
        "url": "https://www.acmicpc.net/workbook/view/1152"
      }
    ]
  },
  {
    "id": "rich-5",
    "title": "삼성 시험 직전 5일 로드맵",
    "category": "Rich 노트",
    "difficulty": "필수",
    "level": 4,
    "tags": [
      "roadmap",
      "review"
    ],
    "summary": "삼성 시험 직전 5일 로드맵을 시험장에서 바로 적용할 수 있게 압축한 노트입니다.",
    "signal": "헷갈리는 조건을 코드 구조로 고정",
    "strategy": [
      "조건을 표로 바꿉니다.",
      "상태 변수를 먼저 씁니다.",
      "작은 반례를 만듭니다.",
      "출력 직전까지 중간값을 확인합니다."
    ],
    "code": "# 판단 → 상태 정의 → 자료구조 선택\n# 1. 입력 크기 확인\n# 2. 상태 수 계산\n# 3. 시간복잡도 계산\n# 4. 구현 순서 고정\n",
    "problems": [
      {
        "platform": "BOJ",
        "title": "삼성 SW 역량 테스트 기출 문제집",
        "difficulty": "문제집",
        "url": "https://www.acmicpc.net/workbook/view/1152"
      }
    ]
  },
  {
    "id": "rich-6",
    "title": "문제 읽는 순서 템플릿",
    "category": "Rich 노트",
    "difficulty": "필수",
    "level": 4,
    "tags": [
      "reading",
      "pattern"
    ],
    "summary": "문제 읽는 순서 템플릿을 시험장에서 바로 적용할 수 있게 압축한 노트입니다.",
    "signal": "헷갈리는 조건을 코드 구조로 고정",
    "strategy": [
      "조건을 표로 바꿉니다.",
      "상태 변수를 먼저 씁니다.",
      "작은 반례를 만듭니다.",
      "출력 직전까지 중간값을 확인합니다."
    ],
    "code": "# 판단 → 상태 정의 → 자료구조 선택\n# 1. 입력 크기 확인\n# 2. 상태 수 계산\n# 3. 시간복잡도 계산\n# 4. 구현 순서 고정\n",
    "problems": [
      {
        "platform": "BOJ",
        "title": "삼성 SW 역량 테스트 기출 문제집",
        "difficulty": "문제집",
        "url": "https://www.acmicpc.net/workbook/view/1152"
      }
    ]
  },
  {
    "id": "rich-7",
    "title": "반례 만드는 법",
    "category": "Rich 노트",
    "difficulty": "필수",
    "level": 4,
    "tags": [
      "testcase",
      "debug"
    ],
    "summary": "반례 만드는 법을 시험장에서 바로 적용할 수 있게 압축한 노트입니다.",
    "signal": "헷갈리는 조건을 코드 구조로 고정",
    "strategy": [
      "조건을 표로 바꿉니다.",
      "상태 변수를 먼저 씁니다.",
      "작은 반례를 만듭니다.",
      "출력 직전까지 중간값을 확인합니다."
    ],
    "code": "# 판단 → 상태 정의 → 자료구조 선택\n# 1. 입력 크기 확인\n# 2. 상태 수 계산\n# 3. 시간복잡도 계산\n# 4. 구현 순서 고정\n",
    "problems": [
      {
        "platform": "BOJ",
        "title": "삼성 SW 역량 테스트 기출 문제집",
        "difficulty": "문제집",
        "url": "https://www.acmicpc.net/workbook/view/1152"
      }
    ]
  }
];

export const codetreeProblems = [
  {
    "id": "baby-whale",
    "title": "아기 고래의 첫 항해",
    "category": "CodeTree 삼성 기출",
    "difficulty": "상",
    "level": 4,
    "tags": [
      "시뮬레이션",
      "BFS",
      "방향",
      "상태"
    ],
    "summary": "격자에서 이동 규칙과 방향 전환 조건을 정확히 구현해야 하는 삼성식 시뮬레이션 문제입니다.",
    "signal": "위치 + 방향 + 상태 변화",
    "strategy": [
      "상태를 y, x, direction 중심으로 정의합니다.",
      "방향 전환 규칙을 테이블로 분리합니다.",
      "이동 가능 여부와 종료 조건을 함수화합니다.",
      "방문 체크가 필요한지 먼저 판단합니다."
    ],
    "code": "def simulate():\n    for turn in range(T):\n        next_board = [[0] * n for _ in range(n)]\n        for y in range(n):\n            for x in range(n):\n                if board[y][x]:\n                    ny, nx = move(y, x)\n                    next_board[ny][nx] += board[y][x]\n        board = next_board\n",
    "problems": [
      {
        "platform": "CodeTree",
        "title": "아기 고래의 첫 항해",
        "difficulty": "2026 상반기",
        "url": "https://www.codetree.ai/ko/frequent-problems/samsung-sw/problems/baby-whale-first-voyage/description"
      }
    ]
  },
  {
    "id": "sea-turtle",
    "title": "아기 바다거북의 대모험",
    "category": "CodeTree 삼성 기출",
    "difficulty": "상",
    "level": 4,
    "tags": [
      "격자",
      "시뮬레이션",
      "동시 처리"
    ],
    "summary": "맵 변화와 객체 이동을 턴 단위로 처리해야 하는 격자 시뮬레이션 유형입니다.",
    "signal": "동시 변화 + 턴 진행",
    "strategy": [
      "현재 상태와 다음 상태를 분리합니다.",
      "이동 후보를 모두 계산한 뒤 적용합니다.",
      "충돌/소멸/합쳐짐 규칙을 별도 함수로 둡니다.",
      "시간 순서표를 먼저 만듭니다."
    ],
    "code": "def simulate():\n    for turn in range(T):\n        next_board = [[0] * n for _ in range(n)]\n        for y in range(n):\n            for x in range(n):\n                if board[y][x]:\n                    ny, nx = move(y, x)\n                    next_board[ny][nx] += board[y][x]\n        board = next_board\n",
    "problems": [
      {
        "platform": "CodeTree",
        "title": "아기 바다거북의 대모험",
        "difficulty": "2026 상반기",
        "url": "https://www.codetree.ai/ko/frequent-problems/samsung-sw/problems/a-little-sea-turtles-big-adventure/description"
      }
    ]
  },
  {
    "id": "ai-robot",
    "title": "AI 로봇청소기",
    "category": "CodeTree 삼성 기출",
    "difficulty": "중상",
    "level": 4,
    "tags": [
      "로봇",
      "방향",
      "청소",
      "시뮬레이션"
    ],
    "summary": "로봇의 회전, 전진, 후진, 청소 조건을 순서대로 구현하는 방향 시뮬레이션입니다.",
    "signal": "현재 방향 + 주변 탐색 + 회전 규칙",
    "strategy": [
      "방향 배열을 고정합니다.",
      "회전 함수를 만듭니다.",
      "청소 여부는 visited로 관리합니다.",
      "조건문 순서가 정답을 좌우합니다."
    ],
    "code": "def simulate():\n    for turn in range(T):\n        next_board = [[0] * n for _ in range(n)]\n        for y in range(n):\n            for x in range(n):\n                if board[y][x]:\n                    ny, nx = move(y, x)\n                    next_board[ny][nx] += board[y][x]\n        board = next_board\n",
    "problems": [
      {
        "platform": "CodeTree",
        "title": "AI 로봇청소기",
        "difficulty": "2025 하반기",
        "url": "https://www.codetree.ai/ko/frequent-problems/samsung-sw/problems/ai-robot/description"
      },
      {
        "platform": "BOJ",
        "title": "로봇 청소기",
        "difficulty": "Gold V",
        "url": "https://www.acmicpc.net/problem/14503"
      }
    ]
  },
  {
    "id": "ancient-ruin",
    "title": "고대 문명 유적 탐사",
    "category": "CodeTree 삼성 기출/유사",
    "difficulty": "중상",
    "level": 4,
    "tags": [
      "BFS",
      "회전",
      "점수"
    ],
    "summary": "부분 회전 후 연결 영역을 찾아 점수를 계산하는 구현형입니다.",
    "signal": "삼성식 조건 순서 + 상태 관리",
    "strategy": [
      "문제 조건을 턴 순서로 표기합니다.",
      "객체 상태 배열과 맵 상태를 분리합니다.",
      "동시 처리 여부를 먼저 판단합니다.",
      "우선순위가 있으면 tuple/sort 기준을 고정합니다."
    ],
    "code": "def simulate():\n    for turn in range(T):\n        next_board = [[0] * n for _ in range(n)]\n        for y in range(n):\n            for x in range(n):\n                if board[y][x]:\n                    ny, nx = move(y, x)\n                    next_board[ny][nx] += board[y][x]\n        board = next_board\n",
    "problems": [
      {
        "platform": "CodeTree",
        "title": "고대 문명 유적 탐사",
        "difficulty": "검색 링크",
        "url": "https://www.codetree.ai/training-field/search?keyword=고대%20문명%20유적%20탐사"
      }
    ]
  },
  {
    "id": "street-lamp",
    "title": "가로등 설치",
    "category": "CodeTree 삼성 기출/유사",
    "difficulty": "중상",
    "level": 4,
    "tags": [
      "set",
      "interval",
      "greedy"
    ],
    "summary": "삭제/설치 후 최대 간격을 빠르게 관리하는 자료구조형입니다.",
    "signal": "삼성식 조건 순서 + 상태 관리",
    "strategy": [
      "문제 조건을 턴 순서로 표기합니다.",
      "객체 상태 배열과 맵 상태를 분리합니다.",
      "동시 처리 여부를 먼저 판단합니다.",
      "우선순위가 있으면 tuple/sort 기준을 고정합니다."
    ],
    "code": "def simulate():\n    for turn in range(T):\n        next_board = [[0] * n for _ in range(n)]\n        for y in range(n):\n            for x in range(n):\n                if board[y][x]:\n                    ny, nx = move(y, x)\n                    next_board[ny][nx] += board[y][x]\n        board = next_board\n",
    "problems": [
      {
        "platform": "CodeTree",
        "title": "가로등 설치",
        "difficulty": "검색 링크",
        "url": "https://www.codetree.ai/training-field/search?keyword=가로등%20설치"
      }
    ]
  },
  {
    "id": "codetree-bread",
    "title": "코드트리 빵",
    "category": "CodeTree 삼성 기출/유사",
    "difficulty": "중상",
    "level": 4,
    "tags": [
      "BFS",
      "시뮬레이션",
      "우선순위"
    ],
    "summary": "사람 이동, 베이스캠프 선택, 도착 처리 순서가 중요한 격자 문제입니다.",
    "signal": "삼성식 조건 순서 + 상태 관리",
    "strategy": [
      "문제 조건을 턴 순서로 표기합니다.",
      "객체 상태 배열과 맵 상태를 분리합니다.",
      "동시 처리 여부를 먼저 판단합니다.",
      "우선순위가 있으면 tuple/sort 기준을 고정합니다."
    ],
    "code": "def simulate():\n    for turn in range(T):\n        next_board = [[0] * n for _ in range(n)]\n        for y in range(n):\n            for x in range(n):\n                if board[y][x]:\n                    ny, nx = move(y, x)\n                    next_board[ny][nx] += board[y][x]\n        board = next_board\n",
    "problems": [
      {
        "platform": "CodeTree",
        "title": "코드트리 빵",
        "difficulty": "검색 링크",
        "url": "https://www.codetree.ai/training-field/search?keyword=코드트리%20빵"
      }
    ]
  },
  {
    "id": "tail-catch",
    "title": "꼬리잡기놀이",
    "category": "CodeTree 삼성 기출/유사",
    "difficulty": "중상",
    "level": 4,
    "tags": [
      "simulation",
      "team",
      "grid"
    ],
    "summary": "팀의 머리/꼬리 방향을 추적하고 공이 닿는 대상을 계산합니다.",
    "signal": "삼성식 조건 순서 + 상태 관리",
    "strategy": [
      "문제 조건을 턴 순서로 표기합니다.",
      "객체 상태 배열과 맵 상태를 분리합니다.",
      "동시 처리 여부를 먼저 판단합니다.",
      "우선순위가 있으면 tuple/sort 기준을 고정합니다."
    ],
    "code": "def simulate():\n    for turn in range(T):\n        next_board = [[0] * n for _ in range(n)]\n        for y in range(n):\n            for x in range(n):\n                if board[y][x]:\n                    ny, nx = move(y, x)\n                    next_board[ny][nx] += board[y][x]\n        board = next_board\n",
    "problems": [
      {
        "platform": "CodeTree",
        "title": "꼬리잡기놀이",
        "difficulty": "검색 링크",
        "url": "https://www.codetree.ai/training-field/search?keyword=꼬리잡기놀이"
      }
    ]
  },
  {
    "id": "rudolph",
    "title": "루돌프의 반란",
    "category": "CodeTree 삼성 기출/유사",
    "difficulty": "중상",
    "level": 4,
    "tags": [
      "simulation",
      "collision",
      "priority"
    ],
    "summary": "충돌과 밀림, 기절 상태를 함께 관리하는 복합 시뮬레이션입니다.",
    "signal": "삼성식 조건 순서 + 상태 관리",
    "strategy": [
      "문제 조건을 턴 순서로 표기합니다.",
      "객체 상태 배열과 맵 상태를 분리합니다.",
      "동시 처리 여부를 먼저 판단합니다.",
      "우선순위가 있으면 tuple/sort 기준을 고정합니다."
    ],
    "code": "def simulate():\n    for turn in range(T):\n        next_board = [[0] * n for _ in range(n)]\n        for y in range(n):\n            for x in range(n):\n                if board[y][x]:\n                    ny, nx = move(y, x)\n                    next_board[ny][nx] += board[y][x]\n        board = next_board\n",
    "problems": [
      {
        "platform": "CodeTree",
        "title": "루돌프의 반란",
        "difficulty": "검색 링크",
        "url": "https://www.codetree.ai/training-field/search?keyword=루돌프의%20반란"
      }
    ]
  },
  {
    "id": "santa-gift",
    "title": "산타의 선물 공장",
    "category": "CodeTree 삼성 기출/유사",
    "difficulty": "중상",
    "level": 4,
    "tags": [
      "linked list",
      "simulation",
      "factory"
    ],
    "summary": "벨트/상자 이동을 연결 구조로 처리하는 자료구조 시뮬레이션입니다.",
    "signal": "삼성식 조건 순서 + 상태 관리",
    "strategy": [
      "문제 조건을 턴 순서로 표기합니다.",
      "객체 상태 배열과 맵 상태를 분리합니다.",
      "동시 처리 여부를 먼저 판단합니다.",
      "우선순위가 있으면 tuple/sort 기준을 고정합니다."
    ],
    "code": "def simulate():\n    for turn in range(T):\n        next_board = [[0] * n for _ in range(n)]\n        for y in range(n):\n            for x in range(n):\n                if board[y][x]:\n                    ny, nx = move(y, x)\n                    next_board[ny][nx] += board[y][x]\n        board = next_board\n",
    "problems": [
      {
        "platform": "CodeTree",
        "title": "산타의 선물 공장",
        "difficulty": "검색 링크",
        "url": "https://www.codetree.ai/training-field/search?keyword=산타의%20선물%20공장"
      }
    ]
  },
  {
    "id": "maze-runner",
    "title": "메이즈 러너",
    "category": "CodeTree 삼성 기출/유사",
    "difficulty": "중상",
    "level": 4,
    "tags": [
      "rotation",
      "BFS",
      "simulation"
    ],
    "summary": "참가자 이동과 미로 부분 회전을 반복하는 격자 시뮬레이션입니다.",
    "signal": "삼성식 조건 순서 + 상태 관리",
    "strategy": [
      "문제 조건을 턴 순서로 표기합니다.",
      "객체 상태 배열과 맵 상태를 분리합니다.",
      "동시 처리 여부를 먼저 판단합니다.",
      "우선순위가 있으면 tuple/sort 기준을 고정합니다."
    ],
    "code": "def simulate():\n    for turn in range(T):\n        next_board = [[0] * n for _ in range(n)]\n        for y in range(n):\n            for x in range(n):\n                if board[y][x]:\n                    ny, nx = move(y, x)\n                    next_board[ny][nx] += board[y][x]\n        board = next_board\n",
    "problems": [
      {
        "platform": "CodeTree",
        "title": "메이즈 러너",
        "difficulty": "검색 링크",
        "url": "https://www.codetree.ai/training-field/search?keyword=메이즈%20러너"
      }
    ]
  },
  {
    "id": "battle-ground",
    "title": "싸움땅",
    "category": "CodeTree 삼성 기출/유사",
    "difficulty": "중상",
    "level": 4,
    "tags": [
      "simulation",
      "heap",
      "priority"
    ],
    "summary": "플레이어 이동, 총 교체, 전투 규칙을 순서대로 구현합니다.",
    "signal": "삼성식 조건 순서 + 상태 관리",
    "strategy": [
      "문제 조건을 턴 순서로 표기합니다.",
      "객체 상태 배열과 맵 상태를 분리합니다.",
      "동시 처리 여부를 먼저 판단합니다.",
      "우선순위가 있으면 tuple/sort 기준을 고정합니다."
    ],
    "code": "def simulate():\n    for turn in range(T):\n        next_board = [[0] * n for _ in range(n)]\n        for y in range(n):\n            for x in range(n):\n                if board[y][x]:\n                    ny, nx = move(y, x)\n                    next_board[ny][nx] += board[y][x]\n        board = next_board\n",
    "problems": [
      {
        "platform": "CodeTree",
        "title": "싸움땅",
        "difficulty": "검색 링크",
        "url": "https://www.codetree.ai/training-field/search?keyword=싸움땅"
      }
    ]
  },
  {
    "id": "atom-collision",
    "title": "원자 충돌",
    "category": "CodeTree 삼성 기출/유사",
    "difficulty": "중상",
    "level": 4,
    "tags": [
      "simulation",
      "merge",
      "grid"
    ],
    "summary": "동시 이동 후 같은 칸의 원자를 합치고 분할합니다.",
    "signal": "삼성식 조건 순서 + 상태 관리",
    "strategy": [
      "문제 조건을 턴 순서로 표기합니다.",
      "객체 상태 배열과 맵 상태를 분리합니다.",
      "동시 처리 여부를 먼저 판단합니다.",
      "우선순위가 있으면 tuple/sort 기준을 고정합니다."
    ],
    "code": "def simulate():\n    for turn in range(T):\n        next_board = [[0] * n for _ in range(n)]\n        for y in range(n):\n            for x in range(n):\n                if board[y][x]:\n                    ny, nx = move(y, x)\n                    next_board[ny][nx] += board[y][x]\n        board = next_board\n",
    "problems": [
      {
        "platform": "CodeTree",
        "title": "원자 충돌",
        "difficulty": "검색 링크",
        "url": "https://www.codetree.ai/training-field/search?keyword=원자%20충돌"
      }
    ]
  },
  {
    "id": "tree-kill",
    "title": "나무박멸",
    "category": "CodeTree 삼성 기출/유사",
    "difficulty": "중상",
    "level": 4,
    "tags": [
      "simulation",
      "spread",
      "grid"
    ],
    "summary": "성장, 번식, 제초제 확산을 순서대로 처리합니다.",
    "signal": "삼성식 조건 순서 + 상태 관리",
    "strategy": [
      "문제 조건을 턴 순서로 표기합니다.",
      "객체 상태 배열과 맵 상태를 분리합니다.",
      "동시 처리 여부를 먼저 판단합니다.",
      "우선순위가 있으면 tuple/sort 기준을 고정합니다."
    ],
    "code": "def simulate():\n    for turn in range(T):\n        next_board = [[0] * n for _ in range(n)]\n        for y in range(n):\n            for x in range(n):\n                if board[y][x]:\n                    ny, nx = move(y, x)\n                    next_board[ny][nx] += board[y][x]\n        board = next_board\n",
    "problems": [
      {
        "platform": "CodeTree",
        "title": "나무박멸",
        "difficulty": "검색 링크",
        "url": "https://www.codetree.ai/training-field/search?keyword=나무박멸"
      }
    ]
  },
  {
    "id": "destroy-turret",
    "title": "포탑 부수기",
    "category": "CodeTree 삼성 기출/유사",
    "difficulty": "중상",
    "level": 4,
    "tags": [
      "BFS",
      "priority",
      "simulation"
    ],
    "summary": "공격자/대상자 선정, 레이저 경로 탐색, 포탄 공격을 구현합니다.",
    "signal": "삼성식 조건 순서 + 상태 관리",
    "strategy": [
      "문제 조건을 턴 순서로 표기합니다.",
      "객체 상태 배열과 맵 상태를 분리합니다.",
      "동시 처리 여부를 먼저 판단합니다.",
      "우선순위가 있으면 tuple/sort 기준을 고정합니다."
    ],
    "code": "def simulate():\n    for turn in range(T):\n        next_board = [[0] * n for _ in range(n)]\n        for y in range(n):\n            for x in range(n):\n                if board[y][x]:\n                    ny, nx = move(y, x)\n                    next_board[ny][nx] += board[y][x]\n        board = next_board\n",
    "problems": [
      {
        "platform": "CodeTree",
        "title": "포탑 부수기",
        "difficulty": "검색 링크",
        "url": "https://www.codetree.ai/training-field/search?keyword=포탑%20부수기"
      }
    ]
  },
  {
    "id": "royal-knight",
    "title": "왕실의 기사 대결",
    "category": "CodeTree 삼성 기출/유사",
    "difficulty": "중상",
    "level": 4,
    "tags": [
      "simulation",
      "push",
      "damage"
    ],
    "summary": "기사 밀림과 함정 피해를 연쇄적으로 처리합니다.",
    "signal": "삼성식 조건 순서 + 상태 관리",
    "strategy": [
      "문제 조건을 턴 순서로 표기합니다.",
      "객체 상태 배열과 맵 상태를 분리합니다.",
      "동시 처리 여부를 먼저 판단합니다.",
      "우선순위가 있으면 tuple/sort 기준을 고정합니다."
    ],
    "code": "def simulate():\n    for turn in range(T):\n        next_board = [[0] * n for _ in range(n)]\n        for y in range(n):\n            for x in range(n):\n                if board[y][x]:\n                    ny, nx = move(y, x)\n                    next_board[ny][nx] += board[y][x]\n        board = next_board\n",
    "problems": [
      {
        "platform": "CodeTree",
        "title": "왕실의 기사 대결",
        "difficulty": "검색 링크",
        "url": "https://www.codetree.ai/training-field/search?keyword=왕실의%20기사%20대결"
      }
    ]
  },
  {
    "id": "codebattle",
    "title": "코드트리 채점기",
    "category": "CodeTree 삼성 기출/유사",
    "difficulty": "중상",
    "level": 4,
    "tags": [
      "priority queue",
      "set",
      "scheduler"
    ],
    "summary": "도메인별 채점 대기열과 채점기 상태를 관리합니다.",
    "signal": "삼성식 조건 순서 + 상태 관리",
    "strategy": [
      "문제 조건을 턴 순서로 표기합니다.",
      "객체 상태 배열과 맵 상태를 분리합니다.",
      "동시 처리 여부를 먼저 판단합니다.",
      "우선순위가 있으면 tuple/sort 기준을 고정합니다."
    ],
    "code": "def simulate():\n    for turn in range(T):\n        next_board = [[0] * n for _ in range(n)]\n        for y in range(n):\n            for x in range(n):\n                if board[y][x]:\n                    ny, nx = move(y, x)\n                    next_board[ny][nx] += board[y][x]\n        board = next_board\n",
    "problems": [
      {
        "platform": "CodeTree",
        "title": "코드트리 채점기",
        "difficulty": "검색 링크",
        "url": "https://www.codetree.ai/training-field/search?keyword=코드트리%20채점기"
      }
    ]
  },
  {
    "id": "color-bomb",
    "title": "색깔 폭탄",
    "category": "CodeTree 삼성 기출/유사",
    "difficulty": "중상",
    "level": 4,
    "tags": [
      "BFS",
      "gravity",
      "rotation"
    ],
    "summary": "블록 그룹 선택, 제거, 중력, 회전을 반복합니다.",
    "signal": "삼성식 조건 순서 + 상태 관리",
    "strategy": [
      "문제 조건을 턴 순서로 표기합니다.",
      "객체 상태 배열과 맵 상태를 분리합니다.",
      "동시 처리 여부를 먼저 판단합니다.",
      "우선순위가 있으면 tuple/sort 기준을 고정합니다."
    ],
    "code": "def simulate():\n    for turn in range(T):\n        next_board = [[0] * n for _ in range(n)]\n        for y in range(n):\n            for x in range(n):\n                if board[y][x]:\n                    ny, nx = move(y, x)\n                    next_board[ny][nx] += board[y][x]\n        board = next_board\n",
    "problems": [
      {
        "platform": "CodeTree",
        "title": "색깔 폭탄",
        "difficulty": "검색 링크",
        "url": "https://www.codetree.ai/training-field/search?keyword=색깔%20폭탄"
      }
    ]
  },
  {
    "id": "dice-roll",
    "title": "주사위 굴리기",
    "category": "CodeTree 삼성 기출/유사",
    "difficulty": "중상",
    "level": 4,
    "tags": [
      "simulation",
      "dice",
      "grid"
    ],
    "summary": "주사위 전개도와 이동 방향 변경을 관리합니다.",
    "signal": "삼성식 조건 순서 + 상태 관리",
    "strategy": [
      "문제 조건을 턴 순서로 표기합니다.",
      "객체 상태 배열과 맵 상태를 분리합니다.",
      "동시 처리 여부를 먼저 판단합니다.",
      "우선순위가 있으면 tuple/sort 기준을 고정합니다."
    ],
    "code": "def simulate():\n    for turn in range(T):\n        next_board = [[0] * n for _ in range(n)]\n        for y in range(n):\n            for x in range(n):\n                if board[y][x]:\n                    ny, nx = move(y, x)\n                    next_board[ny][nx] += board[y][x]\n        board = next_board\n",
    "problems": [
      {
        "platform": "CodeTree",
        "title": "주사위 굴리기",
        "difficulty": "검색 링크",
        "url": "https://www.codetree.ai/training-field/search?keyword=주사위%20굴리기"
      }
    ]
  },
  {
    "id": "packman",
    "title": "팩맨",
    "category": "CodeTree 삼성 기출/유사",
    "difficulty": "중상",
    "level": 4,
    "tags": [
      "DFS",
      "simulation",
      "copy"
    ],
    "summary": "몬스터 복제, 팩맨 이동, 시체 소멸을 턴 단위로 처리합니다.",
    "signal": "삼성식 조건 순서 + 상태 관리",
    "strategy": [
      "문제 조건을 턴 순서로 표기합니다.",
      "객체 상태 배열과 맵 상태를 분리합니다.",
      "동시 처리 여부를 먼저 판단합니다.",
      "우선순위가 있으면 tuple/sort 기준을 고정합니다."
    ],
    "code": "def simulate():\n    for turn in range(T):\n        next_board = [[0] * n for _ in range(n)]\n        for y in range(n):\n            for x in range(n):\n                if board[y][x]:\n                    ny, nx = move(y, x)\n                    next_board[ny][nx] += board[y][x]\n        board = next_board\n",
    "problems": [
      {
        "platform": "CodeTree",
        "title": "팩맨",
        "difficulty": "검색 링크",
        "url": "https://www.codetree.ai/training-field/search?keyword=팩맨"
      }
    ]
  },
  {
    "id": "hospital-distance",
    "title": "병원 거리 최소화",
    "category": "CodeTree 삼성 기출/유사",
    "difficulty": "중상",
    "level": 4,
    "tags": [
      "combination",
      "BFS",
      "optimization"
    ],
    "summary": "후보 선택 후 전체 거리 합을 최소화합니다.",
    "signal": "삼성식 조건 순서 + 상태 관리",
    "strategy": [
      "문제 조건을 턴 순서로 표기합니다.",
      "객체 상태 배열과 맵 상태를 분리합니다.",
      "동시 처리 여부를 먼저 판단합니다.",
      "우선순위가 있으면 tuple/sort 기준을 고정합니다."
    ],
    "code": "def simulate():\n    for turn in range(T):\n        next_board = [[0] * n for _ in range(n)]\n        for y in range(n):\n            for x in range(n):\n                if board[y][x]:\n                    ny, nx = move(y, x)\n                    next_board[ny][nx] += board[y][x]\n        board = next_board\n",
    "problems": [
      {
        "platform": "CodeTree",
        "title": "병원 거리 최소화",
        "difficulty": "검색 링크",
        "url": "https://www.codetree.ai/training-field/search?keyword=병원%20거리%20최소화"
      }
    ]
  },
  {
    "id": "virus-lab",
    "title": "바이러스 실험실",
    "category": "CodeTree 삼성 기출/유사",
    "difficulty": "중상",
    "level": 4,
    "tags": [
      "combination",
      "multi-source BFS"
    ],
    "summary": "활성 바이러스 조합과 확산 시간을 계산합니다.",
    "signal": "삼성식 조건 순서 + 상태 관리",
    "strategy": [
      "문제 조건을 턴 순서로 표기합니다.",
      "객체 상태 배열과 맵 상태를 분리합니다.",
      "동시 처리 여부를 먼저 판단합니다.",
      "우선순위가 있으면 tuple/sort 기준을 고정합니다."
    ],
    "code": "def simulate():\n    for turn in range(T):\n        next_board = [[0] * n for _ in range(n)]\n        for y in range(n):\n            for x in range(n):\n                if board[y][x]:\n                    ny, nx = move(y, x)\n                    next_board[ny][nx] += board[y][x]\n        board = next_board\n",
    "problems": [
      {
        "platform": "CodeTree",
        "title": "바이러스 실험실",
        "difficulty": "검색 링크",
        "url": "https://www.codetree.ai/training-field/search?keyword=바이러스%20실험실"
      }
    ]
  },
  {
    "id": "runner-hide",
    "title": "술래잡기",
    "category": "CodeTree 삼성 기출/유사",
    "difficulty": "중상",
    "level": 4,
    "tags": [
      "simulation",
      "direction",
      "grid"
    ],
    "summary": "도망자 이동과 술래의 달팽이 이동을 처리합니다.",
    "signal": "삼성식 조건 순서 + 상태 관리",
    "strategy": [
      "문제 조건을 턴 순서로 표기합니다.",
      "객체 상태 배열과 맵 상태를 분리합니다.",
      "동시 처리 여부를 먼저 판단합니다.",
      "우선순위가 있으면 tuple/sort 기준을 고정합니다."
    ],
    "code": "def simulate():\n    for turn in range(T):\n        next_board = [[0] * n for _ in range(n)]\n        for y in range(n):\n            for x in range(n):\n                if board[y][x]:\n                    ny, nx = move(y, x)\n                    next_board[ny][nx] += board[y][x]\n        board = next_board\n",
    "problems": [
      {
        "platform": "CodeTree",
        "title": "술래잡기",
        "difficulty": "검색 링크",
        "url": "https://www.codetree.ai/training-field/search?keyword=술래잡기"
      }
    ]
  },
  {
    "id": "medusa",
    "title": "메두사와 전사들",
    "category": "CodeTree 삼성 기출/유사",
    "difficulty": "중상",
    "level": 4,
    "tags": [
      "BFS",
      "vision",
      "simulation"
    ],
    "summary": "시야 처리와 전사 이동을 순서대로 구현합니다.",
    "signal": "삼성식 조건 순서 + 상태 관리",
    "strategy": [
      "문제 조건을 턴 순서로 표기합니다.",
      "객체 상태 배열과 맵 상태를 분리합니다.",
      "동시 처리 여부를 먼저 판단합니다.",
      "우선순위가 있으면 tuple/sort 기준을 고정합니다."
    ],
    "code": "def simulate():\n    for turn in range(T):\n        next_board = [[0] * n for _ in range(n)]\n        for y in range(n):\n            for x in range(n):\n                if board[y][x]:\n                    ny, nx = move(y, x)\n                    next_board[ny][nx] += board[y][x]\n        board = next_board\n",
    "problems": [
      {
        "platform": "CodeTree",
        "title": "메두사와 전사들",
        "difficulty": "검색 링크",
        "url": "https://www.codetree.ai/training-field/search?keyword=메두사와%20전사들"
      }
    ]
  }
];
