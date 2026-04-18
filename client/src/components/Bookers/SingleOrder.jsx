import React from "react";
import { useSelector } from "react-redux";

const SingleOrder = ({ order, handleSubmit }) => {
  // Convert product_ids JSON string to array
  const { user, loading } = useSelector((state) => state.userSlice);

  return (
    <div className="duration-200 flex justify-center mt-5 cursor-pointer hover:scale-101">
      <div className="bg-white shadow-md rounded-2xl p-4 w-80 border border-gray-200">
        <h2 className="text-lg font-semibold text-center mb-4 border-b pb-2">
          Order Overview
        </h2>

        <div className="space-y-1 text-sm">
          <div className="flex justify-between">
            <span className="font-medium text-gray-600">Created At:</span>
            <span className="text-gray-800">
              {order.createdAt
                ? new Date(order.createdAt).toLocaleDateString()
                : "N/A"}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium text-gray-600">Order ID:</span>
            <span className="text-gray-800">{order._id ? `#${order._id.slice(-5)}` : "N/A"}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium text-gray-600">Shop Name:</span>
            <span className="text-gray-800">{order.shop_name}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium text-gray-600">Status:</span>
            <span className="text-gray-800 capitalize">
              {order.status || "processing"}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium text-gray-600">No. of Items:</span>
            <span className="text-gray-800">{order.product_items.length}</span>
          </div>

          <div className="flex justify-between border-t pt-2 mt-2">
            <span className="font-semibold text-gray-700">Total Payment:</span>
            <span className="font-semibold text-green-600">
              {order.total_price}
            </span>
          </div>

          {user.role === "supplier" && order.status === "processing" && (
            <div className="w-full flex justify-end items-center">
              <button onClick={handleSubmit} className="bg-green-700 text-white my-2 px-4 py-2 rounded-md shadow hover:cursor-pointer hover:bg-green-600 transition">
                Delivered
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleOrder;
