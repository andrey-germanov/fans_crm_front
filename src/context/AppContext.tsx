import React, { createContext, useState, useContext, ReactNode } from 'react';

type User = {
  email: string;
  createdAt: Date;
  phone: string;
  id: number;
};

type AuthContextType = {
  user: User | null;
  setUser: (user: User) => void;
};

const state = {
  user: null,
  setUser: (user: User) => {},
};

export const AppContext = createContext<AuthContextType>(state);

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <AppContext.Provider value={{ user, setUser }}>
      {children}
    </AppContext.Provider>
  );
};
