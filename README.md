# Algo Tracker - PRO 카드형 패턴 + 문제 관리 UI

## 추가된 기능

- 카드형 패턴 메뉴
- 난이도 표시
- 백준 / 코드트리 / 프로그래머스 문제 링크 연결
- 문제 추가 / 삭제 관리 UI
- 패턴 삭제 버튼
- 패턴 / 문제명 검색
- 난이도 필터
- Python 코드 복사 버튼
- localStorage 저장 적용
- Top-K 유지 + 삭제/수정 Lazy Deletion 콘텐츠 포함
- K번째 최단경로, BFS 상태확장, DFS 가지치기, heap tuple, 외곽 BFS 콘텐츠 포함

## 적용 방법

기존 프로젝트 폴더:

```powershell
cd "C:\Users\kwon2\OneDrive\바탕 화면\algo-tracker\algo-tracker"
```

압축을 푼 뒤 아래 파일을 기존 프로젝트 루트에 덮어쓰세요.

```text
index.html
package.json
src/App.jsx
src/App.css
src/main.jsx
```

## PowerShell 복사 예시

압축 해제 폴더가 다운로드 폴더에 있다고 가정:

```powershell
Copy-Item "$env:USERPROFILE\Downloads\algo-tracker-pro-card-problems\index.html" . -Force
Copy-Item "$env:USERPROFILE\Downloads\algo-tracker-pro-card-problems\package.json" . -Force
Copy-Item "$env:USERPROFILE\Downloads\algo-tracker-pro-card-problems\src\*" ".\src\" -Force
```

## 빌드

```powershell
npm install
npm run build
```

## GitHub 반영

```powershell
git status
git add .
git commit -m "add pro pattern cards and problem manager"
git push
```

## Cloudflare Pages 확인

- Build command: `npm run build`
- Output directory: `dist`
- Root directory: 비워둠
- Production branch: `main`

업데이트가 안 보이면 캐시 무시 URL로 확인:

```text
https://algo-tracker.pages.dev/?v=pro-cards-1
```
