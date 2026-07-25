"use client";

import AiSidebar from "@/component/layout/AiSidebar";
import Sidebar from "@/component/layout/Sidebar";
import { useEffect, useState } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);

  // Restore sidebar state
  useEffect(() => {
    const saved = localStorage.getItem("sidebar-collapsed");

    if (saved) {
      setCollapsed(saved === "true");
    }
  }, []);

  // Save sidebar state
  useEffect(() => {
    localStorage.setItem("sidebar-collapsed", String(collapsed));
  }, [collapsed]);

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      <main
        className={`transition-all duration-300 ${
          collapsed ? "ml-23" : "ml-65"
        } overflow-y-auto p-4`}
      >
        {children}
      </main>
    </div>
  );
}
