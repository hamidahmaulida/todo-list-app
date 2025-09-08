export interface Task {
  todo_id: string;
  title?: string | null;
  content?: string | null;
  tags?: string[];
  created_at?: string;
  updated_at?: string;
  shared?: boolean;
}
