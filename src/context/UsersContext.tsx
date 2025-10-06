import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

export interface ApiUser {
  id: number;
  name: string;
  email: string;
  username: string;
  phone: string;
  website: string;
  company?: { name?: string; bs?: string };
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  isOnline: boolean;
  avatarUrl?: string;
}

interface UsersState {
  status: "idle" | "loading" | "error" | "success";
  error: string | null;
  users: User[];
  refetch: () => void;
}

const UsersContext = createContext<UsersState | undefined>(undefined);

function toUser(u: ApiUser): User {
  const roles = ["Frontend Developer", "Backend Developer", "UX Designer", "Project Manager", "QA Engineer"];
  return {
    id: u.id,
    name: u.name,
    email: u.email,
    role: roles[u.id % roles.length],
    isOnline: u.id % 2 === 0,
    avatarUrl: `https://i.pravatar.cc/150?img=${(u.id % 70) + 1}`,
  };
}

export const UsersProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [status, setStatus] = useState<UsersState["status"]>("idle");
  const [error, setError] = useState<string | null>(null);
  const [users, setUsers] = useState<User[]>([]);

  const load = React.useCallback(async () => {
    setStatus("loading");
    setError(null);
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/users");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data: ApiUser[] = await res.json();
      const mapped = data.map(toUser);
      setUsers(mapped);
      setStatus("success");
    } catch (e: unknown) {
      const errorMessage = e instanceof Error ? e.message : "Unknown error";
      setError(errorMessage);
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const value = useMemo<UsersState>(() => ({ status, error, users, refetch: load }), [status, error, users, load]);

  return <UsersContext.Provider value={value}>{children}</UsersContext.Provider>;
};

export function useUsersContext(): UsersState {
  const ctx = useContext(UsersContext);
  if (!ctx) throw new Error("useUsersContext must be used inside <UsersProvider>");
  return ctx;
}
