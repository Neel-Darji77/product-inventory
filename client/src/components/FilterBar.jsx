import { motion } from "framer-motion";
import { Search, ListFilter } from "lucide-react";

function FilterBar({
  search,
  onSearch,
  category,
  onCategory,
  totalProducts,
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl shadow-sm p-5 transition-colors duration-200"
    >
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Left */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-slate-100">
            Products
          </h2>
          <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">
            {totalProducts} products available
          </p>
        </div>

        {/* Right */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => onSearch(e.target.value)}
              placeholder="Search products..."
              className="
                w-full
                sm:w-72
                h-10
                rounded-xl
                border
                border-gray-200
                dark:border-slate-700
                bg-white
                dark:bg-slate-800
                dark:text-slate-100
                pl-10
                pr-3
                text-sm
                focus:outline-none
                focus:ring-2
                focus:ring-green-500
                transition
              "
            />
          </div>
          <div className="relative">
            <ListFilter
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <select
              value={category}
              onChange={(e) => onCategory(e.target.value)}
              className="
                w-full
                sm:w-52
                h-10
                rounded-xl
                border
                border-gray-200
                dark:border-slate-700
                bg-white
                dark:bg-slate-800
                dark:text-slate-100
                pl-10
                pr-3
                text-sm
                appearance-none
                focus:outline-none
                focus:ring-2
                focus:ring-green-500
                transition
              "
            >
              <option value="all">All Categories</option>
              <option value="Electronics">Electronics</option>
              <option value="Furniture">Furniture</option>
              <option value="Stationery">Stationery</option>
            </select>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default FilterBar;