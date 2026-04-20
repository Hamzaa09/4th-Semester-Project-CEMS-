import { useForm } from "react-hook-form";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createProductThunk } from "../../../../../store/product/product.thunk";
import toast from "react-hot-toast";
import { Upload, X, ImageIcon } from "lucide-react";

export default function AddProductForm({ onProductAdded }) {
  const [preview, setPreview] = useState(null);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setPreview(URL.createObjectURL(file));

      setValue("file", e.target.files, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  };

  const clearPreview = () => {
    setPreview(null);
  };

  const inputClass = "mt-1.5 block w-full px-3 py-2.5 bg-gray-50 border border-gray-200 text-gray-900 text-sm focus:bg-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all duration-200";
  const labelClass = "block text-sm font-medium text-gray-700";
  const errorClass = "text-red-500 text-xs mt-1.5 flex items-center gap-1";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Product Title */}
        <div className="md:col-span-2">
          <label className={labelClass}>Product Title</label>
          <input
            {...register("product_title", { required: "Title is required" })}
            placeholder="Enter product name"
            className={inputClass}
          />
          {errors.product_title && (
            <p className={errorClass}>{errors.product_title.message}</p>
          )}
        </div>

        {/* Product Type */}
        <div>
          <label className={labelClass}>Product Type</label>
          <input
            {...register("product_type", { required: "Type is required" })}
            placeholder="e.g., Bat, Pads"
            className={inputClass}
          />
          {errors.product_type && (
            <p className={errorClass}>{errors.product_type.message}</p>
          )}
        </div>

        {/* Product Quality */}
        <div>
          <label className={labelClass}>Product Quality</label>
          <input
            {...register("product_quality", { required: "Quality is required" })}
            placeholder="e.g., A, B"
            className={inputClass}
          />
          {errors.product_quality && (
            <p className={errorClass}>{errors.product_quality.message}</p>
          )}
        </div>

        {/* Product Price */}
        <div>
          <label className={labelClass}>Product Price (PKR)</label>
          <input
            type="number"
            {...register("product_price", {
              required: "Price is required",
              min: { value: 1, message: "Minimum price is 1" },
            })}
            placeholder="0"
            className={inputClass}
          />
          {errors.product_price && (
            <p className={errorClass}>{errors.product_price.message}</p>
          )}
        </div>

        {/* Product Stock */}
        <div>
          <label className={labelClass}>Product Stock</label>
          <input
            type="number"
            {...register("product_stock", {
              required: "Stock is required",
              min: { value: 0, message: "Stock cannot be negative" },
            })}
            placeholder="0"
            className={inputClass}
          />
          {errors.product_stock && (
            <p className={errorClass}>{errors.product_stock.message}</p>
          )}
        </div>
      </div>

      {/* Product Image */}
      <div>
        <label className={labelClass}>Product Image</label>
        <div className="mt-1.5">
          {!preview ? (
            <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-200 bg-gray-50 cursor-pointer hover:bg-gray-100 hover:border-emerald-300 transition-all duration-200">
              <div className="flex flex-col items-center justify-center py-4">
                <div className="w-12 h-12 bg-emerald-100 flex items-center justify-center mb-3">
                  <Upload className="w-6 h-6 text-emerald-600" />
                </div>
                <p className="text-sm text-gray-600 font-medium">Click to upload image</p>
                <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 10MB</p>
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          ) : (
            <div className="relative w-40 h-40 border border-gray-200 overflow-hidden group">
              <img
                src={preview}
                alt="Preview"
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={clearPreview}
                className="absolute top-2 right-2 w-7 h-7 bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
        {errors.file && (
          <p className={errorClass}>{errors.file.message}</p>
        )}
      </div>

      {/* Submit */}
      <div className="pt-4 border-t border-gray-100">
        <button
          type="submit"
          className="w-full sm:w-auto px-8 py-3 bg-emerald-600 text-white font-semibold text-sm shadow-lg shadow-emerald-200 hover:bg-emerald-700 transition-all duration-200 hover:shadow-emerald-300"
        >
          Add Product
        </button>
      </div>
    </form>
  );
}
