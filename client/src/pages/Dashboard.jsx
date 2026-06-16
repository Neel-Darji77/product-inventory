import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Toaster, toast } from "react-hot-toast";

import Header from "../components/Header";
import StatsBar from "../components/StatsBar";
import AddProductForm from "../components/AddProductForm";
import FilterBar from "../components/FilterBar";
// import ProductTable from "./components/ProductTable";
import ProductList from "../components/ProductList";
import LoadingSkeleton from "../components/LoadingSkeleton";
import EmptyState from "../components/EmptyState";
import DeleteModal from "../components/DeleteModel";
import UpdateStockModal from "../components/UpdateStockModel";

import api from "../utils/api";

function Dashboard() {
  const [products, setProducts] = useState([]);
  const [stats, setStats] = useState({});
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);

  const fetchProducts = useCallback(async () => {
    const data = await api("api/products");
    setProducts(data);
  }, []);

  const fetchStats = useCallback(async () => {
    const data = await api("api/products/stats");
    setStats(data);
  }, []);

  const loadDashboard = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      await Promise.all([
        fetchProducts(),
        fetchStats(),
      ]);
    } catch {
      setError("Unable to load products.");
    } finally {
      setLoading(false);
    }
  }, [fetchProducts, fetchStats]);

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  async function handleAdd(name, price, category, stock) {
    try {
      const newProduct = await api("api/products", {
        method: "POST",
        body: JSON.stringify({
          name,
          price: Number(price),
          category,
          stock: Number(stock),
        }),
      });

      setProducts((previous) => [...previous, newProduct.data]);
      await fetchStats();

      toast.success("Product Added");
    } catch {
      toast.error("Unable to add product");
    }
  }

  async function handleDelete(id) {
    try {
      await api(`api/products/${id}`, {
        method: "DELETE",
      });

      setProducts((previous) =>
        previous.filter(
          (item) => item._id !== id
        )
      );

      await fetchStats();
      toast.success("Product Deleted");
    } catch {
      toast.error("Delete failed");
    }
  }

  async function handleUpdateStock(id, stock) {
    try {
      await api(`api/products/${id}/stock`, {
        method: "PATCH",
        body: JSON.stringify({
          stock,
        }),
      });

      await fetchProducts();
      await fetchStats();

      toast.success("Stock Updated");
    } catch {
      toast.error("Update failed");
    }
  }

  const filteredProducts = useMemo(() => {
    return products
      .filter(
        (product) =>
          category === "all" ||
          product.category === category
      )
      .filter(
        (product) =>
          product.name
            .toLowerCase()
            .includes(
              search.toLowerCase()
            )
      );
  },
    [products, search, category,]);

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#fafafa] flex items-center justify-center">
        <div className="bg-white border border-red-200 rounded-2xl shadow-sm p-8">
          <h2 className="text-xl font-semibold text-red-500">
            Something went wrong
          </h2>
          <p className="text-gray-500 mt-2">
            {error}
          </p>
          <button
            onClick={loadDashboard}
            className="mt-6 px-5 py-2 bg-green-500 hover:bg-green-600 text-white rounded-xl transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
      className="min-h-screen bg-[#fafafa]"
    >
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 2000,
          style: {
            borderRadius: "12px",
            background: "#fff",
            color: "#111827",
          },
        }}
      />

      <div className="max-w-[1320px] mx-auto px-6 py-6">
        <Header />

        <div className="mt-8">
          <StatsBar stats={stats} />
        </div>

        <motion.div
          layout
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="mt-6"
        >
          <AddProductForm
            onAdd={handleAdd}
          />
        </motion.div>

        {/* Search */}
        <div className="mt-6">
          <FilterBar
            search={search}
            onSearch={setSearch}
            category={category}
            onCategory={setCategory}
            totalProducts={products.length}
          />
        </div>

        {/* Products */}
        <div className="mt-6 bg-white rounded-2xl border border-gray-200 shadow-[0_2px_8px_rgba(0,0,0,0.04)] overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200 flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Products
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                {filteredProducts.length} products found
              </p>
            </div>
          </div>
          <AnimatePresence mode="popLayout">
            {
              filteredProducts.length > 0 ? (
                <ProductList
                  products={filteredProducts}
                  onDeleteClick={(product) => {
                    setSelectedProduct(product);
                    setDeleteOpen(true);
                  }}
                  onUpdateClick={(product) => {
                    setSelectedProduct(product);
                    setUpdateOpen(true);
                  }}
                />
              ) : (
                <EmptyState />
              )
            }
          </AnimatePresence>
        </div>
      </div>
      <DeleteModal
        open={deleteOpen}
        product={selectedProduct}
        onClose={() => {
          setDeleteOpen(false);
          setSelectedProduct(null);
        }}
        onConfirm={handleDelete}
      />
      <UpdateStockModal
        open={updateOpen}
        product={selectedProduct}
        onClose={() => {
          setUpdateOpen(false);
          setSelectedProduct(null);
        }}
        onSave={handleUpdateStock}
      />
    </motion.div>
  );
}

export default Dashboard;
