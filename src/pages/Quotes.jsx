import React from "react";

const Quotes = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">Quotes</h2>
        <p className="text-gray-500 text-sm">
          Customer requests for solar system quotations
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm">
        <div className="hidden md:grid grid-cols-6 px-5 py-3 text-sm text-gray-500 border-b">
          <span>Name</span>
          <span>Email</span>
          <span>Phone</span>
          <span>System Type</span>
          <span>Capacity</span>
          <span>Status</span>
        </div>

        {["New", "Reviewed", "Sent", "Approved"].map((status, i) => (
          <div
            key={i}
            className="grid grid-cols-1 md:grid-cols-6 gap-3 px-5 py-4 border-b text-sm"
          >
            <span>Jane Doe</span>
            <span>jane@email.com</span>
            <span>+254711111111</span>
            <span>Home Solar</span>
            <span>5kW</span>
            <span
              className={`font-medium ${
                status === "Approved"
                  ? "text-green-600"
                  : status === "New"
                  ? "text-blue-600"
                  : "text-yellow-600"
              }`}
            >
              {status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Quotes;
