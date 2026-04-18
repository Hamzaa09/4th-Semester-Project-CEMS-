import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import SideBar from "./components/SideBar";
import ChartsPage from "./components/ChartsPage";
import StatsCards from "./components/StatsCard";
import { useDispatch, useSelector } from "react-redux";
import { getOrderAdminThunk } from "../../../store/order/order.thunk";
import { getUserByRoleThunk } from "../../../store/user/user.thunk";
import SingleOrder from "../Bookers/SingleOrder";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { bookers, suppliers } = useSelector((state) => state.userSlice);
  const { orders } = useSelector((state) => state.orderSlice);
  const [bookerState, setbookerState] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false); // 👈


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
    <div>
      <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} /> {/* 👈 */}

      <div className="relative flex bg-gray-100">
        <SideBar name={"home"} isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)} />

        <div className="w-full flex flex-col px-10">
          <StatsCards
            bookers={bookerState}
            suppliers={suppliers}
            orders={orders}
          />
          <ChartsPage orders={orders} />

          <div className="flex justify-between w-full items-center bg-white px-4 py-4 rounded-xl">
            <h2 className="text-3xl font-bold text-gray-800">Recent Orders</h2>
          </div>

          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 bg-gray-200 rounded-2xl my-6 p-6">
            {orders && orders.length > 0 ? (
              orders.map((order) => (
                <div
                  key={order._id}
                  className="cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/booker/single-product/${order._id}`);
                  }}
                >
                  <SingleOrder order={order} />
                </div>
              ))
            ) : (
              <div className="px-3 text-gray-700 text-xl col-span-full">No Orders Yet!</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
