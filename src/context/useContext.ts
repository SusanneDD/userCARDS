import { createContext } from "react";
import type { User } from "../types/users";

export const UserCardContext = createContext<User | undefined>(undefined)