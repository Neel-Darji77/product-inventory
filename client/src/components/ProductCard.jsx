import { motion } from "framer-motion";
import {
  Pencil,
  Trash2,
  Package,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useSettings } from "../context/SettingsContext";

function ProductCard({
  product,
  onDeleteClick,
  onUpdateClick,
}) {
  const { user } = useAuth();
  const { settings } = useSettings();
  const getCategoryColor = () => {
    switch (product.category) {
      case "Electronics":
        return "bg-green-100 text-green-700";

      case "Furniture":
        return "bg-purple-100 text-purple-700";

      case "Stationery":
        return "bg-blue-100 text-blue-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatus = () => {
    const threshold = settings?.lowStockThreshold ?? 10;
    if (product.stock === 0) {
      return {
        text: "Out of Stock",
        color: "text-red-500",
        icon: AlertTriangle,
        progress: 0,
        bar: "bg-red-500",
      };
    }

    if (product.stock <= threshold) {
      return {
        text: "Low Stock",
        color: "text-orange-500",
        icon: AlertTriangle,
        progress: Math.min((product.stock / threshold) * 100, 100),
        bar: "bg-orange-400",
      };
    }

    return {
      text: "In Stock",
      color: "text-green-600",
      icon: CheckCircle2,
      progress: Math.min(product.stock * 8, 100),
      bar: "bg-green-500",
    };
  };

  const getCurrencySymbol = () => {
    switch (settings?.currency) {
      case "USD":
        return "$";
      case "EUR":
        return "€";
      case "INR":
      default:
        return "₹";
    }
  };

  const status = getStatus();
  const StatusIcon = status.icon;

  return (
    <motion.div
      layout
      whileHover={{
        y: -3,
      }}
      transition={{
        duration: 0.2,
      }}
      className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-3xl p-5 shadow-[0_2px_8px_rgba(0,0,0,.04)] hover:shadow-lg transition-all duration-200"
    >
      {/* Product Image Cover */}
      {product.image ? (
        <div className="w-full aspect-square rounded-2xl overflow-hidden mb-4 border border-gray-100 dark:border-slate-800 bg-gray-50 dark:bg-slate-800/40 relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      ) : (
        <div className="w-full aspect-square rounded-2xl overflow-hidden mb-4 border border-gray-100 dark:border-slate-800 bg-gradient-to-br from-green-50 to-green-100/30 dark:from-slate-800/40 dark:to-slate-850/20 flex items-center justify-center">
          <Package
            size={36}
            className="text-green-500/70 dark:text-green-400/50"
          />
        </div>
      )}

      {/* Product Information */}
      <div className="flex justify-between items-start">
        <div className="flex-1 min-w-0 pr-2">
          <h3 className="font-bold text-gray-900 dark:text-slate-100 text-lg truncate" title={product.name}>
            {product.name}
          </h3>
          <span
            className={`inline-flex mt-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ${getCategoryColor()}`}
          >
            {product.category}
          </span>
        </div>
        <div className="text-right">
          <p className="font-extrabold text-xl text-gray-900 dark:text-slate-100">
            {getCurrencySymbol()}{product.price}
          </p>
        </div>
      </div>

      {/* Description */}
      <p className="mt-3 text-xs text-gray-500 dark:text-slate-400 line-clamp-2 min-h-[2rem]" title={product.description}>
        {product.description || "No description provided."}
      </p>

      {/* Stock Status */}
      <div className="mt-4 pt-4 border-t border-gray-100 dark:border-slate-800/60 flex justify-between items-center">
        <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-slate-400">
          <span>Stock:</span>
          <span className="font-bold text-gray-900 dark:text-slate-200">
            {product.stock}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <StatusIcon
            size={14}
            className={status.color}
          />
          <span
            className={`text-xs font-semibold ${status.color}`}
          >
            {status.text}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      {(user?.role === "admin" || user?.role === "manager") && (
        <div className="mt-4 pt-4 border-t border-gray-100 dark:border-slate-800/60 flex gap-3">
          <button
            onClick={() => onUpdateClick(product)}
            className="flex-1 h-9 rounded-xl border border-green-500/30 dark:border-green-500/20 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-950/25 font-semibold text-xs flex items-center justify-center gap-1.5 transition active:scale-95"
          >
            <Pencil size={13} />
            Update
          </button>

          {user?.role === "admin" && (
            <button
              onClick={() => onDeleteClick(product)}
              className="flex-1 h-9 rounded-xl border border-red-500/20 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/25 font-semibold text-xs flex items-center justify-center gap-1.5 transition active:scale-95"
            >
              <Trash2 size={13} />
              Delete
            </button>
          )}
        </div>
      )}
    </motion.div>
  );
}

export default ProductCard;
