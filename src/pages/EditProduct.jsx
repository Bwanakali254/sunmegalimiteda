import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import { ArrowLeft, Save, Upload, X } from "lucide-react";

const EditProduct = ({ token }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    subCategory: "",
    brand: "",
    bestseller: false,
    quantity: "",
  });

  const [existingImages, setExistingImages] = useState([]);
  const [imageFiles, setImageFiles] = useState({
    image1: null,
    image2: null,
    image3: null,
    image4: null,
  });
  const [imagePreviews, setImagePreviews] = useState({
    image1: null,
    image2: null,
    image3: null,
    image4: null,
  });

  // Fetch product data
  useEffect(() => {
    if (!id) {
      toast.error("No product ID provided");
      navigate("/products");
      return;
    }

    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await axios.post(backendUrl + "/api/product/single", {
          productId: id
        });
        
        if (res.data.success) {
          const productData = res.data.product;
          setProduct({
            name: productData.name || "",
            description: productData.description || "",
            price: productData.price || "",
            category: productData.category || "",
            subCategory: productData.subCategory || "",
            brand: productData.brand || "",
            bestseller: productData.bestseller || false,
            quantity: productData.quantity || "",
          });
          
          // Set existing images
          const images = productData.image || [];
          setExistingImages(images);
          
          // Create image previews
          const previews = {};
          images.forEach((img, index) => {
            if (index < 4) {
              const imageKey = `image${index + 1}`;
              previews[imageKey] = img;
            }
          });
          setImagePreviews(previews);
        } else {
          toast.error(res.data.message || "Product not found");
          navigate("/products");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        toast.error("Failed to load product");
        navigate("/products");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, navigate]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  // Handle image file selection
  const handleImageUpload = (e, imageNumber) => {
    const file = e.target.files[0];
    if (!file) return;

    // Update file
    setImageFiles(prev => ({
      ...prev,
      [imageNumber]: file
    }));

    // Create preview
    const previewUrl = URL.createObjectURL(file);
    setImagePreviews(prev => ({
      ...prev,
      [imageNumber]: previewUrl
    }));

    e.target.value = null; // Reset file input
  };

  // Remove image (clear both file and preview)
  const removeImage = (imageNumber) => {
    setImageFiles(prev => ({
      ...prev,
      [imageNumber]: null
    }));
    
    setImagePreviews(prev => ({
      ...prev,
      [imageNumber]: null
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!product.name || !product.price || !product.category) {
      toast.error("Please fill in required fields");
      return;
    }

    try {
      setSaving(true);
      
      // Prepare form data exactly as your backend expects
      const formData = new FormData();
      formData.append("id", id);
      formData.append("name", product.name);
      formData.append("description", product.description);
      formData.append("price", product.price);
      formData.append("category", product.category);
      formData.append("subCategory", product.subCategory);
      formData.append("brand", product.brand);
      formData.append("bestseller", product.bestseller);
      formData.append("quantity", product.quantity);
      
      // Append image files - only if a new file was selected
      // Your backend expects image1, image2, image3, image4 fields
      for (let i = 1; i <= 4; i++) {
        const imageKey = `image${i}`;
        const file = imageFiles[imageKey];
        if (file) {
          formData.append(imageKey, file);
        }
      }

      console.log("Updating product with ID:", id);
      console.log("Form data keys:", Array.from(formData.keys()));

      const res = await axios.post(
        backendUrl + "/api/product/update",
        formData,
        {
          headers: {
            token,
            "Content-Type": "multipart/form-data"
          }
        }
      );

      console.log("Update response:", res.data);

      if (res.data.success) {
        toast.success(res.data.message || "Product updated successfully!");
        navigate("/products");
      } else {
        toast.error(res.data.message || "Failed to update product");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error(error.response?.data?.message || "Failed to update product");
    } finally {
      setSaving(false);
    }
  };

  // Render image upload section
  const renderImageUpload = (number) => {
    const imageKey = `image${number}`;
    const preview = imagePreviews[imageKey];
    const hasExistingImage = existingImages[number - 1];

    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Image {number}
        </label>
        <div className="relative">
          {preview ? (
            <div className="relative">
              <img
                src={preview}
                alt={`Preview ${number}`}
                className="w-full h-40 object-cover rounded-lg border"
              />
              <button
                type="button"
                onClick={() => removeImage(imageKey)}
                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
              >
                <X size={14} />
              </button>
            </div>
          ) : hasExistingImage ? (
            <div className="relative">
              <img
                src={hasExistingImage}
                alt={`Existing ${number}`}
                className="w-full h-40 object-cover rounded-lg border"
              />
              <div className="absolute bottom-2 left-2 bg-gray-800 bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                Current Image
              </div>
            </div>
          ) : (
            <div className="border-2 border-dashed border-gray-300 rounded-lg h-40 flex items-center justify-center">
              <div className="text-center">
                <Upload className="mx-auto text-gray-400 mb-2" size={24} />
                <span className="text-sm text-gray-500">No image</span>
              </div>
            </div>
          )}
          <input
            type="file"
            id={`image${number}`}
            onChange={(e) => handleImageUpload(e, imageKey)}
            className="hidden"
            accept="image/*"
          />
          <label
            htmlFor={`image${number}`}
            className="absolute bottom-2 right-2 bg-green-600 text-white px-3 py-1 rounded text-sm cursor-pointer hover:bg-green-700"
          >
            {preview ? "Change" : "Upload"}
          </label>
        </div>
        <p className="text-xs text-gray-500">
          {hasExistingImage && !preview ? "Current image will be kept" : ""}
          {preview ? "New image will replace current" : ""}
          {!hasExistingImage && !preview ? "No image set" : ""}
        </p>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <button
            onClick={() => navigate("/products")}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-2"
          >
            <ArrowLeft size={18} />
            Back to Products
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Edit Product</h1>
          <p className="text-gray-500 text-sm">Update product details</p>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Basic Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={product.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Enter product name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <input
                  type="text"
                  name="category"
                  value={product.category}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="e.g., Solar Panels, Inverters"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sub Category
                </label>
                <input
                  type="text"
                  name="subCategory"
                  value={product.subCategory}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="e.g., Mono-crystalline, Poly-crystalline"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Brand
                </label>
                <input
                  type="text"
                  name="brand"
                  value={product.brand}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Product brand"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price *
                </label>
                <input
                  type="number"
                  name="price"
                  value={product.price}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Enter price"
                  min="0"
                  step="0.01"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity in Stock *
                </label>
                <input
                  type="number"
                  name="quantity"
                  value={product.quantity}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Enter quantity"
                  min="0"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="bestseller"
                    name="bestseller"
                    checked={product.bestseller}
                    onChange={handleChange}
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  />
                  <label htmlFor="bestseller" className="text-sm text-gray-700">
                    Mark as Bestseller
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={product.description}
              onChange={handleChange}
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="Enter product description..."
            />
          </div>

          {/* Images Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Product Images (Up to 4 images)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {renderImageUpload(1)}
              {renderImageUpload(2)}
              {renderImageUpload(3)}
              {renderImageUpload(4)}
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Upload new images to replace existing ones. Leave unchanged to keep current images.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-4 pt-6 border-t">
            <button
              type="button"
              onClick={() => navigate("/products")}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
            >
              {saving ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Saving...
                </>
              ) : (
                <>
                  <Save size={16} />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;