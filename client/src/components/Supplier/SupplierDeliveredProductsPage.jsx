import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrderThunk } from "../../../store/order/order.thunk";
import { useNavigate } from "react-router-dom";
import Navbar from "../Admin/components/Navbar";
import SideBar from "../Admin/components/SideBar";
import SingleOrder from "../Bookers/SingleOrder";

const SupplierDeliveredProductsPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.orderSlice);
  const { user } = useSelector((state) => state.userSlice);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    dispatch(getOrderThunk({ booker: false, id: user._id }));
  }, [dispatch]);


  return (
    <div className="h-full">
      <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

      <div className="flex bg-gray-100">
        <SideBar name={"delivered-products"} isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)} />

        <div className="w-full h-full flex flex-col gap-10 my-10 px-5 md:px-10">
          {/* Header / Create New Button */}
          <div className="flex justify-between w-full items-center bg-white px-4 py-4 rounded-xl">
            <h2 className="text-2xl font-bold text-gray-800">
              Orders Delivered By {user.fullName}
            </h2>
          </div>

          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {orders && orders.length > 0 ? (
              orders.map((order) =>
                order.status === "delivered" ? (
                  <div key={order._id}>
                    <SingleOrder
                      order={order}
                      handleSubmit={() => handleSubmit({ id: order._id })}
                    />
                  </div>
                ) : null
              )
            ) : (
              <div className="px-3 text-gray-700 text-xl col-span-full">No Orders Yet!</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplierDeliveredProductsPage;
