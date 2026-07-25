"use client";

import { BrainCircuit, Sparkles, BookOpen, MessageCircle } from "lucide-react";

interface AiPanelProps {
  loading: boolean;

  response: string;

  onSummarize: () => void;

  onExplain: () => void;

  onAsk: () => void;

  question: string;

  setQuestion: (value: string) => void;
}

export default function AiPanel({
  loading,
  response,
  onSummarize,
  onExplain,
  onAsk,
  question,
  setQuestion,
}: AiPanelProps) {
  return (
    <aside className="flex h-full w-90 flex-col border-l border-zinc-800 bg-zinc-950">
      {/* Header */}

      <div className="border-b border-zinc-800 p-6">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-violet-600 p-3">
            <BrainCircuit className="h-6 w-6 text-white" />
          </div>

          <div>
            <h2 className="font-semibold text-white">
              AI Assistant
            </h2>

            <p className="text-sm text-zinc-500">
              Powered by your Second Brain
            </p>
          </div>
        </div>
      </div>

      {/* AI Actions */}

      <div className="space-y-3 p-5">
        <button
          onClick={onSummarize}
          className="flex w-full items-center gap-3 rounded-xl border border-zinc-800 p-3 text-left transition hover:border-violet-500 hover:bg-zinc-900"
        >
          <Sparkles className="text-violet-400" />

          <div>
            <p className="font-medium text-white">
              Summarize
            </p>

            <p className="text-xs text-zinc-500">
              Generate a quick summary
            </p>
          </div>
        </button>

        <button
          onClick={onExplain}
          className="flex w-full items-center gap-3 rounded-xl border border-zinc-800 p-3 text-left transition hover:border-violet-500 hover:bg-zinc-900"
        >
          <BookOpen className="text-blue-400" />

          <div>
            <p className="font-medium text-white">
              Explain
            </p>

            <p className="text-xs text-zinc-500">
              Explain difficult concepts
            </p>
          </div>
        </button>
      </div>

      {/* Ask AI */}

      <div className="border-t border-zinc-800 p-5">
        <label className="mb-2 block text-sm text-zinc-400">
          Ask your notes
        </label>

        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          rows={3}
          placeholder="Ask anything..."
          className="w-full resize-none rounded-xl border border-zinc-800 bg-zinc-900 p-3 text-white outline-none focus:border-violet-500"
        />

        <button
          onClick={onAsk}
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 py-3 font-medium text-white transition hover:bg-violet-500"
        >
          <MessageCircle size={18} />

          Ask AI
        </button>
      </div>

      {/* Response */}

      <div className="flex-1 overflow-y-auto border-t border-zinc-800 p-5">
        <h3 className="mb-4 font-medium text-white">
          Response
        </h3>

        {loading ? (
          <div className="space-y-3">
            <div className="h-4 w-full animate-pulse rounded bg-zinc-800" />
            <div className="h-4 w-5/6 animate-pulse rounded bg-zinc-800" />
            <div className="h-4 w-3/4 animate-pulse rounded bg-zinc-800" />
          </div>
        ) : (
          <div className="whitespace-pre-wrap text-sm leading-7 text-zinc-300">
            {response ||
              "Select a note and use AI to summarize, explain or ask questions."}
          </div>
        )}
      </div>
    </aside>
  );
}