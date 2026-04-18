import { PiAddressBook } from "react-icons/pi";
import { Link } from "react-router-dom";
import { GoHome } from "react-icons/go";
import { RiAddLine } from "react-icons/ri";
import { IoCartOutline } from "react-icons/io5";
import { AiOutlineTruck, AiOutlineProduct } from "react-icons/ai";
import { useSelector } from "react-redux";

const SideBar = ({ name, isOpen, onClose }) => {
  const { user } = useSelector((state) => state.userSlice);

  const linkClass = (linkName) =>
    `w-full flex transition-all duration-200 py-2 pl-2 pr-6 rounded-full items-center text-2xl ${name === linkName
      ? "text-white bg-green-700"
      : "hover:bg-green-50 hover:text-green-700"
    }`;

  return (
    <>
      {/* Overlay — mobile only */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar panel */}
      <div
        className={`
          fixed bottom-0 left-0 h-[calc(100%-5rem)] z-40 bg-white shadow-xl w-56
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:sticky md:top-20 md:translate-x-0 md:shadow-none md:z-20
          md:h-[calc(100vh-5rem)] md:w-fit border-r border-green-500
        `}
      >
        {/* Close button — mobile only */}
        {/* <button
          className="md:hidden absolute top-4 right-4 p-1 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button> */}

        {/* Admin links */}
        {user?.role === "admin" && (
          <ul className="flex flex-col gap-2 py-5 px-3 [&>*>p]:text-lg [&>*>p]:ml-2">
            <Link to="/dashboard" className={linkClass("home")} onClick={onClose}>
              <GoHome /><p>Dashboard</p>
            </Link>
            <Link to="/products" className={linkClass("products")} onClick={onClose}>
              <AiOutlineProduct /><p>Products</p>
            </Link>
            <Link to="/bookers" className={linkClass("bookers")} onClick={onClose}>
              <PiAddressBook /><p>Bookers</p>
            </Link>
            <Link to="/suppliers" className={linkClass("suppliers")} onClick={onClose}>
              <AiOutlineTruck /><p>Suppliers</p>
            </Link>
            <Link to="/orders" className={linkClass("get-my-orders")} onClick={onClose}>
              <IoCartOutline /><p>Orders</p>
            </Link>
          </ul>
        )}

        {/* Booker links */}
        {user?.role === "booker" && (
          <ul className="flex flex-col gap-2 py-5 px-3 [&>*>p]:text-lg [&>*>p]:ml-2">
            <Link to="/products" className={linkClass("products")} onClick={onClose}>
              <AiOutlineProduct /><p>Products</p>
            </Link>
            <Link to="/booker/create-order" className={linkClass("create-order")} onClick={onClose}>
              <RiAddLine /><p className="text-nowrap">Create Order</p>
            </Link>
            <Link to="/booker/get-my-orders" className={linkClass("get-my-orders")} onClick={onClose}>
              <PiAddressBook /><p>My Orders</p>
            </Link>
          </ul>
        )}

        {/* Supplier links */}
        {user?.role === "supplier" && (
          <ul className="flex flex-col gap-2 py-5 px-3 [&>*>p]:text-lg [&>*>p]:ml-2">
            <Link to="/supplier/products" className={linkClass("queue-products")} onClick={onClose}>
              <AiOutlineProduct /><p className="text-nowrap">New Orders</p>
            </Link>
            <Link to="/supplier/delivered-products" className={linkClass("delivered-products")} onClick={onClose}>
              <PiAddressBook /><p className="text-nowrap">Delivered Orders</p>
            </Link>
          </ul>
        )}
      </div>
    </>
  );
};

export default SideBar;