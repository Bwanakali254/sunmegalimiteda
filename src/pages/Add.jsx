import React, { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Add = ({ token }) => {
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
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Add New Product</h2>

      <form
        onSubmit={onSubmitHandler}
        className="bg-white p-6 rounded-xl shadow-sm flex flex-col gap-5"
      >
        {/* Images */}
        <div>
          <p className="mb-2 font-medium">Upload Images</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[image1, image2, image3, image4].map((img, i) => (
              <label key={i} htmlFor={`image${i + 1}`}>
                <img
                  className="w-full h-24 object-cover border rounded cursor-pointer"
                  src={!img ? assets.upload_area : URL.createObjectURL(img)}
                  alt=""
                />
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

        {/* Name */}
        <div>
          <p className="mb-2">Product Name</p>
          <input
            value={Name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
            placeholder="Type here"
            required
          />
        </div>

        {/* Description */}
        <div>
          <p className="mb-2">Product Description</p>
          <textarea
            value={Description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 min-h-[100px]"
            placeholder="Write content here"
            required
          />
        </div>

        {/* Category Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <p className="mb-2">Category</p>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
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
            <p className="mb-2">Sub Category</p>
            <select
              value={subCategory}
              onChange={(e) => setSubCategory(e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
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
            <p className="mb-2">Price</p>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
              placeholder="100"
            />
          </div>
        </div>

        {/* Brand */}
        <div>
          <p className="mb-2">Brand</p>
          <input
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
            placeholder="Brand name"
            required
          />
        </div>

        {/* Stock + Bestseller */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="bestseller"
              checked={bestseller}
              onChange={() => setBestseller((prev) => !prev)}
            />
            <label htmlFor="bestseller" className="cursor-pointer">
              Add to Bestseller
            </label>
          </div>

          <div>
            <p className="mb-2">In Stock</p>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="border rounded-lg px-3 py-2 w-40"
              placeholder="10"
            />
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-40 py-3 mt-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default Add;
