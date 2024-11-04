// yes this file name is weird.js
import { create } from "zustand";
import axiosInstance from "../api/axiosInstance";

const useCashierStore = create((set) => ({
  tickets: [],
  currentTicket: null,
  total: 0,
  receipt: null, // Stores the receipt information
  currentMicroMenu: 0,
  emptyTickets: true,
  orderInProgress: false,
  addNewTicket: (ticket) =>
    set((state) => {
      const newTotal = state.total + ticket.price;
      return {
        orderInProgress: true,
        currentTicket: ticket,
        emptyTickets: false,
        tickets: [...state.tickets, ticket],
        total: newTotal,
      };
    }),
  removeTicket: () =>
    set((state) => {
      if (state.currentTicket == null) {
        console.warn("No ticket selected to remove.");
        return state;
      }

      const updatedTickets = state.tickets.filter(
        (ticket) => ticket.ticket_id !== state.currentTicket.ticket_id
      );

      const emptyTickets = updatedTickets.length === 0;

      return {
        tickets: updatedTickets,
        currentTicket: null,
        orderInProgress: false,
        emptyTickets: emptyTickets,
      };
    }),
  removeAllTickets: () =>
    set((state) => {
      if (state.tickets.length === 0) {
        console.warn("No tickets to remove.");
        return state;
      }

      // Clear all tickets
      const updatedTickets = [];

      const emptyTickets = true;

      return {
        tickets: updatedTickets,
        currentTicket: null,
        orderInProgress: false,
        emptyTickets: emptyTickets,
      };
    }),
  selectTicket: (ticket) =>
    set(() => ({
      currentTicket: ticket,
    })),
  updateInProgress: (inProgress) =>
    set(() => ({
      orderInProgress: inProgress,
    })),
}));

export default useCashierStore;
