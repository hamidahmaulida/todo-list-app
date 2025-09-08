"use client";

import { useState, useEffect, useRef } from "react";
import { FiX, FiTrash2, FiShare2, FiMaximize2, FiMinimize2 } from "react-icons/fi";
import { Task } from "@/types/task";
import { formatDate } from "@/lib/formatDate";
import TaskForm from "./TaskForm";

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: Partial<Task>;
  existingTags: string[];
  onTaskSaved?: (task: Task) => void;
  onTaskDeleted?: (todo_id: string) => void;
  readOnly?: boolean;
}

export default function TaskModal({
  isOpen,
  onClose,
  initialData,
  existingTags,
  onTaskSaved,
  onTaskDeleted,
  readOnly = false,
}: TaskModalProps) {
  const [totalChar, setTotalChar] = useState(0);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [taskData, setTaskData] = useState<Partial<Task>>(initialData || {});
  const [localTags, setLocalTags] = useState<string[]>(existingTags);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showShare, setShowShare] = useState(false);

  useEffect(() => setLocalTags(existingTags), [existingTags]);
  useEffect(() => {
    setTaskData(initialData || {});
    setTotalChar(
      (initialData?.title?.length || 0) + (initialData?.content?.length || 0)
    );
  }, [initialData]);

  if (!isOpen) return null;

  const formattedDateTime = formatDate(initialData?.updated_at || initialData?.created_at);

  async function handleSave(task: Partial<Task>) {
    if (readOnly) return;
    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      if (!token) return alert("You are not logged in!");

      setSaving(true);
      const payload: Partial<Task> = { ...task };
      if (initialData?.todo_id) payload.todo_id = initialData.todo_id;

      const method = payload.todo_id ? "PUT" : "POST";
      const url = payload.todo_id ? `/api/todos/${payload.todo_id}` : "/api/todos";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data: Task | { error: string } = await res.json();
      if (!res.ok || "error" in data) {
        console.error("Failed to save task:", data);
        return alert(`Failed to save task: ${(data as any).error || "Unknown error"}`);
      }

      if (task.tags) {
        const newUniqueTags = Array.from(new Set([...localTags, ...task.tags]));
        setLocalTags(newUniqueTags);
      }

      onTaskSaved?.(data as Task);
      onClose();
    } catch (err) {
      console.error("Error saving task:", err);
      alert("Error saving task. Check console for details.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (readOnly) return;
    if (!initialData?.todo_id) return;
    if (!confirm("Are you sure you want to delete this task?")) return;

    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      if (!token) return alert("You are not logged in!");

      setDeleting(true);
      const res = await fetch(`/api/todos/${initialData.todo_id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok || data.error) {
        console.error("Failed to delete task:", data);
        return alert(`Failed to delete task: ${data.error || "Unknown error"}`);
      }

      onTaskDeleted?.(initialData.todo_id);
      onClose();
    } catch (err) {
      console.error("Error deleting task:", err);
      alert("Error deleting task. Check console for details.");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div
      className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className={`bg-white w-full max-w-[500px] max-h-[90vh] flex flex-col relative transition-all duration-300 rounded shadow-lg
          ${isFullscreen ? "w-full max-w-full h-full max-h-full p-8" : "p-4"}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-2">
          <h2 className="text-xl font-semibold text-[#0F766E]">
            {initialData ? (readOnly ? "Shared Task" : "Edit Task") : "Create Task"}
          </h2>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowShare(!showShare)}
              className="flex items-center gap-1 p-1 rounded hover:bg-gray-100 text-gray-600"
            >
              <FiShare2 className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-1 rounded hover:bg-gray-100 text-gray-600"
              title={isFullscreen ? "Exit Fullscreen" : "Expand Fullscreen"}
            >
              {isFullscreen ? <FiMinimize2 className="w-5 h-5" /> : <FiMaximize2 className="w-5 h-5" />}
            </button>
            <button type="button" onClick={onClose} className="p-1 rounded hover:bg-gray-100 text-gray-600">
              <FiX className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Share Dropdown */}
        {showShare && initialData?.todo_id && (
          <div className="absolute top-12 right-4 bg-white shadow rounded p-4 w-80 z-20 flex flex-col gap-3 border">
            <input type="email" placeholder="Enter email to invite" className="border p-2 rounded w-full text-gray-900" />
            <select className="border p-2 rounded w-full text-gray-900">
              <option>Can view</option>
              <option>Can edit</option>
              <option>Can comment</option>
            </select>
            <input type="date" className="border p-2 rounded w-full text-gray-900" />
            <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">Remove access</button>
            <button
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
              onClick={() => {
                navigator.clipboard.writeText(`${window.location.origin}/shared/${initialData.todo_id}`);
                alert("Link copied!");
              }}
            >
              Copy link
            </button>
          </div>
        )}

        {/* Form */}
        <div className="flex-1 overflow-y-auto mt-2">
          <TaskForm
            initialData={taskData}
            existingTags={localTags}
            onChange={setTaskData}
            onCharChange={setTotalChar}
            readOnly={readOnly}
          />
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center p-4 border-t sticky bottom-0 bg-white">
          <span className="text-sm text-gray-500">
            {totalChar} characters • {formattedDateTime}
          </span>
          <div className="flex gap-2">
            {!readOnly && initialData?.todo_id && (
              <button
                type="button"
                onClick={handleDelete}
                disabled={deleting}
                className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
              >
                <FiTrash2 /> Delete
              </button>
            )}
            {!readOnly && (
              <button
                type="button"
                onClick={() => handleSave(taskData)}
                disabled={saving}
                className="px-4 py-2 bg-[#0F766E] text-white rounded hover:bg-[#115E59] disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
