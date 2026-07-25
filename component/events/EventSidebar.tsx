"use client";

import { motion } from "framer-motion";
import {
  CalendarDays,
  Clock,
  Plus,
  Search,
} from "lucide-react";

import { Event } from "@/types/event";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

interface EventSidebarProps {
  events: Event[];
  loading: boolean;
  selectedEvent: Event | null;

  search: string;
  onSearch: (value: string) => void;

  onCreate: () => void;
  onSelect: (event: Event) => void;
}

export default function EventSidebar({
  events,
  loading,
  selectedEvent,
  search,
  onSearch,
  onCreate,
  onSelect,
}: EventSidebarProps) {
  return (
    <aside className="flex w-80 flex-col border-r border-zinc-800 bg-zinc-950">
      {/* Header */}
      <div className="border-b border-zinc-800 p-5">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-white">
              Events
            </h2>

            <p className="text-sm text-zinc-500">
              {events.length} event{events.length !== 1 && "s"}
            </p>
          </div>

          <button
            onClick={onCreate}
            className="rounded-xl bg-violet-600 p-2 text-white transition hover:bg-violet-500"
          >
            <Plus size={18} />
          </button>
        </div>

        <div className="relative">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
          />

          <input
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Search events..."
            className="w-full rounded-xl border border-zinc-800 bg-zinc-900 py-2 pl-10 pr-4 text-sm text-white outline-none transition focus:border-violet-500"
          />
        </div>
      </div>

      {/* Event List */}
      <div className="flex-1 overflow-y-auto p-3">
        {loading ? (
          <div className="space-y-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-24 animate-pulse rounded-xl bg-zinc-900"
              />
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {events.map((event) => (
              <motion.button
                key={event.id}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onSelect(event)}
                className={cn(
                  "w-full rounded-xl border p-4 text-left transition",
                  selectedEvent?.id === event.id
                    ? "border-violet-500 bg-violet-500/10"
                    : "border-zinc-800 bg-zinc-900 hover:border-zinc-700"
                )}
              >
                <h3 className="truncate font-medium text-white">
                  {event.title}
                </h3>

                <p className="mt-2 line-clamp-2 text-sm text-zinc-500">
                  {event.description || "No description"}
                </p>

                <div className="mt-4 flex items-center justify-between text-xs text-zinc-400">
                  <div className="flex items-center gap-1">
                    <CalendarDays size={14} />
                    {new Date(event.startTime).toLocaleDateString()}
                  </div>

                  <div className="flex items-center gap-1">
                    <Clock size={14} />
                    {new Date(event.startTime).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
}