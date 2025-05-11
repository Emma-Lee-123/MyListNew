/* eslint-disable react-refresh/only-export-components */
//import { createContext, useContext, useState, ReactNode } from "react";
import { createContext, useContext, useState, type ReactNode } from "react";
import type { User, UserContextType } from "./models/User";
//import { User, UserContextType } from "./models/User";

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>({
    id: 0,
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within UserProvider");
  return context;
};
