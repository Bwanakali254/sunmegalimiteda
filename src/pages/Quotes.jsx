import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";

const Quotes = ({ token }) => {
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    const fetchQuotes = async () => {
      const res = await axios.get(backendUrl + "/api/quote/list");
      if (res.data.success) setQuotes(res.data.quotes);
    };
    fetchQuotes();
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Quotes</h2>

      <div className="bg-white rounded-xl shadow-sm">
        <div className="grid grid-cols-6 px-5 py-3 text-sm text-gray-500 border-b">
          <span>Name</span>
          <span>Email</span>
          <span>Phone</span>
          <span>System</span>
          <span>Capacity</span>
          <span>Status</span>
        </div>

        {quotes.map((q) => (
          <div key={q._id} className="grid grid-cols-6 px-5 py-4 border-b text-sm">
            <span>{q.name}</span>
            <span>{q.email}</span>
            <span>{q.phone}</span>
            <span>{q.systemType}</span>
            <span>{q.capacity}</span>
            <span>{q.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Quotes;
