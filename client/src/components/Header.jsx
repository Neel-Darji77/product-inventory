import { motion } from "framer-motion";
import { Package } from "lucide-react";

function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="flex flex-col md:flex-row md:items-center md:justify-between"
    >
      <div className="flex items-center gap-4">
        <div className="h-12 w-12 rounded-2xl bg-green-100 flex items-center justify-center">
          <Package className="text-green-600" size={24} />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Product Inventory
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage products and track inventory in real time.
          </p>
        </div>
      </div>
    </motion.header>
  );
}

export default Header;