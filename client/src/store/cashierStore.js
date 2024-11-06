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
      updatedOptions[index] = newOption.option;

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
  replaceEntree: (index, entree) =>
    set((state) => {
      if (!state.currentTicket) {
        console.warn("No current ticket selected.");
        return state;
      }
      const currentOption = state.currentTicket.options[index];
      const optionPriceDifference =
        entree.additional_charge - (currentOption?.additional_charge || 0);

      const updatedOptions = [...state.currentTicket.options];

      //Bowl
      if (state.maxEntreeCount === 1) {
        if (updatedOptions[1]) {
          updatedOptions[1] = entree.option;
        } else {
          updatedOptions.push(entree.option);
        }
      }

      if (state.maxEntreeCount === 2) {
        if (state.entreeCount === 1) {
          if (updatedOptions[2]) {
            updatedOptions[2] = entree.option;
          } else {
            updatedOptions.push(entree.option);
          }
        } else if (state.entreeCount === 2) {
          if (updatedOptions[1]) {
            updatedOptions[1] = entree.option;
          } else {
            updatedOptions.push(entree.option);
          }
        }
      }
      if (state.maxEntreeCount === 3) {
        if (state.entreeCount === 1) {
          if (updatedOptions[3]) {
            updatedOptions[3] = entree.option;
          } else {
            updatedOptions.push(entree.option);
          }
        } else if (state.entreeCount === 2) {
          if (updatedOptions[2]) {
            updatedOptions[2] = entree.option;
          } else {
            updatedOptions.push(entree.option);
          }
        } else if (state.entreeCount === 3) {
          if (updatedOptions[1]) {
            updatedOptions[1] = entree.option;
          } else {
            updatedOptions.push(entree.option);
          }
        }
      }
      console.log(updatedOptions);
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
