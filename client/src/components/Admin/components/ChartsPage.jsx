import React from "react";
import Chart from "react-apexcharts";
import { TrendingUp, PieChart } from "lucide-react";

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
      chart: {
        id: "sales-revenue",
        toolbar: { show: false },
        fontFamily: "inherit",
        background: "transparent",
      },
      xaxis: {
        categories: [
          "Jan", "Feb", "Mar", "Apr", "May", "Jun",
          "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
        ],
        labels: {
          style: {
            colors: "#6b7280",
            fontSize: "12px",
          },
        },
        axisBorder: { show: false },
        axisTicks: { show: false },
      },
      yaxis: {
        labels: {
          style: {
            colors: "#6b7280",
            fontSize: "12px",
          },
          formatter: (value) => `${(value / 1000).toFixed(0)}k`,
        },
      },
      stroke: { curve: "smooth", width: 3 },
      colors: ["#10b981"],
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.4,
          opacityTo: 0.1,
          stops: [0, 90, 100],
        },
      },
      grid: {
        borderColor: "#f3f4f6",
        strokeDashArray: 4,
      },
      legend: { show: false },
      tooltip: {
        theme: "light",
        y: {
          formatter: (value) => `${value.toLocaleString()} PKR`,
        },
      },
      dataLabels: { enabled: false },
    },
    series: [
      {
        name: "Revenue",
        data: monthlyRevenue,
      },
    ],
  };

  // Donut Chart Data
  const totalOrders = (inComp_orders?.length || 0) + (comp_orders?.length || 0);
  const deliveredPercent = totalOrders > 0
    ? Math.round((comp_orders?.length || 0) / totalOrders * 100)
    : 0;

  const donutChart = {
    options: {
      labels: ["Processing", "Delivered"],
      colors: ["#f59e0b", "#10b981"],
      legend: {
        position: "bottom",
        fontFamily: "inherit",
        fontSize: "13px",
        markers: {
          width: 10,
          height: 10,
          radius: 2,
        },
        itemMargin: {
          horizontal: 12,
        },
      },
      stroke: { width: 0 },
      dataLabels: {
        enabled: true,
        formatter: (val) => `${val.toFixed(0)}%`,
        style: {
          fontSize: "12px",
          fontWeight: 600,
        },
        dropShadow: { enabled: false },
      },
      plotOptions: {
        pie: {
          donut: {
            size: "70%",
            labels: {
              show: true,
              name: {
                show: true,
                fontSize: "14px",
                color: "#6b7280",
              },
              value: {
                show: true,
                fontSize: "24px",
                fontWeight: 700,
                color: "#111827",
              },
              total: {
                show: true,
                label: "Total Orders",
                fontSize: "13px",
                color: "#6b7280",
                formatter: () => totalOrders,
              },
            },
          },
        },
      },
      tooltip: {
        y: {
          formatter: (value) => `${value} orders`,
        },
      },
    },
    series: [inComp_orders?.length || 0, comp_orders?.length || 0],
  };

  return (
    <div className="py-6 w-full">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Line Chart */}
        <div className="col-span-1 lg:col-span-2 bg-white shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Sales Overview</h3>
              <p className="text-sm text-gray-500 mt-0.5">Monthly revenue performance</p>
            </div>
            <div className="p-2.5 bg-emerald-100">
              <TrendingUp className="w-5 h-5 text-emerald-600" />
            </div>
          </div>
          <Chart
            options={lineChart.options}
            series={lineChart.series}
            type="area"
            height={280}
          />
        </div>

        {/* Donut Chart */}
        <div className="bg-white shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Order Status</h3>
              <p className="text-sm text-gray-500 mt-0.5">{deliveredPercent}% delivered</p>
            </div>
            <div className="p-2.5 bg-amber-100">
              <PieChart className="w-5 h-5 text-amber-600" />
            </div>
          </div>
          <Chart
            options={donutChart.options}
            series={donutChart.series}
            type="donut"
            height={280}
          />
        </div>
      </div>
    </div>
  );
}
