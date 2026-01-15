import React from "react";

const Settings = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Settings</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm space-y-4">
          <h4 className="font-medium">Admin Profile</h4>
          <input className="border px-4 py-2 w-full rounded-lg" placeholder="Name" />
          <input className="border px-4 py-2 w-full rounded-lg" placeholder="Email" />
          <button className="bg-green-600 text-white px-5 py-2 rounded-lg">
            Save
          </button>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm space-y-4">
          <h4 className="font-medium">Change Password</h4>
          <input type="password" className="border px-4 py-2 w-full rounded-lg" placeholder="Old password" />
          <input type="password" className="border px-4 py-2 w-full rounded-lg" placeholder="New password" />
          <button className="bg-green-600 text-white px-5 py-2 rounded-lg">
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
