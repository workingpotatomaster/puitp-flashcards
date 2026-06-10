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
      <div className="flex justify-between text-sm text-gray-500 mb-1.5">
        <span>
          {current} / {total}
        </span>
        {known > 0 && (
          <span className="text-green-600 font-medium">✓ {known} znam ({knownPct}%)</span>
        )}
      </div>
      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-indigo-400 rounded-full transition-all duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
