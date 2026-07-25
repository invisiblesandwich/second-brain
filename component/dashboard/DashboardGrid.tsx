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
        title="AI Insights"
        description="Powered by your Second Brain"
        icon={Sparkles}
      >
        <div className="space-y-4">
          <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
            <h3 className="font-medium text-white">Today's Suggestion</h3>
            {insight.length > 0 ? (
              <p className="mt-2 text-sm text-zinc-400">{insight}</p>
            ) : (
              <p className="mt-2 text-sm text-zinc-400">
                You have unfinished tasks and upcoming events today. Consider
                reviewing your latest notes before starting.
              </p>
            )}
          </div>
        </div>
      </DashboardCard>
    </div>
  );
}
