import { useState } from "react";
import Navbar from "../Admin/components/Navbar";
import SideBar from "../Admin/components/SideBar";
import { Plus, X, ShoppingCart } from "lucide-react";
import NewOrder from "./NewOrder";

const BookersProductPage = () => {
  const [showNewOrder, setShowNewOrder] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleToggleForm = () => {
    setShowNewOrder((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

      <div className="flex">
        <SideBar
          name={"create-order"}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <main className="flex-1 p-4 md:p-8">
          {/* Page Header */}
          <div className="flex items-center justify-between bg-white border border-gray-200 px-6 py-4 shadow-sm mb-6">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-emerald-100 text-emerald-600">
                <ShoppingCart className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Create Order</h1>
                <p className="text-sm text-gray-500">Place new orders for your customers</p>
              </div>
            </div>
            <button
              onClick={handleToggleForm}
              className={`flex items-center gap-2 px-4 py-2.5 font-medium text-sm shadow-sm transition-colors ${showNewOrder
                ? "bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200"
                : "bg-emerald-600 text-white hover:bg-emerald-700 shadow-emerald-200"
                }`}
            >
              {showNewOrder ? (
                <>
                  <X className="w-4 h-4" />
                  Cancel
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  New Order
                </>
              )}
            </button>
          </div>

          {/* Content */}
          {showNewOrder ? (
            <NewOrder />
          ) : (
            <div className="flex flex-col items-center justify-center py-20 bg-white border border-gray-200">
              <div className="w-16 h-16 bg-emerald-100 flex items-center justify-center mb-4">
                <ShoppingCart className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">Ready to Create an Order?</h3>
              <p className="text-sm text-gray-500 mb-4">Click the button above to start a new order</p>
              <button
                onClick={handleToggleForm}
                className="flex items-center gap-2 bg-emerald-600 text-white px-5 py-2.5 font-medium text-sm hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-200"
              >
                <Plus className="w-4 h-4" />
                Create New Order
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default BookersProductPage;
