import { useState, useEffect } from 'react';
import * as apiClient from '../api-client';

const AdminApproval = () => {
  const [feedbacks, setFeedbacks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const data = await apiClient.allFeedbacks();
        setFeedbacks(data.feedbacks);
      } catch (error) {
        console.error("❌ Error fetching feedbacks:", error);
        setError("Error fetching feedbacks");
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  const handleApproval = async (feedbackId: string) => {
    try {
      // ✅ Optimistically update the UI with "Approval Pending" state
      setFeedbacks((prevFeedbacks) =>
        prevFeedbacks.map((feedback) =>
          feedback._id === feedbackId ? { ...feedback, approval: 'pending' } : feedback
        )
      );
  
      // Attempt to approve the feedback via the API call
      const result = await apiClient.approveFeedback(feedbackId);
      if (result) {
        // If the API call is successful, set approval to true
        setFeedbacks((prevFeedbacks) =>
          prevFeedbacks.map((feedback) =>
            feedback._id === feedbackId ? { ...feedback, approval: true } : feedback
          )
        );
      } else {
        throw new Error("Approval failed");
      }
    } catch (error) {
      console.error("❌ Error approving feedback:", error);
      alert("Error approving feedback. Reverting changes...");
  
      // 🔄 Revert UI change if the API call fails
      setFeedbacks((prevFeedbacks) =>
        prevFeedbacks.map((feedback) =>
          feedback._id === feedbackId ? { ...feedback, approval: false } : feedback
        )
      );
    }
  };
  

  if (loading) return <p className="text-center mt-10 text-lg">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg border border-gray-200 mt-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">Approve Feedbacks</h2>

      {feedbacks.length > 0 ? (
        <div className="space-y-4">
          {feedbacks.map((feedback) => (
            <div
              key={feedback._id}
              className="bg-gray-100 p-4 rounded-lg border border-gray-300"
            >
              <h3 className="text-xl font-semibold text-gray-800">{feedback.title}</h3>
              <p className="text-gray-600"><strong>Concern:</strong> {feedback.concern}</p>
              <p className="text-gray-600"><strong>Solution:</strong> {feedback.possibleSolution}</p>
              <p className="text-gray-500">
                <strong>Status:</strong> {feedback.approval ? '✅ Approved' : '❗ Approval Pending'}
              </p>

              {feedback.approval ? (
                <span className="inline-block bg-green-500 text-white px-3 py-1 mt-2 rounded-lg">
                  Approved
                </span>
              ) : (
                <button
                  onClick={() => handleApproval(feedback._id)}
                  className="bg-blue-500 text-white px-4 py-2 mt-2 rounded-lg hover:bg-blue-600 transition-all"
                >
                  Approve
                </button>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center">No feedbacks available for approval.</p>
      )}
    </div>
  );
};

export default AdminApproval;
