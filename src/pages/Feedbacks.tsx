import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FeedbackCard from "../components/FeedbackCard";
import * as apiClient from "../api-client";

const Feedbacks = () => {
  const [feedbacks, setFeedbacks] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getFeedbacks = async () => {
      try {
        setLoading(true);
        const data = await apiClient.fetchFeedbacks();
        setFeedbacks(data.feedbacks);
      } catch {
        setError("Error fetching feedbacks");
      } finally {
        setLoading(false);
      }
    };

    getFeedbacks();
  }, []);

  const handleLike = async (feedbackId: string) => {
    try {
      await apiClient.likeFeedback(feedbackId);
      setFeedbacks((prev) =>
        prev.map((fb) =>
          fb._id === feedbackId ? { ...fb, likes: fb.likes + 1 } : fb
        )
      );
    } catch (error) {
      console.error("Error liking feedback", error);
    }
  };

  const handleDislike = async (feedbackId: string) => {
    try {
      await apiClient.dislikeFeedback(feedbackId);
      setFeedbacks((prev) =>
        prev.map((fb) =>
          fb._id === feedbackId ? { ...fb, dislikes: fb.dislikes + 1 } : fb
        )
      );
    } catch (error) {
      console.error("Error disliking feedback", error);
    }
  };

  if (loading) {
    return <div className="text-center mt-10">Loading feedbacks...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  }

  return (
    <div className="text-center mt-10">
      <h2 className="text-2xl font-bold mb-4">Feedbacks</h2>
      <div className="flex flex-col justify-center items-center space-y-2">
        {feedbacks.map((feedback) => (
          <FeedbackCard
            key={feedback._id}
            feedbackId={feedback._id} // Make sure to pass the correct feedbackId
            title={feedback.title}
            department={feedback.department}
            concern={feedback.concern}
            possibleSolution={feedback.possibleSolution}
            assignedTo={feedback.assignedTo}
            status={feedback.status}
            likes={feedback.likes}
            dislikes={feedback.dislikes}
            createdBy={feedback.isAnonymous ? "Anonymous" : feedback.name || "Unknown"}
            onLike={handleLike}
            onDislike={handleDislike}
            onCommentClick={() => navigate(`/feedback/${feedback._id}`)}
          />
        ))}
      </div>
    </div>
  );
};

export default Feedbacks;
