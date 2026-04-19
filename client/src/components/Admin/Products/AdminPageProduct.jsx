import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import SideBar from "../components/SideBar";
import ProductCard from "./components/ProductCard";
import AddProductForm from "./components/AddProductForm";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsThunk } from "../../../../store/product/product.thunk";

const AdminPageProduct = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false); // 👈
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
    fetchProducts(); // refresh product list
    setShowForm(false); // close form
  };

  return (
    <div className="h-full">
      <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} /> {/* 👈 */}

      <div className="flex bg-gray-100">
        <SideBar name={"products"} isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)} />

        <div className="w-full h-full flex flex-col gap-10 my-10 px-5 md:px-10">
          {/* Add Product Button */}
          {user.role === "admin" && (
            <div className="flex justify-between w-full items-center bg-white px-4 py-4 rounded-xl">
              <h2 className="text-3xl font-bold text-gray-800">
                Products Page
              </h2>

              <button
                onClick={handleToggleForm}
                className="bg-green-700 text-white px-4 py-2 hover:cursor-pointer rounded-md shadow hover:bg-green-600 transition"
              >
                {showForm ? "Cancel" : "Add New Product"}
              </button>
            </div>
          )}

          {/* Show Add Product Form */}
          {showForm && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <AddProductForm onProductAdded={handleProductAdded} />
            </div>
          )}

          {/* Display All Products */}
          <div className="flex flex-row flex-wrap gap-5">
            {allProducts?.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPageProduct;
