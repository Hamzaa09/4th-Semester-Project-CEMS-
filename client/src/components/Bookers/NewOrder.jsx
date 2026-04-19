import React, { useEffect } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { RxCross1 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsThunk } from "../../../store/product/product.thunk";
import { placeOrderThunk } from "../../../store/order/order.thunk";
import { toast } from "react-hot-toast";
import { Navigate, useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js"
import { axiosInstance } from "../../../utilities/axiosInstance.utility";
import axios from "axios";

const NewOrder = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { allProducts, loading: productsLoading } = useSelector(
    (state) => state.productSlice
  );
  const { user, loading } = useSelector((state) => state.userSlice);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      shop_name: "ABC shop",
      customer_name: "XYZ Customer",
      email: "booker1@gmail.com",
      phone: "123456789000",
      address: "XYZ Road, ABC Town, Karachi",
      products: [],
      payment_type: "",
      // shop_name: "",
      // customer_name: "",
      // email: "",
      // phone: "",
      // address: "",
      // payment_type: "",
      // products: [],
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
    // cod payment flow
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
        })
      );

      if (res.payload.success) {
        toast.success("Order placed successfully!");
        reset();
        navigate("/booker/get-my-orders"); // ✅ lowercase navigate
      } else {
        toast.error("Failed to place order!");
      }

    } else {
      // online payment flow
      try {
        const productsWithPrice = data.products.map((item) => {
          const product = allProducts.find((p) => p._id === item.productId);
          return {
            ...item,
            price: product ? product.product_price : 0,
          };
        });

        // save order data to localStorage before leaving the page
        localStorage.setItem("pendingOrder", JSON.stringify({
          ...data,
          products: productsWithPrice,
          booker_id: user._id,
        }));

        const response = await axiosInstance.post("/stripe/payment", data);
        // console.log(data)
        window.location.href = response.data.url;
      } catch (err) {
        toast.error("Payment failed. Please try again.");
        console.error(err);
      }
    }
  };

  return (
    <div className="w-full flex justify-center mt-10 mb-5">
      <form
        className="bg-white shadow-md rounded-2xl p-6 w-full max-w-2xl border border-gray-200 space-y-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="text-lg font-semibold text-center mb-4 border-b pb-2">
          New Order
        </h2>

        {/* Basic Info */}
        {[
          { label: "Shop Name", name: "shop_name" },
          { label: "Customer Name", name: "customer_name" },
          { label: "Email Address", name: "email" },
          { label: "Phone Number", name: "phone" },
          { label: "Shop Address", name: "address" },
        ].map((field) => (
          <div key={field.name}>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              {field.label}
            </label>
            <input
              type={field.name === "email" ? "email" : "text"}
              placeholder={`Enter ${field.label}`}
              {...register(field.name, {
                required: `${field.label} is required`,
              })}
              className={`w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-400 ${errors[field.name] ? "border-red-500" : "border-gray-300"
                }`}
            />
            {errors[field.name] && (
              <p className="text-red-500 text-sm">
                {errors[field.name].message}
              </p>
            )}
          </div>
        ))}

        <div>
          <label className="block text-gray-700 text-sm font-medium mb-1">
            Payment Method
          </label>
          <select
            {...register("payment_type", {
              required: "Payment method is required",
            })}
            className={`w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-400 bg-white text-gray-700 ${errors.paymentMethod ? "border-red-500" : "border-gray-300"
              }`}
          >
            <option value="">Select Payment Method</option>
            <option value="cod">Cash on Delivery</option>
            <option value="online">Online Payment</option>
          </select>
          {errors.payment_type && (
            <p className="text-red-500 text-sm">
              {errors.payment_type.message}
            </p>
          )}
        </div>

        {/* Products */}
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-1">
            Add Products
          </label>

          {fields.map((field, index) => (
            <div
              key={field.id}
              className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-md border border-gray-200 w-full max-w-2xl mx-auto mb-2"
            >
              <Controller
                name={`products[${index}].productId`}
                control={control}
                rules={{ required: "Select a product" }}
                render={({ field }) => (
                  <select
                    {...field}
                    disabled={productsLoading}
                    className="flex-1 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                  >
                    <option value="">Select Product</option>
                    {allProducts.map((p) => (
                      <option key={p._id} value={p._id}>
                        {p.product_title}
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
                    placeholder="Qty"
                    className="w-24 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-400 text-center"
                  />
                )}
              />

              <div
                onClick={() => remove(index)}
                className="delete p-1 rounded-full bg-red-400 hover:bg-red-500 cursor-pointer"
              >
                <RxCross1 className="text-white" />
              </div>
            </div>
          ))}

          <button
            type="button"
            disabled={productsLoading}
            className="bg-green-700 hover:cursor-pointer text-white px-5 py-2 rounded-lg hover:bg-green-600 transition-all font-medium shadow-sm"
            onClick={() => append({ productId: "", quantity: 1 })}
          >
            Add Product
          </button>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-green-700 cursor-pointer text-white rounded-lg p-2 mt-4 hover:cursor-pointer hover:bg-green-600 transition-all"
        >
          Submit Order
        </button>
      </form>
    </div>
  );
};

export default NewOrder;
