import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";

export const metadata: Metadata = {
  title: "Dashboard · Growth Engine",
  robots: { index: false, follow: false },
};

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#050816]">
      <Sidebar />
      <main className="flex-1 overflow-x-hidden px-4 pb-12 pt-14 lg:px-8 lg:pt-8">
        {children}
      </main>
    </div>
  );
}
