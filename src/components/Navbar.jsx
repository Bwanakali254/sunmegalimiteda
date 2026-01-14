import React from "react";
import { assets } from "../assets/assets";
import { Menu } from "lucide-react";

const Navbar = ({ setToken, setSidebarOpen }) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-3 bg-white shadow-md">
      <div className="flex items-center gap-2">
        {/* Mobile menu button */}
        <button
          className="sm:hidden"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu size={24} />
        </button>

        <img className="h-9 sm:h-10 w-auto" src={assets.logo} alt="Logo" />
        <span className="font-semibold text-gray-700 text-base sm:text-lg hidden sm:block">
          Admin Panel
        </span>
      </div>

      <button
        onClick={() => setToken("")}
        className="bg-green-600 text-white px-4 sm:px-5 py-2 rounded-lg text-sm sm:text-base 
                   hover:bg-green-700 transition duration-200 shadow-sm"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
