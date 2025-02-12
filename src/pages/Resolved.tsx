import { useState, useEffect } from "react";
import FeedbackCard from "../components/FeedbackCard";
import * as apiClient from "../api-client";

const Resolved = () => {
  const [feedbacks, setFeedbacks] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch resolved feedbacks on component mount
  useEffect(() => {
    const getResolvedFeedbacks = async () => {
      try {
        setLoading(true);
        const data = await apiClient.fetchResolvedFeedbacks();
        setFeedbacks(data.feedbacks);
        console.log(feedbacks)
        setLoading(false);
      } catch (err: any) {
        setError("Error fetching resolved feedbacks");
        setLoading(false);
      }
    };

    getResolvedFeedbacks();
  }, []); // Runs only once when component mounts

  // Handle loading and error states
  if (loading) {
    return <div>Loading resolved feedbacks...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // Render the feedback cards
  return (
    <div className="">
      <h2 className="text-2xl font-bold mb-4 text-center mt-10">Resolved Feedbacks</h2>
      <div className="flex flex-col justify-center items-center space-y-2">
        {feedbacks.map((feedback: any) => (
          <FeedbackCard
            key={feedback._id}
            title={feedback.title}
            department={feedback.department}
            concern={feedback.concern}
            possibleSolution={feedback.possibleSolution}
            assignedTo={feedback.assignedTo}
            status={feedback.status}
            likes={feedback.likes}
            dislikes={feedback.dislikes}
            createdBy={feedback.isAnonymous ? "Anonymous" : feedback.name || "Unknown"}
            feedbackId={feedback._id}
            onLike={() => alert(`Liked feedback: ${feedback._id}`)} // Placeholder like handler
            onDislike={() => alert(`Disliked feedback: ${feedback._id}`)} // Placeholder dislike handler
            onCommentClick={() => alert(`Comment on feedback: ${feedback._id}`)} // Placeholder comment click handler
          />
        ))}
      </div>
    </div>
  );
};

export default Resolved;
