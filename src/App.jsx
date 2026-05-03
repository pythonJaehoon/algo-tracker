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
  },,
{
    id: "zero-one-bfs",
    title: "0-1 BFS",
    subtitle: "deque 최단거리 최적화",
    difficulty: "PRO",
    level: 4,
    tags: ["BFS", "deque", "0-1 BFS", "shortest path"],
    signal: "가중치가 0 또는 1 → heap 대신 deque",
    idea: [
      "간선 비용이 0 또는 1일 때 사용한다.",
      "비용 0이면 appendleft, 비용 1이면 append 한다.",
      "다익스트라보다 가볍게 O(V+E)에 처리한다.",
    ],
    code: `from collections import deque

INF = int(1e9)
dist = [[INF] * m for _ in range(n)]
dq = deque()

dist[0][0] = 0
dq.append((0, 0))

while dq:
    y, x = dq.popleft()

    for dy, dx in ((1,0), (-1,0), (0,1), (0,-1)):
        ny, nx = y + dy, x + dx

        if ny < 0 or ny >= n or nx < 0 or nx >= m:
            continue

        cost = board[ny][nx]

        if dist[ny][nx] > dist[y][x] + cost:
            dist[ny][nx] = dist[y][x] + cost

            if cost == 0:
                dq.appendleft((ny, nx))
            else:
                dq.append((ny, nx))`,
    traps: [
      "가중치가 0/1이 아닐 때는 일반 다익스트라를 써야 한다.",
      "방문 체크만 쓰면 더 짧은 경로 갱신을 놓칠 수 있다.",
      "비용 0은 반드시 appendleft 해야 한다.",
    ],
    problems: [
      { id: "boj-1261", platform: "BOJ", title: "알고스팟", difficulty: "Gold IV", url: "https://www.acmicpc.net/problem/1261", note: "0-1 BFS 대표 문제" },
      { id: "boj-13549", platform: "BOJ", title: "숨바꼭질 3", difficulty: "Gold V", url: "https://www.acmicpc.net/problem/13549", note: "순간이동 비용 0" },
      { id: "boj-2665", platform: "BOJ", title: "미로만들기", difficulty: "Gold IV", url: "https://www.acmicpc.net/problem/2665", note: "벽 변경 최소화" },
      { id: "ct-01bfs", platform: "CodeTree", title: "0-1 BFS / 최단거리 연습", difficulty: "Gold+", url: "https://www.codetree.ai/training-field/search?keyword=0-1%20bfs", note: "0-1 BFS 검색 결과" },
    ],
  },
  {
    id: "union-find",
    title: "Union-Find",
    subtitle: "Disjoint Set",
    difficulty: "Gold+",
    level: 3,
    tags: ["union find", "disjoint set", "MST", "group"],
    signal: "연결 여부, 그룹 합치기, 사이클 판정 → Union-Find",
    idea: [
      "각 원소의 대표 부모를 관리한다.",
      "find로 대표를 찾고 union으로 그룹을 합친다.",
      "경로 압축으로 find를 빠르게 만든다.",
    ],
    code: `parent = [i for i in range(n + 1)]

def find(x):
    if parent[x] != x:
        parent[x] = find(parent[x])
    return parent[x]

def union(a, b):
    pa = find(a)
    pb = find(b)

    if pa == pb:
        return False

    parent[pb] = pa
    return True`,
    traps: [
      "find 결과끼리 비교해야 한다.",
      "parent[a]와 parent[b]를 바로 비교하면 틀릴 수 있다.",
      "크루스칼에서는 union이 성공한 간선만 선택한다.",
    ],
    problems: [
      { id: "boj-1717", platform: "BOJ", title: "집합의 표현", difficulty: "Gold V", url: "https://www.acmicpc.net/problem/1717", note: "Union-Find 기본" },
      { id: "boj-1976", platform: "BOJ", title: "여행 가자", difficulty: "Gold IV", url: "https://www.acmicpc.net/problem/1976", note: "연결 여부 확인" },
      { id: "boj-1197", platform: "BOJ", title: "최소 스패닝 트리", difficulty: "Gold IV", url: "https://www.acmicpc.net/problem/1197", note: "크루스칼 MST" },
      { id: "pg-42861", platform: "Programmers", title: "섬 연결하기", difficulty: "Level 3", url: "https://school.programmers.co.kr/learn/courses/30/lessons/42861", note: "MST 대표 문제" },
      { id: "ct-union", platform: "CodeTree", title: "Union-Find / Disjoint Set 연습", difficulty: "Gold+", url: "https://www.codetree.ai/training-field/search?keyword=union%20find", note: "Union-Find 검색 결과" },
    ],
  },
  {
    id: "segment-tree",
    title: "세그먼트 트리",
    subtitle: "구간 쿼리 + 업데이트",
    difficulty: "PRO",
    level: 4,
    tags: ["segment tree", "range query", "update"],
    signal: "구간 합/최소/최대 + 값 변경 → Segment Tree",
    idea: [
      "배열 구간 정보를 트리에 저장한다.",
      "구간 질의와 단일 업데이트를 O(logN)에 처리한다.",
      "합, 최소, 최대, gcd 등으로 바꿔 응용한다.",
    ],
    code: `def build(node, start, end):
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
    return query(node * 2, start, mid, left, right) + query(node * 2 + 1, mid + 1, end, left, right)

def update(node, start, end, idx, value):
    if idx < start or end < idx:
        return

    if start == end:
        tree[node] = value
        return

    mid = (start + end) // 2
    update(node * 2, start, mid, idx, value)
    update(node * 2 + 1, mid + 1, end, idx, value)

    tree[node] = tree[node * 2] + tree[node * 2 + 1]`,
    traps: [
      "tree 크기는 보통 4*N으로 잡으면 안전하다.",
      "0-index와 1-index를 섞으면 틀린다.",
      "최소/최대 쿼리는 return 기본값을 INF/-INF로 바꿔야 한다.",
    ],
    problems: [
      { id: "boj-2042", platform: "BOJ", title: "구간 합 구하기", difficulty: "Gold I", url: "https://www.acmicpc.net/problem/2042", note: "세그먼트 트리 기본" },
      { id: "boj-11505", platform: "BOJ", title: "구간 곱 구하기", difficulty: "Gold I", url: "https://www.acmicpc.net/problem/11505", note: "곱 세그먼트 트리" },
      { id: "boj-2357", platform: "BOJ", title: "최솟값과 최댓값", difficulty: "Gold I", url: "https://www.acmicpc.net/problem/2357", note: "min/max 쿼리" },
      { id: "ct-segtree", platform: "CodeTree", title: "Segment Tree / 구간 쿼리 연습", difficulty: "Gold~Platinum", url: "https://www.codetree.ai/training-field/search?keyword=segment%20tree", note: "세그먼트 트리 검색 결과" },
    ],
  },
  {
    id: "two-pointer",
    title: "투 포인터 / 슬라이딩 윈도우",
    subtitle: "연속 구간 최적화",
    difficulty: "Gold+",
    level: 3,
    tags: ["two pointer", "sliding window", "prefix"],
    signal: "연속 부분 배열, 구간 길이, 부분합 → left/right",
    idea: [
      "left와 right를 한 방향으로 움직인다.",
      "현재 구간 상태를 유지하면서 답을 갱신한다.",
      "정렬 배열 또는 양수 배열에서 특히 강력하다.",
    ],
    code: `left = 0
sumv = 0
answer = int(1e9)

for right in range(n):
    sumv += arr[right]

    while sumv >= target:
        answer = min(answer, right - left + 1)
        sumv -= arr[left]
        left += 1`,
    traps: [
      "음수가 있으면 단순 투 포인터가 깨질 수 있다.",
      "while 조건을 잘못 잡으면 한 칸 차이로 틀린다.",
      "right는 for문, left는 while문으로 움직이면 실수가 줄어든다.",
    ],
    problems: [
      { id: "boj-1806", platform: "BOJ", title: "부분합", difficulty: "Gold IV", url: "https://www.acmicpc.net/problem/1806", note: "투 포인터 대표" },
      { id: "boj-2003", platform: "BOJ", title: "수들의 합 2", difficulty: "Silver IV", url: "https://www.acmicpc.net/problem/2003", note: "기초 연속합" },
      { id: "boj-1644", platform: "BOJ", title: "소수의 연속합", difficulty: "Gold III", url: "https://www.acmicpc.net/problem/1644", note: "소수 + 투 포인터" },
      { id: "pg-67258", platform: "Programmers", title: "보석 쇼핑", difficulty: "Level 3", url: "https://school.programmers.co.kr/learn/courses/30/lessons/67258", note: "슬라이딩 윈도우 + dict" },
      { id: "ct-twopointer", platform: "CodeTree", title: "Two Pointer / Sliding Window 연습", difficulty: "Silver~Gold", url: "https://www.codetree.ai/training-field/search?keyword=two%20pointer", note: "투 포인터 검색 결과" },
    ],
  },
  {
    id: "bitmask",
    title: "비트마스크 상태 압축",
    subtitle: "선택/방문 상태 관리",
    difficulty: "PRO",
    level: 4,
    tags: ["bitmask", "state", "visited"],
    signal: "선택 여부, 열쇠, 방문 집합, 부분집합 → bitmask",
    idea: [
      "상태를 정수 하나로 압축한다.",
      "i번째 선택 여부는 state & (1<<i)로 확인한다.",
      "상태 추가는 state | (1<<i)로 처리한다.",
    ],
    code: `# i번째 원소가 선택되어 있는지 확인
if state & (1 << i):
    pass

# i번째 원소 선택 추가
next_state = state | (1 << i)

# i번째 원소 제거
next_state = state & ~(1 << i)

# 모든 부분집합 순회
for state in range(1 << n):
    for i in range(n):
        if state & (1 << i):
            continue`,
    traps: [
      "n이 너무 크면 2^n이라 불가능하다.",
      "비트 우선순위 때문에 괄호를 습관화해야 한다.",
      "방문 배열은 visited[node][state]처럼 같이 쓰는 경우가 많다.",
    ],
    problems: [
      { id: "boj-1194-bit", platform: "BOJ", title: "달이 차오른다, 가자.", difficulty: "Gold I", url: "https://www.acmicpc.net/problem/1194", note: "열쇠 6개 비트마스크 BFS" },
      { id: "boj-2098", platform: "BOJ", title: "외판원 순회", difficulty: "Gold I", url: "https://www.acmicpc.net/problem/2098", note: "TSP DP + bitmask" },
      { id: "boj-12813", platform: "BOJ", title: "이진수 연산", difficulty: "Bronze II", url: "https://www.acmicpc.net/problem/12813", note: "비트 연산 기초" },
      { id: "pg-92343-bit", platform: "Programmers", title: "양과 늑대", difficulty: "Level 3", url: "https://school.programmers.co.kr/learn/courses/30/lessons/92343", note: "가능 후보 상태 관리" },
      { id: "ct-bitmask", platform: "CodeTree", title: "Bitmask / 상태 압축 연습", difficulty: "Gold+", url: "https://www.codetree.ai/training-field/search?keyword=bitmask", note: "비트마스크 검색 결과" },
    ],
  },
  {
    id: "dp-state",
    title: "DP + 상태 정의",
    subtitle: "상태 전이 최적화",
    difficulty: "PRO",
    level: 4,
    tags: ["DP", "state", "transition", "optimization"],
    signal: "최적값, 경우의 수, 이전 선택 영향 → dp[state] 정의",
    idea: [
      "dp가 무엇을 의미하는지 먼저 정의한다.",
      "현재 상태에서 다음 상태로 전이한다.",
      "상태 수와 전이 수를 곱해서 시간복잡도를 계산한다.",
    ],
    code: `INF = int(1e9)
dp = [INF] * (1 << n)
dp[0] = 0

for state in range(1 << n):
    if dp[state] == INF:
        continue

    for i in range(n):
        if state & (1 << i):
            continue

        next_state = state | (1 << i)
        dp[next_state] = min(dp[next_state], dp[state] + cost[i])`,
    traps: [
      "dp 정의가 흐리면 전이가 꼬인다.",
      "초기값과 불가능 상태 처리가 중요하다.",
      "상태 수가 커지면 메모리 초과가 먼저 난다.",
    ],
    problems: [
      { id: "boj-11049", platform: "BOJ", title: "행렬 곱셈 순서", difficulty: "Gold III", url: "https://www.acmicpc.net/problem/11049", note: "구간 DP 기본" },
      { id: "boj-1520", platform: "BOJ", title: "내리막 길", difficulty: "Gold III", url: "https://www.acmicpc.net/problem/1520", note: "DFS + DP 메모이제이션" },
      { id: "boj-2098-dp", platform: "BOJ", title: "외판원 순회", difficulty: "Gold I", url: "https://www.acmicpc.net/problem/2098", note: "비트마스크 DP 대표" },
      { id: "pg-42898", platform: "Programmers", title: "등굣길", difficulty: "Level 3", url: "https://school.programmers.co.kr/learn/courses/30/lessons/42898", note: "격자 DP" },
      { id: "pg-12913", platform: "Programmers", title: "땅따먹기", difficulty: "Level 2", url: "https://school.programmers.co.kr/learn/courses/30/lessons/12913", note: "이전 선택 제한 DP" },
      { id: "ct-dp", platform: "CodeTree", title: "DP / 상태 전이 연습", difficulty: "Gold+", url: "https://www.codetree.ai/training-field/search?keyword=dynamic%20programming", note: "DP 검색 결과" },
    ],
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
      patternLevel: pattern.level,
    }))
  );
}


function mergePatterns(savedPatterns) {
  if (!Array.isArray(savedPatterns)) return initialPatterns;

  const baseById = new Map(initialPatterns.map((pattern) => [pattern.id, pattern]));
  const savedById = new Map(savedPatterns.map((pattern) => [pattern.id, pattern]));
  const allIds = Array.from(new Set([...initialPatterns.map((p) => p.id), ...savedPatterns.map((p) => p.id)]));

  return allIds.map((id) => {
    const basePattern = baseById.get(id);
    const savedPattern = savedById.get(id);

    if (!basePattern) return savedPattern;
    if (!savedPattern) return basePattern;

    const baseProblems = Array.isArray(basePattern.problems) ? basePattern.problems : [];
    const savedProblems = Array.isArray(savedPattern.problems) ? savedPattern.problems : [];
    const mergedProblemsById = new Map();

    baseProblems.forEach((problem) => mergedProblemsById.set(problem.id, problem));
    savedProblems.forEach((problem) => mergedProblemsById.set(problem.id, problem));

    return {
      ...basePattern,
      ...savedPattern,
      title: savedPattern.title || basePattern.title,
      subtitle: savedPattern.subtitle || basePattern.subtitle,
      difficulty: savedPattern.difficulty || basePattern.difficulty,
      level: savedPattern.level ?? basePattern.level,
      tags: Array.isArray(savedPattern.tags) && savedPattern.tags.length ? savedPattern.tags : basePattern.tags,
      signal: savedPattern.signal || basePattern.signal,
      idea: Array.isArray(savedPattern.idea) && savedPattern.idea.length ? savedPattern.idea : basePattern.idea,
      code: savedPattern.code || basePattern.code,
      traps: Array.isArray(savedPattern.traps) && savedPattern.traps.length ? savedPattern.traps : basePattern.traps,
      problems: Array.from(mergedProblemsById.values()),
    };
  }).filter(Boolean);
}

function clearOldStorageKeys() {
  [
    "algo-tracker-pro-patterns-v1",
    "algo-tracker-pro-dashboard-v1"
  ].forEach((key) => {
    const value = localStorage.getItem(key);
    if (!value) return;
    try {
      const parsed = JSON.parse(value);
      if (parsed?.patterns) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
          patterns: mergePatterns(parsed.patterns),
          solvedMap: parsed.solvedMap || {},
        }));
      } else if (Array.isArray(parsed)) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
          patterns: mergePatterns(parsed),
          solvedMap: {},
        }));
      }
    } catch {
      // ignore invalid old data
    }
  });
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
      clearOldStorageKeys();
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) return initialPatterns;

      const parsed = JSON.parse(saved);
      return mergePatterns(parsed.patterns);
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
