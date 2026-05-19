interface SevenDayPlanItem {
  day?: number;
  title?: string;
  actions?: string[];
}

function normalizePlanItem(item: unknown, index: number): SevenDayPlanItem {
  if (typeof item === "string") {
    return { day: index + 1, title: item, actions: [] };
  }
  if (item && typeof item === "object") {
    return item as SevenDayPlanItem;
  }
  return { day: index + 1, title: "Acción pendiente", actions: [] };
}

export function SevenDayPlan({ plan }: { plan: unknown[] }) {
  const items = plan.map(normalizePlanItem);

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {items.map((item, index) => (
        <div key={`${item.day ?? index}-${item.title}`} className="rounded-xl border border-white/8 bg-white/[.03] p-4">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/8 text-xs font-semibold text-white">
              {item.day ?? index + 1}
            </span>
            <p className="text-sm font-semibold text-white">{item.title}</p>
          </div>
          {item.actions && item.actions.length > 0 && (
            <ul className="mt-3 space-y-1.5">
              {item.actions.map((action) => (
                <li key={action} className="text-sm leading-6 text-slate-400">
                  {action}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}
