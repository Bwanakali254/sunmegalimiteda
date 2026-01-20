import React, { useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(backendUrl + "/api/user/admin", {
        email,
        password,
      });
      if (response.data.success) {
        setToken(response.data.token);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Section */}
      <div className="hidden md:flex w-1/2 bg-green-500 text-white flex-col justify-between p-10">
        <div>
          <div className="flex items-center gap-2">
            <div className="bg-white/20 p-2 rounded-lg">☀️</div>
            <div>
              <h1 className="font-bold text-lg">Sun Mega Limited</h1>
              <p className="text-sm">Solar Energy Solutions</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-bold mb-3">
            Powering a Sustainable Future
          </h2>
          <p className="text-sm mb-6">
            Admin Dashboard for managing solar products, orders, and customer
            relationships.
          </p>

          <div className="flex gap-4">
            <div className="bg-white/15 rounded-lg p-4 text-center w-28">
              <p className="text-xl font-bold">500+</p>
              <p className="text-xs">Products</p>
            </div>
            <div className="bg-white/15 rounded-lg p-4 text-center w-28">
              <p className="text-xl font-bold">10K+</p>
              <p className="text-xs">Orders</p>
            </div>
            <div className="bg-white/15 rounded-lg p-4 text-center w-28">
              <p className="text-xl font-bold">5K+</p>
              <p className="text-xs">Customers</p>
            </div>
          </div>
        </div>

        <p className="text-xs text-white/70">
          © 2024 Sun Mega Limited. All rights reserved.
        </p>
      </div>

      {/* Right Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-[#f3f7f2]">
        <div className="w-full max-w-md">
          <h1 className="text-2xl font-bold mb-1 text-center">
            Welcome Back
          </h1>
          <p className="text-sm text-gray-600 mb-6 text-center">
            Sign in to your admin account
          </p>

          <form onSubmit={onSubmitHandler} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@sunmega.com"
                required
                className="w-full mt-1 px-4 py-2 border rounded-lg outline-none focus:border-green-500"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full mt-1 px-4 py-2 border rounded-lg outline-none focus:border-green-500"
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" />
                Remember me
              </label>
              <span className="text-green-600 cursor-pointer">
                Forgot password?
              </span>
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition"
            >
              Sign In
            </button>
          </form>

          <p className="text-xs text-center mt-6 text-gray-600">
            Need help? Contact{" "}
            <span className="text-green-600">support@sunmega.co.ke</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
