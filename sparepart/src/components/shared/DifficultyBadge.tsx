interface Props {
  difficulty: "easy" | "medium" | "hard";
}

const CONFIG = {
  easy: {
    label: "Easy",
    bg: "#D8F5E0",
    text: "#1A7A3A",
  },
  medium: {
    label: "Medium",
    bg: "#FDE8CF",
    text: "#9A5A00",
  },
  hard: {
    label: "Hard",
    bg: "#F5D5D5",
    text: "#8A1A1A",
  },
};

export function DifficultyBadge({ difficulty }: Props) {
  const cfg = CONFIG[difficulty];
  return (
    <span
      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
      style={{ background: cfg.bg, color: cfg.text }}
    >
      <span>
        {difficulty === "easy" ? "🟢" : difficulty === "medium" ? "🟡" : "🔴"}
      </span>
      {cfg.label}
    </span>
  );
}
