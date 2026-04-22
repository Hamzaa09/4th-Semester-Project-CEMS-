import { useEffect, lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { getProfileThunk } from "../store/user/user.thunk.js";
import Success from "../src/components/Success"
import Cancel from "../src/components/Cancel"

const LoginForm = lazy(() => import("./components/Auth/LoginForm"));
const MainPage = lazy(() => import("./components/Admin/MainPage"));
const OrdersMainPage = lazy(() => import("./components/Admin/Orders/OrdersMainPage"));
const BookersMainPage = lazy(() => import("./components/Admin/Bookers/BookersMainPage"));
const AdminSupplierMainPage = lazy(() => import("./components/Admin/Suppliers/AdminSupplierMainPage"));
const AdminPageProduct = lazy(() => import("./components/Admin/Products/AdminPageProduct"));
const BookersCreateOrderPage = lazy(() => import("./components/Bookers/BookersCreateOrderPage"));
const RoleBasedLayout = lazy(() => import("./components/Admin/components/RoleBasedLayout"));
const SupplierPage = lazy(() => import("./components/Supplier/SupplierPage"));
const BookersAllOrders = lazy(() => import("./components/Bookers/BookersAllOrders"));
const OrderDetail = lazy(() => import("./components/Bookers/OrderDetail"));
const SupplierDeliveredProductsPage = lazy(() => import("./components/Supplier/SupplierDeliveredProductsPage"));

const Spinner = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
  </div>
);

const getRoleRedirect = (role) => {
  const redirectMap = {
    admin: "/dashboard",
    booker: "/booker/all-products",
    supplier: "/supplier/products",
  };
  return redirectMap[role] || "/";
};

function App() {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.userSlice);

  useEffect(() => {
    dispatch(getProfileThunk());
  }, [dispatch]);

  if (loading) return <Spinner />;
  return (
    <div>
      <Toaster />
      <BrowserRouter>
        <Suspense fallback={<Spinner />}>
          <Routes>
            <Route
              path="/"
              element={
                user
                  ? <Navigate to={getRoleRedirect(user.role)} replace />
                  : <LoginForm />
              }
            />

            <Route element={<RoleBasedLayout allowedRoles={["admin"]} />}>
              <Route path="/dashboard" element={<MainPage />} />
              <Route path="/orders" element={<OrdersMainPage />} />
              <Route path="/bookers" element={<BookersMainPage />} />
              <Route path="/suppliers" element={<AdminSupplierMainPage />} />
              <Route path="/products" element={<AdminPageProduct />} />
            </Route>

            <Route element={<RoleBasedLayout allowedRoles={["booker", "admin"]} />}>
              <Route path="/booker/all-products" element={<AdminPageProduct />} />
              <Route path="/booker/create-order" element={<BookersCreateOrderPage />} />
              <Route path="/booker/get-my-orders" element={<BookersAllOrders />} />
              <Route path="/booker/single-product/:id" element={<OrderDetail />} />
            </Route>

            <Route element={<RoleBasedLayout allowedRoles={["supplier"]} />}>
              <Route path="/supplier/products" element={<SupplierPage />} />
              <Route path="/supplier/delivered-products" element={<SupplierDeliveredProductsPage />} />
            </Route>

            <Route path="/success" element={<Success />}></Route>
            <Route path="/cancel" element={<Cancel />}></Route>
            {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;