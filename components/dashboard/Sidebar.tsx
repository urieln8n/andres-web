"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  FileSearch,
  FileText,
  CalendarClock,
  LogOut,
  Zap,
  X,
  Menu,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { logoutAction } from "@/app/dashboard/actions";

const NAV = [
  { href: "/dashboard", label: "Resumen", icon: LayoutDashboard, exact: true },
  { href: "/dashboard/leads", label: "Leads", icon: Users },
  { href: "/dashboard/auditorias", label: "Auditorías", icon: FileSearch },
  { href: "/dashboard/propuestas", label: "Propuestas", icon: FileText },
  { href: "/dashboard/seguimientos", label: "Seguimientos", icon: CalendarClock },
];

function NavItem({
  href,
  label,
  icon: Icon,
  exact,
  onClick,
}: {
  href: string;
  label: string;
  icon: typeof LayoutDashboard;
  exact?: boolean;
  onClick?: () => void;
}) {
  const pathname = usePathname();
  const active = exact ? pathname === href : pathname.startsWith(href);
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
        active
          ? "bg-cyan-300/10 text-cyan-200"
          : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
      )}
    >
      <Icon className="h-4 w-4 shrink-0" />
      {label}
    </Link>
  );
}

function SidebarContent({ onClose }: { onClose?: () => void }) {
  return (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className="flex items-center justify-between px-4 py-5">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-gold/25 bg-gold/10">
            <Zap className="h-4 w-4 text-gold" />
          </div>
          <div className="leading-none">
            <p className="text-xs font-bold text-white">Growth Engine</p>
            <p className="text-[10px] text-slate-500">Panel interno</p>
          </div>
        </div>
        {onClose && (
          <button onClick={onClose} className="text-slate-500 hover:text-white lg:hidden">
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-0.5 px-3 py-2">
        {NAV.map((item) => (
          <NavItem key={item.href} {...item} onClick={onClose} />
        ))}
      </nav>

      {/* Logout */}
      <div className="border-t border-white/8 px-3 py-4">
        <form action={logoutAction}>
          <button
            type="submit"
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-500 transition-colors hover:bg-white/5 hover:text-red-300"
          >
            <LogOut className="h-4 w-4 shrink-0" />
            Cerrar sesión
          </button>
        </form>
      </div>
    </div>
  );
}

export function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed left-4 top-4 z-50 flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-ink text-slate-400 shadow-lg lg:hidden"
        aria-label="Abrir menú"
      >
        <Menu className="h-4 w-4" />
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 border-r border-white/8 bg-[#07091a] transition-transform duration-200 lg:hidden",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <SidebarContent onClose={() => setMobileOpen(false)} />
      </aside>

      {/* Desktop sidebar */}
      <aside className="hidden w-64 shrink-0 border-r border-white/8 bg-[#07091a] lg:block">
        <div className="sticky top-0 h-screen overflow-y-auto">
          <SidebarContent />
        </div>
      </aside>
    </>
  );
}
