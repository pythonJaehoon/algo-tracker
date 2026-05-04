import React, { useMemo, useState } from 'react';
import { Search, ExternalLink, BookOpen, Code2, Trophy, Target, ChevronRight, Layers, ListChecks } from 'lucide-react';
import '../styles/samsungRichArchive.css';

const codeTemplates = {
  sim: `dy = [-1, 0, 1, 0]\ndx = [0, 1, 0, -1]\n\ndef in_range(y, x):\n    return 0 <= y < n and 0 <= x < m\n\nturn = {0: 3, 1: 0, 2: 1, 3: 2}  # 예: 좌회전\n\ntime = 0\nwhile True:\n    # 1. 현재 칸 처리\n    # 2. 다음 이동 후보 계산\n    # 3. 이동/회전/종료 조건 처리\n    time += 1\n    if finish_condition:\n        break`,
  bfsState: `from collections import deque\n\ndy = [-1, 0, 1, 0]\ndx = [0, 1, 0, -1]\n\ndef bfs(sy, sx, ss):\n    visited = [[[0] * STATE for _ in range(m)] for _ in range(n)]\n    q = deque([(sy, sx, ss, 0)])\n    visited[sy][sx][ss] = 1\n\n    while q:\n        y, x, st, cnt = q.popleft()\n        if is_goal(y, x, st):\n            return cnt\n\n        for d in range(4):\n            ny, nx = y + dy[d], x + dx[d]\n            ns = st  # TODO: 문/열쇠/방향/벽파괴 상태 갱신\n            if 0 <= ny < n and 0 <= nx < m and visited[ny][nx][ns] == 0:\n                visited[ny][nx][ns] = 1\n                q.append((ny, nx, ns, cnt + 1))\n    return -1`,
  dijkstra: `import heapq\nINF = int(10e15)\n\ndef dijkstra(start):\n    dist = [[INF] * STATE for _ in range(n + 1)]\n    dist[start][0] = 0\n    h = [(0, start, 0)]\n\n    while h:\n        nowv, nowp, st = heapq.heappop(h)\n        if dist[nowp][st] != nowv:\n            continue\n\n        for cost, nxt in graph.get(nowp, []):\n            ns = st  # TODO: 사용 횟수/간선 수/방향 상태\n            nv = nowv + cost\n            if dist[nxt][ns] > nv:\n                dist[nxt][ns] = nv\n                heapq.heappush(h, (nv, nxt, ns))\n    return dist`,
  dfsBfs: `from collections import deque\n\nanswer = -1\nselected = []\n\ndef dfs(idx, cnt):\n    global answer\n    if cnt == LIMIT:\n        answer = max(answer, simulate())\n        return\n\n    for i in range(idx, len(candidates)):\n        selected.append(candidates[i])\n        dfs(i + 1, cnt + 1)\n        selected.pop()\n\ndef simulate():\n    tmp = [row[:] for row in board]\n    for y, x in selected:\n        tmp[y][x] = 1\n    # BFS/시뮬레이션으로 점수 계산\n    return score`,
  tree: `children = [[] for _ in range(n + 1)]\nparent = [0] * (n + 1)\n\ndef cut(x):\n    p = parent[x]\n    if p:\n        children[p].remove(x)\n    parent[x] = 0\n\ndef attach(x, p):\n    parent[x] = p\n    children[p].append(x)\n\ndef collect_subtree(x):\n    res = [x]\n    for nxt in children[x]:\n        res += collect_subtree(nxt)\n    return res`,
  pq: `import heapq\n\npq = []\norder = 0\n\ndef push(priority, name, value):\n    global order\n    # 단어 오름차순, 중요도 높은 순, 삽입순 예시\n    heapq.heappush(pq, (name, -priority, order, value))\n    order += 1\n\ndef pop():\n    return heapq.heappop(pq)`,
  rotate: `def rotate_90(arr):\n    n = len(arr)\n    return [[arr[n - 1 - y][x] for y in range(n)] for x in range(n)]\n\ndef get_score(board):\n    # BFS로 그룹 찾기 / 점수 계산\n    return 0\n\nfor turn in range(k):\n    best = None\n    for y in range(n - 2):\n        for x in range(n - 2):\n            for r in range(3):\n                # 부분 격자 회전 후 점수 비교\n                pass`,
};

const codetreeProblems = [
  ['아기 고래의 첫 항해','2026 상반기','오전 2번','상',['격자','시뮬레이션','방향','상태 관리'],'https://www.codetree.ai/ko/frequent-problems/samsung-sw/problems/baby-whale-first-voyage/description','바위/장애물과 방향 전환 규칙을 따라 이동하는 격자 시뮬레이션입니다.','격자 + 방향 + 충돌/전환 → 방향 테이블과 종료 조건부터 잡기',codeTemplates.sim,['아기 상어','로봇 청소기','거울 설치']],
  ['아기 바다거북의 대모험: 해저 화산 지대','2026 상반기','오전 1번','상',['격자','동시 처리','BFS','시뮬레이션'],'https://www.codetree.ai/ko/frequent-problems/samsung-sw/problems/a-little-sea-turtles-big-adventure/description','해저 지형 변화와 이동을 턴 단위로 분리해 처리하는 유형입니다.','동시에 변함 + 이동 → current/next 배열 분리',codeTemplates.sim,['토마토','연구소','미세먼지 안녕!']],
  ['AI 로봇청소기','2025 하반기','오후 1번','중상',['로봇','방향','우선순위','BFS'],'https://www.codetree.ai/ko/frequent-problems/samsung-sw/problems/ai-robot/description','로봇 위치와 패턴, 장애물, 탐색 우선순위를 함께 관리하는 문제입니다.','로봇 여러 대/패턴 + 거리 → BFS 거리표 + tie-break',codeTemplates.bfsState,['로봇 청소기','아기 상어','마법사 상어와 토네이도']],
  ['가로등 설치','2025 하반기','오후 2번','상',['우선순위큐','그리디','구간','시뮬레이션'],'https://www.codetree.ai/ko/frequent-problems/samsung-sw/problems/street-light-installation/description','가장 유리한 후보를 반복적으로 선택하는 우선순위 기반 구현 유형입니다.','반복 선택 + 우선순위 여러 개 → heap tuple 설계',codeTemplates.pq,['보석 도둑','가운데를 말해요','강의실 배정']],
  ['고대 문명 유적 탐사','2024 상반기','오전 1번','상',['회전','BFS','그룹 제거','시뮬레이션'],'https://www.codetree.ai/ko/frequent-problems/samsung-sw/problems/ancient-ruin-exploration/description','부분 격자 회전 후 그룹을 찾고 점수를 최대화하는 삼성 대표 구현 문제입니다.','부분 회전 + 그룹 제거 → 후보 전부 시뮬레이션',codeTemplates.rotate,['Puyo Puyo','상어 중학교','2048 Easy']],
  ['왕실의 기사 대결','2024 상반기','오후 1번','상',['기사 이동','충돌','연쇄 이동','시뮬레이션'],'https://www.codetree.ai/ko/frequent-problems/samsung-sw/problems/royal-knight-duel/description','한 객체를 밀면 다른 객체가 연쇄적으로 밀리는 충돌 시뮬레이션입니다.','객체 밀기 + 연쇄 충돌 → 이동 가능성 먼저 검사 후 일괄 이동',codeTemplates.sim,['원판 돌리기','주사위 굴리기 2','컨베이어 벨트 위의 로봇']],
  ['메이즈 러너','2023 상반기','오전 1번','상',['미로','참가자 이동','부분 회전','시뮬레이션'],'https://www.codetree.ai/ko/frequent-problems/samsung-sw/problems/maze-runner/description','참가자 이동 후 출구가 포함된 가장 작은 정사각형을 회전하는 문제입니다.','이동 + 최소 정사각형 회전 → 기준 선택 순서 주의',codeTemplates.rotate,['2048 Easy','마법사 상어와 파이어스톰','배열 돌리기 4']],
  ['루돌프의 반란','2023 하반기','오전 1번','상',['시뮬레이션','충돌','우선순위','좌표'],'https://www.codetree.ai/ko/frequent-problems/samsung-sw/problems/rudolph-rebellion/description','루돌프와 산타의 거리, 충돌, 기절, 밀림을 턴 단위로 관리합니다.','거리 기준 tie-break + 충돌 밀림 → 객체 상태 배열 분리',codeTemplates.sim,['마법사 상어와 토네이도','상어 초등학교','청소년 상어']],
  ['포탑 부수기','2023 상반기','오후 1번','상',['BFS','최단경로','공격자 선정','시뮬레이션'],'https://www.codetree.ai/ko/frequent-problems/samsung-sw/problems/destroy-the-turret/description','공격자/대상 선정 기준과 레이저 경로 BFS, 포탄 피해를 구현합니다.','선정 조건 많음 + 경로 있으면 BFS → tuple 정렬과 parent 복원',codeTemplates.bfsState,['거의 최단 경로','녹색 옷 입은 애가 젤다지?','레이저 통신']],
  ['코드트리 빵','2022 하반기','오후 1번','중상',['BFS','편의점','동시 이동','격자'],'https://www.codetree.ai/ko/frequent-problems/samsung-sw/problems/codetree-mon-bread/description','사람들이 목표 편의점으로 이동하고 베이스캠프를 점유하는 문제입니다.','여러 사람 동시 이동 + 최단거리 → 매 턴 BFS',codeTemplates.bfsState,['아기 상어','스타트 택시','토마토']],
  ['싸움땅','2022 하반기','오전 1번','중상',['격자','우선순위','총 관리','시뮬레이션'],'https://www.codetree.ai/ko/frequent-problems/samsung-sw/problems/battle-ground/description','플레이어 이동, 총 선택, 전투, 패자 이동을 순서대로 구현합니다.','객체 + 칸마다 여러 아이템 → 칸별 heap/list 관리',codeTemplates.pq,['상어 초등학교','컨베이어 벨트 위의 로봇','낚시왕']],
  ['꼬리잡기놀이','2022 상반기','오후 1번','상',['팀 이동','BFS','순서 관리','시뮬레이션'],'https://www.codetree.ai/ko/frequent-problems/samsung-sw/problems/tail-catch-play/description','팀의 머리-몸통-꼬리 순서를 유지하며 이동하고 공을 던져 점수를 계산합니다.','연결된 그룹 + 순서 유지 → deque로 팀 관리',codeTemplates.sim,['뱀','낚시왕','원판 돌리기']],
  ['나무박멸','2022 상반기','오전 1번','중상',['확산','제초제','대각선','시뮬레이션'],'https://www.codetree.ai/ko/frequent-problems/samsung-sw/problems/tree-kill-all/description','나무 성장/번식/제초제 살포를 순서대로 반복합니다.','성장-번식-선정-살포 순서 → next 배열과 기간 배열',codeTemplates.sim,['미세먼지 안녕!','나무 재테크','연구소']],
  ['술래잡기','2022 상반기','오전 2번','상',['달팽이 이동','도망자','시야','시뮬레이션'],'https://www.codetree.ai/ko/frequent-problems/samsung-sw/problems/hide-and-seek/description','도망자 이동과 술래의 달팽이 경로, 시야 판정을 관리합니다.','정해진 경로 + 여러 객체 이동 → 경로 배열 선계산',codeTemplates.sim,['마법사 상어와 토네이도','청소년 상어','뱀']],
  ['예술성','2022 하반기','오후 2번','상',['그룹 BFS','점수 계산','회전','시뮬레이션'],'https://www.codetree.ai/ko/frequent-problems/samsung-sw/problems/artistry/description','그룹을 만들고 인접 변 수로 점수를 계산한 뒤 십자/부분 회전을 수행합니다.','그룹화 + 인접 관계 + 회전 → group_id 배열 만들기',codeTemplates.rotate,['상어 중학교','Puyo Puyo','마법사 상어와 파이어스톰']],
  ['민트 초코 우유','2025 상반기','기출','상',['시뮬레이션','그룹','우선순위','전파'],'https://www.codetree.ai/ko/frequent-problems/samsung-sw/','그룹 형성과 전파/변화를 단계별로 처리하는 최근 기출 계열입니다.','그룹 대표 + 전파 우선순위 → 정렬 기준을 코드화',codeTemplates.sim,['상어 초등학교','캐슬 디펜스','연구소 3']],
  ['여왕 개미','2025 상반기','기출','상',['그래프','트리','시뮬레이션','상태'],'https://www.codetree.ai/ko/frequent-problems/samsung-sw/','개체 이동/상태 변화 또는 계층 관계를 관리하는 최근 기출 계열입니다.','개체 상태가 많다 → 배열/딕셔너리 역할부터 분리',codeTemplates.tree,['트리','뉴스 전하기','회사 문화 1']],
  ['개구리 점프','2025 상반기','기출','중상',['그래프','점프','BFS','최단거리'],'https://www.codetree.ai/ko/frequent-problems/samsung-sw/','점프 가능 조건을 그래프로 보고 최단 이동 또는 도달 가능성을 판단합니다.','점프/도달 가능 → BFS 또는 정렬+스위핑',codeTemplates.bfsState,['숨바꼭질 3','말이 되고픈 원숭이','점프 점프']],
  ['미생물 연구','2025 상반기','기출','상',['배양','확산','우선순위','시뮬레이션'],'https://www.codetree.ai/ko/frequent-problems/samsung-sw/','미생물의 확산/소멸/충돌 조건을 동시에 처리하는 유형입니다.','동시 확산 + 충돌 → next 배열에 후보 모으고 결정',codeTemplates.sim,['줄기세포배양','미세먼지 안녕!','토마토']],
].map(([title, year, session, difficulty, tags, url, summary, fiveSec, code, bj]) => ({
  title, source: 'CodeTree 삼성 SW 기출/유사', year, session, level: difficulty === '상' ? 'A형/PRO 대비' : 'A형', difficulty, url, tags, judge: 'CodeTree', summary, fiveSec, code,
  strategy: ['문제 순서를 주석으로 먼저 옮긴 뒤 함수 단위로 나눕니다.', '동시 변화가 있으면 원본 배열과 다음 배열을 분리합니다.', '우선순위가 2개 이상이면 tuple 정렬 기준을 먼저 테스트합니다.', '중간 상태 출력용 print_board 함수를 만들어 디버깅합니다.'],
  baekjoonLike: bj.map(name => ({ name, url: bjUrl(name) }))
}));

function bjUrl(name) {
  const map = {
    '아기 상어': '16236', '로봇 청소기': '14503', '거울 설치': '2151', '토마토': '7576', '연구소': '14502', '미세먼지 안녕!': '17144',
    '마법사 상어와 토네이도': '20057', '보석 도둑': '1202', '가운데를 말해요': '1655', '강의실 배정': '11000', 'Puyo Puyo': '11559', '상어 중학교': '21609', '2048 Easy': '12100',
    '원판 돌리기': '17822', '주사위 굴리기 2': '23288', '컨베이어 벨트 위의 로봇': '20055', '마법사 상어와 파이어스톰': '20058', '배열 돌리기 4': '17406',
    '상어 초등학교': '21608', '청소년 상어': '19236', '거의 최단 경로': '5719', '녹색 옷 입은 애가 젤다지?': '4485', '레이저 통신': '6087',
    '스타트 택시': '19238', '낚시왕': '17143', '뱀': '3190', '나무 재테크': '16235', '캐슬 디펜스': '17135', '연구소 3': '17142', '트리': '1068', '뉴스 전하기': '1135', '회사 문화 1': '14267', '숨바꼭질 3': '13549', '말이 되고픈 원숭이': '1600', '점프 점프': '11060', '줄기세포배양': ''
  };
  return map[name] ? `https://www.acmicpc.net/problem/${map[name]}` : 'https://www.acmicpc.net/';
}

const proPatterns = [
  ['다익스트라 변형','PRO 핵심',['가중치','최단거리','상태 확장'],'가중치가 있고 최소 비용을 묻는다 → dist를 1차원으로 끝내지 말고 상태를 추가할 수 있는지 본다.',codeTemplates.dijkstra,['K번째 최단경로 찾기','세금','거의 최단 경로','파티','녹색 옷 입은 애가 젤다지?']],
  ['BFS + 상태','A형~PRO',['BFS','visited 3차원','방향','열쇠/문'],'간선 비용이 모두 1이고 위치 외 상태가 있다 → visited[y][x][state]부터 설계한다.',codeTemplates.bfsState,['거울 설치','말이 되고픈 원숭이','벽 부수고 이동하기','레이저 통신','탈출']],
  ['DFS + BFS 가지치기','삼성 단골',['조합','설치','제거','평가'],'몇 개를 고르거나 제거한 뒤 결과를 계산한다 → DFS 선택 + BFS/시뮬레이션 평가.',codeTemplates.dfsBfs,['연구소','사다리 조작','감시','치킨 배달','연구소 3']],
  ['트리 삭제/이동/붙이기','PRO 대비',['트리','부모 배열','자식 순회','서브트리'],'노드를 자르거나 붙인다 → parent와 children을 같이 관리하고 서브트리 순회 함수를 만든다.',codeTemplates.tree,['트리','회사 문화 1','뉴스 전하기','트리의 부모 찾기','사회망 서비스']],
  ['우선순위 여러 개 선택','PRO 핵심',['heapq','tuple','tie-break','삽입순'],'가장 작은/큰 후보를 계속 뽑는다 + 조건이 여러 개다 → heap tuple 순서를 먼저 정한다.',codeTemplates.pq,['가운데를 말해요','보석 도둑','강의실 배정','문제집','이중 우선순위 큐']],
  ['부분 회전 + 그룹 제거','삼성 핵심',['회전','BFS 그룹','점수','배열 복사'],'3x3 또는 부분 격자를 돌리고 점수를 비교한다 → 후보 전체를 복사 시뮬레이션한다.',codeTemplates.rotate,['상어 중학교','2048 Easy','마법사 상어와 파이어스톰','배열 돌리기 4','Puyo Puyo']],
  ['동시 확산/감소/소멸','삼성 핵심',['확산','동시 처리','next 배열','턴'],'여러 칸이 동시에 바뀐다 → 현재 배열을 읽고 next 배열에만 쓴다.',codeTemplates.sim,['미세먼지 안녕!','토마토','나무 재테크','연구소','줄기세포배양']],
  ['객체 충돌/밀림','삼성 핵심',['객체','충돌','연쇄 이동','상태 배열'],'한 객체가 다른 객체를 밀거나 충돌한다 → 이동 가능성 검사와 실제 이동을 분리한다.',codeTemplates.sim,['낚시왕','청소년 상어','컨베이어 벨트 위의 로봇','뱀','원판 돌리기']],
  ['최단거리 + 경로 복원','PRO 대비',['parent','역추적','BFS','Dijkstra'],'최단 경로 자체를 지워야 하거나 출력해야 한다 → parent 리스트 또는 prev 다중 리스트를 관리한다.',codeTemplates.dijkstra,['거의 최단 경로','최소비용 구하기 2','숨바꼭질 4','특정한 최단 경로','최단경로']],
  ['K개 후보 유지','PRO 대비',['K번째','heap','거리 리스트','가지치기'],'각 정점/상태마다 답 후보를 여러 개 보관한다 → dist[node]를 리스트 또는 max-heap으로 둔다.',codeTemplates.dijkstra,['K번째 최단경로 찾기','합이 0인 네 정수','보석 도둑','N번째 큰 수']],
  ['외부 BFS / 테두리 확장','A형~PRO',['외부 공기','패딩','테두리','BFS'],'외부와 내부를 구분한다 → 맵을 한 칸 크게 만들고 바깥에서 BFS한다.',codeTemplates.bfsState,['치즈','치즈 2638','불!','탈출','상범 빌딩']],
  ['삽입/삭제/검색 후 빠른 연산','PRO 자료구조',['dict','set','heap','lazy delete'],'중간에 삭제가 있는데 heap에서 바로 삭제가 어렵다 → dict 카운트 + lazy deletion.',`import heapq\nfrom collections import defaultdict\n\nmin_h, max_h = [], []\nalive = defaultdict(int)\n\ndef add(x):\n    heapq.heappush(min_h, x)\n    heapq.heappush(max_h, -x)\n    alive[x] += 1\n\ndef clean_min():\n    while min_h and alive[min_h[0]] == 0:\n        heapq.heappop(min_h)\n\ndef clean_max():\n    while max_h and alive[-max_h[0]] == 0:\n        heapq.heappop(max_h)\n\ndef remove_min():\n    clean_min()\n    if min_h:\n        x = heapq.heappop(min_h)\n        alive[x] -= 1`,['이중 우선순위 큐','가운데를 말해요','문제집','카드 정렬하기','절댓값 힙']],
].map(([title, difficulty, tags, fiveSec, code, examples]) => ({ title, difficulty, tags, fiveSec, code, examples: examples.map(name => ({ name, url: bjUrl(name) })) }));

const recommendedProblems = [
  ['로봇 청소기','Gold 5',['시뮬레이션','방향'],'14503'], ['아기 상어','Gold 3',['BFS','우선순위'],'16236'], ['거울 설치','Gold 3',['BFS','방향 상태'],'2151'], ['연구소','Gold 4',['DFS','BFS','조합'],'14502'], ['K번째 최단경로 찾기','Platinum 4',['다익스트라','K개 거리'],'1854'], ['세금','Platinum 4',['다익스트라','간선 수 상태'],'13907'], ['거의 최단 경로','Platinum 5',['Dijkstra','경로 제거'],'5719'], ['말이 되고픈 원숭이','Gold 3',['BFS 상태','점프'],'1600'], ['벽 부수고 이동하기','Gold 3',['BFS 상태','벽파괴'],'2206'], ['사다리 조작','Gold 3',['백트래킹','시뮬레이션'],'15684'], ['감시','Gold 4',['DFS','방향 조합'],'15683'], ['치킨 배달','Gold 5',['조합','거리 계산'],'15686'], ['연구소 3','Gold 3',['조합','BFS'],'17142'], ['미세먼지 안녕!','Gold 4',['확산','시뮬레이션'],'17144'], ['나무 재테크','Gold 3',['시뮬레이션','자료구조'],'16235'], ['낚시왕','Gold 1',['시뮬레이션','충돌'],'17143'], ['청소년 상어','Gold 2',['DFS','시뮬레이션'],'19236'], ['상어 중학교','Gold 2',['BFS 그룹','중력','회전'],'21609'], ['마법사 상어와 토네이도','Gold 3',['달팽이','분산'],'20057'], ['마법사 상어와 파이어스톰','Gold 3',['부분 회전','BFS'],'20058'], ['컨베이어 벨트 위의 로봇','Gold 5',['시뮬레이션','deque'],'20055'], ['상어 초등학교','Gold 5',['우선순위','좌석 배치'],'21608'], ['주사위 굴리기 2','Gold 3',['BFS 점수','방향'],'23288'], ['원판 돌리기','Gold 3',['회전','인접 제거'],'17822'], ['Puyo Puyo','Gold 4',['BFS 그룹','중력'],'11559'], ['스타트 택시','Gold 2',['BFS','우선순위'],'19238'], ['배열 돌리기 4','Gold 4',['순열','회전'],'17406'], ['2048 Easy','Gold 2',['DFS','시뮬레이션'],'12100'], ['트리','Gold 5',['트리 삭제','DFS'],'1068'], ['뉴스 전하기','Gold 2',['트리 DP','정렬'],'1135'], ['회사 문화 1','Gold 4',['트리 누적','DFS'],'14267'], ['트리의 부모 찾기','Silver 2',['트리','BFS'],'11725'], ['사회망 서비스','Gold 3',['트리 DP'],'2533'], ['치즈','Gold 3',['외부 BFS','녹이기'],'2636'], ['치즈 2638','Gold 3',['외부 BFS','동시 처리'],'2638'], ['불!','Gold 3',['멀티소스 BFS'],'4179'], ['탈출','Gold 4',['BFS','물 확산'],'3055'], ['숨바꼭질 3','Gold 5',['0-1 BFS'],'13549'], ['숨바꼭질 4','Gold 4',['BFS','경로복원'],'13913'], ['레이저 통신','Gold 3',['방향 BFS','거울'],'6087'], ['녹색 옷 입은 애가 젤다지?','Gold 4',['격자 다익스트라'],'4485'], ['최소비용 구하기 2','Gold 3',['Dijkstra','parent'],'11779'], ['특정한 최단 경로','Gold 4',['Dijkstra'],'1504'], ['문제집','Gold 2',['위상정렬','heap'],'1766'], ['이중 우선순위 큐','Gold 4',['heap','lazy delete'],'7662'], ['가운데를 말해요','Gold 2',['two heaps'],'1655'], ['강의실 배정','Gold 5',['heap','스위핑'],'11000'], ['보석 도둑','Gold 2',['heap','greedy'],'1202'], ['카드 정렬하기','Gold 4',['heap','greedy'],'1715'], ['절댓값 힙','Silver 1',['heap tuple'],'11286']
].map(([title, level, tags, id]) => ({ title, judge: 'Baekjoon', level, tags, url: `https://www.acmicpc.net/problem/${id}` }));

const menu = [
  { id: 'home', label: '홈', icon: Trophy },
  { id: 'codetree', label: 'CodeTree 삼성 기출', icon: BookOpen },
  { id: 'patterns', label: '삼성 PRO 패턴', icon: Target },
  { id: 'problems', label: '추천 문제', icon: Code2 },
  { id: 'roadmap', label: '5일 압축 로드맵', icon: ListChecks },
];

export default function SamsungRichArchive() {
  const [page, setPage] = useState('home');
  const [query, setQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('전체');
  const [problemQuery, setProblemQuery] = useState('');

  const tags = useMemo(() => ['전체', ...Array.from(new Set(codetreeProblems.flatMap(p => p.tags)))], []);
  const filtered = codetreeProblems.filter(p => {
    const q = query.trim().toLowerCase();
    const matchQuery = !q || [p.title, p.summary, p.fiveSec, ...p.tags].join(' ').toLowerCase().includes(q);
    const matchTag = selectedTag === '전체' || p.tags.includes(selectedTag);
    return matchQuery && matchTag;
  });
  const filteredProblems = recommendedProblems.filter(p => {
    const q = problemQuery.trim().toLowerCase();
    return !q || [p.title, p.level, ...p.tags].join(' ').toLowerCase().includes(q);
  });

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand">Algo Tracker</div>
        <div className="countBox"><b>{codetreeProblems.length}</b> CodeTree 분석<br/><b>{proPatterns.length}</b> PRO 패턴<br/><b>{recommendedProblems.length}</b> 추천 문제</div>
        {menu.map(item => {
          const Icon = item.icon;
          return <button key={item.id} className={page === item.id ? 'nav active' : 'nav'} onClick={() => setPage(item.id)}><Icon size={18} /> {item.label}</button>;
        })}
      </aside>
      <main className="main">
        {page === 'home' && <Home setPage={setPage} />}
        {page === 'patterns' && <Patterns />}
        {page === 'problems' && <RecommendedProblems problems={filteredProblems} query={problemQuery} setQuery={setProblemQuery} />}
        {page === 'roadmap' && <Roadmap />}
        {page === 'codetree' && <CodetreePage query={query} setQuery={setQuery} tags={tags} selectedTag={selectedTag} setSelectedTag={setSelectedTag} problems={filtered} />}
      </main>
    </div>
  );
}

function Home({ setPage }) {
  return <section className="hero"><p className="eyebrow">Samsung SW / PRO 실전 대비</p><h1>기존 구조 유지 + 데이터 확장판</h1><p>CodeTree 삼성 기출 분석, 삼성 PRO 패턴, 백준 추천 문제를 한 화면에서 검색하고 바로 이동할 수 있습니다.</p><div className="homeActions"><button onClick={() => setPage('codetree')}>CodeTree 기출 보기</button><button onClick={() => setPage('patterns')}>PRO 패턴 보기</button><button onClick={() => setPage('problems')}>추천 문제 보기</button></div></section>;
}

function Patterns() {
  return <section><div className="pageTitle"><p className="eyebrow">5분 판단용 핵심 패턴</p><h1>삼성 PRO 패턴</h1><p className="desc">다익스트라 변형, BFS 상태, DFS+BFS, 트리 이동/삭제, 우선순위 자료구조까지 확장했습니다.</p></div><div className="grid">{proPatterns.map(p => <PatternCard key={p.title} pattern={p} />)}</div></section>;
}
function PatternCard({ pattern }) {
  return <article className="card"><div className="cardTop"><span className="badge">{pattern.difficulty}</span><span className="difficulty mid">패턴</span></div><h2>{pattern.title}</h2><div className="decision"><strong>5초 판단:</strong> {pattern.fiveSec}</div><div className="tagList">{pattern.tags.map(tag => <span key={tag}>#{tag}</span>)}</div><h3>대표 문제</h3><div className="links">{pattern.examples.map(x => <a key={x.name} href={x.url} target="_blank" rel="noreferrer">{x.name}<ChevronRight size={14} /></a>)}</div><h3>Python 템플릿</h3><pre><code>{pattern.code}</code></pre></article>;
}
function RecommendedProblems({ problems, query, setQuery }) {
  return <section><div className="pageTitle"><p className="eyebrow">Baekjoon / CodeTree 연결</p><h1>추천 문제</h1><p className="desc">삼성 PRO 패턴과 같이 풀면 좋은 실제 문제 링크입니다. 검색으로 BFS, 다익스트라, 트리, heap 등을 골라 볼 수 있습니다.</p></div><div className="toolbar"><div className="searchBox"><Search size={18}/><input value={query} onChange={e => setQuery(e.target.value)} placeholder="문제명, Gold, BFS, heap 검색" /></div></div><div className="problemList">{problems.map(p => <a className="problemRow" key={p.title} href={p.url} target="_blank" rel="noreferrer"><div><strong>{p.title}</strong><p>{p.judge} · {p.level}</p></div><div className="tagList small">{p.tags.map(tag => <span key={tag}>#{tag}</span>)}</div></a>)}</div></section>;
}
function CodetreePage({ query, setQuery, tags, selectedTag, setSelectedTag, problems }) {
  return <section><div className="pageTitle"><div><p className="eyebrow">Samsung SW 기출 분석</p><h1>CodeTree 삼성 기출 분석</h1><p className="desc">문제 원문은 복사하지 않고, 링크·유형·풀이 판단법·Python 템플릿 중심으로 정리했습니다.</p></div></div><div className="toolbar"><div className="searchBox"><Search size={18}/><input value={query} onChange={e => setQuery(e.target.value)} placeholder="문제명, BFS, 시뮬레이션 검색" /></div><div className="chips">{tags.map(tag => <button key={tag} className={selectedTag === tag ? 'chip selected' : 'chip'} onClick={() => setSelectedTag(tag)}>{tag}</button>)}</div></div><div className="grid">{problems.map(problem => <ProblemCard key={problem.title} problem={problem} />)}</div></section>;
}
function ProblemCard({ problem }) {
  return <article className="card"><div className="cardTop"><span className="badge">{problem.level}</span><span className={'difficulty ' + (problem.difficulty === '상' ? 'hard' : 'mid')}>{problem.difficulty}</span></div><h2>{problem.title}</h2><p className="meta">{problem.year} · {problem.session} · {problem.judge}</p><p className="summary">{problem.summary}</p><div className="decision"><strong>5초 판단:</strong> {problem.fiveSec}</div><div className="tagList">{problem.tags.map(tag => <span key={tag}>#{tag}</span>)}</div><h3>구현 전략</h3><ul>{problem.strategy.map((s, i) => <li key={i}>{s}</li>)}</ul><h3>유사 백준 문제</h3><div className="links">{problem.baekjoonLike.map(x => <a key={x.name} href={x.url} target="_blank" rel="noreferrer">{x.name}<ChevronRight size={14}/></a>)}</div><h3>Python 패턴 코드</h3><pre><code>{problem.code}</code></pre><a className="primaryLink" href={problem.url} target="_blank" rel="noreferrer"><ExternalLink size={16}/> CodeTree에서 문제 보기</a></article>;
}
function Roadmap() {
  const days = [
    ['1일차','BFS 상태, 로봇/방향 시뮬레이션','로봇 청소기, 아기 상어, 거울 설치'],
    ['2일차','DFS 선택 + BFS 평가','연구소, 감시, 사다리 조작'],
    ['3일차','회전/그룹/동시 처리','상어 중학교, 파이어스톰, 미세먼지'],
    ['4일차','다익스트라 변형/경로 복원','세금, 거의 최단 경로, K번째 최단경로'],
    ['5일차','트리/자료구조/실전 디버깅','트리, 문제집, 이중 우선순위 큐'],
  ];
  return <section><div className="pageTitle"><p className="eyebrow">시험 직전 압축</p><h1>5일 압축 로드맵</h1><p className="desc">하루에 한 묶음씩 보고, 문제 2~3개를 직접 구현하는 흐름입니다.</p></div><div className="problemList">{days.map(([d,t,p]) => <div className="problemRow" key={d}><div><strong>{d} · {t}</strong><p>{p}</p></div><Layers size={22}/></div>)}</div></section>;
}


