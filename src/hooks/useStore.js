import { create } from "zustand";

export const useStore = create((set) => ({
  authData: localStorage.getItem("authData")
    ? JSON.parse(localStorage.getItem("authData"))
    : null,
  setAuthData: (authData) => {
    set({ authData });
  },
}));
