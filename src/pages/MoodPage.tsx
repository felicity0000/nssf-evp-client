import { motion } from 'framer-motion';
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";

const moodOptions = [
  { value: "Happy", emoji: "😊", color: "bg-yellow-100" },
  { value: "Sad", emoji: "😢", color: "bg-blue-100" },
  { value: "Fair", emoji: "😐", color: "bg-gray-100" }
];

export type MoodFormData = {
  mood: string;
};

const MoodPage = () => {
  const { showToast } = useAppContext();
  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm<MoodFormData>();
  
  const selectedMood = watch("mood");

  const mutation = useMutation({
    mutationFn: (data: MoodFormData) => apiClient.addMood(data),
    onSuccess: async () => {
      showToast({ message: "Created feedback!", type: "SUCCESS" });
    },
    onError: async () => {
      showToast({ message: "Failed to create feedback!", type: "ERROR" });
    }
  });

  const onSubmit = (data: MoodFormData) => {
    mutation.mutate(data);
    reset();
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg -mt-24"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded-xl shadow-lg space-y-6">
          <motion.h2 
            className="text-2xl font-bold text-center text-gray-800"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            How are you feeling today? 
          </motion.h2>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Select your mood</label>
            <div className="relative">
              <select
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200 appearance-none"
                {...register("mood", { required: "Please select your mood" })}
              >
                <option value="">Choose a mood...</option>
                {moodOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.emoji} {option.value}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                </svg>
              </div>
            </div>
            {errors.mood && (
              <motion.p
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-red-500 text-sm"
              >
                {errors.mood.message}
              </motion.p>
            )}
          </div>

          {selectedMood && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className={`p-4 rounded-lg ${moodOptions.find(m => m.value === selectedMood)?.color}`}
            >
              <p className="text-center text-4xl">
                {moodOptions.find(m => m.value === selectedMood)?.emoji}
              </p>
            </motion.div>
          )}

          <motion.button
            type="submit"
            disabled={mutation.isPending}
            className="w-full bg-[#6BCE14] hover:bg-green-700 text-white font-medium px-6 py-3 rounded-lg
                     focus:outline-none focus:ring-2 focus:ring-green-200 
                     disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {mutation.isPending ? "Submitting..." : "Log Mood"}
          </motion.button>

          {mutation.isSuccess && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-green-500 text-sm text-center"
            >
              ✨ Mood logged successfully! ✨
            </motion.p>
          )}
          
          {mutation.isError && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-500 text-sm text-center"
            >
              😕 Something went wrong. Please try again.
            </motion.p>
          )}
        </form>
      </motion.div>
    </div>
  );
};

export default MoodPage;