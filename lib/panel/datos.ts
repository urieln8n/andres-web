// Panel de clientes: lectura y escritura en Supabase (solo servidor).
import { randomBytes } from "node:crypto";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

export interface ClientePanel { slug: string; nombre: string; dominio: string | null; token: string; activo: boolean; creado: string }
export interface EnlacePanel { id: number; cliente: string; canal: string; etiqueta: string | null; destino: string }
export interface ClicPanel { creado: string; canal: string }

export const BASE = "https://www.andresrendon.com";
export const urlEnlace = (cliente: string, canal: string) => `${BASE}/r/${cliente}/${canal}`;
export const urlPanel = (token: string) => `${BASE}/panel/${token}`;
export const nuevoToken = () => randomBytes(18).toString("base64url");

export function slugify(v: string, max = 40) {
  return v.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, max);
}

/** Acepta «wa.me/34…», «www.web.es», «https://…». Devuelve https o null. */
export function limpiarDestino(v: string): string | null {
  let s = v.trim();
  if (!s) return null;
  if (!/^https?:\/\//i.test(s)) s = "https://" + s;
  s = s.replace(/^http:\/\//i, "https://");
  try {
    const u = new URL(s);
    return u.hostname.includes(".") ? u.toString() : null;
  } catch {
    return null;
  }
}

const db = () => getSupabaseAdmin();

export async function clientes(): Promise<ClientePanel[]> {
  const { data } = (await db()?.from("panel_clientes").select("slug,nombre,dominio,token,activo,creado").order("creado", { ascending: false })) || {};
  return (data as ClientePanel[]) || [];
}

export async function clientePorToken(token: string): Promise<ClientePanel | null> {
  if (!/^[A-Za-z0-9_-]{16,64}$/.test(token)) return null;
  const { data } = (await db()?.from("panel_clientes").select("slug,nombre,dominio,token,activo,creado").eq("token", token).maybeSingle()) || {};
  return (data as ClientePanel) || null;
}

export async function enlaces(cliente?: string): Promise<EnlacePanel[]> {
  let q = db()?.from("panel_enlaces").select("id,cliente,canal,etiqueta,destino").order("creado", { ascending: true });
  if (q && cliente) q = q.eq("cliente", cliente);
  const { data } = (await q) || {};
  return (data as EnlacePanel[]) || [];
}

export async function clics(cliente: string, dias = 62): Promise<ClicPanel[]> {
  const desde = new Date(Date.now() - dias * 86_400_000).toISOString();
  const { data } = (await db()?.from("panel_clics").select("creado,canal").eq("cliente", cliente).gte("creado", desde).order("creado", { ascending: false }).limit(20_000)) || {};
  return (data as ClicPanel[]) || [];
}

/** Para el enlace /r: destino del canal, solo si el cliente existe. */
export async function destinoDe(cliente: string, canal: string): Promise<string | null> {
  const { data } = (await db()?.from("panel_enlaces").select("destino").eq("cliente", cliente).eq("canal", canal).maybeSingle()) || {};
  return (data as { destino: string } | null)?.destino || null;
}

export async function apuntarClic(cliente: string, canal: string) {
  try { await db()?.from("panel_clics").insert({ cliente, canal }); } catch { /* nunca bloquea la redirección */ }
}

/** Resumen para el panel: este mes, mes anterior, por canal y por día (30 días). Horas de Madrid. */
export function resumir(lista: ClicPanel[]) {
  const ahora = new Date();
  const fmt = (d: Date) => d.toLocaleDateString("en-CA", { timeZone: "Europe/Madrid" }); // AAAA-MM-DD
  const mesActual = fmt(ahora).slice(0, 7);
  const anterior = new Date(ahora); anterior.setDate(1); anterior.setMonth(anterior.getMonth() - 1);
  const mesAnterior = fmt(anterior).slice(0, 7);
  let esteMes = 0, mesPasado = 0;
  const porCanal = new Map<string, number>();
  const porDia = new Map<string, number>();
  for (const c of lista) {
    const dia = fmt(new Date(c.creado));
    if (dia.startsWith(mesActual)) { esteMes++; porCanal.set(c.canal, (porCanal.get(c.canal) || 0) + 1); }
    else if (dia.startsWith(mesAnterior)) mesPasado++;
    porDia.set(dia, (porDia.get(dia) || 0) + 1);
  }
  const dias: { dia: string; n: number }[] = [];
  for (let i = 29; i >= 0; i--) { const d = fmt(new Date(Date.now() - i * 86_400_000)); dias.push({ dia: d, n: porDia.get(d) || 0 }); }
  return { esteMes, mesPasado, porCanal: [...porCanal.entries()].sort((a, b) => b[1] - a[1]), dias };
}
