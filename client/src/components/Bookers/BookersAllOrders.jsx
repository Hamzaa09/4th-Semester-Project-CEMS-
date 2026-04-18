import React, { useEffect } from "react";
import SingleOrder from "./SingleOrder";
import Navbar from "../Admin/components/Navbar";
import SideBar from "../Admin/components/SideBar";
import { useDispatch, useSelector } from "react-redux";
import { getOrderThunk } from "../../../store/order/order.thunk";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const BookersAllOrders = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.orderSlice);
  const { user } = useSelector((state) => state.userSlice);
  const [sidebarOpen, setSidebarOpen] = useState(false); // 👈

  useEffect(() => {
    dispatch(getOrderThunk({ booker: true, id: user._id }));
  }, []);

  return (
    <div className="h-full">
      <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} /> {/* 👈 */}

      <div className="flex bg-gray-100">
        <SideBar name={"get-my-orders"} isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)} />

        <div className="w-full h-full flex flex-col gap-10 my-10 px-5 md:px-10">
          {/* Header / Create New Button */}
          <div className="flex justify-between w-full items-center bg-white px-4 py-4 rounded-xl">
            <h2 className="text-2xl font-bold text-gray-800">
              All Orders By {user.fullName}
            </h2>
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
              <div className="px-3 text-gray-700 text-xl col-span-full">No Orders Yet!</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookersAllOrders;
