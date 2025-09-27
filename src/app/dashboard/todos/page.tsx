"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

interface Note {
  id: string;
  title: string;
  content: string;
  tags?: string[];
}

export default function NotesPage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);

  // Redirect if not authenticated
  useEffect(() => {
    if (isLoaded && !user) {
      router.push('/login');
    }
  }, [isLoaded, user, router]);

  // fetch notes dari API
  const fetchNotes = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const res = await fetch("/api/notes");
      if (!res.ok) {
        if (res.status === 401) {
          router.push('/login');
          return;
        }
        throw new Error("Failed to fetch notes");
      }
      const data = await res.json();
      setNotes(data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLoaded && user) {
      fetchNotes();
    }
  }, [isLoaded, user]);

  const handleSave = async (note: Partial<Note>) => {
    try {
      if (editingNote) {
        // update note
        const res = await fetch(`/api/notes/${editingNote.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(note),
        });
        if (!res.ok) throw new Error("Failed to update note");
      } else {
        // create note
        const res = await fetch("/api/notes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(note),
        });
        if (!res.ok) throw new Error("Failed to create note");
      }
      setIsModalOpen(false);
      setEditingNote(null);
      fetchNotes();
    } catch (error) {
      console.error("Error saving note:", error);
      alert("Failed to save note. Please try again.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this note?")) return;
    
    try {
      const res = await fetch(`/api/notes/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete note");
      fetchNotes();
    } catch (error) {
      console.error("Error deleting note:", error);
      alert("Failed to delete note. Please try again.");
    }
  };

  // Show loading while Clerk is checking auth
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-[#F9FAFB] flex justify-center items-center">
        <div className="text-[#0F766E] font-medium">Loading...</div>
      </div>
    );
  }

  // Don't render if not authenticated (will redirect)
  if (!user) {
    return (
      <div className="min-h-screen bg-[#F9FAFB] flex justify-center items-center">
        <div className="text-[#0F766E] font-medium">Redirecting to login...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <div className="pt-20 px-6 pb-24">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-[#0F766E] mb-2">My Notes</h1>
              <p className="text-gray-600">Create and organize your personal notes</p>
            </div>
            <button
              onClick={() => {
                setEditingNote(null);
                setIsModalOpen(true);
              }}
              className="bg-[#0F766E] text-white px-6 py-3 rounded-full shadow-lg hover:bg-[#115E59] transition-all duration-200 flex items-center gap-2 font-medium"
            >
              <span className="text-lg">+</span>
              Add Note
            </button>
          </div>

          {/* Notes Content */}
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="text-[#0F766E] font-medium">Loading notes...</div>
            </div>
          ) : notes.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-gray-400 text-6xl mb-4">📝</div>
              <h3 className="text-lg font-medium text-gray-600 mb-2">No notes yet</h3>
              <p className="text-gray-500 mb-6">Create your first note to get started</p>
              <button
                onClick={() => {
                  setEditingNote(null);
                  setIsModalOpen(true);
                }}
                className="bg-[#0F766E] text-white px-6 py-3 rounded-full hover:bg-[#115E59] transition-all duration-200"
              >
                Create First Note
              </button>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {notes.map((note) => (
                <div
                  key={note.id}
                  className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border"
                >
                  <div className="mb-4">
                    <h2 className="font-semibold text-lg text-gray-800 mb-2 line-clamp-2">
                      {note.title}
                    </h2>
                    <p className="text-sm text-gray-600 line-clamp-3">
                      {note.content}
                    </p>
                  </div>
                  <div className="flex justify-end gap-2 pt-4 border-t">
                    <button
                      onClick={() => {
                        setEditingNote(note);
                        setIsModalOpen(true);
                      }}
                      className="text-[#0F766E] hover:bg-[#F0FDF4] px-3 py-1.5 rounded-md text-sm font-medium transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(note.id)}
                      className="text-red-600 hover:bg-red-50 px-3 py-1.5 rounded-md text-sm font-medium transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-md rounded-lg shadow-xl">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">
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
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    defaultValue={editingNote?.title || ""}
                    placeholder="Enter note title"
                    className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-[#0F766E] focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Content
                  </label>
                  <textarea
                    name="content"
                    defaultValue={editingNote?.content || ""}
                    placeholder="Enter note content"
                    className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-[#0F766E] focus:border-transparent"
                    rows={6}
                    required
                  ></textarea>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setIsModalOpen(false);
                      setEditingNote(null);
                    }}
                    className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 rounded-md bg-[#0F766E] text-white hover:bg-[#115E59] transition-colors"
                  >
                    Save Note
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}