"use client";

import { motion } from "framer-motion";
import { CalendarPlus, Plus } from "lucide-react";

interface EmptyEventProps {
  onCreate: () => void;
}

export default function EmptyEvent({
  onCreate,
}: EmptyEventProps) {
  return (
    <div className="flex flex-1 items-center justify-center bg-zinc-950 px-8">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="max-w-md text-center"
      >
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-3xl bg-violet-600/15">
          <CalendarPlus
            size={46}
            className="text-violet-400"
          />
        </div>

        <h2 className="mt-8 text-3xl font-bold text-white">
          No Event Selected
        </h2>

        <p className="mt-4 leading-7 text-zinc-400">
          Select an event from the sidebar or create a new event to
          manage your schedule.
        </p>

        <button
          onClick={onCreate}
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-violet-600 px-6 py-3 font-medium text-white transition hover:bg-violet-500"
        >
          <Plus size={18} />
          Create Event
        </button>
      </motion.div>
    </div>
  );
}