"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { FiShare2, FiCopy, FiTrash2, FiLock, FiGlobe, FiCheck, FiChevronDown } from "react-icons/fi";

interface ShareButtonProps {
  todo_id: string;
}

interface ShareData {
  shared_id: string;
  share_url: string;
  access_type: "public" | "invited";
  permission: "read" | "edit" | "viewer";
  shared_to?: string;
}

export default function ShareButton({ todo_id }: ShareButtonProps) {
  const [showModal, setShowModal] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
  // Share settings
  const [accessType, setAccessType] = useState<"public" | "invited">("public");
  const [permission, setPermission] = useState<"read" | "edit" | "viewer">("read");
  const [inviteEmail, setInviteEmail] = useState("");
  const [showAccessDropdown, setShowAccessDropdown] = useState(false);
  
  // Current share data
  const [shareData, setShareData] = useState<ShareData | null>(null);

  const modalRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const checkExistingShare = useCallback(async () => {
    try {
      const res = await fetch("/api/shared", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ todo_id, access_type: "public", permission: "read" }),
      });

      const data = await res.json();
      if (res.ok && data.shared_id) {
        setShareData(data);
        setAccessType(data.access_type || "public");
        setPermission(data.permission || "read");
        if (data.shared_to) setInviteEmail(data.shared_to);
      }
    } catch (error) {
      console.error("Error checking existing share:", error);
    }
  }, [todo_id]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setShowModal(false);
      }
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowAccessDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Check existing share when modal opens
  useEffect(() => {
    if (showModal && !shareData) {
      checkExistingShare();
    }
  }, [showModal, checkExistingShare, shareData]);

  const showMessage = (message: string, type: "success" | "error") => {
    if (type === "success") {
      setSuccessMsg(message);
      setTimeout(() => setSuccessMsg(null), 3000);
    } else {
      setErrorMsg(message);
      setTimeout(() => setErrorMsg(null), 3000);
    }
  };

  const handleCreateShare = async () => {
    setErrorMsg(null);
    setLoading(true);
    
    try {
      const payload: {
        todo_id: string;
        access_type: string;
        permission: string;
        shared_to?: string;
      } = { 
        todo_id, 
        access_type: accessType, 
        permission 
      };
      
      if (accessType === "invited" && inviteEmail.trim()) {
        payload.shared_to = inviteEmail.trim();
      }

      const res = await fetch("/api/shared", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok && data.share_url) {
        setShareData(data);
        showMessage("Share link created!", "success");
      } else {
        showMessage(data.error || "Failed to create share", "error");
      }
    } catch (error) {
      console.error("Error creating share:", error);
      showMessage("Something went wrong", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleCopyLink = async () => {
    if (!shareData?.share_url) return;
    
    try {
      await navigator.clipboard.writeText(shareData.share_url);
      showMessage("Link copied to clipboard", "success");
    } catch (error) {
      showMessage("Failed to copy link", "error");
    }
  };

  const handleUpdateShare = async () => {
    if (!shareData?.shared_id) return;
    
    setLoading(true);
    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      const payload: {
        access_type: string;
        permission: string;
        shared_to?: string;
      } = { 
        access_type: accessType, 
        permission 
      };
      
      if (accessType === "invited" && inviteEmail.trim()) {
        payload.shared_to = inviteEmail.trim();
      }

      const res = await fetch(`/api/shared/${shareData.shared_id}`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setShareData({ ...shareData, access_type: accessType, permission });
        showMessage("Settings updated", "success");
      } else {
        const data = await res.json();
        showMessage(data.error || "Failed to update", "error");
      }
    } catch (error) {
      console.error("Error updating share:", error);
      showMessage("Failed to update share", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteShare = async () => {
    if (!shareData?.shared_id || !confirm("Stop sharing this task?")) return;
    
    setLoading(true);
    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      const res = await fetch(`/api/shared/${shareData.shared_id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` },
      });

      if (res.ok) {
        setShareData(null);
        setAccessType("public");
        setPermission("read");
        setInviteEmail("");
        showMessage("Sharing stopped", "success");
      } else {
        const data = await res.json();
        showMessage(data.error || "Failed to stop sharing", "error");
      }
    } catch (error) {
      console.error("Error deleting share:", error);
      showMessage("Failed to stop sharing", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleInvite = () => {
    if (shareData) {
      handleUpdateShare();
    } else {
      handleCreateShare();
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setShowModal(true)}
        className={`px-4 py-2 rounded-lg border transition-colors text-sm font-medium ${
          shareData 
            ? "bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100" 
            : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
        }`}
      >
        <FiShare2 className="w-4 h-4 inline mr-2" />
        Share
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center p-4">
          <div 
            ref={modalRef}
            className="bg-white rounded-lg shadow-xl w-full max-w-md"
          >
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium text-gray-900">Share Task</h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600 p-1"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="px-6 py-4 space-y-4">
              {/* Email Input */}
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Add people and groups"
                  value={inviteEmail}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInviteEmail(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-gray-900"
                />
                <button
                  onClick={handleInvite}
                  disabled={loading || (accessType === "invited" && !inviteEmail.trim())}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 text-sm font-medium"
                >
                  {loading ? "..." : shareData ? "Update" : "Invite"}
                </button>
              </div>

              {/* Invited Users (if any) */}
              {shareData?.shared_to && (
                <div className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                      {shareData.shared_to.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-sm text-gray-900">{shareData.shared_to}</span>
                  </div>
                  <select
                    value={permission}
                    onChange={(e) => setPermission(e.target.value as "read" | "edit" | "viewer")}
                    className="text-sm border-none bg-transparent focus:ring-0 text-gray-600"
                  >
                    <option value="read">Can view</option>
                    <option value="viewer">Can view (detailed)</option>
                    <option value="edit">Can edit</option>
                  </select>
                </div>
              )}

              {/* General Access */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">General access</h3>
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setShowAccessDropdown(!showAccessDropdown)}
                    className="w-full flex items-center justify-between p-3 border border-gray-300 rounded-lg hover:bg-gray-50 text-left"
                  >
                    <div className="flex items-center gap-3">
                      {accessType === "public" ? (
                        <FiGlobe className="w-5 h-5 text-gray-600" />
                      ) : (
                        <FiLock className="w-5 h-5 text-gray-600" />
                      )}
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {accessType === "public" ? "Anyone with the link" : "Only people invited"}
                        </div>
                        <div className="text-xs text-gray-500">
                          {accessType === "public" ? "Anyone on the internet with the link can view" : "Only people you invite can access"}
                        </div>
                      </div>
                    </div>
                    <FiChevronDown className="w-4 h-4 text-gray-600" />
                  </button>

                  {showAccessDropdown && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                      <button
                        onClick={() => {
                          setAccessType("invited");
                          setShowAccessDropdown(false);
                        }}
                        className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 text-left"
                      >
                        <FiLock className="w-5 h-5 text-gray-600" />
                        <div>
                          <div className="text-sm font-medium text-gray-900">Only people invited</div>
                          <div className="text-xs text-gray-500">Only people you invite can access</div>
                        </div>
                        {accessType === "invited" && <FiCheck className="w-4 h-4 text-blue-600 ml-auto" />}
                      </button>
                      <button
                        onClick={() => {
                          setAccessType("public");
                          setShowAccessDropdown(false);
                        }}
                        className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 text-left"
                      >
                        <FiGlobe className="w-5 h-5 text-gray-600" />
                        <div>
                          <div className="text-sm font-medium text-gray-900">Anyone with the link</div>
                          <div className="text-xs text-gray-500">Anyone on the internet with the link can view</div>
                        </div>
                        {accessType === "public" && <FiCheck className="w-4 h-4 text-blue-600 ml-auto" />}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
              <div className="flex gap-2">
                {shareData && (
                  <>
                    <button
                      onClick={handleCopyLink}
                      className="flex items-center gap-2 px-3 py-1.5 text-blue-600 hover:bg-blue-50 rounded text-sm"
                    >
                      <FiCopy className="w-4 h-4" />
                      Copy link
                    </button>
                    <button
                      onClick={handleDeleteShare}
                      disabled={loading}
                      className="flex items-center gap-2 px-3 py-1.5 text-red-600 hover:bg-red-50 rounded text-sm disabled:opacity-50"
                    >
                      <FiTrash2 className="w-4 h-4" />
                      Stop sharing
                    </button>
                  </>
                )}
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 text-sm"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Messages */}
      {successMsg && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-4 py-2 rounded-lg shadow-lg z-[9999] text-sm">
          {successMsg}
        </div>
      )}

      {errorMsg && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg z-[9999] text-sm">
          {errorMsg}
        </div>
      )}
    </>
  );
}