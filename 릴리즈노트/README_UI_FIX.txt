적용 방법

1) 압축을 풉니다.

2) 아래 두 파일을 기존 프로젝트에 덮어쓰기 합니다.

src/styles/tabShell.css
src/styles/codetreeSamsungArchive.css

3) src/App.jsx에서 탭 껍데기 className이 아래처럼 되어 있는지 확인합니다.

<div className="algo-tab-shell">
  <div className="algo-tab-nav">
    ...
  </div>

  <div className={activeTab === "pro" ? "algo-tab-body pro-body" : "algo-tab-body archive-body"}>
    ...
  </div>
</div>

4) src/pages/CodetreeSamsungArchive.jsx 최상단 div className이 아래처럼 되어 있는지 확인합니다.

<div className="codetree-archive">

5) 실행

npm run dev -- --force

6) 빌드

npm run build
