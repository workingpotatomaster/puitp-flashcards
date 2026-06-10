interface Props {
  current: number;
  total: number;
  known: number;
}

export default function ProgressBar({ current, total, known }: Props) {
  const pct = total > 0 ? Math.round((current / total) * 100) : 0;
  const knownPct = total > 0 ? Math.round((known / total) * 100) : 0;

  return (
    <div className="w-full">
      {/* Stats row */}
      <div className="flex items-center justify-between mb-2.5">
        <div className="flex items-center gap-2">
          <span
            className="text-xs font-semibold tabular-nums"
            style={{ color: "var(--text-secondary)" }}
          >
            {current}
          </span>
          <span
            className="text-xs"
            style={{ color: "var(--text-muted)" }}
          >
            /
          </span>
          <span
            className="text-xs font-medium tabular-nums"
            style={{ color: "var(--text-muted)" }}
          >
            {total}
          </span>
          <span
            className="text-xs px-2 py-0.5 rounded-full tabular-nums ml-1"
            style={{
              background: "var(--accent-bg)",
              border: "1px solid var(--border)",
              color: "var(--accent)",
            }}
          >
            {pct}%
          </span>
        </div>

        {known > 0 && (
          <div
            className="flex items-center gap-1.5 text-xs font-medium"
            style={{ color: "var(--btn-know-text)" }}
          >
            <span
              className="inline-flex w-4 h-4 items-center justify-center rounded-full text-[10px] font-bold"
              style={{
                background: "var(--btn-know-bg)",
                border: "1px solid var(--btn-know-border)",
                color: "var(--btn-know-text)",
              }}
            >
              ✓
            </span>
            <span className="tabular-nums">{known} znam</span>
            <span style={{ color: "var(--text-muted)" }}>({knownPct}%)</span>
          </div>
        )}
      </div>

      {/* Main track */}
      <div
        className="w-full rounded-full overflow-hidden"
        style={{
          height: "6px",
          background: "var(--surface-subtle)",
        }}
      >
        <div
          className="progress-bar-fill"
          style={{ width: `${pct}%` }}
        />
      </div>

      {/* Known overlay bar */}
      {known > 0 && (
        <div
          className="w-full rounded-full overflow-hidden mt-1.5"
          style={{
            height: "3px",
            background: "var(--surface-subtle)",
          }}
        >
          <div
            className="progress-bar-known"
            style={{ width: `${knownPct}%` }}
          />
        </div>
      )}
    </div>
  );
}
