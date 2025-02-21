import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FeedbackCard from "../components/FeedbackCard";
import * as apiClient from "../api-client";

// Define the types for feedback
interface Feedback {
  _id: string;
  title: string;
  department: string;
  concern: string;
  possibleSolution: string;
  assignedTo: string;
  status: string;
  likes: number;
  dislikes: number;
  likedBy: string[];
  dislikedBy: string[];
  isAnonymous: boolean;
  name?: string;
}

// Define the type for the feedbacks state
interface FeedbacksState {
  feedbacks: Feedback[];
}

const Feedbacks = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<{ [key: string]: boolean }>({});
  const navigate = useNavigate();

  // Replace with actual logic to get username
  const currentUsername = "currentLoggedInUser";

  useEffect(() => {
    const getFeedbacks = async () => {
      try {
        setLoading(true);
        const data: FeedbacksState = await apiClient.fetchFeedbacks();
        setFeedbacks(data.feedbacks);
      } catch {
        setError("Error fetching feedbacks");
      } finally {
        setLoading(false);
      }
    };

    getFeedbacks();
  }, []);

  const updateFeedbackState = (updatedFeedback: Feedback) => {
    setFeedbacks((prev) =>
      prev.map((fb) => (fb._id === updatedFeedback._id ? updatedFeedback : fb))
    );
  };

  const handleLike = async (feedbackId: string) => {
    setIsLoading((prev) => ({ ...prev, [feedbackId]: true }));
    try {
      const updatedFeedback = await apiClient.likeFeedback(feedbackId);
      updateFeedbackState(updatedFeedback);
    } catch (err) {
      console.error("Error liking feedback", err);
    } finally {
      setIsLoading((prev) => ({ ...prev, [feedbackId]: false }));
    }
  };

  const handleDislike = async (feedbackId: string) => {
    setIsLoading((prev) => ({ ...prev, [feedbackId]: true }));
    try {
      const updatedFeedback = await apiClient.dislikeFeedback(feedbackId);
      updateFeedbackState(updatedFeedback);
    } catch (err) {
      console.error("Error disliking feedback", err);
    } finally {
      setIsLoading((prev) => ({ ...prev, [feedbackId]: false }));
    }
  };

  if (loading) return <div className="text-center mt-10">Loading feedbacks...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;

  return (
    <div className="text-center mt-10">
      <h2 className="text-2xl font-bold mb-6">Feedbacks</h2>
      <div className="flex flex-col space-y-4 items-center">
        {feedbacks.map((feedback) => (
          <FeedbackCard
            key={feedback._id}
            feedbackId={feedback._id}
            title={feedback.title}
            department={feedback.department}
            concern={feedback.concern}
            possibleSolution={feedback.possibleSolution}
            assignedTo={feedback.assignedTo}
            status={feedback.status}
            likes={feedback.likes}
            dislikes={feedback.dislikes}
            likedBy={feedback.likedBy}
            dislikedBy={feedback.dislikedBy}
            createdBy={feedback.isAnonymous ? "Anonymous" : feedback.name || "Unknown"}
            currentUsername={currentUsername}
            onLike={handleLike}
            onDislike={handleDislike}
            isLoading={isLoading[feedback._id]} // Pass loading state for each feedback
            onCommentClick={() => navigate(`/feedback/${feedback._id}`)}
          />
        ))}
      </div>
    </div>
  );
};

export default Feedbacks;
