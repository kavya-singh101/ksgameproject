import type { GameState } from "../types";

export default function StatusBar({
  state,
  connected,
}: {
  state: GameState;
  connected: boolean;
}) {
  const turnLabel = state.currentTurn === "R" ? "Red" : "Yellow";
  const yourLabel =
    state.youAre === "R" ? "Red" : state.youAre === "Y" ? "Yellow" : "—";

  let statusText = "Waiting for opponent...";
  if (state.status === "playing") statusText = `Turn: ${turnLabel}`;
  if (state.status === "ended") {
    statusText =
      state.winner === "draw"
        ? "Draw!"
        : `Winner: ${state.winner === "R" ? "Red" : "Yellow"}`;
  }

  return (
    <div className="card">
      <div className="header">
        <h1>Four in a Row</h1>
        <span className="small">{connected ? "Connected" : "Disconnected"}</span>
      </div>
      <div className="kv">
        <div>Your disc</div>
        <div>{yourLabel}</div>
        <div>Opponent</div>
        <div>{state.opponent ?? "—"}</div>
        <div>Status</div>
        <div>{statusText}</div>
      </div>
    </div>
  );
}
