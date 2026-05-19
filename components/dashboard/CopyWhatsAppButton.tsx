"use client";

import { useState } from "react";
import { Copy, Check, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface CopyWhatsAppButtonProps {
  message: string;
  phone?: string | null;
  label?: string;
  variant?: "copy" | "open";
}

export function CopyWhatsAppButton({
  message,
  phone,
  label = "Copiar mensaje WA",
  variant = "copy",
}: CopyWhatsAppButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(message);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (variant === "open" && phone) {
    const clean = phone.replace(/\D/g, "");
    const url = `https://wa.me/${clean}?text=${encodeURIComponent(message)}`;
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-xl bg-emerald-500/15 px-4 py-2.5 text-sm font-medium text-emerald-300 transition hover:bg-emerald-500/25"
      >
        <MessageCircle className="h-4 w-4" />
        Abrir en WhatsApp
      </a>
    );
  }

  return (
    <button
      onClick={handleCopy}
      className={cn(
        "inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition",
        copied
          ? "bg-emerald-500/15 text-emerald-300"
          : "bg-white/6 text-slate-300 hover:bg-white/10 hover:text-white"
      )}
    >
      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      {copied ? "¡Copiado!" : label}
    </button>
  );
}
