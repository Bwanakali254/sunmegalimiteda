import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";


const Messages = ({ token }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      const res = await axios.get(backendUrl + "/api/contact/list");
      if (res.data.success) setMessages(res.data.messages);
    };
    fetchMessages();
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Messages</h2>

      <div className="bg-white rounded-xl shadow-sm divide-y">
        {messages.map((m) => (
          <div key={m._id} className="p-5">
            <div className="flex justify-between">
              <p className="font-medium">{m.name}</p>
              <span className="text-sm text-gray-400">
                {new Date(m.date).toLocaleString()}
              </span>
            </div>
            <p className="text-sm text-gray-600">{m.email}</p>
            <p className="mt-2 text-gray-700">{m.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Messages;
