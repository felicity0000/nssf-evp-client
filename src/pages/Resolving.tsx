import { useState, useEffect } from "react";
import * as apiClient from "../api-client"; // Import API functions

const Resolving = () => {
  const [feedbacks, setFeedbacks] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [resolving, setResolving] = useState<boolean>(false); // Track resolve state

  // Fetch assigned feedbacks when component mounts
  useEffect(() => {
    const loadFeedbacks = async () => {
      try {
        const data = await apiClient.fetchAssignedFeedbacks();
        console.log("API Response:", data); // Debugging log

        if (!data || !Array.isArray(data.feedbacks)) {
          throw new Error("Invalid API response format");
        }

        setFeedbacks(data.feedbacks); // Ensure it's an array
      } catch (err) {
        setError("Error fetching feedbacks");
        console.error("Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };

    loadFeedbacks();
  }, []);

  // Handle resolving feedback
  const handleResolve = async (feedbackId: string) => {
    setResolving(true);
    try {
      const data = await apiClient.resolveFeedback(feedbackId);
      alert(data.message);

      // Refresh feedbacks after resolving
      const updatedFeedbacks = await apiClient.fetchAssignedFeedbacks();
      setFeedbacks(updatedFeedbacks.feedbacks);
    } catch (error) {
      setError("Error resolving feedback");
    } finally {
      setResolving(false);
    }
  };

  if (loading) {
    return <div className="text-center text-lg font-semibold mt-10">Loading feedbacks...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 font-semibold mt-10">{error}</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-xl font-bold mb-4 text-gray-800 text-center">Your Assigned Feedbacks</h2>

      {feedbacks.length === 0 ? (
        <p className="text-gray-600 text-lg">No feedbacks assigned to you.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
              <tr>
                <th className="py-3 px-6 text-left">Title</th>
                <th className="py-3 px-6 text-left">Concern</th>
                <th className="py-3 px-6 text-left">Possible Solution</th>
                <th className="py-3 px-6 text-left">Department</th>
                <th className="py-3 px-6 text-left">Status</th>
                <th className="py-3 px-6 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm font-light">
              {feedbacks.map((feedback: any) => (
                <tr
                  key={feedback._id}
                  className="border-b border-gray-200 hover:bg-gray-50 transition"
                >
                  <td className="py-3 px-6">{feedback.title}</td>
                  <td className="py-3 px-6">{feedback.concern}</td>
                  <td className="py-3 px-6 text-gray-500 italic">{feedback.possibleSolution}</td>
                  <td className="py-3 px-6">{feedback.department}</td>
                  <td
                    className={`py-3 px-6 font-semibold ${
                      feedback.status === "In Progress" ? "text-yellow-500" : "text-green-600"
                    }`}
                  >
                    {feedback.status}
                  </td>
                  <td className="py-3 px-6 text-center">
                    {feedback.status === "In Progress" && (
                      <button
                        onClick={() => handleResolve(feedback._id)}
                        disabled={resolving}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:bg-gray-400 transition"
                      >
                        {resolving ? "Resolving..." : "Resolve Feedback"}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Resolving;
