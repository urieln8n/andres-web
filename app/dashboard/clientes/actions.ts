"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { limpiarDestino, nuevoToken, slugify } from "@/lib/panel/datos";
import { limpiarDominio } from "@/lib/aeo/nota-publica";

// Cada acción comprueba la sesión del panel: una acción de servidor se puede llamar desde fuera.
function autorizado() {
  const esperado = process.env.ADMIN_DASHBOARD_PASSWORD;
  return Boolean(esperado && cookies().get("dashboard_auth")?.value === esperado);
}

export async function crearCliente(form: FormData) {
  if (!autorizado()) return;
  const nombre = String(form.get("nombre") || "").trim().slice(0, 80);
  const slug = slugify(String(form.get("slug") || "") || nombre);
  const dominio = limpiarDominio(String(form.get("dominio") || "")) || null;
  if (nombre.length < 2 || slug.length < 2) return;
  await getSupabaseAdmin()?.from("panel_clientes").insert({ nombre, slug, dominio, token: nuevoToken() });
  revalidatePath("/dashboard/clientes");
}

export async function crearEnlace(form: FormData) {
  if (!autorizado()) return;
  const cliente = String(form.get("cliente") || "");
  const etiqueta = String(form.get("etiqueta") || "").trim().slice(0, 60);
  const canal = slugify(String(form.get("canal") || "") || etiqueta, 30);
  const destino = limpiarDestino(String(form.get("destino") || ""));
  if (!cliente || !canal || !destino) return;
  await getSupabaseAdmin()?.from("panel_enlaces").upsert({ cliente, canal, etiqueta: etiqueta || canal, destino }, { onConflict: "cliente,canal" });
  revalidatePath("/dashboard/clientes");
}

export async function borrarEnlace(form: FormData) {
  if (!autorizado()) return;
  const id = Number(form.get("id"));
  if (!id) return;
  await getSupabaseAdmin()?.from("panel_enlaces").delete().eq("id", id);
  revalidatePath("/dashboard/clientes");
}

export async function cambiarActivo(form: FormData) {
  if (!autorizado()) return;
  const slug = String(form.get("slug") || "");
  const activo = form.get("activo") === "true";
  await getSupabaseAdmin()?.from("panel_clientes").update({ activo }).eq("slug", slug);
  revalidatePath("/dashboard/clientes");
}
