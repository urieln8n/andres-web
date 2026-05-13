import { ArrowUpRight, MousePointer2, Sparkles } from "lucide-react";

export function HeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-xl">
      <div className="absolute -inset-10 rounded-full bg-cyan-400/10 blur-3xl" />
      <div className="premium-border relative overflow-hidden rounded-[2rem] bg-white/[.06] p-5 shadow-premium backdrop-blur">
        <div className="rounded-[1.5rem] border border-white/10 bg-ink/60 p-5">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <p className="text-sm text-slate-400">Sistema digital</p>
              <p className="font-semibold text-white">Web + IA + Leads</p>
            </div>
            <div className="rounded-full bg-cyan-300/10 px-3 py-1 text-xs text-cyan-200">LIVE</div>
          </div>
          <div className="relative mt-8 flex h-80 items-center justify-center overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-cyan-300/10 via-white/[.03] to-gold/10">
            <div className="orb-3d relative h-48 w-48 rounded-full border border-cyan-200/40 bg-cyan-300/10 shadow-glow">
              <div className="absolute inset-8 rounded-full border border-gold/40" />
              <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold shadow-[0_0_40px_rgba(245,199,118,.8)]" />
              <div className="absolute -right-6 top-1/2 rounded-2xl border border-white/10 bg-white/10 px-3 py-2 text-xs text-white backdrop-blur">
                SEO
              </div>
              <div className="absolute -left-8 top-10 rounded-2xl border border-white/10 bg-white/10 px-3 py-2 text-xs text-white backdrop-blur">
                CRM
              </div>
              <div className="absolute bottom-7 left-12 rounded-2xl border border-white/10 bg-white/10 px-3 py-2 text-xs text-white backdrop-blur">
                IA
              </div>
            </div>
          </div>
          <div className="mt-5 grid grid-cols-3 gap-3 text-xs text-slate-300">
            <div className="rounded-2xl bg-white/[.05] p-3"><Sparkles className="mb-2 h-4 w-4 text-gold" />Premium</div>
            <div className="rounded-2xl bg-white/[.05] p-3"><MousePointer2 className="mb-2 h-4 w-4 text-cyan-300" />Conversión</div>
            <div className="rounded-2xl bg-white/[.05] p-3"><ArrowUpRight className="mb-2 h-4 w-4 text-emerald-300" />Leads</div>
          </div>
        </div>
      </div>
    </div>
  );
}
