export type Disc = 'R' | 'Y' | null
export type Board = Disc[][]
export type GameStatus = 'waiting' | 'playing' | 'ended'
export interface GameState {
  board: Board
  currentTurn: Disc
  status: GameStatus
  youAre?: Disc
  players?: string[]
  winner?: Disc | 'draw'
  winLine?: { r: number; c: number }[]
  opponent?: string
}
export type ServerEvent =
  | { type: 'waiting'; message: string }
  | { type: 'game_start'; youAre: Disc; opponent: string; players: string[]; state?: GameState }
  | { type: 'state'; state: GameState }
  | { type: 'move_made'; state: GameState }
  | { type: 'game_over'; state: GameState }
  | { type: 'error'; message: string }
export type ClientEvent =
  | { type: 'join'; username: string }
  | { type: 'move'; column: number }
  | { type: 'reset' }
export interface LeaderboardEntry {
  username: string
  wins: number
  losses: number
  draws: number
}
