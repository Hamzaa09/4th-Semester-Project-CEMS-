import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrderAdminThunk } from "../../../store/order/order.thunk";
import { getUserByRoleThunk } from "../../../store/user/user.thunk";
import { useNavigate } from "react-router-dom";
import { Package, ArrowRight } from "lucide-react";
import SideBar from "./components/SideBar";
import Navbar from "./components/Navbar";
import SingleOrder from "../Bookers/SingleOrder";
import StatsCards from "../Admin/components/StatsCard"
import ChartsPage from "../Admin/components/ChartsPage"

const MainPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { bookers, suppliers } = useSelector((state) => state.userSlice);
  const { orders } = useSelector((state) => state.orderSlice);
  const [bookerState, setbookerState] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(getOrderAdminThunk());

      const res = await dispatch(getUserByRoleThunk({ role: "booker" }));
      if (res.payload.success) {
        setbookerState(res.payload.users.length);
      }

      dispatch(getUserByRoleThunk({ role: "supplier" }));
    };

    fetchData();
  }, [dispatch]);

  useEffect(() => { }, [bookers, suppliers]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

      <div className="relative flex">
        <SideBar
          name={"home"}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <main className="flex-1 w-full">
          <div className="px-4 sm:px-6 lg:px-8 py-6 space-y-6">
            {/* Stats Section */}
            <StatsCards
              bookers={bookerState}
              suppliers={suppliers}
              orders={orders}
            />

            {/* Charts Section */}
            <ChartsPage orders={orders} />

            {/* Recent Orders Section */}
            <section className="space-y-4">
              <div className="flex items-center justify-between bg-white border border-gray-200 px-6 py-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 bg-emerald-100 text-emerald-600">
                    <Package className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      Recent Orders
                    </h2>
                    <p className="text-sm text-gray-500">
                      {orders?.length || 0} orders in total
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => navigate("/orders")}
                  className="flex items-center gap-2 text-sm font-medium text-emerald-600 hover:text-emerald-700 transition-colors"
                >
                  View All
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="bg-white border border-gray-200 p-6 shadow-sm">
                {orders && orders.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {orders.slice(0, 10).map((order) => (
                      <div
                        key={order._id}
                        className="cursor-pointer transition-transform hover:-translate-y-1"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/booker/single-product/${order._id}`);
                        }}
                      >
                        <SingleOrder order={order} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="w-16 h-16 bg-gray-100 flex items-center justify-center mb-4">
                      <Package className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-1">
                      No Orders Yet
                    </h3>
                    <p className="text-sm text-gray-500">
                      Orders will appear here once they are placed
                    </p>
                  </div>
                )}
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainPage;
