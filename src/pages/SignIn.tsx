import { motion } from 'framer-motion';
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as apiClient from "../api-client";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";

export type SignInFormData = {
  userId: string;
  username: string;
  department: string;
  role: 'admin' | 'problem_solver' | 'employee';
};

const SignIn = () => {
  const { showToast } = useAppContext();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>();

  const mutation1 = useMutation({
    mutationFn: (data: SignInFormData) => apiClient.signIn(data),
    onSuccess: async () => {
      showToast({ message: "Sign in Successful!", type: "SUCCESS" })
      await queryClient.invalidateQueries({ queryKey: ["validateToken"] })
      navigate("/mood", { replace: true });
    },
    onError: (error: any) => {
      console.log(error)
      showToast({ message: "Login failed. Please try again.", type: "ERROR" })
    },
  });

  const mutation2 = useMutation({
    mutationFn: (data: SignInFormData) => apiClient.signIn(data),
    onSuccess: async () => {
      showToast({ message: "Sign in Successful!", type: "SUCCESS" })
      await queryClient.invalidateQueries({ queryKey: ["validateToken"] })
      navigate("/admin-assign", { replace: true });
    },
    onError: (error: any) => {
      console.log(error)
      showToast({ message: "Login failed. Please try again.", type: "ERROR" })
    },
  });

  const onSubmit = (data: SignInFormData) => {
    mutation1.mutate(data);
    mutation2.mutate(data);
  };

  const isLoading = mutation1.isPending || mutation2.isPending;

  return (
    <div className="bg-blue-950 flex h-screen overflow-hidden">
      {/* Image Section */}
      <div className="w-1/2 h-screen">
        <img 
          src={assets.man_working} 
          className="h-full w-full object-cover" 
          alt="Man Working" 
        />
      </div>

      {/* Form Section */}
      <div className="w-1/2 flex items-center justify-center p-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* Logo */}
          <motion.img 
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            src={assets.nssf_logo} 
            className="h-16 w-32 mb-6 mx-auto" 
            alt="NSSF Logo" 
          />

          {/* Title */}
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-3xl font-bold text-center text-white mb-6"
          >
            Welcome Back
          </motion.h1>

          {/* Form */}
          <motion.form 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* Username Field */}
            <div className="space-y-1">
              <label className="text-white text-sm font-medium">Username</label>
              <div className="relative">
                <input
                  type="text"
                  {...register("username", { required: "Username is required" })}
                  className="w-full px-4 py-2 bg-gray-100 rounded-lg focus:ring-2 focus:ring-[#6CBE14] focus:outline-none transition-all duration-200"
                  placeholder="Enter your username"
                />
                {errors.username && (
                  <motion.p 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-red-400 text-sm mt-1"
                  >
                    {errors.username.message}
                  </motion.p>
                )}
              </div>
            </div>

            {/* Department Field */}
            <div className="space-y-1">
              <label className="text-white text-sm font-medium">Department</label>
              <div className="relative">
                <input
                  type="text"
                  {...register("department", { required: "Department is required" })}
                  className="w-full px-4 py-2 bg-gray-100 rounded-lg focus:ring-2 focus:ring-[#6CBE14] focus:outline-none transition-all duration-200"
                  placeholder="Enter your department"
                />
                {errors.department && (
                  <motion.p 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-red-400 text-sm mt-1"
                  >
                    {errors.department.message}
                  </motion.p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#6CBE14] text-white text-lg font-semibold py-3 rounded-lg shadow-lg
                       disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 mt-6"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing In...
                </span>
              ) : (
                "Sign In"
              )}
            </motion.button>
          </motion.form>
        </motion.div>
      </div>
    </div>
  );
};

export default SignIn;