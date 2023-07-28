import { create } from "zustand";
const storagePrefix = "speech_journal_";

export const useStore = create((set) => ({
  authData: localStorage.getItem("authData")
    ? JSON.parse(localStorage.getItem("authData"))
    : null,
  setAuthData: (authData) => {
    localStorage.setItem("authData", JSON.stringify(authData));
    set({ authData });
  },
  clearAuthData: () => {
    localStorage.removeItem("authData");
    set({ authData: null });
  },
}));
