import { motion } from 'framer-motion';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import * as apiClient from '../api-client';
import { useAppContext } from '../contexts/AppContext';

export type FeedbackFormData = {
  title: string;
  department: string;
  concern: string;
  solution: string;
  startDate: Date;
  endDate: Date;
  isAnonymous: boolean;
  name?: string;
};

const AddFeedback = () => {
  const { showToast } = useAppContext();
  const { register, handleSubmit, formState: { errors }, watch } = useForm<FeedbackFormData>({
    defaultValues: {
      isAnonymous: false,
    },
  });

  const watchAnonymous = watch('isAnonymous');

  const mutation = useMutation({
    mutationFn: (data: FeedbackFormData) => apiClient.addFeedback(data),
    onSuccess: async () => {
      showToast({ message: "Created feedback!", type: "SUCCESS" });
    },
    onError: async () => {
      showToast({ message: "Failed to create feedback!", type: "ERROR" });
    }
  });

  const onSubmit = (data: FeedbackFormData) => {
    mutation.mutate(data);
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-10 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-green-500 px-6 py-4">
            <h2 className="text-2xl font-bold text-white">Submit Feedback</h2>
            <p className="text-green-50 mt-1">Share your thoughts and suggestions</p>
          </div>

          <div className="p-6 space-y-6">
            {/* Title & Department */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <label className="block text-sm font-semibold text-gray-700 mb-2">Title</label>
                <input
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                  type="text"
                  {...register('title', { required: 'Title is required' })}
                  placeholder="Enter a clear title..."
                />
                {errors.title && <p className="mt-1 text-red-500 text-sm">{errors.title.message}</p>}
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <label className="block text-sm font-semibold text-gray-700 mb-2">Department</label>
                <select
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                  {...register('department', { required: 'Department is required' })}
                >
                  <option value="">Select Department</option>
                  <option value="IT">IT</option>
                  <option value="HR">HR</option>
                  <option value="FINANCE">Finance</option>
                  <option value="OPERATIONS">Operations</option>
                  <option value="MARKETING">Marketing</option>
                  <option value="SALES">Sales</option>
                </select>
                {errors.department && <p className="mt-1 text-red-500 text-sm">{errors.department.message}</p>}
              </motion.div>
            </div>

            {/* Concern & Solution */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <label className="block text-sm font-semibold text-gray-700 mb-2">Concern</label>
                <textarea
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                  rows={4}
                  {...register('concern', { required: 'Concern is required' })}
                  placeholder="Describe your concern in detail..."
                />
                {errors.concern && <p className="mt-1 text-red-500 text-sm">{errors.concern.message}</p>}
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <label className="block text-sm font-semibold text-gray-700 mb-2">Proposed Solution</label>
                <textarea
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                  rows={4}
                  {...register('solution', { required: 'Solution is required' })}
                  placeholder="Suggest how this concern could be addressed..."
                />
                {errors.solution && <p className="mt-1 text-red-500 text-sm">{errors.solution.message}</p>}
              </motion.div>
            </div>

            {/* Dates */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <label className="block text-sm font-semibold text-gray-700 mb-2">Start Date</label>
                <input
                  type="date"
                  {...register('startDate', {
                    required: 'Start date is required',
                    validate: (value) => new Date(value) >= new Date(today) || 'Start date cannot be in the past'
                  })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                  min={today}
                />
                {errors.startDate && <p className="mt-1 text-red-500 text-sm">{errors.startDate.message}</p>}
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <label className="block text-sm font-semibold text-gray-700 mb-2">End Date</label>
                <input
                  type="date"
                  {...register('endDate', {
                    required: 'End date is required',
                    validate: (value) => new Date(value) >= new Date(today) || 'End date cannot be in the past'
                  })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                  min={today}
                />
                {errors.endDate && <p className="mt-1 text-red-500 text-sm">{errors.endDate.message}</p>}
              </motion.div>
            </div>

            {/* Anonymous Toggle & Name */}
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="flex items-center space-x-3"
              >
                <input
                  type="checkbox"
                  {...register('isAnonymous')}
                  className="w-5 h-5 rounded border-gray-300 text-green-500 focus:ring-green-500"
                />
                <label className="text-sm font-semibold text-gray-700">Submit Anonymously</label>
              </motion.div>

              {!watchAnonymous && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Your Name</label>
                  <input
                    type="text"
                    {...register('name', { 
                      required: watchAnonymous ? false : 'Name is required if not anonymous' 
                    })}
                    placeholder="Enter your full name..."
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                  />
                  {errors.name && <p className="mt-1 text-red-500 text-sm">{errors.name.message}</p>}
                </motion.div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-gray-50 border-t">
            <motion.button
              type="submit"
              disabled={mutation.isPending}
              className="w-full sm:w-auto bg-green-500 text-white px-6 py-2 rounded-lg font-semibold
                       hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
                       disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {mutation.isPending ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </span>
              ) : (
                "Submit Feedback"
              )}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default AddFeedback;