import React, { useContext, useState } from "react";
import * as apiClient from "../api-client";
import { useQuery } from "@tanstack/react-query";
import Toast from "../components/Toast";

type ToastMessage = {
  message: string;
  type: "SUCCESS" | "ERROR";
};

type AppContext = {
  showToast: (toastMessage: ToastMessage) => void;
  isLoggedIn: boolean;
  role: "employee" | "admin" | "problem_solver";
  user: { userId: string; username: string; department: string } | null;
};

const AppContext = React.createContext<AppContext | undefined>(undefined);

export const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [toast, setToast] = useState<ToastMessage | undefined>(undefined);

  // Fetch user data and validate token
  const { data, isLoading, isError } = useQuery({
    queryKey: ["validateToken"],
    queryFn: apiClient.validateToken,
    retry: false,
  });

  // Console logs for debugging
  console.log("API Response from validateToken:", data);
  console.log("isLoading:", isLoading);
  console.log("isError:", isError);

  // Extract role and user from the response
  const role = data?.role;
  const isLoggedIn = !isError && !!role;

  console.log("Extracted Role:", role);
  console.log("Is Logged In:", isLoggedIn);
  console.log("User Data:", data?.user);

  return (
    <AppContext.Provider
      value={{
        showToast: (toastMessage) => {
          setToast(toastMessage);
        },
        isLoggedIn,
        role,
        user: data?.user,
      }}
    >
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(undefined)}
        />
      )}
      {isLoading ? <div className="h-screen flex items-center justify-center">Loading...</div> : children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }
  return context;
};
