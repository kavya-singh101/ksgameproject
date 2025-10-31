/* same content as described above */import { useCallback, useMemo, useState } from "react";
import useWebSocket from "react-use-websocket";
import type { ClientEvent, GameState, ServerEvent } from "../types";

const makeEmptyBoard = (): GameState["board"] =>
  Array.from({ length: 6 }, () => Array.from({ length: 7 }, () => null));

export function useGameSocket(username?: string) {
  const WS_URL = useMemo(() => {
    const base = "http://localhost:9090";
    return base.replace(/^http/i, "ws") + "/ws";
  }, []);

  const [connected, setConnected] = useState(false);
  const [waitingMessage, setWaitingMessage] = useState<string | null>(null);
  const [state, setState] = useState<GameState>({
    board: makeEmptyBoard(),
    currentTurn: "R",
    status: "waiting",
  });
  const [messages, setMessages] = useState<ServerEvent[]>([]);
  const [error, setError] = useState<string | null>(null);

  const queryString = username ? `?username=${encodeURIComponent(username)}` : "";
  const shouldConnect = !!username;

  const { sendJsonMessage, readyState } = useWebSocket<ServerEvent>(
    shouldConnect ? WS_URL + queryString : null,
    {
      share: false,
      onOpen: () => setConnected(true),
      onClose: () => setConnected(false),
      onError: () => setError("WebSocket failed. Check backend URL."),
      onMessage: (evt) => {
        try {
          const data = JSON.parse(evt.data) as ServerEvent;
          setMessages((m) => [...m.slice(-64), data]);
          if (data.type === "waiting") setWaitingMessage(data.message);
          if (data.type === "game_start" && data.state) setState(data.state);
          if (data.type === "game_start" && !data.state) {
            setState((s) => ({ ...s, status: "playing", youAre: data.youAre }));
          }
          if (
            data.type === "state" ||
            data.type === "move_made" ||
            data.type === "game_over"
          ) {
            setState(data.state);
          }
          if (data.type === "error") setError(data.message);
        } catch {
          console.warn("Non-JSON message:", evt.data);
        }
      },
      retryOnError: true,
      reconnectAttempts: 30,
      reconnectInterval: 1500,
    }
  );

  const sendMove = useCallback(
    (column: number) => {
      const msg: ClientEvent = { type: "move", column };
      sendJsonMessage(msg);
    },
    [sendJsonMessage]
  );

  const resetGame = useCallback(() => {
    const msg: ClientEvent = { type: "reset" };
    sendJsonMessage(msg);
  }, [sendJsonMessage]);

  return {
    connected,
    readyState,
    state,
    error,
    messages,
    waitingMessage,
    sendMove,
    resetGame,
  };
}
