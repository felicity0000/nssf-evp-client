import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as apiClient from "../api-client";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";

export type SignInFormData = {
  username: string;
  department: string;
};

const SignIn = () => {
  const { showToast, role } = useAppContext();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>();

  const mutation = useMutation({
    mutationFn: (data: SignInFormData) => apiClient.signIn(data),
    onSuccess: async () => {
      showToast({ message: "Sign in Successful!", type: "SUCCESS" })
      // Invalidate and refetch the validateToken query
      await queryClient.invalidateQueries({ queryKey: ["validateToken"] })

      // Wait for the query to refetch and update
      await queryClient.refetchQueries({ queryKey: ["validateToken"] })

      // Now that the context is updated, navigate based on role
      //const userRole = data.role
      if (role === "admin") {
        navigate("/admin-assign", { replace: true })
      } else if (role === "problem_solver") {
        navigate("/resolve", { replace: true })
      } else if (role === "employee") {
        navigate("/all-feedbacks", { replace: true })
      }
    },
    onError: (error: any) => {
      console.log(error)
      showToast({ message: "Login failed. Please try again.", type: "ERROR" })
    },
  })

   // Extract isLoading from mutation
   const isLoading = mutation.isPending

  const onSubmit = (data: SignInFormData) => {
    mutation.mutate(data);
  };

  return (
    <div className="h-screen bg-blue-950 flex justify-center items-center">
      <div className="flex items-center w-[80%] max-w-4xl p-10">
        {/*--- Image --- */}
        <div className="w-1/2">
          <img src={assets.man_working} className="w-full" alt="Man Working" />
        </div>

        {/*--- Form --- */}
        <div className="w-1/2 flex flex-col items-center -mt-24">
          <img src={assets.nssf_logo} className="h-20 w-40 mb-5" alt="NSSF Logo" />
          <h1 className="text-3xl font-bold text-center text-white mb-5">
            Sign In to Continue
          </h1>
          <form className="space-y-5 w-full max-w-sm" onSubmit={handleSubmit(onSubmit)}>
            {/* Username Field */}
            <div className="relative">
              <input
                type="text"
                {...register("username", { required: "Username is required" })}
                className="w-full pl-3 px-3 py-2 bg-gray-100 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Enter your username"
              />
              {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
            </div>

            {/* Department Field */}
            <div className="relative">
              <input
                type="text"
                {...register("department", { required: "Department is required" })}
                className="w-full pl-3 px-3 py-2 bg-gray-100 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Enter your department"
              />
              {errors.department && <p className="text-red-500 text-sm">{errors.department.message}</p>}
            </div>

            <button
        type="submit"
        className="bg-green-600 text-xl w-full font-bold text-white p-4 rounded-md shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={isLoading}
      >
        {isLoading ? "Signing In..." : "Login"}
      </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;