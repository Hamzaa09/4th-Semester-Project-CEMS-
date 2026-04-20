import { useForm } from "react-hook-form";
import { useState } from "react";
import { addUserThunk } from "../../../../../store/user/user.thunk";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { User, Mail, Lock, Phone, UserCog, Upload, X } from "lucide-react";

export default function AddUserForm({ onUserAdded }) {
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
      name: "",
      email: "",
      password: "",
      phone: "",
      role: "booker",
      image: null,
    },
  });

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("fullName", data.name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("phoneNumber", data.phone);
    formData.append("role", data.role);
    if (data.image[0]) formData.append("profilePic", data.image[0]);

    const result = await dispatch(addUserThunk(formData));

    if (addUserThunk.fulfilled.match(result)) {
      toast.success("User Added!");
      reset();
      setPreview(null);
      onUserAdded();
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setPreview(URL.createObjectURL(file));

      setValue("image", e.target.files, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  };

  const clearPreview = () => {
    setPreview(null);
  };

  const inputClass = "mt-1.5 block w-full bg-gray-50 border border-gray-200 px-4 py-2.5 text-gray-900 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors";
  const labelClass = "flex items-center gap-2 text-sm font-semibold text-gray-700";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Full Name */}
        <div>
          <label className={labelClass}>
            <User className="w-4 h-4 text-gray-400" />
            Full Name
          </label>
          <input
            {...register("name", { required: "Name is required" })}
            placeholder="Enter full name"
            className={inputClass}
          />
          {errors.name && (
            <p className="text-red-600 text-xs mt-1.5">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className={labelClass}>
            <Mail className="w-4 h-4 text-gray-400" />
            Email Address
          </label>
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
            })}
            placeholder="Enter email address"
            className={inputClass}
          />
          {errors.email && (
            <p className="text-red-600 text-xs mt-1.5">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className={labelClass}>
            <Lock className="w-4 h-4 text-gray-400" />
            Password
          </label>
          <input
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: { value: 6, message: "Minimum 6 characters" },
            })}
            placeholder="Enter password"
            className={inputClass}
          />
          {errors.password && (
            <p className="text-red-600 text-xs mt-1.5">{errors.password.message}</p>
          )}
        </div>

        {/* Phone Number */}
        <div>
          <label className={labelClass}>
            <Phone className="w-4 h-4 text-gray-400" />
            Phone Number
          </label>
          <input
            type="tel"
            {...register("phone", {
              required: "Phone number is required",
              pattern: {
                value: /^[0-9]{10,15}$/,
                message: "Invalid phone number",
              },
            })}
            placeholder="Enter phone number"
            className={inputClass}
          />
          {errors.phone && (
            <p className="text-red-600 text-xs mt-1.5">{errors.phone.message}</p>
          )}
        </div>

        {/* Role */}
        <div>
          <label className={labelClass}>
            <UserCog className="w-4 h-4 text-gray-400" />
            Role
          </label>
          <select
            {...register("role", { required: true })}
            className={inputClass}
          >
            <option value="booker">Booker</option>
            <option value="supplier">Supplier</option>
          </select>
        </div>

        {/* Profile Image */}
        <div>
          <label className={labelClass}>
            <Upload className="w-4 h-4 text-gray-400" />
            Profile Image
          </label>
          <div className="mt-1.5">
            {!preview ? (
              <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-gray-200 bg-gray-50 cursor-pointer hover:bg-gray-100 hover:border-emerald-300 transition-colors">
                <Upload className="w-6 h-6 text-gray-400 mb-1" />
                <span className="text-xs text-gray-500">Click to upload</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            ) : (
              <div className="relative inline-block">
                <img
                  src={preview}
                  alt="Preview"
                  className="h-24 w-24 object-cover border border-gray-200"
                />
                <button
                  type="button"
                  onClick={clearPreview}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white flex items-center justify-center shadow-md hover:bg-red-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Submit */}
      <div className="pt-4 border-t border-gray-100">
        <button
          type="submit"
          className="w-full md:w-auto px-8 py-3 bg-emerald-600 text-white font-semibold shadow-lg shadow-emerald-200 hover:bg-emerald-700 transition-colors"
        >
          Add User
        </button>
      </div>
    </form>
  );
}
