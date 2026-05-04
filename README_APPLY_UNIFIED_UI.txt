적용 방법

1. 압축을 풉니다.

2. 기존 프로젝트의 아래 파일을 백업합니다.
   src/App.jsx
   src/App.css

3. 압축 안의 src/App.jsx를 기존 프로젝트 src/App.jsx에 덮어씁니다.

4. 압축 안의 src/styles/unifiedSamsung.css를 기존 프로젝트에 복사합니다.

5. package.json 있는 프로젝트 루트에서 실행합니다.

   npm run dev -- --force

6. 확인 후 빌드합니다.

   npm run build

주의:
- 이 버전은 기존 삼성 PRO 패턴, 삼성 Rich 아카이브, CodeTree 삼성 기출을 모두 같은 카드형 UI로 통일합니다.
- 기존 App.css에 의존하지 않도록 새 CSS 파일 하나로 구성했습니다.
- 기존 데이터가 App.jsx 안에 들어가 있던 구조를 기준으로, 통합 데이터 구조로 다시 만든 파일입니다.
