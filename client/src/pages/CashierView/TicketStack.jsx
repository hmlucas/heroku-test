import "./CashierView.css";
import useCashierStore from "../../store/cashierStore";
import "./TicketStack.css";
import { useState, useEffect } from "react";
import MenuEnum from "./MenuEnum";

const TicketStack = ({ changeMenu }) => {
  const {
    tickets,
    selectTicket,
    currentTicket,
    orderInProgress,
    setMaxEntreeCount,
  } = useCashierStore();
  const [selectedTicketId, setSelectedTicketId] = useState(null);

  const total = tickets
    .reduce((acc, ticket) => acc + ticket.total_menuitem_price, 0)
    .toFixed(2);

  const tax = (total * 0.0825).toFixed(2);

  const handleTicketSelect = (ticket) => {
    setSelectedTicketId(ticket.ticket_id);
    selectTicket(ticket);

    //clean up the if statement for mapped
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
        // only for the meals with entrees
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
      <div className="ticket-list">
        {tickets.map((ticket) => (
          <button
            key={ticket.ticket_id}
            className={`ticket-item ${
              ticket.ticket_id === selectedTicketId ? "selected" : ""
            } ${
              ticket.ticket_id === currentTicket?.ticket_id ? "highlighted" : ""
            }`}
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
            <div className="ticket-options">
              {Object.values(ticket.options)
                .flat()
                .map((item, index) => (
                  <p key={index}>{item.replace(/_/g, " ")}</p>
                ))}
            </div>
          </button>
        ))}
      </div>
      <div className="total-panel">
        <h3>Total: ${total}</h3>
        <p>Tax (8.25%): ${tax}</p>
        <h3>
          Grand Total: ${(parseFloat(total) + parseFloat(tax)).toFixed(2)}
        </h3>
      </div>
    </div>
  );
};

export default TicketStack;
