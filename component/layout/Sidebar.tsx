"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";

import {
  BrainCircuit,
  LayoutDashboard,
  NotebookPen,
  CalendarDays,
  SquareCheckBig,
  Settings,
  LogOut,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import api from "@/lib/axios";

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: Dispatch<SetStateAction<boolean>>;
}

const workspace = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Notes",
    href: "/dashboard/notes",
    icon: NotebookPen,
  },
  {
    title: "Events",
    href: "/dashboard/events",
    icon: CalendarDays,
  },
  {
    title: "Tasks",
    href: "/dashboard/tasks",
    icon: SquareCheckBig,
  },
];

const account = [
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

export default function Sidebar({ collapsed, setCollapsed }: SidebarProps) {
  const pathname = usePathname();
  const Router = useRouter();

  async function handleLogout() {
    try {
      await api.post("/auth/logout");
      Router.push("/login");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <motion.aside
      animate={{
        width: collapsed ? 92 : 260,
      }}
      transition={{
        duration: 0.25,
      }}
      className="fixed left-0 top-0 z-50 flex h-screen flex-col border-r border-zinc-800 bg-zinc-900"
    >
      {/* Header */}

      <div className="border-b border-zinc-800 p-5">
        <div
          className={clsx(
            "flex items-center",
            collapsed ? "justify-center" : "justify-between",
          )}
        >
          {!collapsed ? (
            <>
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-violet-600 p-2">
                  <BrainCircuit className="h-6 w-6 text-white" />
                </div>

                <div>
                  <h1 className="font-semibold text-white">Second Brain</h1>

                  <p className="text-xs text-zinc-400">AI Workspace</p>
                </div>
              </div>

              <button
                onClick={() => setCollapsed(true)}
                className="rounded-lg p-2 transition hover:bg-zinc-800"
              >
                <PanelLeftClose size={18} className="text-zinc-400" />
              </button>
            </>
          ) : (
            <button
              onClick={() => setCollapsed(false)}
              className="rounded-2xl bg-violet-600 p-3 transition hover:bg-violet-500"
            >
              <PanelLeftOpen size={20} className="text-white" />
            </button>
          )}
        </div>
      </div>

      {/* Navigation */}

      <div className="flex-1 overflow-y-auto px-3 py-6">
        {!collapsed && (
          <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-widest text-zinc-500">
            Workspace
          </p>
        )}

        <div className="space-y-2">
          {workspace.map((item) => {
            const Icon = item.icon;

            const active = pathname === item.href;

            return (
              <Link key={item.href} href={item.href}>
                <motion.div
                  whileHover={{
                    x: collapsed ? 0 : 4,
                  }}
                  whileTap={{
                    scale: 0.98,
                  }}
                  className={clsx(
                    "group flex items-center rounded-xl transition-all duration-200",
                    collapsed ? "justify-center p-3" : "gap-3 px-4 py-3",
                    active
                      ? "bg-violet-600 text-white shadow-lg shadow-violet-500/20"
                      : "text-zinc-400 hover:bg-zinc-800 hover:text-white",
                  )}
                >
                  <Icon size={20} />

                  {!collapsed && (
                    <span className="text-sm font-medium">{item.title}</span>
                  )}
                </motion.div>
              </Link>
            );
          })}
        </div>

        <div className="my-8 border-t border-zinc-800" />

        {!collapsed && (
          <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-widest text-zinc-500">
            Account
          </p>
        )}

        <div className="space-y-2">
          {account.map((item) => {
            const Icon = item.icon;

            const active = pathname === item.href;

            return (
              <Link key={item.href} href={item.href}>
                <motion.div
                  whileHover={{
                    x: collapsed ? 0 : 4,
                  }}
                  whileTap={{
                    scale: 0.98,
                  }}
                  className={clsx(
                    "flex items-center rounded-xl transition-all",
                    collapsed ? "justify-center p-3" : "gap-3 px-4 py-3",
                    active
                      ? "bg-violet-600 text-white"
                      : "text-zinc-400 hover:bg-zinc-800 hover:text-white",
                  )}
                >
                  <Icon size={20} />

                  {!collapsed && (
                    <span className="text-sm font-medium">{item.title}</span>
                  )}
                </motion.div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Footer */}

      <div className="border-t border-zinc-800 p-3">
        <button
          onClick={handleLogout}
          className={clsx(
            "flex w-full items-center rounded-xl text-red-400 transition hover:bg-red-500 hover:text-white",
            collapsed ? "justify-center p-3" : "gap-3 px-4 py-3",
          )}
        >
          <LogOut size={20} />

          {!collapsed && <span className="text-sm font-medium">Logout</span>}
        </button>
      </div>
    </motion.aside>
  );
}
