import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUserThunk } from "../../../../store/user/user.thunk";

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
  };

  return (
    <nav className="sticky top-0 z-50 flex justify-between items-center h-20 bg-green-700 px-5 md:px-10 lg:px-20">

      <div className="flex items-center gap-3">
        {/* Hamburger — mobile only */}
        <button
          className="md:hidden p-2 rounded-md text-white hover:bg-green-600 transition"
          onClick={onMenuClick}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <img
          className="w-32 sm:w-40 h-10 sm:h-12 object-cover bg-white rounded-2xl"
          src="/CEMS_Logo.png"
          alt="company-logo"
        />
      </div>

      <div className="relative flex items-center gap-2 sm:gap-3" ref={dropdownRef}>
        {/* Name hidden on mobile to save space */}
        <p className="hidden sm:block font-medium text-lg text-white truncate max-w-[160px]">
          {user?.fullName}
        </p>

        <img
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-full cursor-pointer object-cover"
          src={user?.profilePic}
          alt="profile-logo"
          onClick={() => setDropdownOpen((prev) => !prev)}
        />

        {dropdownOpen && (
          <div className="absolute right-0 top-12 bg-white shadow-md rounded-md overflow-hidden z-50 min-w-[120px]">
            {/* Show name in dropdown on mobile since it's hidden in navbar */}
            <div className="sm:hidden px-4 py-2 text-sm font-medium text-gray-800 border-b">
              {user?.fullName}
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 w-full text-left text-gray-700 hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;