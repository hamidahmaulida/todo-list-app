"use client";
import { useState, useRef, useEffect } from "react";
import { FiShare2 } from "react-icons/fi";

interface ShareButtonProps {
  todo_id: string;
}

export default function ShareButton({ todo_id }: ShareButtonProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [copied, setCopied] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [permission, setPermission] = useState<"read" | "edit" | "comment">("read");

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleShare = async () => {
    setErrorMsg(null);
    try {
      const res = await fetch("/api/shared", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ todo_id, access_type: "invited", permission }),
      });

      const data = await res.json();
      if (res.ok && data.share_url) {
        await navigator.clipboard.writeText(data.share_url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } else {
        setErrorMsg(data.error || "Failed to share");
      }
    } catch {
      setErrorMsg("Something went wrong");
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setShowDropdown(!showDropdown)}
        className="p-2 rounded hover:bg-gray-100 text-gray-700"
        title="Share"
      >
        <FiShare2 className="w-5 h-5" />
      </button>

      {showDropdown && (
        <div className="absolute right-0 mt-2 w-64 bg-white border rounded shadow p-2 flex flex-col gap-2 z-50">
          <select
            className="border px-2 py-1 rounded text-sm text-gray-900"
            value={permission}
            onChange={(e) =>
              setPermission(e.target.value as "read" | "edit" | "comment")
            }
          >
            <option value="read">Can view</option>
            <option value="edit">Can edit</option>
            <option value="comment">Can comment</option>
          </select>
          <div className="flex justify-between gap-1">
            <button
              onClick={handleShare}
              className="flex-1 px-2 py-1 border rounded text-gray-900 hover:bg-gray-100"
            >
              Copy link
            </button>
            <button
              onClick={() => setShowDropdown(false)}
              className="flex-1 px-2 py-1 border rounded text-red-600 hover:bg-red-50"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {copied && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-4 py-2 rounded shadow">
          Copied link to clipboard
        </div>
      )}

      {errorMsg && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded shadow">
          {errorMsg}
        </div>
      )}
    </div>
  );
}
