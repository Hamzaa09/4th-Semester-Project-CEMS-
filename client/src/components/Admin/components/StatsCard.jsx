import React from "react";
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import { FiShoppingCart, FiUsers, FiTruck } from "react-icons/fi";
import { TrendingUp, TrendingDown } from "lucide-react";

export default function StatsCards({ bookers, suppliers, orders }) {
  const revenue = orders?.reduce((sum, order) => sum + order.total_price, 0);
  const comp_orders = orders?.filter((order) => order.status === "delivered");

  const cards = [
    {
      title: "Revenue",
      value: `${(revenue || 0).toLocaleString()} PKR`,
      change: "+ 19%",
      positive: true,
      subtitle: "vs last month",
      icon: HiOutlineCurrencyRupee,
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
    },
    {
      title: "Total Orders",
      value: orders?.length || 0,
      change: "+ 2%",
      positive: true,
      subtitle: "vs last month",
      icon: FiShoppingCart,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      title: "Total Bookers",
      value: bookers,
      change: "- 4%",
      positive: false,
      subtitle: "vs last month",
      icon: FiUsers,
      iconBg: "bg-amber-100",
      iconColor: "text-amber-600",
    },
    {
      title: "Total Suppliers",
      value: suppliers?.length || 0,
      change: "+ 0.9%",
      positive: true,
      subtitle: "vs last month",
      icon: FiTruck,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
    },
  ];

  return (
    <div className="py-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, i) => {
        const Icon = card.icon;
        return (
          <div
            key={i}
            className="bg-white p-5 shadow-sm border border-gray-100 flex flex-col gap-4 hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                {card.title}
              </span>
              <div className={`p-2.5 ${card.iconBg}`}>
                <Icon className={`text-xl ${card.iconColor}`} />
              </div>
            </div>

            <div className="text-2xl md:text-3xl font-bold text-gray-900 truncate">
              {card.value}
            </div>

            <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
              <div
                className={`flex items-center gap-1 px-2 py-0.5 text-sm font-semibold ${
                  card.positive
                    ? "bg-emerald-50 text-emerald-600"
                    : "bg-red-50 text-red-500"
                }`}
              >
                {card.positive ? (
                  <TrendingUp className="w-3.5 h-3.5" />
                ) : (
                  <TrendingDown className="w-3.5 h-3.5" />
                )}
                {card.change}
              </div>
              <span className="text-gray-400 text-xs">{card.subtitle}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
