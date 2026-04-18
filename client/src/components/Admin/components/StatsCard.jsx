import React from "react";

export default function StatsCards({ bookers, suppliers, orders }) {
  const revenue = orders?.reduce((sum, order) => sum + order.total_price, 0);
  const comp_orders = orders?.filter((order) => order.status === "delivered");

  const cards = [
    {
      title: "Revenue",
      value: `${revenue || 0} PKR`,
      change: "+ 19%",
      positive: true,
      subtitle: "vs last month",
    },
    {
      title: "Total Orders",
      value: orders?.length || 0,
      change: "+ 2%",
      positive: true,
      subtitle: "vs last month",
    },
    {
      title: "Total Bookers",
      value: bookers,
      change: "- 4%",
      positive: false,
      subtitle: "vs last month",
    },
    {
      title: "Total Suppliers",
      value: suppliers?.length || 0,
      change: "+ 0.9%",
      positive: true,
      subtitle: "vs last month",
    },
  ];

  return (
    <div className="py-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
      {/* 👆 2 cards per row on mobile, 4 on desktop */}
      {cards.map((card, i) => (
        <div
          key={i}
          className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 text-gray-900 flex flex-col gap-3"
        >
          <div className="text-sm md:text-base text-gray-600">{card.title}</div>

          <div className="text-2xl md:text-3xl font-bold truncate">{card.value}</div>
          {/* 👆 truncate prevents long values like "PKR" from overflowing */}

          <div className="flex items-center gap-2 flex-wrap">
            <span
              className={`font-semibold text-sm md:text-base ${
                card.positive ? "text-green-600" : "text-red-500"
              }`}
            >
              {card.change}
            </span>
            <span className="text-gray-500 text-xs md:text-sm">{card.subtitle}</span>
          </div>
        </div>
      ))}
    </div>
  );
}