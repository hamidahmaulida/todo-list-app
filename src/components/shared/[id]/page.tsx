// src/app/shared/[id]/page.tsx
import React from "react";

interface SharedPageProps {
  params: { id: string };
}

export default async function SharedPage({ params }: SharedPageProps) {
  const { id } = params;
  let data: any = null;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/shared/${id}`, {
      cache: "no-store", // ambil selalu fresh
    });

    data = await res.json();
  } catch (err) {
    console.error("Failed to fetch shared note:", err);
  }

  if (!data || data.error) {
    return <div className="p-4">Shared note not found or inaccessible.</div>;
  }

  const task = data.task;

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-2">{task.title}</h1>
      <p className="mb-4">{task.content}</p>
      <span className="text-sm text-gray-500">
        By: {task.user.email} •{" "}
        {new Date(task.updated_at || task.created_at).toLocaleString("id-ID")}
      </span>
    </div>
  );
}
