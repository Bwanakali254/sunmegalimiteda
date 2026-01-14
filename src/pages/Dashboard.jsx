const Dashboard = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Dashboard</h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-5 rounded-xl shadow-sm">
          <p className="text-gray-500 text-sm">Total Orders</p>
          <h3 className="text-2xl font-bold mt-2">—</h3>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm">
          <p className="text-gray-500 text-sm">Revenue</p>
          <h3 className="text-2xl font-bold mt-2">—</h3>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm">
          <p className="text-gray-500 text-sm">Pending Payments</p>
          <h3 className="text-2xl font-bold mt-2">—</h3>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm">
          <p className="text-gray-500 text-sm">Customers</p>
          <h3 className="text-2xl font-bold mt-2">—</h3>
        </div>
      </div>

      {/* Placeholder Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-5 rounded-xl shadow-sm min-h-[200px]">
          <p className="font-medium mb-2">Sales Overview</p>
          <p className="text-gray-400 text-sm">Chart will go here</p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm min-h-[200px]">
          <p className="font-medium mb-2">Latest Orders</p>
          <p className="text-gray-400 text-sm">Recent orders table will go here</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
