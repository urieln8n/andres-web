"use client";

import { useFormState, useFormStatus } from "react-dom";
import { loginAction } from "./actions";
import { Zap } from "lucide-react";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="mt-5 w-full rounded-full bg-white py-3.5 font-semibold text-ink transition hover:-translate-y-0.5 hover:bg-cyan-100 disabled:opacity-50"
    >
      {pending ? "Verificando…" : "Entrar al dashboard"}
    </button>
  );
}

export default function DashboardLoginPage() {
  const [state, action] = useFormState(
    async (_prev: { error?: string } | null, formData: FormData) => {
      return loginAction(formData);
    },
    null
  );

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-gold/25 bg-gold/10">
            <Zap className="h-7 w-7 text-gold" />
          </div>
          <p className="text-xs font-semibold uppercase tracking-widest text-gold">Growth Engine</p>
          <h1 className="mt-2 text-2xl font-semibold text-white">Dashboard interno</h1>
          <p className="mt-1 text-sm text-slate-400">Acceso restringido a Andrés Rendón</p>
        </div>

        <form action={action} className="rounded-[1.75rem] border border-white/10 bg-white/[.05] p-7 shadow-premium backdrop-blur">
          <label className="block">
            <span className="text-sm text-slate-400">Contraseña de acceso</span>
            <input
              name="password"
              type="password"
              required
              autoFocus
              placeholder="••••••••"
              className="mt-2 w-full rounded-2xl border border-white/10 bg-ink/70 px-4 py-3 text-white placeholder-slate-600 outline-none focus:border-cyan-300 focus:ring-0"
            />
          </label>

          {state?.error && (
            <p className="mt-3 rounded-xl bg-red-400/10 px-4 py-3 text-sm text-red-300">
              {state.error}
            </p>
          )}

          <SubmitButton />
        </form>

        <p className="mt-6 text-center text-xs text-slate-600">
          andresrendon.com · Panel privado
        </p>
      </div>
    </div>
  );
}
