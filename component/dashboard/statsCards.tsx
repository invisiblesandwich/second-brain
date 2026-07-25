"use client";

import {
  FileText,
  CheckSquare,
  CalendarDays,
} from "lucide-react";

interface StatsCardsProps {
  notesCount: number;
  tasksCount: number;
  eventsCount: number;
}

export default function StatsCards({
  notesCount,
  tasksCount,
  eventsCount,
}: StatsCardsProps) {
  const stats = [
    {
      title: "Notes",
      value: notesCount,
      icon: FileText,
      color: "text-violet-400",
      bg: "bg-violet-500/10",
      border: "border-violet-500/30",
    },
    {
      title: "Tasks",
      value: tasksCount,
      icon: CheckSquare,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/30",
    },
    {
      title: "Events",
      value: eventsCount,
      icon: CalendarDays,
      color: "text-sky-400",
      bg: "bg-sky-500/10",
      border: "border-sky-500/30",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className={`rounded-2xl border ${item.border} bg-zinc-900 p-6 transition hover:-translate-y-1 hover:border-zinc-600`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-zinc-500">
                 Total {item.title}
                </p>

                <h2 className="mt-2 text-4xl font-bold text-white">
                  {item.value}
                </h2>
              </div>

              <div
                className={`rounded-2xl ${item.bg} p-4`}
              >
                <Icon className={item.color} size={28} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}