import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingCart,
  PlusSquare,
  List,
  Users,
  Mail,
  FileText,
  Send,
  Settings
} from "lucide-react";

const linkBase =
  "flex items-center gap-3 px-4 py-3 rounded-lg transition w-full";
const linkInactive =
  "text-gray-600 hover:bg-green-50";
const linkActive =
  "bg-green-100 text-green-700 font-semibold";

const Sidebar = () => {
  return (
    <div className="w-64 max-w-[70vw] min-h-screen bg-white shadow-md p-4">
      <div className="flex flex-col gap-1">

        <NavLink to="/" className={({ isActive }) =>
          `${linkBase} ${isActive ? linkActive : linkInactive}`
        }>
          <LayoutDashboard size={20} />
          <span className="hidden sm:block">Dashboard</span>
        </NavLink>

        <NavLink to="/orders" className={({ isActive }) =>
          `${linkBase} ${isActive ? linkActive : linkInactive}`
        }>
          <ShoppingCart size={20} />
          <span className="hidden sm:block">Orders</span>
        </NavLink>

        <NavLink to="/add" className={({ isActive }) =>
          `${linkBase} ${isActive ? linkActive : linkInactive}`
        }>
          <PlusSquare size={20} />
          <span className="hidden sm:block">Add Product</span>
        </NavLink>

        <NavLink to="/list" className={({ isActive }) =>
          `${linkBase} ${isActive ? linkActive : linkInactive}`
        }>
          <List size={20} />
          <span className="hidden sm:block">Product List</span>
        </NavLink>

        <NavLink to="/customers" className={({ isActive }) =>
          `${linkBase} ${isActive ? linkActive : linkInactive}`
        }>
          <Users size={20} />
          <span className="hidden sm:block">Customers</span>
        </NavLink>

        <NavLink to="/messages" className={({ isActive }) =>
          `${linkBase} ${isActive ? linkActive : linkInactive}`
        }>
          <Mail size={20} />
          <span className="hidden sm:block">Messages</span>
        </NavLink>

        <NavLink to="/quotes" className={({ isActive }) =>
          `${linkBase} ${isActive ? linkActive : linkInactive}`
        }>
          <FileText size={20} />
          <span className="hidden sm:block">Quotes</span>
        </NavLink>

        <NavLink to="/newsletter" className={({ isActive }) =>
          `${linkBase} ${isActive ? linkActive : linkInactive}`
        }>
          <Send size={20} />
          <span className="hidden sm:block">Newsletter</span>
        </NavLink>

        <NavLink to="/settings" className={({ isActive }) =>
          `${linkBase} ${isActive ? linkActive : linkInactive}`
        }>
          <Settings size={20} />
          <span className="hidden sm:block">Settings</span>
        </NavLink>

      </div>
    </div>
  );
};

export default Sidebar;
