import './App.css'

const patterns = [
  {
    title: "다익스트라 변형",
    quick5: "가중치 + 최단거리 → 다익스트라",
    quick30: "상태 추가해서 dist 확장 (k번째, 상태별)",
    code: `import heapq
def dijkstra(start):
    dist = [float('inf')] * (n+1)
    dist[start] = 0
    h = [(0, start)]
    while h:
        cost, now = heapq.heappop(h)
        if dist[now] < cost: continue
        for w, nxt in graph[now]:
            if dist[nxt] > cost + w:
                dist[nxt] = cost + w
                heapq.heappush(h, (dist[nxt], nxt))`
  },
  {
    title: "BFS + 상태",
    quick5: "방문 + 상태 있음 → 3차원 BFS",
    quick30: "visited[x][y][state] 구조",
    code: `from collections import deque
def bfs():
    q = deque()
    visited = [[[0]*k for _ in range(m)] for _ in range(n)]`
  },
  {
    title: "DFS + 백트래킹",
    quick5: "조합/탐색 → DFS",
    quick30: "가지치기 필수",
    code: `def dfs():
    if 조건:
        return
    for i in range(n):
        dfs()`
  }
]

function App() {

  const download = (text, name) => {
    const blob = new Blob([text])
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = name
    a.click()
  }

  return (
    <div className="container">
      <h1>오늘의 삼성 PRO 패턴</h1>

      <h2>📚 목차</h2>
      <ul>
        {patterns.map((p,i)=><li key={i}>{p.title}</li>)}
      </ul>

      {patterns.map((p,i)=>(
        <div key={i} className="card">
          <h2>{p.title}</h2>
          <p><b>5초 판단:</b> {p.quick5}</p>
          <p><b>30초 판단:</b> {p.quick30}</p>

          <button onClick={()=>download(p.code, p.title+".py")}>
            코드 다운로드
          </button>

          <pre>{p.code}</pre>
        </div>
      ))}
    </div>
  )
}

export default App