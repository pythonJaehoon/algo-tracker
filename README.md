# Algo Tracker Clean PRO

패치 누적 문제를 제거한 깨끗한 버전입니다.

## 적용

```powershell
cd "C:\Users\kwon2\OneDrive\바탕 화면\algo-tracker-fixed"

Copy-Item "$env:USERPROFILE\Downloads\algo-tracker-clean-pro\index.html" . -Force
Copy-Item "$env:USERPROFILE\Downloads\algo-tracker-clean-pro\package.json" . -Force
Copy-Item "$env:USERPROFILE\Downloads\algo-tracker-clean-pro\src\*" ".\src\" -Force

npm install
npm run build
npm run dev
```

브라우저:
```text
http://localhost:5173
```

이번 버전은 패턴 데이터는 localStorage를 쓰지 않습니다.
풀이 체크만 localStorage에 저장합니다.
