import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import * as apiClient from '../api-client'
import { useAppContext } from '../contexts/AppContext';

export type FeedbackFormData = {
  title: string;
  department: string;
  concern: string;
  solution: string;
  startDate: Date;
  endDate: Date;
  isAnonymous: boolean;
  name?: string; // Name is optional and only required if isAnonymous is false
};

const AddFeedback = () => {
  const {showToast} = useAppContext();
  const { register, handleSubmit, formState: { errors }, watch } = useForm<FeedbackFormData>({
    defaultValues: {
      isAnonymous: false,
    },
  });

  const watchAnonymous = watch('isAnonymous');

  const mutation = useMutation({
    mutationFn:(data: FeedbackFormData) => apiClient.addFeedback(data),
    onSuccess: async() => {
      showToast({ message: "Created feedback!", type: "SUCCESS" });
    },
    onError: async() => {
      showToast({ message: "Failed to create feedback!", type: "ERROR" });
    }
  })

  const onSubmit = (data: FeedbackFormData) => {
    console.log(data);
    // Handle form submission here
    mutation.mutate(data)
  };

  const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 py-10">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-3xl bg-white p-6 rounded-md shadow-md space-y-4">
        {/* Title & Category */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">Title</label>
            <input
              className="border rounded-md w-full px-3 py-2"
              type="text"
              {...register('title', { required: 'Title is required' })}
              placeholder="Type here..."
            />
            {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
          </div>

          <div>
            <label className="block mb-1 font-medium">Department</label>
            <select
              className="border rounded-md w-full px-3 py-2"
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
            {errors.department && <p className="text-red-500 text-sm">{errors.department.message}</p>}
          </div>
        </div>

        {/* Concern */}
        <div>
          <label className="block mb-1 font-medium">Concern</label>
          <textarea
            className="border rounded-md w-full px-3 py-2"
            {...register('concern', { required: 'Concern is required' })}
            placeholder="Describe your concern..."
          />
          {errors.concern && <p className="text-red-500 text-sm">{errors.concern.message}</p>}
        </div>

        {/* Solution */}
        <div>
          <label className="block mb-1 font-medium">Solution</label>
          <textarea
            className="border rounded-md w-full px-3 py-2"
            {...register('solution', { required: 'Solution is required' })}
            placeholder="Suggest a solution..."
          />
          {errors.solution && <p className="text-red-500 text-sm">{errors.solution.message}</p>}
        </div>

        {/* Date Pickers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">Start Date</label>
            <input
              type="date"
              {...register('startDate', {
                required: 'Start date is required',
                validate: (value) => new Date(value) >= new Date(today) || 'Start date cannot be in the past'
              })}
              className="border rounded-md w-full px-3 py-2"
              min={today} // Ensure the user can’t pick yesterday
            />
            {errors.startDate && <p className="text-red-500 text-sm">{errors.startDate.message}</p>}
          </div>

          <div>
            <label className="block mb-1 font-medium">End Date</label>
            <input
              type="date"
              {...register('endDate', {
                required: 'End date is required',
                validate: (value) => new Date(value) >= new Date(today) || 'End date cannot be in the past'
              })}
              className="border rounded-md w-full px-3 py-2"
              min={today} // Ensure the user can’t pick yesterday
            />
            {errors.endDate && <p className="text-red-500 text-sm">{errors.endDate.message}</p>}
          </div>
        </div>

        {/* Anonymous Toggle */}
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            {...register('isAnonymous')}
            className="w-5 h-5"
          />
          <label className="font-medium">Submit Anonymously</label>
        </div>

        {/* Name Field */}
        {!watchAnonymous && (
          <div>
            <label className="block mb-1 font-medium">Your Name</label>
            <input
              type="text"
              {...register('name', { 
                required: watchAnonymous ? false : 'Name is required if not anonymous' 
              })}
              placeholder="Enter your name..."
              className="border rounded-md w-full px-3 py-2"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 text-white font-medium px-4 py-2 rounded-md w-full sm:w-auto"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddFeedback;
