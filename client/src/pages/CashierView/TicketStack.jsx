import { useState, useEffect, useRef } from "react";
import "./CashierView.css";
import useCashierStore from "../../store/cashierStore";
import "./TicketStack.css";
import MenuEnum from "./MenuEnum";
import useClickStore from "../../store/useClickStore";
import select from "../../assets/cashierview/ui_general_focus.mp3";

const TicketStack = ({ changeMenu }) => {
  const {
    tickets,
    selectTicket,
    currentTicket,
    orderInProgress,
    setMaxEntreeCount,
  } = useCashierStore();
  const [selectedTicketId, setSelectedTicketId] = useState(null);
  const [newTicketIds, setNewTicketIds] = useState([]);
  const { cps } = useClickStore();

  const selectAudio = new Audio(select);
  //okAudio.play();

  const total = tickets
    .reduce((acc, ticket) => acc + ticket.total_menuitem_price, 0)
    .toFixed(2);

  const tax = (total * 0.0825).toFixed(2);

  // ref for scroll
  const ticketListRef = useRef(null);

  useEffect(() => {
    const lastTicketId = tickets[tickets.length - 1]?.ticket_id;
    if (lastTicketId && !newTicketIds.includes(lastTicketId)) {
      setNewTicketIds((prevIds) => [...prevIds, lastTicketId]);
    }
  }, [tickets, newTicketIds]);

  // scroll to the bottom when ticket is added
  useEffect(() => {
    if (ticketListRef.current && orderInProgress) {
      ticketListRef.current.scrollTop = ticketListRef.current.scrollHeight;
    }
  }, [tickets, orderInProgress]);

  const handleTicketSelect = (ticket) => {
    selectAudio.play();
    setSelectedTicketId(ticket.ticket_id);
    selectTicket(ticket);

    const mealMapping = {
      Bowl: { maxEntreeCount: 1, menu: MenuEnum.SIDES },
      Plate: { maxEntreeCount: 2, menu: MenuEnum.SIDES },
      "Bigger Plate": { maxEntreeCount: 3, menu: MenuEnum.SIDES },
      Drink: { menu: MenuEnum.DRINKS },
      Appetizer: { menu: MenuEnum.APPETIZERS },
      "A La Carte": { menu: MenuEnum.A_LA_CARTE },
    };

    const meal = mealMapping[ticket.meal_type];

    if (meal) {
      if (meal.maxEntreeCount !== undefined)
        setMaxEntreeCount(meal.maxEntreeCount);
      changeMenu(meal.menu);
    } else {
      changeMenu(MenuEnum.NEW_ITEM);
    }
  };

  useEffect(() => {
    if (currentTicket) {
      setSelectedTicketId(currentTicket.ticket_id);
    }
  }, [currentTicket]);

  return (
    <div className="cashier-ticket-stack">
      <div className="ticket-list" ref={ticketListRef}>
        {tickets.map((ticket) => (
          <button
            key={ticket.ticket_id}
            className={`ticket-item ${
              ticket.ticket_id === selectedTicketId ? "selected" : ""
            } ${
              ticket.ticket_id === currentTicket?.ticket_id ? "highlighted" : ""
            } ${newTicketIds.includes(ticket.ticket_id) ? "slide-in" : ""}`}
            onClick={() => handleTicketSelect(ticket)}
            role="button"
            tabIndex="0"
            disabled={
              orderInProgress && ticket.ticket_id !== currentTicket?.ticket_id
            }
          >
            <h4>
              {ticket.meal_type} ${ticket.total_menuitem_price.toFixed(2)}
            </h4>
            {ticket.options.length > 0 && (
              <div className="ticket-options">
                {ticket.options.map((item, index) => (
                  <p
                    key={index}
                    className={`option-item ${
                      newTicketIds.includes(ticket.ticket_id)
                        ? "slide-in-option"
                        : ""
                    }`}
                  >
                    {item.option.replace(/_/g, " ")}
                  </p>
                ))}
              </div>
            )}
          </button>
        ))}
      </div>
      <div className="total-panel">
        <h3>Total: ${total}</h3>
        <p>Tax (8.25%): ${tax}</p>
        <h3>
          Grand Total: ${(parseFloat(total) + parseFloat(tax)).toFixed(2)}
        </h3>
        {/* <p>Clicks Per Second: {cps.toFixed(2)}</p> */}
      </div>
    </div>
  );
};

export default TicketStack;
