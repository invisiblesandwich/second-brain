"use client";



import EmptyTask from "@/component/tasks/EmptyTask";
import TaskEditor from "@/component/tasks/TaskEditor";
import TaskSidebar from "@/component/tasks/TaskSidebar";
import useTasks from "@/hooks/useTasks";

export default function TasksPage() {
  const {
    tasks,
    selectedTask,
    loading,
    saving,

    search,
    searchTasks,

    createTask,
    deleteTask,

    updateTitle,
    updateDescription,
    updateDueDate,

    toggleCompleted,

    setSelectedTask,
  } = useTasks();

  return (
    <div className="flex h-[calc(100vh-2rem)] overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950">
      <TaskSidebar
        tasks={tasks}
        loading={loading}
        selectedTask={selectedTask}
        search={search}
        onSearch={searchTasks}
        onCreate={createTask}
        onSelect={setSelectedTask}
      />

      <div className="flex flex-1">
        {selectedTask ? (
          <TaskEditor
            task={selectedTask}
            saving={saving}
            onTitleChange={updateTitle}
            onDescriptionChange={updateDescription}
            onDueDateChange={updateDueDate}
            onToggleComplete={() =>
              toggleCompleted(selectedTask.id)
            }
            onDelete={() =>
              deleteTask(selectedTask.id)
            }
          />
        ) : (
          <EmptyTask
            onCreate={createTask}
          />
        )}
      </div>
    </div>
  );
}