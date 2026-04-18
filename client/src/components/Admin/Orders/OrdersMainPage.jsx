import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getOrderAdminThunk } from "../../../../store/order/order.thunk";
import Navbar from "../components/Navbar";
import SideBar from "../components/SideBar";
import SingleOrder from "../../Bookers/SingleOrder";

const OrdersMainPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.orderSlice);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    dispatch(getOrderAdminThunk());
  }, [dispatch]);

  return (
    <div className="h-full">
      <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

      <div className="flex bg-gray-100">
        <SideBar name={"get-my-orders"}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <div className="w-full h-full flex flex-col gap-10 my-10 px-4 md:px-10">
          <div className="flex justify-between w-full items-center bg-white px-4 py-4 rounded-xl">
            <h2 className="text-2xl font-bold text-gray-800">All Orders</h2>
          </div>

          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {orders && orders.length > 0 ? (
              orders.map((order) => (
                <div
                  key={order._id}
                  className="cursor-pointer"
                  onClick={() => navigate(`/booker/single-product/${order._id}`)}
                >
                  <SingleOrder order={order} />
                </div>
              ))
            ) : (
              <div className="px-3 text-gray-700 text-xl col-span-full">
                No Orders Yet!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersMainPage;