# Algo Tracker - More Patterns Build Fix

빌드 오류 `Unexpected end of file` 수정본입니다.

## 적용

```powershell
cd "C:\Users\kwon2\OneDrive\바탕 화면\algo-tracker-fixed"

Copy-Item "$env:USERPROFILE\Downloads\algo-tracker-pro-dashboard-more-patterns-buildfix\index.html" . -Force
Copy-Item "$env:USERPROFILE\Downloads\algo-tracker-pro-dashboard-more-patterns-buildfix\package.json" . -Force
Copy-Item "$env:USERPROFILE\Downloads\algo-tracker-pro-dashboard-more-patterns-buildfix\src\*" ".\src\" -Force

npm install
npm run build

git add .
git commit -m "fix more pro patterns build"
git push
```

## 추가 패턴

- 0-1 BFS
- Union-Find
- 세그먼트 트리
- 투 포인터 / 슬라이딩 윈도우
- 비트마스크 상태 압축
- DP + 상태 정의
