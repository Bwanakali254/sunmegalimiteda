import React from "react";

const Customers = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">Customers</h2>
        <p className="text-gray-500 text-sm">
          All customers who have interacted with Sun Mega Limited
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm">
        <div className="hidden md:grid grid-cols-5 px-5 py-3 text-sm text-gray-500 border-b">
          <span>Name</span>
          <span>Email</span>
          <span>Phone</span>
          <span>Total Orders</span>
          <span>Last Order</span>
        </div>

        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="grid grid-cols-1 md:grid-cols-5 gap-3 px-5 py-4 border-b text-sm"
          >
            <span>John Doe</span>
            <span>john@example.com</span>
            <span>+254700000000</span>
            <span>3</span>
            <span>12/01/2026</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Customers;
