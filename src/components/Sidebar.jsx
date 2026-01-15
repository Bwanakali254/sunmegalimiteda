import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingCart,
  PlusSquare,
  List,
  X,
} from "lucide-react";

const linkBase =
  "flex items-center gap-3 px-4 py-3 rounded-lg transition w-full";
const linkInactive = "text-gray-600 hover:bg-green-50";
const linkActive = "bg-green-100 text-green-700 font-semibold";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <div
      className={`
        fixed sm:static top-0 left-0 z-50
        h-full bg-white shadow-md p-4 w-64
        transform transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        sm:translate-x-0
      `}
    >
      {/* Mobile close button */}
      <div className="flex justify-end sm:hidden mb-4">
        <button onClick={() => setSidebarOpen(false)}>
          <X size={22} />
        </button>
      </div>

      <div className="flex flex-col gap-1">
        <NavLink
          to="/"
          onClick={() => setSidebarOpen(false)}
          className={({ isActive }) =>
            `${linkBase} ${isActive ? linkActive : linkInactive}`
          }
        >
          <LayoutDashboard size={20} />
          <span className="hidden sm:block">Dashboard</span>
        </NavLink>

        <NavLink
          to="/orders"
          onClick={() => setSidebarOpen(false)}
          className={({ isActive }) =>
            `${linkBase} ${isActive ? linkActive : linkInactive}`
          }
        >
          <ShoppingCart size={20} />
          <span className="hidden sm:block">Orders</span>
        </NavLink>

        <NavLink
          to="/products/add"
          onClick={() => setSidebarOpen(false)}
          className={({ isActive }) =>
            `${linkBase} ${isActive ? linkActive : linkInactive}`
          }
        >
          <PlusSquare size={20} />
          <span className="hidden sm:block">Add Product</span>
        </NavLink>

        <NavLink
          to="/products"
          onClick={() => setSidebarOpen(false)}
          className={({ isActive }) =>
            `${linkBase} ${isActive ? linkActive : linkInactive}`
          }
        >
          <List size={20} />
          <span className="hidden sm:block">Products</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
