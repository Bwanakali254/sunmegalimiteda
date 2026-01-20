import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  PlusSquare,
  LogOut,
  X,
} from "lucide-react";

const linkBase =
  "flex items-center gap-3 px-4 py-3 rounded-lg transition w-full";
const linkInactive = "text-gray-600 hover:bg-green-50";
const linkActive = "bg-green-100 text-green-700 font-semibold";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  // Handle logout function (you can replace with your actual logout logic)
  const handleLogout = () => {
    // Add your logout logic here
    console.log("Logging out...");
  };

  return (
    <div
      className={`
        fixed sm:static top-0 left-0 z-50
        h-full bg-white shadow-md p-6 w-64
        transform transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        sm:translate-x-0
        flex flex-col
      `}
    >
      {/* Mobile close button */}
      <div className="flex justify-end sm:hidden mb-6">
        <button 
          onClick={() => setSidebarOpen(false)}
          className="text-gray-500 hover:text-gray-700"
        >
          <X size={22} />
        </button>
      </div>

      {/* Overview Section */}
      <div className="mb-8">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 px-4">
          Overview
        </h3>
        <div className="flex flex-col gap-2">
          <NavLink
            to="/"
            end
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `${linkBase} ${isActive ? linkActive : linkInactive}`
            }
          >
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </NavLink>
        </div>
      </div>

      {/* Business Section */}
      <div className="mb-8">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 px-4">
          Business
        </h3>
        <div className="flex flex-col gap-2">
          <NavLink
            to="/products"
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `${linkBase} ${isActive ? linkActive : linkInactive}`
            }
          >
            <Package size={20} />
            <span>Products</span>
          </NavLink>

          <NavLink
            to="/orders"
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `${linkBase} ${isActive ? linkActive : linkInactive}`
            }
          >
            <ShoppingCart size={20} />
            <span>Orders</span>
          </NavLink>

          <NavLink
            to="/products/add"
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `${linkBase} ${isActive ? linkActive : linkInactive}`
            }
          >
            <PlusSquare size={20} />
            <span>Add Product</span>
          </NavLink>
        </div>
      </div>

      {/* Log Out Button */}
      <div className="mt-auto pt-6 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-lg transition w-full text-gray-600 hover:bg-red-50 hover:text-red-600"
        >
          <LogOut size={20} />
          <span>Log Out</span>
        </button>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 sm:hidden z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default Sidebar;