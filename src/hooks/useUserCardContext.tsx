import React, { createContext, useContext } from "react";
import type { User } from "../context/UsersContext"; 

const UserCardContext = createContext<User | undefined>(undefined);

export const UserCardProvider: React.FC<{
  user: User;
  children: React.ReactNode;
}> = ({ user, children }) => (
  <UserCardContext.Provider value={user}>{children}</UserCardContext.Provider>
);

export function useUserCardContext(): User {
  const ctx = useContext(UserCardContext);
  if (!ctx)
    throw new Error(
      "useUserCardContext must be used within <UserCardProvider>"
    );
  return ctx;
}
