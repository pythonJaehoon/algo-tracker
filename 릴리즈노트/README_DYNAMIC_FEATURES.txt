동적 기능 추가 패치

추가 기능:
1. BOJ 문제 난이도 자동 반영
   - BOJ URL에서 문제 번호를 추출합니다.
   - solved.ac 비공식 API /api/v3/problem/lookup 으로 난이도와 제목을 가져옵니다.
   - API 실패 시 기존 수동 난이도를 그대로 보여줍니다.

2. 문제 클릭 → Python 풀이 템플릿 펼침
   - 연결 문제 카드를 클릭하면 해당 패턴 태그에 맞는 Python 풀이 골격이 펼쳐집니다.
   - BFS / Dijkstra / 0-1 BFS / Segment Tree / Heap / DFS 등 기본 템플릿을 자동 선택합니다.

3. CodeTree 문제 카드 직접 추가
   - CodeTree 탭에서 제목/URL/태그/요약을 입력해 카드로 추가할 수 있습니다.
   - 추가한 카드는 브라우저 localStorage에 저장됩니다.

중요:
- 정적 Cloudflare Pages에서는 CodeTree 본문을 브라우저에서 직접 크롤링하기 어렵습니다.
- 그래서 본문 크롤링 대신 URL 기반 카드 추가 기능으로 구현했습니다.
- 진짜 자동 크롤링은 별도 GitHub Action 또는 서버리스 함수가 필요합니다.

적용 파일:
- src/App.jsx
- src/styles/unifiedSamsung.css

적용 방법:
1. 기존 src/App.jsx 백업
2. 이 ZIP의 src/App.jsx 덮어쓰기
3. src/styles/unifiedSamsung.css의 내용을 기존 파일 아래에 추가하거나 이 ZIP 파일로 덮어쓰기
4. 실행:
   npm run dev -- --force
5. 빌드:
   npm run build
