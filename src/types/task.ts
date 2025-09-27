// src/types/task.ts

// === Core Types ===
export interface Todo {
  todo_id: string;
  user_id: string;
  title: string | null;
  content: string | null;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
  completed?: boolean;
  due_date?: string | null;
  is_public?: boolean;
  shared_with?: string[];
  priority?: "low" | "medium" | "high";
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
  shared_to: string | null;      
  permission: "edit" | "comment" | "view";
  access_type: "public" | "private";
  status: "pending" | "accepted" | "rejected";
  created_at?: string;
  accepted_at?: string | null;
}

// === Extended Types ===
export interface TodoWithExtras extends Todo {
  todo_tags?: { tags: Partial<Tag> }[];
  shared_notes?: SharedNote[];
  tags?: string[];
  
  // Shared task metadata (when this task is shared with current user)
  shared?: boolean; // Keep for backward compatibility
  is_shared?: boolean; // Whether this is a shared task received from someone else
  shared_permission?: "edit" | "comment" | "view"; // Permission level for shared tasks
  shared_id?: string; // The shared_notes.shared_id for this share
  owner_name?: string; // Name of the person who shared this task
  owner_email?: string; // Email of the person who shared this task
}

// === Supabase Query Types ===
export interface SupabaseUser {
  user_id: string;
  email: string;
  full_name?: string;
}

export interface SupabaseTaskRow {
  todo_id: string;
  title: string | null;
  content: string | null;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
  completed?: boolean;
  due_date?: string | null;
  is_public?: boolean;
  shared_with?: string[];
  priority?: "low" | "medium" | "high";
  users: SupabaseUser | null;
}

export interface SupabaseSharedRow {
  shared_id: string;
  permission: "edit" | "comment" | "view";
  access_type: "public" | "private";
  status: "pending" | "accepted" | "rejected";
  created_at: string;
  accepted_at?: string | null;
  todos: SupabaseTaskRow;
}

// === Notification Types ===
export interface Notification {
  notification_id: string;
  user_id: string;
  type: "task_shared" | "share_accepted" | "share_rejected" | "share_updated";
  title: string;
  message: string;
  data?: {
    shared_id?: string;
    todo_id?: string;
    owner_id?: string;
    permission?: "edit" | "comment" | "view";
    share_url?: string;
    status?: "pending" | "accepted" | "rejected";
    [key: string]: any;
  };
  is_read: boolean;
  created_at: string;
}

// === UI Consumption ===
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
  permission: "edit" | "comment" | "view";
  access_type: "public" | "private";
  status: "pending" | "accepted" | "rejected";
  created_at: string;
  accepted_at?: string | null;
  task: Task;
}

// === API Response Types ===
export interface SharedTaskResponse {
  shared_id: string;
  permission: "edit" | "comment" | "view";
  access_type: "public" | "private";
  status: "pending" | "accepted" | "rejected";
  todo: TodoWithExtras;
  owner: SupabaseUser;
}