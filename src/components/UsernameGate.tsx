import { useState } from "react";

export default function UsernameGate({ onSubmit }: { onSubmit: (u: string) => void }) {
  const [u, setU] = useState("");

  return (
    <div className="card" style={{ maxWidth: 520, margin: "0 auto" }}>
      <h2 style={{ marginTop: 0 }}>Enter a username</h2>
      <p className="small">You’ll be matched automatically. Keep this open.</p>
      <input
        className="input"
        placeholder="e.g. Alice"
        value={u}
        onChange={(e) => setU(e.target.value)}
      />
      <div style={{ height: 12 }} />
      <button className="btn" disabled={!u.trim()} onClick={() => onSubmit(u.trim())}>
        Continue
      </button>
    </div>
  );
}
