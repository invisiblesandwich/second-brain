"use client";
import { motion } from "framer-motion";
import {
  CalendarDays,
  CheckCircle2,
  Clock,
  Loader2,
  Trash2,
} from "lucide-react";
import { Event } from "@/types/event";

interface EventEditorProps {
  event: Event;
  saving: boolean;

  onTitleChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;

  onStartTimeChange: (value: string) => void;
  onEndTimeChange: (value: string) => void;

  onDelete: () => void;
}

export default function EventEditor({
  event,
  saving,
  onTitleChange,
  onDescriptionChange,
  onStartTimeChange,
  onEndTimeChange,
  onDelete,
}: EventEditorProps) {
  return (
    <div className="flex flex-1 flex-col bg-zinc-950">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-zinc-800 px-8 py-5">
        <div className="text-sm text-zinc-500">
          {saving ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2 text-sm text-yellow-400"
            >
              <Loader2 className="h-4 w-4 animate-spin" />
              Saving...
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2 text-sm text-emerald-400"
            >
              <CheckCircle2 className="h-4 w-4" />
              Saved
            </motion.div>
          )}
        </div>

        <button
          onClick={onDelete}
          className="rounded-xl border border-red-500/20 p-2 text-red-400 transition hover:bg-red-500/10"
        >
          <Trash2 size={20} />
        </button>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto p-8">
        <input
          value={event.title}
          onChange={(e) => onTitleChange(e.target.value)}
          placeholder="Event title..."
          className="mb-8 w-full bg-transparent text-4xl font-bold text-white outline-none placeholder:text-zinc-600"
        />

        <div className="mb-8 grid grid-cols-2 gap-4">
          <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
            <div className="mb-2 flex items-center gap-2 text-zinc-400">
              <CalendarDays size={16} />
              <span className="text-sm">Start</span>
            </div>

            <input
              type="datetime-local"
              value={event.startTime}
              onChange={(e) => onStartTimeChange(e.target.value)}
              className="w-full bg-transparent text-white outline-none"
            />
          </div>

          <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
            <div className="mb-2 flex items-center gap-2 text-zinc-400">
              <Clock size={16} />
              <span className="text-sm">End</span>
            </div>

            <input
              type="datetime-local"
              value={event.endTime}
              onChange={(e) => onEndTimeChange(e.target.value)}
              className="w-full bg-transparent text-white outline-none"
            />
          </div>
        </div>

        <textarea
          value={event.description}
          onChange={(e) => onDescriptionChange(e.target.value)}
          placeholder="Describe your event..."
          className="h-125 w-full resize-none bg-transparent text-lg leading-8 text-zinc-300 outline-none placeholder:text-zinc-600"
        />
      </div>
    </div>
  );
}
