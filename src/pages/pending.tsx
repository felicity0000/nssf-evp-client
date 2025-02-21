import { useState, useEffect } from 'react';
import FeedbackCard from '../components/FeedbackCard';
import * as apiClient from '../api-client';

const Pending = () => {
  const [feedbacks, setFeedbacks] = useState<any[]>([]);  // Initialize as empty array
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getPendingFeedbacks = async () => {
      try {
        setLoading(true);
        const response = await apiClient.fetchPendingFeedbacks();
        // Check if response.feedbacks exists, if not use empty array
        setFeedbacks(response.feedbacks || []);
        setLoading(false);
      } catch (err: any) {
        setError('Error fetching pending feedbacks');
        setLoading(false);
        console.error('Error:', err); // Add this for debugging
      }
    };

    getPendingFeedbacks();
  }, []);

  if (loading) {
    return <div>Loading pending feedbacks...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // Add check for empty feedbacks
  if (!feedbacks || feedbacks.length === 0) {
    return <div className="text-center mt-10">No pending feedbacks found.</div>;
  }

  return (
    <div className="">
      <h2 className="text-2xl font-bold mb-4 text-center mt-10">Pending Feedbacks</h2>
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
            likedBy={feedback.likedBy || []}
            dislikedBy={feedback.dislikedBy || []}
            currentUsername={feedback.currentUsername || "Unknown"}
            isLoading={loading}
            onLike={() => alert(`Liked feedback: ${feedback._id}`)}
            onDislike={() => alert(`Disliked feedback: ${feedback._id}`)}
            onCommentClick={() => alert(`Comment on feedback: ${feedback._id}`)}
          />
        ))}
      </div>
    </div>
  );
};

export default Pending;