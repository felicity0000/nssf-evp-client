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
  createdBy: string;
  onLike: (feedbackId: string) => void;
  onDislike: (feedbackId: string) => void;
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
  createdBy,
  onLike,
  onDislike,
  onCommentClick,
}) => {
  return (
    <div className="bg-white shadow-xl rounded-lg max-w-5xl w-full p-6 border border-gray-200">
      <h3 className="text-2xl font-bold mb-1">{title}</h3>
      <p className="text-md text-gray-600 mb-1">
        Posted by <span className="font-semibold">{createdBy}</span>
      </p>
      <p className="text-sm text-gray-500 mb-4">{department} Department</p>
      <p className="text-md text-gray-800 mb-4"><strong>Concern:</strong> {concern}</p>
      <p className="text-md text-gray-800 mb-4"><strong>Solution:</strong> {possibleSolution}</p>

      <div className="flex justify-between items-center mb-4">
        <span className={`text-white text-sm px-3 py-1 rounded-full ${status === "Resolved" ? "bg-green-500" : "bg-yellow-500"}`}>
          {status}
        </span>
        <p className="text-sm text-gray-700"><strong>Assigned to:</strong> {assignedTo || "Not assigned"}</p>
      </div>

      <div className="flex justify-between items-center text-gray-600">
        <div className="flex items-center space-x-4">
          <button className="flex items-center space-x-1 text-gray-700 hover:text-blue-500 transition" onClick={() => onLike(feedbackId)}>
            <FaThumbsUp /><span>{likes}</span>
          </button>
          <button className="flex items-center space-x-1 text-gray-700 hover:text-blue-500 transition" onClick={() => onDislike(feedbackId)}>
            <FaThumbsDown /><span>{dislikes}</span>
          </button>
        </div>

        {/* Clicking the comment icon takes the user to the feedback details page */}
        <button
          className="flex items-center space-x-2 text-gray-700 hover:text-blue-500 transition cursor-pointer"
          onClick={onCommentClick}
        >
          <FaCommentDots />
          <span>Comment</span>
        </button>
      </div>
    </div>
  );
};

export default FeedbackCard;
