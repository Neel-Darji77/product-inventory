import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Edit, Save, X, UploadCloud, Loader2 } from "lucide-react";
import api from "../utils/api";

function EditProductModal({
  open,
  product,
  onClose,
  onSave,
}) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (product) {
      setName(product.name || "");
      setPrice(product.price || "");
      setCategory(product.category || "");
      setStock(product.stock !== undefined ? product.stock : "");
      setDescription(product.description || "");
      setImageUrl(product.image || "");
      setError("");
    }
  }, [product]);

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape") {
        onClose();
      }
    }
    if (open) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () =>
      document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

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
      setError("Failed to upload image.");
    } finally {
      setUploading(false);
    }
  }

  function handleRemoveImage() {
    setImageUrl("");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const parsedPrice = Number(price);
    const parsedStock = Number(stock);

    if (!name.trim()) {
      setError("Product name is required.");
      return;
    }
    if (isNaN(parsedPrice) || parsedPrice < 0) {
      setError("Please enter a valid price.");
      return;
    }
    if (!category) {
      setError("Category is required.");
      return;
    }
    if (isNaN(parsedStock) || parsedStock < 0) {
      setError("Please enter a valid stock count.");
      return;
    }

    setLoading(true);
    try {
      await onSave(product._id, {
        name: name.trim(),
        price: parsedPrice,
        category,
        stock: parsedStock,
        description: description.trim(),
        image: imageUrl,
      });
      onClose();
    } catch (err) {
      console.error(err);
      setError("Failed to save changes. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.95,
              y: 15,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.95,
              y: 15,
            }}
            transition={{
              duration: 0.2,
            }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl border border-gray-200 dark:border-slate-800 shadow-xl overflow-hidden transition-colors duration-200"
          >
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-slate-800">
              <div className="flex gap-3 items-center">
                <div className="h-12 w-12 rounded-2xl bg-green-100 dark:bg-green-950/40 flex items-center justify-center">
                  <Edit
                    size={22}
                    className="text-green-600 dark:text-green-400"
                  />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-slate-100">
                    Edit Product
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-slate-400">
                    Modify product details and specifications.
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="h-9 w-9 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-800 flex justify-center items-center text-gray-500 dark:text-slate-400"
              >
                <X size={18} />
              </button>
            </div>

            {/* Body */}
            <form
              onSubmit={handleSubmit}
              className="p-6 space-y-4 max-h-[75vh] overflow-y-auto"
            >
              {error && (
                <div className="p-3 bg-red-50 dark:bg-red-950/30 text-red-500 rounded-xl text-xs font-medium">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="text-xs font-semibold text-gray-600 dark:text-slate-400">
                    Product Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1 w-full h-10 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-slate-100 px-4 text-sm focus:ring-2 focus:ring-green-500 outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-600 dark:text-slate-400">
                    Price
                  </label>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="mt-1 w-full h-10 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-slate-100 px-4 text-sm focus:ring-2 focus:ring-green-500 outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-600 dark:text-slate-400">
                    Stock Quantity
                  </label>
                  <input
                    type="number"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    className="mt-1 w-full h-10 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-slate-100 px-4 text-sm focus:ring-2 focus:ring-green-500 outline-none transition-colors"
                  />
                </div>

                <div className="col-span-2">
                  <label className="text-xs font-semibold text-gray-600 dark:text-slate-400">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="mt-1 w-full h-10 rounded-xl border border-gray-200 dark:border-slate-700 px-4 text-sm focus:ring-2 focus:ring-green-500 bg-white dark:bg-slate-800 dark:text-slate-100 transition-colors"
                  >
                    <option value="">Select Category</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Furniture">Furniture</option>
                    <option value="Stationery">Stationery</option>
                  </select>
                </div>

                <div className="col-span-2">
                  <label className="text-xs font-semibold text-gray-600 dark:text-slate-400">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-slate-100 p-3 text-sm focus:ring-2 focus:ring-green-500 outline-none transition-colors resize-none"
                  />
                </div>

                <div className="col-span-2">
                  <label className="text-xs font-semibold text-gray-600 dark:text-slate-400">
                    Product Image
                  </label>
                  <div className="mt-1 h-[76px] border border-dashed border-gray-200 dark:border-slate-700 rounded-xl flex items-center px-4 bg-gray-50/50 dark:bg-slate-800/30">
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
                          <span className="text-xs text-gray-500 dark:text-slate-400 max-w-[200px] truncate">
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

              {/* Footer */}
              <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 h-11 rounded-xl border border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800 dark:text-slate-200 transition text-sm font-medium"
                >
                  Cancel
                </button>
                <button
                  disabled={loading || uploading}
                  className="flex-1 h-11 rounded-xl bg-green-500 hover:bg-green-600 text-white flex items-center justify-center gap-2 transition disabled:opacity-60 text-sm font-medium shadow-sm"
                >
                  <Save size={16} />
                  {loading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default EditProductModal;
