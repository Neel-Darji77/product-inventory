import { useEffect, useState } from "react";
import AddProductForm from "./components/AddProductForm";
import FilterBar from "./components/FilterBar";
import ProductCard from "./components/ProductCard";
import StatsBar from "./components/StatsBar";
import BASE_URL from "./config";

function App() {

  const [products, setProducts] = useState([]);
  const [stats, setStats] = useState({});
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function fetchProducts() {
    const response = await fetch(`${BASE_URL}api/products`);
    const data = await response.json();
    setProducts(data);
  }

  async function fetchStats() {
    const response = await fetch(`${BASE_URL}api/products/stats`);
    const data = await response.json();
    setStats(data);
  }

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        await Promise.all([
          fetchProducts(),
          fetchStats()
        ]);
      } catch (err) {
        setError("Failed to load products.");
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  async function handleAdd(name, price, category, stock) {
    const response = await fetch(`${BASE_URL}api/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        price: Number(price),
        category,
        stock: Number(stock),
      })
    });
    const newProduct = await response.json();
    setProducts((prev) => [...prev, newProduct.data]);
    fetchStats();
  }

  async function handleDelete(id) {
    await fetch(`${BASE_URL}api/products/${id}`, {
      method: "DELETE",
    });

    setProducts((prev) => prev.filter((item) => item._id !== id));
    fetchStats();
  }

  async function handleStockUpdate(id, stock) {
    await fetch(`${BASE_URL}api/products/${id}/stock`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        stock,
      }),
    });
    await fetchProducts();
    await fetchStats();
  }

  const filteredProducts = products
    .filter(
      (item) =>
        category === "all" ||
        item.category === category
    )
    .filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
    if (loading) {
    return (
      <div className="min-h-screen bg-[#fafafa] flex items-center justify-center">
        <div className="text-gray-500 text-base font-medium">
          Loading products...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#fafafa] flex items-center justify-center">
        <div className="bg-white border border-red-200 rounded-xl px-6 py-4 text-red-500 shadow-sm">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <div className="max-w-[1320px] mx-auto px-6 py-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">
            Product Inventory
          </h1>
          <p className="text-gray-500 text-base mt-2">
            Manage your products and track inventory in real time.
          </p>
        </div>

        <section className="mb-6">
          <StatsBar stats={stats} />
        </section>


        <section className="mb-6">
          <AddProductForm onAdd={handleAdd} />
        </section>

        <section className="mb-6">
          <FilterBar
            search={search}
            onSearch={setSearch}
            category={category}
            onCategory={setCategory}
          />
        </section>

        <section className="bg-white rounded-2xl border border-gray-200 shadow-[0_1px_3px_rgba(0,0,0,0.08)] overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 text-gray-600 text-sm">
                <th className="text-left px-6 py-4 font-semibold">Product Name</th>
                <th className="text-left px-4 py-4 font-semibold">Category</th>
                <th className="text-left px-4 py-4 font-semibold">Price</th>
                <th className="text-left px-4 py-4 font-semibold">Stock</th>
                <th className="text-left px-4 py-4 font-semibold">Status</th>
                <th className="text-left px-4 py-4 font-semibold">Update</th>
                <th className="text-left px-6 py-4 font-semibold">Delete</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <ProductCard
                    key={product._id}
                    product={product}
                    onDelete={handleDelete}
                    onUpdateStock={handleStockUpdate}
                  />
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="text-center py-12 text-gray-500"
                  >
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
}

export default App;