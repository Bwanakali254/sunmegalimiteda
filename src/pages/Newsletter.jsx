import React from "react";

const Newsletter = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">Newsletter</h2>
        <p className="text-gray-500 text-sm">
          Subscribers to Sun Mega Limited updates
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm">
        <div className="hidden md:grid grid-cols-3 px-5 py-3 text-sm text-gray-500 border-b">
          <span>Email</span>
          <span>Subscribed On</span>
          <span>Status</span>
        </div>

        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="grid grid-cols-1 md:grid-cols-3 gap-3 px-5 py-4 border-b text-sm"
          >
            <span>user{i}@mail.com</span>
            <span>14/01/2026</span>
            <span className="text-green-600 font-medium">Active</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Newsletter;
