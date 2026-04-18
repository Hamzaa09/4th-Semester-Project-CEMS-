import { useForm } from "react-hook-form";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createProductThunk } from "../../../../../store/product/product.thunk";
import toast from "react-hot-toast";

export default function AddProductForm({ onProductAdded }) {
  const [preview, setPreview] = useState(null);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      product_title: "",
      product_type: "",
      product_quality: "",
      product_price: "",
      product_stock: "",
      file: null,
    },
  });

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("product_title", data.product_title);
    formData.append("product_type", data.product_type);
    formData.append("product_quality", data.product_quality);
    formData.append("product_price", data.product_price);
    formData.append("product_stock", data.product_stock);

    if (data.file && data.file[0]) {
      formData.append("product_img", data.file[0]);
    }

    const result = await dispatch(createProductThunk(formData));

    if (createProductThunk.fulfilled.match(result)) {
      toast.success("Product Added Successfully!");
      reset();
      setPreview(null);
      if (onProductAdded) onProductAdded();
    }
  };

  const handleImage = (e) => {
    if (e.target.files && e.target.files[0]) {
      setPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Product Title */}
      <div>
        <label className="block text-sm font-medium text-gray-900">
          Product Title
        </label>
        <input
          {...register("product_title", { required: "Title is required" })}
          className="mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 outline-1 outline-gray-300 focus:outline-2 focus:outline-green-600"
        />
        {errors.product_title && (
          <p className="text-red-600 text-sm mt-1">
            {errors.product_title.message}
          </p>
        )}
      </div>

      {/* Product Type */}
      <div>
        <label className="block text-sm font-medium text-gray-900">
          Product Type
        </label>
        <input
          {...register("product_type", { required: "Type is required" })}
          className="mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 outline-1 outline-gray-300 focus:outline-2 focus:outline-green-600"
        />
        {errors.product_type && (
          <p className="text-red-600 text-sm mt-1">
            {errors.product_type.message}
          </p>
        )}
      </div>

      {/* Product Quality */}
      <div>
        <label className="block text-sm font-medium text-gray-900">
          Product Quality
        </label>
        <input
          {...register("product_quality", { required: "Quality is required" })}
          className="mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 outline-1 outline-gray-300 focus:outline-2 focus:outline-green-600"
        />
        {errors.product_quality && (
          <p className="text-red-600 text-sm mt-1">
            {errors.product_quality.message}
          </p>
        )}
      </div>

      {/* Product Price */}
      <div>
        <label className="block text-sm font-medium text-gray-900">
          Product Price
        </label>
        <input
          type="number"
          {...register("product_price", {
            required: "Price is required",
            min: { value: 1, message: "Minimum price is 1" },
          })}
          className="mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 outline-1 outline-gray-300 focus:outline-2 focus:outline-green-600"
        />
        {errors.product_price && (
          <p className="text-red-600 text-sm mt-1">
            {errors.product_price.message}
          </p>
        )}
      </div>

      {/* Product Stock */}
      <div>
        <label className="block text-sm font-medium text-gray-900">
          Product Stock
        </label>
        <input
          type="number"
          {...register("product_stock", {
            required: "Stock is required",
            min: { value: 0, message: "Stock cannot be negative" },
          })}
          className="mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-gray-900  outline-1 outline-gray-300 focus:outline-2 focus:outline-green-600"
        />
        {errors.product_stock && (
          <p className="text-red-600 text-sm mt-1">
            {errors.product_stock.message}
          </p>
        )}
      </div>

      {/* Product Image */}
      <div>
        <label className="block text-sm font-medium text-gray-900">
          Product Image
        </label>
        <input
          type="file"
          accept="image/*"
          {...register("file", { required: "Image is required" })}
          onChange={handleImage}
          className="mt-2 block w-full text-gray-900"
        />
        {errors.file && (
          <p className="text-red-600 text-sm mt-1">{errors.file.message}</p>
        )}

        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="mt-2 h-24 w-24 object-cover rounded-md border"
          />
        )}
      </div>

      {/* Submit */}
      <div>
        <button
          type="submit"
          className="flex w-full justify-center rounded-md hover:cursor-pointer bg-green-700 px-3 py-1.5 text-lg font-semibold text-white shadow hover:bg-green-600 duration-150"
        >
          Add Product
        </button>
      </div>
    </form>
  );
}
