import React, { useEffect } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import {
  X,
  Plus,
  ShoppingBag,
  Store,
  User,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  Package,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsThunk } from "../../../store/product/product.thunk";
import { placeOrderThunk } from "../../../store/order/order.thunk";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../../utilities/axiosInstance.utility";

const NewOrder = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { allProducts, loading: productsLoading } = useSelector(
    (state) => state.productSlice,
  );
  const { user } = useSelector((state) => state.userSlice);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      payment_type: "",
      shop_name: "",
      customer_name: "",
      email: "",
      phone: "",
      address: "",
      products: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "products",
  });

  useEffect(() => {
    dispatch(getAllProductsThunk());
  }, [dispatch]);

  const onSubmit = async (data) => {
    if (data.payment_type === "cod") {
      if (data.products.length === 0) {
        toast.error("Please add at least one product.");
        return;
      }

      const productsWithPrice = data.products.map((item) => {
        const product = allProducts.find((p) => p._id === item.productId);
        return {
          ...item,
          price: product ? product.product_price : 0,
        };
      });

      const res = await dispatch(
        placeOrderThunk({
          ...data,
          products: productsWithPrice,
          booker_id: user._id,
        }),
      );

      if (res.payload.success) {
        toast.success("Order placed successfully!");
        reset();
        navigate("/booker/get-my-orders");
      } else {
        toast.error("Failed to place order!");
      }
    } else {
      try {
        const productsWithPrice = data.products.map((item) => {
          const product = allProducts.find((p) => p._id === item.productId);
          return {
            ...item,
            price: product ? product.product_price : 0,
          };
        });

        localStorage.setItem(
          "pendingOrder",
          JSON.stringify({
            ...data,
            products: productsWithPrice,
            booker_id: user._id,
          }),
        );

        const response = await axiosInstance.post("/stripe/payment", data);
        window.location.href = response.data.url;
      } catch (err) {
        toast.error("Payment failed. Please try again.");
        console.error(err);
      }
    }
  };

  const formFields = [
    { label: "Shop Name", name: "shop_name", icon: Store },
    { label: "Customer Name", name: "customer_name", icon: User },
    { label: "Email Address", name: "email", icon: Mail },
    { label: "Phone Number", name: "phone", icon: Phone },
    { label: "Shop Address", name: "address", icon: MapPin },
  ];

  return (
    <div className="w-full flex justify-center py-6">
      <form
        className="bg-white border border-gray-200 shadow-sm w-full max-w-3xl"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Header */}
        <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center justify-center w-10 h-10 bg-emerald-100 text-emerald-600">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">New Order</h2>
            <p className="text-sm text-gray-500">
              Fill in the details to create an order
            </p>
          </div>
        </div>

        <div className="p-6 space-y-5">
          {/* Basic Info - 2 Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {formFields.map((field) => {
              const Icon = field.icon;
              return (
                <div
                  key={field.name}
                  className={field.name === "address" ? "md:col-span-2" : ""}
                >
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1.5">
                    <Icon className="w-4 h-4 text-gray-400" />
                    {field.label}
                  </label>
                  <input
                    type={field.name === "email" ? "email" : "text"}
                    placeholder={`Enter ${field.label.toLowerCase()}`}
                    {...register(field.name, {
                      required: `${field.label} is required`,
                    })}
                    className={`w-full border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all ${
                      errors[field.name]
                        ? "border-red-400 bg-red-50"
                        : "border-gray-300"
                    }`}
                  />
                  {errors[field.name] && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors[field.name].message}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          {/* Payment Method */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1.5">
              <CreditCard className="w-4 h-4 text-gray-400" />
              Payment Method
            </label>
            <select
              {...register("payment_type", {
                required: "Payment method is required",
              })}
              className={`w-full border px-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all ${
                errors.payment_type
                  ? "border-red-400 bg-red-50"
                  : "border-gray-300"
              }`}
            >
              <option value="">Select Payment Method</option>
              <option value="cod">Cash on Delivery</option>
              <option value="online">Online Payment</option>
            </select>
            {errors.payment_type && (
              <p className="text-red-500 text-xs mt-1">
                {errors.payment_type.message}
              </p>
            )}
          </div>

          {/* Products Section */}
          <div className="border-t border-gray-200 pt-5">
            <div className="flex items-center justify-between mb-3">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <Package className="w-4 h-4 text-gray-400" />
                Products ({fields.length})
              </label>
              <button
                type="button"
                disabled={productsLoading}
                className="flex items-center gap-1.5 bg-emerald-600 text-white px-3 py-1.5 text-sm font-medium hover:bg-emerald-700 transition-colors shadow-sm disabled:opacity-50"
                onClick={() => append({ productId: "", quantity: 1 })}
              >
                <Plus className="w-4 h-4" />
                Add Product
              </button>
            </div>

            {fields.length === 0 ? (
              <div className="text-center py-8 bg-gray-50 border border-dashed border-gray-300">
                <Package className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                <p className="text-sm text-gray-500">No products added yet</p>
                <p className="text-xs text-gray-400">
                  Click "Add Product" to get started
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {fields.map((field, index) => (
                  <div
                    key={field.id}
                    className="flex items-center gap-3 bg-gray-50 border border-gray-200 p-3"
                  >
                    <span className="text-xs font-medium text-gray-400 w-6">
                      {index + 1}.
                    </span>

                    <Controller
                      name={`products[${index}].productId`}
                      control={control}
                      rules={{ required: "Select a product" }}
                      render={({ field }) => (
                        <select
                          {...field}
                          disabled={productsLoading}
                          className="flex-1 border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                        >
                          <option value="">Select Product</option>
                          {allProducts.map((p) => (
                            <option key={p._id} value={p._id}>
                              {p.product_title} - Rs. {p.product_price}
                            </option>
                          ))}
                        </select>
                      )}
                    />

                    <Controller
                      name={`products[${index}].quantity`}
                      control={control}
                      rules={{ required: "Qty required", min: 1 }}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="number"
                          min="1"
                          placeholder="Qty"
                          className="w-20 border border-gray-300 px-3 py-2 text-sm text-center focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                      )}
                    />

                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="p-1.5 bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <button
            type="submit"
            className="w-full bg-emerald-600 text-white py-3 font-medium hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-200"
          >
            Submit Order
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewOrder;
