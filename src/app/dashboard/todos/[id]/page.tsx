"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useUser, useAuth } from "@clerk/nextjs";
import TaskForm from "@/components/tasks/TaskForm";
import { TodoWithExtras } from "@/types/task";

export default function TaskDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { user, isLoaded } = useUser();
  const { getToken } = useAuth();
  const id = params?.id as string;

  const [task, setTask] = useState<TodoWithExtras | null>(null);
  const [charCount, setCharCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // Redirect if not authenticated
  useEffect(() => {
    if (isLoaded && !user) {
      router.push('/login');
    }
  }, [isLoaded, user, router]);

  // Fetch task
  useEffect(() => {
    const fetchTask = async () => {
      if (!user || !id) return;

      setLoading(true);
      try {
        const token = await getToken({ template: "supabase" });
        const res = await fetch(`/api/todos/${id}`, {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          if (res.status === 401) router.push('/login');
          else if (res.status === 404) router.push('/dashboard');
          else throw new Error("Failed to fetch task");
        } else {
          const data = await res.json();
          setTask(data);
        }
      } catch (err) {
        console.error(err);
        router.push('/dashboard');
      } finally {
        setLoading(false);
      }
    };

    if (isLoaded && user && id) fetchTask();
  }, [id, user, isLoaded, router, getToken]);

  // Handle update task
  const handleSave = async (data: Partial<TodoWithExtras>) => {
    if (!id || !user) return;

    try {
      const token = await getToken({ template: "supabase" });
      const res = await fetch(`/api/todos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to save task");
      const updatedTask = await res.json();
      setTask(updatedTask);
    } catch (err) {
      console.error(err);
      alert("Failed to save task. Please try again.");
    }
  };

  // Handle delete task
  const handleDelete = async () => {
    if (!id || !user) return;

    try {
      const token = await getToken({ template: "supabase" });
      const res = await fetch(`/api/todos/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to delete task");
      }

      alert("Todo deleted successfully");
      router.push("/dashboard");
    } catch (error) {
      console.error("Error deleting task:", error);
      alert("Failed to delete task. Please try again.");
    }
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-[#F9FAFB] flex justify-center items-center">
        <div className="text-[#0F766E] font-medium">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#F9FAFB] flex justify-center items-center">
        <div className="text-[#0F766E] font-medium">Redirecting to login...</div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F9FAFB] flex justify-center items-center">
        <div className="text-[#0F766E] font-medium">Loading task...</div>
      </div>
    );
  }

  if (!task) {
    return (
      <div className="min-h-screen bg-[#F9FAFB] flex justify-center items-center">
        <div className="text-center">
          <div className="text-gray-400 text-6xl mb-4">📝</div>
          <h3 className="text-lg font-medium text-gray-600 mb-2">Task not found</h3>
          <p className="text-gray-500 mb-6">The task you&apos;re looking for doesn&apos;t exist</p>
          <button
            onClick={() => router.push('/dashboard')}
            className="bg-[#0F766E] text-white px-6 py-3 rounded-full hover:bg-[#115E59] transition-all duration-200"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const createdAt = task.created_at ? new Date(task.created_at).toLocaleString("id-ID") : "";
  const updatedAt = task.updated_at ? new Date(task.updated_at).toLocaleString("id-ID") : "";
  const isReadOnly = task.user_id !== user.id;

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <div className="flex flex-col h-screen">
        <div className="bg-white border-b px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#0F766E]">{task.title || "Untitled Task"}</h1>
            <p className="text-sm text-gray-600 mt-1">{isReadOnly ? "Viewing shared task" : "Your task"}</p>
          </div>
          <div className="flex items-center gap-3">
            {task.shared && (
              <button
                className="text-sm px-3 py-1.5 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition-colors"
                onClick={() => {
                  navigator.clipboard.writeText(`${window.location.origin}/todos/${task.todo_id}`);
                  alert("Link copied to clipboard!");
                }}
              >
                📋 Shared
              </button>
            )}
            <button
              onClick={() => router.push("/dashboard")}
              className="px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200 text-sm font-medium transition-colors"
            >
              ← Back to Dashboard
            </button>
            {!isReadOnly && (
              <button
                onClick={handleDelete}
                className="px-4 py-2 rounded-md bg-red-500 hover:bg-red-600 text-white text-sm font-medium transition-colors"
              >
                Delete
              </button>
            )}
          </div>
        </div>

        <div className="bg-gray-50 px-6 py-2 text-xs text-gray-500 border-b">
          {charCount} characters · Created {createdAt} · Last updated {updatedAt}
        </div>

        <div className="flex-1 overflow-y-auto bg-white">
          <div className="max-w-4xl mx-auto p-6">
            <TaskForm
              initialData={task}
              existingTags={task.tags || []}
              onChange={handleSave}
              onCharChange={setCharCount}
              readOnly={isReadOnly}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
