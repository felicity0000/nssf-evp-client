import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as apiClient from "../api-client";

const AssignConcern = () => {
  const queryClient = useQueryClient();

  // Fetch feedbacks
  const { data: feedbacks, isLoading: feedbacksLoading, error: feedbacksError } = useQuery({
    queryKey: ["fetchFeedbacks"],
    queryFn: apiClient.fetchFeedbacks,
  });

  // Fetch problem solvers
  const { data: problemSolvers, isLoading: solversLoading, error: solversError } = useQuery({
    queryKey: ["fetchProblemSolvers"],
    queryFn: apiClient.fetchProblemSolvers,
  });

  // Mutation for assigning a user
  const assignUserMutation = useMutation({
    mutationFn: ({ feedbackId, assignedTo }: { feedbackId: string; assignedTo: string }) =>
      apiClient.assignProblemSolver(feedbackId, assignedTo),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fetchFeedbacks"] });
    },
  });

  const handleAssignUser = (feedbackId: string, assignedTo: string) => {
    if (!assignedTo) {
      alert("Please select a user to assign.");
      return;
    }
    assignUserMutation.mutate({ feedbackId, assignedTo });
  };

  if (feedbacksLoading || solversLoading) return <div>Loading...</div>;
  if (feedbacksError || solversError) return <div>Error loading data.</div>;

  return (
    <div className="p-4 mx-[20%] mt-10">
      <h1 className="font-bold text-2xl mb-4 text-center">All Feedbacks</h1>

      {/* Table Header */}
      <div className="hidden md:grid grid-cols-5 items-center py-2 px-4 bg-gray-100 text-sm font-semibold text-gray-600 border border-gray-300">
        <span className="border-r border-gray-300 px-2">Title</span>
        <span className="border-r border-gray-300 px-2">Department</span>
        <span className="border-r border-gray-300 px-2">Status</span>
        <span className="border-r border-gray-300 px-2">Created By</span>
        <span className="border-r border-gray-300 px-2">Actions</span>
      </div>

      {/* Feedback List */}
      {feedbacks?.feedbacks.length === 0 ? (
        <p>No feedback available</p>
      ) : (
        feedbacks.feedbacks.map((feedback: any) => (
          <div
            key={feedback._id}
            className="grid grid-cols-5 items-center gap-2 py-2 px-4 border-b border-gray-300 text-sm"
          >
            <p className="border-r border-gray-300 px-2">{feedback.title}</p>
            <p className="border-r border-gray-300 px-2">{feedback.department}</p>
            <p className="border-r border-gray-300 px-2">{feedback.status}</p>
            <p className="border-r border-gray-300 px-2">
              {feedback.isAnonymous ? "Anonymous" : feedback.name}
            </p>

            {/* Assign User Action */}
            <div>
              {feedback.status === "Pending" ? (
                feedback.approval ? (
                  // ✅ Feedback approved - show assignment options
                  <div className="flex items-center gap-2">
                    <select
                      className="p-1 border rounded"
                      onChange={(e) => (feedback.selectedUser = e.target.value)} // Set selected user
                    >
                      <option value="">Select User</option>
                      {problemSolvers?.problemSolvers?.length > 0 ? (
                        problemSolvers.problemSolvers.map((user: any) => (
                          <option key={user.id} value={user.username}>
                            {user.username}
                          </option>
                        ))
                      ) : (
                        <option disabled>No problem solvers available</option>
                      )}
                    </select>
                    <button
                      className="px-3 py-1 bg-[#6CBE14] text-white rounded hover:bg-blue-600"
                      onClick={() => handleAssignUser(feedback._id, feedback.selectedUser)}
                    >
                      Assign
                    </button>
                  </div>
                ) : (
                  // 🚫 Not approved yet
                  <span className="text-yellow-500 font-semibold">Awaiting Approval</span>
                )
              ) : feedback.status === "In Progress" ? (
                <span className="text-gray-500 font-semibold">In Progress</span>
              ) : feedback.status === "Resolved" ? (
                <span className="text-gray-500 font-semibold">Resolved</span>
              ) : null}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default AssignConcern;
