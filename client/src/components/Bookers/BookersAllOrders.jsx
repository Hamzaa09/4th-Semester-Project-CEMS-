import React, { useEffect, useState } from "react";
import SingleOrder from "./SingleOrder";
import Navbar from "../Admin/components/Navbar";
import SideBar from "../Admin/components/SideBar";
import { useDispatch, useSelector } from "react-redux";
import { getOrderThunk } from "../../../store/order/order.thunk";
import { useNavigate } from "react-router-dom";
import { ClipboardList, Search, Filter } from "lucide-react";

const BookersAllOrders = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.orderSlice);
  const { user } = useSelector((state) => state.userSlice);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    dispatch(getOrderThunk({ booker: true, id: user._id }));
  }, [user, dispatch]);

  const filteredOrders = orders?.filter((order) => {
    const matchesSearch =
      order.shop_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order._id?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const deliveredCount = orders?.filter(o => o.status === "delivered").length || 0;
  const processingCount = orders?.filter(o => o.status === "processing").length || 0;

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

      <div className="flex">
        <SideBar
          name={"get-my-orders"}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <main className="flex-1 p-4 md:p-8">
          {/* Page Header */}
          <div className="flex items-center justify-between bg-white border border-gray-200 px-6 py-4 shadow-sm mb-6">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-emerald-100 text-emerald-600">
                <ClipboardList className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">My Orders</h1>
                <p className="text-sm text-gray-500">
                  {orders?.length || 0} total | {deliveredCount} delivered | {processingCount} processing
                </p>
              </div>
            </div>
          </div>

          {/* Search & Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by shop name or order ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="pl-10 pr-8 py-2.5 border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 appearance-none cursor-pointer"
              >
                <option value="all">All Status</option>
                <option value="processing">Processing</option>
                <option value="delivered">Delivered</option>
              </select>
            </div>
          </div>

          {/* Orders Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredOrders && filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <div
                  key={order._id}
                  className="cursor-pointer transition-transform hover:-translate-y-1"
                  onClick={() => navigate(`/booker/single-product/${order._id}`)}
                >
                  <SingleOrder order={order} />
                </div>
              ))
            ) : (
              <div className="col-span-full">
                <div className="flex flex-col items-center justify-center py-16 bg-white border border-gray-200">
                  <ClipboardList className="w-12 h-12 text-gray-300 mb-3" />
                  <h3 className="text-lg font-medium text-gray-900 mb-1">No Orders Found</h3>
                  <p className="text-sm text-gray-500">
                    {searchQuery || statusFilter !== "all"
                      ? "Try adjusting your search or filters"
                      : "You haven't placed any orders yet"}
                  </p>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default BookersAllOrders;
