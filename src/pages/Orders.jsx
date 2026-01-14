import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

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
      console.log(error);
      toast.error("Failed to update status");
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div>
      <h3 className="text-2xl font-semibold mb-6">Orders</h3>

      <div className="flex flex-col gap-5">
        {orders.map((order, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-sm p-5 grid grid-cols-1 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-4 text-sm text-gray-700"
          >
            {/* Items & Customer */}
            <div className="flex gap-4">
              <img className="w-12 h-12" src={assets.parcel_icon} alt="" />
              <div>
                {order.items.map((item, i) => (
                  <p key={i} className="text-sm">
                    {item.name} x {item.quantity}
                  </p>
                ))}

                <p className="mt-2 font-medium">
                  {order.address.firstName} {order.address.lastName}
                </p>
                <p>
                  {order.address.street}, {order.address.city},{" "}
                  {order.address.country}
                </p>
                <p>{order.address.phone}</p>
              </div>
            </div>

            {/* Order Info */}
            <div>
              <p>Items: {order.items.length}</p>
              <p className="mt-2">Method: {order.paymentMethod}</p>
              <p className="mt-1">
                Payment:{" "}
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    order.payment
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {order.payment ? "Done" : "Pending"}
                </span>
              </p>
              <p className="mt-1">
                Date: {new Date(order.date).toLocaleDateString()}
              </p>
            </div>

            {/* Amount */}
            <div className="font-semibold text-base">
              {currency}
              {order.amount}
            </div>

            {/* Status */}
            <div>
              <select
                onChange={(event) => statusHandler(event, order._id)}
                value={order.status}
                className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              >
                <option value="Pending Payment">Pending Payment</option>
                <option value="Payment Received">Payment Received</option>
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
