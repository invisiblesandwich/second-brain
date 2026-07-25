"use client";



import EmptyEvent from "@/component/events/EmptyEvent";
import EventEditor from "@/component/events/EventEditor";
import EventSidebar from "@/component/events/EventSidebar";
import useEvents from "@/hooks/useEvents";

export default function EventsPage() {
  const {
    events,
    selectedEvent,

    loading,
    saving,

    search,
    searchEvents,

    createEvent,
    deleteEvent,

    updateTitle,
    updateDescription,
    updateStartTime,
    updateEndTime,

    setSelectedEvent,
  } = useEvents();

  return (
    <div className="flex h-[calc(100vh-2rem)] overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950">
      <EventSidebar
        events={events}
        loading={loading}
        selectedEvent={selectedEvent}
        search={search}
        onSearch={searchEvents}
        onCreate={createEvent}
        onSelect={setSelectedEvent}
      />

      <div className="flex flex-1">
        {selectedEvent ? (
          <EventEditor
            event={selectedEvent}
            saving={saving}
            onTitleChange={updateTitle}
            onDescriptionChange={updateDescription}
            onStartTimeChange={updateStartTime}
            onEndTimeChange={updateEndTime}
            onDelete={() => deleteEvent(selectedEvent.id)}
          />
        ) : (
          <EmptyEvent onCreate={createEvent} />
        )}
      </div>
    </div>
  );
}