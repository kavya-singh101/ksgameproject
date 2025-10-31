import type { LeaderboardEntry } from "../types";

const mock: LeaderboardEntry[] = [
  { username: "Alice", wins: 12, losses: 4, draws: 1 },
  { username: "Bob", wins: 9, losses: 6, draws: 0 },
  { username: "You", wins: 0, losses: 0, draws: 0 },
];

export default function Leaderboard({ data = mock }: { data?: LeaderboardEntry[] }) {
  return (
    <div className="card">
      <div className="header">
        <h2 style={{ margin: 0 }}>Leaderboard</h2>
        <span className="small">demo</span>
      </div>
      <div style={{ display: "grid", gap: 8, fontSize: 14 }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 60px 60px 60px",
            gap: 8,
            color: "#a8b0c7",
          }}
        >
          <div>Player</div>
          <div>W</div>
          <div>L</div>
          <div>D</div>
        </div>
        {data.map((e) => (
          <div
            key={e.username}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 60px 60px 60px",
              gap: 8,
            }}
          >
            <div>{e.username}</div>
            <div>{e.wins}</div>
            <div>{e.losses}</div>
            <div>{e.draws}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
