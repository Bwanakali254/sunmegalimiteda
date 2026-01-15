import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";

const Newsletter = () => {
  const [subs, setSubs] = useState([]);

  useEffect(() => {
    const fetchSubs = async () => {
      const res = await axios.get(backendUrl + "/api/newsletter/list");
      if (res.data.success) setSubs(res.data.subscribers);
    };
    fetchSubs();
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Newsletter</h2>

      <div className="bg-white rounded-xl shadow-sm">
        <div className="grid grid-cols-3 px-5 py-3 text-sm text-gray-500 border-b">
          <span>Email</span>
          <span>Date</span>
          <span>Status</span>
        </div>

        {subs.map((s) => (
          <div key={s._id} className="grid grid-cols-3 px-5 py-4 border-b text-sm">
            <span>{s.email}</span>
            <span>{new Date(s.date).toLocaleDateString()}</span>
            <span>{s.active ? "Active" : "Inactive"}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Newsletter;
