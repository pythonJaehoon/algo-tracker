# algo-tracker 기존 repo 병합 방법

이 ZIP은 기존 프로젝트를 덮어쓰는 완성본이 아니라, 기존 repo에 추가/병합하는 파일 묶음입니다.

## 1) 복사할 파일

아래 3개를 기존 repo에 그대로 복사하세요.

```txt
src/data/samsungProData.js
src/pages/SamsungProArchive.jsx
src/styles/samsungProArchive.css
```

기존 폴더가 없으면 `src/data`, `src/pages`, `src/styles`를 새로 만들면 됩니다.

## 2) App.jsx에 import 추가

```jsx
import SamsungProArchive from './pages/SamsungProArchive';
```

## 3-A) react-router-dom을 쓰는 경우

`<Routes>` 안에 추가:

```jsx
<Route path="/samsung-pro-archive" element={<SamsungProArchive />} />
```

메뉴 버튼 또는 링크:

```jsx
<Link to="/samsung-pro-archive">삼성 PRO 기출 저장소</Link>
```

## 3-B) 라우터 없이 state로 메뉴 전환하는 경우

기존 메뉴 배열에 추가:

```jsx
{ id: 'samsung-pro-archive', title: '삼성 PRO 기출 저장소' }
```

본문 렌더링 조건에 추가:

```jsx
{activeMenu === 'samsung-pro-archive' && <SamsungProArchive />}
```

## 4) 실행 확인

```bash
npm install
npm run dev
```

## 5) 빌드

```bash
npm run build
npm run preview
```

## 6) GitHub 반영

```bash
git add .
git commit -m "merge samsung pro archive page"
git push
```

## 포함 데이터

- 삼성 PRO 패턴 12개
- 백준 추천 문제 50개
- CodeTree 삼성 기출/유사 문제 18개
- 검색/탭/코드 펼침 기능

문제 원문은 복사하지 않고 링크와 분석 요약 중심으로 구성했습니다.
