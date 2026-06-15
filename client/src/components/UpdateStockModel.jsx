import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Package, Save, X } from "lucide-react";

function UpdateStockModal({
  open,
  product,
  onClose,
  onSave,
}) 
{
  const [stock, setStock] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (product) {
      setStock(product.stock);
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

  async function handleSubmit(e) {
    e.preventDefault();
    const value = Number(stock);
    if (isNaN(value) || value < 0) return;
    setLoading(true);
    await onSave(product._id, value);
    setLoading(false);
    onClose();
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
              scale: .95,
              y: 15,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: .95,
              y: 15,
            }}
            transition={{
              duration: .2,
            }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md bg-white rounded-3xl border border-gray-200 shadow-xl overflow-hidden"
          >

            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b">
              <div className="flex gap-3 items-center">
                <div className="h-12 w-12 rounded-2xl bg-green-100 flex items-center justify-center">
                  <Package
                    size={22}
                    className="text-green-600"
                  />
                </div>
                <div>
                  <h2 className="text-lg font-semibold">
                    Update Stock
                  </h2>
                  <p className="text-sm text-gray-500">
                    Modify inventory quantity
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="h-9 w-9 rounded-xl hover:bg-gray-100 flex justify-center items-center"
              >
                <X size={18} />
              </button>
            </div>

            {/* Body */}
            <form
              onSubmit={handleSubmit}
              className="p-6"
            >
              <div className="bg-gray-50 rounded-2xl p-4">
                <p className="text-sm text-gray-500">
                  Product
                </p>
                <h3 className="font-semibold text-lg mt-1">
                  {product?.name}
                </h3>
                <span className="inline-flex mt-3 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs">
                  {product?.category}
                </span>
              </div>
              <div className="mt-6">
                <label className="text-sm font-medium text-gray-600">
                  New Stock Quantity
                </label>
                <input
                  autoFocus
                  min={0}
                  type="number"
                  value={stock}
                  onChange={(e) =>
                    setStock(e.target.value)
                  }
                  className="mt-2 w-full h-11 rounded-xl border border-gray-200 px-4 focus:ring-2 focus:ring-green-500 outline-none"
                />
              </div>

              {/* Footer */}
              <div className="flex gap-3 mt-8">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 h-11 rounded-xl border border-gray-200 hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  disabled={loading}
                  className="flex-1 h-11 rounded-xl bg-green-500 hover:bg-green-600 text-white flex items-center justify-center gap-2 transition disabled:opacity-60"
                >
                  <Save size={16} />
                  {loading
                    ? "Saving..."
                    : "Save Changes"}

                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default UpdateStockModal;