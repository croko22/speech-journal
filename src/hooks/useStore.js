import { create } from "zustand";
const storagePrefix = "speech_journal_";

export const useStore = create((set) => ({
  authData: localStorage.getItem(`${storagePrefix}authData`)
    ? JSON.parse(localStorage.getItem(`${storagePrefix}authData`))
    : null,
  setAuthData: (authData) => {
    localStorage.setItem(`${storagePrefix}authData`, JSON.stringify(authData));
    set({ authData });
  },
  clearAuthData: () => {
    localStorage.removeItem(`${storagePrefix}authData`);
    set({ authData: null });
  },
}));
