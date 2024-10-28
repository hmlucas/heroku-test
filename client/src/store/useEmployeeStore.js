import { create } from "zustand";
import axiosInstance from "../api/axiosInstance";

const useEmployeeStore = create((set) => ({
  employees: [],
  selectedEmployee: null,
  isLoading: false,
  error: null,

  fetchEmployees: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get("/employees/");
      set({ employees: response.data, isLoading: false });
    } catch (error) {
      console.error("Error fetching employees:", error);
      set({ error: "Failed to fetch employees", isLoading: false });
    }
  },

  fetchEmployeeById: async (id) => {
    set({ isLoading: true, error: null, selectedEmployee: null });
    try {
      const response = await axiosInstance.get(`/employees/${id}/`);
      set({ selectedEmployee: response.data, isLoading: false });
    } catch (error) {
      console.error("Error fetching employee:", error);
      set({ error: "Employee not found", isLoading: false });
    }
  },
  fetchEmployeesByName: async (searchTerms) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get(
        `/employees?search=${searchTerms}/`
      );
      set({ employees: response.data, isLoading: false });
    } catch (error) {
      console.error("Error fetching employees:", error);
      set({ error: "Failed to fetch employees", isLoading: false });
    }
  },
}));

export default useEmployeeStore;
