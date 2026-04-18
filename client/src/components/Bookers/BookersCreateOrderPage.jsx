import { useState } from "react";
import Navbar from "../Admin/components/Navbar";
import SideBar from "../Admin/components/SideBar";
import { CiCirclePlus } from "react-icons/ci";
import NewOrder from "./NewOrder";

const BookersProductPage = () => {
  const [showNewOrder, setShowNewOrder] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false); // 👈

  const handleToggleForm = () => {
    setShowNewOrder((prev) => !prev);
  };
  return (
    <div className="h-full">
      <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} /> {/* 👈 */}

      <div className="flex bg-gray-100">
        <SideBar name={"create-order"} isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)} />

        <div className="w-full h-full flex flex-col gap-10 my-10 px-5 md:px-10">
          {/* Header / Create New Button */}
          <div className="flex justify-between w-full items-center bg-white px-4 py-4 rounded-xl">
            <h2 className="text-3xl font-bold text-gray-800">Booker's Menu</h2>
            <button
              onClick={handleToggleForm}
              className="bg-green-700 text-white px-4 py-2 rounded-md shadow hover:cursor-pointer hover:bg-green-600 transition"
            >
              {showNewOrder ? "Cancel" : "Create New Order"}
            </button>
          </div>

          {/* Show NewOrder component conditionally */}
          {showNewOrder && <NewOrder />}
        </div>
      </div>
    </div>
  );
};

export default BookersProductPage;
