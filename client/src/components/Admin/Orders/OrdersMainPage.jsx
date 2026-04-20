import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getOrderAdminThunk } from "../../../../store/order/order.thunk";
import Navbar from "../components/Navbar";
import SideBar from "../components/SideBar";
import SingleOrder from "../../Bookers/SingleOrder";
import { FiPackage, FiSearch, FiFilter, FiChevronDown } from "react-icons/fi";

const OrdersMainPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.orderSlice);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    dispatch(getOrderAdminThunk());
  }, [dispatch]);

  const filteredOrders = orders?.filter((order) => {
    const matchesSearch =
      order.shop_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order._id?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || order.status?.toLowerCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const orderStats = {
    total: orders?.length || 0,
    processing: orders?.filter((o) => o.status === "processing").length || 0,
    delivered: orders?.filter((o) => o.status === "delivered").length || 0,
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

      <div className="flex">
        <SideBar
          name={"get-my-orders"}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <div className="flex-1 p-4 md:p-8">
          {/* Page Header */}
          <div className="bg-white border border-gray-200 shadow-sm mb-6">
            <div className="px-6 py-5 border-b border-gray-100">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-100 flex items-center justify-center">
                    <FiPackage className="text-emerald-600 text-lg" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-gray-900">All Orders</h1>
                    <p className="text-sm text-gray-500">
                      Manage and track all customer orders
                    </p>
                  </div>
                </div>

                {/* Stats Pills */}
                <div className="flex items-center gap-2">
                  <div className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm font-medium">
                    Total: {orderStats.total}
                  </div>
                  <div className="px-3 py-1.5 bg-amber-50 text-amber-700 text-sm font-medium border border-amber-200">
                    Processing: {orderStats.processing}
                  </div>
                  <div className="px-3 py-1.5 bg-emerald-50 text-emerald-700 text-sm font-medium border border-emerald-200">
                    Delivered: {orderStats.delivered}
                  </div>
                </div>
              </div>
            </div>

            {/* Filters */}
            <div className="px-6 py-4 flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1 max-w-md">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by shop name or order ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
              <div className="relative">
                <FiFilter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="appearance-none pl-10 pr-10 py-2.5 border border-gray-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent cursor-pointer"
                >
                  <option value="all">All Status</option>
                  <option value="processing">Processing</option>
                  <option value="delivered">Delivered</option>
                </select>
                <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Orders Grid */}
          {filteredOrders && filteredOrders.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredOrders.map((order) => (
                <div
                  key={order._id}
                  className="cursor-pointer"
                  onClick={() => navigate(`/booker/single-product/${order._id}`)}
                >
                  <SingleOrder order={order} />
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white border border-gray-200 shadow-sm">
              <div className="px-6 py-16 text-center">
                <div className="w-16 h-16 bg-gray-100 mx-auto mb-4 flex items-center justify-center">
                  <FiPackage className="text-gray-400 text-2xl" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  No Orders Found
                </h3>
                <p className="text-sm text-gray-500">
                  {searchTerm || statusFilter !== "all"
                    ? "Try adjusting your search or filter criteria"
                    : "Orders will appear here once customers place them"}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrdersMainPage;
