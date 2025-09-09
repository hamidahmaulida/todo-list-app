"use client"; 
import { useState, useEffect } from "react";
import TaskGrid from "@/components/tasks/TaskGrid";
import TaskModal from "@/components/tasks/TaskModal";
import { TodoWithExtras } from "@/types/task";

export default function DashboardPage() {
  const [tasks, setTasks] = useState<TodoWithExtras[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [selectedTask, setSelectedTask] = useState<TodoWithExtras | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterTag, setFilterTag] = useState<string | null>(null);

  const getToken = () =>
    localStorage.getItem("token") || sessionStorage.getItem("token");

  const fetchTasks = async () => {
    try {
      const token = getToken();
      if (!token) throw new Error("No token found");

      const res = await fetch("/api/todos", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch tasks");

      const data: TodoWithExtras[] = await res.json();

      const tasksWithShared = data.map((t) => ({
        ...t,
        shared: t.shared || false,
      }));

      setTasks(tasksWithShared);

      const uniqueTags = Array.from(
        new Set(tasksWithShared.flatMap((t) => t.tags || []))
      );
      setTags(uniqueTags);
    } catch (err) {
      console.error("Failed to fetch tasks:", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleTaskSaved = (savedTask: TodoWithExtras & { _deleted?: boolean }) => {
    if (savedTask._deleted) {
      setTasks((prev) => prev.filter((t) => t.todo_id !== savedTask.todo_id));
      return;
    }

    setTasks((prev) => {
      const exists = prev.some((t) => t.todo_id === savedTask.todo_id);
      if (exists)
        return prev.map((t) => (t.todo_id === savedTask.todo_id ? savedTask : t));
      return [savedTask, ...prev];
    });

    setTags((prev) => Array.from(new Set([...prev, ...(savedTask.tags || [])])));
    setSelectedTask(null);
    setIsModalOpen(false);
  };

  const openTaskModal = (task?: TodoWithExtras) => {
    setSelectedTask(task ?? null);
    setIsModalOpen(true);
  };

  const filteredTasks = filterTag
    ? tasks.filter((t) => t.tags?.includes(filterTag))
    : tasks;

  return (
    <div className="flex relative">
      <div className="flex-1">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-[#0F766E]">My Tasks</h1>
        </div>

        {tags.length > 0 && (
          <div className="flex gap-2 flex-wrap mb-4">
            <button
              onClick={() => setFilterTag(null)}
              className={`px-3 py-1 rounded-full text-sm border ${
                filterTag === null ? "bg-[#0F766E] text-white" : "bg-gray-100"
              }`}
            >
              All
            </button>
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => setFilterTag(tag)}
                className={`px-3 py-1 rounded-full text-sm border ${
                  filterTag === tag ? "bg-[#0F766E] text-white" : "bg-gray-100"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        )}

        <TaskGrid
          tasks={filteredTasks}
          onSelect={openTaskModal}
        />

        <button
          onClick={() => openTaskModal()}
          className="fixed bottom-6 right-6 bg-[#0F766E] text-white px-5 py-3 rounded-full shadow-lg hover:bg-[#115E59] transition"
        >
          + New Task
        </button>

        {isModalOpen && (
          <TaskModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onTaskSaved={handleTaskSaved}
            onTaskDeleted={(todo_id) => handleTaskSaved({ todo_id, _deleted: true } as any)}
            initialData={selectedTask ?? undefined}
            existingTags={tags}
            readOnly={selectedTask?.shared || false}
          />
        )}
      </div>
    </div>
  );
}
