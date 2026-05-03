
import { useMemo, useState } from "react";
import "./App.css";

const initialPatterns = [
  {
    "id": "topk-lazy",
    "title": "Top-K 유지 + 삭제/수정",
    "subtitle": "Heap + Lazy Deletion",
    "difficulty": "PRO",
    "level": 4,
    "tags": [
      "dict",
      "heapq",
      "lazy deletion",
      "ranking"
    ],
    "signal": "삭제 많음 + 정렬 유지 + id 기반 → lazy deletion",
    "idea": [
      "dict는 진짜 데이터",
      "heap은 후보 저장소",
      "삭제/수정 시 heap을 직접 건드리지 않음",
      "조회할 때 dict와 비교해서 유효성 검사"
    ],
    "code": "import heapq\n\ndata = {}\nheap_height = []\norder = 0\n\ndef add_or_update(id, height):\n    global order\n    order += 1\n    data[id] = (height, order)\n    heapq.heappush(heap_height, (-height, order, id))\n\ndef delete(id):\n    data.pop(id, None)\n\ndef get_top5_height():\n    res = []\n    temp = []\n\n    while heap_height and len(res) < 5:\n        neg_h, order, id = heapq.heappop(heap_height)\n        temp.append((neg_h, order, id))\n\n        if id not in data:\n            continue\n\n        h, cur_order = data[id]\n\n        if cur_order != order:\n            continue\n\n        if h != -neg_h:\n            continue\n\n        res.append(id)\n\n    for item in temp:\n        heapq.heappush(heap_height, item)\n\n    return res",
    "traps": [
      "heap 안에는 삭제/수정 전 오래된 데이터가 남는다.",
      "큰 값 우선이면 음수로 넣는다.",
      "Top K 유지와 전체 중 Top K 조회는 다르다.",
      "쓰레기 데이터가 많아지면 rebuild가 필요하다."
    ],
    "problems": [
      {
        "id": "boj-7662",
        "platform": "BOJ",
        "title": "이중 우선순위 큐",
        "difficulty": "Gold IV",
        "url": "https://www.acmicpc.net/problem/7662",
        "note": "삭제 많은 heap lazy deletion"
      },
      {
        "id": "boj-21939",
        "platform": "BOJ",
        "title": "문제 추천 시스템 Version 1",
        "difficulty": "Gold IV",
        "url": "https://www.acmicpc.net/problem/21939",
        "note": "id 기반 문제 관리"
      },
      {
        "id": "pg-42628",
        "platform": "Programmers",
        "title": "이중우선순위큐",
        "difficulty": "Level 3",
        "url": "https://school.programmers.co.kr/learn/courses/30/lessons/42628",
        "note": "최댓값/최솟값 삭제"
      },
      {
        "id": "ct-topk",
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
    "subtitle": "Dijkstra 변형",
    "difficulty": "PRO",
    "level": 4,
    "tags": [
      "dijkstra",
      "heapq",
      "k-th path"
    ],
    "signal": "최단이 아니라 k번째, 여러 경로 후보 유지",
    "idea": [
      "dist[node]를 숫자 하나가 아니라 리스트로 둔다.",
      "각 노드마다 k개까지 비용을 허용한다.",
      "heap에서 꺼낸 비용을 dist[now]에 누적한다."
    ],
    "code": "import heapq\n\ndef kth_dijkstra(start):\n    dist = [[] for _ in range(n + 1)]\n    h = [(0, start)]\n\n    while h:\n        cost, now = heapq.heappop(h)\n\n        if len(dist[now]) >= k:\n            continue\n\n        dist[now].append(cost)\n\n        for next_cost, next_node in graph[now]:\n            heapq.heappush(h, (cost + next_cost, next_node))\n\n    return dist",
    "traps": [
      "일반 dist 배열처럼 최소값 하나만 저장하면 틀린다.",
      "중복 경로 후보를 허용해야 한다.",
      "음수 간선이면 다익스트라를 쓰면 안 된다."
    ],
    "problems": [
      {
        "id": "boj-1854",
        "platform": "BOJ",
        "title": "K번째 최단경로 찾기",
        "difficulty": "Platinum IV",
        "url": "https://www.acmicpc.net/problem/1854",
        "note": "대표 K번째 최단경로"
      },
      {
        "id": "boj-5719",
        "platform": "BOJ",
        "title": "거의 최단 경로",
        "difficulty": "Platinum V",
        "url": "https://www.acmicpc.net/problem/5719",
        "note": "최단경로 제거"
      },
      {
        "id": "pg-72413",
        "platform": "Programmers",
        "title": "합승 택시 요금",
        "difficulty": "Level 3",
        "url": "https://school.programmers.co.kr/learn/courses/30/lessons/72413",
        "note": "그래프 최단거리"
      },
      {
        "id": "ct-dijkstra",
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
    "subtitle": "visited[y][x][state]",
    "difficulty": "PRO",
    "level": 3,
    "tags": [
      "BFS",
      "state",
      "3D visited"
    ],
    "signal": "벽 부수기, 열쇠, 문, 방향, 남은 횟수 → 상태 차원 추가",
    "idea": [
      "위치만 방문 체크하면 안 된다.",
      "같은 칸이어도 상태가 다르면 다른 노드다.",
      "visited[y][x][state] 형태로 확장한다."
    ],
    "code": "from collections import deque\n\nvisited = [[[0] * 2 for _ in range(m)] for _ in range(n)]\nq = deque([(0, 0, 0)])\nvisited[0][0][0] = 1\n\nwhile q:\n    y, x, used = q.popleft()\n\n    for dy, dx in ((1,0), (-1,0), (0,1), (0,-1)):\n        ny, nx = y + dy, x + dx\n\n        if ny < 0 or ny >= n or nx < 0 or nx >= m:\n            continue\n\n        if board[ny][nx] == 1 and used == 0:\n            visited[ny][nx][1] = visited[y][x][used] + 1\n            q.append((ny, nx, 1))\n\n        if board[ny][nx] == 0 and visited[ny][nx][used] == 0:\n            visited[ny][nx][used] = visited[y][x][used] + 1\n            q.append((ny, nx, used))",
    "traps": [
      "visited[y][x] 하나만 쓰면 상태가 섞인다.",
      "상태 개수가 커지면 메모리부터 계산해야 한다.",
      "벽을 부순 상태와 안 부순 상태는 완전히 다르다."
    ],
    "problems": [
      {
        "id": "boj-2206",
        "platform": "BOJ",
        "title": "벽 부수고 이동하기",
        "difficulty": "Gold III",
        "url": "https://www.acmicpc.net/problem/2206",
        "note": "벽 1회 상태 BFS"
      },
      {
        "id": "boj-1194",
        "platform": "BOJ",
        "title": "달이 차오른다, 가자.",
        "difficulty": "Gold I",
        "url": "https://www.acmicpc.net/problem/1194",
        "note": "열쇠 비트마스킹 BFS"
      },
      {
        "id": "pg-1844",
        "platform": "Programmers",
        "title": "게임 맵 최단거리",
        "difficulty": "Level 2",
        "url": "https://school.programmers.co.kr/learn/courses/30/lessons/1844",
        "note": "격자 BFS"
      },
      {
        "id": "ct-bfs",
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
    "subtitle": "Backtracking",
    "difficulty": "PRO",
    "level": 3,
    "tags": [
      "DFS",
      "combination",
      "pruning"
    ],
    "signal": "여러 개 선택, 제거 조합, 최적값 → DFS + pruning",
    "idea": [
      "모든 조합을 DFS로 만든다.",
      "현재 값이 이미 답보다 나쁘면 중단한다.",
      "선택/비선택 구조를 빠르게 설계한다."
    ],
    "code": "def dfs(idx, selected, cost):\n    global answer\n\n    if cost >= answer:\n        return\n\n    if selected == target_count:\n        answer = min(answer, cost)\n        return\n\n    if idx == n:\n        return\n\n    dfs(idx + 1, selected + 1, cost + arr[idx])\n    dfs(idx + 1, selected, cost)",
    "traps": [
      "가지치기가 없으면 시간초과가 난다.",
      "선택 순서를 정렬하면 가지치기가 더 잘 먹힐 수 있다.",
      "DFS 후 상태 복구를 빼먹으면 틀린다."
    ],
    "problems": [
      {
        "id": "boj-15684",
        "platform": "BOJ",
        "title": "사다리 조작",
        "difficulty": "Gold III",
        "url": "https://www.acmicpc.net/problem/15684",
        "note": "조합 + 시뮬레이션"
      },
      {
        "id": "boj-14502",
        "platform": "BOJ",
        "title": "연구소",
        "difficulty": "Gold IV",
        "url": "https://www.acmicpc.net/problem/14502",
        "note": "벽 3개 조합 + BFS"
      },
      {
        "id": "pg-60062",
        "platform": "Programmers",
        "title": "외벽 점검",
        "difficulty": "Level 3",
        "url": "https://school.programmers.co.kr/learn/courses/30/lessons/60062",
        "note": "순열/가지치기"
      },
      {
        "id": "ct-backtracking",
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
    "subtitle": "deque 최단거리 최적화",
    "difficulty": "PRO",
    "level": 4,
    "tags": [
      "BFS",
      "deque",
      "0-1 BFS"
    ],
    "signal": "가중치가 0 또는 1 → heap 대신 deque",
    "idea": [
      "간선 비용이 0 또는 1일 때 사용한다.",
      "비용 0이면 appendleft, 비용 1이면 append 한다.",
      "다익스트라보다 가볍게 처리한다."
    ],
    "code": "from collections import deque\n\nINF = int(1e9)\ndist = [[INF] * m for _ in range(n)]\ndq = deque()\n\ndist[0][0] = 0\ndq.append((0, 0))\n\nwhile dq:\n    y, x = dq.popleft()\n\n    for dy, dx in ((1,0), (-1,0), (0,1), (0,-1)):\n        ny, nx = y + dy, x + dx\n\n        if ny < 0 or ny >= n or nx < 0 or nx >= m:\n            continue\n\n        cost = board[ny][nx]\n\n        if dist[ny][nx] > dist[y][x] + cost:\n            dist[ny][nx] = dist[y][x] + cost\n\n            if cost == 0:\n                dq.appendleft((ny, nx))\n            else:\n                dq.append((ny, nx))",
    "traps": [
      "가중치가 0/1이 아닐 때는 다익스트라를 써야 한다.",
      "방문 체크만 쓰면 더 짧은 경로 갱신을 놓칠 수 있다.",
      "비용 0은 appendleft 해야 한다."
    ],
    "problems": [
      {
        "id": "boj-1261",
        "platform": "BOJ",
        "title": "알고스팟",
        "difficulty": "Gold IV",
        "url": "https://www.acmicpc.net/problem/1261",
        "note": "0-1 BFS 대표"
      },
      {
        "id": "boj-13549",
        "platform": "BOJ",
        "title": "숨바꼭질 3",
        "difficulty": "Gold V",
        "url": "https://www.acmicpc.net/problem/13549",
        "note": "순간이동 비용 0"
      },
      {
        "id": "ct-01bfs",
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
    "subtitle": "Disjoint Set",
    "difficulty": "Gold+",
    "level": 3,
    "tags": [
      "union find",
      "disjoint set",
      "MST"
    ],
    "signal": "연결 여부, 그룹 합치기, 사이클 판정 → Union-Find",
    "idea": [
      "각 원소의 대표 부모를 관리한다.",
      "find로 대표를 찾고 union으로 합친다.",
      "경로 압축으로 find를 빠르게 만든다."
    ],
    "code": "parent = [i for i in range(n + 1)]\n\ndef find(x):\n    if parent[x] != x:\n        parent[x] = find(parent[x])\n    return parent[x]\n\ndef union(a, b):\n    pa = find(a)\n    pb = find(b)\n\n    if pa == pb:\n        return False\n\n    parent[pb] = pa\n    return True",
    "traps": [
      "find 결과끼리 비교해야 한다.",
      "parent[a]와 parent[b]를 바로 비교하면 틀릴 수 있다.",
      "크루스칼에서는 union 성공 간선만 선택한다."
    ],
    "problems": [
      {
        "id": "boj-1717",
        "platform": "BOJ",
        "title": "집합의 표현",
        "difficulty": "Gold V",
        "url": "https://www.acmicpc.net/problem/1717",
        "note": "Union-Find 기본"
      },
      {
        "id": "boj-1197",
        "platform": "BOJ",
        "title": "최소 스패닝 트리",
        "difficulty": "Gold IV",
        "url": "https://www.acmicpc.net/problem/1197",
        "note": "크루스칼 MST"
      },
      {
        "id": "pg-42861",
        "platform": "Programmers",
        "title": "섬 연결하기",
        "difficulty": "Level 3",
        "url": "https://school.programmers.co.kr/learn/courses/30/lessons/42861",
        "note": "MST 대표"
      },
      {
        "id": "ct-union",
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
    "subtitle": "구간 쿼리 + 업데이트",
    "difficulty": "PRO",
    "level": 4,
    "tags": [
      "segment tree",
      "range query",
      "update"
    ],
    "signal": "구간 합/최소/최대 + 값 변경 → Segment Tree",
    "idea": [
      "배열 구간 정보를 트리에 저장한다.",
      "구간 질의와 단일 업데이트를 O(logN)에 처리한다.",
      "합, 최소, 최대 등으로 응용한다."
    ],
    "code": "def build(node, start, end):\n    if start == end:\n        tree[node] = arr[start]\n        return\n\n    mid = (start + end) // 2\n    build(node * 2, start, mid)\n    build(node * 2 + 1, mid + 1, end)\n    tree[node] = tree[node * 2] + tree[node * 2 + 1]\n\ndef query(node, start, end, left, right):\n    if right < start or end < left:\n        return 0\n\n    if left <= start and end <= right:\n        return tree[node]\n\n    mid = (start + end) // 2\n    return query(node*2, start, mid, left, right) + query(node*2+1, mid+1, end, left, right)",
    "traps": [
      "tree 크기는 보통 4*N으로 잡으면 안전하다.",
      "0-index와 1-index를 섞으면 틀린다.",
      "최소/최대 쿼리는 기본값을 바꿔야 한다."
    ],
    "problems": [
      {
        "id": "boj-2042",
        "platform": "BOJ",
        "title": "구간 합 구하기",
        "difficulty": "Gold I",
        "url": "https://www.acmicpc.net/problem/2042",
        "note": "세그먼트 트리 기본"
      },
      {
        "id": "boj-2357",
        "platform": "BOJ",
        "title": "최솟값과 최댓값",
        "difficulty": "Gold I",
        "url": "https://www.acmicpc.net/problem/2357",
        "note": "min/max 쿼리"
      },
      {
        "id": "ct-segtree",
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
    "subtitle": "연속 구간 최적화",
    "difficulty": "Gold+",
    "level": 3,
    "tags": [
      "two pointer",
      "sliding window"
    ],
    "signal": "연속 부분 배열, 구간 길이, 부분합 → left/right",
    "idea": [
      "left와 right를 한 방향으로 움직인다.",
      "현재 구간 상태를 유지하면서 답을 갱신한다.",
      "양수 배열에서 특히 강력하다."
    ],
    "code": "left = 0\nsumv = 0\nanswer = int(1e9)\n\nfor right in range(n):\n    sumv += arr[right]\n\n    while sumv >= target:\n        answer = min(answer, right - left + 1)\n        sumv -= arr[left]\n        left += 1",
    "traps": [
      "음수가 있으면 단순 투 포인터가 깨질 수 있다.",
      "while 조건을 잘못 잡으면 한 칸 차이로 틀린다.",
      "right는 for, left는 while로 두면 실수가 줄어든다."
    ],
    "problems": [
      {
        "id": "boj-1806",
        "platform": "BOJ",
        "title": "부분합",
        "difficulty": "Gold IV",
        "url": "https://www.acmicpc.net/problem/1806",
        "note": "투 포인터 대표"
      },
      {
        "id": "pg-67258",
        "platform": "Programmers",
        "title": "보석 쇼핑",
        "difficulty": "Level 3",
        "url": "https://school.programmers.co.kr/learn/courses/30/lessons/67258",
        "note": "슬라이딩 윈도우 + dict"
      },
      {
        "id": "ct-twopointer",
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
    "subtitle": "선택/방문 상태 관리",
    "difficulty": "PRO",
    "level": 4,
    "tags": [
      "bitmask",
      "state",
      "visited"
    ],
    "signal": "선택 여부, 열쇠, 방문 집합, 부분집합 → bitmask",
    "idea": [
      "상태를 정수 하나로 압축한다.",
      "i번째 선택 여부는 state & (1<<i)로 확인한다.",
      "상태 추가는 state | (1<<i)로 처리한다."
    ],
    "code": "if state & (1 << i):\n    pass\n\nnext_state = state | (1 << i)\nremoved_state = state & ~(1 << i)\n\nfor state in range(1 << n):\n    for i in range(n):\n        if state & (1 << i):\n            continue",
    "traps": [
      "n이 너무 크면 2^n이라 불가능하다.",
      "비트 연산은 괄호를 습관화해야 한다.",
      "visited[node][state]처럼 같이 쓰는 경우가 많다."
    ],
    "problems": [
      {
        "id": "boj-1194-bit",
        "platform": "BOJ",
        "title": "달이 차오른다, 가자.",
        "difficulty": "Gold I",
        "url": "https://www.acmicpc.net/problem/1194",
        "note": "열쇠 비트마스크 BFS"
      },
      {
        "id": "boj-2098",
        "platform": "BOJ",
        "title": "외판원 순회",
        "difficulty": "Gold I",
        "url": "https://www.acmicpc.net/problem/2098",
        "note": "TSP DP + bitmask"
      },
      {
        "id": "ct-bitmask",
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
    "subtitle": "상태 전이 최적화",
    "difficulty": "PRO",
    "level": 4,
    "tags": [
      "DP",
      "state",
      "transition"
    ],
    "signal": "최적값, 경우의 수, 이전 선택 영향 → dp[state] 정의",
    "idea": [
      "dp가 무엇을 의미하는지 먼저 정의한다.",
      "현재 상태에서 다음 상태로 전이한다.",
      "상태 수와 전이 수로 시간복잡도를 계산한다."
    ],
    "code": "INF = int(1e9)\ndp = [INF] * (1 << n)\ndp[0] = 0\n\nfor state in range(1 << n):\n    if dp[state] == INF:\n        continue\n\n    for i in range(n):\n        if state & (1 << i):\n            continue\n\n        next_state = state | (1 << i)\n        dp[next_state] = min(dp[next_state], dp[state] + cost[i])",
    "traps": [
      "dp 정의가 흐리면 전이가 꼬인다.",
      "초기값과 불가능 상태 처리가 중요하다.",
      "상태 수가 커지면 메모리 초과가 먼저 난다."
    ],
    "problems": [
      {
        "id": "boj-1520",
        "platform": "BOJ",
        "title": "내리막 길",
        "difficulty": "Gold III",
        "url": "https://www.acmicpc.net/problem/1520",
        "note": "DFS + DP 메모이제이션"
      },
      {
        "id": "boj-2098-dp",
        "platform": "BOJ",
        "title": "외판원 순회",
        "difficulty": "Gold I",
        "url": "https://www.acmicpc.net/problem/2098",
        "note": "비트마스크 DP 대표"
      },
      {
        "id": "pg-42898",
        "platform": "Programmers",
        "title": "등굣길",
        "difficulty": "Level 3",
        "url": "https://school.programmers.co.kr/learn/courses/30/lessons/42898",
        "note": "격자 DP"
      },
      {
        "id": "ct-dp",
        "platform": "CodeTree",
        "title": "DP 상태 전이 연습",
        "difficulty": "Gold+",
        "url": "https://www.codetree.ai/training-field/search?keyword=dynamic%20programming",
        "note": "DP 검색"
      }
    ]
  }
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
    }))
  );
}

function DifficultyBadge({ difficulty, level }) {
  return (
    <div className="difficulty">
      <span>{difficulty}</span>
      <div className="dots">
        {Array.from({ length: 5 }).map((_, idx) => (
          <i key={idx} className={idx < level ? "on" : ""} />
        ))}
      </div>
    </div>
  );
}

function CodeBlock({ children }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <div className="code-wrap">
      <button className="copy-btn" onClick={copy}>{copied ? "복사됨" : "코드 복사"}</button>
      <pre><code>{children}</code></pre>
    </div>
  );
}

function StatsDashboard({ patterns, solvedMap }) {
  const all = getAllProblems(patterns);
  const solved = all.filter((p) => solvedMap[p.id]).length;
  const percent = all.length ? Math.round((solved / all.length) * 100) : 0;

  return (
    <section className="dashboard">
      <div className="stat-card primary">
        <span>전체 진행률</span>
        <strong>{percent}%</strong>
        <div className="progress"><i style={{ width: `${percent}%` }} /></div>
        <em>{solved} / {all.length} 문제 완료</em>
      </div>
      {["BOJ", "CodeTree", "Programmers"].map((platform) => {
        const list = all.filter((p) => p.platform === platform);
        const done = list.filter((p) => solvedMap[p.id]).length;
        const p = list.length ? Math.round((done / list.length) * 100) : 0;
        return (
          <div className="stat-card" key={platform}>
            <span>{platform}</span>
            <strong>{done}/{list.length}</strong>
            <div className="progress"><i style={{ width: `${p}%` }} /></div>
            <em>{p}% 완료</em>
          </div>
        );
      })}
    </section>
  );
}

function TodayProblem({ problem, solved, onToggleSolved }) {
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

function PatternDetail({ pattern, solvedMap, onToggleSolved, platformFilter, setPlatformFilter, addProblem, removeProblem }) {
  const [form, setForm] = useState({ platform: "BOJ", title: "", difficulty: "Gold III", url: "", note: "" });
  const visibleProblems = sortProblems(pattern.problems).filter((p) => platformFilter === "ALL" || p.platform === platformFilter);

  const submit = () => {
    if (!form.title.trim()) return;
    addProblem(pattern.id, {
      id: `${form.platform.toLowerCase()}-${Date.now()}`,
      platform: form.platform,
      title: form.title,
      difficulty: form.difficulty,
      url: form.url || "#",
      note: form.note || "직접 추가한 문제",
    });
    setForm({ platform: "BOJ", title: "", difficulty: "Gold III", url: "", note: "" });
  };

  return (
    <article className="detail">
      <div className="detail-head">
        <div>
          <p className="eyebrow">{pattern.subtitle}</p>
          <h1>{pattern.title}</h1>
          <p className="signal">{pattern.signal}</p>
        </div>
        <DifficultyBadge difficulty={pattern.difficulty} level={pattern.level} />
      </div>

      <div className="tag-list">
        {pattern.tags.map((tag) => <span key={tag}>{tag}</span>)}
      </div>

      <section>
        <div className="section-title"><p>핵심 아이디어</p><h2>이렇게 보면 됩니다</h2></div>
        <ol className="idea-list">
          {pattern.idea.map((item, idx) => <li key={idx}>{item}</li>)}
        </ol>
      </section>

      <section>
        <div className="section-title"><p>Python 예제</p><h2>바로 외울 코드</h2></div>
        <CodeBlock>{pattern.code}</CodeBlock>
      </section>

      <section>
        <div className="section-title"><p>실전 함정</p><h2>여기서 많이 틀립니다</h2></div>
        <div className="trap-grid">
          {pattern.traps.map((trap, idx) => (
            <div className="trap" key={idx}><b>{idx + 1}</b><p>{trap}</p></div>
          ))}
        </div>
      </section>

      <section>
        <div className="section-title"><p>추천 문제</p><h2>백준 / 코드트리 / 프로그래머스</h2></div>
        <div className="platform-tabs">
          {["ALL", "BOJ", "CodeTree", "Programmers"].map((p) => (
            <button key={p} className={platformFilter === p ? "active" : ""} onClick={() => setPlatformFilter(p)}>
              {p === "ALL" ? "전체" : p}
            </button>
          ))}
        </div>
        <div className="problem-cards">
          {visibleProblems.map((problem) => (
            <a className={solvedMap[problem.id] ? "problem-card solved" : "problem-card"} key={problem.id} href={problem.url} target="_blank" rel="noreferrer">
              <span>{problem.platform}</span>
              <strong>{problem.title}</strong>
              <em>{problem.difficulty}</em>
              <small>{problem.note}</small>
            </a>
          ))}
        </div>
      </section>

      <section className="manager">
        <div className="section-title"><p>문제 관리</p><h2>문제 추가 / 삭제 / 풀이 체크</h2></div>
        <div className="problem-form">
          <select value={form.platform} onChange={(e) => setForm({ ...form, platform: e.target.value })}>
            <option value="BOJ">BOJ</option>
            <option value="CodeTree">CodeTree</option>
            <option value="Programmers">Programmers</option>
          </select>
          <input placeholder="문제명" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          <input placeholder="난이도" value={form.difficulty} onChange={(e) => setForm({ ...form, difficulty: e.target.value })} />
          <input placeholder="링크" value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })} />
          <input placeholder="메모" value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} />
          <button onClick={submit}>추가</button>
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
                <button onClick={() => removeProblem(pattern.id, problem.id)}>삭제</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </article>
  );
}

export default function App() {
  const [patterns, setPatterns] = useState(initialPatterns);
  const [selectedId, setSelectedId] = useState(initialPatterns[0].id);
  const [query, setQuery] = useState("");
  const [levelFilter, setLevelFilter] = useState("all");
  const [platformFilter, setPlatformFilter] = useState("ALL");
  const [solvedMap, setSolvedMap] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("algo-solved-map") || "{}");
    } catch {
      return {};
    }
  });

  const allProblems = useMemo(() => sortProblems(getAllProblems(patterns)), [patterns]);
  const todayProblem = allProblems.length ? allProblems[new Date().getDate() % allProblems.length] : null;

  const filtered = patterns.filter((pattern) => {
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

  const selected = patterns.find((p) => p.id === selectedId) || patterns[0];

  const toggleSolved = (problemId) => {
    setSolvedMap((prev) => {
      const next = { ...prev, [problemId]: !prev[problemId] };
      localStorage.setItem("algo-solved-map", JSON.stringify(next));
      return next;
    });
  };

  const addProblem = (patternId, problem) => {
    setPatterns((prev) => prev.map((p) => p.id === patternId ? { ...p, problems: [...p.problems, problem] } : p));
  };

  const removeProblem = (patternId, problemId) => {
    setPatterns((prev) => prev.map((p) => p.id === patternId ? { ...p, problems: p.problems.filter((x) => x.id !== problemId) } : p));
  };

  const resetSolved = () => {
    localStorage.removeItem("algo-solved-map");
    setSolvedMap({});
  };

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand"><div className="logo">A</div><div><strong>Algo Tracker</strong><span>Clean PRO Cards</span></div></div>

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
          <button className="ghost" onClick={resetSolved}>풀이 체크 초기화</button>
        </div>

        <StatsDashboard patterns={patterns} solvedMap={solvedMap} />
        <TodayProblem problem={todayProblem} solved={todayProblem ? !!solvedMap[todayProblem.id] : false} onToggleSolved={toggleSolved} />

        <PatternDetail
          pattern={selected}
          solvedMap={solvedMap}
          onToggleSolved={toggleSolved}
          platformFilter={platformFilter}
          setPlatformFilter={setPlatformFilter}
          addProblem={addProblem}
          removeProblem={removeProblem}
        />
      </main>
    </div>
  );
}
