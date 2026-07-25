"use client";

import { CalendarDays, Plus, Search } from "lucide-react";

interface DashboardHeaderProps {
  title: string;
  description: string;
  onSearch?: (value: string) => void;
}

export default function DashboardHeader({
  title,
  description,
  onSearch,
}: DashboardHeaderProps) {
  return (
    <header className="mb-8 flex flex-col gap-6">
      {/* Title */}
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">
            {title}
          </h1>

          <div className="mt-2 flex items-center gap-2 text-sm text-zinc-400">
            <CalendarDays className="h-4 w-4" />
            <span>{description}</span>
          </div>
        </div>
      </div>

      {/* Search */}

      <div className="relative">
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-500" />

        <input
          placeholder="Search notes, tasks, events..."
          onChange={(e) => onSearch?.(e.target.value)}
          className="h-12 w-full rounded-xl border border-zinc-800 bg-zinc-900 pl-12 pr-4 text-sm text-white outline-none transition focus:border-violet-500"
        />
      </div>
    </header>
  );
}
