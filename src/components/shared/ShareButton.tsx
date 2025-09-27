"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  FiShare2,
  FiCopy,
  FiTrash2,
  FiLock,
  FiGlobe,
  FiCheck,
  FiChevronDown,
} from "react-icons/fi";

type AccessType = "public" | "private";
type PermissionType = "view" | "comment" | "edit";

interface ShareButtonProps {
  todo_id: string;
}

interface ShareData {
  shared_id: string;
  share_url: string;
  access_type: AccessType;
  permission: PermissionType;
  shared_email?: string | null;
}

interface PendingInvite {
  email: string;
  permission: PermissionType;
}

export default function ShareButton({ todo_id }: ShareButtonProps) {
  const [showModal, setShowModal] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [accessType, setAccessType] = useState<AccessType>("public");
  const [inviteEmail, setInviteEmail] = useState("");
  const [permission, setPermission] = useState<PermissionType>("view");

  const [pendingInvites, setPendingInvites] = useState<PendingInvite[]>([]);
  const [shareData, setShareData] = useState<ShareData[]>([]);

  const modalRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [showAccessDropdown, setShowAccessDropdown] = useState(false);

  // show success/error
  const showMessage = (msg: string, type: "success" | "error") => {
    if (type === "success") setSuccessMsg(msg);
    else setErrorMsg(msg);

    setTimeout(() => {
      setSuccessMsg(null);
      setErrorMsg(null);
    }, 3000);
  };

  // fetch share data
  const fetchShares = useCallback(async () => {
    try {
      const res = await fetch("/api/shared/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ todo_id }),
      });
      if (!res.ok) throw new Error("Failed to fetch shares");
      const data = await res.json();
      if (!Array.isArray(data)) return;

      setShareData(data);
      if (data[0]) setAccessType(data[0].access_type || "public");
    } catch (err) {
      console.error(err);
      showMessage("Failed to load shares", "error");
    }
  }, [todo_id]);

  // load shares only when modal opened
  useEffect(() => {
    if (showModal) {
      fetchShares();
    }
  }, [showModal, fetchShares]);

  // close modal/dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setShowModal(false);
      }
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setShowAccessDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // create share
  const createShare = async (invite?: PendingInvite) => {
    setLoading(true);
    try {
      const payload: {
        todo_id: string;
        access_type: AccessType;
        permission: PermissionType;
        shared_email?: string;
      } = {
        todo_id,
        access_type: accessType,
        permission: invite?.permission || permission,
      };

      if (accessType === "private") {
        const emailToUse = invite?.email || inviteEmail;
        if (!validateEmail(emailToUse)) {
          showMessage("Invalid email", "error");
          return null;
        }
        payload.shared_email = emailToUse;
      }

      const res = await fetch("/api/shared", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok || !data?.shared_id) {
        showMessage(data?.error || "Failed to create share", "error");
        return null;
      }

      const newShare: ShareData = {
        shared_id: data.shared_id,
        share_url: data.share_url,
        access_type: data.access_type,
        permission: data.permission,
        shared_email: data.shared_email,
      };

      setShareData((prev) => [...prev, newShare]);
      return newShare;
    } catch (err) {
      console.error(err);
      showMessage("Something went wrong", "error");
      return null;
    } finally {
      setLoading(false);
    }
  };

  // pending invites
  const handleAddPending = () => {
    if (!inviteEmail.trim()) return;
    if (!validateEmail(inviteEmail))
      return showMessage("Invalid email", "error");

    setPendingInvites((prev) => [
      ...prev,
      { email: inviteEmail.trim(), permission },
    ]);
    setInviteEmail("");
    setPermission("view");
  };

  const handleSendPendingInvites = async () => {
    for (const invite of pendingInvites) {
      await createShare(invite);
    }
    setPendingInvites([]);
  };

  // delete share
  const handleDeleteShare = async (shared_id: string) => {
    if (!confirm("Stop sharing this task?")) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/shared/${shared_id}`, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json();
        showMessage(data?.error || "Failed to stop sharing", "error");
        return;
      }
      setShareData((prev) => prev.filter((s) => s.shared_id !== shared_id));
      showMessage("Sharing stopped", "success");
    } catch (err) {
      console.error(err);
      showMessage("Failed to stop sharing", "error");
    } finally {
      setLoading(false);
    }
  };

    // copy link
  const handleCopyLink = async () => {
    const existing = shareData.find((s) => s.access_type === "public");
    let url = existing?.share_url;

    if (!url) {
      const newShare = await createShare();
      if (!newShare) {
        showMessage("Failed to create share link", "error");
        return;
      }
      url = newShare.share_url;
    }

    try {
      await navigator.clipboard.writeText(url);
      showMessage("Link copied", "success");
    } catch {
      window.prompt("Copy this link:", url);
    }
  };

  const getDisplayName = (share: ShareData) => {
    if (share.access_type === "public") return "Anyone with the link";
    if (share.access_type === "private") {
      return share.shared_email?.trim() || "Private user";
    }
    return "Unknown user";
  };

  const getUniqueShares = (shares: ShareData[]) =>
    shares.filter(
      (share, idx, self) =>
        idx === self.findIndex((s) => s.shared_id === share.shared_id)
    );

  return (
    <>
      {/* Share button */}
      <button
        type="button"
        onClick={() => setShowModal(true)}
        className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
          shareData.length > 0
            ? "bg-teal-50 border-teal-200 text-teal-700 hover:bg-teal-700 hover:text-white"
            : "bg-white border-gray-300 text-gray-900 hover:bg-gray-50"
        }`}
      >
        <FiShare2 className="inline mr-2" /> Share
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center p-4">
          <div
            ref={modalRef}
            className="bg-white rounded-lg shadow-xl w-full max-w-md"
          >
            {/* Header */}
            <div className="px-6 py-4 border-b flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-900">Share Task</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600 p-1"
              >
                ✕
              </button>
            </div>

            {/* Body */}
            <div className="px-6 py-4 space-y-4">
              {/* Access type */}
              <div>
                <h3 className="text-sm font-medium mb-2 text-gray-900">
                  General access
                </h3>
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setShowAccessDropdown((s) => !s)}
                    className="w-full flex justify-between items-center p-3 border rounded text-gray-900"
                  >
                    <span className="flex items-center gap-2">
                      {accessType === "public" ? <FiGlobe /> : <FiLock />}
                      {accessType === "public"
                        ? "Anyone with the link"
                        : "Private"}
                    </span>
                    <FiChevronDown />
                  </button>

                  {showAccessDropdown && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border rounded shadow z-10">
                      <button
                        onClick={() => {
                          setAccessType("public");
                          setShowAccessDropdown(false);
                        }}
                        className="w-full text-left px-3 py-2 hover:bg-gray-50 flex items-center justify-between text-gray-900"
                      >
                        <div className="flex items-center gap-2">
                          <FiGlobe />
                          <span>Anyone with the link</span>
                        </div>
                        {accessType === "public" && (
                          <FiCheck className="text-teal-600" />
                        )}
                      </button>
                      <button
                        onClick={() => {
                          setAccessType("private");
                          setShowAccessDropdown(false);
                        }}
                        className="w-full text-left px-3 py-2 hover:bg-gray-50 flex items-center justify-between text-gray-900"
                      >
                        <div className="flex items-center gap-2">
                          <FiLock />
                          <span>Private</span>
                        </div>
                        {accessType === "private" && (
                          <FiCheck className="text-teal-600" />
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Private invite */}
              {accessType === "private" && (
                <div className="space-y-2">
                  <div className="flex gap-2 items-center">
                    <input
                      type="email"
                      placeholder="Add people by email"
                      value={inviteEmail}
                      onChange={(e) => setInviteEmail(e.target.value)}
                      className="flex-1 px-3 py-2 border rounded-lg text-sm text-gray-900 placeholder-gray-400 outline-none"
                    />
                    <select
                      value={permission}
                      onChange={(e) =>
                        setPermission(e.target.value as PermissionType)
                      }
                      className="px-2 py-1 border rounded text-gray-900"
                    >
                      <option value="view">View</option>
                      <option value="comment">Comment</option>
                      <option value="edit">Edit</option>
                    </select>
                    <button
                      onClick={handleAddPending}
                      disabled={!inviteEmail.trim()}
                      className="px-3 py-1.5 bg-teal-600 text-white rounded hover:bg-teal-700 disabled:opacity-50"
                    >
                      Add
                    </button>
                  </div>

                  {/* Pending */}
                  {pendingInvites.map((invite, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 bg-gray-50 p-2 rounded"
                    >
                      <span className="flex-1 text-gray-900">
                        {invite.email}
                      </span>
                      <select
                        value={invite.permission}
                        onChange={(e) => {
                          const newPending = [...pendingInvites];
                          newPending[idx].permission =
                            e.target.value as PermissionType;
                          setPendingInvites(newPending);
                        }}
                        className="px-2 py-1 border rounded text-gray-900"
                      >
                        <option value="view">View</option>
                        <option value="comment">Comment</option>
                        <option value="edit">Edit</option>
                      </select>
                      <button
                        onClick={() =>
                          setPendingInvites((prev) =>
                            prev.filter((_, i) => i !== idx)
                          )
                        }
                        className="text-red-500 px-2"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Existing shares */}
              {shareData.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium mt-4 mb-2 text-gray-900">
                    Shared with
                  </h3>
                  {getUniqueShares(shareData).map((share) => (
                    <div
                      key={share.shared_id}
                      className="flex justify-between items-center p-2 border rounded mb-1"
                    >
                      <div className="flex-1">
                        <span className="text-gray-900 font-medium">
                          {getDisplayName(share)}
                        </span>
                        <div className="text-xs text-gray-500 capitalize">
                          {share.permission} • {share.access_type}
                        </div>
                      </div>
                      <button
                        onClick={() => handleDeleteShare(share.shared_id)}
                        className="text-red-500 px-2 hover:text-red-700"
                        disabled={loading}
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t flex justify-between items-center">
              <div className="flex gap-2">
                <button
                  onClick={handleCopyLink}
                  disabled={loading}
                  className="flex items-center gap-1 px-3 py-1.5 bg-teal-50 text-teal-700 rounded hover:bg-teal-600 hover:text-white text-sm disabled:opacity-50"
                >
                  <FiCopy /> Copy link
                </button>
                {pendingInvites.length > 0 && accessType === "private" && (
                  <button
                    onClick={handleSendPendingInvites}
                    disabled={loading}
                    className="px-3 py-1.5 bg-teal-600 text-white rounded hover:bg-teal-700 text-sm disabled:opacity-50"
                  >
                    {loading ? "Sending..." : "Send Invites"}
                  </button>
                )}
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="text-sm text-gray-600 hover:text-gray-800"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {successMsg && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-4 py-2 rounded shadow text-sm z-[10000]">
          {successMsg}
        </div>
      )}
      {errorMsg && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded shadow text-sm z-[10000]">
          {errorMsg}
        </div>
      )}
    </>
  );
}
