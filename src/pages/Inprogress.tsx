import { useState, useEffect } from "react";
import * as apiClient from "../api-client";
import FeedbackCard from "../components/FeedbackCard";

const InProgress = () => {
  const [feedbacks, setFeedbacks] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch in-progress feedbacks on component mount
  useEffect(() => {
    const getInProgressFeedbacks = async () => {
      try {
        setLoading(true);
        const data = await apiClient.fetchInProgressFeedbacks(); // Use apiClient to call the fetchInProgressFeedbacks function
        setFeedbacks(data.feedbacks);
        setLoading(false);
      } catch (err: any) {
        setError("Error fetching in-progress feedbacks");
        setLoading(false);
      }
    };

    getInProgressFeedbacks();
  }, []); // Empty dependency array to run only once when component mounts

  // Handle loading and error states
  if (loading) {
    return <div>Loading in-progress feedbacks...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // Render the feedback cards
  return (
    <div className="">
      <h2 className="text-2xl font-bold mb-4 text-center mt-10">
        In Progress Feedbacks
      </h2>
      <div className="flex flex-col justify-center items-center space-y-2">
        {feedbacks.map((feedback: any) => (
          <FeedbackCard
            key={feedback._id}
            feedbackId={feedback._id} // ✅ Add this
            title={feedback.title}
            department={feedback.department}
            concern={feedback.concern}
            possibleSolution={feedback.possibleSolution}
            assignedTo={feedback.assignedTo}
            status={feedback.status}
            likes={feedback.likes}
            dislikes={feedback.dislikes}
            createdBy={
              feedback.isAnonymous ? "Anonymous" : feedback.name || "Unknown"
            }
            likedBy={feedback.likedBy}
            dislikedBy={feedback.dislikedBy}
            currentUsername="currentUsernamePlaceholder" // Replace with actual current username
            onLike={(id) => console.log(`Liked feedback: ${id}`)} // ✅ Placeholder function
            onDislike={(id) => console.log(`Disliked feedback: ${id}`)} // ✅ Placeholder function
            onCommentClick={() => alert(`Comment on feedback: ${feedback._id}`)}
          />
        ))}
      </div>
    </div>
  );
};

export default InProgress;
