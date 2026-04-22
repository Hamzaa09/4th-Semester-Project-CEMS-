import React, { useEffect, useState } from "react";
import { getSingleOrderThunk } from "../../../store/order/order.thunk";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSingleProductThunk } from "../../../store/product/product.thunk";
import { getSingleUserThunk } from "../../../store/user/user.thunk";

const OrderDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.userSlice);
  const { order } = useSelector((state) => state.orderSlice);
  const [productsData, setProductsData] = useState([]);
  const [booker, setBooker] = useState({});

  useEffect(() => {
    if (id) {
      dispatch(getSingleOrderThunk({ id }));
    }
  }, [id, dispatch]);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!order) return;

      const parsed = order.product_items.map((prod) => prod.productId);

      const results = await Promise.all(
        parsed.map(async (p, index) => {
          const res = await dispatch(getSingleProductThunk({ id: p }));

          return {
            quantity: order.product_items[index].quantity,
            booker_id: order.booker_id,
            productInfo: res.payload.product,
          };
        }),
      );

      setProductsData(results);
    };

    fetchProducts();
  }, [order, dispatch]);

  useEffect(() => {
    const bookerCall = async () => {
      if (order?.booker_id) {
        const result = await dispatch(
          getSingleUserThunk({ id: order?.booker_id }),
        );
        if (result.payload) setBooker(result.payload.user);
      }
    };

    bookerCall();
  }, [order?.booker_id]);

  return (
    <>
      <div className="flex justify-center mt-10">
        <div className="pt-6 pl-2 w-full max-w-3xl">
          <button
            onClick={() => navigate(-1)}
            className="self-start mb-4 bg-gray-200 px-4 py-2 rounded-lg hover:cursor-pointer hover:bg-gray-300 transition"
          >
            Back
          </button>
        </div>
      </div>

      <div className="flex justify-center mt-5 mb-5">
        <div className="bg-white shadow-md rounded-2xl p-6 w-full max-w-3xl border border-gray-200">
          <h2 className="text-xl font-semibold text-center mb-4 border-b pb-2">
            Order Details
          </h2>

          {/* Order Info */}
          <div className="grid grid-cols-2 gap-4 text-sm mb-4">
            <div>
              <span className="font-medium text-gray-600">Order ID:</span>{" "}
              <span className="text-gray-800">
                {order?._id ? `#${order._id.slice(-5)}` : "N/A"}
              </span>
            </div>
            <div>
              <span className="font-medium text-gray-600">Created At:</span>{" "}
              <span className="text-gray-800">
                {new Date(order?.createdAt).toLocaleDateString()}
              </span>
            </div>
            <div>
              <span className="font-medium text-gray-600">Shop Name:</span>{" "}
              <span className="text-gray-800">{order?.shop_name}</span>
            </div>
            <div>
              <span className="font-medium text-gray-600">Status:</span>{" "}
              <span className="text-green-600 font-medium">
                {order?.status.toUpperCase()}
              </span>
            </div>
          </div>

          {/* Customer Info */}
          <h3 className="text-lg font-semibold border-b pb-1 mb-2">
            Booker Information
          </h3>
          <div className="grid grid-cols-2 gap-4 text-sm mb-4">
            <div>
              <span className="font-medium text-gray-600">Booker Name:</span>{" "}
              <span className="text-gray-800">
                {user.role === "booker" ? user?.fullName : booker?.fullName}
              </span>
            </div>
            <div>
              <span className="font-medium text-gray-600">Phone:</span>{" "}
              <span className="text-gray-800">
                {user.role === "booker"
                  ? user?.phoneNumber
                  : booker?.phoneNumber}
              </span>
            </div>
            <div>
              <span className="font-medium text-gray-600">Email:</span>{" "}
              <span className="text-gray-800">
                {user.role === "booker" ? user?.email : booker?.email}
              </span>
            </div>
          </div>

          {/* Items List */}
          <h3 className="text-lg font-semibold border-b pb-1 mb-2">
            Ordered Items
          </h3>
          <table className="w-full text-sm border border-gray-200 mb-4">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2 text-left">Item</th>
                <th className="border p-2 text-center">Qty</th>
                <th className="border p-2 text-center">Unit Price</th>
                <th className="border p-2 text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {productsData.map((item, index) => (
                <tr key={index}>
                  <td className="border p-2">
                    {item.productInfo?.product_title}
                  </td>
                  <td className="border p-2 text-center">{item.quantity}</td>

                  <td className="border p-2 text-center">
                    {item.productInfo?.product_price} PKR
                  </td>

                  <td className="border p-2 text-right">
                    {Number(item.productInfo?.product_price) *
                      Number(item.quantity)}{" "}
                    PKR
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Payment Summary */}
          <h3 className="text-lg font-semibold border-b pb-1 mb-2">
            Payment Summary
          </h3>
          <div className="text-sm space-y-1">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal:</span>
              <span className="text-gray-800">{order?.total_price} PKR</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Discount (10%):</span>
              <span className="text-gray-800">
                {order?.total_price * 0.1} PKR
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Tax (5%):</span>
              <span className="text-gray-800">
                {order?.total_price * 0.05} PKR
              </span>
            </div>
            <div className="flex justify-between border-t pt-2 mt-2">
              <span className="font-semibold text-gray-700">
                Total Payment:
              </span>
              <span className="font-semibold text-green-600">
                {Number(order?.total_price) -
                  Number(order?.total_price * 0.1) +
                  Number(order?.total_price * 0.05)}
                PKR
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-600">Payment Method:</span>
              <span className="text-gray-800">
                {order?.payment_type == "online"
                  ? "Online"
                  : "Cash On Dilevery"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetail;
