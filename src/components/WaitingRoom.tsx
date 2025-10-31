export default function WaitingRoom({ message }: { message?: string | null }) {
  return (
    <div className="card">
      <h2 style={{ marginTop: 0 }}>Waiting Room</h2>
      <p className="small">{message ?? "Looking for an opponent..."}</p>
    </div>
  );
}
