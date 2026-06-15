import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";

function AddProductForm({ onAdd }) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const nameRef = useRef(null);
  const priceRef = useRef(null);
  const categoryRef = useRef(null);
  const stockRef = useRef(null);

  async function handleSubmit(e) {
    e.preventDefault();

    const name = nameRef.current.value.trim();
    const price = Number(priceRef.current.value);
    const category = categoryRef.current.value;
    const stock = Number(stockRef.current.value);

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

    await onAdd(name, price, category, stock);

    nameRef.current.value = "";
    priceRef.current.value = "";
    categoryRef.current.value = "";
    stockRef.current.value = "";

    nameRef.current.focus();

    setLoading(false);
    setError("");
  }

  return (
    <motion.div
      layout
      className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6"
    >
      <div className="mb-5">

        <h2 className="text-lg font-semibold text-gray-900">
          Add New Product
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Create a new inventory item.
        </p>

      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4"
      >
        <input
          ref={nameRef}
          type="text"
          placeholder="Product Name"
          className="h-10 rounded-xl border border-gray-200 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <input
          ref={priceRef}
          type="number"
          placeholder="Price"
          className="h-10 rounded-xl border border-gray-200 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <select
          ref={categoryRef}
          className="h-10 rounded-xl border border-gray-200 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
        >
          <option value="">Category</option>
          <option value="Electronics">Electronics</option>
          <option value="Furniture">Furniture</option>
          <option value="Stationery">Stationery</option>
        </select>

        <input
          ref={stockRef}
          type="number"
          placeholder="Stock"
          className="h-10 rounded-xl border border-gray-200 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <button
          disabled={loading}
          type="submit"
          className="h-10 rounded-xl bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white text-sm font-medium flex items-center justify-center gap-2 transition active:scale-95"
        >
          <Plus size={16} />

          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>

      {error && (
        <p className="mt-4 text-sm text-red-500">
          {error}
        </p>
      )}
    </motion.div>
  );
}

export default AddProductForm;