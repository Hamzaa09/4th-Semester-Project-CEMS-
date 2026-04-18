import { useForm } from "react-hook-form";
import { useState } from "react";
import { addUserThunk } from "../../../../../store/user/user.thunk";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

export default function AddUserForm({ onUserAdded }) {
  const [preview, setPreview] = useState(null);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
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
    // If image is uploaded, you can convert to FormData
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
    if (e.target.files && e.target.files[0]) {
      setPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Name */}
      <div>
        <label className="block text-sm font-medium text-gray-900">
          Full Name
        </label>
        <input
          {...register("name", { required: "Name is required" })}
          className="mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 outline-1 outline-gray-300 focus:outline-2 focus:outline-green-600"
        />
        {errors.name && (
          <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-gray-900">
          Email Address
        </label>
        <input
          type="email"
          {...register("email", {
            required: "Email is required",
            pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
          })}
          className="mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 outline-1 outline-gray-300 focus:outline-2 focus:outline-green-600"
        />
        {errors.email && (
          <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* Password */}
      <div>
        <label className="block text-sm font-medium text-gray-900">
          Password
        </label>
        <input
          type="password"
          {...register("password", {
            required: "Password is required",
            minLength: { value: 6, message: "Minimum 6 characters" },
          })}
          className="mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 outline-1 outline-gray-300 focus:outline-2 focus:outline-green-600"
        />
        {errors.password && (
          <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>
        )}
      </div>

      {/* Phone Number */}
      <div>
        <label className="block text-sm font-medium text-gray-900">
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
          className="mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 outline-1 outline-gray-300 focus:outline-2 focus:outline-green-600"
        />
        {errors.phone && (
          <p className="text-red-600 text-sm mt-1">{errors.phone.message}</p>
        )}
      </div>

      {/* Role */}
      <div>
        <label className="block text-sm font-medium text-gray-900">Role</label>
        <select
          {...register("role", { required: true })}
          className="mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 outline-1 outline-gray-300 focus:outline-2 focus:outline-green-600"
        >
          <option value="booker">Booker</option>
          <option value="supplier">Supplier</option>
        </select>
      </div>

      {/* Profile Image */}
      <div>
        <label className="block text-sm font-medium text-gray-900">
          Profile Image
        </label>
        <input
          type="file"
          accept="image/*"
          {...register("image")}
          onChange={handleImageChange}
          className="mt-2 block w-full text-gray-900"
        />
        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="mt-2 h-20 w-20 object-cover rounded-full border"
          />
        )}
      </div>

      {/* Submit */}
      <div>
        <button
          type="submit"
          className="flex w-full justify-center rounded-md bg-green-700 px-3 py-1.5 text-lg font-semibold text-white shadow hover:bg-green-600 duration-100 hover:cursor-pointer focus:outline-2 focus:outline-green-600"
        >
          Add User
        </button>
      </div>
    </form>
  );
}
