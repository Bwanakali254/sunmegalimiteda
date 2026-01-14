import React from "react";

const Messages = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">Messages</h2>
        <p className="text-gray-500 text-sm">
          Customer inquiries and contact messages
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm divide-y">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="p-5 hover:bg-gray-50 transition cursor-pointer"
          >
            <div className="flex justify-between">
              <p className="font-medium">Customer {i}</p>
              <span className="text-sm text-gray-400">10:30 AM</span>
            </div>
            <p className="text-sm text-gray-600 mt-1 line-clamp-2">
              I would like to know more about solar installation for my home...
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Messages;
