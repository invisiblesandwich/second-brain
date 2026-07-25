"use client";

import { motion } from "framer-motion";
import {
  BrainCircuit,
  Sparkles,
  SendHorizontal,
  FileText,
  Lightbulb,
} from "lucide-react";

export default function AiSidebar() {
  return (
    <motion.aside
      initial={{ x: 50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="fixed right-0 top-0 flex h-screen w-85 flex-col border-l border-zinc-800 bg-zinc-900"
    >
      {/* Header */}

      <div className="border-b border-zinc-800 p-6">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-violet-600 p-2">
            <BrainCircuit className="h-5 w-5 text-white" />
          </div>

          <div>
            <h2 className="font-semibold text-white">AI Assistant</h2>

            <p className="text-xs text-zinc-400">
              Powered by your Second Brain
            </p>
          </div>
        </div>
      </div>

      {/* Chat */}

      <div className="flex-1 overflow-y-auto p-5 space-y-4">
        <div className="rounded-xl bg-zinc-800 p-4">
          <div className="mb-2 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-violet-400" />

            <span className="text-sm font-medium text-white">
              Quick Insight
            </span>
          </div>

          <p className="text-sm leading-6 text-zinc-400">
            Ask questions about your notes, summarize documents, explain
            difficult topics, or search your knowledge base.
          </p>
        </div>

        <div className="rounded-xl border border-zinc-800 p-4">
          <div className="mb-3 flex items-center gap-2">
            <Lightbulb className="h-4 w-4 text-yellow-400" />

            <span className="text-sm font-medium text-white">
              Suggested Prompts
            </span>
          </div>

          <div className="space-y-2">
            <button className="w-full rounded-lg bg-zinc-800 px-3 py-2 text-left text-sm text-zinc-300 transition hover:bg-zinc-700">
              Summarize my latest notes
            </button>

            <button className="w-full rounded-lg bg-zinc-800 px-3 py-2 text-left text-sm text-zinc-300 transition hover:bg-zinc-700">
              Explain React Server Components
            </button>

            <button className="w-full rounded-lg bg-zinc-800 px-3 py-2 text-left text-sm text-zinc-300 transition hover:bg-zinc-700">
              What tasks are due today?
            </button>
          </div>
        </div>

        <div className="rounded-xl border border-zinc-800 p-4">
          <div className="mb-3 flex items-center gap-2">
            <FileText className="h-4 w-4 text-blue-400" />

            <span className="text-sm font-medium text-white">
              Recent AI Activity
            </span>
          </div>

          <p className="text-sm text-zinc-500">No conversations yet.</p>
        </div>
      </div>

      {/* Input */}

      <div className="border-t border-zinc-800 p-5">
        <div className="flex gap-2">
          <input
            placeholder="Ask your Second Brain..."
            className="flex-1 rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-sm text-white outline-none focus:border-violet-500"
          />

          <button className="rounded-xl bg-violet-600 p-3 transition hover:bg-violet-500">
            <SendHorizontal className="h-5 w-5 text-white" />
          </button>
        </div>
      </div>
    </motion.aside>
  );
}
