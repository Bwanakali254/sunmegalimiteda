import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Routes, Route } from "react-router-dom";
import AddProduct from "./pages/AddProduct";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import Login from "./components/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ErrorBoundary from "./components/ErrorBoundary";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";

export const backendUrl = import.meta.env.VITE_BACKEND_URL;
export const currency = "KES";

const App = () => {
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : ""
  );

  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <ToastContainer />
      {token === "" ? (
        <Login setToken={setToken} />
      ) : (
        <>
          <Navbar setToken={setToken} setSidebarOpen={setSidebarOpen} />
          <hr />

          <div className="flex w-full">
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            <div className="flex-1 p-4 sm:p-6 text-gray-600 text-base">
              <ErrorBoundary>
                <Routes>
                  <Route path="/" element={<Dashboard token={token} />} />

                  <Route
                    path="/products/add"
                    element={<AddProduct token={token} />}
                  />
                  <Route
                    path="/products"
                    element={<Products token={token} />}
                  />
                  <Route
                    path="/orders"
                    element={<Orders token={token} />}
                  />
                  <Route path="/settings" element={<Settings />} />
                </Routes>
              </ErrorBoundary>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
