// src/app/shared/[id]/page.tsx
import React from "react";

// Tipe response dari API /shared/[id]
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
    user: {
      user_id: string;
      email: string;
    };
  };
  error?: string;
}

interface SharedPageProps {
  params: { id: string };
}

export default async function SharedPage({ params }: SharedPageProps) {
  const { id } = params;
  let data: SharedNoteResponse | null = null;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/shared/${id}`, {
      cache: "no-store", // ambil selalu fresh
    });

    // Pastikan response sesuai tipe
    data = (await res.json()) as SharedNoteResponse;
  } catch (err: unknown) {
    console.error("Failed to fetch shared note:", err);
  }

  // Jika data error atau tidak ada
  if (!data || data.error) {
    return <div className="p-4">Shared note not found or inaccessible.</div>;
  }

  const task = data.task;

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-2">{task.title || "Untitled"}</h1>
      {task.content && <p className="mb-4">{task.content}</p>}
      <span className="text-sm text-gray-500">
        By: {task.user.email} •{" "}
        {new Date(task.updated_at || task.created_at || "").toLocaleString("id-ID")}
      </span>
    </div>
  );
}
