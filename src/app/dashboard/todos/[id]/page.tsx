"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import TaskForm from "@/components/tasks/TaskForm";
import { TodoWithExtras } from "@/types/task";

export default function TaskDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [task, setTask] = useState<TodoWithExtras | null>(null);
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    const fetchTask = async () => {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      const res = await fetch(`/api/todos/${id}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      const data = await res.json();
      setTask(data);
    };
    if (id) fetchTask();
  }, [id]);

  const handleSave = async (data: Partial<TodoWithExtras>) => {
    if (!id) return;
    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      await fetch(`/api/todos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(data),
      });
    } finally {
      // Remove unused setSaving since saving state isn't used
    }
  };

  if (!task) return <p className="p-6">Loading...</p>;

  const createdAt = task.created_at
    ? new Date(task.created_at).toLocaleString("id-ID")
    : "";
  const updatedAt = task.updated_at
    ? new Date(task.updated_at).toLocaleString("id-ID")
    : "";

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <h1 className="text-xl font-bold text-[#0F766E]">
          {task.title || "Untitled"}
        </h1>
        <div className="flex items-center gap-2">
          {task.shared && (
            <span
              className="text-sm px-2 py-1 bg-blue-100 text-blue-600 rounded cursor-pointer"
              onClick={() => {
                navigator.clipboard.writeText(
                  `${window.location.origin}/todos/${task.todo_id}`
                );
                alert("Link copied to clipboard!");
              }}
            >
              Shared
            </span>
          )}
          <button
            onClick={() => router.push("/dashboard/todos")}
            className="px-3 py-1.5 rounded bg-gray-100 hover:bg-gray-200 text-sm"
          >
            Back
          </button>
        </div>
      </div>

      {/* Metadata */}
      <div className="px-4 py-2 text-xs text-gray-500">
        {charCount} karakter · dibuat {createdAt} · update {updatedAt}
      </div>

      {/* Task form */}
      <div className="flex-1 overflow-y-auto p-4">
        <TaskForm
          initialData={task}
          existingTags={task.tags || []}
          onChange={handleSave}
          onCharChange={setCharCount}
          readOnly={task.shared || false} // kalau note dishare → read-only
        />
      </div>
    </div>
  );
}