import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import * as apiClient from "../api-client";
import { FaCommentAlt } from "react-icons/fa";

const FeedbackDetails = () => {
  const { id } = useParams();
  const [feedback, setFeedback] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [comment, setComment] = useState("");

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const data = await apiClient.getFeedbackById(id!);
        setFeedback(data);
        setLoading(false);
      } catch {
        setError("Error fetching feedback");
        setLoading(false);
      }
    };
    fetchFeedback();
  }, [id]);

  const handleCommentSubmit = async () => {
    if (!comment.trim()) return;
    try {
      await apiClient.addComment(id!, comment);
      setFeedback({
        ...feedback,
        comments: [
          ...feedback.comments,
          { comment, username: "You" }, // Use "You" for now or get the username dynamically
        ],
      });
      setComment("");
    } catch {
      alert("Error adding comment");
    }
  };

  if (loading) return <p className="text-center mt-10 text-lg">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg border border-gray-200 mt-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-3">{feedback.title}</h2>
      <p className="text-gray-600 mb-2"><strong>Concern:</strong> {feedback.concern}</p>
      <p className="text-gray-600 mb-4"><strong>Solution:</strong> {feedback.possibleSolution}</p>
      
      <h3 className="mt-6 text-xl font-semibold text-gray-800 flex items-center">
        <FaCommentAlt className="mr-2 text-blue-500" /> Comments
      </h3>
      <div className="mt-3 space-y-3">
        {feedback.comments.length > 0 ? (
          feedback.comments.map((c: any, index: number) => (
            <div key={index} className="bg-gray-100 p-3 rounded-lg border border-gray-300">
              <p className="text-gray-700"><strong>{c.username}:</strong> {c.comment}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No comments yet.</p>
        )}
      </div>
      
      <div className="mt-6">
        <input 
          value={comment} 
          onChange={(e) => setComment(e.target.value)} 
          placeholder="Write a comment..." 
          className="border border-gray-300 p-2 w-full rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
        />
        <button 
          onClick={handleCommentSubmit} 
          className="bg-blue-500 text-white px-4 py-2 mt-2 rounded-lg hover:bg-blue-600 transition-all"
        >
          Submit Comment
        </button>
      </div>
    </div>
  );
};

export default FeedbackDetails;
