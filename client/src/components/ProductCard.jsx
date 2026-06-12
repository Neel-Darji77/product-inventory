import { Pencil, Trash2 } from "lucide-react";

function ProductCard({ product, onDelete, onUpdateStock }) {

  function getCategoryClass(category) {
    switch (category) {
      case "Electronics":
        return "bg-green-100 text-green-700";

      case "Stationery":
        return "bg-blue-100 text-blue-700";

      case "Furniture":
        return "bg-purple-100 text-purple-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  }

  function getStatus() {
    if (product.stock === 0) {
      return {
        text: "Out of Stock",
        dot: "bg-red-500",
        color: "text-red-500",
      };
    }

    if (product.stock <= 5) {
      return {
        text: "Low Stock",
        dot: "bg-orange-500",
        color: "text-orange-500",
      };
    }

    return {
      text: "In Stock",
      dot: "bg-green-500",
      color: "text-green-600",
    };
  }

  const status = getStatus();

  function updateStock() {
    const newStock = Number(
      prompt(`Enter new stock for ${product.name}`)
    );

    if (!isNaN(newStock) && newStock >= 0) {
      onUpdateStock(product._id, newStock);
    }
  }

  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50 transition">
      <td className="px-6 py-4">
        <p className="text-sm font-semibold text-gray-900">
          {product.name}
        </p>
      </td>

      <td className="px-4 py-4">
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getCategoryClass(
            product.category
          )}`}
        >
          {product.category}
        </span>
      </td>

      <td className="px-4 py-4">
        <span className="text-sm font-medium text-gray-700">
          ₹{product.price}
        </span>
      </td>

      <td className="px-4 py-4">
        <span className="text-sm font-semibold text-gray-900">
          {product.stock}
        </span>
      </td>

      <td className="px-4 py-4">
        <div className="flex items-center gap-2">
          <span
            className={`w-2 h-2 rounded-full ${status.dot}`}
          ></span>
          <span
            className={`text-sm font-medium ${status.color}`}
          >
            {status.text}
          </span>
        </div>
      </td>

      <td className="px-4 py-4">
        <button
          onClick={updateStock}
          className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg border border-green-500 text-green-600 hover:bg-green-50 transition"
        >
          <Pencil size={14} />
          Update Stock
        </button>
      </td>

      <td className="px-6 py-4">
        <button
          onClick={() => onDelete(product._id)}
          className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg border border-red-400 text-red-500 hover:bg-red-50 transition"
        >
          <Trash2 size={14} />
          Delete
        </button>
      </td>
    </tr>
  );
}

export default ProductCard;