import { SignInFormData } from "./pages/SignIn";
import { FeedbackFormData } from "./pages/AddFeedback";

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || "";

// fetch user function
export const fetchCurrentUser = async () => {
  const response = await fetch(`${API_BASE_URL}/api/users/me`, {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Error fetching user");
  }
  return response.json();
};

// validateToken function
export const validateToken = async () => {
  const response = await fetch(`${API_BASE_URL}/api/users/validate-token`, {
    credentials: "include",
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
  });

  if (!response.ok) {
    throw new Error("Token invalid");
  }

  const data = await response.json();
  console.log("API Response in validateToken:", data); // Check API response
  return data;
};


// signIn function
export const signIn = async (formData: SignInFormData) => {
  const response = await fetch(`${API_BASE_URL}/api/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(formData),
  });

  const body = await response.json();
  if (!response.ok) {
    throw new Error(body.message);
  }
  return body;
};

// signOut function
export const signOut = async () => {
  const response = await fetch(`${API_BASE_URL}/api/users/logout`, {
    credentials: "include",
    method: "POST",
  });

  if (!response.ok) {
    throw new Error("Error during sign out");
  }
};

// create feedback function
export const addFeedback = async (formData :FeedbackFormData) => {
  const response = await fetch(`${API_BASE_URL}/api/feedbacks/`, {
    credentials:"include",
    headers: {
      "Content-Type":"application/json"
    },
    method:"POST",
    body: JSON.stringify(formData),
  });

  const body = await response.json();
  
  if(!response.ok) {
    throw new Error(body.message);
  }

  return body;
};

// fetch feedbacks function
export const fetchFeedbacks = async() => {
  const response = await fetch(`${API_BASE_URL}/api/feedbacks/`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Error fetching feedbacks");
  }

  return response.json();
};

// Fetch feedback by ID
export const getFeedbackById = async (id: string) => {
  const response = await fetch(`${API_BASE_URL}/api/feedbacks/feedback/${id}`, {
      credentials: "include",
  });

  if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error fetching feedback");
  }

  return response.json();
};


// fetch pending feedbacks function
export const fetchPendingFeedbacks = async () => {
  const response = await fetch(`${API_BASE_URL}/api/feedbacks/pending`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Error fetching pending feedbacks");
  }

  return response.json();
};

//fetch in progrees feedbacks function
export const fetchInProgressFeedbacks = async () => {
  const response = await fetch(`${API_BASE_URL}/api/feedbacks/inprogress`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Error fetching in-progress feedbacks");
  }

  return response.json();
};

//fetch resolved feedbacks function 
export const fetchResolvedFeedbacks = async () => {
  const response = await fetch(`${API_BASE_URL}/api/feedbacks/resolved`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Error fetching resolved feedbacks");
  };

  return response.json();
};

// add a comment
export const addComment = async (feedbackId: string, comment: string) => {
  const response = await fetch(`${API_BASE_URL}/api/feedbacks/${feedbackId}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ comment }),
  });

  if (!response.ok) {
    throw new Error("Error adding comment");
  }

  return response.json();
};

// Like feedback
export const likeFeedback = async (feedbackId: string) => {
  const response = await fetch(`${API_BASE_URL}/api/feedbacks/${feedbackId}/like`, {
    method: "POST",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Error liking feedback");
  }

  return response.json();
};

// Dislike feedback
export const dislikeFeedback = async (feedbackId: string) => {
  const response = await fetch(`${API_BASE_URL}/api/feedbacks/${feedbackId}/dislike`, {
    method: "POST",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Error disliking feedback");
  }

  return response.json();
};


// fetch problem solvers
export const fetchProblemSolvers = async() => {
  const response = await fetch(`${API_BASE_URL}/api/users/problem-solvers`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Error fetching problem solvers");
  }

  return response.json();
}

// fetch feedbacks assigned to a particular problem solver
export const fetchAssignedFeedbacks = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/problem-solver/`, {
      credentials: "include", // Ensure cookies are sent with the request
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch feedbacks");
    }

    return data; // Return the feedbacks if successful
  } catch (error) {
    console.error("Error fetching assigned feedbacks:", error);
    throw error; // Rethrow error to be handled in the component
  }
};

// Add a resolve function
export const resolveFeedback = async (feedbackId: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/problem-solver/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ feedbackId }),
      credentials: "include", // Ensure cookies are sent with the request
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to resolve feedback");
    }

    return data; // Return success message if resolved
  } catch (error) {
    console.error("Error resolving feedback:", error);
    throw error; // Rethrow error to be handled in the component
  }
};

// Assign problem solver to feedback
export const assignProblemSolver = async (feedbackId: string, assignedTo: string) => {
  const response = await fetch(`${API_BASE_URL}/api/admin/`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ feedbackId, assignedTo }),
  });

  if (!response.ok) {
    throw new Error("Error assigning feedback");
  }

  return response.json();
};

// piechart
export const fetchPieChart = async () => {
  const response = await fetch(`${API_BASE_URL}/api/admin/pie-chart`, {
    credentials: "include",
  });
  
  if (!response.ok) {
    throw new Error("Error fetching pie chart data");
  }
  
  const data = await response.json();
  return data;
};

// line graph
export const fetchLineGraph = async () => {
  const response = await fetch(`${API_BASE_URL}/api/admin/line-graph`, {
    credentials: "include",
  });
  
  if (!response.ok) {
    throw new Error("Error fetching line graph data");
  }
  
  const data = await response.json();
  return data;
};

// fetching feedback stats
export const fetchFeedbackStats = async () => {
  const response = await fetch(`${API_BASE_URL}/api/feedbacks/feedback-stats`, {
    credentials: "include",  // Include credentials if necessary
  });

  if (!response.ok) {
    throw new Error('Failed to fetch feedback stats');
  }

  return response.json();
};




