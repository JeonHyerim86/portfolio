import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/index.css'

// 새로고침(또는 재진입) 시 항상 페이지 최상단에서 시작한다.
// 1) 브라우저의 스크롤 위치 자동 복원을 끄고
// 2) URL 해시(#contact 등)가 남아 있으면 앵커 점프를 막기 위해 제거한 뒤
// 3) 최상단으로 이동.
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual'
}
if (window.location.hash) {
  history.replaceState(null, '', window.location.pathname + window.location.search)
}
window.scrollTo(0, 0)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
