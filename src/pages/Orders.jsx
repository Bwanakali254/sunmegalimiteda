import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) return;
    try {
      const response = await axios.post(
        backendUrl + "/api/order/list",
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/order/status",
        { orderId, status: event.target.value },
        { headers: { token } }
      );
      if (response.data.success) {
        await fetchAllOrders();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">Orders</h2>
        <p className="text-gray-500 text-sm">Manage customer solar orders</p>
      </div>

      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white rounded-xl shadow-sm p-5 grid grid-cols-1 lg:grid-cols-5 gap-4"
          >
            {/* Customer */}
            <div>
              <p className="font-medium">
                {order.address.firstName} {order.address.lastName}
              </p>
              <p className="text-sm text-gray-500">{order.address.phone}</p>
            </div>

            {/* Items with Images */}
            <div>
              <p className="font-medium mb-2">Items</p>
              <div className="space-y-2">
                {order.items.map((item, i) => {
                  const img =
                    item.image?.[0] ||
                    item.image ||
                    "https://via.placeholder.com/40";

                  return (
                    <div key={i} className="flex items-center gap-3">
                      <img
                        src={img}
                        alt={item.name}
                        className="w-10 h-10 object-cover rounded-md border"
                      />
                      <div>
                        <p className="text-sm font-medium">{item.name}</p>
                        <p className="text-xs text-gray-500">
                          Qty: {item.quantity}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Payment */}
            <div>
              <p className="font-medium mb-1">Payment</p>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  order.payment
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {order.payment ? "Paid" : "Pending"}
              </span>
              <p className="text-sm mt-1">
                {currency}
                {order.amount}
              </p>
            </div>

            {/* Date */}
            <div>
              <p className="font-medium mb-1">Date</p>
              <p className="text-sm text-gray-600">
                {new Date(order.date).toLocaleDateString()}
              </p>
            </div>

            {/* Status */}
            <div>
              <p className="font-medium mb-1">Order Status</p>
              <select
                onChange={(e) => statusHandler(e, order._id)}
                value={order.status}
                className="w-full border rounded-lg px-3 py-2"
              >
                <option value="Order Placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
