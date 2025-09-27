// src/lib/userHelpers.ts
import { prisma } from '@/lib/prisma';

export async function findUserByEmail(email: string) {
  try {
    const user = await prisma.users.findUnique({
      where: { email },
      select: { 
        user_id: true, 
        email: true, 
        full_name: true 
      }
    });
    
    return user;
  } catch (error) {
    console.error("Error finding user by email:", error);
    return null;
  }
}

export async function getCurrentUserFromDB(clerkUserId: string) {
  try {
    const user = await prisma.users.findUnique({
      where: { user_id: clerkUserId },
      select: {
        user_id: true,
        email: true,
        full_name: true,
        avatar_url: true
      }
    });
    
    return user;
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
}

export async function checkTodoAccess(todoId: string, userId: string) {
  try {
    // Check if user owns the todo
    const todo = await prisma.todos.findFirst({
      where: {
        todo_id: todoId,
        user_id: userId,
        deleted_at: null
      }
    });

    if (todo) return { hasAccess: true, permission: 'write', isOwner: true };

    // Check if todo is shared with user
    const sharedAccess = await prisma.shared_notes.findFirst({
      where: {
        todo_id: todoId,
        OR: [
          { access_type: 'public' },
          { 
            access_type: 'private',
            shared_to: userId 
          }
        ]
      },
      select: {
        permission: true,
        access_type: true,
        owner_id: true
      }
    });

    if (sharedAccess) {
      return { 
        hasAccess: true, 
        permission: sharedAccess.permission,
        isOwner: sharedAccess.owner_id === userId,
        accessType: sharedAccess.access_type
      };
    }

    return { hasAccess: false, permission: null, isOwner: false };

  } catch (error) {
    console.error("Error checking todo access:", error);
    return { hasAccess: false, permission: null, isOwner: false };
  }
}