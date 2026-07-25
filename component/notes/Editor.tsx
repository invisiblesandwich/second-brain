"use client";

import { FileText } from "lucide-react";
import EditorToolbar from "./EditorToolbar";

interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

interface EditorProps {
  note: Note;
  saving: boolean;

  onTitleChange: (title: string) => void;
  onContentChange: (content: string) => void;

  onDelete: () => void;
}

export default function Editor({
  note,
  saving,
  onTitleChange,
  onContentChange,
  onDelete,
}: EditorProps) {
  return (
    <section className="flex h-full flex-1 flex-col bg-zinc-950">
      <EditorToolbar
        saving={saving}
        updatedAt={note.updatedAt}
        onDelete={onDelete}
      />

      <div className="flex-1 overflow-y-auto px-12 py-10">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 flex items-center gap-3">
            <div className="rounded-xl bg-violet-600/20 p-3">
              <FileText className="h-6 w-6 text-violet-400" />
            </div>

            <div>
              <p className="text-sm text-zinc-500">Personal Knowledge Base</p>
            </div>
          </div>

          <input
            value={note.title}
            onChange={(e) => onTitleChange(e.target.value)}
            placeholder="Untitled Note"
            className="w-full border-none bg-transparent text-5xl font-bold text-white outline-none placeholder:text-zinc-600"
          />

          <textarea
            value={note.content}
            onChange={(e) => onContentChange(e.target.value)}
            placeholder="Start writing..."
            className="mt-10 min-h-175 w-full resize-none border-none bg-transparent text-lg leading-9 text-zinc-300 outline-none placeholder:text-zinc-600"
          />
        </div>
      </div>
    </section>
  );
}
