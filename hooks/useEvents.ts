"use client";

import { useEffect, useRef, useState } from "react";
import api from "@/lib/axios";
import { Event } from "@/types/event";

export default function useEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchEvents();
  }, []);

  async function fetchEvents() {
    try {
      setLoading(true);

      const res = await api.get("/event");

      setEvents(res.data.Events);

      if (res.data.Events.length > 0) {
        setSelectedEvent(res.data.Events[0]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function createEvent() {
    try {
      const res = await api.post("/event", {
        title: "New Event",
        description: "",
        startTime: new Date().toISOString(),
        endTime: new Date().toISOString(),
      });

      const event = res.data.event;

      setEvents((prev) => [event, ...prev]);
      setSelectedEvent(event);
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteEvent(id: string) {
    try {
      await api.delete(`/event/${id}`);

      const updated = events.filter((event) => event.id !== id);

      setEvents(updated);

      if (selectedEvent?.id === id) {
        setSelectedEvent(updated[0] ?? null);
      }
    } catch (error) {
      console.log(error);
    }
  }
  function autoSave(event: Event) {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(async () => {
      try {
        setSaving(true);

        await api.put(`/event/${event.id}`, {
          title: event.title,
          description: event.description,
          startTime: event.startTime,
          endTime: event.endTime,
        });

        setEvents((prev) =>
          prev.map((e) =>
            e.id === event.id
              ? {
                  ...event,
                  updatedAt: new Date().toISOString(),
                }
              : e,
          ),
        );
      } catch (error) {
        console.log(error);
      } finally {
        setSaving(false);
      }
    }, 800);
  }
  function updateTitle(title: string) {
    if (!selectedEvent) return;

    const updatedEvent = {
      ...selectedEvent,
      title,
    };

    setSelectedEvent(updatedEvent);

    setEvents((prev) =>
      prev.map((event) =>
        event.id === updatedEvent.id ? updatedEvent : event,
      ),
    );

    autoSave(updatedEvent);
  }
  function updateDescription(description: string) {
    if (!selectedEvent) return;

    const updatedEvent = {
      ...selectedEvent,
      description,
    };

    setSelectedEvent(updatedEvent);

    setEvents((prev) =>
      prev.map((event) =>
        event.id === updatedEvent.id ? updatedEvent : event,
      ),
    );

    autoSave(updatedEvent);
  }
  function updateStartTime(startTime: string) {
    if (!selectedEvent) return;

    const updatedEvent = {
      ...selectedEvent,
      startTime,
    };

    setSelectedEvent(updatedEvent);

    setEvents((prev) =>
      prev.map((event) =>
        event.id === updatedEvent.id ? updatedEvent : event,
      ),
    );

    autoSave(updatedEvent);
  }
  function updateEndTime(endTime: string) {
    if (!selectedEvent) return;

    const updatedEvent = {
      ...selectedEvent,
      endTime,
    };

    setSelectedEvent(updatedEvent);

    setEvents((prev) =>
      prev.map((event) =>
        event.id === updatedEvent.id ? updatedEvent : event,
      ),
    );

    autoSave(updatedEvent);
  }

  async function searchEvents(value: string) {
    setSearch(value);

    if (value.trim() === "") {
      fetchEvents();
      return;
    }

    try {
      const res = await api.get(
        `/event/search?q=${encodeURIComponent(value)}`,
      );

      setEvents(res.data.searchResults);

      if (res.data.searchResults.length > 0) {
        setSelectedEvent(res.data.searchResults[0]);
      } else {
        setSelectedEvent(null);
      }
    } catch (error) {
      console.log(error);
    }
  }
  return {
    events,
    selectedEvent,

    loading,
    saving,

    searchEvents,
    search,

    fetchEvents,
    createEvent,
    deleteEvent,

    updateTitle,
    updateDescription,
    updateStartTime,
    updateEndTime,

    setSelectedEvent,
    setSearch,
  };
}
