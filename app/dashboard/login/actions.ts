"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginAction(formData: FormData): Promise<{ error?: string }> {
  const password = (formData.get("password") as string | null) ?? "";
  const expected = process.env.ADMIN_DASHBOARD_PASSWORD;

  if (!expected) {
    return { error: "ADMIN_DASHBOARD_PASSWORD no está configurada en las variables de entorno." };
  }

  if (password !== expected) {
    return { error: "Contraseña incorrecta." };
  }

  cookies().set("dashboard_auth", expected, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 días
    path: "/",
  });

  redirect("/dashboard");
}

export async function logoutAction(): Promise<void> {
  cookies().delete("dashboard_auth");
  redirect("/dashboard/login");
}
