import "./CashierView.css";
import useCashierStore from "../../store/cashierStore";
import "./TicketStack.css";
import { useState, useEffect } from "react";

const TicketStack = () => {
  const { tickets, selectTicket, currentTicket } = useCashierStore();
  const [selectedTicketId, setSelectedTicketId] = useState(null);

  const total = tickets
    .reduce((acc, ticket) => acc + ticket.total_menuitem_price, 0)
    .toFixed(2);

  const tax = (total * 0.0825).toFixed(2); // Calculate the tax (8.25%)

  const handleTicketSelect = (ticket) => {
    setSelectedTicketId(ticket.ticket_id);
    selectTicket(ticket);
  };

  useEffect(() => {
    // Set selectedTicketId based on currentTicket
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
