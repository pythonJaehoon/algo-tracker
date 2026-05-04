적용 방법

1. 압축을 풉니다.

2. 아래 파일을 기존 프로젝트에 그대로 복사/덮어쓰기 합니다.

src/App.jsx
src/pages/CodetreeSamsungArchive.jsx
src/styles/proTabs.css
src/styles/codetreeSamsungArchive.css

3. 기존 프로젝트에 이미 있어야 하는 파일

src/pages/SamsungRichArchive.jsx
src/App.css

4. 실행

npm run dev -- --force

5. 빌드

npm run build

중요:
이번 버전은 삼성 PRO 화면을 section/div로 감싸지 않습니다.
기존 삼성 PRO UI는 원래 App.css 그대로 사용하고, 탭 바만 위에 추가됩니다.
