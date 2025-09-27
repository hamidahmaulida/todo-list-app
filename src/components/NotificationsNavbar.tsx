"use client";

import { useEffect, useState } from "react";

interface NotificationsNavbarProps {
  currentUserId: string;
  onUpdateTasks: () => void; // callback untuk refresh grid
}

// Accept Invite Button
function AcceptInviteButton({ shared_id, onAccepted }: { shared_id: string; onAccepted?: () => void }) {
  const [loading, setLoading] = useState(false);
  const [accepted, setAccepted] = useState(false);

  const handleAccept = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/shared/accept", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ shared_id }),
      });
      const data = await res.json();
      if (data.success) {
        setAccepted(true);
        if (onAccepted) onAccepted();
      } else alert(data.error || "Failed to accept invite");
    } catch (err) {
      console.error(err);
      alert("Failed to accept invite");
    } finally {
      setLoading(false);
    }
  };

  if (accepted) return <span className="text-green-600 font-semibold">Accepted</span>;

  return (
    <button
      onClick={handleAccept}
      disabled={loading}
      className="px-3 py-1 bg-blue-500 text-white rounded mr-2"
    >
      {loading ? "Accepting..." : "Accept Invite"}
    </button>
  );
}

// Reject Invite Button
function RejectInviteButton({ shared_id, onRejected }: { shared_id: string; onRejected?: () => void }) {
  const [loading, setLoading] = useState(false);
  const [rejected, setRejected] = useState(false);

  const handleReject = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/shared/reject", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ shared_id }),
      });
      const data = await res.json();
      if (data.success) {
        setRejected(true);
        if (onRejected) onRejected();
      } else alert(data.error || "Failed to reject invite");
    } catch (err) {
      console.error(err);
      alert("Failed to reject invite");
    } finally {
      setLoading(false);
    }
  };

  if (rejected) return <span className="text-red-600 font-semibold">Rejected</span>;

  return (
    <button
      onClick={handleReject}
      disabled={loading}
      className="px-3 py-1 bg-red-500 text-white rounded"
    >
      {loading ? "Rejecting..." : "Reject Invite"}
    </button>
  );
}

// Main Notifications Navbar
export default function NotificationsNavbar({ currentUserId, onUpdateTasks }: NotificationsNavbarProps) {
  const [notifications, setNotifications] = useState<any[]>([]);

  const fetchNotifications = async () => {
    try {
      const res = await fetch(`/api/notifications?unread=true`);
      const data = await res.json();
      setNotifications(data || []);
    } catch (err) {
      console.error("Failed to fetch notifications:", err);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <div className="bg-white shadow p-4 max-w-md">
      <h2 className="font-bold mb-2">Notifications</h2>
      {notifications.length === 0 && <p>No notifications</p>}
      {notifications.map((notif) => (
        <div key={notif.notification_id} className="p-2 border-b">
          <strong>{notif.title}</strong>
          <p>{notif.message}</p>

          {/* Copy link button */}
          {notif.data?.share_url && (
            <button
              onClick={() => navigator.clipboard.writeText(notif.data.share_url)}
              className="text-blue-500 underline mr-2"
            >
              Copy Link
            </button>
          )}

          {/* Accept / Reject buttons if share pending */}
          {notif.data?.shared_id && notif.data?.status === "pending" && (
            <div className="mt-1 flex">
              <AcceptInviteButton shared_id={notif.data.shared_id} onAccepted={onUpdateTasks} />
              <RejectInviteButton shared_id={notif.data.shared_id} onRejected={onUpdateTasks} />
            </div>
          )}

          {/* Status display if already accepted/rejected */}
          {notif.data?.status === "accepted" && <span className="text-green-600 font-semibold">Accepted</span>}
          {notif.data?.status === "rejected" && <span className="text-red-600 font-semibold">Rejected</span>}
        </div>
      ))}
    </div>
  );
}
