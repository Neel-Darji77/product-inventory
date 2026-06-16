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
      className="
      bg-white
      border
      border-gray-200
      rounded-2xl
      p-5
      shadow-[0_2px_8px_rgba(0,0,0,.04)]
      "
    >
      {/* Top */}

      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-green-50 flex items-center justify-center">
              <Package
                size={20}
                className="text-green-600"
              />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 text-lg">
                {product.name}
              </h3>
              <span
                className={`inline-flex mt-2 px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor()}`}
              >
                {product.category}
              </span>
            </div>
          </div>
        </div>

        <p className="font-bold text-xl text-gray-900">
          {getCurrencySymbol()}{product.price}
        </p>
      </div>

      {/* Stock */}
      <div className="mt-6 flex justify-between">
        <div className="flex gap-2 text-sm">
          <span className="text-gray-500">
            Stock
          </span>
          <span className="font-semibold">
            {product.stock}
          </span>
        </div>
        {/* <div className="mt-2 h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className={`${status.bar} h-full rounded-full transition-all duration-500`}
            style={{
              width: `${status.progress}%`,
            }}
          />
        </div> */}
        <div className="flex items-center gap-2">
          <StatusIcon
            size={16}
            className={status.color}
          />
          <span
            className={`text-sm font-medium ${status.color}`}
          >
            {status.text}
          </span>
        </div>
      </div>

      {/* Buttons */}
      {(user?.role === "admin" || user?.role === "manager") && (
        <div className="mt-6 flex gap-3">
          <button
            onClick={() => onUpdateClick(product)}
            className="
            flex-1
            h-10
            rounded-xl
            border
            border-green-500
            text-green-600
            font-medium
            text-sm
            flex
            items-center
            justify-center
            gap-2
            hover:bg-green-50
            transition
            active:scale-95
            "
          >
            <Pencil size={15} />
            Update
          </button>

          {user?.role === "admin" && (
            <button
              onClick={() => onDeleteClick(product)}
              className="
              flex-1
              h-10
              rounded-xl
              border
              border-red-300
              text-red-500
              font-medium
              text-sm
              flex
              items-center
              justify-center
              gap-2
              hover:bg-red-50
              transition
              active:scale-95
              "
            >
              <Trash2 size={15} />
              Delete
            </button>
          )}
        </div>
      )}
    </motion.div>
  );
}

export default ProductCard;
