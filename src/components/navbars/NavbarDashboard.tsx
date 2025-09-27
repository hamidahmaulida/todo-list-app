"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FiMenu, FiBell, FiTrash2 } from "react-icons/fi";
import { useUser, useClerk } from "@clerk/nextjs";

interface Notification {
  id: string;
  type: "task_shared" | "share_accepted" | "share_rejected" | "share_updated";
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  data?: any;
}

interface NavbarDashboardProps {
  user: { full_name?: string; email?: string };
  onToggleSidebar: () => void;
  onUpdateTasks?: () => void;
}

export default function NavbarDashboard({ user, onToggleSidebar, onUpdateTasks }: NavbarDashboardProps) {
  const router = useRouter();
  const { user: clerkUser } = useUser();
  const { signOut } = useClerk();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [processingInvites, setProcessingInvites] = useState<Set<string>>(new Set());

  const unreadCount = notifications.filter(n => !n.isRead).length;

  // Perbaikan untuk function getInitial di NavbarDashboard
const getInitial = (name?: string) => {
  if (!name?.trim()) {
    const email = user?.email || clerkUser?.primaryEmailAddress?.emailAddress;
    return email ? email.charAt(0).toUpperCase() : "U";
  }

  // Selalu ambil huruf pertama saja
  return name.trim().charAt(0).toUpperCase();
};

// Update bagian render button profile
<button
  onClick={() => setDropdownOpen(prev => !prev)}
  className="flex items-center justify-center w-10 h-10 bg-[#0F766E] text-white rounded-full hover:bg-[#115E59] transition font-semibold text-sm shadow-md"
>
  {getInitial(clerkUser?.fullName || user?.full_name)}
</button>

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / 60000);
    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const fetchNotifications = async () => {
    if (!clerkUser) return;
    try {
      setIsLoading(true);
      const res = await fetch("/api/notifications?limit=50");
      const data = await res.json();
      if (res.ok) {
        setNotifications(
          data.map((n: any) => ({
            id: n.notification_id,
            type: n.type,
            title: n.title,
            message: n.message || "",
            timestamp: n.created_at,
            isRead: n.is_read,
            data: n.data,
          }))
        );
      } else {
        console.error("Failed to fetch notifications:", data);
        setNotifications([]);
      }
    } catch (err) {
      console.error("Unexpected error fetching notifications:", err);
      setNotifications([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [clerkUser]);

  const handleSignOut = async () => {
    try {
      setDropdownOpen(false);
      await signOut(() => router.push("/sign-in"));
    } catch (err) {
      console.error("Sign out error:", err);
    }
  };

  const markAsRead = async (notifId: string) => {
    try {
      const res = await fetch(`/api/notifications/${notifId}`, { method: "PATCH" });
      if (!res.ok) console.error("Failed to mark as read:", await res.text());
      else setNotifications(prev => prev.map(n => (n.id === notifId ? { ...n, isRead: true } : n)));
    } catch (err) {
      console.error("Mark as read error:", err);
    }
  };

  const acceptInvite = async (shared_id: string, notificationId: string) => {
    if (processingInvites.has(shared_id)) return;
    
    setProcessingInvites(prev => new Set(prev).add(shared_id));
    
    try {
      const res = await fetch("/api/shared/accept", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ shared_id }),
      });
      const data = await res.json();
      
      if (data.success) {
        // Update the notification to show accepted status
        setNotifications(prev => prev.map(n => 
          n.id === notificationId 
            ? { 
                ...n, 
                data: { 
                  ...n.data, 
                  status: 'accepted' 
                },
                isRead: true
              } 
            : n
        ));
        
        // Mark notification as read
        await markAsRead(notificationId);
        
        // Refresh tasks if callback provided
        onUpdateTasks?.();
        
        // Also try calling global refresh function for dashboard
        if ((window as any).refreshDashboardTasks) {
          (window as any).refreshDashboardTasks();
        }
        
        console.log("Invite accepted successfully");
      } else {
        alert(data.error || "Failed to accept invite");
      }
    } catch (err) {
      console.error("Accept invite error:", err);
      alert("Failed to accept invite");
    } finally {
      setProcessingInvites(prev => {
        const newSet = new Set(prev);
        newSet.delete(shared_id);
        return newSet;
      });
    }
  };

  const rejectInvite = async (shared_id: string, notificationId: string) => {
    if (processingInvites.has(shared_id)) return;
    
    setProcessingInvites(prev => new Set(prev).add(shared_id));
    
    try {
      const res = await fetch("/api/shared/reject", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ shared_id }),
      });
      const data = await res.json();
      
      if (data.success) {
        // Update the notification to show rejected status
        setNotifications(prev => prev.map(n => 
          n.id === notificationId 
            ? { 
                ...n, 
                data: { 
                  ...n.data, 
                  status: 'rejected' 
                },
                isRead: true
              } 
            : n
        ));
        
        // Mark notification as read
        await markAsRead(notificationId);
        
        // Refresh tasks if callback provided
        onUpdateTasks?.();
        
        console.log("Invite rejected successfully");
      } else {
        alert(data.error || "Failed to reject invite");
      }
    } catch (err) {
      console.error("Reject invite error:", err);
      alert("Failed to reject invite");
    } finally {
      setProcessingInvites(prev => {
        const newSet = new Set(prev);
        newSet.delete(shared_id);
        return newSet;
      });
    }
  };

  // Helper function to check if notification has pending invite
  const hasPendingInvite = (notification: Notification) => {
    return notification.type === 'task_shared' && 
           notification.data?.shared_id && 
           (!notification.data?.status || notification.data?.status === 'pending');
  };

  // Helper function to get invite status
  const getInviteStatus = (notification: Notification) => {
    return notification.data?.status || 'pending';
  };

  return (
    <nav className="w-full bg-white shadow-sm px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button onClick={onToggleSidebar} className="lg:hidden p-2 rounded hover:bg-gray-100">
          <FiMenu className="w-6 h-6 text-[#0F766E]" />
        </button>
        <span className="text-lg font-semibold text-teal-800">Dashboard</span>
      </div>

      <div className="flex items-center gap-3">
        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setNotifDropdownOpen(prev => !prev)}
            className="relative p-2 rounded-lg hover:bg-gray-100 transition"
          >
            <FiBell className="w-6 h-6 text-gray-600" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full min-w-[18px] h-[18px] flex items-center justify-center">
                {unreadCount > 99 ? "99+" : unreadCount}
              </span>
            )}
          </button>

          {notifDropdownOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setNotifDropdownOpen(false)} />
              <div className="absolute right-0 mt-2 w-80 bg-white shadow-lg rounded-lg border border-gray-200 z-20 max-h-96 overflow-y-auto">
                <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
                  <h3 className="text-sm font-semibold text-gray-900">Notifications</h3>
                  {unreadCount > 0 && <p className="text-xs text-gray-600">{unreadCount} unread</p>}
                </div>

                <div className="max-h-80 overflow-y-auto">
                  {isLoading ? (
                    <div className="px-4 py-8 text-center text-gray-500 text-sm">Loading notifications...</div>
                  ) : notifications.length === 0 ? (
                    <div className="px-4 py-8 text-center text-gray-500 text-sm">No notifications yet</div>
                  ) : (
                    notifications.map(n => {
                      const inviteStatus = getInviteStatus(n);
                      const isProcessing = processingInvites.has(n.data?.shared_id);
                      
                      return (
                        <div
                          key={n.id}
                          className={`px-4 py-3 border-b border-gray-100 hover:bg-gray-50 ${!n.isRead ? "bg-blue-50 border-l-4 border-l-blue-500" : ""}`}
                          onClick={() => !n.isRead && markAsRead(n.id)}
                        >
                          <p className="text-sm font-medium text-gray-900">{n.title}</p>
                          <p className="text-sm text-gray-600 mt-1">{n.message}</p>
                          <p className="text-xs text-gray-400 mt-1">{formatTimestamp(n.timestamp)}</p>

                          {/* Show invite actions for task_shared notifications */}
                          {hasPendingInvite(n) && (
                            <div className="flex gap-2 mt-2">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  acceptInvite(n.data.shared_id, n.id);
                                }}
                                disabled={isProcessing}
                                className={`px-3 py-1 text-white rounded text-xs ${
                                  isProcessing 
                                    ? 'bg-gray-400 cursor-not-allowed' 
                                    : 'bg-blue-500 hover:bg-blue-600'
                                }`}
                              >
                                {isProcessing ? 'Processing...' : 'Accept'}
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  rejectInvite(n.data.shared_id, n.id);
                                }}
                                disabled={isProcessing}
                                className={`px-3 py-1 text-white rounded text-xs ${
                                  isProcessing 
                                    ? 'bg-gray-400 cursor-not-allowed' 
                                    : 'bg-red-500 hover:bg-red-600'
                                }`}
                              >
                                {isProcessing ? 'Processing...' : 'Reject'}
                              </button>
                            </div>
                          )}

                          {/* Show status for processed invites */}
                          {inviteStatus === 'accepted' && (
                            <div className="mt-2">
                              <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-medium">
                                ✓ Accepted
                              </span>
                            </div>
                          )}
                          {inviteStatus === 'rejected' && (
                            <div className="mt-2">
                              <span className="px-2 py-1 bg-red-100 text-red-800 rounded text-xs font-medium">
                                ✗ Rejected
                              </span>
                            </div>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(prev => !prev)}
            className="flex items-center justify-center w-10 h-10 bg-green-600 text-white rounded-full hover:bg-green-700 transition font-semibold text-lg"
          >
            {getInitial(user?.full_name)}
          </button>

          {dropdownOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setDropdownOpen(false)} />
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg border border-gray-200 z-20">
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-900">{user?.full_name || user?.email}</p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                </div>
                <div className="py-1">
                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      router.push("/dashboard/setting");
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-800 transition"
                  >
                    Settings
                  </button>
                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      router.push("/dashboard/trash");
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition flex items-center gap-2"
                  >
                    <FiTrash2 className="w-4 h-4" />
                    Trash
                  </button>
                  <button
                    onClick={handleSignOut}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}