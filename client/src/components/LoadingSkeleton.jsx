import { motion } from "framer-motion";

function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-[#fafafa]">
      <div className="max-w-[1320px] mx-auto px-6 py-6">
        {/* Header */}
        <motion.div
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{
            repeat: Infinity,
            duration: 1.4,
          }}
        >
          <div className="h-9 w-72 bg-gray-200 rounded-xl" />
          <div className="h-4 w-56 bg-gray-100 rounded mt-3" />
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mt-8">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5"
            >
              <div className="animate-pulse">
                <div className="flex justify-between">
                  <div>
                    <div className="h-3 w-24 bg-gray-200 rounded"></div>
                    <div className="h-8 w-16 bg-gray-300 rounded mt-5"></div>
                    <div className="h-3 w-20 bg-gray-100 rounded mt-5"></div>
                  </div>
                  <div className="h-12 w-12 rounded-xl bg-gray-100"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add Product */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mt-6 animate-pulse">
          <div className="h-5 w-40 bg-gray-200 rounded"></div>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mt-6">
            {[1, 2, 3, 4, 5].map((item) => (
              <div
                key={item}
                className="h-10 rounded-xl bg-gray-100"
              />
            ))}
          </div>
        </div>

        {/* Search */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 mt-6 animate-pulse">
          <div className="flex justify-between">
            <div>
              <div className="h-5 w-28 bg-gray-200 rounded"></div>
              <div className="h-3 w-20 bg-gray-100 rounded mt-2"></div>
            </div>
            <div className="flex gap-3">
              <div className="h-10 w-72 bg-gray-100 rounded-xl"></div>
              <div className="h-10 w-48 bg-gray-100 rounded-xl"></div>
            </div>
          </div>
        </div>

        {/* Product Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-6">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 animate-pulse"
            >
              <div className="flex justify-between">
                <div>
                  <div className="h-5 w-40 bg-gray-200 rounded"></div>
                  <div className="h-4 w-24 bg-gray-100 rounded mt-3"></div>
                </div>
                <div className="h-6 w-20 bg-gray-200 rounded"></div>
              </div>
              <div className="h-2 bg-gray-100 rounded-full mt-6"></div>
              <div className="h-2 bg-gray-200 rounded-full w-2/3 mt-2"></div>
              <div className="flex gap-3 mt-6">
                <div className="flex-1 h-10 rounded-xl bg-gray-100"></div>
                <div className="flex-1 h-10 rounded-xl bg-gray-100"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LoadingSkeleton;