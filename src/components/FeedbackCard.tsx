import React from "react";
import { FaThumbsUp, FaThumbsDown, FaCommentDots } from "react-icons/fa";

interface FeedbackCardProps {
  feedbackId: string;
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
  createdBy: string;
  currentUsername: string;
  onLike: (feedbackId: string) => void;
  onDislike: (feedbackId: string) => void;
  isLoading: boolean;
  onCommentClick: () => void;
}

const FeedbackCard: React.FC<FeedbackCardProps> = ({
  feedbackId,
  title,
  department,
  concern,
  possibleSolution,
  assignedTo,
  status,
  likes,
  dislikes,
  likedBy,
  dislikedBy,
  createdBy,
  currentUsername,
  onLike,
  onDislike,
  isLoading,
  onCommentClick,
}) => {
  const hasLiked = likedBy.includes(currentUsername);
  const hasDisliked = dislikedBy.includes(currentUsername);

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 max-w-4xl w-full border border-gray-200">
      <h3 className="text-2xl font-semibold mb-1">{title}</h3>
      <p className="text-sm text-gray-500 mb-1">
        Posted by <span className="font-medium">{createdBy}</span>
      </p>
      <p className="text-sm text-gray-400 mb-3">{department} Department</p>
      <p className="text-gray-700 mb-2"><strong>Concern:</strong> {concern}</p>
      <p className="text-gray-700 mb-4"><strong>Solution:</strong> {possibleSolution}</p>

      <div className="flex justify-between items-center mb-4">
        <span className={`px-3 py-1 text-sm rounded-full text-white ${status === "Resolved" ? "bg-green-500" : "bg-yellow-500"}`}>
          {status}
        </span>
        <p className="text-sm text-gray-600">
          <strong>Assigned to:</strong> {assignedTo || "Not assigned"}
        </p>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <button
            className={`flex items-center space-x-1 transition ${hasLiked ? "text-blue-500" : "text-gray-600 hover:text-blue-500"}`}
            onClick={() => onLike(feedbackId)}
            disabled={isLoading}
          >
            <FaThumbsUp /> <span>{likes}</span>
          </button>

          <button
            className={`flex items-center space-x-1 transition ${hasDisliked ? "text-red-500" : "text-gray-600 hover:text-red-500"}`}
            onClick={() => onDislike(feedbackId)}
            disabled={isLoading}
          >
            <FaThumbsDown /> <span>{dislikes}</span>
          </button>
        </div>

        <button
          className="flex items-center space-x-2 text-gray-600 hover:text-blue-500 transition"
          onClick={onCommentClick}
        >
          <FaCommentDots /> <span>Comment</span>
        </button>
      </div>
    </div>
  );
};

export default FeedbackCard;
