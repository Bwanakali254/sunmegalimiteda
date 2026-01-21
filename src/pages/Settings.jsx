import React, { useState, useEffect } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Settings = ({ token }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Invite admin state
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteName, setInviteName] = useState("");
  const [inviteLoading, setInviteLoading] = useState(false);

  useEffect(() => {
    fetchAdminProfile();
  }, [token]);

  const fetchAdminProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(backendUrl + "/api/user/admin/profile", {
        headers: { token },
      });

      if (response.data.success) {
        setProfile(response.data.profile);
      } else {
        setError(response.data.message || "Failed to load profile");
        toast.error(response.data.message || "Failed to load profile");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load profile");
      toast.error(err.response?.data?.message || "Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleInviteAdmin = async (e) => {
    e.preventDefault();
    
    if (!inviteEmail || !inviteName) {
      toast.error("Email and name are required");
      return;
    }

    try {
      setInviteLoading(true);
      const response = await axios.post(
        backendUrl + "/api/user/admin/invite",
        { email: inviteEmail, name: inviteName },
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success("Admin invitation sent successfully!");
        setInviteEmail("");
        setInviteName("");
      } else {
        toast.error(response.data.message || "Failed to send invitation");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send invitation");
    } finally {
      setInviteLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Settings</h2>

      {loading ? (
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <p className="text-gray-500">Loading profile...</p>
        </div>
      ) : error ? (
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <p className="text-red-500">{error}</p>
          <button
            onClick={fetchAdminProfile}
            className="mt-4 bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700"
          >
            Retry
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm space-y-4">
            <h4 className="font-medium text-lg mb-4">Admin Profile</h4>
            
            <div className="space-y-3">
              <div>
                <label className="text-sm text-gray-600 font-medium">Name</label>
                <p className="text-gray-900 mt-1">{profile?.name || "N/A"}</p>
              </div>

              <div>
                <label className="text-sm text-gray-600 font-medium">Email</label>
                <p className="text-gray-900 mt-1">{profile?.email || "N/A"}</p>
              </div>

              <div>
                <label className="text-sm text-gray-600 font-medium">Role</label>
                <p className="text-gray-900 mt-1 capitalize">
                  {profile?.role === "super_admin" ? "Super Admin" : profile?.role || "N/A"}
                </p>
              </div>

              <div>
                <label className="text-sm text-gray-600 font-medium">Account Created</label>
                <p className="text-gray-900 mt-1">{formatDate(profile?.createdAt)}</p>
              </div>

              <div>
                <label className="text-sm text-gray-600 font-medium">Last Login</label>
                <p className="text-gray-900 mt-1">{formatDate(profile?.lastLogin)}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm space-y-4">
            <h4 className="font-medium">Change Password</h4>
            <input
              type="password"
              className="border px-4 py-2 w-full rounded-lg"
              placeholder="Old password"
            />
            <input
              type="password"
              className="border px-4 py-2 w-full rounded-lg"
              placeholder="New password"
            />
            <button className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700">
              Update
            </button>
          </div>
        </div>
      )}

      {/* Invite Admin Section - Super Admin Only */}
      {!loading && !error && profile?.role === "super_admin" && (
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h4 className="font-medium text-lg mb-4">Invite Admin</h4>
          <p className="text-sm text-gray-600 mb-4">
            Send an invitation to add a new admin to the system.
          </p>
          
          <form onSubmit={handleInviteAdmin} className="space-y-4">
            <div>
              <label className="text-sm text-gray-700 font-medium block mb-2">
                Admin Name
              </label>
              <input
                type="text"
                value={inviteName}
                onChange={(e) => setInviteName(e.target.value)}
                className="border px-4 py-2 w-full rounded-lg focus:outline-none focus:border-green-500"
                placeholder="Enter admin name"
                required
                disabled={inviteLoading}
              />
            </div>

            <div>
              <label className="text-sm text-gray-700 font-medium block mb-2">
                Admin Email
              </label>
              <input
                type="email"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                className="border px-4 py-2 w-full rounded-lg focus:outline-none focus:border-green-500"
                placeholder="Enter admin email"
                required
                disabled={inviteLoading}
              />
            </div>

            <button
              type="submit"
              disabled={inviteLoading}
              className={`bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition ${
                inviteLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {inviteLoading ? "Sending Invite..." : "Send Invite"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Settings;
