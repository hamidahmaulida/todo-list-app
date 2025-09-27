"use client";

import { useState } from "react";

export default function RejectInviteButton({ shared_id, onRejected }: { shared_id: string, onRejected?: () => void }) {
  const [loading, setLoading] = useState(false);

  const handleReject = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/shared/reject", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ shared_id }),
      });
      const data = await res.json();
      if (data.success && onRejected) onRejected();
    } catch (err) {
      console.error(err);
      alert("Failed to reject invite");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handleReject} disabled={loading} className="px-3 py-1 bg-red-500 text-white rounded">
      {loading ? "Rejecting..." : "Reject Invite"}
    </button>
  );
}
