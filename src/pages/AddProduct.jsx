import React, { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const AddProduct = ({ token }) => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [Name, setName] = useState("");
  const [Description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Batteries");
  const [subCategory, setSubCategory] = useState("high-voltage-battery");
  const [brand, setBrand] = useState("");
  const [quantity, setQuantity] = useState("");
  const [bestseller, setBestseller] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", Name);
      formData.append("description", Description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("brand", brand);
      formData.append("quantity", quantity);
      formData.append("bestseller", bestseller);

      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      const response = await axios.post(
        backendUrl + "/api/product/add",
        formData,
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setName("");
        setDescription("");
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setPrice("");
        setBrand("");
        setQuantity("");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h2 className="text-2xl font-semibold">Add Solar Product</h2>
        <p className="text-gray-500 text-sm">
          Create a new product for Sun Mega Limited
        </p>
      </div>

      <form
        onSubmit={onSubmitHandler}
        className="bg-white rounded-2xl shadow-sm p-8 space-y-10"
      >
        {/* Images */}
        <div>
          <h4 className="font-medium mb-3">Product Images</h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[image1, image2, image3, image4].map((img, i) => (
              <label key={i} htmlFor={`image${i + 1}`}>
                <div className="aspect-square rounded-xl border border-dashed flex items-center justify-center overflow-hidden cursor-pointer hover:border-green-500 transition">
                  <img
                    src={!img ? assets.upload_area : URL.createObjectURL(img)}
                    alt=""
                    className="object-cover w-full h-full"
                  />
                </div>
                <input
                  type="file"
                  id={`image${i + 1}`}
                  hidden
                  onChange={(e) => {
                    const setters = [setImage1, setImage2, setImage3, setImage4];
                    setters[i](e.target.files[0]);
                  }}
                />
              </label>
            ))}
          </div>
        </div>

        {/* Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left */}
          <div className="space-y-5">
            <div>
              <label className="text-sm font-medium">Product Name</label>
              <input
                value={Name}
                onChange={(e) => setName(e.target.value)}
                className="w-full mt-1 rounded-lg border px-4 py-2"
                placeholder="High Voltage Battery"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium">Description</label>
              <textarea
                value={Description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full mt-1 rounded-lg border px-4 py-2 min-h-[120px]"
                placeholder="Write product details..."
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium">Brand</label>
              <input
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="w-full mt-1 rounded-lg border px-4 py-2"
                placeholder="Sun Mega"
                required
              />
            </div>
          </div>

          {/* Right */}
          <div className="space-y-5">
            <div>
              <label className="text-sm font-medium">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full mt-1 rounded-lg border px-4 py-2"
              >
                <option>Batteries</option>
                <option>Controllers</option>
                <option>Converters</option>
                <option>Energy Storage Systems</option>
                <option>Inverters</option>
                <option>Portable Power</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium">Sub Category</label>
              <select
                value={subCategory}
                onChange={(e) => setSubCategory(e.target.value)}
                className="w-full mt-1 rounded-lg border px-4 py-2"
              >
                <option value="high-voltage-battery">High Voltage Battery</option>
                <option value="stack-battery-pack">Stack Battery Pack</option>
                <option value="main-controller">Main Controller</option>
                <option value="power-converter">Power Converter</option>
                <option value="grid-tie-inverter">Grid Tie Inverter</option>
                <option value="portable-outdoor-power-supply">
                  Portable Outdoor Power Supply
                </option>
                <option value="single-phase-hybrid-inverter">
                  Single Phase Hybrid Inverter
                </option>
                <option value="three-phase-hybrid-inverter">
                  Three Phase Hybrid Inverter
                </option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium">Price</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full mt-1 rounded-lg border px-4 py-2"
                placeholder="100"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Stock Quantity</label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full mt-1 rounded-lg border px-4 py-2"
                placeholder="10"
              />
            </div>

            <div className="flex items-center gap-2 pt-2">
              <input
                type="checkbox"
                checked={bestseller}
                onChange={() => setBestseller((p) => !p)}
              />
              <span>Mark as Bestseller</span>
            </div>
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="px-8 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition font-medium"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
