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
  setCurrentMicroMenu: (menu) =>
    set(() => ({
      currentMicroMenu: menu,
    })),
  addNewTicket: (ticket) =>
    set((state) => {
      const newTotal = state.total + ticket.price;
      console.log(ticket);
      return {
        orderInProgress: true,
        currentTicket: ticket,
        emptyTickets: false,
        tickets: [...state.tickets, ticket],
        total: newTotal,
      };
    }),
  addOptionToTicket: (option) =>
    set((state) => {
      if (!state.currentTicket) {
        console.warn("No current ticket selected.");
        return state;
      }

      const updatedTicket = {
        ...state.currentTicket,
        total_menuitem_price:
          state.currentTicket.total_menuitem_price + option.additional_charge,
        options: [...state.currentTicket.options, option.option],
      };

      const updatedTickets = state.tickets.map((ticket) =>
        ticket.ticket_id === state.currentTicket.ticket_id
          ? updatedTicket
          : ticket
      );

      return {
        currentTicket: updatedTicket,
        tickets: updatedTickets,
        total: state.total + option.additional_charge,
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
