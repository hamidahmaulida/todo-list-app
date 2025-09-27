"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { FiX, FiTrash2, FiMaximize2, FiMinimize2 } from "react-icons/fi";
import { useUser } from "@clerk/nextjs";
import { TodoWithExtras } from "@/types/task";
import { formatDate } from "@/lib/formatDate";
import TaskForm from "./TaskForm";
import ShareButton from "@/components/shared/ShareButton";

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: Partial<TodoWithExtras>;
  existingTags?: string[];
  onTaskSaved?: (task: TodoWithExtras) => void;
  onTaskDeleted?: (todo_id: string) => void;
}

type SaveTaskResponse = TodoWithExtras | { error: string };

export default function TaskModal({
  isOpen,
  onClose,
  initialData,
  existingTags = [],
  onTaskSaved,
  onTaskDeleted,
}: TaskModalProps) {
  const { user, isLoaded } = useUser();
  const [totalChar, setTotalChar] = useState(0);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [taskData, setTaskData] = useState<Partial<TodoWithExtras>>({});
  const [localTags, setLocalTags] = useState<string[]>(existingTags);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => setLocalTags(existingTags), [existingTags]);

  useEffect(() => {
    if (isOpen) {
      setTaskData(initialData || {});
      setTotalChar(
        (initialData?.title?.length ?? 0) +
        (initialData?.content?.length ?? 0)
      );
    }
  }, [isOpen, initialData]);

  const handleTaskDataChange = useCallback((updated: Partial<TodoWithExtras>) => {
    setTaskData(prev => ({ ...prev, ...updated }));
  }, []);

  const handleCharChange = useCallback((count: number) => {
    setTotalChar(count);
  }, []);

  
    const computedReadOnly = useMemo(() => {
  if (!taskData || !user) return true;

  // Kalau task baru (belum ada todo_id) → bukan readonly
  if (!taskData.todo_id) return false;

  if (taskData.is_shared) {
    return !(taskData.shared_permission === "edit" || taskData.shared_permission === "comment");
  }

  return taskData.user_id !== user.id;
}, [taskData, user]);


  if (!isOpen) return null;

  if (!isLoaded || !user) return (
    <div className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        {!user ? "You are not logged in!" : "Loading..."}
        <button onClick={onClose} className="mt-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">Close</button>
      </div>
    </div>
  );

  const formattedDateTime = formatDate(initialData?.updated_at || initialData?.created_at);

  async function handleSave(task: Partial<TodoWithExtras>) {
  if (computedReadOnly) return;

  const hasData =
    task.title?.trim() ||
    task.content?.trim() ||
    (task.tags && task.tags.length);
  if (!hasData)
    return alert(
      "Please fill at least one field: title, content, or tag"
    );

  try {
    setSaving(true);

    // Build payload
    const payload: Partial<TodoWithExtras> = {
      title: task.title || "",
      content: task.content || "",
      tags: task.tags || [],
      priority: task.priority || "medium",
      completed: task.completed || false,
      due_date: task.due_date || null,
    };

    // For shared tasks, include additional fields
    if (taskData.is_shared) {
      payload.is_public = task.is_public || taskData.is_public;
    }

    let url: string;
    let method: "POST" | "PUT";

    // Debug logs to understand the data
    console.log("=== DEBUG SAVE FUNCTION ===");
    console.log("taskData:", taskData);
    console.log("task:", task);
    console.log("initialData:", initialData);
    console.log("taskData.is_shared:", taskData.is_shared);
    console.log("taskData.shared_id:", taskData.shared_id);
    console.log("taskData.todo_id:", taskData.todo_id);
    console.log("task.todo_id:", task.todo_id);

    if (taskData.is_shared && taskData.shared_id) {
      // For shared tasks - use shared endpoint
      console.log("Using shared task endpoint");
      url = `/api/todos/shared/${taskData.shared_id}`;
      method = "PUT";
      payload.todo_id = taskData.todo_id; // Include todo_id in body for shared tasks
    } else if (taskData.todo_id || task.todo_id || initialData?.todo_id) {
      // For editing existing non-shared tasks
      const todoId = taskData.todo_id || task.todo_id || initialData?.todo_id;
      console.log("Using regular task update endpoint, todoId:", todoId);
      url = `/api/todos`;
      method = "PUT";
      payload.todo_id = todoId; // Include todo_id in payload for PUT to /api/todos
    } else {
      // For creating new tasks
      console.log("Using create new task endpoint");
      url = "/api/todos";
      method = "POST";
    }

    console.log("Final URL:", url);
    console.log("Final method:", method);
    console.log("Final payload:", payload);
    console.log("=== END DEBUG ===");

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data: SaveTaskResponse = await res.json();

    if (!res.ok) {
      console.error("Response not OK:", res.status, data);
      if (res.status === 401) {
        alert("Session expired. Refresh and login again.");
        window.location.reload();
        return;
      }
      return alert(
        `Failed to save task: ${
          "error" in data ? data.error : "Unknown error"
        }`
      );
    }

    if ("error" in data)
      return alert(`Failed to save task: ${data.error}`);

    // Merge tags baru
    if (task.tags)
      setLocalTags(Array.from(new Set([...localTags, ...task.tags])));

    setTaskData(data as TodoWithExtras);
    onTaskSaved?.(data as TodoWithExtras);
    onClose();
    return data as TodoWithExtras;
  } catch (err) {
    console.error("Error saving task:", err);
    alert("Error saving task. Check your connection.");
  } finally {
    setSaving(false);
  }
}
  
  async function handleDelete() {
    const todoId = initialData?.todo_id || taskData.todo_id;
    if (computedReadOnly || !todoId) return;
    if (!confirm("Are you sure you want to delete this task?")) return;

    try {
      setDeleting(true);
      let url = `/api/todos/${todoId}`;
      if (taskData.is_shared) {
        url = `/api/todos/shared/${todoId}`;
      }

      const res = await fetch(url, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        if (res.status === 401) {
          alert("Session expired. Refresh and login again.");
          window.location.reload();
          return;
        }
        const data: { error?: string } = await res.json().catch(() => ({ error: "Unknown error" }));
        return alert(`Failed to delete task: ${data.error || "Unknown error"}`);
      }

      onTaskDeleted?.(todoId);
      onClose();
    } catch (err) {
      console.error("Error deleting task:", err);
      alert("Error deleting task. Check console.");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center p-4" onClick={onClose}>
      <div
        className={`bg-white w-full max-w-[500px] max-h-[90vh] flex flex-col relative transition-all duration-300 rounded-lg shadow-xl ${isFullscreen ? "w-full max-w-full h-full max-h-full p-8" : "p-0"}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center border-b pb-3 pt-4 px-6">
          <h2 className="text-xl font-semibold text-[#0F766E]">
            {initialData ? (computedReadOnly ? "Shared Task" : "Edit Task") : "Create Task"}
          </h2>
          <div className="flex items-center gap-2">
            {(initialData?.todo_id || taskData.todo_id) && !computedReadOnly && (
              <ShareButton todo_id={initialData?.todo_id || taskData.todo_id!} />
            )}
            <button onClick={() => setIsFullscreen(!isFullscreen)} title={isFullscreen ? "Exit Fullscreen" : "Expand Fullscreen"} className="p-2 rounded-md hover:bg-gray-100 text-gray-600 transition-colors">
              {isFullscreen ? <FiMinimize2 className="w-5 h-5" /> : <FiMaximize2 className="w-5 h-5" />}
            </button>
            <button onClick={onClose} className="p-2 rounded-md hover:bg-gray-100 text-gray-600 transition-colors">
              <FiX className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          <TaskForm
            initialData={taskData}
            existingTags={localTags}
            onChange={handleTaskDataChange}
            onCharChange={handleCharChange}
            readOnly={computedReadOnly}
          />
        </div>

        <div className="flex justify-between items-center px-6 py-4 border-t bg-gray-50 rounded-b-lg">
          <span className="text-sm text-gray-500">{totalChar} characters • {formattedDateTime}</span>
          <div className="flex gap-3">
            {!computedReadOnly && (initialData?.todo_id || taskData.todo_id) && (
              <button type="button" onClick={handleDelete} disabled={deleting} className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                <FiTrash2 className="w-4 h-4" />
                {deleting ? "Deleting..." : "Delete"}
              </button>
            )}
            {!computedReadOnly && (
              <button type="button" onClick={() => handleSave(taskData)} disabled={saving} className="px-6 py-2 bg-[#0F766E] text-white rounded-md hover:bg-[#115E59] disabled:opacity-50 disabled:cursor-not-disabled transition-colors font-medium">
                {saving ? "Saving..." : "Save"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}