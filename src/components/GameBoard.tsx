import type { GameState } from "../types";
import Cell from "./Cell";

export default function GameBoard({
  state,
  onColumnClick,
}: {
  state: GameState;
  onColumnClick: (col: number) => void;
}) {
  const rows = state.board.length;
  const cols = state.board[0]?.length ?? 7;

  const isWinning = (r: number, c: number) =>
    state.winLine?.some((p) => p.r === r && p.c === c) ?? false;

  return (
    <div className="card">
      <div className="header">
        <h2 style={{ margin: 0 }}>Game Board</h2>
        <span className="small">
          {rows}×{cols}
        </span>
      </div>
      <div className="board" style={{ ["--cols" as any]: cols, ["--rows" as any]: rows }}>
        {[...Array(rows)].map((_, r) =>
          [...Array(cols)].map((__, c) => {
            const handleClick = () => onColumnClick(c);
            return (
              <Cell
                key={`${r}-${c}`}
                value={state.board[r][c]}
                isWinning={isWinning(r, c)}
                onClick={handleClick}
              />
            );
          })
        )}
      </div>
    </div>
  );
}
