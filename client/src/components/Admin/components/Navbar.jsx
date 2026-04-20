import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUserThunk } from "../../../../store/user/user.thunk";
import toast from "react-hot-toast";

const Navbar = ({ onMenuClick }) => {
  const { user } = useSelector((state) => state.userSlice);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await dispatch(logoutUserThunk());
    navigate("/");
    toast.success("Logout Successful!");
  };

  return (
    <nav className="sticky top-0 z-50 flex justify-between items-center h-16 bg-gradient-to-r from-emerald-600 to-emerald-700 px-6 shadow-lg">
      <div className="flex items-center gap-4">
        {/* Hamburger — mobile only */}
        <button
          className="md:hidden p-2 rounded-lg text-white/90 hover:text-white hover:bg-white/10 active:bg-white/20 transition-all duration-200"
          onClick={onMenuClick}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        <div className="h-10 w-30 bg-white py-1.5 rounded-sm shadow-md">
          <img
            className="h-full w-full object-cover"
            src="/CEMS_Logo.png"
            alt="Company Logo"
          />
        </div>
      </div>

      <div className="relative flex items-center gap-3" ref={dropdownRef}>
        {/* User info */}
        <div className="hidden sm:flex flex-col items-end">
          <p className="font-semibold text-sm text-white truncate max-w-[140px]">
            {user?.fullName}
          </p>
          <span className="text-xs text-emerald-100 capitalize">{user?.role}</span>
        </div>

        {/* Avatar button */}
        <button
          className="relative group"
          onClick={() => setDropdownOpen((prev) => !prev)}
          aria-label="User menu"
        >
          <div className="ring-2 ring-white/30 group-hover:ring-white/50 rounded-full transition-all duration-200">
            <img
              className="w-10 h-10 rounded-full object-cover"
              src={user?.profilePic}
              alt="Profile"
            />
          </div>
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-emerald-700 rounded-full"></span>
        </button>

        {/* Dropdown */}
        {dropdownOpen && (
          <div className="absolute right-0 top-14 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden min-w-[180px] animate-in fade-in slide-in-from-top-2 duration-200">
            {/* User info in dropdown on mobile */}
            <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
              <p className="font-semibold text-gray-900 truncate">{user?.fullName}</p>
              <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
            </div>

            <div className="py-1">
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-2.5 w-full text-left text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors duration-150"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                <span className="font-medium text-sm">Sign out</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
