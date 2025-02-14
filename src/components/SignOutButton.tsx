import { useMutation } from "@tanstack/react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const SignOutButton = () => {
  const { showToast } = useAppContext();
  const navigate = useNavigate(); // Initialize useNavigate

  // Mutation for the sign-out request
  const mutation = useMutation<void, Error>({
    mutationFn: async () => {
      await apiClient.signOut(); // Call your API to sign out
    },
    onSuccess: async () => {
      showToast({ message: "Signed Out!", type: "SUCCESS" });
      navigate("/"); // Redirect to the homepage after successful sign-out
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" }); // Show error if sign-out fails
    },
  });

  // Handle the click to sign out
  const handleClick = () => {
    mutation.mutate(); // Trigger the mutation when the button is clicked
  };

  return (
    <button
      onClick={handleClick}
      className="text-blue-600 px-3 font-bold bg-white hover:bg-gray-100"
    >
      Sign Out
    </button>
  );
};

export default SignOutButton;
