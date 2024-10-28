import { create } from "zustand";
import axiosInstance from "../api/axiosInstance";

const useOrderStore = create((set) => ({
  orders: [],
  isLoading: false,
  error: null,
  addOrder: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.post("/orders/new");
      console.log("order added: " + response);
      set((state) => ({
        orders: [...state.orders, response.data],
        isLoading: false,
      }));
    } catch (e) {
      console.error("Error adding order:", e);
      set({error: "failed to add", isLoading: false})
    }
  },
}));
export default useOrderStore;
