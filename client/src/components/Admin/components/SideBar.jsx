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
    `group w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all duration-200 ${name === linkName
      ? "bg-emerald-600 text-white shadow-lg"
      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
    }`;

  const iconClass = (linkName) =>
    `text-xl transition-transform duration-200 group-hover:scale-110 ${name === linkName ? "text-white" : "text-gray-400 group-hover:text-emerald-600"
    }`;

  const SectionLabel = ({ children }) => (
    <p className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
      {children}
    </p>
  );

  return (
    <>
      {/* Overlay — mobile only */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 md:hidden transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Sidebar panel */}
      <aside
        className={`
          fixed bottom-0 left-0 h-[calc(100%-4rem)] z-40 bg-white w-64
          transform transition-all duration-300 ease-out
          ${isOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"}
          md:sticky md:top-16 md:translate-x-0 md:shadow-none md:z-20
          md:h-[calc(100vh-4rem)] md:w-64 border-r border-gray-100
        `}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center gap-3 px-2">
              <div className="w-10 h-10 rounded-sm bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center text-white font-bold text-lg shadow-md">
                {user?.fullName?.charAt(0) || "U"}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 truncate">{user?.fullName}</p>
                <p className="text-xs text-emerald-600 capitalize font-medium">{user?.role}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-3">
            {/* Admin links */}
            {user?.role === "admin" && (
              <div className="space-y-1">
                <SectionLabel>Main Menu</SectionLabel>
                <Link to="/dashboard" className={linkClass("home")} onClick={onClose}>
                  <GoHome className={iconClass("home")} />
                  <span>Dashboard</span>
                </Link>
                <Link to="/products" className={linkClass("products")} onClick={onClose}>
                  <AiOutlineProduct className={iconClass("products")} />
                  <span>Products</span>
                </Link>

                <SectionLabel>Management</SectionLabel>
                <Link to="/bookers" className={linkClass("bookers")} onClick={onClose}>
                  <PiAddressBook className={iconClass("bookers")} />
                  <span>Bookers</span>
                </Link>
                <Link to="/suppliers" className={linkClass("suppliers")} onClick={onClose}>
                  <AiOutlineTruck className={iconClass("suppliers")} />
                  <span>Suppliers</span>
                </Link>
                <Link to="/orders" className={linkClass("get-my-orders")} onClick={onClose}>
                  <IoCartOutline className={iconClass("get-my-orders")} />
                  <span>Orders</span>
                </Link>
              </div>
            )}

            {/* Booker links */}
            {user?.role === "booker" && (
              <div className="space-y-1">
                <SectionLabel>Menu</SectionLabel>
                <Link to="/products" className={linkClass("products")} onClick={onClose}>
                  <AiOutlineProduct className={iconClass("products")} />
                  <span>Products</span>
                </Link>
                <Link to="/booker/create-order" className={linkClass("create-order")} onClick={onClose}>
                  <RiAddLine className={iconClass("create-order")} />
                  <span>Create Order</span>
                </Link>
                <Link to="/booker/get-my-orders" className={linkClass("get-my-orders")} onClick={onClose}>
                  <PiAddressBook className={iconClass("get-my-orders")} />
                  <span>My Orders</span>
                </Link>
              </div>
            )}

            {/* Supplier links */}
            {user?.role === "supplier" && (
              <div className="space-y-1">
                <SectionLabel>Orders</SectionLabel>
                <Link to="/supplier/products" className={linkClass("queue-products")} onClick={onClose}>
                  <AiOutlineProduct className={iconClass("queue-products")} />
                  <span>New Orders</span>
                </Link>
                <Link to="/supplier/delivered-products" className={linkClass("delivered-products")} onClick={onClose}>
                  <PiAddressBook className={iconClass("delivered-products")} />
                  <span>Delivered Orders</span>
                </Link>
              </div>
            )}
          </nav>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-gray-100">
            <div className="px-4 py-3 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-100">
              <p className="text-xs font-medium text-emerald-800">Need help?</p>
              <p className="text-xs text-emerald-600 mt-0.5">Contact support team</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default SideBar;
