import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";

const linkBase =
  "flex items-center gap-3 px-4 py-3 rounded-lg transition w-full";
const linkInactive = "text-gray-600 hover:bg-green-50";
const linkActive = "bg-green-100 text-green-700 font-semibold";

const Sidebar = () => {
  return (
    <div className="w-64 max-w-[70vw] min-h-screen bg-white shadow-md p-4">
      <div className="flex flex-col gap-2">
        <NavLink
          to="/add"
          className={({ isActive }) =>
            `${linkBase} ${isActive ? linkActive : linkInactive}`
          }
        >
          <img className="w-5 h-5" src={assets.add_icon} alt="" />
          <span className="hidden sm:block">Add Items</span>
        </NavLink>

        <NavLink
          to="/list"
          className={({ isActive }) =>
            `${linkBase} ${isActive ? linkActive : linkInactive}`
          }
        >
          <img className="w-5 h-5" src={assets.order_icon} alt="" />
          <span className="hidden sm:block">List Items</span>
        </NavLink>

        <NavLink
          to="/orders"
          className={({ isActive }) =>
            `${linkBase} ${isActive ? linkActive : linkInactive}`
          }
        >
          <img className="w-5 h-5" src={assets.order_icon} alt="" />
          <span className="hidden sm:block">Orders</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
