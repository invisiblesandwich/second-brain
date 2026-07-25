"use client";



import useNotes from "@/hooks/useNotes";
import useAi from "@/hooks/useAi";
import NotesSidebar from "@/component/notes/NotesSidebar";
import Editor from "@/component/notes/Editor";
import EmptyState from "@/component/notes/EmptyState";
import AiPanel from "@/component/ai/AiPanel";

export default function NotesPage() {
  const notes = useNotes();
  const ai = useAi();

  return (
    <div className="flex h-[calc(100vh-2rem)] overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950">
      {/* Left Sidebar */}
      <NotesSidebar
        notes={notes.notes}
        selectedNote={notes.selectedNote}
        loading={notes.loading}
        search={notes.search}
        onSearch={notes.searchNotes}
        onCreate={notes.createNote}
        onSelect={notes.selectNote}
      />

      {/* Editor */}
      <div className="flex flex-1">
        {notes.selectedNote ? (
          <Editor
            note={notes.selectedNote}
            saving={notes.saving}
            onTitleChange={notes.updateTitle}
            onContentChange={notes.updateContent}
            onDelete={() =>
              notes.deleteNote(notes.selectedNote!.id)
            }
          />
        ) : (
          <EmptyState onCreate={notes.createNote} />
        )}
      </div>

      {/* AI */}
      <AiPanel
        loading={ai.loading}
        response={ai.response}
        question={ai.question}
        setQuestion={ai.setQuestion}
        onSummarize={() =>
          ai.summarize(notes.selectedNote?.content ?? "")
        }
        onExplain={() =>
          ai.explain(notes.selectedNote?.content ?? "")
        }
        onAsk={ai.askAi}
      />
    </div>
  );
}