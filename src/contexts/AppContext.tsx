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
  role: "employee" | "admin" | "problem_solver" | null;
  user: { userId:string, username: string; department: string } | null;
};

const AppContext = React.createContext<AppContext | undefined>(undefined);

export const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [toast, setToast] = useState<ToastMessage | undefined>(undefined);

  // Correct usage with `useQuery`
  const { data, isLoading, isError } = useQuery({
    queryKey: ["validateToken"],
    queryFn: apiClient.validateToken,
    retry: false,
  });

    // Log the current state
    console.log("AppContext State:", { isLoading, isError, data })

  // If data is loading, return a loading state or null
  if (isLoading) {
    return <div>Loading...</div>; // Or any loading spinner you prefer
  }

  // Extract role and user from the data
  const role = data?.role ?? null; // Ensure fallback for null or undefined role
  const isLoggedIn = !isError && !!role; // Ensure we are logged in only if no error and role exists

  return (
    <AppContext.Provider value={{ 
      showToast: (toastMessage) => {
        setToast(toastMessage);
      },
      isLoggedIn,
      role,
      user: data?.user || null 
    }}>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(undefined)}
        />
      )}
      {children}
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
