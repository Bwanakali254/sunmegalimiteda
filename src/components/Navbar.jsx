import React from 'react'
import { assets } from '../assets/assets'

const Navbar = ({ setToken }) => {
  return (
    <div className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
      <div className="flex items-center gap-3">
        <img className="h-10 w-auto" src={assets.logo} alt="Logo" />
        <span className="font-semibold text-gray-700 text-lg hidden sm:block">
          Admin Panel
        </span>
      </div>

      <button
        onClick={() => setToken('')}
        className="bg-green-600 text-white px-5 py-2 rounded-full text-sm font-medium 
                   hover:bg-green-700 transition duration-200 shadow-sm"
      >
        Logout
      </button>
    </div>
  )
}

export default Navbar
