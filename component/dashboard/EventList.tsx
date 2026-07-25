"use client";

import { motion } from "framer-motion";
import {
  CalendarDays,
  Clock3,
  Pencil,
  Trash2,
  MapPin,
} from "lucide-react";

export interface Event {
  id: string;
  title: string;
  description: string;
  startTime: string | Date;
  endTime: string | Date;
}

interface EventListProps {
  events: Event[];
  onOpen: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function EventList({
  events,
  onOpen,
  onEdit,
  onDelete,
}: EventListProps) {
  if (!events.length) {
    return (
      <div className="flex h-56 flex-col items-center justify-center rounded-xl border border-dashed border-zinc-700">
        <CalendarDays className="mb-3 h-10 w-10 text-zinc-500" />

        <p className="text-zinc-500">
          No upcoming events.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {events.slice(0, 5).map((event) => (
        <motion.div
          key={event.id}
          whileHover={{ y: -2 }}
          onClick={() => onOpen(event.id)}
          className="cursor-pointer rounded-xl border border-zinc-800 bg-zinc-900 p-4 transition hover:border-violet-500"
        >
          <div className="flex justify-between">
            <div className="min-w-0">
              <h3 className="truncate font-semibold text-white">
                {event.title}
              </h3>

              <p className="mt-2 line-clamp-2 text-sm text-zinc-400">
                {event.description}
              </p>

              <div className="mt-4 flex flex-wrap gap-4 text-xs text-zinc-500">
                <div className="flex items-center gap-1">
                  <Clock3 size={14} />

                  {new Date(event.startTime).toLocaleString()}
                </div>

                <div className="flex items-center gap-1">
                  <MapPin size={14} />

                  Ends{" "}
                  {new Date(event.endTime).toLocaleString()}
                </div>
              </div>
            </div>

            <div
              className="ml-3 flex gap-1"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => onEdit(event.id)}
                className="rounded-lg p-2 hover:bg-zinc-800"
              >
                <Pencil
                  size={16}
                  className="text-zinc-400"
                />
              </button>

              <button
                onClick={() => onDelete(event.id)}
                className="rounded-lg p-2 hover:bg-red-500"
              >
                <Trash2
                  size={16}
                  className="text-zinc-400"
                />
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}