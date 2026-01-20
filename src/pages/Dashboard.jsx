import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import {
  ShoppingCart,
  Users,
  Package,
  DollarSign,
} from "lucide-react";
import { Doughnut, Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  BarElement
);

const StatCard = ({ title, value, icon: Icon, color }) => (
  <div className="bg-white rounded-2xl p-5 shadow-sm flex items-center gap-4">
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
      <Icon className="text-white" />
    </div>
    <div>
      <p className="text-sm text-gray-500">{title}</p>
      <h3 className="text-xl font-bold">{value}</h3>
    </div>
  </div>
);

const Dashboard = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;

    const fetchData = async () => {
      try {
        setLoading(true);

        const ordersRes = await axios.post(
          backendUrl + "/api/order/list",
          {},
          { headers: { token } }
        );
        if (ordersRes.data.success) {
          setOrders(ordersRes.data.orders || []);
        }

        const productsRes = await axios.get(backendUrl + "/api/product/list");
        if (productsRes.data.success) {
          setProducts(productsRes.data.products || []);
        }
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, o) => sum + Number(o.amount || 0), 0);
  const totalProducts = products.length;
  const uniqueCustomers = new Set(
    orders.map((o) => o.address?.phone || o.userId)
  ).size;

  const customerPercent = Math.min(100, Math.round((uniqueCustomers / 100) * 100));

  const doughnutData = {
    labels: ["Customers", "Remaining"],
    datasets: [
      {
        data: [customerPercent, 100 - customerPercent],
        backgroundColor: ["#8b5cf6", "#e5e7eb"],
        borderWidth: 0,
      },
    ],
  };

  const lineChartData = {
    labels: ["Jan", "Mar", "May", "Jul", "Sep", "Dec"],
    datasets: [
      {
        label: "Current Year",
        data: [20, 35, 30, 50, 45, 55],
        borderColor: "#8b5cf6",
        backgroundColor: "transparent",
        tension: 0.4,
      },
      {
        label: "Last Year",
        data: [15, 25, 28, 40, 35, 42],
        borderColor: "#ef4444",
        backgroundColor: "transparent",
        tension: 0.4,
      },
    ],
  };

  const barChartData = {
    labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri"],
    datasets: [
      {
        label: "This Week",
        data: [12, 18, 14, 22, 19, 25],
        backgroundColor: "#8b5cf6",
      },
      {
        label: "Last Week",
        data: [10, 15, 12, 18, 16, 20],
        backgroundColor: "#ef4444",
      },
    ],
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="bg-[#f6f7fb] min-h-screen p-6 space-y-8">
      {/* Header */}
      <div className="bg-white rounded-2xl p-5 flex justify-between items-center shadow-sm">
        <div>
          <h2 className="text-xl font-bold">Hello, Admin 👋</h2>
          <p className="text-sm text-gray-500">Business performance overview</p>
        </div>
        <input
          placeholder="Search your products..."
          className="border px-4 py-2 rounded-lg w-72 text-sm"
        />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard title="Customers" value={uniqueCustomers} icon={Users} color="bg-purple-500" />
        <StatCard title="Products" value={totalProducts} icon={Package} color="bg-blue-500" />
        <StatCard title="Orders" value={totalOrders} icon={ShoppingCart} color="bg-green-500" />
        <StatCard title="Sales" value={`${currency} ${totalRevenue.toLocaleString()}`} icon={DollarSign} color="bg-orange-500" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm lg:col-span-2">
          <h3 className="font-semibold mb-4">Sales Trend</h3>
          <Line data={lineChartData} />
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <h3 className="font-semibold mb-4">Product Views</h3>
          <Bar data={barChartData} />
        </div>
      </div>

      {/* Bottom */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Orders */}
        <div className="bg-white p-6 rounded-2xl shadow-sm lg:col-span-2">
          <h3 className="font-semibold mb-4">All Orders</h3>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-gray-500">
                <th>Product</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Price</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.slice(0, 5).map((o) => (
                <tr key={o._id} className="border-t">
                  <td>{o.items?.[0]?.name}</td>
                  <td>{o.address?.firstName}</td>
                  <td>{new Date(o.date).toLocaleDateString()}</td>
                  <td>{currency} {o.amount}</td>
                  <td>
                    <span className="px-2 py-1 text-xs rounded bg-green-100 text-green-700">
                      {o.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Top Sold */}
        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <h3 className="font-semibold mb-4">Top Sold Items</h3>
          <div className="space-y-3">
            {products.slice(0, 5).map((p) => (
              <div key={p._id} className="flex justify-between">
                <span>{p.name}</span>
                <span className="text-sm text-gray-500">{p.sold || 0}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
