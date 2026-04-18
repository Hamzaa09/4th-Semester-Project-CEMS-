import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { loginUserThunk } from "../../../store/user/user.thunk";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, user } = useSelector((state) => state.userSlice); // optional

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const result = await dispatch(loginUserThunk(data));

    if (loginUserThunk.fulfilled.match(result)) {
      if (result.payload.user.role === "admin") navigate("/dashboard");
      if (result.payload.user.role === "booker") navigate("/booker/create-order");
      if (result.payload.user.role === "supplier")
        navigate("/supplier/products");
    } else {
      toast.error("Invalid Credentials!");
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src="/CEMS_Logo.png"
            className="mx-auto h-50 w-auto"
          />
          <h2 className="text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  type="email"
                  className="block w-full rounded-md bg-white px-3 py-1.5 
                             text-base text-gray-900 outline-1 -outline-offset-1 
                             outline-gray-300 placeholder:text-gray-400 
                             focus:outline-2 focus:-outline-offset-2 focus:outline-green-600"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Enter a valid email",
                    },
                  })}
                />
                {errors.email && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-green-600 hover:text-green-500"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  type="password"
                  className="block w-full rounded-md bg-white px-3 py-1.5 
                             text-base text-gray-900 outline-1 -outline-offset-1 
                             outline-gray-300 placeholder:text-gray-400 
                             focus:outline-2 focus:-outline-offset-2 focus:outline-green-600"
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 6, message: "Minimum 6 characters" },
                  })}
                />
                {errors.password && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={loading}
                className="flex w-full justify-center rounded-md bg-green-600 
                           px-3 py-1.5 text-sm/6 font-semibold text-white 
                           shadow-xs hover:bg-green-500 
                           disabled:opacity-50 disabled:cursor-not-allowed
                           focus-visible:outline-2 focus-visible:outline-offset-2 
                           focus-visible:outline-green-600"
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-500">
            Welcome back!
          </p>
        </div>
      </div>
    </>
  );
}
