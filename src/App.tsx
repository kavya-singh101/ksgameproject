import { useState } from 'react'
import UsernameGate from './components/UsernameGate'
import StatusBar from './components/StatusBar'
import GameBoard from './components/GameBoard'
import Leaderboard from './components/Leaderboard'
import WaitingRoom from './components/WaitingRoom'
import { useGameSocket } from './hooks/useGameSocket'
import './styles.css'

export default function App() {
  const [username, setUsername] = useState<string | undefined>(undefined)
  const { state, connected, waitingMessage, sendMove, resetGame } = useGameSocket(username)

  const canPlay = state.status === 'playing'

  return (
    <div className="wrapper">
      {!username ? (
        <UsernameGate onSubmit={setUsername} />
      ) : (
        <div className="app">
          <div className="main">
            <StatusBar state={state} connected={connected} />
            <GameBoard state={state} onColumnClick={(c) => canPlay && sendMove(c)} />
            <div className="card">
              <div className="statusRow">
                <button className="btn" onClick={resetGame}>Request Rematch</button>
                <span className="small">Tip: Click any column to drop a disc.</span>
              </div>
            </div>
          </div>
          <div className="sidebar">
            {state.status === 'waiting' && <WaitingRoom message={waitingMessage} />}
            <Leaderboard />
            <div className="card">
              <h3 style={{ marginTop: 0 }}>Connection</h3>
              <p className="small">
                Backend: <code>{'http://localhost:9090'}</code>
              </p>
              <p className="small">
                WS path expected: <code>/ws?username=...</code>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
