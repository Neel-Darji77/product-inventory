import { Search } from "lucide-react";

function FilterBar({ search, onSearch, category, onCategory }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Search products..."
            className="w-full h-10 pl-10 pr-3 text-sm rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-green-500 transition"
          />
        </div>

        <select
          value={category}
          onChange={(e) => onCategory(e.target.value)}
          className="md:w-60 h-10 px-3 text-sm rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-green-500 transition"
        >
          <option value="all">All Categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Stationery">Stationery</option>
          <option value="Furniture">Furniture</option>
        </select>
      </div>
    </div>
  );
}

export default FilterBar;