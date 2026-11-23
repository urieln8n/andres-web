"use client";

import type { CSSProperties } from "react";

type NodeTone = "cyan" | "violet" | "amber" | "emerald";

type NodeItem = {
  label: string;
  caption: string;
  style: CSSProperties;
  tone: NodeTone;
  delay: string;
};

const nodes: NodeItem[] = [
  {
    label: "IA",
    caption: "Responde",
    tone: "cyan",
    delay: "0s",
    style: { left: "12%", top: "19%" },
  },
  {
    label: "SEO",
    caption: "Atrae",
    tone: "emerald",
    delay: "0.8s",
    style: { right: "15%", top: "18%" },
  },
  {
    label: "CRM",
    caption: "Ordena",
    tone: "violet",
    delay: "1.4s",
    style: { right: "9%", top: "43%" },
  },
  {
    label: "WhatsApp",
    caption: "Convierte",
    tone: "emerald",
    delay: "2s",
    style: { left: "7%", top: "43%" },
  },
  {
    label: "Leads",
    caption: "Captación",
    tone: "cyan",
    delay: "2.6s",
    style: { left: "22%", bottom: "25%" },
  },
  {
    label: "Automatización",
    caption: "Seguimiento",
    tone: "amber",
    delay: "3.2s",
    style: { right: "12%", bottom: "25%" },
  },
];

const metrics = [
  {
    label: "Leads",
    value: "24/7",
    caption: "Captación siempre activa",
  },
  {
    label: "CRM",
    value: "360°",
    caption: "Pipeline comercial",
  },
  {
    label: "IA",
    value: "Auto",
    caption: "Respuesta y seguimiento",
  },
];

const toneClasses: Record<NodeTone, string> = {
  cyan: "border-cyan-300/25 text-cyan-100",
  violet: "border-violet-300/25 text-violet-100",
  amber: "border-amber-300/25 text-amber-100",
  emerald: "border-emerald-300/25 text-emerald-100",
};

const dotClasses: Record<NodeTone, string> = {
  cyan: "bg-cyan-300 shadow-cyan-300/60",
  violet: "bg-violet-300 shadow-violet-300/60",
  amber: "bg-amber-300 shadow-amber-300/60",
  emerald: "bg-emerald-300 shadow-emerald-300/60",
};

function PremiumNode({ item }: { item: NodeItem }) {
  return (
    <div
      className={[
        "ar-node absolute z-30 hidden rounded-2xl border bg-white/[0.075] px-4 py-3",
        "shadow-2xl shadow-black/25 backdrop-blur-xl sm:block",
        "transition duration-300 hover:-translate-y-1 hover:bg-white/[0.12]",
        toneClasses[item.tone],
      ].join(" ")}
      style={{
        ...item.style,
        animationDelay: item.delay,
      }}
    >
      <div className="flex items-center gap-2">
        <span
          className={[
            "h-2 w-2 rounded-full shadow-[0_0_18px]",
            dotClasses[item.tone],
          ].join(" ")}
        />
        <span className="text-sm font-semibold text-white">{item.label}</span>
      </div>

      <p className="mt-1 text-[11px] font-medium opacity-85">
        {item.caption}
      </p>
    </div>
  );
}

function MobileNodeList() {
  return (
    <div className="absolute left-4 right-4 top-4 z-30 grid grid-cols-3 gap-2 sm:hidden">
      {["IA", "SEO", "CRM", "Leads", "WhatsApp", "SaaS"].map((item, index) => (
        <div
          key={item}
          className="ar-mobile-chip rounded-2xl border border-white/10 bg-white/[0.08] px-3 py-2 text-center text-xs font-semibold text-white backdrop-blur-xl"
          style={{ animationDelay: `${index * 0.18}s` }}
        >
          {item}
        </div>
      ))}
    </div>
  );
}

function BackgroundLayer() {
  return (
    <>
      <div className="ar-aurora absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(142,166,255,0.22),transparent_34%),radial-gradient(circle_at_80%_10%,rgba(168,85,247,0.17),transparent_32%),radial-gradient(circle_at_50%_90%,rgba(251,191,36,0.10),transparent_34%)]" />

      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:44px_44px] opacity-25" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,transparent_0%,rgba(2,6,23,0.22)_55%,rgba(2,6,23,0.88)_100%)]" />

      <div className="ar-glow-one absolute left-1/2 top-[42%] h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/15 blur-3xl" />
      <div className="ar-glow-two absolute right-10 top-10 h-48 w-48 rounded-full bg-violet-500/10 blur-3xl" />
      <div className="ar-glow-three absolute bottom-8 left-8 h-48 w-48 rounded-full bg-amber-400/10 blur-3xl" />
    </>
  );
}

function ConnectionLines() {
  return (
    <>
      <div className="ar-line absolute left-[18%] top-1/2 hidden h-px w-[64%] bg-gradient-to-r from-transparent via-cyan-200/25 to-transparent sm:block" />
      <div className="ar-line-vertical absolute left-1/2 top-[18%] hidden h-[62%] w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-violet-200/20 to-transparent sm:block" />
      <div className="ar-line-diagonal absolute left-[22%] top-[28%] hidden h-px w-[56%] rotate-[14deg] bg-gradient-to-r from-transparent via-white/15 to-transparent sm:block" />
      <div className="ar-line-diagonal-reverse absolute left-[22%] bottom-[31%] hidden h-px w-[56%] -rotate-[14deg] bg-gradient-to-r from-transparent via-white/15 to-transparent sm:block" />
    </>
  );
}

function CentralOrb() {
  return (
    <div className="ar-orb absolute left-1/2 top-[46%] z-20 flex h-36 w-36 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/[0.07] shadow-2xl shadow-cyan-500/20 backdrop-blur-2xl sm:h-44 sm:w-44">
      <div className="ar-ring ar-ring-one absolute -inset-8 rounded-full border border-cyan-300/12" />
      <div className="ar-ring ar-ring-two absolute -inset-16 rounded-full border border-violet-300/12" />
      <div className="ar-ring ar-ring-three absolute -inset-24 rounded-full border border-amber-200/8" />

      <div className="absolute inset-3 rounded-full bg-[radial-gradient(circle_at_35%_25%,rgba(255,255,255,0.72),rgba(142,166,255,0.26)_34%,rgba(15,23,42,0.88)_76%)]" />
      <div className="absolute inset-7 rounded-full border border-white/15 bg-slate-950/45" />

      <div className="relative text-center">
        <p className="text-[10px] font-bold uppercase tracking-[0.42em] text-cyan-100/80">
          Sistema
        </p>
        <p className="mt-2 text-3xl font-semibold tracking-tight text-white">
          360
        </p>
        <p className="mt-1 text-[11px] font-medium text-slate-300">
          IA · SEO · CRM
        </p>
      </div>
    </div>
  );
}

function TopBar() {
  return (
    <div className="absolute left-5 right-5 top-5 z-30 hidden items-center justify-between rounded-2xl border border-white/10 bg-black/20 px-4 py-3 backdrop-blur-xl sm:flex">
      <div>
        <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-slate-400">
          Motor comercial
        </p>
        <p className="mt-1 text-sm font-semibold text-white">
          Captación + seguimiento + conversión
        </p>
      </div>

      <div className="flex items-center gap-2">
        <span className="ar-status-dot h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_18px] shadow-emerald-300/60" />
        <span className="text-xs font-semibold text-emerald-100">
          Sistema activo
        </span>
      </div>
    </div>
  );
}

function MetricCard({
  metric,
  index,
}: {
  metric: (typeof metrics)[number];
  index: number;
}) {
  return (
    <div
      className="ar-metric rounded-2xl border border-white/10 bg-white/[0.06] p-4 shadow-xl shadow-black/20 backdrop-blur-xl"
      style={{ animationDelay: `${index * 0.22}s` }}
    >
      <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-slate-400">
        {metric.label}
      </p>
      <p className="mt-2 text-2xl font-semibold tracking-tight text-white">
        {metric.value}
      </p>
      <p className="mt-1 text-xs leading-relaxed text-slate-300">
        {metric.caption}
      </p>
    </div>
  );
}

function BottomPanel() {
  return (
    <div className="absolute bottom-5 left-5 right-5 z-30 rounded-3xl border border-white/10 bg-black/35 p-4 shadow-2xl shadow-black/30 backdrop-blur-2xl">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {metrics.map((metric, index) => (
          <MetricCard key={metric.label} metric={metric} index={index} />
        ))}
      </div>
    </div>
  );
}

export function HeroScene3D() {
  return (
    <section
      aria-label="Sistema digital visual de IA, SEO, CRM y captación"
      className="relative h-[520px] w-full overflow-hidden rounded-[2rem] border border-white/15 bg-slate-950/75 shadow-2xl shadow-cyan-950/30 backdrop-blur-xl sm:h-[500px] lg:h-[520px]"
    >
      <BackgroundLayer />
      <TopBar />
      <MobileNodeList />
      <ConnectionLines />
      <CentralOrb />

      {nodes.map((item) => (
        <PremiumNode key={item.label} item={item} />
      ))}

      <BottomPanel />

      <div className="pointer-events-none absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />
      <div className="pointer-events-none absolute inset-y-10 right-0 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent" />

      <style>{`
        .ar-aurora {
          animation: arAurora 14s ease-in-out infinite alternate;
          transform-origin: center;
        }

        .ar-glow-one {
          animation: arGlowOne 9s ease-in-out infinite alternate;
        }

        .ar-glow-two {
          animation: arGlowTwo 11s ease-in-out infinite alternate;
        }

        .ar-glow-three {
          animation: arGlowThree 13s ease-in-out infinite alternate;
        }

        .ar-orb {
          animation: arOrb 6s ease-in-out infinite;
        }

        .ar-ring-one {
          animation: arRotate 18s linear infinite;
        }

        .ar-ring-two {
          animation: arRotateReverse 26s linear infinite;
        }

        .ar-ring-three {
          animation: arRotate 34s linear infinite;
        }

        .ar-node {
          animation: arFloat 7s ease-in-out infinite;
          will-change: transform;
        }

        .ar-mobile-chip {
          animation: arMobileChip 5.8s ease-in-out infinite;
          will-change: transform;
        }

        .ar-metric {
          animation: arMetric 6.5s ease-in-out infinite;
          will-change: transform;
        }

        .ar-status-dot {
          animation: arPulse 2.4s ease-in-out infinite;
        }

        .ar-line {
          animation: arLine 4.8s ease-in-out infinite;
        }

        .ar-line-vertical {
          animation: arLineVertical 5.2s ease-in-out infinite;
        }

        .ar-line-diagonal {
          animation: arLine 6s ease-in-out infinite;
        }

        .ar-line-diagonal-reverse {
          animation: arLine 6.4s ease-in-out infinite reverse;
        }

        @keyframes arAurora {
          0% {
            transform: scale(1) translate3d(0, 0, 0);
            opacity: 0.92;
          }
          100% {
            transform: scale(1.08) translate3d(-1.5%, 1%, 0);
            opacity: 1;
          }
        }

        @keyframes arGlowOne {
          0% {
            transform: translate3d(-50%, -50%, 0) scale(0.94);
            opacity: 0.65;
          }
          100% {
            transform: translate3d(-48%, -53%, 0) scale(1.1);
            opacity: 0.95;
          }
        }

        @keyframes arGlowTwo {
          0% {
            transform: translate3d(0, 0, 0) scale(0.95);
            opacity: 0.55;
          }
          100% {
            transform: translate3d(-12px, 18px, 0) scale(1.12);
            opacity: 0.85;
          }
        }

        @keyframes arGlowThree {
          0% {
            transform: translate3d(0, 0, 0) scale(0.9);
            opacity: 0.45;
          }
          100% {
            transform: translate3d(18px, -14px, 0) scale(1.08);
            opacity: 0.78;
          }
        }

        @keyframes arOrb {
          0%, 100% {
            transform: translate3d(-50%, -50%, 0) scale(1);
          }
          50% {
            transform: translate3d(-50%, -52%, 0) scale(1.035);
          }
        }

        @keyframes arRotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes arRotateReverse {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }

        @keyframes arFloat {
          0%, 100% {
            transform: translate3d(0, 0, 0);
          }
          50% {
            transform: translate3d(0, -10px, 0);
          }
        }

        @keyframes arMobileChip {
          0%, 100% {
            transform: translate3d(0, 0, 0);
          }
          50% {
            transform: translate3d(0, -4px, 0);
          }
        }

        @keyframes arMetric {
          0%, 100% {
            transform: translate3d(0, 0, 0);
          }
          50% {
            transform: translate3d(0, -5px, 0);
          }
        }

        @keyframes arPulse {
          0%, 100% {
            opacity: 0.65;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.25);
          }
        }

        @keyframes arLine {
          0%, 100% {
            opacity: 0.16;
          }
          50% {
            opacity: 0.55;
          }
        }

        @keyframes arLineVertical {
          0%, 100% {
            opacity: 0.12;
          }
          50% {
            opacity: 0.42;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .ar-aurora,
          .ar-glow-one,
          .ar-glow-two,
          .ar-glow-three,
          .ar-orb,
          .ar-ring,
          .ar-node,
          .ar-mobile-chip,
          .ar-metric,
          .ar-status-dot,
          .ar-line,
          .ar-line-vertical,
          .ar-line-diagonal,
          .ar-line-diagonal-reverse {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}

export default HeroScene3D;