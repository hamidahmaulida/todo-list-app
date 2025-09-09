// src/types/todo.ts
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
  shared_to: string;
  permission: string;
}

export interface TodoWithExtras extends Todo {
  todo_tags?: { tags: Tag }[];
  shared_notes?: SharedNote[];
  tags?: string[];
  shared?: boolean;
}
