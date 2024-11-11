import { create } from "zustand";
import axiosInstance from "../api/axiosInstance";

const useCashierStore = create((set) => ({
  tickets: [],
  currentTicket: null,
  total: 0,
  currentMicroMenu: 0,
  emptyTickets: true,
  entreeCount: 0,
  maxEntreeCount: 0,
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
      console.log("Option" + option);
      const updatedTicket = {
        ...state.currentTicket,
        total_menuitem_price:
          state.currentTicket.total_menuitem_price + option.additional_charge,
        options: [...state.currentTicket.options, option],
      };
      console.log(state.tickets);
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
  replaceOption: (index, newOption) =>
    set((state) => {
      if (!state.currentTicket) {
        console.warn("No current ticket selected.");
        return state;
      }

      const currentOption = state.currentTicket.options[index];
      const optionPriceDifference =
        newOption.additional_charge - (currentOption?.additional_charge || 0);

      const updatedOptions = [...state.currentTicket.options];
      updatedOptions[index] = newOption;

      const updatedTicket = {
        ...state.currentTicket,
        total_menuitem_price:
          state.currentTicket.total_menuitem_price + optionPriceDifference,
        options: updatedOptions,
      };
      console.log(state.tickets);
      const updatedTickets = state.tickets.map((ticket) =>
        ticket.ticket_id === state.currentTicket.ticket_id
          ? updatedTicket
          : ticket
      );

      return {
        currentTicket: updatedTicket,
        tickets: updatedTickets,
        total: state.total + optionPriceDifference,
      };
    }),
  replaceEntree: (entree) =>
    set((state) => {
      if (!state.currentTicket) {
        console.warn("No current ticket selected.");
        return state;
      }

      const updatedOptions = [...state.currentTicket.options];
      let optionIndex = state.maxEntreeCount - state.entreeCount + 1; // Determine index based on maxEntreeCount and entreeCount

      // Ensure valid index
      if (optionIndex <= 0) optionIndex = 1;
      // Calculate price difference

      const currentOption = updatedOptions[optionIndex] || {};
      const optionPriceDifference =
        entree.additional_charge - (currentOption.additional_charge || 0);

      // Replace or add the entree at the calculated index
      if (updatedOptions[optionIndex]) {
        updatedOptions[optionIndex] = entree;
      } else {
        updatedOptions.push(entree);
      }

      // Update the ticket and ticket list
      const updatedTicket = {
        ...state.currentTicket,
        total_menuitem_price:
          state.currentTicket.total_menuitem_price + optionPriceDifference,
        options: updatedOptions,
      };

      const updatedTickets = state.tickets.map((ticket) =>
        ticket.ticket_id === state.currentTicket.ticket_id
          ? updatedTicket
          : ticket
      );

      return {
        currentTicket: updatedTicket,
        tickets: updatedTickets,
        total: state.total + optionPriceDifference,
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

  setEntreeCount: (count) =>
    set(() => ({
      entreeCount: count,
    })),
  setMaxEntreeCount: (count) =>
    set(() => ({
      maxEntreeCount: count,
    })),
  decrementEntreeCount: () =>
    set((state) => ({
      entreeCount: Math.max(0, state.entreeCount - 1),
    })),
}));

export default useCashierStore;
