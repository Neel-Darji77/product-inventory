import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, Trash2, X } from "lucide-react";

function DeleteModal({
  open,
  product,
  onClose,
  onConfirm,
}) 

{
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") {
        onClose();
      }
    }
    if (open) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [open, onClose]);

  async function handleDelete() {
    try {
      setLoading(true);
      await onConfirm(product._id);
      setLoading(false);
      onClose();
    } catch {
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

          className="
          fixed
          inset-0
          z-50
          flex
          items-center
          justify-center
          bg-black/40
          backdrop-blur-sm
          p-4
          "

          onClick={onClose}
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
            onClick={(event) =>
              event.stopPropagation()
            }

            className="
            w-full
            max-w-md
            rounded-3xl
            bg-white
            border
            border-gray-200
            shadow-xl
            overflow-hidden
            "

          >
            {/* Header */}

            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-2xl bg-red-100 flex items-center justify-center">
                  <AlertTriangle
                    size={24}
                    className="text-red-500"
                  />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    Delete Product
                  </h2>
                  <p className="text-sm text-gray-500">
                    This action cannot be undone
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}

                className="
                h-9
                w-9
                rounded-xl
                hover:bg-gray-100
                flex
                items-center
                justify-center
                transition
                "

              >
                <X size={18} />
              </button>
            </div>

            {/* Content */}
            <div className="px-6 py-6">
              <p className="text-gray-600 leading-7">
                Are you sure you want to delete
                <span className="font-semibold text-gray-900">
                  {" "}
                  {product?.name}
                </span>
                ?
              </p>
              <div className="mt-4 rounded-2xl bg-gray-50 p-4">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">
                    Category
                  </span>
                  <span className="text-sm font-medium">
                    {product?.category}
                  </span>
                </div>
                <div className="flex justify-between mt-3">
                  <span className="text-sm text-gray-500">
                    Price
                  </span>
                  <span className="text-sm font-medium">
                    ₹{product?.price}
                  </span>
                </div>
                <div className="flex justify-between mt-3">
                  <span className="text-sm text-gray-500">
                    Stock
                  </span>
                  <span className="text-sm font-medium">
                    {product?.stock}
                  </span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex gap-3 p-6 border-t border-gray-100">
              <button
                onClick={onClose}
                disabled={loading}
                className="
                flex-1
                h-11
                rounded-xl
                border
                border-gray-200
                text-gray-700
                font-medium
                hover:bg-gray-50
                transition
                "

              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={loading}

                className="
                flex-1
                h-11
                rounded-xl
                bg-red-500
                hover:bg-red-600
                text-white
                font-medium
                flex
                items-center
                justify-center
                gap-2
                transition
                disabled:opacity-60
                "

              >
                <Trash2 size={16} />
                {loading
                  ? "Deleting..."
                  : "Delete"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default DeleteModal;