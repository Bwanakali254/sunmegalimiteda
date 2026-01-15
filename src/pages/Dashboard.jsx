import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { ShoppingCart, Users, Package, DollarSign } from "lucide-react";

const StatCard = ({ title, value, icon: Icon, color }) => (
  <div className="bg-white rounded-xl shadow-sm p-5 flex items-center justify-between">
    <div>
      <p className="text-sm text-gray-500">{title}</p>
      <h3 className="text-2xl font-semibold mt-1">{value}</h3>
    </div>
    <div className={`p-3 rounded-full ${color}`}>
      <Icon className="text-white" size={22} />
    </div>
  </div>
);

const Dashboard = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (!token) return;

    const fetchData = async () => {
      try {
        const ordersRes = await axios.post(
          backendUrl + "/api/order/list",
          {},
          { headers: { token } }
        );
        if (ordersRes.data.success) {
          setOrders(ordersRes.data.orders);
        }

        const productsRes = await axios.get(
          backendUrl + "/api/product/list"
        );
        if (productsRes.data.success) {
          setProducts(productsRes.data.products);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [token]);

  const totalOrders = orders.length;

  const totalRevenue = orders.reduce(
    (sum, o) => sum + Number(o.amount || 0),
    0
  );

  const totalProducts = products.length;

  const uniqueCustomers = new Set(
    orders.map((o) => o.address?.phone || o.userId)
  ).size;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">Dashboard</h2>
        <p className="text-gray-500 text-sm">
          Overview of Sun Mega Limited performance
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Orders"
          value={totalOrders}
          icon={ShoppingCart}
          color="bg-green-600"
        />
        <StatCard
          title="Customers"
          value={uniqueCustomers}
          icon={Users}
          color="bg-blue-600"
        />
        <StatCard
          title="Products"
          value={totalProducts}
          icon={Package}
          color="bg-purple-600"
        />
        <StatCard
          title="Revenue"
          value={`${currency} ${totalRevenue.toLocaleString()}`}
          icon={DollarSign}
          color="bg-amber-600"
        />
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl shadow-sm p-5">
        <h4 className="font-medium mb-4">Recent Orders</h4>
        <div className="space-y-3">
          {orders.slice(0, 5).map((o) => (
            <div
              key={o._id}
              className="flex justify-between items-center border-b pb-2 text-sm"
            >
              <div>
                <p className="font-medium">
                  {o.address.firstName} {o.address.lastName}
                </p>
                <p className="text-gray-500">
                  {new Date(o.date).toLocaleDateString()}
                </p>
              </div>
              <span className="text-green-600 font-medium">
                {currency} {o.amount}
              </span>
            </div>
          ))}
          {orders.length === 0 && (
            <p className="text-gray-400 text-sm">No orders yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
