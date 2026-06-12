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
      bg: "bg-green-50",
      color: "text-green-600",
    },
    {
      title: "Low Stock",
      value: stats.lowStock,
      subtitle: "Need Attention",
      icon: AlertTriangle,
      bg: "bg-red-50",
      color: "text-red-500",
    },
    {
      title: "Categories",
      value: totalCategories,
      subtitle: "Product Groups",
      icon: Grid2X2,
      bg: "bg-blue-50",
      color: "text-blue-500",
    },
    {
      title: "Total Items",
      value: totalItems,
      subtitle: "Inventory Count",
      icon: Boxes,
      bg: "bg-purple-50",
      color: "text-purple-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex justify-between items-start"
          >
            <div>
              <p className="text-sm text-gray-500 font-medium">
                {card.title}
              </p>
              <h2 className="text-3xl font-bold text-gray-900 mt-3">
                {card.value}
              </h2>
              <p className="text-xs text-gray-400 mt-2">
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