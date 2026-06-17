import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Plus, UploadCloud, X, Loader2 } from "lucide-react";
import api from "../utils/api";

function AddProductForm({ onAdd }) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  const nameRef = useRef(null);
  const priceRef = useRef(null);
  const categoryRef = useRef(null);
  const stockRef = useRef(null);
  const descriptionRef = useRef(null);

  async function handleImageChange(e) {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    setUploading(true);
    setError("");
    try {
      const response = await api("api/products/upload-image", {
        method: "POST",
        body: formData,
      });
      setImageUrl(response.imageUrl);
    } catch (err) {
      console.error(err);
      setError("Failed to upload image. Please try again.");
    } finally {
      setUploading(false);
    }
  }

  function handleRemoveImage() {
    setImageUrl("");
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const name = nameRef.current.value.trim();
    const price = Number(priceRef.current.value);
    const category = categoryRef.current.value;
    const stock = Number(stockRef.current.value);
    const description = descriptionRef.current?.value.trim() || "";

    if (
      !name ||
      !category ||
      isNaN(price) ||
      isNaN(stock) ||
      price < 0 ||
      stock < 0
    ) {
      setError("Please enter valid product details.");
      return;
    }

    setLoading(true);

    await onAdd(name, price, category, stock, description, imageUrl);

    nameRef.current.value = "";
    priceRef.current.value = "";
    categoryRef.current.value = "";
    stockRef.current.value = "";
    if (descriptionRef.current) {
      descriptionRef.current.value = "";
    }
    setImageUrl("");

    nameRef.current.focus();

    setLoading(false);
    setError("");
  }

  return (
    <motion.div
      layout
      className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-slate-800 shadow-sm p-6 transition-colors duration-200"
    >
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-slate-100">
          Add New Product
        </h2>
        <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">
          Create a new inventory item with description and image.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-gray-600 dark:text-slate-400">Product Name</label>
            <input
              ref={nameRef}
              type="text"
              placeholder="Product Name"
              className="h-10 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-slate-100 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-gray-600 dark:text-slate-400">Price</label>
            <input
              ref={priceRef}
              type="number"
              placeholder="Price"
              className="h-10 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-slate-100 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-gray-600 dark:text-slate-400">Category</label>
            <select
              ref={categoryRef}
              className="h-10 rounded-xl border border-gray-200 dark:border-slate-700 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-slate-800 dark:text-slate-100 transition-colors"
            >
              <option value="">Category</option>
              <option value="Electronics">Electronics</option>
              <option value="Furniture">Furniture</option>
              <option value="Stationery">Stationery</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-gray-600 dark:text-slate-400">Stock</label>
            <input
              ref={stockRef}
              type="number"
              placeholder="Stock"
              className="h-10 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-slate-100 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 flex flex-col gap-1">
            <label className="text-xs font-semibold text-gray-600 dark:text-slate-400">Description</label>
            <textarea
              ref={descriptionRef}
              rows={3}
              placeholder="Provide a detailed description of the product..."
              className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-slate-100 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors resize-none"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-gray-600 dark:text-slate-400">Product Image</label>
            <div className="h-[76px] border border-dashed border-gray-200 dark:border-slate-700 rounded-xl flex items-center px-4 bg-gray-50/50 dark:bg-slate-800/30">
              {uploading ? (
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-slate-400">
                  <Loader2 className="animate-spin text-green-500" size={18} />
                  <span>Uploading image...</span>
                </div>
              ) : imageUrl ? (
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-3">
                    <img
                      src={imageUrl}
                      alt="Preview"
                      className="w-12 h-12 rounded-lg object-cover border border-gray-200 dark:border-slate-700"
                    />
                    <span className="text-xs text-gray-500 dark:text-slate-400 max-w-[120px] truncate">
                      Image uploaded
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="p-1.5 bg-red-50 hover:bg-red-100 text-red-500 rounded-lg dark:bg-red-950/40 dark:hover:bg-red-900/40 transition"
                  >
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <label className="flex items-center gap-3 cursor-pointer w-full h-full group">
                  <div className="p-2 bg-green-50 dark:bg-green-950/40 text-green-600 dark:text-green-400 rounded-lg group-hover:scale-105 transition-transform">
                    <UploadCloud size={18} />
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-medium text-gray-700 dark:text-slate-300">
                      Upload Image file
                    </p>
                    <p className="text-[10px] text-gray-400">
                      PNG, JPG or WEBP
                    </p>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="text-sm text-red-500">
            {error}
          </div>
          <button
            disabled={loading || uploading}
            type="submit"
            className="h-10 px-6 rounded-xl bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white text-sm font-medium flex items-center justify-center gap-2 transition active:scale-95 shadow-sm"
          >
            <Plus size={16} />
            {loading ? "Adding..." : "Add Product"}
          </button>
        </div>
      </form>
    </motion.div>
  );
}

export default AddProductForm;