import { Package, AlertTriangle, Grid2X2, Boxes } from "lucide-react";

function StatsBar({ stats }) {
  if (!stats || !stats.totalCategory) return null;

  const totalCategories = Object.keys(stats.totalCategory).length;

  const totalItems = Object.values(stats.totalCategory).reduce(
    (total, value) => total + value,
    0
  );

  const cards = [
    {
      title: "Total Products",
      value: stats.total,
      subtitle: "Products Available",
      icon: Package,
      bg: "bg-green-50 dark:bg-green-950/40",
      color: "text-green-600 dark:text-green-400",
    },
    {
      title: "Low Stock",
      value: stats.lowStock,
      subtitle: "Need Attention",
      icon: AlertTriangle,
      bg: "bg-red-50 dark:bg-red-950/40",
      color: "text-red-500 dark:text-red-400",
    },
    {
      title: "Categories",
      value: totalCategories,
      subtitle: "Product Groups",
      icon: Grid2X2,
      bg: "bg-blue-50 dark:bg-blue-950/40",
      color: "text-blue-500 dark:text-blue-400",
    },
    {
      title: "Total Items",
      value: totalItems,
      subtitle: "Inventory Count",
      icon: Boxes,
      bg: "bg-purple-50 dark:bg-purple-950/40",
      color: "text-purple-500 dark:text-purple-400",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <div
            key={index}
            className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm flex justify-between items-start transition-colors duration-200"
          >
            <div>
              <p className="text-sm text-gray-500 dark:text-slate-400 font-medium">
                {card.title}
              </p>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-slate-100 mt-3">
                {card.value}
              </h2>
              <p className="text-xs text-gray-400 dark:text-slate-500 mt-2">
                {card.subtitle}
              </p>
            </div>
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center ${card.bg}`}
            >
              <Icon className={card.color} size={22} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default StatsBar;