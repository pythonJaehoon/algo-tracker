export const samsungProPatterns = [
  {
    "id": "topk-lazy",
    "title": "Top-K 유지 + 삭제/수정",
    "category": "기존 PRO 패턴",
    "difficulty": "PRO",
    "level": 4,
    "tags": [
      "dict",
      "heapq",
      "lazy deletion",
      "ranking"
    ],
    "summary": "삭제/수정이 많은 우선순위 데이터에서 heap을 직접 수정하지 않고 dict로 유효성을 검증하는 패턴입니다.",
    "signal": "삭제 많음 + 정렬 유지 + id 기반 → lazy deletion",
    "strategy": [
      "dict는 진짜 데이터입니다.",
      "heap은 후보 저장소입니다.",
      "삭제/수정 시 heap을 직접 건드리지 않습니다.",
      "조회할 때 dict와 비교해서 유효성 검사합니다."
    ],
    "code": "import heapq\n\ndata = {}\nheap_height = []\norder = 0\n\ndef add_or_update(id, height):\n    global order\n    order += 1\n    data[id] = (height, order)\n    heapq.heappush(heap_height, (-height, order, id))\n\ndef delete(id):\n    data.pop(id, None)\n\ndef get_top5_height():\n    res = []\n    temp = []\n\n    while heap_height and len(res) < 5:\n        neg_h, order, id = heapq.heappop(heap_height)\n        temp.append((neg_h, order, id))\n\n        if id not in data:\n            continue\n\n        h, cur_order = data[id]\n\n        if cur_order != order:\n            continue\n\n        if h != -neg_h:\n            continue\n\n        res.append(id)\n\n    for item in temp:\n        heapq.heappush(heap_height, item)\n\n    return res\n",
    "problems": [
      {
        "platform": "BOJ",
        "title": "이중 우선순위 큐",
        "difficulty": "Gold IV",
        "url": "https://www.acmicpc.net/problem/7662",
        "note": "삭제 많은 heap lazy deletion"
      },
      {
        "platform": "BOJ",
        "title": "문제 추천 시스템 Version 1",
        "difficulty": "Gold IV",
        "url": "https://www.acmicpc.net/problem/21939",
        "note": "id 기반 문제 관리"
      },
      {
        "platform": "Programmers",
        "title": "이중우선순위큐",
        "difficulty": "Level 3",
        "url": "https://school.programmers.co.kr/learn/courses/30/lessons/42628",
        "note": "최댓값/최솟값 삭제"
      },
      {
        "platform": "CodeTree",
        "title": "Top K / 우선순위 큐 연습",
        "difficulty": "Gold+",
        "url": "https://www.codetree.ai/training-field/search?keyword=priority%20queue",
        "note": "우선순위 큐 검색"
      }
    ]
  },
  {
    "id": "kth-dijkstra",
    "title": "K번째 최단경로",
    "category": "기존 PRO 패턴",
    "difficulty": "PRO",
    "level": 4,
    "tags": [
      "dijkstra",
      "heapq",
      "k-th path"
    ],
    "summary": "최단거리 하나가 아니라 각 노드마다 여러 경로 후보를 유지하는 다익스트라 변형입니다.",
    "signal": "최단이 아니라 k번째, 여러 경로 후보 유지",
    "strategy": [
      "dist[node]를 숫자 하나가 아니라 리스트로 둡니다.",
      "각 노드마다 k개까지 비용을 허용합니다.",
      "heap에서 꺼낸 비용을 dist[now]에 누적합니다.",
      "일반 visited를 쓰면 필요한 후보를 버립니다."
    ],
    "code": "import heapq\n\ndef kth_dijkstra(start):\n    dist = [[] for _ in range(n + 1)]\n    h = [(0, start)]\n\n    while h:\n        cost, now = heapq.heappop(h)\n\n        if len(dist[now]) >= k:\n            continue\n\n        dist[now].append(cost)\n\n        for next_cost, next_node in graph[now]:\n            heapq.heappush(h, (cost + next_cost, next_node))\n\n    return dist\n",
    "problems": [
      {
        "platform": "BOJ",
        "title": "K번째 최단경로 찾기",
        "difficulty": "Platinum IV",
        "url": "https://www.acmicpc.net/problem/1854",
        "note": "대표 K번째 최단경로"
      },
      {
        "platform": "BOJ",
        "title": "거의 최단 경로",
        "difficulty": "Platinum V",
        "url": "https://www.acmicpc.net/problem/5719",
        "note": "최단경로 제거"
      },
      {
        "platform": "Programmers",
        "title": "합승 택시 요금",
        "difficulty": "Level 3",
        "url": "https://school.programmers.co.kr/learn/courses/30/lessons/72413",
        "note": "그래프 최단거리"
      },
      {
        "platform": "CodeTree",
        "title": "다익스트라 연습",
        "difficulty": "Gold+",
        "url": "https://www.codetree.ai/training-field/search?keyword=dijkstra",
        "note": "다익스트라 검색"
      }
    ]
  },
  {
    "id": "bfs-state",
    "title": "BFS + 상태 확장",
    "category": "기존 PRO 패턴",
    "difficulty": "PRO",
    "level": 3,
    "tags": [
      "BFS",
      "state",
      "3D visited"
    ],
    "summary": "벽 부수기, 열쇠, 문, 방향, 남은 횟수처럼 위치 외 상태가 붙는 BFS입니다.",
    "signal": "벽 부수기, 열쇠, 문, 방향, 남은 횟수 → 상태 차원 추가",
    "strategy": [
      "위치만 방문 체크하면 안 됩니다.",
      "같은 칸이어도 상태가 다르면 다른 노드입니다.",
      "visited[y][x][state] 형태로 확장합니다.",
      "상태 개수와 메모리를 먼저 계산합니다."
    ],
    "code": "from collections import deque\n\nvisited = [[[0] * 2 for _ in range(m)] for _ in range(n)]\nq = deque([(0, 0, 0)])\nvisited[0][0][0] = 1\n\nwhile q:\n    y, x, used = q.popleft()\n\n    for dy, dx in ((1,0), (-1,0), (0,1), (0,-1)):\n        ny, nx = y + dy, x + dx\n\n        if ny < 0 or ny >= n or nx < 0 or nx >= m:\n            continue\n\n        if board[ny][nx] == 1 and used == 0:\n            visited[ny][nx][1] = visited[y][x][used] + 1\n            q.append((ny, nx, 1))\n\n        if board[ny][nx] == 0 and visited[ny][nx][used] == 0:\n            visited[ny][nx][used] = visited[y][x][used] + 1\n            q.append((ny, nx, used))\n",
    "problems": [
      {
        "platform": "BOJ",
        "title": "벽 부수고 이동하기",
        "difficulty": "Gold III",
        "url": "https://www.acmicpc.net/problem/2206",
        "note": "벽 1회 상태 BFS"
      },
      {
        "platform": "BOJ",
        "title": "달이 차오른다, 가자.",
        "difficulty": "Gold I",
        "url": "https://www.acmicpc.net/problem/1194",
        "note": "열쇠 비트마스킹 BFS"
      },
      {
        "platform": "Programmers",
        "title": "게임 맵 최단거리",
        "difficulty": "Level 2",
        "url": "https://school.programmers.co.kr/learn/courses/30/lessons/1844",
        "note": "격자 BFS"
      },
      {
        "platform": "CodeTree",
        "title": "격자 BFS 연습",
        "difficulty": "Gold+",
        "url": "https://www.codetree.ai/training-field/search?keyword=bfs%20grid",
        "note": "격자 BFS 검색"
      }
    ]
  },
  {
    "id": "dfs-pruning",
    "title": "DFS + 조합 + 가지치기",
    "category": "기존 PRO 패턴",
    "difficulty": "PRO",
    "level": 3,
    "tags": [
      "DFS",
      "combination",
      "pruning"
    ],
    "summary": "여러 개를 선택/제거하고 최적값을 찾는 삼성식 조합 탐색 패턴입니다.",
    "signal": "여러 개 선택, 제거 조합, 최적값 → DFS + pruning",
    "strategy": [
      "모든 조합을 DFS로 만듭니다.",
      "현재 값이 이미 답보다 나쁘면 중단합니다.",
      "선택/비선택 구조를 빠르게 설계합니다.",
      "DFS 후 상태 복구를 빼먹지 않습니다."
    ],
    "code": "def dfs(idx, selected, cost):\n    global answer\n\n    if cost >= answer:\n        return\n\n    if selected == target_count:\n        answer = min(answer, cost)\n        return\n\n    if idx == n:\n        return\n\n    dfs(idx + 1, selected + 1, cost + arr[idx])\n    dfs(idx + 1, selected, cost)\n",
    "problems": [
      {
        "platform": "BOJ",
        "title": "사다리 조작",
        "difficulty": "Gold III",
        "url": "https://www.acmicpc.net/problem/15684",
        "note": "조합 + 시뮬레이션"
      },
      {
        "platform": "BOJ",
        "title": "연구소",
        "difficulty": "Gold IV",
        "url": "https://www.acmicpc.net/problem/14502",
        "note": "벽 3개 조합 + BFS"
      },
      {
        "platform": "Programmers",
        "title": "외벽 점검",
        "difficulty": "Level 3",
        "url": "https://school.programmers.co.kr/learn/courses/30/lessons/60062",
        "note": "순열/가지치기"
      },
      {
        "platform": "CodeTree",
        "title": "Backtracking 연습",
        "difficulty": "Gold+",
        "url": "https://www.codetree.ai/training-field/search?keyword=backtracking",
        "note": "백트래킹 검색"
      }
    ]
  },
  {
    "id": "zero-one-bfs",
    "title": "0-1 BFS",
    "category": "기존 PRO 패턴",
    "difficulty": "PRO",
    "level": 4,
    "tags": [
      "BFS",
      "deque",
      "0-1 BFS"
    ],
    "summary": "가중치가 0 또는 1일 때 heap 대신 deque로 최단거리를 구하는 패턴입니다.",
    "signal": "가중치가 0 또는 1 → heap 대신 deque",
    "strategy": [
      "간선 비용이 0 또는 1일 때 사용합니다.",
      "비용 0이면 appendleft, 비용 1이면 append 합니다.",
      "다익스트라보다 가볍게 처리합니다.",
      "가중치가 0/1이 아니면 다익스트라를 씁니다."
    ],
    "code": "from collections import deque\n\nINF = int(1e9)\ndist = [[INF] * m for _ in range(n)]\ndq = deque()\n\ndist[0][0] = 0\ndq.append((0, 0))\n\nwhile dq:\n    y, x = dq.popleft()\n\n    for dy, dx in ((1,0), (-1,0), (0,1), (0,-1)):\n        ny, nx = y + dy, x + dx\n\n        if ny < 0 or ny >= n or nx < 0 or nx >= m:\n            continue\n\n        cost = board[ny][nx]\n\n        if dist[ny][nx] > dist[y][x] + cost:\n            dist[ny][nx] = dist[y][x] + cost\n\n            if cost == 0:\n                dq.appendleft((ny, nx))\n            else:\n                dq.append((ny, nx))\n",
    "problems": [
      {
        "platform": "BOJ",
        "title": "알고스팟",
        "difficulty": "Gold IV",
        "url": "https://www.acmicpc.net/problem/1261",
        "note": "0-1 BFS 대표"
      },
      {
        "platform": "BOJ",
        "title": "숨바꼭질 3",
        "difficulty": "Gold V",
        "url": "https://www.acmicpc.net/problem/13549",
        "note": "순간이동 비용 0"
      },
      {
        "platform": "CodeTree",
        "title": "0-1 BFS 연습",
        "difficulty": "Gold+",
        "url": "https://www.codetree.ai/training-field/search?keyword=0-1%20bfs",
        "note": "0-1 BFS 검색"
      }
    ]
  },
  {
    "id": "union-find",
    "title": "Union-Find",
    "category": "기존 PRO 패턴",
    "difficulty": "Gold+",
    "level": 3,
    "tags": [
      "union find",
      "disjoint set",
      "MST"
    ],
    "summary": "연결 여부, 그룹 병합, 사이클 판정에 쓰는 대표 자료구조입니다.",
    "signal": "연결 여부, 그룹 합치기, 사이클 판정 → Union-Find",
    "strategy": [
      "각 원소의 대표 부모를 관리합니다.",
      "find로 대표를 찾고 union으로 합칩니다.",
      "경로 압축으로 find를 빠르게 만듭니다.",
      "크루스칼에서는 union 성공 간선만 선택합니다."
    ],
    "code": "parent = [i for i in range(n + 1)]\n\ndef find(x):\n    if parent[x] != x:\n        parent[x] = find(parent[x])\n    return parent[x]\n\ndef union(a, b):\n    pa = find(a)\n    pb = find(b)\n\n    if pa == pb:\n        return False\n\n    parent[pb] = pa\n    return True\n",
    "problems": [
      {
        "platform": "BOJ",
        "title": "집합의 표현",
        "difficulty": "Gold V",
        "url": "https://www.acmicpc.net/problem/1717",
        "note": "Union-Find 기본"
      },
      {
        "platform": "BOJ",
        "title": "최소 스패닝 트리",
        "difficulty": "Gold IV",
        "url": "https://www.acmicpc.net/problem/1197",
        "note": "크루스칼 MST"
      },
      {
        "platform": "Programmers",
        "title": "섬 연결하기",
        "difficulty": "Level 3",
        "url": "https://school.programmers.co.kr/learn/courses/30/lessons/42861",
        "note": "MST 대표"
      },
      {
        "platform": "CodeTree",
        "title": "Union-Find 연습",
        "difficulty": "Gold+",
        "url": "https://www.codetree.ai/training-field/search?keyword=union%20find",
        "note": "Union-Find 검색"
      }
    ]
  },
  {
    "id": "segment-tree",
    "title": "세그먼트 트리",
    "category": "기존 PRO 패턴",
    "difficulty": "PRO",
    "level": 4,
    "tags": [
      "segment tree",
      "range query",
      "update"
    ],
    "summary": "구간 합/최소/최대와 값 변경을 O(logN)에 처리하는 대표 구조입니다.",
    "signal": "구간 합/최소/최대 + 값 변경 → Segment Tree",
    "strategy": [
      "배열 구간 정보를 트리에 저장합니다.",
      "구간 질의와 단일 업데이트를 O(logN)에 처리합니다.",
      "합, 최소, 최대 등으로 응용합니다.",
      "tree 크기는 보통 4N으로 잡습니다."
    ],
    "code": "def build(node, start, end):\n    if start == end:\n        tree[node] = arr[start]\n        return\n\n    mid = (start + end) // 2\n    build(node * 2, start, mid)\n    build(node * 2 + 1, mid + 1, end)\n    tree[node] = tree[node * 2] + tree[node * 2 + 1]\n\ndef query(node, start, end, left, right):\n    if right < start or end < left:\n        return 0\n\n    if left <= start and end <= right:\n        return tree[node]\n\n    mid = (start + end) // 2\n    return query(node*2, start, mid, left, right) + query(node*2+1, mid+1, end, left, right)\n",
    "problems": [
      {
        "platform": "BOJ",
        "title": "구간 합 구하기",
        "difficulty": "Gold I",
        "url": "https://www.acmicpc.net/problem/2042",
        "note": "세그먼트 트리 기본"
      },
      {
        "platform": "BOJ",
        "title": "최솟값과 최댓값",
        "difficulty": "Gold I",
        "url": "https://www.acmicpc.net/problem/2357",
        "note": "min/max 쿼리"
      },
      {
        "platform": "CodeTree",
        "title": "Segment Tree 연습",
        "difficulty": "Gold~Platinum",
        "url": "https://www.codetree.ai/training-field/search?keyword=segment%20tree",
        "note": "세그먼트 트리 검색"
      }
    ]
  },
  {
    "id": "two-pointer",
    "title": "투 포인터 / 슬라이딩 윈도우",
    "category": "기존 PRO 패턴",
    "difficulty": "Gold+",
    "level": 3,
    "tags": [
      "two pointer",
      "sliding window"
    ],
    "summary": "연속 구간의 합, 길이, 종류 수를 left/right로 관리하는 패턴입니다.",
    "signal": "연속 부분 배열, 구간 길이, 부분합 → left/right",
    "strategy": [
      "left와 right를 한 방향으로 움직입니다.",
      "현재 구간 상태를 유지하면서 답을 갱신합니다.",
      "양수 배열에서 특히 강력합니다.",
      "음수가 있으면 단순 투 포인터가 깨질 수 있습니다."
    ],
    "code": "left = 0\nsumv = 0\nanswer = int(1e9)\n\nfor right in range(n):\n    sumv += arr[right]\n\n    while sumv >= target:\n        answer = min(answer, right - left + 1)\n        sumv -= arr[left]\n        left += 1\n",
    "problems": [
      {
        "platform": "BOJ",
        "title": "부분합",
        "difficulty": "Gold IV",
        "url": "https://www.acmicpc.net/problem/1806",
        "note": "투 포인터 대표"
      },
      {
        "platform": "Programmers",
        "title": "보석 쇼핑",
        "difficulty": "Level 3",
        "url": "https://school.programmers.co.kr/learn/courses/30/lessons/67258",
        "note": "슬라이딩 윈도우 + dict"
      },
      {
        "platform": "CodeTree",
        "title": "Two Pointer 연습",
        "difficulty": "Silver~Gold",
        "url": "https://www.codetree.ai/training-field/search?keyword=two%20pointer",
        "note": "투 포인터 검색"
      }
    ]
  },
  {
    "id": "bitmask",
    "title": "비트마스크 상태 압축",
    "category": "기존 PRO 패턴",
    "difficulty": "PRO",
    "level": 4,
    "tags": [
      "bitmask",
      "state",
      "visited"
    ],
    "summary": "선택 여부, 열쇠, 방문 집합을 정수 하나로 압축하는 패턴입니다.",
    "signal": "선택 여부, 열쇠, 방문 집합, 부분집합 → bitmask",
    "strategy": [
      "상태를 정수 하나로 압축합니다.",
      "i번째 선택 여부는 state & (1<<i)로 확인합니다.",
      "상태 추가는 state | (1<<i)로 처리합니다.",
      "n이 너무 크면 2^n이라 불가능합니다."
    ],
    "code": "if state & (1 << i):\n    pass\n\nnext_state = state | (1 << i)\nremoved_state = state & ~(1 << i)\n\nfor state in range(1 << n):\n    for i in range(n):\n        if state & (1 << i):\n            continue\n",
    "problems": [
      {
        "platform": "BOJ",
        "title": "달이 차오른다, 가자.",
        "difficulty": "Gold I",
        "url": "https://www.acmicpc.net/problem/1194",
        "note": "열쇠 비트마스크 BFS"
      },
      {
        "platform": "BOJ",
        "title": "외판원 순회",
        "difficulty": "Gold I",
        "url": "https://www.acmicpc.net/problem/2098",
        "note": "TSP DP + bitmask"
      },
      {
        "platform": "CodeTree",
        "title": "Bitmask 연습",
        "difficulty": "Gold+",
        "url": "https://www.codetree.ai/training-field/search?keyword=bitmask",
        "note": "비트마스크 검색"
      }
    ]
  },
  {
    "id": "dp-state",
    "title": "DP + 상태 정의",
    "category": "기존 PRO 패턴",
    "difficulty": "PRO",
    "level": 4,
    "tags": [
      "DP",
      "state",
      "transition"
    ],
    "summary": "최적값, 경우의 수, 이전 선택 영향이 있을 때 상태와 전이를 정의하는 패턴입니다.",
    "signal": "최적값, 경우의 수, 이전 선택 영향 → dp[state] 정의",
    "strategy": [
      "dp가 무엇을 의미하는지 먼저 정의합니다.",
      "현재 상태에서 다음 상태로 전이합니다.",
      "상태 수와 전이 수로 시간복잡도를 계산합니다.",
      "초기값과 불가능 상태 처리가 중요합니다."
    ],
    "code": "INF = int(1e9)\ndp = [INF] * (1 << n)\ndp[0] = 0\n\nfor state in range(1 << n):\n    if dp[state] == INF:\n        continue\n\n    for i in range(n):\n        if state & (1 << i):\n            continue\n\n        next_state = state | (1 << i)\n        dp[next_state] = min(dp[next_state], dp[state] + cost[i])\n",
    "problems": [
      {
        "platform": "BOJ",
        "title": "내리막 길",
        "difficulty": "Gold III",
        "url": "https://www.acmicpc.net/problem/1520",
        "note": "DFS + DP 메모이제이션"
      },
      {
        "platform": "BOJ",
        "title": "외판원 순회",
        "difficulty": "Gold I",
        "url": "https://www.acmicpc.net/problem/2098",
        "note": "비트마스크 DP 대표"
      },
      {
        "platform": "Programmers",
        "title": "등굣길",
        "difficulty": "Level 3",
        "url": "https://school.programmers.co.kr/learn/courses/30/lessons/42898",
        "note": "격자 DP"
      },
      {
        "platform": "CodeTree",
        "title": "DP 상태 전이 연습",
        "difficulty": "Gold+",
        "url": "https://www.codetree.ai/training-field/search?keyword=dynamic%20programming",
        "note": "DP 검색"
      }
    ]
  },
  {
    "id": "memory-pool",
    "title": "메모리 풀 / 배열 기반 노드 관리",
    "category": "B형 추가 패턴",
    "difficulty": "PRO",
    "level": 4,
    "tags": [
      "memory pool",
      "array node",
      "optimization"
    ],
    "summary": "C/C++ B형에서 노드 동적 할당 비용을 줄이기 위해 쓰는 기법입니다. Python에서는 배열 인덱스 관리로 사고를 연습합니다.",
    "signal": "노드 생성이 매우 많고 동적 할당 비용이 부담됩니다.",
    "strategy": [
      "노드를 객체로 계속 만들지 않고 배열 인덱스로 관리합니다.",
      "value/next/prev 배열을 분리합니다.",
      "삭제된 노드를 재사용해야 하면 free list를 둡니다.",
      "Python에서는 dict/list 인덱싱으로 구조를 모방합니다."
    ],
    "code": "next_idx = 0\nvalue = []\nnext_node = []\n\ndef new_node(v):\n    value.append(v)\n    next_node.append(-1)\n    return len(value) - 1",
    "problems": [
      {
        "platform": "Blog",
        "title": "메모리 풀 Memory Pool",
        "difficulty": "개념",
        "url": "https://bloodstrawberry.tistory.com/47",
        "note": "B형 개념 목록 참고"
      }
    ]
  },
  {
    "id": "linked-list",
    "title": "링크드 리스트 삽입/삭제",
    "category": "B형 추가 패턴",
    "difficulty": "PRO",
    "level": 4,
    "tags": [
      "linked list",
      "delete",
      "array"
    ],
    "summary": "중간 삽입/삭제가 많은 명령형 문제에서 노드 연결을 직접 관리하는 패턴입니다.",
    "signal": "순서 유지 + 중간 삭제/삽입이 반복됩니다.",
    "strategy": [
      "head/tail과 next 배열을 관리합니다.",
      "삭제할 때 이전 노드를 알고 있으면 O(1)입니다.",
      "더블 리스트가 필요한지 먼저 판단합니다.",
      "id 조회가 필요하면 dict로 node index를 저장합니다."
    ],
    "code": "value = []\nnxt = []\nhead = -1\n\ndef new_node(v):\n    value.append(v)\n    nxt.append(-1)\n    return len(value) - 1\n\ndef push_front(v):\n    global head\n    node = new_node(v)\n    nxt[node] = head\n    head = node\n\ndef erase_after(prev):\n    target = nxt[prev]\n    if target != -1:\n        nxt[prev] = nxt[target]\n",
    "problems": [
      {
        "platform": "Blog",
        "title": "링크드 리스트 삭제",
        "difficulty": "삼성 B형 샘플",
        "url": "https://bloodstrawberry.tistory.com/47",
        "note": "B형 개념 목록 참고"
      }
    ]
  },
  {
    "id": "double-linked-list",
    "title": "더블 링크드 리스트 / 벨트",
    "category": "B형 추가 패턴",
    "difficulty": "PRO",
    "level": 5,
    "tags": [
      "double linked list",
      "belt",
      "factory"
    ],
    "summary": "앞뒤 이동과 임의 노드 삭제가 모두 필요한 공장/벨트 문제의 핵심 구조입니다.",
    "signal": "벨트, 컨베이어, 앞뒤 이동, 임의 상자 제거가 나옵니다.",
    "strategy": [
      "prev/nxt를 모두 관리합니다.",
      "head/tail 갱신을 빼먹지 않습니다.",
      "id→node 조회 dict가 필요합니다.",
      "벨트 병합/분할은 head/tail 단위로 처리합니다."
    ],
    "code": "prev = []\nnxt = []\nvalue = []\n\ndef new_node(v):\n    value.append(v)\n    prev.append(-1)\n    nxt.append(-1)\n    return len(value) - 1\n\ndef connect(a, b):\n    nxt[a] = b\n    prev[b] = a\n\ndef remove(x):\n    a, b = prev[x], nxt[x]\n    if a != -1:\n        nxt[a] = b\n    if b != -1:\n        prev[b] = a\n    prev[x] = nxt[x] = -1\n",
    "problems": [
      {
        "platform": "CodeTree",
        "title": "산타의 선물 공장",
        "difficulty": "B형 기출",
        "url": "https://www.codetree.ai/training-field/search?keyword=%EC%82%B0%ED%83%80%EC%9D%98%20%EC%84%A0%EB%AC%BC%20%EA%B3%B5%EC%9E%A5",
        "note": ""
      },
      {
        "platform": "CodeTree",
        "title": "산타의 선물 공장 2",
        "difficulty": "B형 기출",
        "url": "https://www.codetree.ai/training-field/search?keyword=%EC%82%B0%ED%83%80%EC%9D%98%20%EC%84%A0%EB%AC%BC%20%EA%B3%B5%EC%9E%A5%202",
        "note": ""
      }
    ]
  },
  {
    "id": "hash-basic",
    "title": "해시 테이블 추가/삭제/수정/검색",
    "category": "B형 추가 패턴",
    "difficulty": "PRO",
    "level": 4,
    "tags": [
      "hash",
      "dict",
      "CRUD"
    ],
    "summary": "ID나 문자열로 빠르게 데이터를 찾고 수정하는 B형 기본 구조입니다.",
    "signal": "명령마다 key로 데이터를 찾습니다.",
    "strategy": [
      "Python dict를 사용합니다.",
      "삭제는 pop(key, None)을 씁니다.",
      "id 기반 객체 관리는 dict가 중심입니다.",
      "정렬/우선순위가 필요하면 heap이나 list와 병행합니다."
    ],
    "code": "table = {}\n\ndef add(key, value):\n    table[key] = value\n\ndef remove(key):\n    table.pop(key, None)\n\ndef find(key):\n    return table.get(key)\n",
    "problems": [
      {
        "platform": "BOJ",
        "title": "나는야 포켓몬 마스터 이다솜",
        "difficulty": "Silver IV",
        "url": "https://www.acmicpc.net/problem/1620",
        "note": ""
      },
      {
        "platform": "BOJ",
        "title": "회사에 있는 사람",
        "difficulty": "Silver V",
        "url": "https://www.acmicpc.net/problem/7785",
        "note": ""
      }
    ]
  },
  {
    "id": "pq-update",
    "title": "우선순위 큐 갱신/변경",
    "category": "B형 추가 패턴",
    "difficulty": "PRO",
    "level": 5,
    "tags": [
      "priority queue",
      "update",
      "lazy deletion"
    ],
    "summary": "heap 내부 원소를 직접 수정하지 않고 새 값을 push한 뒤 최신 여부를 확인하는 패턴입니다.",
    "signal": "점수/난이도/우선순위가 계속 변경됩니다.",
    "strategy": [
      "현재 값은 dict에 저장합니다.",
      "갱신 시 heap에 새 후보를 push합니다.",
      "pop할 때 dict와 비교해 최신인지 검사합니다.",
      "order를 두면 같은 값 갱신도 구분됩니다."
    ],
    "code": "import heapq\n\ncur = {}\nheap = []\norder = 0\n\ndef update(id, score):\n    global order\n    order += 1\n    cur[id] = (score, order)\n    heapq.heappush(heap, (score, order, id))\n\ndef top():\n    while heap:\n        score, old_order, id = heapq.heappop(heap)\n        if cur.get(id) == (score, old_order):\n            return id, score\n    return None\n",
    "problems": [
      {
        "platform": "BOJ",
        "title": "수열과 쿼리 15",
        "difficulty": "Gold III",
        "url": "https://www.acmicpc.net/problem/14427",
        "note": ""
      },
      {
        "platform": "BOJ",
        "title": "문제 추천 시스템 Version 1",
        "difficulty": "Gold IV",
        "url": "https://www.acmicpc.net/problem/21939",
        "note": ""
      }
    ]
  },
  {
    "id": "median-two-heaps",
    "title": "두 힙으로 중앙값 찾기",
    "category": "B형 추가 패턴",
    "difficulty": "Gold+",
    "level": 4,
    "tags": [
      "median",
      "two heaps",
      "priority queue"
    ],
    "summary": "왼쪽 최대 힙과 오른쪽 최소 힙을 유지해 실시간 중앙값을 구하는 패턴입니다.",
    "signal": "값이 하나씩 들어오고 매번 중앙값을 출력합니다.",
    "strategy": [
      "left는 최대 힙, right는 최소 힙입니다.",
      "left 크기를 right보다 같거나 1 크게 유지합니다.",
      "중앙값은 -left[0]입니다.",
      "삽입 후 균형 조정이 필수입니다."
    ],
    "code": "import heapq\n\nleft = []\nright = []\n\ndef add(x):\n    if not left or x <= -left[0]:\n        heapq.heappush(left, -x)\n    else:\n        heapq.heappush(right, x)\n\n    if len(left) < len(right):\n        heapq.heappush(left, -heapq.heappop(right))\n    if len(left) > len(right) + 1:\n        heapq.heappush(right, -heapq.heappop(left))\n\n    return -left[0]\n",
    "problems": [
      {
        "platform": "BOJ",
        "title": "가운데를 말해요",
        "difficulty": "Gold II",
        "url": "https://www.acmicpc.net/problem/1655",
        "note": ""
      }
    ]
  },
  {
    "id": "sqrt-decomposition",
    "title": "제곱근 분할법",
    "category": "B형 추가 패턴",
    "difficulty": "PRO",
    "level": 4,
    "tags": [
      "sqrt decomposition",
      "range query",
      "update"
    ],
    "summary": "세그먼트 트리보다 간단하게 구간 쿼리와 업데이트를 처리하는 분할 기법입니다.",
    "signal": "구간합/구간쿼리 + 업데이트가 있고 구현을 단순화하고 싶습니다.",
    "strategy": [
      "배열을 sqrt(N) 크기 버킷으로 나눕니다.",
      "버킷 합을 따로 관리합니다.",
      "전체 버킷은 O(1), 양 끝은 직접 순회합니다.",
      "시간복잡도는 대략 O(sqrtN)입니다."
    ],
    "code": "B = int(n ** 0.5) + 1\nbucket = [0] * B\n\nfor i, v in enumerate(arr):\n    bucket[i // B] += v\n\ndef update(idx, value):\n    bucket[idx // B] += value - arr[idx]\n    arr[idx] = value\n\ndef query(l, r):\n    s = 0\n    while l <= r and l % B:\n        s += arr[l]; l += 1\n    while l + B - 1 <= r:\n        s += bucket[l // B]; l += B\n    while l <= r:\n        s += arr[l]; l += 1\n    return s\n",
    "problems": [
      {
        "platform": "Blog",
        "title": "제곱근 분할법 - 구간 합",
        "difficulty": "개념",
        "url": "https://bloodstrawberry.tistory.com/47",
        "note": ""
      }
    ]
  },
  {
    "id": "lazy-segment-tree",
    "title": "Lazy Propagation 세그먼트 트리",
    "category": "B형 추가 패턴",
    "difficulty": "PRO",
    "level": 5,
    "tags": [
      "lazy propagation",
      "segment tree",
      "range update"
    ],
    "summary": "구간 업데이트와 구간 쿼리를 함께 처리할 때 필요한 세그먼트 트리 확장입니다.",
    "signal": "구간 전체에 값을 더하고, 구간 합/최솟값을 묻습니다.",
    "strategy": [
      "lazy 배열에 미뤄둔 값을 저장합니다.",
      "노드에 접근하기 전 push합니다.",
      "완전 포함 구간은 lazy만 남기고 내려가지 않습니다.",
      "구간 길이를 곱해야 하는 쿼리인지 확인합니다."
    ],
    "code": "tree = [0] * (4 * n)\nlazy = [0] * (4 * n)\n\ndef push(node, start, end):\n    if lazy[node] == 0:\n        return\n\n    tree[node] += lazy[node] * (end - start + 1)\n\n    if start != end:\n        lazy[node * 2] += lazy[node]\n        lazy[node * 2 + 1] += lazy[node]\n\n    lazy[node] = 0\n",
    "problems": [
      {
        "platform": "BOJ",
        "title": "구간 합 구하기 2",
        "difficulty": "Platinum IV",
        "url": "https://www.acmicpc.net/problem/10999",
        "note": ""
      }
    ]
  },
  {
    "id": "tree-update",
    "title": "트리 삭제 / 이동 / 재부착",
    "category": "B형 추가 패턴",
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
      "parent 배열과 children set/list를 함께 관리합니다.",
      "노드 이동은 기존 부모의 children에서 제거 후 새 부모에 추가합니다.",
      "서브트리 삭제는 DFS/BFS로 자손을 모두 비활성화합니다.",
      "삭제된 노드를 조회하지 않도록 alive 배열을 둡니다."
    ],
    "code": "children = [set() for _ in range(n + 1)]\nparent = [0] * (n + 1)\nalive = [True] * (n + 1)\n\ndef move_node(x, new_parent):\n    old = parent[x]\n    if old:\n        children[old].discard(x)\n\n    parent[x] = new_parent\n    children[new_parent].add(x)\n\ndef delete_subtree(root):\n    stack = [root]\n    while stack:\n        now = stack.pop()\n        alive[now] = False\n        for child in children[now]:\n            stack.append(child)\n",
    "problems": [
      {
        "platform": "BOJ",
        "title": "트리",
        "difficulty": "Gold V",
        "url": "https://www.acmicpc.net/problem/1068",
        "note": ""
      },
      {
        "platform": "BOJ",
        "title": "사회망 서비스(SNS)",
        "difficulty": "Gold III",
        "url": "https://www.acmicpc.net/problem/2533",
        "note": ""
      },
      {
        "platform": "CodeTree",
        "title": "색깔 트리",
        "difficulty": "B형 기출",
        "url": "https://www.codetree.ai/training-field/search?keyword=%EC%83%89%EA%B9%94%20%ED%8A%B8%EB%A6%AC",
        "note": ""
      }
    ]
  },
  {
    "id": "bfs-tiebreak",
    "title": "BFS + 거리/행/열 우선순위",
    "category": "B형 추가 패턴",
    "difficulty": "PRO",
    "level": 4,
    "tags": [
      "BFS",
      "tie-break",
      "grid"
    ],
    "summary": "가장 가까운 대상을 찾고, 거리가 같으면 행/열 기준으로 고르는 삼성식 BFS 패턴입니다.",
    "signal": "가장 가까운 대상 + 행 번호 작은 것 + 열 번호 작은 것이 반복됩니다.",
    "strategy": [
      "BFS로 모든 후보의 거리를 구합니다.",
      "후보를 (거리, 행, 열) tuple로 모읍니다.",
      "sort 후 첫 번째를 선택합니다.",
      "이동 가능 조건과 목표 조건을 함수로 분리합니다."
    ],
    "code": "from collections import deque\n\ndef bfs_find_target(sy, sx):\n    q = deque([(sy, sx)])\n    dist = [[-1] * n for _ in range(n)]\n    dist[sy][sx] = 0\n    candidates = []\n\n    while q:\n        y, x = q.popleft()\n\n        for dy, dx in ((-1,0), (0,-1), (0,1), (1,0)):\n            ny, nx = y + dy, x + dx\n\n            if not (0 <= ny < n and 0 <= nx < n):\n                continue\n            if dist[ny][nx] != -1:\n                continue\n            if not can_go(ny, nx):\n                continue\n\n            dist[ny][nx] = dist[y][x] + 1\n            q.append((ny, nx))\n\n            if is_target(ny, nx):\n                candidates.append((dist[ny][nx], ny, nx))\n\n    candidates.sort()\n    return candidates[0] if candidates else None\n",
    "problems": [
      {
        "platform": "BOJ",
        "title": "아기 상어",
        "difficulty": "Gold III",
        "url": "https://www.acmicpc.net/problem/16236",
        "note": ""
      },
      {
        "platform": "BOJ",
        "title": "스타트 택시",
        "difficulty": "Gold II",
        "url": "https://www.acmicpc.net/problem/19238",
        "note": ""
      },
      {
        "platform": "CodeTree",
        "title": "AI 로봇청소기",
        "difficulty": "삼성 기출",
        "url": "https://www.codetree.ai/training-field/search?keyword=AI%20%EB%A1%9C%EB%B4%87%EC%B2%AD%EC%86%8C%EA%B8%B0",
        "note": ""
      }
    ]
  },
  {
    "id": "codetree-judger",
    "title": "코드트리 채점기 유형",
    "category": "B형 추가 패턴",
    "difficulty": "PRO",
    "level": 5,
    "tags": [
      "priority queue",
      "scheduler",
      "set",
      "domain"
    ],
    "summary": "도메인별 대기 큐, 채점기 상태, 중복 방지, 시간 제한을 함께 관리하는 스케줄러 유형입니다.",
    "signal": "대기열, 채점기, 도메인 제한, 우선순위가 함께 나옵니다.",
    "strategy": [
      "도메인별 heap을 둡니다.",
      "중복 요청 방지 set을 둡니다.",
      "채점기 idle 상태를 따로 관리합니다.",
      "문제 선택 기준을 tuple로 고정합니다."
    ],
    "code": "import heapq\n\nwaiting = {}\nin_queue = set()\njudgers = []\n\ndef request(domain, problem_id, priority, time):\n    key = (domain, problem_id)\n    if key in in_queue:\n        return\n    in_queue.add(key)\n    waiting.setdefault(domain, [])\n    heapq.heappush(waiting[domain], (priority, time, problem_id))",
    "problems": [
      {
        "platform": "CodeTree",
        "title": "코드트리 채점기",
        "difficulty": "B형 기출",
        "url": "https://www.codetree.ai/training-field/search?keyword=%EC%BD%94%EB%93%9C%ED%8A%B8%EB%A6%AC%20%EC%B1%84%EC%A0%90%EA%B8%B0",
        "note": ""
      }
    ]
  }
];

export const richArchives = [
  {
    "id": "btype-roadmap",
    "title": "삼성 B형/PRO 핵심 로드맵",
    "category": "Rich 노트",
    "difficulty": "필수",
    "level": 5,
    "tags": [
      "roadmap",
      "B형",
      "PRO"
    ],
    "summary": "B형 대비는 단순 알고리즘보다 자료구조 직접 구현, 명령 처리, 최적화 코드가 중요합니다.",
    "signal": "명령형 문제 + 빠른 자료구조 + 직접 구현이 핵심입니다.",
    "strategy": [
      "링크드 리스트, 해시, 우선순위 큐를 먼저 잡습니다.",
      "세그먼트 트리와 lazy를 익힙니다.",
      "CodeTree B형 기출로 명령 처리 감각을 만듭니다.",
      "디버깅 로그와 빠른 입출력 습관을 고정합니다."
    ],
    "code": "# 우선순위\n# 1. Hash / Linked List / Heap\n# 2. Lazy deletion\n# 3. Segment Tree\n# 4. CodeTree B형 기출\n",
    "problems": [
      {
        "platform": "Blog",
        "title": "삼성 B형 링크",
        "difficulty": "링크 모음",
        "url": "https://bloodstrawberry.tistory.com/47",
        "note": ""
      }
    ]
  },
  {
    "id": "five-minute-judge",
    "title": "PRO 시험 5분 판단 로직",
    "category": "Rich 노트",
    "difficulty": "필수",
    "level": 5,
    "tags": [
      "판단법",
      "시간복잡도",
      "패턴 매칭"
    ],
    "summary": "문제 읽고 5분 안에 어떤 자료구조/탐색을 써야 하는지 판별하는 체크리스트입니다.",
    "signal": "입력 크기, 상태 개수, 최단/최대/순위 키워드를 동시에 봅니다.",
    "strategy": [
      "N이 작고 선택 개수가 있으면 DFS 조합입니다.",
      "격자 최단거리면 BFS입니다.",
      "가중치가 있으면 다익스트라/0-1 BFS입니다.",
      "삭제/수정/추천이면 heap+dict입니다."
    ],
    "code": "# 문제 읽고 5분 안에 적기\n# 1. N, M, Q 범위\n# 2. 상태 변수\n# 3. 목표값: 최단/최대/개수/순위\n# 4. 사용할 자료구조\n",
    "problems": []
  },
  {
    "id": "command-design",
    "title": "명령형 문제 설계법",
    "category": "Rich 노트",
    "difficulty": "PRO",
    "level": 5,
    "tags": [
      "command",
      "state",
      "design"
    ],
    "summary": "B형 기출은 명령마다 어떤 상태가 바뀌는지 표로 정리하지 않으면 구현이 꼬이기 쉽습니다.",
    "signal": "init/add/delete/update/query 명령이 많습니다.",
    "strategy": [
      "명령별로 읽는 상태와 바꾸는 상태를 표로 만듭니다.",
      "id로 찾는 데이터는 dict에 둡니다.",
      "순위 후보는 heap에 둡니다.",
      "삭제/갱신은 lazy deletion을 기본 선택지로 둡니다."
    ],
    "code": "# command | read | write | data structure | complexity\n",
    "problems": []
  },
  {
    "id": "lazy-deletion-rule",
    "title": "Lazy Deletion 판단법",
    "category": "Rich 노트",
    "difficulty": "PRO",
    "level": 5,
    "tags": [
      "lazy deletion",
      "heapq",
      "dict"
    ],
    "summary": "heap에서 임의 원소 삭제/갱신이 나오면 거의 항상 lazy deletion을 먼저 떠올려야 합니다.",
    "signal": "heap 원소를 직접 삭제/수정하라고 느껴집니다.",
    "strategy": [
      "현재 상태는 dict에 둡니다.",
      "heap에는 과거 후보가 남아도 됩니다.",
      "pop할 때 최신 값인지 확인합니다.",
      "heap 쓰레기가 많아지면 rebuild합니다."
    ],
    "code": "import heapq\n\ncur = {}\nheap = []\norder = 0\n\ndef update(id, score):\n    global order\n    order += 1\n    cur[id] = (score, order)\n    heapq.heappush(heap, (score, order, id))\n\ndef top():\n    while heap:\n        score, old_order, id = heapq.heappop(heap)\n        if cur.get(id) == (score, old_order):\n            return id, score\n    return None\n",
    "problems": []
  },
  {
    "id": "btype-debug",
    "title": "삼성 B형 디버깅 루틴",
    "category": "Rich 노트",
    "difficulty": "필수",
    "level": 4,
    "tags": [
      "debug",
      "log",
      "test"
    ],
    "summary": "복잡한 명령 처리 문제는 전체 정답 코드보다 상태 출력 함수가 더 중요할 때가 많습니다.",
    "signal": "작은 예제에서 상태가 틀어집니다.",
    "strategy": [
      "명령 1개 처리 후 핵심 상태를 출력합니다.",
      "heap과 dict의 불일치를 확인합니다.",
      "head/tail, prev/nxt를 검사합니다.",
      "최종 제출 전 로그를 끄는 스위치를 둡니다."
    ],
    "code": "DEBUG = False\n\ndef log(*args):\n    if DEBUG:\n        print(*args)\n",
    "problems": []
  }
];

export const codetreeProblems = [
  {
    "id": "codetree-db",
    "title": "코드트리 DB",
    "category": "CodeTree B형 기출",
    "difficulty": "2024 하반기 오전 2번",
    "level": 5,
    "tags": [
      "segment tree",
      "hash",
      "database"
    ],
    "summary": "DB 명령을 처리하며 key/value 관리와 순위/구간성 자료구조가 결합되는 유형입니다.",
    "signal": "삽입/삭제/검색 + 순위/조건 조회가 반복됩니다.",
    "strategy": [
      "key 조회는 hash로 처리합니다.",
      "정렬/순위/구간 질의는 세그먼트 트리나 balanced 구조 사고가 필요합니다.",
      "삭제와 갱신 시 모든 인덱스를 함께 갱신합니다.",
      "좌표 압축을 먼저 고려합니다."
    ],
    "code": "def build(node, start, end):\n    if start == end:\n        tree[node] = arr[start]\n        return\n\n    mid = (start + end) // 2\n    build(node * 2, start, mid)\n    build(node * 2 + 1, mid + 1, end)\n    tree[node] = tree[node * 2] + tree[node * 2 + 1]\n\ndef query(node, start, end, left, right):\n    if right < start or end < left:\n        return 0\n\n    if left <= start and end <= right:\n        return tree[node]\n\n    mid = (start + end) // 2\n    return query(node*2, start, mid, left, right) + query(node*2+1, mid+1, end, left, right)\n",
    "problems": [
      {
        "platform": "CodeTree",
        "title": "코드트리 DB",
        "difficulty": "B형 기출",
        "url": "https://www.codetree.ai/training-field/search?keyword=%EC%BD%94%EB%93%9C%ED%8A%B8%EB%A6%AC%20DB",
        "note": ""
      }
    ]
  },
  {
    "id": "rabbit-race",
    "title": "토끼와 경주",
    "category": "CodeTree B형 기출",
    "difficulty": "2023 상반기 오전 2번",
    "level": 5,
    "tags": [
      "priority queue",
      "ranking",
      "simulation"
    ],
    "summary": "경주 대상 선택, 점수 갱신, 우선순위 정렬이 섞인 대표 B형 자료구조 시뮬레이션입니다.",
    "signal": "우선순위 기준으로 대상 선택 후 점수/위치 갱신이 반복됩니다.",
    "strategy": [
      "토끼 선택 기준을 tuple로 만듭니다.",
      "점수 전체 증가분과 개인 보정분을 분리합니다.",
      "위치 이동 계산을 함수화합니다.",
      "갱신된 토끼는 heap에 다시 push합니다."
    ],
    "code": "import heapq\n\ncur = {}\nheap = []\norder = 0\n\ndef update(id, score):\n    global order\n    order += 1\n    cur[id] = (score, order)\n    heapq.heappush(heap, (score, order, id))\n\ndef top():\n    while heap:\n        score, old_order, id = heapq.heappop(heap)\n        if cur.get(id) == (score, old_order):\n            return id, score\n    return None\n",
    "problems": [
      {
        "platform": "CodeTree",
        "title": "토끼와 경주",
        "difficulty": "B형 기출",
        "url": "https://www.codetree.ai/training-field/search?keyword=%ED%86%A0%EB%81%BC%EC%99%80%20%EA%B2%BD%EC%A3%BC",
        "note": ""
      }
    ]
  },
  {
    "id": "codetree-tour",
    "title": "코드트리 투어",
    "category": "CodeTree B형 기출",
    "difficulty": "2024 상반기 오전 2번",
    "level": 5,
    "tags": [
      "Dijkstra",
      "priority queue",
      "product"
    ],
    "summary": "상품 후보의 이익을 계산하고, 출발지 변경 시 최단거리를 다시 반영하는 그래프+우선순위 유형입니다.",
    "signal": "최단거리 + 이익 최대 상품 선택이 반복됩니다.",
    "strategy": [
      "출발지가 바뀌면 다익스트라를 다시 계산합니다.",
      "상품 이익은 revenue - dist[destination]입니다.",
      "판매 가능 후보는 heap으로 관리합니다.",
      "삭제 상품은 id set으로 무효화합니다."
    ],
    "code": "import heapq\n\ndef kth_dijkstra(start):\n    dist = [[] for _ in range(n + 1)]\n    h = [(0, start)]\n\n    while h:\n        cost, now = heapq.heappop(h)\n\n        if len(dist[now]) >= k:\n            continue\n\n        dist[now].append(cost)\n\n        for next_cost, next_node in graph[now]:\n            heapq.heappush(h, (cost + next_cost, next_node))\n\n    return dist\n",
    "problems": [
      {
        "platform": "CodeTree",
        "title": "코드트리 투어",
        "difficulty": "B형 기출",
        "url": "https://www.codetree.ai/training-field/search?keyword=%EC%BD%94%EB%93%9C%ED%8A%B8%EB%A6%AC%20%ED%88%AC%EC%96%B4",
        "note": ""
      }
    ]
  },
  {
    "id": "factory-belt",
    "title": "산타의 선물 공장",
    "category": "CodeTree B형 기출",
    "difficulty": "2022 하반기",
    "level": 5,
    "tags": [
      "double linked list",
      "factory",
      "belt",
      "hash"
    ],
    "summary": "상자 id 조회와 벨트 이동/삭제/분할을 빠르게 처리하는 더블 링크드 리스트 응용입니다.",
    "signal": "벨트, 상자, 공장, 앞뒤 연결, 제거 명령이 나옵니다.",
    "strategy": [
      "상자 id로 prev/nxt를 찾습니다.",
      "벨트별 head/tail을 관리합니다.",
      "상자 제거는 O(1)로 처리합니다.",
      "벨트 병합은 head/tail 포인터만 갱신합니다."
    ],
    "code": "prev = []\nnxt = []\nvalue = []\n\ndef new_node(v):\n    value.append(v)\n    prev.append(-1)\n    nxt.append(-1)\n    return len(value) - 1\n\ndef connect(a, b):\n    nxt[a] = b\n    prev[b] = a\n\ndef remove(x):\n    a, b = prev[x], nxt[x]\n    if a != -1:\n        nxt[a] = b\n    if b != -1:\n        prev[b] = a\n    prev[x] = nxt[x] = -1\n",
    "problems": [
      {
        "platform": "CodeTree",
        "title": "산타의 선물 공장",
        "difficulty": "B형 기출",
        "url": "https://www.codetree.ai/training-field/search?keyword=%EC%82%B0%ED%83%80%EC%9D%98%20%EC%84%A0%EB%AC%BC%20%EA%B3%B5%EC%9E%A5",
        "note": ""
      }
    ]
  },
  {
    "id": "messenger",
    "title": "코드트리 메신저",
    "category": "CodeTree B형 기출",
    "difficulty": "2023 하반기 오전 2번",
    "level": 5,
    "tags": [
      "tree",
      "memoization",
      "command"
    ],
    "summary": "알림 권한, 부모 변경, 색상/깊이 제한처럼 트리 위 명령을 빠르게 처리하는 유형입니다.",
    "signal": "트리 명령 + 반복 질의 + 제한 깊이가 있습니다.",
    "strategy": [
      "부모와 자식 정보를 모두 저장합니다.",
      "노드별 상태를 dict/list에 둡니다.",
      "상위 방향 전파와 하위 방향 계산을 분리합니다.",
      "자주 묻는 값은 캐시합니다."
    ],
    "code": "children = [set() for _ in range(n + 1)]\nparent = [0] * (n + 1)\nalive = [True] * (n + 1)\n\ndef move_node(x, new_parent):\n    old = parent[x]\n    if old:\n        children[old].discard(x)\n\n    parent[x] = new_parent\n    children[new_parent].add(x)\n\ndef delete_subtree(root):\n    stack = [root]\n    while stack:\n        now = stack.pop()\n        alive[now] = False\n        for child in children[now]:\n            stack.append(child)\n",
    "problems": [
      {
        "platform": "CodeTree",
        "title": "코드트리 메신저",
        "difficulty": "B형 기출",
        "url": "https://www.codetree.ai/training-field/search?keyword=%EC%BD%94%EB%93%9C%ED%8A%B8%EB%A6%AC%20%EB%A9%94%EC%8B%A0%EC%A0%80",
        "note": ""
      }
    ]
  },
  {
    "id": "color-tree",
    "title": "색깔 트리",
    "category": "CodeTree B형 기출",
    "difficulty": "2024 상반기 오후 2번",
    "level": 5,
    "tags": [
      "tree",
      "DFS",
      "constraint"
    ],
    "summary": "색상과 깊이 제한이 있는 트리 명령 처리 문제 유형입니다.",
    "signal": "트리에 노드 추가, 색 변경, 점수 계산이 반복됩니다.",
    "strategy": [
      "노드별 parent/color/maxDepth를 저장합니다.",
      "추가 가능 여부를 조상 방향으로 확인합니다.",
      "서브트리 계산은 DFS로 합니다.",
      "반복 질의 최적화를 위해 캐시를 고려합니다."
    ],
    "code": "children = [set() for _ in range(n + 1)]\nparent = [0] * (n + 1)\nalive = [True] * (n + 1)\n\ndef move_node(x, new_parent):\n    old = parent[x]\n    if old:\n        children[old].discard(x)\n\n    parent[x] = new_parent\n    children[new_parent].add(x)\n\ndef delete_subtree(root):\n    stack = [root]\n    while stack:\n        now = stack.pop()\n        alive[now] = False\n        for child in children[now]:\n            stack.append(child)\n",
    "problems": [
      {
        "platform": "CodeTree",
        "title": "색깔 트리",
        "difficulty": "B형 기출",
        "url": "https://www.codetree.ai/training-field/search?keyword=%EC%83%89%EA%B9%94%20%ED%8A%B8%EB%A6%AC",
        "note": ""
      }
    ]
  },
  {
    "id": "ai-robot",
    "title": "AI 로봇청소기",
    "category": "CodeTree 삼성 기출",
    "difficulty": "2025 하반기",
    "level": 4,
    "tags": [
      "BFS",
      "tie-break",
      "simulation",
      "robot"
    ],
    "summary": "각 청소기가 가장 가까운 오염 격자를 BFS로 찾고, 거리/행/열 우선순위에 따라 이동하는 유형입니다.",
    "signal": "가장 가까운 오염 칸 + 행/열 tie-break + 이동 불가 시 제자리 처리입니다.",
    "strategy": [
      "청소기 현재 위치를 먼저 체크합니다.",
      "각 청소기마다 BFS로 가장 가까운 오염 칸을 찾습니다.",
      "후보는 거리, 행, 열 기준으로 정렬합니다.",
      "이동 가능한 격자가 없으면 현재 위치를 유지합니다."
    ],
    "code": "from collections import deque\n\ndef bfs_find_target(sy, sx):\n    q = deque([(sy, sx)])\n    dist = [[-1] * n for _ in range(n)]\n    dist[sy][sx] = 0\n    candidates = []\n\n    while q:\n        y, x = q.popleft()\n\n        for dy, dx in ((-1,0), (0,-1), (0,1), (1,0)):\n            ny, nx = y + dy, x + dx\n\n            if not (0 <= ny < n and 0 <= nx < n):\n                continue\n            if dist[ny][nx] != -1:\n                continue\n            if not can_go(ny, nx):\n                continue\n\n            dist[ny][nx] = dist[y][x] + 1\n            q.append((ny, nx))\n\n            if is_target(ny, nx):\n                candidates.append((dist[ny][nx], ny, nx))\n\n    candidates.sort()\n    return candidates[0] if candidates else None\n",
    "problems": [
      {
        "platform": "CodeTree",
        "title": "AI 로봇청소기",
        "difficulty": "문제",
        "url": "https://www.codetree.ai/training-field/search?keyword=AI%20%EB%A1%9C%EB%B4%87%EC%B2%AD%EC%86%8C%EA%B8%B0",
        "note": ""
      },
      {
        "platform": "BOJ",
        "title": "로봇 청소기",
        "difficulty": "Gold V",
        "url": "https://www.acmicpc.net/problem/14503",
        "note": ""
      }
    ]
  },
  {
    "id": "street-light",
    "title": "가로등 설치",
    "category": "CodeTree B형 기출",
    "difficulty": "2025 하반기 오후 2번",
    "level": 5,
    "tags": [
      "interval",
      "set",
      "priority queue"
    ],
    "summary": "가로등 위치 간격과 양 끝 거리 기준을 관리하는 B형 기출입니다.",
    "signal": "설치 위치 변화 후 최대 어두운 구간을 계산합니다.",
    "strategy": [
      "정렬된 가로등 위치를 관리합니다.",
      "인접 간격 최댓값을 관리합니다.",
      "양 끝 구간은 2배 기준으로 비교합니다.",
      "동적 변경이면 interval heap + lazy deletion을 고려합니다."
    ],
    "code": "def calc_answer(lamps, n):\n    lamps.sort()\n    ans = max((lamps[0] - 1) * 2, (n - lamps[-1]) * 2)\n    for i in range(len(lamps) - 1):\n        ans = max(ans, lamps[i + 1] - lamps[i])\n    return ans\n",
    "problems": [
      {
        "platform": "CodeTree",
        "title": "가로등 설치",
        "difficulty": "B형 기출",
        "url": "https://www.codetree.ai/training-field/search?keyword=%EA%B0%80%EB%A1%9C%EB%93%B1%20%EC%84%A4%EC%B9%98",
        "note": ""
      }
    ]
  }
];
