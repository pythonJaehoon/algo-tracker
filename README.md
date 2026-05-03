# Algo Tracker - More Patterns Click Fix

## 수정 내용

- 추가된 6개 패턴 클릭 시 상세 내용이 안 보이던 문제 수정
- `mergePatterns()`를 수정해 기존 localStorage 데이터와 새 패턴 상세 데이터를 안전하게 병합
- 기존 기능 유지: 오늘의 문제, 풀이 체크, 플랫폼 필터, 문제 추가/삭제, 통계 대시보드

## 추가 패턴

- 0-1 BFS
- Union-Find
- 세그먼트 트리
- 투 포인터 / 슬라이딩 윈도우
- 비트마스크 상태 압축
- DP + 상태 정의

## 적용

```powershell
cd "C:\Users\kwon2\OneDrive\바탕 화면\algo-tracker-fixed"

Copy-Item "$env:USERPROFILE\Downloads\algo-tracker-pro-dashboard-more-patterns-clickfix\index.html" . -Force
Copy-Item "$env:USERPROFILE\Downloads\algo-tracker-pro-dashboard-more-patterns-clickfix\package.json" . -Force
Copy-Item "$env:USERPROFILE\Downloads\algo-tracker-pro-dashboard-more-patterns-clickfix\src\*" ".\src\" -Force

npm install
npm run build
```

## GitHub 반영

```powershell
git status
git add .
git commit -m "fix more pattern card detail rendering"
git push
```

## 그래도 안 보이면

브라우저 우측 상단의 `초기화` 버튼을 한 번 누르세요.
