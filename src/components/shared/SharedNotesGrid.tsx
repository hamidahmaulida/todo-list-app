"use client";
import { useEffect, useState } from "react";

interface SharedNote {
  shared_id: string;
  permission: string;
  todos: {
    todo_id: string;
    title?: string;
    content?: string;
    created_at?: string;
    updated_at?: string;
    users: { user_id: string; email: string };
  };
  shared_to_user: { user_id: string; email: string };
}

export default function SharedNotesGrid() {
  const [notes, setNotes] = useState<SharedNote[]>([]);

  const fetchSharedNotes = async () => {
    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      if (!token) return;

      const res = await fetch("/api/shared", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data: SharedNote[] = await res.json();
      setNotes(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchSharedNotes();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {notes.map((note) => (
        <div key={note.shared_id} className="bg-white p-4 rounded shadow">
          <h3 className="font-bold text-lg mb-1 truncate">{note.todos.title || "Untitled"}</h3>
          {note.todos.content && <p className="text-sm text-gray-700 line-clamp-3">{note.todos.content}</p>}
          <span className="text-xs text-gray-500 mt-2">
            By: {note.todos.users.email} • {new Date(note.todos.updated_at || note.todos.created_at || "").toLocaleString("id-ID")}
          </span>
        </div>
      ))}
    </div>
  );
}
