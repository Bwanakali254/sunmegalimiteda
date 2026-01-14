import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";

const List = ({ token }) => {
  const [List, setList] = useState([]);

  const fetchLists = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");
      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/product/remove",
        { id },
        { headers: { token } }
      );

      if (response.data.message) {
        toast.success(response.data.message);
        await fetchLists();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchLists();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">All Products</h2>

      {/* Table Header */}
      <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] bg-green-100 text-gray-700 px-4 py-2 rounded-t-lg text-sm font-medium">
        <span>Image</span>
        <span>Name</span>
        <span>Category</span>
        <span>Price</span>
        <span className="text-center">Action</span>
      </div>

      {/* Product Rows */}
      <div className="flex flex-col">
        {List.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-1 md:grid-cols-[1fr_3fr_1fr_1fr_1fr] gap-3 md:gap-0 items-center px-4 py-3 border-b bg-white hover:bg-gray-50 text-sm"
          >
            <img className="w-12 h-12 object-cover rounded" src={item.image[0]} alt="" />

            <p className="font-medium">{item.name}</p>

            <p className="text-gray-600">{item.category}</p>

            <p className="font-semibold">
              {currency}
              {item.price}
            </p>

            <button
              onClick={() => removeProduct(item._id)}
              className="text-red-500 hover:text-red-700 font-bold text-lg md:text-center"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
