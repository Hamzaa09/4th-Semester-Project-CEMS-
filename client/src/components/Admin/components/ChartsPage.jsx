import React from "react";
import Chart from "react-apexcharts";
import { BiMoneyWithdraw } from "react-icons/bi";
import { BsGraphUpArrow } from "react-icons/bs";

export default function ChartsPage({ orders }) {
  // Line Chart Data
  const monthlyRevenue = Array(12).fill(0);

  orders?.forEach((order) => {
    const month = new Date(order.createdAt).getMonth();
    monthlyRevenue[month] += order.total_price;
  });

  const inComp_orders = orders?.filter((order) => order.status === "processing");
  const comp_orders = orders?.filter((order) => order.status === "delivered");

  const lineChart = {
    options: {
      chart: { id: "sales-revenue", toolbar: { show: false } },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
      },
      stroke: { curve: "smooth" },
      colors: ["#00E396", "#008FFB"],
      legend: { position: "top" },
    },
    series: [
      {
        name: "Revenue",
        data: monthlyRevenue,
      },
    ],
  };

  // Donut Chart Data
  const donutChart = {
    options: {
      labels: ["Processing", "Delivered"],
      colors: ["#008FFB", "#00E396"],
      legend: { position: "bottom" },
    },
    series: [inComp_orders?.length || 0, comp_orders?.length || 0],
  };

  return (
    <div className="py-6 w-full bg-gray-100">
      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Line Chart */}
        <div className="col-span-2 bg-white rounded-2xl shadow-sm p-4">
          <h3 className="font-semibold mb-2">Sales Overview</h3>
          <Chart
            options={lineChart.options}
            series={lineChart.series}
            type="line"
            height={300}
          />
        </div>

        {/* Donut Chart */}
        <div className="bg-white rounded-2xl shadow-sm p-4">
          <h3 className="font-semibold mb-2">Orders Details</h3>
          <Chart
            options={donutChart.options}
            series={donutChart.series}
            type="donut"
            height={300}
          />
        </div>
      </div>
    </div>
  );
}
