import React, { useEffect, useState } from "react";
import UserCard from "../Bookers/components/UserCard";
import Navbar from "../components/Navbar";
import SideBar from "../components/SideBar";
import { useDispatch, useSelector } from "react-redux";
import { getUserByRoleThunk } from "../../../../store/user/user.thunk";
import AddUserForm from "../Bookers/components/AddUserForm";
import { Truck, Plus, X, Search, Users } from "lucide-react";

const AdminSupplierMainPage = () => {
  const { suppliers } = useSelector((state) => state.userSlice);
  const dispatch = useDispatch();
  const [showForm, setShowForm] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

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

  const filteredSuppliers = suppliers?.filter(
    (user) =>
      user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

      <div className="flex">
        <SideBar
          name={"suppliers"}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-6">
          {/* Page Header */}
          <div className="flex items-center justify-between bg-white border border-gray-200 px-6 py-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-purple-100 text-purple-600">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Suppliers</h1>
                <p className="text-sm text-gray-500">
                  {suppliers?.length || 0} suppliers registered
                </p>
              </div>
            </div>
            <button
              onClick={handleToggleForm}
              className={`flex items-center gap-2 px-4 py-2 font-medium transition-all duration-200 shadow-sm ${showForm
                ? "bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200"
                : "bg-emerald-600 text-white hover:bg-emerald-700"
                }`}
            >
              {showForm ? (
                <>
                  <X className="w-4 h-4" />
                  Cancel
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  Add Supplier
                </>
              )}
            </button>
          </div>

          {/* Add User Form */}
          {showForm && (
            <div className="bg-white border border-gray-200 p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-100">
                <Users className="w-5 h-5 text-emerald-600" />
                <h2 className="text-lg font-semibold text-gray-900">
                  Add New Supplier
                </h2>
              </div>
              <AddUserForm onUserAdded={handleUserAdded} defaultRole="supplier" />
            </div>
          )}

          {/* Search Bar */}
          {!showForm && suppliers && suppliers.length > 0 && (
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search suppliers by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent shadow-sm"
              />
            </div>
          )}

          {/* Suppliers Grid */}
          {filteredSuppliers && filteredSuppliers.length > 0 ? (
            <div className="flex flex-wrap gap-5">
              {filteredSuppliers.map((user) => (
                <UserCard key={user._id} user={user} />
              ))}
            </div>
          ) : (
            <div className="bg-white border border-gray-200 p-12 shadow-sm">
              <div className="flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-gray-100 flex items-center justify-center mb-4">
                  <Truck className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {searchQuery ? "No suppliers found" : "No suppliers yet"}
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  {searchQuery
                    ? "Try adjusting your search query"
                    : "Get started by adding your first supplier"}
                </p>
                {!searchQuery && !showForm && (
                  <button
                    onClick={handleToggleForm}
                    className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 font-medium hover:bg-emerald-700 transition-colors shadow-sm"
                  >
                    <Plus className="w-4 h-4" />
                    Add Supplier
                  </button>
                )}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminSupplierMainPage;
