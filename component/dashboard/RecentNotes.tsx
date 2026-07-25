"use client";

import { motion } from "framer-motion";
import { Clock3, FileText, Pencil, Trash2 } from "lucide-react";

export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string | Date;
  updatedAt: string | Date;
}

interface RecentNotesProps {
  notes: Note[];
  onOpen: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}

export default function RecentNotes({
  notes,
  onOpen,
  onDelete,
  onEdit,
}: RecentNotesProps) {
  if (notes.length === 0) {
    return (
      <div className="flex h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-700">
        <FileText className="mb-3 h-10 w-10 text-zinc-500" />

        <h3 className="text-lg font-medium text-white">
          No Notes Yet
        </h3>

        <p className="mt-2 text-sm text-zinc-500">
          Create your first note to start building your second brain.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {notes.slice(0, 5).map((note) => (
        <motion.div
          key={note.id}
          whileHover={{ y: -2 }}
          onClick={() => onOpen(note.id)}
          className="cursor-pointer rounded-xl border border-zinc-800 bg-zinc-900 p-4 transition hover:border-violet-500"
        >
          <div className="flex items-start justify-between">
            <div className="min-w-0">
              <h3 className="truncate font-semibold text-white">
                {note.title || "Untitled Note"}
              </h3>

              <p className="mt-2 line-clamp-2 text-sm text-zinc-400">
                {note.content || "No content"}
              </p>
            </div>

            <div
              className="ml-3 flex gap-2"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => onEdit(note.id)}
                className="rounded-lg p-2 text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
              >
                <Pencil size={16} />
              </button>

              <button
                onClick={() => onDelete(note.id)}
                className="rounded-lg p-2 text-zinc-400 transition hover:bg-red-500 hover:text-white"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2 text-xs text-zinc-500">
            <Clock3 size={14} />
            {new Date(note.updatedAt).toLocaleDateString()}
          </div>
        </motion.div>
      ))}
    </div>
  );
}