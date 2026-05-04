정확도 수정 패치

적용 파일:
src/data/samsungUnifiedData.js

적용 방법:
1. 기존 프로젝트의 src/data/samsungUnifiedData.js를 백업합니다.
2. 이 ZIP 안의 src/data/samsungUnifiedData.js로 덮어씁니다.
3. 실행:
   npm run dev -- --force
4. 빌드:
   npm run build

수정 방향:
- 실제 문제와 맞지 않는 추정성 핵심 코드를 제거했습니다.
- 문제별 코드는 '정답 코드'가 아니라 '검증 가능한 알고리즘 골격'으로 바꿨습니다.
- CodeTree 문제는 원문 복사가 아니라 링크 + 풀이 전략 요약만 유지했습니다.
- 정확히 확인하기 어려운 문제는 임의 핵심 코드를 넣지 않았습니다.
