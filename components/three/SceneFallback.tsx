export function SceneFallback() {
  return (
    <div className="premium-border spotlight-panel relative min-h-[390px] overflow-hidden rounded-[2rem] bg-white/[.05] shadow-premium sm:min-h-[420px]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(103,232,249,.26),transparent_24rem)]" />
      <div className="absolute left-1/2 top-[46%] h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-200/30 bg-cyan-200/10 shadow-glow" />
      <div className="absolute left-1/2 top-[46%] h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/20" />
      <div className="absolute left-1/2 top-[46%] h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10" />
      {["IA", "SEO", "CRM", "WhatsApp", "Leads", "Automatización", "SaaS"].map((item, index) => (
        <span
          key={item}
          className="absolute rounded-full border border-white/10 bg-white/[.08] px-4 py-2 text-xs font-semibold text-white backdrop-blur"
          style={{
            left: `${12 + (index % 4) * 23}%`,
            top: `${18 + Math.floor(index / 4) * 44}%`,
          }}
        >
          {item}
        </span>
      ))}
      <div className="absolute inset-x-8 bottom-8 rounded-2xl border border-white/10 bg-ink/70 p-4">
        <p className="text-sm text-slate-300">Sistema digital vivo: IA, SEO, CRM, automatización y captación conectados.</p>
      </div>
    </div>
  );
}
