import React from "react";
import { useSelector } from "react-redux";
import { FiPackage, FiCalendar, FiHash, FiShoppingBag, FiCheckCircle, FiClock, FiTruck } from "react-icons/fi";

const SingleOrder = ({ order, handleSubmit }) => {
  const { user } = useSelector((state) => state.userSlice);

  const getStatusConfig = (status) => {
    switch (status?.toLowerCase()) {
      case "delivered":
        return {
          bg: "bg-emerald-50",
          text: "text-emerald-700",
          border: "border-emerald-200",
          icon: <FiCheckCircle className="text-emerald-600" />,
          label: "Delivered"
        };
      case "processing":
      default:
        return {
          bg: "bg-amber-50",
          text: "text-amber-700",
          border: "border-amber-200",
          icon: <FiClock className="text-amber-600" />,
          label: "Processing"
        };
    }
  };

  const statusConfig = getStatusConfig(order.status);

  return (
    <div className="group h-full">
      <div className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 h-full flex flex-col">
        {/* Header */}
        <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-100 flex items-center justify-center">
              <FiPackage className="text-emerald-600 text-sm" />
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide">Order</p>
              <p className="text-sm font-semibold text-gray-900">
                #{order._id ? order._id.slice(-6).toUpperCase() : "N/A"}
              </p>
            </div>
          </div>
          <div className={`px-2.5 py-1 text-xs font-medium flex items-center gap-1.5 ${statusConfig.bg} ${statusConfig.text} border ${statusConfig.border}`}>
            {statusConfig.icon}
            {statusConfig.label}
          </div>
        </div>

        {/* Content */}
        <div className="px-4 py-4 flex-1 space-y-3">
          <div className="flex items-center gap-3">
            <FiShoppingBag className="text-gray-400 text-sm" />
            <div className="flex-1">
              <p className="text-xs text-gray-500">Shop Name</p>
              <p className="text-sm font-medium text-gray-900 truncate">{order.shop_name || "N/A"}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <FiCalendar className="text-gray-400 text-sm" />
            <div className="flex-1">
              <p className="text-xs text-gray-500">Created</p>
              <p className="text-sm font-medium text-gray-900">
                {order.createdAt
                  ? new Date(order.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric"
                  })
                  : "N/A"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <FiHash className="text-gray-400 text-sm" />
            <div className="flex-1">
              <p className="text-xs text-gray-500">Items</p>
              <p className="text-sm font-medium text-gray-900">
                {order.product_items?.length || 0} {order.product_items?.length === 1 ? "item" : "items"}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 py-3 bg-gray-50 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">Total Amount</p>
              <p className="text-lg font-bold text-gray-900">
                Rs. {order.total_price?.toLocaleString() || "0"}
              </p>
            </div>
            {user?.role === "supplier" && order.status === "processing" && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleSubmit && handleSubmit();
                }}
                className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium px-4 py-2 transition-colors"
              >
                <FiTruck className="text-sm" />
                Mark Delivered
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleOrder;
