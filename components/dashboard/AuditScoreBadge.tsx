export function AuditScoreBadge({ score }: { score: number }) {
  const config =
    score >= 70
      ? {
          label: "Buen potencial",
          className: "border-emerald-300/25 bg-emerald-300/10 text-emerald-200",
          bar: "bg-emerald-300",
        }
      : score >= 40
        ? {
            label: "Mejorable",
            className: "border-amber-300/25 bg-amber-300/10 text-amber-200",
            bar: "bg-amber-300",
          }
        : {
            label: "Situación crítica",
            className: "border-red-300/25 bg-red-300/10 text-red-200",
            bar: "bg-red-300",
          };

  return (
    <div className={`rounded-2xl border p-4 ${config.className}`}>
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-widest opacity-75">Score general</p>
          <p className="mt-1 text-sm font-medium">{config.label}</p>
        </div>
        <p className="text-4xl font-semibold tabular-nums">{score}</p>
      </div>
      <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-black/25">
        <div className={`h-full rounded-full ${config.bar}`} style={{ width: `${score}%` }} />
      </div>
    </div>
  );
}
