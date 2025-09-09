"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

// Tipe response dari API
interface SharedNoteResponse {
  shared_id: string;
  access_type: "public" | "invited";
  permission: string;
  task: {
    todo_id: string;
    title?: string;
    content?: string;
    created_at?: string;
    updated_at?: string;
    user: { user_id: string; email: string };
  };
}

export default function SharedNotePage() {
  const { id } = useParams(); // Ambil id dari route
  const [note, setNote] = useState<SharedNoteResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchSharedNote = async () => {
      setLoading(true);
      try {
        const token =
          localStorage.getItem("token") || sessionStorage.getItem("token");

        const res = await fetch(`/api/shared/${id}`, {
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        });

        if (!res.ok) {
          const errData = await res.json();
          setError(errData.error || "Failed to fetch shared note");
          setLoading(false);
          return;
        }

        const data: SharedNoteResponse = await res.json();
        setNote(data);
      } catch (err) {
        console.error("Fetch shared note error:", err);
        setError("Failed to fetch shared note");
      } finally {
        setLoading(false);
      }
    };

    fetchSharedNote();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (!note) return <p>Note not found.</p>;

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-2">{note.task.title || "Untitled"}</h1>
      {note.task.content && <p className="mb-4">{note.task.content}</p>}
      <p className="text-sm text-gray-500 mb-1">
        By: {note.task.user.email}
      </p>
      <p className="text-sm text-gray-500">
        Updated:{" "}
        {new Date(note.task.updated_at || note.task.created_at || "").toLocaleString(
          "id-ID"
        )}
      </p>
      <p className="mt-2 text-xs text-gray-400">
        Permission: {note.permission} • Access: {note.access_type}
      </p>
    </div>
  );
}
