"use client";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState, useCallback } from "react";
import AuthGuard from "@/app/(auth)/AuthGuard";
import TaskGrid from "@/components/tasks/TaskGrid";
import TaskModal from "@/components/tasks/TaskModal";
import { TodoWithExtras } from "@/types/task";

export default function DashboardPage() {
  const { user, isLoaded } = useUser();
  const [ownTasks, setOwnTasks] = useState<TodoWithExtras[]>([]);
  const [sharedTasks, setSharedTasks] = useState<TodoWithExtras[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [selectedTask, setSelectedTask] = useState<TodoWithExtras | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterTag, setFilterTag] = useState<string | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Fetch tasks (own + shared)
  const fetchOwnTasks = useCallback(async () => {
    if (!user) return;
    try {
      const res = await fetch("/api/todos");
      if (!res.ok) return;
      const data: TodoWithExtras[] = await res.json();
      setOwnTasks(data);
    } catch (err) {
      console.error(err);
    }
  }, [user]);

  const fetchSharedTasks = useCallback(async () => {
    if (!user) return;
    try {
      const res = await fetch("/api/todos/shared");
      if (!res.ok) return setSharedTasks([]);
      const data: TodoWithExtras[] = await res.json();
      setSharedTasks(data);
    } catch (err) {
      console.error(err);
      setSharedTasks([]);
    }
  }, [user]);

  const fetchTasks = useCallback(async () => {
    if (!user) return;
    await Promise.all([fetchOwnTasks(), fetchSharedTasks()]);
  }, [fetchOwnTasks, fetchSharedTasks, user]);

  useEffect(() => {
    if (isLoaded && user) fetchTasks();
  }, [isLoaded, user, fetchTasks, refreshTrigger]);

  // global refresh trigger
  useEffect(() => {
    (window as any).refreshDashboardTasks = () => {
      setRefreshTrigger((prev) => prev + 1);
    };
    return () => {
      delete (window as any).refreshDashboardTasks;
    };
  }, []);

  // Update tags
  useEffect(() => {
    const allTasks = [...ownTasks, ...sharedTasks];
    setTags(Array.from(new Set(allTasks.flatMap((t) => t.tags ?? []))));
  }, [ownTasks, sharedTasks]);

  const handleTaskSaved = (savedTask: TodoWithExtras & { _deleted?: boolean }) => {
    if (savedTask._deleted) {
      setOwnTasks((prev) => prev.filter((t) => t.todo_id !== savedTask.todo_id));
      setSharedTasks((prev) => prev.filter((t) => t.todo_id !== savedTask.todo_id));
    } else {
      const isOwner = savedTask.user_id === user?.id;
      if (isOwner) {
        setOwnTasks((prev) => {
          const exists = prev.some((t) => t.todo_id === savedTask.todo_id);
          return exists
            ? prev.map((t) => (t.todo_id === savedTask.todo_id ? savedTask : t))
            : [savedTask, ...prev];
        });
      } else {
        setSharedTasks((prev) => {
          const exists = prev.some((t) => t.todo_id === savedTask.todo_id);
          return exists
            ? prev.map((t) => (t.todo_id === savedTask.todo_id ? savedTask : t))
            : [savedTask, ...prev];
        });
      }
    }
    setIsModalOpen(false);
  };

  const openTaskModal = (task?: TodoWithExtras) => {
    setSelectedTask(task ?? null);
    setIsModalOpen(true);
  };

  const allTasks = [...ownTasks, ...sharedTasks];
  const filteredTasks = filterTag
    ? allTasks.filter((t) => t.tags?.includes(filterTag))
    : allTasks;

  return (
    <AuthGuard>
      <div className="pt-20 px-6 pb-24 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-[#0F766E] mb-2">My Tasks</h1>
        <p className="text-gray-600 mb-6">
          Organize and manage your daily tasks efficiently
        </p>

        {/* Tag Filter */}
        {tags.length > 0 && (
          <div className="mb-6 flex gap-2 flex-wrap">
            <button
              onClick={() => setFilterTag(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium border ${
                filterTag === null
                  ? "bg-[#0F766E] text-white border-[#0F766E] shadow-md"
                  : "bg-white text-[#0F766E] border-[#0F766E] hover:bg-[#F0FDF4]"
              }`}
            >
              All
            </button>
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => setFilterTag(tag)}
                className={`px-4 py-2 rounded-full text-sm font-medium border ${
                  filterTag === tag
                    ? "bg-[#0F766E] text-white border-[#0F766E] shadow-md"
                    : "bg-white text-[#0F766E] border-[#0F766E] hover:bg-[#F0FDF4]"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        )}

        {/* Task Grid */}
        <TaskGrid tasks={filteredTasks} onSelect={openTaskModal} />

        {/* Add Task Button */}
        <button
          onClick={() => openTaskModal()}
          className="fixed bottom-6 right-6 bg-[#0F766E] text-white px-6 py-4 rounded-full shadow-lg hover:bg-[#115E59] flex items-center gap-2 font-medium z-50"
        >
          <span className="text-lg">+</span>
          <span className="hidden sm:inline">New Task</span>
        </button>

        {/* Task Modal */}
        {isModalOpen && (
          <TaskModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onTaskSaved={handleTaskSaved}
            onTaskDeleted={(todo_id) =>
              handleTaskSaved({ todo_id, _deleted: true } as TodoWithExtras & {
                _deleted: boolean;
              })
            }
            initialData={selectedTask ?? undefined}
            existingTags={tags}
          />
        )}
      </div>
    </AuthGuard>
  );
}
