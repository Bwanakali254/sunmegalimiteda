import React from "react";

const Settings = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">Settings</h2>
        <p className="text-gray-500 text-sm">
          Manage Sun Mega Limited admin settings
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile */}
        <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
          <h4 className="font-medium">Admin Profile</h4>
          <input
            className="w-full border rounded-lg px-4 py-2"
            placeholder="Admin Name"
          />
          <input
            className="w-full border rounded-lg px-4 py-2"
            placeholder="Email"
          />
          <button className="px-5 py-2 bg-green-600 text-white rounded-lg">
            Save Changes
          </button>
        </div>

        {/* Password */}
        <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
          <h4 className="font-medium">Change Password</h4>
          <input
            type="password"
            className="w-full border rounded-lg px-4 py-2"
            placeholder="Old Password"
          />
          <input
            type="password"
            className="w-full border rounded-lg px-4 py-2"
            placeholder="New Password"
          />
          <button className="px-5 py-2 bg-green-600 text-white rounded-lg">
            Update Password
          </button>
        </div>

        {/* Business Info */}
        <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
          <h4 className="font-medium">Business Information</h4>
          <input
            className="w-full border rounded-lg px-4 py-2"
            placeholder="Business Name"
          />
          <input
            className="w-full border rounded-lg px-4 py-2"
            placeholder="Phone"
          />
          <input
            className="w-full border rounded-lg px-4 py-2"
            placeholder="Address"
          />
          <button className="px-5 py-2 bg-green-600 text-white rounded-lg">
            Save Info
          </button>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
          <h4 className="font-medium">Notifications</h4>
          <div className="flex items-center gap-2">
            <input type="checkbox" />
            <span>Email notifications</span>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" />
            <span>Order alerts</span>
          </div>
          <button className="px-5 py-2 bg-green-600 text-white rounded-lg">
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
