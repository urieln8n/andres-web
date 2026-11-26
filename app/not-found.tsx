import Link from "next/link";

export default function NoEncontrada() {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center px-5 pt-28 text-center">
      <p className="text-sm font-semibold uppercase tracking-[.2em] text-cyan-200">Error 404</p>
      <h1 className="mt-3 font-display text-4xl font-semibold text-white md:text-5xl">Esta página no existe</h1>
      <p className="mt-4 text-slate-300">Puede que el enlace esté mal escrito o que la página se haya movido.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className="focus-premium rounded-full bg-white px-6 py-3 text-sm font-semibold text-ink">Ir al inicio</Link>
        <Link href="/nota-ia" className="focus-premium rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white">¿Te ve ChatGPT? Compruébalo</Link>
      </div>
    </main>
  );
}
