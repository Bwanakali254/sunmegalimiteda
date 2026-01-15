import React from "react";
import {
  ShoppingCart,
  Users,
  Package,
  DollarSign,
} from "lucide-react";

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

const Dashboard = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
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
          value="120"
          icon={ShoppingCart}
          color="bg-green-600"
        />
        <StatCard
          title="Customers"
          value="85"
          icon={Users}
          color="bg-blue-600"
        />
        <StatCard
          title="Products"
          value="42"
          icon={Package}
          color="bg-purple-600"
        />
        <StatCard
          title="Revenue"
          value="KES 1,250,000"
          icon={DollarSign}
          color="bg-amber-600"
        />
      </div>

      {/* Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white rounded-xl shadow-sm p-5">
          <h4 className="font-medium mb-4">Recent Orders</h4>
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="flex justify-between items-center border-b pb-2 text-sm"
              >
                <div>
                  <p className="font-medium">Order #{1000 + i}</p>
                  <p className="text-gray-500">Customer {i}</p>
                </div>
                <span className="text-green-600 font-medium">
                  KES {i * 15000}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Activity */}
        <div className="bg-white rounded-xl shadow-sm p-5">
          <h4 className="font-medium mb-4">Recent Activity</h4>
          <div className="space-y-3 text-sm text-gray-600">
            <p>• New order placed by John Doe</p>
            <p>• Product “Solar Inverter” added</p>
            <p>• Order #1023 marked as Shipped</p>
            <p>• New quote request received</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
