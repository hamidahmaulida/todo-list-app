"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser, useClerk } from "@clerk/nextjs";
import { FiUser, FiMail, FiShield, FiTrash2, FiSave, FiArrowLeft } from "react-icons/fi";

export default function SettingsPage() {
  const router = useRouter();
  const { user, isLoaded } = useUser();
  const { signOut } = useClerk();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  // Form states
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  // Password change states
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setEmail(user.primaryEmailAddress?.emailAddress || "");
    }
  }, [user]);

  const handleUpdateProfile = async () => {
    if (!user) return;

    try {
      setLoading(true);
      setError(null);
      setSuccess(null);

      await user.update({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
      });

      setSuccess("Profile updated successfully!");
    } catch (err: any) {
      console.error("Update profile error:", err);
      setError(err.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async () => {
    if (!user) return;

    if (newPassword !== confirmPassword) {
      setError("New passwords don't match");
      return;
    }

    if (newPassword.length < 8) {
      setError("New password must be at least 8 characters long");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setSuccess(null);

      await user.updatePassword({
        currentPassword,
        newPassword,
      });

      setSuccess("Password updated successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setShowPasswordForm(false);
    } catch (err: any) {
      console.error("Update password error:", err);
      setError(err.errors?.[0]?.message || "Failed to update password");
    } finally {
      setLoading(false);
    }
  };

  const handleDeactivate = async () => {
    try {
      setLoading(true);
      setError(null);

      await signOut();
      router.push("/sign-in");

    } catch (err: any) {
      console.error("Deactivate error:", err);
      setError("Failed to deactivate account");
    } finally {
      setLoading(false);
      setConfirmOpen(false);
    }
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (!user) {
    router.push("/sign-in");
    return null;
  }

  const inputClass =
    "w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-black placeholder-gray-400 focus:ring-2 focus:ring-[#0F766E] focus:border-transparent";

  const disabledInputClass =
    "flex-1 px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-700 placeholder-gray-400 cursor-not-allowed";

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <div className="pt-20 px-6 pb-24 max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => router.back()}
            className="p-2 rounded-lg hover:bg-white shadow-sm transition"
          >
            <FiArrowLeft className="w-5 h-5 text-[#0F766E]" />
          </button>
          <h1 className="text-3xl font-bold text-[#0F766E]">Account Settings</h1>
        </div>

        {/* Alerts */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
            {success}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Information */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-6">
                <FiUser className="w-5 h-5 text-[#0F766E]" />
                <h2 className="text-xl font-semibold text-gray-900">Profile Information</h2>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className={inputClass}
                      placeholder="Enter your first name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className={inputClass}
                      placeholder="Enter your last name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="flex items-center gap-2">
                    <FiMail className="w-4 h-4 text-gray-400" />
                    <input
                      type="email"
                      value={email}
                      disabled
                      className={disabledInputClass}
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    Email cannot be changed. Contact support if needed.
                  </p>
                </div>

                <button
                  onClick={handleUpdateProfile}
                  disabled={loading}
                  className="inline-flex items-center gap-2 px-6 py-2 bg-[#0F766E] text-white rounded-lg hover:bg-[#115E59] disabled:opacity-50 disabled:cursor-not-allowed transition font-medium"
                >
                  <FiSave className="w-4 h-4" />
                  {loading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>

            {/* Password Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mt-6">
              <div className="flex items-center gap-3 mb-6">
                <FiShield className="w-5 h-5 text-[#0F766E]" />
                <h2 className="text-xl font-semibold text-gray-900">Password & Security</h2>
              </div>

              {!showPasswordForm ? (
                <div>
                  <p className="text-gray-600 mb-4">
                    Change your password to keep your account secure.
                  </p>
                  <button
                    onClick={() => setShowPasswordForm(true)}
                    className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
                  >
                    Change Password
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Password
                    </label>
                    <input
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className={inputClass}
                      placeholder="Enter current password"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      New Password
                    </label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className={inputClass}
                      placeholder="Enter new password"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className={inputClass}
                      placeholder="Confirm new password"
                    />
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={handleChangePassword}
                      disabled={loading || !currentPassword || !newPassword || !confirmPassword}
                      className="px-4 py-2 bg-[#0F766E] text-white rounded-lg hover:bg-[#115E59] disabled:opacity-50 disabled:cursor-not-allowed transition"
                    >
                      {loading ? "Updating..." : "Update Password"}
                    </button>
                    <button
                      onClick={() => {
                        setShowPasswordForm(false);
                        setCurrentPassword("");
                        setNewPassword("");
                        setConfirmPassword("");
                        setError(null);
                      }}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Account Actions */}
          <div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-6">
                <FiShield className="w-5 h-5 text-[#0F766E]" />
                <h2 className="text-xl font-semibold text-gray-900">Account</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Account Status</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Your account is currently active and in good standing.
                  </p>
                </div>

                <div className="border-t pt-4">
                  <h3 className="font-medium text-red-600 mb-2">Danger Zone</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Deactivating your account will sign you out and prevent access to your data.
                  </p>
                  <button
                    onClick={() => setConfirmOpen(true)}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm"
                  >
                    <FiTrash2 className="w-4 h-4" />
                    Deactivate Account
                  </button>
                </div>
              </div>
            </div>

            {/* Account Info */}
            <div className="mt-6 bg-gray-50 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">Account Info</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <div>
                  <span className="font-medium">User ID:</span> {user.id}
                </div>
                <div>
                  <span className="font-medium">Created:</span>{" "}
                  {new Date(user.createdAt || "").toLocaleDateString()}
                </div>
                <div>
                  <span className="font-medium">Last Sign In:</span>{" "}
                  {new Date(user.lastSignInAt || "").toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Confirmation Modal */}
        {confirmOpen && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-red-100 rounded-full">
                  <FiTrash2 className="w-6 h-6 text-red-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Deactivate Account
                </h2>
              </div>

              <p className="text-gray-600 mb-6">
                Are you sure you want to deactivate your account? You will be signed out 
                and won't be able to access your data until you sign in again.
              </p>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setConfirmOpen(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeactivate}
                  disabled={loading}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 transition"
                >
                  {loading ? "Processing..." : "Deactivate"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
