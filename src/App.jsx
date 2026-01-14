import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Routes, Route } from "react-router-dom";
import Add from "./pages/Add";
import List from "./pages/List";
import Orders from "./pages/Orders";
import Login from "./components/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ErrorBoundary from "./components/ErrorBoundary";
import Dashboard from "./pages/Dashboard";
import Customers from "./pages/Customers";
import Messages from "./pages/Messages";
import Quotes from "./pages/Quotes";
import Newsletter from "./pages/Newsletter";
import Settings from "./pages/Settings";

export const backendUrl = import.meta.env.VITE_BACKEND_URL;
export const currency = "KES";

const App = () => {
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : ""
  );

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
          <Navbar setToken={setToken} />
          <hr />
          <div className="flex w-full">
            <Sidebar />
            <div className="w-[70%] max-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base">
              <ErrorBoundary>
                <Routes>
                  <Route path="/" element={<Dashboard />} />

                  <Route path="/add" element={<Add token={token} />} />
                  <Route path="/list" element={<List token={token} />} />
                  <Route path="/orders" element={<Orders token={token} />} />

                  <Route path="/customers" element={<Customers />} />
                  <Route path="/messages" element={<Messages />} />
                  <Route path="/quotes" element={<Quotes />} />
                  <Route path="/newsletter" element={<Newsletter />} />
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
