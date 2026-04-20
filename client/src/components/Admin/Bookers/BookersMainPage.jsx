import React, { useEffect, useState } from "react";
import UserCard from "./components/UserCard";
import Navbar from "../components/Navbar";
import SideBar from "../components/SideBar";
import AddUserForm from "./components/AddUserForm";
import { useDispatch, useSelector } from "react-redux";
import { getUserByRoleThunk } from "../../../../store/user/user.thunk";
import { Users, Plus, X, Search } from "lucide-react";

const BookersMainPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();
  const { bookers } = useSelector((state) => state.userSlice);

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

  const filteredBookers = bookers?.filter((user) =>
    user.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

      <div className="flex">
        <SideBar
          name={"bookers"}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-6">
          {/* Page Header */}
          <div className="flex items-center justify-between bg-white border border-gray-200 px-6 py-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-emerald-100 text-emerald-600">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Bookers</h1>
                <p className="text-sm text-gray-500">
                  {bookers?.length || 0} team members
                </p>
              </div>
            </div>
            <button
              onClick={handleToggleForm}
              className={`flex items-center gap-2 px-4 py-2.5 font-semibold text-sm transition-colors shadow-sm ${showForm
                ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                : "bg-emerald-600 text-white hover:bg-emerald-700 shadow-emerald-200"
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
                  Add Booker
                </>
              )}
            </button>
          </div>

          {/* Add User Form */}
          {showForm && (
            <div className="bg-white border border-gray-200 p-6 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900 mb-6">Add New Booker</h2>
              <AddUserForm onUserAdded={handleUserAdded} />
            </div>
          )}

          {/* Search Bar */}
          {!showForm && bookers && bookers.length > 0 && (
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 bg-white text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              />
            </div>
          )}

          {/* Users Grid */}
          {filteredBookers && filteredBookers.length > 0 ? (
            <div className="flex flex-wrap gap-5">
              {filteredBookers.map((user) => (
                <UserCard key={user._id} user={user} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 bg-white border border-gray-200">
              <div className="w-16 h-16 bg-gray-100 flex items-center justify-center mb-4">
                <Users className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {searchQuery ? "No results found" : "No bookers yet"}
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                {searchQuery
                  ? "Try adjusting your search query"
                  : "Add your first booker to get started"}
              </p>
              {!searchQuery && !showForm && (
                <button
                  onClick={handleToggleForm}
                  className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add Booker
                </button>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default BookersMainPage;
