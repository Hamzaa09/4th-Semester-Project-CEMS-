import { useEffect, useState, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { placeOrderThunk } from "../../store/order/order.thunk";

const Success = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const hasPlacedOrder = useRef(false); // ✅ prevents duplicate execution

  useEffect(() => {
    const placeOrder = async () => {
      if (hasPlacedOrder.current) return; // ✅ stop if already ran
      hasPlacedOrder.current = true;      // ✅ mark immediately before async work

      try {
        const pendingOrder = localStorage.getItem("pendingOrder");

        if (!pendingOrder) {
          setLoading(false);
          return;
        }

        const orderData = JSON.parse(pendingOrder);

        localStorage.removeItem("pendingOrder"); // ✅ remove BEFORE dispatch

        const res = await dispatch(placeOrderThunk(orderData));

        if (res.payload.success) {
          toast.success("Order placed successfully!");
        }
      } catch (err) {
        toast.error("Something went wrong.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    placeOrder();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500 text-sm animate-pulse">Confirming your order...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-gray-50">
      <div className="bg-white border border-gray-200 rounded-xl p-10 max-w-md w-full text-center shadow-sm">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
          <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h1 className="text-2xl font-medium text-gray-800 mb-2">Payment successful</h1>
        <p className="text-gray-500 text-sm mb-6">
          Your order has been placed. You'll receive a confirmation shortly.
        </p>
        {sessionId && (
          <div className="bg-gray-50 rounded-lg p-3 mb-6 text-left">
            <p className="text-xs text-gray-400 mb-1">Order reference</p>
            <p className="text-sm font-mono text-gray-700 truncate">{sessionId}</p>
          </div>
        )}
        <div className="flex flex-col gap-3">
          <button
            onClick={() => navigate("/booker/get-my-orders")}
            className="w-full py-2.5 rounded-lg border border-gray-300 text-gray-700 text-sm hover:bg-gray-50 transition"
          >
            View my orders
          </button>
          <button
            onClick={() => navigate("/")}
            className="w-full py-2.5 rounded-lg border border-gray-100 text-gray-400 text-sm hover:bg-gray-50 transition"
          >
            Back to home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Success;