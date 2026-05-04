# Samsung Rich Archive Merge Guide

이 패키지는 `algo-tracker-rich-samsung-pro.zip`에 들어 있던 확장 데이터/페이지를 기존 GitHub repo에 병합하기 위한 파일입니다.

## 1) 복사할 파일

압축을 풀면 아래 파일이 있습니다. 기존 프로젝트 루트의 같은 위치로 복사하세요.

```txt
src/pages/SamsungRichArchive.jsx
src/styles/samsungRichArchive.css
```

## 2) lucide-react 설치

이 페이지는 아이콘에 `lucide-react`를 사용합니다. 기존 프로젝트 루트(package.json 있는 곳)에서 실행하세요.

```powershell
npm install lucide-react
```

## 3) App.jsx 연결

`src/App.jsx` 위쪽 import 영역에 추가:

```jsx
import SamsungRichArchive from './pages/SamsungRichArchive';
```

React Router를 쓰고 있으면 `<Routes>` 안에 추가:

```jsx
<Route path="/samsung-rich" element={<SamsungRichArchive />} />
```

메뉴 버튼이 있는 곳에는 예를 들어 아래처럼 추가:

```jsx
<button onClick={() => navigate('/samsung-rich')}>
  삼성 PRO 확장판
</button>
```

## 4) 로컬 확인

```powershell
npm install
npm run dev
```

브라우저에서:

```txt
http://localhost:5173/samsung-rich
```

## 5) 빌드

```powershell
npm run build
```

## 6) GitHub 반영

```powershell
git add .
git commit -m "add samsung rich archive page"
git push
```

## 포함 데이터

- CodeTree 삼성 기출/유사 분석 18개 이상
- 삼성 PRO 패턴 12개
- 백준 추천 문제 50개
- 검색 기능
- 태그 필터
- 5일 압축 로드맵
- Python 패턴 코드 템플릿
