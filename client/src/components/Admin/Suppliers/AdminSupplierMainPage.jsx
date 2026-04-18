import React, { useEffect, useState } from "react";
import UserCard from "../Bookers/components/UserCard";
import Navbar from "../components/Navbar";
import SideBar from "../components/SideBar";
import { useDispatch, useSelector } from "react-redux";
import { getUserByRoleThunk } from "../../../../store/user/user.thunk";
import AddUserForm from "../Bookers/components/AddUserForm";

const AdminSupplierMainPage = () => {
  const { suppliers } = useSelector((state) => state.userSlice);
  const dispatch = useDispatch();
  const [showForm, setShowForm] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false); // 👈


  const fetchSuppliers = () => {
    dispatch(getUserByRoleThunk({ role: "supplier" }));
  };

  useEffect(() => {
    fetchSuppliers();
  }, [dispatch]);

  const handleToggleForm = () => {
    setShowForm((prev) => !prev);
  };

  const handleUserAdded = () => {
    fetchSuppliers();
    setShowForm(false);
  };

  return (
    <div className="h-full">
      <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} /> {/* 👈 */}

      <div className="flex bg-gray-100">
        <SideBar name={"suppliers"} isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)} />

        <div className="w-full h-full flex flex-col gap-10 my-10 px-5 md:px-10">
          {/* Add New Booker Button */}
          <div className="flex justify-between w-full items-center bg-white px-4 py-4 rounded-xl">
            <h2 className="text-3xl font-bold text-gray-800">Suppliers Page</h2>
            <button
              onClick={handleToggleForm}
              className="bg-green-700 text-white px-4 py-2 rounded-md shadow hover:bg-green-600 hover:cursor-pointer transition"
            >
              {showForm ? "Cancel" : "Add New Supplier"}
            </button>
          </div>

          {/* Conditional Form */}
          {showForm && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <AddUserForm onUserAdded={handleUserAdded} />
            </div>
          )}

          {/* Display Users */}
          <div className="flex flex-row flex-wrap overflow-y-clip gap-5">
            {suppliers && suppliers.length > 0 ? (
              suppliers.map((user) => <UserCard key={user._id} user={user} />)
            ) : (
              <p className="text-gray-500">No suppliers found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSupplierMainPage;
