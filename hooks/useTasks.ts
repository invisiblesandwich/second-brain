"use client";

import { useEffect, useRef, useState } from "react";
import api from "@/lib/axios";
import { Task } from "@/types/task";

export default function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const searchDebounceRef = useRef<NodeJS.Timeout | null>(null);

useEffect(() => {
  fetchTasks();

  return () => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    if (searchDebounceRef.current) {
      clearTimeout(searchDebounceRef.current);
    }
  };
}, []);

  async function fetchTasks() {
    try {
      setLoading(true);

      const res = await api.get("/task");

      setTasks(res.data.tasks);

      if (res.data.tasks.length > 0) {
        setSelectedTask(res.data.tasks[0]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function createTask() {
    try {
      const res = await api.post("/task", {
        title: "New Task",
        description: "",
        dueDate: null,
      });

      const task = res.data.task;

      setTasks((prev) => [task, ...prev]);

      setSelectedTask(task);
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteTask(id: string) {
    try {
      await api.delete(`/task/${id}`);

      const updated = tasks.filter((task) => task.id !== id);

      setTasks(updated);

      if (selectedTask?.id === id) {
        setSelectedTask(updated[0] ?? null);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function toggleCompleted(id: string) {
    const task = tasks.find((t) => t.id === id);

    if (!task) return;

    const updatedTask = {
      ...task,
      status: task.status === "DONE" ? "IN_PROGRESS" : "DONE",
    };

    setTasks((prev) => prev.map((t) => (t.id === id ? updatedTask : t)));

    if (selectedTask?.id === id) {
      setSelectedTask(updatedTask);
    }

    try {
      setSaving(true);

      const res = await api.put(`/task/${id}`, {
        title: updatedTask.title,
        description: updatedTask.description,
        dueDate: updatedTask.dueDate,
        status: updatedTask.status,
      });

      setTasks((prev) =>
        prev.map((t) => (t.id === id ? res.data.updatedTask : t)),
      );

      if (selectedTask?.id === id) {
        setSelectedTask(res.data.updatedTask);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSaving(false);
    }
  }

  async function searchTasks(value: string) {
    setSearch(value);

    if (searchDebounceRef.current) {
      clearTimeout(searchDebounceRef.current);
    }

    if (value.trim() === "") {
      fetchTasks();
      return;
    }

    searchDebounceRef.current = setTimeout(async () => {
      try {
        const res = await api.get(`/task/search?q=${value}`);

        setTasks(res.data.searchResults);
      } catch (error) {
        console.log(error);
      }
    }, 300);
  }

  function autoSave(task: Task) {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(async () => {
      try {
        setSaving(true);

        const res = await api.put(`/task/${task.id}`, {
          title: task.title,
          description: task.description,
          dueDate: task.dueDate,
          status: task.status,
        });

        setTasks((prev) =>
          prev.map((t) => (t.id === task.id ? res.data.updatedTask : t)),
        );
        setSelectedTask(res.data.updatedTask);
      } catch (error) {
        console.log(error);
      } finally {
        setSaving(false);
      }
    }, 800);
  }

  function updateTitle(title: string) {
    if (!selectedTask) return;

    const updatedTask = {
      ...selectedTask,
      title,
    };

    setSelectedTask(updatedTask);

    setTasks((prev) =>
      prev.map((task) => (task.id === updatedTask.id ? updatedTask : task)),
    );

    autoSave(updatedTask);
  }

  function updateDescription(description: string) {
    if (!selectedTask) return;

    const updatedTask = {
      ...selectedTask,
      description,
    };

    setSelectedTask(updatedTask);

    setTasks((prev) =>
      prev.map((task) => (task.id === updatedTask.id ? updatedTask : task)),
    );

    autoSave(updatedTask);
  }

  function updateDueDate(dueDate: string) {
    if (!selectedTask) return;

    const updatedTask = {
      ...selectedTask,
      dueDate,
    };

    setSelectedTask(updatedTask);

    setTasks((prev) =>
      prev.map((task) => (task.id === updatedTask.id ? updatedTask : task)),
    );

    autoSave(updatedTask);
  }

  return {
    tasks,
    selectedTask,
    loading,
    saving,

    search,
    searchTasks,
    updateTitle,
    updateDescription,
    updateDueDate,

    fetchTasks,
    createTask,
    deleteTask,
    toggleCompleted,
    setSelectedTask,
  };
}
