import { useCallback, useEffect, useState } from "react";

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

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState<string | null>(null);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/users");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data: ApiUser[] = await res.json();
      setUsers(data.map(toUser));
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("Unknown error");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return { users, isLoading, isError: !!isError, error: isError, refetch: fetchUsers };
}
