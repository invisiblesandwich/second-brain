"use client";

import { motion } from "framer-motion";
import {
  Trash2,
  Loader2,
  CheckCircle2,
  Clock3,
  Sparkles,
  BookOpen,
  MessageSquare,
} from "lucide-react";

interface EditorToolbarProps {
  saving: boolean;
  updatedAt: string;

  onDelete: () => void;

  onSummarize?: () => void;
  onExplain?: () => void;
  onAskAi?: () => void;
}

export default function EditorToolbar({
  saving,
  updatedAt,
  onDelete,
  onSummarize,
  onExplain,
  onAskAi,
}: EditorToolbarProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-zinc-800 bg-zinc-950/80 px-8 backdrop-blur-xl">
      {/* Left */}

      <div className="flex items-center gap-5">
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

        <div className="flex items-center gap-2 text-xs text-zinc-500">
          <Clock3 className="h-4 w-4" />
          Updated {new Date(updatedAt).toLocaleString()}
        </div>
      </div>

      {/* Right */}

      <div className="flex shrink-0 items-center gap-2">
        <button
          onClick={onSummarize}
          className="flex items-center gap-2 rounded-xl border border-zinc-800 px-4 py-2 text-sm text-zinc-300 transition hover:border-violet-500 hover:bg-violet-500/10"
        >
          <Sparkles className="h-4 w-4" />
          Summarize
        </button>

        <button
          onClick={onExplain}
          className="flex items-center gap-2 rounded-xl border border-zinc-800 px-4 py-2 text-sm text-zinc-300 transition hover:border-violet-500 hover:bg-violet-500/10"
        >
          <BookOpen className="h-4 w-4" />
          Explain
        </button>

        <button
          onClick={onAskAi}
          className="flex h-10 items-center gap-2 whitespace-nowrap rounded-xl border border-zinc-800 px-4 text-sm text-zinc-300 transition hover:border-violet-500 hover:bg-violet-500/10"
        >
          <MessageSquare className="h-4 w-4" />
          Ask AI
        </button>

        <button
          onClick={onDelete}
          className="ml-2 rounded-xl bg-red-500/10 p-3 text-red-400 transition hover:bg-red-500 hover:text-white"
        >
          <Trash2 className="h-5 w-5" />
        </button>
      </div>
    </header>
  );
}
