"use client";

import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Note } from "@/types/note";

export default function useNotes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [search, setSearch] = useState("");

  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const searchDebounceRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    fetchNotes();
  }, []);

  async function fetchNotes() {
    try {
      setLoading(true);

      const res = await axios.get("/api/notes");

      setNotes(res.data.notes);

      if (res.data.notes.length > 0) {
        setSelectedNote(res.data.notes[0]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function createNote() {
    try {
      const res = await axios.post("/api/notes", {
        title: "Untitled Note",
        content: "",
      });

      const note = res.data.note;

      setNotes((prev) => [note, ...prev]);

      setSelectedNote(note);
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteNote(id: string) {
    try {
      await axios.delete(`/api/notes/${id}`);

      const updated = notes.filter((note) => note.id !== id);

      setNotes(updated);

      if (selectedNote?.id === id) {
        setSelectedNote(updated[0] ?? null);
      }
    } catch (error) {
      console.log(error);
    }
  }

  function selectNote(note: Note) {
    setSelectedNote(note);
  }

  function updateTitle(title: string) {
    if (!selectedNote) return;

    const updatedNote = {
      ...selectedNote,
      title,
    };

    setSelectedNote(updatedNote);

    setNotes((prev) =>
      prev.map((note) =>
        note.id === updatedNote.id ? updatedNote : note
      )
    );

    autoSave(updatedNote);
  }

  function updateContent(content: string) {
    if (!selectedNote) return;

    const updatedNote = {
      ...selectedNote,
      content,
    };

    setSelectedNote(updatedNote);

    setNotes((prev) =>
      prev.map((note) =>
        note.id === updatedNote.id ? updatedNote : note
      )
    );

    autoSave(updatedNote);
  }

  function autoSave(note: Note) {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(async () => {
      try {
        setSaving(true);

        await axios.put(`/api/notes/${note.id}`, {
          title: note.title,
          content: note.content,
        });

        setNotes((prev) =>
          prev.map((n) =>
            n.id === note.id
              ? {
                  ...note,
                  updatedAt: new Date().toISOString(),
                }
              : n
          )
        );
      } catch (error) {
        console.log(error);
      } finally {
        setSaving(false);
      }
    }, 800);
  }

  function searchNotes(value: string) {
    setSearch(value);

    if (searchDebounceRef.current) {
      clearTimeout(searchDebounceRef.current);
    }

    if (value.trim() === "") {
      fetchNotes();
      return;
    }

    searchDebounceRef.current = setTimeout(async () => {
      try {
        const res = await axios.get(
          `/api/notes/search?q=${value}`
        );

        setNotes(res.data.searchResults);
      } catch (error) {
        console.log(error);
      }
    }, 300);
  }

  return {
    notes,
    selectedNote,
    loading,
    saving,
    search,

    fetchNotes,
    createNote,
    deleteNote,
    selectNote,
    updateTitle,
    updateContent,
    searchNotes,
  };
}