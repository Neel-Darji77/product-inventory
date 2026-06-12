import { useRef, useState } from "react";
import { Plus } from "lucide-react";

function AddProductForm({ onAdd }) {
  const [error, setError] = useState("");

  const nameRef = useRef(null);
  const priceRef = useRef(null);
  const categoryRef = useRef(null);
  const stockRef = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();

    const name = nameRef.current.value;
    const price = priceRef.current.value;
    const category = categoryRef.current.value;
    const stock = stockRef.current.value;

    if (
      name.trim() === "" ||
      category.trim() === "" ||
      isNaN(price) ||
      isNaN(stock) ||
      Number(price) < 0 ||
      Number(stock) < 0
    ) {
      setError("Please enter valid product details.");
      return;
    }

    onAdd(name, price, category, stock);

    nameRef.current.value = "";
    priceRef.current.value = "";
    categoryRef.current.value = "";
    stockRef.current.value = "";

    setError("");
  }

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5">
      <div className="mb-5">
        <h2 className="text-xl font-semibold text-gray-900">
          Add New Product
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Quickly add a new product to your inventory.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4"
      >
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">
            Product Name
          </label>
          <input
            ref={nameRef}
            type="text"
            placeholder="MacBook Air"
            className="w-full h-10 px-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">
            Price
          </label>
          <input
            ref={priceRef}
            type="number"
            placeholder="45000"
            className="w-full h-10 px-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">
            Category
          </label>
          <select
            ref={categoryRef}
            className="w-full h-10 px-3 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
          >
            <option value="">Select</option>
            <option value="Electronics">Electronics</option>
            <option value="Stationery">Stationery</option>
            <option value="Furniture">Furniture</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">
            Stock
          </label>
          <input
            ref={stockRef}
            type="number"
            placeholder="20"
            className="w-full h-10 px-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
          />
        </div>
        <div className="flex items-end">
          <button
            type="submit"
            className="w-full h-10 rounded-lg bg-green-500 hover:bg-green-600 transition text-white text-sm font-medium flex items-center justify-center gap-2"
          >
            <Plus size={16} />
            Add Product
          </button>
        </div>
      </form>

      {error && (
        <p className="text-red-500 text-sm mt-4">
          {error}
        </p>
      )}
    </div>
  );
}

export default AddProductForm;