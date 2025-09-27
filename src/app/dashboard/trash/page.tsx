"use client";

import { useState, useEffect } from "react";
import { FiTrash2, FiRotateCcw, FiAlertTriangle, FiClock } from "react-icons/fi";
import { useUser } from "@clerk/nextjs";
import type { TodoWithExtras } from "@/types/task";

interface TrashTodo extends TodoWithExtras {
  deleted_at: string | null;
}

export default function TrashPage() {
  const { user, isLoaded } = useUser();
  const [trashedTodos, setTrashedTodos] = useState<TrashTodo[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const fetchTrashedTodos = async () => {
    if (!user) return;
    try {
      setLoading(true);
      const res = await fetch("/api/todos/trash");
      if (res.ok) {
        const data = await res.json();
        setTrashedTodos(data.todos || []);
      } else {
        console.error("Gagal mengambil todos dari trash");
      }
    } catch (err) {
      console.error("Error fetch trashed todos:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLoaded) fetchTrashedTodos();
  }, [isLoaded]);

  const handleRestore = async (todoId: string) => {
    if (!confirm("Restore item ini?")) return;
    setActionLoading(todoId);
    try {
      const res = await fetch(`/api/todos/${todoId}/restore`, { method: "POST" });
      if (res.ok) setTrashedTodos(prev => prev.filter(todo => todo.todo_id !== todoId));
      else console.error("Gagal restore item");
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoading(null);
    }
  };

  const handlePermanentDelete = async (todoId: string) => {
    if (!confirm("Yakin hapus item ini permanen?")) return;
    setActionLoading(todoId);
    try {
      const res = await fetch(`/api/todos/trash?todo_id=${todoId}`, { method: "DELETE" });
      if (res.ok) setTrashedTodos(prev => prev.filter(todo => todo.todo_id !== todoId));
      else {
        const errData = await res.json();
        console.error("Gagal hapus item:", errData.error);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoading(null);
    }
  };

  const handleRestoreAll = async () => {
    if (!confirm("Restore semua item dari trash?")) return;
    setLoading(true);
    try {
      const res = await fetch("/api/todos/trash", { method: "PUT" });
      if (res.ok) setTrashedTodos([]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEmptyTrash = async () => {
    if (!confirm("Kosongkan trash? Semua item akan dihapus permanen!")) return;
    setLoading(true);
    try {
      const res = await fetch("/api/todos/trash", { method: "DELETE" });
      if (res.ok) setTrashedTodos([]);
      else {
        const errData = await res.json();
        console.error("Gagal hapus semua item:", errData.error);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  const getDaysInTrash = (deletedAt: string) => {
    const deleted = new Date(deletedAt);
    const now = new Date();
    return Math.floor(Math.abs(now.getTime() - deleted.getTime()) / (1000 * 60 * 60 * 24));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fcfbf8]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fcfbf8] px-4 py-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FiTrash2 className="w-6 h-6 text-red-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Trash</h1>
              <p className="text-gray-600">
                {trashedTodos.length} item{trashedTodos.length !== 1 ? "s" : ""} di trash
              </p>
            </div>
          </div>
          {trashedTodos.length > 0 && (
            <div className="flex gap-3">
              <button
                onClick={handleRestoreAll}
                disabled={loading}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 flex items-center gap-2 text-sm"
              >
                <FiRotateCcw className="w-4 h-4" /> Restore All
              </button>
              <button
                onClick={handleEmptyTrash}
                disabled={loading}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 flex items-center gap-2 text-sm"
              >
                <FiTrash2 className="w-4 h-4" /> Empty Trash
              </button>
            </div>
          )}
        </div>

        {/* Warning */}
        {trashedTodos.length > 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start gap-3">
            <FiAlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-yellow-800">
              <p className="font-medium">Items di trash</p>
              <p>Item ini akan otomatis terhapus setelah 30 hari. Bisa restore atau hapus permanen.</p>
            </div>
          </div>
        )}

        {/* Konten trash */}
        {trashedTodos.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border p-12 text-center">
            <FiTrash2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Trash kosong</h3>
            <p className="text-gray-600">Item yang dihapus akan muncul di sini</p>
          </div>
        ) : (
          <div className="space-y-3">
            {trashedTodos.map(todo => (
              <div
                key={todo.todo_id}
                className="bg-white rounded-lg shadow-sm border p-4 hover:shadow-md transition-shadow flex items-start justify-between"
              >
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 mb-1">{todo.title || "Untitled"}</h3>
                  {todo.content && (
                    <p className="text-gray-600 text-sm mb-2 line-clamp-2">{todo.content}</p>
                  )}
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <FiClock className="w-4 h-4" />
                      Deleted {getDaysInTrash(todo.deleted_at || "")} day
                      {getDaysInTrash(todo.deleted_at || "") !== 1 ? "s" : ""}
                    </div>
                    <span>Created {formatDate(todo.created_at || "")}</span>
                  </div>
                </div>

                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => handleRestore(todo.todo_id)}
                    disabled={actionLoading === todo.todo_id}
                    className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors disabled:opacity-50"
                    title="Restore"
                  >
                    <FiRotateCcw className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handlePermanentDelete(todo.todo_id)}
                    disabled={actionLoading === todo.todo_id}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                    title="Delete Permanently"
                  >
                    <FiTrash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
