import { motion } from "framer-motion";
import { PackageOpen, Plus } from "lucide-react";

function EmptyState({ onAdd }) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.3,
      }}
      className="flex justify-center items-center py-24"
    >
      <div className="max-w-md w-full bg-white border border-gray-200 rounded-3xl shadow-sm p-10 text-center">
        <div className="mx-auto h-20 w-20 rounded-full bg-green-50 flex items-center justify-center">
          <PackageOpen
            size={36}
            className="text-green-600"
          />
        </div>

        <h2 className="mt-6 text-2xl font-semibold text-gray-900">
          No Products Found
        </h2>
        <p className="mt-3 text-gray-500 text-sm leading-6">
          Your inventory is empty or no products match
          your current search and category filter.
        </p>
        <button
          onClick={onAdd}
          className="
          mt-8
          inline-flex
          items-center
          gap-2
          px-5
          h-11
          rounded-xl
          bg-green-500
          hover:bg-green-600
          text-white
          font-medium
          transition
          active:scale-95
          "
        >
          <Plus size={16} />
          Add First Product
        </button>
      </div>
    </motion.div>
  );
}

export default EmptyState;