// src/types/task.ts
// === Core Types ===
export interface Todo {
  todo_id: string;
  user_id: string;
  title: string | null;
  content: string | null;
  created_at: string;
  updated_at: string;
}

export interface Tag {
  tag_id: string;
  user_id: string;
  tag_name: string;
}

export interface TodoTag {
  todo_id: string;
  tag_id: string;
}

export interface SharedNote {
  shared_id: string;
  todo_id: string;
  owner_id: string;
  shared_to: string | null; // bisa null untuk public shares
  permission: "read" | "edit";
  access_type: "public" | "invited"; // tambahan ini penting
}

// === Extended Types ===
export interface TodoWithExtras extends Todo {
  todo_tags?: { tags: Tag }[];
  shared_notes?: SharedNote[];
  tags?: string[];
  shared?: boolean;
}

// === Supabase Query Types ===
export interface SupabaseUser {
  user_id: string; // tambah user_id untuk konsistensi
  email: string;
}

export interface SupabaseTaskRow {
  todo_id: string;
  title: string | null;
  content: string | null;
  created_at: string;
  updated_at: string;
  users: SupabaseUser | null;
}

export interface SupabaseSharedRow {
  shared_id: string;
  permission: "read" | "edit";
  access_type: "public" | "invited"; // tambahan ini
  created_at: string;
  todos: SupabaseTaskRow;
}

// === For UI consumption ===
export interface Task {
  todo_id: string;
  title: string | null;
  content: string | null;
  created_at: string;
  updated_at: string;
  user: SupabaseUser | null;
}

export interface SharedTask {
  shared_id: string;
  permission: "read" | "edit";
  access_type: "public" | "invited"; // tambahan ini penting untuk logic
  created_at: string;
  task: Task;
}