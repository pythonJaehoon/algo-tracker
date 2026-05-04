import { useMemo, useState } from "react";
import "../styles/codetreeSamsungArchive.css";

const codetreeProblems = [
  {
    title: "아기 고래의 첫 항해",
    year: "2026 상반기",
    session: "오전 2번",
    level: "A형",
    difficulty: "상",
    tags: ["시뮬레이션", "BFS", "방향", "상태관리"],
    url: "https://www.codetree.ai/ko/frequent-problems/samsung-sw/problems/baby-whale-first-voyage/description",
    summary: "격자 이동, 방향 전환, 상태 방문 체크가 섞인 삼성식 구현 문제입니다.",
    judge: "방향이 상태에 포함되면 visited[y][x][dir]로 봅니다.",
    strategy: ["상태를 y, x, dir로 분리", "회전/반사 규칙을 테이블화", "종료 조건을 먼저 함수로 분리"],
    template: "BFS + visited[y][x][dir]"
  },
  {
    title: "아기 바다거북의 대모험",
    year: "2026 상반기",
    session: "오전 1번",
    level: "A형",
    difficulty: "상",
    tags: ["격자", "시뮬레이션", "동시처리", "BFS"],
    url: "https://www.codetree.ai/ko/frequent-problems/samsung-sw/problems/a-little-sea-turtles-big-adventure/description",
    summary: "턴 단위 격자 변화와 이동을 분리해야 하는 동시 처리형 문제입니다.",
    judge: "한 턴 안에서 바뀐 값이 같은 턴에 다시 영향을 주면 next 배열을 씁니다.",
    strategy: ["current/next 배열 분리", "변화 → 이동 순서 고정", "중간 맵 출력으로 검증"],
    template: "2차원 배열 복사 + 턴 시뮬레이션"
  },
  {
    title: "AI 로봇청소기",
    year: "2025 하반기",
    session: "오후 1번",
    level: "A형",
    difficulty: "중상",
    tags: ["로봇", "방향", "청소", "시뮬레이션"],
    url: "https://www.codetree.ai/ko/frequent-problems/samsung-sw/problems/ai-robot-cleaner/description",
    summary: "로봇 방향, 회전, 후진, 청소 여부를 정확한 순서로 구현하는 문제입니다.",
    judge: "명령 순서가 길고 예외가 많으면 함수 분리가 핵심입니다.",
    strategy: ["turn_left 함수", "can_go 함수", "cleaned 배열", "while 종료 조건 명확화"],
    template: "while 시뮬레이션 + 방향 배열"
  },
  {
    title: "고대 문명 유적 탐사",
    year: "2024 하반기",
    session: "기출",
    level: "A형",
    difficulty: "상",
    tags: ["회전", "BFS", "점수계산", "우선순위"],
    url: "https://www.codetree.ai/ko/frequent-problems/samsung-sw/problems/ancient-ruin-exploration/description",
    summary: "부분 격자 회전 후보를 모두 평가하고 가장 좋은 선택을 적용하는 탐색형 시뮬레이션입니다.",
    judge: "작은 후보를 모두 돌려보고 점수 기준으로 정렬하면 됩니다.",
    strategy: ["3x3 회전 함수", "BFS 그룹 제거", "점수 기준 tie-break", "배열 복구 또는 deepcopy"],
    template: "완전탐색 + 회전 + BFS"
  },
  {
    title: "메이즈 러너",
    year: "2023 상반기",
    session: "기출",
    level: "A형",
    difficulty: "상",
    tags: ["시뮬레이션", "회전", "최단거리", "격자"],
    url: "https://www.codetree.ai/ko/frequent-problems/samsung-sw/problems/maze-runner/description",
    summary: "참가자 이동과 미로 회전이 반복되는 대표 삼성 시뮬레이션입니다.",
    judge: "한 턴에 이동 대상이 여러 명이면 이동 전 상태 기준으로 처리합니다.",
    strategy: ["거리 감소 방향만 이동", "가장 작은 정사각형 탐색", "벽 내구도 감소", "좌표 회전 공식"],
    template: "턴 시뮬레이션 + 부분 회전"
  },
  {
    title: "포탑 부수기",
    year: "2023 상반기",
    session: "기출",
    level: "A형",
    difficulty: "상",
    tags: ["BFS", "공격자선정", "우선순위", "시뮬레이션"],
    url: "https://www.codetree.ai/ko/frequent-problems/samsung-sw/problems/destroy-the-turret/description",
    summary: "공격자/대상 선정 기준과 레이저 경로 BFS가 핵심인 문제입니다.",
    judge: "선정 기준이 3개 이상이면 tuple 정렬로 고정합니다.",
    strategy: ["공격자 tuple 정렬", "대상 tuple 정렬", "BFS 경로 복원", "공격 관련 여부 체크"],
    template: "정렬 기준 + BFS path restore"
  },
  {
    title: "코드트리 빵",
    year: "2022 하반기",
    session: "기출",
    level: "A형",
    difficulty: "상",
    tags: ["BFS", "동시이동", "편의점", "격자"],
    url: "https://www.codetree.ai/ko/frequent-problems/samsung-sw/problems/codetree-mon-bread/description",
    summary: "사람들이 동시에 이동하고 베이스캠프/편의점이 막히는 턴 기반 문제입니다.",
    judge: "현재 시각에 활성화된 사람만 처리하고, 이동 완료 후 막습니다.",
    strategy: ["목적지에서 역방향 BFS", "행/열 우선순위", "막힌 칸 처리 타이밍", "동시 이동 후 반영"],
    template: "턴 시뮬레이션 + 역방향 BFS"
  },
  {
    title: "싸움땅",
    year: "2022 하반기",
    session: "기출",
    level: "A형",
    difficulty: "상",
    tags: ["시뮬레이션", "우선순위큐", "전투", "격자"],
    url: "https://www.codetree.ai/ko/frequent-problems/samsung-sw/problems/battle-ground/description",
    summary: "사람 이동, 총 선택, 전투, 패자 이동이 순서대로 이어지는 구현 문제입니다.",
    judge: "칸마다 총 여러 개면 max heap 또는 정렬 리스트를 둡니다.",
    strategy: ["총은 칸별 heap", "전투력 비교 tuple", "패자 이동 처리", "승자 총 교체"],
    template: "격자 시뮬레이션 + heap"
  },
  {
    title: "나무박멸",
    year: "2022 상반기",
    session: "기출",
    level: "A형",
    difficulty: "상",
    tags: ["성장", "확산", "제초제", "시뮬레이션"],
    url: "https://www.codetree.ai/ko/frequent-problems/samsung-sw/problems/tree-kill-all/description",
    summary: "성장, 번식, 제초제 투입을 순서대로 구현하는 삼성식 생태계 시뮬레이션입니다.",
    judge: "같은 턴 동시 확산은 add 배열로 따로 누적합니다.",
    strategy: ["성장", "번식 누적 배열", "제초제 후보 점수 계산", "제초제 남은 기간 관리"],
    template: "다단계 턴 시뮬레이션"
  },
  {
    title: "술래잡기",
    year: "2022 상반기",
    session: "기출",
    level: "A형",
    difficulty: "상",
    tags: ["달팽이", "추적", "시뮬레이션", "방향"],
    url: "https://www.codetree.ai/ko/frequent-problems/samsung-sw/problems/hide-and-seek/description",
    summary: "도망자 이동과 술래의 달팽이 경로 이동을 구현하는 방향 시뮬레이션입니다.",
    judge: "술래 이동 경로는 미리 배열로 만들어두면 실수가 줄어듭니다.",
    strategy: ["술래 path precompute", "도망자 거리 조건", "나무 위치 예외", "시야 3칸 체크"],
    template: "precomputed path + simulation"
  },
  {
    title: "꼬리잡기놀이",
    year: "2022 상반기",
    session: "기출",
    level: "A형",
    difficulty: "상",
    tags: ["BFS", "팀관리", "Deque", "시뮬레이션"],
    url: "https://www.codetree.ai/ko/frequent-problems/samsung-sw/problems/tail-catch-play/description",
    summary: "팀 경로를 찾아 deque처럼 움직이고 공을 던져 점수를 계산합니다.",
    judge: "팀의 머리-꼬리 순서를 처음에 정확히 잡아야 합니다.",
    strategy: ["팀 BFS 탐색", "경로 순서 저장", "deque 회전", "공 방향 라운드 처리", "맞은 팀 reverse"],
    template: "BFS group + deque simulation"
  },
  {
    title: "왕실의 기사 대결",
    year: "2024 상반기",
    session: "기출",
    level: "A형",
    difficulty: "상",
    tags: ["밀기", "충돌", "BFS", "사각형"],
    url: "https://www.codetree.ai/ko/frequent-problems/samsung-sw/problems/royal-knight-duel/description",
    summary: "기사 직사각형을 밀 때 연쇄 충돌과 데미지를 계산하는 문제입니다.",
    judge: "밀리는 대상들을 먼저 모두 찾고, 가능할 때 한 번에 이동합니다.",
    strategy: ["기사 영역 좌표 관리", "충돌 기사 BFS", "벽 체크", "이동 후 함정 데미지"],
    template: "객체 시뮬레이션 + 충돌 BFS"
  },
  {
    title: "루돌프의 반란",
    year: "2023 하반기",
    session: "기출",
    level: "A형",
    difficulty: "상",
    tags: ["충돌", "기절", "우선순위", "시뮬레이션"],
    url: "https://www.codetree.ai/ko/frequent-problems/samsung-sw/problems/rudolph-rebellion/description",
    summary: "루돌프와 산타의 이동, 충돌, 연쇄 밀림, 기절 상태를 관리합니다.",
    judge: "객체별 상태 배열을 만들고 충돌 처리를 함수로 빼는 것이 안전합니다.",
    strategy: ["가장 가까운 산타 선정", "8방향/4방향 분리", "충돌 push 함수", "stun turn 관리"],
    template: "객체 상태 시뮬레이션"
  },
  {
    title: "색깔 폭탄",
    year: "기출 유사",
    session: "연습",
    level: "A형",
    difficulty: "상",
    tags: ["BFS", "그룹선정", "중력", "회전"],
    url: "https://www.codetree.ai/ko/frequent-problems/samsung-sw/problems/colored-bomb/description",
    summary: "그룹을 고르고 제거한 뒤 중력과 회전을 반복하는 블록 게임형 문제입니다.",
    judge: "그룹 선정 기준이 많으므로 후보를 tuple로 정렬합니다.",
    strategy: ["BFS 그룹 탐색", "빨간 폭탄 방문 처리 주의", "중력 함수", "반시계 회전"],
    template: "BFS + gravity + rotate"
  },
  {
    title: "토끼와 경주",
    year: "2023 하반기",
    session: "기출",
    level: "A형",
    difficulty: "상",
    tags: ["우선순위큐", "정렬기준", "시뮬레이션"],
    url: "https://www.codetree.ai/ko/frequent-problems/samsung-sw/problems/rabit-and-race/description",
    summary: "복잡한 우선순위로 토끼를 선택하고 점수를 갱신하는 자료구조 문제입니다.",
    judge: "우선순위가 많은 선택은 heap tuple을 정확히 구성합니다.",
    strategy: ["토끼 선택 heap", "점프 후보 4방향 계산", "점수 lazy 처리", "최종 보너스 선정"],
    template: "heap + dict + lazy score"
  },
  {
    title: "코드트리 채점기",
    year: "2023 하반기",
    session: "기출",
    level: "A형/PRO 유사",
    difficulty: "최상",
    tags: ["우선순위큐", "대기열", "도메인", "스케줄링"],
    url: "https://www.codetree.ai/ko/frequent-problems/samsung-sw/problems/codetree-judger/description",
    summary: "문제 대기열, 도메인별 제한, 채점기 배정이 결합된 스케줄링 문제입니다.",
    judge: "도메인별 상태와 전체 대기 heap을 분리합니다.",
    strategy: ["url 파싱", "domain별 heap", "채점기 idle 관리", "금지 시간 관리", "중복 요청 제거"],
    template: "multi heap + scheduler"
  },
  {
    title: "싸움땅 확장 패턴",
    year: "기출 유사",
    session: "연습",
    level: "PRO 대비",
    difficulty: "상",
    tags: ["우선순위", "객체상태", "격자관리"],
    url: "https://www.codetree.ai/training-field/search?keyword=%EC%8B%B8%EC%9B%80%EB%95%85",
    summary: "객체가 이동하며 칸의 자원과 상호작용하는 문제들을 묶어 연습합니다.",
    judge: "칸 데이터와 사람 데이터를 분리해 관리합니다.",
    strategy: ["person 배열", "grid resource", "충돌 처리", "우선순위 기준 함수화"],
    template: "object simulation"
  },
  {
    title: "회전 격자 공통 패턴",
    year: "기출 유사",
    session: "연습",
    level: "PRO 대비",
    difficulty: "중상",
    tags: ["회전", "배열", "격자"],
    url: "https://www.codetree.ai/training-field/search?keyword=rotate%20grid",
    summary: "부분 배열 회전, 좌표 변환, 회전 후 후처리를 모아 연습하는 패턴입니다.",
    judge: "좌표 변환 공식을 외우기보다 작은 함수로 검증합니다.",
    strategy: ["tmp 배열 생성", "시계/반시계 함수 분리", "회전 전후 좌표 매핑", "테스트 출력"],
    template: "rotate subgrid"
  }
];

const platforms = ["전체", "A형", "PRO 대비", "A형/PRO 유사"];

export default function CodetreeSamsungArchive() {
  const [query, setQuery] = useState("");
  const [level, setLevel] = useState("전체");
  const [tag, setTag] = useState("전체");
  const [selected, setSelected] = useState(codetreeProblems[0]);

  const allTags = useMemo(() => ["전체", ...Array.from(new Set(codetreeProblems.flatMap((p) => p.tags))).sort()], []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return codetreeProblems.filter((p) => {
      const matchesQuery = !q || p.title.toLowerCase().includes(q) || p.summary.toLowerCase().includes(q) || p.tags.some((t) => t.toLowerCase().includes(q));
      const matchesLevel = level === "전체" || p.level === level;
      const matchesTag = tag === "전체" || p.tags.includes(tag);
      return matchesQuery && matchesLevel && matchesTag;
    });
  }, [query, level, tag]);

  const shown = filtered.includes(selected) ? selected : filtered[0] || codetreeProblems[0];

  return (
    <div className="ct-page">
      <aside className="ct-list">
        <div className="ct-title">
          <p>CodeTree 삼성 기출</p>
          <h2>문제별 패턴 분석</h2>
          <span>{filtered.length}개 표시 / 전체 {codetreeProblems.length}개</span>
        </div>

        <div className="ct-controls">
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="문제명/태그 검색" />
          <select value={level} onChange={(e) => setLevel(e.target.value)}>
            {platforms.map((x) => <option key={x} value={x}>{x}</option>)}
          </select>
          <select value={tag} onChange={(e) => setTag(e.target.value)}>
            {allTags.map((x) => <option key={x} value={x}>{x}</option>)}
          </select>
        </div>

        <div className="ct-menu">
          {filtered.map((problem) => (
            <button key={problem.title} className={shown.title === problem.title ? "active" : ""} onClick={() => setSelected(problem)}>
              <strong>{problem.title}</strong>
              <span>{problem.year} · {problem.difficulty}</span>
              <em>{problem.tags.slice(0, 3).map((t) => `#${t}`).join(" ")}</em>
            </button>
          ))}
        </div>
      </aside>

      <main className="ct-detail">
        <div className="ct-hero">
          <div>
            <p className="ct-eyebrow">{shown.year} · {shown.session}</p>
            <h1>{shown.title}</h1>
            <p>{shown.summary}</p>
          </div>
          <a href={shown.url} target="_blank" rel="noreferrer">문제 열기</a>
        </div>

        <div className="ct-badges">
          <span>{shown.level}</span>
          <span>난이도 {shown.difficulty}</span>
          <span>{shown.template}</span>
        </div>

        <section className="ct-section">
          <p>5초 판단법</p>
          <h2>{shown.judge}</h2>
        </section>

        <section className="ct-section">
          <p>풀이 전략</p>
          <div className="ct-strategy-grid">
            {shown.strategy.map((s, idx) => (
              <div key={idx} className="ct-strategy">
                <b>{idx + 1}</b>
                <span>{s}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="ct-section">
          <p>태그</p>
          <div className="ct-tags">
            {shown.tags.map((t) => <span key={t}>#{t}</span>)}
          </div>
        </section>

        <section className="ct-code">
          <p>공통 Python 골격</p>
          <pre>{`from collections import deque\n\ndy = [1, -1, 0, 0]\ndx = [0, 0, 1, -1]\n\ndef in_range(y, x):\n    return 0 <= y < n and 0 <= x < n\n\ndef bfs(sy, sx):\n    q = deque([(sy, sx)])\n    visited = [[0] * n for _ in range(n)]\n    visited[sy][sx] = 1\n\n    while q:\n        y, x = q.popleft()\n        for d in range(4):\n            ny, nx = y + dy[d], x + dx[d]\n            if not in_range(ny, nx):\n                continue\n            if visited[ny][nx]:\n                continue\n            visited[ny][nx] = 1\n            q.append((ny, nx))`}</pre>
        </section>
      </main>
    </div>
  );
}
