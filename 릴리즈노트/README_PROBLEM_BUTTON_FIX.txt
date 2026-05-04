연결 문제 버튼 UI 수정 패치

문제 원인:
- 연결 문제 카드가 <a> 구조에서 <div className="u-problem rich"> + <button className="u-problem-main"> 구조로 바뀌었는데
  기존 .u-problem CSS와 새 버튼 CSS가 충돌했습니다.

적용 방법:
1. 이 ZIP 안의 src/styles/problemButtonFix.css 내용을 복사합니다.
2. 기존 src/styles/unifiedSamsung.css 맨 아래에 붙여넣습니다.
3. 실행:
   npm run dev -- --force
4. 빌드:
   npm run build

덮어쓰기보다 '맨 아래 붙여넣기'를 추천합니다.
CSS는 아래쪽에 있는 규칙이 우선 적용됩니다.
