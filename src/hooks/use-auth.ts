import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthStore {
  token: string;
  setToken: (t: string) => void;
}

export const useAuth = create<AuthStore>()(
  persist(
    (set) => ({
      token: '',
      setToken: (t) => set({ token: t }),
    }),
    {
      name: 'motog-token', // key in localStorage
    }
  )
);
