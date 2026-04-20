import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import SideBar from "../components/SideBar";
import ProductCard from "./components/ProductCard";
import AddProductForm from "./components/AddProductForm";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsThunk } from "../../../../store/product/product.thunk";
import { Package, Plus, X, Search, Grid, List } from "lucide-react";

const AdminPageProduct = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const { allProducts } = useSelector((state) => state.productSlice);
  const { user, loading } = useSelector((state) => state.userSlice);

  const [showForm, setShowForm] = useState(false);

  // Load products
  const fetchProducts = () => {
    dispatch(getAllProductsThunk());
  };

  useEffect(() => {
    fetchProducts();
  }, [dispatch]);

  const handleToggleForm = () => {
    setShowForm((prev) => !prev);
  };

  const handleProductAdded = () => {
    fetchProducts();
    setShowForm(false);
  };

  const filteredProducts = allProducts?.filter((product) =>
    product.product_title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalStock = allProducts?.reduce((acc, p) => acc + Number(p.product_stock || 0), 0) || 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

      <div className="flex">
        <SideBar
          name={"products"}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <main className="flex-1 p-4 md:p-6 lg:p-8">
          {/* Page Header */}
          <div className="flex items-center justify-between bg-white border border-gray-200 px-6 py-4 shadow-sm mb-6">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-emerald-100 text-emerald-600">
                <Package className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Products</h1>
                <p className="text-sm text-gray-500">
                  {allProducts?.length || 0} products | {totalStock.toLocaleString()} in stock
                </p>
              </div>
            </div>
          </div>

          {/* Action Bar */}
          <div className="bg-white border border-gray-200 shadow-sm p-4 mb-6">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              {/* Search */}
              <div className="relative w-full sm:w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 text-sm focus:bg-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all"
                />
              </div>

              {/* Add Product Button */}
              {user.role === "admin" && (
                <button
                  onClick={handleToggleForm}
                  className={`flex items-center gap-2 px-5 py-2.5 font-semibold text-sm transition-all duration-200 ${showForm
                      ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      : "bg-emerald-600 text-white shadow-lg shadow-emerald-200 hover:bg-emerald-700"
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
                      Add Product
                    </>
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Add Product Form */}
          {showForm && (
            <div className="bg-white border border-gray-200 shadow-sm p-6 mb-6">
              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-100">
                <div className="w-8 h-8 bg-emerald-100 flex items-center justify-center">
                  <Plus className="w-4 h-4 text-emerald-600" />
                </div>
                <h2 className="text-lg font-semibold text-gray-900">Add New Product</h2>
              </div>
              <AddProductForm onProductAdded={handleProductAdded} />
            </div>
          )}

          {/* Products Grid */}
          {filteredProducts?.length > 0 ? (
            <div className="flex flex-wrap gap-4">
              {filteredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <div className="bg-white border border-gray-200 shadow-sm p-12 text-center">
              <div className="w-16 h-16 bg-gray-100 flex items-center justify-center mx-auto mb-4">
                <Package className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">No products found</h3>
              <p className="text-sm text-gray-500">
                {searchTerm
                  ? "Try adjusting your search terms"
                  : "Add your first product to get started"}
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminPageProduct;
