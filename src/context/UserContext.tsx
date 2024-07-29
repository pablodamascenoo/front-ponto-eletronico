"use client";

import React, { createContext, ReactNode, useState } from "react";

type ContextType = {
  userId: string;
  setUserId: (str: string) => void;
  userEmail: string;
  setUserEmail: (str: string) => void;
  userJob: string;
  setUserJob: (str: string) => void;
  userTagId: string;
  setUserTagId: (str: string) => void;
};

const ContextDefaultValues: ContextType = {
  userId: "",
  setUserId: () => {},
  userEmail: "",
  setUserEmail: () => {},
  userJob: "",
  setUserJob: () => {},
  userTagId: "",
  setUserTagId: () => {},
};

export const UserContext = createContext<ContextType>(ContextDefaultValues);

export default function UserContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [userId, setUserId] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userJob, setUserJob] = useState("");
  const [userTagId, setUserTagId] = useState("");

  return (
    <UserContext.Provider
      value={{
        userId,
        setUserId,
        userEmail,
        setUserEmail,
        userJob,
        setUserJob,
        userTagId,
        setUserTagId,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
