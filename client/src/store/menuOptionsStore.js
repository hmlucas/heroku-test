import { create } from "zustand";
import axiosInstance from "../api/axiosInstance";
const menuOptionsStore = create((set) => ({
    menuItmes:[],

    fetchEntrees: async () =>{
        set({ isLoading: true, error: null });
        try {
            const response = await axiosInstance.get("/options/?category=entree");
            set({ employees: response.data, isLoading: false });
          } catch (error) {
            console.error("Error fetching employees:", error);
            set({ error: "Failed to fetch employees", isLoading: false });
          }
        },

    fetchSides: async () =>{
        set({ isLoading: true, error: null });
        try {
            const response = await axiosInstance.get("/options/?category=side");
            set({ employees: response.data, isLoading: false });
          } catch (error) {
            console.error("Error fetching employees:", error);
            set({ error: "Failed to fetch employees", isLoading: false });
          }
        },

    fetchApps: async () =>{
        set({ isLoading: true, error: null });
        try {
            const response = await axiosInstance.get("/options/?category=app");
            set({ employees: response.data, isLoading: false });
          } catch (error) {
            console.error("Error fetching employees:", error);
            set({ error: "Failed to fetch employees", isLoading: false });
          }
        },
    fetchDrinks: async () =>{
        set({ isLoading: true, error: null });
        try {
            const response = await axiosInstance.get("/options/?category=drink");
            set({ employees: response.data, isLoading: false });
          } catch (error) {
            console.error("Error fetching employees:", error);
            set({ error: "Failed to fetch employees", isLoading: false });
          }
        },

}));
export default menuItemsStore;
