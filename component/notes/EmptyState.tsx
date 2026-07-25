"use client";

import { motion } from "framer-motion";
import { FilePlus2, Sparkles } from "lucide-react";

interface EmptyStateProps {
  onCreate: () => void;
}

export default function EmptyState({ onCreate }: EmptyStateProps) {
  return (
    <div className="flex h-full items-center justify-center bg-zinc-950 px-6">
      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.35,
        }}
        className="max-w-md text-center"
      >
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-3xl bg-violet-600/20">
          <Sparkles className="h-12 w-12 text-violet-400" />
        </div>

        <h2 className="mt-8 text-3xl font-bold text-white">
          Welcome to your Second Brain
        </h2>

        <p className="mt-4 leading-7 text-zinc-400">
          Capture ideas, organize knowledge, summarize notes with AI, and build
          your personal knowledge base.
        </p>

        <button
          onClick={onCreate}
          className="mt-10 inline-flex items-center gap-2 rounded-2xl bg-violet-600 px-6 py-3 font-medium text-white transition hover:bg-violet-500"
        >
          <FilePlus2 className="h-5 w-5" />
          Create Your First Note
        </button>
      </motion.div>
    </div>
  );
}
