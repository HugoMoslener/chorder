import React, { createContext, useContext, useState } from 'react';
import { MOCK_CHORES, MOCK_USERS, type ChoreRequest, type User } from './mock-data';

interface AppState {
  currentUser: User | null;
  chores: ChoreRequest[];
  setCurrentUser: (user: User | null) => void;
  setChores: React.Dispatch<React.SetStateAction<ChoreRequest[]>>;
}

const AppContext = createContext<AppState>({
  currentUser: null,
  chores: [],
  setCurrentUser: () => {},
  setChores: () => {},
});

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [chores, setChores] = useState<ChoreRequest[]>(MOCK_CHORES);

  return (
    <AppContext.Provider value={{ currentUser, chores, setChores, setCurrentUser }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}

export function getUser(id: string): User | undefined {
  return MOCK_USERS.find((u) => u.id === id);
}
