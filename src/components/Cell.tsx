import { motion } from "framer-motion";
import type { Disc } from "../types";

export default function Cell({
  value,
  isWinning,
  onClick,
}: {
  value: Disc;
  isWinning: boolean;
  onClick: () => void;
}) {
  return (
    <div className="cell" onClick={onClick} role="button" aria-label="drop here">
      {value && (
        <motion.div
          className={`disc ${value}`}
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 250, damping: 18 }}
        />
      )}
      {isWinning && <div className="winRing" />}
    </div>
  );
}
