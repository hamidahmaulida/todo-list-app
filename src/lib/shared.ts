// import { createClient } from "@supabase/supabase-js";
// import { SharedTask } from "@/types/task";

// const supabase = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL!,
//   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY! 
// );

// // Define types for better type safety
// interface UserData {
//   user_id: string;
//   email: string;
// }

// interface TodoWithUser {
//   todo_id: string;
//   title: string;
//   content: string;
//   created_at: string;
//   updated_at: string;
//   users: UserData | UserData[];
// }

// export async function getSharedTask(sharedId: string): Promise<SharedTask | null> {
//   try {
//     // Step 1: Get shared note info
//     const { data: sharedNote, error: sharedError } = await supabase
//       .from("shared_notes")
//       .select("shared_id, todo_id, permission, access_type, created_at")
//       .eq("shared_id", sharedId)
//       .single();

//     if (sharedError || !sharedNote) {
//       console.error("Shared note error:", sharedError);
//       return null;
//     }

//     // Step 2: Get todo with user info
//     const { data: todo, error: todoError } = await supabase
//       .from("todos")
//       .select(`
//         todo_id,
//         title,
//         content,
//         created_at,
//         updated_at,
//         users!inner (
//           user_id,
//           email
//         )
//       `)
//       .eq("todo_id", sharedNote.todo_id)
//       .single();

//     if (todoError || !todo) {
//       console.error("Todo error:", todoError);
//       return null;
//     }

//     // Safely extract data with proper typing
//     const todoData = todo as TodoWithUser;
//     const userInfo = Array.isArray(todoData.users) ? todoData.users[0] : todoData.users;
    
//     if (!userInfo || !userInfo.user_id || !userInfo.email) {
//       console.error("Invalid user data:", userInfo);
//       return null;
//     }

//     return {
//       shared_id: sharedNote.shared_id,
//       permission: sharedNote.permission as "read" | "edit",
//       access_type: sharedNote.access_type as "public" | "invited",
//       created_at: sharedNote.created_at,
//       task: {
//         todo_id: todoData.todo_id,
//         title: todoData.title,
//         content: todoData.content,
//         created_at: todoData.created_at,
//         updated_at: todoData.updated_at,
//         user: {
//           user_id: userInfo.user_id,
//           email: userInfo.email
//         }
//       }
//     };
//   } catch (err) {
//     console.error("Failed to fetch shared task:", err);
//     return null;
//   }
// }

// // Debug version with more logging
// export async function getSharedTaskDebug(sharedId: string): Promise<SharedTask | null> {
//   try {
//     console.log("Fetching shared note:", sharedId);
    
//     const { data: sharedNote, error: sharedError } = await supabase
//       .from("shared_notes")
//       .select("shared_id, todo_id, permission, access_type, created_at")
//       .eq("shared_id", sharedId)
//       .single();

//     console.log("Shared note result:", { sharedNote, sharedError });

//     if (sharedError || !sharedNote) {
//       return null;
//     }

//     const { data: todo, error: todoError } = await supabase
//       .from("todos")
//       .select(`
//         todo_id,
//         title,
//         content,
//         created_at,
//         updated_at,
//         users!inner (
//           user_id,
//           email
//         )
//       `)
//       .eq("todo_id", sharedNote.todo_id)
//       .single();

//     console.log("Todo result:", { todo, todoError });

//     if (todoError || !todo) {
//       return null;
//     }

//     // Use proper typing instead of any
//     const todoData = todo as TodoWithUser;
//     const userInfo = Array.isArray(todoData.users) ? todoData.users[0] : todoData.users;
    
//     console.log("User info:", { users: todoData.users, userInfo });

//     if (!userInfo?.user_id || !userInfo?.email) {
//       console.error("Missing user data");
//       return null;
//     }

//     const result = {
//       shared_id: sharedNote.shared_id,
//       permission: sharedNote.permission as "read" | "edit",
//       access_type: sharedNote.access_type as "public" | "invited",
//       created_at: sharedNote.created_at,
//       task: {
//         todo_id: todoData.todo_id,
//         title: todoData.title,
//         content: todoData.content,
//         created_at: todoData.created_at,
//         updated_at: todoData.updated_at,
//         user: {
//           user_id: userInfo.user_id,
//           email: userInfo.email
//         }
//       }
//     };

//     console.log("Final result:", result);
//     return result;
//   } catch (err) {
//     console.error("Failed to fetch shared task:", err);
//     return null;
//   }
// }