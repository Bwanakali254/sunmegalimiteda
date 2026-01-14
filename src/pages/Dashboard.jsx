const Dashboard = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold">Sun Mega Dashboard</h2>
        <p className="text-gray-500 text-sm">
          Overview of Sun Mega Limited operations
        </p>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Orders", value: "—" },
          { label: "Revenue", value: "—" },
          { label: "Pending Payments", value: "—" },
          { label: "Customers", value: "—" },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-white rounded-xl p-5 shadow-sm"
          >
            <span className="text-gray-500 text-sm">{item.label}</span>
            <span className="text-2xl font-bold block mt-2">{item.value}</span>
          </div>
        ))}
      </div>

      {/* Middle Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <div className="flex justify-between mb-3">
            <p className="font-medium">Recent Orders</p>
            <span className="text-green-600 text-sm cursor-pointer">
              View all
            </span>
          </div>
          <div className="space-y-2 text-sm text-gray-600">
            <p>Solar Inverter — Paid</p>
            <p>Battery Pack — Pending</p>
            <p>Power Converter — Failed</p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm">
          <div className="flex justify-between mb-3">
            <p className="font-medium">Top Products</p>
            <span className="text-green-600 text-sm cursor-pointer">
              View all
            </span>
          </div>
          <div className="space-y-2 text-sm">
            <p>High Voltage Battery</p>
            <p>Hybrid Inverter</p>
            <p>Energy Storage System</p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm">
          <div className="flex justify-between mb-3">
            <p className="font-medium">Earnings</p>
            <span className="text-green-600 text-sm">Monthly</span>
          </div>
          <div className="h-32 flex items-center justify-center text-gray-400">
            Chart placeholder
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <div className="flex justify-between mb-3">
            <p className="font-medium">Revenue Trend</p>
          </div>
          <div className="h-40 flex items-center justify-center text-gray-400">
            Line chart placeholder
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm">
          <div className="flex justify-between mb-3">
            <p className="font-medium">Customer Growth</p>
          </div>
          <div className="h-40 flex items-center justify-center text-gray-400">
            Donut chart placeholder
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
