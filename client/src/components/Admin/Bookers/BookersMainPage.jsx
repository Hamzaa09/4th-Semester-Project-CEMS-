import React, { useEffect, useState } from "react";
import UserCard from "../Bookers/components/UserCard";
import Navbar from "../components/Navbar";
import SideBar from "../components/SideBar";
import { useDispatch, useSelector } from "react-redux";
import { getUserByRoleThunk } from "../../../../store/user/user.thunk";
import AddUserForm from "./components/AddUserForm";


const BookersMainPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false); // 👈
  const dispatch = useDispatch();
  const { bookers } = useSelector((state) => state.userSlice);

  const [showForm, setShowForm] = useState(false);

  const fetchBookers = () => {
    dispatch(getUserByRoleThunk({ role: "booker" }));
  };

  useEffect(() => {
    fetchBookers();
  }, [dispatch]);

  const handleToggleForm = () => {
    setShowForm((prev) => !prev);
  };

  const handleUserAdded = () => {
    fetchBookers();
    setShowForm(false);
  };

  return (
    <div className="h-full">
      <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} /> {/* 👈 */}

      <div className="flex bg-gray-100">
        <SideBar name={"bookers"}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)} />

        <div className="w-full h-full flex flex-col gap-10 my-10 px-5 md:px-10">
          {/* Header & Add New Booker Button */}
          <div className="flex justify-between w-full items-center bg-white px-4 py-4 rounded-xl">
            <h2 className="text-3xl font-bold text-gray-800">Bookers Page</h2>
            <button
              onClick={handleToggleForm}
              className="bg-green-700 text-white px-4 py-2 rounded-md shadow hover:cursor-pointer hover:bg-green-600 transition"
            >
              {showForm ? "Cancel" : "Add New Booker"}
            </button>
          </div>

          {/* Conditional Add User Form */}
          {showForm && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <AddUserForm onUserAdded={handleUserAdded} />
            </div>
          )}

          {/* Display Users */}
          <div className="flex flex-row flex-wrap overflow-y-clip gap-5">
            {bookers && bookers.length > 0 ? (
              bookers.map((user) => <UserCard key={user._id} user={user} />)
            ) : (
              <p className="text-gray-500">No bookers found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookersMainPage;
