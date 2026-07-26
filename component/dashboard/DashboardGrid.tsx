"use client";

import {
  CalendarDays,
  NotebookPen,
  Sparkles,
  SquareCheckBig,
} from "lucide-react";

import DashboardCard from "./DashboardCard";
import RecentNotes, { Note } from "./RecentNotes";
import TaskList, { Task } from "./TaskList";
import EventList, { Event } from "./EventList";

interface DashboardGridProps {
  notes: Note[];
  tasks: Task[];
  events: Event[];
  insight: string;

  onOpenNote: (id: string) => void;
  onEditNote: (id: string) => void;
  onDeleteNote: (id: string) => void;

  onToggleTask: (id: string) => void;
  onEditTask: (id: string) => void;
  onDeleteTask: (id: string) => void;

  onOpenEvent: (id: string) => void;
  onEditEvent: (id: string) => void;
  onDeleteEvent: (id: string) => void;
  generateInsight: () => void;
}

export default function DashboardGrid({
  notes,
  tasks,
  events,
  insight,
  onOpenNote,
  onEditNote,
  onDeleteNote,
  onToggleTask,
  onEditTask,
  onDeleteTask,
  onOpenEvent,
  onEditEvent,
  onDeleteEvent,
  generateInsight,
}: DashboardGridProps) {
  return (
    <div className="grid gap-6 xl:grid-cols-2">
      {/* Recent Notes */}

      <DashboardCard
        title="Recent Notes"
        description="Recently updated notes"
        icon={NotebookPen}
        href="/dashboard/notes"
      >
        <RecentNotes
          notes={notes}
          onOpen={onOpenNote}
          onEdit={onEditNote}
          onDelete={onDeleteNote}
        />
      </DashboardCard>

      {/* Tasks */}

      <DashboardCard
        title="Today's Tasks"
        description="Stay productive"
        icon={SquareCheckBig}
        href="/dashboard/tasks"
      >
        <TaskList
          tasks={tasks}
          onToggle={onToggleTask}
          onEdit={onEditTask}
          onDelete={onDeleteTask}
        />
      </DashboardCard>

      {/* Events */}

      <DashboardCard
        title="Upcoming Events"
        description="Your schedule"
        icon={CalendarDays}
        href="/dashboard/events"
      >
        <EventList
          events={events}
          onOpen={onOpenEvent}
          onEdit={onEditEvent}
          onDelete={onDeleteEvent}
        />
      </DashboardCard>

      {/* AI Card */}

      <DashboardCard
        title="AI Assistant"
        description="Insights generated from your Second Brain"
        icon={Sparkles}
      >
        <div className="flex h-full flex-col gap-4">
          {insight ? (
            <>
              <div className="rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-500/10 to-zinc-900 p-5">
                <div className="mb-3 flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-violet-400" />
                  <h3 className="font-semibold text-white">Today's Insight</h3>
                </div>

                <p className="whitespace-pre-wrap text-sm leading-7 text-zinc-300">
                  {insight}
                </p>
              </div>

              <button
                onClick={generateInsight}
                className="mt-auto rounded-xl border border-zinc-700 py-2 text-sm font-medium text-zinc-300 transition hover:border-violet-500 hover:bg-violet-500/10 hover:text-violet-300"
              >
                ✨ Regenerate Insight
              </button>
            </>
          ) : (
            <div className="flex flex-1 flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-700 bg-zinc-900/50 px-6 py-10 text-center">
              <Sparkles className="mb-4 h-10 w-10 text-violet-400" />

              <h3 className="text-lg font-semibold text-white">
                No Insight Yet
              </h3>

              <p className="mt-2 max-w-sm text-sm leading-6 text-zinc-400">
                Generate an AI summary of your recent notes, today's tasks, and
                upcoming events whenever you need it.
              </p>

              <button
                onClick={generateInsight}
                className="mt-6 rounded-xl bg-violet-600 px-5 py-2.5 font-medium text-white transition hover:bg-violet-500"
              >
                ✨ Generate Insight
              </button>
            </div>
          )}
        </div>
      </DashboardCard>
    </div>
  );
}
