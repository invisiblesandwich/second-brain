"use client";

import { motion } from "framer-motion";
import {
  Plus,
  Search,
  CheckCircle2,
  Circle,
  CalendarDays,
} from "lucide-react";
import { Task } from "@/types/task";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

interface TaskSidebarProps {
  tasks: Task[];
  loading: boolean;
  selectedTask: Task | null;

  search: string;
  onSearch: (value: string) => void;

  onCreate: () => void;
  onSelect: (task: Task) => void;
}

export default function TaskSidebar({
  tasks,
  loading,
  selectedTask,
  search,
  onSearch,
  onCreate,
  onSelect,
}: TaskSidebarProps) {
  return (
    <aside className="flex w-80 flex-col border-r border-zinc-800 bg-zinc-950">
      {/* Header */}
      <div className="border-b border-zinc-800 p-5">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-white">Tasks</h2>
            <p className="text-sm text-zinc-500">
              {tasks.length} task{tasks.length !== 1 && "s"}
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
            placeholder="Search tasks..."
            className="w-full rounded-xl border border-zinc-800 bg-zinc-900 py-2 pl-10 pr-4 text-sm text-white outline-none transition focus:border-violet-500"
          />
        </div>
      </div>

      {/* Task List */}
      <div className="flex-1 overflow-y-auto p-3">
        {loading ? (
          <div className="space-y-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-20 animate-pulse rounded-xl bg-zinc-900"
              />
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {tasks.map((task) => (
              <motion.button
                key={task.id}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onSelect(task)}
                className={cn(
                  "w-full rounded-xl border p-4 text-left transition",
                  selectedTask?.id === task.id
                    ? "border-violet-500 bg-violet-500/10"
                    : "border-zinc-800 bg-zinc-900 hover:border-zinc-700"
                )}
              >
                <div className="flex items-start gap-3">
                  {task.status==="DONE" ? (
                    <CheckCircle2
                      size={20}
                      className="mt-0.5 text-green-400"
                    />
                  ) : (
                    <Circle
                      size={20}
                      className="mt-0.5 text-zinc-500"
                    />
                  )}

                  <div className="min-w-0 flex-1">
                    <h3
                      className={cn(
                        "truncate font-medium",
                        task.completed
                          ? "text-zinc-500 line-through"
                          : "text-white"
                      )}
                    >
                      {task.title}
                    </h3>

                    <p className="mt-1 line-clamp-2 text-sm text-zinc-500">
                      {task.description || "No description"}
                    </p>

                    {task.dueDate && (
                      <div className="mt-3 flex items-center gap-2 text-xs text-zinc-400">
                        <CalendarDays size={14} />
                        {new Date(task.dueDate).toLocaleDateString()}
                      </div>
                    )}
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