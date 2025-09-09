"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface SharedNote {
  shared_id: string;
  permission: string;
  access_type: "public" | "invited";
  task: {
    todo_id: string;
    title?: string;
    content?: string;
    created_at?: string;
    updated_at?: string;
    user: { user_id: string; email: string };
  };
}

export default function SharedNotesGrid() {
  const [notes, setNotes] = useState<SharedNote[]>([]);
  const router = useRouter();

  const fetchSharedNotes = async () => {
    try {
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");
      if (!token) return;

      const res = await fetch("/api/shared", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        console.error("Failed to fetch shared notes");
        return;
      }

      const data: SharedNote[] = await res.json();
      setNotes(data);
    } catch (err) {
      console.error("Fetch shared notes error:", err);
    }
  };

  useEffect(() => {
    fetchSharedNotes();
  }, []);

  const handleClick = (id: string) => {
    router.push(`/shared/${id}`);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {notes.map((note) => (
        <div
          key={note.shared_id}
          className="bg-white p-4 rounded shadow cursor-pointer hover:bg-gray-50"
          onClick={() => handleClick(note.shared_id)}
        >
          <h3 className="font-bold text-lg mb-1 truncate">
            {note.task.title || "Untitled"}
          </h3>
          {note.task.content && (
            <p className="text-sm text-gray-700 line-clamp-3">
              {note.task.content}
            </p>
          )}
          <span className="text-xs text-gray-500 mt-2 block">
            By: {note.task.user.email} •{" "}
            {new Date(
              note.task.updated_at || note.task.created_at || ""
            ).toLocaleString("id-ID")}
          </span>
        </div>
      ))}
    </div>
  );
}
