import { useState } from "react";

export default function AcceptInviteButton({ shared_id }: { shared_id: string }) {
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
      if (data.success) setAccepted(true);
      else alert(data.error || "Failed to accept invite");
    } catch (err) {
      console.error(err);
      alert("Failed to accept invite");
    } finally {
      setLoading(false);
    }
  };

  if (accepted) return <span>Accepted</span>;

  return (
    <button onClick={handleAccept} disabled={loading} className="px-3 py-1 bg-blue-500 text-white rounded">
      {loading ? "Accepting..." : "Accept Invite"}
    </button>
  );
}
