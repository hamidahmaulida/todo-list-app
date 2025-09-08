"use client";

import { useEffect, useState } from "react";

interface Note {
  id: string;
  title: string;
  content: string;
  tags?: string[];
}

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);

  // fetch notes dari API
  const fetchNotes = async () => {
    setLoading(true);
    const res = await fetch("/api/notes");
    const data = await res.json();
    setNotes(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleSave = async (note: Partial<Note>) => {
    if (editingNote) {
      // update note
      await fetch(`/api/notes/${editingNote.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(note),
      });
    } else {
      // create note
      await fetch("/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(note),
      });
    }
    setIsModalOpen(false);
    setEditingNote(null);
    fetchNotes();
  };

  const handleDelete = async (id: string) => {
    await fetch(`/api/notes/${id}`, { method: "DELETE" });
    fetchNotes();
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-[#0F766E]">My Notes</h1>
        <button
          onClick={() => {
            setEditingNote(null);
            setIsModalOpen(true);
          }}
          className="bg-[#0F766E] text-white px-4 py-2 rounded hover:bg-[#115E59]"
        >
          Add Note
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : notes.length === 0 ? (
        <p className="text-gray-500">No notes yet.</p>
      ) : (
        <ul className="space-y-3">
          {notes.map((note) => (
            <li
              key={note.id}
              className="bg-white p-4 rounded shadow flex justify-between"
            >
              <div>
                <h2 className="font-semibold">{note.title}</h2>
                <p className="text-sm text-gray-600">{note.content}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setEditingNote(note);
                    setIsModalOpen(true);
                  }}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(note.id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">
              {editingNote ? "Edit Note" : "Create Note"}
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                const formData = new FormData(form);
                const newNote = {
                  title: formData.get("title") as string,
                  content: formData.get("content") as string,
                };
                handleSave(newNote);
              }}
              className="space-y-4"
            >
              <input
                type="text"
                name="title"
                defaultValue={editingNote?.title || ""}
                placeholder="Title"
                className="w-full border p-2 rounded"
                required
              />
              <textarea
                name="content"
                defaultValue={editingNote?.content || ""}
                placeholder="Content"
                className="w-full border p-2 rounded"
                rows={4}
                required
              ></textarea>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setEditingNote(null);
                  }}
                  className="px-4 py-2 rounded border"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-[#0F766E] text-white hover:bg-[#115E59]"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
