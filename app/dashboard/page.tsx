"use client";

import { useRouter } from "next/navigation";

import useDashboard from "@/hooks/useDashboard";
import DashboardHeader from "@/component/dashboard/DashbordHeader";
import DashboardGrid from "@/component/dashboard/DashboardGrid";
import StatsCards from "@/component/dashboard/statsCards";

export default function DashboardPage() {
  const router = useRouter();

  const dashboard = useDashboard();

  return (
    <div className="space-y-8">
      <DashboardHeader
        title="Dashboard"
        description="Everything important at a glance."
      />
      <StatsCards
        notesCount={dashboard.notesCount}
        tasksCount={dashboard.tasksCount}
        eventsCount={dashboard.eventsCount}
      />

      <DashboardGrid
        insight={dashboard.insight}
        generateInsight={dashboard.generateInsight}
        notes={dashboard.notes.slice(0, 5)}
        tasks={dashboard.tasks.slice(0, 5)}
        events={dashboard.events.slice(0, 5)}
        onOpenNote={(id) => router.push(`/dashboard/notes?id=${id}`)}
        onEditNote={(id) => router.push(`/dashboard/notes?id=${id}`)}
        onDeleteNote={(id) => {
          console.log("Delete Note", id);
        }}
        onToggleTask={(id) => {
          console.log("Toggle Task", id);
        }}
        onEditTask={(id) => router.push(`/dashboard/tasks?id=${id}`)}
        onDeleteTask={(id) => {
          console.log("Delete Task", id);
        }}
        onOpenEvent={(id) => router.push(`/dashboard/events?id=${id}`)}
        onEditEvent={(id) => router.push(`/dashboard/events?id=${id}`)}
        onDeleteEvent={(id) => {
          console.log("Delete Event", id);
        }}
      />
    </div>
  );
}
