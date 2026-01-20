import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { Edit, Trash2 } from "lucide-react";

const Products = ({ token }) => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(backendUrl + "/api/product/list");
      if (res.data.success) {
        setProducts(res.data.products);
      } else {
        toast.error(res.data.message);
      }
    } catch (e) {
      toast.error(e.message);
    }
  };

  const removeProduct = async (id) => {
    try {
      const res = await axios.post(
        backendUrl + "/api/product/remove",
        { id },
        { headers: { token } }
      );
      if (res.data.message) {
        toast.success(res.data.message);
        fetchProducts();
      }
    } catch (e) {
      toast.error(e.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold">Products</h2>
          <p className="text-gray-500 text-sm">
            Manage solar and energy products
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm">
        <div className="hidden md:grid grid-cols-6 px-5 py-3 text-sm text-gray-500 border-b">
          <span>Product</span>
          <span>Category</span>
          <span>Price</span>
          <span>Stock</span>
          <span>Status</span>
          <span>Actions</span>
        </div>

        {products.map((item) => (
          <div
            key={item._id}
            className="grid grid-cols-1 md:grid-cols-6 gap-3 px-5 py-4 border-b hover:bg-gray-50 text-sm"
          >
            <div className="flex items-center gap-3">
              <img
                src={item.image[0]}
                alt=""
                className="w-12 h-12 object-cover rounded"
              />
              <span className="font-medium">{item.name}</span>
            </div>
            <span>{item.category}</span>
            <span>
              {currency}
              {item.price}
            </span>
            <span>{item.quantity}</span>
            <span>
              <span className={`px-2 py-1 rounded-full text-xs ${
                item.quantity > 0 
                  ? "bg-green-100 text-green-700" 
                  : "bg-red-100 text-red-700"
              }`}>
                {item.quantity > 0 ? "In Stock" : "Out of Stock"}
              </span>
            </span>
            <div className="flex items-center gap-2">
              <Link
                to={`/products/edit/${item._id}`}
                className="flex items-center gap-1 px-3 py-1.5 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors text-sm"
              >
                <Edit size={14} />
                Edit
              </Link>
              <button
                onClick={() => removeProduct(item._id)}
                className="flex items-center gap-1 px-3 py-1.5 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors text-sm"
              >
                <Trash2 size={14} />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;