// src/types.ts
export interface Feedback {
    _id: string;
    title: string;
    description: string;
    status: "Pending" | "In Progress" | "Resolved";
    createdAt: string;
    updatedAt: string;
  }
  