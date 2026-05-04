export const codetreeFrequentProblems = [
  {
    "id": "street-light-installation",
    "title": "가로등 설치",
    "category": "CodeTree 삼성 기출",
    "difficulty": "2025 하반기",
    "level": 5,
    "tags": [
      "interval",
      "set",
      "priority queue"
    ],
    "summary": "가로등 위치 사이의 최대 어두운 구간을 관리하는 문제입니다.",
    "signal": "CodeTree frequent-problems 삼성 SW 기출/유사 문제입니다. 원문 링크를 열어 조건을 확인한 뒤 상태·자료구조·턴 순서를 먼저 정리하세요.",
    "strategy": [
      "정렬된 가로등 위치를 관리합니다.",
      "인접 간격의 최댓값을 갱신합니다.",
      "양 끝 구간은 2배 기준으로 비교합니다.",
      "동적 변경이 있으면 interval heap 또는 정렬 구조를 고려합니다."
    ],
    "code": "# CodeTree 삼성 기출 풀이 시작 템플릿\nimport sys\nfrom collections import deque\ninput = sys.stdin.readline\n\n# 1. 입력 크기 확인\n# 2. 상태 변수 정리\n# 3. 한 턴/한 명령 처리 순서 주석 작성\n# 4. 필요한 자료구조 선택\n# 5. simulate() 또는 solve()로 분리\n",
    "problems": [
      {
        "platform": "CodeTree",
        "title": "가로등 설치",
        "difficulty": "2025 하반기",
        "url": "https://www.codetree.ai/ko/frequent-problems/samsung-sw/problems/street-light-installation/description",
        "note": "CodeTree frequent-problems 삼성 SW"
      }
    ]
  },
  {
    "id": "ai-robot",
    "title": "AI 로봇청소기",
    "category": "CodeTree 삼성 기출",
    "difficulty": "2025 하반기",
    "level": 5,
    "tags": [
      "BFS",
      "tie-break",
      "simulation"
    ],
    "summary": "로봇이 청소 대상을 찾고, 패턴/확산/우선순위를 처리하는 시뮬레이션 문제입니다.",
    "signal": "CodeTree frequent-problems 삼성 SW 기출/유사 문제입니다. 원문 링크를 열어 조건을 확인한 뒤 상태·자료구조·턴 순서를 먼저 정리하세요.",
    "strategy": [
      "각 로봇 기준 BFS로 후보를 찾습니다.",
      "거리·행·열 등 tie-break를 tuple로 정리합니다.",
      "청소 패턴은 방향 회전 함수로 처리합니다.",
      "동시 변화와 원점 처리 조건을 분리합니다."
    ],
    "code": "# CodeTree 삼성 기출 풀이 시작 템플릿\nimport sys\nfrom collections import deque\ninput = sys.stdin.readline\n\n# 1. 입력 크기 확인\n# 2. 상태 변수 정리\n# 3. 한 턴/한 명령 처리 순서 주석 작성\n# 4. 필요한 자료구조 선택\n# 5. simulate() 또는 solve()로 분리\n",
    "problems": [
      {
        "platform": "CodeTree",
        "title": "AI 로봇청소기",
        "difficulty": "2025 하반기",
        "url": "https://www.codetree.ai/ko/frequent-problems/samsung-sw/problems/ai-robot/description",
        "note": "CodeTree frequent-problems 삼성 SW"
      }
    ]
  },
  {
    "id": "pirate-captain-coddy",
    "title": "해적선장 코디",
    "category": "CodeTree 삼성 기출",
    "difficulty": "2025 하반기",
    "level": 5,
    "tags": [
      "priority queue",
      "hash",
      "simulation"
    ],
    "summary": "후보 상태와 우선순위가 계속 바뀌는 명령형 자료구조 문제입니다.",
    "signal": "CodeTree frequent-problems 삼성 SW 기출/유사 문제입니다. 원문 링크를 열어 조건을 확인한 뒤 상태·자료구조·턴 순서를 먼저 정리하세요.",
    "strategy": [
      "id별 현재 상태는 dict에 둡니다.",
      "우선순위 후보는 heap에 둡니다.",
      "갱신된 후보는 새로 push하고 오래된 후보는 lazy deletion합니다.",
      "tie-break 기준을 tuple로 고정합니다."
    ],
    "code": "# CodeTree 삼성 기출 풀이 시작 템플릿\nimport sys\nfrom collections import deque\ninput = sys.stdin.readline\n\n# 1. 입력 크기 확인\n# 2. 상태 변수 정리\n# 3. 한 턴/한 명령 처리 순서 주석 작성\n# 4. 필요한 자료구조 선택\n# 5. simulate() 또는 solve()로 분리\n",
    "problems": [
      {
        "platform": "CodeTree",
        "title": "해적선장 코디",
        "difficulty": "2025 하반기",
        "url": "https://www.codetree.ai/ko/frequent-problems/samsung-sw/problems/pirate-captain-coddy/description",
        "note": "CodeTree frequent-problems 삼성 SW"
      }
    ]
  },
  {
    "id": "delivery-service",
    "title": "택배 하차",
    "category": "CodeTree 삼성 기출",
    "difficulty": "2025 하반기",
    "level": 4,
    "tags": [
      "simulation",
      "queue",
      "priority"
    ],
    "summary": "택배/하차/처리 순서를 관리하는 구현 및 자료구조 문제입니다.",
    "signal": "CodeTree frequent-problems 삼성 SW 기출/유사 문제입니다. 원문 링크를 열어 조건을 확인한 뒤 상태·자료구조·턴 순서를 먼저 정리하세요.",
    "strategy": [
      "명령별 상태 변화를 표로 정리합니다.",
      "대기열과 처리 완료 상태를 분리합니다.",
      "우선순위 기준이 있으면 tuple로 관리합니다.",
      "한 명령마다 전체 순회가 가능한지 계산합니다."
    ],
    "code": "# CodeTree 삼성 기출 풀이 시작 템플릿\nimport sys\nfrom collections import deque\ninput = sys.stdin.readline\n\n# 1. 입력 크기 확인\n# 2. 상태 변수 정리\n# 3. 한 턴/한 명령 처리 순서 주석 작성\n# 4. 필요한 자료구조 선택\n# 5. simulate() 또는 solve()로 분리\n",
    "problems": [
      {
        "platform": "CodeTree",
        "title": "택배 하차",
        "difficulty": "2025 하반기",
        "url": "https://www.codetree.ai/ko/frequent-problems/samsung-sw/problems/delivery-service/description",
        "note": "CodeTree frequent-problems 삼성 SW"
      }
    ]
  },
  {
    "id": "escape-unknown-space",
    "title": "미지의 공간 탈출",
    "category": "CodeTree 삼성 기출",
    "difficulty": "삼성 기출",
    "level": 4,
    "tags": [
      "BFS",
      "state",
      "grid"
    ],
    "summary": "미지의 공간에서 상태와 이동 조건을 함께 관리하는 탐색 문제입니다.",
    "signal": "CodeTree frequent-problems 삼성 SW 기출/유사 문제입니다. 원문 링크를 열어 조건을 확인한 뒤 상태·자료구조·턴 순서를 먼저 정리하세요.",
    "strategy": [
      "위치 외 상태가 있는지 먼저 확인합니다.",
      "visited 차원을 상태까지 확장합니다.",
      "이동 가능 조건을 함수로 분리합니다.",
      "최단거리면 BFS 레벨 순서를 유지합니다."
    ],
    "code": "# CodeTree 삼성 기출 풀이 시작 템플릿\nimport sys\nfrom collections import deque\ninput = sys.stdin.readline\n\n# 1. 입력 크기 확인\n# 2. 상태 변수 정리\n# 3. 한 턴/한 명령 처리 순서 주석 작성\n# 4. 필요한 자료구조 선택\n# 5. simulate() 또는 solve()로 분리\n",
    "problems": [
      {
        "platform": "CodeTree",
        "title": "미지의 공간 탈출",
        "difficulty": "삼성 기출",
        "url": "https://www.codetree.ai/ko/frequent-problems/samsung-sw/problems/escape-unknown-space/description",
        "note": "CodeTree frequent-problems 삼성 SW"
      }
    ]
  },
  {
    "id": "ancient-ruin-exploration",
    "title": "고대 문명 유적 탐사",
    "category": "CodeTree 삼성 기출",
    "difficulty": "삼성 기출",
    "level": 5,
    "tags": [
      "rotation",
      "BFS",
      "simulation"
    ],
    "summary": "부분 회전 후 연결 영역을 찾고 점수를 계산하는 삼성식 격자 구현 문제입니다.",
    "signal": "CodeTree frequent-problems 삼성 SW 기출/유사 문제입니다. 원문 링크를 열어 조건을 확인한 뒤 상태·자료구조·턴 순서를 먼저 정리하세요.",
    "strategy": [
      "회전 후보를 모두 평가합니다.",
      "회전은 임시 배열로 처리합니다.",
      "연결 영역은 BFS로 탐색합니다.",
      "점수 tie-break를 정확히 정렬합니다."
    ],
    "code": "# CodeTree 삼성 기출 풀이 시작 템플릿\nimport sys\nfrom collections import deque\ninput = sys.stdin.readline\n\n# 1. 입력 크기 확인\n# 2. 상태 변수 정리\n# 3. 한 턴/한 명령 처리 순서 주석 작성\n# 4. 필요한 자료구조 선택\n# 5. simulate() 또는 solve()로 분리\n",
    "problems": [
      {
        "platform": "CodeTree",
        "title": "고대 문명 유적 탐사",
        "difficulty": "삼성 기출",
        "url": "https://www.codetree.ai/ko/frequent-problems/samsung-sw/problems/ancient-ruin-exploration/description",
        "note": "CodeTree frequent-problems 삼성 SW"
      }
    ]
  },
  {
    "id": "microbial-research",
    "title": "미생물 연구",
    "category": "CodeTree 삼성 기출",
    "difficulty": "삼성 기출",
    "level": 4,
    "tags": [
      "grid",
      "rectangle",
      "simulation"
    ],
    "summary": "직사각형 영역 투입과 미생물 상태 변화를 처리하는 격자 시뮬레이션 문제입니다.",
    "signal": "CodeTree frequent-problems 삼성 SW 기출/유사 문제입니다. 원문 링크를 열어 조건을 확인한 뒤 상태·자료구조·턴 순서를 먼저 정리하세요.",
    "strategy": [
      "좌표 범위를 정확히 변환합니다.",
      "영역 업데이트는 중복/덮어쓰기 규칙을 먼저 정리합니다.",
      "매 단계 board를 바로 수정해도 되는지 확인합니다.",
      "연결/분리 여부는 BFS로 확인합니다."
    ],
    "code": "# CodeTree 삼성 기출 풀이 시작 템플릿\nimport sys\nfrom collections import deque\ninput = sys.stdin.readline\n\n# 1. 입력 크기 확인\n# 2. 상태 변수 정리\n# 3. 한 턴/한 명령 처리 순서 주석 작성\n# 4. 필요한 자료구조 선택\n# 5. simulate() 또는 solve()로 분리\n",
    "problems": [
      {
        "platform": "CodeTree",
        "title": "미생물 연구",
        "difficulty": "삼성 기출",
        "url": "https://www.codetree.ai/ko/frequent-problems/samsung-sw/problems/microbial-research/description",
        "note": "CodeTree frequent-problems 삼성 SW"
      }
    ]
  },
  {
    "id": "hide-and-seek",
    "title": "술래잡기",
    "category": "CodeTree 삼성 기출",
    "difficulty": "삼성 기출",
    "level": 4,
    "tags": [
      "simulation",
      "direction",
      "grid"
    ],
    "summary": "도망자 이동과 술래 이동을 턴 단위로 처리하는 대표 삼성 구현 문제입니다.",
    "signal": "CodeTree frequent-problems 삼성 SW 기출/유사 문제입니다. 원문 링크를 열어 조건을 확인한 뒤 상태·자료구조·턴 순서를 먼저 정리하세요.",
    "strategy": [
      "도망자 이동 조건을 먼저 처리합니다.",
      "술래의 달팽이 이동 방향을 별도 함수로 만듭니다.",
      "나무/시야/잡기 조건을 분리합니다.",
      "턴 순서를 주석으로 고정합니다."
    ],
    "code": "# CodeTree 삼성 기출 풀이 시작 템플릿\nimport sys\nfrom collections import deque\ninput = sys.stdin.readline\n\n# 1. 입력 크기 확인\n# 2. 상태 변수 정리\n# 3. 한 턴/한 명령 처리 순서 주석 작성\n# 4. 필요한 자료구조 선택\n# 5. simulate() 또는 solve()로 분리\n",
    "problems": [
      {
        "platform": "CodeTree",
        "title": "술래잡기",
        "difficulty": "삼성 기출",
        "url": "https://www.codetree.ai/ko/frequent-problems/samsung-sw/problems/hide-and-seek/description",
        "note": "CodeTree frequent-problems 삼성 SW"
      }
    ]
  },
  {
    "id": "rabit-and-race",
    "title": "토끼와 경주",
    "category": "CodeTree 삼성 기출",
    "difficulty": "B형 기출",
    "level": 5,
    "tags": [
      "priority queue",
      "ranking",
      "simulation"
    ],
    "summary": "우선순위로 토끼를 선택하고 점수와 위치를 갱신하는 B형 기출 유형입니다.",
    "signal": "CodeTree frequent-problems 삼성 SW 기출/유사 문제입니다. 원문 링크를 열어 조건을 확인한 뒤 상태·자료구조·턴 순서를 먼저 정리하세요.",
    "strategy": [
      "토끼 선택 기준을 heap tuple로 만듭니다.",
      "전체 점수 증가분과 개인 보정분을 분리합니다.",
      "이동 위치 계산을 함수화합니다.",
      "갱신된 토끼는 다시 heap에 push합니다."
    ],
    "code": "# CodeTree 삼성 기출 풀이 시작 템플릿\nimport sys\nfrom collections import deque\ninput = sys.stdin.readline\n\n# 1. 입력 크기 확인\n# 2. 상태 변수 정리\n# 3. 한 턴/한 명령 처리 순서 주석 작성\n# 4. 필요한 자료구조 선택\n# 5. simulate() 또는 solve()로 분리\n",
    "problems": [
      {
        "platform": "CodeTree",
        "title": "토끼와 경주",
        "difficulty": "B형 기출",
        "url": "https://www.codetree.ai/ko/frequent-problems/samsung-sw/problems/rabit-and-race/description",
        "note": "CodeTree frequent-problems 삼성 SW"
      }
    ]
  },
  {
    "id": "codetree-tour",
    "title": "코드트리 투어",
    "category": "CodeTree 삼성 기출",
    "difficulty": "B형 기출",
    "level": 5,
    "tags": [
      "Dijkstra",
      "priority queue",
      "set"
    ],
    "summary": "상품 이익과 최단거리를 함께 관리하는 그래프+자료구조 문제입니다.",
    "signal": "CodeTree frequent-problems 삼성 SW 기출/유사 문제입니다. 원문 링크를 열어 조건을 확인한 뒤 상태·자료구조·턴 순서를 먼저 정리하세요.",
    "strategy": [
      "출발지가 바뀌면 다익스트라를 다시 수행합니다.",
      "상품 이익은 수익 - 최단거리로 계산합니다.",
      "판매 가능 후보는 heap으로 관리합니다.",
      "삭제된 상품은 id set으로 무효화합니다."
    ],
    "code": "# CodeTree 삼성 기출 풀이 시작 템플릿\nimport sys\nfrom collections import deque\ninput = sys.stdin.readline\n\n# 1. 입력 크기 확인\n# 2. 상태 변수 정리\n# 3. 한 턴/한 명령 처리 순서 주석 작성\n# 4. 필요한 자료구조 선택\n# 5. simulate() 또는 solve()로 분리\n",
    "problems": [
      {
        "platform": "CodeTree",
        "title": "코드트리 투어",
        "difficulty": "B형 기출",
        "url": "https://www.codetree.ai/ko/frequent-problems/samsung-sw/problems/codetree-tour/description",
        "note": "CodeTree frequent-problems 삼성 SW"
      }
    ]
  },
  {
    "id": "codetree-db",
    "title": "코드트리 DB",
    "category": "CodeTree 삼성 기출",
    "difficulty": "B형 기출",
    "level": 5,
    "tags": [
      "hash",
      "segment tree",
      "coordinate compression"
    ],
    "summary": "DB 명령을 처리하며 key/value와 순위/조건 조회를 함께 관리하는 B형 문제입니다.",
    "signal": "CodeTree frequent-problems 삼성 SW 기출/유사 문제입니다. 원문 링크를 열어 조건을 확인한 뒤 상태·자료구조·턴 순서를 먼저 정리하세요.",
    "strategy": [
      "key 조회는 dict로 처리합니다.",
      "값 기반 순위/구간 조회는 좌표 압축을 고려합니다.",
      "삽입/삭제/갱신 때 모든 인덱스를 함께 갱신합니다.",
      "세그먼트 트리나 Fenwick Tree를 검토합니다."
    ],
    "code": "# CodeTree 삼성 기출 풀이 시작 템플릿\nimport sys\nfrom collections import deque\ninput = sys.stdin.readline\n\n# 1. 입력 크기 확인\n# 2. 상태 변수 정리\n# 3. 한 턴/한 명령 처리 순서 주석 작성\n# 4. 필요한 자료구조 선택\n# 5. simulate() 또는 solve()로 분리\n",
    "problems": [
      {
        "platform": "CodeTree",
        "title": "코드트리 DB",
        "difficulty": "B형 기출",
        "url": "https://www.codetree.ai/ko/frequent-problems/samsung-sw/problems/codetree-db/description",
        "note": "CodeTree frequent-problems 삼성 SW"
      }
    ]
  },
  {
    "id": "color-tree",
    "title": "색깔 트리",
    "category": "CodeTree 삼성 기출",
    "difficulty": "B형 기출",
    "level": 5,
    "tags": [
      "tree",
      "DFS",
      "constraint"
    ],
    "summary": "트리 노드 추가, 색 변경, 점수 계산을 처리하는 B형 트리 문제입니다.",
    "signal": "CodeTree frequent-problems 삼성 SW 기출/유사 문제입니다. 원문 링크를 열어 조건을 확인한 뒤 상태·자료구조·턴 순서를 먼저 정리하세요.",
    "strategy": [
      "parent/children/color/depth 제한을 저장합니다.",
      "노드 추가 가능 여부는 조상 방향으로 확인합니다.",
      "서브트리 점수는 DFS로 계산합니다.",
      "반복 질의가 많으면 캐시 무효화 범위를 정합니다."
    ],
    "code": "# CodeTree 삼성 기출 풀이 시작 템플릿\nimport sys\nfrom collections import deque\ninput = sys.stdin.readline\n\n# 1. 입력 크기 확인\n# 2. 상태 변수 정리\n# 3. 한 턴/한 명령 처리 순서 주석 작성\n# 4. 필요한 자료구조 선택\n# 5. simulate() 또는 solve()로 분리\n",
    "problems": [
      {
        "platform": "CodeTree",
        "title": "색깔 트리",
        "difficulty": "B형 기출",
        "url": "https://www.codetree.ai/ko/frequent-problems/samsung-sw/problems/color-tree/description",
        "note": "CodeTree frequent-problems 삼성 SW"
      }
    ]
  },
  {
    "id": "codetree-omakase",
    "title": "코드트리 오마카세",
    "category": "CodeTree 삼성 기출",
    "difficulty": "B형 기출",
    "level": 5,
    "tags": [
      "simulation",
      "time",
      "queue"
    ],
    "summary": "시간에 따라 초밥과 손님 상태가 변하는 이벤트 기반 시뮬레이션 문제입니다.",
    "signal": "CodeTree frequent-problems 삼성 SW 기출/유사 문제입니다. 원문 링크를 열어 조건을 확인한 뒤 상태·자료구조·턴 순서를 먼저 정리하세요.",
    "strategy": [
      "시간 이벤트를 순서대로 처리합니다.",
      "회전 위치는 수식으로 계산합니다.",
      "손님/초밥 상태는 dict로 관리합니다.",
      "사진 촬영 시점의 처리 순서를 정확히 지킵니다."
    ],
    "code": "# CodeTree 삼성 기출 풀이 시작 템플릿\nimport sys\nfrom collections import deque\ninput = sys.stdin.readline\n\n# 1. 입력 크기 확인\n# 2. 상태 변수 정리\n# 3. 한 턴/한 명령 처리 순서 주석 작성\n# 4. 필요한 자료구조 선택\n# 5. simulate() 또는 solve()로 분리\n",
    "problems": [
      {
        "platform": "CodeTree",
        "title": "코드트리 오마카세",
        "difficulty": "B형 기출",
        "url": "https://www.codetree.ai/ko/frequent-problems/samsung-sw/problems/codetree-omakase/description",
        "note": "CodeTree frequent-problems 삼성 SW"
      }
    ]
  },
  {
    "id": "royal-knight-duel",
    "title": "왕실의 기사 대결",
    "category": "CodeTree 삼성 기출",
    "difficulty": "삼성 기출",
    "level": 4,
    "tags": [
      "simulation",
      "push",
      "damage"
    ],
    "summary": "기사 밀림과 함정 피해를 연쇄적으로 처리하는 격자 시뮬레이션입니다.",
    "signal": "CodeTree frequent-problems 삼성 SW 기출/유사 문제입니다. 원문 링크를 열어 조건을 확인한 뒤 상태·자료구조·턴 순서를 먼저 정리하세요.",
    "strategy": [
      "이동 가능 여부를 먼저 전체 검사합니다.",
      "밀리는 기사 집합을 BFS/queue로 모읍니다.",
      "실제 이동은 가능 여부 확인 후 한 번에 반영합니다.",
      "함정 피해와 체력 감소 시점을 분리합니다."
    ],
    "code": "# CodeTree 삼성 기출 풀이 시작 템플릿\nimport sys\nfrom collections import deque\ninput = sys.stdin.readline\n\n# 1. 입력 크기 확인\n# 2. 상태 변수 정리\n# 3. 한 턴/한 명령 처리 순서 주석 작성\n# 4. 필요한 자료구조 선택\n# 5. simulate() 또는 solve()로 분리\n",
    "problems": [
      {
        "platform": "CodeTree",
        "title": "왕실의 기사 대결",
        "difficulty": "삼성 기출",
        "url": "https://www.codetree.ai/ko/frequent-problems/samsung-sw/problems/royal-knight-duel/description",
        "note": "CodeTree frequent-problems 삼성 SW"
      }
    ]
  },
  {
    "id": "tree-kill-all",
    "title": "나무박멸",
    "category": "CodeTree 삼성 기출",
    "difficulty": "삼성 기출",
    "level": 4,
    "tags": [
      "simulation",
      "spread",
      "grid"
    ],
    "summary": "나무 성장, 번식, 제초제 확산을 순서대로 처리하는 격자 시뮬레이션입니다.",
    "signal": "CodeTree frequent-problems 삼성 SW 기출/유사 문제입니다. 원문 링크를 열어 조건을 확인한 뒤 상태·자료구조·턴 순서를 먼저 정리하세요.",
    "strategy": [
      "성장→번식→제초제 선택→제초제 적용 순서를 고정합니다.",
      "제초제 남은 시간을 별도 배열로 관리합니다.",
      "대각선 확산은 벽/빈칸 조건을 조심합니다.",
      "최대 제거 위치 tie-break를 정렬합니다."
    ],
    "code": "# CodeTree 삼성 기출 풀이 시작 템플릿\nimport sys\nfrom collections import deque\ninput = sys.stdin.readline\n\n# 1. 입력 크기 확인\n# 2. 상태 변수 정리\n# 3. 한 턴/한 명령 처리 순서 주석 작성\n# 4. 필요한 자료구조 선택\n# 5. simulate() 또는 solve()로 분리\n",
    "problems": [
      {
        "platform": "CodeTree",
        "title": "나무박멸",
        "difficulty": "삼성 기출",
        "url": "https://www.codetree.ai/ko/frequent-problems/samsung-sw/problems/tree-kill-all/description",
        "note": "CodeTree frequent-problems 삼성 SW"
      }
    ]
  },
  {
    "id": "maze-runner",
    "title": "메이즈 러너",
    "category": "CodeTree 삼성 기출",
    "difficulty": "삼성 기출",
    "level": 5,
    "tags": [
      "BFS",
      "rotation",
      "simulation"
    ],
    "summary": "참가자 이동과 미로 부분 회전을 반복하는 삼성식 격자 문제입니다.",
    "signal": "CodeTree frequent-problems 삼성 SW 기출/유사 문제입니다. 원문 링크를 열어 조건을 확인한 뒤 상태·자료구조·턴 순서를 먼저 정리하세요.",
    "strategy": [
      "참가자 이동을 먼저 처리합니다.",
      "출구와 참가자를 포함하는 최소 정사각형을 찾습니다.",
      "부분 회전은 임시 배열로 처리합니다.",
      "참가자 좌표도 회전시켜야 합니다."
    ],
    "code": "# CodeTree 삼성 기출 풀이 시작 템플릿\nimport sys\nfrom collections import deque\ninput = sys.stdin.readline\n\n# 1. 입력 크기 확인\n# 2. 상태 변수 정리\n# 3. 한 턴/한 명령 처리 순서 주석 작성\n# 4. 필요한 자료구조 선택\n# 5. simulate() 또는 solve()로 분리\n",
    "problems": [
      {
        "platform": "CodeTree",
        "title": "메이즈 러너",
        "difficulty": "삼성 기출",
        "url": "https://www.codetree.ai/ko/frequent-problems/samsung-sw/problems/maze-runner/description",
        "note": "CodeTree frequent-problems 삼성 SW"
      }
    ]
  },
  {
    "id": "destroy-the-turret",
    "title": "포탑 부수기",
    "category": "CodeTree 삼성 기출",
    "difficulty": "삼성 기출",
    "level": 5,
    "tags": [
      "BFS",
      "priority",
      "simulation"
    ],
    "summary": "공격자/대상자 선정, 레이저 경로, 포탄 공격을 처리하는 복합 시뮬레이션입니다.",
    "signal": "CodeTree frequent-problems 삼성 SW 기출/유사 문제입니다. 원문 링크를 열어 조건을 확인한 뒤 상태·자료구조·턴 순서를 먼저 정리하세요.",
    "strategy": [
      "공격자/대상자 선정 기준을 tuple로 만듭니다.",
      "레이저 경로는 BFS로 복원합니다.",
      "레이저가 불가능하면 포탄 공격을 처리합니다.",
      "공격 관련 여부를 기록해 수리 단계를 처리합니다."
    ],
    "code": "# CodeTree 삼성 기출 풀이 시작 템플릿\nimport sys\nfrom collections import deque\ninput = sys.stdin.readline\n\n# 1. 입력 크기 확인\n# 2. 상태 변수 정리\n# 3. 한 턴/한 명령 처리 순서 주석 작성\n# 4. 필요한 자료구조 선택\n# 5. simulate() 또는 solve()로 분리\n",
    "problems": [
      {
        "platform": "CodeTree",
        "title": "포탑 부수기",
        "difficulty": "삼성 기출",
        "url": "https://www.codetree.ai/ko/frequent-problems/samsung-sw/problems/destroy-the-turret/description",
        "note": "CodeTree frequent-problems 삼성 SW"
      }
    ]
  },
  {
    "id": "santa-gift-factory",
    "title": "산타의 선물 공장",
    "category": "CodeTree 삼성 기출",
    "difficulty": "B형 기출",
    "level": 5,
    "tags": [
      "linked list",
      "hash",
      "factory"
    ],
    "summary": "벨트와 상자를 더블 링크드 리스트처럼 관리하는 B형 자료구조 문제입니다.",
    "signal": "CodeTree frequent-problems 삼성 SW 기출/유사 문제입니다. 원문 링크를 열어 조건을 확인한 뒤 상태·자료구조·턴 순서를 먼저 정리하세요.",
    "strategy": [
      "상자 id로 prev/nxt를 빠르게 찾습니다.",
      "벨트별 head/tail을 관리합니다.",
      "상자 제거는 O(1)로 처리합니다.",
      "벨트 고장/이동은 포인터 갱신으로 처리합니다."
    ],
    "code": "# CodeTree 삼성 기출 풀이 시작 템플릿\nimport sys\nfrom collections import deque\ninput = sys.stdin.readline\n\n# 1. 입력 크기 확인\n# 2. 상태 변수 정리\n# 3. 한 턴/한 명령 처리 순서 주석 작성\n# 4. 필요한 자료구조 선택\n# 5. simulate() 또는 solve()로 분리\n",
    "problems": [
      {
        "platform": "CodeTree",
        "title": "산타의 선물 공장",
        "difficulty": "B형 기출",
        "url": "https://www.codetree.ai/ko/frequent-problems/samsung-sw/problems/santa-gift-factory/description",
        "note": "CodeTree frequent-problems 삼성 SW"
      }
    ]
  },
  {
    "id": "santa-gift-factory-2",
    "title": "산타의 선물 공장 2",
    "category": "CodeTree 삼성 기출",
    "difficulty": "B형 기출",
    "level": 5,
    "tags": [
      "linked list",
      "belt",
      "hash"
    ],
    "summary": "공장/벨트 구조를 더 강하게 응용하는 B형 자료구조 문제입니다.",
    "signal": "CodeTree frequent-problems 삼성 SW 기출/유사 문제입니다. 원문 링크를 열어 조건을 확인한 뒤 상태·자료구조·턴 순서를 먼저 정리하세요.",
    "strategy": [
      "id→노드 조회 구조를 만듭니다.",
      "벨트별 연결 리스트를 관리합니다.",
      "앞/뒤 이동과 병합을 포인터로 처리합니다.",
      "명령별 head/tail 변화를 반드시 검증합니다."
    ],
    "code": "# CodeTree 삼성 기출 풀이 시작 템플릿\nimport sys\nfrom collections import deque\ninput = sys.stdin.readline\n\n# 1. 입력 크기 확인\n# 2. 상태 변수 정리\n# 3. 한 턴/한 명령 처리 순서 주석 작성\n# 4. 필요한 자료구조 선택\n# 5. simulate() 또는 solve()로 분리\n",
    "problems": [
      {
        "platform": "CodeTree",
        "title": "산타의 선물 공장 2",
        "difficulty": "B형 기출",
        "url": "https://www.codetree.ai/ko/frequent-problems/samsung-sw/problems/santa-gift-factory-2/description",
        "note": "CodeTree frequent-problems 삼성 SW"
      }
    ]
  },
  {
    "id": "magical-forest-exploration",
    "title": "마법의 숲 탐색",
    "category": "CodeTree 삼성 기출",
    "difficulty": "삼성 기출",
    "level": 5,
    "tags": [
      "simulation",
      "grid",
      "BFS"
    ],
    "summary": "골렘 이동과 정령 탐색을 처리하는 격자 시뮬레이션 문제입니다.",
    "signal": "CodeTree frequent-problems 삼성 SW 기출/유사 문제입니다. 원문 링크를 열어 조건을 확인한 뒤 상태·자료구조·턴 순서를 먼저 정리하세요.",
    "strategy": [
      "골렘의 하강/회전 가능 여부를 함수화합니다.",
      "골렘 위치와 출구 방향을 함께 관리합니다.",
      "정착 후 연결 영역 탐색은 BFS로 처리합니다.",
      "맵 밖 처리와 초기화 조건을 조심합니다."
    ],
    "code": "# CodeTree 삼성 기출 풀이 시작 템플릿\nimport sys\nfrom collections import deque\ninput = sys.stdin.readline\n\n# 1. 입력 크기 확인\n# 2. 상태 변수 정리\n# 3. 한 턴/한 명령 처리 순서 주석 작성\n# 4. 필요한 자료구조 선택\n# 5. simulate() 또는 solve()로 분리\n",
    "problems": [
      {
        "platform": "CodeTree",
        "title": "마법의 숲 탐색",
        "difficulty": "삼성 기출",
        "url": "https://www.codetree.ai/ko/frequent-problems/samsung-sw/problems/magical-forest-exploration/description",
        "note": "CodeTree frequent-problems 삼성 SW"
      }
    ]
  },
  {
    "id": "codetree-mon-bread",
    "title": "코드트리 빵",
    "category": "CodeTree 삼성 기출",
    "difficulty": "삼성 기출",
    "level": 4,
    "tags": [
      "BFS",
      "simulation",
      "tie-break"
    ],
    "summary": "사람 이동, 베이스캠프 선택, 편의점 도착 처리를 순서대로 구현하는 문제입니다.",
    "signal": "CodeTree frequent-problems 삼성 SW 기출/유사 문제입니다. 원문 링크를 열어 조건을 확인한 뒤 상태·자료구조·턴 순서를 먼저 정리하세요.",
    "strategy": [
      "매 분 사람 이동을 먼저 처리합니다.",
      "도착한 편의점은 즉시 막습니다.",
      "베이스캠프 선택은 BFS + 행/열 tie-break입니다.",
      "막힌 칸 배열을 별도로 관리합니다."
    ],
    "code": "# CodeTree 삼성 기출 풀이 시작 템플릿\nimport sys\nfrom collections import deque\ninput = sys.stdin.readline\n\n# 1. 입력 크기 확인\n# 2. 상태 변수 정리\n# 3. 한 턴/한 명령 처리 순서 주석 작성\n# 4. 필요한 자료구조 선택\n# 5. simulate() 또는 solve()로 분리\n",
    "problems": [
      {
        "platform": "CodeTree",
        "title": "코드트리 빵",
        "difficulty": "삼성 기출",
        "url": "https://www.codetree.ai/ko/frequent-problems/samsung-sw/problems/codetree-mon-bread/description",
        "note": "CodeTree frequent-problems 삼성 SW"
      }
    ]
  },
  {
    "id": "tail-catch-play",
    "title": "꼬리잡기놀이",
    "category": "CodeTree 삼성 기출",
    "difficulty": "삼성 기출",
    "level": 4,
    "tags": [
      "simulation",
      "team",
      "grid"
    ],
    "summary": "팀의 머리/꼬리 이동과 공 던지기 점수를 처리하는 격자 시뮬레이션입니다.",
    "signal": "CodeTree frequent-problems 삼성 SW 기출/유사 문제입니다. 원문 링크를 열어 조건을 확인한 뒤 상태·자료구조·턴 순서를 먼저 정리하세요.",
    "strategy": [
      "팀별 경로를 deque/list로 관리합니다.",
      "머리와 꼬리 방향 전환을 처리합니다.",
      "공이 닿는 첫 사람을 방향별로 탐색합니다.",
      "점수 계산 후 팀 방향을 뒤집습니다."
    ],
    "code": "# CodeTree 삼성 기출 풀이 시작 템플릿\nimport sys\nfrom collections import deque\ninput = sys.stdin.readline\n\n# 1. 입력 크기 확인\n# 2. 상태 변수 정리\n# 3. 한 턴/한 명령 처리 순서 주석 작성\n# 4. 필요한 자료구조 선택\n# 5. simulate() 또는 solve()로 분리\n",
    "problems": [
      {
        "platform": "CodeTree",
        "title": "꼬리잡기놀이",
        "difficulty": "삼성 기출",
        "url": "https://www.codetree.ai/ko/frequent-problems/samsung-sw/problems/tail-catch-play/description",
        "note": "CodeTree frequent-problems 삼성 SW"
      }
    ]
  },
  {
    "id": "battle-ground",
    "title": "싸움땅",
    "category": "CodeTree 삼성 기출",
    "difficulty": "삼성 기출",
    "level": 4,
    "tags": [
      "simulation",
      "heap",
      "priority"
    ],
    "summary": "플레이어 이동, 총 교체, 전투, 점수 계산을 처리하는 삼성식 구현 문제입니다.",
    "signal": "CodeTree frequent-problems 삼성 SW 기출/유사 문제입니다. 원문 링크를 열어 조건을 확인한 뒤 상태·자료구조·턴 순서를 먼저 정리하세요.",
    "strategy": [
      "칸마다 총을 max heap으로 관리합니다.",
      "플레이어 이동 후 총을 교체합니다.",
      "전투 기준을 tuple로 계산합니다.",
      "패자 이동 규칙을 별도 함수로 둡니다."
    ],
    "code": "# CodeTree 삼성 기출 풀이 시작 템플릿\nimport sys\nfrom collections import deque\ninput = sys.stdin.readline\n\n# 1. 입력 크기 확인\n# 2. 상태 변수 정리\n# 3. 한 턴/한 명령 처리 순서 주석 작성\n# 4. 필요한 자료구조 선택\n# 5. simulate() 또는 solve()로 분리\n",
    "problems": [
      {
        "platform": "CodeTree",
        "title": "싸움땅",
        "difficulty": "삼성 기출",
        "url": "https://www.codetree.ai/ko/frequent-problems/samsung-sw/problems/battle-ground/description",
        "note": "CodeTree frequent-problems 삼성 SW"
      }
    ]
  }
];
