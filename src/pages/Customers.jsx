import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";

const Customers = ({ token }) => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    if (!token) return;

    const fetchCustomers = async () => {
      const res = await axios.post(
        backendUrl + "/api/order/list",
        {},
        { headers: { token } }
      );

      if (res.data.success) {
        const map = {};
        res.data.orders.forEach((o) => {
          const key = o.address.phone;
          if (!map[key]) {
            map[key] = {
              name: o.address.firstName + " " + o.address.lastName,
              phone: o.address.phone,
              email: o.address.email,
              orders: 1,
              lastOrder: o.date,
            };
          } else {
            map[key].orders += 1;
            map[key].lastOrder = o.date;
          }
        });
        setCustomers(Object.values(map));
      }
    };

    fetchCustomers();
  }, [token]);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Customers</h2>

      <div className="bg-white rounded-xl shadow-sm">
        <div className="grid grid-cols-5 px-5 py-3 text-sm text-gray-500 border-b">
          <span>Name</span>
          <span>Email</span>
          <span>Phone</span>
          <span>Orders</span>
          <span>Last Order</span>
        </div>

        {customers.map((c, i) => (
          <div key={i} className="grid grid-cols-5 px-5 py-4 border-b text-sm">
            <span>{c.name}</span>
            <span>{c.email}</span>
            <span>{c.phone}</span>
            <span>{c.orders}</span>
            <span>{new Date(c.lastOrder).toLocaleDateString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Customers;
