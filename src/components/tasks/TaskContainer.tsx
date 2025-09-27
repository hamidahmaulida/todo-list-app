"use client";

import { useEffect, useState, useCallback } from "react";
import TaskGrid from "./TaskGrid";
import { TodoWithExtras } from "@/types/task";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface TasksContainerProps {
  currentUserId: string;
  onSelectTask: (task: TodoWithExtras) => void;
  refreshTrigger?: number; // Add this prop to trigger refreshes
}

export default function TasksContainer({ currentUserId, onSelectTask, refreshTrigger }: TasksContainerProps) {
  const [ownTasks, setOwnTasks] = useState<TodoWithExtras[]>([]);
  const [sharedTasks, setSharedTasks] = useState<TodoWithExtras[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOwnTasks = async () => {
    console.log("[TASKS] Fetching own tasks for user:", currentUserId);
    
    // Try both column names to be safe
    const { data: dataWithUserId, error: errorWithUserId } = await supabase
      .from("todos")
      .select("*")
      .eq("user_id", currentUserId)
      .order("updated_at", { ascending: false });

    let ownTasksData = dataWithUserId;
    let ownTasksError = errorWithUserId;

    // If user_id doesn't work, try owner_id
    if (errorWithUserId || !dataWithUserId?.length) {
      const { data: dataWithOwnerId, error: errorWithOwnerId } = await supabase
        .from("todos")
        .select("*")
        .eq("owner_id", currentUserId)
        .order("updated_at", { ascending: false });
      
      ownTasksData = dataWithOwnerId;
      ownTasksError = errorWithOwnerId;
    }

    if (ownTasksError) {
      console.error("Error fetching own tasks:", ownTasksError);
    } else {
      console.log(`[TASKS] Found ${ownTasksData?.length || 0} own tasks`);
      setOwnTasks(ownTasksData || []);
    }
  };

  const fetchSharedTasks = async () => {
    console.log("[TASKS] Fetching shared tasks for user:", currentUserId);
    
    // First, let's see what shared_notes exist for this user
    const { data: sharedNotes, error: sharedNotesError } = await supabase
      .from("shared_notes")
      .select("*")
      .eq("shared_to", currentUserId);

    console.log("[TASKS] All shared_notes for user:", sharedNotes);

    // Now get only accepted ones with todo data
    const { data, error } = await supabase
      .from("shared_notes")
      .select(`
        *,
        todo:todos(*)
      `)
      .eq("shared_to", currentUserId)
      .eq("status", "accepted")
      .order("accepted_at", { ascending: false });

    if (error) {
      console.error("Error fetching shared tasks:", error);
      setSharedTasks([]);
    } else {
      console.log("[TASKS] Raw shared task data:", data);
      
      // Extract todos from the joined data
      const sharedTasksData = data
        ?.filter(item => item.todo) // Only include items with valid todo data
        .map(item => ({
          ...item.todo,
          // Add metadata to indicate this is a shared task
          is_shared: true,
          shared_permission: item.permission,
          shared_id: item.shared_id
        })) || [];
      
      console.log(`[TASKS] Processed ${sharedTasksData.length} shared tasks:`, sharedTasksData);
      setSharedTasks(sharedTasksData);
    }
  };

  const fetchAllTasks = useCallback(async () => {
    console.log("[TASKS] Starting to fetch all tasks...");
    setLoading(true);
    
    try {
      await Promise.all([fetchOwnTasks(), fetchSharedTasks()]);
    } catch (error) {
      console.error("[TASKS] Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  }, [currentUserId]);

  useEffect(() => {
    fetchAllTasks();
  }, [fetchAllTasks, refreshTrigger]); // Add refreshTrigger as dependency

  // Expose refresh function for parent components
  useEffect(() => {
    // Store the refresh function globally so other components can call it
    (window as any).refreshTasks = fetchAllTasks;
    
    return () => {
      delete (window as any).refreshTasks;
    };
  }, [fetchAllTasks]);

  const allTasks = [...ownTasks, ...sharedTasks];
  
  console.log("[TASKS] Final task counts:", {
    ownTasks: ownTasks.length,
    sharedTasks: sharedTasks.length,
    total: allTasks.length
  });

  if (loading) return <div className="text-center py-10">Loading tasks...</div>;

  return (
    <div>
      {/* Debug info - remove in production */}
      <div className="mb-4 p-2 bg-gray-100 rounded text-xs">
        <div>Own Tasks: {ownTasks.length}</div>
        <div>Shared Tasks: {sharedTasks.length}</div>
        <div>User ID: {currentUserId}</div>
      </div>
      
      <TaskGrid tasks={allTasks} onSelect={onSelectTask} />
    </div>
  );
}