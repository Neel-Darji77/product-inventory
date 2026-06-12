import { useEffect, useState } from "react"
import AddProductForm from "./components/AddProductForm"
import FilterBar from "./components/FilterBar"
import ProductCard from "./components/ProductCard"
import StatsBar from "./components/StatsBar"
import BASE_URL from "./config.js";

function App() {
  const [products, setProducts] = useState([]);
  const [stats, setStats] = useState({});
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 

  async function fetchStats() {
    let res = await fetch(`${BASE_URL}api/products/stats`);
    let statsData = await res.json();
    setStats(statsData);
  }

  async function fetchProducts() {
    // let res = await fetch("http://localhost:3000/api/products");
    let res = await fetch(`${BASE_URL}api/products`);
    let productsData = await res.json();
    setProducts(productsData);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        await fetchProducts();

        await fetchStats();
      } catch (error) {
        setError(`Failed to load data ${error}`);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [])

  async function handleAdd(name, price, category, stock) {
    let res = await fetch(`${BASE_URL}api/products`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, price: Number(price), category, stock: Number(stock) })
    });
    let newProduct = await res.json();
    setProducts([...products, newProduct.data]);

    fetchStats();
  }

  async function handleDelete(id) {
    let response = await fetch(`${BASE_URL}api/products/${id}`, { method: "DELETE" });
    setProducts(products.filter((p) => p._id !== id));

    fetchStats();
  }

  async function handleStockUpdate(id, stock) {
    let response = await fetch(`${BASE_URL}api/products/${id}/stock`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ stock })
    });

    await fetchProducts();
    await fetchStats();
  }

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-gray-500 text-lg">Loading...</p>
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-red-500 text-lg">{error}</p>
    </div>
  );

  let filtered = products.filter(p => category === "all" || p.category === category)
    .filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <>
      <h2>Product Inventory Dashboard</h2> <hr />
      <StatsBar stats={stats} /> <hr />
      <AddProductForm onAdd={handleAdd} /> <hr />
      <FilterBar
        search={search}
        onSearch={setSearch}
        category={category}
        onCategory={setCategory}
      /> <hr />
      <table style={{padding: "10px", borderSpacing:"10px"}}>
        <tr>
          <th>Product Name</th>
          <th>Price</th>
          <th>Category</th>
          <th>Stock</th>
          <th>Action</th>
          <th>Update</th>
        </tr>
        {filtered.map(
          (product) => (
            <ProductCard key={product._id} product={product} onDelete={handleDelete} onUpdateStock={handleStockUpdate} />
          )
        )}
      </table>
    </>
  )
}

export default App