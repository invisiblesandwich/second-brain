"use client";

import { motion } from "framer-motion";
import {
  CalendarDays,
  CheckCircle2,
  Circle,
  Loader2,
  Trash2,
} from "lucide-react";
import { Task } from "@/types/task";

interface TaskEditorProps {
  task: Task;
  saving: boolean;

  onTitleChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onDueDateChange: (value: string) => void;

  onToggleComplete: () => void;
  onDelete: () => void;
}

export function formatDateTimeLocal(date: string | Date) {
  return new Date(date).toISOString().slice(0, 16);
}

export default function TaskEditor({
  task,
  saving,
  onTitleChange,
  onDescriptionChange,
  onDueDateChange,
  onToggleComplete,
  onDelete,
}: TaskEditorProps) {
  console.log(task.id);
  return (
    <div className="flex h-full flex-1 flex-col bg-zinc-950">
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

        <div className="flex items-center gap-3">
          <button
            onClick={onToggleComplete}
            className={`rounded-xl border p-2 transition ${
              task.status === "DONE"
                ? "border-green-500 text-green-400 hover:bg-green-500/10"
                : "border-zinc-700 text-zinc-300 hover:border-green-500 hover:text-green-400"
            }`}
          >
            {task.status === "DONE" ? (
              <CheckCircle2 size={20} />
            ) : (
              <Circle size={20} />
            )}
          </button>

          <button
            onClick={onDelete}
            className="rounded-xl border border-red-500/20 p-2 text-red-400 transition hover:bg-red-500/10"
          >
            <Trash2 size={20} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-8">
        <input
          value={task.title}
          onChange={(e) => onTitleChange(e.target.value)}
          placeholder="Task title..."
          className="mb-6 w-full bg-transparent text-4xl font-bold text-white outline-none placeholder:text-zinc-600"
        />

        <div className="mb-8 flex items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3">
          <CalendarDays className="text-violet-400" size={18} />

          <input
            type="datetime-local"
            value={formatDateTimeLocal(task.dueDate ?? "")}
            onChange={(e) => onDueDateChange(e.target.value)}
            className="flex-1 bg-transparent text-sm text-white outline-none"
          />
        </div>

        <textarea
          value={task.description}
          onChange={(e) => onDescriptionChange(e.target.value)}
          placeholder="Write task details..."
          className="h-125 w-full resize-none bg-transparent text-lg leading-8 text-zinc-300 outline-none placeholder:text-zinc-600"
        />
      </div>
    </div>
  );
}
