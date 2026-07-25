"use client";

import { useEffect, useState } from "react";

import api from "@/lib/axios";

import { Note } from "@/types/note";
import { Task } from "@/types/task";
import { Event } from "@/types/event";

export default function useDashboard() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [insight,setInsight]=useState("");

  const [notesCount, setNotesCount] = useState(0);
  const [tasksCount, setTasksCount] = useState(0);
  const [eventsCount, setEventsCount] = useState(0);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
    fetchInsight();
  }, []);

  async function fetchDashboard() {
    try {
      setLoading(true);

      const res = await api.get("/dashboard");

      setNotes(res.data.recentNotes ?? []);
      setTasks(res.data.todayTasks ?? []);
      setEvents(res.data.todayEvents ?? []);

      setNotesCount(res.data.stats.notes);
      setEventsCount(res.data.stats.events);
      setTasksCount(res.data.stats.tasks);
    } catch (error) {
      console.error("Dashboard fetch failed:", error);
    } finally {
      setLoading(false);
    }
  }

  async function fetchInsight() {
    try {
      setLoading(true)

      const res=await api.get("/ai/insight")
     

      setInsight(res.data.insight);
      
    }catch (error) {
      console.error("Insite fetch failed:", error);
    } finally {
      setLoading(false);
    }
  }

  return {
    loading,
    notes,
    tasks,
    events,
    notesCount,
    tasksCount,
    eventsCount,
    insight,
    fetchDashboard,
    fetchInsight,
  };
}
