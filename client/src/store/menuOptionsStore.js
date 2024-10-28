import { create } from "zustand";
import axiosInstance from "../api/axiosInstance";
const menuOptionsStore = create((set) => ({
  menuEntrees: [],
  menuSides: [],
  menuApps: [],
  menuDrinks: [],

  fetchEntrees: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get("/options/?category=entree");
      set({ menuEntrees: response.data, isLoading: false });
    } catch (error) {
      console.error("Error fetching entrees:", error);
      set({ error: "Failed to fetch entrees", isLoading: false });
    }
  },

  fetchSides: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get("/options/?category=side");
      set({ menuSides: response.data, isLoading: false });
    } catch (error) {
      console.error("Error fetching entrees:", error);
      set({ error: "Failed to fetch entrees", isLoading: false });
    }
  },

  fetchApps: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get("/options/?category=app");
      set({ menuApps: response.data, isLoading: false });
    } catch (error) {
      console.error("Error fetching entrees:", error);
      set({ error: "Failed to fetch entrees", isLoading: false });
    }
  },
  fetchDrinks: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get("/options/?category=drink");
      set({ menuDrinks: response.data, isLoading: false });
    } catch (error) {
      console.error("Error fetching entrees:", error);
      set({ error: "Failed to fetch entrees", isLoading: false });
    }
  },
}));
export default menuOptionsStore;
