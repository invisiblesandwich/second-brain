"use client";

import { motion } from "framer-motion";
import {
  CalendarClock,
  CheckCircle2,
  Circle,
  Pencil,
  Trash2,
} from "lucide-react";

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string | Date | null;
  completed?: boolean;
}

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TaskList({
  tasks,
  onToggle,
  onEdit,
  onDelete,
}: TaskListProps) {
  if (!tasks.length) {
    return (
      <div className="flex h-56 items-center justify-center rounded-xl border border-dashed border-zinc-700 text-zinc-500">
        No tasks for today 🎉
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {tasks.slice(0, 5).map((task) => (
        <motion.div
          key={task.id}
          whileHover={{ x: 2 }}
          className="flex items-start justify-between rounded-xl border border-zinc-800 bg-zinc-900 p-4"
        >
          <div className="flex gap-3">
            <button
              onClick={() => onToggle(task.id)}
            >
              {task.completed ? (
                <CheckCircle2
                  className="text-emerald-500"
                  size={20}
                />
              ) : (
                <Circle
                  className="text-zinc-500"
                  size={20}
                />
              )}
            </button>

            <div>
              <h3
                className={`font-medium ${
                  task.completed
                    ? "line-through text-zinc-500"
                    : "text-white"
                }`}
              >
                {task.title}
              </h3>

              <p className="mt-1 text-sm text-zinc-400 line-clamp-2">
                {task.description}
              </p>

              {task.dueDate && (
                <div className="mt-3 flex items-center gap-2 text-xs text-zinc-500">
                  <CalendarClock size={14} />
                  {new Date(
                    task.dueDate
                  ).toLocaleDateString()}
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-1">
            <button
              onClick={() => onEdit(task.id)}
              className="rounded-lg p-2 hover:bg-zinc-800"
            >
              <Pencil
                size={16}
                className="text-zinc-400"
              />
            </button>

            <button
              onClick={() => onDelete(task.id)}
              className="rounded-lg p-2 hover:bg-red-500"
            >
              <Trash2
                size={16}
                className="text-zinc-400"
              />
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );
}