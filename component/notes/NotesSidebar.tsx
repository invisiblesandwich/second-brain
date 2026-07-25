"use client";

import { motion } from "framer-motion";
import { FileText, Plus, Search, Clock3 } from "lucide-react";

export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

interface NotesSidebarProps {
  notes: Note[];
  selectedNote: Note | null;

  loading: boolean;
  search: string;

  onSearch: (value: string) => void;
  onCreate: () => void;
  onSelect: (note: Note) => void;
}

export default function NotesSidebar({
  notes,
  selectedNote,
  loading,
  search,
  onSearch,
  onCreate,
  onSelect,
}: NotesSidebarProps) {
  return (
    <aside className="flex h-full w-85 flex-col border-r border-zinc-800 bg-zinc-900">
      {/* Header */}

      <div className="border-b border-zinc-800 p-5">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-white">Notes</h1>

            <p className="text-sm text-zinc-500">{notes.length} Notes</p>
          </div>

          <button
            onClick={onCreate}
            className="rounded-xl bg-violet-600 p-3 transition hover:bg-violet-500"
          >
            <Plus className="h-5 w-5 text-white" />
          </button>
        </div>

        {/* Search */}

        <div className="relative mt-5">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />

          <input
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Search notes..."
            className="w-full rounded-xl border border-zinc-800 bg-zinc-950 py-3 pl-11 pr-4 text-sm text-white outline-none transition focus:border-violet-500"
          />
        </div>
      </div>

      {/* Notes */}

      <div className="flex-1 overflow-y-auto p-3">
        {loading ? (
          <div className="flex h-full items-center justify-center text-zinc-500">
            Loading...
          </div>
        ) : notes.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <FileText className="mb-3 h-10 w-10 text-zinc-600" />

            <h2 className="font-medium text-white">No Notes Found</h2>

            <p className="mt-2 text-sm text-zinc-500">
              Create your first note.
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {notes.map((note) => {
              const active = selectedNote?.id === note.id;

              return (
                <motion.button
                  key={note.id}
                  whileHover={{ x: 3 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onSelect(note)}
                  className={`w-full rounded-xl border p-4 text-left transition ${
                    active
                      ? "border-violet-500 bg-violet-600/15"
                      : "border-transparent hover:border-zinc-800 hover:bg-zinc-800"
                  }`}
                >
                  <h3 className="truncate font-medium text-white">
                    {note.title || "Untitled Note"}
                  </h3>

                  <p className="mt-2 line-clamp-2 text-sm text-zinc-400">
                    {note.content || "No content"}
                  </p>

                  <div className="mt-3 flex items-center gap-2 text-xs text-zinc-500">
                    <Clock3 className="h-3.5 w-3.5" />

                    {new Date(note.updatedAt).toLocaleDateString()}
                  </div>
                </motion.button>
              );
            })}
          </div>
        )}
      </div>
    </aside>
  );
}
